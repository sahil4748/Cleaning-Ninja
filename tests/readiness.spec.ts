import { test, expect } from '@playwright/test'

for (const route of ['/contact', '/careers']) {
  test(`${route} field validation and not-sent state preserve input`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto(route)
    await page.locator('form button[type=submit]').click()
    await expect(page.locator('form [aria-invalid=true]')).toHaveCount(route === '/contact' ? 5 : 6)
    const name = page.getByLabel(route === '/contact' ? 'Name' : 'Full name', { exact: true })
    await name.fill('Test Customer')
    await page.getByLabel('Email', { exact: true }).fill('test@example.com')
    await page.getByLabel(/Phone/).fill('0400000000')
    await page.getByLabel('City', { exact: true }).selectOption('Brisbane')
    if (route === '/contact') {
      await page.getByLabel('Topic').selectOption('quote')
      await page.getByLabel('Message').fill('Synthetic test request only.')
    } else {
      await page.getByLabel('Experience', { exact: true }).selectOption('1-2')
      await page.getByLabel('A few lines about you').fill('Synthetic application for local testing only.')
    }
    await page.locator('form button[type=submit]').click()
    await expect(page.getByRole('alert').filter({ hasText: 'Your request has not been sent.' })).toContainText('Your request has not been sent.')
    await expect(name).toHaveValue('Test Customer')
    expect(errors).toEqual([])
  })
}

test('Sydney selected calendar date stays unchanged in the summary', async ({ browser }) => {
  const context = await browser.newContext({ timezoneId: 'Australia/Sydney' })
  const page = await context.newPage()
  await page.clock.install({ time: new Date('2026-09-22T02:00:00Z') })
  await page.goto('/book?service=carpet-cleaning&city=brisbane&suburb=New+Farm')
  await page.getByRole('button', { name: 'Studio / 1 bed' }).click()
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.locator('div.grid-cols-7').getByRole('button', { name: '23', exact: true }).click()
  await page.getByRole('button', { name: '9:00am' }).click()
  await expect(page.locator('aside')).toContainText('23 Sept')
  await context.close()
})

for (const reducedMotion of ['reduce', 'no-preference'] as const) {
  test(`768px pointer and hydration: ${reducedMotion}`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 768, height: 1000 }, reducedMotion })
    const page = await context.newPage()
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect.poll(() => page.evaluate(() => getComputedStyle(document.body).cursor)).not.toBe('none')
    await page.waitForTimeout(1500)
    expect(errors).toEqual([])
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.setViewportSize({ width: 768, height: 1000 })
    expect(await page.evaluate(() => getComputedStyle(document.body).cursor)).not.toBe('none')
    await context.close()
  })
}

test('rendered routes, schema, noindex, canonicals and sitemap agree', async ({ page, request }) => {
  const xml = await (await request.get('/sitemap.xml')).text()
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1])
  expect(urls).toHaveLength(93)
  expect(xml).not.toContain('<lastmod>')
  for (const url of urls) {
    const route = new URL(url).pathname
    const response = await request.get(route)
    expect(response.status(), route).toBe(200)
    expect(response.headers()['x-robots-tag'], route).toContain('noindex')
    const html = await response.text()
    expect(html, route).not.toMatch(/href="tel:/)
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(match => JSON.parse(match[1]))
    expect(JSON.stringify(schemas), route).not.toMatch(/aggregateRating|reviewRating|"Person"|"telephone"|"offers"|"ABN"|"LocalBusiness"/)
  }
  for (const route of ['/special-offers', '/become-a-cleaner']) expect((await request.get(route)).status()).toBe(404)
  await page.goto('/')
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://cleaningninja.co')
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', /noindex/)
  expect(await (await request.get('/robots.txt')).text()).toContain('Disallow: /')
})
