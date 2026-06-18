'use client';

import { useEffect } from 'react';
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuthStore } from '@/store/authStore';
import { refreshToken } from '@/lib/auth';

// Listens to Firebase auth state and token refreshes.
// Uses onIdTokenChanged (instead of onAuthStateChanged) so the localStorage
// token is updated every time Firebase auto-refreshes it (~every 60 min).
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        await refreshToken(user);
      } else {
        localStorage.removeItem('wim_firebase_token');
      }
      setUser(user);
    });

    return () => unsubscribe();
  }, [setUser]);

  return <>{children}</>;
}
