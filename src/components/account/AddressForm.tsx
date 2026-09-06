'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { createAddress, updateAddress } from '@/lib/api';
import { Address } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { US_STATES } from '@/lib/constants';

interface AddressFormProps {
  address?: Address;
  onSaved: () => void;
  onCancel: () => void;
}

export default function AddressForm({ address, onSaved, onCancel }: AddressFormProps) {
  const t = useTranslations('Account.AddressForm');
  const [serverError, setServerError] = useState('');

  const schema = z.object({
    firstName: z.string().min(2, t('errors.firstNameMin')),
    lastName:  z.string().min(2, t('errors.lastNameMin')),
    street1:   z.string().min(3, t('errors.streetRequired')),
    street2:   z.string().optional().default(''),
    city:      z.string().min(2, t('errors.cityRequired')),
    state:     z.string().min(2, t('errors.stateRequired')),
    zip:       z.string().length(5, t('errors.zipLength')).regex(/^\d{5}$/, t('errors.zipLength')),
    phone:     z.string().optional().default(''),
    isDefault: z.boolean().optional().default(false),
  });
  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: address
      ? {
          firstName: address.firstName,
          lastName: address.lastName,
          street1: address.street1,
          street2: address.street2 ?? '',
          city: address.city,
          state: address.state,
          zip: address.zip,
          phone: address.phone ?? '',
          isDefault: address.isDefault,
        }
      : undefined,
  });

  async function onSubmit(data: FormValues) {
    setServerError('');
    try {
      const payload = { ...data, country: 'US' };
      if (address) {
        await updateAddress(address.id, payload);
      } else {
        await createAddress(payload);
      }
      onSaved();
    } catch {
      setServerError(t('errors.generic'));
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('firstName')} *</label>
          <Input placeholder="John" {...register('firstName')} />
          {errors.firstName && <p className="text-xs text-error mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('lastName')} *</label>
          <Input placeholder="Doe" {...register('lastName')} />
          {errors.lastName && <p className="text-xs text-error mt-1">{errors.lastName.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('phone')}</label>
        <Input type="tel" placeholder="+1 626 461 4963" {...register('phone')} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('streetAddress')} *</label>
        <Input placeholder="123 Main St" {...register('street1')} />
        {errors.street1 && <p className="text-xs text-error mt-1">{errors.street1.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('apartmentOptional')}</label>
        <Input placeholder="Apt 4B" {...register('street2')} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('city')} *</label>
          <Input placeholder="Detroit" {...register('city')} />
          {errors.city && <p className="text-xs text-error mt-1">{errors.city.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('state')} *</label>
          <select
            {...register('state')}
            className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <option value="">{t('selectState')}</option>
            {US_STATES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          {errors.state && <p className="text-xs text-error mt-1">{errors.state.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('zipCode')} *</label>
          <Input placeholder="48201" maxLength={5} {...register('zip')} />
          {errors.zip && <p className="text-xs text-error mt-1">{errors.zip.message}</p>}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" className="h-4 w-4 accent-red-500" {...register('isDefault')} />
        {t('setAsDefault')}
      </label>

      {serverError && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600">
          {serverError}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" className="flex-1" onClick={onCancel} disabled={isSubmitting}>
          {t('cancel')}
        </Button>
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
          {address ? t('saveChanges') : t('addAddress')}
        </Button>
      </div>
    </form>
  );
}
