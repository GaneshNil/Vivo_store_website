import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'uploads';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `${folder}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    if (supabaseUrl && supabaseServiceKey && !supabaseServiceKey.includes('dummy')) {
      try {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        const bucketName = 'product-images';
        const buffer = Buffer.from(await file.arrayBuffer());

        const { error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(filePath, buffer, {
            contentType: file.type || 'image/jpeg',
            upsert: true,
          });

        if (!uploadError) {
          const { data: publicData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(filePath);

          return NextResponse.json({
            url: publicData.publicUrl,
            path: filePath,
            fileName: file.name,
            provider: 'supabase',
          });
        }
      } catch {
        // Fallback to base64 if bucket doesn't exist or permissions error
      }
    }

    // Fallback: Convert to Base64 Data URL for instant rendering if Supabase credentials are in development/dummy mode
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = `data:${file.type || 'image/jpeg'};base64,${buffer.toString('base64')}`;

    return NextResponse.json({
      url: base64,
      fileName: file.name,
      provider: 'base64-fallback',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server upload error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
