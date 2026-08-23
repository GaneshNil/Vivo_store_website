export type ProductStatus = 
  | 'IN_STOCK' 
  | 'LOW_STOCK' 
  | 'OUT_OF_STOCK' 
  | 'COMING_SOON' 
  | 'DISCONTINUED' 
  | 'HIDDEN';

export type StockMovementReason = 
  | 'stock_received' 
  | 'sold_in_store' 
  | 'manual_adjustment' 
  | 'damaged' 
  | 'returned' 
  | 'correction' 
  | 'initial_setup';

export type CategoryType = 'phone' | 'accessory';

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url: string;
  is_primary: boolean;
  description?: string;
  sort_order: number;
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  type: CategoryType;
  description?: string;
  icon?: string;
  sort_order: number;
}

export interface Series {
  id: string;
  brand_id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  variant_id?: string | null;
  image_url: string;
  alt_text?: string;
  view_type?: 'front' | 'back' | 'side' | 'camera' | 'box' | 'lifestyle';
  is_primary: boolean;
  sort_order: number;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  ram?: string;
  storage?: string;
  color: string;
  color_code?: string;
  mrp: number;
  selling_price: number;
  discount_percent: number;
  current_stock: number;
  low_stock_threshold: number;
  incoming_stock: number;
  expected_arrival_date?: string | null;
  manual_status?: ProductStatus | null;
  computed_status: ProductStatus;
  is_default: boolean;
  is_active: boolean;
  images?: ProductImage[];
}

export interface Specifications {
  display?: {
    size?: string;
    resolution?: string;
    type?: string;
    refresh_rate?: string;
    brightness?: string;
    protection?: string;
  };
  processor?: {
    chipset?: string;
    cpu?: string;
    gpu?: string;
    process_node?: string;
  };
  camera?: {
    rear_main?: string;
    rear_secondary?: string;
    rear_features?: string;
    front_camera?: string;
    video_recording?: string;
    zeiss_optics?: boolean;
  };
  battery_charging?: {
    capacity?: string;
    charging_speed?: string;
    wireless_charging?: string;
    charger_in_box?: string;
  };
  connectivity?: {
    network?: string;
    five_g_bands?: string;
    wifi?: string;
    bluetooth?: string;
    nfc?: boolean;
    usb_type?: string;
  };
  operating_system?: {
    os_name?: string;
    os_version?: string;
    ui?: string;
  };
  build_dimensions?: {
    dimensions?: string;
    weight?: string;
    ip_rating?: string;
    back_material?: string;
  };
  in_the_box?: string[];
  [key: string]: any;
}

export interface Product {
  id: string;
  brand_id: string;
  brand?: Brand;
  category_id: string;
  category?: Category;
  series_id?: string | null;
  series?: Series | null;
  name: string;
  slug: string;
  tagline?: string;
  description: string;
  is_phone: boolean;
  is_featured: boolean;
  is_new_arrival: boolean;
  is_best_seller: boolean;
  is_active: boolean;
  warranty_info: string;
  bajaj_emi_interest_rate?: number; // e.g. 0 for 0% No Cost EMI, or 5.5, 9.9, etc.
  bajaj_emi_tenure_months?: number; // e.g. 3, 6, 9, 12, 18, 24
  specifications: Specifications;
  compatible_models?: string[];
  highlights?: string[];
  sort_order: number;
  variants: ProductVariant[];
  images: ProductImage[];
  reviews?: Review[];
  created_at?: string;
  updated_at?: string;
}

export interface StockMovement {
  id: string;
  variant_id: string;
  product_name?: string;
  variant_label?: string;
  quantity_change: number;
  previous_stock: number;
  new_stock: number;
  reason: StockMovementReason;
  reference_no?: string;
  supplier?: string;
  notes?: string;
  admin_email: string;
  created_at: string;
}

export interface IncomingStock {
  id: string;
  variant_id: string;
  product_name?: string;
  variant_label?: string;
  incoming_quantity: number;
  supplier: string;
  expected_arrival_date: string;
  reference_no?: string;
  notes?: string;
  status: 'PENDING' | 'RECEIVED' | 'CANCELLED';
  received_at?: string | null;
  admin_email: string;
  created_at: string;
}

export interface PriceHistoryItem {
  id: string;
  variant_id: string;
  product_name?: string;
  variant_label?: string;
  old_mrp: number;
  new_mrp: number;
  old_selling_price: number;
  new_selling_price: number;
  old_discount: number;
  new_discount: number;
  reason?: string;
  admin_email: string;
  created_at: string;
}

export interface Offer {
  id: string;
  title: string;
  subtitle?: string;
  badge_text: string;
  discount_text?: string;
  banner_url?: string;
  start_date: string;
  end_date?: string;
  is_active: boolean;
  terms?: string;
  sort_order: number;
}

export interface Review {
  id: string;
  product_id?: string;
  customer_name: string;
  rating: number;
  title?: string;
  comment: string;
  is_verified_store_buyer: boolean;
  is_approved: boolean;
  created_at: string;
}

export interface NotifyRequest {
  id: string;
  product_id: string;
  product_name?: string;
  variant_id?: string | null;
  variant_label?: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  status: 'PENDING' | 'CONTACTED' | 'FULFILLED';
  notes?: string;
  created_at: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  image_url: string;
  cta_text: string;
  cta_link: string;
  is_active: boolean;
  sort_order: number;
}

export interface StoreSettings {
  store_name: string;
  tagline: string;
  primary_brand: string;
  address: string;
  landmark: string;
  taluka: string;
  district: string;
  state: string;
  pincode: string;
  phone: string;
  whatsapp: string;
  email: string;
  hours: string;
  payment_methods: {
    bajaj_finance_emi: boolean;
    card_payments: boolean;
    home_credit: boolean;
    upi: boolean;
    cash: boolean;
  };
  google_maps_url: string;
}

export interface AuditLog {
  id: string;
  admin_email: string;
  action: string;
  entity_type: string;
  entity_id?: string;
  details?: Record<string, any>;
  created_at: string;
}
