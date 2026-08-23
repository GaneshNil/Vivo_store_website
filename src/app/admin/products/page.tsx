'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/lib/store/store-context';
import { formatPrice, getStatusBadgeConfig, calculateEMI } from '@/lib/utils/formatters';
import { Product, ProductVariant, ProductImage } from '@/lib/types';
import { fireConfetti } from '@/lib/utils/confetti';
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
  AlertCircle,
  Plus,
  Star,
  Image as ImageIcon,
  CheckCircle2,
  Cpu,
  Camera,
  Battery,
  Box,
  Settings2,
  Percent,
  CreditCard
} from 'lucide-react';

interface VariantDraft {
  id: string;
  ram: string;
  storage: string;
  color: string;
  mrp: number;
  selling_price: number;
  current_stock: number;
  low_stock_threshold: number;
  sku: string;
}

const RAM_OPTIONS = ['4GB', '6GB', '8GB', '12GB', '16GB'];
const STORAGE_OPTIONS = ['64GB', '128GB', '256GB', '512GB', '1TB'];
const TENURE_OPTIONS = [3, 6, 9, 12, 18, 24];

export default function AdminProductsPage() {
  const { products, brands, categories, series, storeSettings, addProduct, updateProduct, deleteProduct, setHeroFlagshipProduct } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedType, setSelectedType] = useState<'all' | 'phone' | 'accessory'>('all');
  
  // Modal states (Add & Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Form Base State
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
    warranty_info: '1 Year Handset & 6 Months Accessories Warranty',
  });

  // Bajaj Finance EMI Settings per Product
  const [bajajInterestRate, setBajajInterestRate] = useState<number>(0);
  const [bajajTenureMonths, setBajajTenureMonths] = useState<number>(6);

  // Multiple Images State
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80'
  ]);
  const [primaryImageIndex, setPrimaryImageIndex] = useState<number>(0);
  const [manualImageUrl, setManualImageUrl] = useState<string>('');
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Multiple RAM & Storage Variants State
  const [variants, setVariants] = useState<VariantDraft[]>([
    {
      id: `var-init-1`,
      ram: '8GB',
      storage: '128GB',
      color: 'Titanium Blue',
      mrp: 34999,
      selling_price: 29999,
      current_stock: 5,
      low_stock_threshold: 2,
      sku: `PROD-${Date.now().toString().slice(-4)}-128GB`,
    }
  ]);

  // Technical Specifications & Hardware State
  const [specsData, setSpecsData] = useState({
    // Display
    screen_size: '6.78 inches',
    resolution: '1.5K AMOLED (2800 × 1260)',
    refresh_rate: '120Hz LTPO',
    peak_brightness: '4500 nits Peak',
    // Processor & Performance
    chipset: 'Qualcomm Snapdragon 7 Gen 3 (4nm)',
    gpu: 'Adreno 720',
    operating_system: 'OriginOS 4 / Funtouch OS 15 (Android 15)',
    network: 'Dual 5G (SA/NSA) + Wi-Fi 6',
    // Camera
    rear_primary: '50 MP Sony IMX921 with OIS',
    rear_secondary: '50 MP ZEISS Ultra Wide Angle',
    front_camera: '50 MP Group Selfie with AF',
    video_recording: '4K @ 60fps / 1080p @ 120fps Studio Mode',
    // Battery & Charging
    battery_capacity: '5500 mAh BlueVolt Battery',
    charging_speed: '80W FlashCharge (0 to 100% in 35 mins)',
    usb_port: 'Type-C USB 2.0 / OTG Support',
    // In-The-Box
    in_the_box: 'Handset, 80W Power Adapter, USB Type-C Cable, Transparent Protective Case, SIM Ejector Pin, Warranty Card, Quick Start Guide',
  });

  // Open Modal for New Product
  const handleOpenAddModal = () => {
    setEditingProductId(null);
    setFormData({
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
      warranty_info: '1 Year Handset & 6 Months Accessories Warranty',
    });
    setBajajInterestRate(0);
    setBajajTenureMonths(6);
    setImages(['https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80']);
    setPrimaryImageIndex(0);
    setVariants([
      {
        id: `var-init-1`,
        ram: '8GB',
        storage: '128GB',
        color: 'Titanium Blue',
        mrp: 34999,
        selling_price: 29999,
        current_stock: 5,
        low_stock_threshold: 2,
        sku: `PROD-${Date.now().toString().slice(-4)}-128GB`,
      }
    ]);
    setSpecsData({
      screen_size: '6.78 inches',
      resolution: '1.5K AMOLED (2800 × 1260)',
      refresh_rate: '120Hz LTPO',
      peak_brightness: '4500 nits Peak',
      chipset: 'Qualcomm Snapdragon 7 Gen 3 (4nm)',
      gpu: 'Adreno 720',
      operating_system: 'OriginOS 4 / Funtouch OS 15 (Android 15)',
      network: 'Dual 5G (SA/NSA) + Wi-Fi 6',
      rear_primary: '50 MP Sony IMX921 with OIS',
      rear_secondary: '50 MP ZEISS Ultra Wide Angle',
      front_camera: '50 MP Group Selfie with AF',
      video_recording: '4K @ 60fps / 1080p @ 120fps Studio Mode',
      battery_capacity: '5500 mAh BlueVolt Battery',
      charging_speed: '80W FlashCharge (0 to 100% in 35 mins)',
      usb_port: 'Type-C USB 2.0 / OTG Support',
      in_the_box: 'Handset, 80W Power Adapter, USB Type-C Cable, Transparent Protective Case, SIM Ejector Pin, Warranty Card, Quick Start Guide',
    });
    setIsModalOpen(true);
  };

  // Open Modal to Edit Existing Product & Specs
  const handleOpenEditModal = (product: Product) => {
    setEditingProductId(product.id);
    setFormData({
      name: product.name,
      slug: product.slug,
      tagline: product.tagline || '',
      description: product.description,
      brand_id: product.brand_id,
      category_id: product.category_id,
      series_id: product.series_id || '',
      is_phone: product.is_phone,
      is_featured: product.is_featured,
      is_new_arrival: product.is_new_arrival,
      is_best_seller: product.is_best_seller,
      warranty_info: product.warranty_info || '1 Year Handset Warranty',
    });

    setBajajInterestRate(product.bajaj_emi_interest_rate ?? 0);
    setBajajTenureMonths(product.bajaj_emi_tenure_months || 6);

    // Images
    const prodImages = product.images && product.images.length > 0
      ? product.images.map(img => img.image_url)
      : ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80'];
    setImages(prodImages);
    const primaryIdx = product.images.findIndex(img => img.is_primary);
    setPrimaryImageIndex(primaryIdx >= 0 ? primaryIdx : 0);

    // Variants
    if (product.variants && product.variants.length > 0) {
      setVariants(product.variants.map((v, i) => ({
        id: v.id || `var-edit-${i}`,
        ram: v.ram || '8GB',
        storage: v.storage || '128GB',
        color: v.color || 'Standard',
        mrp: v.mrp,
        selling_price: v.selling_price,
        current_stock: v.current_stock,
        low_stock_threshold: v.low_stock_threshold,
        sku: v.sku,
      })));
    }

    // Specifications
    const s: any = product.specifications || {};
    setSpecsData({
      screen_size: s.display?.size || s.display?.screen_size || '6.78 inches',
      resolution: s.display?.resolution || '1.5K AMOLED',
      refresh_rate: s.display?.refresh_rate || '120Hz',
      peak_brightness: s.display?.brightness || s.display?.peak_brightness || '4500 nits',
      chipset: s.processor?.chipset || 'Snapdragon 5G',
      gpu: s.processor?.gpu || 'Adreno',
      operating_system: s.operating_system?.os_name || s.processor?.operating_system || 'Android 15',
      network: s.connectivity?.network || s.processor?.network_connectivity || '5G Dual SIM',
      rear_primary: s.camera?.rear_main || '50 MP with OIS',
      rear_secondary: s.camera?.rear_secondary || '50 MP Ultra Wide',
      front_camera: s.camera?.front_camera || '50 MP Selfie',
      video_recording: s.camera?.video_recording || '4K @ 60fps',
      battery_capacity: s.battery_charging?.capacity || '5500 mAh',
      charging_speed: s.battery_charging?.charging_speed || '80W FlashCharge',
      usb_port: s.connectivity?.usb_type || s.battery_charging?.usb_port || 'USB Type-C',
      in_the_box: Array.isArray(s.in_the_box) ? s.in_the_box.join(', ') : 'Handset, Charger, Cable, Case, SIM Pin, Manual',
    });

    setIsModalOpen(true);
  };

  // Handle Multi-file Upload to Supabase Storage
  const handleMultipleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingImages(true);
    setUploadError('');
    setUploadSuccess(false);

    const uploadedUrls: string[] = [];
    const totalFiles = files.length;

    try {
      for (let i = 0; i < totalFiles; i++) {
        const file = files[i];
        setUploadProgressText(`Uploading photo ${i + 1} of ${totalFiles} to Supabase...`);

        const data = new FormData();
        data.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: data,
        });

        if (!res.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        const result = await res.json();
        if (result.url) {
          uploadedUrls.push(result.url);
        }
      }

      if (uploadedUrls.length > 0) {
        setImages(prev => [...prev.filter(url => !url.includes('photo-1598327105666')), ...uploadedUrls]);
        setUploadSuccess(true);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error uploading images';
      setUploadError(message);
    } finally {
      setIsUploadingImages(false);
      setUploadProgressText('');
    }
  };

  const handleAddManualImage = () => {
    if (!manualImageUrl.trim()) return;
    setImages(prev => [...prev, manualImageUrl.trim()]);
    setManualImageUrl('');
  };

  const handleRemoveImage = (indexToRemove: number) => {
    if (images.length <= 1) return;
    setImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
    if (primaryImageIndex >= indexToRemove && primaryImageIndex > 0) {
      setPrimaryImageIndex(prev => prev - 1);
    }
  };

  const handleSetPrimaryImage = (index: number) => {
    setPrimaryImageIndex(index);
  };

  // Add Another Variant
  const handleAddVariant = () => {
    const lastVar = variants[variants.length - 1];
    const newVariant: VariantDraft = {
      id: `var-${Date.now()}-${variants.length + 1}`,
      ram: lastVar?.ram || '8GB',
      storage: lastVar?.storage === '128GB' ? '256GB' : lastVar?.storage === '256GB' ? '512GB' : '256GB',
      color: lastVar?.color || 'Titanium Black',
      mrp: lastVar ? lastVar.mrp + 3000 : 37999,
      selling_price: lastVar ? lastVar.selling_price + 3000 : 32999,
      current_stock: 5,
      low_stock_threshold: 2,
      sku: `PROD-${Date.now().toString().slice(-4)}-${variants.length + 1}`,
    };
    setVariants(prev => [...prev, newVariant]);
  };

  const handleRemoveVariant = (indexToRemove: number) => {
    if (variants.length <= 1) return;
    setVariants(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleUpdateVariant = (index: number, field: keyof VariantDraft, value: any) => {
    setVariants(prev => prev.map((v, idx) => {
      if (idx === index) {
        return { ...v, [field]: value };
      }
      return v;
    }));
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

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const brand = brands.find(b => b.id === formData.brand_id);
    const category = categories.find(c => c.id === formData.category_id);
    const ser = series.find(s => s.id === formData.series_id);

    const generatedSlug = formData.slug.trim() || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Build Product Images
    const formattedImages: ProductImage[] = images.map((url, idx) => ({
      id: `img-${Date.now()}-${idx}`,
      product_id: editingProductId || '',
      image_url: url,
      alt_text: `${formData.name} photo ${idx + 1}`,
      view_type: idx === 0 ? 'front' : idx === 1 ? 'back' : idx === 2 ? 'side' : 'lifestyle',
      is_primary: idx === primaryImageIndex,
      sort_order: idx + 1,
    }));

    // Build Product Variants
    const formattedVariants: ProductVariant[] = variants.map((v, idx) => {
      const computedStock = Number(v.current_stock) || 0;
      const lowThreshold = Number(v.low_stock_threshold) || 2;
      const computedStatus = computedStock <= 0 ? 'OUT_OF_STOCK' : computedStock <= lowThreshold ? 'LOW_STOCK' : 'IN_STOCK';
      const mrpNum = Number(v.mrp) || 0;
      const sellingNum = Number(v.selling_price) || 0;
      const discount = mrpNum > sellingNum ? Math.round(((mrpNum - sellingNum) / mrpNum) * 100) : 0;

      return {
        id: v.id.startsWith('var-') ? v.id : `var-${Date.now()}-${idx}`,
        product_id: editingProductId || '',
        sku: v.sku.trim() || `SKU-${Date.now().toString().slice(-6)}-${idx + 1}`,
        ram: formData.is_phone ? v.ram : undefined,
        storage: formData.is_phone ? v.storage : undefined,
        color: v.color,
        mrp: mrpNum,
        selling_price: sellingNum,
        discount_percent: discount,
        current_stock: computedStock,
        low_stock_threshold: lowThreshold,
        incoming_stock: 0,
        manual_status: null,
        computed_status: computedStatus,
        is_default: idx === 0,
        is_active: true,
      };
    });

    // Build Specifications
    const specificationsObj = {
      display: formData.is_phone ? {
        screen_size: specsData.screen_size,
        resolution: specsData.resolution,
        refresh_rate: specsData.refresh_rate,
        peak_brightness: specsData.peak_brightness,
      } : undefined,
      processor: formData.is_phone ? {
        chipset: specsData.chipset,
        gpu: specsData.gpu,
        operating_system: specsData.operating_system,
        network_connectivity: specsData.network,
      } : undefined,
      camera: formData.is_phone ? {
        rear_main: specsData.rear_primary,
        rear_secondary: specsData.rear_secondary,
        front_camera: specsData.front_camera,
        video_recording: specsData.video_recording,
      } : undefined,
      battery_charging: {
        capacity: specsData.battery_capacity,
        charging_speed: specsData.charging_speed,
        usb_port: specsData.usb_port,
      },
      in_the_box: specsData.in_the_box.split(',').map(s => s.trim()).filter(Boolean),
    };

    const productPayload = {
      name: formData.name,
      slug: generatedSlug,
      tagline: formData.tagline,
      description: formData.description || `${formData.name} available at Galaxy Mobile Gallery Begampur showroom with Bajaj Finance EMI.`,
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
      bajaj_emi_interest_rate: Number(bajajInterestRate) || 0,
      bajaj_emi_tenure_months: Number(bajajTenureMonths) || 6,
      sort_order: 1,
      specifications: specificationsObj,
      images: formattedImages,
      variants: formattedVariants,
    };

    if (editingProductId) {
      updateProduct(editingProductId, productPayload);
    } else {
      addProduct(productPayload);
    }

    fireConfetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    setIsModalOpen(false);
    setEditingProductId(null);
  };

  // Sample calculated EMI for display in form
  const sampleSellingPrice = variants[0]?.selling_price || 29999;
  const calculatedSampleEMI = calculateEMI(sampleSellingPrice, bajajTenureMonths, bajajInterestRate);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white font-display">Products & Variants</h1>
          <p className="text-xs text-slate-400">Add, edit hardware specifications, Bajaj EMI rates, photos & stock for mobiles & accessories.</p>
        </div>
        
        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-vivo-600 to-vivo-500 hover:from-vivo-500 hover:to-vivo-400 text-white text-xs font-bold shadow-glow-blue transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Product (Specs & EMI)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl glass-card border border-white/5 flex flex-col md:flex-row gap-4 justify-between items-center">
        
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by product name or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-vivo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-vivo-500"
            >
              <option value="all">All Catalog</option>
              <option value="phone">Smartphones Only</option>
              <option value="accessory">Accessories Only</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Brand:</span>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-vivo-500"
            >
              <option value="all">All Brands</option>
              {brands.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {/* Products Table */}
      <div className="rounded-2xl glass-card border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Product Info</th>
                <th className="p-4">Brand / Series</th>
                <th className="p-4">Configured Variants (RAM / ROM)</th>
                <th className="p-4">Bajaj EMI Scheme</th>
                <th className="p-4">Starting Price</th>
                <th className="p-4">Stock Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map(prod => {
                const defaultVar = prod.variants.find(v => v.is_default) || prod.variants[0];
                const totalStock = prod.variants.reduce((acc, v) => acc + v.current_stock, 0);
                const statusConfig = getStatusBadgeConfig(defaultVar?.computed_status || 'IN_STOCK');
                const primaryImg = prod.images.find(img => img.is_primary) || prod.images[0];
                const emiRate = prod.bajaj_emi_interest_rate ?? 0;
                const emiTenure = prod.bajaj_emi_tenure_months || 6;
                const emiValue = defaultVar ? calculateEMI(defaultVar.selling_price, emiTenure, emiRate) : 0;

                return (
                  <tr key={prod.id} className="hover:bg-white/5 transition-colors">
                    
                    {/* Image & Title */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-900 border border-white/10 flex-shrink-0">
                          {primaryImg && (
                            <Image
                              src={primaryImg.image_url}
                              alt={prod.name}
                              fill
                              className="object-contain p-1"
                            />
                          )}
                          {prod.images.length > 1 && (
                            <span className="absolute bottom-0.5 right-0.5 bg-vivo-600 text-white text-[8px] font-bold px-1 rounded">
                              +{prod.images.length - 1}
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <p className="font-bold text-white text-sm">{prod.name}</p>
                            {storeSettings.hero_flagship_product_id === prod.id && (
                              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-extrabold text-[9px] border border-amber-500/30 flex items-center gap-0.5 shadow-sm">
                                <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" /> Hero Flagship
                              </span>
                            )}
                          </div>
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
                      <div className="flex flex-wrap gap-1.5">
                        {prod.variants.map((v, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-lg bg-white/5 text-[10px] text-slate-200 border border-white/10 font-medium">
                            {v.ram ? `${v.ram}/` : ''}{v.storage || v.color} · <strong className="text-emerald-400">{formatPrice(v.selling_price)}</strong> ({v.current_stock} pcs)
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Bajaj EMI Scheme */}
                    <td className="p-4">
                      {prod.is_phone ? (
                        <div>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold text-[10px]">
                            <CreditCard className="w-3 h-3" />
                            <span>Bajaj Finance EMI Available</span>
                          </span>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {formatPrice(emiValue)}/mo · {emiTenure} mos
                          </p>
                        </div>
                      ) : (
                        <span className="text-slate-500 text-[10px]">N/A</span>
                      )}
                    </td>

                    {/* Price */}
                    <td className="p-4">
                      <p className="font-bold text-white">{formatPrice(defaultVar?.selling_price || 0)}</p>
                      {defaultVar && defaultVar.mrp > defaultVar.selling_price && (
                        <p className="text-[10px] text-slate-400 line-through">MRP {formatPrice(defaultVar.mrp)}</p>
                      )}
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} ${statusConfig.animate ? 'pulse-badge-dot' : ''}`} />
                        {statusConfig.label} ({totalStock} Total)
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Set as Hero Flagship Button */}
                        {prod.is_phone && (
                          <button
                            type="button"
                            onClick={() => {
                              setHeroFlagshipProduct(prod.id);
                              fireConfetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
                            }}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              storeSettings.hero_flagship_product_id === prod.id
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                                : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-amber-300 border-white/5'
                            }`}
                            title={storeSettings.hero_flagship_product_id === prod.id ? 'Current Hero Flagship Model' : 'Set as Hero Section Flagship Model'}
                          >
                            <Star className={`w-4 h-4 ${storeSettings.hero_flagship_product_id === prod.id ? 'fill-amber-400 text-amber-400' : ''}`} />
                          </button>
                        )}

                        {/* Edit Button */}
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(prod)}
                          className="p-1.5 rounded-lg bg-vivo-600/20 hover:bg-vivo-600/40 text-vivo-300 border border-vivo-500/30 transition-colors"
                          title="Edit Product, Specs & Bajaj EMI"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${prod.name}"?`)) {
                              deleteProduct(prod.id, false);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Product Modal (Add & Full Edit Mode) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-4xl rounded-3xl glass-panel border border-vivo-500/30 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {editingProductId ? <Edit3 className="w-5 h-5 text-vivo-400" /> : <Smartphone className="w-5 h-5 text-vivo-400" />}
                  <span>{editingProductId ? 'Edit Product & Technical Specifications' : 'Add New Product to Catalog'}</span>
                </h3>
                <p className="text-xs text-slate-400">
                  {editingProductId 
                    ? 'Update name, prices, variants, photos, Bajaj EMI rates and full hardware breakdown.' 
                    : 'Configure multi-RAM/ROM tiers, Supabase photos, Bajaj EMI scheme & full specifications.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-6 text-xs">
              
              {/* Product Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Product Model Name *</label>
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
                  <label className="text-slate-300 font-semibold">URL Slug (Auto-generated if blank)</label>
                  <input
                    type="text"
                    placeholder="e.g. vivo-v50-5g"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-vivo-500"
                  />
                </div>
              </div>

              {/* Brand & Category & Series */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Brand *</label>
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
                  <label className="text-slate-300 font-semibold">Category *</label>
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
                    <label className="text-slate-300 font-semibold">Series</label>
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

              {/* Tagline & Warranty */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Tagline / Key Feature Headline</label>
                  <input
                    type="text"
                    placeholder="e.g. Studio Aura Light Portrait & 50MP ZEISS Camera"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-vivo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Warranty Information</label>
                  <input
                    type="text"
                    value={formData.warranty_info}
                    onChange={(e) => setFormData({ ...formData, warranty_info: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-vivo-500"
                  />
                </div>
              </div>

              {/* BAJAJ FINANCE EMI SCHEME CONFIGURATOR */}
              {formData.is_phone && (
                <div className="p-5 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-amber-400" />
                      <span>Bajaj Finance In-Store EMI Configuration</span>
                    </h4>
                    <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Product-Level Setting
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                    <div className="space-y-1">
                      <label className="text-slate-300 font-semibold flex items-center gap-1">
                        <Percent className="w-3.5 h-3.5 text-amber-400" />
                        <span>Annual Interest Rate (%) *</span>
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="30"
                        value={bajajInterestRate}
                        onChange={(e) => setBajajInterestRate(Number(e.target.value))}
                        placeholder="0 for No Cost EMI"
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-bold focus:outline-none focus:border-amber-500"
                      />
                      <span className="text-[10px] text-slate-400">
                        {bajajInterestRate === 0 ? '✓ Bajaj Finance EMI Available (Standard Scheme)' : `Custom ${bajajInterestRate}% Annual Rate Scheme`}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-300 font-semibold">Tenure Period (Months) *</label>
                      <select
                        value={bajajTenureMonths}
                        onChange={(e) => setBajajTenureMonths(Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-bold focus:outline-none focus:border-amber-500"
                      >
                        {TENURE_OPTIONS.map(m => (
                          <option key={m} value={m}>{m} Months EMI</option>
                        ))}
                      </select>
                      <span className="text-[10px] text-slate-400">Default showroom tenure breakdown</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col justify-center space-y-0.5">
                      <span className="text-[10px] text-slate-400 font-medium">Customer EMI Preview:</span>
                      <span className="text-sm font-extrabold text-emerald-400">
                        {formatPrice(calculatedSampleEMI)} / month
                      </span>
                      <span className="text-[9px] text-slate-400">
                        Based on {formatPrice(sampleSellingPrice)} price for {bajajTenureMonths} mos @ {bajajInterestRate}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* MULTIPLE IMAGES UPLOAD SECTION (SUPABASE) */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-vivo-400" />
                      <span>Product Photos Gallery (Supabase Storage)</span>
                    </h4>
                    <p className="text-[11px] text-slate-400">Upload multiple photos at once. Click &apos;Set as Primary&apos; on the main display shot.</p>
                  </div>
                  <span className="text-[10px] text-vivo-400 font-bold bg-vivo-600/20 px-2.5 py-1 rounded-full border border-vivo-500/30">
                    {images.length} Photos Selected
                  </span>
                </div>

                {uploadError && (
                  <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                {uploadSuccess && (
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>Images uploaded and saved to Supabase storage successfully!</span>
                  </div>
                )}

                {/* Upload Buttons & Manual Add */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  <label className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-vivo-600/30 to-vivo-500/20 hover:from-vivo-600/40 hover:to-vivo-500/30 text-vivo-300 hover:text-white border border-vivo-500/40 cursor-pointer font-bold transition-all text-xs">
                    <Upload className="w-4 h-4" />
                    <span>{isUploadingImages ? uploadProgressText : 'Upload Multiple Photos from Device'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      disabled={isUploadingImages}
                      onChange={handleMultipleImageUpload}
                      className="hidden"
                    />
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Or paste Direct Image URL..."
                      value={manualImageUrl}
                      onChange={(e) => setManualImageUrl(e.target.value)}
                      className="flex-1 p-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-vivo-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddManualImage}
                      className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>

                {/* Photos Gallery Previews */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
                  {images.map((imgUrl, idx) => {
                    const isPrimary = idx === primaryImageIndex;

                    return (
                      <div 
                        key={idx} 
                        className={`relative rounded-2xl overflow-hidden bg-slate-900 border-2 transition-all group aspect-square flex flex-col items-center justify-center p-1 ${
                          isPrimary ? 'border-vivo-500 shadow-glow-blue ring-2 ring-vivo-500/30' : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={imgUrl}
                            alt={`Photo ${idx + 1}`}
                            fill
                            className="object-contain p-1"
                          />
                        </div>

                        {/* Top Badges */}
                        <div className="absolute top-1.5 left-1.5 right-1.5 flex items-center justify-between">
                          {isPrimary ? (
                            <span className="bg-vivo-600 text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow">
                              <Star className="w-2.5 h-2.5 fill-white" /> Primary
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSetPrimaryImage(idx)}
                              className="bg-black/60 hover:bg-vivo-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md transition-colors"
                            >
                              Set Primary
                            </button>
                          )}

                          {images.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              className="w-5 h-5 rounded-full bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center transition-colors"
                              title="Delete photo"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>

                        <span className="absolute bottom-1 right-1 text-[9px] text-slate-400 bg-slate-950/80 px-1 rounded">
                          #{idx + 1}
                        </span>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* MULTIPLE RAM & STORAGE VARIANTS SECTION */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                      <Layers className="w-4 h-4 text-vivo-400" />
                      <span>Configure Multiple RAM & Storage Variants</span>
                    </h4>
                    <p className="text-[11px] text-slate-400">Add multiple specs (e.g. 8GB+128GB, 8GB+256GB, 12GB+256GB) with custom prices and stock.</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddVariant}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-vivo-600 hover:bg-vivo-500 text-white text-xs font-bold shadow transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Another Variant</span>
                  </button>
                </div>

                {/* Variants List */}
                <div className="space-y-4">
                  {variants.map((v, index) => {
                    const discount = v.mrp > v.selling_price ? Math.round(((v.mrp - v.selling_price) / v.mrp) * 100) : 0;

                    return (
                      <div 
                        key={v.id} 
                        className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3 relative group"
                      >
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-vivo-600 text-white font-bold text-[10px] flex items-center justify-center">
                              {index + 1}
                            </span>
                            <span className="font-bold text-white text-xs">
                              Variant #{index + 1} {formData.is_phone ? `(${v.ram || '8GB'} + ${v.storage || '128GB'})` : ''} - {v.color}
                            </span>
                            {discount > 0 && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] border border-emerald-500/30">
                                {discount}% OFF
                              </span>
                            )}
                          </div>

                          {variants.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveVariant(index)}
                              className="text-red-400 hover:text-red-300 p-1 text-xs flex items-center gap-1 rounded bg-red-500/10 px-2"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Remove</span>
                            </button>
                          )}
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {formData.is_phone && (
                            <>
                              <div className="space-y-1">
                                <label className="text-slate-400 text-[11px]">RAM Type *</label>
                                <div className="flex gap-1">
                                  <input
                                    type="text"
                                    required
                                    value={v.ram}
                                    onChange={(e) => handleUpdateVariant(index, 'ram', e.target.value)}
                                    placeholder="8GB"
                                    className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-white font-semibold"
                                  />
                                </div>
                                <div className="flex gap-1 pt-1 flex-wrap">
                                  {RAM_OPTIONS.map(ramOpt => (
                                    <button
                                      key={ramOpt}
                                      type="button"
                                      onClick={() => handleUpdateVariant(index, 'ram', ramOpt)}
                                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                                        v.ram === ramOpt ? 'bg-vivo-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'
                                      }`}
                                    >
                                      {ramOpt}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div className="space-y-1">
                                <label className="text-slate-400 text-[11px]">Storage *</label>
                                <input
                                  type="text"
                                  required
                                  value={v.storage}
                                  onChange={(e) => handleUpdateVariant(index, 'storage', e.target.value)}
                                  placeholder="256GB"
                                  className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-white font-semibold"
                                />
                                <div className="flex gap-1 pt-1 flex-wrap">
                                  {STORAGE_OPTIONS.map(stOpt => (
                                    <button
                                      key={stOpt}
                                      type="button"
                                      onClick={() => handleUpdateVariant(index, 'storage', stOpt)}
                                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                                        v.storage === stOpt ? 'bg-vivo-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'
                                      }`}
                                    >
                                      {stOpt}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}

                          <div className="space-y-1">
                            <label className="text-slate-400 text-[11px]">Color Name *</label>
                            <input
                              type="text"
                              required
                              value={v.color}
                              onChange={(e) => handleUpdateVariant(index, 'color', e.target.value)}
                              placeholder="e.g. Titanium Blue"
                              className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-white font-semibold"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-slate-400 text-[11px]">SKU Code</label>
                            <input
                              type="text"
                              value={v.sku}
                              onChange={(e) => handleUpdateVariant(index, 'sku', e.target.value)}
                              className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-white font-mono text-[10px]"
                            />
                          </div>
                        </div>

                        {/* Pricing & Stock Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                          <div className="space-y-1">
                            <label className="text-slate-400 text-[11px]">MRP (₹) *</label>
                            <input
                              type="number"
                              required
                              value={v.mrp}
                              onChange={(e) => handleUpdateVariant(index, 'mrp', Number(e.target.value))}
                              className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-white font-bold"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-slate-400 text-[11px]">Selling Price (₹) *</label>
                            <input
                              type="number"
                              required
                              value={v.selling_price}
                              onChange={(e) => handleUpdateVariant(index, 'selling_price', Number(e.target.value))}
                              className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-emerald-400 font-bold"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-slate-400 text-[11px]">Available Stock (pcs) *</label>
                            <input
                              type="number"
                              required
                              value={v.current_stock}
                              onChange={(e) => handleUpdateVariant(index, 'current_stock', Number(e.target.value))}
                              className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-white font-bold"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-slate-400 text-[11px]">Low Stock Threshold</label>
                            <input
                              type="number"
                              value={v.low_stock_threshold}
                              onChange={(e) => handleUpdateVariant(index, 'low_stock_threshold', Number(e.target.value))}
                              className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-white"
                            />
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>

              {/* TECHNICAL SPECIFICATIONS & HARDWARE FEATURES CONFIGURATOR */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div>
                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                      <Settings2 className="w-4 h-4 text-origin-cyan" />
                      <span>Technical Specifications & Hardware Features (Fully Editable)</span>
                    </h4>
                    <p className="text-[11px] text-slate-400">Configure hardware specs displayed on the customer detail page.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  
                  {/* Display Specs */}
                  {formData.is_phone && (
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-3">
                      <h5 className="font-bold text-vivo-400 text-xs flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> 1. Display & Screen Specifications
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div className="space-y-1">
                          <label className="text-slate-400 text-[10px]">Screen Size</label>
                          <input
                            type="text"
                            value={specsData.screen_size}
                            onChange={(e) => setSpecsData({ ...specsData, screen_size: e.target.value })}
                            placeholder="6.78 inches"
                            className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-400 text-[10px]">Resolution & Panel</label>
                          <input
                            type="text"
                            value={specsData.resolution}
                            onChange={(e) => setSpecsData({ ...specsData, resolution: e.target.value })}
                            placeholder="1.5K AMOLED (2800 × 1260)"
                            className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-400 text-[10px]">Refresh Rate</label>
                          <input
                            type="text"
                            value={specsData.refresh_rate}
                            onChange={(e) => setSpecsData({ ...specsData, refresh_rate: e.target.value })}
                            placeholder="120Hz LTPO"
                            className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-400 text-[10px]">Peak Brightness</label>
                          <input
                            type="text"
                            value={specsData.peak_brightness}
                            onChange={(e) => setSpecsData({ ...specsData, peak_brightness: e.target.value })}
                            placeholder="4500 nits"
                            className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Processor & Performance */}
                  {formData.is_phone && (
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-3">
                      <h5 className="font-bold text-origin-violet text-xs flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5" /> 2. Processor, OS & Network
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div className="space-y-1">
                          <label className="text-slate-400 text-[10px]">Processor / Chipset</label>
                          <input
                            type="text"
                            value={specsData.chipset}
                            onChange={(e) => setSpecsData({ ...specsData, chipset: e.target.value })}
                            placeholder="Snapdragon 7 Gen 3"
                            className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-400 text-[10px]">GPU / Graphics</label>
                          <input
                            type="text"
                            value={specsData.gpu}
                            onChange={(e) => setSpecsData({ ...specsData, gpu: e.target.value })}
                            placeholder="Adreno 720"
                            className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-400 text-[10px]">Operating System</label>
                          <input
                            type="text"
                            value={specsData.operating_system}
                            onChange={(e) => setSpecsData({ ...specsData, operating_system: e.target.value })}
                            placeholder="Funtouch OS 15 (Android 15)"
                            className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-400 text-[10px]">5G & Connectivity</label>
                          <input
                            type="text"
                            value={specsData.network}
                            onChange={(e) => setSpecsData({ ...specsData, network: e.target.value })}
                            placeholder="Dual 5G (SA/NSA) + Wi-Fi 6"
                            className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Camera System */}
                  {formData.is_phone && (
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-3">
                      <h5 className="font-bold text-cyan-400 text-xs flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5" /> 3. Camera System
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div className="space-y-1">
                          <label className="text-slate-400 text-[10px]">Rear Primary Camera</label>
                          <input
                            type="text"
                            value={specsData.rear_primary}
                            onChange={(e) => setSpecsData({ ...specsData, rear_primary: e.target.value })}
                            placeholder="50 MP Sony IMX921 with OIS"
                            className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-400 text-[10px]">Rear Secondary Camera</label>
                          <input
                            type="text"
                            value={specsData.rear_secondary}
                            onChange={(e) => setSpecsData({ ...specsData, rear_secondary: e.target.value })}
                            placeholder="50 MP ZEISS Ultra Wide"
                            className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-400 text-[10px]">Front Selfie Camera</label>
                          <input
                            type="text"
                            value={specsData.front_camera}
                            onChange={(e) => setSpecsData({ ...specsData, front_camera: e.target.value })}
                            placeholder="50 MP Group Selfie AF"
                            className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-400 text-[10px]">Video Recording</label>
                          <input
                            type="text"
                            value={specsData.video_recording}
                            onChange={(e) => setSpecsData({ ...specsData, video_recording: e.target.value })}
                            placeholder="4K @ 60fps / Studio Mode"
                            className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Battery & Charging */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-3">
                    <h5 className="font-bold text-emerald-400 text-xs flex items-center gap-1.5">
                      <Battery className="w-3.5 h-3.5" /> {formData.is_phone ? '4.' : '1.'} Battery & Charging
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-slate-400 text-[10px]">Battery Capacity</label>
                        <input
                          type="text"
                          value={specsData.battery_capacity}
                          onChange={(e) => setSpecsData({ ...specsData, battery_capacity: e.target.value })}
                          placeholder="5500 mAh BlueVolt"
                          className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-400 text-[10px]">Charging Technology</label>
                        <input
                          type="text"
                          value={specsData.charging_speed}
                          onChange={(e) => setSpecsData({ ...specsData, charging_speed: e.target.value })}
                          placeholder="80W FlashCharge"
                          className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-400 text-[10px]">USB Port & OTG</label>
                        <input
                          type="text"
                          value={specsData.usb_port}
                          onChange={(e) => setSpecsData({ ...specsData, usb_port: e.target.value })}
                          placeholder="USB Type-C"
                          className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* In-The-Box Items */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-3">
                    <h5 className="font-bold text-slate-300 text-xs flex items-center gap-1.5">
                      <Box className="w-3.5 h-3.5 text-amber-400" /> {formData.is_phone ? '5.' : '2.'} In-The-Box Package Contents
                    </h5>
                    <div className="space-y-1">
                      <label className="text-slate-400 text-[10px]">Comma-separated package contents</label>
                      <input
                        type="text"
                        value={specsData.in_the_box}
                        onChange={(e) => setSpecsData({ ...specsData, in_the_box: e.target.value })}
                        placeholder="Handset, 80W Charger, Cable, Protective Case, SIM Ejector, User Manual"
                        className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-white"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-vivo-600 to-vivo-500 hover:from-vivo-500 hover:to-vivo-400 text-white font-bold shadow-glow-blue transition-all flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingProductId ? 'Save & Update Product Specifications' : 'Publish Product to Catalog'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
