'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string | React.ReactNode;
}

interface FaqGroup {
  category: string;
  icon: string;
  items: FaqItem[];
}

const FAQ_DATA: FaqGroup[] = [
  {
    category: 'Orders',
    icon: '📦',
    items: [
      {
        q: 'Do I need an account to place an order?',
        a: 'No! We support guest checkout — simply enter your contact info and shipping address at checkout. However, creating an account lets you track your order history and save your shipping addresses for faster future checkouts.',
      },
      {
        q: 'How do I track my order?',
        a: 'Once your order ships, we\'ll send a tracking number to your email. You can also view your tracking status on the USPS or UPS website. If you have an account, your orders are also visible under "My Orders."',
      },
      {
        q: 'Can I modify or cancel my order after placing it?',
        a: 'We process orders quickly, but if you need to make changes, please contact us via WhatsApp (+1 626 461-4963) as soon as possible. Once an order has been shipped (status: Shipped), it can no longer be cancelled or modified.',
      },
      {
        q: 'What does each order status mean?',
        a: (
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground list-none pl-0">
            <li><span className="font-semibold text-foreground">Pending</span> — Payment received, order is in queue.</li>
            <li><span className="font-semibold text-foreground">Processing</span> — We are packing your items.</li>
            <li><span className="font-semibold text-foreground">Shipped</span> — Package handed to carrier. Tracking number sent.</li>
            <li><span className="font-semibold text-foreground">Delivered</span> — Package marked as delivered by carrier.</li>
          </ul>
        ),
      },
      {
        q: 'I placed an order but didn\'t receive a confirmation email. What should I do?',
        a: 'Please check your spam or junk folder first. If the email is not there, contact us via WhatsApp with your name and the email address you used to place the order.',
      },
    ],
  },
  {
    category: 'Shipping',
    icon: '🚚',
    items: [
      {
        q: 'How long does shipping take?',
        a: 'We process orders within 1–2 business days. After that, estimated delivery is 3–7 business days depending on your location and the carrier chosen. USPS Priority Mail typically takes 1–3 days; USPS Ground Advantage 2–5 days; UPS Ground 1–5 days.',
      },
      {
        q: 'How are shipping costs calculated?',
        a: 'Shipping costs are calculated at checkout based on the total weight of your order and your delivery address. You\'ll see the exact shipping rate before you enter payment information.',
      },
      {
        q: 'Do you ship to all US states, including Hawaii and Alaska?',
        a: 'Yes! We ship to all 50 US states. Please note that shipping to Hawaii and Alaska may cost more and take longer than the contiguous 48 states.',
      },
      {
        q: 'What happens if my package is lost or damaged?',
        a: 'Please contact us within 7 days of the expected delivery date. We\'ll file a carrier claim on your behalf and resolve the situation as quickly as possible. For damaged packages, please keep all original packaging and take photos.',
      },
    ],
  },
  {
    category: 'Products',
    icon: '🛒',
    items: [
      {
        q: 'Are your products authentic Indonesian brands?',
        a: 'Absolutely. All products we carry are genuine, original Indonesian brands — the same ones you\'d find at a supermarket in Indonesia or trusted Asian grocery stores in the US. We do not sell counterfeit or knock-off products.',
      },
      {
        q: 'Do you carry halal-certified products?',
        a: 'Many of our products are halal-certified. Please check the product packaging or description for halal certification details. If you\'re unsure about a specific product, feel free to ask us via WhatsApp.',
      },
      {
        q: 'What are the expiry dates on products?',
        a: 'We regularly rotate our stock to ensure freshness. All products are sold with a minimum of 3 months before the expiry date. The exact expiry date is printed on each product\'s packaging.',
      },
      {
        q: 'Can I request a specific product you don\'t currently carry?',
        a: 'Yes! We love hearing from our customers. If there\'s a product you\'d like us to stock, please let us know via WhatsApp. We do our best to source popular requests.',
      },
    ],
  },
  {
    category: 'Payments',
    icon: '💳',
    items: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit and debit cards: Visa, Mastercard, American Express, and Discover. Payments are processed securely through Stripe.',
      },
      {
        q: 'Is it safe to enter my card details on your website?',
        a: 'Yes. Your payment is processed by Stripe, a PCI DSS Level 1 certified payment processor. We never see or store your full card number — it goes directly to Stripe\'s secure servers.',
      },
      {
        q: 'When will I be charged?',
        a: 'Your card is charged immediately when you confirm your order at checkout. You\'ll receive an order confirmation email right after.',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    icon: '↩️',
    items: [
      {
        q: 'Can I return a product?',
        a: 'Due to food safety regulations, most grocery and food items are non-returnable once received. However, if you received a damaged item or the wrong product, we will make it right. Please see our full Return & Refund Policy for details.',
      },
      {
        q: 'How long does a refund take?',
        a: 'Once we approve your refund, it is processed via Stripe back to your original payment method. This typically takes 5–10 business days to appear on your statement, depending on your bank or card issuer.',
      },
    ],
  },
  {
    category: 'Account',
    icon: '👤',
    items: [
      {
        q: 'How do I reset my password?',
        a: 'Go to the Login page and click "Forgot Password?" Enter your email address and we\'ll send you a password reset link.',
      },
      {
        q: 'How do I delete my account?',
        a: 'To request account deletion, please contact us via WhatsApp (+1 626 461-4963) with the email address associated with your account. We\'ll process the deletion within 5 business days.',
      },
      {
        q: 'Can I use the same account for both ordering and as a guest?',
        a: 'Yes. If you placed a guest order and then create an account with the same email, your order history may not automatically link. Contact us and we can manually associate past orders with your account.',
      },
    ],
  },
];

function FaqItem({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 bg-white hover:bg-secondary transition-colors"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-gray-900 leading-snug">{item.q}</span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground shrink-0 mt-0.5 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      {open && (
        <div className="px-5 pb-4 pt-1 bg-white border-t border-border">
          {typeof item.a === 'string' ? (
            <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
          ) : (
            item.a
          )}
        </div>
      )}
    </div>
  );
}

export default function FaqAccordion() {
  return (
    <div className="space-y-10">
      {FAQ_DATA.map((group) => (
        <div key={group.category}>
          <h2 className="font-display text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>{group.icon}</span>
            {group.category}
          </h2>
          <div className="space-y-2">
            {group.items.map((item) => (
              <FaqItem key={item.q} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
