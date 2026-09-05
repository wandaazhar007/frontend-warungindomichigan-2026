import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ProductCatalog from '@/components/products/ProductCatalog';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Products.Page');
  return { title: t('metaTitle'), description: t('metaDescription') };
}

export default async function ProductsPage() {
  const t = await getTranslations('Products.Page');

  return (
    <div>
      {/* Page header */}
      <div className="bg-white border-b border-border py-10">
        <div className="container-wim">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">
            {t('kicker')}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            {t('heading')}
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            {t('subheading')}
          </p>
        </div>
      </div>

      <ProductCatalog />
    </div>
  );
}
