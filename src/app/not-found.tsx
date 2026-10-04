'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Smartphone, 
  Layers, 
  MapPin, 
  ArrowLeft, 
  Phone, 
  Home, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';

export default function NotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/mobiles?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const quickLinks = [
    { label: 'Explore Mobiles', href: '/mobiles', icon: Smartphone },
    { label: 'Store Accessories', href: '/accessories', icon: ShoppingBag },
    { label: 'Festive Offers & Schemes', href: '/offers', icon: Sparkles },
    { label: 'Compare Specifications', href: '/compare', icon: Layers },
    { label: 'Visit Begampur Showroom', href: '/store', icon: MapPin },
  ];

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center space-y-8">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-vivo-50 border border-vivo-200 text-xs font-bold text-vivo-700 shadow-2xs">
          <span>ERROR 404</span>
          <span className="text-slate-300">•</span>
          <span>PAGE NOT FOUND</span>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
            Looking for a Phone or Accessory?
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
            The page you requested might have been moved or updated. Use the search bar below or explore our popular showroom collections.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Vivo X100, V40, chargers, covers..."
              aria-label="Search smartphones and accessories"
              className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-vivo-500/20 focus:border-vivo-500 shadow-xs transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 px-4 py-2 rounded-xl bg-vivo-600 hover:bg-vivo-700 text-white text-xs font-semibold shadow-2xs transition-all"
            >
              Search
            </button>
          </div>
        </form>

        {/* Quick Links Navigation */}
        <div className="pt-4 border-t border-slate-200/80 space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Popular Destinations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-vivo-50 border border-slate-200 hover:border-vivo-300 text-xs font-semibold text-slate-700 hover:text-vivo-700 shadow-2xs transition-all"
                >
                  <Icon className="w-3.5 h-3.5 text-vivo-600" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Assistance & Home Return */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-slate-600 hover:text-vivo-600 font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <span className="text-slate-300">•</span>
          <a
            href="tel:9067228008"
            className="inline-flex items-center gap-1.5 text-slate-600 hover:text-vivo-600 font-semibold transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-vivo-600" />
            <span>Need Help? Call Showroom: +91 9067228008</span>
          </a>
        </div>

      </div>
    </div>
  );
}
