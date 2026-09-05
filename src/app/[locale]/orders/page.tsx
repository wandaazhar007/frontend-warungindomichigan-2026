'use client';

import { useEffect, useState } from 'react';
import { Link, useRouter } from '@/i18n/navigation';
import { Package, ChevronRight, Loader2, ShoppingBag } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import api from '@/lib/api';
import { OrderSummary, OrderStatus, PaymentStatus } from '@/types/order';

function orderStatusVariant(s: OrderStatus): 'default' | 'secondary' | 'success' | 'outline' {
  if (s === 'CONFIRMED' || s === 'DELIVERED') return 'success';
  if (s === 'CANCELLED' || s === 'REFUNDED') return 'secondary';
  return 'default';
}

function paymentStatusVariant(s: PaymentStatus): 'default' | 'secondary' | 'success' | 'outline' {
  if (s === 'PAID') return 'success';
  if (s === 'FAILED' || s === 'REFUNDED') return 'secondary';
  return 'default';
}

export default function OrdersPage() {
  const t = useTranslations('Orders.List');
  const tStatus = useTranslations('Orders.OrderStatus');
  const tPayment = useTranslations('Orders.PaymentStatus');
  const locale = useLocale();
  const router  = useRouter();
  const user    = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);

  const [orders,      setOrders]      = useState<OrderSummary[]>([]);
  const [fetching,    setFetching]    = useState(true);
  const [fetchError,  setFetchError]  = useState('');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login?redirect=/orders');
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    api.get<OrderSummary[]>('/api/orders/my')
      .then((r) => setOrders(r.data))
      .catch(() => setFetchError(t('fetchError')))
      .finally(() => setFetching(false));
  }, [user, t]);

  if (loading || (!user && !loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-red-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        <div className="mb-8">
          <h1 className="font-display text-2xl font-700 text-gray-900">{t('title')}</h1>
          <p className="text-gray-500 text-sm mt-1">
            {t('subtitle')}
          </p>
        </div>

        {fetching && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        )}

        {!fetching && fetchError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-sm text-red-700">
            {fetchError}
          </div>
        )}

        {!fetching && !fetchError && orders.length === 0 && (
          <div className="text-center py-20 space-y-4">
            <ShoppingBag className="h-16 w-16 text-gray-200 mx-auto" />
            <p className="text-gray-500">{t('emptyState')}</p>
            <Button asChild>
              <Link href="/products">{t('startShopping')}</Link>
            </Button>
          </div>
        )}

        {!fetching && orders.length > 0 && (
          <ul className="space-y-3">
            {orders.map((order) => (
              <li key={order.id}>
                <Link
                  href={`/order/${order.orderNumber}`}
                  className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 p-4 hover:border-red-200 hover:shadow-sm transition-all group"
                >
                  {/* Icon */}
                  <div className="h-11 w-11 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                    <Package className="h-5 w-5 text-red-400" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-gray-900">{order.orderNumber}</p>
                      <Badge variant={orderStatusVariant(order.status)}>
                        {tStatus(order.status)}
                      </Badge>
                      <Badge variant={paymentStatusVariant(order.paymentStatus)}>
                        {tPayment(order.paymentStatus)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span>
                        {new Date(order.createdAt).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
                          day: 'numeric', month: 'long', year: 'numeric',
                        })}
                      </span>
                      <span>·</span>
                      <span>{t('itemCount', { count: order._count.items })}</span>
                      {order.shippingCarrier && (
                        <>
                          <span>·</span>
                          <span>{order.shippingCarrier} {order.shippingService}</span>
                        </>
                      )}
                    </div>
                    {order.trackingNumber && (
                      <p className="text-xs text-blue-500 mt-0.5">
                        {t('tracking')}: {order.trackingNumber}
                      </p>
                    )}
                  </div>

                  {/* Total + arrow */}
                  <div className="text-right shrink-0">
                    <p className="text-sm font-700 text-gray-900">
                      {formatPrice(parseFloat(order.total))}
                    </p>
                    <ChevronRight className="h-4 w-4 text-gray-300 mt-1 ml-auto group-hover:text-red-400 transition-colors" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
