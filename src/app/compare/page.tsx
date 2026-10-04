import type { Metadata } from 'next';
import { CompareClient } from '@/components/customer/CompareClient';
import { getBaseUrl, generateBreadcrumbSchema } from '@/lib/seo/config';

export const metadata: Metadata = {
  title: 'Compare Smartphone Specifications, Cameras & Prices',
  description: 'Compare cameras, processors, 5G chipsets, battery capacities, and in-store prices side by side to pick the best mobile phone at Galaxy Mobile Gallery.',
  alternates: {
    canonical: '/compare',
  },
  openGraph: {
    title: 'Compare Smartphone Specifications Side by Side | Galaxy Mobile Gallery',
    description: 'Direct spec-by-spec comparison of VIVO, Samsung, and OPPO flagships. Check benchmarks, camera sensors, and battery charging speeds.',
    url: `${getBaseUrl()}/compare`,
    type: 'website',
  },
};

export default function ComparePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Compare', url: '/compare' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CompareClient />
    </>
  );
}
