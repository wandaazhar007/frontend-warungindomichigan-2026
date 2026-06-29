import type { Metadata } from 'next';
import LegalPageLayout from '@/components/layout/LegalPageLayout';
import FaqAccordion from '@/components/faq/FaqAccordion';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions',
  description:
    'Answers to common questions about ordering, shipping, products, payments, and your account at Warung Indo Michigan.',
  alternates: { canonical: 'https://warungindomi.com/faq' },
};

export default function FaqPage() {
  return (
    <LegalPageLayout
      label="Help"
      title="Frequently Asked Questions"
      subtitle="Can't find your answer? Chat with us on WhatsApp — we usually respond within a few hours."
    >
      <FaqAccordion />

      {/* Bottom CTA */}
      <div className="mt-12 rounded-xl border border-border bg-white p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-gray-900 mb-0.5">Still have questions?</p>
          <p className="text-sm text-muted-foreground">
            Our team is available via WhatsApp. We typically respond within a few hours.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          <a
            href="https://wa.me/16264614963"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white text-sm font-semibold px-4 py-2.5 hover:bg-primary/90 transition-colors"
          >
            💬 WhatsApp Us
          </a>
          <a
            href="tel:+16264614963"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white text-sm font-semibold px-4 py-2.5 text-gray-900 hover:bg-secondary transition-colors"
          >
            📞 Call Us
          </a>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white text-sm font-semibold px-4 py-2.5 text-gray-900 hover:bg-secondary transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>

      {/* Quick links to policy pages */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { href: '/shipping-policy', label: '🚚 Shipping Policy' },
          { href: '/return-policy', label: '↩️ Return Policy' },
          { href: '/privacy-policy', label: '🔒 Privacy Policy' },
          { href: '/terms', label: '📋 Terms & Conditions' },
        ].map(({ href, label }) => (
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
