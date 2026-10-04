'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  CreditCard,
  Camera,
  Cpu,
  Star
} from 'lucide-react';
import { useStore } from '@/lib/store/store-context';
import { formatPrice, getStatusBadgeConfig } from '@/lib/utils/formatters';

export const HeroSection: React.FC = () => {
  const { storeSettings, products } = useStore();

  // Dynamically resolve flagship model selected in Admin settings or default to top flagship
  const heroProduct = useMemo(() => {
    if (storeSettings.hero_flagship_product_id) {
      const found = products.find(p => p.id === storeSettings.hero_flagship_product_id && p.is_active);
      if (found) return found;
    }
    return (
      products.find(p => p.brand_id === 'brand-vivo' && p.is_featured && p.is_phone && p.is_active) ||
      products.find(p => p.is_phone && p.is_featured && p.is_active) ||
      products.find(p => p.is_phone && p.is_active) ||
      products[0]
    );
  }, [products, storeSettings.hero_flagship_product_id]);

  const defaultVariant = heroProduct?.variants?.find(v => v.is_default) || heroProduct?.variants?.[0];
  const primaryImage = heroProduct?.images?.find(img => img.is_primary) || heroProduct?.images?.[0];
  const statusConfig = getStatusBadgeConfig(defaultVariant?.computed_status || 'IN_STOCK');

  const s = (heroProduct?.specifications || {}) as any;
  const cameraText = (typeof s.camera === 'string' ? s.camera : s.camera?.rear_main) || s.rear_primary || (typeof s.primary_camera === 'string' ? s.primary_camera : s.primary_camera?.rear) || '50 MP ZEISS Studio OIS';
  const processorText = (typeof s.processor === 'string' ? s.processor : s.processor?.chipset) || s.chipset || (typeof s.performance === 'string' ? s.performance : s.performance?.chipset) || 'Flagship 5G Chipset';
  const batteryText = (typeof s.battery_charging === 'string' ? s.battery_charging : (s.battery_charging?.capacity || s.battery_charging?.battery_capacity)) || (typeof s.battery === 'string' ? s.battery : s.battery?.capacity) || s.battery_capacity || '5500 mAh BlueVolt';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white pt-6 pb-12 md:py-16 border-b border-slate-200/60">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Storytelling & In-Store Discovery */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-vivo-50 border border-vivo-200 text-xs font-bold text-vivo-700 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-vivo-600" />
              <span>OFFICIAL VIVO EXPERIENCE & MULTI-BRAND SHOWROOM</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]"
            >
              Experience the Future of{' '}
              <span className="text-gradient-vivo">VIVO Flagships</span>{' '}
              & Smart Tech
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed"
            >
              Explore live demo units of the latest <strong className="text-slate-900 font-semibold">{heroProduct?.name || 'VIVO Flagship'}</strong> and popular multi-brand smartphones. Compare specifications online, check live store stock, and visit our Begampur showroom for instant purchase.
            </motion.p>

            {/* In-Store CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2"
            >
              <Link
                href="/mobiles"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-vivo-600 hover:bg-vivo-700 text-white font-semibold text-sm shadow-sm hover:shadow transition-all"
              >
                <span>Browse All Mobiles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/store"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-sm font-semibold shadow-2xs hover:border-slate-300 transition-all"
              >
                <MapPin className="w-4 h-4 text-vivo-600" />
                <span>Visit Begampur Store</span>
              </Link>
            </motion.div>

            {/* In-Store Benefits Strip */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-200/80 text-left max-w-xl mx-auto lg:mx-0"
            >
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Bajaj Finance EMI</p>
                  <p className="text-[10px] text-slate-500">10-Min In-Store Approval</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">100% Genuine</p>
                  <p className="text-[10px] text-slate-500">Official Brand Warranty</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex-shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Free Setup</p>
                  <p className="text-[10px] text-slate-500">UV Glass & Data Transfer</p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Hero Showcase Product Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {heroProduct && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative w-full max-w-md rounded-3xl bg-white border border-slate-200 shadow-xl p-6 space-y-5"
              >
                
                {/* Card Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-vivo-50 text-vivo-700 border border-vivo-200 flex items-center gap-1 shadow-2xs">
                      <Star className="w-3 h-3 fill-vivo-600 text-vivo-600" />
                      <span>FLAGSHIP SHOWCASE</span>
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                      {statusConfig.label}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-700 truncate max-w-[140px]">
                    {heroProduct.name}
                  </span>
                </div>

                {/* Showcase Image Stage */}
                <div className="relative aspect-square w-full rounded-2xl bg-slate-50/90 border border-slate-100 flex items-center justify-center p-6 overflow-hidden">
                  <div className="relative w-60 h-60">
                    {primaryImage ? (
                      <Image
                        src={primaryImage.image_url}
                        alt={`${heroProduct.name} - Official Flagship Showcase`}
                        fill
                        sizes="(max-width: 640px) 240px, 320px"
                        className="object-contain"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        No Image
                      </div>
                    )}
                  </div>
                </div>

                {/* Spec Hotspots */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <Camera className="w-4 h-4 text-vivo-600 mx-auto mb-1" />
                    <p className="text-xs font-bold text-slate-900 truncate" title={cameraText}>
                      {cameraText.length > 14 ? cameraText.slice(0, 14) + '...' : cameraText}
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium">Camera System</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <Cpu className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
                    <p className="text-xs font-bold text-slate-900 truncate" title={processorText}>
                      {processorText.length > 14 ? processorText.slice(0, 14) + '...' : processorText}
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium">Performance</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <Zap className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                    <p className="text-xs font-bold text-slate-900 truncate" title={batteryText}>
                      {batteryText.length > 14 ? batteryText.slice(0, 14) + '...' : batteryText}
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium">Battery & Power</p>
                  </div>
                </div>

                {/* Pricing & Store CTA */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium">In-Store Starting Price</p>
                    <p className="text-xl font-bold text-slate-900 font-display">
                      {formatPrice(defaultVariant?.selling_price || 0)}
                    </p>
                  </div>

                  <Link
                    href={`/product/${heroProduct.slug}`}
                    className="px-4 py-2.5 rounded-xl bg-vivo-600 hover:bg-vivo-700 text-white text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <span>View Details & Stock</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </motion.div>
            )}

          </div>

        </div>

      </div>

    </section>
  );
};

