import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import PaymentStep from '@/components/checkout/PaymentStep';
import OrderSummary from '@/components/checkout/OrderSummary';

export default function PaymentPage() {
  return (
    <>
      <CheckoutSteps current={3} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6">
          <PaymentStep />
        </div>
        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </>
  );
}
