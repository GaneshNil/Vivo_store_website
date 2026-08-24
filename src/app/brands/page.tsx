'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/lib/store/store-context';
import { Sparkles, ArrowRight, Smartphone } from 'lucide-react';

export default function BrandsPage() {
  const { brands, products } = useStore();

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 bg-gradient-to-r from-vivo-950/40 via-slate-900 to-origin-surface/40 overflow-hidden">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-vivo-400 uppercase tracking-wider">
            <Smartphone className="w-3.5 h-3.5" />
            <span>OFFICIAL BRAND PORTFOLIO</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Authorized Smartphone & Accessory Brands
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Galaxy Mobile Gallery is an authorized retailer for VIVO flagships along with Samsung, Oppo, and Realme devices.
          </p>
        </div>
      </div>

      {/* Brands List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {brands.map(b => {
          const brandProducts = products.filter(p => p.brand_id === b.id && p.is_active);
          const phoneCount = brandProducts.filter(p => p.is_phone).length;
          const accCount = brandProducts.filter(p => !p.is_phone).length;

          return (
            <div
              key={b.id}
              className={`p-6 sm:p-8 rounded-3xl glass-panel border space-y-4 transition-all duration-300 ${
                b.is_primary
                  ? 'border-vivo-500/60 shadow-glow-blue/30 bg-gradient-to-br from-vivo-950/40 via-slate-900 to-slate-950'
                  : 'border-white/10 hover:border-white/20 bg-slate-900/50'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-950/90 border border-white/10 flex-shrink-0 p-2 flex items-center justify-center shadow-inner">
                    <Image src={b.logo_url} alt={b.name} fill className="object-contain p-2" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold font-display text-white">{b.name}</h3>
                      {b.is_primary && (
                        <span className="text-[10px] uppercase font-extrabold tracking-widest bg-vivo-500 text-slate-950 px-2 py-0.5 rounded-full shadow-glow-blue">
                          ★ FLAGSHIP PARTNER
                        </span>
                      )}
                    </div>
                    {b.is_primary && (
                      <p className="text-[11px] text-vivo-300 font-medium mt-0.5">
                        Official VIVO Experience Showroom & ZEISS Photography Specialist
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-right text-xs text-slate-400 flex-shrink-0">
                  <p><strong className="text-white font-bold">{phoneCount}</strong> Phones</p>
                  {accCount > 0 && <p><strong className="text-white font-bold">{accCount}</strong> Acc</p>}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {b.description}
              </p>

              <div className="pt-3 flex items-center justify-between border-t border-white/5">
                <span className="text-xs text-slate-400">
                  In-Stock at Begampur Store
                </span>
                <Link
                  href={b.slug === 'galaxy-store-genuine' ? '/accessories' : `/mobiles?brand=${b.slug}`}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    b.is_primary
                      ? 'bg-vivo-600 hover:bg-vivo-500 text-white shadow-glow-blue'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
