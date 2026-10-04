'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store/store-context';
import { ProductCard } from './ProductCard';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const VivoShowcase: React.FC = () => {
  const { products, series } = useStore();
  const [activeSeries, setActiveSeries] = useState<string>('all');

  const vivoSeries = series.filter(s => s.brand_id === 'brand-vivo');
  const vivoProducts = products.filter(p => p.brand_id === 'brand-vivo' && p.is_active);

  const displayedProducts = activeSeries === 'all'
    ? vivoProducts
    : vivoProducts.filter(p => p.series?.slug === activeSeries || p.series_id === activeSeries || series.find(s => s.slug === activeSeries || s.id === activeSeries)?.id === p.series_id);

  return (
    <section className="py-14 sm:py-18 bg-white border-b border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Heading & Series Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-vivo-700 uppercase">
              <Sparkles className="w-4 h-4 text-vivo-600" />
              <span>PRIMARY BRAND SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
              Official <span className="text-gradient-vivo">VIVO Experience</span> Gallery
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              From ZEISS Co-engineered X series to Aura Light V series and high-speed T series 5G powerhouses.
            </p>
          </div>

          {/* Series Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveSeries('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeSeries === 'all'
                  ? 'bg-vivo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
              }`}
            >
              All Vivo Mobiles ({vivoProducts.length})
            </button>
            {vivoSeries.map(s => {
              const count = vivoProducts.filter(p => p.series_id === s.id).length;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveSeries(s.slug)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeSeries === s.slug
                      ? 'bg-vivo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {s.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>

        {/* Bottom Vivo Store Guarantee Banner */}
        <div className="p-6 rounded-2xl border border-blue-200/80 bg-gradient-to-r from-blue-50/70 via-white to-indigo-50/60 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-vivo-50 text-vivo-700 border border-vivo-200 flex-shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-slate-900 font-bold text-base">Authorized VIVO Store Warranty & Demo Center</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Every Vivo phone purchased at Galaxy Mobile Gallery comes with full manufacturer warranty and instant <strong className="text-blue-700 font-bold">Bajaj Finance EMI Available</strong> support.
              </p>
            </div>
          </div>

          <Link
            href="/store"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-vivo-600 hover:bg-vivo-700 text-white text-xs font-semibold shadow-xs transition-all"
          >
            <span>Visit Showroom in Begampur</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

