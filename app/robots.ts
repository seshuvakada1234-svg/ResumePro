import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/builder',
      ],
    },
    sitemap: 'https://freeresume.dev/sitemap.xml',
  };
}
