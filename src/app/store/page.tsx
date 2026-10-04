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
      <div className="relative rounded-3xl p-8 sm:p-12 bg-white border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-vivo-50/60 to-transparent pointer-events-none" />
        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vivo-50 border border-vivo-200 text-xs font-semibold text-vivo-700">
            <MapPin className="w-3.5 h-3.5 text-vivo-600" />
            <span>PHYSICAL STORE SHOWROOM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
            Visit Galaxy Mobile Gallery in Begampur
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            We are Solapur district&apos;s leading digital showroom for VIVO, Samsung, Oppo & Realme smartphones. Walk into our physical store for live device demonstrations, exclusive festive discounts, and instant <strong className="text-amber-800">Bajaj Finance EMI Available</strong>.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={`https://wa.me/91${storeSettings.whatsapp}?text=Hello%20Galaxy%20Mobile%20Gallery,%20I%20am%20coming%20to%20visit%20your%20store.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-2xs flex items-center gap-2"
            >
              <span>💬 WhatsApp Store Desk</span>
            </a>

            <a
              href={`tel:${storeSettings.phone}`}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs border border-slate-300 shadow-2xs transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-vivo-600" />
              <span>Call: +91 {storeSettings.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Address, Hours, Contact Card */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 flex-shrink-0 shadow-2xs">
                <Image src="/assets/store-logo/IMG-20260822-WA0004.jpg" alt="Logo" fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900">GALAXY MOBILE GALLERY</h3>
                <p className="text-xs text-vivo-600 font-bold">VIVO Authorized Dealer & Multi-Brand Hub</p>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-1 text-xs">
              <p className="text-vivo-600 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Full Store Address
              </p>
              <p className="text-sm font-bold text-slate-900 leading-relaxed pt-1">
                {storeSettings.address}
              </p>
              <p className="text-slate-600 font-medium">
                {storeSettings.landmark}, {storeSettings.taluka}, {storeSettings.district}, {storeSettings.state} – {storeSettings.pincode}
              </p>
            </div>

            {/* Timings */}
            <div className="space-y-1 text-xs border-t border-slate-100 pt-4">
              <p className="text-amber-800 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Operating Hours
              </p>
              <p className="text-sm font-bold text-slate-900 pt-1">
                {storeSettings.hours}
              </p>
              <p className="text-emerald-700 font-semibold">
                Open All 7 Days (Monday to Sunday)
              </p>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-xs">
              <div className="space-y-1">
                <p className="text-slate-500 font-medium">Direct Phone / WhatsApp</p>
                <p className="text-sm font-bold text-slate-900">+91 {storeSettings.phone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-slate-500 font-medium">Store Support Email</p>
                <p className="text-sm font-bold text-slate-900 truncate">{storeSettings.email}</p>
              </div>
            </div>

            {/* Payment Highlights */}
            <div className="space-y-2 border-t border-slate-100 pt-4 text-xs">
              <p className="text-slate-700 font-bold">In-Store Accepted Payments:</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 font-medium">
                  ⚡ Bajaj Finance EMI
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 font-medium">
                  💳 Credit & Debit Cards
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 font-medium">
                  📱 UPI / QR Code
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 font-medium">
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
                className="w-full py-3.5 px-4 rounded-2xl bg-vivo-600 hover:bg-vivo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-2xs transition-all"
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
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
            <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-vivo-600" />
              <span>Why Visit Our Begampur Showroom?</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {inStoreServices.map((srv, idx) => {
                const IconComponent = srv.icon;
                return (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                    <div className="p-2 rounded-xl bg-vivo-50 text-vivo-600 border border-vivo-200 w-fit">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900">{srv.title}</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{srv.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-xs">
              <p className="font-bold text-amber-900 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-amber-700" /> Bajaj Finance EMI Document Checklist:
              </p>
              <ul className="text-amber-800 text-[11px] space-y-1 pl-4 list-disc font-medium">
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
