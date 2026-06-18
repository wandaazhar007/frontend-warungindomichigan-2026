'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Plus } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { items, addItem } = useCartStore();
  const inCart = items.find((i) => i.productId === product.id);

  const primaryImage = product.images.find((img) => img.isPrimary) ?? product.images[0];
  const price = parseFloat(product.price);
  const comparePrice = product.comparePrice ? parseFloat(product.comparePrice) : null;
  const isLowStock = product.stock <= product.minStock && product.stock > 0;
  const isOutOfStock = product.stock === 0;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    if (isOutOfStock) return;
    addItem({
      productId: product.id,
      name: product.name,
      price,
      comparePrice,
      unit: product.unit,
      imageUrl: primaryImage?.url ?? null,
      slug: product.slug,
      stock: product.stock,
    });
  }

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-red-200 hover:shadow-md transition-all duration-200">

        {/* Image */}
        <div className="relative aspect-square bg-red-50 overflow-hidden">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.altText ?? product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl">{product.category.icon ?? '📦'}</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isFeatured && (
              <Badge className="text-xs">⭐ Unggulan</Badge>
            )}
            {comparePrice && comparePrice > price && (
              <Badge variant="secondary" className="bg-orange-100 text-orange-600 border-orange-200 text-xs">
                Diskon
              </Badge>
            )}
            {isLowStock && !isOutOfStock && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 border-yellow-200 text-xs">
                Stok menipis
              </Badge>
            )}
            {isOutOfStock && (
              <Badge variant="secondary" className="bg-gray-100 text-gray-500 border-gray-200 text-xs">
                Stok habis
              </Badge>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="text-xs text-gray-400 mb-0.5">{product.category.name}</p>
          <h3 className="font-display font-600 text-gray-900 text-sm leading-snug line-clamp-2 mb-2">
            {product.name}
          </h3>

          <div className="flex items-center gap-1.5 mb-3">
            <span className="font-display font-700 text-red-500 text-base">
              {formatPrice(price)}
            </span>
            {comparePrice && comparePrice > price && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(comparePrice)}
              </span>
            )}
            <span className="text-xs text-gray-400">/ {product.unit}</span>
          </div>

          <Button
            size="sm"
            className="w-full"
            variant={inCart ? 'outline' : 'default'}
            disabled={isOutOfStock}
            onClick={handleAddToCart}
          >
            {inCart ? (
              <>
                <Plus className="h-3.5 w-3.5 mr-1.5" />
                + Tambah
              </>
            ) : (
              <>
                <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                Tambah ke Keranjang
              </>
            )}
          </Button>
        </div>
      </div>
    </Link>
  );
}
