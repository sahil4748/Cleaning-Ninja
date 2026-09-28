import { readFile } from 'node:fs/promises'
import path from 'node:path'

/** Local archive only: no public asset, remote source, or production media access. */
export async function GET(request: Request) {
  if (process.env.NODE_ENV !== 'development') return new Response(null, { status: 404 })
  const variant = new URL(request.url).searchParams.get('variant')
  if (variant !== 'raw' && variant !== 'retimed') return new Response(null, { status: 404 })
  try {
    const file = await readFile(path.join(process.cwd(), '.local-evidence', 'stabilization-2026-09-27', 'public', 'homepage', `h03-desktop-${variant}.mp4`))
    const headers = { 'Content-Type': 'video/mp4', 'Cache-Control': 'no-store', 'Accept-Ranges': 'bytes' }
    const range = request.headers.get('range')
    if (range) {
      const match = /^bytes=(\d+)-(\d*)$/.exec(range)
      const start = match ? Number(match[1]) : -1
      const end = match?.[2] ? Math.min(Number(match[2]), file.length - 1) : file.length - 1
      if (start < 0 || start > end) return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${file.length}` } })
      return new Response(file.subarray(start, end + 1), { status: 206, headers: { ...headers, 'Content-Length': String(end - start + 1), 'Content-Range': `bytes ${start}-${end}/${file.length}` } })
    }
    return new Response(file, { headers: { ...headers, 'Content-Length': String(file.length) } })
  } catch {
    return new Response(null, { status: 404 })
  }
}
