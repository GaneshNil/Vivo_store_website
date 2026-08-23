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
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { products, storeSettings, addToCompare, compareList, toggleWishlist, isInWishlist, submitNotifyRequest } = useStore();

  const product = products.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="py-24 max-w-4xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-sm text-slate-400">The mobile phone or accessory model you are looking for does not exist or has been discontinued.</p>
        <Link href="/mobiles" className="inline-block px-5 py-2.5 rounded-xl bg-vivo-600 text-white text-xs font-semibold">
          Browse Smartphone Catalog
        </Link>
      </div>
    );
  }

  // Active Variant State
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const activeVariant = product.variants[selectedVariantIndex] || product.variants[0];

  // Active Image State
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = product.images[activeImageIndex]?.image_url || product.images[0]?.image_url;

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
  const isCompared = compareList.some(p => p.id === product.id);
  const isWishlisted = isInWishlist(product.id);
  const emiAmount = activeVariant ? calculateEMI(activeVariant.selling_price, 6) : 0;

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
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Galaxy Mobile Gallery, I am inquiring about the ${product.name} (${activeVariant?.ram || ''} ${activeVariant?.storage || ''} in ${activeVariant?.color || ''}) priced at ${formatPrice(activeVariant?.selling_price || 0)}. Is it currently available for in-store pickup at your Begampur shop?`
  );

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={product.is_phone ? '/mobiles' : '/accessories'} className="hover:text-white">
          {product.is_phone ? 'Mobiles' : 'Accessories'}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-white font-medium truncate">{product.name}</span>
      </nav>

      {/* Main Product Showcase: Gallery + Variant & In-Store Purchase Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Multi-View Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Main Stage Image */}
          <div className="relative aspect-square w-full rounded-3xl glass-panel border border-white/10 bg-gradient-to-b from-slate-900/90 to-slate-950/90 flex items-center justify-center p-8 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-radial-gradient from-vivo-500/10 via-transparent to-transparent" />
            
            {/* Status Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                <span className={`w-2 h-2 rounded-full ${statusConfig.dot} ${statusConfig.animate ? 'pulse-badge-dot' : ''}`} />
                {statusConfig.label}
              </span>
            </div>

            {/* Discount Callout */}
            {activeVariant && activeVariant.discount_percent > 0 && (
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  SAVE {Math.round(activeVariant.discount_percent)}% OFF MRP
                </span>
              </div>
            )}

            {/* Image */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 transition-transform duration-300">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Thumbnail Gallery Row */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => {
                const isActive = idx === activeImageIndex;
                return (
                  <button
                    key={img.id || idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-2xl bg-slate-900 overflow-hidden border-2 flex-shrink-0 transition-all ${
                      isActive
                        ? 'border-vivo-500 shadow-glow-blue scale-105'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <Image
                      src={img.image_url}
                      alt={img.alt_text || product.name}
                      fill
                      className="object-contain p-2"
                    />
                  </button>
                );
              })}
            </div>
          )}

          {/* In-Store Guarantee Icons */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-2xl glass-card text-center space-y-1">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto" />
              <p className="text-xs font-bold text-white">100% Genuine</p>
              <p className="text-[10px] text-slate-400">Official Brand Seal</p>
            </div>
            <div className="p-3 rounded-2xl glass-card text-center space-y-1">
              <CreditCard className="w-5 h-5 text-amber-400 mx-auto" />
              <p className="text-xs font-bold text-white">0% Bajaj EMI</p>
              <p className="text-[10px] text-slate-400">10-Min Approval</p>
            </div>
            <div className="p-3 rounded-2xl glass-card text-center space-y-1">
              <Zap className="w-5 h-5 text-vivo-400 mx-auto" />
              <p className="text-xs font-bold text-white">Free Setup</p>
              <p className="text-[10px] text-slate-400">UV Glass & Transfer</p>
            </div>
          </div>

        </div>

        {/* Right Column: Variant Selector, Pricing & In-Store CTAs */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Header Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-widest text-vivo-400 uppercase">
                {product.brand?.name} {product.series?.name ? `· ${product.series.name}` : ''}
              </span>
              <div className="flex items-center gap-2">
                {product.is_phone && (
                  <button
                    type="button"
                    onClick={() => isCompared ? null : addToCompare(product)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                      isCompared
                        ? 'bg-origin-violet text-white border-origin-violet'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:text-white'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{isCompared ? 'In Compare' : 'Compare'}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2 rounded-xl border transition-all ${
                    isWishlisted
                      ? 'bg-rose-600 text-white border-rose-500'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:text-white'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              {product.name}
            </h1>

            {product.tagline && (
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {product.tagline}
              </p>
            )}
          </div>

          {/* Pricing & EMI Strip */}
          <div className="p-5 rounded-2xl glass-panel border border-white/10 bg-slate-900/80 space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-xs text-slate-400 font-medium">In-Store Showroom Price</p>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-3xl font-extrabold font-display text-white">
                    {formatPrice(activeVariant?.selling_price || 0)}
                  </span>
                  {activeVariant && activeVariant.mrp > activeVariant.selling_price && (
                    <span className="text-sm text-slate-500 line-through">
                      MRP {formatPrice(activeVariant.mrp)}
                    </span>
                  )}
                </div>
              </div>

              {product.is_phone && emiAmount > 0 && (
                <div className="text-right">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wide block">
                    Bajaj Finance EMI
                  </span>
                  <span className="text-sm font-bold text-emerald-400">
                    from {formatPrice(emiAmount)}/mo
                  </span>
                </div>
              )}
            </div>

            <p className="text-[11px] text-slate-400 border-t border-white/5 pt-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-vivo-400" />
              <span>Prices inclusive of all taxes. Special discounts & exchange bonus applied in-store.</span>
            </p>
          </div>

          {/* Variant Matrix Selector (RAM / Storage / Color) */}
          <div className="space-y-4 p-5 rounded-2xl glass-panel border border-white/10">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white uppercase tracking-wider">Select Variant</span>
              <span className="text-slate-400">SKU: <strong className="text-slate-200">{activeVariant?.sku}</strong></span>
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
                        ? 'bg-vivo-600/20 border-vivo-500 shadow-glow-blue text-white'
                        : 'bg-white/5 border-white/5 hover:border-white/20 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">
                        {v.ram ? `${v.ram} / ` : ''}{v.storage || v.color}
                      </span>
                      <span className={`w-2 h-2 rounded-full ${vStatusConfig.dot}`} />
                    </div>
                    <div className="flex items-baseline justify-between mt-1 text-xs">
                      <span className="font-semibold text-vivo-400">{formatPrice(v.selling_price)}</span>
                      <span className="text-[10px] text-slate-400">{v.color}</span>
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
                className="w-full py-4 px-6 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <Bell className="w-4 h-4" />
                <span>Notify Me When In Stock at Begampur Store</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setVisitModalOpen(true)}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-vivo-600 via-vivo-500 to-origin-violet hover:from-vivo-500 hover:to-origin-purple text-white font-bold text-base shadow-glow-blue hover:shadow-glow-violet flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <MapPin className="w-5 h-5 text-cyan-200" />
                <span>Visit Store to Purchase</span>
              </button>
            )}

            <div className="grid grid-cols-2 gap-3">
              <a
                href={`https://wa.me/91${storeSettings.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>💬 WhatsApp Store Inquiry</span>
              </a>

              <a
                href={`tel:${storeSettings.phone}`}
                className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-vivo-400" />
                <span>Call Store ({storeSettings.phone})</span>
              </a>
            </div>

          </div>

          {/* In-Store Location Reminder */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300 flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-vivo-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">Galaxy Mobile Gallery, Begampur</p>
              <p className="text-[11px] text-slate-400">{storeSettings.address}, {storeSettings.taluka}, {storeSettings.district}</p>
            </div>
          </div>

        </div>

      </div>

      {/* Specifications Detailed Tabs Section */}
      <section className="pt-12 border-t border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white font-display">
              Technical Specifications & Features
            </h2>
            <p className="text-xs text-slate-400">Complete hardware breakdown for {product.name}</p>
          </div>

          {product.warranty_info && (
            <div className="text-xs bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 text-slate-300">
              🛡️ Warranty: <strong className="text-white">{product.warranty_info}</strong>
            </div>
          )}
        </div>

        {/* Specs Table */}
        <div className="rounded-3xl glass-panel border border-white/10 overflow-hidden">
          <div className="divide-y divide-white/5">
            
            {/* Display Specs */}
            {product.specifications.display && (
              <div className="p-6 space-y-3">
                <h4 className="text-xs font-bold text-vivo-400 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" /> Display & Screen
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {Object.entries(product.specifications.display).map(([key, val]) => (
                    <div key={key} className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-400 capitalize">{key.replace(/_/g, ' ')}</span>
                      <span className="text-white font-medium text-right">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Camera Specs */}
            {product.specifications.camera && (
              <div className="p-6 space-y-3">
                <h4 className="text-xs font-bold text-origin-cyan uppercase tracking-wider flex items-center gap-2">
                  <Camera className="w-3.5 h-3.5" /> Camera System
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {Object.entries(product.specifications.camera).map(([key, val]) => (
                    <div key={key} className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-400 capitalize">{key.replace(/_/g, ' ')}</span>
                      <span className="text-white font-medium text-right">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Processor & Hardware */}
            {product.specifications.processor && (
              <div className="p-6 space-y-3">
                <h4 className="text-xs font-bold text-origin-violet uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5" /> Processor & Performance
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {Object.entries(product.specifications.processor).map(([key, val]) => (
                    <div key={key} className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-400 capitalize">{key.replace(/_/g, ' ')}</span>
                      <span className="text-white font-medium text-right">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Battery & Charging */}
            {product.specifications.battery_charging && (
              <div className="p-6 space-y-3">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <Battery className="w-3.5 h-3.5" /> Battery & Power Delivery
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {Object.entries(product.specifications.battery_charging).map(([key, val]) => (
                    <div key={key} className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-400 capitalize">{key.replace(/_/g, ' ')}</span>
                      <span className="text-white font-medium text-right">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* In the Box Items */}
            {product.specifications.in_the_box && product.specifications.in_the_box.length > 0 && (
              <div className="p-6 space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">In The Box Items:</h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {product.specifications.in_the_box.map((item, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/5">
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Recommended Compatible Accessories Shelf */}
      {compatibleAccessories.length > 0 && (
        <section className="pt-12 border-t border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white font-display">
                Recommended Accessories for this Mobile
              </h2>
              <p className="text-xs text-slate-400">Available for immediate bundle discount at our Begampur store</p>
            </div>
            <Link href="/accessories" className="text-xs font-semibold text-vivo-400 hover:text-vivo-300">
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl glass-panel border border-vivo-500/40 p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-vivo-600/20 text-vivo-400 border border-vivo-500/30">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Visit Galaxy Mobile Gallery</h3>
                  <p className="text-xs text-slate-400">Physical Store Purchase & Live Demo</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setVisitModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2 text-xs">
              <p className="text-white font-semibold">{product.name}</p>
              <p className="text-slate-400">
                Selected Variant: <span className="text-vivo-300 font-bold">{activeVariant?.ram || ''} {activeVariant?.storage || ''} ({activeVariant?.color})</span>
              </p>
              <p className="text-lg font-extrabold text-white font-display">
                {formatPrice(activeVariant?.selling_price || 0)}
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Showroom Location: {storeSettings.address}, {storeSettings.landmark}, Begampur, Solapur.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Showroom Timings: {storeSettings.hours}</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Payment: Bajaj Finance 0% EMI, Credit/Debit Cards, UPI & Cash.</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={storeSettings.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-vivo-600 hover:bg-vivo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-glow-blue"
              >
                <MapPin className="w-4 h-4" />
                <span>Open Google Maps Directions</span>
              </a>

              <a
                href={`https://wa.me/91${storeSettings.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>💬 WhatsApp Store Chat</span>
              </a>
            </div>

          </div>
        </div>
      )}

      {/* Notify Me Modal for Coming Soon / Out of Stock */}
      {notifyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl glass-panel border border-cyan-500/40 p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Back-In-Stock Alert</h3>
                  <p className="text-xs text-slate-400">Get notified when stock arrives in store</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setNotifyModalOpen(false);
                  setNotifySubmitted(false);
                }}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {notifySubmitted ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Alert Registered!</h4>
                <p className="text-xs text-slate-300">
                  Our store manager will call or message you on WhatsApp as soon as this mobile arrives at Begampur store.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setNotifyModalOpen(false);
                    setNotifySubmitted(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleNotifySubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={notifyName}
                    onChange={(e) => setNotifyName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={notifyPhone}
                    onChange={(e) => setNotifyPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Email (Optional)</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors shadow-lg"
                >
                  Register Stock Notification
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
