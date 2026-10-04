import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/lib/store/store-context';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { CompareTray } from '@/components/customer/CompareTray';
import { MobileBottomNav } from '@/components/common/MobileBottomNav';
import { getBaseUrl, SITE_CONFIG, generateLocalBusinessSchema, generateWebSiteSchema } from '@/lib/seo/config';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

export const viewport: Viewport = {
  themeColor: '#0066FF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: 'Galaxy Mobile Gallery | VIVO Authorized Showroom & Multi-Brand Mobiles Begampur',
    template: '%s | Galaxy Mobile Gallery',
  },
  description: 'Explore latest VIVO X Series, V Series, T Series & multi-brand smartphones and genuine accessories at Galaxy Mobile Gallery, Begampur, Solapur. Bajaj Finance EMI Available in store.',
  applicationName: SITE_CONFIG.name,
  authors: [{ name: SITE_CONFIG.name, url: getBaseUrl() }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  keywords: [
    'Galaxy Mobile Gallery',
    'Vivo showroom Begampur',
    'Vivo mobile shop Solapur',
    'Vivo X100 Pro Begampur',
    'Vivo V40 Pro Solapur',
    'Bajaj Finance EMI Mobile Solapur',
    'Mohol mobile store',
    'Mobile accessories Begampur',
    'Samsung mobiles Begampur',
    'Oppo store Solapur',
    'Realme mobiles Begampur',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Galaxy Mobile Gallery | VIVO Experience Showroom Begampur',
    description: 'Browse flagship VIVO mobiles, multi-brand smartphones, and genuine accessories. Visit our physical store in Begampur, Solapur.',
    url: getBaseUrl(),
    siteName: SITE_CONFIG.name,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Galaxy Mobile Gallery | VIVO Experience Showroom Begampur',
    description: 'Browse flagship VIVO mobiles and genuine accessories. In-store demo and Bajaj Finance EMI in Begampur, Solapur.',
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  verification: {
    google: 'google4d3c870314da0453',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = generateWebSiteSchema();
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${outfit.variable}`}>
      <head>
        <meta name="google-site-verification" content="google4d3c870314da0453" />
        <meta name="google-site-verification" content="google4d3c870314da0453.html" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col bg-[#FAFAFB] text-slate-900 antialiased overflow-x-hidden">
        {/* Skip to Main Content Link for Keyboard and Screen Reader Accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-vivo-600 focus:text-white focus:font-semibold focus:rounded-xl focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <StoreProvider>
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1 pb-16 md:pb-0 focus:outline-none">
            {children}
          </main>
          <CompareTray />
          <Footer />
          <MobileBottomNav />
        </StoreProvider>
      </body>
    </html>
  );
}
