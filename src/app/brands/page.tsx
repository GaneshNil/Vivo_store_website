import type { Metadata } from 'next';
import { BrandsClient } from '@/components/customer/BrandsClient';
import { getBaseUrl, generateBreadcrumbSchema } from '@/lib/seo/config';

export const metadata: Metadata = {
  title: 'Authorized Smartphone Brands - VIVO, Samsung, OPPO & Realme',
  description: 'Official retail partner for VIVO flagships, Samsung Galaxy, OPPO Reno, and Realme devices with brand warranty in Begampur, Solapur.',
  alternates: {
    canonical: '/brands',
  },
  openGraph: {
    title: 'Authorized Smartphone & Tech Brands | Galaxy Mobile Gallery',
    description: 'Explore brand collections for VIVO, Samsung, Oppo, and Realme with official manufacturer warranty and Bajaj Finance EMI.',
    url: `${getBaseUrl()}/brands`,
    type: 'website',
  },
};

export default function BrandsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Brands', url: '/brands' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BrandsClient />
    </>
  );
}
