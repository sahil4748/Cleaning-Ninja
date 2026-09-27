/** Null builders intentionally withhold unverified proof. Escape script delimiters. */
export function JsonLd({ data }: { data: object | null | Array<object | null> }) {
  const safeData = Array.isArray(data) ? data.filter(Boolean) : data
  if (!safeData || (Array.isArray(safeData) && !safeData.length)) return null
  return <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify(safeData).replace(/</g, '\\u003c'),
  }} />
}
