'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Loader2, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import api from '@/lib/api';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Inner form — rendered inside <Elements> where useStripe/useElements are available
function PaymentForm({ orderNumber, total }: { orderNumber: string; total: number }) {
  const stripe   = useStripe();
  const elements = useElements();
  const router   = useRouter();
  const clearCart = useCartStore((s) => s.clearCart);
  const reset     = useCheckoutStore((s) => s.reset);

  const [error,     setError]     = useState('');
  const [loading,   setLoading]   = useState(false);
  const [ready,     setReady]     = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError('');

    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (stripeError) {
      setError(stripeError.message ?? 'Pembayaran gagal. Coba lagi.');
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === 'succeeded') {
      // Confirm order server-side (verify + update DB + send email)
      try {
        await api.post(`/api/orders/${orderNumber}/confirm-payment`, {
          paymentIntentId: paymentIntent.id,
        });
      } catch (confirmErr) {
        // Log but don't block redirect — webhook may still fire in production
        console.error('confirm-payment call failed:', confirmErr);
      }
      clearCart();
      reset();
      router.push(`/order/${orderNumber}`);
    } else {
      setError('Status pembayaran tidak diketahui. Hubungi kami jika dana sudah terpotong.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className={ready ? '' : 'min-h-[180px] flex items-center justify-center'}>
        {!ready && <Loader2 className="h-6 w-6 animate-spin text-gray-400" />}
        <PaymentElement
          onReady={() => setReady(true)}
          options={{ layout: 'tabs' }}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-gray-500">
        <ShieldCheck className="h-4 w-4 text-green-500 shrink-0" />
        Pembayaran diproses secara aman oleh Stripe. Data kartu tidak disimpan di server kami.
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
        <Button type="button" variant="outline" asChild>
          <Link href="/checkout/shipping">← Kembali</Link>
        </Button>
        <Button
          type="submit"
          disabled={!stripe || !elements || loading || !ready}
          className="flex-1 sm:flex-none sm:min-w-48"
        >
          {loading ? (
            <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Memproses…</>
          ) : (
            `Bayar ${formatPrice(total)} →`
          )}
        </Button>
      </div>
    </form>
  );
}

// Outer component — waits for clientSecret then mounts Elements
export default function PaymentStep() {
  const router = useRouter();
  const items        = useCartStore((s) => s.items);
  const clientSecret = useCheckoutStore((s) => s.clientSecret);
  const orderNumber  = useCheckoutStore((s) => s.orderNumber);
  const breakdown    = useCheckoutStore((s) => s.breakdown);
  const contact      = useCheckoutStore((s) => s.contact);

  useEffect(() => {
    if (items.length === 0)  { router.replace('/cart');             return; }
    if (!contact)            { router.replace('/checkout');          return; }
    if (!clientSecret)       { router.replace('/checkout/shipping'); return; }
  }, [items.length, contact, clientSecret, router]);

  if (!clientSecret || !orderNumber || !breakdown) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: { colorPrimary: '#E86363', borderRadius: '8px' },
        },
      }}
    >
      <div className="space-y-4">
        <h2 className="font-display font-700 text-gray-900 text-lg">Pembayaran</h2>
        <PaymentForm orderNumber={orderNumber} total={breakdown.total} />
      </div>
    </Elements>
  );
}
