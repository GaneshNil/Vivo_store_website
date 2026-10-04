import type { Metadata } from 'next';
import { OffersClient } from '@/components/customer/OffersClient';
import { getBaseUrl, generateBreadcrumbSchema } from '@/lib/seo/config';

export const metadata: Metadata = {
  title: 'Smartphone Festive Offers & 0% Bajaj EMI Schemes',
  description: 'Exclusive in-store mobile offers, festive discounts, zero-downpayment Bajaj Finance EMI schemes, and free gift hampers on smartphone purchases in Begampur, Solapur.',
  alternates: {
    canonical: '/offers',
  },
  openGraph: {
    title: 'Exclusive Smartphone Offers & EMI Schemes | Galaxy Mobile Gallery',
    description: 'Explore live store discounts, 0% Bajaj Finance EMI approvals, and festive bonuses on VIVO, Samsung, and Oppo smartphones.',
    url: `${getBaseUrl()}/offers`,
    type: 'website',
  },
};

export default function OffersPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Offers', url: '/offers' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <OffersClient />
    </>
  );
}
