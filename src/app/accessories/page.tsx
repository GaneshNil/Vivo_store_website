'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStore } from '@/lib/store/store-context';
import { ProductCard } from '@/components/customer/ProductCard';
import { 
  Search, 
  Zap, 
  ShieldCheck, 
  RotateCcw, 
  Layers, 
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';

function AccessoriesContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('cat') || 'all';

  const { products, categories, storeSettings } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>(initialCat);
  const [priceFilter, setPriceFilter] = useState<string>('all');

  const accessoryProducts = useMemo(() => {
    return products.filter(p => !p.is_phone && p.is_active);
  }, [products]);

  const accessoryCategories = useMemo(() => {
    return categories.filter(c => c.type === 'accessory');
  }, [categories]);

  const filteredAccessories = useMemo(() => {
    return accessoryProducts.filter(item => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCompat = item.compatible_models?.some(m => m.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesCompat) return false;
      }

      // 2. Category
      if (selectedCat !== 'all') {
        const matchCat = item.category?.slug === selectedCat || 
                         item.category_id === selectedCat || 
                         categories.find(c => c.slug === selectedCat || c.id === selectedCat)?.id === item.category_id;
        if (!matchCat) return false;
      }

      // 3. Price Filter
      const price = item.variants[0]?.selling_price || 0;
      if (priceFilter === 'under-500' && price >= 500) return false;
      if (priceFilter === '500-1500' && (price < 500 || price > 1500)) return false;
      if (priceFilter === 'above-1500' && price < 1500) return false;

      return true;
    });
  }, [accessoryProducts, searchQuery, selectedCat, priceFilter]);

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 bg-gradient-to-r from-origin-surface via-slate-900 to-vivo-950/40 overflow-hidden">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-origin-cyan uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>ORIGINAL MOBILE ACCESSORIES & PROTECTION</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Accessories Showroom
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Over 500+ genuine chargers, UV curved tempered glass, armor cases, cables, power banks and TWS audio in stock at Begampur store.
          </p>
        </div>
      </div>

      {/* Free In-Store Service Banner */}
      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3 text-emerald-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span><strong>Free In-Store Service:</strong> Free professional UV Machine screen guard installation & free cable testing available on your mobile!</span>
        </div>
        <span className="text-slate-400 text-[11px]">Walk in directly at our Begampur store</span>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search vivo charger, UV glass, case for V40..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-origin-violet transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Budget Filter */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Budget:</span>
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-origin-violet"
          >
            <option value="all">All Prices</option>
            <option value="under-500">Under ₹500</option>
            <option value="500-1500">₹500 – ₹1,500</option>
            <option value="above-1500">₹1,500+</option>
          </select>
        </div>

      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 pt-2">
        <button
          type="button"
          onClick={() => setSelectedCat('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            selectedCat === 'all'
              ? 'bg-origin-violet text-white shadow-glow-violet'
              : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
          }`}
        >
          All Items ({accessoryProducts.length})
        </button>
        {accessoryCategories.map(cat => {
          const count = accessoryProducts.filter(p => p.category_id === cat.id).length;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCat(cat.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCat === cat.slug
                  ? 'bg-origin-violet text-white shadow-glow-violet'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {cat.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Product Cards Grid */}
      {filteredAccessories.length === 0 ? (
        <div className="p-12 text-center rounded-3xl glass-panel border border-white/10 space-y-4">
          <Zap className="w-12 h-12 text-slate-500 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">No Accessories Found</h3>
            <p className="text-xs text-slate-400">
              Try searching with another keyword or resetting the category filter.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCat('all');
              setPriceFilter('all');
            }}
            className="px-4 py-2 rounded-xl bg-origin-violet text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAccessories.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}

    </div>
  );
}

export default function AccessoriesPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Accessories Showroom...</div>}>
      <AccessoriesContent />
    </Suspense>
  );
}
