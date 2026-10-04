'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/store-context';
import { formatPrice, formatDateTime, getStatusBadgeConfig } from '@/lib/utils/formatters';
import { StockMovementReason } from '@/lib/types';
import { 
  Boxes, 
  Truck, 
  PlusCircle, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw, 
  History, 
  ArrowUpRight, 
  ArrowDownRight,
  Search,
  X
} from 'lucide-react';

export default function AdminInventoryPage() {
  const { 
    products, 
    stockMovements, 
    incomingStockList, 
    receiveIncomingStock, 
    updateVariantStock, 
    addIncomingStock 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'current' | 'incoming' | 'history'>('current');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal States
  const [adjustModalOpen, setAdjustModalOpen] = useState(false);
  const [incomingModalOpen, setIncomingModalOpen] = useState(false);

  // Adjustment form state
  const [adjustData, setAdjustData] = useState<{
    productId: string;
    variantId: string;
    newStock: number;
    reason: StockMovementReason;
    notes: string;
  }>({
    productId: '',
    variantId: '',
    newStock: 0,
    reason: 'sold_in_store',
    notes: '',
  });

  // Incoming form state
  const [incomingData, setIncomingData] = useState({
    variantId: '',
    quantity: 5,
    supplier: 'VIVO India Official Distribution',
    expectedDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    referenceNo: `PO-${Date.now().toString().slice(-5)}`,
    notes: 'Standard stock replenishment',
  });

  // Flattened Variants with Product info
  const allVariantsWithProd = products.flatMap(prod =>
    prod.variants.map(v => ({
      ...v,
      productName: prod.name,
      productId: prod.id,
      brandName: prod.brand?.name || 'VIVO',
      isPhone: prod.is_phone,
    }))
  );

  const filteredVariants = allVariantsWithProd.filter(v => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!v.productName.toLowerCase().includes(q) && !v.sku.toLowerCase().includes(q) && !v.color.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (statusFilter !== 'all' && v.computed_status !== statusFilter) {
      return false;
    }
    return true;
  });

  const handleAdjustSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustData.productId || !adjustData.variantId) return;

    updateVariantStock(
      adjustData.productId,
      adjustData.variantId,
      Number(adjustData.newStock),
      adjustData.reason,
      adjustData.notes
    );

    setAdjustModalOpen(false);
  };

  const handleIncomingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incomingData.variantId) return;

    const targetVar = allVariantsWithProd.find(v => v.id === incomingData.variantId);
    if (!targetVar) return;

    addIncomingStock({
      variant_id: incomingData.variantId,
      product_name: targetVar.productName,
      variant_label: `${targetVar.ram || ''} ${targetVar.storage || ''} ${targetVar.color}`.trim(),
      incoming_quantity: Number(incomingData.quantity),
      supplier: incomingData.supplier,
      expected_arrival_date: incomingData.expectedDate,
      reference_no: incomingData.referenceNo,
      notes: incomingData.notes,
    });

    setIncomingModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-display">Inventory & Stock Control</h1>
          <p className="text-xs text-slate-500">Manage real-time physical store stock, incoming shipments, and audit trails.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              if (allVariantsWithProd.length > 0) {
                const first = allVariantsWithProd[0];
                setAdjustData({
                  productId: first.productId,
                  variantId: first.id,
                  newStock: first.current_stock,
                  reason: 'manual_adjustment',
                  notes: '',
                });
                setAdjustModalOpen(true);
              }
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold shadow-sm transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Adjust Stock Level</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (allVariantsWithProd.length > 0) {
                setIncomingData({
                  ...incomingData,
                  variantId: allVariantsWithProd[0].id,
                });
                setIncomingModalOpen(true);
              }
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-vivo-600 hover:bg-vivo-700 text-white text-xs font-semibold shadow-sm transition-all"
          >
            <Truck className="w-3.5 h-3.5" />
            <span>+ Add Incoming Shipment</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4 text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('current')}
          className={`pb-3 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'current' ? 'text-vivo-600 border-b-2 border-vivo-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Boxes className="w-4 h-4" />
          <span>Current Stock Levels ({allVariantsWithProd.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('incoming')}
          className={`pb-3 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'incoming' ? 'text-sky-600 border-b-2 border-sky-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Incoming Shipments ({incomingStockList.filter(i => i.status === 'PENDING').length} Pending)</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'history' ? 'text-indigo-600 border-b-2 border-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Stock Movement Audit Trail ({stockMovements.length})</span>
        </button>
      </div>

      {/* Tab 1: Current Stock Levels */}
      {activeTab === 'current' && (
        <div className="space-y-4">
          
          {/* Filters */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by model, SKU or color..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-vivo-600 focus:bg-white transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-600 font-medium">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 text-xs focus:outline-none focus:border-vivo-600 focus:bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="IN_STOCK">In Stock</option>
                <option value="LOW_STOCK">Low Stock (Alert)</option>
                <option value="COMING_SOON">Coming Soon</option>
                <option value="OUT_OF_STOCK">Out of Stock</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">SKU / Model</th>
                    <th className="p-4">Variant (RAM/Storage/Color)</th>
                    <th className="p-4">Current Stock</th>
                    <th className="p-4">Low Stock Alert</th>
                    <th className="p-4">Incoming Stock</th>
                    <th className="p-4">Computed Status</th>
                    <th className="p-4 text-right">Quick Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredVariants.map(v => {
                    const statusConfig = getStatusBadgeConfig(v.computed_status);

                    return (
                      <tr key={v.id} className="hover:bg-slate-50/70 transition-colors">
                        
                        <td className="p-4">
                          <p className="font-bold text-slate-900 text-sm">{v.productName}</p>
                          <p className="text-[11px] text-vivo-600 font-mono">{v.sku}</p>
                        </td>

                        <td className="p-4 text-slate-700">
                          <span className="font-semibold text-slate-900">
                            {v.ram ? `${v.ram}/` : ''}{v.storage || ''} {v.color}
                          </span>
                        </td>

                        <td className="p-4">
                          <span className={`text-base font-extrabold ${
                            v.current_stock === 0 ? 'text-red-600' : v.current_stock <= v.low_stock_threshold ? 'text-amber-600' : 'text-emerald-600'
                          }`}>
                            {v.current_stock}
                          </span>
                          <span className="text-slate-500 text-[11px]"> units</span>
                        </td>

                        <td className="p-4 text-slate-600">
                          ≤ {v.low_stock_threshold} units
                        </td>

                        <td className="p-4">
                          {v.incoming_stock > 0 ? (
                            <span className="text-sky-700 font-bold text-xs">
                              +{v.incoming_stock} (Due: {v.expected_arrival_date || 'Soon'})
                            </span>
                          ) : (
                            <span className="text-slate-400">0</span>
                          )}
                        </td>

                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} ${statusConfig.animate ? 'pulse-badge-dot' : ''}`} />
                            {statusConfig.label}
                          </span>
                        </td>

                        <td className="p-4 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              setAdjustData({
                                productId: v.productId,
                                variantId: v.id,
                                newStock: v.current_stock,
                                reason: 'manual_adjustment',
                                notes: '',
                              });
                              setAdjustModalOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-[11px] font-medium transition-colors"
                          >
                            Update Stock
                          </button>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Incoming Shipments */}
      {activeTab === 'incoming' && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">PO / Reference</th>
                    <th className="p-4">Product & Variant</th>
                    <th className="p-4">Supplier</th>
                    <th className="p-4">Incoming Quantity</th>
                    <th className="p-4">Expected Arrival</th>
                    <th className="p-4">Shipment Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {incomingStockList.map(ship => (
                    <tr key={ship.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4 font-mono text-sky-700 font-bold">{ship.reference_no || 'N/A'}</td>
                      <td className="p-4">
                        <p className="font-bold text-slate-900">{ship.product_name}</p>
                        <p className="text-[11px] text-slate-500">{ship.variant_label}</p>
                      </td>
                      <td className="p-4 text-slate-700">{ship.supplier}</td>
                      <td className="p-4">
                        <span className="text-base font-extrabold text-sky-700">+{ship.incoming_quantity}</span>
                      </td>
                      <td className="p-4 text-slate-700 font-semibold">{ship.expected_arrival_date}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          ship.status === 'RECEIVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'
                        }`}>
                          {ship.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {ship.status === 'PENDING' ? (
                          <button
                            type="button"
                            onClick={() => receiveIncomingStock(ship.id)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-all"
                          >
                            ✓ Receive Stock
                          </button>
                        ) : (
                          <span className="text-slate-500 text-[11px]">Received {formatDateTime(ship.received_at)}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Stock Movement Audit History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Timestamp</th>
                    <th className="p-4">Product & Variant</th>
                    <th className="p-4">Movement (+ / -)</th>
                    <th className="p-4">Previous → New Stock</th>
                    <th className="p-4">Reason Code</th>
                    <th className="p-4">Authorized Admin</th>
                    <th className="p-4">Notes</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {stockMovements.map(sm => (
                    <tr key={sm.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4 text-slate-500 whitespace-nowrap">{formatDateTime(sm.created_at)}</td>
                      <td className="p-4">
                        <p className="font-bold text-slate-900">{sm.product_name}</p>
                        <p className="text-[11px] text-slate-500">{sm.variant_label}</p>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          sm.quantity_change > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {sm.quantity_change > 0 ? `+${sm.quantity_change}` : sm.quantity_change}
                        </span>
                      </td>
                      <td className="p-4 text-slate-700 font-semibold">
                        {sm.previous_stock} → <strong className="text-slate-900">{sm.new_stock}</strong>
                      </td>
                      <td className="p-4">
                        <span className="capitalize text-slate-800">{sm.reason.replace(/_/g, ' ')}</span>
                      </td>
                      <td className="p-4 text-slate-600">{sm.admin_email}</td>
                      <td className="p-4 text-slate-500 italic max-w-xs truncate">{sm.notes || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Adjust Stock Level Modal */}
      {adjustModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Adjust Stock Level</h3>
              <button
                type="button"
                onClick={() => setAdjustModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdjustSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-700 font-medium">Select Product Variant *</label>
                <select
                  value={adjustData.variantId}
                  onChange={(e) => {
                    const sel = allVariantsWithProd.find(v => v.id === e.target.value);
                    if (sel) {
                      setAdjustData({
                        ...adjustData,
                        variantId: sel.id,
                        productId: sel.productId,
                        newStock: sel.current_stock,
                      });
                    }
                  }}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-vivo-600 focus:bg-white"
                >
                  {allVariantsWithProd.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.productName} ({v.ram ? `${v.ram}/` : ''}{v.storage || ''} {v.color}) — Current: {v.current_stock}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-medium">New Current Physical Stock (Units) *</label>
                <input
                  type="number"
                  min="0"
                  inputMode="numeric"
                  required
                  placeholder="0"
                  value={adjustData.newStock === 0 ? '' : adjustData.newStock}
                  onChange={(e) => setAdjustData({ ...adjustData, newStock: e.target.value === '' ? 0 : Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-base text-emerald-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none focus:border-vivo-600 focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-medium">Reason Code for Audit Log *</label>
                <select
                  value={adjustData.reason}
                  onChange={(e) => setAdjustData({ ...adjustData, reason: e.target.value as StockMovementReason })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-vivo-600 focus:bg-white"
                >
                  <option value="sold_in_store">Sold in Store (Customer Purchase)</option>
                  <option value="stock_received">Stock Received from Supplier</option>
                  <option value="manual_adjustment">Manual Physical Audit Adjustment</option>
                  <option value="damaged">Damaged / Display Unit</option>
                  <option value="returned">Customer / Supplier Return</option>
                  <option value="correction">Inventory Entry Correction</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-medium">Notes / Invoice Ref</label>
                <input
                  type="text"
                  placeholder="e.g. Physical count discrepancy verified"
                  value={adjustData.notes}
                  onChange={(e) => setAdjustData({ ...adjustData, notes: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-vivo-600 focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAdjustModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-vivo-600 hover:bg-vivo-700 text-white font-bold shadow-sm transition-all"
                >
                  Save Stock & Record Movement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Incoming Shipment Modal */}
      {incomingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Record Incoming Shipment</h3>
              <button
                type="button"
                onClick={() => setIncomingModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleIncomingSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-700 font-medium">Target Phone / Accessory Variant *</label>
                <select
                  value={incomingData.variantId}
                  onChange={(e) => setIncomingData({ ...incomingData, variantId: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-vivo-600 focus:bg-white"
                >
                  {allVariantsWithProd.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.productName} ({v.ram ? `${v.ram}/` : ''}{v.storage || ''} {v.color})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-700 font-medium">Quantity *</label>
                  <input
                    type="number"
                    min="1"
                    inputMode="numeric"
                    required
                    placeholder="1"
                    value={incomingData.quantity === 0 ? '' : incomingData.quantity}
                    onChange={(e) => setIncomingData({ ...incomingData, quantity: e.target.value === '' ? 0 : Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sky-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none focus:border-vivo-600 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-700 font-medium">Expected Arrival Date *</label>
                  <input
                    type="date"
                    required
                    value={incomingData.expectedDate}
                    onChange={(e) => setIncomingData({ ...incomingData, expectedDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-vivo-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-medium">Supplier *</label>
                <input
                  type="text"
                  required
                  value={incomingData.supplier}
                  onChange={(e) => setIncomingData({ ...incomingData, supplier: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-vivo-600 focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-medium">Purchase Order / Reference No</label>
                <input
                  type="text"
                  value={incomingData.referenceNo}
                  onChange={(e) => setIncomingData({ ...incomingData, referenceNo: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-vivo-600 focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIncomingModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-sm transition-all"
                >
                  Save Incoming Shipment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
