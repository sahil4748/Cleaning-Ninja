import { test, expect } from '@playwright/test'

test.describe('Cleaning Ninja — Booking Flow E2E Suite', () => {

  test('successfully progress through all 7 steps of booking flow and submit', async ({ page }) => {
    // Navigate to the booking page
    await page.goto('/book')

    // --- STEP 1: Service Selection ---
    await expect(page.locator('text=What needs cleaning?')).toBeVisible()
    
    // Choose "Carpet Steam Clean"
    const carpetBtn = page.getByRole('button', { name: 'Carpet Steam Clean', exact: false }).first()
    await carpetBtn.click()
    
    // Continue to next step
    const continueBtn = page.getByRole('button', { name: 'Continue' })
    await expect(continueBtn).toBeEnabled()
    await continueBtn.click()

    // --- STEP 2: Size Selection ---
    await expect(page.locator('text=How big is the property?')).toBeVisible()
    
    // Select "Studio / 1 bed"
    const sizeBtn = page.getByRole('button', { name: 'Studio / 1 bed', exact: false })
    await sizeBtn.click()
    await continueBtn.click()

    // --- STEP 3: Location Selection ---
    await expect(page.locator('text=Which city and suburb?')).toBeVisible()
    
    // Click "Sydney"
    const sydneyBtn = page.getByRole('button', { name: 'Sydney' }).first()
    await sydneyBtn.click()
    
    // Select popular suburb "Surry Hills"
    const surryHillsBtn = page.getByRole('button', { name: 'Surry Hills' })
    await surryHillsBtn.click()
    await continueBtn.click()

    // --- STEP 4: Date & Time Selection ---
    await expect(page.locator('text=Pick a date and time.')).toBeVisible()
    
    // Select an available future date in the calendar (using the 3rd enabled one to avoid timezone/today boundary issues)
    const activeDateBtn = page.locator('div.grid-cols-7 button:not([disabled])').nth(2)
    await activeDateBtn.click()
    await page.waitForTimeout(500) // allow state to settle
    
    // Select a time slot
    const timeSlotBtn = page.getByRole('button', { name: '9:00am' })
    await timeSlotBtn.click()
    await continueBtn.click()

    // --- STEP 5: Cleaner Selection ---
    await expect(page.locator('text=Pick a Ninja.')).toBeVisible()
    
    // Auto-assign is selected by default, click continue
    await continueBtn.click()

    // --- STEP 6: Details Entry & Validations ---
    await expect(page.locator('text=Who do we contact?')).toBeVisible()
    await expect(continueBtn).toBeDisabled() // disabled since fields are empty

    // Input validations - fill in too short values
    await page.getByLabel('Full name').fill('J')
    await page.getByLabel('Email').fill('invalid-email')
    await page.getByLabel('Phone').fill('123')
    await page.getByLabel('Property address').fill('St')
    await expect(continueBtn).toBeDisabled()

    // Correct input to make it valid
    await page.getByLabel('Full name').fill('Jane Doe')
    await page.getByLabel('Email').fill('jane@example.com')
    await page.getByLabel('Phone').fill('0412345678')
    await page.getByLabel('Property address').fill('123 George St, Sydney')
    await page.locator('textarea').fill('Access code is 1234.')
    
    await expect(continueBtn).toBeEnabled()
    await continueBtn.click()

    // --- STEP 7: Summary & Confirmation ---
    await expect(page.locator('text=Looks right?')).toBeVisible()
    
    // Assert summary matches what we entered
    const summaryDl = page.locator('dl')
    await expect(summaryDl).toContainText('Jane Doe')
    await expect(summaryDl).toContainText('jane@example.com')
    await expect(summaryDl).toContainText('0412345678')
    await expect(summaryDl).toContainText('123 George St, Sydney')
    
    // Click "Confirm booking"
    const confirmBtn = page.getByRole('button', { name: 'Confirm booking' })
    await expect(confirmBtn).toBeEnabled()
    await confirmBtn.click()

    // --- SUCCESS SCREEN ---
    await expect(page.locator('text=You\'re booked in.')).toBeVisible({ timeout: 10000 })
    
    // Check reference code format CN-XXXXXX
    const refCode = page.locator('p.font-display.font-bold.text-\\[28px\\]')
    await expect(refCode).toBeVisible()
    const refValue = await refCode.innerText()
    expect(refValue).toMatch(/^CN-[A-Z0-9]+$/)
  })

  test('correctly prefills fields using query parameters', async ({ page }) => {
    // Navigate with prefilled service, city, and suburb params
    await page.goto('/book?service=end-of-lease-cleaning&city=sydney&suburb=Surry+Hills')

    // It should prefill Step 1 and go straight to Step 2
    await expect(page.locator('text=How big is the property?')).toBeVisible()
    
    // The sidebar should reflect End-of-Lease Clean, Sydney and Surry Hills
    const sidebar = page.locator('aside')
    await expect(sidebar).toContainText('End-of-Lease Clean')
    await expect(sidebar).toContainText('Sydney')
    await expect(sidebar).toContainText('Surry Hills')
  })
})
