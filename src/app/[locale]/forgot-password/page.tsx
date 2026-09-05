import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Auth.ForgotPassword');
  return { title: t('metaTitle') };
}

export default function ForgotPasswordPage() {
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
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
