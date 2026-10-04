import type { Metadata } from 'next';
import { NewArrivalsClient } from '@/components/customer/NewArrivalsClient';
import { getBaseUrl, generateBreadcrumbSchema } from '@/lib/seo/config';

export const metadata: Metadata = {
  title: 'New Smartphone Launches & Fresh Store Stock',
  description: 'Check newly launched 5G smartphones and fresh in-store stock at Galaxy Mobile Gallery, Begampur. Live demo units available for hands-on trial.',
  alternates: {
    canonical: '/new-arrivals',
  },
  openGraph: {
    title: 'New Smartphone Launches & In-Store Stock | Galaxy Mobile Gallery',
    description: 'Explore the newest 5G smartphones from VIVO, Samsung, and OPPO. Touch and feel live handsets in Begampur, Solapur.',
    url: `${getBaseUrl()}/new-arrivals`,
    type: 'website',
  },
};

export default function NewArrivalsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'New Arrivals', url: '/new-arrivals' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <NewArrivalsClient />
    </>
  );
}
