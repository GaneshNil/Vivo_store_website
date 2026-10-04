import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { getBaseUrl } from '@/lib/seo/config';
import { getAllProducts } from '@/lib/data/products-server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
  const currentDate = new Date().toISOString();

  // Static high-priority core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/mobiles`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/new-arrivals`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/accessories`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/offers`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/store`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/brands`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Dynamic product routes
  const products = getAllProducts();
  const productRoutes: MetadataRoute.Sitemap = products.map(product => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: product.is_featured ? 0.85 : 0.75,
  }));

  return [...staticRoutes, ...productRoutes];
}
