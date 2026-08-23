import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/lib/store/store-context';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { CompareTray } from '@/components/customer/CompareTray';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Galaxy Mobile Gallery | VIVO Authorized Showroom & Multi-Brand Mobiles Begampur',
  description: 'Explore latest VIVO X Series, V Series, T Series & multi-brand smartphones and genuine accessories at Galaxy Mobile Gallery, Begampur, Solapur. 0% Bajaj Finance EMI available in store.',
  keywords: ['Galaxy Mobile Gallery', 'Vivo showroom Begampur', 'Vivo mobile shop Solapur', 'Vivo X100 Pro', 'Vivo V40 Pro', 'Bajaj Finance EMI Mobile Solapur', 'Mohol mobile store', 'Mobile accessories Begampur'],
  openGraph: {
    title: 'Galaxy Mobile Gallery | VIVO Experience Showroom Begampur',
    description: 'Browse flagship VIVO mobiles and genuine accessories. Visit our physical store in Begampur, Solapur.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans min-h-screen flex flex-col bg-[#080C14] text-slate-100`}>
        <StoreProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <CompareTray />
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
