import axios from 'axios';
import { Product, ProductsResponse, Category, Address, SavedPaymentMethod } from '@/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach Firebase token + session ID on every request when available
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const sessionId = localStorage.getItem('wim_session_id');
    if (sessionId) config.headers['x-session-id'] = sessionId;

    const token = localStorage.getItem('wim_firebase_token');
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// --- Products ---

export async function getProducts(params?: {
  categorySlug?: string;
  search?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}): Promise<ProductsResponse> {
  const { data } = await api.get<ProductsResponse>('/api/products', { params });
  return data;
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const { data } = await api.get<Product>(`/api/products/${slug}`);
  return data;
}

// --- Categories ---

export async function getCategories(): Promise<Category[]> {
  const { data } = await api.get<Category[]>('/api/categories');
  return data;
}

// --- Cart (server sync) ---

export async function addToServerCart(productId: string, quantity: number) {
  const { data } = await api.post('/api/cart/items', { productId, quantity });
  return data;
}

export async function mergeCart(sessionId: string) {
  const { data } = await api.post('/api/cart/merge', { sessionId });
  return data;
}

// --- Shipping ---

export async function getShippingRates(payload: {
  items: { productId: string; quantity: number }[];
  address: {
    firstName: string;
    lastName: string;
    street1: string;
    street2?: string;
    city: string;
    state: string;
    zip: string;
    country?: string;
    phone?: string;
  };
}) {
  const { data } = await api.post('/api/shipping/rates', payload);
  return data;
}

// --- Orders ---

export async function createOrder(payload: {
  items: { productId: string; quantity: number }[];
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  country?: string;
  shipping: {
    rateObjectId: string;
    carrier: string;
    service: string;
    amount: number;
    estimatedDays?: number | null;
    durationTerms?: string | null;
  };
  customerNote?: string;
  sessionId?: string;
}) {
  const { data } = await api.post('/api/orders', payload);
  return data as {
    orderNumber: string;
    clientSecret: string;
    paymentIntentId: string;
    breakdown: {
      subtotal: number;
      shippingCost: number;
      tax: number;
      total: number;
      totalCents: number;
    };
  };
}

export async function getOrder(orderNumber: string) {
  const { data } = await api.get(`/api/orders/${orderNumber}`);
  return data;
}

export async function getMyOrders() {
  const { data } = await api.get('/api/orders/my');
  return data;
}

// --- Customers ---

export async function registerCustomer(payload: {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}) {
  const { data } = await api.post('/api/customers/register', payload);
  return data;
}

export async function getMyProfile() {
  const { data } = await api.get('/api/customers/me');
  return data;
}

// --- Addresses ---

export type AddressPayload = Omit<Address, 'id' | 'isDefault'> & { isDefault?: boolean };

export async function createAddress(payload: AddressPayload) {
  const { data } = await api.post<Address>('/api/customers/me/addresses', payload);
  return data;
}

export async function updateAddress(id: string, payload: AddressPayload) {
  const { data } = await api.put<Address>(`/api/customers/me/addresses/${id}`, payload);
  return data;
}

export async function setDefaultAddress(id: string) {
  const { data } = await api.put(`/api/customers/me/addresses/${id}/default`);
  return data;
}

export async function deleteAddress(id: string) {
  const { data } = await api.delete(`/api/customers/me/addresses/${id}`);
  return data;
}

// --- Payment Methods (Stripe saved cards) ---

export async function createPaymentMethodSetupIntent() {
  const { data } = await api.post<{ clientSecret: string }>(
    '/api/customers/me/payment-methods/setup-intent'
  );
  return data;
}

export async function getMyPaymentMethods() {
  const { data } = await api.get<SavedPaymentMethod[]>('/api/customers/me/payment-methods');
  return data;
}

export async function setDefaultPaymentMethod(id: string) {
  const { data } = await api.put(`/api/customers/me/payment-methods/${id}/default`);
  return data;
}

export async function deletePaymentMethod(id: string) {
  const { data } = await api.delete(`/api/customers/me/payment-methods/${id}`);
  return data;
}

export default api;
