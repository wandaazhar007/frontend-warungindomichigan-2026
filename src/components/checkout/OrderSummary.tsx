'use client';

import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';
import { formatPrice } from '@/lib/utils';

export default function OrderSummary() {
  const items     = useCartStore((s) => s.items);
  const subtotal  = useCartStore((s) => s.subtotal());
  const breakdown = useCheckoutStore((s) => s.breakdown);
  const rate      = useCheckoutStore((s) => s.selectedRate);

  const shippingCost = breakdown?.shippingCost ?? (rate ? parseFloat(rate.amount) : null);
  const total        = breakdown?.total ?? (shippingCost != null ? subtotal + shippingCost : null);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-24">
      <h2 className="font-display font-700 text-gray-900 mb-4">Ringkasan Pesanan</h2>

      {/* Items */}
      <ul className="space-y-3 mb-4">
        {items.map((item) => (
          <li key={item.productId} className="flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-lg bg-red-50 overflow-hidden shrink-0">
              {item.imageUrl ? (
                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="48px" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-lg">📦</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-800 font-medium line-clamp-1">{item.name}</p>
              <p className="text-xs text-gray-400">{item.quantity} × {formatPrice(item.price)}</p>
            </div>
            <span className="text-sm font-600 text-gray-900 shrink-0">
              {formatPrice(item.price * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <div className="border-t border-gray-100 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Ongkos Kirim</span>
          {shippingCost != null ? (
            <span className="font-medium">{formatPrice(shippingCost)}</span>
          ) : (
            <span className="text-gray-400 text-xs">Dihitung di step berikutnya</span>
          )}
        </div>

        {breakdown?.tax != null && breakdown.tax > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Pajak</span>
            <span className="font-medium">{formatPrice(breakdown.tax)}</span>
          </div>
        )}

        {total != null && (
          <div className="flex justify-between font-700 text-base pt-2 border-t border-gray-100">
            <span className="text-gray-900">Total</span>
            <span className="text-red-500">{formatPrice(total)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
