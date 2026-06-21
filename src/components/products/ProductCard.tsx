'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus, Minus } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { items, addItem, updateQuantity } = useCartStore();
  const inCart = items.find((i) => i.productId === product.id);
  const qty    = inCart?.quantity ?? 0;

  const primaryImage = product.images.find((img) => img.isPrimary) ?? product.images[0];
  const price        = parseFloat(product.price);
  const comparePrice = product.comparePrice ? parseFloat(product.comparePrice) : null;
  const isOutOfStock = product.stock === 0;

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    if (isOutOfStock) return;
    addItem({
      productId: product.id,
      name:      product.name,
      price,
      comparePrice,
      unit:      product.unit,
      imageUrl:  primaryImage?.url ?? null,
      slug:      product.slug,
      stock:     product.stock,
    });
  }

  function handleRemove(e: React.MouseEvent) {
    e.preventDefault();
    updateQuantity(product.id, qty - 1);
  }

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="bg-white rounded-xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-sm transition-all duration-200">

        {/* Image area */}
        <div className="relative aspect-square product-img-bg overflow-hidden">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.altText ?? product.name}
              fill
              className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl opacity-70">{product.category.icon ?? '📦'}</span>
            </div>
          )}

          {/* Out of stock overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <span className="text-xs font-semibold text-gray-500 bg-white/90 px-2 py-1 rounded-full border border-gray-200">
                Out of stock
              </span>
            </div>
          )}

          {/* Discount badge */}
          {comparePrice && comparePrice > price && (
            <div className="absolute top-2 left-2">
              <span className="text-[10px] font-bold bg-primary text-white px-1.5 py-0.5 rounded-md">
                SALE
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
            {product.category.name}
          </p>
          <h3 className="font-display font-semibold text-gray-900 text-xs sm:text-sm leading-snug line-clamp-2 mb-2">
            {product.name}
          </h3>
          <p className="text-[11px] text-gray-400 mb-2">
            {product.unit}
          </p>

          {/* Price + add/quantity controls */}
          <div className="flex items-center justify-between gap-1">
            <div>
              <span className="font-display font-bold text-primary text-sm">
                {formatPrice(price)}
              </span>
              {comparePrice && comparePrice > price && (
                <span className="text-[10px] text-gray-400 line-through ml-1">
                  {formatPrice(comparePrice)}
                </span>
              )}
            </div>

            {qty > 0 ? (
              <div className="flex items-center gap-1" onClick={(e) => e.preventDefault()}>
                <button
                  onClick={handleRemove}
                  aria-label="Remove one"
                  className="h-7 w-7 rounded-lg bg-primary hover:bg-red-600 text-white flex items-center justify-center transition-colors shrink-0"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="text-sm font-bold text-gray-900 w-5 text-center leading-none">
                  {qty}
                </span>
                <button
                  onClick={handleAdd}
                  disabled={qty >= product.stock}
                  aria-label="Add one"
                  className="h-7 w-7 rounded-lg bg-primary hover:bg-red-600 text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                disabled={isOutOfStock}
                aria-label="Add to cart"
                className="h-7 w-7 rounded-lg bg-primary hover:bg-red-600 text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
