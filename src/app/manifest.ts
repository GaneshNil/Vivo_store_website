import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Galaxy Mobile Gallery | VIVO Experience Showroom',
    short_name: 'Galaxy Mobile',
    description: 'VIVO Authorized Showroom & Multi-Brand Mobile Hub in Begampur, Solapur.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAFB',
    theme_color: '#0066FF',
    icons: [
      {
        src: '/assets/store-logo/IMG-20260822-WA0004.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        src: '/assets/store-logo/IMG-20260822-WA0004.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
  };
}
