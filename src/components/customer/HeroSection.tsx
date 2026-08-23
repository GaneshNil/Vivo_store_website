'use client';

import React from 'react';
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
  Layers
} from 'lucide-react';
import { useStore } from '@/lib/store/store-context';

export const HeroSection: React.FC = () => {
  const { storeSettings } = useStore();

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
              Explore live demo units of the latest <strong className="text-white">VIVO X100 Pro</strong>, <strong className="text-white">V40 Pro</strong>, and <strong className="text-white">T3 5G</strong> series along with Samsung, Oppo & Realme. Compare specifications online, check live store stock, and visit our Begampur showroom for instant purchase.
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
                  <p className="text-xs font-bold text-white">0% Bajaj EMI</p>
                  <p className="text-[10px] text-slate-400">Instant approval</p>
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

          {/* Right Column: Hero Cinematic Product Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Ambient Studio Ring */}
            <div className="absolute inset-0 bg-gradient-to-tr from-vivo-500/20 via-origin-violet/20 to-transparent rounded-3xl blur-2xl transform rotate-3" />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-md rounded-3xl glass-panel border border-white/10 p-6 shadow-2xl shadow-black/80 space-y-6"
            >
              
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-vivo-500/20 text-vivo-300 border border-vivo-500/30">
                    FLAGSHIP SHOWCASE
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    IN STOCK AT STORE
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-400">VIVO X100 PRO</span>
              </div>

              {/* Showcase Image with Floating Light */}
              <div className="relative aspect-square w-full rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 flex items-center justify-center p-6 border border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-radial-gradient from-vivo-500/15 via-transparent to-transparent pointer-events-none" />
                <div className="relative w-64 h-64 animate-float">
                  <Image
                    src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80"
                    alt="VIVO X100 Pro 5G Flagship"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Spec Hotspots */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
                  <Camera className="w-4 h-4 text-vivo-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-white">50MP 1-inch</p>
                  <p className="text-[10px] text-slate-400">Sony IMX989 ZEISS</p>
                </div>
                <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
                  <Cpu className="w-4 h-4 text-origin-violet mx-auto mb-1" />
                  <p className="text-xs font-bold text-white">Dimensity 9300</p>
                  <p className="text-[10px] text-slate-400">4nm TSMC</p>
                </div>
                <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
                  <Zap className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <p className="text-xs font-bold text-white">100W Flash</p>
                  <p className="text-[10px] text-slate-400">5400mAh BlueVolt</p>
                </div>
              </div>

              {/* Pricing & Store CTA */}
              <div className="pt-2 flex items-center justify-between border-t border-white/10">
                <div>
                  <p className="text-[11px] text-slate-400">In-Store Starting Price</p>
                  <p className="text-xl font-bold text-white">₹89,999</p>
                </div>

                <Link
                  href="/product/vivo-x100-pro-5g"
                  className="px-4 py-2 rounded-xl bg-vivo-600 hover:bg-vivo-500 text-white text-xs font-semibold shadow-glow-blue transition-all"
                >
                  View Details & Stock
                </Link>
              </div>

            </motion.div>

          </div>

        </div>

      </div>

    </section>
  );
};
