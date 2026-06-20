import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const bundleItems = [
  { emoji: '🌶️', label: 'Sambal ABC' },
  { emoji: '🍜', label: 'Indomie Goreng' },
  { emoji: '☕', label: 'Kopi Kapal Api' },
  { emoji: '🥥', label: 'Bumbu Rendang' },
];

export default function BundleBannerSection() {
  return (
    <section className="py-8 sm:py-10">
      <div className="container-wim">
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden relative bg-wim-red-dark">
          {/* Subtle background pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)`,
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12">

            {/* Left: text */}
            <div className="text-white max-w-lg text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 bg-yellow-400/20 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest border border-yellow-400/30">
                Weekly Special
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3 leading-tight">
                This week&rsquo;s<br className="hidden sm:block" /> dapur bundle
              </h2>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6 max-w-sm mx-auto md:mx-0">
                Get your kitchen fully stocked with our curated Indonesian cooking essentials.
                Everything you need to cook your favorite dishes at home.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-3 rounded-xl text-sm transition-colors"
              >
                Shop Bundle
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Right: product cards */}
            <div className="flex gap-2 sm:gap-3 shrink-0">
              {bundleItems.map(({ emoji, label }) => (
                <div
                  key={label}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl h-20 w-16 sm:h-24 sm:w-20 flex flex-col items-center justify-center gap-1.5"
                >
                  <span className="text-2xl sm:text-3xl">{emoji}</span>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-white/80 text-center leading-tight px-1">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
