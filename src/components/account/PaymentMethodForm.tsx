'use client';

import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { createPaymentMethodSetupIntent } from '@/lib/api';
import { Button } from '@/components/ui/button';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function SetupForm({ onSaved, onCancel }: { onSaved: () => void; onCancel: () => void }) {
  const t = useTranslations('Account.PaymentMethodForm');
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError('');

    const { error: stripeError } = await stripe.confirmSetup({
      elements,
      redirect: 'if_required',
    });

    if (stripeError) {
      setError(stripeError.message ?? t('errors.generic'));
      setLoading(false);
      return;
    }

    onSaved();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={ready ? '' : 'min-h-[140px] flex items-center justify-center'}>
        {!ready && <Loader2 className="h-6 w-6 animate-spin text-gray-400" />}
        <PaymentElement onReady={() => setReady(true)} options={{ layout: 'tabs' }} />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" className="flex-1" onClick={onCancel} disabled={loading}>
          {t('cancel')}
        </Button>
        <Button type="submit" className="flex-1" disabled={!stripe || !elements || loading || !ready}>
          {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
          {t('saveCard')}
        </Button>
      </div>
    </form>
  );
}

export default function PaymentMethodForm({ onSaved, onCancel }: { onSaved: () => void; onCancel: () => void }) {
  const t = useTranslations('Account.PaymentMethodForm');
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    createPaymentMethodSetupIntent()
      .then((r) => setClientSecret(r.clientSecret))
      .catch(() => setError(t('errors.setupFailed')));
  }, [t]);

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: { theme: 'stripe', variables: { colorPrimary: '#d92121', borderRadius: '8px' } },
      }}
    >
      <SetupForm onSaved={onSaved} onCancel={onCancel} />
    </Elements>
  );
}
