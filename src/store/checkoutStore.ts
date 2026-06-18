'use client';

import { create } from 'zustand';
import { ShippingRate } from '@/types';

export interface ContactData {
  firstName: string;
  lastName:  string;
  email:     string;
  phone:     string;
  street1:   string;
  street2:   string;
  city:      string;
  state:     string;
  zip:       string;
  country:   string;
}

export interface OrderBreakdown {
  subtotal:     number;
  shippingCost: number;
  tax:          number;
  total:        number;
  totalCents:   number;
}

interface CheckoutStore {
  contact:         ContactData | null;
  selectedRate:    ShippingRate | null;
  orderNumber:     string | null;
  clientSecret:    string | null;
  paymentIntentId: string | null;
  breakdown:       OrderBreakdown | null;

  setContact:      (contact: ContactData) => void;
  setSelectedRate: (rate: ShippingRate) => void;
  setOrderData:    (data: {
    orderNumber:     string;
    clientSecret:    string;
    paymentIntentId: string;
    breakdown:       OrderBreakdown;
  }) => void;
  reset: () => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  contact:         null,
  selectedRate:    null,
  orderNumber:     null,
  clientSecret:    null,
  paymentIntentId: null,
  breakdown:       null,

  setContact:      (contact)   => set({ contact }),
  setSelectedRate: (selectedRate) => set({ selectedRate }),
  setOrderData:    (data)      => set(data),
  reset: () => set({
    contact: null, selectedRate: null,
    orderNumber: null, clientSecret: null,
    paymentIntentId: null, breakdown: null,
  }),
}));
