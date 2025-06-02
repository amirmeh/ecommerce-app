import { getRuntimeConfig } from '@/lib/config';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const { baseUrl } = getRuntimeConfig();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/dashboard/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
