import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import LegalPageLayout, {
  ProseH2,
  ProseH3,
  ProseP,
  ProseUl,
  ProseDivider,
  ProseContactBox,
} from '@/components/layout/LegalPageLayout';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('PrivacyPolicy');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: 'https://warungindomi.com/privacy-policy' },
  };
}

export default async function PrivacyPolicyPage() {
  const t = await getTranslations('PrivacyPolicy');
  const list = (key: string) => t.raw(key) as string[];

  return (
    <LegalPageLayout
      label={t('label')}
      title={t('title')}
      subtitle={t('subtitle')}
      lastUpdated={t('lastUpdated')}
    >
      <ProseP>{t('intro')}</ProseP>

      <ProseH2>{t('s1.heading')}</ProseH2>

      <ProseH3>{t('s1.directInfoHeading')}</ProseH3>
      <ProseP>{t('s1.directInfoIntro')}</ProseP>
      <ProseUl>
        {list('s1.directInfoList').map((item) => <li key={item}>{item}</li>)}
      </ProseUl>

      <ProseH3>{t('s1.paymentInfoHeading')}</ProseH3>
      <ProseP>
        {t.rich('s1.paymentInfoBody', {
          strong: (chunks) => <strong>{chunks}</strong>,
          link: (chunks) => (
            <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">{chunks}</a>
          ),
        })}
      </ProseP>

      <ProseH3>{t('s1.autoInfoHeading')}</ProseH3>
      <ProseP>{t('s1.autoInfoIntro')}</ProseP>
      <ProseUl>
        {list('s1.autoInfoList').map((item) => <li key={item}>{item}</li>)}
      </ProseUl>

      <ProseDivider />

      <ProseH2>{t('s2.heading')}</ProseH2>
      <ProseP>{t('s2.intro')}</ProseP>
      <ProseUl>
        {list('s2.list').map((item) => <li key={item}>{item}</li>)}
      </ProseUl>
      <ProseP>{t('s2.noSell')}</ProseP>

      <ProseDivider />

      <ProseH2>{t('s3.heading')}</ProseH2>
      <ProseP>{t('s3.intro')}</ProseP>
      <ProseUl>
        <li>
          <strong>Firebase (Google)</strong> — {t('s3.firebase')}{' '}
          <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">
            {t('s3.firebaseLink')}
          </a>
        </li>
        <li>
          <strong>Stripe</strong> — {t('s3.stripe')}{' '}
          <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">
            {t('s3.stripeLink')}
          </a>
        </li>
        <li>
          <strong>Shippo</strong> — {t('s3.shippo')}{' '}
          <a href="https://goshippo.com/privacy/" target="_blank" rel="noopener noreferrer">
            {t('s3.shippoLink')}
          </a>
        </li>
        <li>
          <strong>Resend</strong> — {t('s3.resend')}{' '}
          <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
            {t('s3.resendLink')}
          </a>
        </li>
        <li>
          <strong>Cloudinary</strong> — {t('s3.cloudinary')}{' '}
          <a href="https://cloudinary.com/privacy" target="_blank" rel="noopener noreferrer">
            {t('s3.cloudinaryLink')}
          </a>
        </li>
        <li>
          <strong>Supabase (PostgreSQL)</strong> — {t('s3.supabase')}{' '}
          <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">
            {t('s3.supabaseLink')}
          </a>
        </li>
      </ProseUl>

      <ProseDivider />

      <ProseH2>{t('s4.heading')}</ProseH2>
      <ProseP>{t('s4.intro')}</ProseP>
      <ProseUl>
        <li><strong>{t('s4.authCookieLabel')}</strong> — {t('s4.authCookieDesc')}</li>
        <li><strong>{t('s4.cartCookieLabel')}</strong> — {t('s4.cartCookieDesc')}</li>
      </ProseUl>
      <ProseP>{t('s4.noThirdParty')}</ProseP>

      <ProseDivider />

      <ProseH2>{t('s5.heading')}</ProseH2>
      <ProseUl>
        <li><strong>{t('s5.orderRecordsLabel')}</strong> — {t('s5.orderRecordsDesc')}</li>
        <li><strong>{t('s5.accountDataLabel')}</strong> — {t('s5.accountDataDesc')}</li>
        <li><strong>{t('s5.guestDataLabel')}</strong> — {t('s5.guestDataDesc')}</li>
      </ProseUl>
      <ProseP>{t('s5.deleteRequest')}</ProseP>

      <ProseDivider />

      <ProseH2>{t('s6.heading')}</ProseH2>
      <ProseP>{t('s6.intro')}</ProseP>
      <ProseUl>
        <li><strong>{t('s6.rightToKnowLabel')}</strong> — {t('s6.rightToKnowDesc')}</li>
        <li><strong>{t('s6.rightToDeleteLabel')}</strong> — {t('s6.rightToDeleteDesc')}</li>
        <li><strong>{t('s6.rightToOptOutLabel')}</strong> — {t('s6.rightToOptOutDesc')}</li>
        <li><strong>{t('s6.rightToNonDiscriminationLabel')}</strong> — {t('s6.rightToNonDiscriminationDesc')}</li>
      </ProseUl>
      <ProseP>{t('s6.exerciseRights')}</ProseP>

      <ProseDivider />

      <ProseH2>{t('s7.heading')}</ProseH2>
      <ProseP>{t('s7.body')}</ProseP>

      <ProseDivider />

      <ProseH2>{t('s8.heading')}</ProseH2>
      <ProseP>{t('s8.intro')}</ProseP>
      <ProseUl>
        {list('s8.list').map((item) => <li key={item}>{item}</li>)}
      </ProseUl>
      <ProseP>{t('s8.noGuarantee')}</ProseP>

      <ProseDivider />

      <ProseH2>{t('s9.heading')}</ProseH2>
      <ProseP>{t('s9.body')}</ProseP>

      <ProseContactBox />
    </LegalPageLayout>
  );
}
