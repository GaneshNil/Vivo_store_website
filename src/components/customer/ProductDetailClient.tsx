'use client';

import React, { useState, useMemo } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/lib/store/store-context';
import { formatPrice, getStatusBadgeConfig, calculateEMI } from '@/lib/utils/formatters';
import { ProductCard } from '@/components/customer/ProductCard';
import { 
  MapPin, 
  Phone, 
  MessageSquare, 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Heart, 
  CheckCircle2, 
  Bell, 
  Share2, 
  Clock, 
  Sparkles,
  ChevronRight,
  Camera,
  Cpu,
  Battery,
  X,
  ChevronLeft,
  Maximize2,
  ZoomIn,
  Image as ImageIcon,
  Smartphone,
  Sliders,
  Check
} from 'lucide-react';
import { fireConfetti } from '@/lib/utils/confetti';

export function ProductDetailClient() {
  const { slug } = useParams();
  const { products, storeSettings, addToCompare, compareList, toggleWishlist, isInWishlist, submitNotifyRequest, isLoaded } = useStore();

  const rawSlug = Array.isArray(slug) ? slug[0] : (slug ? String(slug) : '');
  const decodedSlug = decodeURIComponent(rawSlug).toLowerCase().trim();

  const product = useMemo(() => {
    return products.find(p => {
      if (!p) return false;
      const pSlug = (p.slug || '').toLowerCase().trim();
      const pId = (p.id || '').toLowerCase().trim();
      const pName = (p.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').trim();
      return pSlug === decodedSlug ||
             pId === decodedSlug ||
             pSlug === rawSlug.toLowerCase().trim() ||
             pId === rawSlug.toLowerCase().trim() ||
             pName === decodedSlug ||
             p.slug === rawSlug;
    });
  }, [products, rawSlug, decodedSlug]);

  // Active Variant State
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const activeVariant = product?.variants[selectedVariantIndex] || product?.variants[0];

  // Active Image State & Interactive Zoom
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomCoords, setZoomCoords] = useState({ x: 50, y: 50 });
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeImage = product?.images[activeImageIndex]?.image_url || product?.images[0]?.image_url || '';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setZoomCoords({ x, y });
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!product) return;
    setActiveImageIndex(prev => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!product) return;
    setActiveImageIndex(prev => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  // Active Specs Tab
  const [activeSpecTab, setActiveSpecTab] = useState<'all' | 'display' | 'camera' | 'performance' | 'battery'>('all');

  // Modals
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);
  const [notifyName, setNotifyName] = useState('');
  const [notifyPhone, setNotifyPhone] = useState('');
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notifySubmitted, setNotifySubmitted] = useState(false);

  const statusConfig = getStatusBadgeConfig(activeVariant?.computed_status || 'IN_STOCK');
  const isCompared = product ? compareList.some(p => p.id === product.id) : false;
  const isWishlisted = product ? isInWishlist(product.id) : false;
  
  const interestRate = product?.bajaj_emi_interest_rate ?? 0;
  const tenureMonths = product?.bajaj_emi_tenure_months || 6;
  const emiAmount = activeVariant ? calculateEMI(activeVariant.selling_price, tenureMonths, interestRate) : 0;

  if (!isLoaded) {
    return (
      <div className="py-24 max-w-5xl mx-auto px-4 space-y-8 animate-pulse">
        <div className="h-8 bg-slate-200 rounded-2xl w-48 mx-auto" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 h-96 bg-slate-100 rounded-3xl border border-slate-200" />
          <div className="lg:col-span-6 space-y-4">
            <div className="h-10 bg-slate-200 rounded-xl w-3/4" />
            <div className="h-6 bg-slate-100 rounded-lg w-1/2" />
            <div className="h-24 bg-slate-100 rounded-2xl border border-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-24 max-w-4xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 font-display">Product Not Found</h2>
        <p className="text-sm text-slate-600">The mobile phone or accessory model you are looking for does not exist or has been discontinued.</p>
        <Link href="/mobiles" className="inline-block px-5 py-2.5 rounded-xl bg-vivo-600 hover:bg-vivo-700 text-white text-xs font-semibold shadow-2xs transition-all">
          Browse Smartphone Catalog
        </Link>
      </div>
    );
  }

  // Recommended Compatible Accessories
  const compatibleAccessories = useMemo(() => {
    return products
      .filter(p => !p.is_phone && p.is_active)
      .slice(0, 4);
  }, [products]);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyPhone.trim() || !notifyName.trim()) return;

    submitNotifyRequest({
      product_id: product.id,
      product_name: `${product.name} (${activeVariant?.ram || ''} ${activeVariant?.storage || ''} ${activeVariant?.color || ''})`,
      variant_id: activeVariant?.id,
      variant_label: `${activeVariant?.ram || ''} ${activeVariant?.storage || ''} ${activeVariant?.color || ''}`.trim(),
      customer_name: notifyName,
      customer_phone: notifyPhone,
      customer_email: notifyEmail || undefined,
    });

    setNotifySubmitted(true);
    fireConfetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Galaxy Mobile Gallery, I am inquiring about the ${product.name} (${activeVariant?.ram || ''} ${activeVariant?.storage || ''} in ${activeVariant?.color || ''}) priced at ${formatPrice(activeVariant?.selling_price || 0)}. Is it currently available for in-store pickup at your Begampur shop?`
  );

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-vivo-600 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link href={product.is_phone ? '/mobiles' : '/accessories'} className="hover:text-vivo-600 transition-colors">
          {product.is_phone ? 'Mobiles' : 'Accessories'}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-semibold truncate">{product.name}</span>
      </nav>

      {/* Main Product Showcase: Gallery + Variant & In-Store Purchase Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Multi-Angle Gallery */}
        <div className="lg:col-span-6 space-y-4">
          
          <div className="flex flex-col-reverse md:flex-row gap-4 items-start">
            
            {/* Multi-Angle Thumbnails Strip */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto max-h-[480px] w-full md:w-24 flex-shrink-0 pb-2 md:pb-0 scrollbar-thin">
                {product.images.map((img, idx) => {
                  const isActive = idx === activeImageIndex;
                  const viewLabel = img.view_type 
                    ? img.view_type.toUpperCase() 
                    : idx === 0 ? 'FRONT' : idx === 1 ? 'BACK' : idx === 2 ? 'SIDE' : `VIEW ${idx + 1}`;

                  return (
                    <button
                      key={img.id || idx}
                      type="button"
                      onMouseEnter={() => setActiveImageIndex(idx)}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white overflow-hidden border-2 flex-shrink-0 transition-all text-left group p-1 flex flex-col items-center justify-center shadow-2xs ${
                        isActive
                          ? 'border-vivo-600 ring-2 ring-vivo-200 scale-105 bg-slate-50'
                          : 'border-slate-200 hover:border-vivo-400 hover:bg-slate-50 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={img.image_url}
                          alt={img.alt_text || `${product.name} ${viewLabel}`}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <span className="absolute bottom-0.5 inset-x-0 bg-slate-900/80 text-white text-[8px] font-bold text-center tracking-tighter py-0.5 rounded-b-xl">
                        {viewLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Main Stage Image with Interactive Magnifier */}
            <div className="flex-1 w-full space-y-2">
              <div 
                className="relative aspect-square w-full rounded-3xl bg-white border border-slate-200/90 flex items-center justify-center p-6 overflow-hidden shadow-2xs cursor-crosshair group select-none"
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
                onClick={() => setLightboxOpen(true)}
              >
                <div className="absolute inset-0 bg-radial-gradient from-vivo-50/40 via-transparent to-transparent pointer-events-none" />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4 z-20 pointer-events-none">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                    <span className={`w-2 h-2 rounded-full ${statusConfig.dot} ${statusConfig.animate ? 'pulse-badge-dot' : ''}`} />
                    {statusConfig.label}
                  </span>
                </div>

                {/* Discount Callout */}
                {activeVariant && activeVariant.discount_percent > 0 && (
                  <div className="absolute top-4 right-4 z-20 pointer-events-none">
                    <span className="px-3 py-1 rounded-xl text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300 shadow-2xs">
                      SAVE {Math.round(activeVariant.discount_percent)}% OFF
                    </span>
                  </div>
                )}

                {/* Prev / Next Arrows for Quick Angle Browsing */}
                {product.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-vivo-600 text-slate-800 hover:text-white border border-slate-200 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md"
                      title="Previous angle"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-vivo-600 text-slate-800 hover:text-white border border-slate-200 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md"
                      title="Next angle"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                {/* Main Image with Zoom Lens */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <div 
                    className="relative w-72 h-72 sm:w-84 sm:h-84 transition-transform duration-150 ease-out"
                    style={{
                      transformOrigin: `${zoomCoords.x}% ${zoomCoords.y}%`,
                      transform: isZooming ? 'scale(2.0)' : 'scale(1)',
                    }}
                  >
                    <Image
                      src={activeImage}
                      alt={product.name}
                      fill
                      className="object-contain pointer-events-none"
                      priority
                    />
                  </div>
                </div>

                {/* Bottom Control Bar */}
                <div className="absolute bottom-3 inset-x-4 flex items-center justify-between z-20 pointer-events-none">
                  <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200 text-[10px] text-slate-600 font-medium flex items-center gap-1.5 shadow-2xs">
                    <ZoomIn className="w-3 h-3 text-vivo-600" />
                    <span>{isZooming ? 'Panning HD Details' : 'Hover to Zoom · Click for Fullscreen'}</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setLightboxOpen(true); }}
                    className="pointer-events-auto bg-white/90 hover:bg-vivo-600 text-slate-700 hover:text-white p-2 rounded-full border border-slate-200 transition-colors shadow-2xs"
                    title="Open Fullscreen Gallery"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* View Tags / Dot Indicators */}
              <div className="flex items-center justify-between px-2 text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-vivo-600" />
                  Showing: <strong className="text-slate-800">{activeImageIndex === 0 ? 'Front View' : activeImageIndex === 1 ? 'Back View' : activeImageIndex === 2 ? 'Side Profile' : `Angle #${activeImageIndex + 1}`}</strong>
                </span>
                <span>{activeImageIndex + 1} of {product.images.length} Photos</span>
              </div>
            </div>

          </div>

          {/* In-Store Guarantee Icons */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-center space-y-1">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto" />
              <p className="text-xs font-bold text-slate-900">100% Genuine</p>
              <p className="text-[10px] text-slate-500">Official Brand Seal</p>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-center space-y-1">
              <CreditCard className="w-5 h-5 text-amber-600 mx-auto" />
              <p className="text-xs font-bold text-amber-800">Bajaj EMI</p>
              <p className="text-[10px] text-slate-500">Available in store</p>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-center space-y-1">
              <Zap className="w-5 h-5 text-vivo-600 mx-auto" />
              <p className="text-xs font-bold text-slate-900">Free Setup</p>
              <p className="text-[10px] text-slate-500">UV Glass & Transfer</p>
            </div>
          </div>

        </div>

        {/* Right Column: Variant Selector, Pricing & In-Store CTAs */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Header Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-widest text-vivo-600 uppercase">
                {product.brand?.name} {product.series?.name ? `· ${product.series.name}` : ''}
              </span>
              <div className="flex items-center gap-2">
                {product.is_phone && (
                  <button
                    type="button"
                    onClick={() => isCompared ? null : addToCompare(product)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all shadow-2xs ${
                      isCompared
                        ? 'bg-vivo-600 text-white border-vivo-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{isCompared ? 'In Compare' : 'Compare'}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2 rounded-xl border transition-all shadow-2xs ${
                    isWishlisted
                      ? 'bg-rose-50 text-rose-600 border-rose-200'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-rose-600' : ''}`} />
                </button>
              </div>
            </div>

            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
              {product.name}
            </h1>

            {product.tagline && (
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {product.tagline}
              </p>
            )}
          </div>

          {/* Pricing & EMI Strip */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">In-Store Showroom Price</p>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-3xl font-extrabold font-display text-slate-900">
                    {formatPrice(activeVariant?.selling_price || 0)}
                  </span>
                  {activeVariant && activeVariant.mrp > activeVariant.selling_price && (
                    <span className="text-sm text-slate-400 line-through">
                      MRP {formatPrice(activeVariant.mrp)}
                    </span>
                  )}
                </div>
              </div>

              {product.is_bajaj_emi_enabled !== false && emiAmount > 0 && (
                <div className="text-right">
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wide block">
                    ⚡ Bajaj Finance EMI Available
                  </span>
                  <span className="text-sm font-bold text-emerald-700">
                    from {formatPrice(emiAmount)}/mo
                  </span>
                  <span className="text-[9px] text-amber-700 font-medium block">
                    {tenureMonths} Months EMI Available
                  </span>
                </div>
              )}
            </div>

            <p className="text-[11px] text-slate-500 border-t border-slate-100 pt-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-vivo-600" />
              <span>Prices inclusive of all taxes. Special discounts & exchange bonus applied in-store.</span>
            </p>
          </div>

          {/* Variant Matrix Selector (RAM / Storage / Color) */}
          <div className="space-y-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 uppercase tracking-wider">Select Variant</span>
              <span className="text-slate-500">SKU: <strong className="text-slate-800">{activeVariant?.sku}</strong></span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.variants.map((v, idx) => {
                const isSelected = idx === selectedVariantIndex;
                const vStatusConfig = getStatusBadgeConfig(v.computed_status);

                return (
                  <button
                    key={v.id || idx}
                    type="button"
                    onClick={() => setSelectedVariantIndex(idx)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-vivo-50 border-vivo-500 text-slate-900 shadow-2xs ring-1 ring-vivo-200'
                        : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">
                        {v.ram ? `${v.ram} / ` : ''}{v.storage || v.color}
                      </span>
                      <span className={`w-2 h-2 rounded-full ${vStatusConfig.dot}`} />
                    </div>
                    <div className="flex items-baseline justify-between mt-1 text-xs">
                      <span className="font-semibold text-vivo-700">{formatPrice(v.selling_price)}</span>
                      <span className="text-[10px] text-slate-500">{v.color}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Physical In-Store Purchase CTAs */}
          <div className="space-y-3 pt-2">
            
            {activeVariant?.computed_status === 'COMING_SOON' || activeVariant?.computed_status === 'OUT_OF_STOCK' ? (
              <button
                type="button"
                onClick={() => setNotifyModalOpen(true)}
                className="w-full py-4 px-6 rounded-2xl bg-vivo-600 hover:bg-vivo-700 text-white font-bold text-sm shadow-2xs flex items-center justify-center gap-2 transition-all"
              >
                <Bell className="w-4 h-4" />
                <span>Notify Me When In Stock at Begampur Store</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setVisitModalOpen(true)}
                className="w-full py-4 px-6 rounded-2xl bg-vivo-600 hover:bg-vivo-700 text-white font-bold text-base shadow-2xs flex items-center justify-center gap-2 transition-all"
              >
                <MapPin className="w-5 h-5 text-white" />
                <span>Visit Store to Purchase</span>
              </button>
            )}

            <div className="grid grid-cols-2 gap-3">
              <a
                href={`https://wa.me/91${storeSettings.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <span>💬 WhatsApp Inquiry</span>
              </a>

              <a
                href={`tel:${storeSettings.phone}`}
                className="py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-vivo-600" />
                <span>Call ({storeSettings.phone})</span>
              </a>
            </div>

          </div>

          {/* In-Store Location Reminder */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-vivo-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900">Galaxy Mobile Gallery, Begampur</p>
              <p className="text-[11px] text-slate-500">{storeSettings.address}, {storeSettings.taluka}, {storeSettings.district}</p>
            </div>
          </div>

        </div>

      </div>

      {/* Specifications Detailed Section */}
      <section className="pt-12 border-t border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-display">
              Technical Specifications & Features
            </h2>
            <p className="text-xs text-slate-500">Complete hardware breakdown & features for {product.name}</p>
          </div>

          {product.warranty_info && (
            <div className="text-xs bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700">
              🛡️ Warranty: <strong className="text-slate-900">{product.warranty_info}</strong>
            </div>
          )}
        </div>

        {/* Dynamic Multi-Category Specs Cards */}
        {(() => {
          // Robust Specs Normalizer
          let rawSpecs = product.specifications as any;
          if (typeof rawSpecs === 'string') {
            try {
              rawSpecs = JSON.parse(rawSpecs);
            } catch {
              rawSpecs = {};
            }
          }
          const s = (rawSpecs && typeof rawSpecs === 'object') ? rawSpecs : {};

          // 1. In The Box
          let inTheBoxItems: string[] = [];
          if (Array.isArray(s.in_the_box)) {
            inTheBoxItems = s.in_the_box.map((item: any) => String(item).trim()).filter(Boolean);
          } else if (typeof s.in_the_box === 'string' && s.in_the_box.trim()) {
            inTheBoxItems = s.in_the_box.split(',').map((item: string) => item.trim()).filter(Boolean);
          }

          // 2. Custom Specifications
          const customSpecsList: Array<{ label: string; value: string }> = [];
          if (Array.isArray(s.custom_specs)) {
            s.custom_specs.forEach((cs: any) => {
              if (cs && (cs.key || cs.label) && cs.value) {
                customSpecsList.push({
                  label: String(cs.key || cs.label).trim(),
                  value: String(cs.value).trim(),
                });
              }
            });
          }

          // Helper to extract key-values from group or string
          const extractGroupItems = (val: any): Array<{ label: string; value: string }> => {
            if (!val) return [];
            if (typeof val === 'string' && val.trim().length > 0) {
              return [{ label: 'Specification', value: val.trim() }];
            }
            if (typeof val === 'object' && !Array.isArray(val)) {
              return Object.entries(val)
                .filter(([k, v]) => v !== undefined && v !== null && String(v).trim().length > 0 && typeof v !== 'object')
                .map(([k, v]) => ({
                  label: k.replace(/_/g, ' '),
                  value: String(v).trim(),
                }));
            }
            return [];
          };

          const handledKeys = new Set([
            'in_the_box',
            'custom_specs',
            'warranty_info',
            'highlights',
            'specifications',
            'display',
            'display_specs',
            'camera',
            'camera_specs',
            'processor',
            'processor_specs',
            'battery_charging',
            'battery',
            'charging',
            'connectivity',
            'build_dimensions',
            'audio',
            'sound'
          ]);

          const displayItems = extractGroupItems(s.display || s.display_specs);
          const cameraItems = extractGroupItems(s.camera || s.camera_specs);
          const processorItems = extractGroupItems(s.processor || s.processor_specs);
          const batteryItems = extractGroupItems(s.battery_charging || s.battery || s.charging);
          const connectivityItems = extractGroupItems(s.connectivity);
          const buildItems = extractGroupItems(s.build_dimensions);
          const audioItems = extractGroupItems(s.audio || s.sound);

          // Category-specific & custom flat specs
          const flatCategoryItems: Array<{ label: string; value: string }> = [];
          Object.entries(s).forEach(([k, val]) => {
            if (handledKeys.has(k)) return;
            if (val === undefined || val === null) return;

            if (typeof val === 'string' && val.trim().length > 0) {
              flatCategoryItems.push({
                label: k.replace(/_/g, ' '),
                value: val.trim(),
              });
            } else if (typeof val === 'number' || typeof val === 'boolean') {
              flatCategoryItems.push({
                label: k.replace(/_/g, ' '),
                value: String(val),
              });
            } else if (typeof val === 'object' && !Array.isArray(val)) {
              const nested = extractGroupItems(val);
              nested.forEach(n => {
                flatCategoryItems.push({
                  label: `${k.replace(/_/g, ' ')} - ${n.label}`,
                  value: n.value,
                });
              });
            }
          });

          // Merge custom specs
          customSpecsList.forEach(cs => {
            if (!flatCategoryItems.some(f => f.label.toLowerCase() === cs.label.toLowerCase())) {
              flatCategoryItems.push(cs);
            }
          });

          return (
            <div className="rounded-3xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden">
              <div className="divide-y divide-slate-100">
                
                {/* General Overview Card */}
                <div className="p-6 space-y-3 bg-slate-50/50">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <Smartphone className="w-3.5 h-3.5 text-vivo-600" /> General & Selected Variant Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Brand</span>
                      <span className="text-slate-900 font-semibold">{product.brand?.name || 'VIVO'}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Model Name</span>
                      <span className="text-slate-900 font-semibold">{product.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Category</span>
                      <span className="text-slate-900 font-semibold">{product.category?.name || (product.is_phone ? 'Smartphone' : 'Accessories')}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Selected Color</span>
                      <span className="text-slate-900 font-semibold">{activeVariant?.color || 'Standard'}</span>
                    </div>
                    {activeVariant?.ram && (
                      <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span className="text-slate-500">RAM Capacity</span>
                        <span className="text-slate-900 font-semibold">{activeVariant.ram}</span>
                      </div>
                    )}
                    {activeVariant?.storage && (
                      <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span className="text-slate-500">Internal Storage</span>
                        <span className="text-slate-900 font-semibold">{activeVariant.storage}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Stock Availability</span>
                      <span className="text-emerald-700 font-bold">{statusConfig.label} ({activeVariant?.current_stock || 0} Units In Store)</span>
                    </div>
                    {product.warranty_info && (
                      <div className="flex justify-between border-b border-slate-100 pb-2">
                        <span className="text-slate-500">Warranty</span>
                        <span className="text-slate-900 font-semibold">{product.warranty_info}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Display Specs */}
                {displayItems.length > 0 && (
                  <div className="p-6 space-y-3">
                    <h4 className="text-xs font-bold text-vivo-700 uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-vivo-600" /> Display & Screen
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {displayItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-500 capitalize">{item.label}</span>
                          <span className="text-slate-900 font-semibold text-right">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Camera Specs */}
                {cameraItems.length > 0 && (
                  <div className="p-6 space-y-3">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                      <Camera className="w-3.5 h-3.5 text-vivo-600" /> Camera System
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {cameraItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-500 capitalize">{item.label}</span>
                          <span className="text-slate-900 font-semibold text-right">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Processor & Hardware */}
                {processorItems.length > 0 && (
                  <div className="p-6 space-y-3">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-vivo-600" /> Processor & Performance
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {processorItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-500 capitalize">{item.label}</span>
                          <span className="text-slate-900 font-semibold text-right">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Battery & Charging */}
                {batteryItems.length > 0 && (
                  <div className="p-6 space-y-3">
                    <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-2">
                      <Battery className="w-3.5 h-3.5 text-emerald-600" /> Battery & Power Delivery
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {batteryItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-500 capitalize">{item.label}</span>
                          <span className="text-slate-900 font-semibold text-right">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Connectivity & Ports */}
                {connectivityItems.length > 0 && (
                  <div className="p-6 space-y-3">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-vivo-600" /> Connectivity & Ports
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {connectivityItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-500 capitalize">{item.label}</span>
                          <span className="text-slate-900 font-semibold text-right">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Design, Build & Durability */}
                {buildItems.length > 0 && (
                  <div className="p-6 space-y-3">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-vivo-600" /> Design, Build & Durability
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {buildItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-500 capitalize">{item.label}</span>
                          <span className="text-slate-900 font-semibold text-right">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Audio & Sound */}
                {audioItems.length > 0 && (
                  <div className="p-6 space-y-3">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-vivo-600" /> Audio & Sound
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {audioItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-500 capitalize">{item.label}</span>
                          <span className="text-slate-900 font-semibold text-right">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Category-Specific & Custom Specifications */}
                {flatCategoryItems.length > 0 && (
                  <div className="p-6 space-y-3">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                      <Sliders className="w-3.5 h-3.5 text-vivo-600" /> Technical Specifications & Features
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {flatCategoryItems.map((spec, idx) => (
                        <div key={idx} className="flex justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-500 capitalize">{spec.label}</span>
                          <span className="text-slate-900 font-semibold text-right">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* In the Box Items */}
                {inTheBoxItems.length > 0 && (
                  <div className="p-6 space-y-2">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">In The Box Items:</h4>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {inTheBoxItems.map((item, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 font-medium">
                          ✓ {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          );
        })()}
      </section>

      {/* Recommended Compatible Accessories Shelf */}
      {compatibleAccessories.length > 0 && (
        <section className="pt-12 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                Recommended Accessories for this Mobile
              </h2>
              <p className="text-xs text-slate-500">Available for immediate bundle discount at our Begampur store</p>
            </div>
            <Link href="/accessories" className="text-xs font-semibold text-vivo-600 hover:text-vivo-700">
              View All Accessories →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {compatibleAccessories.map(acc => (
              <ProductCard key={acc.id} product={acc} />
            ))}
          </div>
        </section>
      )}

      {/* Visit Store Action Modal */}
      {visitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-vivo-50 text-vivo-600 border border-vivo-200">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Visit Galaxy Mobile Gallery</h3>
                  <p className="text-xs text-slate-500">Physical Store Purchase & Live Demo</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setVisitModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <p className="text-slate-900 font-bold">{product.name}</p>
              <p className="text-slate-500">
                Selected Variant: <span className="text-vivo-700 font-bold">{activeVariant?.ram || ''} {activeVariant?.storage || ''} ({activeVariant?.color})</span>
              </p>
              <p className="text-lg font-extrabold text-slate-900 font-display">
                {formatPrice(activeVariant?.selling_price || 0)}
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Showroom Location: {storeSettings.address}, {storeSettings.landmark}, Begampur, Solapur.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Showroom Timings: {storeSettings.hours}</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Payment: <strong className="text-amber-800">Bajaj Finance EMI Available</strong>, Credit/Debit Cards, UPI & Cash.</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={storeSettings.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-vivo-600 hover:bg-vivo-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-2xs"
              >
                <MapPin className="w-4 h-4" />
                <span>Open Google Maps Directions</span>
              </a>

              <a
                href={`https://wa.me/91${storeSettings.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <span>💬 WhatsApp Store Chat</span>
              </a>
            </div>

          </div>
        </div>
      )}

      {/* Notify Me Modal for Coming Soon / Out of Stock */}
      {notifyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-vivo-50 text-vivo-600 border border-vivo-200">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Back-In-Stock Alert</h3>
                  <p className="text-xs text-slate-500">Get notified when stock arrives in store</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setNotifyModalOpen(false);
                  setNotifySubmitted(false);
                }}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {notifySubmitted ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Alert Registered!</h4>
                <p className="text-xs text-slate-600">
                  Our store manager will call or message you on WhatsApp as soon as this mobile arrives at Begampur store.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setNotifyModalOpen(false);
                    setNotifySubmitted(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleNotifySubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-700 font-semibold">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={notifyName}
                    onChange={(e) => setNotifyName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-vivo-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-700 font-semibold">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={notifyPhone}
                    onChange={(e) => setNotifyPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-vivo-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-700 font-semibold">Email (Optional)</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-vivo-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-vivo-600 hover:bg-vivo-700 text-white font-bold text-xs transition-colors shadow-2xs"
                >
                  Register Stock Notification
                </button>
              </form>
            )}

          </div>
        </div>
      )}

      {/* Fullscreen HD Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between z-10" onClick={(e) => e.stopPropagation()}>
            <div>
              <h3 className="text-white font-bold text-base sm:text-lg">{product.name}</h3>
              <p className="text-xs text-slate-400">
                Photo {activeImageIndex + 1} of {product.images.length} · <span className="text-vivo-400 font-semibold">{activeImageIndex === 0 ? 'Front View' : activeImageIndex === 1 ? 'Back View' : activeImageIndex === 2 ? 'Side Profile' : `Angle #${activeImageIndex + 1}`}</span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Close Fullscreen"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Stage in Lightbox */}
          <div 
            className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {product.images.length > 1 && (
              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-2 sm:left-6 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-vivo-600 text-white flex items-center justify-center transition-colors shadow-2xl backdrop-blur-md"
                title="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <div className="relative w-full h-full max-w-4xl max-h-[70vh] flex items-center justify-center p-4">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                className="object-contain"
                priority
              />
            </div>

            {product.images.length > 1 && (
              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-2 sm:right-6 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-vivo-600 text-white flex items-center justify-center transition-colors shadow-2xl backdrop-blur-md"
                title="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnail Strip in Lightbox */}
          <div 
            className="flex items-center justify-center gap-3 overflow-x-auto py-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {product.images.map((img, idx) => {
              const isActive = idx === activeImageIndex;
              return (
                <button
                  key={img.id || idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900 overflow-hidden border-2 transition-all p-1 flex-shrink-0 ${
                    isActive
                      ? 'border-vivo-500 shadow-glow-blue scale-110'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img.image_url}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    className="object-contain p-1"
                  />
                </button>
              );
            })}
          </div>

        </div>
      )}

      {/* Mobile Phone Sticky Action Bar */}
      <div className="md:hidden fixed bottom-[52px] left-0 right-0 z-30 bg-white/95 backdrop-blur-xl border-t border-slate-200 p-2.5 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div>
            <span className="text-[10px] text-slate-500 block font-medium">Showroom Price</span>
            <span className="text-base font-extrabold text-slate-900 font-display">
              {formatPrice(activeVariant?.selling_price || 0)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/91${storeSettings.whatsapp}?text=Hello%20Galaxy%20Mobile%20Gallery,%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}%20(${encodeURIComponent(activeVariant?.ram || '')}%20${encodeURIComponent(activeVariant?.storage || '')}%20${encodeURIComponent(activeVariant?.color || '')}).%20Is%20it%20available%20at%20Begampur%20store?`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs flex items-center gap-1.5 shadow-2xs"
              title="WhatsApp inquiry"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs">WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => setVisitModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-vivo-600 hover:bg-vivo-700 text-white font-bold text-xs shadow-2xs flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Visit Store</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ProductDetailClient;
