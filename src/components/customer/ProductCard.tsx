'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, ProductVariant } from '@/lib/types';
import { useStore } from '@/lib/store/store-context';
import { formatPrice, getStatusBadgeConfig, calculateEMI } from '@/lib/utils/formatters';
import { Layers, Heart, Sparkles, MapPin, Eye, Check, ChevronRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCompare, removeFromCompare, compareList, toggleWishlist, isInWishlist } = useStore();
  
  // Active selected variant on card
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const activeVariant: ProductVariant | undefined = product.variants[selectedVariantIndex] || product.variants[0];

  const isCompared = compareList.some(p => p.id === product.id);
  const isWishlisted = isInWishlist(product.id);

  // Status configuration
  const statusConfig = getStatusBadgeConfig(activeVariant?.computed_status || 'IN_STOCK');
  const primaryImage = product.images.find(img => img.is_primary)?.image_url || product.images[0]?.image_url || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80';

  const emiAmount = activeVariant ? calculateEMI(activeVariant.selling_price, 6) : 0;

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCompared) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group relative flex flex-col rounded-2xl glass-card overflow-hidden transition-all duration-300 hover:border-vivo-500/40 hover:shadow-glow-blue/20">
      
      {/* Top Media & Badges Area */}
      <div className="relative aspect-[4/3] w-full bg-gradient-to-b from-slate-900/80 to-slate-950/90 flex items-center justify-center p-6 overflow-hidden">
        
        {/* Glowing Backdrop Orb */}
        <div className="absolute inset-0 bg-radial-gradient from-vivo-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Status Pill */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} ${statusConfig.animate ? 'pulse-badge-dot' : ''}`} />
            {statusConfig.label}
          </span>
        </div>

        {/* Discount Badge */}
        {activeVariant && activeVariant.discount_percent > 0 && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              SAVE {Math.round(activeVariant.discount_percent)}%
            </span>
          </div>
        )}

        {/* Action Buttons Overlay */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {product.is_phone && (
            <button
              type="button"
              onClick={handleCompareClick}
              className={`p-2 rounded-xl border backdrop-blur-md transition-all ${
                isCompared
                  ? 'bg-origin-violet text-white border-origin-violet shadow-glow-violet'
                  : 'bg-slate-900/80 text-slate-300 border-white/10 hover:text-white hover:bg-slate-800'
              }`}
              title={isCompared ? 'Remove from compare' : 'Add to compare'}
            >
              <Layers className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={handleWishlistClick}
            className={`p-2 rounded-xl border backdrop-blur-md transition-all ${
              isWishlisted
                ? 'bg-rose-600 text-white border-rose-500'
                : 'bg-slate-900/80 text-slate-300 border-white/10 hover:text-white hover:bg-slate-800'
            }`}
            title={isWishlisted ? 'Saved in wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Product Image Stage (Flipkart/Amazon Dual Angle Hover Effect) */}
        <Link href={`/product/${product.slug}`} className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-44 h-44 transition-transform duration-500 group-hover:scale-105">
            {/* Primary Front Image */}
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              className={`object-contain transition-opacity duration-300 ${
                product.images.length > 1 ? 'group-hover:opacity-0' : 'opacity-100'
              }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Secondary Back/Angle Image on Hover */}
            {product.images.length > 1 && (
              <Image
                src={product.images[1]?.image_url || primaryImage}
                alt={`${product.name} alternate angle`}
                fill
                className="object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </div>

          {/* Multiple Photos Badge Indicator */}
          {product.images.length > 1 && (
            <span className="absolute bottom-2 left-3 text-[9px] font-bold text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded-full border border-white/10 group-hover:border-vivo-500/40 transition-colors">
              {product.images.length} Angles
            </span>
          )}
        </Link>
      </div>

      {/* Product Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          {/* Brand / Category Tag */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="uppercase font-semibold tracking-wider text-vivo-400">
              {product.brand?.name || 'VIVO'}
            </span>
            {product.is_featured && (
              <span className="flex items-center gap-1 text-[11px] text-origin-violet font-medium">
                <Sparkles className="w-3 h-3" /> Featured
              </span>
            )}
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`} className="block group-hover:text-vivo-400 transition-colors">
            <h3 className="font-display font-bold text-base text-white line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Tagline / Subtitle */}
          {product.tagline && (
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {product.tagline}
            </p>
          )}
        </div>

        {/* Variant Selector Pills (RAM / Storage / Color) */}
        {product.variants.length > 1 && (
          <div className="space-y-1.5 pt-1">
            <div className="text-[11px] text-slate-500 font-medium">Available Options:</div>
            <div className="flex flex-wrap gap-1.5">
              {product.variants.map((v, idx) => {
                const isSelected = idx === selectedVariantIndex;
                const label = `${v.ram ? v.ram + '/' : ''}${v.storage || v.color}`;
                return (
                  <button
                    key={v.id || idx}
                    type="button"
                    onClick={() => setSelectedVariantIndex(idx)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-medium border transition-all ${
                      isSelected
                        ? 'bg-vivo-500/20 text-vivo-300 border-vivo-500/50 shadow-sm'
                        : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/20'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Price & In-Store Purchase CTA Area */}
        <div className="pt-3 border-t border-white/10 space-y-3">
          
          {/* Price Strip */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold font-display text-white">
                {formatPrice(activeVariant?.selling_price || 0)}
              </span>
              {activeVariant && activeVariant.mrp > activeVariant.selling_price && (
                <span className="text-xs text-slate-500 line-through">
                  {formatPrice(activeVariant.mrp)}
                </span>
              )}
            </div>

            {/* Bajaj EMI Callout */}
            {product.is_phone && emiAmount > 0 && (
              <span className="text-[11px] text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                EMI from {formatPrice(emiAmount)}/mo
              </span>
            )}
          </div>

          {/* Primary Action Button (Visit Store to Purchase) */}
          <Link
            href={`/product/${product.slug}`}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-vivo-600/20 text-slate-200 hover:text-white border border-white/10 hover:border-vivo-500/40 text-xs font-semibold tracking-wide transition-all group/btn"
          >
            <MapPin className="w-3.5 h-3.5 text-vivo-400 group-hover/btn:scale-110 transition-transform" />
            <span>Check In-Store Availability</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>

        </div>

      </div>
    </div>
  );
};
