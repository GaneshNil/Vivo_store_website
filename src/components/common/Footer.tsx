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
  ExternalLink,
  Lock
} from 'lucide-react';

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const { storeSettings } = useStore();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-sm mt-12">
      {/* Upper In-Store Highlight Strip */}
      <div className="border-b border-slate-200/80 py-8 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="p-2.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex-shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Bajaj Finance EMI Available</h4>
                <p className="text-xs text-slate-500 mt-0.5">Instant on-the-spot approval in store</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="p-2.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">100% Genuine Certified</h4>
                <p className="text-xs text-slate-500 mt-0.5">Official brand warranty on all smartphones.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Free Store Installation</h4>
                <p className="text-xs text-slate-500 mt-0.5">UV glass application and instant data transfer.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Open 7 Days a Week</h4>
                <p className="text-xs text-slate-500 mt-0.5">Showroom open 10:00 AM to 09:00 PM daily.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          
          {/* Col 1 & 2: Store Identity & Location */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-slate-200 bg-white p-1 flex-shrink-0 shadow-xs">
                <Image
                  src="/assets/store-logo/IMG-20260822-WA0004.jpg"
                  alt="Galaxy Mobile Gallery Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-slate-900 font-display font-bold text-base sm:text-lg tracking-tight">
                  GALAXY MOBILE GALLERY
                </h3>
                <p className="text-xs text-vivo-700 font-bold">VIVO Authorized Dealer & Multi-Brand Hub</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pr-2">
              Your premier showroom in Solapur district for flagship VIVO smartphones, multi-brand mobile devices, and genuine tested accessories. Experience all live demo units at our Begampur store.
            </p>

            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-start gap-2.5 text-slate-600">
                <MapPin className="w-4 h-4 text-vivo-600 flex-shrink-0 mt-0.5" />
                <span>{storeSettings.address}, {storeSettings.landmark}, {storeSettings.taluka}, {storeSettings.district}, {storeSettings.state} - {storeSettings.pincode}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-600">
                <Phone className="w-4 h-4 text-vivo-600 flex-shrink-0" />
                <a href={`tel:${storeSettings.phone}`} className="hover:text-vivo-600 font-medium transition-colors">
                  +91 {storeSettings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-600">
                <Mail className="w-4 h-4 text-vivo-600 flex-shrink-0" />
                <a href={`mailto:${storeSettings.email}`} className="hover:text-vivo-600 font-medium transition-colors">
                  {storeSettings.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Smart Phones & Vivo Series */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs tracking-wider uppercase font-display">Vivo Lineup</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/mobiles?series=x-series" className="hover:text-vivo-600 transition-colors">VIVO X Series (ZEISS)</Link></li>
              <li><Link href="/mobiles?series=v-series" className="hover:text-vivo-600 transition-colors">VIVO V Series (Aura Light)</Link></li>
              <li><Link href="/mobiles?series=t-series" className="hover:text-vivo-600 transition-colors">VIVO T Series (Turbo 5G)</Link></li>
              <li><Link href="/mobiles?series=y-series" className="hover:text-vivo-600 transition-colors">VIVO Y Series (Style & Battery)</Link></li>
              <li><Link href="/mobiles?brand=samsung" className="hover:text-vivo-600 transition-colors">Samsung Galaxy S & A Series</Link></li>
              <li><Link href="/mobiles?brand=oppo" className="hover:text-vivo-600 transition-colors">OPPO Reno & A Series</Link></li>
              <li><Link href="/mobiles?brand=realme" className="hover:text-vivo-600 transition-colors">Realme Pro Series</Link></li>
            </ul>
          </div>

          {/* Col 4: Store Accessories */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs tracking-wider uppercase font-display">Accessories</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/accessories?cat=chargers" className="hover:text-vivo-600 transition-colors">Flash & Fast Chargers</Link></li>
              <li><Link href="/accessories?cat=tempered-glass" className="hover:text-vivo-600 transition-colors">9H UV Curved Glass</Link></li>
              <li><Link href="/accessories?cat=tws-earphones" className="hover:text-vivo-600 transition-colors">TWS Earbuds & Audio</Link></li>
              <li><Link href="/accessories?cat=cases" className="hover:text-vivo-600 transition-colors">Armor & Silicone Covers</Link></li>
              <li><Link href="/accessories?cat=power-banks" className="hover:text-vivo-600 transition-colors">Fast Power Banks</Link></li>
              <li><Link href="/accessories?cat=cables" className="hover:text-vivo-600 transition-colors">Braided 6A Data Cables</Link></li>
              <li><Link href="/accessories?cat=smart-watches" className="hover:text-vivo-600 transition-colors">AMOLED Smart Watches</Link></li>
            </ul>
          </div>

          {/* Col 5: Physical Store Information */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs tracking-wider uppercase font-display">Store Visiting</h4>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/90 space-y-2 text-xs">
              <p className="text-slate-800 font-semibold">In-Store Purchase Notice:</p>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                We operate as a digital catalog showroom. Browse products online, then visit our Begampur store for live demo, finance approval & instant purchase.
              </p>
              <Link 
                href="/store"
                className="inline-flex items-center gap-1 text-vivo-600 hover:text-vivo-700 font-bold text-xs pt-1"
              >
                <span>Get Directions to Store</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <div className="pt-1">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors font-medium"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Staff Portal</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Legal Copyright */}
        <div className="border-t border-slate-200 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Galaxy Mobile Gallery. All Rights Reserved. Begampur, Solapur.
          </div>
          <div className="flex items-center gap-4 text-slate-600 font-medium">
            <span>Payment Accepted: Bajaj Finance EMI · Credit/Debit Cards · UPI · Cash</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
