import fs from 'fs';
import path from 'path';
import { Product, StoreSettings, Brand, Category, Series, Offer } from '@/lib/types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_BRANDS, 
  INITIAL_CATEGORIES, 
  INITIAL_SERIES, 
  INITIAL_OFFERS, 
  INITIAL_STORE_SETTINGS 
} from './seed-data';

interface StoreDataSnapshot {
  products: Product[];
  brands: Brand[];
  categories: Category[];
  series: Series[];
  offers: Offer[];
  storeSettings: StoreSettings;
}

export function getStoreData(): StoreDataSnapshot {
  try {
    const dataFilePath = path.join(process.cwd(), 'src', 'data', 'store-live-state.json');
    if (fs.existsSync(dataFilePath)) {
      const raw = fs.readFileSync(dataFilePath, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.products) && parsed.products.length > 0) {
        return {
          products: parsed.products,
          brands: parsed.brands || INITIAL_BRANDS,
          categories: parsed.categories || INITIAL_CATEGORIES,
          series: parsed.series || INITIAL_SERIES,
          offers: parsed.offers || INITIAL_OFFERS,
          storeSettings: parsed.storeSettings || INITIAL_STORE_SETTINGS,
        };
      }
    }
  } catch (err) {
    console.warn('[products-server] Failed to read store-live-state.json, falling back to seed data:', err);
  }

  return {
    products: INITIAL_PRODUCTS,
    brands: INITIAL_BRANDS,
    categories: INITIAL_CATEGORIES,
    series: INITIAL_SERIES,
    offers: INITIAL_OFFERS,
    storeSettings: INITIAL_STORE_SETTINGS,
  };
}

export function getAllProducts(): Product[] {
  const data = getStoreData();
  return data.products.filter(p => p.is_active);
}

export function getAllProductSlugs(): string[] {
  const products = getAllProducts();
  return products.map(p => p.slug).filter(Boolean);
}

export function getProductBySlug(slug: string): Product | undefined {
  if (!slug) return undefined;
  const decoded = decodeURIComponent(slug).toLowerCase().trim();
  const products = getAllProducts();
  
  return products.find(p => {
    if (!p) return false;
    const pSlug = (p.slug || '').toLowerCase().trim();
    const pId = (p.id || '').toLowerCase().trim();
    const pName = (p.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').trim();
    return pSlug === decoded || pId === decoded || pName === decoded;
  });
}

export function getStoreSettings(): StoreSettings {
  return getStoreData().storeSettings;
}
