import { expect, test, type Page } from "@playwright/test";

// Run with: npx playwright test -c playwright.restore.config.ts (after `npm run build`).
const instant = async (page: Page) => page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
const blockMutations = async (page: Page) => {
  const writes: string[] = [];
  await page.route("**/*", (route) => {
    const r = route.request();
    if (r.method() !== "GET" && r.method() !== "HEAD") {
      writes.push(`${r.method()} ${r.url()}`);
      return route.abort();
    }
    return route.continue();
  });
  return writes;
};

test.describe("desktop 1440", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("opens with brand, business and quote action; room resolves on scroll", async ({ page }) => {
    const writes = await blockMutations(page);
    await page.goto("/");
    await instant(page);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Order, restored.");
    await expect(page.getByText("Professional cleaning")).toBeVisible();
    await expect(page.getByRole("button", { name: /get a free quote/i }).first()).toBeVisible();
    await expect(page.locator("#home")).toHaveAttribute("data-beat", "hero");
    await expect(page.locator(".rs-canvas")).toHaveClass(/is-ready/, { timeout: 15000 });
    await expect(page.locator(".rs-canvas")).toHaveAttribute("data-film", "on", { timeout: 20000 });
    await page.evaluate(() => window.scrollTo(0, 1500));
    await expect(page.locator("#home")).toHaveAttribute("data-beat", "mid");
    await page.evaluate(() => window.scrollTo(0, 2800));
    await expect(page.locator("#home")).toHaveAttribute("data-beat", "calm");
    await expect(page.getByRole("heading", { name: /Quiet. Clean. Finished./ })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(writes).toEqual([]);
  });

  test("all eleven services are listed and carry into the quote form", async ({ page }) => {
    await page.goto("/");
    await instant(page);
    const buttons = page.locator(".rs-svc-list li > button");
    await expect(buttons).toHaveCount(11);
    await page.locator("#services").scrollIntoViewIfNeeded();
    await page.locator(".rs-svc-list li > button", { hasText: "Tile & grout cleaning" }).click();
    await page.getByRole("button", { name: /Get a free quote for Tile & grout cleaning/ }).click();
    await expect(page.locator("#rn-service")).toHaveAttribute("data-value", "tile-cleaning");
  });

  test("five packages, with honest conditions, carry into the quote form", async ({ page }) => {
    await page.goto("/");
    await instant(page);
    await expect(page.locator(".rs-deal-rail li")).toHaveCount(6);
    await page.getByRole("button", { name: "5-seat leather lounge" }).click();
    await expect(page.locator(".rs-deal-terms")).toContainText("cannot be combined");
    await page.getByRole("button", { name: /Get a free quote for 5-seat leather lounge/ }).click();
    await expect(page.locator("#rn-service")).toHaveAttribute("data-value", "leather-cleaning");
  });
});

test.describe("custom quote, simplified process, footer", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("covers requirements beyond the listed packages", async ({ page }) => {
    await page.goto("/");
    await instant(page);
    await page.getByRole("button", { name: "Something else" }).click();
    await expect(page.locator(".rs-deal-copy")).toContainText("Any service");
    await page.getByRole("button", { name: /Get a free quote for something else/ }).click();
    await expect(page.locator("#rn-service")).toBeFocused({ timeout: 5000 });
  });

  test("how it works shows only the three steps; footer email has an icon", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".rs-steps li")).toHaveCount(3);
    await expect(page.locator("#process")).not.toContainText("Assessed first");
    await expect(page.locator(".rs-footer-mail .rs-mail-icon svg")).toBeVisible();
    const brand = await page.locator(".rs-mail-icon").evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(brand).toBe("rgb(6, 118, 141)");
  });
});

test.describe("quote form", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("service listbox opens, selects with mouse and keyboard, and the CTA is a pill", async ({ page }) => {
    const writes = await blockMutations(page);
    await page.goto("/");
    await instant(page);
    await page.evaluate(() => document.getElementById("quote")!.scrollIntoView());
    const btn = page.locator("#rn-service");
    await btn.click();
    const list = page.getByRole("listbox", { name: "Services" });
    await expect(list).toBeVisible();
    await expect(btn).toHaveAttribute("aria-expanded", "true");
    await page.getByRole("option", { name: "Leather cleaning" }).click();
    await expect(list).toBeHidden();
    await expect(btn).toHaveAttribute("data-value", "leather-cleaning");
    await btn.focus();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await expect(btn).not.toHaveAttribute("data-value", "leather-cleaning");
    await page.keyboard.press("Escape");
    const radius = await page.locator(".rq-submit").evaluate((el) => parseFloat(getComputedStyle(el).borderTopLeftRadius));
    expect(radius).toBeGreaterThan(40);
    await page.locator(".rq-submit").click();
    await expect(page.locator("#rn-name-error")).toBeVisible();
    expect(writes).toEqual([]);
  });
});

test.describe("mobile 390", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test("independent composition, menu and persistent quote action", async ({ page }) => {
    await page.goto("/");
    await instant(page);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.evaluate(() => document.getElementById("services")!.scrollIntoView());
    const list = await page.locator(".rs-svc-list").boundingBox();
    expect(list!.width).toBeGreaterThan(390 * 0.85);
    const first = await page.locator(".rs-group li > button").first().innerText();
    expect(first).toContain("01");
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.locator("#rs-menu")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("#rs-menu")).toBeHidden();
    await page.evaluate(() => document.getElementById("services")!.scrollIntoView());
    await expect(page.locator(".rs-sticky")).toHaveClass(/is-on/);
    await page.evaluate(() => document.getElementById("quote")!.scrollIntoView());
    await expect(page.locator(".rs-sticky")).not.toHaveClass(/is-on/);
  });
});

test.describe("reduced motion", () => {
  test.use({ viewport: { width: 1440, height: 900 }, contextOptions: { reducedMotion: "reduce" } });

  test("is a composed still, not a pinned sequence", async ({ page }) => {
    await page.goto("/");
    expect(await page.locator(".rs-stage").evaluate((el) => getComputedStyle(el).position)).toBe("relative");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("button", { name: /get a free quote/i }).first()).toBeVisible();
  });
});
