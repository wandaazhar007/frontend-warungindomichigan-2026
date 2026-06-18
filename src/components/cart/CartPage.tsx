'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCartStore();
  const [confirmClear, setConfirmClear] = useState(false);

  if (items.length === 0) {
    return (
      <div className="container-wim py-20 text-center">
        <span className="text-7xl mb-6 block">🛒</span>
        <h2 className="font-display text-2xl font-700 text-gray-900 mb-2">
          Keranjang Kamu Masih Kosong
        </h2>
        <p className="text-gray-500 mb-8">Yuk tambahkan produk Indonesia favoritmu!</p>
        <Button size="lg" asChild>
          <Link href="/products">
            <ShoppingBag className="h-5 w-5 mr-2" />
            Mulai Belanja
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-wim py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-700 text-gray-900">
          Keranjang Belanja
        </h1>
        <button
          onClick={() => setConfirmClear(true)}
          className="text-sm text-gray-400 hover:text-red-500 transition-colors"
        >
          Kosongkan keranjang
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Items list */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex gap-4 bg-white rounded-xl border border-gray-100 p-4"
            >
              {/* Image */}
              <div className="relative h-20 w-20 rounded-lg bg-red-50 overflow-hidden shrink-0">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-2xl">
                    📦
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-600 text-gray-900 text-sm leading-snug mb-1 line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-red-500 font-700 text-sm mb-3">
                  {formatPrice(item.price)}{' '}
                  <span className="text-gray-400 font-400">/ {item.unit}</span>
                </p>

                {/* Quantity + remove */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 bg-gray-50 rounded-lg border border-gray-200 p-0.5">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="h-7 w-7 rounded flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"
                      aria-label="Kurangi"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-600 text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      className="h-7 w-7 rounded flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      aria-label="Tambah"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-display font-700 text-gray-900 text-sm">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                      aria-label="Hapus"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="font-display font-700 text-gray-900 text-lg mb-5">
              Ringkasan Pesanan
            </h2>

            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-600 text-gray-900">{formatPrice(subtotal())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Ongkos Kirim</span>
                <span className="text-gray-400">Dihitung di checkout</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 mb-5 leading-relaxed">
              Ongkos kirim dihitung di halaman checkout
            </p>

            <Button size="lg" className="w-full" asChild>
              <Link href="/checkout">
                Lanjut ke Checkout
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>

            <Button variant="ghost" size="sm" className="w-full mt-2 text-gray-500" asChild>
              <Link href="/products">Lanjut Belanja</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Confirm clear modal */}
      {confirmClear && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-display font-700 text-gray-900 text-lg mb-2">
              Kosongkan Keranjang?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Semua item yang sudah kamu pilih akan dihapus dari keranjang. Tindakan ini tidak bisa dibatalkan.
            </p>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setConfirmClear(false)}
              >
                Batal
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => { clearCart(); setConfirmClear(false); }}
              >
                Ya, Kosongkan
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
