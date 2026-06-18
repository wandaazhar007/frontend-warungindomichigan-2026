'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Product, Category } from '@/types';
import { getProducts, getCategories } from '@/lib/api';
import ProductCard from './ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/lib/useDebounce';

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const debouncedSearch = useDebounce(search, 400);
  const LIMIT = 20;

  const fetchProducts = useCallback(
    async (p: number, reset = false) => {
      try {
        p === 1 ? setLoading(true) : setLoadingMore(true);
        const result = await getProducts({
          categorySlug: activeCategory || undefined,
          search: debouncedSearch || undefined,
          page: p,
          limit: LIMIT,
        });
        setProducts((prev) => (reset || p === 1 ? result.data : [...prev, ...result.data]));
        setTotal(result.meta.total);
        setHasMore(p < result.meta.totalPages);
      } catch {
        // keep existing state on error
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [activeCategory, debouncedSearch]
  );

  // Initial load + when filters change
  useEffect(() => {
    setPage(1);
    fetchProducts(1, true);
  }, [fetchProducts]);

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, []);

  function handleCategoryChange(slug: string) {
    setActiveCategory(slug);
    setSearch('');
    setPage(1);
  }

  function handleLoadMore() {
    const next = page + 1;
    setPage(next);
    fetchProducts(next);
  }

  function resultsLabel() {
    if (debouncedSearch)
      return `${total} produk ditemukan untuk "${debouncedSearch}"`;
    if (activeCategory) {
      const cat = categories.find((c) => c.slug === activeCategory);
      return `${total} produk dalam kategori ${cat?.name ?? activeCategory}`;
    }
    return `Menampilkan ${total} produk`;
  }

  return (
    <section className="py-16 bg-gray-50" id="produk">
      <div className="container-wim">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-sm font-semibold text-red-500 uppercase tracking-wider">
            Katalog Produk
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-700 text-gray-900 mt-2">
            Produk Kami
          </h2>
        </div>

        {/* Search */}
        <div className="relative max-w-lg mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <Input
            type="search"
            placeholder="Cari produk... (misal: indomie, sambal, kopi)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 flex-wrap justify-center mb-8">
          <button
            onClick={() => handleCategoryChange('')}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-medium transition-all border',
              activeCategory === ''
                ? 'bg-red-500 text-white border-red-500'
                : 'bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-500'
            )}
          >
            Semua Produk
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleCategoryChange(cat.slug)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium transition-all border',
                activeCategory === cat.slug
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-500'
              )}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Results info */}
        {!loading && (
          <p className="text-sm text-gray-500 text-center mb-6">{resultsLabel()}</p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 text-red-400 animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="font-display font-600 text-gray-900 text-lg mb-2">
              Produk tidak ditemukan
            </h3>
            <p className="text-gray-500 text-sm">
              Coba kata kunci lain atau pilih kategori berbeda.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-10 text-center">
                <Button
                  variant="outline"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : null}
                  Muat Lebih Banyak
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
