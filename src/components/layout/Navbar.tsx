'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, User, Menu, X, LogOut, Package } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { signOut } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const totalItems = useCartStore((s) => s.totalItems());
  const { user, loading } = useAuthStore();

  // Close user dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const displayName = user?.displayName ?? user?.email?.split('@')[0] ?? 'Akun';

  async function handleSignOut() {
    await signOut();
    setUserMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container-wim">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/logo/logo-icon-warungindomichigan.png"
              alt="Warung Indo Michigan — Indonesian Grocery Store"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <span className="font-display font-semibold text-gray-900 text-base leading-tight hidden sm:block">
              Warung Indo<br />
              <span className="text-red-500">Michigan</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/" className="text-sm text-gray-700 hover:text-red-500 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors">
              Beranda
            </Link>
            <Link href="/products" className="text-sm text-gray-700 hover:text-red-500 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors">
              Produk
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">

            {/* Cart */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" aria-label="Keranjang">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-semibold">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {/* Auth — desktop */}
            {!loading && (
              <div className="hidden md:block">
                {user ? (
                  // Logged-in dropdown
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen((v) => !v)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="h-7 w-7 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                        <User className="h-4 w-4 text-red-500" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 max-w-24 truncate">
                        {displayName}
                      </span>
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl border border-gray-200 shadow-lg py-1 z-50">
                        <Link
                          href="/orders"
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Package className="h-4 w-4 text-gray-400" />
                          Riwayat Pesanan
                        </Link>
                        <hr className="my-1 border-gray-100" />
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4" />
                          Keluar
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  // Guest buttons
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/login">
                        <User className="h-4 w-4 mr-1.5" />
                        Masuk
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/register">Daftar</Link>
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden border-t border-gray-100 bg-white overflow-hidden transition-all duration-200',
          mobileOpen ? 'max-h-80' : 'max-h-0'
        )}
      >
        <nav className="container-wim py-3 flex flex-col gap-1">
          <Link href="/" className="text-sm text-gray-700 hover:text-red-500 px-3 py-2 rounded-lg hover:bg-red-50" onClick={() => setMobileOpen(false)}>
            Beranda
          </Link>
          <Link href="/products" className="text-sm text-gray-700 hover:text-red-500 px-3 py-2 rounded-lg hover:bg-red-50" onClick={() => setMobileOpen(false)}>
            Produk
          </Link>

          {!loading && (
            user ? (
              <>
                <Link href="/orders" className="text-sm text-gray-700 hover:text-red-500 px-3 py-2 rounded-lg hover:bg-red-50" onClick={() => setMobileOpen(false)}>
                  Riwayat Pesanan
                </Link>
                <button
                  onClick={() => { handleSignOut(); setMobileOpen(false); }}
                  className="text-sm text-red-500 text-left px-3 py-2 rounded-lg hover:bg-red-50"
                >
                  Keluar
                </button>
              </>
            ) : (
              <div className="flex gap-2 pt-2 border-t border-gray-100">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link href="/login" onClick={() => setMobileOpen(false)}>Masuk</Link>
                </Button>
                <Button size="sm" className="flex-1" asChild>
                  <Link href="/register" onClick={() => setMobileOpen(false)}>Daftar</Link>
                </Button>
              </div>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
