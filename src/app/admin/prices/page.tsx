'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/store-context';
import { formatPrice, formatDateTime } from '@/lib/utils/formatters';
import { Tag, TrendingUp, History, Sparkles, Check, Edit3, X } from 'lucide-react';

export default function AdminPricesPage() {
  const { products, priceHistory, updateVariantPrice, offers } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingVariant, setEditingVariant] = useState<{
    productId: string;
    variantId: string;
    productName: string;
    variantLabel: string;
    mrp: number;
    sellingPrice: number;
    reason: string;
  } | null>(null);

  const allVariantsWithProd = products.flatMap(prod =>
    prod.variants.map(v => ({
      ...v,
      productName: prod.name,
      productId: prod.id,
      brandName: prod.brand?.name || 'VIVO',
    }))
  );

  const filteredVariants = allVariantsWithProd.filter(v => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return v.productName.toLowerCase().includes(q) || v.sku.toLowerCase().includes(q);
    }
    return true;
  });

  const handlePriceUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVariant) return;

    updateVariantPrice(
      editingVariant.productId,
      editingVariant.variantId,
      Number(editingVariant.mrp),
      Number(editingVariant.sellingPrice),
      editingVariant.reason || 'Price adjustment by Admin'
    );

    setEditingVariant(null);
  };

  const previewDiscount = editingVariant && editingVariant.mrp > 0
    ? Math.max(0, (((editingVariant.mrp - editingVariant.sellingPrice) / editingVariant.mrp) * 100)).toFixed(2)
    : '0.00';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-display">Price & Discount Management</h1>
          <p className="text-xs text-slate-400">Manage MRPs, in-store selling prices, live discount percentages and price history.</p>
        </div>
      </div>

      {/* Main Pricing Table */}
      <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Tag className="w-4 h-4 text-amber-400" />
            <span>Active Product Pricing ({allVariantsWithProd.length} variants)</span>
          </h3>
          <input
            type="text"
            placeholder="Search variant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-1.5 px-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-900/90 border-b border-white/10 text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="p-4">Model & Variant</th>
                <th className="p-4">SKU</th>
                <th className="p-4">MRP (₹)</th>
                <th className="p-4">Selling Price (₹)</th>
                <th className="p-4">Computed Discount</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {filteredVariants.map(v => (
                <tr key={v.id} className="hover:bg-white/[0.02]">
                  <td className="p-4">
                    <p className="font-bold text-white text-sm">{v.productName}</p>
                    <p className="text-[11px] text-slate-400">{v.ram ? `${v.ram}/` : ''}{v.storage || ''} {v.color}</p>
                  </td>

                  <td className="p-4 font-mono text-slate-300">{v.sku}</td>

                  <td className="p-4 text-slate-400 font-semibold">{formatPrice(v.mrp)}</td>

                  <td className="p-4 text-emerald-400 font-bold text-sm">{formatPrice(v.selling_price)}</td>

                  <td className="p-4">
                    {v.discount_percent > 0 ? (
                      <span className="px-2 py-0.5 rounded-lg text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {v.discount_percent}% OFF
                      </span>
                    ) : (
                      <span className="text-slate-500">0%</span>
                    )}
                  </td>

                  <td className="p-4 text-right">
                    <button
                      type="button"
                      onClick={() => setEditingVariant({
                        productId: v.productId,
                        variantId: v.id,
                        productName: v.productName,
                        variantLabel: `${v.ram || ''} ${v.storage || ''} ${v.color}`.trim(),
                        mrp: v.mrp,
                        sellingPrice: v.selling_price,
                        reason: '',
                      })}
                      className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-colors"
                    >
                      Update Price
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historical Price Changes Table */}
      <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-white/10">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <History className="w-4 h-4 text-origin-violet" />
            <span>Price Audit History ({priceHistory.length})</span>
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-900/90 border-b border-white/10 text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Product & Variant</th>
                <th className="p-4">Previous Price → New Price</th>
                <th className="p-4">Discount % Change</th>
                <th className="p-4">Admin Email</th>
                <th className="p-4">Reason / Notes</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {priceHistory.map(ph => (
                <tr key={ph.id} className="hover:bg-white/[0.02]">
                  <td className="p-4 text-slate-400 whitespace-nowrap">{formatDateTime(ph.created_at)}</td>
                  <td className="p-4">
                    <p className="font-bold text-white">{ph.product_name}</p>
                    <p className="text-[11px] text-slate-400">{ph.variant_label}</p>
                  </td>
                  <td className="p-4">
                    <span className="text-slate-500 line-through mr-1">{formatPrice(ph.old_selling_price)}</span>
                    → <strong className="text-emerald-400 font-bold text-sm">{formatPrice(ph.new_selling_price)}</strong>
                  </td>
                  <td className="p-4 text-amber-300 font-semibold">
                    {ph.old_discount}% → {ph.new_discount}%
                  </td>
                  <td className="p-4 text-slate-400">{ph.admin_email}</td>
                  <td className="p-4 text-slate-300">{ph.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Price Modal */}
      {editingVariant && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl glass-panel border border-amber-500/40 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">Update Product Price</h3>
              <button
                type="button"
                onClick={() => setEditingVariant(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePriceUpdate} className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <p className="font-bold text-white">{editingVariant.productName}</p>
                <p className="text-slate-400">{editingVariant.variantLabel}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">MRP (₹) *</label>
                  <input
                    type="number"
                    min="0"
                    inputMode="numeric"
                    required
                    placeholder="e.g. 29999"
                    value={editingVariant.mrp === 0 ? '' : editingVariant.mrp}
                    onChange={(e) => setEditingVariant({ ...editingVariant, mrp: e.target.value === '' ? 0 : Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Selling Price (₹) *</label>
                  <input
                    type="number"
                    min="0"
                    inputMode="numeric"
                    required
                    placeholder="e.g. 24999"
                    value={editingVariant.sellingPrice === 0 ? '' : editingVariant.sellingPrice}
                    onChange={(e) => setEditingVariant({ ...editingVariant, sellingPrice: e.target.value === '' ? 0 : Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-bold text-emerald-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              {/* Live Computed Discount Preview */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
                <span className="text-amber-300 font-medium">Live Computed Discount:</span>
                <span className="text-base font-bold text-amber-300">{previewDiscount}% OFF</span>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Reason for Price Change *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Festive promotional price drop"
                  value={editingVariant.reason}
                  onChange={(e) => setEditingVariant({ ...editingVariant, reason: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingVariant(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-lg"
                >
                  Save & Log to Price History
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
