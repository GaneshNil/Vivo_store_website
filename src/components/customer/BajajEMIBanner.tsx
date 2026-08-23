'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CreditCard, CheckCircle2, Calculator, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils/formatters';

export const BajajEMIBanner: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(30000);
  const [tenure, setTenure] = useState<number>(6);

  const calculatedMonthly = Math.round(selectedAmount / tenure);

  return (
    <section className="py-16 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl glass-panel border border-amber-500/20 bg-gradient-to-br from-amber-950/20 via-slate-900 to-vivo-950/30 p-8 sm:p-12 overflow-hidden shadow-2xl">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Scheme Information */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-300">
                <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                <span>IN-STORE FINANCE SPECIAL</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Upgrade to Any 5G Smartphone with{' '}
                <span className="text-gradient-gold">0% Bajaj Finance EMI</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Take home your dream Vivo, Samsung, Oppo or Realme smartphone today without paying the full amount upfront. Instant document verification and approval directly at our Begampur store.
              </p>

              {/* Bullet Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Zero Down Payment Available</span>
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
                  <span>All Major Credit & Debit Cards Accepted</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/store"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg transition-all"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Visit Store to Apply</span>
                </Link>
                <span className="text-xs text-slate-400">
                  Home Credit & Credit Card EMI also available at store counter
                </span>
              </div>

            </div>

            {/* Right: Interactive EMI Calculator Widget */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-slate-950/80 border border-white/10 shadow-xl space-y-6">
                
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-amber-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                      In-Store EMI Estimator
                    </h4>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    0% Interest
                  </span>
                </div>

                {/* Amount Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Select Mobile Price</span>
                    <span className="font-bold text-white text-base">{formatPrice(selectedAmount)}</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="100000"
                    step="2000"
                    value={selectedAmount}
                    onChange={(e) => setSelectedAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>₹10,000</span>
                    <span>₹50,000</span>
                    <span>₹1,00,000</span>
                  </div>
                </div>

                {/* Tenure Selector */}
                <div className="space-y-2">
                  <span className="text-xs text-slate-400 block">Select Tenure (Months)</span>
                  <div className="grid grid-cols-4 gap-2">
                    {[3, 6, 9, 12].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setTenure(m)}
                        className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                          tenure === m
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                            : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/20'
                        }`}
                      >
                        {m} Mo
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculation Output Card */}
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-amber-300/80">Estimated Monthly EMI</p>
                    <p className="text-2xl font-bold font-display text-amber-300">
                      {formatPrice(calculatedMonthly)}
                      <span className="text-xs font-normal text-amber-300/60"> /month</span>
                    </p>
                  </div>
                  <div className="text-right text-[11px] text-slate-400">
                    <p>Total: {formatPrice(selectedAmount)}</p>
                    <p className="text-emerald-400 font-semibold">Zero Interest</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
