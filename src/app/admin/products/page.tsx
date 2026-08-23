'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/lib/store/store-context';
import { formatPrice, getStatusBadgeConfig } from '@/lib/utils/formatters';
import { Product, ProductVariant } from '@/lib/types';
import { 
  Smartphone, 
  PlusCircle, 
  Search, 
  Filter, 
  Edit3, 
  EyeOff, 
  Eye, 
  Trash2, 
  Layers, 
  Check, 
  X, 
  Sparkles,
  Upload,
  AlertCircle
} from 'lucide-react';

export default function AdminProductsPage() {
  const { products, brands, categories, series, addProduct, updateProduct, deleteProduct } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedType, setSelectedType] = useState<'all' | 'phone' | 'accessory'>('all');
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    tagline: '',
    description: '',
    brand_id: brands[0]?.id || 'brand-vivo',
    category_id: categories[0]?.id || 'cat-smartphones',
    series_id: series[0]?.id || '',
    is_phone: true,
    is_featured: false,
    is_new_arrival: true,
    is_best_seller: false,
    warranty_info: '1 Year Brand Warranty',
    image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80',
    // Variant 1
    ram: '8GB',
    storage: '256GB',
    color: 'Titanium Blue',
    mrp: 34999,
    selling_price: 29999,
    current_stock: 5,
    low_stock_threshold: 2,
    sku: `PROD-${Date.now().toString().slice(-4)}`,
  });

  // Image Upload State
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setUploadError('');
    setUploadSuccess(false);

    try {
      const data = new FormData();
      data.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      if (!res.ok) {
        throw new Error('Failed to upload image to server storage');
      }

      const result = await res.json();
      if (result.url) {
        setFormData(prev => ({ ...prev, image_url: result.url }));
        setUploadSuccess(true);
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error uploading file';
      setUploadError(message);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const filteredProducts = products.filter(p => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.slug.toLowerCase().includes(q)) return false;
    }
    if (selectedBrand !== 'all' && p.brand_id !== selectedBrand) return false;
    if (selectedType === 'phone' && !p.is_phone) return false;
    if (selectedType === 'accessory' && p.is_phone) return false;
    return true;
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const brand = brands.find(b => b.id === formData.brand_id);
    const category = categories.find(c => c.id === formData.category_id);
    const ser = series.find(s => s.id === formData.series_id);

    const generatedSlug = formData.slug.trim() || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    addProduct({
      name: formData.name,
      slug: generatedSlug,
      tagline: formData.tagline,
      description: formData.description || `${formData.name} available at Galaxy Mobile Gallery.`,
      brand_id: formData.brand_id,
      brand,
      category_id: formData.category_id,
      category,
      series_id: formData.is_phone ? formData.series_id : null,
      series: formData.is_phone ? ser : null,
      is_phone: formData.is_phone,
      is_featured: formData.is_featured,
      is_new_arrival: formData.is_new_arrival,
      is_best_seller: formData.is_best_seller,
      is_active: true,
      warranty_info: formData.warranty_info,
      sort_order: 1,
      specifications: {
        display: { size: '6.7 inches', resolution: 'FHD+ AMOLED', refresh_rate: '120Hz' },
        camera: { rear_main: '50 MP OIS', front_camera: '32 MP' },
        processor: { chipset: 'Octa-core 5G Chipset' },
        battery_charging: { capacity: '5000 mAh', charging_speed: '44W FlashCharge' }
      },
      images: [
        {
          id: `img-${Date.now()}`,
          product_id: '',
          image_url: formData.image_url,
          alt_text: formData.name,
          view_type: 'front',
          is_primary: true,
          sort_order: 1,
        }
      ],
      variants: [
        {
          id: `var-${Date.now()}`,
          product_id: '',
          sku: formData.sku || `SKU-${Date.now().toString().slice(-6)}`,
          ram: formData.is_phone ? formData.ram : undefined,
          storage: formData.is_phone ? formData.storage : undefined,
          color: formData.color,
          mrp: Number(formData.mrp),
          selling_price: Number(formData.selling_price),
          discount_percent: 0,
          current_stock: Number(formData.current_stock),
          low_stock_threshold: Number(formData.low_stock_threshold),
          incoming_stock: 0,
          manual_status: null,
          computed_status: 'IN_STOCK',
          is_default: true,
          is_active: true,
        }
      ]
    });

    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-display">Products & Variants</h1>
          <p className="text-xs text-slate-400">Add, edit, deactivate and manage specifications for mobiles & accessories.</p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-vivo-600 hover:bg-vivo-500 text-white text-xs font-semibold shadow-glow-blue transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search & Filter Strip */}
      <div className="p-4 rounded-2xl glass-panel border border-white/10 flex flex-wrap items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by product name or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-vivo-500"
          />
        </div>

        {/* Brand Filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Brand:</span>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-white text-xs"
          >
            <option value="all">All Brands</option>
            {brands.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Type:</span>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as any)}
            className="bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-white text-xs"
          >
            <option value="all">All Products</option>
            <option value="phone">Smartphones Only</option>
            <option value="accessory">Accessories Only</option>
          </select>
        </div>

      </div>

      {/* Products Table */}
      <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-900/90 border-b border-white/10 text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Brand / Series</th>
                <th className="p-4">Variants</th>
                <th className="p-4">Price / MRP</th>
                <th className="p-4">Total Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {filteredProducts.map(prod => {
                const defaultVar = prod.variants[0];
                const primaryImg = prod.images[0]?.image_url;
                const totalStock = prod.variants.reduce((acc, v) => acc + v.current_stock, 0);
                const statusConfig = getStatusBadgeConfig(defaultVar?.computed_status || 'IN_STOCK');

                return (
                  <tr key={prod.id} className={`hover:bg-white/[0.02] ${!prod.is_active ? 'opacity-50' : ''}`}>
                    
                    {/* Product Media & Title */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-xl bg-slate-900 overflow-hidden border border-white/10 flex-shrink-0">
                          {primaryImg && <Image src={primaryImg} alt={prod.name} fill className="object-contain p-1" />}
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">{prod.name}</p>
                          <p className="text-[11px] text-slate-400">/{prod.slug}</p>
                        </div>
                      </div>
                    </td>

                    {/* Brand / Series */}
                    <td className="p-4 text-slate-300">
                      <span className="font-semibold text-white">{prod.brand?.name}</span>
                      {prod.series?.name && <p className="text-[11px] text-slate-400">{prod.series.name}</p>}
                    </td>

                    {/* Variants */}
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {prod.variants.map((v, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-slate-300 border border-white/5">
                            {v.ram ? `${v.ram}/` : ''}{v.storage || v.color} ({v.current_stock})
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Price */}
                    <td className="p-4">
                      <p className="font-bold text-white">{formatPrice(defaultVar?.selling_price || 0)}</p>
                      {defaultVar && defaultVar.mrp > defaultVar.selling_price && (
                        <p className="text-[10px] text-slate-400 line-through">MRP {formatPrice(defaultVar.mrp)}</p>
                      )}
                    </td>

                    {/* Total Stock */}
                    <td className="p-4">
                      <span className="font-bold text-white text-sm">{totalStock}</span> units
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} ${statusConfig.animate ? 'pulse-badge-dot' : ''}`} />
                        {statusConfig.label}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => deleteProduct(prod.id, prod.is_active)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            prod.is_active
                              ? 'text-slate-400 hover:text-amber-400 bg-white/5 border-white/5'
                              : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                          }`}
                          title={prod.is_active ? 'Deactivate (Hide from Customer)' : 'Restore Product'}
                        >
                          {prod.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl glass-panel border border-vivo-500/30 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Add New Product to Catalog</h3>
                <p className="text-xs text-slate-400">Database-driven product creation with automated status triggers</p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              
              {/* Product Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Product Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. VIVO V50 5G"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-vivo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Slug (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. vivo-v50-5g"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-vivo-500"
                  />
                </div>
              </div>

              {/* Brand & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Brand *</label>
                  <select
                    value={formData.brand_id}
                    onChange={(e) => setFormData({ ...formData, brand_id: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-vivo-500"
                  >
                    {brands.map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Category *</label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => {
                      const cat = categories.find(c => c.id === e.target.value);
                      setFormData({ ...formData, category_id: e.target.value, is_phone: cat?.type === 'phone' });
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-vivo-500"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {formData.is_phone && (
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Series</label>
                    <select
                      value={formData.series_id}
                      onChange={(e) => setFormData({ ...formData, series_id: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-vivo-500"
                    >
                      {series.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Tagline */}
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Tagline / Key Feature Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Studio Aura Light Portrait & 50MP Camera"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-vivo-500"
                />
              </div>

              {/* Initial Variant Details */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Default Variant & Stock</h4>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {formData.is_phone && (
                    <>
                      <div className="space-y-1">
                        <label className="text-slate-400">RAM</label>
                        <input
                          type="text"
                          value={formData.ram}
                          onChange={(e) => setFormData({ ...formData, ram: e.target.value })}
                          className="w-full p-2 rounded-lg bg-slate-900 border border-white/10 text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-400">Storage</label>
                        <input
                          type="text"
                          value={formData.storage}
                          onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                          className="w-full p-2 rounded-lg bg-slate-900 border border-white/10 text-white"
                        />
                      </div>
                    </>
                  )}
                  <div className="space-y-1">
                    <label className="text-slate-400">Color</label>
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-full p-2 rounded-lg bg-slate-900 border border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400">SKU</label>
                    <input
                      type="text"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      className="w-full p-2 rounded-lg bg-slate-900 border border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-400">MRP (₹) *</label>
                    <input
                      type="number"
                      required
                      value={formData.mrp}
                      onChange={(e) => setFormData({ ...formData, mrp: Number(e.target.value) })}
                      className="w-full p-2 rounded-lg bg-slate-900 border border-white/10 text-white font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400">Selling Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={formData.selling_price}
                      onChange={(e) => setFormData({ ...formData, selling_price: Number(e.target.value) })}
                      className="w-full p-2 rounded-lg bg-slate-900 border border-white/10 text-white font-bold text-emerald-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400">Initial Stock</label>
                    <input
                      type="number"
                      value={formData.current_stock}
                      onChange={(e) => setFormData({ ...formData, current_stock: Number(e.target.value) })}
                      className="w-full p-2 rounded-lg bg-slate-900 border border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400">Low Stock Alert Threshold</label>
                    <input
                      type="number"
                      value={formData.low_stock_threshold}
                      onChange={(e) => setFormData({ ...formData, low_stock_threshold: Number(e.target.value) })}
                      className="w-full p-2 rounded-lg bg-slate-900 border border-white/10 text-white"
                    />
                  </div>
                </div>

              </div>

              {/* Product Photo Upload Section */}
              <div className="space-y-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-semibold text-xs flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-vivo-400" />
                    <span>Product Photo & Storage (Supabase)</span>
                  </label>
                  <span className="text-[10px] text-slate-400">JPG, PNG, WebP</span>
                </div>

                {uploadError && (
                  <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                {uploadSuccess && (
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>Photo successfully uploaded to Supabase Storage!</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  
                  {/* Image Preview Box */}
                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-slate-900 border-2 border-dashed border-vivo-500/40 flex-shrink-0 flex items-center justify-center group shadow-inner">
                    {formData.image_url ? (
                      <Image
                        src={formData.image_url}
                        alt="Product preview"
                        fill
                        className="object-contain p-1 group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="text-center p-2 text-slate-500">
                        <Upload className="w-6 h-6 mx-auto mb-1 opacity-50" />
                        <span className="text-[10px]">No Photo</span>
                      </div>
                    )}
                    {isUploadingImage && (
                      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-vivo-400 gap-1.5">
                        <div className="w-5 h-5 border-2 border-vivo-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-[9px] font-bold">Uploading...</span>
                      </div>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="flex-1 space-y-2 w-full">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Upload from Device:</label>
                      <label className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-vivo-600/20 hover:bg-vivo-600/30 text-vivo-300 hover:text-white border border-vivo-500/30 cursor-pointer font-semibold transition-all">
                        <Upload className="w-4 h-4" />
                        <span>{isUploadingImage ? 'Uploading to Supabase...' : 'Choose Product Photo File'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          disabled={isUploadingImage}
                          onChange={handleImageFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Or Direct Photo URL:</label>
                      <input
                        type="text"
                        required
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                        placeholder="https://..."
                        className="w-full p-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-vivo-500"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-vivo-600 hover:bg-vivo-500 text-white font-bold shadow-glow-blue"
                >
                  Create Product & Save to Database
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
