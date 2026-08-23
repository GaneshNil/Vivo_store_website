'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStore } from '@/lib/store/store-context';
import { ProductCard } from '@/components/customer/ProductCard';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  Sparkles, 
  RotateCcw, 
  Check, 
  Layers, 
  Smartphone,
  ChevronDown
} from 'lucide-react';
import { ProductStatus } from '@/lib/types';

function MobilesContent() {
  const searchParams = useSearchParams();
  const initialBrand = searchParams.get('brand') || 'all';
  const initialSeries = searchParams.get('series') || 'all';

  const { products, brands, series } = useStore();

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);
  const [selectedSeries, setSelectedSeries] = useState<string>(initialSeries);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [selectedRam, setSelectedRam] = useState<string>('all');
  const [selectedStorage, setSelectedStorage] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [fiveGOnly, setFiveGOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  const phoneProducts = useMemo(() => {
    return products.filter(p => p.is_phone && p.is_active);
  }, [products]);

  // Dynamic filter options from data
  const availableBrands = useMemo(() => brands.filter(b => b.slug !== 'galaxy-store-genuine'), [brands]);
  const availableSeries = useMemo(() => {
    if (selectedBrand === 'all') return series;
    const b = brands.find(brand => brand.slug === selectedBrand);
    return b ? series.filter(s => s.brand_id === b.id) : series;
  }, [series, brands, selectedBrand]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return phoneProducts.filter(prod => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = prod.name.toLowerCase().includes(q);
        const matchesTagline = prod.tagline?.toLowerCase().includes(q);
        const matchesBrand = prod.brand?.name.toLowerCase().includes(q);
        const matchesSeries = prod.series?.name.toLowerCase().includes(q);
        const matchesSpecs = JSON.stringify(prod.specifications).toLowerCase().includes(q);
        const matchesVariant = prod.variants.some(v => 
          v.sku.toLowerCase().includes(q) || 
          v.color.toLowerCase().includes(q) ||
          v.ram?.toLowerCase().includes(q) ||
          v.storage?.toLowerCase().includes(q)
        );
        if (!matchesName && !matchesTagline && !matchesBrand && !matchesSeries && !matchesSpecs && !matchesVariant) {
          return false;
        }
      }

      // 2. Brand
      if (selectedBrand !== 'all') {
        if (prod.brand?.slug !== selectedBrand) return false;
      }

      // 3. Series
      if (selectedSeries !== 'all') {
        if (prod.series?.slug !== selectedSeries) return false;
      }

      // 4. Price Range (based on minimum variant price)
      const minPrice = Math.min(...prod.variants.map(v => v.selling_price));
      if (priceRange === 'under-15k' && minPrice >= 15000) return false;
      if (priceRange === '15k-25k' && (minPrice < 15000 || minPrice > 25000)) return false;
      if (priceRange === '25k-50k' && (minPrice < 25000 || minPrice > 50000)) return false;
      if (priceRange === 'above-50k' && minPrice < 50000) return false;

      // 5. RAM
      if (selectedRam !== 'all') {
        const hasRam = prod.variants.some(v => v.ram?.toUpperCase() === selectedRam.toUpperCase());
        if (!hasRam) return false;
      }

      // 6. Storage
      if (selectedStorage !== 'all') {
        const hasStorage = prod.variants.some(v => v.storage?.toUpperCase() === selectedStorage.toUpperCase());
        if (!hasStorage) return false;
      }

      // 7. Status
      if (selectedStatus !== 'all') {
        const hasStatus = prod.variants.some(v => v.computed_status === selectedStatus);
        if (!hasStatus) return false;
      }

      // 8. 5G Only
      if (fiveGOnly) {
        const is5G = prod.name.includes('5G') || prod.specifications.connectivity?.network?.includes('5G');
        if (!is5G) return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.variants[0]?.selling_price || 0;
      const priceB = b.variants[0]?.selling_price || 0;
      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      if (sortBy === 'discount') {
        const discA = a.variants[0]?.discount_percent || 0;
        const discB = b.variants[0]?.discount_percent || 0;
        return discB - discA;
      }
      return a.sort_order - b.sort_order;
    });
  }, [phoneProducts, searchQuery, selectedBrand, selectedSeries, priceRange, selectedRam, selectedStorage, selectedStatus, fiveGOnly, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedBrand('all');
    setSelectedSeries('all');
    setPriceRange('all');
    setSelectedRam('all');
    setSelectedStorage('all');
    setSelectedStatus('all');
    setFiveGOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters = selectedBrand !== 'all' || selectedSeries !== 'all' || priceRange !== 'all' || selectedRam !== 'all' || selectedStorage !== 'all' || selectedStatus !== 'all' || fiveGOnly || searchQuery.trim().length > 0;

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 bg-gradient-to-r from-vivo-950/40 via-slate-900 to-origin-surface/40 overflow-hidden">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-vivo-400 uppercase tracking-wider">
            <Smartphone className="w-3.5 h-3.5" />
            <span>DISCOVER SMARTPHONES</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Mobile Showroom & Specifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Compare camera optics, processors, battery and check live Begampur store availability for VIVO, Samsung, Oppo & Realme.
          </p>
        </div>
      </div>

      {/* Top Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Instant Search Box */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search vivo 5g, 256GB, X100, V40, Snapdragon..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-vivo-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & Mobile Filter Trigger */}
        <div className="flex items-center gap-3 justify-between md:justify-end">
          
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-medium"
          >
            <SlidersHorizontal className="w-4 h-4 text-vivo-400" />
            <span>Filters {hasActiveFilters && '(Active)'}</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-vivo-500"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="p-2 text-slate-400 hover:text-white text-xs flex items-center gap-1"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}

        </div>

      </div>

      {/* Main Layout: Filters Sidebar + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Filters Sidebar (and Mobile Modal) */}
        <aside className={`lg:col-span-3 space-y-6 ${mobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-6">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-vivo-400" />
                <span>Filter Specifications</span>
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-vivo-400 hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* 1. Brand Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Brand
              </label>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setSelectedBrand('all')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedBrand === 'all'
                      ? 'bg-vivo-500/20 text-vivo-300 font-bold'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>All Brands</span>
                  <span>{phoneProducts.length}</span>
                </button>
                {availableBrands.map(b => {
                  const count = phoneProducts.filter(p => p.brand_id === b.id).length;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => {
                        setSelectedBrand(b.slug);
                        setSelectedSeries('all');
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                        selectedBrand === b.slug
                          ? 'bg-vivo-500/20 text-vivo-300 font-bold'
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {b.name}
                        {b.is_primary && <span className="text-[9px] bg-vivo-500/30 text-vivo-300 px-1 rounded">Primary</span>}
                      </span>
                      <span>{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Series Filter */}
            {availableSeries.length > 0 && (
              <div className="space-y-2 pt-3 border-t border-white/5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Series
                </label>
                <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                  <button
                    type="button"
                    onClick={() => setSelectedSeries('all')}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedSeries === 'all' ? 'bg-vivo-500/20 text-vivo-300 font-bold' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    All Series
                  </button>
                  {availableSeries.map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedSeries(s.slug)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        selectedSeries === s.slug ? 'bg-vivo-500/20 text-vivo-300 font-bold' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Price Filter */}
            <div className="space-y-2 pt-3 border-t border-white/5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Budget / Price
              </label>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { label: 'All Budgets', value: 'all' },
                  { label: 'Under ₹15,000', value: 'under-15k' },
                  { label: '₹15,000 – ₹25,000', value: '15k-25k' },
                  { label: '₹25,000 – ₹50,000', value: '25k-50k' },
                  { label: '₹50,000+ (Flagships)', value: 'above-50k' },
                ].map(item => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setPriceRange(item.value)}
                    className={`text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                      priceRange === item.value
                        ? 'bg-amber-500/20 text-amber-300 font-bold'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. RAM & Storage */}
            <div className="space-y-2 pt-3 border-t border-white/5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                RAM Size
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['all', '6GB', '8GB', '12GB', '16GB'].map(ram => (
                  <button
                    key={ram}
                    type="button"
                    onClick={() => setSelectedRam(ram)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                      selectedRam === ram
                        ? 'bg-vivo-500/20 text-vivo-300 border-vivo-500/40'
                        : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/20'
                    }`}
                  >
                    {ram === 'all' ? 'Any' : ram}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. In-Store Stock Availability */}
            <div className="space-y-2 pt-3 border-t border-white/5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                In-Store Stock
              </label>
              <div className="space-y-1">
                {[
                  { label: 'All Statuses', value: 'all' },
                  { label: '🟢 In Stock at Store', value: 'IN_STOCK' },
                  { label: '🟡 Low Stock (Urgent)', value: 'LOW_STOCK' },
                  { label: '🔵 Coming Soon Shipments', value: 'COMING_SOON' },
                ].map(st => (
                  <button
                    key={st.value}
                    type="button"
                    onClick={() => setSelectedStatus(st.value)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                      selectedStatus === st.value
                        ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. 5G Toggle */}
            <div className="pt-3 border-t border-white/5">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={fiveGOnly}
                  onChange={(e) => setFiveGOnly(e.target.checked)}
                  className="rounded bg-slate-900 border-white/10 text-vivo-500 focus:ring-0 w-4 h-4"
                />
                <span className="text-xs text-white font-medium">5G High-Speed Only</span>
              </label>
            </div>

          </div>
        </aside>

        {/* Right Product Grid */}
        <div className="lg:col-span-9 space-y-6">
          
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Showing <strong className="text-white font-bold">{filteredProducts.length}</strong> smartphone models</span>
            {hasActiveFilters && (
              <span className="text-vivo-400">Filters applied</span>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center rounded-3xl glass-panel border border-white/10 space-y-4">
              <Smartphone className="w-12 h-12 text-slate-500 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">No Phones Found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Try adjusting your filter criteria or search keyword to find matching mobile models.
                </p>
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-vivo-600 text-white text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default function MobilesPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Smartphones Showroom...</div>}>
      <MobilesContent />
    </Suspense>
  );
}
