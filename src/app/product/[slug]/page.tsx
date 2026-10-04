import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetailClient } from '@/components/customer/ProductDetailClient';
import { getProductBySlug, getAllProductSlugs } from '@/lib/data/products-server';
import { getBaseUrl, SITE_CONFIG, generateProductSchema, generateBreadcrumbSchema } from '@/lib/seo/config';
import { formatPrice } from '@/lib/utils/formatters';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    return {
      title: 'Product Not Found | Galaxy Mobile Gallery',
      description: 'The requested smartphone or accessory could not be found at Galaxy Mobile Gallery Begampur.',
      robots: { index: false, follow: false },
    };
  }

  const baseUrl = getBaseUrl();
  const defaultVariant = product.variants?.find(v => v.is_default) || product.variants?.[0];
  const price = defaultVariant ? formatPrice(defaultVariant.selling_price) : '';
  const primaryImg = product.images?.find(i => i.is_primary)?.image_url || product.images?.[0]?.image_url || SITE_CONFIG.logo;
  const absoluteImageUrl = primaryImg.startsWith('http') ? primaryImg : `${baseUrl}${primaryImg.startsWith('/') ? primaryImg : `/${primaryImg}`}`;

  const title = `${product.name} ${price ? `(${price})` : ''} - Price & Specs`;
  const description = product.description || product.tagline || `Buy ${product.name} with official manufacturer warranty at Galaxy Mobile Gallery, Begampur. Live demo units & 0% Bajaj Finance EMI available.`;

  return {
    title,
    description: description.slice(0, 160),
    alternates: {
      canonical: `/product/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} - In-Store Live Demo & Stock | Galaxy Mobile Gallery`,
      description,
      url: `${baseUrl}/product/${product.slug}`,
      type: 'website',
      images: [
        {
          url: absoluteImageUrl,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Galaxy Mobile Gallery Begampur`,
      description,
      images: [absoluteImageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const productSchema = product ? generateProductSchema(product) : null;
  const breadcrumbSchema = product
    ? generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: product.is_phone ? 'Mobiles' : 'Accessories', url: product.is_phone ? '/mobiles' : '/accessories' },
        { name: product.name, url: `/product/${product.slug}` },
      ])
    : null;

  return (
    <>
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      <ProductDetailClient />
    </>
  );
}
