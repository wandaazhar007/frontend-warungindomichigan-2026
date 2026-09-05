'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const LOCALE_LABELS: Record<string, string> = {
  en: 'EN',
  id: 'ID',
};

export default function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function handleSwitch(nextLocale: string) {
    router.replace(
      // @ts-expect-error -- params from next/navigation may not match typed routes
      { pathname, params },
      { locale: nextLocale }
    );
  }

  return (
    <div className={cn('flex items-center gap-0.5 px-1', className)}>
      {routing.locales.map((l) => (
        <button
          key={l}
          onClick={() => handleSwitch(l)}
          className={cn(
            'text-xs font-bold px-2 py-1 rounded-md transition-colors',
            l === locale
              ? 'bg-primary text-white'
              : 'text-wim-faint hover:bg-gray-100'
          )}
          aria-current={l === locale}
        >
          {LOCALE_LABELS[l]}
        </button>
      ))}
    </div>
  );
}
