import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import RegisterForm from '@/components/auth/RegisterForm';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Auth.Register');
  return { title: t('metaTitle') };
}

export default async function RegisterPage() {
  const t = await getTranslations('Auth.Register');
  const trustBadges = [t('badges.halal'), t('badges.nationwide'), t('badges.authentic')];

  return (
    <div className="min-h-[calc(100vh-7rem)] grid grid-cols-1 lg:grid-cols-2">

      {/* Left panel — brand */}
      <div className="hidden lg:flex flex-col justify-between p-10 xl:p-14 relative overflow-hidden bg-wim-red-dark">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.5) 1px, transparent 0)`,
            backgroundSize: '28px 28px',
          }}
        />

        {/* Top: logo */}
        <div className="relative flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-lg bg-white/20 flex items-center justify-center">
            <span className="text-white font-display font-bold text-xl leading-none">W</span>
          </div>
          <div>
            <p className="font-display font-semibold text-white text-sm leading-none">Warung IndoMi</p>
            <p className="text-[11px] text-white/60 mt-0.5">Michigan</p>
          </div>
        </div>

        {/* Middle: headline */}
        <div className="relative">
          <div className="inline-flex items-center gap-1.5 bg-yellow-400/20 text-yellow-200 text-xs font-bold px-3 py-1.5 rounded-full mb-5 border border-yellow-400/30 uppercase tracking-widest">
            🎉 {t('joinBadge')}
          </div>
          <h2 className="font-display text-3xl xl:text-4xl font-bold text-white leading-tight mb-4">
            {t('headingLine1')}<br />{t('headingLine2')}
          </h2>
          <p className="text-white/70 text-sm leading-relaxed max-w-xs">
            {t('description')}
          </p>
        </div>

        {/* Bottom: trust badges */}
        <div className="relative flex flex-wrap gap-2">
          {trustBadges.map((badge) => (
            <span
              key={badge}
              className="bg-white/10 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex items-center justify-center bg-background p-6 sm:p-10">
        <div className="w-full max-w-md">

          {/* Tabs */}
          <div className="flex border border-border rounded-xl overflow-hidden mb-8">
            <Link
              href="/login"
              className="flex-1 text-gray-500 hover:text-gray-700 text-sm font-semibold text-center py-3 hover:bg-gray-50 transition-colors"
            >
              {t('tabSignIn')}
            </Link>
            <div className="flex-1 bg-primary text-white text-sm font-semibold text-center py-3">
              {t('tabSignUp')}
            </div>
          </div>

          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold text-gray-900">{t('title')}</h1>
            <p className="text-sm text-gray-500 mt-1">{t('subtitle')}</p>
          </div>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
