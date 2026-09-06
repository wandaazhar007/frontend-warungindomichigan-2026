'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';
import { MailCheck, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { auth } from '@/lib/firebase';
import { useAuthStore } from '@/store/authStore';
import { sendVerificationEmail, refreshToken, signOut } from '@/lib/auth';
import { Button } from '@/components/ui/button';

const RESEND_COOLDOWN_SECONDS = 60;

export default function VerifyEmailForm() {
  const t = useTranslations('Auth.VerifyEmail');
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') ?? '/';

  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);

  const [cooldown, setCooldown] = useState(0);
  const [checking, setChecking] = useState(false);
  const [resending, setResending] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Guard: no user -> login; already verified -> home
  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/login');
    } else if (user.emailVerified) {
      router.replace('/');
    }
  }, [loading, user, router]);

  // Cooldown countdown
  useEffect(() => {
    if (cooldown <= 0) return;
    intervalRef.current = setInterval(() => {
      setCooldown((c) => (c <= 1 ? 0 : c - 1));
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [cooldown]);

  async function handleResend() {
    if (!user || cooldown > 0) return;
    setResending(true);
    setError('');
    setNotice('');
    try {
      await sendVerificationEmail(user);
      setNotice(t('resendSuccess'));
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch {
      setError(t('errors.generic'));
    } finally {
      setResending(false);
    }
  }

  async function handleIveVerified() {
    if (!user) return;
    setChecking(true);
    setError('');
    setNotice('');
    try {
      await user.reload();
      const current = auth.currentUser;
      if (current?.emailVerified) {
        await refreshToken(current);
        useAuthStore.getState().setUser(current);
        router.replace(redirectTo);
      } else {
        setError(t('notVerifiedYet'));
      }
    } catch {
      setError(t('errors.generic'));
    } finally {
      setChecking(false);
    }
  }

  async function handleGuestCheckout() {
    await signOut();
    router.replace('/cart');
  }

  if (loading || !user || user.emailVerified) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <MailCheck className="h-12 w-12 text-primary mx-auto mb-4" />
      <h1 className="font-display text-2xl font-700 text-gray-900 mb-2">{t('title')}</h1>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        {t.rich('sentTo', {
          email: () => <strong className="text-gray-700">{user.email}</strong>,
        })}
      </p>

      {notice && (
        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-700 mb-4">
          {notice}
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600 mb-4">
          {error}
        </div>
      )}

      <div className="space-y-3">
        <Button className="w-full" size="lg" onClick={handleIveVerified} disabled={checking}>
          {checking ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
          {t('iveVerified')}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          size="lg"
          onClick={handleResend}
          disabled={resending || cooldown > 0}
        >
          {resending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
          {cooldown > 0 ? t('resendCooldown', { seconds: cooldown }) : t('resend')}
        </Button>
      </div>

      <button
        type="button"
        onClick={handleGuestCheckout}
        className="text-sm text-gray-500 hover:text-primary hover:underline mt-6"
      >
        {t('signOutGuest')}
      </button>
    </div>
  );
}
