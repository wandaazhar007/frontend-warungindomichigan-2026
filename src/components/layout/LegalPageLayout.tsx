import { ReactNode } from 'react';

interface LegalPageLayoutProps {
  label: string;
  title: string;
  subtitle?: string;
  lastUpdated?: string;
  children: ReactNode;
}

export default function LegalPageLayout({
  label,
  title,
  subtitle,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <div>
      <div className="bg-white border-b border-border py-10">
        <div className="container-wim">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{label}</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{title}</h1>
          {subtitle && (
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">{subtitle}</p>
          )}
          {lastUpdated && (
            <p className="text-xs text-muted-foreground mt-3">Last updated: {lastUpdated}</p>
          )}
        </div>
      </div>

      <div className="container-wim py-12">
        <div className="max-w-3xl prose-wim">{children}</div>
      </div>
    </div>
  );
}

// Prose helper components for consistent typography
export function ProseH2({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-xl font-bold text-gray-900 mt-10 mb-3 first:mt-0">
      {children}
    </h2>
  );
}

export function ProseH3({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-display text-base font-semibold text-gray-900 mt-6 mb-2">
      {children}
    </h3>
  );
}

export function ProseP({ children }: { children: ReactNode }) {
  return (
    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{children}</p>
  );
}

export function ProseUl({ children }: { children: ReactNode }) {
  return (
    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5 mb-4 pl-1">
      {children}
    </ul>
  );
}

export function ProseDivider() {
  return <hr className="border-border my-8" />;
}

export function ProseContactBox() {
  return (
    <div className="mt-10 rounded-xl bg-[var(--secondary)] border border-border p-6">
      <p className="text-sm font-semibold text-gray-900 mb-1">Questions? Contact Us</p>
      <p className="text-sm text-muted-foreground mb-4">
        We&apos;re happy to help with any questions about our policies.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="https://wa.me/16264614963"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white text-sm font-semibold px-4 py-2.5 hover:bg-primary/90 transition-colors"
        >
          💬 WhatsApp Us
        </a>
        <a
          href="tel:+16264614963"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white text-sm font-semibold px-4 py-2.5 text-gray-900 hover:bg-secondary transition-colors"
        >
          📞 Call +1 (626) 461-4963
        </a>
      </div>
    </div>
  );
}
