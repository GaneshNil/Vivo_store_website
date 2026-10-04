'use client';

import React from 'react';
import Link from 'next/link';
import { CreditCard, CheckCircle2, Sparkles, MapPin, Zap, Landmark } from 'lucide-react';

export const BajajEMIBanner: React.FC = () => {
  return (
    <section className="py-14 sm:py-18 bg-[#FAFAFB] border-b border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-white border border-slate-200 shadow-sm p-7 sm:p-12 overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: In-Store Payment & Finance Facilities */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>IN-STORE PAYMENT & FINANCE FACILITIES</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Easy Purchase with{' '}
                <span className="text-gradient-gold">Bajaj Finance EMI Available</span>,{' '}
                <span className="text-blue-700">Credit Card</span> & <span className="text-emerald-700">Home Credit</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Take home your dream Vivo, Samsung, Oppo or Realme smartphone today with flexible financing options. Enjoy on-the-spot document verification and instant approvals directly at our Begampur showroom counter.
              </p>

              {/* Bullet Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Zero Down Payment Options</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>10-Minute In-Store Approval</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Only Aadhaar Card & PAN Required</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>All Major Bank Credit & Debit Cards Accepted</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/store"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-vivo-600 hover:bg-vivo-700 text-white font-semibold text-xs shadow-sm transition-all"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Visit Store in Begampur</span>
                </Link>
                <span className="text-xs text-slate-500 font-medium">
                  Showroom Timings: 10:00 AM – 09:00 PM (Open 7 Days)
                </span>
              </div>

            </div>

            {/* Right: Highlighted Payment Services */}
            <div className="lg:col-span-5 space-y-3.5">
              
              {/* Highlight Card 1: Credit Card Payment & EMI */}
              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/60 border border-blue-200/90 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 border border-blue-200">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 font-display">Credit Card Payment Available</h3>
                      <p className="text-[11px] text-blue-700 font-semibold">
                        Swipe, Tap & Pay + Easy Card EMI
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[9px] uppercase tracking-wider">
                    Active
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  Accepting all major Credit & Debit cards (HDFC, ICICI, SBI, Axis, Kotak, OneCard, Visa & Mastercard) with instant swipe and attractive bank cashbacks.
                </p>
              </div>

              {/* Highlight Card 2: Home Credit Service Available */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/90 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 border border-emerald-200">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 font-display">Home Credit Service Available</h3>
                      <p className="text-[11px] text-emerald-700 font-semibold">
                        Paperless Financing & Flexible Installments
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[9px] uppercase tracking-wider">
                    Fast
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  Authorized Home Credit counter for quick smartphone loans with minimal documentation. Instant digital processing right inside our Begampur store.
                </p>
              </div>

              {/* Highlight Card 3: Bajaj Finance EMI Available */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Bajaj Finance EMI Available</h4>
                    <p className="text-[11px] text-amber-800 font-medium">10-Min approval with Aadhaar & PAN Card</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
                  Instant
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

