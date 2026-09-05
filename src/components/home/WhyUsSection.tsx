import { Truck, Shield, Star, Lock } from 'lucide-react';
import { useTranslations } from 'next-intl';

const FEATURE_ICONS = [Truck, Shield, Star, Lock] as const;
const FEATURE_KEYS = ['fastShipping', 'halal', 'authentic', 'securePayment'] as const;

export default function WhyUsSection() {
  const t = useTranslations('Home.WhyUs');

  return (
    <section className="py-16 bg-white">
      <div className="container-wim">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2 text-foreground">
            {t('heading')}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t('subheading')}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {FEATURE_KEYS.map((key, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <div
                key={key}
                className="rounded-2xl p-5 sm:p-6 border border-border bg-background hover:border-primary/40 transition-colors"
              >
                <div className="h-11 w-11 rounded-xl flex items-center justify-center mb-4 bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-sm sm:text-base mb-1.5 text-foreground">
                  {t(`features.${key}.title`)}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {t(`features.${key}.desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
