import type { Metadata } from 'next';
import ProductCatalog from '@/components/products/ProductCatalog';

export const metadata: Metadata = {
  title: 'Semua Produk',
  description: 'Temukan 366+ produk Indonesia favoritmu. Dari mie instan, bumbu rempah, sambal, kopi, hingga produk kesehatan — semua tersedia di Warung Indo Michigan.',
};

export default function ProductsPage() {
  return (
    <div>
      <div className="bg-gradient-to-b from-red-50 to-white py-12">
        <div className="container-wim text-center">
          <h1 className="font-display text-3xl sm:text-4xl font-700 text-gray-900 mb-2">
            Semua Produk
          </h1>
          <p className="text-gray-500">Temukan 366+ produk Indonesia favoritmu</p>
        </div>
      </div>
      <ProductCatalog />
    </div>
  );
}
