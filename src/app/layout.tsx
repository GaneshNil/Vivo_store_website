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
    default: 'Galaxy Mobile Gallery | Mobile Shop in Begampur, Solapur',
    template: '%s | Galaxy Mobile Gallery',
  },
  description: 'Explore smartphones and mobile accessories at Galaxy Mobile Gallery in Begampur, Solapur. Browse available products, compare specifications, and discover current prices.',
  applicationName: SITE_CONFIG.name,
  authors: [{ name: SITE_CONFIG.name, url: getBaseUrl() }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  keywords: [
    'Galaxy Mobile Gallery',
    'Galaxy Mobile Gallery Begampur',
    'Galaxy Mobile Gallery Solapur',
    'Mobile shop in Begampur, Solapur',
    'Vivo showroom in Begampur',
    'Mobile phones and accessories in Begampur',
    'Bajaj Finance EMI Mobile Solapur',
    'Vivo X100 Pro Begampur',
    'Vivo V40 Pro Solapur',
    'Mohol mobile store',
    'Mobile accessories Begampur',
    'Samsung mobiles Begampur',
    'Oppo store Solapur',
    'Realme mobiles Begampur',
  ],
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
    title: 'Galaxy Mobile Gallery | Mobile Shop in Begampur, Solapur',
    description: 'Explore smartphones and mobile accessories at Galaxy Mobile Gallery in Begampur, Solapur. Browse available products, compare specifications, and discover current prices.',
    url: getBaseUrl(),
    siteName: SITE_CONFIG.name,
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
  twitter: {
    card: 'summary_large_image',
    title: 'Galaxy Mobile Gallery | Mobile Shop in Begampur, Solapur',
    description: 'Explore smartphones and mobile accessories at Galaxy Mobile Gallery in Begampur, Solapur. Browse available products, compare specifications, and discover current prices.',
    images: [`${getBaseUrl()}${SITE_CONFIG.ogImage}`],
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  verification: {
    google: 'google4d3c870314da0453',
  },
  icons: {
    icon: [
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon.ico', sizes: '48x48 32x32 16x16', type: 'image/x-icon' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
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
        <meta name="application-name" content="Galaxy Mobile Gallery" />
        <meta name="apple-mobile-web-app-title" content="Galaxy Mobile Gallery" />
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
