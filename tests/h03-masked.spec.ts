import { test, expect } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'
const output = 'test-results/h03-masked'
const production = process.env.H03_PRODUCTION === '1' || process.env.H03_DEVELOPMENT !== '1'

test.beforeEach(async ({ page }) => {
  await mkdir(output, { recursive: true })
  await page.addInitScript(() => {
    const state = window as typeof window & { shifts: number; paints: unknown[] }
    state.shifts = 0; state.paints = []
    new PerformanceObserver(list => { for (const entry of list.getEntries()) { const e = entry as PerformanceEntry & { hadRecentInput: boolean; value: number }; if (!e.hadRecentInput) state.shifts += e.value } }).observe({ type: 'layout-shift', buffered: true })
    new PerformanceObserver(list => { state.paints.push(...list.getEntries().map(e => ({ start: e.startTime, element: (e as PerformanceEntry & { element?: Element }).element?.tagName }))) }).observe({ type: 'largest-contentful-paint', buffered: true })
  })
})
for (const mode of ['masked', 'masked-retimed']) for (const [width, height] of [[1366,768],[1440,900],[1728,1000],[1920,1080]]) {
  test(`${mode} ${width}`, async ({ page }) => {
    test.skip(production)
    const errors: string[] = []; page.on('pageerror', e => errors.push(e.message))
    await page.setViewportSize({ width, height })
    await page.goto(`/?hero-motion=${mode}&ninja-cut=1`)
    await page.locator('.home-hero img').evaluate((img: HTMLImageElement) => img.decode())
    await expect(page.locator('.home-hero .ninja-media')).toHaveAttribute('data-cut-preview', 'false')
    await page.mouse.click(1000, 300)
    const video = page.locator('.h03-masked')
    await expect(video).toHaveAttribute('data-ready', 'true')
    await page.addStyleTag({ content: 'nextjs-portal { display:none }' })
    const before = await page.locator('.home-hero').boundingBox()
    await video.evaluate((el: HTMLVideoElement) => el.pause())
    for (const time of [0,1,2,2.5,3,4,5]) {
      await video.evaluate(async (el: HTMLVideoElement, t) => { if (Math.abs(el.currentTime - t) < .001) return; await new Promise<void>(resolve => { el.addEventListener('seeked', () => resolve(), { once: true }); el.currentTime = t }) }, time)
      await expect(page.locator('.home-hero h1')).toBeVisible()
      await expect(page.locator('.h01-quote')).toBeInViewport()
      expect(await page.locator('.home-hero').boundingBox()).toEqual(before)
      if (width === 1440 || time === 5) await page.screenshot({ path: `${output}/${mode}-${width}-${time}s.png` })
    }
    const metrics = await page.evaluate(() => ({ cls: (window as typeof window & { shifts: number }).shifts, lcp: (window as typeof window & { paints: unknown[] }).paints, resources: performance.getEntriesByType('resource').filter(e => /api\/dev\/h03|_next\/image/.test(e.name)).map(e => ({ name: e.name, start: e.startTime, end: e.startTime + e.duration })), load: (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming).loadEventEnd, mask: getComputedStyle(document.querySelector('video')!).maskImage }))
    expect(metrics.cls).toBe(0); expect(metrics.lcp.every((e: unknown) => (e as { element: string }).element !== 'VIDEO')).toBe(true); expect(errors).toEqual([])
    await writeFile(`${output}/${mode}-${width}.json`, JSON.stringify(metrics, null, 2))
  })
}
for (const fallback of ['default','mobile','tablet','reduced','save-data','error','autoplay','production']) test(`fallback ${fallback}`, async ({ page }) => {
  test.skip(fallback === 'production' ? !production : production)
  const requests: string[] = []; page.on('request', r => { if (r.url().includes('/api/dev/h03')) requests.push(r.url()) })
  await page.setViewportSize({ width: fallback === 'mobile' ? 390 : fallback === 'tablet' ? 1024 : 1440, height: 900 })
  if (fallback === 'reduced') await page.emulateMedia({ reducedMotion: 'reduce' })
  if (fallback === 'save-data') await page.addInitScript(() => Object.defineProperty(navigator, 'connection', { value: { saveData: true, addEventListener() {}, removeEventListener() {} } }))
  if (fallback === 'autoplay') await page.addInitScript(() => { HTMLMediaElement.prototype.play = () => Promise.reject(new DOMException('Blocked', 'NotAllowedError')) })
  if (fallback === 'error') await page.route('**/api/dev/h03?*', r => r.abort())
  await page.goto(fallback === 'default' ? '/' : '/?hero-motion=masked')
  await page.locator('.home-hero img').evaluate((img: HTMLImageElement) => img.decode())
  if (!production) await expect(page.locator('.home-hero .ninja-media')).toHaveAttribute('data-cut-preview', 'false')
  await page.mouse.click(1000, 300)
  await page.waitForTimeout(1000)
  await expect(page.locator('.home-hero .ninja-resolved')).toBeVisible()
  await expect(page.locator('.h03-masked[data-ready="true"]')).toHaveCount(0)
  if (!['error','autoplay'].includes(fallback)) expect(requests).toHaveLength(0)
  if (fallback === 'production') {
    for (const mode of ['masked', 'masked-retimed']) {
      for (const width of [1440, 390]) {
        await page.setViewportSize({ width, height: 900 })
        await page.goto(`/?hero-motion=${mode}`)
        const image = page.locator('.home-hero img')
        await image.evaluate((img: HTMLImageElement) => img.decode())
        await page.keyboard.press('Tab')
        await expect(page.locator('.home-hero video')).toHaveCount(0)
        expect(await image.evaluate((img: HTMLImageElement) => img.currentSrc)).toContain(width === 1440 ? 'hf_20260927_084053' : 'hf_20260927_092222')
      }
    }
    expect(requests).toHaveLength(0)
    for (const variant of ['raw', 'retimed']) {
      expect((await page.request.get(`/api/dev/h03?variant=${variant}`)).status()).toBe(404)
      expect((await page.request.get(`/homepage/h03-desktop-${variant}.mp4`)).status()).toBe(404)
    }
  }
})
test('natural playback and runtime reduced motion', async ({ page }) => {
  test.skip(production)
  await page.setViewportSize({ width: 1440, height: 900 })
  const requests: string[] = []
  page.on('request', r => { if (r.url().includes('/api/dev/h03')) requests.push(r.url()) })
  await page.goto('/?hero-motion=masked')
  await expect(page.locator('.home-hero .ninja-media')).toHaveAttribute('data-cut-preview', 'false')
  await page.waitForTimeout(350)
  expect(requests).toHaveLength(0)
  await page.locator('.home-hero img').evaluate((img: HTMLImageElement) => img.decode())
  await expect(page.locator('.home-hero .ninja-media')).toHaveAttribute('data-cut-preview', 'false')
  await page.mouse.click(1000, 300)
  await expect(page.locator('video[data-ready="true"]')).toHaveCount(1)
  await page.waitForFunction(() => document.querySelector('video')?.ended)
  expect(await page.evaluate(() => (window as typeof window & { shifts: number }).shifts)).toBe(0)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('.h03-masked')).toHaveCount(0)
})
