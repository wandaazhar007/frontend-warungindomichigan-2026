import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* shadcn/ui semantic tokens */
        border:     'var(--border)',
        input:      'var(--input)',
        ring:       'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT:    'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT:    'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT:    'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT:    'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT:    'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        card: {
          DEFAULT:    'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT:    'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },

        /* WIM 2026 brand palette */
        wim: {
          red:        '#d92121',   /* primary red */
          'red-hover':'#b81d1d',   /* button hover */
          'red-deep': '#9e1717',   /* prices, shadows */
          'red-dark': '#8B1A1A',   /* deep red panels (login/bundle) */
          maroon:     '#3a1410',   /* footer bg, darkest */
          cream:      '#FBF3E3',   /* page bg */
          card:       '#FFFDF7',   /* card surface */
          tint:       '#F6ECD8',   /* tinted section bg */
          border:     '#EADDC6',   /* border */
          divider:    '#F0E6D2',   /* subtle divider */
          yellow:     '#E59500',   /* turmeric yellow */
          green:      '#2F7A4F',   /* pandan green */
          gold:       '#B07A2E',   /* golden-brown labels */
          text:       '#2B1A12',   /* primary text */
          text2:      '#5a4733',   /* secondary text */
          muted:      '#7A6A57',   /* muted text */
          faint:      '#A8967B',   /* placeholder / faint text */
        },

        /* Keep red scale updated */
        red: {
          50:  '#FFF3EE',
          100: '#FFE0D0',
          200: '#FFBBA0',
          400: '#E05050',
          500: '#d92121',
          600: '#b81d1d',
          700: '#9e1717',
          900: '#3a1410',
        },
        gray: {
          50:  '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          400: '#A1A1AA',
          500: '#71717A',
          700: '#3F3F46',
          900: '#18181B',
        },
        success: '#2F7A4F',
        warning: '#E59500',
        error:   '#EF4444',
        info:    '#3B82F6',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body:    ['var(--font-body)',    'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
