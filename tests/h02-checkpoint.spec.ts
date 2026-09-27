import { test, expect } from '@playwright/test'

for (const [width, height] of [[320, 568], [375, 812], [390, 844], [430, 932], [768, 1024]]) {
  test(`H-02 composition ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height })
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    const image = page.locator('.home-hero img')
    await image.evaluate((element: HTMLImageElement) => element.decode())
    expect(await image.evaluate((element: HTMLImageElement) => element.currentSrc)).toContain(width < 768 ? 'hf_20260927_092222_11c8acc0' : 'hf_20260927_084053_c4d57005')
    await expect(page.locator('.home-hero .home-eyebrow')).toHaveText('CLEANING NINJA')
    await expect(page.locator('.home-hero-description')).toHaveText('Cleaning services across major Australian cities, with a simple quote-first process.')
    for (const selector of ['.home-header', '.home-hero h1', '.home-hero-description', '.home-hero .home-button']) {
      await expect(page.locator(selector)).toBeInViewport({ ratio: 1 })
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width)
    const lines = await page.locator('.home-hero h1').evaluate(e => e.getBoundingClientRect().height / parseFloat(getComputedStyle(e).lineHeight))
    expect(lines).toBeLessThanOrEqual(3.1)
    expect((await page.locator('.h01-quote').boundingBox())!.height).toBeGreaterThanOrEqual(48)
    await expect(page.locator('.home-sticky-quote')).toBeHidden()
    await expect(page.locator('.h02-cut-preview')).toHaveCount(0)
    await expect(page.locator('a[href^="tel:"]')).toHaveCount(0)
    await expect(page.locator('.home-hero .ninja-resolved')).toHaveCSS('transform', 'none')
    // H-02 must never leak into the lower signature section.
    expect(await page.locator('.home-signature img').first().getAttribute('src')).toContain('hero-mobile')
    console.log('H02_COMPOSITION', JSON.stringify({ width, height, lines, title: await page.locator('.home-hero h1').boundingBox(), cta: await page.locator('.h01-quote').boundingBox() }))
    await page.screenshot({ path: `test-results/h02-regression-hero-${width}.png` })
    expect(errors).toEqual([])
  })
}

for (const reducedMotion of ['no-preference', 'reduce'] as const) {
  test(`H-02 header, keyboard, sticky lifecycle (${reducedMotion})`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.emulateMedia({ reducedMotion })
    await page.goto('/')
    const header = page.locator('.home-header')
    const sticky = page.locator('.home-sticky-quote')
    const hero = page.locator('.h01-quote')
    await expect(header).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
    await expect(sticky).toBeHidden()
    await hero.focus()
    await expect(hero).toHaveCSS('outline-style', 'solid')
    if (reducedMotion === 'reduce') {
      await expect(header).toHaveCSS('transition-duration', '0s')
      await expect(page.locator('.home-hero .ninja-resolved')).toHaveCSS('animation-name', 'none')
    }
    await page.screenshot({ path: `test-results/h02-focus-${reducedMotion}.png` })
    await page.evaluate(() => scrollTo({ top: 96, behavior: 'instant' }))
    await expect(header).toHaveCSS('background-color', 'rgb(247, 245, 239)')
    await expect(hero).toBeInViewport()
    await expect(sticky).toBeHidden()
    await page.evaluate(() => {
      const button = document.querySelector('.h01-quote')!
      scrollTo({ top: button.getBoundingClientRect().bottom + scrollY - 80, behavior: 'instant' })
    })
    await expect(sticky).toBeHidden() // Original still visible below the 72px header.
    await page.evaluate(() => scrollBy({ top: 20, behavior: 'instant' }))
    await expect(sticky).toBeVisible()
    await page.getByRole('button', { name: 'Open menu', exact: true }).click()
    await expect(sticky).toBeHidden()
    await expect(page.getByRole('button', { name: 'Close menu', exact: true })).toBeFocused()
    await page.keyboard.press('Shift+Tab')
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'FAQ' })).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('button', { name: 'Open menu', exact: true })).toBeFocused()
    await expect(sticky).toBeVisible()
    await page.getByRole('button', { name: 'Call and communication options' }).click()
    await expect(sticky).toBeHidden()
    await expect(page.getByRole('button', { name: 'Close communication options' })).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(sticky).toBeVisible()
    await page.locator('#area-suburb').focus()
    await expect(sticky).toBeHidden()
    await page.locator('#area-suburb').evaluate(e => (e as HTMLInputElement).blur())
    await expect(sticky).toBeVisible()
    await sticky.click()
    await expect(page.locator('#quote')).toBeInViewport()
    await expect(sticky).toBeHidden()
    await page.getByLabel('Name (required)').focus()
    await expect(sticky).toBeHidden()
    await page.evaluate(() => { (document.activeElement as HTMLElement)?.blur(); scrollTo({ top: 0, behavior: 'instant' }) })
    await expect(sticky).toBeHidden()
    await expect(header).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  })
}
