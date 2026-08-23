-- ====================================================================
-- GALAXY MOBILE GALLERY — SUPABASE DATABASE INITIAL SCHEMA MIGRATION
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 2. ENUMS & DOMAINS
DO $$ BEGIN
    CREATE TYPE product_status_enum AS ENUM ('IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK', 'COMING_SOON', 'DISCONTINUED', 'HIDDEN');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE stock_movement_reason AS ENUM ('stock_received', 'sold_in_store', 'manual_adjustment', 'damaged', 'returned', 'correction', 'initial_setup');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE category_type_enum AS ENUM ('phone', 'accessory');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. BRANDS TABLE
CREATE TABLE IF NOT EXISTS public.brands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    logo_url TEXT,
    is_primary BOOLEAN DEFAULT false,
    description TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    type category_type_enum NOT NULL DEFAULT 'phone',
    description TEXT,
    icon TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SERIES TABLE (e.g. VIVO X Series, V Series, Y Series, T Series)
CREATE TABLE IF NOT EXISTS public.series (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID REFERENCES public.brands(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(brand_id, slug)
);

-- 6. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID NOT NULL REFERENCES public.brands(id) ON DELETE RESTRICT,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
    series_id UUID REFERENCES public.series(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    tagline TEXT,
    description TEXT,
    is_phone BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    is_new_arrival BOOLEAN DEFAULT false,
    is_best_seller BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    warranty_info TEXT DEFAULT '1 Year Manufacturer Warranty for Phone and 6 Months for In-Box Accessories',
    specifications JSONB DEFAULT '{}'::jsonb,
    compatible_models JSONB DEFAULT '[]'::jsonb, -- for accessories
    highlights TEXT[] DEFAULT ARRAY[]::TEXT[],
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. PRODUCT VARIANTS TABLE
CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    sku TEXT NOT NULL UNIQUE,
    ram TEXT, -- e.g. "8GB", "12GB", "16GB"
    storage TEXT, -- e.g. "128GB", "256GB", "512GB"
    color TEXT NOT NULL, -- e.g. "Titanium Black", "Starlight Blue"
    color_code TEXT, -- e.g. "#1A1A1A", "#3B82F6"
    mrp NUMERIC(10,2) NOT NULL CHECK (mrp >= 0),
    selling_price NUMERIC(10,2) NOT NULL CHECK (selling_price >= 0 AND selling_price <= mrp),
    discount_percent NUMERIC(5,2) DEFAULT 0.00,
    current_stock INT NOT NULL DEFAULT 0 CHECK (current_stock >= 0),
    low_stock_threshold INT NOT NULL DEFAULT 3 CHECK (low_stock_threshold >= 0),
    incoming_stock INT NOT NULL DEFAULT 0 CHECK (incoming_stock >= 0),
    expected_arrival_date DATE,
    manual_status product_status_enum,
    computed_status product_status_enum NOT NULL DEFAULT 'IN_STOCK',
    is_default BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. PRODUCT IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    view_type TEXT DEFAULT 'front', -- 'front', 'back', 'side', 'camera', 'box', 'lifestyle'
    is_primary BOOLEAN DEFAULT false,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. STOCK MOVEMENTS TABLE (Audit of all stock alterations)
CREATE TABLE IF NOT EXISTS public.stock_movements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    variant_id UUID NOT NULL REFERENCES public.product_variants(id) ON DELETE CASCADE,
    quantity_change INT NOT NULL,
    previous_stock INT NOT NULL,
    new_stock INT NOT NULL,
    reason stock_movement_reason NOT NULL,
    reference_no TEXT,
    supplier TEXT,
    notes TEXT,
    admin_email TEXT DEFAULT 'admin@galaxymobile.com',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. INCOMING STOCK SHIPMENTS TABLE
CREATE TABLE IF NOT EXISTS public.incoming_stock (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    variant_id UUID NOT NULL REFERENCES public.product_variants(id) ON DELETE CASCADE,
    incoming_quantity INT NOT NULL CHECK (incoming_quantity > 0),
    supplier TEXT NOT NULL,
    expected_arrival_date DATE NOT NULL,
    reference_no TEXT,
    notes TEXT,
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'RECEIVED', 'CANCELLED')),
    received_at TIMESTAMPTZ,
    admin_email TEXT DEFAULT 'admin@galaxymobile.com',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. PRICE HISTORY TABLE
CREATE TABLE IF NOT EXISTS public.price_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    variant_id UUID NOT NULL REFERENCES public.product_variants(id) ON DELETE CASCADE,
    old_mrp NUMERIC(10,2) NOT NULL,
    new_mrp NUMERIC(10,2) NOT NULL,
    old_selling_price NUMERIC(10,2) NOT NULL,
    new_selling_price NUMERIC(10,2) NOT NULL,
    old_discount NUMERIC(5,2),
    new_discount NUMERIC(5,2),
    reason TEXT,
    admin_email TEXT DEFAULT 'admin@galaxymobile.com',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. OFFERS & PROMOTIONS TABLE
CREATE TABLE IF NOT EXISTS public.offers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    subtitle TEXT,
    badge_text TEXT DEFAULT 'SPECIAL OFFER',
    discount_text TEXT,
    banner_url TEXT,
    start_date TIMESTAMPTZ DEFAULT NOW(),
    end_date TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    applicable_brands UUID[] DEFAULT ARRAY[]::UUID[],
    applicable_products UUID[] DEFAULT ARRAY[]::UUID[],
    terms TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. REVIEWS & STORE RATINGS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    customer_name TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    comment TEXT NOT NULL,
    is_verified_store_buyer BOOLEAN DEFAULT true,
    is_approved BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. NOTIFY ME REQUESTS TABLE (Customer back-in-stock alerts)
CREATE TABLE IF NOT EXISTS public.notify_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONTACTED', 'FULFILLED')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. BANNERS & SHOWROOM SPOTLIGHTS TABLE
CREATE TABLE IF NOT EXISTS public.banners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    subtitle TEXT,
    badge TEXT,
    image_url TEXT NOT NULL,
    cta_text TEXT DEFAULT 'Explore In Store',
    cta_link TEXT DEFAULT '/mobiles',
    is_active BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. STORE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.store_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_email TEXT NOT NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    details JSONB DEFAULT '{}'::jsonb,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- TRIGGERS AND FUNCTIONS FOR AUTOMATIC COMPUTATIONS
-- ====================================================================

-- Function: Compute discount and stock status automatically
CREATE OR REPLACE FUNCTION public.fn_compute_variant_fields()
RETURNS TRIGGER AS $$
BEGIN
    -- 1. Compute Discount %: ((MRP - Selling Price) / MRP) * 100
    IF NEW.mrp > 0 THEN
        NEW.discount_percent := ROUND(((NEW.mrp - NEW.selling_price) / NEW.mrp) * 100.0, 2);
    ELSE
        NEW.discount_percent := 0.00;
    END IF;

    -- 2. Compute Status
    IF NEW.manual_status IN ('DISCONTINUED', 'HIDDEN') THEN
        NEW.computed_status := NEW.manual_status;
    ELSIF NEW.current_stock > NEW.low_stock_threshold THEN
        NEW.computed_status := 'IN_STOCK';
    ELSIF NEW.current_stock > 0 AND NEW.current_stock <= NEW.low_stock_threshold THEN
        NEW.computed_status := 'LOW_STOCK';
    ELSIF NEW.current_stock = 0 AND NEW.incoming_stock > 0 THEN
        NEW.computed_status := 'COMING_SOON';
    ELSE
        NEW.computed_status := 'OUT_OF_STOCK';
    END IF;

    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_variant_computations ON public.product_variants;
CREATE TRIGGER trg_variant_computations
BEFORE INSERT OR UPDATE ON public.product_variants
FOR EACH ROW
EXECUTE FUNCTION public.fn_compute_variant_fields();

-- Function: Log price and stock changes automatically
CREATE OR REPLACE FUNCTION public.fn_log_variant_mutations()
RETURNS TRIGGER AS $$
BEGIN
    -- Log Price Change
    IF (OLD.mrp <> NEW.mrp OR OLD.selling_price <> NEW.selling_price) THEN
        INSERT INTO public.price_history (
            variant_id, old_mrp, new_mrp, old_selling_price, new_selling_price, old_discount, new_discount, reason
        ) VALUES (
            NEW.id, OLD.mrp, NEW.mrp, OLD.selling_price, NEW.selling_price, OLD.discount_percent, NEW.discount_percent, 'Price Updated in Admin'
        );
    END IF;

    -- Log Stock Movement
    IF (OLD.current_stock <> NEW.current_stock) THEN
        INSERT INTO public.stock_movements (
            variant_id, quantity_change, previous_stock, new_stock, reason, notes
        ) VALUES (
            NEW.id, 
            NEW.current_stock - OLD.current_stock, 
            OLD.current_stock, 
            NEW.current_stock, 
            CASE 
                WHEN NEW.current_stock > OLD.current_stock THEN 'stock_received'::stock_movement_reason 
                ELSE 'manual_adjustment'::stock_movement_reason 
            END,
            'Automatic trigger from stock level change'
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_variant_mutation_logger ON public.product_variants;
CREATE TRIGGER trg_variant_mutation_logger
AFTER UPDATE ON public.product_variants
FOR EACH ROW
EXECUTE FUNCTION public.fn_log_variant_mutations();

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.series ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incoming_stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notify_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 1. PUBLIC READ-ONLY POLICIES FOR CUSTOMER PORTAL
CREATE POLICY "Public can view active brands" ON public.brands FOR SELECT USING (true);
CREATE POLICY "Public can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public can view series" ON public.series FOR SELECT USING (true);
CREATE POLICY "Public can view active products" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active variants" ON public.product_variants FOR SELECT USING (is_active = true AND computed_status <> 'HIDDEN');
CREATE POLICY "Public can view product images" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Public can view active offers" ON public.offers FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view approved reviews" ON public.reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Public can view banners" ON public.banners FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view store settings" ON public.store_settings FOR SELECT USING (true);

-- 2. PUBLIC INSERT ONLY FOR NOTIFY ME REQUESTS & REVIEWS
CREATE POLICY "Public can insert notify requests" ON public.notify_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert reviews" ON public.reviews FOR INSERT WITH CHECK (true);

-- 3. ADMIN FULL ACCESS (service_role or authenticated admin)
CREATE POLICY "Admin full access brands" ON public.brands TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access categories" ON public.categories TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access series" ON public.series TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access products" ON public.products TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access product_variants" ON public.product_variants TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access product_images" ON public.product_images TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access stock_movements" ON public.stock_movements TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access incoming_stock" ON public.incoming_stock TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access price_history" ON public.price_history TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access offers" ON public.offers TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access reviews" ON public.reviews TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access notify_requests" ON public.notify_requests TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access banners" ON public.banners TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access store_settings" ON public.store_settings TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access audit_logs" ON public.audit_logs TO authenticated USING (true) WITH CHECK (true);
