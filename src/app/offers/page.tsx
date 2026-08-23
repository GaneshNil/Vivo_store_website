'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/lib/store/store-context';
import { Sparkles, MapPin, Tag, CreditCard, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { formatDate } from '@/lib/utils/formatters';

export default function OffersPage() {
  const { offers, storeSettings } = useStore();

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 bg-gradient-to-r from-amber-950/30 via-slate-900 to-vivo-950/40 overflow-hidden">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5" />
            <span>EXCLUSIVE IN-STORE PROMOTIONS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Store Offers & Special Schemes
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Avail <strong className="text-amber-300 font-semibold">Bajaj Finance EMI Available</strong>, festive gift hampers, bundle discounts, and free screen protection at our Begampur showroom.
          </p>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offers.map(off => (
          <div key={off.id} className="rounded-3xl glass-card border border-white/10 overflow-hidden flex flex-col justify-between">
            
            {off.banner_url && (
              <div className="relative aspect-[16/9] w-full bg-slate-900">
                <Image src={off.banner_url} alt={off.title} fill className="object-cover" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 shadow-md">
                    {off.badge_text}
                  </span>
                </div>
              </div>
            )}

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-emerald-400 block">{off.discount_text}</span>
                <h3 className="font-display font-bold text-lg text-white">{off.title}</h3>
                {off.subtitle && (
                  <p className="text-xs text-slate-300 leading-relaxed">{off.subtitle}</p>
                )}
                {off.terms && (
                  <p className="text-[11px] text-slate-400 border-t border-white/5 pt-2 italic">
                    Terms: {off.terms}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Valid till {formatDate(off.end_date)}</span>
                <Link
                  href="/store"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-vivo-600 hover:bg-vivo-500 text-white text-xs font-semibold"
                >
                  <span>Claim in Store</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
