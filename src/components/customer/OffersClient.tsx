'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/lib/store/store-context';
import { Sparkles, MapPin, Tag, CreditCard, ArrowRight, ShieldCheck, CheckCircle2, Check, Zap } from 'lucide-react';
import { formatDate } from '@/lib/utils/formatters';
import { OfferBadgeColor } from '@/lib/types';

const BADGE_COLOR_MAP: Record<OfferBadgeColor, string> = {
  amber: 'bg-amber-500 text-slate-950',
  emerald: 'bg-emerald-500 text-slate-950',
  cyan: 'bg-cyan-500 text-slate-950',
  purple: 'bg-purple-500 text-white',
  rose: 'bg-rose-500 text-white',
  blue: 'bg-vivo-600 text-white',
};

export function OffersClient() {
  const { offers, storeSettings } = useStore();

  const activeOffers = offers.filter(off => off.is_active);

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-amber-50/60 to-transparent pointer-events-none" />
        <div className="relative max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5" />
            <span>EXCLUSIVE IN-STORE PROMOTIONS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Store Offers & Special Schemes
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Avail <strong className="text-amber-800 font-semibold">Bajaj Finance 0% EMI Schemes</strong>, instant bank cashbacks, festival gift hampers, bundle discounts, and free screen protection at our Begampur showroom.
          </p>
        </div>
      </div>

      {/* Offers Grid */}
      {activeOffers.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <Sparkles className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 font-display">Exciting Offers Coming Soon!</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            We are preparing exclusive festive schemes and exchange discounts. Visit our showroom at Begampur for daily deals.
          </p>
          <Link
            href="/store"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-vivo-600 hover:bg-vivo-700 text-white text-xs font-semibold shadow-2xs mt-2"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Visit Showroom</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeOffers.map(off => {
            const badgeColorClass = off.badge_color ? BADGE_COLOR_MAP[off.badge_color] : BADGE_COLOR_MAP.amber;
            const ctaUrl = off.cta_link || '/store';
            const ctaLabel = off.cta_text || 'Claim in Store';

            return (
              <div
                key={off.id}
                className="rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-md overflow-hidden flex flex-col justify-between transition-all group"
              >
                {off.banner_url && (
                  <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={off.banner_url}
                      alt={off.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold shadow-sm ${badgeColorClass}`}>
                        {off.badge_text}
                      </span>
                    </div>

                    {off.discount_text && (
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-emerald-600 text-white shadow-sm">
                          {off.discount_text}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    {!off.banner_url && off.discount_text && (
                      <span className="text-xs font-extrabold text-emerald-700 block">{off.discount_text}</span>
                    )}
                    <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-vivo-600 transition-colors">
                      {off.title}
                    </h3>
                    {off.subtitle && (
                      <p className="text-xs text-slate-600 leading-relaxed">{off.subtitle}</p>
                    )}

                    {/* Bullet Highlights */}
                    {off.highlights && off.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {off.highlights.map((hl, hIdx) => (
                          <span
                            key={hIdx}
                            className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[10px] text-slate-700 flex items-center gap-1 font-medium"
                          >
                            <Check className="w-2.5 h-2.5 text-emerald-600" />
                            <span>{hl}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {off.terms && (
                      <p className="text-[11px] text-slate-500 border-t border-slate-100 pt-2 italic">
                        Terms: {off.terms}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      {off.end_date ? `Valid till ${formatDate(off.end_date)}` : 'Ongoing In-Store Scheme'}
                    </span>
                    <Link
                      href={ctaUrl}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-vivo-600 hover:bg-vivo-700 text-white text-xs font-semibold shadow-2xs transition-all"
                    >
                      <span>{ctaLabel}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}

export default OffersClient;

