'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Search, Loader2, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, Category } from '@/types';
import { getProducts, getCategories } from '@/lib/api';
import ProductCard from './ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/lib/useDebounce';

export default function ProductCatalog() {
  const [products, setProducts]         = useState<Product[]>([]);
  const [categories, setCategories]     = useState<Category[]>([]);
  const [total, setTotal]               = useState(0);
  const [loading, setLoading]           = useState(true);
  const [loadingMore, setLoadingMore]   = useState(false);

  const [search, setSearch]             = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [page, setPage]                 = useState(1);
  const [hasMore, setHasMore]           = useState(false);
  const [sortBy, setSortBy]             = useState('');

  const debouncedSearch = useDebounce(search, 400);
  const pillsRef = useRef<HTMLDivElement>(null);

  function scrollPills(dir: 'left' | 'right') {
    pillsRef.current?.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
  }
  const LIMIT = 24;

  const fetchProducts = useCallback(
    async (p: number, reset = false) => {
      try {
        p === 1 ? setLoading(true) : setLoadingMore(true);
        const result = await getProducts({
          categorySlug: activeCategory || undefined,
          search:       debouncedSearch || undefined,
          page:         p,
          limit:        LIMIT,
        });
        setProducts((prev) => (reset || p === 1 ? result.data : [...prev, ...result.data]));
        setTotal(result.meta.total);
        setHasMore(p < result.meta.totalPages);
      } catch {
        // keep state on error
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [activeCategory, debouncedSearch]
  );

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

  const sortedProducts = sortBy === 'price-asc'
    ? [...products].sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    : sortBy === 'price-desc'
    ? [...products].sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    : products;

  return (
    <section className="py-8 pb-16 bg-background" id="produk">
      <div className="container-wim">

        {/* Search bar */}
        <div className="relative max-w-2xl mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <Input
            type="search"
            placeholder="Search products (e.g. indomie, sambal, kopi...)"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setActiveCategory(''); }}
            className="pl-10 bg-white border-border h-11 text-sm"
          />
        </div>

        {/* Category pills */}
        <div className="relative flex items-center gap-2 mb-5">
          {/* Left arrow */}
          <button
            onClick={() => scrollPills('left')}
            aria-label="Scroll left"
            className="shrink-0 h-8 w-8 rounded-full border border-border bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Scrollable pills track */}
          <div
            ref={pillsRef}
            className="flex items-center gap-2 overflow-x-auto scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <button
              onClick={() => handleCategoryChange('')}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-semibold transition-all border whitespace-nowrap shrink-0',
                activeCategory === ''
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-600 border-border hover:border-primary hover:text-primary'
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryChange(cat.slug)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-sm font-semibold transition-all border whitespace-nowrap shrink-0',
                  activeCategory === cat.slug
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-600 border-border hover:border-primary hover:text-primary'
                )}
              >
                {cat.icon ? `${cat.icon} ` : ''}{cat.name}
              </button>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scrollPills('right')}
            aria-label="Scroll right"
            className="shrink-0 h-8 w-8 rounded-full border border-border bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Results bar */}
        {!loading && (
          <div className="flex items-center justify-between mb-6 gap-4">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-900">{total}</span> products
              {activeCategory && categories.find((c) => c.slug === activeCategory) && (
                <> in <span className="font-semibold">{categories.find((c) => c.slug === activeCategory)?.name}</span></>
              )}
              {debouncedSearch && (
                <> for &ldquo;<span className="font-semibold">{debouncedSearch}</span>&rdquo;</>
              )}
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <SlidersHorizontal className="h-4 w-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm text-gray-700 bg-white border border-border rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary"
              >
                <option value="">Sort by: popularity</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </div>
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 text-primary/40 animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="font-display font-semibold text-gray-900 text-lg mb-2">
              No products found
            </h3>
            <p className="text-gray-500 text-sm">
              Try a different keyword or browse another category.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-10 text-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="border-border text-gray-700 hover:border-primary hover:text-primary px-10"
                >
                  {loadingMore ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : null}
                  Load more products
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
