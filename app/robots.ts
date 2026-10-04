import type { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  // Indexing allowed. Legal pages carry their own noindex until they are rewritten; no sitemap advertised yet.
  return { rules: { userAgent: '*', allow: '/' } }
}
