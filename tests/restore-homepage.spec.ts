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

test.describe("enquiry submission", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  // The endpoint is mocked: no real lead or email is ever created by this test.
  test("submits through /api/quote once, retries with the same key, never opens mail", async ({ page }) => {
    const posts: { key: string | undefined; body: Record<string, unknown> }[] = [];
    let attempts = 0;
    await page.route("**/api/quote", async (route) => {
      const request = route.request();
      posts.push({ key: request.headers()["idempotency-key"], body: request.postDataJSON() });
      attempts += 1;
      await new Promise((resolve) => setTimeout(resolve, 300));
      if (attempts === 1) return route.fulfill({ status: 503, json: { status: "unavailable" } });
      return route.fulfill({ status: 201, json: { status: "accepted", durableId: "00000000-0000-4000-8000-000000000001" } });
    });
    await page.goto("/");
    await instant(page);
    await page.evaluate(() => document.getElementById("quote")!.scrollIntoView());
    await page.locator("#rn-service").click();
    await page.getByRole("option", { name: "Carpet cleaning" }).click();
    await page.locator("#rn-name").fill("Synthetic Tester");
    await page.locator("#rn-phone").fill("0400 000 000");
    await page.locator("#rn-suburb").fill("Testville 4000");
    await page.locator("#rn-email").fill("synthetic@example.invalid");
    const submit = page.locator(".rq-submit");
    await submit.click();
    await expect(submit).toBeDisabled();
    await submit.click({ force: true }).catch(() => undefined);
    await expect(page.locator(".rq-submit-error")).toContainText(/not been sent|couldn/i);
    await expect(submit).toBeEnabled();
    await submit.click();
    await expect(page.getByRole("heading", { name: /Thank you, Synthetic Tester/ })).toBeVisible();
    expect(posts).toHaveLength(2);
    expect(posts[0].key).toMatch(/^[0-9a-f-]{36}$/);
    expect(posts[1].key).toBe(posts[0].key);
    expect(posts[1].body).toMatchObject({ name: "Synthetic Tester", email: "synthetic@example.invalid", service: "carpet-cleaning", leadSource: "quote-form" });
    await expect(page.locator('a[href^="mailto:"][href*="subject="]')).toHaveCount(0);
  });

  test("thank-you resets to a fresh form after ~4s, or at once on a CTA, with no extra request", async ({ page }) => {
    let posts = 0;
    await page.route("**/api/quote", (route) => {
      posts += 1;
      return route.fulfill({ status: 201, json: { status: "accepted", durableId: "00000000-0000-4000-8000-000000000002" } });
    });
    await page.goto("/");
    await instant(page);
    const fill = async () => {
      await page.evaluate(() => document.getElementById("quote")!.scrollIntoView());
      await page.locator("#rn-service").click();
      await page.getByRole("option", { name: "Carpet cleaning" }).click();
      await page.locator("#rn-name").fill("Synthetic Tester");
      await page.locator("#rn-phone").fill("0400 000 000");
      await page.locator("#rn-suburb").fill("Testville 4000");
      await page.locator(".rq-submit").click();
      await expect(page.getByRole("heading", { name: /Thank you/ })).toBeVisible();
    };
    await fill();
    await page.waitForTimeout(2500);
    await expect(page.getByRole("heading", { name: /Thank you/ })).toBeVisible();
    const y = await page.evaluate(() => window.scrollY);
    await expect(page.getByRole("heading", { name: /Thank you/ })).toBeHidden({ timeout: 4000 });
    await expect(page.locator("#rn-name")).toHaveValue("");
    await expect(page.locator("#rn-service")).toHaveAttribute("data-value", "");
    expect(Math.abs((await page.evaluate(() => window.scrollY)) - y)).toBeLessThan(2);
    expect(posts).toBe(1);

    await fill();
    expect(posts).toBe(2);
    await page.locator(".rs-nav-cta").click();
    await expect(page.getByRole("heading", { name: /Thank you/ })).toBeHidden({ timeout: 1000 });
    await expect(page.locator("#rn-name")).toHaveValue("");
    await expect(page.locator(".rq-submit")).toBeEnabled();
    await page.waitForTimeout(4800);
    expect(posts).toBe(2);
  });
});
