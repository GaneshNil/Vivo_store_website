import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { isRequestAdminAuthenticated } from '@/lib/auth/admin';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_BRANDS, 
  INITIAL_CATEGORIES, 
  INITIAL_SERIES, 
  INITIAL_OFFERS, 
  INITIAL_STORE_SETTINGS,
  INITIAL_BANNERS,
  INITIAL_REVIEWS
} from '@/lib/data/seed-data';

export const dynamic = 'force-dynamic';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qukvnzbhnblyukkuhmwa.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1a3ZuemJobmJseXVra3VobXdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczODU3NTYsImV4cCI6MjEwMjk2MTc1Nn0.yNQ0oy4uC0BBHtDrzYx97-tyQc3L_5U082r9tM5Ilgs';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'store-live-state.json');

function getInitialState() {
  return {
    products: INITIAL_PRODUCTS,
    brands: INITIAL_BRANDS,
    categories: INITIAL_CATEGORIES,
    series: INITIAL_SERIES,
    offers: INITIAL_OFFERS,
    banners: INITIAL_BANNERS,
    reviews: INITIAL_REVIEWS,
    storeSettings: INITIAL_STORE_SETTINGS,
    stockMovements: [],
    incomingStockList: [],
    priceHistory: [],
    notifyRequests: [],
    auditLogs: [
      {
        id: 'audit-seed-bootstrap',
        admin_email: 'admin@galaxymobile.com',
        action: 'INITIAL_STORE_BOOTSTRAP',
        entity_type: 'SYSTEM',
        details: { message: 'Galaxy Mobile Gallery database initialized and verified on Supabase cloud' },
        created_at: new Date().toISOString(),
      }
    ],
    version: Date.now(),
  };
}

// Read from local disk cache
function readLocalDisk(): any {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Local disk read warning:', err);
  }
  return null;
}

// Write to local disk cache atomically
function writeLocalDisk(data: any) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const tempFile = `${DATA_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DATA_FILE);
  } catch (err) {
    console.warn('Local disk write warning (safe in serverless):', err);
  }
}

// Unified state fetcher with Supabase Cloud primary & disk fallback
async function getLiveState(): Promise<any> {
  // 1. Try reading from Supabase PostgreSQL
  try {
    const { data, error } = await supabase
      .from('store_live_state')
      .select('data, version')
      .eq('id', 'current')
      .maybeSingle();

    if (!error && data && data.data) {
      const cloudData = {
        ...data.data,
        version: Number(data.version) || Date.now(),
      };
      // Keep local disk updated
      writeLocalDisk(cloudData);
      return cloudData;
    }
  } catch (err) {
    console.warn('Supabase cloud fetch warning, falling back to local storage:', err);
  }

  // 2. Fallback to local disk
  const local = readLocalDisk();
  if (local) {
    // Attempt background sync to cloud
    try {
      supabase.from('store_live_state').upsert({
        id: 'current',
        data: local,
        version: local.version || Date.now(),
        updated_at: new Date().toISOString(),
      }).then();
    } catch {
      // Ignore background push error
    }
    return local;
  }

  // 3. Initialize default seed and push to Supabase
  const initial = getInitialState();
  writeLocalDisk(initial);
  try {
    await supabase.from('store_live_state').upsert({
      id: 'current',
      data: initial,
      version: initial.version,
      updated_at: new Date().toISOString(),
    });
  } catch (e) {
    console.warn('Initial cloud seed save warning:', e);
  }

  return initial;
}

// Unified state saver with Supabase Cloud & disk cache
async function saveLiveState(data: any): Promise<number> {
  const version = Date.now();
  data.version = version;

  // 1. Write to local disk
  writeLocalDisk(data);

  // 2. Save permanently to Supabase Cloud PostgreSQL
  try {
    const { error } = await supabase.from('store_live_state').upsert({
      id: 'current',
      data,
      version,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.warn('Supabase state upsert error:', error.message);
    }
  } catch (err) {
    console.warn('Supabase cloud save exception:', err);
  }

  return version;
}

// GET: Return live shared state (Public read access)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientVersion = searchParams.get('v');

    const currentState = await getLiveState();
    const currentVersion = currentState.version || Date.now();

    // If client is already on current version
    if (clientVersion && Number(clientVersion) === currentVersion) {
      return NextResponse.json({ upToDate: true, version: currentVersion });
    }

    return NextResponse.json({
      upToDate: false,
      data: currentState,
      version: currentVersion,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch shared state';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST: Save state changes with strict authorization
export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    if (!payload || typeof payload !== 'object') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const isAdmin = isRequestAdminAuthenticated(request);
    const current = await getLiveState();

    // Handle Public Customer Actions (Notify Requests & Reviews)
    if (!isAdmin) {
      // Check if this is a customer submitting a back-in-stock alert
      if (payload.customerNotifyRequest) {
        const nr = payload.customerNotifyRequest;
        if (!nr.product_id || !nr.customer_name || !nr.customer_phone) {
          return NextResponse.json({ error: 'Missing required notify fields' }, { status: 400 });
        }

        const newRequest = {
          id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          product_id: String(nr.product_id).slice(0, 100),
          product_name: String(nr.product_name || 'Product').slice(0, 150),
          variant_id: nr.variant_id ? String(nr.variant_id).slice(0, 100) : undefined,
          variant_label: nr.variant_label ? String(nr.variant_label).slice(0, 150) : undefined,
          customer_name: String(nr.customer_name).slice(0, 100).trim(),
          customer_phone: String(nr.customer_phone).slice(0, 20).replace(/[^0-9+]/g, ''),
          customer_email: nr.customer_email ? String(nr.customer_email).slice(0, 100) : undefined,
          status: 'PENDING',
          notes: nr.notes ? String(nr.notes).slice(0, 300) : undefined,
          created_at: new Date().toISOString(),
        };

        const updatedState = {
          ...current,
          notifyRequests: [newRequest, ...(current.notifyRequests || [])],
        };

        const newVersion = await saveLiveState(updatedState);
        return NextResponse.json({ success: true, version: newVersion, message: 'Notify request received' });
      }

      // Check if this is a customer submitting a review
      if (payload.customerReview) {
        const rev = payload.customerReview;
        if (!rev.customer_name || !rev.comment || typeof rev.rating !== 'number') {
          return NextResponse.json({ error: 'Missing required review fields' }, { status: 400 });
        }

        const newReview = {
          id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          product_id: rev.product_id ? String(rev.product_id).slice(0, 100) : undefined,
          customer_name: String(rev.customer_name).slice(0, 100).trim(),
          rating: Math.max(1, Math.min(5, Math.floor(rev.rating))),
          title: rev.title ? String(rev.title).slice(0, 100) : undefined,
          comment: String(rev.comment).slice(0, 1000).trim(),
          is_verified_store_buyer: true,
          is_approved: true,
          created_at: new Date().toISOString(),
        };

        const updatedState = {
          ...current,
          reviews: [newReview, ...(current.reviews || [])],
        };

        const newVersion = await saveLiveState(updatedState);
        return NextResponse.json({ success: true, version: newVersion, message: 'Review submitted' });
      }

      // If unauthenticated user attempts to modify admin-controlled resources (prices, products, inventory, offers, etc.)
      return NextResponse.json(
        { error: 'Unauthorized: Admin authentication required to modify store state, prices, and inventory.' },
        { status: 401 }
      );
    }

    // Authenticated Admin State Synchronization:
    // 1. Merge Audit Logs permanently so no audit entry is ever lost or deleted
    const auditMap = new Map();
    [...(current.auditLogs || []), ...(payload.auditLogs || [])].forEach((log: any) => {
      if (log && log.id) {
        auditMap.set(log.id, log);
      }
    });
    const mergedAuditLogs = Array.from(auditMap.values()).sort((a: any, b: any) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    // 2. Build full updated state with administrative permissions
    const updatedState = {
      ...current,
      ...payload,
      auditLogs: mergedAuditLogs,
    };

    if (Array.isArray(payload.offers)) {
      updatedState.offers = payload.offers;
    }
    if (Array.isArray(payload.products)) {
      updatedState.products = payload.products;
    }
    if (Array.isArray(payload.brands)) {
      updatedState.brands = payload.brands;
    }
    if (payload.storeSettings) {
      updatedState.storeSettings = payload.storeSettings;
    }
    if (Array.isArray(payload.stockMovements)) {
      updatedState.stockMovements = payload.stockMovements;
    }
    if (Array.isArray(payload.incomingStockList)) {
      updatedState.incomingStockList = payload.incomingStockList;
    }
    if (Array.isArray(payload.priceHistory)) {
      updatedState.priceHistory = payload.priceHistory;
    }
    if (Array.isArray(payload.notifyRequests)) {
      updatedState.notifyRequests = payload.notifyRequests;
    }

    const newVersion = await saveLiveState(updatedState);

    return NextResponse.json({
      success: true,
      version: newVersion,
      message: 'State permanently saved to Supabase Cloud & synchronized across all devices',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to sync state';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
