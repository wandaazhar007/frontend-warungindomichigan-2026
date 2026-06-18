import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(parseFloat(price.toString()));
}

export function generateSessionId(): string {
  return `sess_${Math.random().toString(36).slice(2)}_${Date.now()}`;
}

export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return '';
  const existing = localStorage.getItem('wim_session_id');
  if (existing) return existing;
  const newId = generateSessionId();
  localStorage.setItem('wim_session_id', newId);
  return newId;
}
