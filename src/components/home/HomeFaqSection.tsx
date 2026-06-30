'use client';

import { useState } from 'react';
import { ChevronDown, Phone } from 'lucide-react';
import Link from 'next/link';

interface FaqItem {
  q: string;
  a: string;
}

const HOME_FAQS: FaqItem[] = [
  {
    q: 'Do I need an account to place an order?',
    a: 'No! We support guest checkout — simply enter your contact info and shipping address at checkout. However, creating an account lets you track your order history and save your addresses for faster future checkouts.',
  },
  {
    q: 'How long does shipping take?',
    a: 'We process orders within 1–2 business days. After that, estimated delivery is 3–7 business days depending on your location. USPS Priority Mail typically takes 1–3 days; USPS Ground Advantage 2–5 days; UPS Ground 1–5 days.',
  },
  {
    q: 'How are shipping costs calculated?',
    a: 'Shipping costs are calculated at checkout based on the total weight of your order and your delivery address. You\'ll see the exact rate before entering payment information — no surprises.',
  },
  {
    q: 'Are your products authentic Indonesian brands?',
    a: 'Absolutely. All products we carry are genuine, original Indonesian brands — the same ones you\'d find at a supermarket in Indonesia. We do not sell counterfeit or knock-off products.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards: Visa, Mastercard, American Express, and Discover. Payments are processed securely through Stripe — your card information is never stored on our servers.',
  },
];

function FaqItem({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border border-gray-200 rounded-xl overflow-hidden transition-shadow ${
        open ? 'shadow-sm' : ''
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 bg-white hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <div className="flex items-start gap-3">
          <span className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center">
            {index + 1}
          </span>
          <span className="text-sm font-semibold text-gray-900 leading-snug">{item.q}</span>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 shrink-0 mt-0.5 transition-transform duration-200 ${
            open ? 'rotate-180 text-red-500' : ''
          }`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-2 bg-white border-t border-gray-100">
          {/* left accent bar */}
          <div className="pl-8">
            <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HomeFaqSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-wim">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-red-500 mb-3">
            FAQ
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Questions? We Have Answers
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
            Everything you need to know about ordering Indonesian groceries from Warung Indo Michigan.
          </p>
        </div>

        {/* FAQ list */}
        <div className="max-w-2xl mx-auto space-y-3">
          {HOME_FAQS.map((item, i) => (
            <FaqItem key={item.q} item={item} index={i} />
          ))}
        </div>

        {/* CTA buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/faq"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:border-red-300 hover:text-red-600 transition-colors"
          >
            See all FAQ
          </Link>
          <a
            href="https://wa.me/16264614963"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-6 py-3 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
          >
            <Phone className="h-4 w-4" />
            Call Us
          </a>
        </div>
      </div>
    </section>
  );
}
