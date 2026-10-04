import type { Metadata } from 'next';
import { AccessoriesClient } from '@/components/customer/AccessoriesClient';
import { getBaseUrl, generateBreadcrumbSchema } from '@/lib/seo/config';

export const metadata: Metadata = {
  title: 'Genuine Mobile Accessories, Chargers & Tempered Glass',
  description: 'Buy official FlashCharge adapters, 9H UV curved tempered glass, power banks, TWS earphones & shockproof covers at Galaxy Mobile Gallery Begampur, Solapur.',
  alternates: {
    canonical: '/accessories',
  },
  openGraph: {
    title: 'Genuine Mobile Accessories & Chargers | Galaxy Mobile Gallery Begampur',
    description: 'Original brand-certified adapters, screen protectors, durable cases, and audio accessories in Begampur, Solapur.',
    url: `${getBaseUrl()}/accessories`,
    type: 'website',
  },
};

export default function AccessoriesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Accessories', url: '/accessories' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AccessoriesClient />
    </>
  );
}
