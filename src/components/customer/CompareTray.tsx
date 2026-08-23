'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/lib/store/store-context';
import { Layers, X, ArrowRight, Trash2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils/formatters';

export const CompareTray: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare } = useStore();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4 animate-in fade-in slide-in-from-bottom-6 duration-300">
      <div className="glass-panel border border-vivo-500/40 rounded-2xl p-4 shadow-2xl shadow-vivo-950/80 bg-slate-950/90 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left Title & Counter */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-vivo-600/20 text-vivo-400 border border-vivo-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Compare Phones ({compareList.length}/3)</h4>
              <p className="text-xs text-slate-400 hidden sm:block">Side-by-side specs, camera & price</p>
            </div>
          </div>

          {/* Center Product Thumbnails */}
          <div className="flex items-center gap-3">
            {compareList.map(prod => {
              const defaultVar = prod.variants[0];
              const primaryImg = prod.images.find(img => img.is_primary)?.image_url || prod.images[0]?.image_url;

              return (
                <div key={prod.id} className="relative group flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-2.5 py-1.5 pr-2">
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0">
                    <Image
                      src={primaryImg}
                      alt={prod.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-xs font-medium text-white truncate max-w-[100px]">{prod.name}</p>
                    <p className="text-[10px] text-vivo-400 font-semibold">{formatPrice(defaultVar?.selling_price || 0)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCompare(prod.id)}
                    className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                    title="Remove from compare"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={clearCompare}
              className="p-2 text-slate-400 hover:text-white text-xs hover:bg-white/5 rounded-lg transition-colors hidden sm:block"
              title="Clear all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <Link
              href="/compare"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-vivo-600 to-origin-violet text-white text-xs font-semibold hover:from-vivo-500 hover:to-origin-purple shadow-glow-blue transition-all"
            >
              <span>Compare Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
