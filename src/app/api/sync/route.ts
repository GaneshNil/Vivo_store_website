import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
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

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'store-live-state.json');

// In-memory cache for ultra-fast instant response
let memoryState: any = null;
let stateVersion: number = Date.now();

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
    auditLogs: [],
    version: Date.now(),
  };
}

function loadServerState() {
  if (memoryState) {
    return memoryState;
  }

  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.products)) {
        memoryState = parsed;
        stateVersion = parsed.version || Date.now();
        return memoryState;
      }
    }
  } catch (err) {
    console.warn('Error reading store-live-state.json, using default seed:', err);
  }

  memoryState = getInitialState();
  stateVersion = memoryState.version;
  saveServerState(memoryState);
  return memoryState;
}

function saveServerState(data: any) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const version = Date.now();
    data.version = version;
    memoryState = data;
    stateVersion = version;

    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return version;
  } catch (err) {
    console.warn('Error writing store-live-state.json:', err);
    return stateVersion;
  }
}

// GET: Fetch live shared state or check version
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientVersion = searchParams.get('v');

    const currentState = loadServerState();

    // If client is just asking if there's an update and version matches
    if (clientVersion && Number(clientVersion) === stateVersion) {
      return NextResponse.json({ upToDate: true, version: stateVersion });
    }

    return NextResponse.json({
      upToDate: false,
      data: currentState,
      version: stateVersion,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch shared state';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST: Save state changes and broadcast to all devices
export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    if (!payload || typeof payload !== 'object') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const current = loadServerState();
    const updated = {
      ...current,
      ...payload,
    };

    const newVersion = saveServerState(updated);

    return NextResponse.json({
      success: true,
      version: newVersion,
      message: 'State synchronized across all devices successfully',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to sync state';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
