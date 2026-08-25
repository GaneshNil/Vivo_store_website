'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  Product,
  Brand,
  Category,
  Series,
  Offer,
  Banner,
  Review,
  StoreSettings,
  StockMovement,
  IncomingStock,
  PriceHistoryItem,
  NotifyRequest,
  AuditLog,
  ProductVariant,
  ProductStatus,
  StockMovementReason,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_BRANDS,
  INITIAL_CATEGORIES,
  INITIAL_SERIES,
  INITIAL_OFFERS,
  INITIAL_BANNERS,
  INITIAL_REVIEWS,
  INITIAL_STORE_SETTINGS,
} from '../data/seed-data';

interface StoreContextType {
  products: Product[];
  brands: Brand[];
  categories: Category[];
  series: Series[];
  offers: Offer[];
  banners: Banner[];
  reviews: Review[];
  storeSettings: StoreSettings;
  stockMovements: StockMovement[];
  incomingStockList: IncomingStock[];
  priceHistory: PriceHistoryItem[];
  notifyRequests: NotifyRequest[];
  auditLogs: AuditLog[];
  compareList: Product[];
  wishlist: string[]; // product IDs

  // Product Actions
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string, soft?: boolean) => void;

  // Brand Actions
  addBrand: (brand: Omit<Brand, 'id'>) => Brand;
  updateBrand: (id: string, updates: Partial<Brand>) => void;
  deleteBrand: (id: string) => void;
  
  // Inventory & Price Actions
  updateVariantPrice: (productId: string, variantId: string, mrp: number, sellingPrice: number, reason?: string) => void;
  updateVariantStock: (productId: string, variantId: string, currentStock: number, reason: StockMovementReason, notes?: string) => void;
  addIncomingStock: (item: Omit<IncomingStock, 'id' | 'status' | 'created_at' | 'admin_email'>) => void;
  receiveIncomingStock: (incomingId: string) => void;

  // Store Offers & Schemes Actions
  addOffer: (offer: Omit<Offer, 'id' | 'created_at'>) => Offer;
  updateOffer: (id: string, updates: Partial<Offer>) => void;
  deleteOffer: (id: string) => void;
  toggleOfferStatus: (id: string) => void;
  reorderOffers: (reorderedOffers: Offer[]) => void;

  submitNotifyRequest: (req: Omit<NotifyRequest, 'id' | 'status' | 'created_at'>) => void;
  submitReview: (rev: Omit<Review, 'id' | 'created_at' | 'is_approved'>) => void;
  updateStoreSettings: (settings: StoreSettings) => void;
  setHeroFlagshipProduct: (productId: string) => void;
  
  // Compare & Wishlist
  addToCompare: (product: Product) => boolean;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Filter Helpers
  getPhones: () => Product[];
  getAccessories: () => Product[];
  getFeaturedVivo: () => Product[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEY = 'galaxy_mobile_store_data_v1';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [brands, setBrands] = useState<Brand[]>(INITIAL_BRANDS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [series, setSeries] = useState<Series[]>(INITIAL_SERIES);
  const [offers, setOffers] = useState<Offer[]>(INITIAL_OFFERS);
  const [banners, setBanners] = useState<Banner[]>(INITIAL_BANNERS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(INITIAL_STORE_SETTINGS);
  
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([
    {
      id: 'sm-init-1',
      variant_id: 'var-v40-8-256-blu',
      product_name: 'VIVO V40 Pro 5G',
      variant_label: '8GB/256GB Ganges Blue',
      quantity_change: 6,
      previous_stock: 0,
      new_stock: 6,
      reason: 'stock_received',
      reference_no: 'INV-VIVO-2026-08',
      supplier: 'VIVO India Official Distribution',
      notes: 'Initial launch batch received at Begampur store',
      admin_email: 'admin@galaxymobile.com',
      created_at: '2026-08-20T10:00:00Z',
    },
    {
      id: 'sm-init-2',
      variant_id: 'var-x100-16-512-blk',
      product_name: 'VIVO X100 Pro 5G',
      variant_label: '16GB/512GB Asteroid Black',
      quantity_change: 4,
      previous_stock: 0,
      new_stock: 4,
      reason: 'stock_received',
      reference_no: 'INV-VIVO-2026-08',
      supplier: 'VIVO India Official Distribution',
      notes: 'Flagship stock received',
      admin_email: 'admin@galaxymobile.com',
      created_at: '2026-08-20T10:00:00Z',
    }
  ]);

  const [incomingStockList, setIncomingStockList] = useState<IncomingStock[]>([
    {
      id: 'inc-1',
      variant_id: 'var-y200e-6-128-ora',
      product_name: 'VIVO Y200e 5G',
      variant_label: '6GB/128GB Saffron Delight Leather',
      incoming_quantity: 10,
      supplier: 'VIVO Regional Hub Pune',
      expected_arrival_date: '2026-08-30',
      reference_no: 'PO-88392',
      notes: 'High festive demand expected',
      status: 'PENDING',
      admin_email: 'admin@galaxymobile.com',
      created_at: '2026-08-22T09:00:00Z',
    },
    {
      id: 'inc-2',
      variant_id: 'var-x100-16-512-ora',
      product_name: 'VIVO X100 Pro 5G',
      variant_label: '16GB/512GB Sunset Orange Leather',
      incoming_quantity: 3,
      supplier: 'VIVO India Direct',
      expected_arrival_date: '2026-08-28',
      reference_no: 'PO-88401',
      notes: 'VIP Customer request reservations',
      status: 'PENDING',
      admin_email: 'admin@galaxymobile.com',
      created_at: '2026-08-22T11:30:00Z',
    }
  ]);

  const [priceHistory, setPriceHistory] = useState<PriceHistoryItem[]>([
    {
      id: 'ph-1',
      variant_id: 'var-v40-8-256-blu',
      product_name: 'VIVO V40 Pro 5G',
      variant_label: '8GB/256GB Ganges Blue',
      old_mrp: 54999,
      new_mrp: 54999,
      old_selling_price: 52999,
      new_selling_price: 49999,
      old_discount: 3.63,
      new_discount: 9.09,
      reason: 'Launch Special Introductory Offer',
      admin_email: 'admin@galaxymobile.com',
      created_at: '2026-08-18T10:00:00Z',
    }
  ]);

  const [notifyRequests, setNotifyRequests] = useState<NotifyRequest[]>([
    {
      id: 'notif-1',
      product_id: 'prod-vivo-y200e-5g',
      product_name: 'VIVO Y200e 5G (Saffron Delight Leather)',
      variant_id: 'var-y200e-6-128-ora',
      variant_label: '6GB/128GB Saffron Delight',
      customer_name: 'Kiran Mane',
      customer_phone: '9822334455',
      customer_email: 'kiran.mane@example.com',
      status: 'PENDING',
      notes: 'Wants to purchase via Bajaj EMI once available',
      created_at: '2026-08-22T14:20:00Z',
    }
  ]);

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      id: 'audit-1',
      admin_email: 'admin@galaxymobile.com',
      action: 'INITIAL_STORE_BOOTSTRAP',
      entity_type: 'SYSTEM',
      details: { message: 'Galaxy Mobile Gallery database initialized' },
      created_at: '2026-08-20T08:00:00Z',
    }
  ]);

  const [compareList, setCompareList] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  // Real-time Multi-Device Sync Refs
  const currentVersionRef = React.useRef<number>(0);
  const isApplyingRemoteRef = React.useRef<boolean>(false);
  const syncTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Helper to apply remote data to React state
  const applyRemoteData = React.useCallback((remoteData: any, version: number) => {
    if (!remoteData) return;
    isApplyingRemoteRef.current = true;
    currentVersionRef.current = version;

    if (Array.isArray(remoteData.products)) setProducts(remoteData.products);
    if (Array.isArray(remoteData.brands)) setBrands(remoteData.brands);
    if (Array.isArray(remoteData.offers)) setOffers(remoteData.offers);
    if (Array.isArray(remoteData.categories)) setCategories(remoteData.categories);
    if (Array.isArray(remoteData.series)) setSeries(remoteData.series);
    if (remoteData.storeSettings) setStoreSettings(remoteData.storeSettings);
    if (Array.isArray(remoteData.stockMovements)) setStockMovements(remoteData.stockMovements);
    if (Array.isArray(remoteData.incomingStockList)) setIncomingStockList(remoteData.incomingStockList);
    if (Array.isArray(remoteData.priceHistory)) setPriceHistory(remoteData.priceHistory);
    if (Array.isArray(remoteData.notifyRequests)) setNotifyRequests(remoteData.notifyRequests);

    // Merge Audit Logs monotonically so they are permanently preserved
    setAuditLogs(prev => {
      const map = new Map();
      [...(prev || []), ...(Array.isArray(remoteData.auditLogs) ? remoteData.auditLogs : [])].forEach(l => {
        if (l && l.id) map.set(l.id, l);
      });
      return Array.from(map.values()).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    });

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteData));
    } catch {
      // Ignore quota errors
    }

    setTimeout(() => {
      isApplyingRemoteRef.current = false;
    }, 100);
  }, []);

  // Poll or check server for latest updates from other devices
  const checkServerSync = React.useCallback(async () => {
    try {
      const res = await fetch(`/api/sync?v=${currentVersionRef.current}`, { cache: 'no-store' });
      if (!res.ok) return;
      const result = await res.json();

      if (!result.upToDate && result.data && result.version) {
        applyRemoteData(result.data, result.version);
      }
    } catch {
      // Server sync error (e.g. offline)
    }
  }, [applyRemoteData]);

  // Load initial state and initiate real-time listeners
  useEffect(() => {
    // 1. Instant local storage bootstrap
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.products && Array.isArray(parsed.products)) {
          const existingIds = new Set(parsed.products.map((p: Product) => p.id));
          const missingDefaults = INITIAL_PRODUCTS.filter(p => !existingIds.has(p.id));
          setProducts([...parsed.products, ...missingDefaults]);
        }
        if (parsed.brands && Array.isArray(parsed.brands)) {
          const defaultLogoMap = new Map(INITIAL_BRANDS.map(b => [b.id, b.logo_url]));
          const normalizedBrands = parsed.brands.map((b: Brand) => {
            if (defaultLogoMap.has(b.id) && b.logo_url.startsWith('http')) {
              return { ...b, logo_url: defaultLogoMap.get(b.id) || b.logo_url };
            }
            return b;
          });
          const existingIds = new Set(normalizedBrands.map((b: Brand) => b.id));
          const missingDefaults = INITIAL_BRANDS.filter(b => !existingIds.has(b.id));
          setBrands([...normalizedBrands, ...missingDefaults]);
        }
        if (parsed.offers && Array.isArray(parsed.offers)) setOffers(parsed.offers);
        if (parsed.stockMovements) setStockMovements(parsed.stockMovements);
        if (parsed.incomingStockList) setIncomingStockList(parsed.incomingStockList);
        if (parsed.priceHistory) setPriceHistory(parsed.priceHistory);
        if (parsed.notifyRequests) setNotifyRequests(parsed.notifyRequests);
        if (parsed.auditLogs) setAuditLogs(parsed.auditLogs);
        if (parsed.storeSettings) setStoreSettings(parsed.storeSettings);
      }
    } catch (e) {
      console.warn('Failed to load local store state:', e);
    }
    setIsLoaded(true);

    // 2. Fetch shared live state from server
    checkServerSync();

    // 3. Heartbeat polling every 3 seconds for cross-device synchronization
    const interval = setInterval(() => {
      checkServerSync();
    }, 3000);

    // 4. Tab visibility change & focus listener (instant check when mobile screen turns on)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkServerSync();
      }
    };
    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', checkServerSync);

    // 5. BroadcastChannel for instant 0ms tab-to-tab sync on same device
    let channel: BroadcastChannel | null = null;
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        channel = new BroadcastChannel('galaxy_store_sync_channel');
        channel.onmessage = (event) => {
          if (event.data?.type === 'SYNC_REQUEST') {
            checkServerSync();
          }
        };
      }
    } catch {
      // BroadcastChannel fallback
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', checkServerSync);
      if (channel) channel.close();
    };
  }, [checkServerSync, applyRemoteData]);

  // Push updates to server and localStorage whenever state changes locally
  useEffect(() => {
    if (!isLoaded || isApplyingRemoteRef.current) return;

    const dataToSave = {
      products,
      brands,
      offers,
      categories,
      series,
      stockMovements,
      incomingStockList,
      priceHistory,
      notifyRequests,
      auditLogs,
      storeSettings,
    };

    // Save to local storage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.warn('Failed to persist store state to localStorage:', e);
    }

    // Fast server push (100ms) to ensure instant synchronization without lagging
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }

    syncTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSave),
        });
        if (res.ok) {
          const result = await res.json();
          if (result.version) {
            currentVersionRef.current = result.version;
          }

          // Broadcast to other tabs on same device
          if (typeof BroadcastChannel !== 'undefined') {
            try {
              const channel = new BroadcastChannel('galaxy_store_sync_channel');
              channel.postMessage({ type: 'SYNC_REQUEST', version: result.version });
              channel.close();
            } catch {
              // Ignore
            }
          }
        }
      } catch (err) {
        console.warn('Failed to push state to server:', err);
      }
    }, 100);

    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, [
    products, 
    brands, 
    offers, 
    categories, 
    series, 
    stockMovements, 
    incomingStockList, 
    priceHistory, 
    notifyRequests, 
    auditLogs, 
    storeSettings, 
    isLoaded
  ]);

  // Helper: compute status based on stock and incoming
  const computeStatus = (
    currentStock: number,
    lowStockThreshold: number,
    incomingStock: number,
    manualStatus?: ProductStatus | null
  ): ProductStatus => {
    if (manualStatus === 'DISCONTINUED' || manualStatus === 'HIDDEN') {
      return manualStatus;
    }
    if (currentStock > lowStockThreshold) {
      return 'IN_STOCK';
    }
    if (currentStock > 0 && currentStock <= lowStockThreshold) {
      return 'LOW_STOCK';
    }
    if (currentStock === 0 && incomingStock > 0) {
      return 'COMING_SOON';
    }
    return 'OUT_OF_STOCK';
  };

  // Helper: compute discount percent
  const computeDiscount = (mrp: number, sellingPrice: number): number => {
    if (mrp <= 0) return 0;
    return Number((((mrp - sellingPrice) / mrp) * 100).toFixed(2));
  };

  // 1. Add Product
  const addProduct = (newProdData: Omit<Product, 'id'>): Product => {
    const id = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...newProdData,
      id,
      variants: newProdData.variants.map((v, idx) => ({
        ...v,
        id: v.id || `var-${id}-${idx + 1}`,
        product_id: id,
        discount_percent: computeDiscount(v.mrp, v.selling_price),
        computed_status: computeStatus(v.current_stock, v.low_stock_threshold, v.incoming_stock, v.manual_status),
      })),
      images: newProdData.images.map((img, idx) => ({
        ...img,
        id: img.id || `img-${id}-${idx + 1}`,
        product_id: id,
      })),
    };

    setProducts(prev => [newProduct, ...prev]);

    // Audit log
    setAuditLogs(prev => [
      {
        id: `audit-${Date.now()}`,
        admin_email: 'admin@galaxymobile.com',
        action: 'PRODUCT_CREATED',
        entity_type: 'PRODUCT',
        entity_id: id,
        details: { name: newProduct.name, slug: newProduct.slug },
        created_at: new Date().toISOString(),
      },
      ...prev,
    ]);

    return newProduct;
  };

  // 2. Update Product
  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(prod => {
        if (prod.id !== id) return prod;
        const updated = { ...prod, ...updates };
        if (updates.variants) {
          updated.variants = updates.variants.map(v => ({
            ...v,
            discount_percent: computeDiscount(v.mrp, v.selling_price),
            computed_status: computeStatus(v.current_stock, v.low_stock_threshold, v.incoming_stock, v.manual_status),
          }));
        }
        return updated;
      })
    );

    setAuditLogs(prev => [
      {
        id: `audit-${Date.now()}`,
        admin_email: 'admin@galaxymobile.com',
        action: 'PRODUCT_UPDATED',
        entity_type: 'PRODUCT',
        entity_id: id,
        details: { fields: Object.keys(updates) },
        created_at: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  // 3. Delete / Soft-deactivate Product
  const deleteProduct = (id: string, soft: boolean = true) => {
    if (soft) {
      setProducts(prev =>
        prev.map(p => (p.id === id ? { ...p, is_active: false } : p))
      );
    } else {
      setProducts(prev => prev.filter(p => p.id !== id));
    }

    setAuditLogs(prev => [
      {
        id: `audit-${Date.now()}`,
        admin_email: 'admin@galaxymobile.com',
        action: soft ? 'PRODUCT_DEACTIVATED' : 'PRODUCT_DELETED',
        entity_type: 'PRODUCT',
        entity_id: id,
        created_at: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  // 3b. Brand Actions
  const addBrand = (brandData: Omit<Brand, 'id'>): Brand => {
    const slug = brandData.slug || brandData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const id = `brand-${slug}-${Date.now()}`;
    const newBrand: Brand = {
      ...brandData,
      id,
      slug,
      created_at: new Date().toISOString(),
    };

    setBrands(prev => [...prev, newBrand]);

    setAuditLogs(prev => [
      {
        id: `audit-${Date.now()}`,
        admin_email: 'admin@galaxymobile.com',
        action: 'BRAND_CREATED',
        entity_type: 'BRAND',
        entity_id: id,
        details: { name: newBrand.name, slug: newBrand.slug },
        created_at: new Date().toISOString(),
      },
      ...prev,
    ]);

    return newBrand;
  };

  const updateBrand = (id: string, updates: Partial<Brand>) => {
    setBrands(prev =>
      prev.map(b => (b.id === id ? { ...b, ...updates } : b))
    );

    setAuditLogs(prev => [
      {
        id: `audit-${Date.now()}`,
        admin_email: 'admin@galaxymobile.com',
        action: 'BRAND_UPDATED',
        entity_type: 'BRAND',
        entity_id: id,
        details: { updated_fields: Object.keys(updates) },
        created_at: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const deleteBrand = (id: string) => {
    let deletedName = '';
    setBrands(prev => {
      const match = prev.find(b => b.id === id);
      if (match) deletedName = match.name;
      return prev.filter(b => b.id !== id);
    });

    setAuditLogs(prev => [
      {
        id: `audit-${Date.now()}`,
        admin_email: 'admin@galaxymobile.com',
        action: 'BRAND_DELETED',
        entity_type: 'BRAND',
        entity_id: id,
        details: { name: deletedName },
        created_at: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  // 4. Update Variant Price
  const updateVariantPrice = (
    productId: string,
    variantId: string,
    mrp: number,
    sellingPrice: number,
    reason: string = 'Price update by Admin'
  ) => {
    let oldMrp = 0;
    let oldPrice = 0;
    let oldDisc = 0;
    let prodName = '';
    let varLabel = '';

    setProducts(prev =>
      prev.map(prod => {
        if (prod.id !== productId) return prod;
        prodName = prod.name;
        const updatedVariants = prod.variants.map(v => {
          if (v.id !== variantId) return v;
          oldMrp = v.mrp;
          oldPrice = v.selling_price;
          oldDisc = v.discount_percent;
          varLabel = `${v.ram || ''} ${v.storage || ''} ${v.color}`.trim();
          const newDiscount = computeDiscount(mrp, sellingPrice);
          return {
            ...v,
            mrp,
            selling_price: sellingPrice,
            discount_percent: newDiscount,
          };
        });
        return { ...prod, variants: updatedVariants };
      })
    );

    // Record price history
    const newHistoryItem: PriceHistoryItem = {
      id: `ph-${Date.now()}`,
      variant_id: variantId,
      product_name: prodName,
      variant_label: varLabel,
      old_mrp: oldMrp,
      new_mrp: mrp,
      old_selling_price: oldPrice,
      new_selling_price: sellingPrice,
      old_discount: oldDisc,
      new_discount: computeDiscount(mrp, sellingPrice),
      reason,
      admin_email: 'admin@galaxymobile.com',
      created_at: new Date().toISOString(),
    };

    setPriceHistory(prev => [newHistoryItem, ...prev]);

    setAuditLogs(prev => [
      {
        id: `audit-${Date.now()}`,
        admin_email: 'admin@galaxymobile.com',
        action: 'PRICE_CHANGED',
        entity_type: 'PRODUCT_VARIANT',
        entity_id: variantId,
        details: { oldPrice, newPrice: sellingPrice, oldMrp, newMrp: mrp, reason },
        created_at: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  // 5. Update Variant Stock
  const updateVariantStock = (
    productId: string,
    variantId: string,
    newStock: number,
    reason: StockMovementReason,
    notes?: string
  ) => {
    let oldStock = 0;
    let prodName = '';
    let varLabel = '';

    setProducts(prev =>
      prev.map(prod => {
        if (prod.id !== productId) return prod;
        prodName = prod.name;
        const updatedVariants = prod.variants.map(v => {
          if (v.id !== variantId) return v;
          oldStock = v.current_stock;
          varLabel = `${v.ram || ''} ${v.storage || ''} ${v.color}`.trim();
          const computed_status = computeStatus(newStock, v.low_stock_threshold, v.incoming_stock, v.manual_status);
          return {
            ...v,
            current_stock: newStock,
            computed_status,
          };
        });
        return { ...prod, variants: updatedVariants };
      })
    );

    const movement: StockMovement = {
      id: `sm-${Date.now()}`,
      variant_id: variantId,
      product_name: prodName,
      variant_label: varLabel,
      quantity_change: newStock - oldStock,
      previous_stock: oldStock,
      new_stock: newStock,
      reason,
      notes: notes || `Manual stock adjustment to ${newStock}`,
      admin_email: 'admin@galaxymobile.com',
      created_at: new Date().toISOString(),
    };

    setStockMovements(prev => [movement, ...prev]);

    setAuditLogs(prev => [
      {
        id: `audit-${Date.now()}`,
        admin_email: 'admin@galaxymobile.com',
        action: 'STOCK_ADJUSTED',
        entity_type: 'PRODUCT_VARIANT',
        entity_id: variantId,
        details: { previous: oldStock, current: newStock, reason, notes },
        created_at: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  // 6. Add Incoming Stock
  const addIncomingStock = (item: Omit<IncomingStock, 'id' | 'status' | 'created_at' | 'admin_email'>) => {
    const id = `inc-${Date.now()}`;
    const newIncoming: IncomingStock = {
      ...item,
      id,
      status: 'PENDING',
      admin_email: 'admin@galaxymobile.com',
      created_at: new Date().toISOString(),
    };

    setIncomingStockList(prev => [newIncoming, ...prev]);

    // Update variant incoming_stock
    setProducts(prev =>
      prev.map(prod => {
        const hasVariant = prod.variants.some(v => v.id === item.variant_id);
        if (!hasVariant) return prod;
        return {
          ...prod,
          variants: prod.variants.map(v => {
            if (v.id !== item.variant_id) return v;
            const updatedIncoming = v.incoming_stock + item.incoming_quantity;
            return {
              ...v,
              incoming_stock: updatedIncoming,
              expected_arrival_date: item.expected_arrival_date,
              computed_status: computeStatus(v.current_stock, v.low_stock_threshold, updatedIncoming, v.manual_status),
            };
          }),
        };
      })
    );

    setAuditLogs(prev => [
      {
        id: `audit-${Date.now()}`,
        admin_email: 'admin@galaxymobile.com',
        action: 'INCOMING_STOCK_RECORDED',
        entity_type: 'INCOMING_STOCK',
        entity_id: id,
        details: { quantity: item.incoming_quantity, supplier: item.supplier },
        created_at: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  // 7. Receive Incoming Stock Workflow
  const receiveIncomingStock = (incomingId: string) => {
    const item = incomingStockList.find(i => i.id === incomingId);
    if (!item || item.status === 'RECEIVED') return;

    // Mark shipment as received
    setIncomingStockList(prev =>
      prev.map(i =>
        i.id === incomingId
          ? { ...i, status: 'RECEIVED', received_at: new Date().toISOString() }
          : i
      )
    );

    let prodName = '';
    let varLabel = '';
    let prevStock = 0;
    let newStock = 0;

    // Increase current stock and decrease incoming stock
    setProducts(prev =>
      prev.map(prod => {
        const hasVariant = prod.variants.some(v => v.id === item.variant_id);
        if (!hasVariant) return prod;
        prodName = prod.name;
        return {
          ...prod,
          variants: prod.variants.map(v => {
            if (v.id !== item.variant_id) return v;
            prevStock = v.current_stock;
            newStock = v.current_stock + item.incoming_quantity;
            const remIncoming = Math.max(0, v.incoming_stock - item.incoming_quantity);
            varLabel = `${v.ram || ''} ${v.storage || ''} ${v.color}`.trim();
            const computed_status = computeStatus(newStock, v.low_stock_threshold, remIncoming, v.manual_status);
            return {
              ...v,
              current_stock: newStock,
              incoming_stock: remIncoming,
              computed_status,
            };
          }),
        };
      })
    );

    // Record Stock Movement
    const movement: StockMovement = {
      id: `sm-${Date.now()}`,
      variant_id: item.variant_id,
      product_name: prodName,
      variant_label: varLabel,
      quantity_change: item.incoming_quantity,
      previous_stock: prevStock,
      new_stock: newStock,
      reason: 'stock_received',
      reference_no: item.reference_no,
      supplier: item.supplier,
      notes: `Received physical shipment. PO: ${item.reference_no || 'N/A'}`,
      admin_email: 'admin@galaxymobile.com',
      created_at: new Date().toISOString(),
    };

    setStockMovements(prev => [movement, ...prev]);

    setAuditLogs(prev => [
      {
        id: `audit-${Date.now()}`,
        admin_email: 'admin@galaxymobile.com',
        action: 'STOCK_RECEIVED',
        entity_type: 'INCOMING_STOCK',
        entity_id: incomingId,
        details: { quantity: item.incoming_quantity, newStock },
        created_at: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  // 8. Store Offers & Special Schemes Management
  const addOffer = (offerData: Omit<Offer, 'id' | 'created_at'>): Offer => {
    const id = `offer-${Date.now()}`;
    const newOffer: Offer = {
      ...offerData,
      id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setOffers(prev => [newOffer, ...prev]);

    setAuditLogs(prev => [
      {
        id: `audit-${Date.now()}`,
        admin_email: 'admin@galaxymobile.com',
        action: 'OFFER_CREATED',
        entity_type: 'OFFER',
        entity_id: id,
        details: { title: newOffer.title, badge: newOffer.badge_text, discount: newOffer.discount_text },
        created_at: new Date().toISOString(),
      },
      ...prev,
    ]);

    return newOffer;
  };

  const updateOffer = (id: string, updates: Partial<Offer>) => {
    setOffers(prev =>
      prev.map(off => (off.id === id ? { ...off, ...updates, updated_at: new Date().toISOString() } : off))
    );

    setAuditLogs(prev => [
      {
        id: `audit-${Date.now()}`,
        admin_email: 'admin@galaxymobile.com',
        action: 'OFFER_UPDATED',
        entity_type: 'OFFER',
        entity_id: id,
        details: { updated_fields: Object.keys(updates) },
        created_at: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const deleteOffer = (id: string) => {
    let deletedTitle = '';
    setOffers(prev => {
      const match = prev.find(o => o.id === id);
      if (match) deletedTitle = match.title;
      return prev.filter(o => o.id !== id);
    });

    setAuditLogs(prev => [
      {
        id: `audit-${Date.now()}`,
        admin_email: 'admin@galaxymobile.com',
        action: 'OFFER_DELETED',
        entity_type: 'OFFER',
        entity_id: id,
        details: { title: deletedTitle },
        created_at: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const toggleOfferStatus = (id: string) => {
    let newStatus = false;
    setOffers(prev =>
      prev.map(off => {
        if (off.id === id) {
          newStatus = !off.is_active;
          return { ...off, is_active: newStatus, updated_at: new Date().toISOString() };
        }
        return off;
      })
    );

    setAuditLogs(prev => [
      {
        id: `audit-${Date.now()}`,
        admin_email: 'admin@galaxymobile.com',
        action: 'OFFER_STATUS_TOGGLED',
        entity_type: 'OFFER',
        entity_id: id,
        details: { is_active: newStatus },
        created_at: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const reorderOffers = (reorderedOffers: Offer[]) => {
    const updated = reorderedOffers.map((off, index) => ({
      ...off,
      sort_order: index + 1,
      updated_at: new Date().toISOString(),
    }));
    setOffers(updated);

    setAuditLogs(prev => [
      {
        id: `audit-${Date.now()}`,
        admin_email: 'admin@galaxymobile.com',
        action: 'OFFERS_REORDERED',
        entity_type: 'OFFER',
        details: { count: updated.length },
        created_at: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  // 9. Customer Notify Request
  const submitNotifyRequest = (req: Omit<NotifyRequest, 'id' | 'status' | 'created_at'>) => {
    const newReq: NotifyRequest = {
      ...req,
      id: `notif-${Date.now()}`,
      status: 'PENDING',
      created_at: new Date().toISOString(),
    };
    setNotifyRequests(prev => [newReq, ...prev]);

    // Push dedicated customer notify payload to server
    try {
      fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerNotifyRequest: req }),
      }).then();
    } catch {
      // Ignore network failures
    }
  };

  // 10. Customer Review
  const submitReview = (rev: Omit<Review, 'id' | 'created_at' | 'is_approved'>) => {
    const newRev: Review = {
      ...rev,
      id: `rev-${Date.now()}`,
      is_approved: true,
      created_at: new Date().toISOString(),
    };
    setReviews(prev => [newRev, ...prev]);

    // Push dedicated customer review payload to server
    try {
      fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerReview: rev }),
      }).then();
    } catch {
      // Ignore network failures
    }
  };

  // 10. Store Settings
  const updateStoreSettings = (newSettings: StoreSettings) => {
    setStoreSettings(newSettings);
    setAuditLogs(prev => [
      {
        id: `audit-${Date.now()}`,
        admin_email: 'admin@galaxymobile.com',
        action: 'STORE_SETTINGS_UPDATED',
        entity_type: 'SETTINGS',
        created_at: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const setHeroFlagshipProduct = (productId: string) => {
    setStoreSettings(prev => ({
      ...prev,
      hero_flagship_product_id: productId,
    }));
    setAuditLogs(prev => [
      {
        id: `audit-${Date.now()}`,
        admin_email: 'admin@galaxymobile.com',
        action: 'HERO_FLAGSHIP_CHANGED',
        entity_type: 'STORE_SETTINGS',
        entity_id: productId,
        created_at: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  // 11. Compare Management
  const addToCompare = (product: Product): boolean => {
    if (compareList.length >= 3) {
      return false;
    }
    if (compareList.some(p => p.id === product.id)) {
      return true;
    }
    setCompareList(prev => [...prev, product]);
    return true;
  };

  const removeFromCompare = (productId: string) => {
    setCompareList(prev => prev.filter(p => p.id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  // 12. Wishlist Management
  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlist.includes(productId);
  };

  // Filter helpers
  const getPhones = () => products.filter(p => p.is_phone && p.is_active);
  const getAccessories = () => products.filter(p => !p.is_phone && p.is_active);
  const getFeaturedVivo = () =>
    products.filter(p => p.brand_id === 'brand-vivo' && p.is_featured && p.is_active);

  const value = useMemo(
    () => ({
      products,
      brands,
      categories,
      series,
      offers,
      banners,
      reviews,
      storeSettings,
      stockMovements,
      incomingStockList,
      priceHistory,
      notifyRequests,
      auditLogs,
      compareList,
      wishlist,
      addProduct,
      updateProduct,
      deleteProduct,
      addBrand,
      updateBrand,
      deleteBrand,
      updateVariantPrice,
      updateVariantStock,
      addIncomingStock,
      receiveIncomingStock,
      addOffer,
      updateOffer,
      deleteOffer,
      toggleOfferStatus,
      reorderOffers,
      submitNotifyRequest,
      submitReview,
      updateStoreSettings,
      setHeroFlagshipProduct,
      addToCompare,
      removeFromCompare,
      clearCompare,
      toggleWishlist,
      isInWishlist,
      getPhones,
      getAccessories,
      getFeaturedVivo,
    }),
    [
      products,
      brands,
      categories,
      series,
      offers,
      banners,
      reviews,
      storeSettings,
      stockMovements,
      incomingStockList,
      priceHistory,
      notifyRequests,
      auditLogs,
      compareList,
      wishlist,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
