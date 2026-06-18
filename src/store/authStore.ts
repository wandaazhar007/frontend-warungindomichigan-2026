'use client';

import { create } from 'zustand';
import { User } from 'firebase/auth';

interface AuthStore {
  user: User | null;
  loading: boolean; // true until Firebase first resolves auth state
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  setUser:    (user)    => set({ user, loading: false }),
  setLoading: (loading) => set({ loading }),
}));
