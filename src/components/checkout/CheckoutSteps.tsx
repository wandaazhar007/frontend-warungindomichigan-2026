import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const STEPS = [
  { n: 1, label: 'Informasi Kontak' },
  { n: 2, label: 'Pengiriman' },
  { n: 3, label: 'Pembayaran' },
];

export default function CheckoutSteps({ current }: { current: 1 | 2 | 3 }) {
  return (
    <nav aria-label="Checkout steps" className="flex items-center justify-center mb-10">
      {STEPS.map(({ n, label }, idx) => {
        const done    = n < current;
        const active  = n === current;
        const pending = n > current;

        return (
          <div key={n} className="flex items-center">
            {/* Circle */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors',
                  done    && 'bg-red-500 border-red-500 text-white',
                  active  && 'bg-white border-red-500 text-red-500',
                  pending && 'bg-white border-gray-200 text-gray-400'
                )}
              >
                {done ? <Check className="h-4 w-4" /> : n}
              </div>
              <span
                className={cn(
                  'mt-1 text-xs whitespace-nowrap',
                  active  && 'text-red-500 font-medium',
                  !active && 'text-gray-400'
                )}
              >
                {label}
              </span>
            </div>

            {/* Connector */}
            {idx < STEPS.length - 1 && (
              <div
                className={cn(
                  'h-0.5 w-16 sm:w-24 mx-2 mb-4 rounded transition-colors',
                  n < current ? 'bg-red-400' : 'bg-gray-200'
                )}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
