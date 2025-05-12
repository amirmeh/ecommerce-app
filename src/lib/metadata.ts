import { Image } from '@/generated/prisma';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

type ProductMetadata = {
  title?: string;
  description?: string | null;
  keywords?: string[];
  images?: Image[] | null;
};

export default function customMetadataGenerator({
  title = 'Tehran Apple Store',
  description = 'an e-commerce for ...',
  keywords = ['digital', 'laptop', 'mobile'],
  images = undefined,
}: ProductMetadata): Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      type: 'website',
      url: `http://localhost:3000/${title}`,
      images,
    } as OpenGraph,
  };
}
