'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store/store-context';
import { ProductCard } from './ProductCard';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const VivoShowcase: React.FC = () => {
  const { products, series } = useStore();
  const [activeSeries, setActiveSeries] = useState<string>('all');

  const vivoSeries = series.filter(s => s.brand_id === 'brand-vivo');
  const vivoProducts = products.filter(p => p.brand_id === 'brand-vivo' && p.is_active);

  const displayedProducts = activeSeries === 'all'
    ? vivoProducts
    : vivoProducts.filter(p => p.series?.slug === activeSeries);

  return (
    <section className="py-16 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Heading & Series Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-vivo-400 uppercase">
              <Sparkles className="w-4 h-4 text-origin-cyan" />
              <span>PRIMARY BRAND SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Official <span className="text-gradient-vivo">VIVO Experience</span> Gallery
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
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
                  ? 'bg-vivo-600 text-white shadow-glow-blue'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
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
                      ? 'bg-vivo-600 text-white shadow-glow-blue'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
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
        <div className="glass-panel p-6 rounded-2xl border border-vivo-500/20 bg-gradient-to-r from-vivo-950/40 via-slate-900/40 to-origin-surface/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-vivo-500/20 text-vivo-400 border border-vivo-500/30">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">Authorized VIVO Store Warranty & Demo Center</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Every Vivo phone purchased at Galaxy Mobile Gallery comes with full manufacturer warranty and instant <strong className="text-amber-300 font-bold">Bajaj Finance EMI Available</strong> support.
              </p>
            </div>
          </div>

          <Link
            href="/store"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/10 transition-all"
          >
            <span>Visit Showroom in Begampur</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
