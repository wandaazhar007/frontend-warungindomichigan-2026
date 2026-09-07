'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
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
  setContactDraft: (contact: ContactData) => void;
  setSelectedRate: (rate: ShippingRate) => void;
  clearShipping:   () => void;
  setOrderData:    (data: {
    orderNumber:     string;
    clientSecret:    string;
    paymentIntentId: string;
    breakdown:       OrderBreakdown;
  }) => void;
  reset: () => void;
}

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      contact:         null,
      selectedRate:    null,
      orderNumber:     null,
      clientSecret:    null,
      paymentIntentId: null,
      breakdown:       null,

      // Confirmed address (form submit) — invalidate every shipping/order value computed downstream
      // so ShippingStep refetches fresh rates and no stale order/PaymentIntent is reused.
      setContact: (contact) => set({
        contact,
        selectedRate: null, breakdown: null,
        orderNumber: null, clientSecret: null, paymentIntentId: null,
      }),
      // Live-typing draft — persisted on every change, does NOT reset the chosen shipping rate
      setContactDraft: (contact) => set({ contact }),
      setSelectedRate: (selectedRate) => set({ selectedRate }),
      // Wipe everything derived after the contact step (rate, breakdown, created order).
      // Called when the user is back on the contact step: nothing downstream is valid yet.
      clearShipping: () => set({
        selectedRate: null, breakdown: null,
        orderNumber: null, clientSecret: null, paymentIntentId: null,
      }),
      setOrderData:    (data)      => set(data),
      reset: () => set({
        contact: null, selectedRate: null,
        orderNumber: null, clientSecret: null,
        paymentIntentId: null, breakdown: null,
      }),
    }),
    {
      name: 'wim-checkout',
      storage: createJSONStorage(() => localStorage),
      // Persist only the data fields (functions are excluded automatically, listed for clarity)
      partialize: (state) => ({
        contact:         state.contact,
        selectedRate:    state.selectedRate,
        orderNumber:     state.orderNumber,
        clientSecret:    state.clientSecret,
        paymentIntentId: state.paymentIntentId,
        breakdown:       state.breakdown,
      }),
    }
  )
);
