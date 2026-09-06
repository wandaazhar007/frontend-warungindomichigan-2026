import type { Metadata } from 'next';
import { Suspense } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import VerifyEmailForm from '@/components/auth/VerifyEmailForm';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Auth.VerifyEmail');
  return { title: t('metaTitle') };
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <div className="flex justify-center mb-6">
          <Image
            src="/images/icon-warung-indomi.png"
            alt="Warung IndoMi — Indonesian Grocery Store"
            width={48}
            height={48}
            className="rounded-xl"
          />
        </div>
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          }
        >
          <VerifyEmailForm />
        </Suspense>
      </div>
    </div>
  );
}
