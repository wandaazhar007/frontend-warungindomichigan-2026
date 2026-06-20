import type { Metadata } from 'next';
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthProvider from '@/components/providers/AuthProvider';

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Warung Indo Michigan — Indonesian Grocery Store in USA',
    template: '%s — Warung Indo Michigan',
  },
  description:
    'Toko grocery Indonesia terpercaya yang melayani komunitas diaspora Indonesia di seluruh USA. 366+ produk — bumbu, mie, sambal, kopi, snack & lebih. Pesan sekarang, kirim ke pintumu.',
  keywords: [
    'Indonesian grocery USA',
    'toko indonesia america',
    'bumbu masak indonesia',
    'indomie usa',
    'sambal indonesia',
    'kopi indonesia',
    'snack indonesia',
  ],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://warungindomichigan.com',
    siteName: 'Warung Indo Michigan',
    title: 'Warung Indo Michigan — Indonesian Grocery Store in USA',
    description:
      'Toko grocery Indonesia terpercaya yang melayani komunitas diaspora Indonesia di seluruh USA.',
    images: [
      {
        url: '/images/og/og-image-warungindomichigan.jpg',
        width: 1200,
        height: 630,
        alt: 'Warung Indo Michigan — Indonesian Grocery Store',
      },
    ],
  },
  icons: {
    icon: '/images/logo/logo-icon-warungindomichigan.png',
    apple: '/images/logo/logo-icon-warungindomichigan.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${bricolageGrotesque.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col bg-background">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
