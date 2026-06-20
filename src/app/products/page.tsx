import type { Metadata } from 'next';
import ProductCatalog from '@/components/products/ProductCatalog';

export const metadata: Metadata = {
  title: 'All Products',
  description:
    'Authentic Indonesian groceries shipped nationwide. Browse 366+ products — spices, instant noodles, sambal, coffee, snacks & more.',
};

export default function ProductsPage() {
  return (
    <div>
      {/* Page header */}
      <div className="bg-white border-b border-border py-10">
        <div className="container-wim">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">
            Our Store
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            All products
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Authentic Indonesian groceries, shipped nationwide.
          </p>
        </div>
      </div>

      <ProductCatalog />
    </div>
  );
}
