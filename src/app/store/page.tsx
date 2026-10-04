import type { Metadata } from 'next';
import { StoreClient } from '@/components/customer/StoreClient';
import { getBaseUrl, generateLocalBusinessSchema, generateBreadcrumbSchema } from '@/lib/seo/config';
import { getStoreSettings } from '@/lib/data/products-server';

export const metadata: Metadata = {
  title: 'Visit Showroom in Begampur - Store Directions & Hours',
  description: 'Visit Galaxy Mobile Gallery at Main Road, Bazar Peth, Begampur, Solapur. Open 10 AM to 9 PM daily. Call +91 9067228008 for live stock, demos & directions.',
  alternates: {
    canonical: '/store',
  },
  openGraph: {
    title: 'Visit Galaxy Mobile Gallery in Begampur, Solapur | Official VIVO Showroom',
    description: 'Walk into our Begampur showroom for hands-on flagship smartphone demos, instant Bajaj Finance 0% EMI, and genuine accessories.',
    url: `${getBaseUrl()}/store`,
    type: 'website',
  },
};

export default function StorePage() {
  const settings = getStoreSettings();
  const localBusinessSchema = generateLocalBusinessSchema(settings);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Visit Store', url: '/store' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <StoreClient />
    </>
  );
}
