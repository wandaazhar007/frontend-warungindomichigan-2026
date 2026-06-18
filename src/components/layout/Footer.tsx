import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="container-wim py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">

          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <Image
                src="/images/logo/logo-icon-warungindomichigan.png"
                alt="Warung Indo Michigan — Indonesian Grocery Store"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="font-display font-semibold text-gray-900">
                Warung Indo Michigan
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Taste of Home, Wherever You Are
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-8">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Belanja</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/products" className="text-sm text-gray-500 hover:text-red-500 transition-colors">
                    Semua Produk
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="text-sm text-gray-500 hover:text-red-500 transition-colors">
                    Keranjang
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Akun</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/login" className="text-sm text-gray-500 hover:text-red-500 transition-colors">
                    Masuk
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-sm text-gray-500 hover:text-red-500 transition-colors">
                    Daftar
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Hubungi Kami</h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://wa.me/16264614963"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                +1 (626) 461-4963
              </a>
              <a
                href="https://www.facebook.com/levi.chen.11503/reels/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
              >
                <Facebook className="h-4 w-4 shrink-0" />
                Ikuti kami di Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            © 2026 Warung Indo Michigan. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">Built with ❤️ in Michigan, USA</p>
        </div>
      </div>
    </footer>
  );
}
