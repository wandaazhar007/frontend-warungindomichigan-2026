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
  const t = await getTranslations('ReturnPolicy');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: 'https://warungindomi.com/return-policy' },
  };
}

export default async function ReturnPolicyPage() {
  const t = await getTranslations('ReturnPolicy');
  const list = (key: string) => t.raw(key) as string[];

  return (
    <LegalPageLayout
      label={t('label')}
      title={t('title')}
      subtitle={t('subtitle')}
      lastUpdated={t('lastUpdated')}
    >
      <ProseH2>{t('s1.heading')}</ProseH2>
      <ProseP>{t('s1.body1')}</ProseP>
      <ProseP>{t.rich('s1.body2', { strong: (chunks) => <strong>{chunks}</strong> })}</ProseP>

      <ProseDivider />

      <ProseH2>{t('s2.heading')}</ProseH2>
      <ProseP>{t.rich('s2.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</ProseP>
      <ProseUl>
        {list('s2.list').map((item) => <li key={item}>{item}</li>)}
      </ProseUl>
      <ProseP>{t('s2.note')}</ProseP>

      <ProseDivider />

      <ProseH2>{t('s3.heading')}</ProseH2>
      <ProseP>{t.rich('s3.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</ProseP>

      <ProseH3>{t('s3.case1Heading')}</ProseH3>
      <ProseP>{t('s3.case1Intro')}</ProseP>
      <ProseUl>
        {list('s3.case1List').map((item) => <li key={item}>{item}</li>)}
      </ProseUl>

      <ProseH3>{t('s3.case2Heading')}</ProseH3>
      <ProseP>{t('s3.case2Body')}</ProseP>

      <ProseH3>{t('s3.case3Heading')}</ProseH3>
      <ProseP>{t('s3.case3Body')}</ProseP>

      <ProseH3>{t('s3.case4Heading')}</ProseH3>
      <ProseP>{t('s3.case4Body')}</ProseP>

      <ProseDivider />

      <ProseH2>{t('s4.heading')}</ProseH2>
      <ProseP>{t('s4.intro')}</ProseP>
      <ProseUl>
        <li><strong>{t('s4.step1Label')}</strong> {t('s4.step1Body')}</li>
        <li>
          <strong>{t('s4.step2Label')}</strong> {t('s4.step2BodyBefore')}{' '}
          <a href="https://wa.me/16264614963" target="_blank" rel="noopener noreferrer">+1 (626) 461-4963</a>{' '}
          {t('s4.step2BodyAfter')}
        </li>
        <li><strong>{t('s4.step3Label')}</strong> {t('s4.step3Body')}</li>
        <li><strong>{t('s4.step4Label')}</strong> {t('s4.step4Body')}</li>
      </ProseUl>

      <ProseDivider />

      <ProseH2>{t('s5.heading')}</ProseH2>
      <ProseP>{t.rich('s5.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</ProseP>
      <ProseUl>
        {list('s5.list').map((item) => <li key={item}>{item}</li>)}
      </ProseUl>
      <ProseP>{t('s5.note')}</ProseP>

      <ProseDivider />

      <ProseH2>{t('s6.heading')}</ProseH2>
      <ProseP>{t.rich('s6.intro', { strong: (chunks) => <strong>{chunks}</strong> })}</ProseP>
      <ProseUl>
        <li>{t.rich('s6.pendingItem', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
        <li>{t.rich('s6.shippedItem', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
      </ProseUl>

      <ProseDivider />

      <ProseH2>{t('s7.heading')}</ProseH2>
      <ProseP>{t('s7.intro')}</ProseP>
      <ProseUl>
        {list('s7.list').map((item) => <li key={item}>{item}</li>)}
      </ProseUl>

      <ProseContactBox />
    </LegalPageLayout>
  );
}
