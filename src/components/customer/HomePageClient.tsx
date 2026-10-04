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
  Star, 
  ExternalLink
} from 'lucide-react';

export function HomePageClient() {
  const { products, brands, reviews, storeSettings } = useStore();

  const newArrivals = products.filter(p => p.is_new_arrival && p.is_active).slice(0, 4);

  return (
    <div className="space-y-0">
      {/* 1. Hero Flagship Showcase */}
      <HeroSection />

      {/* 2. Primary Brand: VIVO Experience Gallery */}
      <VivoShowcase />

      {/* 3. New Arrivals & Latest Smartphone Launches */}
      <section className="py-14 sm:py-18 bg-slate-50/50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-vivo-700 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-vivo-600" />
                <span>FRESH ARRIVALS AT STORE</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 font-display mt-1">
                Latest <span className="text-gradient-vivo">Phone Launches</span>
              </h2>
            </div>
            <Link
              href="/new-arrivals"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-vivo-600 hover:text-vivo-700"
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
      <section className="py-14 sm:py-18 bg-[#FAFAFB] border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-vivo-700 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-vivo-600" />
              <span>AUTHORIZED STORE PORTFOLIO</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Multi-Brand Smartphone & Accessory Lineup
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Authorized showroom for <strong className="text-vivo-700 font-bold">VIVO Flagship Devices</strong> alongside genuine Samsung, OPPO & Realme smartphones with official manufacturer warranty.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {brands.map(b => (
              <Link
                key={b.id}
                href={b.slug === 'galaxy-store-genuine' ? '/accessories' : `/mobiles?brand=${b.slug}`}
                className={`p-5 sm:p-6 rounded-2xl bg-white border text-center space-y-3 group transition-all duration-300 shadow-2xs hover:shadow-md ${
                  b.is_primary
                    ? 'border-vivo-300 bg-vivo-50/20'
                    : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div className="relative w-16 h-16 mx-auto rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/80 flex items-center justify-center p-2.5 group-hover:scale-105 transition-transform shadow-2xs">
                  <Image
                    src={b.logo_url}
                    alt={`${b.name} logo`}
                    fill
                    className="object-contain p-1.5"
                    sizes="64px"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-vivo-600 transition-colors">
                    {b.name}
                  </h3>
                  {b.is_primary ? (
                    <span className="text-[10px] text-white font-extrabold bg-vivo-600 px-2.5 py-0.5 rounded-full mt-1.5 inline-block shadow-2xs">
                      ★ PRIMARY FLAGSHIP
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 font-medium mt-1 inline-block">
                      Authorized Retailer
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {b.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Verified Customer Reviews & Store Feedback */}
      <section className="py-14 sm:py-18 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-widest">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>CUSTOMER VOICES</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 font-display mt-1">
                Verified <span className="text-gradient-gold">In-Store Buyers</span>
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="flex items-center text-amber-600 font-bold">
                <Star className="w-4 h-4 fill-current mr-1" /> 4.9 / 5.0
              </span>
              <span>Based on 450+ physical store purchases</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map(rev => (
              <div key={rev.id} className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  {rev.is_verified_store_buyer && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Verified Store Buyer
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  {rev.title && <h3 className="text-sm font-bold text-slate-900">{rev.title}</h3>}
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-bold text-slate-800">{rev.customer_name}</span>
                  <span>Store Visit Purchase</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Store Locator & Visit Us Physical Map Banner */}
      <section className="py-14 sm:py-18 bg-[#FAFAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vivo-50 border border-vivo-200 text-xs font-bold text-vivo-700 shadow-2xs">
                  <MapPin className="w-3.5 h-3.5 text-vivo-600" />
                  <span>BEGAMPUR SHOWROOM</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
                  Visit Galaxy Mobile Gallery in Begampur
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                  {storeSettings.address}, {storeSettings.landmark}, {storeSettings.taluka}, {storeSettings.district}, {storeSettings.state} - {storeSettings.pincode}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <p className="text-slate-500 font-medium">Showroom Hours:</p>
                    <p className="text-slate-900 font-bold mt-0.5">{storeSettings.hours}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <p className="text-slate-500 font-medium">Direct Contact / WhatsApp:</p>
                    <p className="text-slate-900 font-bold mt-0.5">+91 {storeSettings.phone}</p>
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap gap-3.5">
                  <a
                    href={`https://wa.me/91${storeSettings.whatsapp}?text=Hello%20Galaxy%20Mobile%20Gallery,%20I%20am%20planning%20to%20visit%20your%20store%20today.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-sm"
                  >
                    <span>💬 WhatsApp Store Chat</span>
                  </a>

                  <a
                    href={`tel:${storeSettings.phone}`}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-200 transition-all"
                  >
                    <Phone className="w-4 h-4 text-vivo-600" />
                    <span>Call Store Desk</span>
                  </a>

                  <Link
                    href="/store"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-vivo-600 hover:bg-vivo-700 text-white font-semibold text-xs transition-all shadow-sm"
                  >
                    <span>Get Directions & Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3 shadow-2xs">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-slate-200 bg-white p-1">
                  <Image
                    src="/assets/store-logo/IMG-20260822-WA0004.jpg"
                    alt="Galaxy Mobile Gallery Begampur Logo"
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div>
                  <h3 className="text-slate-900 font-bold text-sm">GALAXY MOBILE GALLERY</h3>
                  <p className="text-xs text-vivo-700 font-semibold">Begampur, Solapur</p>
                </div>
                <div className="text-[11px] text-slate-600 space-y-1 font-medium">
                  <p>✔ Live Demo Phones</p>
                  <p className="text-blue-700 font-semibold">✔ Bajaj Finance EMI Available</p>
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
