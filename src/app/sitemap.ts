import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const BASE_URL = 'https://warungindomi.com';

const ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { path: '', changeFrequency: 'daily', priority: 1 },
  { path: '/products', changeFrequency: 'daily', priority: 0.9 },
  { path: '/cart', changeFrequency: 'weekly', priority: 0.5 },
  { path: '/checkout', changeFrequency: 'weekly', priority: 0.4 },
  { path: '/login', changeFrequency: 'monthly', priority: 0.3 },
  { path: '/register', changeFrequency: 'monthly', priority: 0.3 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/shipping-policy', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/return-policy', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.flatMap(({ path, changeFrequency, priority }) =>
    routing.locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${BASE_URL}/${l}${path}`])
        ),
      },
    }))
  );
}
