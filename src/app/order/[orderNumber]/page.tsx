'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle2, Clock, Package, Truck, MapPin,
  CreditCard, ExternalLink, Loader2, AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import api from '@/lib/api';
import { OrderDetail, OrderStatus, PaymentStatus } from '@/types/order';

// ── Status helpers ────────────────────────────────────────────────────────────

function orderStatusLabel(s: OrderStatus): string {
  const map: Record<OrderStatus, string> = {
    PENDING:    'Menunggu Pembayaran',
    CONFIRMED:  'Pembayaran Dikonfirmasi',
    PROCESSING: 'Sedang Diproses',
    SHIPPED:    'Dalam Pengiriman',
    DELIVERED:  'Terkirim',
    CANCELLED:  'Dibatalkan',
    REFUNDED:   'Dana Dikembalikan',
  };
  return map[s] ?? s;
}

function paymentStatusLabel(s: PaymentStatus): string {
  const map: Record<PaymentStatus, string> = {
    UNPAID:             'Belum Dibayar',
    PAID:               'Lunas',
    PARTIALLY_REFUNDED: 'Sebagian Dikembalikan',
    REFUNDED:           'Dikembalikan',
    FAILED:             'Gagal',
  };
  return map[s] ?? s;
}

function orderStatusVariant(s: OrderStatus): 'default' | 'secondary' | 'success' | 'outline' {
  if (s === 'CONFIRMED' || s === 'DELIVERED') return 'success';
  if (s === 'CANCELLED' || s === 'REFUNDED') return 'secondary';
  return 'default';
}

function paymentStatusVariant(s: PaymentStatus): 'default' | 'secondary' | 'success' | 'outline' {
  if (s === 'PAID') return 'success';
  if (s === 'FAILED' || s === 'REFUNDED') return 'secondary';
  return 'default';
}

// ── Status timeline ───────────────────────────────────────────────────────────

const STATUS_STEPS: OrderStatus[] = [
  'PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED',
];

function StatusTimeline({ current }: { current: OrderStatus }) {
  const cancelled = current === 'CANCELLED' || current === 'REFUNDED';
  const currentIdx = STATUS_STEPS.indexOf(current);

  if (cancelled) {
    return (
      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl text-sm text-gray-500">
        <AlertCircle className="h-5 w-5 text-gray-400 shrink-0" />
        Pesanan ini {current === 'REFUNDED' ? 'telah direfund' : 'telah dibatalkan'}.
      </div>
    );
  }

  return (
    <ol className="relative border-l-2 border-gray-200 ml-4 space-y-6 py-1">
      {STATUS_STEPS.map((step, idx) => {
        const done    = idx < currentIdx;
        const active  = idx === currentIdx;
        const pending = idx > currentIdx;
        const icons   = [Clock, CheckCircle2, Package, Truck, MapPin];
        const Icon    = icons[idx];
        return (
          <li key={step} className="ml-6">
            <span
              className={`absolute -left-3.5 flex h-7 w-7 items-center justify-center rounded-full ring-4 ring-white transition-colors ${
                done || active ? 'bg-red-500' : 'bg-gray-200'
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${done || active ? 'text-white' : 'text-gray-400'}`} />
            </span>
            <p className={`text-sm font-medium ${pending ? 'text-gray-400' : 'text-gray-900'}`}>
              {orderStatusLabel(step)}
            </p>
          </li>
        );
      })}
    </ol>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function OrderConfirmationPage() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const [order,   setOrder]   = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    if (!orderNumber) return;
    api.get<OrderDetail>(`/orders/${orderNumber}`)
      .then((r) => setOrder(r.data))
      .catch(() => setError('Pesanan tidak ditemukan.'))
      .finally(() => setLoading(false));
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-red-400" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <AlertCircle className="h-12 w-12 text-gray-300" />
        <p className="text-gray-600">{error || 'Pesanan tidak ditemukan.'}</p>
        <Button asChild variant="outline"><Link href="/products">Kembali Belanja</Link></Button>
      </div>
    );
  }

  const isPaid = order.paymentStatus === 'PAID';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">

        {/* ── Header ── */}
        <div className="text-center space-y-3">
          {isPaid ? (
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
          ) : (
            <Clock className="h-16 w-16 text-yellow-400 mx-auto" />
          )}
          <h1 className="font-display text-2xl sm:text-3xl font-700 text-gray-900">
            {isPaid ? 'Terima kasih atas pesananmu! 🎉' : 'Pesanan Diterima'}
          </h1>
          <p className="text-gray-500 text-sm">
            Nomor pesanan: <span className="font-semibold text-gray-800">{order.orderNumber}</span>
          </p>
          <p className="text-gray-500 text-sm">
            Konfirmasi dikirim ke <span className="font-medium">{order.email}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Left column ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Order items */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="font-display font-700 text-gray-900 mb-4">Item Pesanan</h2>
              <ul className="divide-y divide-gray-50">
                {order.items.map((item) => {
                  const img = item.product?.images?.[0]?.url ?? null;
                  return (
                    <li key={item.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                      <div className="relative h-14 w-14 rounded-lg bg-red-50 overflow-hidden shrink-0">
                        {img ? (
                          <Image src={img} alt={item.productName} fill className="object-cover" sizes="56px" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-xl">📦</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.productName}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {item.quantity} × {formatPrice(parseFloat(item.unitPrice))}
                        </p>
                      </div>
                      <span className="text-sm font-600 text-gray-900 shrink-0">
                        {formatPrice(parseFloat(item.subtotal))}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* Totals */}
              <div className="border-t border-gray-100 mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{formatPrice(parseFloat(order.subtotal))}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Ongkos Kirim</span>
                  <span>{formatPrice(parseFloat(order.shippingCost))}</span>
                </div>
                {parseFloat(order.tax) > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Pajak</span>
                    <span>{formatPrice(parseFloat(order.tax))}</span>
                  </div>
                )}
                {parseFloat(order.discount) > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Diskon</span>
                    <span>−{formatPrice(parseFloat(order.discount))}</span>
                  </div>
                )}
                <div className="flex justify-between font-700 text-base pt-2 border-t border-gray-100">
                  <span className="text-gray-900">Total</span>
                  <span className="text-red-500">{formatPrice(parseFloat(order.total))}</span>
                </div>
              </div>
            </div>

            {/* Status timeline */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="font-display font-700 text-gray-900 mb-5">Status Pesanan</h2>
              <StatusTimeline current={order.status} />
            </div>

            {/* Tracking */}
            {order.trackingNumber && (
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h2 className="font-display font-700 text-gray-900 mb-3">Info Pengiriman</h2>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-gray-500">
                      {order.shippingCarrier} — {order.shippingService}
                    </p>
                    <p className="text-sm font-medium text-gray-900 mt-0.5">
                      Tracking: {order.trackingNumber}
                    </p>
                  </div>
                  {order.trackingUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer">
                        Lacak Paket <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── Right column ── */}
          <div className="space-y-5">

            {/* Status badges */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-3">
              <h2 className="font-display font-700 text-gray-900 text-sm">Status</h2>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Pesanan</span>
                  <Badge variant={orderStatusVariant(order.status)}>
                    {orderStatusLabel(order.status)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Pembayaran</span>
                  <Badge variant={paymentStatusVariant(order.paymentStatus)}>
                    {paymentStatusLabel(order.paymentStatus)}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Shipping address */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="font-display font-700 text-gray-900 text-sm mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-400" /> Alamat Pengiriman
              </h2>
              <address className="not-italic text-sm text-gray-600 leading-relaxed">
                {order.shipFirstName} {order.shipLastName}<br />
                {order.shipStreet1}
                {order.shipStreet2 && <>, {order.shipStreet2}</>}<br />
                {order.shipCity}, {order.shipState} {order.shipZip}<br />
                {order.shipCountry}
              </address>
            </div>

            {/* Payment info */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="font-display font-700 text-gray-900 text-sm mb-3 flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-red-400" /> Pembayaran
              </h2>
              <p className="text-sm text-gray-600">
                {isPaid
                  ? `Lunas${order.paidAt ? ` pada ${new Date(order.paidAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}` : ''}`
                  : paymentStatusLabel(order.paymentStatus)}
              </p>
            </div>

            {/* CTAs */}
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/products">Lanjut Belanja</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/orders">Lihat Semua Pesanan</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
