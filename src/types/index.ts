export interface ProductImage {
  id: string;
  url: string;
  altText: string | null;
  isPrimary: boolean;
  sortOrder: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  sortOrder: number;
  _count?: { products: number };
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: string;
  comparePrice: string | null;
  unit: string;
  stock: number;
  minStock: number;
  sku: string | null;
  weightGrams: number;
  images: ProductImage[];
  category: Pick<Category, 'id' | 'name' | 'slug' | 'icon'>;
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  createdAt: string;
}

export interface ProductsResponse {
  data: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  comparePrice: number | null;
  quantity: number;
  unit: string;
  imageUrl: string | null;
  slug: string;
  stock: number;
}

// Normalized from raw Shippo response
export interface ShippingRate {
  objectId:      string;
  amount:        string;
  currency:      string;
  carrier:       string;
  serviceName:   string;
  serviceToken:  string;
  estimatedDays: number | null;
}

export interface OrderBreakdown {
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  totalCents: number;
}

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export type PaymentStatus = 'UNPAID' | 'PAID' | 'PARTIALLY_REFUNDED' | 'REFUNDED' | 'FAILED';
export type FulfillStatus = 'UNFULFILLED' | 'PARTIALLY_FULFILLED' | 'FULFILLED';
