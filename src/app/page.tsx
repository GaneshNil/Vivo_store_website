import type { Metadata } from 'next';
import { HomePageClient } from '@/components/customer/HomePageClient';
import { getBaseUrl, SITE_CONFIG } from '@/lib/seo/config';

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
    siteName: 'Galaxy Mobile Gallery',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${getBaseUrl()}${SITE_CONFIG.ogImage}`,
        width: 800,
        height: 800,
        alt: 'Galaxy Mobile Gallery - Begampur, Solapur',
      },
    ],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
