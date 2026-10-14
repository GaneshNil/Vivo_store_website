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
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/assets/store-logo/IMG-20260822-WA0004.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
  };
}
