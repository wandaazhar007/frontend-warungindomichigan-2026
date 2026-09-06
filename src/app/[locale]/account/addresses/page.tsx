'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from '@/i18n/navigation';
import { MapPin, Plus, Pencil, Trash2, Loader2, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/authStore';
import { getMyProfile, deleteAddress, setDefaultAddress } from '@/lib/api';
import { Address } from '@/types';
import { Button } from '@/components/ui/button';
import AddressForm from '@/components/account/AddressForm';

export default function AddressesPage() {
  const t = useTranslations('Account.Addresses');
  const router  = useRouter();
  const user    = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [fetching,  setFetching]  = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [formOpen,   setFormOpen]   = useState(false);
  const [editing,    setEditing]    = useState<Address | undefined>(undefined);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [settingDefaultId, setSettingDefaultId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login?redirect=/account/addresses');
    }
  }, [loading, user, router]);

  const fetchAddresses = useCallback(() => {
    setFetching(true);
    getMyProfile()
      .then((profile) => setAddresses(profile.addresses ?? []))
      .catch(() => setFetchError(t('fetchError')))
      .finally(() => setFetching(false));
  }, [t]);

  useEffect(() => {
    if (!user) return;
    fetchAddresses();
  }, [user, fetchAddresses]);

  function openAddForm() {
    setEditing(undefined);
    setFormOpen(true);
  }

  function openEditForm(address: Address) {
    setEditing(address);
    setFormOpen(true);
  }

  function handleSaved() {
    setFormOpen(false);
    setEditing(undefined);
    fetchAddresses();
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await deleteAddress(id);
      fetchAddresses();
    } finally {
      setDeletingId(null);
    }
  }

  async function handleSetDefault(id: string) {
    setSettingDefaultId(id);
    try {
      await setDefaultAddress(id);
      fetchAddresses();
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
            <Button onClick={openAddForm} className="shrink-0">
              <Plus className="h-4 w-4 mr-1.5" />
              {t('addAddress')}
            </Button>
          )}
        </div>

        {formOpen && (
          <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
            <h2 className="font-display font-700 text-gray-900 mb-4">
              {editing ? t('editAddress') : t('addAddress')}
            </h2>
            <AddressForm
              address={editing}
              onSaved={handleSaved}
              onCancel={() => { setFormOpen(false); setEditing(undefined); }}
            />
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

        {!fetching && !fetchError && addresses.length === 0 && !formOpen && (
          <div className="text-center py-20 space-y-4">
            <MapPin className="h-16 w-16 text-gray-200 mx-auto" />
            <p className="text-gray-500">{t('emptyState')}</p>
          </div>
        )}

        {!fetching && addresses.length > 0 && (
          <ul className="space-y-3">
            {addresses.map((addr) => (
              <li key={addr.id} className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="h-4 w-4 text-red-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-gray-900">
                          {addr.firstName} {addr.lastName}
                        </p>
                        {addr.isDefault && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                            <Star className="h-3 w-3 fill-red-500 text-red-500" />
                            {t('default')}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {addr.street1}{addr.street2 ? `, ${addr.street2}` : ''}<br />
                        {addr.city}, {addr.state} {addr.zip}
                      </p>
                      {addr.phone && <p className="text-xs text-gray-400 mt-0.5">{addr.phone}</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {!addr.isDefault && (
                      <button
                        onClick={() => handleSetDefault(addr.id)}
                        disabled={settingDefaultId === addr.id}
                        className="text-xs font-semibold text-gray-500 hover:text-red-600 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        {settingDefaultId === addr.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : t('setDefault')}
                      </button>
                    )}
                    <button
                      onClick={() => openEditForm(addr)}
                      aria-label={t('edit')}
                      className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(addr.id)}
                      disabled={deletingId === addr.id}
                      aria-label={t('delete')}
                      className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      {deletingId === addr.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
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
