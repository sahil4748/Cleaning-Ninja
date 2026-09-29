import { test, expect } from '@playwright/test'

const sizes = [[320,568],[360,800],[375,812],[390,844],[393,852],[402,874],[412,915],[430,932],[440,956],[768,1024],[1024,768],[1366,768],[1440,900],[1728,1000],[1920,1080]]
for (const [width, height] of sizes) {
  test(`homepage composition at ${width}×${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height })
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    await page.locator('.home-hero img').evaluate((image: HTMLImageElement) => image.decode())
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Bring your space back to calm.')
    await expect(page.locator('.home-hero .home-button')).toBeInViewport({ ratio: 1 })
    const source = await page.locator('.home-hero img').evaluate((image: HTMLImageElement) => image.currentSrc)
    expect(source).toContain(width < 768 ? 'hf_20260928_141125_f8371d19' : 'hf_20260927_084053_c4d57005')
    await expect(page.locator('.home-package')).toHaveCount(5)
    await expect(page.locator('.home-service-trigger')).toHaveCount(10)
    const headers = await page.locator('.home-header a, .home-header button').evaluateAll(elements => elements.map(element => element.getBoundingClientRect().toJSON()).filter(rect => rect.width))
    for (const rect of headers) { expect(rect.x).toBeGreaterThanOrEqual(0); expect(rect.right).toBeLessThanOrEqual(width); expect(rect.height).toBeGreaterThanOrEqual(44) }
    for (const id of ['packages','services','ninja-cut','why','how-it-works','proof','coverage','faq','quote']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    }
    await expect(page.locator('a[href^="tel:"], canvas')).toHaveCount(0)
    await expect(page.getByText(/1,247|4\.9|police.checked|insured|guarantee/i)).toHaveCount(0)
    await expect(page.locator('h1')).toHaveCount(1)
    const body = await page.locator('main').innerText()
    expect(body).not.toMatch(/\$\d|\d+% off|Brisbane is where we begin|booking confirmed|five.star/i)
    expect(errors).toEqual([])
    if ([390,1440].includes(width)) {
      await page.locator('#ninja-cut').evaluate(element => Promise.all(element.getAnimations({ subtree: true }).map(animation => animation.finished)))
      await page.locator('main img').evaluateAll(images => Promise.all(images.map(image => (image as HTMLImageElement).decode().catch(() => {}))))
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
      await expect(page.locator('.home-header')).toHaveAttribute('data-scrolled', 'false')
      await page.locator('.home-header').evaluate(element => Promise.all(element.getAnimations({ subtree: true }).map(animation => animation.finished)))
      await page.screenshot({ path: `test-results/homepage/full-${width}.png`, fullPage: true })
      if (width !== 440) await page.screenshot({ path: `test-results/homepage/hero-${width}.png` })
      if (width === 1440) {
        for (const [first, last, name] of [['#packages', '#services', 'packages-services'], ['#quote', '.home-footer', 'quote-finale']]) {
          const start = await page.locator(first).boundingBox()
          const end = await page.locator(last).boundingBox()
          await page.screenshot({ path: `test-results/homepage/${name}-1440.png`, fullPage: true, clip: { x: 0, y: start!.y, width, height: end!.y + end!.height - start!.y }, style: '.home-header { visibility: hidden; }' })
        }
      }
    }
  })
}

test('communication, mobile menu, FAQ and sticky quote support keyboard', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await expect(page.locator('.home-sticky-quote')).toBeHidden()
  const call = page.getByRole('button', { name: 'Call and communication options' })
  await call.focus(); await page.keyboard.press('Enter')
  await expect(page.getByRole('dialog', { name: 'Talk to Cleaning Ninja' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Close communication options' })).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(page.getByRole('dialog').getByRole('link', { name: 'contact@cleaningninja.co' })).toBeFocused()
  await page.keyboard.press('Escape'); await expect(call).toBeFocused()
  const menu = page.getByRole('button', { name: 'Open menu' })
  await menu.click(); await page.keyboard.press('Escape'); await expect(menu).toBeFocused()
  await menu.click()
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Packages' }).click()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page.locator('#packages')).toBeInViewport()
  await expect(page.locator('.home-sticky-quote')).toBeVisible()
  await page.locator('#faq summary').first().focus(); await page.keyboard.press('Enter')
  await expect(page.locator('#faq details').first()).toHaveAttribute('open', '')
  await page.locator('.home-sticky-quote').click()
  await expect(page.locator('.home-sticky-quote')).toBeHidden()
  await expect(page.locator('#quote')).toBeInViewport()
})

test('package, service and area context persist; backend unavailable never shows receipt', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Name (required)').fill('Synthetic Customer')
  await page.getByLabel('Phone (required)').fill('0400000000')
  await page.getByLabel('Description (required)').fill('Synthetic local test only.')
  await page.getByLabel('Email (optional)').fill('test@example.com')
  await page.getByLabel('Your suburb or address').fill('Synthetic suburb')
  await page.getByRole('button', { name: 'Enquire about 5-seat fabric lounge' }).click()
  await expect(page.getByLabel('Service', { exact: true })).toHaveValue('upholstery-cleaning')
  await expect(page.getByText('Selected package:')).toContainText('5-seat fabric lounge')
  await expect(page.getByLabel('Suburb/address (required)')).toHaveValue('Synthetic suburb')
  await page.getByRole('button', { name: '05 Leather Care' }).click()
  await page.getByRole('button', { name: 'Quote this service' }).click()
  await expect(page.getByLabel('Service', { exact: true })).toHaveValue('leather-cleaning')
  await expect(page.getByText('Selected package:')).toHaveCount(0)
  await page.getByLabel('Preferred date (optional)').fill('2026-12-20')
  await page.getByLabel('Preferred time (optional)').fill('10:30')
  const requestPromise = page.waitForRequest(request => request.url().endsWith('/api/quote') && request.method() === 'POST')
  await page.getByRole('button', { name: 'Request a Quote', exact: true }).click()
  const payload = (await requestPromise).postDataJSON()
  expect(payload).toMatchObject({ intent: 'booking', service: 'leather-cleaning', suburbOrAddress: 'Synthetic suburb', preferredDateTime: { date: '2026-12-20', time: '10:30', timeZone: 'Australia/Brisbane' } })
  expect(payload.city).toBeUndefined()
  await expect(page.getByRole('form', { name: 'Request a Quote' }).getByRole('alert')).toContainText("Your request wasn't sent.")
  await expect(page.getByLabel('Name (required)')).toHaveValue('Synthetic Customer')
  await expect(page.getByLabel('Description (required)')).toHaveValue('Synthetic local test only.')
  await expect(page.getByRole('form', { name: 'Request a Quote' }).getByRole('alert')).toBeFocused()
})

test('required fields, invalid receipt, network failure and idempotent retry', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Request a Quote', exact: true }).click()
  await expect(page.locator('form [aria-invalid=true]')).toHaveCount(5)
  await expect(page.getByLabel('Service', { exact: true })).toBeFocused()
  await page.getByLabel('Service', { exact: true }).selectOption('carpet-cleaning')
  await page.getByLabel('Description (required)').fill('Synthetic local test only.')
  await page.getByLabel('Suburb/address (required)').fill('Test suburb')
  await page.getByLabel('Name (required)').fill('Test Customer')
  await page.getByLabel('Phone (required)').fill('0400000000')
  const keys: string[] = []
  await page.route('**/api/quote', route => { keys.push(route.request().headers()['idempotency-key']); return route.fulfill({ status: 200, contentType: 'application/json', body: '{"status":"accepted"}' }) })
  await page.getByRole('button', { name: 'Request a Quote', exact: true }).click()
  await expect(page.getByRole('form', { name: 'Request a Quote' }).getByRole('alert')).toContainText("wasn't sent")
  await page.getByRole('button', { name: 'Request a Quote', exact: true }).click()
  await expect(page.getByRole('form', { name: 'Request a Quote' }).getByRole('alert')).toContainText("wasn't sent")
  expect(keys[0]).toBeTruthy(); expect(keys[1]).toBe(keys[0])
  await page.route('**/api/quote', route => route.abort())
  await page.getByRole('button', { name: 'Request a Quote', exact: true }).click()
  await expect(page.getByRole('form', { name: 'Request a Quote' }).getByRole('alert')).toContainText('could not confirm receipt')
  await expect(page.getByLabel('Name (required)')).toHaveValue('Test Customer')
})

test('reduced motion, mobile services and visible focus', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  expect(await page.locator('.home-cut-noise').evaluate(element => getComputedStyle(element).display)).toBe('none')
  await page.getByRole('button', { name: '02 Carpet Steam Clean' }).click()
  await expect(page.locator('#active-service-title')).toBeFocused()
  await expect(page.getByRole('button', { name: 'Quote this service' })).toBeInViewport()
  await page.getByRole('button', { name: 'Quote this service' }).click()
  await expect(page.getByLabel('Service', { exact: true })).toHaveValue('carpet-cleaning')
  await expect(page.getByLabel('Service', { exact: true })).toBeFocused()
  await page.keyboard.press('Tab')
  expect(await page.locator(':focus').evaluate(element => getComputedStyle(element).outlineStyle)).not.toBe('none')
})

test('local performance and static optimized hero delivery', async ({ page }) => {
  await page.addInitScript(() => {
    const metrics = { lcp: 0, cls: 0, interaction: 0 }
    Object.assign(window, { homeMetrics: metrics })
    new PerformanceObserver(list => { for (const entry of list.getEntries()) metrics.lcp = entry.startTime }).observe({ type: 'largest-contentful-paint', buffered: true })
    new PerformanceObserver(list => { for (const entry of list.getEntries()) { const shift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number }; if (!shift.hadRecentInput) metrics.cls += shift.value } }).observe({ type: 'layout-shift', buffered: true })
    new PerformanceObserver(list => { for (const entry of list.getEntries()) metrics.interaction = Math.max(metrics.interaction, entry.duration) }).observe({ type: 'event', buffered: true, durationThreshold: 16 } as PerformanceObserverInit)
  })
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  await page.locator('.home-hero img').evaluate((image: HTMLImageElement) => image.decode())
  await page.evaluate(() => document.fonts.ready)
  await page.getByRole('button', { name: 'Call and communication options' }).click()
  await page.keyboard.press('Escape')
  await page.waitForTimeout(300)
  const metrics = await page.evaluate(() => ({
    ...(window as unknown as { homeMetrics: { lcp: number; cls: number; interaction: number } }).homeMetrics,
    javascriptBytes: performance.getEntriesByType('resource').filter(entry => entry.name.includes('.js')).reduce((sum, entry) => sum + (entry as PerformanceResourceTiming).transferSize, 0),
    heroSource: (document.querySelector('.home-hero img') as HTMLImageElement).currentSrc,
  }))
  console.log('HOMEPAGE_LOCAL_METRICS', JSON.stringify(metrics))
  expect(metrics.cls).toBeLessThanOrEqual(0.1)
  expect(metrics.heroSource).toContain('/_next/image?')
  await expect(page.locator('canvas')).toHaveCount(0)
})


test('service index responds to desktop hover and keyboard with a single media-free plane', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  await page.getByRole('button', { name: '07 Window Cleaning' }).hover()
  await expect(page.locator('#active-service-title')).toHaveText('Window Cleaning')
  await page.getByRole('button', { name: '10 Regular Home Clean' }).focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('#active-service-title')).toHaveText('Regular Home Clean')
  await expect(page.locator('#active-service')).toHaveCount(1)
  await expect(page.locator('#packages img, #services img, #ninja-cut img')).toHaveCount(0)
  await page.getByRole('button', { name: 'Quote this service' }).click()
  await expect(page.getByLabel('Service', { exact: true })).toHaveValue('regular-home')
})
