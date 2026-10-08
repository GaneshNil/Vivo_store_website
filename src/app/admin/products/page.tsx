'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/lib/store/store-context';
import { formatPrice, getStatusBadgeConfig, calculateEMI } from '@/lib/utils/formatters';
import { Product, ProductVariant, ProductImage } from '@/lib/types';
import { fireConfetti } from '@/lib/utils/confetti';
import { compressImageForUpload } from '@/lib/utils/image-compression';
import { getCategorySpecSchema, CategorySpecGroup } from '@/lib/data/category-specs-schema';
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
  CreditCard,
  ToggleLeft,
  ToggleRight,
  Loader2,
  Zap,
  Cable,
  Shield,
  Headphones,
  BatteryCharging,
  Watch,
  Speaker,
  HardDrive,
  Sliders,
  Tag
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
  const { products, brands, categories, series, storeSettings, addProduct, updateProduct, deleteProduct, setHeroFlagshipProduct, addBrand, updateBrand, deleteBrand, addSeries, updateSeries, deleteSeries } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedType, setSelectedType] = useState<'all' | 'phone' | 'accessory'>('all');
  
  // Series Management Modal State
  const [isSeriesModalOpen, setIsSeriesModalOpen] = useState(false);
  const [seriesFormData, setSeriesFormData] = useState({
    brand_id: brands[0]?.id || '',
    name: '',
    description: '',
  });

  // Brand Management Modal State
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [editingBrandId, setEditingBrandId] = useState<string | null>(null);
  const [brandDeleteConfirmId, setBrandDeleteConfirmId] = useState<string | null>(null);
  const [newSeriesNameInBrandModal, setNewSeriesNameInBrandModal] = useState('');
  const [brandFormData, setBrandFormData] = useState({
    name: '',
    slug: '',
    logo_url: '/assets/brands/vivo.svg',
    description: '',
    is_primary: false,
    sort_order: 1,
  });

  const BRAND_LOGO_PRESETS = [
    { name: 'VIVO', logo: '/assets/brands/vivo.svg' },
    { name: 'Samsung', logo: '/assets/brands/samsung.svg' },
    { name: 'OPPO', logo: '/assets/brands/oppo.svg' },
    { name: 'Realme', logo: '/assets/brands/realme.svg' },
    { name: 'Apple', logo: '/assets/brands/apple.svg' },
    { name: 'OnePlus', logo: '/assets/brands/oneplus.svg' },
    { name: 'Xiaomi', logo: '/assets/brands/xiaomi.svg' },
    { name: 'Nothing', logo: '/assets/brands/nothing.svg' },
    { name: 'Motorola', logo: '/assets/brands/motorola.svg' },
    { name: 'Google Pixel', logo: '/assets/brands/google.svg' },
    { name: 'iQOO', logo: '/assets/brands/iqoo.svg' },
    { name: 'Store Genuine', logo: '/assets/store-logo/IMG-20260822-WA0004.jpg' },
  ];

  // Brand Logo Upload from Device
  const [isUploadingBrandLogo, setIsUploadingBrandLogo] = useState(false);
  const [brandLogoUploadError, setBrandLogoUploadError] = useState<string | null>(null);

  const handleBrandLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingBrandLogo(true);
    setBrandLogoUploadError(null);

    try {
      // Scale and compress logo for fast, clean mobile/desktop display
      const compressed = await compressImageForUpload(file, 600, 0.88);

      try {
        const uploadFormData = new FormData();
        uploadFormData.append('file', compressed.file);
        uploadFormData.append('folder', 'brands');

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });

        if (res.ok) {
          const data = await res.json();
          if (data.url) {
            setBrandFormData(prev => ({ ...prev, logo_url: data.url }));
            return;
          }
        }
      } catch {
        // Fallback to client data URL if upload route is unavailable
      }

      if (compressed.dataUrl) {
        setBrandFormData(prev => ({ ...prev, logo_url: compressed.dataUrl }));
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to process brand logo';
      setBrandLogoUploadError(message);
    } finally {
      setIsUploadingBrandLogo(false);
      e.target.value = ''; // Reset input so selecting another image on phone triggers properly
    }
  };

  const handleOpenBrandModal = (brandToEdit?: typeof brands[0]) => {
    if (brandToEdit) {
      setEditingBrandId(brandToEdit.id);
      setBrandFormData({
        name: brandToEdit.name,
        slug: brandToEdit.slug,
        logo_url: brandToEdit.logo_url,
        description: brandToEdit.description || '',
        is_primary: brandToEdit.is_primary,
        sort_order: brandToEdit.sort_order || 1,
      });
    } else {
      setEditingBrandId(null);
      setBrandFormData({
        name: '',
        slug: '',
        logo_url: BRAND_LOGO_PRESETS[0].logo,
        description: '',
        is_primary: false,
        sort_order: brands.length + 1,
      });
    }
    setIsBrandModalOpen(true);
  };

  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandFormData.name.trim() || !brandFormData.logo_url.trim()) return;

    if (editingBrandId) {
      updateBrand(editingBrandId, {
        name: brandFormData.name.trim(),
        slug: brandFormData.slug.trim() || brandFormData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        logo_url: brandFormData.logo_url.trim(),
        description: brandFormData.description.trim(),
        is_primary: brandFormData.is_primary,
        sort_order: Number(brandFormData.sort_order) || 1,
      });
    } else {
      const created = addBrand({
        name: brandFormData.name.trim(),
        slug: brandFormData.slug.trim() || brandFormData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        logo_url: brandFormData.logo_url.trim(),
        description: brandFormData.description.trim(),
        is_primary: brandFormData.is_primary,
        sort_order: Number(brandFormData.sort_order) || brands.length + 1,
      });
      // If product modal is open, auto-select newly created brand
      if (isModalOpen) {
        setFormData(prev => ({ ...prev, brand_id: created.id }));
      }
    }

    fireConfetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
    setIsBrandModalOpen(false);
  };

  const handleSaveSeries = (e: React.FormEvent) => {
    e.preventDefault();
    if (!seriesFormData.name.trim() || !seriesFormData.brand_id) return;

    const created = addSeries({
      brand_id: seriesFormData.brand_id,
      name: seriesFormData.name.trim(),
      slug: seriesFormData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: seriesFormData.description.trim() || `${seriesFormData.name.trim()} lineup`,
    });

    if (isModalOpen) {
      setFormData(prev => ({ ...prev, series_id: created.id }));
    }

    fireConfetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
    setIsSeriesModalOpen(false);
    setSeriesFormData({ brand_id: formData.brand_id, name: '', description: '' });
  };
  
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

  // Bajaj Finance EMI Settings per Product (Default ON, can be manually turned OFF)
  const [isBajajEmiEnabled, setIsBajajEmiEnabled] = useState<boolean>(true);
  const [bajajInterestRate, setBajajInterestRate] = useState<number>(0);
  const [bajajTenureMonths, setBajajTenureMonths] = useState<number>(6);

  // Multiple Images State
  const [images, setImages] = useState<string[]>([]);
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
      ram: '',
      storage: '',
      color: '',
      mrp: 0,
      selling_price: 0,
      current_stock: 0,
      low_stock_threshold: 2,
      sku: '',
    }
  ]);

  // Technical Specifications & Hardware State
  const [specsData, setSpecsData] = useState({
    in_the_box: '',
  });

  // Dynamic Category Specifications & Custom Key-Value Specs
  const [categorySpecs, setCategorySpecs] = useState<Record<string, string>>({});
  const [customSpecs, setCustomSpecs] = useState<Array<{ id: string; key: string; value: string }>>([]);
  const [specValidationError, setSpecValidationError] = useState<string>('');

  // Active Category Specification Schema based on selected category
  const selectedCategoryObj = categories.find(c => c.id === formData.category_id);
  const activeSpecSchema: CategorySpecGroup = getCategorySpecSchema(
    selectedCategoryObj?.slug || formData.category_id || selectedCategoryObj?.name
  );

  // Real-time counter of filled specification fields (category fields + custom fields + in-the-box)
  const filledCategorySpecsCount = Object.values(categorySpecs).filter(
    v => typeof v === 'string' && v.trim().length > 0
  ).length;
  const filledCustomSpecsCount = customSpecs.filter(
    cs => cs.key.trim().length > 0 && cs.value.trim().length > 0
  ).length;
  const filledInTheBoxCount = specsData.in_the_box && specsData.in_the_box.trim().length > 0 ? 1 : 0;
  const totalFilledSpecs = filledCategorySpecsCount + filledCustomSpecsCount + filledInTheBoxCount;

  // Custom Spec Handlers
  const handleAddCustomSpec = () => {
    setCustomSpecs(prev => [
      ...prev,
      { id: `cs-${Date.now()}-${prev.length + 1}`, key: '', value: '' }
    ]);
  };

  const handleUpdateCustomSpec = (index: number, field: 'key' | 'value', val: string) => {
    setCustomSpecs(prev => {
      const copy = [...prev];
      if (copy[index]) {
        copy[index] = { ...copy[index], [field]: val };
      }
      return copy;
    });
  };

  const handleRemoveCustomSpec = (index: number) => {
    setCustomSpecs(prev => prev.filter((_, idx) => idx !== index));
  };

  // Open Modal for New Product
  const handleOpenAddModal = () => {
    setEditingProductId(null);
    setSpecValidationError('');
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
    setIsBajajEmiEnabled(true);
    setBajajInterestRate(0);
    setBajajTenureMonths(6);
    setImages([]);
    setPrimaryImageIndex(0);
    setVariants([
      {
        id: `var-init-1`,
        ram: '',
        storage: '',
        color: '',
        mrp: 0,
        selling_price: 0,
        current_stock: 0,
        low_stock_threshold: 2,
        sku: '',
      }
    ]);
    setSpecsData({
      in_the_box: '',
    });
    setCategorySpecs({});
    setCustomSpecs([]);
    setIsModalOpen(true);
  };

  // Open Modal to Edit Existing Product & Specs
  const handleOpenEditModal = (product: Product) => {
    setEditingProductId(product.id);
    setSpecValidationError('');
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

    setIsBajajEmiEnabled(product.is_bajaj_emi_enabled !== false);
    setBajajInterestRate(product.bajaj_emi_interest_rate ?? 0);
    setBajajTenureMonths(product.bajaj_emi_tenure_months || 6);

    // Images
    const prodImages = product.images && product.images.length > 0
      ? product.images.map(img => img.image_url)
      : [];
    setImages(prodImages);
    const primaryIdx = product.images?.findIndex(img => img.is_primary) ?? -1;
    setPrimaryImageIndex(primaryIdx >= 0 ? primaryIdx : 0);

    // Variants
    if (product.variants && product.variants.length > 0) {
      setVariants(product.variants.map((v, i) => ({
        id: v.id || `var-edit-${i}`,
        ram: v.ram || '',
        storage: v.storage || '',
        color: v.color || '',
        mrp: v.mrp,
        selling_price: v.selling_price,
        current_stock: v.current_stock,
        low_stock_threshold: v.low_stock_threshold,
        sku: v.sku,
      })));
    }

    // Specifications
    let rawS = product.specifications as any;
    if (typeof rawS === 'string') {
      try {
        rawS = JSON.parse(rawS);
      } catch {
        rawS = {};
      }
    }
    const s: any = (rawS && typeof rawS === 'object') ? rawS : {};
    setSpecsData({
      in_the_box: Array.isArray(s.in_the_box) ? s.in_the_box.join(', ') : (typeof s.in_the_box === 'string' ? s.in_the_box : ''),
    });

    // Populate Category-Specific Specs & Custom Key/Values
    const initialCategorySpecs: Record<string, string> = {};
    const initialCustomSpecs: Array<{ id: string; key: string; value: string }> = [];

    const productCat = categories.find(c => c.id === product.category_id);
    const schema = getCategorySpecSchema(productCat?.slug || product.category_id || productCat?.name);

    if (schema.id === 'cat-smartphones' || product.is_phone) {
      initialCategorySpecs['display'] = typeof s.display === 'string'
        ? s.display
        : (s.display?.screen_size || s.display?.size || s.display_specs || '');
      initialCategorySpecs['processor'] = typeof s.processor === 'string'
        ? s.processor
        : (s.processor?.chipset || s.processor_specs || '');
      initialCategorySpecs['camera'] = typeof s.camera === 'string'
        ? s.camera
        : (s.camera?.rear_main || s.camera_specs || '');
      initialCategorySpecs['battery'] = typeof s.battery === 'string'
        ? s.battery
        : (s.battery_charging?.capacity || s.battery_capacity || '');
      initialCategorySpecs['charging'] = typeof s.charging === 'string'
        ? s.charging
        : (s.battery_charging?.charging_speed || s.charging_speed || '');
      initialCategorySpecs['connectivity'] = typeof s.connectivity === 'string'
        ? s.connectivity
        : (s.connectivity?.network || s.processor?.network_connectivity || '');
      initialCategorySpecs['os'] = typeof s.os === 'string'
        ? s.os
        : (s.operating_system?.os_name || s.processor?.operating_system || '');
      initialCategorySpecs['sensors'] = typeof s.sensors === 'string' ? s.sensors : '';
    } else {
      schema.fields.forEach(f => {
        if (s[f.key] !== undefined) {
          initialCategorySpecs[f.key] = String(s[f.key]);
        } else if (s[f.label] !== undefined) {
          initialCategorySpecs[f.key] = String(s[f.label]);
        }
      });
    }

    // Extract custom specs
    if (Array.isArray(s.custom_specs)) {
      s.custom_specs.forEach((cs: any, idx: number) => {
        if (cs && cs.key) {
          initialCustomSpecs.push({
            id: `cs-${Date.now()}-${idx}`,
            key: cs.key,
            value: cs.value || '',
          });
        }
      });
    } else {
      const knownKeys = new Set([
        ...schema.fields.map(f => f.key), 
        'display', 'processor', 'camera', 'battery_charging', 'in_the_box', 'custom_specs', 'specifications', 'warranty_info', 'highlights'
      ]);
      Object.entries(s).forEach(([k, v]) => {
        if (!knownKeys.has(k) && typeof v === 'string' && v.trim()) {
          initialCustomSpecs.push({
            id: `cs-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            key: k.replace(/_/g, ' '),
            value: v,
          });
        }
      });
    }

    setCategorySpecs(initialCategorySpecs);
    setCustomSpecs(initialCustomSpecs);

    setIsModalOpen(true);
  };

  // Handle Multi-file Upload (Optimized for Mobile Phone Cameras & Galleries)
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
        setUploadProgressText(`Optimizing & uploading photo ${i + 1} of ${totalFiles}...`);

        // Compress phone photo on client side to max 1400px (turns 12MB raw photo into ~150KB)
        const compressed = await compressImageForUpload(file, 1400, 0.82);

        try {
          const data = new FormData();
          data.append('file', compressed.file);
          data.append('folder', 'products');

          const res = await fetch('/api/upload', {
            method: 'POST',
            body: data,
          });

          if (res.ok) {
            const result = await res.json();
            if (result.url) {
              uploadedUrls.push(result.url);
              continue;
            }
          }
        } catch {
          // Fallback to client data URL if upload API fails
        }

        if (compressed.dataUrl) {
          uploadedUrls.push(compressed.dataUrl);
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
      e.target.value = ''; // Reset input so selecting another camera photo on phone works every time
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

    // Minimum 3 specification fields validation
    const filledCatCount = Object.values(categorySpecs).filter(
      v => typeof v === 'string' && v.trim().length > 0
    ).length;
    const filledCustomCount = customSpecs.filter(
      cs => cs.key.trim().length > 0 && cs.value.trim().length > 0
    ).length;
    const filledBoxCount = specsData.in_the_box && specsData.in_the_box.trim().length > 0 ? 1 : 0;
    const totalFilled = filledCatCount + filledCustomCount + filledBoxCount;

    if (totalFilled < 3) {
      setSpecValidationError(`Please fill in at least 3 specification fields before publishing (currently filled: ${totalFilled}/3).`);
      const specEl = document.getElementById('specificationsSection');
      if (specEl) {
        specEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setSpecValidationError('');

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

    // Build Specifications Object dynamically based on category and custom specs
    const cleanCategorySpecs: Record<string, string> = {};
    Object.entries(categorySpecs).forEach(([k, v]) => {
      if (typeof v === 'string' && v.trim()) {
        cleanCategorySpecs[k] = v.trim();
      }
    });

    const specificationsObj: any = {
      ...cleanCategorySpecs,
    };

    if (specsData.in_the_box && specsData.in_the_box.trim()) {
      specificationsObj.in_the_box = specsData.in_the_box
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
    }

    if (customSpecs.length > 0) {
      const validCustom = customSpecs.filter(cs => cs.key.trim() && cs.value.trim());
      if (validCustom.length > 0) {
        specificationsObj.custom_specs = validCustom.map(cs => ({
          key: cs.key.trim(),
          value: cs.value.trim(),
        }));
        validCustom.forEach(cs => {
          const formattedKey = cs.key.trim().toLowerCase().replace(/\s+/g, '_');
          if (!specificationsObj[formattedKey]) {
            specificationsObj[formattedKey] = cs.value.trim();
          }
        });
      }
    }

    const productPayload = {
      name: formData.name,
      slug: generatedSlug,
      tagline: formData.tagline,
      description: formData.description || `${formData.name} available at Galaxy Mobile Gallery Begampur showroom.`,
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
      is_bajaj_emi_enabled: isBajajEmiEnabled,
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
          <h1 className="text-2xl font-extrabold text-slate-900 font-display">Products & Variants</h1>
          <p className="text-xs text-slate-500">Add, edit hardware specifications, Bajaj EMI ON/OFF toggle, photos & stock for mobiles & accessories.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleOpenBrandModal()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold shadow-sm hover:border-slate-300 transition-all"
          >
            <Layers className="w-4 h-4 text-vivo-600" />
            <span>Manage Brands ({brands.length})</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-vivo-600 hover:bg-vivo-700 text-white text-xs font-bold shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by product name or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-vivo-600 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-600 font-medium">Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-vivo-600 focus:bg-white"
            >
              <option value="all">All Catalog</option>
              <option value="phone">Smartphones Only</option>
              <option value="accessory">Accessories Only</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-600 font-medium">Brand:</span>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-vivo-600 focus:bg-white"
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
      <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Product Info</th>
                <th className="p-4">Brand / Series</th>
                <th className="p-4">Configured Variants (RAM / ROM)</th>
                <th className="p-4">Bajaj EMI Status</th>
                <th className="p-4">Starting Price</th>
                <th className="p-4">Stock Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map(prod => {
                const defaultVar = prod.variants.find(v => v.is_default) || prod.variants[0];
                const totalStock = prod.variants.reduce((acc, v) => acc + v.current_stock, 0);
                const statusConfig = getStatusBadgeConfig(defaultVar?.computed_status || 'IN_STOCK');
                const primaryImg = prod.images.find(img => img.is_primary) || prod.images[0];
                const isEmiOn = prod.is_bajaj_emi_enabled !== false;
                const emiRate = prod.bajaj_emi_interest_rate ?? 0;
                const emiTenure = prod.bajaj_emi_tenure_months || 6;
                const emiValue = defaultVar ? calculateEMI(defaultVar.selling_price, emiTenure, emiRate) : 0;

                return (
                  <tr key={prod.id} className="hover:bg-slate-50/70 transition-colors">
                    
                    {/* Image & Title */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 flex-shrink-0 shadow-inner">
                          {primaryImg && (
                            <Image
                              src={primaryImg.image_url}
                              alt={prod.name}
                              fill
                              className="object-contain p-1"
                            />
                          )}
                          {prod.images.length > 1 && (
                            <span className="absolute bottom-0.5 right-0.5 bg-vivo-600 text-white text-[8px] font-bold px-1 rounded shadow-xs">
                              +{prod.images.length - 1}
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <p className="font-bold text-slate-900 text-sm">{prod.name}</p>
                            {storeSettings.hero_flagship_product_id === prod.id && (
                              <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 font-extrabold text-[9px] border border-amber-200 flex items-center gap-0.5 shadow-xs">
                                <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> Hero Flagship
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500">/{prod.slug}</p>
                        </div>
                      </div>
                    </td>

                    {/* Brand / Series */}
                    <td className="p-4 text-slate-700">
                      <span className="font-semibold text-slate-900">{prod.brand?.name}</span>
                      {prod.series?.name && <p className="text-[11px] text-slate-500">{prod.series.name}</p>}
                    </td>

                    {/* Variants */}
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1.5">
                        {prod.variants.map((v, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-lg bg-slate-50 text-[10px] text-slate-800 border border-slate-200 font-medium">
                            {v.ram ? `${v.ram}/` : ''}{v.storage || v.color} · <strong className="text-emerald-700">{formatPrice(v.selling_price)}</strong> ({v.current_stock} pcs)
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Bajaj EMI Scheme */}
                    <td className="p-4">
                      {isEmiOn ? (
                        <div>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-bold text-[10px]">
                            <CreditCard className="w-3 h-3" />
                            <span>Bajaj Finance EMI Available</span>
                          </span>
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            {formatPrice(emiValue)}/mo · {emiTenure} mos
                          </p>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 font-semibold text-[10px]">
                          Disabled (OFF)
                        </span>
                      )}
                    </td>

                    {/* Price */}
                    <td className="p-4">
                      <p className="font-bold text-slate-900">{formatPrice(defaultVar?.selling_price || 0)}</p>
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
                                ? 'bg-amber-100 text-amber-800 border-amber-300 shadow-xs'
                                : 'bg-white hover:bg-slate-50 text-slate-400 hover:text-amber-600 border-slate-200'
                            }`}
                            title={storeSettings.hero_flagship_product_id === prod.id ? 'Current Hero Flagship Model' : 'Set as Hero Section Flagship Model'}
                          >
                            <Star className={`w-4 h-4 ${storeSettings.hero_flagship_product_id === prod.id ? 'fill-amber-500 text-amber-500' : ''}`} />
                          </button>
                        )}

                        {/* Edit Button */}
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(prod)}
                          className="p-1.5 rounded-lg bg-vivo-50 hover:bg-vivo-100 text-vivo-700 border border-vivo-200 transition-colors"
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
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border border-red-200 transition-colors"
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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-4xl rounded-3xl bg-white border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95">
            
            {/* Sticky Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-white flex-shrink-0">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  {editingProductId ? <Edit3 className="w-5 h-5 text-vivo-600" /> : <Smartphone className="w-5 h-5 text-vivo-600" />}
                  <span>{editingProductId ? 'Edit Product & Technical Specifications' : 'Add New Product to Catalog'}</span>
                </h3>
                <p className="text-xs text-slate-500">
                  {editingProductId 
                    ? 'Update name, prices, variants, photos, Bajaj EMI ON/OFF status and full hardware breakdown.' 
                    : 'Configure multi-RAM/ROM tiers, photos, Bajaj EMI ON/OFF switch & full specifications.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1.5 text-slate-700 hover:text-slate-900 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>

            <form id="productMainForm" onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs bg-slate-50/50">
              
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
                  <div className="flex items-center justify-between">
                    <label className="text-slate-300 font-semibold">Brand *</label>
                    <button
                      type="button"
                      onClick={() => handleOpenBrandModal()}
                      className="text-[10px] text-vivo-400 hover:underline font-bold"
                    >
                      + Add New Brand
                    </button>
                  </div>
                  <select
                    value={formData.brand_id}
                    onChange={(e) => setFormData({ ...formData, brand_id: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-vivo-500 font-medium"
                  >
                    {brands.map(b => (
                      <option key={b.id} value={b.id}>{b.name} {b.is_primary ? '(Primary Flagship Partner)' : ''}</option>
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
                    <div className="flex items-center justify-between">
                      <label className="text-slate-300 font-semibold">Series / Model Lineup</label>
                      <button
                        type="button"
                        onClick={() => {
                          setSeriesFormData({
                            brand_id: formData.brand_id,
                            name: '',
                            description: '',
                          });
                          setIsSeriesModalOpen(true);
                        }}
                        className="text-[11px] text-vivo-400 hover:text-vivo-300 font-semibold flex items-center gap-1"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>+ Add Series</span>
                      </button>
                    </div>
                    <select
                      value={formData.series_id || ''}
                      onChange={(e) => setFormData({ ...formData, series_id: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-vivo-500"
                    >
                      <option value="">No Series / General Lineup</option>
                      {series.filter(s => s.brand_id === formData.brand_id).map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                    {series.filter(s => s.brand_id === formData.brand_id).length === 0 && (
                      <p className="text-[10px] text-amber-400">
                        No series configured for this brand yet. Click &quot;+ Add Series&quot; above to create one.
                      </p>
                    )}
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

              {/* BAJAJ FINANCE EMI SCHEME CONFIGURATOR (WITH ON / OFF TOGGLE) */}
              <div className={`p-5 rounded-2xl border transition-all ${
                isBajajEmiEnabled ? 'bg-amber-500/[0.04] border-amber-500/20' : 'bg-slate-900/50 border-white/10 opacity-80'
              } space-y-3`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className={`w-4 h-4 ${isBajajEmiEnabled ? 'text-amber-400' : 'text-slate-400'}`} />
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        Bajaj Finance EMI Option
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        Enable or disable Bajaj Finance EMI for this product (Default is ON).
                      </p>
                    </div>
                  </div>

                  {/* Manual ON / OFF Toggle Switch */}
                  <label className="inline-flex items-center gap-2 cursor-pointer bg-slate-900 px-3 py-1.5 rounded-xl border border-white/10 hover:border-white/20 transition-all select-none">
                    <input
                      type="checkbox"
                      checked={isBajajEmiEnabled}
                      onChange={(e) => setIsBajajEmiEnabled(e.target.checked)}
                      className="sr-only"
                    />
                    <span className={`w-3 h-3 rounded-full ${isBajajEmiEnabled ? 'bg-emerald-400 shadow-glow-green' : 'bg-slate-500'}`} />
                    <span className={`text-xs font-bold ${isBajajEmiEnabled ? 'text-amber-300' : 'text-slate-400'}`}>
                      {isBajajEmiEnabled ? '⚡ Bajaj EMI: ON' : '✕ Bajaj EMI: OFF (Disabled)'}
                    </span>
                  </label>
                </div>

                {isBajajEmiEnabled ? (
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
                        inputMode="decimal"
                        value={bajajInterestRate === 0 ? '' : bajajInterestRate}
                        onChange={(e) => setBajajInterestRate(e.target.value === '' ? 0 : Number(e.target.value))}
                        placeholder="0 for Standard Scheme"
                        className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-bold focus:outline-none focus:border-amber-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-[10px] text-slate-400">
                        {bajajInterestRate === 0 ? '✓ Standard Bajaj Finance EMI Scheme' : `Custom ${bajajInterestRate}% Annual Rate Scheme`}
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
                        Based on {formatPrice(sampleSellingPrice)} price for {bajajTenureMonths} mos
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-400 italic pt-1">
                    Bajaj Finance EMI is disabled for this product. Customers will not see EMI options on this product page.
                  </p>
                )}
              </div>

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
                      accept="image/*,image/jpeg,image/png,image/webp,image/svg+xml,image/heic,image/heif,.heic,.heif"
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
                              min="0"
                              inputMode="numeric"
                              required
                              placeholder="e.g. 29999"
                              value={v.mrp === 0 ? '' : v.mrp}
                              onChange={(e) => handleUpdateVariant(index, 'mrp', e.target.value === '' ? 0 : Number(e.target.value))}
                              className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-white font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-slate-400 text-[11px]">Selling Price (₹) *</label>
                            <input
                              type="number"
                              min="0"
                              inputMode="numeric"
                              required
                              placeholder="e.g. 24999"
                              value={v.selling_price === 0 ? '' : v.selling_price}
                              onChange={(e) => handleUpdateVariant(index, 'selling_price', e.target.value === '' ? 0 : Number(e.target.value))}
                              className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-emerald-400 font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-slate-400 text-[11px]">Available Stock (pcs) *</label>
                            <input
                              type="number"
                              min="0"
                              inputMode="numeric"
                              required
                              placeholder="0"
                              value={v.current_stock === 0 ? '' : v.current_stock}
                              onChange={(e) => handleUpdateVariant(index, 'current_stock', e.target.value === '' ? 0 : Number(e.target.value))}
                              className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-white font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-slate-400 text-[11px]">Low Stock Threshold</label>
                            <input
                              type="number"
                              min="0"
                              inputMode="numeric"
                              placeholder="0"
                              value={v.low_stock_threshold === 0 ? '' : v.low_stock_threshold}
                              onChange={(e) => handleUpdateVariant(index, 'low_stock_threshold', e.target.value === '' ? 0 : Number(e.target.value))}
                              className="w-full p-2 rounded-lg bg-slate-950 border border-white/10 text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>

              {/* DYNAMIC CATEGORY-SPECIFIC PRODUCT SPECIFICATIONS */}
              <div id="specificationsSection" className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4 scroll-mt-20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                  <div>
                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                      <Settings2 className="w-4 h-4 text-origin-cyan" />
                      <span>Product Specifications & Features</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-vivo-500/20 text-vivo-300 border border-vivo-500/30 text-[10px] font-bold">
                        {activeSpecSchema.name}
                      </span>
                    </h4>
                    <p className="text-[11px] text-slate-400">{activeSpecSchema.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {totalFilledSpecs >= 3 ? (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1.5 shadow-sm">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>{totalFilledSpecs} Specs (Publish Ready)</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-bold flex items-center gap-1.5 shadow-sm">
                        <AlertCircle className="w-3 h-3 text-amber-400" />
                        <span>{totalFilledSpecs} / 3 Minimum Specs</span>
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-white/5">
                      {activeSpecSchema.fields.length} Category Fields
                    </span>
                  </div>
                </div>

                {/* Validation Error Banner if fewer than 3 specs are filled */}
                {specValidationError && (
                  <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center gap-2.5 text-amber-200 text-xs animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span className="font-semibold">{specValidationError}</span>
                  </div>
                )}

                <div className="space-y-4">
                  
                  {/* Category-Adaptive Form Fields in 2-Column Grid */}
                  {activeSpecSchema.fields.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {activeSpecSchema.fields.map(field => (
                        <div 
                          key={field.key} 
                          className="space-y-1 p-3 rounded-xl bg-slate-900/90 border border-white/5 hover:border-white/10 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <label className="text-slate-300 font-semibold text-[11px] flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-vivo-400" />
                              <span>{field.label}</span>
                            </label>
                            <span className="text-[9px] font-mono text-slate-500 uppercase">{field.key}</span>
                          </div>
                          <input
                            type="text"
                            value={categorySpecs[field.key] || ''}
                            onChange={(e) => setCategorySpecs(prev => ({ ...prev, [field.key]: e.target.value }))}
                            placeholder={field.placeholder}
                            className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-vivo-500 transition-colors"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 text-center text-xs text-slate-400 space-y-1">
                      <p className="font-semibold text-slate-300">Custom Accessory Category</p>
                      <p className="text-[11px] text-slate-500">Add custom specifications below using the &quot;+ Add Specification&quot; button.</p>
                    </div>
                  )}

                  {/* In-The-Box Items */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-2">
                    <h5 className="font-bold text-slate-300 text-xs flex items-center gap-1.5">
                      <Box className="w-3.5 h-3.5 text-amber-400" />
                      <span>In-The-Box Package Contents</span>
                    </h5>
                    <div className="space-y-1">
                      <input
                        type="text"
                        value={specsData.in_the_box}
                        onChange={(e) => setSpecsData({ ...specsData, in_the_box: e.target.value })}
                        placeholder="e.g. Handset / Accessory, Charging Cable, User Manual, Warranty Card"
                        className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-vivo-500"
                      />
                      <span className="text-[10px] text-slate-500">Enter comma-separated items included in retail packaging</span>
                    </div>
                  </div>

                  {/* CUSTOM SPECIFICATIONS BUILDER (+ ADD SPECIFICATION) */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                        <Sliders className="w-3.5 h-3.5 text-amber-400" />
                        <span>Additional / Custom Specifications ({customSpecs.length})</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddCustomSpec}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-vivo-600/20 hover:bg-vivo-600/30 text-vivo-300 hover:text-white text-xs font-bold border border-vivo-500/30 transition-all shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>+ Add Specification</span>
                      </button>
                    </div>

                    {customSpecs.length > 0 ? (
                      <div className="space-y-2 pt-1">
                        {customSpecs.map((cs, idx) => (
                          <div key={cs.id} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2.5 rounded-xl bg-slate-950 border border-white/10">
                            <input
                              type="text"
                              placeholder="Specification Name (e.g. Weight, Frequency Response, Fast Pairing)"
                              value={cs.key}
                              onChange={(e) => handleUpdateCustomSpec(idx, 'key', e.target.value)}
                              className="w-full sm:w-1/3 p-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-vivo-500"
                            />
                            <input
                              type="text"
                              placeholder="Specification Value (e.g. 185g, 20Hz - 20kHz, Yes Google Fast Pair)"
                              value={cs.value}
                              onChange={(e) => handleUpdateCustomSpec(idx, 'value', e.target.value)}
                              className="flex-1 p-2 rounded-lg bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-vivo-500"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveCustomSpec(idx)}
                              className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors flex items-center justify-center"
                              title="Remove specification"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-500 italic">
                        Need extra specs not listed above? Click &quot;+ Add Specification&quot; to add custom key-value details.
                      </p>
                    )}
                  </div>

                </div>
              </div>
            </form>

            {/* Sticky Form Footer */}
            <div className="p-4 px-6 border-t border-slate-200 bg-white flex items-center justify-between gap-3 sticky bottom-0 z-10 flex-shrink-0">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                Close & Cancel
              </button>

              <button
                type="submit"
                form="productMainForm"
                className="px-6 py-2.5 rounded-xl bg-vivo-600 hover:bg-vivo-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>{editingProductId ? 'Save Product Changes' : 'Publish Product to Showroom'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Brand Management Modal */}
      {isBrandModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95">
            
            {/* Sticky Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-white flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-vivo-50 border border-vivo-200 flex items-center justify-center text-vivo-600">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                    {editingBrandId ? 'Edit Brand Details' : 'Brand Management & Addition'}
                  </h3>
                  <p className="text-xs text-slate-500">Manage showroom brands, upload logos from phone/PC or select presets.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsBrandModalOpen(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Close Modal"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="flex-1 overflow-y-auto">
              
              {/* Existing Brands List */}
              {!editingBrandId && (
                <div className="p-4 sm:p-6 border-b border-white/5 space-y-3 bg-slate-950/40">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                    <span>Current Store Brands ({brands.length})</span>
                    <span className="text-[11px] text-slate-500 font-normal">Click edit icon to modify brand details</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-44 overflow-y-auto pr-1">
                    {brands.map(b => {
                      const prodCount = products.filter(p => p.brand_id === b.id).length;
                      return (
                        <div
                          key={b.id}
                          className="p-2.5 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-between gap-3 group hover:border-white/20 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-slate-950 border border-white/10 flex-shrink-0 p-1 flex items-center justify-center">
                              <Image src={b.logo_url} alt={b.name} fill className="object-contain p-1" />
                            </div>
                            <div className="truncate">
                              <span className="font-bold text-white text-xs block truncate">{b.name}</span>
                              <span className="text-[10px] text-slate-400">{prodCount} products {b.is_primary ? '· Flagship' : ''}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleOpenBrandModal(b)}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-vivo-600/30 text-slate-300 hover:text-vivo-300 text-xs transition-colors"
                              title="Edit brand"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            {brands.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (prodCount > 0) {
                                    alert(`Cannot delete brand "${b.name}" because it currently has ${prodCount} products associated with it. Please reassign or delete the products first.`);
                                    return;
                                  }
                                  setBrandDeleteConfirmId(b.id);
                                }}
                                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                                title="Delete brand"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Brand Add/Edit Form */}
              <form id="brandForm" onSubmit={handleSaveBrand} className="p-4 sm:p-6 space-y-4 text-xs">
                <h4 className="text-xs font-bold text-vivo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{editingBrandId ? 'Update Brand Details' : '+ Add New Brand to Showroom'}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Brand Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. OnePlus, Apple, Nothing"
                      value={brandFormData.name}
                      onChange={(e) => {
                        const name = e.target.value;
                        const preset = BRAND_LOGO_PRESETS.find(p => p.name.toLowerCase() === name.trim().toLowerCase());
                        setBrandFormData({
                          ...brandFormData,
                          name,
                          slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                          logo_url: preset ? preset.logo : brandFormData.logo_url
                        });
                      }}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-bold focus:border-vivo-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">URL Slug *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. oneplus, apple, nothing"
                      value={brandFormData.slug}
                      onChange={(e) => setBrandFormData({ ...brandFormData, slug: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-mono text-[11px] focus:border-vivo-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Logo URL & Device Upload */}
                <div className="space-y-2.5 p-3.5 rounded-2xl bg-slate-900/60 border border-white/10">
                  <div className="flex items-center justify-between">
                    <label className="text-slate-200 font-semibold flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-vivo-400" />
                      <span>Official Brand Logo Graphic *</span>
                    </label>
                    {brandLogoUploadError ? (
                      <span className="text-[10px] text-rose-400 font-medium">{brandLogoUploadError}</span>
                    ) : brandFormData.logo_url ? (
                      <span className="text-[10px] text-emerald-400 font-medium">Logo selected</span>
                    ) : null}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                    <label className={`cursor-pointer px-3.5 py-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all shadow-sm flex-shrink-0 ${
                      isUploadingBrandLogo
                        ? 'bg-slate-800 text-slate-400 border-white/10'
                        : 'bg-gradient-to-r from-vivo-600 to-vivo-500 hover:from-vivo-500 text-white border-vivo-400/40 shadow-glow-blue'
                    }`}>
                      {isUploadingBrandLogo ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Logo from Device</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*,image/jpeg,image/png,image/webp,image/svg+xml,image/heic,image/heif,.heic,.heif"
                        disabled={isUploadingBrandLogo}
                        onChange={handleBrandLogoUpload}
                        className="hidden"
                      />
                    </label>

                    <div className="flex items-center gap-2 flex-1">
                      <div className="relative w-9 h-9 rounded-xl bg-slate-950 border border-white/10 p-1 flex-shrink-0 flex items-center justify-center">
                        {brandFormData.logo_url && (
                          <Image src={brandFormData.logo_url} alt="Logo preview" fill className="object-contain p-1" />
                        )}
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Or paste Logo image URL (SVG/PNG)"
                        value={brandFormData.logo_url}
                        onChange={(e) => setBrandFormData({ ...brandFormData, logo_url: e.target.value })}
                        className="flex-1 p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-mono text-[11px] focus:border-vivo-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Logo Presets */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] text-slate-500">Or Pick 1-Click Official Preset:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {BRAND_LOGO_PRESETS.map((bp, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setBrandFormData({
                            ...brandFormData,
                            logo_url: bp.logo,
                            name: brandFormData.name || bp.name,
                            slug: brandFormData.slug || bp.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                          })}
                          className={`px-2 py-1 rounded-lg border text-[10px] transition-all flex items-center gap-1.5 ${
                            brandFormData.logo_url === bp.logo
                              ? 'bg-vivo-600/30 text-vivo-300 border-vivo-500/50 font-bold'
                              : 'bg-slate-900 text-slate-400 border-white/5 hover:text-white'
                          }`}
                        >
                          <div className="relative w-3 h-3 flex-shrink-0">
                            <Image src={bp.logo} alt={bp.name} fill className="object-contain" />
                          </div>
                          <span>{bp.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Brand Tagline / Description</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Flagship imaging, super-fast charging & clean operating system"
                    value={brandFormData.description}
                    onChange={(e) => setBrandFormData({ ...brandFormData, description: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-vivo-500 focus:outline-none"
                  />
                </div>

                {/* Primary Flagship Partner Checkbox */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white block">Primary Flagship Partner</span>
                    <span className="text-[10px] text-slate-400">Highlights this brand with a special badge in the customer showroom.</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={brandFormData.is_primary}
                      onChange={(e) => setBrandFormData({ ...brandFormData, is_primary: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-vivo-600"></div>
                  </label>
                </div>

              </form>
            </div>

            {/* Sticky Modal Footer */}
            <div className="p-4 px-6 border-t border-white/10 bg-slate-900/95 backdrop-blur-md flex items-center justify-between gap-3 sticky bottom-0 z-10 flex-shrink-0">
              <button
                type="button"
                onClick={() => setIsBrandModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
              >
                Close Modal
              </button>

              <div className="flex items-center gap-3">
                {editingBrandId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingBrandId(null);
                      setBrandFormData({
                        name: '',
                        slug: '',
                        logo_url: BRAND_LOGO_PRESETS[0].logo,
                        description: '',
                        is_primary: false,
                        sort_order: brands.length + 1,
                      });
                    }}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-semibold"
                  >
                    Cancel Edit
                  </button>
                )}
                <button
                  type="submit"
                  form="brandForm"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-vivo-600 to-vivo-500 hover:from-vivo-500 text-white font-bold text-xs shadow-glow-blue transition-all"
                >
                  {editingBrandId ? 'Save Brand Changes' : 'Add Brand to Catalog'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Series Management Modal */}
      {isSeriesModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0a0f1d] border border-vivo-500/30 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-vivo-600/20 text-vivo-400 flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-display">Create Smartphone Series</h4>
                  <p className="text-[11px] text-slate-400">Add a model lineup for the selected brand</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSeriesModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSeries} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Target Brand *</label>
                <select
                  value={seriesFormData.brand_id}
                  onChange={(e) => setSeriesFormData({ ...seriesFormData, brand_id: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-vivo-500"
                >
                  {brands.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Series / Lineup Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Galaxy S Series, Reno Series, Nord Series"
                  value={seriesFormData.name}
                  onChange={(e) => setSeriesFormData({ ...seriesFormData, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-bold focus:border-vivo-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Description / Key Selling Point</label>
                <input
                  type="text"
                  placeholder="e.g. Flagship AI Cameras & Ultra Performance"
                  value={seriesFormData.description}
                  onChange={(e) => setSeriesFormData({ ...seriesFormData, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-vivo-500 focus:outline-none"
                />
              </div>

              {/* Existing Series for Selected Brand */}
              {series.filter(s => s.brand_id === seriesFormData.brand_id).length > 0 && (
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Existing Series for this Brand:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {series.filter(s => s.brand_id === seriesFormData.brand_id).map(s => (
                      <span key={s.id} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-slate-300">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsSeriesModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-vivo-600 hover:bg-vivo-500 text-white font-bold text-xs shadow-glow-blue"
                >
                  Create Series
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Brand Delete Confirmation */}
      {brandDeleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-red-500/30 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Delete Brand?</h4>
              <p className="text-xs text-slate-400 mt-1">
                Are you sure you want to remove this brand from the store?
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setBrandDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteBrand(brandDeleteConfirmId);
                  setBrandDeleteConfirmId(null);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
