'use client';

import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { useAuthStore } from '@/store/authStore';

// Blocks logged-in users with an unverified email from reaching checkout.
// Guests (user === null) pass straight through and are never affected.
export default function CheckoutAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);

  const blocked = !!user && !user.emailVerified;

  useEffect(() => {
    if (!loading && blocked) {
      router.replace('/verify-email?redirect=/checkout');
    }
  }, [loading, blocked, router]);

  if (loading || blocked) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-7 w-7 animate-spin text-red-400" />
      </div>
    );
  }

  return <>{children}</>;
}
