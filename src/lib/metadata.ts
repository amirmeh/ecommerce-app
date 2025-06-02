import { Image } from '@/generated/prisma';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { getRuntimeConfig } from './config';

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
  const { baseUrl } = getRuntimeConfig();

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      type: 'website',
      url: `${baseUrl}/${title}`,
      images,
    } as OpenGraph,
  };
}
