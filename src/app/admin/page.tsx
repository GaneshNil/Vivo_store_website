'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store/store-context';
import { formatPrice, formatDateTime, getStatusBadgeConfig } from '@/lib/utils/formatters';
import { 
  Smartphone, 
  Boxes, 
  AlertTriangle, 
  Truck, 
  ArrowUpRight, 
  ArrowDownRight, 
  PlusCircle, 
  Tag, 
  Clock, 
  Sparkles, 
  Bell, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { 
    products, 
    stockMovements, 
    priceHistory, 
    incomingStockList, 
    offers,
    receiveIncomingStock
  } = useStore();

  const phones = products.filter(p => p.is_phone);
  const accessories = products.filter(p => !p.is_phone);
  const allVariants = products.flatMap(p => p.variants);

  const inStockCount = allVariants.filter(v => v.computed_status === 'IN_STOCK').length;
  const lowStockCount = allVariants.filter(v => v.computed_status === 'LOW_STOCK').length;
  const outOfStockCount = allVariants.filter(v => v.computed_status === 'OUT_OF_STOCK').length;
  const comingSoonCount = allVariants.filter(v => v.computed_status === 'COMING_SOON').length;

  const pendingIncoming = incomingStockList.filter(i => i.status === 'PENDING');
  const activeOffersCount = offers.filter(o => o.is_active).length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Top Welcome & Quick Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Store Management Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time showroom catalog, active offers & schemes, stock movements, pricing rules & incoming shipments.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/products"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-vivo-600 hover:bg-vivo-700 text-white text-xs font-semibold shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Product</span>
          </Link>

          <Link
            href="/admin/offers"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Store Schemes</span>
          </Link>

          <Link
            href="/admin/inventory"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all"
          >
            <Truck className="w-4 h-4" />
            <span>Receive Stock</span>
          </Link>

          <Link
            href="/admin/prices"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold shadow-sm transition-all"
          >
            <Tag className="w-4 h-4 text-amber-500" />
            <span>Pricing & MRPs</span>
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        {/* Total Products */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Total Catalog</span>
            <Smartphone className="w-4 h-4 text-vivo-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900 font-display">{products.length}</p>
          <p className="text-[11px] text-slate-500">{phones.length} Phones · {accessories.length} Acc</p>
        </div>

        {/* In Stock */}
        <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-emerald-700 font-medium">
            <span>In Stock</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-emerald-700 font-display">{inStockCount}</p>
          <p className="text-[11px] text-emerald-600">Variants available</p>
        </div>

        {/* Low Stock Alerts */}
        <div className={`p-5 rounded-2xl border shadow-sm space-y-2 ${
          lowStockCount > 0 ? 'border-amber-300 bg-amber-50/60' : 'border-slate-200 bg-white'
        }`}>
          <div className="flex items-center justify-between text-xs text-amber-800 font-medium">
            <span>Low Stock Alert</span>
            <AlertTriangle className="w-4 h-4 text-amber-600 animate-pulse" />
          </div>
          <p className="text-2xl font-bold text-amber-800 font-display">{lowStockCount}</p>
          <p className="text-[11px] text-amber-700">Need replenishment</p>
        </div>

        {/* Out of Stock */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Out of Stock</span>
            <Boxes className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-bold text-slate-800 font-display">{outOfStockCount}</p>
          <p className="text-[11px] text-slate-500">Zero inventory</p>
        </div>

        {/* Coming Soon */}
        <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-blue-700 font-medium">
            <span>Coming Soon</span>
            <Truck className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-700 font-display">{comingSoonCount}</p>
          <p className="text-[11px] text-blue-600">{pendingIncoming.length} shipments inbound</p>
        </div>

        {/* Live Store Offers & Schemes */}
        <Link 
          href="/admin/offers"
          className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200 shadow-sm space-y-2 hover:border-amber-300 hover:shadow transition-all block group"
        >
          <div className="flex items-center justify-between text-xs text-amber-800 font-medium">
            <span>Store Schemes</span>
            <Sparkles className="w-4 h-4 text-amber-600 group-hover:rotate-12 transition-transform" />
          </div>
          <p className="text-2xl font-bold text-amber-800 font-display">{activeOffersCount}</p>
          <p className="text-[11px] text-amber-700">Active promotions →</p>
        </Link>

      </div>

      {/* Pending Incoming Shipments Action Strip */}
      {pendingIncoming.length > 0 && (
        <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-sky-800 uppercase tracking-wider flex items-center gap-2">
              <Truck className="w-4 h-4 text-sky-600" />
              <span>Pending Incoming Stock Shipments ({pendingIncoming.length})</span>
            </h3>
            <Link href="/admin/inventory" className="text-xs font-semibold text-sky-700 hover:underline">
              Manage in Inventory →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pendingIncoming.map(shipment => (
              <div
                key={shipment.id}
                className="p-3.5 rounded-xl bg-white border border-sky-200/80 shadow-xs flex items-center justify-between gap-4"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{shipment.product_name}</h4>
                  <p className="text-[11px] text-slate-600">
                    Variant: <span className="text-slate-800 font-medium">{shipment.variant_label}</span> · Qty: <strong className="text-sky-700">+{shipment.incoming_quantity}</strong>
                  </p>
                  <p className="text-[10px] text-slate-500">Supplier: {shipment.supplier} (Expected: {shipment.expected_arrival_date})</p>
                </div>

                <button
                  type="button"
                  onClick={() => receiveIncomingStock(shipment.id)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all flex-shrink-0 shadow-sm"
                >
                  ✓ Receive Stock
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Two-Column Activity Feeds: Stock Movements & Price History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Recent Stock Movements (Live Audit Trail) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
              <Boxes className="w-4 h-4 text-vivo-600" />
              <span>Recent Stock Movements</span>
            </h3>
            <Link href="/admin/inventory" className="text-xs font-semibold text-vivo-600 hover:underline">
              View All Movements →
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm divide-y divide-slate-100 space-y-2">
            {stockMovements.slice(0, 5).map(sm => (
              <div key={sm.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{sm.product_name}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      sm.quantity_change > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {sm.quantity_change > 0 ? `+${sm.quantity_change}` : sm.quantity_change}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">{sm.variant_label} · Reason: <span className="capitalize">{sm.reason.replace(/_/g, ' ')}</span></p>
                  <p className="text-[10px] text-slate-500">{formatDateTime(sm.created_at)} by {sm.admin_email}</p>
                </div>

                <div className="text-right text-xs">
                  <span className="text-slate-500">{sm.previous_stock} → <strong className="text-slate-900 font-bold">{sm.new_stock}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Recent Price History & Audits */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span>Recent Price Changes</span>
            </h3>
            <Link href="/admin/prices" className="text-xs font-semibold text-amber-600 hover:underline">
              Price Management →
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm divide-y divide-slate-100 space-y-2">
            {priceHistory.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No price changes recorded yet.</p>
            ) : (
              priceHistory.slice(0, 5).map(ph => (
                <div key={ph.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900">{ph.product_name}</p>
                    <p className="text-[11px] text-slate-600">{ph.variant_label}</p>
                    <p className="text-[10px] text-slate-500">{formatDateTime(ph.created_at)} · {ph.reason}</p>
                  </div>

                  <div className="text-right text-xs space-y-0.5">
                    <p className="text-slate-500 line-through">{formatPrice(ph.old_selling_price)}</p>
                    <p className="font-bold text-emerald-700 text-sm">{formatPrice(ph.new_selling_price)}</p>
                    <span className="text-[10px] font-semibold text-amber-700">Save {Math.round(ph.new_discount)}%</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
