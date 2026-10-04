import { Product, StoreSettings } from '@/lib/types';
import { INITIAL_STORE_SETTINGS } from '@/lib/data/seed-data';

export function getBaseUrl(requestHost?: string | null, requestProto?: string | null): string {
  if (requestHost) {
    const proto = requestProto || (requestHost.includes('localhost') ? 'http' : 'https');
    return `${proto}://${requestHost}`.replace(/\/$/, '');
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'https://galaxymobilegallery.vercel.app';
}

export const SITE_CONFIG = {
  name: 'Galaxy Mobile Gallery',
  legalName: 'Galaxy Mobile Gallery Begampur',
  tagline: 'VIVO Authorized Experience Showroom & Multi-Brand Mobile Hub',
  description: 'Explore latest VIVO X Series, V Series, T Series & multi-brand smartphones and genuine accessories at Galaxy Mobile Gallery, Begampur, Solapur. Bajaj Finance EMI Available in store.',
  url: getBaseUrl(),
  telephone: '+91-9067228008',
  email: 'galaxymobile09@gmail.com',
  address: {
    streetAddress: 'Main Road, Bazar Peth, Near Saraf Line',
    addressLocality: 'Begampur, Mohol',
    addressRegion: 'Maharashtra',
    postalCode: '413253',
    addressCountry: 'IN',
  },
  geo: {
    latitude: 17.5833,
    longitude: 75.6167,
  },
  openingHours: 'Mo-Su 10:00-21:00',
  priceRange: '₹₹ - ₹₹₹₹',
  paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Bajaj Finance EMI'],
  currenciesAccepted: 'INR',
  logo: '/assets/store-logo/IMG-20260822-WA0004.jpg',
  ogImage: '/assets/store-logo/IMG-20260822-WA0004.jpg',
};

export function generateWebSiteSchema() {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    alternateName: ['Galaxy Mobile', 'Galaxy Mobile Begampur', 'Vivo Showroom Begampur'],
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/mobiles?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateLocalBusinessSchema(settings?: Partial<StoreSettings>) {
  const baseUrl = getBaseUrl();
  const address = settings?.address || SITE_CONFIG.address.streetAddress;
  const landmark = settings?.landmark || 'Near Saraf Line';
  const taluka = settings?.taluka || 'Taluka Mohol';
  const district = settings?.district || 'District Solapur';
  const state = settings?.state || 'Maharashtra';
  const pincode = settings?.pincode || '413253';
  const phone = settings?.phone || '9067228008';
  const email = settings?.email || SITE_CONFIG.email;

  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ElectronicsStore', 'MobilePhoneStore'],
    '@id': `${baseUrl}/#localbusiness`,
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    description: SITE_CONFIG.description,
    url: baseUrl,
    telephone: `+91${phone}`,
    email: email,
    logo: `${baseUrl}${SITE_CONFIG.logo}`,
    image: [`${baseUrl}${SITE_CONFIG.logo}`],
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${address}, ${landmark}`,
      addressLocality: `${taluka}, ${district}`,
      addressRegion: state,
      postalCode: pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.geo.latitude,
      longitude: SITE_CONFIG.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '10:00',
        closes: '21:00',
      },
    ],
    priceRange: SITE_CONFIG.priceRange,
    paymentAccepted: SITE_CONFIG.paymentAccepted.join(', '),
    currenciesAccepted: SITE_CONFIG.currenciesAccepted,
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Begampur' },
      { '@type': 'AdministrativeArea', name: 'Mohol' },
      { '@type': 'AdministrativeArea', name: 'Solapur' },
      { '@type': 'AdministrativeArea', name: 'Pandharpur' },
      { '@type': 'AdministrativeArea', name: 'Mangalwedha' },
    ],
    knowsAbout: [
      'VIVO X Series Smartphones',
      'VIVO V Series Smartphones',
      'VIVO T Series Smartphones',
      'VIVO Y Series Smartphones',
      'Samsung Galaxy Smartphones',
      'OPPO Smartphones',
      'Realme Smartphones',
      'Fast Chargers & Mobile Adapters',
      'UV Curved Tempered Glass',
      'TWS Earbuds & Audio Accessories',
      'Bajaj Finance EMI Mobile Financing',
    ],
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'VIVO Authorized Experience Showroom & Live Demo',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Bajaj Finance 10-Minute Paperless Instant In-Store EMI Approval',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Multi-Brand Mobile Sales, Data Transfer & Screen Protection',
        },
      },
    ],
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url.startsWith('/') ? item.url : `/${item.url}`}`,
    })),
  };
}

export function generateProductSchema(product: Product) {
  const baseUrl = getBaseUrl();
  const defaultVariant = product.variants?.find(v => v.is_default) || product.variants?.[0];
  const primaryImg = product.images?.find(i => i.is_primary)?.image_url || product.images?.[0]?.image_url || `${baseUrl}${SITE_CONFIG.logo}`;
  const fullImageUrl = primaryImg.startsWith('http') ? primaryImg : `${baseUrl}${primaryImg.startsWith('/') ? primaryImg : `/${primaryImg}`}`;

  const allImages = product.images?.map(img => 
    img.image_url.startsWith('http') ? img.image_url : `${baseUrl}${img.image_url.startsWith('/') ? img.image_url : `/${img.image_url}`}`
  ) || [fullImageUrl];

  const price = defaultVariant?.selling_price || 0;
  const isAvailable = (defaultVariant?.current_stock ?? 1) > 0;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: allImages,
    description: product.description || product.tagline || `${product.name} available at Galaxy Mobile Gallery Begampur`,
    sku: product.id,
    mpn: defaultVariant?.sku || product.id,
    brand: {
      '@type': 'Brand',
      name: product.brand?.name || 'VIVO',
    },
    category: product.category?.name || (product.is_phone ? 'Smartphones' : 'Mobile Accessories'),
    offers: {
      '@type': 'Offer',
      url: `${baseUrl}/product/${product.slug}`,
      priceCurrency: 'INR',
      price: price,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: isAvailable
        ? 'https://schema.org/InStock'
        : 'https://schema.org/PreOrder',
      seller: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
      },
    },
  };
}
