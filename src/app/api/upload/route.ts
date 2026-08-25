import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { isRequestAdminAuthenticated } from '@/lib/auth/admin';

export const dynamic = 'force-dynamic';

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

const ALLOWED_FOLDERS = new Set(['uploads', 'products', 'banners', 'accessories', 'brands']);
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  try {
    // 1. Authorize: Only authenticated Admin may upload media to the store
    const isAdmin = isRequestAdminAuthenticated(request);
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin authentication required for file uploads' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    let rawFolder = (formData.get('folder') as string) || 'uploads';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // 2. Validate file size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'File size exceeds maximum permitted limit (10MB)' },
        { status: 400 }
      );
    }

    // 3. Validate MIME type
    const mimeType = file.type || 'image/jpeg';
    if (!ALLOWED_MIME_TYPES.has(mimeType.toLowerCase())) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed formats: JPEG, PNG, WEBP, GIF.' },
        { status: 400 }
      );
    }

    // 4. Sanitize folder & extension to prevent path traversal
    rawFolder = rawFolder.replace(/[^a-zA-Z0-9_-]/g, '');
    const folder = ALLOWED_FOLDERS.has(rawFolder) ? rawFolder : 'uploads';

    const rawExt = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
    const allowedExts = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    const fileExt = allowedExts.includes(rawExt) ? rawExt : 'jpg';

    const fileName = `${folder}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qukvnzbhnblyukkuhmwa.supabase.co';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    if (supabaseUrl && supabaseKey && !supabaseKey.includes('dummy')) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const bucketName = 'product-images';
        const buffer = Buffer.from(await file.arrayBuffer());

        const { error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(filePath, buffer, {
            contentType: mimeType,
            upsert: false,
          });

        if (!uploadError) {
          const { data: publicData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(filePath);

          return NextResponse.json({
            url: publicData.publicUrl,
            path: filePath,
            fileName: fileName,
            provider: 'supabase',
          });
        }
      } catch {
        // Fallback gracefully if storage bucket is unreachable
      }
    }

    // Fallback: Convert to Base64 Data URL
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = `data:${mimeType};base64,${buffer.toString('base64')}`;

    return NextResponse.json({
      url: base64,
      fileName: fileName,
      provider: 'base64-fallback',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server upload error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
