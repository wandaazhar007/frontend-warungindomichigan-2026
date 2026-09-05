import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import LegalPageLayout from '@/components/layout/LegalPageLayout';
import FaqAccordion from '@/components/faq/FaqAccordion';
import { Link } from '@/i18n/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Faq');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: 'https://warungindomi.com/faq' },
  };
}

export default async function FaqPage() {
  const t = await getTranslations('Faq');

  const quickLinks = [
    { href: '/shipping-policy', label: `🚚 ${t('quickLinks.shippingPolicy')}` },
    { href: '/return-policy', label: `↩️ ${t('quickLinks.returnPolicy')}` },
    { href: '/privacy-policy', label: `🔒 ${t('quickLinks.privacyPolicy')}` },
    { href: '/terms', label: `📋 ${t('quickLinks.terms')}` },
  ];

  return (
    <LegalPageLayout
      label={t('label')}
      title={t('title')}
      subtitle={t('subtitle')}
    >
      <FaqAccordion />

      {/* Bottom CTA */}
      <div className="mt-12 rounded-xl border border-border bg-white p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-gray-900 mb-0.5">{t('stillHaveQuestions')}</p>
          <p className="text-sm text-muted-foreground">
            {t('teamAvailable')}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          <a
            href="https://wa.me/16264614963"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white text-sm font-semibold px-4 py-2.5 hover:bg-primary/90 transition-colors"
          >
            💬 {t('whatsappUs')}
          </a>
          <a
            href="tel:+16264614963"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white text-sm font-semibold px-4 py-2.5 text-gray-900 hover:bg-secondary transition-colors"
          >
            📞 {t('callUs')}
          </a>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white text-sm font-semibold px-4 py-2.5 text-gray-900 hover:bg-secondary transition-colors"
          >
            {t('browseProducts')}
          </Link>
        </div>
      </div>

      {/* Quick links to policy pages */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="rounded-lg border border-border bg-white px-3 py-3 text-center text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
          >
            {label}
          </Link>
        ))}
      </div>
    </LegalPageLayout>
  );
}
