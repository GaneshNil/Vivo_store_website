'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store/store-context';
import { ProductCard } from '@/components/customer/ProductCard';
import { Sparkles, Smartphone, ArrowRight } from 'lucide-react';

export default function NewArrivalsPage() {
  const { products } = useStore();

  const newProducts = products.filter(p => (p.is_new_arrival || p.variants.some(v => v.computed_status === 'COMING_SOON')) && p.is_active);

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 bg-gradient-to-r from-cyan-950/30 via-slate-900 to-vivo-950/40 overflow-hidden">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-origin-cyan uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>JUST LAUNCHED & COMING SOON</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            New Smartphone Launches
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Check newly arrived flagship smartphones and upcoming shipments arriving at our Begampur store.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {newProducts.map(prod => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>

    </div>
  );
}
