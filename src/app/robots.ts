import { MetadataRoute } from 'next';

const BASE_URL = 'https://warungindomi.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/checkout/',
          '/order/',
          '/orders/',
          '/api/',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
