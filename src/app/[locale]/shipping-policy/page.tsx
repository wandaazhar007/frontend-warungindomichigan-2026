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
  const t = await getTranslations('ShippingPolicy');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: 'https://warungindomi.com/shipping-policy' },
  };
}

export default async function ShippingPolicyPage() {
  const t = await getTranslations('ShippingPolicy');
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
      <ProseP>{t('s1.intro')}</ProseP>
      <ProseUl>
        <li>{t.rich('s1.usps', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
        <li>{t.rich('s1.ups', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
      </ProseUl>
      <ProseP>{t('s1.note')}</ProseP>

      <ProseDivider />

      <ProseH2>{t('s2.heading')}</ProseH2>
      <ProseP>{t.rich('s2.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</ProseP>
      <ProseUl>
        <li>{t.rich('s2.item1', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
        <li>{t('s2.item2')}</li>
        <li>{t('s2.item3')}</li>
      </ProseUl>

      <ProseDivider />

      <ProseH2>{t('s3.heading')}</ProseH2>
      <ProseP>{t('s3.intro')}</ProseP>
      <ProseUl>
        <li>{t.rich('s3.usps1', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
        <li>{t.rich('s3.usps2', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
        <li>{t.rich('s3.ups', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
      </ProseUl>
      <ProseP>{t('s3.note')}</ProseP>

      <ProseDivider />

      <ProseH2>{t('s4.heading')}</ProseH2>
      <ProseP>{t('s4.intro')}</ProseP>
      <ProseUl>
        {list('s4.list').map((item) => <li key={item}>{item}</li>)}
      </ProseUl>
      <ProseP>{t.rich('s4.note', { strong: (chunks) => <strong>{chunks}</strong> })}</ProseP>

      <ProseDivider />

      <ProseH2>{t('s5.heading')}</ProseH2>

      <ProseH3>{t('s5.usStatesHeading')}</ProseH3>
      <ProseP>{t('s5.usStatesBody')}</ProseP>

      <ProseH3>{t('s5.poBoxHeading')}</ProseH3>
      <ProseP>{t('s5.poBoxBody')}</ProseP>

      <ProseH3>{t('s5.internationalHeading')}</ProseH3>
      <ProseP>{t.rich('s5.internationalBody', { strong: (chunks) => <strong>{chunks}</strong> })}</ProseP>

      <ProseDivider />

      <ProseH2>{t('s6.heading')}</ProseH2>
      <ProseP>{t('s6.intro')}</ProseP>
      <ProseUl>
        {list('s6.list').map((item) => <li key={item}>{item}</li>)}
      </ProseUl>
      <ProseP>
        {t.rich('s6.orderHistoryNote', { link: (chunks) => <a href="/orders">{chunks}</a> })}
      </ProseP>
      <ProseP>{t('s6.delayNote')}</ProseP>

      <ProseDivider />

      <ProseH2>{t('s7.heading')}</ProseH2>

      <ProseH3>{t('s7.notDeliveredHeading')}</ProseH3>
      <ProseP>{t('s7.notDeliveredIntro')}</ProseP>
      <ProseUl>
        <li>{t('s7.notDeliveredStep1')}</li>
        <li>{t('s7.notDeliveredStep2')}</li>
        <li>{t('s7.notDeliveredStep3')}</li>
        <li>{t('s7.notDeliveredStep4')}</li>
        <li>{t.rich('s7.notDeliveredStep5', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
      </ProseUl>

      <ProseH3>{t('s7.damagedHeading')}</ProseH3>
      <ProseP>{t('s7.damagedIntro')}</ProseP>
      <ProseUl>
        <li>{t.rich('s7.damagedStep1', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
        <li>{t('s7.damagedStep2')}</li>
        <li>{t.rich('s7.damagedStep3', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
        <li>{t('s7.damagedStep4')}</li>
      </ProseUl>
      <ProseP>{t('s7.damagedNote')}</ProseP>

      <ProseDivider />

      <ProseH2>{t('s8.heading')}</ProseH2>
      <ProseP>{t('s8.body1')}</ProseP>
      <ProseP>{t('s8.body2')}</ProseP>
      <ProseUl>
        <li>{t('s8.chocolateNote')}</li>
        <li>{t('s8.storageNote')}</li>
      </ProseUl>

      <ProseContactBox />
    </LegalPageLayout>
  );
}
