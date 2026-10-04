import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/lib/store/store-context';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { CompareTray } from '@/components/customer/CompareTray';
import { MobileBottomNav } from '@/components/common/MobileBottomNav';

export const metadata: Metadata = {
  title: 'Galaxy Mobile Gallery | VIVO Authorized Showroom & Multi-Brand Mobiles Begampur',
  description: 'Explore latest VIVO X Series, V Series, T Series & multi-brand smartphones and genuine accessories at Galaxy Mobile Gallery, Begampur, Solapur. Bajaj Finance EMI Available in store.',
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
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans min-h-screen flex flex-col bg-[#FAFAFB] text-slate-900 antialiased overflow-x-hidden">
        <StoreProvider>
          <Header />
          <main className="flex-1 pb-16 md:pb-0">
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
