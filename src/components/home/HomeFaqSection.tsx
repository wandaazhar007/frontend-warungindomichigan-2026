'use client';

import { useState } from 'react';
import { ChevronDown, Phone } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const FAQ_KEYS = ['guestCheckout', 'shippingTime', 'shippingCost', 'authentic', 'paymentMethods'] as const;

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border border-gray-200 rounded-xl overflow-hidden transition-shadow ${
        open ? 'shadow-sm' : ''
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 bg-white hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <div className="flex items-start gap-3">
          <span className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center">
            {index + 1}
          </span>
          <span className="text-sm font-semibold text-gray-900 leading-snug">{q}</span>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 shrink-0 mt-0.5 transition-transform duration-200 ${
            open ? 'rotate-180 text-red-500' : ''
          }`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-2 bg-white border-t border-gray-100">
          {/* left accent bar */}
          <div className="pl-8">
            <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HomeFaqSection() {
  const t = useTranslations('Home.Faq');

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-wim">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-red-500 mb-3">
            {t('kicker')}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            {t('heading')}
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
            {t('subheading')}
          </p>
        </div>

        {/* FAQ list */}
        <div className="max-w-2xl mx-auto space-y-3">
          {FAQ_KEYS.map((key, i) => (
            <FaqItem key={key} q={t(`items.${key}.q`)} a={t(`items.${key}.a`)} index={i} />
          ))}
        </div>

        {/* CTA buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/faq"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:border-red-300 hover:text-red-600 transition-colors"
          >
            {t('seeAll')}
          </Link>
          <a
            href="https://wa.me/16264614963"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-6 py-3 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
          >
            <Phone className="h-4 w-4" />
            {t('callUs')}
          </a>
        </div>
      </div>
    </section>
  );
}
