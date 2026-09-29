import { test, expect } from '@playwright/test'

// WebKit does not focus buttons on pointer activation. Native dialog focus
// restoration still needs the actual opener to be active before showModal().
for (const [opener, closer] of [
  ['Call and communication options', 'Close communication options'],
  ['Open menu', 'Close menu'],
]) {
  for (const dismissal of ['Escape', 'close button']) {
    test(`${opener} restores pointer opener after ${dismissal}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 })
      await page.goto('/')
      await page.locator('.lab-quote').focus()
      const trigger = page.getByRole('button', { name: opener, exact: true })
      await trigger.click()
      await expect(page.getByRole('button', { name: closer })).toBeFocused()
      if (dismissal === 'Escape') await page.keyboard.press('Escape')
      else await page.getByRole('button', { name: closer }).click()
      await expect(page.getByRole('dialog')).toHaveCount(0)
      await expect(trigger).toBeFocused()
      await page.keyboard.press('Tab')
      await expect(trigger).not.toBeFocused()
      expect(await page.locator(':focus').evaluate(element => getComputedStyle(element).outlineStyle)).not.toBe('none')
    })
  }
}
