import { test, expect } from '@playwright/test'

// Opt in via the dedicated dev-server config; ordinary production suites skip these.
test.skip(process.env.HERO_DESIGN_DEVELOPMENT !== '1', 'Development-only hero laboratory')

const sizes = [[1440, 900], [390, 844], [1366, 768], [1728, 1000], [1920, 1080], [320, 568], [375, 812], [430, 932]]
for (const direction of ['a', 'b', 'c', 'd']) {
  for (const [width, height] of sizes) {
    test(`${direction}: ${width}×${height}`, async ({ page }) => {
      const errors: string[] = []
      const motionRequests: string[] = []
      page.on('pageerror', error => errors.push(error.message))
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
      page.on('request', request => { if (/api\/dev\/h03|\.mp4/.test(request.url())) motionRequests.push(request.url()) })
      await page.setViewportSize({ width, height })
      // Conflicting experiment parameters must still yield an entirely static lab.
      await page.goto(`/?hero-design=${direction}&hero-motion=masked&ninja-cut=1`)
      await expect(page.locator('.hero-lab')).toBeVisible()
      await page.evaluate(() => document.fonts.ready)
      await page.locator('.hero-lab img').evaluate((image: HTMLImageElement) => image.decode())
      await page.mouse.click(width - 10, height - 10)
      await page.waitForTimeout(300) // Let the inherited header's colour transition settle.
      await expect(page.locator('.home-sticky-quote')).toBeHidden()
      await expect(page.locator('.hero-lab video, .hero-lab .h01-cut-preview, .hero-lab .h02-cut-preview')).toHaveCount(0)
      expect(motionRequests).toEqual([])
      await expect(page.locator('h1')).toHaveText('Bring your space back to calm.')
      await expect(page.locator('.lab-eyebrow')).toHaveText('CLEANING NINJA')
      await expect(page.locator('.lab-description')).toHaveText('Cleaning services across major Australian cities, with a simple quote-first process.')
      for (const selector of ['.home-header', '.lab-eyebrow', '.lab-title', '.lab-description', '.lab-quote']) {
        await expect(page.locator(selector)).toBeInViewport({ ratio: 1 })
      }
      const title = (await page.locator('.lab-title').boundingBox())!
      const body = (await page.locator('.lab-description').boundingBox())!
      const cta = (await page.locator('.lab-quote').boundingBox())!
      expect(title.y + title.height).toBeLessThan(body.y)
      expect(body.y + body.height).toBeLessThan(cta.y)
      expect(cta.height).toBeGreaterThanOrEqual(48)
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width)
      const src = await page.locator('.hero-lab img').evaluate((image: HTMLImageElement) => image.currentSrc)
      expect(src).toContain(width < 768 ? 'hf_20260927_092222_11c8acc0' : 'hf_20260927_084053_c4d57005')
      expect(errors).toEqual([])
      if (direction === 'd') {
        const lines = await page.locator('.lab-line').allTextContents()
        expect(lines.map(line => line.trim())).toEqual(['Bring your space', 'back to calm.'])
        const controls = page.locator('.home-header a:visible, .home-header button:visible')
        if (width >= 1200) {
          const nav = page.locator('.home-desktop-nav a')
          await expect(nav).toHaveCount(5)
          const row = await nav.evaluateAll(elements => elements.map(element => {
            const rect = element.getBoundingClientRect()
            const text = document.createRange()
            text.selectNodeContents(element)
            return { x: rect.x, y: rect.y, height: rect.height, textLines: text.getClientRects().length }
          }))
          expect(Math.max(...row.map(rect => rect.y)) - Math.min(...row.map(rect => rect.y))).toBeLessThan(1)
          for (const rect of row) {
            expect(rect.x).toBeGreaterThan(width * .447)
            expect(rect.height).toBe(44)
            expect(rect.textLines).toBe(1)
          }
          await expect(page.locator('.home-header-quote')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
        }
        // IntersectionObserver rounds the scaled logo's ratio just below 1.
        // Check exact viewport bounds below as well as near-complete intersection.
        for (const control of await controls.all()) await expect(control).toBeInViewport({ ratio: .9999 })
        const boxes = (await controls.all()).map(control => control.boundingBox())
        const bounds = await Promise.all(boxes)
        for (let i = 0; i < bounds.length; i++) {
          const a = bounds[i]!
          expect(a.x).toBeGreaterThanOrEqual(0)
          expect(a.y).toBeGreaterThanOrEqual(0)
          expect(a.x + a.width).toBeLessThanOrEqual(width)
          expect(a.y + a.height).toBeLessThanOrEqual(height)
          expect(a.height).toBeGreaterThanOrEqual(44)
          for (const b of bounds.slice(i + 1)) {
            expect(a.x < b!.x + b!.width && a.x + a.width > b!.x && a.y < b!.y + b!.height && a.y + a.height > b!.y).toBe(false)
          }
        }
      }
      await page.addStyleTag({ content: 'nextjs-portal { display: none !important; }' })
      await page.screenshot({ path: `.local-evidence/hero-art-direction/${direction}-${width}x${height}.png` })
    })
  }

  test(`${direction}: focus, quote, scroll state and mobile dialogs`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(`/?hero-design=${direction}`)
    await expect(page.locator('.hero-lab')).toBeVisible()
    await page.locator('.lab-quote').focus()
    await expect(page.locator('.lab-quote')).toHaveCSS('outline-style', 'solid')
    await page.getByRole('button', { name: 'Open menu', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Close menu', exact: true })).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('button', { name: 'Open menu', exact: true })).toBeFocused()
    await page.getByRole('button', { name: 'Call and communication options' }).click()
    await expect(page.locator('.home-call-sheet')).toBeVisible()
    await page.keyboard.press('Escape')
    await page.evaluate(() => scrollTo({ top: 96, behavior: 'instant' }))
    await expect(page.locator('.home-header')).toHaveCSS('background-color', 'rgb(247, 245, 239)')
    await expect(page.locator('.home-sticky-quote')).toBeHidden()
    await page.evaluate(() => scrollTo({ top: 760, behavior: 'instant' }))
    await expect(page.locator('.home-sticky-quote')).toBeVisible()
    await page.locator('.home-sticky-quote').click()
    await expect(page.locator('#quote')).toBeInViewport()
    await expect(page.locator('.home-sticky-quote')).toBeHidden()
    // Navigate only; never submit a lead as a visual check.
  })
}

test('default and invalid parameters retain the existing hero and lower sections', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.home-hero-copy')).toBeVisible()
  const sections = await page.locator('main > section:not(.home-hero)').evaluateAll(elements => elements.map(element => element.innerHTML))
  for (const query of ['?hero-design=invalid', '?hero-design=a', '?hero-design=b', '?hero-design=c', '?hero-design=d']) {
    await page.goto(`/${query}`)
    if (query.includes('invalid')) await expect(page.locator('.hero-lab')).toHaveCount(0)
    else await expect(page.locator('.hero-lab')).toBeVisible()
    expect(await page.locator('main > section:not(.home-hero)').evaluateAll(elements => elements.map(element => element.innerHTML))).toEqual(sections)
  }
})
