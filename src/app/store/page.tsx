'use client';

import React from 'react';
import Image from 'next/image';
import { useStore } from '@/lib/store/store-context';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CreditCard, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2,
  Sparkles,
  Smartphone,
  Zap,
  Layers
} from 'lucide-react';

export default function StorePage() {
  const { storeSettings } = useStore();

  const inStoreServices = [
    { title: 'Live Phone Demos', desc: 'Experience touch, camera and OS performance on all flagship demo handsets before purchasing.', icon: Smartphone },
    { title: 'Bajaj Finance EMI Available', desc: 'Instant 10-minute on-the-spot approval with minimal documents (Aadhaar & PAN).', icon: CreditCard },
    { title: 'Free UV Screen Protection', desc: 'Complimentary professional bubble-free UV liquid tempered glass installation by store technician.', icon: Layers },
    { title: 'Old-to-New Data Migration', desc: 'Free instant transfer of all your contacts, photos and apps from your old phone to the new device.', icon: Zap },
    { title: 'Official Brand Warranty', desc: 'Genuine Indian brand handsets with tax invoice and 100% manufacturer warranty.', icon: ShieldCheck },
    { title: 'Genuine Accessories Hub', desc: 'Original flash chargers, verified power banks, rugged cases and audio gear in stock.', icon: Sparkles },
  ];

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl glass-panel p-8 sm:p-12 border border-vivo-500/30 bg-gradient-to-r from-vivo-950/60 via-slate-900 to-origin-surface/60 overflow-hidden shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vivo-500/10 border border-vivo-500/30 text-xs font-semibold text-vivo-300">
            <MapPin className="w-3.5 h-3.5 text-vivo-400" />
            <span>PHYSICAL STORE SHOWROOM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
            Visit Galaxy Mobile Gallery in Begampur
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            We are Solapur district&apos;s leading digital showroom for VIVO, Samsung, Oppo & Realme smartphones. Walk into our physical store for live device demonstrations, exclusive festive discounts, and instant <strong className="text-amber-300">Bajaj Finance EMI Available</strong>.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={`https://wa.me/91${storeSettings.whatsapp}?text=Hello%20Galaxy%20Mobile%20Gallery,%20I%20am%20coming%20to%20visit%20your%20store.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-lg flex items-center gap-2"
            >
              <span>💬 WhatsApp Store Desk</span>
            </a>

            <a
              href={`tel:${storeSettings.phone}`}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/10 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-vivo-400" />
              <span>Call: +91 {storeSettings.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Address, Hours, Contact Card */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-900 border border-vivo-500/30 flex-shrink-0 shadow-glow-blue">
                <Image src="/assets/store-logo/IMG-20260822-WA0004.jpg" alt="Logo" fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white">GALAXY MOBILE GALLERY</h3>
                <p className="text-xs text-vivo-400 font-medium">VIVO Authorized Dealer & Multi-Brand Hub</p>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-1 text-xs">
              <p className="text-slate-400 font-medium uppercase tracking-wider flex items-center gap-1.5 text-vivo-400">
                <MapPin className="w-3.5 h-3.5" /> Full Store Address
              </p>
              <p className="text-sm font-semibold text-white leading-relaxed pt-1">
                {storeSettings.address}
              </p>
              <p className="text-slate-300">
                {storeSettings.landmark}, {storeSettings.taluka}, {storeSettings.district}, {storeSettings.state} – {storeSettings.pincode}
              </p>
            </div>

            {/* Timings */}
            <div className="space-y-1 text-xs border-t border-white/5 pt-4">
              <p className="text-slate-400 font-medium uppercase tracking-wider flex items-center gap-1.5 text-amber-400">
                <Clock className="w-3.5 h-3.5" /> Operating Hours
              </p>
              <p className="text-sm font-semibold text-white pt-1">
                {storeSettings.hours}
              </p>
              <p className="text-emerald-400 font-medium">
                Open All 7 Days (Monday to Sunday)
              </p>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-4 text-xs">
              <div className="space-y-1">
                <p className="text-slate-400">Direct Phone / WhatsApp</p>
                <p className="text-sm font-bold text-white">+91 {storeSettings.phone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-slate-400">Store Support Email</p>
                <p className="text-sm font-bold text-white truncate">{storeSettings.email}</p>
              </div>
            </div>

            {/* Payment Highlights */}
            <div className="space-y-2 border-t border-white/5 pt-4 text-xs">
              <p className="text-slate-400 font-medium">In-Store Accepted Payments:</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white">
                  ⚡ Bajaj Finance EMI
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white">
                  💳 Credit & Debit Cards
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white">
                  📱 UPI / QR Code
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white">
                  💵 Cash
                </span>
              </div>
            </div>

            {/* Google Maps Button */}
            <div className="pt-2">
              <a
                href={storeSettings.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-vivo-600 hover:bg-vivo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-glow-blue transition-all"
              >
                <MapPin className="w-4 h-4" />
                <span>Open in Google Maps / Navigation</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

        {/* Right Column: In-Store Services & Showroom Highlights */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-origin-violet" />
              <span>Why Visit Our Begampur Showroom?</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {inStoreServices.map((srv, idx) => {
                const IconComponent = srv.icon;
                return (
                  <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                    <div className="p-2 rounded-xl bg-vivo-500/10 text-vivo-400 border border-vivo-500/20 w-fit">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-white">{srv.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{srv.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/20 space-y-2 text-xs">
              <p className="font-bold text-amber-300 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4" /> Bajaj Finance EMI Document Checklist:
              </p>
              <ul className="text-slate-300 text-[11px] space-y-1 pl-4 list-disc">
                <li>Aadhaar Card (Original or DigiLocker)</li>
                <li>PAN Card</li>
                <li>Cancelled Cheque or Bank Passbook / Netbanking verification</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
