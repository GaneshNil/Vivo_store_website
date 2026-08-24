'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store/store-context';
import { 
  Search, 
  Layers, 
  Heart, 
  MapPin, 
  Phone, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
  Lock
} from 'lucide-react';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { storeSettings, compareList, wishlist } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isAdminPage = pathname.startsWith('/admin');

  if (isAdminPage) {
    return null; // Admin has its own dedicated topbar/sidebar
  }

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Mobiles', href: '/mobiles' },
    { label: 'Accessories', href: '/accessories' },
    { label: 'Brands', href: '/brands' },
    { label: 'Offers', href: '/offers' },
    { label: 'New Arrivals', href: '/new-arrivals' },
    { label: 'Compare', href: '/compare', badge: compareList.length > 0 ? compareList.length : null },
    { label: 'Visit Store', href: '/store' },
  ];

  return (
    <>
      {/* Top Announcement Bar for Store Model */}
      <div className="bg-gradient-to-r from-vivo-900 via-origin-surface to-vivo-900 border-b border-white/5 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Physical Store Open Today: <strong className="text-white font-medium">10:00 AM – 09:00 PM</strong></span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-amber-300 font-bold">⚡ Bajaj Finance EMI Available & Instant In-Store Approval</span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <a 
              href={`tel:${storeSettings.phone}`} 
              className="flex items-center gap-1.5 hover:text-vivo-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-vivo-400" />
              <span>Call: {storeSettings.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Glass Header */}
      <header className="sticky top-0 z-40 glass-nav">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Store Brand & Logo */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0 pr-2">
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl overflow-hidden border border-vivo-500/30 bg-slate-900 shadow-glow-blue flex-shrink-0 group-hover:border-vivo-400 transition-all">
                <Image
                  src="/assets/store-logo/IMG-20260822-WA0004.jpg"
                  alt="Galaxy Mobile Gallery Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col min-w-0 justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-sm sm:text-lg md:text-xl tracking-tight text-white group-hover:text-gradient-vivo transition-all truncate">
                    GALAXY MOBILE
                  </span>
                  <span className="text-[8.5px] sm:text-[10px] uppercase font-extrabold tracking-wider bg-vivo-500/20 text-vivo-400 px-1.5 py-0.5 rounded border border-vivo-500/30 flex-shrink-0">
                    VIVO SHOWROOM
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs text-slate-400 tracking-wide truncate">
                  Gallery & Accessories · Begampur
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map(link => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'text-white bg-white/10 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                    {link.badge !== null && link.badge !== undefined && (
                      <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold bg-vivo-500 text-white rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Action Utilities */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
              {/* Search Button */}
              <Link
                href="/mobiles"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-slate-300 hover:text-white bg-slate-900/60 hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center"
                title="Search Phones & Accessories"
              >
                <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </Link>

              {/* Compare Quick Action (Desktop & Tablet) */}
              <Link
                href="/compare"
                className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-slate-300 hover:text-white bg-slate-900/60 hover:bg-white/10 border border-white/10 transition-all hidden sm:flex items-center justify-center"
                title="Compare Specifications"
              >
                <Layers className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {compareList.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-origin-violet text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#080C14]">
                    {compareList.length}
                  </span>
                )}
              </Link>

              {/* Store Directions CTA (Desktop & Tablet only) */}
              <Link
                href="/store"
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-vivo-600 to-origin-violet hover:from-vivo-500 hover:to-origin-purple text-white text-sm font-semibold shadow-glow-blue hover:shadow-glow-violet transition-all transform hover:-translate-y-0.5"
              >
                <MapPin className="w-4 h-4 text-cyan-200" />
                <span>Visit Showroom</span>
              </Link>

              {/* Mobile Menu Toggle (Three Lines) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-slate-300 hover:text-white bg-slate-900/60 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden glass-panel border-t border-white/10 px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2">
            <div className="p-3 bg-white/5 rounded-xl mb-3 border border-white/5 text-xs text-slate-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-vivo-400" />
                <span>Begampur, Solapur</span>
              </div>
              <span className="text-emerald-400 font-medium">Open Now</span>
            </div>

            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium ${
                  pathname === link.href
                    ? 'bg-vivo-600 text-white font-semibold'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 text-xs bg-origin-violet text-white rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <a
                href={`https://wa.me/91${storeSettings.whatsapp}?text=Hello%20Galaxy%20Mobile%20Gallery,%20I%20want%20to%20inquire%20about%20mobile%20models%20and%20offers.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-sm font-medium"
              >
                <span>💬 WhatsApp Store Inquiry</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
