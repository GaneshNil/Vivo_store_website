'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store/store-context';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  Sparkles,
  ExternalLink,
  Lock
} from 'lucide-react';

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const { storeSettings, brands } = useStore();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-[#05080F] border-t border-white/10 text-slate-400 text-sm mt-20">
      {/* Upper In-Store Highlight Strip */}
      <div className="border-b border-white/5 py-8 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="flex items-start gap-4 p-4 rounded-xl glass-card">
              <div className="p-2.5 rounded-lg bg-vivo-500/10 text-vivo-400 border border-vivo-500/20">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-base">Bajaj Finance 0% EMI</h4>
                <p className="text-xs text-slate-400 mt-1">Instant approval at store with minimal paperwork & zero down payment schemes.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl glass-card">
              <div className="p-2.5 rounded-lg bg-origin-violet/10 text-origin-violet border border-origin-violet/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-base">100% Genuine Certified</h4>
                <p className="text-xs text-slate-400 mt-1">Official brand warranty on all Vivo, Samsung, Oppo & Realme smartphones.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl glass-card">
              <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-base">Free Store Installation</h4>
                <p className="text-xs text-slate-400 mt-1">Expert UV curved glass application and instant old-to-new mobile data transfer.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl glass-card">
              <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-base">Open 7 Days a Week</h4>
                <p className="text-xs text-slate-400 mt-1">Visit our showroom 10:00 AM to 09:00 PM for live device demos and best offers.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Store Identity & Location */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-vivo-500/30 bg-slate-900 shadow-glow-blue flex-shrink-0">
                <Image
                  src="/assets/store-logo/IMG-20260822-WA0004.jpg"
                  alt="Galaxy Mobile Gallery Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-white font-display font-bold text-lg tracking-tight">
                  GALAXY MOBILE GALLERY
                </h3>
                <p className="text-xs text-vivo-400 font-medium">VIVO Authorized Dealer & Multi-Brand Mobile Hub</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              Your premier destination in Solapur district for flagship VIVO smartphones, multi-brand mobile devices, and genuine tested accessories. Experience all live demo units at our Begampur store.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-vivo-400 flex-shrink-0 mt-0.5" />
                <span>{storeSettings.address}, {storeSettings.landmark}, {storeSettings.taluka}, {storeSettings.district}, {storeSettings.state} - {storeSettings.pincode}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-vivo-400 flex-shrink-0" />
                <a href={`tel:${storeSettings.phone}`} className="hover:text-white transition-colors">
                  +91 {storeSettings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-vivo-400 flex-shrink-0" />
                <a href={`mailto:${storeSettings.email}`} className="hover:text-white transition-colors">
                  {storeSettings.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Smart Phones & Vivo Series */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase font-display">Vivo Lineup</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/mobiles?series=x-series" className="hover:text-vivo-400 transition-colors">VIVO X Series (ZEISS)</Link></li>
              <li><Link href="/mobiles?series=v-series" className="hover:text-vivo-400 transition-colors">VIVO V Series (Aura Light)</Link></li>
              <li><Link href="/mobiles?series=t-series" className="hover:text-vivo-400 transition-colors">VIVO T Series (Turbo 5G)</Link></li>
              <li><Link href="/mobiles?series=y-series" className="hover:text-vivo-400 transition-colors">VIVO Y Series (Style & Battery)</Link></li>
              <li><Link href="/mobiles?brand=samsung" className="hover:text-vivo-400 transition-colors">Samsung Galaxy S & A Series</Link></li>
              <li><Link href="/mobiles?brand=oppo" className="hover:text-vivo-400 transition-colors">OPPO Reno & A Series</Link></li>
              <li><Link href="/mobiles?brand=realme" className="hover:text-vivo-400 transition-colors">Realme Pro Series</Link></li>
            </ul>
          </div>

          {/* Col 4: Store Accessories */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase font-display">Accessories</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/accessories?cat=chargers" className="hover:text-vivo-400 transition-colors">Flash & Fast Chargers</Link></li>
              <li><Link href="/accessories?cat=tempered-glass" className="hover:text-vivo-400 transition-colors">9H UV Curved Glass</Link></li>
              <li><Link href="/accessories?cat=tws-earphones" className="hover:text-vivo-400 transition-colors">TWS Earbuds & Audio</Link></li>
              <li><Link href="/accessories?cat=cases" className="hover:text-vivo-400 transition-colors">Armor & Silicone Covers</Link></li>
              <li><Link href="/accessories?cat=power-banks" className="hover:text-vivo-400 transition-colors">Fast Power Banks</Link></li>
              <li><Link href="/accessories?cat=cables" className="hover:text-vivo-400 transition-colors">Braided 6A Data Cables</Link></li>
              <li><Link href="/accessories?cat=smart-watches" className="hover:text-vivo-400 transition-colors">AMOLED Smart Watches</Link></li>
            </ul>
          </div>

          {/* Col 5: Physical Store Information */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase font-display">Store Visiting</h4>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-2 text-xs">
              <p className="text-slate-300 font-medium">In-Store Purchase Notice:</p>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                We operate as a digital showroom. Browse products online, then visit our physical store for live demo, finance approval & instant purchase.
              </p>
              <Link 
                href="/store"
                className="inline-flex items-center gap-1 text-vivo-400 hover:text-vivo-300 font-semibold text-xs pt-1"
              >
                <span>Get Directions to Store</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <div className="pt-2">
              <Link
                href="/admin"
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Management System</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Legal Copyright */}
        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Galaxy Mobile Gallery. All Rights Reserved. Begampur, Solapur.
          </div>
          <div className="flex items-center gap-4">
            <span>Payment Accepted: Bajaj Finance EMI · Credit/Debit Cards · UPI · Cash</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
