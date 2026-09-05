'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { resetPassword } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ForgotPasswordForm() {
  const t = useTranslations('Auth.ForgotPasswordForm');
  const [success, setSuccess] = useState('');
  const [serverError, setServerError] = useState('');

  const schema = z.object({
    email: z.string().min(1, t('errors.required')).email(t('errors.invalidEmail')),
  });
  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    setServerError('');
    try {
      await resetPassword(data.email);
      setSuccess(data.email);
    } catch {
      setServerError(t('errors.generic'));
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
        <h2 className="font-display text-xl font-700 text-gray-900 mb-2">{t('emailSentTitle')}</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          {t.rich('emailSentDescription', {
            email: () => <strong className="text-gray-700">{success}</strong>,
          })}
        </p>
        <Button variant="outline" asChild>
          <Link href="/login">{t('backToLogin')}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="font-display text-2xl font-700 text-gray-900 mb-1">{t('title')}</h1>
        <p className="text-sm text-gray-500">
          {t('description')}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('email')}</label>
          <Input type="email" placeholder="you@email.com" {...register('email')} />
          {errors.email && <p className="text-xs text-error mt-1">{errors.email.message}</p>}
        </div>

        {serverError && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600">
            {serverError}
          </div>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
          {t('sendResetLink')}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        <Link href="/login" className="text-red-500 hover:underline">
          {t('backToLogin')}
        </Link>
      </p>
    </div>
  );
}
