'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/lib/store/store-context';
import { Offer, OfferType, OfferBadgeColor } from '@/lib/types';
import { formatDate } from '@/lib/utils/formatters';
import { fireConfetti } from '@/lib/utils/confetti';
import { compressImageForUpload } from '@/lib/utils/image-compression';
import {
  Sparkles,
  PlusCircle,
  Search,
  Filter,
  Edit3,
  Trash2,
  Copy,
  CheckCircle2,
  X,
  Tag,
  CreditCard,
  Gift,
  Zap,
  Layers,
  ArrowUp,
  ArrowDown,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Percent,
  Check,
  AlertCircle,
  Eye,
  Sliders,
  ChevronRight,
  Info,
  Upload,
  Loader2,
  ImageIcon
} from 'lucide-react';

const OFFER_TYPE_CONFIG: Record<OfferType, { label: string; icon: any; defaultBadge: string; color: OfferBadgeColor }> = {
  bajaj_emi: { label: 'Bajaj 0% EMI Scheme', icon: CreditCard, defaultBadge: '0% EMI SCHEME', color: 'amber' },
  bank_cashback: { label: 'Instant Bank Cashback', icon: Percent, defaultBadge: 'BANK OFFER', color: 'emerald' },
  bundle_combo: { label: 'Bundle Combo Deal', icon: Layers, defaultBadge: 'SUPER COMBO', color: 'purple' },
  exchange_bonus: { label: 'Exchange Bonus Scheme', icon: Zap, defaultBadge: 'EXCHANGE BONUS', color: 'cyan' },
  festive_launch: { label: 'Festive Launch Bonanza', icon: Sparkles, defaultBadge: 'LAUNCH SPECIAL', color: 'amber' },
  free_gift: { label: 'Free In-Store Gifts', icon: Gift, defaultBadge: 'FREE GIFT', color: 'rose' },
  warranty_care: { label: 'Screen & Warranty Care', icon: ShieldCheck, defaultBadge: 'STORE CARE', color: 'blue' },
  custom: { label: 'Custom Promotion', icon: Tag, defaultBadge: 'SPECIAL OFFER', color: 'amber' },
};

const BADGE_COLOR_CONFIG: Record<OfferBadgeColor, { bg: string; text: string; border: string; previewBadge: string }> = {
  amber: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30', previewBadge: 'bg-amber-500 text-slate-950' },
  emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30', previewBadge: 'bg-emerald-500 text-slate-950' },
  cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30', previewBadge: 'bg-cyan-500 text-slate-950' },
  purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30', previewBadge: 'bg-purple-500 text-white' },
  rose: { bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/30', previewBadge: 'bg-rose-500 text-white' },
  blue: { bg: 'bg-vivo-500/20', text: 'text-vivo-400', border: 'border-vivo-500/30', previewBadge: 'bg-vivo-600 text-white' },
};

const PRESET_BANNERS = [
  { label: 'Vivo Flagship Experience', url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Festival & Finance Bonanza', url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Smartphone Showcase', url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Original Accessories Showroom', url: '/assets/accessories/IMG-20260822-WA0006.jpg' },
  { label: 'Begampur Store Banner', url: '/assets/store-logo/IMG-20260822-WA0004.jpg' },
];

const PRESET_TEMPLATES = [
  {
    title: 'Bajaj Finance EMI Available Scheme',
    subtitle: 'Zero Down Payment, Instant Aadhaar Approval & No Hidden Processing Fees',
    badge_text: 'STORE EXCLUSIVE',
    badge_color: 'amber' as OfferBadgeColor,
    discount_text: 'Bajaj Finance EMI Available',
    offer_type: 'bajaj_emi' as OfferType,
    banner_url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    start_date: new Date().toISOString().split('T')[0],
    end_date: '2026-12-31',
    is_active: true,
    terms: 'Instant approval in 5 minutes with Aadhaar card & PAN. Available at Begampur showroom counter.',
    applicable_category: 'all_mobiles' as const,
    cta_text: 'Check EMI Eligibility',
    cta_link: '/store',
    highlights: ['0% Interest Scheme', 'Instant 5-Min Approval', 'Paperless KYC Available'],
  },
  {
    title: 'Instant Bank Cashback ₹5,000',
    subtitle: 'Flat Cashback on HDFC, ICICI & SBI Credit Cards on VIVO V40 & X100 Pro',
    badge_text: 'BANK CASHBACK',
    badge_color: 'emerald' as OfferBadgeColor,
    discount_text: 'Flat ₹5,000 Instant Cashback',
    offer_type: 'bank_cashback' as OfferType,
    banner_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    start_date: new Date().toISOString().split('T')[0],
    end_date: '2026-10-31',
    is_active: true,
    terms: 'Valid on major Credit Card Full Swipe & EMI transactions at Galaxy Mobile Gallery.',
    applicable_category: 'vivo_flagship' as const,
    cta_text: 'View Eligible Models',
    cta_link: '/mobiles?brand=vivo',
    highlights: ['Instant Card Swipe Cashback', 'Applicable with EMI', 'Major Banks Covered'],
  },
  {
    title: 'Old Smartphone Exchange Bonus',
    subtitle: 'Exchange any old working smartphone and get an Extra ₹4,000 Upgrade Value',
    badge_text: 'EXCHANGE BONUS',
    badge_color: 'cyan' as OfferBadgeColor,
    discount_text: 'Up to ₹4,000 Extra Exchange Bonus',
    offer_type: 'exchange_bonus' as OfferType,
    banner_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80',
    start_date: new Date().toISOString().split('T')[0],
    end_date: '2026-11-30',
    is_active: true,
    terms: 'Old device evaluated on-spot at showroom based on screen & battery condition.',
    applicable_category: 'all_mobiles' as const,
    cta_text: 'Evaluate Old Phone',
    cta_link: '/store',
    highlights: ['Instant Valuation On-Spot', 'Extra Bonus over Market Value', 'All Brands Accepted'],
  },
  {
    title: 'Complete Mobile Care Protection Pack',
    subtitle: 'Tempered Glass + Shockproof Case + Fast Cable at Special In-Store Bundle Price',
    badge_text: 'SUPER COMBO',
    badge_color: 'purple' as OfferBadgeColor,
    discount_text: 'Save Flat 40% on Combos',
    offer_type: 'bundle_combo' as OfferType,
    banner_url: '/assets/accessories/IMG-20260822-WA0006.jpg',
    start_date: new Date().toISOString().split('T')[0],
    end_date: '2026-12-31',
    is_active: true,
    terms: 'Available for any smartphone model purchased or brought in store.',
    applicable_category: 'accessories' as const,
    cta_text: 'Claim Combo in Store',
    cta_link: '/accessories',
    highlights: ['9H Hardness Glass', 'Military Grade Drop Case', '65W Fast Charging Cable'],
  }
];

export default function AdminOffersPage() {
  const { offers, addOffer, updateOffer, deleteOffer, toggleOfferStatus, reorderOffers, products } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOfferId, setEditingOfferId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Highlight Input helper
  const [currentHighlight, setCurrentHighlight] = useState('');

  // Device Banner Upload State
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [uploadBannerError, setUploadBannerError] = useState<string | null>(null);

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingBanner(true);
    setUploadBannerError(null);

    try {
      // Compress phone banner on client to max 1600px width (shrinks 12MB raw photo to ~180KB)
      const compressed = await compressImageForUpload(file, 1600, 0.84);

      try {
        const uploadFormData = new FormData();
        uploadFormData.append('file', compressed.file);
        uploadFormData.append('folder', 'banners');

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });

        if (res.ok) {
          const data = await res.json();
          if (data.url) {
            setFormData(prev => ({ ...prev, banner_url: data.url }));
            return;
          }
        }
      } catch {
        // Fallback to client data URL if upload API fails
      }

      if (compressed.dataUrl) {
        setFormData(prev => ({ ...prev, banner_url: compressed.dataUrl }));
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error uploading banner image';
      setUploadBannerError(message);
    } finally {
      setIsUploadingBanner(false);
      e.target.value = ''; // Reset input so subsequent mobile camera snaps work reliably
    }
  };

  // Form State
  const [formData, setFormData] = useState<{
    title: string;
    subtitle: string;
    badge_text: string;
    badge_color: OfferBadgeColor;
    discount_text: string;
    offer_type: OfferType;
    banner_url: string;
    start_date: string;
    end_date: string;
    is_always_active: boolean;
    is_active: boolean;
    terms: string;
    applicable_category: 'all' | 'vivo_flagship' | 'vivo_all' | 'all_mobiles' | 'accessories' | 'custom';
    applicable_product_names: string[];
    cta_text: string;
    cta_link: string;
    highlights: string[];
    sort_order: number;
  }>({
    title: '',
    subtitle: '',
    badge_text: 'STORE EXCLUSIVE',
    badge_color: 'amber',
    discount_text: 'Special In-Store Discount',
    offer_type: 'bajaj_emi',
    banner_url: PRESET_BANNERS[0].url,
    start_date: new Date().toISOString().split('T')[0],
    end_date: '2026-12-31',
    is_always_active: false,
    is_active: true,
    terms: 'Valid at Galaxy Mobile Gallery Begampur showroom.',
    applicable_category: 'all_mobiles',
    applicable_product_names: [],
    cta_text: 'Claim in Store',
    cta_link: '/store',
    highlights: ['Instant In-Store Verification', 'Official Manufacturer Warranty'],
    sort_order: 1,
  });

  // Filtered list
  const filteredOffers = offers.filter(off => {
    if (selectedStatus === 'active' && !off.is_active) return false;
    if (selectedStatus === 'inactive' && off.is_active) return false;
    if (selectedType !== 'all' && off.offer_type !== selectedType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = off.title.toLowerCase().includes(q);
      const matchSub = off.subtitle?.toLowerCase().includes(q) || false;
      const matchBadge = off.badge_text.toLowerCase().includes(q);
      const matchDisc = off.discount_text?.toLowerCase().includes(q) || false;
      return matchTitle || matchSub || matchBadge || matchDisc;
    }
    return true;
  });

  // KPIs
  const totalOffers = offers.length;
  const activeOffers = offers.filter(o => o.is_active).length;
  const emiOffers = offers.filter(o => o.offer_type === 'bajaj_emi' || o.title.toLowerCase().includes('emi')).length;
  const cashbackOffers = offers.filter(o => o.offer_type === 'bank_cashback' || o.offer_type === 'exchange_bonus').length;

  const handleOpenAdd = () => {
    setEditingOfferId(null);
    setFormData({
      title: '',
      subtitle: '',
      badge_text: 'STORE EXCLUSIVE',
      badge_color: 'amber',
      discount_text: 'Special In-Store Discount',
      offer_type: 'bajaj_emi',
      banner_url: PRESET_BANNERS[0].url,
      start_date: new Date().toISOString().split('T')[0],
      end_date: '2026-12-31',
      is_always_active: false,
      is_active: true,
      terms: 'Valid at Galaxy Mobile Gallery Begampur showroom.',
      applicable_category: 'all_mobiles',
      applicable_product_names: [],
      cta_text: 'Claim in Store',
      cta_link: '/store',
      highlights: ['Instant In-Store Verification', 'Official Warranty Protection'],
      sort_order: offers.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (offer: Offer) => {
    setEditingOfferId(offer.id);
    setFormData({
      title: offer.title,
      subtitle: offer.subtitle || '',
      badge_text: offer.badge_text,
      badge_color: offer.badge_color || 'amber',
      discount_text: offer.discount_text || '',
      offer_type: offer.offer_type || 'custom',
      banner_url: offer.banner_url || PRESET_BANNERS[0].url,
      start_date: offer.start_date ? offer.start_date.split('T')[0] : new Date().toISOString().split('T')[0],
      end_date: offer.end_date ? offer.end_date.split('T')[0] : '',
      is_always_active: !offer.end_date,
      is_active: offer.is_active,
      terms: offer.terms || '',
      applicable_category: offer.applicable_category || 'all',
      applicable_product_names: offer.applicable_product_names || [],
      cta_text: offer.cta_text || 'Claim in Store',
      cta_link: offer.cta_link || '/store',
      highlights: offer.highlights && offer.highlights.length > 0 ? offer.highlights : ['100% Genuine In-Store Scheme'],
      sort_order: offer.sort_order || 1,
    });
    setIsModalOpen(true);
  };

  const handleApplyPreset = (preset: typeof PRESET_TEMPLATES[0]) => {
    setEditingOfferId(null);
    setFormData({
      title: preset.title,
      subtitle: preset.subtitle,
      badge_text: preset.badge_text,
      badge_color: preset.badge_color,
      discount_text: preset.discount_text,
      offer_type: preset.offer_type,
      banner_url: preset.banner_url,
      start_date: preset.start_date,
      end_date: preset.end_date,
      is_always_active: false,
      is_active: preset.is_active,
      terms: preset.terms,
      applicable_category: preset.applicable_category,
      applicable_product_names: [],
      cta_text: preset.cta_text,
      cta_link: preset.cta_link,
      highlights: preset.highlights,
      sort_order: offers.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleDuplicate = (offer: Offer) => {
    const duplicated: Omit<Offer, 'id' | 'created_at'> = {
      ...offer,
      title: `${offer.title} (Copy)`,
      sort_order: offers.length + 1,
      is_active: false,
    };
    addOffer(duplicated);
    fireConfetti({ particleCount: 30, spread: 45, origin: { y: 0.7 } });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.badge_text.trim()) return;

    const payload = {
      title: formData.title.trim(),
      subtitle: formData.subtitle.trim(),
      badge_text: formData.badge_text.trim(),
      badge_color: formData.badge_color,
      discount_text: formData.discount_text.trim(),
      offer_type: formData.offer_type,
      banner_url: formData.banner_url.trim(),
      start_date: formData.start_date,
      end_date: formData.is_always_active ? undefined : formData.end_date || undefined,
      is_active: formData.is_active,
      terms: formData.terms.trim(),
      applicable_category: formData.applicable_category,
      applicable_product_names: formData.applicable_product_names,
      cta_text: formData.cta_text.trim() || 'Claim in Store',
      cta_link: formData.cta_link.trim() || '/store',
      highlights: formData.highlights.filter(h => h.trim().length > 0),
      sort_order: Number(formData.sort_order) || 1,
    };

    if (editingOfferId) {
      updateOffer(editingOfferId, payload);
    } else {
      addOffer(payload);
    }

    setIsModalOpen(false);
    fireConfetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
  };

  const handleAddHighlight = () => {
    if (currentHighlight.trim() && !formData.highlights.includes(currentHighlight.trim())) {
      setFormData(prev => ({
        ...prev,
        highlights: [...prev.highlights, currentHighlight.trim()]
      }));
      setCurrentHighlight('');
    }
  };

  const handleRemoveHighlight = (index: number) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const handleMoveOrder = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= offers.length) return;

    const list = [...offers];
    const temp = list[index];
    list[index] = list[newIndex];
    list[newIndex] = temp;

    reorderOffers(list);
  };

  const isExpired = (endDate?: string) => {
    if (!endDate) return false;
    return new Date(endDate).getTime() < new Date().getTime();
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header & Quick Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Store Promotions Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Store Offers & Special Schemes
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Create, customize, schedule, and showcase in-store discounts, 0% Bajaj EMI schemes, exchange bonuses & combo packs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-glow-gold transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Scheme</span>
          </button>
        </div>
      </div>

      {/* Quick 1-Click Preset Templates Bar */}
      <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>1-Click Popular Store Scheme Presets:</span>
          </h3>
          <span className="text-[11px] text-slate-500">Click any preset to prefill customizer</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_TEMPLATES.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/5 hover:border-amber-500/40 text-left transition-all group flex flex-col justify-between"
            >
              <div className="space-y-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  {preset.badge_text}
                </span>
                <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors pt-1">
                  {preset.title}
                </h4>
                <p className="text-[11px] text-emerald-400 font-semibold">{preset.discount_text}</p>
              </div>
              <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400">
                <span>Load Template</span>
                <ChevronRight className="w-3 h-3 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        {/* Total Schemes */}
        <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Schemes</span>
            <Tag className="w-4 h-4 text-vivo-400" />
          </div>
          <p className="text-2xl font-bold text-white font-display">{totalOffers}</p>
          <p className="text-[11px] text-slate-500">{activeOffers} Live on Showroom</p>
        </div>

        {/* Active Live */}
        <div className="p-5 rounded-2xl glass-panel border border-emerald-500/20 bg-emerald-500/[0.02] space-y-1.5">
          <div className="flex items-center justify-between text-xs text-emerald-400">
            <span>Live on Store</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold text-emerald-400 font-display">{activeOffers}</p>
          <p className="text-[11px] text-slate-400">Customer visible</p>
        </div>

        {/* 0% EMI Schemes */}
        <div className="p-5 rounded-2xl glass-panel border border-amber-500/20 bg-amber-500/[0.02] space-y-1.5">
          <div className="flex items-center justify-between text-xs text-amber-400">
            <span>0% EMI Schemes</span>
            <CreditCard className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold text-amber-400 font-display">{emiOffers}</p>
          <p className="text-[11px] text-slate-400">Bajaj & Finance deals</p>
        </div>

        {/* Cashbacks & Exchange */}
        <div className="p-5 rounded-2xl glass-panel border border-cyan-500/20 bg-cyan-500/[0.02] space-y-1.5">
          <div className="flex items-center justify-between text-xs text-cyan-400">
            <span>Cashback & Upgrades</span>
            <Zap className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold text-cyan-400 font-display">{cashbackOffers}</p>
          <p className="text-[11px] text-slate-400">Card & Exchange value</p>
        </div>

      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl glass-panel border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search scheme name, badge or discount..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          
          {/* Status filter */}
          <div className="flex items-center rounded-xl bg-slate-900 p-1 border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setSelectedStatus('all')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                selectedStatus === 'all' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({offers.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatus('active')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                selectedStatus === 'active' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              Active ({activeOffers})
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatus('inactive')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                selectedStatus === 'inactive' ? 'bg-slate-700/50 text-slate-300' : 'text-slate-400 hover:text-white'
              }`}
            >
              Inactive ({offers.length - activeOffers})
            </button>
          </div>

          {/* Type filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
          >
            <option value="all">All Scheme Types</option>
            <option value="bajaj_emi">Bajaj 0% EMI</option>
            <option value="bank_cashback">Instant Bank Cashback</option>
            <option value="exchange_bonus">Exchange Bonus</option>
            <option value="bundle_combo">Bundle Combos</option>
            <option value="festive_launch">Festive Launch</option>
            <option value="free_gift">Free Gifts</option>
            <option value="warranty_care">Warranty & Care</option>
            <option value="custom">Custom</option>
          </select>

        </div>
      </div>

      {/* Schemes Grid List */}
      {filteredOffers.length === 0 ? (
        <div className="p-12 text-center rounded-3xl glass-panel border border-white/10 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center mx-auto text-slate-500">
            <Tag className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">No Offers or Schemes Found</h3>
            <p className="text-xs text-slate-400">
              {searchQuery || selectedType !== 'all' || selectedStatus !== 'all'
                ? 'Try adjusting your search terms or filters.'
                : 'Get started by creating your first store scheme or loading a preset template above.'}
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400"
          >
            + Create New Scheme
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map((off, index) => {
            const badgeColor = off.badge_color || 'amber';
            const badgeStyle = BADGE_COLOR_CONFIG[badgeColor] || BADGE_COLOR_CONFIG.amber;
            const isSchemeExpired = isExpired(off.end_date);

            return (
              <div
                key={off.id}
                className={`rounded-3xl glass-card border overflow-hidden flex flex-col justify-between transition-all group ${
                  off.is_active ? 'border-white/10 hover:border-amber-500/40' : 'border-white/5 opacity-75 bg-slate-950/40'
                }`}
              >
                {/* Image Banner & Overlay Badges */}
                <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
                  {off.banner_url ? (
                    <Image
                      src={off.banner_url}
                      alt={off.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950 text-slate-600">
                      <Tag className="w-12 h-12" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold shadow-md ${badgeStyle.previewBadge}`}>
                      {off.badge_text}
                    </span>

                    {/* Active Status Switch */}
                    <button
                      type="button"
                      onClick={() => toggleOfferStatus(off.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 transition-all shadow-md backdrop-blur-md ${
                        off.is_active
                          ? 'bg-emerald-500/90 text-slate-950 hover:bg-emerald-400'
                          : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700'
                      }`}
                      title="Click to toggle live status on store"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${off.is_active ? 'bg-slate-950 animate-pulse' : 'bg-slate-500'}`} />
                      <span>{off.is_active ? 'LIVE ON STORE' : 'INACTIVE DRAFT'}</span>
                    </button>
                  </div>

                  {/* Bottom Image Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    {off.discount_text && (
                      <span className="px-2 py-0.5 rounded-lg text-xs font-black bg-emerald-500 text-slate-950 shadow-md">
                        {off.discount_text}
                      </span>
                    )}
                    {isSchemeExpired && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/80 text-white">
                        EXPIRED
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    
                    {/* Header & Title */}
                    <div>
                      <h3 className="font-display font-bold text-base text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                        {off.title}
                      </h3>
                      {off.subtitle && (
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mt-0.5">
                          {off.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Bullet Highlights */}
                    {off.highlights && off.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {off.highlights.slice(0, 3).map((hl, hIdx) => (
                          <span
                            key={hIdx}
                            className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] text-slate-300 flex items-center gap-1"
                          >
                            <Check className="w-2.5 h-2.5 text-emerald-400" />
                            <span>{hl}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Terms */}
                    {off.terms && (
                      <p className="text-[11px] text-slate-400 line-clamp-2 italic border-t border-white/5 pt-2">
                        Terms: {off.terms}
                      </p>
                    )}
                  </div>

                  {/* Footer Stats & Actions */}
                  <div className="space-y-3 pt-3 border-t border-white/5">
                    
                    {/* Validity and Priority */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>
                          {off.end_date ? `Valid till ${formatDate(off.end_date)}` : 'Ongoing (Always Active)'}
                        </span>
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        Priority #{off.sort_order || index + 1}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between gap-2">
                      
                      {/* Priority Sort Controls */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => handleMoveOrder(index, 'up')}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed border border-white/5"
                          title="Move priority up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={index === offers.length - 1}
                          onClick={() => handleMoveOrder(index, 'down')}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed border border-white/5"
                          title="Move priority down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Edit, Duplicate, Delete */}
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleDuplicate(off)}
                          className="p-1.5 px-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 border border-white/5"
                          title="Duplicate this scheme"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline text-[11px]">Copy</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenEdit(off)}
                          className="p-1.5 px-2.5 rounded-lg bg-vivo-600/80 hover:bg-vivo-600 text-white text-xs font-semibold flex items-center gap-1 shadow"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span className="text-[11px]">Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(off.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20"
                          title="Delete scheme"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Creation & Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-5xl bg-[#090d16] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95">
            
            {/* Sticky Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-slate-900/90 backdrop-blur-md flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white font-display">
                    {editingOfferId ? 'Edit Store Offer / Special Scheme' : 'Create New Store Offer & Scheme'}
                  </h2>
                  <p className="text-xs text-slate-400">
                    Customize promotional details, discounts, device banner graphics, highlights, and in-store claim guidelines.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Close</span>
                </button>
              </div>
            </div>

            {/* Modal Body: Form & Real-time Live Preview */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto flex flex-col justify-between">
              
              <div className="p-4 sm:p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Side: Form Controls (7 cols) */}
                  <div className="lg:col-span-7 space-y-5 text-xs">
                    
                    {/* Scheme Category & Active Status */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1.5">
                        <label className="text-slate-300 font-semibold">Scheme Category *</label>
                        <select
                          value={formData.offer_type}
                          onChange={(e) => {
                            const val = e.target.value as OfferType;
                            const cfg = OFFER_TYPE_CONFIG[val];
                            setFormData({
                              ...formData,
                              offer_type: val,
                              badge_text: formData.badge_text === 'STORE EXCLUSIVE' ? cfg.defaultBadge : formData.badge_text,
                              badge_color: cfg.color
                            });
                          }}
                          className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-medium focus:border-amber-400 focus:outline-none"
                        >
                          <option value="bajaj_emi">Bajaj 0% EMI Scheme</option>
                          <option value="bank_cashback">Instant Bank Cashback</option>
                          <option value="exchange_bonus">Old Phone Exchange Bonus</option>
                          <option value="bundle_combo">Bundle Combo Deal</option>
                          <option value="festive_launch">Festive Launch Bonanza</option>
                          <option value="free_gift">Free In-Store Gifts</option>
                          <option value="warranty_care">Screen & Warranty Protection</option>
                          <option value="custom">Custom Promotion</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-slate-300 font-semibold">Live Store Visibility</label>
                        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-white/10">
                          <span className="text-slate-300 text-xs font-semibold">
                            {formData.is_active ? 'Visible on Storefront' : 'Hidden (Draft)'}
                          </span>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              formData.is_active ? 'bg-emerald-500 text-slate-950 shadow-glow-emerald' : 'bg-slate-700 text-slate-300'
                            }`}
                          >
                            {formData.is_active ? 'Active' : 'Draft'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Title & Discount Headline */}
                    <div className="space-y-3.5">
                      <div className="space-y-1.5">
                        <label className="text-slate-300 font-semibold">Scheme Title *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Bajaj Finance EMI Available Scheme"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-bold focus:border-amber-400 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="space-y-1.5">
                          <label className="text-slate-300 font-semibold">Discount / Highlight Headline *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Bajaj Finance EMI Available or Save Flat 40%"
                            value={formData.discount_text}
                            onChange={(e) => setFormData({ ...formData, discount_text: e.target.value })}
                            className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-emerald-400 font-bold focus:border-amber-400 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-slate-300 font-semibold">Badge Pill Text *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. STORE EXCLUSIVE, 0% EMI"
                            value={formData.badge_text}
                            onChange={(e) => setFormData({ ...formData, badge_text: e.target.value })}
                            className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-bold focus:border-amber-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Badge Color Picker */}
                      <div className="space-y-1.5">
                        <label className="text-slate-300 font-semibold">Badge Color Theme</label>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {(['amber', 'emerald', 'cyan', 'purple', 'rose', 'blue'] as OfferBadgeColor[]).map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => setFormData({ ...formData, badge_color: c })}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-all border ${
                                formData.badge_color === c
                                  ? 'border-white text-white bg-white/10 shadow-glow-blue'
                                  : 'border-white/10 text-slate-400 hover:text-white bg-slate-900'
                              }`}
                            >
                              <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${BADGE_COLOR_CONFIG[c].previewBadge}`} />
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Subtitle / Description */}
                      <div className="space-y-1.5">
                        <label className="text-slate-300 font-semibold">Subtitle & Scheme Summary</label>
                        <textarea
                          rows={2}
                          placeholder="e.g. Easy Monthly Installments, Instant Document Approval & Zero Processing Fees at Begampur Showroom"
                          value={formData.subtitle}
                          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                          className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Banner Graphic Selector: Upload from Device + URL + Presets */}
                    <div className="space-y-2.5 p-4 rounded-2xl bg-slate-900/60 border border-white/10">
                      <div className="flex items-center justify-between">
                        <label className="text-slate-200 font-bold flex items-center gap-1.5">
                          <ImageIcon className="w-4 h-4 text-vivo-400" />
                          <span>Scheme Banner Graphic *</span>
                        </label>
                        {uploadBannerError && (
                          <span className="text-[10px] text-rose-400 font-medium">{uploadBannerError}</span>
                        )}
                      </div>

                      {/* Upload Button + URL Bar */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                        <label className={`cursor-pointer px-4 py-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all shadow-sm flex-shrink-0 ${
                          isUploadingBanner
                            ? 'bg-slate-800 text-slate-400 border-white/10'
                            : 'bg-gradient-to-r from-vivo-600 to-vivo-500 hover:from-vivo-500 text-white border-vivo-400/40 shadow-glow-blue hover:scale-[1.02]'
                        }`}>
                          {isUploadingBanner ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-white" />
                              <span>Uploading...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4" />
                              <span>Upload from Device</span>
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*,image/jpeg,image/png,image/webp,image/svg+xml,image/heic,image/heif,.heic,.heif"
                            disabled={isUploadingBanner}
                            onChange={handleBannerUpload}
                            className="hidden"
                          />
                        </label>

                        <div className="relative flex-1">
                          <input
                            type="text"
                            required
                            placeholder="Or paste banner image URL (https://... or /assets/...)"
                            value={formData.banner_url}
                            onChange={(e) => setFormData({ ...formData, banner_url: e.target.value })}
                            className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-mono text-[11px] focus:border-amber-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Presets */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[10px] text-slate-500">Pick Preset:</span>
                        {PRESET_BANNERS.map((pb, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setFormData({ ...formData, banner_url: pb.url })}
                            className={`px-2 py-0.5 rounded text-[10px] border transition-all ${
                              formData.banner_url === pb.url
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                                : 'bg-white/5 text-slate-400 border-white/5 hover:text-white'
                            }`}
                          >
                            {pb.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bullet Highlights Builder */}
                    <div className="space-y-2">
                      <label className="text-slate-300 font-semibold">Key Highlights & USPs (Bullet Badges)</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="e.g. 0% Down Payment, Free Screen Guard, Instant Approval"
                          value={currentHighlight}
                          onChange={(e) => setCurrentHighlight(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddHighlight();
                            }
                          }}
                          className="flex-1 p-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-amber-400 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleAddHighlight}
                          className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold"
                        >
                          + Add Tag
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {formData.highlights.map((hl, hIdx) => (
                          <span
                            key={hIdx}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-white/10 text-xs flex items-center gap-1.5"
                          >
                            <span>{hl}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveHighlight(hIdx)}
                              className="text-slate-400 hover:text-red-400"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Validity Dates */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-slate-300 font-semibold">Validity Date Range</label>
                        <label className="flex items-center gap-1.5 text-xs text-amber-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.is_always_active}
                            onChange={(e) => setFormData({ ...formData, is_always_active: e.target.checked })}
                            className="rounded bg-slate-900 border-white/20 text-amber-500 focus:ring-0"
                          />
                          <span>Always Active / Ongoing Scheme</span>
                        </label>
                      </div>

                      {!formData.is_always_active && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <span className="text-[11px] text-slate-400">Start Date</span>
                            <input
                              type="date"
                              value={formData.start_date}
                              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                              className="w-full p-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[11px] text-slate-400">End Date (Expiry)</span>
                            <input
                              type="date"
                              value={formData.end_date}
                              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                              className="w-full p-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Terms & Conditions */}
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-semibold">Terms & Conditions / In-Store Guidelines</label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Instant document approval with Aadhaar / PAN card. Physical purchase at Begampur showroom."
                        value={formData.terms}
                        onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    {/* CTA Text & Destination Link */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-slate-300 font-semibold">CTA Button Label</label>
                        <input
                          type="text"
                          placeholder="e.g. Claim in Store, Check Eligibility"
                          value={formData.cta_text}
                          onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                          className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-medium focus:border-amber-400 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-slate-300 font-semibold">CTA Destination Link</label>
                        <input
                          type="text"
                          placeholder="e.g. /store, /mobiles, /product/vivo-v40-pro-5g"
                          value={formData.cta_link}
                          onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
                          className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-mono text-[11px] focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Right Side: Live Realtime Preview Card (5 cols) */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Live Customer View Preview</span>
                      </span>
                      <span className="text-[10px] text-emerald-400 font-semibold">Dynamic Render</span>
                    </div>

                    {/* Live Rendered Card */}
                    <div className="rounded-3xl glass-card border border-white/20 overflow-hidden shadow-2xl bg-slate-950/80">
                      
                      {/* Banner Image */}
                      <div className="relative aspect-[16/9] w-full bg-slate-900">
                        {formData.banner_url && (
                          <Image
                            src={formData.banner_url}
                            alt={formData.title || 'Offer'}
                            fill
                            className="object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                        
                        <div className="absolute top-3 left-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold shadow-lg ${BADGE_COLOR_CONFIG[formData.badge_color].previewBadge}`}>
                            {formData.badge_text || 'BADGE TEXT'}
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3">
                          <span className="px-2 py-0.5 rounded-lg text-xs font-black bg-emerald-500 text-slate-950 shadow-md">
                            {formData.discount_text || 'Discount Text'}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5 space-y-3">
                        <div>
                          <h4 className="font-display font-bold text-base text-white">
                            {formData.title || 'Scheme Title Preview'}
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed mt-1">
                            {formData.subtitle || 'Scheme subtitle and benefit description will appear here.'}
                          </p>
                        </div>

                        {/* Highlights */}
                        {formData.highlights.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {formData.highlights.map((h, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-slate-300 flex items-center gap-1 border border-white/5">
                                <Check className="w-2.5 h-2.5 text-emerald-400" />
                                <span>{h}</span>
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Terms */}
                        {formData.terms && (
                          <p className="text-[10px] text-slate-400 italic pt-1 border-t border-white/5">
                            Terms: {formData.terms}
                          </p>
                        )}

                        {/* CTA & Validity */}
                        <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                          <span className="text-[10px] text-slate-400">
                            {formData.is_always_active ? 'Ongoing Scheme' : `Valid till ${formData.end_date || 'N/A'}`}
                          </span>

                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-vivo-600 text-white text-xs font-semibold shadow">
                            <span>{formData.cta_text || 'Claim in Store'}</span>
                            <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* Information Tip */}
                    <div className="p-3.5 rounded-2xl bg-vivo-950/30 border border-vivo-500/20 text-vivo-300 text-[11px] flex items-start gap-2">
                      <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-vivo-400" />
                      <span>
                        This scheme will immediately synchronize with the store's public <strong className="text-white">/offers</strong> page, homepage promotion banners, and in-store catalog.
                      </span>
                    </div>

                  </div>

                </div>
              </div>

              {/* Sticky Form Actions Footer */}
              <div className="p-4 px-6 border-t border-white/10 bg-slate-900/95 backdrop-blur-md flex items-center justify-end gap-3 flex-shrink-0 sticky bottom-0 z-10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Cancel & Close
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs shadow-glow-gold transition-all"
                >
                  {editingOfferId ? 'Save & Update Scheme' : 'Publish Store Scheme'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-red-500/30 rounded-3xl p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">Delete Store Scheme?</h3>
              <p className="text-xs text-slate-400 mt-1">
                Are you sure you want to remove this promotional scheme from the store catalog? This action will also be recorded in the audit log.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteOffer(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
