import { test, expect } from '@playwright/test'

for (const [width, height] of [[1366, 768], [1440, 900], [1728, 1000], [1920, 1080]]) {
  test(`H-01 composition ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    const image = page.locator('.home-hero img')
    await image.evaluate((element: HTMLImageElement) => element.decode())
    expect(await image.evaluate((element: HTMLImageElement) => element.currentSrc)).toContain('hf_20260927_084053_c4d57005')
    for (const selector of ['.home-header', '.home-hero h1', '.home-hero-description', '.home-hero .home-button', '.home-hero .home-eyebrow']) {
      await expect(page.locator(selector)).toBeInViewport({ ratio: 1 })
    }
    expect(await page.locator('a[href^="tel:"]').count()).toBe(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width)
    const title = await page.locator('.home-hero h1').boundingBox()
    expect(title!.x + title!.width).toBeLessThan(width * .363)
    expect(await page.locator('.home-hero .ninja-resolved').evaluate(element => getComputedStyle(element).animationName)).toBe('none')
    await page.screenshot({ path: `test-results/h01-regression-hero-${width}.png` })
  })
}

for (const reducedMotion of ['no-preference', 'reduce'] as const) {
  test(`desktop overlay becomes solid at 80px and restores at top (${reducedMotion})`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.emulateMedia({ reducedMotion })
    await page.goto('/')
    const header = page.locator('.home-header')
    await expect(header).toHaveAttribute('data-scrolled', 'false')
    expect(await header.evaluate(e => getComputedStyle(e).backgroundColor)).toBe('rgba(0, 0, 0, 0)')
    expect((await page.locator('.home-hero').boundingBox())!.y).toBe(0)
    await page.evaluate(() => scrollTo({ top: 96, behavior: 'instant' }))
    await expect(header).toHaveAttribute('data-scrolled', 'true')
    await expect(header).toHaveCSS('background-color', 'rgb(247, 245, 239)')
    expect((await header.boundingBox())!.y).toBe(0)
    if (reducedMotion === 'reduce') await expect(header).toHaveCSS('transition-duration', '0s')
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }))
    await expect(header).toHaveAttribute('data-scrolled', 'false')
    await expect(header).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
    const quote = page.locator('.h01-quote')
    await quote.focus()
    await expect(quote).toBeFocused()
    await expect(quote).toHaveCSS('outline-style', 'solid')
    await quote.press('Enter')
    await expect(page.locator('#quote')).toBeInViewport()
    await expect(page.locator('.h01-cut-preview')).toHaveCount(0)
  })
}

for (const mode of ['raw', 'retimed']) {
  test(`archived H-03 ${mode} query cannot activate or serve video`, async ({ page, request }) => {
    const videos: string[] = []
    page.on('request', event => { if (event.url().includes('.mp4')) videos.push(event.url()) })
    await page.goto(`/?hero-motion=${mode}&ninja-cut=1`)
    const image = page.locator('.home-hero img')
    await image.evaluate((element: HTMLImageElement) => element.decode())
    await expect(page.locator('.home-hero video')).toHaveCount(0)
    expect(videos).toEqual([])
    expect((await request.get(`/homepage/h03-desktop-${mode}.mp4`)).status()).toBe(404)
  })
}
