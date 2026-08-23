'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Smartphone, 
  Boxes, 
  Tag, 
  Bell, 
  ShieldAlert, 
  Settings, 
  ExternalLink,
  Menu,
  X,
  Lock,
  ChevronRight,
  Clock,
  LogOut,
  UserCheck,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';
import { useStore } from '@/lib/store/store-context';

const ADMIN_ID = 'Admin@9067228008';
const ADMIN_PASS = 'Admin#9067228008';
const AUTH_STORAGE_KEY = 'galaxy_admin_authenticated';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { notifyRequests, products } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthLoaded, setIsAuthLoaded] = useState<boolean>(false);
  
  // Login Form State
  const [loginId, setLoginId] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedAuth === 'true') {
        setIsAuthenticated(true);
      }
    } catch {
      // Storage unavailable fallback
    } finally {
      setIsAuthLoaded(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    setTimeout(() => {
      if (loginId.trim() === ADMIN_ID && loginPass === ADMIN_PASS) {
        setIsAuthenticated(true);
        try {
          localStorage.setItem(AUTH_STORAGE_KEY, 'true');
        } catch {
          // Ignore
        }
      } else {
        setLoginError('Invalid Admin ID or Password. Access denied.');
      }
      setIsLoggingIn(false);
    }, 400);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // Ignore
    }
    setIsAuthenticated(false);
    setLoginPass('');
    setLoginError('');
  };

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

  // Prevent flash while checking localStorage
  if (!isAuthLoaded) {
    return (
      <div className="min-h-screen bg-[#060911] flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-vivo-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Securing Admin Portal...</span>
        </div>
      </div>
    );
  }

  // If Not Authenticated -> Show Login Portal
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#060911] relative flex items-center justify-center p-4">
        {/* Background glow accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-vivo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-origin-violet/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10 glass-card p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
          
          {/* Brand & Security Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 rounded-2xl overflow-hidden bg-slate-900 border border-vivo-500/30 p-1 relative shadow-glow-blue flex items-center justify-center">
              <Image 
                src="/assets/store-logo/IMG-20260822-WA0004.jpg" 
                alt="Logo" 
                width={56} 
                height={56} 
                className="rounded-xl object-cover" 
              />
            </div>
            <h1 className="text-xl font-extrabold text-white font-display pt-2">Admin Management Portal</h1>
            <p className="text-xs text-slate-400">Galaxy Mobile Gallery · Begampur Showroom Staff Only</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {loginError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">Admin ID</label>
              <div className="relative">
                <input
                  type="text"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="Enter Admin ID"
                  required
                  className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-vivo-500 transition-colors"
                />
                <UserCheck className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-500" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">Admin Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="Enter Password"
                  required
                  className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-vivo-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-vivo-600 to-vivo-500 hover:from-vivo-500 hover:to-vivo-400 text-white text-sm font-semibold shadow-glow-blue transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              {isLoggingIn ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Access Management Panel</span>
                </>
              )}
            </button>
          </form>

          {/* Return to Customer Showroom */}
          <div className="pt-2 text-center border-t border-white/5">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-vivo-400 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Return to Customer Showroom</span>
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // If Authenticated -> Render Full Admin Dashboard
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

          <div className="px-3 py-1.5 text-[11px] text-slate-500 flex items-center justify-between">
            <span className="truncate">Admin: <strong className="text-slate-300">{ADMIN_ID}</strong></span>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out of Admin</span>
          </button>
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

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-semibold transition-colors"
              title="Log Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
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
