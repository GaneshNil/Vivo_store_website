'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/lib/store/store-context';
import { HeroSection } from '@/components/customer/HeroSection';
import { VivoShowcase } from '@/components/customer/VivoShowcase';
import { AccessoriesShowcase } from '@/components/customer/AccessoriesShowcase';
import { BajajEMIBanner } from '@/components/customer/BajajEMIBanner';
import { ProductCard } from '@/components/customer/ProductCard';
import { 
  Sparkles, 
  ArrowRight, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  CreditCard, 
  Star, 
  MessageSquare,
  Layers,
  Zap,
  ExternalLink
} from 'lucide-react';

export default function HomePage() {
  const { products, brands, reviews, storeSettings } = useStore();

  const newArrivals = products.filter(p => p.is_new_arrival && p.is_active).slice(0, 4);
  const bestSellers = products.filter(p => p.is_best_seller && p.is_active).slice(0, 4);

  return (
    <div className="space-y-12">
      {/* 1. Hero Flagship Showcase */}
      <HeroSection />

      {/* 2. Primary Brand: VIVO Experience Gallery */}
      <VivoShowcase />

      {/* 3. New Arrivals & Latest Smartphone Launches */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-origin-cyan uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FRESH ARRIVALS AT STORE</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white font-display mt-1">
                Latest <span className="text-gradient-origin">Phone Launches</span>
              </h2>
            </div>
            <Link
              href="/new-arrivals"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-vivo-400 hover:text-vivo-300"
            >
              <span>View All New Arrivals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Bajaj Finance 0% EMI Interactive Section */}
      <BajajEMIBanner />

      {/* 5. In-Store Accessories Showroom */}
      <AccessoriesShowcase />

      {/* 6. Multi-Brand Smartphone Portfolio */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-vivo-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AUTHORIZED STORE PORTFOLIO</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Multi-Brand Smartphone & Accessory Lineup
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Authorized showroom for <strong className="text-vivo-300">VIVO Flagship Devices</strong> alongside genuine Samsung, OPPO & Realme smartphones with official warranty.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {brands.map(b => (
              <Link
                key={b.id}
                href={b.slug === 'galaxy-store-genuine' ? '/accessories' : `/mobiles?brand=${b.slug}`}
                className={`p-5 sm:p-6 rounded-3xl glass-card text-center space-y-3 group transition-all duration-300 ${
                  b.is_primary
                    ? 'border-vivo-500/60 shadow-glow-blue/20 bg-gradient-to-b from-vivo-950/40 via-slate-900 to-slate-950'
                    : 'hover:border-vivo-500/40 hover:shadow-glow-blue/10 bg-slate-900/60'
                }`}
              >
                <div className="relative w-16 h-16 mx-auto rounded-2xl overflow-hidden bg-slate-950/90 border border-white/10 flex items-center justify-center p-2.5 group-hover:border-vivo-400/60 group-hover:scale-105 transition-all shadow-inner">
                  <Image
                    src={b.logo_url}
                    alt={b.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-vivo-400 transition-colors">
                    {b.name}
                  </h3>
                  {b.is_primary ? (
                    <span className="text-[10px] text-slate-950 font-extrabold bg-vivo-500 px-2.5 py-0.5 rounded-full mt-1.5 inline-block shadow-glow-blue">
                      ★ PRIMARY FLAGSHIP
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-medium mt-1 inline-block">
                      Authorized Retailer
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {b.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Verified Customer Reviews & Store Feedback */}
      <section className="py-16 border-t border-white/5 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>CUSTOMER VOICES</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white font-display mt-1">
                Verified <span className="text-gradient-gold">In-Store Buyers</span>
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="flex items-center text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-current mr-1" /> 4.9 / 5.0
              </span>
              <span>Based on 450+ physical store purchases</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map(rev => (
              <div key={rev.id} className="p-6 rounded-2xl glass-card space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  {rev.is_verified_store_buyer && (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Verified Store Buyer
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  {rev.title && <h4 className="text-sm font-bold text-white">{rev.title}</h4>}
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-200">{rev.customer_name}</span>
                  <span>Store Visit Purchase</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Store Locator & Visit Us Physical Map Banner */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl glass-panel border border-vivo-500/30 bg-gradient-to-r from-vivo-950/60 via-slate-900 to-origin-surface/60 p-8 sm:p-12 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vivo-500/10 border border-vivo-500/30 text-xs font-semibold text-vivo-300">
                  <MapPin className="w-3.5 h-3.5 text-vivo-400" />
                  <span>BEGAMPUR SHOWROOM</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                  Visit Galaxy Mobile Gallery in Begampur
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                  {storeSettings.address}, {storeSettings.landmark}, {storeSettings.taluka}, {storeSettings.district}, {storeSettings.state} - {storeSettings.pincode}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-slate-400">Showroom Hours:</p>
                    <p className="text-white font-semibold mt-0.5">{storeSettings.hours}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-slate-400">Direct Contact / WhatsApp:</p>
                    <p className="text-white font-semibold mt-0.5">+91 {storeSettings.phone}</p>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  <a
                    href={`https://wa.me/91${storeSettings.whatsapp}?text=Hello%20Galaxy%20Mobile%20Gallery,%20I%20am%20planning%20to%20visit%20your%20store%20today.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-lg"
                  >
                    <span>💬 WhatsApp Store Chat</span>
                  </a>

                  <a
                    href={`tel:${storeSettings.phone}`}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/10 transition-all"
                  >
                    <Phone className="w-4 h-4 text-vivo-400" />
                    <span>Call Store Desk</span>
                  </a>

                  <Link
                    href="/store"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-vivo-600 hover:bg-vivo-500 text-white font-semibold text-xs transition-all"
                  >
                    <span>Get Directions & Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-black/40 border border-white/10 text-center space-y-3">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-vivo-500/40 shadow-glow-blue">
                  <Image
                    src="/assets/store-logo/IMG-20260822-WA0004.jpg"
                    alt="Store Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">GALAXY MOBILE GALLERY</h4>
                  <p className="text-xs text-vivo-400">Begampur, Solapur</p>
                </div>
                <div className="text-[11px] text-slate-400 space-y-1">
                  <p>✔ Live Demo Phones</p>
                  <p className="text-amber-300 font-semibold">✔ Bajaj Finance EMI Available</p>
                  <p>✔ Free Screen Guard Installation</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
