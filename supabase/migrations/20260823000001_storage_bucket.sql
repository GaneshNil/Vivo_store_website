-- ==============================================================================
-- Supabase Storage Bucket Initialization for Product Photos
-- ==============================================================================

-- 1. Create 'product-images' storage bucket if it does not already exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'product-images',
    'product-images',
    true,
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

-- 2. Storage Policies: Allow Public Read Access
CREATE POLICY "Public Read Access for Product Photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- 3. Storage Policies: Allow Upload / Insert Access
CREATE POLICY "Allow Upload for Product Photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');

-- 4. Storage Policies: Allow Update / Delete
CREATE POLICY "Allow Update Product Photos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images');

CREATE POLICY "Allow Delete Product Photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images');
