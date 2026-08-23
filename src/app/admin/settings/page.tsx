'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/store-context';
import { StoreSettings } from '@/lib/types';
import { Settings, Save, CheckCircle2, MapPin, Phone, Mail, Clock, CreditCard } from 'lucide-react';
import { fireConfetti } from '@/lib/utils/confetti';

export default function AdminSettingsPage() {
  const { storeSettings, updateStoreSettings } = useStore();
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
          <h1 className="text-2xl font-extrabold text-white font-display">Store Settings & Information</h1>
          <p className="text-xs text-slate-400">Configure physical showroom location, contact numbers, hours & payment methods.</p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Store settings updated successfully and synchronized with customer showroom!</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-6 text-xs">
        
        {/* Store Name & Tagline */}
        <div className="space-y-4">
          <h3 className="font-bold text-white uppercase tracking-wider text-xs flex items-center gap-2">
            <Settings className="w-4 h-4 text-vivo-400" /> General Store Info
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Store Business Name *</label>
              <input
                type="text"
                required
                value={formData.store_name}
                onChange={(e) => setFormData({ ...formData, store_name: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Primary Brand Partner</label>
              <input
                type="text"
                value={formData.primary_brand}
                onChange={(e) => setFormData({ ...formData, primary_brand: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-medium">Store Tagline / Slogan</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white"
            />
          </div>
        </div>

        {/* Physical Address Details */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <h3 className="font-bold text-white uppercase tracking-wider text-xs flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400" /> Physical Showroom Address
          </h3>

          <div className="space-y-1">
            <label className="text-slate-300 font-medium">Street Address / Market *</label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="space-y-1">
              <label className="text-slate-400">Landmark</label>
              <input
                type="text"
                value={formData.landmark}
                onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                className="w-full p-2 rounded-lg bg-slate-900 border border-white/10 text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-400">Taluka</label>
              <input
                type="text"
                value={formData.taluka}
                onChange={(e) => setFormData({ ...formData, taluka: e.target.value })}
                className="w-full p-2 rounded-lg bg-slate-900 border border-white/10 text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-400">District</label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full p-2 rounded-lg bg-slate-900 border border-white/10 text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-400">PIN Code</label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="w-full p-2 rounded-lg bg-slate-900 border border-white/10 text-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-medium">Google Maps URL</label>
            <input
              type="text"
              value={formData.google_maps_url}
              onChange={(e) => setFormData({ ...formData, google_maps_url: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-mono text-[11px]"
            />
          </div>
        </div>

        {/* Contact & Hours */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <h3 className="font-bold text-white uppercase tracking-wider text-xs flex items-center gap-2">
            <Phone className="w-4 h-4 text-cyan-400" /> Contact & Operating Timings
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Phone Number *</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">WhatsApp Number *</label>
              <input
                type="text"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-bold text-emerald-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Store Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 font-medium">Operating Hours (e.g. 10:00 AM – 09:00 PM) *</label>
            <input
              type="text"
              required
              value={formData.hours}
              onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white"
            />
          </div>
        </div>

        {/* In-Store Payment Facilities */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <h3 className="font-bold text-white uppercase tracking-wider text-xs flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-amber-400" /> In-Store Payment Facilities
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.payment_methods.bajaj_finance_emi}
                onChange={(e) => setFormData({
                  ...formData,
                  payment_methods: { ...formData.payment_methods, bajaj_finance_emi: e.target.checked }
                })}
                className="rounded bg-slate-900 border-white/10 text-vivo-500"
              />
              <span className="text-slate-200 font-medium">Bajaj Finance 0% EMI</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.payment_methods.card_payments}
                onChange={(e) => setFormData({
                  ...formData,
                  payment_methods: { ...formData.payment_methods, card_payments: e.target.checked }
                })}
                className="rounded bg-slate-900 border-white/10 text-vivo-500"
              />
              <span className="text-slate-200 font-medium">Credit & Debit Cards</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.payment_methods.home_credit}
                onChange={(e) => setFormData({
                  ...formData,
                  payment_methods: { ...formData.payment_methods, home_credit: e.target.checked }
                })}
                className="rounded bg-slate-900 border-white/10 text-vivo-500"
              />
              <span className="text-slate-200 font-medium">Home Credit Finance</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.payment_methods.upi}
                onChange={(e) => setFormData({
                  ...formData,
                  payment_methods: { ...formData.payment_methods, upi: e.target.checked }
                })}
                className="rounded bg-slate-900 border-white/10 text-vivo-500"
              />
              <span className="text-slate-200 font-medium">UPI / QR Code</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.payment_methods.cash}
                onChange={(e) => setFormData({
                  ...formData,
                  payment_methods: { ...formData.payment_methods, cash: e.target.checked }
                })}
                className="rounded bg-slate-900 border-white/10 text-vivo-500"
              />
              <span className="text-slate-200 font-medium">Cash Payment</span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-vivo-600 hover:bg-vivo-500 text-white font-bold text-xs shadow-glow-blue transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Configuration</span>
          </button>
        </div>

      </form>

    </div>
  );
}
