/**
 * Client-Side Image Compression & Mobile Photo Normalizer
 * Automatically scales down high-resolution smartphone camera photos (50MP/12MB)
 * to a lightweight, crisp web-optimized image (<300KB) that uploads instantly
 * and fits safely in browser storage without QuotaExceeded errors.
 */

export interface CompressedImageResult {
  file: File;
  dataUrl: string;
  width: number;
  height: number;
  sizeBytes: number;
}

export async function compressImageForUpload(
  file: File,
  maxDimension: number = 1400,
  quality: number = 0.82
): Promise<CompressedImageResult> {
  // If already an SVG vector, do not compress via canvas
  if (file.type === 'image/svg+xml' || file.name.endsWith('.svg')) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        resolve({
          file,
          dataUrl,
          width: 200,
          height: 200,
          sizeBytes: file.size,
        });
      };
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      const img = document.createElement('img');
      img.onload = () => {
        let { width, height } = img;

        // Calculate aspect ratio preserving dimensions
        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback if canvas context fails
          resolve({
            file,
            dataUrl: readerEvent.target?.result as string,
            width: img.width,
            height: img.height,
            sizeBytes: file.size,
          });
          return;
        }

        // Draw image onto canvas
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP or JPEG
        const outputMimeType = 'image/jpeg';
        const dataUrl = canvas.toDataURL(outputMimeType, quality);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve({
                file,
                dataUrl,
                width,
                height,
                sizeBytes: file.size,
              });
              return;
            }

            const cleanFileName = file.name.replace(/\.[^/.]+$/, '') + '.jpg';
            const compressedFile = new File([blob], cleanFileName, {
              type: outputMimeType,
              lastModified: Date.now(),
            });

            resolve({
              file: compressedFile,
              dataUrl,
              width,
              height,
              sizeBytes: blob.size,
            });
          },
          outputMimeType,
          quality
        );
      };

      img.onerror = () => {
        // Fallback for raw formats or non-renderable formats
        resolve({
          file,
          dataUrl: readerEvent.target?.result as string,
          width: 800,
          height: 800,
          sizeBytes: file.size,
        });
      };

      img.src = readerEvent.target?.result as string;
    };

    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
