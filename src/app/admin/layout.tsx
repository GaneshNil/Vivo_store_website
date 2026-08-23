'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Smartphone, 
  Boxes, 
  Tag, 
  Image as ImageIcon, 
  Star, 
  Bell, 
  ShieldAlert, 
  Settings, 
  ExternalLink,
  Menu,
  X,
  Lock,
  ChevronRight,
  PlusCircle,
  Clock,
  LogOut
} from 'lucide-react';
import { useStore } from '@/lib/store/store-context';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { storeSettings, notifyRequests, products } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pendingNotifies = notifyRequests.filter(n => n.status === 'PENDING').length;
  const lowStockCount = products.flatMap(p => p.variants).filter(v => v.computed_status === 'LOW_STOCK').length;

  const adminNav = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Products & Variants', href: '/admin/products', icon: Smartphone },
    { label: 'Inventory & Stock', href: '/admin/inventory', icon: Boxes, badge: lowStockCount > 0 ? `${lowStockCount} Low` : null, badgeColor: 'bg-amber-500' },
    { label: 'Prices & Offers', href: '/admin/prices', icon: Tag },
    { label: 'Notify Me Requests', href: '/admin/notify-requests', icon: Bell, badge: pendingNotifies > 0 ? pendingNotifies : null, badgeColor: 'bg-cyan-500' },
    { label: 'Audit Logs', href: '/admin/audit-logs', icon: ShieldAlert },
    { label: 'Store Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex flex-col lg:flex-row">
      
      {/* Mobile Topbar */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-slate-950 border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-slate-900 border border-vivo-500/30">
            <Image src="/assets/store-logo/IMG-20260822-WA0004.jpg" alt="Logo" fill className="object-cover" />
          </div>
          <span className="font-bold text-sm text-white">Store Admin Portal</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-white/5 text-slate-300"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-950/90 backdrop-blur-xl border-r border-white/10 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 space-y-6">
          
          {/* Brand Header */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-900 border border-vivo-500/30 flex-shrink-0 shadow-glow-blue">
              <Image src="/assets/store-logo/IMG-20260822-WA0004.jpg" alt="Logo" fill className="object-cover" />
            </div>
            <div>
              <h2 className="font-display font-bold text-sm text-white leading-tight">GALAXY MOBILE</h2>
              <span className="text-[10px] text-vivo-400 font-semibold uppercase tracking-wider">Management System</span>
            </div>
          </div>

          {/* Quick Status Tag */}
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Store Live & Synced</span>
            </div>
            <span className="text-[10px] font-bold text-slate-400">Begampur</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {adminNav.map(item => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-vivo-600 text-white shadow-glow-blue'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] text-white font-bold ${item.badgeColor || 'bg-vivo-500'}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-vivo-400" />
              <span>Customer Website</span>
            </span>
            <ChevronRight className="w-3 h-3 text-slate-500" />
          </Link>

          <div className="px-3 py-2 text-[11px] text-slate-500">
            Logged in as: <strong className="text-slate-300">admin@galaxymobile.com</strong>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Admin Top Header Strip */}
        <header className="hidden lg:flex items-center justify-between h-16 px-8 bg-slate-950/60 border-b border-white/10 sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Admin Control Panel</span>
            <span>/</span>
            <span className="text-white font-medium capitalize">{pathname.replace('/admin', '').replace('/', '') || 'Dashboard'}</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Showroom: 10 AM – 9 PM</span>
            </div>

            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-vivo-600/20 text-vivo-300 hover:bg-vivo-600/30 border border-vivo-500/30 font-semibold"
            >
              <span>View Public Showroom</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}
