'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store/store-context';
import { ProductCard } from './ProductCard';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Layers } from 'lucide-react';

export const AccessoriesShowcase: React.FC = () => {
  const { products, categories } = useStore();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const accessoryCategories = categories.filter(c => c.type === 'accessory');
  const accessoryProducts = products.filter(p => !p.is_phone && p.is_active);

  const displayedProducts = activeCategory === 'all'
    ? accessoryProducts
    : accessoryProducts.filter(p => p.category?.slug === activeCategory || p.category_id === activeCategory || categories.find(c => c.slug === activeCategory || c.id === activeCategory)?.id === p.category_id);

  return (
    <section className="py-16 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Heading & Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-origin-cyan uppercase">
              <Zap className="w-4 h-4 text-origin-cyan" />
              <span>GENUINE ACCESSORIES & MOBILE CARE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Premium <span className="text-gradient-origin">In-Store Accessories</span> Hub
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              From original 80W Flash Chargers to bubble-free 9H UV Curved Glass, high-bass TWS earbuds & armor cases.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === 'all'
                  ? 'bg-origin-violet text-white shadow-glow-violet'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              All Accessories ({accessoryProducts.length})
            </button>
            {accessoryCategories.map(cat => {
              const count = accessoryProducts.filter(p => p.category_id === cat.id).length;
              if (count === 0) return null;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeCategory === cat.slug
                      ? 'bg-origin-violet text-white shadow-glow-violet'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Accessories Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>

        {/* In-Store Free Service Callout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-xl glass-card flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Free UV Glass Application</h4>
              <p className="text-[11px] text-slate-400">Zero air bubbles with high-grade UV machine at store.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl glass-card flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-vivo-500/10 text-vivo-400 border border-vivo-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Tested Flash Charging</h4>
              <p className="text-[11px] text-slate-400">Every charger wattage verified on your phone before purchase.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl glass-card flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-origin-violet/10 text-origin-violet border border-origin-violet/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Instant Store Replacement</h4>
              <p className="text-[11px] text-slate-400">Hassle-free replacement warranty for all genuine store accessories.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
