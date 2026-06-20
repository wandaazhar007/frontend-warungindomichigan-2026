'use client';

import Link from 'next/link';
import { ShoppingBasket, Menu, X, LogOut, Package, ChevronDown, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { signOut } from '@/lib/auth';
import { getCategories } from '@/lib/api';
import { Category } from '@/types';
import { cn } from '@/lib/utils';

const announcements = [
  'Shipping nationwide across the U.S.',
  'Order before 2 PM, ships today',
  'Authentic Indonesian flavors, delivered to your door',
  'Free delivery on orders over $50',
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [catMenuOpen, setCatMenuOpen]   = useState(false);
  const [categories, setCategories]     = useState<Category[]>([]);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const catMenuRef  = useRef<HTMLDivElement>(null);

  const totalItems = useCartStore((s) => s.totalItems());
  const { user, loading } = useAuthStore();

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
      if (catMenuRef.current && !catMenuRef.current.contains(e.target as Node)) {
        setCatMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const displayName = user?.displayName ?? user?.email?.split('@')[0] ?? 'Account';

  async function handleSignOut() {
    await signOut();
    setUserMenuOpen(false);
  }

  const tickerItems = [...announcements, ...announcements, ...announcements];

  return (
    <header className="sticky top-0 z-50">

      {/* ── Announcement ticker ── */}
      <div className="hidden sm:flex bg-wim-divider border-b border-border overflow-hidden h-8 items-center">
        <div className="ticker-track flex items-center">
          {tickerItems.map((msg, i) => (
            <span key={i} className="whitespace-nowrap text-[11px] font-medium flex-shrink-0 px-8 text-wim-text2">
              {msg}
              <span className="ml-8 text-wim-faint">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Main navbar ── */}
      <div className="bg-white border-b border-border shadow-sm">
        <div className="container-wim flex items-center justify-between h-14">

          {/* ── Left: Logo ── */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <span className="text-white font-display font-bold text-base leading-none">W</span>
            </div>
            <div className="leading-tight hidden sm:block">
              <p className="font-display font-bold text-[13px] leading-none tracking-tight text-foreground">
                Warung IndoMI
              </p>
              <p className="text-[9px] uppercase tracking-widest font-semibold mt-0.5 text-wim-faint">
                Michigan
              </p>
            </div>
          </Link>

          {/* ── Right: Categories + Auth + Cart ── */}
          <div className="flex items-center gap-1">

            {/* Categories dropdown — desktop only */}
            <div className="hidden md:block relative" ref={catMenuRef}>
              <button
                onClick={() => setCatMenuOpen((v) => !v)}
                className="flex items-center gap-1 text-sm font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-foreground"
              >
                Categories
                <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', catMenuOpen && 'rotate-180')} />
              </button>

              {catMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-border shadow-lg py-1.5 z-50">
                  <Link
                    href="/products"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-secondary transition-colors text-foreground"
                    onClick={() => setCatMenuOpen(false)}
                  >
                    <span>🛒</span> All Products
                  </Link>
                  <div className="border-t border-border my-1" />
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/products?category=${cat.slug}`}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-secondary transition-colors text-foreground"
                      onClick={() => setCatMenuOpen(false)}
                    >
                      <span>{cat.icon ?? '📦'}</span>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Auth — desktop */}
            {!loading && (
              <div className="hidden md:flex items-center gap-1">
                {user ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen((v) => !v)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="h-7 w-7 rounded-full flex items-center justify-center shrink-0 bg-secondary">
                        <User className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className="text-sm font-medium max-w-[90px] truncate text-foreground">
                        {displayName}
                      </span>
                    </button>
                    {userMenuOpen && (
                      <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl border border-border shadow-lg py-1 z-50">
                        <Link href="/orders"
                          className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-gray-50 text-foreground"
                          onClick={() => setUserMenuOpen(false)}>
                          <Package className="h-4 w-4 text-wim-faint" />
                          My Orders
                        </Link>
                        <div className="border-t border-border my-1" />
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link href="/login"
                      className="text-sm font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-foreground">
                      Sign In
                    </Link>
                    <Link href="/register"
                      className="text-sm font-bold text-white px-4 py-1.5 rounded-lg transition-colors ml-0.5 bg-primary hover:bg-wim-red-hover">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}

            {/* Cart icon */}
            <Link href="/cart" className="relative ml-1">
              <div className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                <ShoppingBasket className="h-5 w-5 text-foreground" />
              </div>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full text-white text-[9px] flex items-center justify-center font-bold bg-wim-yellow">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gray-100 ml-0.5"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              {mobileOpen
                ? <X className="h-5 w-5 text-foreground" />
                : <Menu className="h-5 w-5 text-foreground" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <div className={cn(
        'md:hidden bg-white border-b border-border overflow-hidden transition-all duration-300',
        mobileOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
      )}>
        <div className="container-wim py-4 flex flex-col gap-1">
          <Link href="/products"
            className="text-sm font-semibold px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors text-foreground"
            onClick={() => setMobileOpen(false)}>
            🛒 All Products
          </Link>
          {categories.slice(0, 8).map((cat) => (
            <Link key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-wim-text2"
              onClick={() => setMobileOpen(false)}>
              <span>{cat.icon ?? '📦'}</span>
              {cat.name}
            </Link>
          ))}

          {!loading && (
            <div className="mt-2 pt-3 border-t border-border">
              {user ? (
                <>
                  <Link href="/orders"
                    className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg hover:bg-gray-50 text-foreground"
                    onClick={() => setMobileOpen(false)}>
                    <Package className="h-4 w-4 text-wim-faint" />
                    My Orders
                  </Link>
                  <button
                    onClick={() => { handleSignOut(); setMobileOpen(false); }}
                    className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-red-600 rounded-lg hover:bg-red-50 text-left">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex gap-2">
                  <Link href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center text-sm font-semibold py-2 rounded-lg border border-border transition-colors text-foreground">
                    Sign In
                  </Link>
                  <Link href="/register"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center text-sm font-bold text-white py-2 rounded-lg transition-colors bg-primary hover:bg-wim-red-hover">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
