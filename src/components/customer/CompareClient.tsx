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

export function CompareClient() {
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
      <div className="relative rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-vivo-50/60 to-transparent pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-vivo-600 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>SIDE-BY-SIDE SPECIFICATION MATRIX</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Phone Comparison
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Compare camera optics, battery capacity, fast charging, processor speed, and in-store pricing.
            </p>
          </div>

          {compareList.length > 0 && (
            <button
              type="button"
              onClick={clearCompare}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-red-600 border border-slate-200 text-xs font-semibold shadow-2xs transition-all"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
              <span>Clear All Devices</span>
            </button>
          )}
        </div>
      </div>

      {compareList.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
          <div className="p-4 rounded-2xl bg-vivo-50 text-vivo-600 border border-vivo-200 w-16 h-16 mx-auto flex items-center justify-center">
            <Layers className="w-8 h-8" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-slate-900">No Phones in Comparison Matrix</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Add up to 3 phones from our smartphone collection to view a comprehensive side-by-side spec and gauge breakdown.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            className="px-6 py-3 rounded-xl bg-vivo-600 hover:bg-vivo-700 text-white text-xs font-bold shadow-2xs transition-all"
          >
            + Select Phones to Compare
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Comparison Matrix Table */}
          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs border-collapse">
              
              {/* Sticky Top Header: Phone Images, Names & Prices */}
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="p-5 font-bold text-slate-700 uppercase tracking-wider w-48 sticky left-0 bg-slate-50 z-20 border-r border-slate-200">
                    Specification
                  </th>
                  {compareList.map((prod) => {
                    const activeVar = prod.variants[0];
                    const statusConfig = getStatusBadgeConfig(activeVar?.computed_status || 'IN_STOCK');
                    const img = prod.images.find(i => i.is_primary)?.image_url || prod.images[0]?.image_url;

                    return (
                      <th key={prod.id} className="p-5 w-72 min-w-[260px] align-top text-center relative border-l border-slate-200">
                        <button
                          type="button"
                          onClick={() => removeFromCompare(prod.id)}
                          className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-red-500 bg-white hover:bg-red-50 rounded-lg border border-slate-200 transition-colors shadow-2xs"
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
                          <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{prod.name}</h4>
                          <p className="text-base font-extrabold text-vivo-600">{formatPrice(activeVar?.selling_price || 0)}</p>
                        </div>

                        <div className="mt-3">
                          <Link
                            href={`/product/${prod.slug}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-vivo-600 text-slate-700 hover:text-white text-[11px] font-semibold transition-all border border-slate-200 shadow-2xs"
                          >
                            <MapPin className="w-3 h-3" />
                            <span>In-Store Details</span>
                          </Link>
                        </div>
                      </th>
                    );
                  })}

                  {compareList.length < 3 && (
                    <th className="p-5 w-72 min-w-[240px] text-center border-l border-slate-200 bg-slate-50/50">
                      <button
                        type="button"
                        onClick={() => setPickerOpen(true)}
                        className="h-44 w-full rounded-2xl border-2 border-dashed border-slate-300 hover:border-vivo-500 flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-vivo-600 transition-all group bg-white"
                      >
                        <Plus className="w-8 h-8 group-hover:scale-110 transition-transform text-vivo-600" />
                        <span className="text-xs font-semibold">Add Phone to Compare</span>
                      </button>
                    </th>
                  )}
                </tr>
              </thead>

              {/* Specification Rows */}
              <tbody className="divide-y divide-slate-100">
                
                {/* 1. Brand & Series */}
                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white z-10 border-r border-slate-100">Brand & Series</td>
                  {compareList.map(p => (
                    <td key={p.id} className="p-4 border-l border-slate-100 text-slate-800 text-center font-semibold">
                      {p.brand?.name} {p.series?.name ? `(${p.series.name})` : ''}
                    </td>
                  ))}
                  {compareList.length < 3 && <td className="p-4 border-l border-slate-100" />}
                </tr>

                {/* 2. Battery Capacity (With Gauge) */}
                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white z-10 border-r border-slate-100">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                      <Battery className="w-4 h-4 text-emerald-600" />
                      <span>Battery Capacity</span>
                    </div>
                  </td>
                  {compareList.map(p => {
                    const specs = (p.specifications || {}) as any;
                    const cap = specs.battery_charging?.capacity || specs.battery || specs.battery_capacity || '5000 mAh';
                    const gauge = getBatteryGauge(String(cap));
                    return (
                      <td key={p.id} className="p-4 border-l border-slate-100 text-center space-y-2">
                        <span className="font-extrabold text-slate-900 text-sm">{String(cap)}</span>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/60">
                          <div
                            className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${gauge}%` }}
                          />
                        </div>
                      </td>
                    );
                  })}
                  {compareList.length < 3 && <td className="p-4 border-l border-slate-100" />}
                </tr>

                {/* 3. Fast Charging Wattage (With Gauge) */}
                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white z-10 border-r border-slate-100">
                    <div className="flex items-center gap-1.5 text-amber-800 font-bold">
                      <Zap className="w-4 h-4 text-amber-600" />
                      <span>Charging Speed</span>
                    </div>
                  </td>
                  {compareList.map(p => {
                    const specs = (p.specifications || {}) as any;
                    const spd = specs.battery_charging?.charging_speed || specs.charging || specs.charging_speed || '44W FlashCharge';
                    const gauge = getChargingGauge(String(spd));
                    return (
                      <td key={p.id} className="p-4 border-l border-slate-100 text-center space-y-2">
                        <span className="font-extrabold text-slate-900">{String(spd)}</span>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/60">
                          <div
                            className="bg-amber-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${gauge}%` }}
                          />
                        </div>
                      </td>
                    );
                  })}
                  {compareList.length < 3 && <td className="p-4 border-l border-slate-100" />}
                </tr>

                {/* 4. Display & Refresh Rate */}
                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white z-10 border-r border-slate-100">Display</td>
                  {compareList.map(p => {
                    const specs = (p.specifications || {}) as any;
                    const disp = specs.display;
                    const dispSize = typeof disp === 'string' ? disp : (disp?.size || disp?.screen_size || specs.screen_size || '6.7 inches');
                    const dispSub = typeof disp === 'object' ? [disp?.resolution, disp?.refresh_rate].filter(Boolean).join(' · ') : '';
                    return (
                      <td key={p.id} className="p-4 border-l border-slate-100 text-center space-y-1">
                        <p className="font-bold text-slate-900">{dispSize}</p>
                        {dispSub && <p className="text-slate-500 text-[11px]">{dispSub}</p>}
                      </td>
                    );
                  })}
                  {compareList.length < 3 && <td className="p-4 border-l border-slate-100" />}
                </tr>

                {/* 5. Primary Rear Camera */}
                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white z-10 border-r border-slate-100">
                    <div className="flex items-center gap-1.5 text-vivo-700 font-bold">
                      <Camera className="w-4 h-4 text-vivo-600" />
                      <span>Rear Camera System</span>
                    </div>
                  </td>
                  {compareList.map(p => {
                    const specs = (p.specifications || {}) as any;
                    const cam = specs.camera;
                    const rearMain = typeof cam === 'string' ? cam : (cam?.rear_main || specs.rear_primary || '50 MP OIS');
                    const hasZeiss = typeof cam === 'object' && cam?.zeiss_optics;
                    return (
                      <td key={p.id} className="p-4 border-l border-slate-100 text-center space-y-1">
                        <p className="font-bold text-slate-900">{rearMain}</p>
                        {hasZeiss && (
                          <span className="text-[10px] bg-vivo-50 text-vivo-700 border border-vivo-200 px-1.5 py-0.5 rounded font-semibold inline-block">
                            ZEISS Co-engineered Optics
                          </span>
                        )}
                      </td>
                    );
                  })}
                  {compareList.length < 3 && <td className="p-4 border-l border-slate-100" />}
                </tr>

                {/* 6. Front Selfie Camera */}
                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white z-10 border-r border-slate-100">Front Camera</td>
                  {compareList.map(p => {
                    const specs = (p.specifications || {}) as any;
                    const cam = specs.camera;
                    const front = typeof cam === 'object' ? (cam?.front_camera || specs.front_camera || '32 MP') : (specs.front_camera || '32 MP');
                    return (
                      <td key={p.id} className="p-4 border-l border-slate-100 text-center font-semibold text-slate-800">
                        {front}
                      </td>
                    );
                  })}
                  {compareList.length < 3 && <td className="p-4 border-l border-slate-100" />}
                </tr>

                {/* 7. Processor & Performance */}
                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white z-10 border-r border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                      <Cpu className="w-4 h-4 text-vivo-600" />
                      <span>Processor</span>
                    </div>
                  </td>
                  {compareList.map(p => {
                    const specs = (p.specifications || {}) as any;
                    const proc = specs.processor;
                    const chipset = typeof proc === 'string' ? proc : (proc?.chipset || specs.chipset || 'Octa-core 5G');
                    return (
                      <td key={p.id} className="p-4 border-l border-slate-100 text-center font-bold text-slate-900">
                        {chipset}
                      </td>
                    );
                  })}
                  {compareList.length < 3 && <td className="p-4 border-l border-slate-100" />}
                </tr>

                {/* 8. Available RAM & Storage Configurations */}
                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white z-10 border-r border-slate-100">Variants in Stock</td>
                  {compareList.map(p => (
                    <td key={p.id} className="p-4 border-l border-slate-100 text-center">
                      <div className="flex flex-wrap justify-center gap-1">
                        {p.variants.map(v => (
                          <span key={v.id} className="px-2 py-0.5 rounded bg-slate-100 text-[11px] text-slate-700 border border-slate-200 font-medium">
                            {v.ram ? `${v.ram}/` : ''}{v.storage || v.color}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                  {compareList.length < 3 && <td className="p-4 border-l border-slate-100" />}
                </tr>

                {/* 9. Water & Dust Ingress Protection */}
                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-bold text-slate-700 sticky left-0 bg-white z-10 border-r border-slate-100">Durability / IP Rating</td>
                  {compareList.map(p => {
                    const specs = (p.specifications || {}) as any;
                    const build = specs.build_dimensions;
                    const rating = typeof build === 'object' ? (build?.ip_rating || specs.ip_rating || 'IP54 Splash Resistant') : (specs.ip_rating || 'IP54 Splash Resistant');
                    return (
                      <td key={p.id} className="p-4 border-l border-slate-100 text-center font-semibold text-slate-800">
                        {rating}
                      </td>
                    );
                  })}
                  {compareList.length < 3 && <td className="p-4 border-l border-slate-100" />}
                </tr>

              </tbody>

            </table>
          </div>

        </div>
      )}

      {/* Product Selection Picker Modal */}
      {pickerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white border border-slate-200 p-6 space-y-4 max-h-[85vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Select Smartphone to Compare</h3>
              <button
                type="button"
                onClick={() => setPickerOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
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
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl bg-white border border-slate-200 overflow-hidden flex-shrink-0">
                        <Image src={img} alt={prod.name} fill className="object-contain p-1" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{prod.name}</h4>
                        <p className="text-xs text-vivo-600 font-bold">{formatPrice(price)}</p>
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
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-vivo-600 hover:bg-vivo-700 text-white shadow-2xs'
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

export default CompareClient;
