import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import ShippingStep from '@/components/checkout/ShippingStep';
import OrderSummary from '@/components/checkout/OrderSummary';

export default function ShippingPage() {
  return (
    <>
      <CheckoutSteps current={2} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6">
          <ShippingStep />
        </div>
        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </>
  );
}
