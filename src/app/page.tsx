import type { Metadata } from 'next';
import { HomePageClient } from '@/components/customer/HomePageClient';
import { getBaseUrl } from '@/lib/seo/config';

export const metadata: Metadata = {
  title: {
    absolute: 'Galaxy Mobile Gallery | Mobile Shop in Begampur, Solapur',
  },
  description: 'Explore smartphones and mobile accessories at Galaxy Mobile Gallery in Begampur, Solapur. Browse available products, compare specifications, and discover current prices.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Galaxy Mobile Gallery | Mobile Shop in Begampur, Solapur',
    description: 'Explore smartphones and mobile accessories at Galaxy Mobile Gallery in Begampur, Solapur. Browse available products, compare specifications, and discover current prices.',
    url: getBaseUrl(),
    type: 'website',
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
