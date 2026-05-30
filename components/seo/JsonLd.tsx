/**
 * JsonLd — emit a single application/ld+json script tag.
 *
 * Server-renderable; safe to compose multiple per page (e.g. HousekeepingService
 * + FAQPage + BreadcrumbList). We disable React's text-injection escaping
 * because JSON-LD is data, not user text.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
