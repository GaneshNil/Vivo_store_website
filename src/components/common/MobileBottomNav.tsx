'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store/store-context';
import { QuickSearchModal } from './QuickSearchModal';
import { 
  Home, 
  Smartphone, 
  Layers, 
  Search,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { compareList, storeSettings, offers } = useStore();
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const isAdminPage = pathname.startsWith('/admin');

  if (isAdminPage) {
    return null; // Admin has its own dedicated navigation
  }

  const activeOffersCount = offers.filter(o => o.is_active).length;

  return (
    <>
      <nav 
        aria-label="Mobile Navigation Bar"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 px-2 py-1 shadow-[0_-4px_25px_rgba(0,0,0,0.08)]"
        style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}
      >
        <div className="grid grid-cols-5 items-center justify-around max-w-md mx-auto">
          
          {/* 1. Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center py-1.5 px-1 min-h-[48px] rounded-xl transition-all ${
              pathname === '/' 
                ? 'text-vivo-600 font-bold' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Home className={`w-5 h-5 transition-transform ${pathname === '/' ? 'scale-110' : ''}`} />
            <span className={`text-[10px] tracking-tight mt-0.5 ${pathname === '/' ? 'font-bold text-vivo-600' : 'font-medium'}`}>
              Home
            </span>
          </Link>

          {/* 2. Mobiles */}
          <Link
            href="/mobiles"
            className={`flex flex-col items-center justify-center py-1.5 px-1 min-h-[48px] rounded-xl transition-all ${
              pathname.startsWith('/mobiles') || pathname.startsWith('/product')
                ? 'text-vivo-600 font-bold' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Smartphone className={`w-5 h-5 transition-transform ${pathname.startsWith('/mobiles') || pathname.startsWith('/product') ? 'scale-110' : ''}`} />
            <span className={`text-[10px] tracking-tight mt-0.5 ${pathname.startsWith('/mobiles') || pathname.startsWith('/product') ? 'font-bold text-vivo-600' : 'font-medium'}`}>
              Mobiles
            </span>
          </Link>

          {/* 3. Instant Search (One-tap search directly on mobile!) */}
          <button
            type="button"
            onClick={() => setSearchModalOpen(true)}
            className="flex flex-col items-center justify-center py-1.5 px-1 min-h-[48px] rounded-xl text-slate-500 hover:text-slate-800 active:scale-95 transition-all"
            aria-label="Open instant product search"
          >
            <div className="w-8 h-8 rounded-full bg-vivo-50 text-vivo-600 flex items-center justify-center border border-vivo-200/80 shadow-xs">
              <Search className="w-4 h-4" />
            </div>
            <span className="text-[10px] tracking-tight font-medium text-slate-600 mt-0.5">
              Search
            </span>
          </button>

          {/* 4. Compare / Offers */}
          <Link
            href="/compare"
            className={`relative flex flex-col items-center justify-center py-1.5 px-1 min-h-[48px] rounded-xl transition-all ${
              pathname === '/compare' 
                ? 'text-vivo-600 font-bold' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="relative">
              <Layers className={`w-5 h-5 transition-transform ${pathname === '/compare' ? 'scale-110' : ''}`} />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-vivo-600 text-white text-[9px] font-extrabold flex items-center justify-center shadow-xs">
                  {compareList.length}
                </span>
              )}
            </div>
            <span className={`text-[10px] tracking-tight mt-0.5 ${pathname === '/compare' ? 'font-bold text-vivo-600' : 'font-medium'}`}>
              Compare
            </span>
          </Link>

          {/* 5. Direct WhatsApp Chat */}
          <a
            href={`https://wa.me/91${storeSettings.whatsapp || storeSettings.phone}?text=Hello%20Galaxy%20Mobile%20Gallery,%20I%20am%20interested%20in%20in-store%20phone%20offers!`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1.5 px-1 min-h-[48px] rounded-xl group transition-all"
            aria-label="Chat with store on WhatsApp"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs group-active:scale-95 transition-transform">
              <MessageSquare className="w-4 h-4 fill-current" />
            </div>
            <span className="text-[10px] font-bold text-emerald-700 mt-0.5">
              WhatsApp
            </span>
          </a>

        </div>
      </nav>

      {/* Mobile Instant Search Dialog */}
      <QuickSearchModal 
        isOpen={searchModalOpen} 
        onClose={() => setSearchModalOpen(false)} 
      />
    </>
  );
};

