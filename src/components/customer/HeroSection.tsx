'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  CreditCard,
  Camera,
  Cpu,
  Layers,
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
  const cameraText = s.camera?.rear_main || '50 MP ZEISS Studio OIS';
  const processorText = s.processor?.chipset || 'Flagship 5G Chipset';
  const batteryText = s.battery_charging?.capacity || '5500 mAh BlueVolt';

  return (
    <section className="relative overflow-hidden pt-6 pb-16 md:py-20">
      
      {/* Dynamic OriginOS Ambient Light Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-vivo-600/20 via-origin-violet/20 to-cyan-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-origin-violet/10 blur-[90px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Storytelling & In-Store Discovery */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-vivo-500/30 text-xs font-semibold text-vivo-300 shadow-glow-blue/30 backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-origin-cyan" />
              <span>OFFICIAL VIVO EXPERIENCE & MULTI-BRAND SHOWROOM</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]"
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
              className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed"
            >
              Explore live demo units of the latest <strong className="text-white">{heroProduct?.name || 'VIVO Flagship'}</strong> and popular multi-brand smartphones. Compare specifications online, check live store stock, and visit our Begampur showroom for instant purchase.
            </motion.p>

            {/* In-Store CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link
                href="/mobiles"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-vivo-600 via-vivo-500 to-origin-violet hover:from-vivo-500 hover:to-origin-purple text-white font-semibold text-sm shadow-glow-blue hover:shadow-glow-violet transition-all transform hover:-translate-y-0.5"
              >
                <span>Browse All Mobiles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/store"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 text-sm font-semibold transition-all backdrop-blur-md"
              >
                <MapPin className="w-4 h-4 text-vivo-400" />
                <span>Visit Begampur Store</span>
              </Link>
            </motion.div>

            {/* In-Store Benefits Strip */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10 text-left max-w-xl mx-auto lg:mx-0"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex-shrink-0">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-amber-300">Bajaj Finance EMI Available</p>
                  <p className="text-[10px] text-slate-400">Instant In-Store Approval</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-vivo-500/10 text-vivo-400 border border-vivo-500/20 flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">100% Genuine</p>
                  <p className="text-[10px] text-slate-400">Official warranty</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex-shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Free Setup</p>
                  <p className="text-[10px] text-slate-400">UV glass & data</p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Hero Cinematic Product Card (Dynamic Admin Configured) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Ambient Studio Ring */}
            <div className="absolute inset-0 bg-gradient-to-tr from-vivo-500/20 via-origin-violet/20 to-transparent rounded-3xl blur-2xl transform rotate-3" />

            {heroProduct && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative w-full max-w-md rounded-3xl glass-panel border border-white/10 p-6 shadow-2xl shadow-black/80 space-y-6"
              >
                
                {/* Card Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-vivo-500/20 text-vivo-300 border border-vivo-500/30 flex items-center gap-1 shadow">
                      <Star className="w-3 h-3 fill-vivo-400 text-vivo-400" />
                      <span>FLAGSHIP SHOWCASE</span>
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                      {statusConfig.label}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-300 truncate max-w-[140px]">
                    {heroProduct.name}
                  </span>
                </div>

                {/* Showcase Image with Floating Light */}
                <div className="relative aspect-square w-full rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 flex items-center justify-center p-6 border border-white/5 overflow-hidden">
                  <div className="absolute inset-0 bg-radial-gradient from-vivo-500/15 via-transparent to-transparent pointer-events-none" />
                  <div className="relative w-64 h-64 animate-float">
                    {primaryImage ? (
                      <Image
                        src={primaryImage.image_url}
                        alt={heroProduct.name}
                        fill
                        className="object-contain"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600">
                        No Image
                      </div>
                    )}
                  </div>
                </div>

                {/* Spec Hotspots */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
                    <Camera className="w-4 h-4 text-vivo-400 mx-auto mb-1" />
                    <p className="text-xs font-bold text-white truncate" title={cameraText}>
                      {cameraText.length > 14 ? cameraText.slice(0, 14) + '...' : cameraText}
                    </p>
                    <p className="text-[10px] text-slate-400">Camera System</p>
                  </div>
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
                    <Cpu className="w-4 h-4 text-origin-violet mx-auto mb-1" />
                    <p className="text-xs font-bold text-white truncate" title={processorText}>
                      {processorText.length > 14 ? processorText.slice(0, 14) + '...' : processorText}
                    </p>
                    <p className="text-[10px] text-slate-400">Performance</p>
                  </div>
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
                    <Zap className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                    <p className="text-xs font-bold text-white truncate" title={batteryText}>
                      {batteryText.length > 14 ? batteryText.slice(0, 14) + '...' : batteryText}
                    </p>
                    <p className="text-[10px] text-slate-400">Battery & Power</p>
                  </div>
                </div>

                {/* Pricing & Store CTA */}
                <div className="pt-2 flex items-center justify-between border-t border-white/10">
                  <div>
                    <p className="text-[11px] text-slate-400">In-Store Starting Price</p>
                    <p className="text-xl font-bold text-white">
                      {formatPrice(defaultVariant?.selling_price || 0)}
                    </p>
                  </div>

                  <Link
                    href={`/product/${heroProduct.slug}`}
                    className="px-4 py-2 rounded-xl bg-vivo-600 hover:bg-vivo-500 text-white text-xs font-semibold shadow-glow-blue transition-all flex items-center gap-1.5"
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
