import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { getBaseUrl } from '@/lib/seo/config';

export default async function robots(): Promise<MetadataRoute.Robots> {
  let host: string | null = null;
  let proto: string | null = null;
  try {
    const headerList = await headers();
    host = headerList.get('x-forwarded-host') || headerList.get('host');
    proto = headerList.get('x-forwarded-proto') || (host?.includes('localhost') ? 'http' : 'https');
  } catch {
    // Falls back gracefully during static build phase
  }

  const baseUrl = getBaseUrl(host, proto);

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/admin',
          '/api/',
          '/api',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/admin',
          '/api/',
          '/api',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
