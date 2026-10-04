import type { Metadata } from 'next';
import { HomePageClient } from '@/components/customer/HomePageClient';
import { getBaseUrl } from '@/lib/seo/config';

export const metadata: Metadata = {
  title: 'Galaxy Mobile Gallery | VIVO Authorized Showroom & Multi-Brand Mobiles Begampur',
  description: 'Official VIVO showroom & multi-brand smartphone hub in Begampur, Solapur. Experience live demo phones, genuine accessories, and instant Bajaj Finance 0% EMI.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Galaxy Mobile Gallery | VIVO Authorized Showroom & Multi-Brand Mobiles Begampur',
    description: 'Explore latest VIVO X Series, V Series, T Series & multi-brand smartphones and genuine accessories at Galaxy Mobile Gallery, Begampur, Solapur.',
    url: getBaseUrl(),
    type: 'website',
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
