'use client';

import React from 'react';
import { useStore } from '@/lib/store/store-context';
import { ProductCard } from '@/components/customer/ProductCard';
import { Sparkles } from 'lucide-react';

export function NewArrivalsClient() {
  const { products } = useStore();

  const newProducts = products.filter(
    p => (p.is_new_arrival || p.variants.some(v => v.computed_status === 'COMING_SOON')) && p.is_active
  );

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 border border-slate-200 bg-gradient-to-r from-blue-50/70 via-white to-slate-50 overflow-hidden shadow-sm">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-vivo-600 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>JUST LAUNCHED & COMING SOON</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            New Smartphone Launches
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
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

export default NewArrivalsClient;
