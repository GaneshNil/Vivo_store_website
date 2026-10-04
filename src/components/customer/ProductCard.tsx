'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, ProductVariant } from '@/lib/types';
import { useStore } from '@/lib/store/store-context';
import { formatPrice, getStatusBadgeConfig, calculateEMI } from '@/lib/utils/formatters';
import { Layers, Heart, Sparkles, MapPin, ChevronRight } from 'lucide-react';

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
    <div className="group relative flex flex-col rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-vivo-300 hover:shadow-[0_12px_28px_-6px_rgba(0,102,255,0.12)] transition-all duration-300 overflow-hidden">
      
      {/* Top Media & Badges Area */}
      <div className="relative aspect-[4/3] w-full bg-slate-50/70 border-b border-slate-100 flex items-center justify-center p-6 overflow-hidden">
        
        {/* Status Pill */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide border shadow-2xs ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} ${statusConfig.animate ? 'pulse-badge-dot' : ''}`} />
            {statusConfig.label}
          </span>
        </div>

        {/* Discount Badge */}
        {activeVariant && activeVariant.discount_percent > 0 && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs">
              SAVE {Math.round(activeVariant.discount_percent)}%
            </span>
          </div>
        )}

        {/* Action Buttons Overlay - Visible on mobile touch screens and hover on desktop */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
          {product.is_phone && (
            <button
              type="button"
              onClick={handleCompareClick}
              className={`p-2 rounded-xl border backdrop-blur-md transition-all shadow-xs ${
                isCompared
                  ? 'bg-vivo-600 text-white border-vivo-600'
                  : 'bg-white/95 text-slate-600 border-slate-200 hover:text-vivo-600 hover:bg-white'
              }`}
              title={isCompared ? 'Remove from compare' : 'Add to compare'}
              aria-label="Add to compare"
            >
              <Layers className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={handleWishlistClick}
            className={`p-2 rounded-xl border backdrop-blur-md transition-all shadow-xs ${
              isWishlisted
                ? 'bg-rose-600 text-white border-rose-600'
                : 'bg-white/95 text-slate-600 border-slate-200 hover:text-rose-600 hover:bg-white'
            }`}
            title={isWishlisted ? 'Saved in wishlist' : 'Save to wishlist'}
            aria-label="Save to wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Product Image Stage (Dual Angle Hover Effect) */}
        <Link href={`/product/${product.slug}`} className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-40 h-40 transition-transform duration-500 group-hover:scale-105">
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
            <span className="absolute bottom-2 left-3 text-[9px] font-bold text-slate-500 bg-white/90 px-2 py-0.5 rounded-full border border-slate-200 group-hover:border-vivo-300 transition-colors shadow-2xs">
              {product.images.length} Photos
            </span>
          )}
        </Link>
      </div>

      {/* Product Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
        
        <div className="space-y-1.5">
          {/* Brand / Category Tag */}
          <div className="flex items-center justify-between text-xs">
            <span className="uppercase font-bold tracking-wider text-vivo-700 text-[11px]">
              {product.brand?.name || 'VIVO'}
            </span>
            {product.is_featured && (
              <span className="flex items-center gap-1 text-[10px] text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full font-semibold">
                <Sparkles className="w-2.5 h-2.5" /> Featured
              </span>
            )}
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`} className="block group-hover:text-vivo-600 transition-colors">
            <h3 className="font-display font-bold text-base text-slate-900 line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Tagline / Subtitle */}
          {product.tagline && (
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {product.tagline}
            </p>
          )}
        </div>

        {/* Variant Selector Pills (RAM / Storage / Color) */}
        {product.variants.length > 1 && (
          <div className="space-y-1 pt-0.5">
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Storage / Colors:</div>
            <div className="flex flex-wrap gap-1">
              {product.variants.map((v, idx) => {
                const isSelected = idx === selectedVariantIndex;
                const label = `${v.ram ? v.ram + '/' : ''}${v.storage || v.color}`;
                return (
                  <button
                    key={v.id || idx}
                    type="button"
                    onClick={() => setSelectedVariantIndex(idx)}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-medium border transition-all ${
                      isSelected
                        ? 'bg-vivo-50 text-vivo-700 border-vivo-300 font-bold shadow-2xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
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
        <div className="pt-3 border-t border-slate-100 space-y-3">
          
          {/* Price Strip */}
          <div className="flex items-baseline justify-between gap-1 flex-wrap">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold font-display text-slate-900">
                {formatPrice(activeVariant?.selling_price || 0)}
              </span>
              {activeVariant && activeVariant.mrp > activeVariant.selling_price && (
                <span className="text-xs text-slate-400 line-through font-medium">
                  {formatPrice(activeVariant.mrp)}
                </span>
              )}
            </div>

            {/* Bajaj EMI Callout */}
            {product.is_phone && emiAmount > 0 && (
              <span className="text-[10.5px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/80">
                EMI from {formatPrice(emiAmount)}/mo
              </span>
            )}
          </div>

          {/* Primary Action Button (Visit Store to Purchase) */}
          <Link
            href={`/product/${product.slug}`}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-vivo-600 text-slate-700 hover:text-white border border-slate-200 hover:border-vivo-600 text-xs font-semibold tracking-wide transition-all group/btn shadow-2xs"
          >
            <MapPin className="w-3.5 h-3.5 text-vivo-600 group-hover/btn:text-white transition-colors" />
            <span>Check In-Store Availability</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-all" />
          </Link>

        </div>

      </div>
    </div>
  );
};

