'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types';
import { getOrCreateSessionId } from '@/lib/utils';

interface CartStore {
  items: CartItem[];
  sessionId: string;

  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      sessionId: '',

      addItem: (incoming) => {
        const sessionId = get().sessionId || getOrCreateSessionId();
        set((state) => {
          const existing = state.items.find((i) => i.productId === incoming.productId);
          if (existing) {
            return {
              sessionId,
              items: state.items.map((i) =>
                i.productId === incoming.productId
                  ? { ...i, quantity: i.quantity + (incoming.quantity ?? 1) }
                  : i
              ),
            };
          }
          return {
            sessionId,
            items: [...state.items, { ...incoming, quantity: incoming.quantity ?? 1 }],
          };
        });
      },

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal:   () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: 'wim-cart',
      // Only persist items and sessionId
      partialize: (state) => ({ items: state.items, sessionId: state.sessionId }),
    }
  )
);
