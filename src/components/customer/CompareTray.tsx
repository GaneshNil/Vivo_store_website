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
    <div className="fixed bottom-18 md:bottom-6 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-3xl px-3 sm:px-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-3 sm:p-4 shadow-xl">
        <div className="flex items-center justify-between gap-3">
          
          {/* Left Title & Counter */}
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-vivo-50 text-vivo-600 border border-vivo-200 flex-shrink-0">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Compare ({compareList.length}/3)</h4>
              <p className="text-[11px] text-slate-500 hidden sm:block">Side-by-side specs, camera & price</p>
            </div>
          </div>

          {/* Center Product Thumbnails */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {compareList.map(prod => {
              const defaultVar = prod.variants[0];
              const primaryImg = prod.images.find(img => img.is_primary)?.image_url || prod.images[0]?.image_url;

              return (
                <div key={prod.id} className="relative flex items-center gap-1.5 sm:gap-2 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1 flex-shrink-0">
                  <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg overflow-hidden bg-white border border-slate-100 flex-shrink-0">
                    <Image
                      src={primaryImg}
                      alt={prod.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-xs font-semibold text-slate-900 truncate max-w-[90px]">{prod.name}</p>
                    <p className="text-[10px] text-vivo-700 font-bold">{formatPrice(defaultVar?.selling_price || 0)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCompare(prod.id)}
                    className="p-1 text-slate-400 hover:text-red-600 rounded-md transition-colors"
                    title="Remove from compare"
                    aria-label={`Remove ${prod.name} from comparison`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              type="button"
              onClick={clearCompare}
              className="p-2 text-slate-400 hover:text-slate-700 text-xs hover:bg-slate-100 rounded-lg transition-colors hidden sm:block"
              title="Clear all"
              aria-label="Clear all devices from compare"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <Link
              href="/compare"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-vivo-600 hover:bg-vivo-700 text-white text-xs font-semibold shadow-xs transition-all"
            >
              <span>Compare</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

