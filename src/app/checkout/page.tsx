import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import ContactForm from '@/components/checkout/ContactForm';
import OrderSummary from '@/components/checkout/OrderSummary';

export default function CheckoutPage() {
  return (
    <>
      <CheckoutSteps current={1} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6">
          <ContactForm />
        </div>
        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </>
  );
}
