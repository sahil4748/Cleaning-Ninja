import { NextResponse } from 'next/server'
import { leadService } from '@/lib/platform/lead-service'
import { LeadSchema } from '@/lib/lead-contract'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(request: Request) {
  const headers = { 'Cache-Control': 'no-store' }
  try {
    // Bound buffering even when content-length is absent or inaccurate.
    const reader = request.body?.getReader()
    if (!reader) return NextResponse.json({ status: 'invalid' }, { status: 400, headers })
    const chunks: Uint8Array[] = []
    let size = 0
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > 16384) {
        await reader.cancel()
        return NextResponse.json({ status: 'invalid', message: 'Request is too large.' }, { status: 413, headers })
      }
      chunks.push(value)
    }
    const body = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    const { website, ...lead } = body
    if (website !== undefined && website !== '') return NextResponse.json({ status: 'invalid' }, { status: 400, headers })
    const parsed = LeadSchema.safeParse(lead)
    if (!parsed.success) {
      // Return field messages only; never echo customer values or log request bodies.
      return NextResponse.json({ status: 'invalid', errors: parsed.error.issues.map(issue => ({
        field: issue.path.join('.'), message: issue.message,
      })) }, { status: 400, headers })
    }
    const key = request.headers.get('Idempotency-Key')
    if (!key || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(key)) return NextResponse.json({ status: 'invalid', message: 'A submission key is required.' }, { status: 400, headers })
    const result = await leadService.submitLead(parsed.data, key)
    return NextResponse.json(result, { status: result.status === 'accepted' ? 201 : result.status === 'invalid' ? 400 : result.status === 'conflict' ? 409 : result.status === 'rate-limited' ? 429 : 503, headers })
  } catch {
    return NextResponse.json({ status: 'invalid', message: 'Invalid request.' }, { status: 400, headers })
  }
}
