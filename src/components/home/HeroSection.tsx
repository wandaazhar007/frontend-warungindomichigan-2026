'use client';

import Link from 'next/link';
import { ShoppingBag, Package, MapPin, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  { icon: Package,    value: '366+',             label: 'Produk' },
  { icon: ShoppingBag, value: '12',              label: 'Kategori' },
  { icon: MapPin,     value: 'Seluruh USA',      label: '' },
  { icon: Truck,      value: 'Pengiriman',        label: 'Terpercaya' },
];

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-red-50 via-white to-white overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-red-100 opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-red-50 opacity-60 blur-2xl pointer-events-none" />

      <div className="container-wim relative py-20 lg:py-28">
        <div className="max-w-3xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-red-100 text-red-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-red-200">
            🇮🇩 Toko Grocery Indonesia #1 di USA
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-800 text-gray-900 leading-tight mb-6">
            Your Favorite Indonesian Groceries,{' '}
            <span className="text-red-500">Delivered Across the USA</span>
          </h1>

          {/* Sub-heading */}
          <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-2xl mx-auto">
            Dari Michigan untuk seluruh diaspora Indonesia di Amerika. Bumbu, mie, sambal, kopi, snack, dan ratusan produk Indonesia lainnya — dikirim langsung ke pintumu.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/products">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Belanja Sekarang
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/products">Lihat Semua Produk</Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={value}
              className="flex flex-col items-center bg-white rounded-xl border border-gray-100 shadow-sm py-4 px-3"
            >
              <Icon className="h-5 w-5 text-red-500 mb-2" />
              <span className="font-display font-700 text-gray-900 text-lg leading-none">{value}</span>
              {label && <span className="text-xs text-gray-500 mt-0.5">{label}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
