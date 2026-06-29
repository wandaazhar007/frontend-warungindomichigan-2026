import Link from 'next/link';
import { MessageCircle, Facebook, MapPin, Phone } from 'lucide-react';

// ── Payment brand SVG logos ───────────────────────────────────────────────────

function VisaLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 16" width="38" height="13" aria-label="Visa">
      <text x="0" y="13" fontFamily="Arial, sans-serif" fontWeight="700" fontStyle="italic"
        fontSize="15" fill="#1A1F71" letterSpacing="-0.5">VISA</text>
    </svg>
  );
}

function MastercardLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24" width="38" height="24" aria-label="Mastercard">
      <circle cx="14" cy="12" r="10" fill="#EB001B" />
      <circle cx="24" cy="12" r="10" fill="#F79E1B" />
      <path d="M19 5.27A10 10 0 0 1 23.73 12 10 10 0 0 1 19 18.73 10 10 0 0 1 14.27 12 10 10 0 0 1 19 5.27z" fill="#FF5F00" />
    </svg>
  );
}

function AmexLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 16" width="40" height="14" aria-label="American Express">
      <text x="0" y="12" fontFamily="Arial, sans-serif" fontWeight="800"
        fontSize="12" fill="#007BC1" letterSpacing="0.5">AMEX</text>
    </svg>
  );
}

function StripeLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 25" width="42" height="18" aria-label="Stripe">
      <text x="0" y="18" fontFamily="Arial, sans-serif" fontWeight="700"
        fontSize="17" fill="#635BFF" letterSpacing="-0.3">stripe</text>
    </svg>
  );
}

const PAYMENT_BADGES = [
  { key: 'visa',       Logo: VisaLogo },
  { key: 'mc',         Logo: MastercardLogo },
  { key: 'amex',       Logo: AmexLogo },
  { key: 'stripe',     Logo: StripeLogo },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="bg-wim-maroon text-white mt-16">
      <div className="container-wim pt-14 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">

          {/* Brand + address */}
          <div className="sm:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <span className="text-white font-display font-bold text-xl leading-none">W</span>
              </div>
              <div>
                <p className="font-display font-bold text-white text-sm leading-none">Warung IndoMI</p>
                <p className="text-[10px] uppercase tracking-widest font-semibold mt-0.5 text-wim-faint">Michigan</p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs text-wim-faint">
              Authentic Indonesian groceries, delivered nationwide. Taste of home, wherever you are.
            </p>

            {/* Address */}
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="h-4 w-4 text-wim-faint" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-1 text-white">Our Location</p>
                <p className="text-sm text-wim-faint leading-relaxed">
                  28130 Park Ct<br />
                  Madison Heights, MI 48071<br />
                  United States
                </p>
              </div>
            </div>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Information</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/faq', label: 'FAQ' },
                { href: '/shipping-policy', label: 'Shipping Policy' },
                { href: '/return-policy', label: 'Return Policy' },
                { href: '/privacy-policy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms & Conditions' },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="text-sm transition-colors hover:text-white text-wim-faint">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Account</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/login', label: 'Sign In' },
                { href: '/register', label: 'Sign Up' },
                { href: '/orders', label: 'My Orders' },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="text-sm transition-colors hover:text-white text-wim-faint">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/16264614963?text=Hi%2C%20Warung%20IndoMI.%20Saya%20mau%20order%20dan%20bertanya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm transition-colors hover:text-white text-wim-faint"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  +1 (626) 461-4963
                </a>
              </li>
              <li>
                <a
                  href="tel:+16264614963"
                  className="flex items-center gap-2 text-sm transition-colors hover:text-white text-wim-faint"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  +1 (626) 461-4963
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/levi.chen.11503/reels/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm transition-colors hover:text-white text-wim-faint"
                >
                  <Facebook className="h-4 w-4 shrink-0" />
                  Follow on Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider + bottom bar */}
        <div className="border-t border-white/[0.08] pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
              <p className="text-xs text-white">
                © 2026 Warung Indo Michigan. All rights reserved.
              </p>
              <div className="flex items-center gap-3">
                {[
                  { href: '/privacy-policy', label: 'Privacy' },
                  { href: '/terms', label: 'Terms' },
                  { href: '/return-policy', label: 'Returns' },
                ].map(({ href, label }) => (
                  <Link key={href} href={href} className="text-[11px] text-wim-faint hover:text-white transition-colors">
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Payment brand badges */}
            <div className="flex items-center gap-2">
              {PAYMENT_BADGES.map(({ key, Logo }) => (
                <div
                  key={key}
                  className="h-8 px-2.5 rounded bg-white flex items-center justify-center shadow-sm"
                >
                  <Logo />
                </div>
              ))}
            </div>

            <p className="text-xs text-white">
              Built with ❤️ by{' '}
              <a
                href="https://instagram.com/wanda_azharr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wim-faint hover:text-white underline underline-offset-2 transition-colors"
              >
                Wanda Azhar
              </a>{' '}
              in Michigan, USA
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
