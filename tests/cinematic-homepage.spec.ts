import { test, expect } from '@playwright/test'
import { mkdir, readFile, writeFile } from 'node:fs/promises'

const asset = '/homepage/h03-desktop-3e804515.mp4'
const evidence = 'test-results/final-cinematic'
const local = '.local-evidence/final-cinematic'
type Metrics = { cls: number; lcp: { tag: string; time: number; url: string }[]; events: number[] }

test.beforeEach(async ({ page }) => {
  await mkdir(evidence, { recursive: true }); await mkdir(local, { recursive: true })
  await page.addInitScript(() => {
    const metrics: Metrics = { cls: 0, lcp: [], events: [] }
    Object.assign(window, { cinemaMetrics: metrics })
    new PerformanceObserver(list => { for (const entry of list.getEntries()) {
      const paint = entry as PerformanceEntry & { element?: Element; url: string }
      metrics.lcp.push({ tag: paint.element?.tagName ?? '', time: paint.startTime, url: paint.url })
    } }).observe({ type: 'largest-contentful-paint', buffered: true })
    new PerformanceObserver(list => { for (const entry of list.getEntries()) {
      const shift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number }
      if (!shift.hadRecentInput) metrics.cls += shift.value
    } }).observe({ type: 'layout-shift', buffered: true })
    new PerformanceObserver(list => { for (const entry of list.getEntries()) metrics.events.push(entry.duration) }).observe({ type: 'event', buffered: true, durationThreshold: 16 } as PerformanceObserverInit)
  })
})

for (const [width, height] of [[1366,768],[1440,900],[1920,1080]]) test(`poster first, autonomous shot and timeline ${width}`, async ({ page }) => {
  await page.setViewportSize({ width, height })
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  let release!: () => void
  const held = new Promise<void>(resolve => { release = resolve })
  await page.route(`**${asset}`, async route => { await held; await route.continue() })
  await page.goto('/')
  await page.locator('.home-hero img').evaluate((image: HTMLImageElement) => image.decode())
  await page.evaluate(() => document.fonts.ready)
  await expect(page.locator('.home-hero .lab-quote')).toBeInViewport({ ratio: 1 })
  await expect(page.locator('.home-hero video')).toHaveCount(1)
  await expect(page.locator('video[data-ready="true"]')).toHaveCount(0)
  const before = await page.locator('.home-hero h1,.home-hero .lab-details,.home-header').evaluateAll(elements => elements.map(element => element.getBoundingClientRect().toJSON()))
  if (width === 1440) await page.screenshot({ path: `${evidence}/desktop-initial.png` })
  release()
  await expect(page.locator('video')).toHaveAttribute('data-ready', 'true')
  await expect(page.locator('.home-hero .ninja-media')).toHaveAttribute('data-cinema', 'calm', { timeout: 12000 })
  expect(await page.locator('video').evaluate((video: HTMLVideoElement) => video.paused && video.currentTime >= 4.6 && video.currentTime <= 5)).toBe(true)
  const metrics = await page.evaluate(() => ({
    ...(window as unknown as { cinemaMetrics: Metrics }).cinemaMetrics,
    load: (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming).loadEventEnd,
    resources: performance.getEntriesByType('resource').filter(entry => /h03-desktop|_next\/image/.test(entry.name)).map(entry => ({ url: entry.name, start: entry.startTime, end: entry.startTime + entry.duration })),
    mediaError: document.querySelector('video')?.error?.message ?? null,
  }))
  await writeFile(`${local}/metrics-${width}.json`, JSON.stringify(metrics, null, 2))
  console.log('CINEMATIC_LOCAL_METRICS', width, JSON.stringify(metrics))
  expect(metrics.cls).toBe(0)
  // Chromium may exclude a viewport-filling poster and select the heading.
  expect(metrics.lcp.length).toBeGreaterThan(0)
  expect(metrics.lcp.some(entry => entry.tag === 'VIDEO')).toBe(false)
  expect(metrics.resources.find(entry => entry.url.includes('h03-desktop'))!.start).toBeGreaterThan(metrics.load)
  expect(metrics.mediaError).toBeNull()
  expect(errors).toEqual([])
  expect(await page.locator('.home-hero h1,.home-hero .lab-details,.home-header').evaluateAll(elements => elements.map(element => element.getBoundingClientRect().toJSON()))).toEqual(before)
  for (const time of [0,1,2.5,4,4.8]) {
    await page.locator('video').evaluate(async (video: HTMLVideoElement, time) => {
      await new Promise<void>(resolve => { video.addEventListener('seeked', () => resolve(), { once: true }); video.currentTime = time })
    }, time)
    await page.screenshot({ path: `${local}/timeline-${width}-${time}.png` })
    if (width === 1440 && [2.5,4.8].includes(time)) await page.screenshot({ path: `${evidence}/desktop-${time === 2.5 ? '2.5s' : 'final'}.png` })
  }
})

for (const mode of ['reduced','save-data','slow-connection','autoplay-denied','request-fails','no-js','slow-video','unsupported-mask'] as const) test(`complete poster fallback: ${mode}`, async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: mode !== 'no-js', reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference' })
  const page = await context.newPage()
  const requests: string[] = []
  page.on('request', request => { if (request.url().includes(asset)) requests.push(request.url()) })
  if (mode === 'save-data' || mode === 'slow-connection') await page.addInitScript(mode => Object.defineProperty(navigator, 'connection', { value: { saveData: mode === 'save-data', effectiveType: mode === 'slow-connection' ? '2g' : '4g', addEventListener() {}, removeEventListener() {} } }), mode)
  if (mode === 'autoplay-denied') await page.addInitScript(() => { HTMLMediaElement.prototype.play = () => Promise.reject(new DOMException('Denied', 'NotAllowedError')) })
  if (mode === 'unsupported-mask') await page.addInitScript(() => { CSS.supports = () => false })
  if (mode === 'request-fails') await page.route(`**${asset}`, route => route.abort())
  if (mode === 'slow-video') await page.route(`**${asset}`, () => {})
  await page.goto('/')
  await page.locator('.home-hero img').evaluate((image: HTMLImageElement) => image.decode())
  await page.waitForTimeout(1200)
  await expect(page.locator('video[data-ready="true"]')).toHaveCount(0)
  await expect(page.locator('.home-hero img')).toBeVisible()
  await expect(page.locator('.home-hero .lab-quote')).toBeInViewport({ ratio: 1 })
  if (['reduced','save-data','slow-connection','no-js','unsupported-mask'].includes(mode)) expect(requests).toEqual([])
  if (mode === 'reduced') await page.screenshot({ path: `${evidence}/reduced-motion.png` })
  if (mode === 'reduced' || mode === 'no-js') await expect(page.locator('.home-cut-noise')).toBeHidden()
  await context.close()
})

for (const [width,height] of [[320,568],[375,812],[390,844],[440,956],[768,1024],[1024,768],[1366,768],[1440,900],[1728,1000],[1920,1080]]) test(`locked geometry and intentional strategy ${width}`, async ({ page }) => {
  await page.setViewportSize({ width,height })
  const requests: string[] = []
  page.on('request', request => { if (request.url().includes(asset)) requests.push(request.url()) })
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await page.locator('.home-hero img').evaluate((image: HTMLImageElement) => image.decode())
  const boxes = await page.locator('.home-hero,.home-hero h1,.home-hero .lab-details,.home-header,#packages,#services,#quote').evaluateAll(elements => elements.map(element => ({ class: element.className, box: element.getBoundingClientRect().toJSON() })))
  const baseline = JSON.parse(await readFile('tests/fixtures/homepage-static-779c265.json', 'utf8'))
  expect(boxes).toEqual(baseline.find((item: { width: number }) => item.width === width).boxes)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  if (width < 1200) {
    await page.waitForTimeout(width < 768 ? 4200 : 1000)
    expect(requests).toEqual([])
    await expect(page.locator('video')).toHaveCount(0)
    const transform = await page.locator('.ninja-resolved').evaluate(element => getComputedStyle(element).transform)
    expect(transform === 'none').toBe(width >= 768)
    if (width === 390) await page.screenshot({ path: `${evidence}/mobile-390.png` })
    if ([320,440].includes(width)) await page.screenshot({ path: `${local}/mobile-${width}.png` })
  } else {
    await expect(page.locator('video')).toHaveAttribute('data-ready', 'true')
    const plane = await page.locator('video').boundingBox()
    expect(plane!.width).toBeCloseTo(Math.max(width, height * 5504 / 3072), 1)
    await expect(page.locator('video')).toHaveAttribute('aria-hidden', 'true')
    await expect(page.locator('video')).toHaveAttribute('tabindex', '-1')
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect(page.locator('video')).toHaveCount(0)
  }
})

test('offscreen pause and signature Cut resolve once', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  await expect(page.locator('video')).toHaveAttribute('data-ready', 'true')
  await page.locator('#ninja-cut').scrollIntoViewIfNeeded()
  await expect.poll(() => page.locator('video').evaluate((video: HTMLVideoElement) => video.paused)).toBe(true)
  await expect(page.locator('#ninja-cut')).toHaveAttribute('data-cut-state', 'running')
  await page.locator('#ninja-cut').evaluate(element => Promise.all(element.getAnimations({ subtree: true }).map(animation => animation.finished)))
  await page.locator('#ninja-cut').screenshot({ path: `${evidence}/signature.png` })
  const clip = await page.locator('.home-cut-noise').evaluate(element => getComputedStyle(element).clipPath)
  await page.locator('#quote').scrollIntoViewIfNeeded()
  await page.locator('#ninja-cut').scrollIntoViewIfNeeded()
  expect(await page.locator('.home-cut-noise').evaluate(element => getComputedStyle(element).clipPath)).toBe(clip)
})

test('production serves only the selected raw clip with byte ranges', async ({ request }) => {
  const response = await request.get(asset, { headers: { Range: 'bytes=0-1023' } })
  expect(response.status()).toBe(206)
  expect(response.headers()['content-type']).toContain('video/mp4')
  expect((await response.body()).length).toBe(1024)
  for (const path of ['/api/dev/h03?variant=raw','/api/dev/h03?variant=retimed','/homepage/h03-desktop-raw.mp4','/homepage/h03-desktop-retimed.mp4']) expect((await request.get(path)).status()).toBe(404)
})

test('late JavaScript leaves a complete interactive anchor before enhancement', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  let release!: () => void
  const held = new Promise<void>(resolve => { release = resolve })
  await page.route('**/*.js', async route => { await held; await route.continue() })
  await page.goto('/', { waitUntil: 'commit' })
  await page.locator('.home-hero img').evaluate((image: HTMLImageElement) => image.decode())
  await expect(page.locator('.home-hero h1')).toBeVisible()
  await expect(page.locator('.home-hero .lab-quote')).toHaveAttribute('href', '#quote')
  await page.waitForTimeout(500)
  await expect(page.locator('video')).toHaveCount(0)
  release()
  await expect(page.locator('video')).toHaveAttribute('data-ready', 'true')
})

test('unintercepted autoplay keeps initial content as LCP', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  await expect(page.locator('.home-hero .ninja-media')).toHaveAttribute('data-cinema', 'calm', { timeout: 12000 })
  const result = await page.evaluate(() => ({
    ...(window as unknown as { cinemaMetrics: Metrics }).cinemaMetrics,
    load: (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming).loadEventEnd,
    resources: performance.getEntriesByType('resource').filter(entry => /h03-desktop|hf_20260927_084053/.test(entry.name)).map(entry => ({ url: entry.name, start: entry.startTime, end: entry.startTime + entry.duration, bytes: (entry as PerformanceResourceTiming).transferSize })),
    time: document.querySelector('video')?.currentTime,
  }))
  expect(result.cls).toBe(0)
  expect(result.lcp.some(entry => entry.tag === 'VIDEO')).toBe(false)
  expect(result.resources.find(entry => entry.url.includes('h03-desktop'))!.start).toBeGreaterThan(result.resources.find(entry => entry.url.includes('hf_20260927_084053'))!.end)
  await writeFile(`${local}/natural-metrics.json`, JSON.stringify(result, null, 2))
  console.log('CINEMATIC_NATURAL_METRICS', JSON.stringify(result))
})
