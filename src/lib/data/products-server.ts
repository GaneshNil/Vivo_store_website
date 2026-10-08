import fs from 'fs';
import path from 'path';
import { cache } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Product, StoreSettings, Brand, Category, Series, Offer } from '@/lib/types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_BRANDS, 
  INITIAL_CATEGORIES, 
  INITIAL_SERIES, 
  INITIAL_OFFERS, 
  INITIAL_STORE_SETTINGS 
} from './seed-data';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qukvnzbhnblyukkuhmwa.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1a3ZuemJobmJseXVra3VobXdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczODU3NTYsImV4cCI6MjEwMjk2MTc1Nn0.yNQ0oy4uC0BBHtDrzYx97-tyQc3L_5U082r9tM5Ilgs';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
  global: {
    fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' }),
  },
});

export interface StoreDataSnapshot {
  products: Product[];
  brands: Brand[];
  categories: Category[];
  series: Series[];
  offers: Offer[];
  storeSettings: StoreSettings;
}

export function getStoreDataSync(): StoreDataSnapshot {
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

export const getStoreData = cache(async (): Promise<StoreDataSnapshot> => {
  // 1. Try reading from Supabase Cloud PostgreSQL (Production Source of Truth)
  try {
    const { data, error } = await supabase
      .from('store_live_state')
      .select('data, version')
      .eq('id', 'current')
      .maybeSingle();

    if (!error && data && data.data) {
      const cloud = data.data;
      if (Array.isArray(cloud.products) && cloud.products.length > 0) {
        const snapshot: StoreDataSnapshot = {
          products: cloud.products,
          brands: cloud.brands || INITIAL_BRANDS,
          categories: cloud.categories || INITIAL_CATEGORIES,
          series: cloud.series || INITIAL_SERIES,
          offers: cloud.offers || INITIAL_OFFERS,
          storeSettings: cloud.storeSettings || INITIAL_STORE_SETTINGS,
        };

        // Keep local disk updated for offline/dev cache if filesystem is writable
        try {
          const dataFilePath = path.join(process.cwd(), 'src', 'data', 'store-live-state.json');
          const dir = path.dirname(dataFilePath);
          if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(dataFilePath, JSON.stringify(cloud, null, 2), 'utf-8');
        } catch {
          // Ignore in read-only / serverless environments
        }

        return snapshot;
      }
    }
  } catch (err) {
    console.warn('[products-server] Supabase fetch error, trying disk fallback:', err);
  }

  // 2. Fallback to local disk cache / seed data
  return getStoreDataSync();
});

export async function getAllProducts(): Promise<Product[]> {
  const data = await getStoreData();
  return data.products.filter(p => p.is_active);
}

export async function getAllProductSlugs(): Promise<string[]> {
  const products = await getAllProducts();
  return products.map(p => p.slug).filter(Boolean);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (!slug) return undefined;
  const raw = String(slug).trim();
  const decoded = decodeURIComponent(raw).toLowerCase().trim();
  const products = await getAllProducts();
  
  // 1. Exact slug match (primary)
  const exactSlug = products.find(p => p && p.slug === raw);
  if (exactSlug) return exactSlug;

  // 2. Case-insensitive / decoded slug match
  const matchSlug = products.find(p => p && (p.slug || '').toLowerCase().trim() === decoded);
  if (matchSlug) return matchSlug;

  // 3. Exact ID match (case-insensitive)
  const matchId = products.find(p => p && (p.id || '').toLowerCase().trim() === decoded);
  if (matchId) return matchId;

  // 4. Normalized name match (fallback)
  const matchName = products.find(p => {
    if (!p || !p.name) return false;
    const pName = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').trim();
    return pName === decoded;
  });
  if (matchName) return matchName;

  return undefined;
}

export async function getStoreSettings(): Promise<StoreSettings> {
  const data = await getStoreData();
  return data.storeSettings;
}

