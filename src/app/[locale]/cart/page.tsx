import type { Metadata } from 'next';
import CartPage from '@/components/cart/CartPage';

export const metadata: Metadata = {
  title: 'Keranjang Belanja',
};

export default function CartRoute() {
  return <CartPage />;
}
