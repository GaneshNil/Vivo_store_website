-- ====================================================================
-- GALAXY MOBILE GALLERY — SECURITY HARDENING MIGRATION
-- ====================================================================

-- 1. STORE LIVE STATE PERSISTENCE TABLE WITH RLS
CREATE TABLE IF NOT EXISTS public.store_live_state (
    id TEXT PRIMARY KEY,
    data JSONB NOT NULL,
    version BIGINT NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.store_live_state ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view live store state" ON public.store_live_state;
CREATE POLICY "Public can view live store state" 
ON public.store_live_state 
FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Admin full access store_live_state" ON public.store_live_state;
CREATE POLICY "Admin full access store_live_state" 
ON public.store_live_state 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 2. HARDEN SUPABASE STORAGE BUCKET POLICIES FOR PRODUCT PHOTOS
-- Ensure bucket exists and has strict size/MIME constraints
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'product-images',
    'product-images',
    true,
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

-- Drop any previous permissive anonymous mutation policies
DROP POLICY IF EXISTS "Allow Upload for Product Photos" ON storage.objects;
DROP POLICY IF EXISTS "Allow Update Product Photos" ON storage.objects;
DROP POLICY IF EXISTS "Allow Delete Product Photos" ON storage.objects;
DROP POLICY IF EXISTS "Public Read Access for Product Photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Admin Upload Product Photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Admin Update Product Photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Admin Delete Product Photos" ON storage.objects;

-- Allow Public to View/Download images
CREATE POLICY "Public Read Access for Product Photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Only Authenticated / Service Role can Upload, Update, or Delete
CREATE POLICY "Authenticated Admin Upload Product Photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Authenticated Admin Update Product Photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated Admin Delete Product Photos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-images');

-- 3. AUDIT LOG IMMUTABILITY & PROTECTION
-- Guarantee no anonymous actor can mutate or wipe audit logs
DROP POLICY IF EXISTS "Public cannot alter audit logs" ON public.audit_logs;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
