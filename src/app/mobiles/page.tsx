import type { Metadata } from 'next';
import { MobilesClient } from '@/components/customer/MobilesClient';
import { getBaseUrl, generateBreadcrumbSchema } from '@/lib/seo/config';

export const metadata: Metadata = {
  title: 'Latest VIVO & Multi-Brand 5G Smartphones in Begampur',
  description: 'Explore 5G smartphones from VIVO X Series, V Series, T Series, Y Series, Samsung Galaxy & Oppo. Check in-store live stock & Bajaj EMI in Begampur, Solapur.',
  alternates: {
    canonical: '/mobiles',
  },
  openGraph: {
    title: 'Latest VIVO & Multi-Brand Smartphones | Galaxy Mobile Gallery Begampur',
    description: 'Explore 5G smartphones from VIVO X Series, V Series, T Series, Y Series, Samsung Galaxy & Oppo. In-store demo & Bajaj Finance EMI.',
    url: `${getBaseUrl()}/mobiles`,
    type: 'website',
  },
};

export default function MobilesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Smartphones', url: '/mobiles' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <MobilesClient />
    </>
  );
}
