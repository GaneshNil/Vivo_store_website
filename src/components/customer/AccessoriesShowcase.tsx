'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/store-context';
import { ProductCard } from './ProductCard';
import { Zap, Layers, ShieldCheck } from 'lucide-react';

export const AccessoriesShowcase: React.FC = () => {
  const { products, categories } = useStore();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const accessoryCategories = categories.filter(c => c.type === 'accessory');
  const accessoryProducts = products.filter(p => !p.is_phone && p.is_active);

  const displayedProducts = activeCategory === 'all'
    ? accessoryProducts
    : accessoryProducts.filter(p => p.category?.slug === activeCategory || p.category_id === activeCategory || categories.find(c => c.slug === activeCategory || c.id === activeCategory)?.id === p.category_id);

  return (
    <section className="py-14 sm:py-18 bg-white border-b border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Heading & Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-vivo-700 uppercase">
              <Zap className="w-4 h-4 text-vivo-600" />
              <span>GENUINE ACCESSORIES & MOBILE CARE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
              Premium <span className="text-gradient-vivo">In-Store Accessories</span> Hub
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
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
                  ? 'bg-vivo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
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
                      ? 'bg-vivo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
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
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 shadow-2xs flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Free UV Glass Application</h4>
              <p className="text-[11px] text-slate-500">Zero air bubbles with high-grade UV machine at store.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 shadow-2xs flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Tested Flash Charging</h4>
              <p className="text-[11px] text-slate-500">Every charger wattage verified on your phone before purchase.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 shadow-2xs flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Instant Store Replacement</h4>
              <p className="text-[11px] text-slate-500">Hassle-free replacement warranty for all genuine store accessories.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

