import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import LegalPageLayout, {
  ProseH2,
  ProseP,
  ProseUl,
  ProseDivider,
  ProseContactBox,
} from '@/components/layout/LegalPageLayout';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Terms');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: 'https://warungindomi.com/terms' },
  };
}

export default async function TermsPage() {
  const t = await getTranslations('Terms');
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
      <ProseP>{t('s1.body')}</ProseP>
      <ProseP>{t('s1.contact')}</ProseP>

      <ProseDivider />

      <ProseH2>{t('s2.heading')}</ProseH2>
      <ProseP>{t('s2.body')}</ProseP>

      <ProseDivider />

      <ProseH2>{t('s3.heading')}</ProseH2>
      <ProseP>{t('s3.intro')}</ProseP>
      <ProseUl>
        {list('s3.list').map((item) => <li key={item}>{item}</li>)}
      </ProseUl>

      <ProseDivider />

      <ProseH2>{t('s4.heading')}</ProseH2>
      <ProseUl>
        {list('s4.list').map((item) => <li key={item}>{item}</li>)}
      </ProseUl>

      <ProseDivider />

      <ProseH2>{t('s5.heading')}</ProseH2>
      <ProseP>{t('s5.intro')}</ProseP>
      <ProseUl>
        {list('s5.list').map((item) => <li key={item}>{item}</li>)}
      </ProseUl>

      <ProseDivider />

      <ProseH2>{t('s6.heading')}</ProseH2>
      <ProseUl>
        {list('s6.list').map((item) => <li key={item}>{item}</li>)}
      </ProseUl>

      <ProseDivider />

      <ProseH2>{t('s7.heading')}</ProseH2>
      <ProseP>
        {t.rich('s7.body1', {
          link: (chunks) => <a href="/shipping-policy">{chunks}</a>,
        })}
      </ProseP>
      <ProseP>{t('s7.body2')}</ProseP>

      <ProseDivider />

      <ProseH2>{t('s8.heading')}</ProseH2>
      <ProseP>
        {t.rich('s8.body', {
          link: (chunks) => <a href="/return-policy">{chunks}</a>,
        })}
      </ProseP>

      <ProseDivider />

      <ProseH2>{t('s9.heading')}</ProseH2>
      <ProseP>{t('s9.intro')}</ProseP>
      <ProseUl>
        {list('s9.list').map((item) => <li key={item}>{item}</li>)}
      </ProseUl>

      <ProseDivider />

      <ProseH2>{t('s10.heading')}</ProseH2>
      <ProseP>{t('s10.intro')}</ProseP>
      <ProseUl>
        {list('s10.list').map((item) => <li key={item}>{item}</li>)}
      </ProseUl>

      <ProseDivider />

      <ProseH2>{t('s11.heading')}</ProseH2>
      <ProseP>{t('s11.body1')}</ProseP>
      <ProseP>{t('s11.body2')}</ProseP>

      <ProseDivider />

      <ProseH2>{t('s12.heading')}</ProseH2>
      <ProseP>{t('s12.body1')}</ProseP>
      <ProseP>{t('s12.body2')}</ProseP>

      <ProseDivider />

      <ProseH2>{t('s13.heading')}</ProseH2>
      <ProseP>{t('s13.body1')}</ProseP>
      <ProseP>{t('s13.body2')}</ProseP>

      <ProseDivider />

      <ProseH2>{t('s14.heading')}</ProseH2>
      <ProseP>{t('s14.body')}</ProseP>

      <ProseDivider />

      <ProseH2>{t('s15.heading')}</ProseH2>
      <ProseP>{t('s15.body')}</ProseP>

      <ProseContactBox />
    </LegalPageLayout>
  );
}
