import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CheckoutAuthGuard from '@/components/checkout/CheckoutAuthGuard';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Checkout');
  return { title: t('metaTitle') };
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <CheckoutAuthGuard>{children}</CheckoutAuthGuard>
      </div>
    </div>
  );
}
