'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store/store-context';
import { formatPrice, getStatusBadgeConfig } from '@/lib/utils/formatters';
import { 
  Search, 
  X, 
  Smartphone, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  ChevronRight,
  MapPin,
  Tag,
  Headphones,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { products, series, categories, storeSettings } = useStore();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input automatically on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setSelectedCategory('all');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Global keyboard shortcut: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filtered matching items
  const searchResults = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    
    return products.filter(item => {
      if (!item.is_active) return false;

      // Filter by category chip if selected
      if (selectedCategory === 'vivo' && item.brand_id !== 'brand-vivo') return false;
      if (selectedCategory === 'phones' && !item.is_phone) return false;
      if (selectedCategory === 'accessories' && item.is_phone) return false;

      if (!cleanQuery) return true;

      const nameMatch = item.name.toLowerCase().includes(cleanQuery);
      const brandMatch = (item.brand?.name || '').toLowerCase().includes(cleanQuery);
      const seriesMatch = (item.series?.name || '').toLowerCase().includes(cleanQuery);
      const taglineMatch = (item.tagline || '').toLowerCase().includes(cleanQuery);
      const specsMatch = JSON.stringify(item.specifications || {}).toLowerCase().includes(cleanQuery);
      const variantMatch = item.variants.some(v => 
        v.color.toLowerCase().includes(cleanQuery) ||
        (v.ram && v.ram.toLowerCase().includes(cleanQuery)) ||
        (v.storage && v.storage.toLowerCase().includes(cleanQuery))
      );

      return nameMatch || brandMatch || seriesMatch || taglineMatch || specsMatch || variantMatch;
    }).slice(0, 8); // Top 8 most relevant results for speed
  }, [products, query, selectedCategory]);

  const handleSelectProduct = (slug: string) => {
    onClose();
    router.push(`/product/${slug}`);
  };

  const quickChips = [
    { label: 'All Vivo', value: 'vivo' },
    { label: 'Smartphones', value: 'phones' },
    { label: 'Vivo X Series', query: 'Vivo X' },
    { label: 'Vivo V Series', query: 'Vivo V' },
    { label: 'Vivo T 5G', query: 'Vivo T' },
    { label: 'Accessories', value: 'accessories' },
    { label: 'Chargers', query: 'Charger' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-4 sm:pt-16 px-3 sm:px-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[88vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Quick product search"
      >
        {/* Search Header Bar */}
        <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <div className="w-9 h-9 rounded-xl bg-vivo-50 text-vivo-600 flex items-center justify-center flex-shrink-0">
            <Search className="w-4 h-4" />
          </div>
          
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Vivo X100, V40, T3, chargers, specs..."
            className="flex-1 bg-transparent text-slate-900 text-sm sm:text-base font-medium placeholder:text-slate-400 focus:outline-none"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              title="Clear search"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex-shrink-0"
            aria-label="Close search"
          >
            Esc
          </button>
        </div>

        {/* Quick Filter Chips */}
        <div className="px-3.5 sm:px-4 py-2 border-b border-slate-100 bg-white flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex-shrink-0 mr-1">
            Quick:
          </span>
          {quickChips.map((chip, idx) => {
            const isActive = chip.value ? selectedCategory === chip.value : query === chip.query;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (chip.value) {
                    setSelectedCategory(selectedCategory === chip.value ? 'all' : chip.value);
                  } else if (chip.query) {
                    setQuery(chip.query);
                  }
                }}
                className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-vivo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        {/* Results List Area */}
        <div className="overflow-y-auto flex-1 divide-y divide-slate-100 max-h-[60vh]">
          {searchResults.length > 0 ? (
            <div className="p-2 space-y-1">
              <div className="px-2 py-1 flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <span>Matching Devices ({searchResults.length})</span>
                <span className="text-vivo-600">Begampur In-Store Stock</span>
              </div>

              {searchResults.map((product) => {
                const activeVar = product.variants[0];
                const primaryImage = product.images.find(img => img.is_primary)?.image_url || product.images[0]?.image_url || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80';
                const statusBadge = getStatusBadgeConfig(activeVar?.computed_status || 'IN_STOCK');

                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => handleSelectProduct(product.slug)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-3.5 group border border-transparent hover:border-slate-200"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-12 h-12 rounded-xl bg-slate-100 border border-slate-200/80 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <Image
                        src={primaryImage}
                        alt={product.name}
                        fill
                        className="object-contain p-0.5 group-hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold text-vivo-700 bg-vivo-50 px-1.5 py-0.2 rounded border border-vivo-200">
                          {product.brand?.name || 'VIVO'}
                        </span>
                        {product.series?.name && (
                          <span className="text-[10px] text-slate-500 font-medium">
                            {product.series.name}
                          </span>
                        )}
                        <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border}`}>
                          {statusBadge.label}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-vivo-600 transition-colors mt-0.5">
                        {product.name}
                      </h4>

                      {product.tagline && (
                        <p className="text-[11px] text-slate-500 truncate">
                          {product.tagline}
                        </p>
                      )}
                    </div>

                    {/* Price & Action */}
                    <div className="text-right flex-shrink-0 pl-2">
                      <div className="text-sm font-extrabold text-slate-900 font-display">
                        {formatPrice(activeVar?.selling_price || 0)}
                      </div>
                      {activeVar && activeVar.mrp > activeVar.selling_price && (
                        <div className="text-[11px] text-slate-400 line-through">
                          {formatPrice(activeVar.mrp)}
                        </div>
                      )}
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-vivo-600 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-1" />
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-8 sm:p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900">
                No matching devices found
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                We couldn&apos;t find any model matching &quot;{query}&quot;. Try searching for popular models like Vivo V40, X100, T3, or check our store catalog.
              </p>
              <div className="pt-2">
                <Link
                  href="/mobiles"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-vivo-600 text-white text-xs font-semibold hover:bg-vivo-700 transition-colors"
                >
                  <span>Browse Full Mobile Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Strip */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-vivo-600" />
            <span className="hidden sm:inline">Galaxy Mobile Gallery, Begampur</span>
            <span className="sm:hidden">Begampur Store</span>
          </div>

          <Link
            href="/mobiles"
            onClick={onClose}
            className="font-semibold text-vivo-600 hover:text-vivo-700 flex items-center gap-1"
          >
            <span>See All Phones & Filters</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
};
