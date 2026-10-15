import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Galaxy Mobile Gallery',
    short_name: 'Galaxy Mobile Gallery',
    description: 'Explore smartphones and mobile accessories at Galaxy Mobile Gallery in Begampur, Solapur.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAFB',
    theme_color: '#0066FF',
    icons: [
      {
        src: '/favicon-48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
