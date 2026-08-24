'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store/store-context';
import { 
  Home, 
  Smartphone, 
  Layers, 
  Heart, 
  MessageSquare,
  Sparkles,
  Phone,
  Tag
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { compareList, wishlist, storeSettings, offers } = useStore();

  const isAdminPage = pathname.startsWith('/admin');

  if (isAdminPage) {
    return null; // Admin has its own dedicated navigation
  }

  const activeOffersCount = offers.filter(o => o.is_active).length;

  const navItems = [
    { label: 'Home', href: '/', icon: Home, isActive: pathname === '/' },
    { label: 'Mobiles', href: '/mobiles', icon: Smartphone, isActive: pathname.startsWith('/mobiles') || pathname.startsWith('/product') },
    { label: 'Offers', href: '/offers', icon: Sparkles, isActive: pathname === '/offers', badge: activeOffersCount > 0 ? activeOffersCount : null },
    { label: 'Compare', href: '/compare', icon: Layers, isActive: pathname === '/compare', badge: compareList.length > 0 ? compareList.length : null },
    { 
      label: 'WhatsApp', 
      href: `https://wa.me/91${storeSettings.whatsapp || storeSettings.phone}?text=Hello%20Galaxy%20Mobile%20Gallery,%20I%20am%20interested%20in%20in-store%20phone%20offers!`,
      icon: MessageSquare, 
      isExternal: true,
      highlight: true
    },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation Bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#060911]/90 backdrop-blur-xl border-t border-white/10 px-2 py-1.5 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]"
      style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}
    >
      <div className="grid grid-cols-5 items-center justify-around max-w-md mx-auto">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isItemActive = item.isActive;

          if (item.isExternal) {
            return (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center py-1 px-1 rounded-2xl group transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white shadow-glow-emerald -mt-3 border-2 border-[#060911] group-active:scale-95 transition-transform">
                  <MessageSquare className="w-5 h-5 fill-current" />
                </div>
                <span className="text-[10px] font-bold text-emerald-400 mt-0.5">
                  WhatsApp
                </span>
              </a>
            );
          }

          return (
            <Link
              key={idx}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
                isItemActive 
                  ? 'text-vivo-400 font-bold' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isItemActive ? 'scale-110' : ''}`} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-amber-500 text-slate-950 text-[9px] font-extrabold flex items-center justify-center shadow">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-0.5 ${isItemActive ? 'font-bold text-vivo-400' : 'font-medium'}`}>
                {item.label}
              </span>
              {isItemActive && (
                <span className="w-1 h-1 rounded-full bg-vivo-400 mt-0.5 shadow-glow-blue" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
