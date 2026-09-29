import { test, expect } from '@playwright/test'

const mobile = '/homepage/hf_20260929_060509_51d77e97-b0bc-4cc4-a2c7-b08c143f2a85.mp4'
const desktop = '/homepage/h03-desktop-3e804515.mp4'

test('H-04 is poster-first, silent portrait motion with no layout shift and one settle', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.addInitScript(() => {
    Object.assign(window, { mediaCLS: 0 })
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number }
        if (!shift.hadRecentInput) (window as unknown as { mediaCLS: number }).mediaCLS += shift.value
      }
    }).observe({ type: 'layout-shift', buffered: true })
  })
  const requests: string[] = []
  page.on('request', request => { if (/\.mp4/.test(request.url())) requests.push(request.url()) })
  await page.goto('/')
  const video = page.locator('.h04-motion')
  await expect(video).toHaveAttribute('data-ready', 'true')
  expect(await video.evaluate((v: HTMLVideoElement) => ({ width: v.videoWidth, height: v.videoHeight, muted: v.muted, inline: v.playsInline, loop: v.loop, preload: v.preload, fit: getComputedStyle(v).objectFit }))).toEqual({ width: 720, height: 1280, muted: true, inline: true, loop: false, preload: 'none', fit: 'cover' })
  await expect(page.locator('.ninja-media')).toHaveAttribute('data-cinema', 'calm', { timeout: 12000 })
  expect(await video.evaluate((v: HTMLVideoElement) => v.paused && v.currentTime >= 4.5)).toBe(true)
  expect(requests.every(url => url.includes(mobile))).toBe(true)
  const timing = await page.evaluate(() => ({
    cls: (window as unknown as { mediaCLS: number }).mediaCLS,
    load: (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming).loadEventEnd,
    video: performance.getEntriesByType('resource').find(e => e.name.includes('51d77e97'))!.startTime,
  }))
  expect(timing.cls).toBe(0)
  expect(timing.video).toBeGreaterThan(timing.load)
  await page.locator('#services').scrollIntoViewIfNeeded()
  await page.locator('.home-hero').scrollIntoViewIfNeeded()
  expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(video).toHaveCount(0)
})

for (const mode of ['reduced', 'save-data', 'slow-network', 'no-js', 'denied', 'failed', 'slow-video']) {
  test(`H-04 preserves complete poster and CTA: ${mode}`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference', javaScriptEnabled: mode !== 'no-js' })
    const page = await context.newPage()
    const requests: string[] = []
    page.on('request', r => { if (r.url().includes('.mp4')) requests.push(r.url()) })
    if (mode === 'save-data' || mode === 'slow-network') await page.addInitScript(mode => Object.defineProperty(navigator, 'connection', { value: { saveData: mode === 'save-data', effectiveType: mode === 'slow-network' ? '2g' : '4g', addEventListener() {}, removeEventListener() {} } }), mode)
    if (mode === 'denied') await page.addInitScript(() => { HTMLMediaElement.prototype.play = () => Promise.reject(new DOMException('Denied', 'NotAllowedError')) })
    if (mode === 'failed') await page.route(`**${mobile}`, r => r.abort())
    if (mode === 'slow-video') await page.route(`**${mobile}`, () => {})
    await page.goto('/')
    await page.locator('.home-hero img').evaluate((img: HTMLImageElement) => img.decode())
    await page.waitForTimeout(800)
    await expect(page.locator('video[data-ready=true]')).toHaveCount(0)
    await expect(page.locator('.home-hero img')).toBeVisible()
    await expect(page.locator('.lab-quote')).toBeInViewport({ ratio: 1 })
    if (['reduced', 'save-data', 'slow-network', 'no-js'].includes(mode)) expect(requests).toEqual([])
    await context.close()
  })
}

test('breakpoint changes remove the wrong media, tablet stays static, and offscreen pauses', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await expect(page.locator('.h04-motion')).toHaveAttribute('data-ready', 'true')
  await page.locator('#packages').scrollIntoViewIfNeeded()
  await expect.poll(() => page.locator('video').evaluate((v: HTMLVideoElement) => v.paused)).toBe(true)
  await page.evaluate(() => scrollTo(0, 0))
  await page.setViewportSize({ width: 768, height: 1024 })
  await expect(page.locator('video')).toHaveCount(0)
  await page.setViewportSize({ width: 1440, height: 900 })
  await expect(page.locator('.h03-motion')).toHaveAttribute('src', desktop)
  await expect(page.locator('.h03-motion')).toHaveAttribute('data-ready', 'true')
  await expect(page.locator('.h04-motion')).toHaveCount(0)
})

test('package portraits and feedback service images load and keep quote prefills', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const images = page.locator('.home-package-photo img')
  await expect(images).toHaveCount(5)
  for (let i = 0; i < 5; i++) {
    const image = images.nth(i)
    await image.scrollIntoViewIfNeeded()
    await image.evaluate((img: HTMLImageElement) => img.decode())
    await expect(image).toHaveAttribute('loading', 'lazy')
    expect(await image.getAttribute('src')).toContain(`p-0${i + 1}`)
  }
  const sources = ['carpet.jpg', 'hero-desktop.jpg', 'hero-mobile.jpg', 'tile.jpg', 'leather.jpg']
  for (let i = 0; i < 10; i++) {
    await page.locator('.home-service-trigger').nth(i).click()
    const image = page.locator('.home-service-photo img')
    await image.evaluate((img: HTMLImageElement) => img.decode())
    expect(await image.getAttribute('src')).toContain(sources[i] ?? 'hero-desktop.jpg')
    const photo = await page.locator('.home-service-photo').boundingBox()
    expect(photo!.width / photo!.height).toBeCloseTo(1.5, 2)
    await expect(page.locator('.home-service-actions button')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390)
  }
  await page.getByRole('button', { name: 'Enquire about 3 rugs', exact: true }).click()
  await expect(page.getByLabel('Service', { exact: true })).toHaveValue('carpet-cleaning')
  await expect(page.getByText('Selected package:')).toContainText('3 rugs')
})
