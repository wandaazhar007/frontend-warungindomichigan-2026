'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Tag, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/utils';

const FREE_SHIPPING_THRESHOLD = 50;

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCartStore();
  const [confirmClear, setConfirmClear] = useState(false);
  const [promoCode, setPromoCode]       = useState('');

  const sub              = subtotal();
  const shippingFree     = sub >= FREE_SHIPPING_THRESHOLD;
  const shippingProgress = Math.min(100, (sub / FREE_SHIPPING_THRESHOLD) * 100);
  const remaining        = FREE_SHIPPING_THRESHOLD - sub;

  if (items.length === 0) {
    return (
      <div className="bg-background min-h-[calc(100vh-12rem)]">
        <div className="container-wim py-20 text-center">
          <span className="text-7xl mb-6 block">🛒</span>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-8">Add your favorite Indonesian products to get started!</p>
          <Button size="lg" asChild>
            <Link href="/products" className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 shrink-0" />
              Start Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container-wim py-8 sm:py-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
              Shopping cart
              <span className="ml-2 text-lg text-gray-400 font-medium">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Review your order — almost ready to taste home.
            </p>
          </div>
          <button
            onClick={() => setConfirmClear(true)}
            className="hidden sm:block text-xs text-gray-400 hover:text-red-600 transition-colors"
          >
            Clear cart
          </button>
        </div>

        {/* Free shipping progress bar */}
        <div className="bg-white rounded-xl border border-border p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="h-4 w-4 text-primary shrink-0" />
            {shippingFree ? (
              <p className="text-sm font-semibold text-green-700">
                🎉 You&apos;re eligible for free shipping!
              </p>
            ) : (
              <p className="text-sm text-gray-700">
                Add <span className="font-bold text-primary">{formatPrice(remaining)}</span> more for free shipping
              </p>
            )}
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* Cart items */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex gap-3 sm:gap-4 bg-white rounded-xl border border-border p-3 sm:p-4"
              >
                {/* Image */}
                <Link
                  href={`/products/${item.slug}`}
                  className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-xl product-img-bg overflow-hidden shrink-0"
                >
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                      sizes="96px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-2xl">📦</div>
                  )}
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5 hidden sm:block">
                        {item.unit}
                      </p>
                      <Link href={`/products/${item.slug}`}>
                        <h3 className="font-display font-semibold text-gray-900 text-sm leading-snug line-clamp-2 hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-gray-500 mt-0.5">{item.unit}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-gray-300 hover:text-red-500 transition-colors ml-1 shrink-0"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty buttons */}
                    <div className="flex items-center gap-0.5 bg-gray-50 rounded-xl border border-border p-0.5">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="h-7 w-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-primary hover:bg-red-50 transition-colors"
                        aria-label="Decrease"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className="h-7 w-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-primary hover:bg-red-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        aria-label="Increase"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Line total */}
                    <span className="font-display font-bold text-gray-900 text-sm">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-border overflow-hidden">
              <div className="p-5 sm:p-6">
                <h2 className="font-display font-bold text-gray-900 text-lg mb-5">
                  Order summary
                </h2>

                {/* Promo code */}
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Promo code
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                      <Input
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="pl-8 bg-background border-border h-9 text-sm"
                      />
                    </div>
                    <Button size="sm" variant="outline" className="border-border text-gray-700 hover:border-primary h-9">
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Totals */}
                <div className="space-y-3 mb-5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal ({items.length} items)</span>
                    <span className="font-semibold text-gray-900">{formatPrice(sub)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    {shippingFree ? (
                      <span className="font-semibold text-green-600">FREE</span>
                    ) : (
                      <span className="text-gray-400">Calculated at checkout</span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tax</span>
                    <span className="text-gray-400">Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-5">
                  <div className="flex justify-between">
                    <span className="font-display font-bold text-gray-900">Total</span>
                    <span className="font-display font-bold text-primary text-xl">{formatPrice(sub)}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Tax + shipping added at checkout</p>
                </div>

                <Button size="lg" className="w-full font-semibold" asChild>
                  <Link href="/checkout" className="flex items-center justify-center gap-2">
                    Proceed to checkout
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </Link>
                </Button>

                <div className="flex items-center justify-center gap-1.5 mt-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-green-500 shrink-0" />
                  <p className="text-xs text-gray-400">Secure checkout powered by Stripe</p>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2 text-gray-500 hover:text-primary"
                  asChild
                >
                  <Link href="/products">Continue shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile clear cart */}
        <div className="sm:hidden mt-4 text-center">
          <button
            onClick={() => setConfirmClear(true)}
            className="text-xs text-gray-400 hover:text-red-600"
          >
            Clear all items
          </button>
        </div>
      </div>

      {/* Confirm clear modal */}
      {confirmClear && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl border border-border">
            <h3 className="font-display font-bold text-gray-900 text-lg mb-2">
              Clear your cart?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              All items in your cart will be removed. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-border"
                onClick={() => setConfirmClear(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => { clearCart(); setConfirmClear(false); }}
              >
                Yes, clear cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
