'use client';

import { create } from 'zustand';

interface UIStore {
  mobileNavHidden: boolean;
  setMobileNavHidden: (hidden: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  mobileNavHidden: false,
  setMobileNavHidden: (hidden) => set({ mobileNavHidden: hidden }),
}));
