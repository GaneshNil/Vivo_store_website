'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/lib/store/store-context';
import { formatPrice, getStatusBadgeConfig } from '@/lib/utils/formatters';
import { 
  Layers, 
  Plus, 
  X, 
  Trash2, 
  MapPin, 
  Battery, 
  Cpu, 
  Camera, 
  Zap, 
  Smartphone,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Product } from '@/lib/types';

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare, addToCompare, products } = useStore();
  const [pickerOpen, setPickerOpen] = useState(false);

  const phoneProducts = products.filter(p => p.is_phone && p.is_active);

  // Helper for numeric gauge percentage
  const getBatteryGauge = (batteryStr?: string) => {
    const num = parseInt(batteryStr || '5000', 10);
    return Math.min(100, Math.round((num / 6000) * 100));
  };

  const getChargingGauge = (chargeStr?: string) => {
    const num = parseInt(chargeStr || '44', 10);
    return Math.min(100, Math.round((num / 120) * 100));
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 bg-gradient-to-r from-origin-surface via-slate-900 to-vivo-950/40 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-origin-violet uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>SIDE-BY-SIDE SPECIFICATION MATRIX</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Phone Comparison
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Compare camera optics, battery capacity, fast charging, processor speed, and in-store pricing.
            </p>
          </div>

          {compareList.length > 0 && (
            <button
              type="button"
              onClick={clearCompare}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-medium transition-all"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
              <span>Clear All Devices</span>
            </button>
          )}
        </div>
      </div>

      {compareList.length === 0 ? (
        <div className="p-16 text-center rounded-3xl glass-panel border border-white/10 space-y-6">
          <div className="p-4 rounded-2xl bg-vivo-600/10 text-vivo-400 border border-vivo-500/20 w-16 h-16 mx-auto flex items-center justify-center">
            <Layers className="w-8 h-8" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-white">No Phones in Comparison Matrix</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Add up to 3 phones from our smartphone collection to view a comprehensive side-by-side spec and gauge breakdown.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-vivo-600 to-origin-violet text-white text-xs font-bold shadow-glow-blue hover:from-vivo-500 hover:to-origin-purple transition-all"
          >
            + Select Phones to Compare
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Comparison Matrix Table */}
          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-slate-950/70 shadow-2xl">
            <table className="w-full text-left text-xs border-collapse">
              
              {/* Sticky Top Header: Phone Images, Names & Prices */}
              <thead>
                <tr className="border-b border-white/10 bg-slate-900/90 backdrop-blur-md">
                  <th className="p-5 font-bold text-slate-400 uppercase tracking-wider w-48 sticky left-0 bg-slate-900/95 z-20">
                    Product Specification
                  </th>
                  {compareList.map((prod) => {
                    const activeVar = prod.variants[0];
                    const statusConfig = getStatusBadgeConfig(activeVar?.computed_status || 'IN_STOCK');
                    const img = prod.images.find(i => i.is_primary)?.image_url || prod.images[0]?.image_url;

                    return (
                      <th key={prod.id} className="p-5 w-72 min-w-[260px] align-top text-center relative border-l border-white/5">
                        <button
                          type="button"
                          onClick={() => removeFromCompare(prod.id)}
                          className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-red-400 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        <div className="relative w-36 h-36 mx-auto mb-3">
                          <Image
                            src={img}
                            alt={prod.name}
                            fill
                            className="object-contain"
                          />
                        </div>

                        <div className="space-y-1 text-center">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                            {statusConfig.label}
                          </span>
                          <h4 className="text-sm font-bold text-white line-clamp-1">{prod.name}</h4>
                          <p className="text-base font-extrabold text-vivo-400">{formatPrice(activeVar?.selling_price || 0)}</p>
                        </div>

                        <div className="mt-3">
                          <Link
                            href={`/product/${prod.slug}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-vivo-600 text-white text-[11px] font-semibold transition-all"
                          >
                            <MapPin className="w-3 h-3" />
                            <span>In-Store Details</span>
                          </Link>
                        </div>
                      </th>
                    );
                  })}

                  {compareList.length < 3 && (
                    <th className="p-5 w-72 min-w-[240px] text-center border-l border-white/5 bg-white/[0.01]">
                      <button
                        type="button"
                        onClick={() => setPickerOpen(true)}
                        className="h-44 w-full rounded-2xl border-2 border-dashed border-white/10 hover:border-vivo-500/50 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-white transition-all group"
                      >
                        <Plus className="w-8 h-8 group-hover:scale-110 transition-transform text-vivo-400" />
                        <span className="text-xs font-semibold">Add Phone to Compare</span>
                      </button>
                    </th>
                  )}
                </tr>
              </thead>

              {/* Specification Rows */}
              <tbody className="divide-y divide-white/5">
                
                {/* 1. Brand & Series */}
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-4 font-semibold text-slate-300 sticky left-0 bg-slate-950/95 z-10">Brand & Series</td>
                  {compareList.map(p => (
                    <td key={p.id} className="p-4 border-l border-white/5 text-slate-200 text-center font-medium">
                      {p.brand?.name} {p.series?.name ? `(${p.series.name})` : ''}
                    </td>
                  ))}
                  {compareList.length < 3 && <td className="p-4 border-l border-white/5" />}
                </tr>

                {/* 2. Battery Capacity (With Gauge) */}
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-4 font-semibold text-slate-300 sticky left-0 bg-slate-950/95 z-10">
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <Battery className="w-4 h-4" />
                      <span>Battery Capacity</span>
                    </div>
                  </td>
                  {compareList.map(p => {
                    const cap = p.specifications.battery_charging?.capacity || '5000 mAh';
                    const gauge = getBatteryGauge(cap);
                    return (
                      <td key={p.id} className="p-4 border-l border-white/5 text-center space-y-2">
                        <span className="font-bold text-white text-sm">{cap}</span>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                            style={{ width: `${gauge}%` }}
                          />
                        </div>
                      </td>
                    );
                  })}
                  {compareList.length < 3 && <td className="p-4 border-l border-white/5" />}
                </tr>

                {/* 3. Fast Charging Wattage (With Gauge) */}
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-4 font-semibold text-slate-300 sticky left-0 bg-slate-950/95 z-10">
                    <div className="flex items-center gap-1.5 text-amber-400">
                      <Zap className="w-4 h-4" />
                      <span>Charging Speed</span>
                    </div>
                  </td>
                  {compareList.map(p => {
                    const spd = p.specifications.battery_charging?.charging_speed || '44W FlashCharge';
                    const gauge = getChargingGauge(spd);
                    return (
                      <td key={p.id} className="p-4 border-l border-white/5 text-center space-y-2">
                        <span className="font-bold text-white">{spd}</span>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full transition-all duration-500"
                            style={{ width: `${gauge}%` }}
                          />
                        </div>
                      </td>
                    );
                  })}
                  {compareList.length < 3 && <td className="p-4 border-l border-white/5" />}
                </tr>

                {/* 4. Display & Refresh Rate */}
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-4 font-semibold text-slate-300 sticky left-0 bg-slate-950/95 z-10">Display</td>
                  {compareList.map(p => (
                    <td key={p.id} className="p-4 border-l border-white/5 text-center space-y-1">
                      <p className="font-bold text-white">{p.specifications.display?.size || '6.7 inches'}</p>
                      <p className="text-slate-400 text-[11px]">{p.specifications.display?.resolution} · {p.specifications.display?.refresh_rate}</p>
                    </td>
                  ))}
                  {compareList.length < 3 && <td className="p-4 border-l border-white/5" />}
                </tr>

                {/* 5. Primary Rear Camera */}
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-4 font-semibold text-slate-300 sticky left-0 bg-slate-950/95 z-10">
                    <div className="flex items-center gap-1.5 text-origin-cyan">
                      <Camera className="w-4 h-4" />
                      <span>Rear Camera System</span>
                    </div>
                  </td>
                  {compareList.map(p => (
                    <td key={p.id} className="p-4 border-l border-white/5 text-center space-y-1">
                      <p className="font-bold text-white">{p.specifications.camera?.rear_main || '50 MP OIS'}</p>
                      {p.specifications.camera?.zeiss_optics && (
                        <span className="text-[10px] bg-vivo-500/20 text-vivo-300 px-1.5 py-0.5 rounded font-semibold inline-block">
                          ZEISS Co-engineered Optics
                        </span>
                      )}
                    </td>
                  ))}
                  {compareList.length < 3 && <td className="p-4 border-l border-white/5" />}
                </tr>

                {/* 6. Front Selfie Camera */}
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-4 font-semibold text-slate-300 sticky left-0 bg-slate-950/95 z-10">Front Camera</td>
                  {compareList.map(p => (
                    <td key={p.id} className="p-4 border-l border-white/5 text-center font-medium text-slate-200">
                      {p.specifications.camera?.front_camera || '32 MP'}
                    </td>
                  ))}
                  {compareList.length < 3 && <td className="p-4 border-l border-white/5" />}
                </tr>

                {/* 7. Processor & Performance */}
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-4 font-semibold text-slate-300 sticky left-0 bg-slate-950/95 z-10">
                    <div className="flex items-center gap-1.5 text-origin-violet">
                      <Cpu className="w-4 h-4" />
                      <span>Processor</span>
                    </div>
                  </td>
                  {compareList.map(p => (
                    <td key={p.id} className="p-4 border-l border-white/5 text-center font-bold text-white">
                      {p.specifications.processor?.chipset || 'Octa-core 5G'}
                    </td>
                  ))}
                  {compareList.length < 3 && <td className="p-4 border-l border-white/5" />}
                </tr>

                {/* 8. Available RAM & Storage Configurations */}
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-4 font-semibold text-slate-300 sticky left-0 bg-slate-950/95 z-10">Variants in Stock</td>
                  {compareList.map(p => (
                    <td key={p.id} className="p-4 border-l border-white/5 text-center">
                      <div className="flex flex-wrap justify-center gap-1">
                        {p.variants.map(v => (
                          <span key={v.id} className="px-2 py-0.5 rounded bg-white/5 text-[11px] text-slate-300">
                            {v.ram}/{v.storage}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                  {compareList.length < 3 && <td className="p-4 border-l border-white/5" />}
                </tr>

                {/* 9. Water & Dust Ingress Protection */}
                <tr className="hover:bg-white/[0.02]">
                  <td className="p-4 font-semibold text-slate-300 sticky left-0 bg-slate-950/95 z-10">Durability / IP Rating</td>
                  {compareList.map(p => (
                    <td key={p.id} className="p-4 border-l border-white/5 text-center font-medium text-slate-200">
                      {p.specifications.build_dimensions?.ip_rating || 'IP54 Splash Resistant'}
                    </td>
                  ))}
                  {compareList.length < 3 && <td className="p-4 border-l border-white/5" />}
                </tr>

              </tbody>

            </table>
          </div>

        </div>
      )}

      {/* Product Selection Picker Modal */}
      {pickerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl glass-panel border border-white/10 p-6 space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white">Select Smartphone to Compare</h3>
              <button
                type="button"
                onClick={() => setPickerOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {phoneProducts.map(prod => {
                const alreadyIn = compareList.some(p => p.id === prod.id);
                const img = prod.images[0]?.image_url;
                const price = prod.variants[0]?.selling_price || 0;

                return (
                  <div
                    key={prod.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl bg-slate-900 overflow-hidden flex-shrink-0">
                        <Image src={img} alt={prod.name} fill className="object-contain" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{prod.name}</h4>
                        <p className="text-xs text-vivo-400 font-semibold">{formatPrice(price)}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={alreadyIn}
                      onClick={() => {
                        addToCompare(prod);
                        setPickerOpen(false);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                        alreadyIn
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          : 'bg-vivo-600 hover:bg-vivo-500 text-white'
                      }`}
                    >
                      {alreadyIn ? 'Added' : 'Compare This'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
