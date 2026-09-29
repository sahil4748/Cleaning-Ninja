import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
const widths = [
  [320, 740],
  [375, 812],
  [390, 844],
  [430, 932],
  [768, 1024],
  [1024, 768],
  [1366, 768],
  [1440, 900],
  [1728, 1000],
];
const evidence = "docs/execution/complete-prototype/screenshots";
for (const [width, height] of widths)
  test(`prototype responsive ${width}`, async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await page
      .locator(".cn-hero img")
      .evaluate((img: HTMLImageElement) => img.decode());
    await expect(page.locator("h1")).toHaveText(
      "Cleaner carpets.A fresher home.",
    );
    await expect(page.locator(".cn-hero .cn-button")).toBeInViewport({
      ratio: 1,
    });
    await expect(page.locator(".cn-header-phone")).toHaveText("123456789");
    const heroOffer = page.locator(".cn-hero-offer");
    if (await heroOffer.isVisible()) {
      const offerBounds = await heroOffer.boundingBox();
      const arrowBounds = await heroOffer.locator(":scope > svg").boundingBox();
      expect(arrowBounds!.x + arrowBounds!.width).toBeLessThanOrEqual(
        offerBounds!.x + offerBounds!.width,
      );
    }
    await expect(
      page.locator(".cn-service-list button[aria-expanded=true]"),
    ).toHaveText("Carpet cleaning");
    expect(
      await page.locator('meta[name="robots"]').getAttribute("content"),
    ).toContain("noindex");
    const controls = await page
      .locator(".cn-header a,.cn-header button")
      .evaluateAll((els) =>
        els
          .map((e) => e.getBoundingClientRect().toJSON())
          .filter((r) => r.width),
      );
    for (const rect of controls) {
      expect(rect.x).toBeGreaterThanOrEqual(0);
      expect(rect.right).toBeLessThanOrEqual(width);
    }
    for (const section of [
      "#packages",
      ".cn-film",
      "#services",
      "#commercial",
      "#how-it-works",
      "#coverage",
      "#faq",
      "#quote",
      ".cn-footer",
    ]) {
      await page.locator(section).scrollIntoViewIfNeeded();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
    await page
      .locator("main img")
      .evaluateAll((images) =>
        Promise.all(images.map((img) => (img as HTMLImageElement).decode())),
      );
    if (
      testInfo.project.name === "chromium" &&
      [375, 390, 430, 768, 1024, 1440].includes(width)
    ) {
      await mkdir(evidence, { recursive: true });
      await page.evaluate(() => scrollTo(0, 0));
      await page
        .locator(".cn-hero-media picture")
        .evaluate((el) =>
          Promise.all(el.getAnimations().map((a) => a.finished)),
        );
      await page.screenshot({
        path: `${evidence}/hero-${width}.jpg`,
        quality: 85,
      });
      await page.screenshot({
        path: `${evidence}/full-${width}.jpg`,
        quality: 80,
        fullPage: true,
      });
      if ([390, 1440].includes(width))
        for (const id of ["packages", "services", "commercial", "quote"]) {
          await page.locator(`#${id}`).scrollIntoViewIfNeeded();
          await page.screenshot({
            path: `${evidence}/${id}-${width}.jpg`,
            quality: 85,
          });
        }
    }
    expect(errors).toEqual([]);
  });
test("every offer shows its price, inclusions and correct enquiry selection", async ({
  page,
}) => {
  await page.goto("/");
  const tabs = page.locator(".cn-offer-tabs button");
  for (let i = 0; i < 5; i++) {
    await tabs.nth(i).click();
    await expect(tabs.nth(i)).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".cn-inclusions li")).toHaveCount(3);
    await expect(page.locator(".cn-price strong")).toHaveText(/^\$\d+/);
    await page
      .getByRole("button", { name: "Package details & conditions" })
      .click();
    await expect(page.locator("#offer-detail")).toContainText("illustrative");
    const label = await page.locator(".cn-offer-copy>.cn-label").textContent();
    await page.locator(".cn-offer-copy>.cn-button").click();
    await expect(page.locator(".cn-selected-offer")).toContainText(label!);
    await expect(page.locator("#cn-service")).toBeFocused();
  }
});
test("services, commercial and additional-service actions select the matching quote", async ({
  page,
}) => {
  await page.goto("/");
  for (const name of [
    "Carpet cleaning",
    "Rug cleaning",
    "Commercial cleaning",
  ]) {
    await page
      .locator(".cn-service-list")
      .getByRole("button", { name, exact: true })
      .click();
    await page.locator(".cn-service-description:visible .cn-text-link").click();
    await expect(page.locator("#cn-service")).toHaveValue(name);
  }
  await page.getByRole("button", { name: "Get a commercial quote" }).click();
  await expect(page.locator("#cn-service")).toHaveValue("Commercial cleaning");
  await page
    .locator(".cn-extra-services")
    .getByRole("button", { name: "Mattress cleaning" })
    .click();
  await expect(page.locator("#cn-service")).toHaveValue("Mattress cleaning");
});
test("quote validates, preserves edits and never submits a real lead", async ({
  page,
}) => {
  const sent: string[] = [];
  page.on("request", (r) => {
    if (r.method() === "POST") sent.push(r.url());
  });
  await page.goto("/");
  await page.locator("#cn-service").selectOption("Carpet cleaning");
  await page.getByLabel("Suburb or postcode").fill("New Farm");
  await page.getByLabel("Your name", { exact: true }).fill("Prototype Review");
  await page.getByLabel("Phone number", { exact: true }).fill("123");
  await page
    .locator(".cn-form-panel")
    .getByRole("button", { name: "Get my Free Quote" })
    .click();
  await expect(page.locator("#cn-phone-error")).toBeVisible();
  await page.getByLabel("Phone number", { exact: true }).fill("0412345678");
  await page
    .locator(".cn-form-panel")
    .getByRole("button", { name: "Get my Free Quote" })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "Demo only: nothing has been sent",
  );
  await page.getByRole("button", { name: "Edit my enquiry" }).click();
  await expect(page.getByLabel("Your name", { exact: true })).toHaveValue(
    "Prototype Review",
  );
  expect(sent).toEqual([]);
});
test("mobile navigation, focus trap, sticky CTA and FAQ work", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".cn-sticky")).toBeHidden();
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Special offers" })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator(".cn-sticky")).toBeVisible();
  await page.locator("#faq summary").first().click();
  await expect(page.locator("#faq details").first()).toHaveAttribute(
    "open",
    "",
  );
  await page.locator("#quote").scrollIntoViewIfNeeded();
  await expect(page.locator(".cn-sticky")).toBeHidden();
});
for (const width of [390, 1440])
  test(`film uses independent source and pauses ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator(".cn-film video")).not.toHaveAttribute(
      "src",
      /./,
    );
    await page.locator(".cn-film").scrollIntoViewIfNeeded();
    const video = page.locator(".cn-film video");
    await expect(video).toHaveAttribute(
      "src",
      width < 768 ? /mobile.mp4/ : /desktop.mp4/,
    );
    await expect(video).toHaveClass("is-ready");
    const dimensions = await video.evaluate((v: HTMLVideoElement) => ({
      w: v.videoWidth,
      h: v.videoHeight,
      muted: v.muted,
      inline: v.hasAttribute("playsinline"),
      loop: v.loop,
    }));
    expect(dimensions.w / dimensions.h).toBeCloseTo(
      width < 768 ? 9 / 16 : 16 / 9,
      2,
    );
    expect(dimensions.muted && dimensions.inline && !dimensions.loop).toBe(
      true,
    );
    await page.getByRole("button", { name: "Pause cleaning film" }).click();
    expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
    await page.getByRole("button", { name: "Play cleaning film" }).click();
    await page.locator("#quote").scrollIntoViewIfNeeded();
    await expect
      .poll(() => video.evaluate((v: HTMLVideoElement) => v.paused))
      .toBe(true);
  });
for (const mode of ["reduced", "save-data", "failed"])
  test(`film fallback ${mode}`, async ({ page }) => {
    const requests: string[] = [];
    page.on("request", (r) => {
      if (r.url().includes(".mp4")) requests.push(r.url());
    });
    if (mode === "reduced")
      await page.emulateMedia({ reducedMotion: "reduce" });
    if (mode === "save-data")
      await page.addInitScript(() =>
        Object.defineProperty(navigator, "connection", {
          value: { saveData: true },
        }),
      );
    if (mode === "failed")
      await page.route("**/carpet-film-*.mp4", (r) => r.abort());
    await page.goto("/");
    await page.locator(".cn-film").scrollIntoViewIfNeeded();
    await expect(page.locator(".cn-film picture")).toBeVisible();
    if (mode === "failed")
      await expect(page.locator(".cn-film-status")).toBeVisible();
    else {
      await page.waitForTimeout(300);
      expect(requests).toEqual([]);
    }
  });
test("legal pages share the new identity, are noindex and are explicit prototype drafts", async ({
  page,
}) => {
  for (const path of ["/legal/privacy", "/legal/terms"]) {
    await page.goto(path);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator(".cn-label")).toContainText("Prototype draft");
    await expect(page.locator(".cn-brand")).toHaveCount(2);
    expect(
      await page.locator("meta[name=robots]").getAttribute("content"),
    ).toContain("noindex");
    await expect(page.locator("article")).not.toContainText("Blue Sky");
  }
});
test("no-JavaScript keeps the hero and offers readable without sending demo form data", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("#hero-title")).toBeVisible();
  await expect(page.locator(".cn-offer-copy")).toContainText("$149");
  await expect(
    page.locator(".cn-form-panel button[type=submit]"),
  ).toBeDisabled();
  await expect(page.locator("video")).not.toHaveAttribute("src", /./);
  await context.close();
});

test("dark section headings inherit readable light text and the initial layout is stable", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.assign(window, { prototypeCLS: 0 });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & {
          hadRecentInput: boolean;
          value: number;
        };
        if (!shift.hadRecentInput)
          (window as unknown as { prototypeCLS: number }).prototypeCLS +=
            shift.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto("/");
  await page
    .locator(".cn-hero img")
    .evaluate((img: HTMLImageElement) => img.decode());
  await page.evaluate(() => document.fonts.ready);
  const colours = await page
    .locator(".cn-hero h1,.cn-film h2,.cn-commercial h2")
    .evaluateAll((els) => els.map((el) => getComputedStyle(el).color));
  for (const colour of colours) {
    const values = colour.match(/\d+/g)!.map(Number);
    expect(Math.min(...values)).toBeGreaterThan(200);
  }
  await page.waitForTimeout(500);
  expect(
    await page.evaluate(
      () => (window as unknown as { prototypeCLS: number }).prototypeCLS,
    ),
  ).toBeLessThanOrEqual(0.1);
});
