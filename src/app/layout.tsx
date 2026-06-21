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

const BASE_URL = 'https://warungindomi.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Warung Indo Michigan — Authentic Indonesian Grocery Store in the USA',
    template: '%s | Warung Indo Michigan',
  },
  description:
    'Shop authentic Indonesian groceries online — Indomie, sambal, bumbu, kopi, snack & more. Based in Madison Heights, Michigan. Fast shipping to all 50 states.',
  keywords: [
    'Indonesian grocery USA',
    'toko Indonesia Amerika',
    'Indonesian food online',
    'Indomie USA',
    'sambal Indonesia',
    'bumbu masak Indonesia',
    'kopi Indonesia',
    'snack Indonesia',
    'Indonesian store Michigan',
    'warung Indonesia Michigan',
    'Indonesian diaspora grocery',
    'Madison Heights Michigan Indonesian',
  ],
  authors: [{ name: 'Warung Indo Michigan', url: BASE_URL }],
  creator: 'Warung Indo Michigan',
  publisher: 'Warung Indo Michigan',
  category: 'shopping',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'id_ID',
    url: BASE_URL,
    siteName: 'Warung Indo Michigan',
    title: 'Warung Indo Michigan — Authentic Indonesian Grocery Store in the USA',
    description:
      'Shop authentic Indonesian groceries online — Indomie, sambal, bumbu, kopi, snack & more. Fast shipping to all 50 states from Madison Heights, Michigan.',
    images: [
      {
        url: '/images/hero-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Warung Indo Michigan — Authentic Indonesian Grocery Store',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Warung Indo Michigan — Authentic Indonesian Grocery Store in the USA',
    description:
      'Shop authentic Indonesian groceries online — Indomie, sambal, bumbu, kopi & more. Fast shipping to all 50 states.',
    images: ['/images/hero-image.jpg'],
  },
  icons: {
    icon: '/images/icon-warung-indomi.png',
    apple: '/images/icon-warung-indomi.png',
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: '',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'GroceryStore',
  name: 'Warung Indo Michigan',
  description:
    'Authentic Indonesian grocery store shipping nationwide across the USA. Specializing in Indonesian food products including Indomie, sambal, bumbu, kopi, and more.',
  url: BASE_URL,
  logo: `${BASE_URL}/images/icon-warung-indomi.png`,
  image: `${BASE_URL}/images/hero-image.jpg`,
  telephone: '+16264614963',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '28130 Park Ct',
    addressLocality: 'Madison Heights',
    addressRegion: 'MI',
    postalCode: '48071',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 42.4983502,
    longitude: -83.0933929,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  priceRange: '$$',
  currenciesAccepted: 'USD',
  paymentAccepted: 'Credit Card, Debit Card',
  sameAs: [
    'https://www.facebook.com/levi.chen.11503/reels/',
    'https://instagram.com/wanda_azharr/',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolageGrotesque.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
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
