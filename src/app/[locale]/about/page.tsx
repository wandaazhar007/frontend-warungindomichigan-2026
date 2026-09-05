import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { MessageCircle, Facebook, MapPin, Package, Phone, Star, Truck, ShieldCheck } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('About');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: 'https://warungindomi.com/about' },
  };
}

const TRUST_ICONS = [Package, Truck, ShieldCheck, Star] as const;
const TRUST_KEYS = ['products', 'shipping', 'payments', 'community'] as const;

const CATEGORIES = [
  { icon: '🍜', name: 'Mie & Bubur', count: 16 },
  { icon: '☕', name: 'Minuman & Kopi', count: 24 },
  { icon: '🌶️', name: 'Sambal & Saus', count: 24 },
  { icon: '🧂', name: 'Bumbu & Rempah', count: 52 },
  { icon: '🍿', name: 'Snack & Kerupuk', count: 80 },
  { icon: '🎂', name: 'Bahan Kue & Masak', count: 25 },
  { icon: '🐟', name: 'Ikan Asin & Seafood', count: 25 },
  { icon: '🍡', name: 'Makanan Olahan & Kue', count: 32 },
  { icon: '💊', name: 'Obat & Kesehatan', count: 61 },
  { icon: '✨', name: 'Personal Care', count: 12 },
  { icon: '🥛', name: 'Susu & Dairy', count: 6 },
  { icon: '📦', name: 'Lain-lain', count: 9 },
];

export default async function AboutPage() {
  const t = await getTranslations('About');

  return (
    <div>
      {/* Page header */}
      <div className="bg-white border-b border-border py-10">
        <div className="container-wim">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{t('kicker')}</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            {t('heading')}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
            {t('subheading')}
          </p>
        </div>
      </div>

      <div className="container-wim py-12">
        <div className="max-w-4xl">

          {/* Our Story */}
          <section className="mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{t('ourStory.kicker')}</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-5 leading-tight">
              {t('ourStory.heading')}
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>{t('ourStory.paragraph1')}</p>
              <p>{t.rich('ourStory.paragraph2', { location: (chunks) => <strong>{chunks}</strong> })}</p>
              <p>{t('ourStory.paragraph3')}</p>
            </div>
          </section>

          {/* Why Trust Us */}
          <section className="mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{t('whyChooseUs.kicker')}</p>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
              {t('whyChooseUs.heading')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {TRUST_KEYS.map((key, i) => {
                const Icon = TRUST_ICONS[i];
                return (
                  <div
                    key={key}
                    className="rounded-xl border border-border bg-white p-5 flex gap-4"
                  >
                    <div className="h-10 w-10 rounded-lg bg-[var(--secondary)] flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-gray-900 text-sm mb-1">{t(`whyChooseUs.points.${key}.title`)}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{t(`whyChooseUs.points.${key}.desc`)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* What We Sell */}
          <section className="mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
              {t('ourProducts.kicker')}
            </p>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">
              {t('ourProducts.heading')}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {t('ourProducts.description')}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {CATEGORIES.map(({ icon, name, count }) => (
                <div
                  key={name}
                  className="rounded-xl border border-border bg-white p-4 flex items-center gap-3"
                >
                  <span className="text-2xl">{icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-900 leading-snug truncate">
                      {name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{t('productsCount', { count })}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Location */}
          <section className="mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{t('location.kicker')}</p>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-5">{t('location.heading')}</h2>
            <div className="rounded-xl border border-border bg-white overflow-hidden">
              {/* Address info */}
              <div className="p-6 flex gap-4">
                <div className="h-10 w-10 rounded-lg bg-[var(--secondary)] flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">Warung IndoMi</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    28130 Park Ct<br />
                    Madison Heights, MI 48071<br />
                    {t('location.unitedStates')}
                  </p>
                  <p className="text-xs text-muted-foreground mt-3">
                    {t('location.description')}
                  </p>
                </div>
              </div>
              {/* Embed map */}
              <div className="border-t border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.711521957843!2d-83.09339298792929!3d42.49835017106019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824cff7ecab89f3%3A0x8b977f50f6518174!2s28130%20Park%20Ct%2C%20Madison%20Heights%2C%20MI%2048071!5e1!3m2!1sen!2sus!4v1781940774978!5m2!1sen!2sus"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Warung IndoMi location"
                />
              </div>
            </div>
          </section>

          {/* Contact */}
          <section>
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
              {t('contact.kicker')}
            </p>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-5">
              {t('contact.heading')}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {t('contact.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/16264614963"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white text-sm font-semibold px-5 py-3 hover:bg-primary/90 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                {t('contact.chatWhatsapp')}
              </a>
              <a
                href="tel:+16264614963"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white text-sm font-semibold px-5 py-3 text-gray-900 hover:bg-secondary transition-colors"
              >
                <Phone className="h-4 w-4" />
                {t('contact.callUs')} +1 (626) 461-4963
              </a>
              <a
                href="https://www.facebook.com/levi.chen.11503/reels/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white text-sm font-semibold px-5 py-3 text-gray-900 hover:bg-secondary transition-colors"
              >
                <Facebook className="h-4 w-4" />
                {t('contact.followFacebook')}
              </a>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/30 bg-[var(--secondary)] text-sm font-semibold px-5 py-3 text-primary hover:bg-primary hover:text-white transition-colors"
              >
                {t('contact.browseProducts')}
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
