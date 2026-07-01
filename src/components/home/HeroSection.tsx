'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="bg-background overflow-hidden">
      <div className="container-wim py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* ── Left: text ── */}
          <div>
            {/* Top badge */}
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold mb-4 text-wim-text2">
              <span className="h-1.5 w-1.5 rounded-full inline-block flex-shrink-0 bg-wim-yellow" />
              Indonesian grocery store · since 2019
            </div>

            {/* Heading — large, tight, heavy */}
            <h1 className="font-display font-black leading-[1.0] mb-5 text-foreground"
              style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.2rem)', letterSpacing: '-0.02em' }}>
              Indonesian flavors,<br />
              delivered to your<br />
              door{' '}
              <em className="italic text-primary">
                across the U.S.
              </em>
            </h1>

            {/* Description */}
            <p className="text-[15px] leading-relaxed mb-7 max-w-[360px] text-wim-text2">
              Authentic Indonesian pantry staples — kecap manis, sambal, kopi, teh, and more — shipped fresh to Indonesians in all 50 states. As complete as the warung back home.
            </p>

            {/* CTA buttons */}
            <div className="flex items-center gap-3 mb-7 flex-wrap">
              <Link
                href="/products"
                className="inline-flex items-center justify-center font-bold text-white text-sm px-6 py-3 rounded-xl transition-colors bg-primary hover:bg-wim-red-hover"
              >
                Shop Now
              </Link>
              <a
                href="https://wa.me/16264614963?text=Hi%2C%20Warung%20IndoMi.%20Saya%20mau%20order%20dan%20bertanya"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-6 py-3 rounded-xl border border-border transition-colors bg-white hover:bg-gray-50 text-foreground"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0" fill="#25D366" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>

            {/* Bottom trust badges — pill style */}
            <div className="flex items-center gap-2 flex-wrap">
              {['100% Halal', 'Shipped Fresh', 'Ships Nationwide'].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full border bg-card border-border text-wim-text2"
                >
                  <span className="h-1.5 w-1.5 rounded-full inline-block flex-shrink-0 bg-primary" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: hero image ── */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[520px]">

              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden product-img-bg aspect-[4/3] border border-border">
                <Image
                  src="/images/hero-image.jpg"
                  alt="Indonesian grocery products — Warung IndoMi"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 520px"
                  priority
                />
              </div>

              {/* "Ships today" badge — top right, NOT rounded-full */}
              <div className="absolute -top-3 right-4 text-center px-3 py-2 rounded-xl shadow-md bg-wim-yellow"
                style={{ transform: 'rotate(8deg)' }}>
                <p className="text-[16px] font-extrabold text-black leading-none">Ships today</p>
                <p className="text-[14px] text-black/80 mt-0.5">Order before 2pm</p>
              </div>

              {/* Rating card — bottom left */}
              <div className="absolute -bottom-4 left-4 bg-white rounded-xl px-3.5 py-2.5 shadow-lg border border-border flex items-center gap-2.5">
                {/* Green icon square */}
                <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0 bg-wim-green">
                  <span className="text-white text-sm font-bold leading-none">★</span>
                </div>
                <div>
                  <p className="font-bold text-sm leading-none text-foreground">4.9 / 5.0</p>
                  <p className="text-[10px] mt-0.5 text-muted-foreground">
                    12.000+ Indonesian families in the U.S.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
