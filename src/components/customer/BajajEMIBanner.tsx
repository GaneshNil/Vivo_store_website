'use client';

import React from 'react';
import Link from 'next/link';
import { CreditCard, CheckCircle2, Sparkles, MapPin, ArrowRight, ShieldCheck, Zap, Smartphone, Landmark } from 'lucide-react';

export const BajajEMIBanner: React.FC = () => {
  return (
    <section className="py-16 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl glass-panel border border-amber-500/20 bg-gradient-to-br from-amber-950/20 via-slate-900 to-vivo-950/30 p-8 sm:p-12 overflow-hidden shadow-2xl">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-vivo-600/10 blur-[90px] rounded-full pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: In-Store Payment & Finance Facilities */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>IN-STORE PAYMENT & FINANCE FACILITIES</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Easy Purchase with{' '}
                <span className="text-gradient-gold">Bajaj Finance EMI Available</span>,{' '}
                <span className="text-cyan-400">Credit Card</span> & <span className="text-emerald-400">Home Credit</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Take home your dream Vivo, Samsung, Oppo or Realme smartphone today with flexible financing options. Enjoy on-the-spot document verification and instant approvals directly at our Begampur showroom counter.
              </p>

              {/* Bullet Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Zero Down Payment Options</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>10-Minute In-Store Approval</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Only Aadhaar Card & PAN Required</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>All Major Bank Credit & Debit Cards Accepted</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/store"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Visit Store in Begampur</span>
                </Link>
                <span className="text-xs text-slate-400">
                  Showroom Timings: 10:00 AM – 09:00 PM (Open 7 Days)
                </span>
              </div>

            </div>

            {/* Right: Highlighted Payment Services (Credit Card & Home Credit & Bajaj) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Highlight Card 1: Credit Card Payment & EMI */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-slate-900/90 to-slate-950 border-2 border-cyan-500/40 shadow-glow-blue relative overflow-hidden group hover:border-cyan-400 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white font-display">Credit Card Payment Available</h3>
                        <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-extrabold text-[9px] border border-cyan-500/30 uppercase tracking-wider">
                          Active
                        </span>
                      </div>
                      <p className="text-[11px] text-cyan-200/80 font-medium mt-0.5">
                        Swipe, Tap & Pay + Easy Card EMI
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  Accepting all major Credit & Debit cards (HDFC, ICICI, SBI, Axis, Kotak, OneCard, Visa & Mastercard) with instant swipe and attractive bank cashbacks.
                </p>
              </div>

              {/* Highlight Card 2: Home Credit Service Available */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-slate-900/90 to-slate-950 border-2 border-emerald-500/40 shadow-glow-green relative overflow-hidden group hover:border-emerald-400 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white font-display">Home Credit Service Available</h3>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-[9px] border border-emerald-500/30 uppercase tracking-wider">
                          Instant Approval
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-200/80 font-medium mt-0.5">
                        Paperless Financing & Flexible Installments
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  Authorized Home Credit counter for quick smartphone loans with minimal documentation. Instant digital processing right inside our Begampur store.
                </p>
              </div>

              {/* Highlight Card 3: Bajaj Finance EMI Available */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900/90 to-slate-950 border border-amber-500/30 relative overflow-hidden group hover:border-amber-400 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Bajaj Finance EMI Available</h4>
                      <p className="text-[10px] text-amber-300/80 font-medium">10-Min approval with Aadhaar & PAN Card</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Available
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
