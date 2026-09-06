'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from '@/i18n/navigation';
import { CreditCard, Plus, Trash2, Loader2, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/authStore';
import { getMyPaymentMethods, deletePaymentMethod, setDefaultPaymentMethod } from '@/lib/api';
import { SavedPaymentMethod } from '@/types';
import { Button } from '@/components/ui/button';
import PaymentMethodForm from '@/components/account/PaymentMethodForm';

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function PaymentMethodsPage() {
  const t = useTranslations('Account.PaymentMethods');
  const router  = useRouter();
  const user    = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);

  const [methods,   setMethods]   = useState<SavedPaymentMethod[]>([]);
  const [fetching,  setFetching]  = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [formOpen,   setFormOpen]   = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [settingDefaultId, setSettingDefaultId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login?redirect=/account/payment-methods');
    }
  }, [loading, user, router]);

  const fetchMethods = useCallback(() => {
    setFetching(true);
    getMyPaymentMethods()
      .then(setMethods)
      .catch(() => setFetchError(t('fetchError')))
      .finally(() => setFetching(false));
  }, [t]);

  useEffect(() => {
    if (!user) return;
    fetchMethods();
  }, [user, fetchMethods]);

  function handleSaved() {
    setFormOpen(false);
    fetchMethods();
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await deletePaymentMethod(id);
      fetchMethods();
    } finally {
      setDeletingId(null);
    }
  }

  async function handleSetDefault(id: string) {
    setSettingDefaultId(id);
    try {
      await setDefaultPaymentMethod(id);
      fetchMethods();
    } finally {
      setSettingDefaultId(null);
    }
  }

  if (loading || (!user && !loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-red-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-display text-2xl font-700 text-gray-900">{t('title')}</h1>
            <p className="text-gray-500 text-sm mt-1">{t('subtitle')}</p>
          </div>
          {!formOpen && (
            <Button onClick={() => setFormOpen(true)} className="shrink-0">
              <Plus className="h-4 w-4 mr-1.5" />
              {t('addCard')}
            </Button>
          )}
        </div>

        {formOpen && (
          <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
            <h2 className="font-display font-700 text-gray-900 mb-4">{t('addCard')}</h2>
            <PaymentMethodForm onSaved={handleSaved} onCancel={() => setFormOpen(false)} />
          </div>
        )}

        {fetching && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        )}

        {!fetching && fetchError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-sm text-red-700">
            {fetchError}
          </div>
        )}

        {!fetching && !fetchError && methods.length === 0 && !formOpen && (
          <div className="text-center py-20 space-y-4">
            <CreditCard className="h-16 w-16 text-gray-200 mx-auto" />
            <p className="text-gray-500">{t('emptyState')}</p>
          </div>
        )}

        {!fetching && methods.length > 0 && (
          <ul className="space-y-3">
            {methods.map((pm) => (
              <li key={pm.id} className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                      <CreditCard className="h-4 w-4 text-red-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-gray-900">
                          {pm.brand ? capitalize(pm.brand) : t('card')} •••• {pm.last4}
                        </p>
                        {pm.isDefault && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                            <Star className="h-3 w-3 fill-red-500 text-red-500" />
                            {t('default')}
                          </span>
                        )}
                      </div>
                      {pm.expMonth && pm.expYear && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          {t('expires')} {String(pm.expMonth).padStart(2, '0')}/{pm.expYear}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {!pm.isDefault && (
                      <button
                        onClick={() => handleSetDefault(pm.id)}
                        disabled={settingDefaultId === pm.id}
                        className="text-xs font-semibold text-gray-500 hover:text-red-600 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        {settingDefaultId === pm.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : t('setDefault')}
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(pm.id)}
                      disabled={deletingId === pm.id}
                      aria-label={t('delete')}
                      className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      {deletingId === pm.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
