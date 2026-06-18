'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, Loader2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';
import { getOrCreateSessionId } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import api from '@/lib/api';
import { ShippingRate } from '@/types';

export default function ShippingStep() {
  const router = useRouter();
  const items   = useCartStore((s) => s.items);
  const { contact, selectedRate, setSelectedRate, setOrderData } = useCheckoutStore();

  const [rates, setRates]       = useState<ShippingRate[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Guard: go back if contact not filled or cart empty
  useEffect(() => {
    if (items.length === 0) { router.replace('/cart'); return; }
    if (!contact)           { router.replace('/checkout'); return; }
  }, [items.length, contact, router]);

  // Fetch rates from backend Shippo
  useEffect(() => {
    if (!contact || items.length === 0) return;

    const fetchRates = async () => {
      setLoading(true);
      setError('');
      try {
        const body = {
          address: {
            firstName: contact.firstName,
            lastName:  contact.lastName,
            street1:   contact.street1,
            street2:   contact.street2 || '',
            city:      contact.city,
            state:     contact.state,
            zip:       contact.zip,
            country:   contact.country || 'US',
            phone:     contact.phone,
            email:     contact.email,
          },
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        };
        type RawRate = {
          object_id: string; amount: string; currency: string;
          provider: string;
          servicelevel: { name: string; token: string };
          estimated_days: number | null;
        };
        const res = await api.post<{ rates: RawRate[] }>('/shipping/rates', body);
        // Normalize raw Shippo format to frontend ShippingRate
        const normalized: ShippingRate[] = res.data.rates.map((r) => ({
          objectId:      r.object_id,
          amount:        r.amount,
          currency:      r.currency,
          carrier:       r.provider,
          serviceName:   r.servicelevel.name,
          serviceToken:  r.servicelevel.token,
          estimatedDays: r.estimated_days,
        }));
        setRates(normalized);
        // Auto-select cheapest rate
        if (normalized.length > 0 && !selectedRate) {
          const cheapest = normalized.slice().sort(
            (a, b) => parseFloat(a.amount) - parseFloat(b.amount)
          )[0];
          setSelectedRate(cheapest);
        }
      } catch {
        setError('Gagal mendapatkan pilihan pengiriman. Periksa koneksi dan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  async function handleContinue() {
    if (!selectedRate || !contact) return;
    setSubmitting(true);
    setError('');
    try {
      const body = {
        // Flat top-level contact fields (backend expects these at root)
        email:     contact.email,
        phone:     contact.phone,
        firstName: contact.firstName,
        lastName:  contact.lastName,
        street1:   contact.street1,
        street2:   contact.street2 || '',
        city:      contact.city,
        state:     contact.state,
        zip:       contact.zip,
        country:   contact.country || 'US',
        shipping: {
          rateObjectId:  selectedRate.objectId,
          carrier:       selectedRate.carrier,
          service:       selectedRate.serviceName,
          amount:        parseFloat(selectedRate.amount),
          estimatedDays: selectedRate.estimatedDays,
        },
        items:     items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        sessionId: getOrCreateSessionId(),
      };
      const res = await api.post<{
        orderNumber:     string;
        clientSecret:    string;
        paymentIntentId: string;
        breakdown:       { subtotal: number; shippingCost: number; tax: number; total: number; totalCents: number };
      }>('/orders', body);

      setOrderData(res.data);
      router.push('/checkout/payment');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })
        ?.response?.data?.error ?? 'Gagal membuat pesanan. Coba lagi.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="font-display font-700 text-gray-900 text-lg">Pilih Layanan Pengiriman</h2>

      {loading && (
        <div className="flex items-center justify-center py-12 gap-3 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Mengambil pilihan pengiriman…</span>
        </div>
      )}

      {!loading && error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && rates.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
          Tidak ada layanan pengiriman yang tersedia untuk alamat ini.
        </div>
      )}

      {!loading && rates.length > 0 && (
        <ul className="space-y-3">
          {rates
            .slice()
            .sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount))
            .map((rate) => {
              const checked = selectedRate?.objectId === rate.objectId;
              return (
                <li key={rate.objectId}>
                  <label
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      checked
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="rate"
                      value={rate.objectId}
                      checked={checked}
                      onChange={() => setSelectedRate(rate)}
                      className="accent-red-500 h-4 w-4"
                    />
                    <Package className={`h-5 w-5 shrink-0 ${checked ? 'text-red-500' : 'text-gray-400'}`} />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">
                        {rate.carrier} — {rate.serviceName}
                      </p>
                      {rate.estimatedDays && (
                        <p className="text-xs text-gray-500 mt-0.5">
                          Estimasi {rate.estimatedDays} hari kerja
                        </p>
                      )}
                    </div>
                    <span className={`font-700 text-sm ${checked ? 'text-red-600' : 'text-gray-900'}`}>
                      {formatPrice(parseFloat(rate.amount))}
                    </span>
                  </label>
                </li>
              );
            })}
        </ul>
      )}

      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
        <Button type="button" variant="outline" asChild>
          <Link href="/checkout">← Kembali</Link>
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!selectedRate || submitting || loading}
          className="flex-1 sm:flex-none sm:min-w-48"
        >
          {submitting ? (
            <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Memproses…</>
          ) : (
            'Lanjut ke Pembayaran →'
          )}
        </Button>
      </div>
    </div>
  );
}
