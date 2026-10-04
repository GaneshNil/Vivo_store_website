'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/store-context';
import { StoreSettings } from '@/lib/types';
import { Settings, Save, CheckCircle2, MapPin, Phone, Mail, Clock, CreditCard, Star } from 'lucide-react';
import { fireConfetti } from '@/lib/utils/confetti';

export default function AdminSettingsPage() {
  const { products, storeSettings, updateStoreSettings } = useStore();
  const [formData, setFormData] = useState<StoreSettings>(storeSettings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings(formData);
    setSavedSuccess(true);
    fireConfetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-display">Store Settings & Information</h1>
          <p className="text-xs text-slate-500">Configure physical showroom location, contact numbers, hours & payment methods.</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Store settings updated successfully and synchronized with customer showroom!</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-xs">
        
        {/* Store Name & Tagline */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs flex items-center gap-2">
            <Settings className="w-4 h-4 text-vivo-600" /> General Store Info
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-slate-700 font-medium">Store Business Name *</label>
              <input
                type="text"
                required
                value={formData.store_name}
                onChange={(e) => setFormData({ ...formData, store_name: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold focus:bg-white focus:border-vivo-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 font-medium">Primary Brand Partner</label>
              <input
                type="text"
                value={formData.primary_brand}
                onChange={(e) => setFormData({ ...formData, primary_brand: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-vivo-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-700 font-medium">Store Tagline / Slogan</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-vivo-600 focus:outline-none"
            />
          </div>

          {/* Hero Section Flagship Model Selector */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1.5">
            <label className="text-amber-900 font-bold flex items-center gap-1.5 text-xs">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Hero Section Flagship Showcase Phone Model</span>
            </label>
            <select
              value={formData.hero_flagship_product_id || ''}
              onChange={(e) => setFormData({ ...formData, hero_flagship_product_id: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-white border border-amber-200 text-slate-900 font-bold text-xs focus:border-amber-500 focus:outline-none"
            >
              {products.filter(p => p.is_phone).map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.brand?.name || 'VIVO'}) - Starting at ₹{p.variants[0]?.selling_price || 0}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-amber-800">
              Selected smartphone will be dynamically showcased with live specs, photography & price on the homepage hero section.
            </p>
          </div>
        </div>

        {/* Physical Address Details */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600" /> Physical Showroom Address
          </h3>

          <div className="space-y-1">
            <label className="text-slate-700 font-medium">Street Address / Market *</label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-vivo-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="space-y-1">
              <label className="text-slate-600">Landmark</label>
              <input
                type="text"
                value={formData.landmark}
                onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                className="w-full p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-vivo-600 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-600">Taluka</label>
              <input
                type="text"
                value={formData.taluka}
                onChange={(e) => setFormData({ ...formData, taluka: e.target.value })}
                className="w-full p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-vivo-600 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-600">District</label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-vivo-600 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-600">PIN Code</label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="w-full p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-vivo-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-700 font-medium">Google Maps URL</label>
            <input
              type="text"
              value={formData.google_maps_url}
              onChange={(e) => setFormData({ ...formData, google_maps_url: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-[11px] focus:bg-white focus:border-vivo-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Contact & Hours */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs flex items-center gap-2">
            <Phone className="w-4 h-4 text-sky-600" /> Contact & Operating Timings
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-slate-700 font-medium">Phone Number *</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold focus:bg-white focus:border-vivo-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 font-medium">WhatsApp Number *</label>
              <input
                type="text"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-emerald-700 focus:bg-white focus:border-vivo-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 font-medium">Store Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-vivo-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-700 font-medium">Operating Hours (e.g. 10:00 AM – 09:00 PM) *</label>
            <input
              type="text"
              required
              value={formData.hours}
              onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-vivo-600 focus:outline-none"
            />
          </div>
        </div>

        {/* In-Store Payment Facilities */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-amber-500" /> In-Store Payment Facilities
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={formData.payment_methods.bajaj_finance_emi}
                onChange={(e) => setFormData({
                  ...formData,
                  payment_methods: { ...formData.payment_methods, bajaj_finance_emi: e.target.checked }
                })}
                className="rounded border-slate-300 text-vivo-600"
              />
              <span className="text-slate-800 font-medium">Bajaj Finance EMI Available</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={formData.payment_methods.card_payments}
                onChange={(e) => setFormData({
                  ...formData,
                  payment_methods: { ...formData.payment_methods, card_payments: e.target.checked }
                })}
                className="rounded border-slate-300 text-vivo-600"
              />
              <span className="text-slate-800 font-medium">Credit & Debit Cards</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={formData.payment_methods.home_credit}
                onChange={(e) => setFormData({
                  ...formData,
                  payment_methods: { ...formData.payment_methods, home_credit: e.target.checked }
                })}
                className="rounded border-slate-300 text-vivo-600"
              />
              <span className="text-slate-800 font-medium">Home Credit Finance</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={formData.payment_methods.upi}
                onChange={(e) => setFormData({
                  ...formData,
                  payment_methods: { ...formData.payment_methods, upi: e.target.checked }
                })}
                className="rounded border-slate-300 text-vivo-600"
              />
              <span className="text-slate-800 font-medium">UPI / QR Code</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={formData.payment_methods.cash}
                onChange={(e) => setFormData({
                  ...formData,
                  payment_methods: { ...formData.payment_methods, cash: e.target.checked }
                })}
                className="rounded border-slate-300 text-vivo-600"
              />
              <span className="text-slate-800 font-medium">Cash Payment</span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-vivo-600 hover:bg-vivo-700 text-white font-bold text-xs shadow-sm transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Configuration</span>
          </button>
        </div>

      </form>

    </div>
  );
}
