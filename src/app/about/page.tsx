import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle, Facebook, MapPin, Package, Phone, Star, Truck, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Warung Indo Michigan — your trusted source for authentic Indonesian groceries, shipped nationwide across the USA from Madison Heights, Michigan.',
  alternates: { canonical: 'https://warungindomi.com/about' },
};

const TRUST_POINTS = [
  {
    icon: Package,
    title: '366+ Authentic Products',
    desc: 'Carefully curated selection of genuine Indonesian brands across 12 categories — from Indomie to ABC to Kecap Bango.',
  },
  {
    icon: Truck,
    title: 'Nationwide Shipping',
    desc: 'We ship to all 50 US states via USPS and UPS. Real-time shipping rates calculated at checkout so there are no surprises.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    desc: 'Payments processed by Stripe, a PCI DSS Level 1 certified platform. We never store your card information.',
  },
  {
    icon: Star,
    title: 'Community-First',
    desc: 'Built for the Indonesian diaspora in America. We understand what you miss from home — and we\'re here to bridge that gap.',
  },
];

const CATEGORIES = [
  { icon: '🍜', name: 'Mie & Bubur', count: 16 },
  { icon: '☕', name: 'Minuman & Kopi', count: 24 },
  { icon: '🌶️', name: 'Sambal & Saus', count: 24 },
  { icon: '🧂', name: 'Bumbu & Rempah', count: 52 },
  { icon: '🍿', name: 'Snack & Kerupuk', count: 80 },
  { icon: '🎂', name: 'Bahan Kue & Masak', count: 25 },
  { icon: '🐟', name: 'Ikan Asin & Seafood', count: 25 },
  { icon: '🍡', name: 'Makanan Olahan & Kue', count: 32 },
  { icon: '💊', name: 'Obat & Kesehatan', count: 61 },
  { icon: '✨', name: 'Personal Care', count: 12 },
  { icon: '🥛', name: 'Susu & Dairy', count: 6 },
  { icon: '📦', name: 'Lain-lain', count: 9 },
];

export default function AboutPage() {
  return (
    <div>
      {/* Page header */}
      <div className="bg-white border-b border-border py-10">
        <div className="container-wim">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">About</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            About Warung Indo Michigan
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
            Your trusted source for authentic Indonesian groceries, delivered across the USA.
          </p>
        </div>
      </div>

      <div className="container-wim py-12">
        <div className="max-w-4xl">

          {/* Our Story */}
          <section className="mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Our Story</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-5 leading-tight">
              Bringing a Taste of Home to Every Corner of America
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                Warung Indo Michigan was born out of a simple, deeply felt need: the longing for
                the flavors of home. For the Indonesian diaspora scattered across the United
                States, finding authentic Indonesian products — the same brands you grew up with,
                the same tastes that remind you of your mother&apos;s cooking, your favorite street
                snack, the cup of kopi tubruk on a quiet morning — has always been a challenge.
              </p>
              <p>
                We are based in <strong>Madison Heights, Michigan</strong>, and we serve Indonesian
                communities across all 50 US states. What started as a way to meet local demand
                has grown into a mission: to make authentic Indonesian groceries accessible to
                every Indonesian in America, no matter where they live.
              </p>
              <p>
                We hand-select every product we carry — prioritizing genuine brands, checking
                freshness, and packing every order with care. When you order from us, you&apos;re not
                just buying groceries. You&apos;re getting a piece of home, shipped directly to your
                door.
              </p>
            </div>
          </section>

          {/* Why Trust Us */}
          <section className="mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Why Choose Us</p>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
              What Makes Us Different
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {TRUST_POINTS.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-xl border border-border bg-white p-5 flex gap-4"
                >
                  <div className="h-10 w-10 rounded-lg bg-[var(--secondary)] flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-gray-900 text-sm mb-1">{title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* What We Sell */}
          <section className="mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
              Our Products
            </p>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">
              366 Products Across 12 Categories
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              From everyday essentials like Indomie and kecap, to specialty items like jamu and
              ikan asin — we&apos;ve got you covered.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {CATEGORIES.map(({ icon, name, count }) => (
                <div
                  key={name}
                  className="rounded-xl border border-border bg-white p-4 flex items-center gap-3"
                >
                  <span className="text-2xl">{icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-900 leading-snug truncate">
                      {name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{count} products</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Location */}
          <section className="mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Location</p>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-5">Where We Are</h2>
            <div className="rounded-xl border border-border bg-white overflow-hidden">
              {/* Address info */}
              <div className="p-6 flex gap-4">
                <div className="h-10 w-10 rounded-lg bg-[var(--secondary)] flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">Warung Indo Michigan</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    28130 Park Ct<br />
                    Madison Heights, MI 48071<br />
                    United States
                  </p>
                  <p className="text-xs text-muted-foreground mt-3">
                    We primarily operate as an online store. Orders are packed and shipped from our
                    location in Madison Heights, Michigan.
                  </p>
                </div>
              </div>
              {/* Embed map */}
              <div className="border-t border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.711521957843!2d-83.09339298792929!3d42.49835017106019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824cff7ecab89f3%3A0x8b977f50f6518174!2s28130%20Park%20Ct%2C%20Madison%20Heights%2C%20MI%2048071!5e1!3m2!1sen!2sus!4v1781940774978!5m2!1sen!2sus"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Warung Indo Michigan location"
                />
              </div>
            </div>
          </section>

          {/* Contact */}
          <section>
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
              Get in Touch
            </p>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-5">
              We&apos;d Love to Hear from You
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Have a question about a product, your order, or just want to say hi? We respond
              quickly via WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/16264614963"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white text-sm font-semibold px-5 py-3 hover:bg-primary/90 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Chat via WhatsApp
              </a>
              <a
                href="tel:+16264614963"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white text-sm font-semibold px-5 py-3 text-gray-900 hover:bg-secondary transition-colors"
              >
                <Phone className="h-4 w-4" />
                Call +1 (626) 461-4963
              </a>
              <a
                href="https://www.facebook.com/levi.chen.11503/reels/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white text-sm font-semibold px-5 py-3 text-gray-900 hover:bg-secondary transition-colors"
              >
                <Facebook className="h-4 w-4" />
                Follow on Facebook
              </a>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/30 bg-[var(--secondary)] text-sm font-semibold px-5 py-3 text-primary hover:bg-primary hover:text-white transition-colors"
              >
                Browse Products
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
