'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store/store-context';
import { QuickSearchModal } from './QuickSearchModal';
import { 
  Search, 
  Layers, 
  MapPin, 
  Phone, 
  Menu, 
  X, 
  Sparkles,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { storeSettings, compareList } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Global keyboard shortcut: Cmd+K / Ctrl+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
      <div className="bg-slate-900 border-b border-slate-800 text-white py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Store Open Today: <strong className="text-white font-medium">10:00 AM – 09:00 PM</strong></span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-amber-300 font-semibold">⚡ Bajaj Finance EMI Available with 10-Min In-Store Approval</span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <a 
              href={`tel:${storeSettings.phone}`} 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-vivo-400" />
              <span>Call: +91 {storeSettings.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Glass Header */}
      <header className="sticky top-0 z-40 glass-nav">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
            
            {/* Store Brand & Logo */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0 pr-1">
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm flex-shrink-0 group-hover:border-vivo-500 transition-all">
                <Image
                  src="/assets/store-logo/IMG-20260822-WA0004.jpg"
                  alt="Galaxy Mobile Gallery Logo"
                  fill
                  sizes="(max-width: 640px) 36px, 44px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col min-w-0 justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-sm sm:text-lg md:text-xl tracking-tight text-slate-900 group-hover:text-vivo-600 transition-colors truncate">
                    GALAXY MOBILE
                  </span>
                  <span className="text-[8.5px] sm:text-[10px] uppercase font-extrabold tracking-wider bg-vivo-50 text-vivo-700 px-1.5 py-0.5 rounded border border-vivo-200 flex-shrink-0">
                    VIVO SHOWROOM
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs text-slate-500 tracking-normal truncate">
                  Official Experience Gallery & Accessories · Begampur
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
                    className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'text-vivo-700 bg-vivo-50/80 font-semibold border border-vivo-200/80 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    {link.label}
                    {link.badge !== null && link.badge !== undefined && (
                      <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold bg-vivo-600 text-white rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Action Utilities */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
              {/* Prominent Quick Search Button (Desktop + Tablet) */}
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-medium transition-all"
                title="Search Vivo & phones (Press ⌘K or Ctrl+K)"
                aria-label="Open search dialog"
              >
                <Search className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-slate-500 hidden md:inline">Search Vivo & phones...</span>
                <span className="text-slate-500 md:hidden">Search...</span>
                <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white rounded border border-slate-200 shadow-xs">
                  ⌘K
                </kbd>
              </button>

              {/* Mobile Search Icon Button */}
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="sm:hidden w-9 h-9 rounded-xl text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all flex items-center justify-center"
                title="Search Phones & Accessories"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Compare Quick Action (Desktop & Tablet) */}
              <Link
                href="/compare"
                className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all hidden sm:flex items-center justify-center"
                title="Compare Specifications"
                aria-label={`Compare Specifications${compareList.length > 0 ? ` (${compareList.length} items)` : ''}`}
              >
                <Layers className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {compareList.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-vivo-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                    {compareList.length}
                  </span>
                )}
              </Link>

              {/* Store Directions CTA (Desktop & Tablet only) */}
              <Link
                href="/store"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-vivo-600 hover:bg-vivo-700 text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all"
              >
                <MapPin className="w-4 h-4 text-white" />
                <span>Visit Showroom</span>
              </Link>

              {/* Mobile Menu Toggle (Three Lines) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center transition-all"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-menu"
              >
                {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div id="mobile-navigation-menu" className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2">
            <div className="p-3 bg-slate-50 rounded-xl mb-3 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-vivo-600" />
                <span className="font-medium text-slate-800">Begampur, Solapur</span>
              </div>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Open Now (Till 9 PM)</span>
            </div>

            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium ${
                  pathname === link.href
                    ? 'bg-vivo-600 text-white font-semibold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 text-xs bg-vivo-500 text-white rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-sm font-semibold transition-all"
              >
                <Search className="w-4 h-4 text-slate-500" />
                <span>Search Vivo Models & Stock</span>
              </button>

              <a
                href={`https://wa.me/91${storeSettings.whatsapp}?text=Hello%20Galaxy%20Mobile%20Gallery,%20I%20want%20to%20inquire%20about%20mobile%20models%20and%20offers.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold shadow-sm hover:bg-emerald-700 transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>WhatsApp Store Inquiry</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Global Instant Search Modal */}
      <QuickSearchModal 
        isOpen={searchModalOpen} 
        onClose={() => setSearchModalOpen(false)} 
      />
    </>
  );
};

