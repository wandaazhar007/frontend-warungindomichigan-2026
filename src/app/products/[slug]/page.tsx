'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Plus, Minus, ShoppingCart, Truck, Star, ChevronRight, Loader2 } from 'lucide-react';
import { getProductBySlug, getProducts } from '@/lib/api';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';

export default function ProductDetailPage() {
  const params = useParams();
  const slug   = params.slug as string;

  const [product, setProduct]           = useState<Product | null>(null);
  const [related, setRelated]           = useState<Product[]>([]);
  const [loading, setLoading]           = useState(true);
  const [activeImage, setActiveImage]   = useState(0);
  const [qty, setQty]                   = useState(1);

  const { items, addItem } = useCartStore();
  const cartItem = product ? items.find((i) => i.productId === product.id) : undefined;

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getProductBySlug(slug)
      .then((p) => {
        setProduct(p);
        return getProducts({ categorySlug: p.category.slug, limit: 5 });
      })
      .then((r) => setRelated(r.data.filter((p) => p.slug !== slug).slice(0, 4)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  function handleAddToCart() {
    if (!product || product.stock === 0) return;
    addItem({
      productId: product.id,
      name:      product.name,
      price:     parseFloat(product.price),
      comparePrice: product.comparePrice ? parseFloat(product.comparePrice) : null,
      unit:      product.unit,
      imageUrl:  product.images[0]?.url ?? null,
      slug:      product.slug,
      stock:     product.stock,
      quantity:  qty,
    });
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-primary/40 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-wim py-20 text-center">
        <span className="text-6xl mb-4 block">😕</span>
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
        <p className="text-gray-500 mb-6">This product may have been removed or the link is incorrect.</p>
        <Button asChild>
          <Link href="/products">Browse all products</Link>
        </Button>
      </div>
    );
  }

  const price        = parseFloat(product.price);
  const comparePrice = product.comparePrice ? parseFloat(product.comparePrice) : null;
  const isOutOfStock = product.stock === 0;
  const discountPct  = comparePrice && comparePrice > price
    ? Math.round((1 - price / comparePrice) * 100)
    : null;

  const images = product.images.length > 0
    ? product.images
    : [{ id: 'placeholder', url: '', altText: product.name, isPrimary: true, sortOrder: 0 }];

  return (
    <div className="bg-background min-h-screen">
      <div className="container-wim py-6 sm:py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 text-gray-300 shrink-0" />
          <Link href="/products" className="hover:text-primary transition-colors">All products</Link>
          <ChevronRight className="h-3 w-3 text-gray-300 shrink-0" />
          <Link href={`/products?category=${product.category.slug}`} className="hover:text-primary transition-colors">
            {product.category.name}
          </Link>
          <ChevronRight className="h-3 w-3 text-gray-300 shrink-0" />
          <span className="text-gray-700 font-medium line-clamp-1">{product.name}</span>
        </nav>

        {/* Back button */}
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">

          {/* Images */}
          <div>
            {/* Main image */}
            <div className="aspect-square rounded-2xl overflow-hidden product-img-bg mb-3 relative">
              {images[activeImage]?.url ? (
                <Image
                  src={images[activeImage].url}
                  alt={images[activeImage].altText ?? product.name}
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl opacity-60">{product.category.icon ?? '📦'}</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImage(idx)}
                    className={`h-16 w-16 rounded-xl overflow-hidden border-2 transition-colors product-img-bg relative ${
                      activeImage === idx ? 'border-primary' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {img.url && (
                      <Image
                        src={img.url}
                        alt={img.altText ?? product.name}
                        fill
                        className="object-contain p-1"
                        sizes="64px"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {/* Category badge */}
            <span className="inline-block text-xs font-bold text-primary uppercase tracking-widest bg-red-50 border border-red-100 px-3 py-1 rounded-full mb-3">
              {product.category.icon} {product.category.name}
            </span>

            {/* Name */}
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-3">
              {product.name}
            </h1>

            {/* Stars */}
            <div className="flex items-center gap-1.5 mb-4">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-gray-500">(4.9 / 5.0)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
              <span className="font-display text-3xl font-bold text-primary">
                {formatPrice(price)}
              </span>
              {comparePrice && comparePrice > price && (
                <>
                  <span className="text-lg text-gray-400 line-through">{formatPrice(comparePrice)}</span>
                  {discountPct && (
                    <span className="text-sm font-bold text-white bg-primary px-2 py-0.5 rounded-md">
                      -{discountPct}%
                    </span>
                  )}
                </>
              )}
              <span className="text-sm text-gray-500">/ {product.unit}</span>
            </div>

            {/* Stock info */}
            {isOutOfStock ? (
              <div className="bg-gray-100 text-gray-500 text-sm font-semibold px-4 py-2 rounded-xl inline-block mb-5">
                Out of stock
              </div>
            ) : product.stock <= product.minStock ? (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm font-semibold px-4 py-2 rounded-xl inline-block mb-5">
                ⚠️ Only {product.stock} left in stock
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm font-semibold px-4 py-2 rounded-xl inline-block mb-5">
                ✓ In stock
              </div>
            )}

            {/* Quantity selector */}
            {!isOutOfStock && (
              <div className="mb-5">
                <p className="text-sm font-semibold text-gray-700 mb-2">Quantity</p>
                <div className="flex items-center gap-2 bg-white rounded-xl border border-border p-1 w-fit">
                  <button
                    onClick={() => setQty((v) => Math.max(1, v - 1))}
                    className="h-8 w-8 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-10 text-center font-semibold text-gray-900">{qty}</span>
                  <button
                    onClick={() => setQty((v) => Math.min(product.stock, v + 1))}
                    className="h-8 w-8 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button
                size="lg"
                className="flex-1 font-semibold"
                disabled={isOutOfStock}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {cartItem ? 'Added to cart ✓' : `Add to cart — ${formatPrice(price * qty)}`}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 border-border"
                asChild
              >
                <Link href="/cart">View cart</Link>
              </Button>
            </div>

            {/* Free shipping note */}
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-white border border-border rounded-xl px-4 py-3">
              <Truck className="h-4 w-4 text-primary shrink-0" />
              <span>Free delivery on orders over <span className="font-semibold">$50</span> — ships nationwide</span>
            </div>

            {/* Description */}
            {product.description && (
              <div className="mt-8">
                <h3 className="font-display font-semibold text-gray-900 mb-3">About this product</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Details table */}
            <div className="mt-6 bg-white rounded-xl border border-border overflow-hidden">
              <h3 className="font-display font-semibold text-gray-900 px-4 py-3 border-b border-border text-sm">
                Details
              </h3>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-4 py-2.5 text-gray-500 w-2/5">Package</td>
                    <td className="px-4 py-2.5 text-gray-900 font-medium">{product.unit}</td>
                  </tr>
                  {product.weightGrams > 0 && (
                    <tr>
                      <td className="px-4 py-2.5 text-gray-500">Net Weight</td>
                      <td className="px-4 py-2.5 text-gray-900 font-medium">{product.weightGrams}g</td>
                    </tr>
                  )}
                  <tr>
                    <td className="px-4 py-2.5 text-gray-500">Country</td>
                    <td className="px-4 py-2.5 text-gray-900 font-medium">Indonesia 🇮🇩</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* You may also like */}
        {related.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900">
                You may also like
              </h2>
              <Link
                href={`/products?category=${product.category.slug}`}
                className="text-sm font-semibold text-primary hover:underline"
              >
                See all →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
