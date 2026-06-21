'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useCheckoutStore, ContactData } from '@/store/checkoutStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { US_STATES } from '@/lib/constants';

const schema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName:  z.string().min(2, 'Last name must be at least 2 characters'),
  email:     z.string().min(1, 'Email is required').email('Invalid email address'),
  phone:     z.string().min(7, 'Invalid phone number (e.g. +1 626 461 4963)'),
  street1:   z.string().min(3, 'Street address is required'),
  street2:   z.string().optional().default(''),
  city:      z.string().min(2, 'City is required'),
  state:     z.string().min(2, 'State is required'),
  zip:       z.string().length(5, 'ZIP code must be 5 digits').regex(/^\d{5}$/, 'ZIP code must be 5 digits'),
  country:   z.string().default('US'),
});
type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const router  = useRouter();
  const items   = useCartStore((s) => s.items);
  const user    = useAuthStore((s) => s.user);
  const { contact, setContact } = useCheckoutStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  // Guard: redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) router.replace('/cart');
  }, [items.length, router]);

  // Pre-fill from auth user or existing checkout contact
  useEffect(() => {
    if (contact) {
      Object.entries(contact).forEach(([k, v]) =>
        setValue(k as keyof FormValues, v as string)
      );
    } else if (user) {
      const [first, ...rest] = (user.displayName ?? '').split(' ');
      if (first) setValue('firstName', first);
      if (rest.length) setValue('lastName', rest.join(' '));
      if (user.email) setValue('email', user.email);
    }
  }, [contact, user, setValue]);

  function onSubmit(data: FormValues) {
    setContact(data as ContactData);
    router.push('/checkout/shipping');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="font-display font-700 text-gray-900 text-lg mb-4">Recipient Information</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name *</label>
            <Input placeholder="John" {...register('firstName')} />
            {errors.firstName && <p className="text-xs text-error mt-1">{errors.firstName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name *</label>
            <Input placeholder="Doe" {...register('lastName')} />
            {errors.lastName && <p className="text-xs text-error mt-1">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
            <Input type="email" placeholder="you@email.com" {...register('email')} />
            {errors.email && <p className="text-xs text-error mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
            <Input type="tel" placeholder="+1 626 461 4963" {...register('phone')} />
            {errors.phone && <p className="text-xs text-error mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Street Address *</label>
          <Input placeholder="123 Main St" {...register('street1')} />
          {errors.street1 && <p className="text-xs text-error mt-1">{errors.street1.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Apartment, Suite, etc. (optional)
          </label>
          <Input placeholder="Apt 4B" {...register('street2')} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">City *</label>
            <Input placeholder="Detroit" {...register('city')} />
            {errors.city && <p className="text-xs text-error mt-1">{errors.city.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">State *</label>
            <select
              {...register('state')}
              className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              <option value="">Select state</option>
              {US_STATES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            {errors.state && <p className="text-xs text-error mt-1">{errors.state.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">ZIP Code *</label>
            <Input placeholder="48201" maxLength={5} {...register('zip')} />
            {errors.zip && <p className="text-xs text-error mt-1">{errors.zip.message}</p>}
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
        <Button type="button" variant="outline" asChild>
          <Link href="/cart">← Back to Cart</Link>
        </Button>
        <Button type="submit" className="flex-1 sm:flex-none sm:min-w-48" disabled={isSubmitting}>
          Continue to Shipping →
        </Button>
      </div>
    </form>
  );
}
