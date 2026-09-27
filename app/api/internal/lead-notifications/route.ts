import { timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'
import { processNotifications } from '@/lib/platform/notifications'
export const runtime = 'nodejs'
export const maxDuration = 60
export async function POST(request: Request) {
  const expected = process.env.LEAD_WORKER_SECRET
  const actual = request.headers.get('authorization') ?? ''
  if (!expected || expected.length < 32 || Buffer.byteLength(actual) !== Buffer.byteLength(`Bearer ${expected}`) || !timingSafeEqual(Buffer.from(actual), Buffer.from(`Bearer ${expected}`))) {
    return NextResponse.json({ status: 'unauthorised' }, { status: 401 })
  }
  try { return NextResponse.json(await processNotifications(4), { headers: { 'Cache-Control': 'no-store' } }) }
  catch { return NextResponse.json({ status: 'unavailable' }, { status: 503 }) }
}
