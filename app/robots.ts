import type { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  // Rebuild is not approved for indexing. No public sitemap advertised yet.
  return { rules: { userAgent: '*', disallow: '/' } }
}
