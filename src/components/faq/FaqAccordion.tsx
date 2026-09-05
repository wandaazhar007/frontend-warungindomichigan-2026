'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

const GROUPS = [
  { key: 'orders', icon: '📦', items: ['guestCheckout', 'trackOrder', 'modifyOrder', 'orderStatuses', 'noConfirmationEmail'] },
  { key: 'shipping', icon: '🚚', items: ['shippingTime', 'shippingCost', 'hawaiiAlaska', 'lostDamaged'] },
  { key: 'products', icon: '🛒', items: ['authentic', 'halal', 'expiry', 'requestProduct'] },
  { key: 'payments', icon: '💳', items: ['paymentMethods', 'safeCard', 'whenCharged'] },
  { key: 'returns', icon: '↩️', items: ['canReturn', 'refundTime'] },
  { key: 'account', icon: '👤', items: ['resetPassword', 'deleteAccount', 'guestVsAccount'] },
] as const;

function FaqItem({ q, a }: { q: string; a: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 bg-white hover:bg-secondary transition-colors"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-gray-900 leading-snug">{q}</span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground shrink-0 mt-0.5 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      {open && (
        <div className="px-5 pb-4 pt-1 bg-white border-t border-border">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FaqAccordion() {
  const t = useTranslations('Faq');

  return (
    <div className="space-y-10">
      {GROUPS.map((group) => (
        <div key={group.key}>
          <h2 className="font-display text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>{group.icon}</span>
            {t(`groups.${group.key}`)}
          </h2>
          <div className="space-y-2">
            {group.items.map((itemKey) => (
              <FaqItem
                key={itemKey}
                q={t(`items.${itemKey}.q`)}
                a={
                  itemKey === 'orderStatuses' ? (
                    <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground list-none pl-0">
                      <li><span className="font-semibold text-foreground">{t('orderStatusList.pending.label')}</span> — {t('orderStatusList.pending.desc')}</li>
                      <li><span className="font-semibold text-foreground">{t('orderStatusList.processing.label')}</span> — {t('orderStatusList.processing.desc')}</li>
                      <li><span className="font-semibold text-foreground">{t('orderStatusList.shipped.label')}</span> — {t('orderStatusList.shipped.desc')}</li>
                      <li><span className="font-semibold text-foreground">{t('orderStatusList.delivered.label')}</span> — {t('orderStatusList.delivered.desc')}</li>
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(`items.${itemKey}.a`)}</p>
                  )
                }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
