'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useForm, useController } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useCheckoutStore, ContactData } from '@/store/checkoutStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AddressAutocomplete from '@/components/address/AddressAutocomplete';
import { US_STATES } from '@/lib/constants';

export default function ContactForm() {
  const t = useTranslations('Checkout.ContactForm');
  const router  = useRouter();
  const items   = useCartStore((s) => s.items);
  const user    = useAuthStore((s) => s.user);
  const setContact      = useCheckoutStore((s) => s.setContact);
  const setContactDraft = useCheckoutStore((s) => s.setContactDraft);

  const schema = z.object({
    firstName: z.string().min(2, t('errors.firstNameMin')),
    lastName:  z.string().min(2, t('errors.lastNameMin')),
    email:     z.string().min(1, t('errors.emailRequired')).email(t('errors.invalidEmail')),
    phone:     z.string().min(7, t('errors.invalidPhone')),
    street1:   z.string().min(3, t('errors.streetRequired')),
    street2:   z.string().optional().default(''),
    city:      z.string().min(2, t('errors.cityRequired')),
    state:     z.string().min(2, t('errors.stateRequired')),
    zip:       z.string().length(5, t('errors.zipLength')).regex(/^\d{5}$/, t('errors.zipLength')),
    country:   z.string().default('US'),
  });
  type FormValues = z.infer<typeof schema>;

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { street1: '' } });

  const street1 = useController({ name: 'street1', control });

  // Guard: redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) router.replace('/cart');
  }, [items.length, router]);

  // Pre-fill once on mount: persisted draft (localStorage) wins, else the auth user's details.
  const prefilledRef = useRef(false);
  useEffect(() => {
    if (prefilledRef.current) return;
    const saved = useCheckoutStore.getState().contact;
    if (saved) {
      prefilledRef.current = true;
      Object.entries(saved).forEach(([k, v]) =>
        setValue(k as keyof FormValues, v as string)
      );
    } else if (user) {
      prefilledRef.current = true;
      const [first, ...rest] = (user.displayName ?? '').split(' ');
      if (first) setValue('firstName', first);
      if (rest.length) setValue('lastName', rest.join(' '));
      if (user.email) setValue('email', user.email);
    }
  }, [user, setValue]);

  // Persist every field change to localStorage so a refresh / back-navigation keeps the input.
  useEffect(() => {
    const sub = watch((values) => {
      setContactDraft(values as ContactData);
    });
    return () => sub.unsubscribe();
  }, [watch, setContactDraft]);

  function onSubmit(data: FormValues) {
    setContact(data as ContactData);
    router.push('/checkout/shipping');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="font-display font-700 text-gray-900 text-lg mb-4">{t('recipientInfo')}</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('emailAddress')} *</label>
            <Input type="email" placeholder="you@email.com" {...register('email')} />
            {errors.email && <p className="text-xs text-error mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('phoneNumber')} *</label>
            <Input type="tel" placeholder="+1 626 461 4963" {...register('phone')} />
            {errors.phone && <p className="text-xs text-error mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('streetAddress')} *</label>
          <AddressAutocomplete
            placeholder="123 Main St"
            value={street1.field.value ?? ''}
            onChange={street1.field.onChange}
            onBlur={street1.field.onBlur}
            onSelect={({ street1: s1, city, state, zip }) => {
              if (s1) setValue('street1', s1, { shouldValidate: true });
              if (city) setValue('city', city, { shouldValidate: true });
              if (state) setValue('state', state, { shouldValidate: true });
              if (zip) setValue('zip', zip, { shouldValidate: true });
            }}
          />
          {errors.street1 && <p className="text-xs text-error mt-1">{errors.street1.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {t('apartmentOptional')}
          </label>
          <Input placeholder="Apt 4B" {...register('street2')} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
        <Button type="button" variant="outline" asChild>
          <Link href="/cart">← {t('backToCart')}</Link>
        </Button>
        <Button type="submit" className="w-full sm:w-auto sm:min-w-48" disabled={isSubmitting}>
          {t('continueToShipping')} →
        </Button>
      </div>
    </form>
  );
}
