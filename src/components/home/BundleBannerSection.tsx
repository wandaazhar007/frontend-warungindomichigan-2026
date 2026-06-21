import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function BundleBannerSection() {
  return (
    <section className="py-8 sm:py-10">
      <div className="container-wim">
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden relative bg-wim-red-dark min-h-[280px] sm:min-h-[320px]">

          {/* Subtle background pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Right-side image — fills top, bottom, right */}
          <div className="absolute top-0 right-0 bottom-0 w-1/2 md:w-[45%]">
            {/* Fade gradient on the left edge so image blends into red */}
            <div className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-wim-red-dark to-transparent" />
            <Image
              src="/images/hero-image.jpg"
              alt="Indonesian grocery bundle"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 50vw, 45vw"
            />
          </div>

          {/* Content — left side only */}
          <div className="relative z-10 flex items-center p-8 md:p-12 w-full md:w-[55%]">
            <div className="text-white max-w-lg">
              <div className="inline-flex items-center gap-1.5 bg-yellow-400/20 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest border border-yellow-400/30">
                Weekly Special
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3 leading-tight">
                This week&rsquo;s<br className="hidden sm:block" /> dapur bundle
              </h2>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6 max-w-sm">
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
          </div>

        </div>
      </div>
    </section>
  );
}
