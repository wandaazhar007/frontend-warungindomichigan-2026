import type { Metadata } from 'next';
import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-7rem)] grid grid-cols-1 lg:grid-cols-2">

      {/* Left panel — brand */}
      <div className="hidden lg:flex flex-col justify-between p-10 xl:p-14 relative overflow-hidden bg-wim-red-dark">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.5) 1px, transparent 0)`,
            backgroundSize: '28px 28px',
          }}
        />

        {/* Top: logo */}
        <div className="relative flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-lg bg-white/20 flex items-center justify-center">
            <span className="text-white font-display font-bold text-xl leading-none">W</span>
          </div>
          <div>
            <p className="font-display font-semibold text-white text-sm leading-none">Warung IndoMI</p>
            <p className="text-[11px] text-white/60 mt-0.5">Michigan</p>
          </div>
        </div>

        {/* Middle: headline */}
        <div className="relative">
          <div className="inline-flex items-center gap-1.5 bg-yellow-400/20 text-yellow-200 text-xs font-bold px-3 py-1.5 rounded-full mb-5 border border-yellow-400/30 uppercase tracking-widest">
            🙌 Welcomed Back
          </div>
          <h2 className="font-display text-3xl xl:text-4xl font-bold text-white leading-tight mb-4">
            The taste of home,<br />always close.
          </h2>
          <p className="text-white/70 text-sm leading-relaxed max-w-xs">
            Sign in to access your account, track orders, and enjoy exclusive deals from our Indonesian grocery store.
          </p>
        </div>

        {/* Bottom: trust badges */}
        <div className="relative flex flex-wrap gap-2">
          {['✅ 100% Halal', '🚚 Ships Nationwide', '🌴 Authentic Flavors'].map((badge) => (
            <span
              key={badge}
              className="bg-white/10 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex items-center justify-center bg-background p-6 sm:p-10">
        <div className="w-full max-w-md">

          {/* Tabs */}
          <div className="flex border border-border rounded-xl overflow-hidden mb-8">
            <div className="flex-1 bg-primary text-white text-sm font-semibold text-center py-3">
              Sign In
            </div>
            <Link
              href="/register"
              className="flex-1 text-gray-500 hover:text-gray-700 text-sm font-semibold text-center py-3 hover:bg-gray-50 transition-colors"
            >
              Sign Up
            </Link>
          </div>

          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold text-gray-900">Sign in to your account</h1>
            <p className="text-sm text-gray-500 mt-1">Sign in to continue shopping</p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
