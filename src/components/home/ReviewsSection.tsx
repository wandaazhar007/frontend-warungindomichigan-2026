'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    name: 'Siti Rahmawati',
    location: 'Ann Arbor, MI',
    rating: 5,
    text: 'Warung IndoMi is a lifesaver! Finally I can get Indomie Goreng and Sambal ABC without driving hours away. The shipping is fast and everything arrives in perfect condition.',
    initials: 'SR',
  },
  {
    name: 'Budi Santoso',
    location: 'Detroit, MI',
    rating: 5,
    text: 'Harga terjangkau, pengiriman cepat, dan produknya original. Saya sudah berlangganan hampir 6 bulan dan tidak pernah kecewa! Highly recommended buat komunitas Indonesia di Michigan.',
    initials: 'BS',
  },
  {
    name: 'Jessica Chen',
    location: 'Lansing, MI',
    rating: 5,
    text: 'As someone who grew up eating Indonesian food, finding this store was amazing. The selection is incredible and the quality is always fresh. Love the fast shipping too!',
    initials: 'JC',
  },
  {
    name: 'Dewi Kusuma',
    location: 'Grand Rapids, MI',
    rating: 5,
    text: 'Sudah lama cari tempat beli kecap manis dan terasi yang asli Indonesia. Akhirnya ketemu juga! Paketnya rapi, cepat sampai, dan harganya bersaing. Pasti order lagi!',
    initials: 'DK',
  },
  {
    name: 'Ahmad Fauzi',
    location: 'Kalamazoo, MI',
    rating: 5,
    text: 'Best Indonesian grocery store online! I ordered rendang paste, coconut milk, and pandan extract — all arrived within 2 days. The packaging was secure and nothing was damaged.',
    initials: 'AF',
  },
  {
    name: 'Rina Wulandari',
    location: 'Flint, MI',
    rating: 5,
    text: 'Senang banget ada Warung IndoMi. Saya bisa masak makanan Indonesia favorit di rumah tanpa ribet. Pelayanannya ramah dan responsif banget kalau ada pertanyaan. 10/10!',
    initials: 'RW',
  },
];

export default function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: 'left' | 'right') {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('div')?.offsetWidth ?? 320;
    el.scrollBy({ left: direction === 'left' ? -(cardWidth + 20) : cardWidth + 20, behavior: 'smooth' });
  }

  return (
    <section className="py-16 bg-secondary">
      <div className="container-wim">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-1.5 text-wim-gold">
            Testimonials
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
            What our customers say
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Loved by Indonesian diaspora communities across the U.S.
          </p>
        </div>

        {/* Carousel wrapper */}
        <div className="relative">
          {/* Left button */}
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-card border border-border shadow-sm flex items-center justify-center text-wim-text2 hover:bg-primary hover:text-white hover:border-primary transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scroll-smooth pb-2 px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map(({ name, location, rating, text, initials }) => (
              <div
                key={name}
                className="rounded-2xl border border-border p-6 flex flex-col bg-card shrink-0 w-[300px] sm:w-[340px]"
              >
                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: rating }).map((_, i) => (
                    <span key={i} className="text-lg leading-none text-wim-yellow">★</span>
                  ))}
                </div>

                <p className="text-sm leading-relaxed flex-1 mb-5 text-wim-text2">
                  &ldquo;{text}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center shrink-0 bg-primary/10">
                    <span className="font-bold text-sm text-primary">{initials}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm leading-none text-foreground">{name}</p>
                    <p className="text-xs mt-0.5 text-wim-faint">{location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right button */}
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-card border border-border shadow-sm flex items-center justify-center text-wim-text2 hover:bg-primary hover:text-white hover:border-primary transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
