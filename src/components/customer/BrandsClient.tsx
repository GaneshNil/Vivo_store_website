'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/lib/store/store-context';
import { Sparkles, ArrowRight, Smartphone } from 'lucide-react';

export function BrandsClient() {
  const { brands, products } = useStore();

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 border border-slate-200 bg-gradient-to-r from-blue-50/70 via-white to-slate-50 overflow-hidden shadow-sm">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-vivo-600 uppercase tracking-wider">
            <Smartphone className="w-3.5 h-3.5" />
            <span>OFFICIAL BRAND PORTFOLIO</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Authorized Smartphone & Accessory Brands
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
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
              className={`p-6 sm:p-8 rounded-3xl border space-y-4 transition-all duration-300 shadow-sm ${
                b.is_primary
                  ? 'border-vivo-300 bg-gradient-to-br from-blue-50/60 via-white to-slate-50 shadow-md ring-1 ring-vivo-200'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 flex-shrink-0 p-2 flex items-center justify-center shadow-inner">
                    <Image src={b.logo_url} alt={b.name} fill className="object-contain p-2" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold font-display text-slate-900">{b.name}</h3>
                      {b.is_primary && (
                        <span className="text-[10px] uppercase font-extrabold tracking-widest bg-vivo-600 text-white px-2 py-0.5 rounded-full shadow-sm">
                          ★ FLAGSHIP PARTNER
                        </span>
                      )}
                    </div>
                    {b.is_primary && (
                      <p className="text-[11px] text-vivo-700 font-medium mt-0.5">
                        Official VIVO Experience Showroom & ZEISS Photography Specialist
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-right text-xs text-slate-500 flex-shrink-0">
                  <p><strong className="text-slate-900 font-bold">{phoneCount}</strong> Phones</p>
                  {accCount > 0 && <p><strong className="text-slate-900 font-bold">{accCount}</strong> Acc</p>}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {b.description}
              </p>

              <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                <span className="text-xs text-slate-500">
                  In-Stock at Begampur Store
                </span>
                <Link
                  href={b.slug === 'galaxy-store-genuine' ? '/accessories' : `/mobiles?brand=${b.slug}`}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    b.is_primary
                      ? 'bg-vivo-600 hover:bg-vivo-700 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
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

export default BrandsClient;
