import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
} from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import { registerCustomer, mergeCart } from './api';

// Store token in localStorage so the api.ts interceptor can attach it
async function persistToken(user: User): Promise<void> {
  const token = await user.getIdToken();
  localStorage.setItem('wim_firebase_token', token);
}

// Sync customer + merge guest cart after any successful login
async function postLoginSync(user: User): Promise<void> {
  await persistToken(user);

  const [firstName, ...rest] = (user.displayName ?? '').split(' ');

  try {
    await registerCustomer({
      email: user.email!,
      firstName: firstName || undefined,
      lastName: rest.join(' ') || undefined,
    });
  } catch {
    // Backend sync is best-effort; don't block login
  }

  const sessionId = localStorage.getItem('wim_session_id');
  if (sessionId) {
    try {
      await mergeCart(sessionId);
    } catch {
      // Cart merge failure should not block login
    }
  }
}

export async function signInWithEmail(email: string, password: string): Promise<User> {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  await postLoginSync(user);
  return user;
}

export async function signUpWithEmail(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<User> {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, { displayName: `${firstName} ${lastName}`.trim() });
  await postLoginSync(user);
  return user;
}

export async function signInWithGoogle(): Promise<User> {
  const { user } = await signInWithPopup(auth, googleProvider);
  await postLoginSync(user);
  return user;
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
  localStorage.removeItem('wim_firebase_token');
}

export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

// Called by AuthProvider on every token refresh (hourly)
export async function refreshToken(user: User): Promise<void> {
  const token = await user.getIdToken(true);
  localStorage.setItem('wim_firebase_token', token);
}
