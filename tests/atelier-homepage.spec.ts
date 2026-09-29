import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
const evidence =
  process.env.ATELIER_EVIDENCE_DIR ||
  "docs/execution/atelier-homepage/screenshots";
const sizes = [
  [320, 740],
  [390, 844],
  [430, 932],
  [768, 1024],
  [1024, 768],
  [1366, 768],
  [1440, 900],
  [1920, 1080],
];
for (const [width, height] of sizes)
  test(`atelier responsive ${width}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await page
      .locator(".at-hero-scene img")
      .evaluate((i: HTMLImageElement) => i.decode());
    await expect(page.locator("h1")).toHaveText("A lighterkind of living.");
    const heroSource = await page
      .locator(".at-hero-scene img")
      .evaluate((image: HTMLImageElement) => image.currentSrc);
    expect(decodeURIComponent(heroSource)).toContain(
      width < 768 ? "hero-room-mobile.webp" : "hero-room.webp",
    );
    await expect(page.locator(".at-hero-copy .at-button")).toBeInViewport({
      ratio: 1,
    });
    expect(
      await page
        .locator("h1")
        .evaluate(
          (e) =>
            e.getBoundingClientRect().height /
            parseFloat(getComputedStyle(e).lineHeight),
        ),
    ).toBeLessThanOrEqual(3.1);
    for (const id of [
      "services",
      "packages",
      "commercial",
      "how-it-works",
      "coverage",
      "faq",
      "quote",
    ]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
    for (const selector of [
      ".at-form-panel",
      ".at-header",
      ".at-support-coverage",
    ]) {
      const box = await page.locator(selector).boundingBox();
      if (box) {
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width).toBeLessThanOrEqual(width + 1);
      }
    }
    expect(
      await page.locator("meta[name=robots]").getAttribute("content"),
    ).toContain("noindex");
    await expect(page.locator("canvas")).toHaveCount(0);
    if ([390, 1440].includes(width)) {
      await mkdir(evidence, { recursive: true });
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      await page.waitForTimeout(400);
      await page.screenshot({
        path: `${evidence}/hero-${width}.jpg`,
        quality: 90,
      });
      for (const id of ["services", "packages", "commercial", "quote"]) {
        await page.locator(`#${id}`).evaluate((e) =>
          scrollTo({
            top: e.getBoundingClientRect().top + scrollY - 100,
            behavior: "instant",
          }),
        );
        await page.waitForTimeout(600);
        await page.screenshot({
          path: `${evidence}/${id}-${width}.jpg`,
          quality: 88,
        });
      }
    }
    expect(errors).toEqual([]);
  });
test("all service and package choices prefill an accessible enquiry", async ({
  page,
}) => {
  await page.goto("/");
  for (const [index, value] of [
    "Carpet cleaning",
    "Upholstery cleaning",
    "Rug cleaning",
    "Tile & grout cleaning",
  ].entries()) {
    await page.locator(".at-service-select").nth(index).click();
    await expect(page.locator(".at-service-select").nth(index)).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await page.locator(".at-service-quote:visible").click();
    await expect(page.locator("#at-service")).toHaveValue(value);
    await expect(page.locator("#at-service")).toBeFocused();
  }
  for (let index = 0; index < 5; index++) {
    await page.locator(".at-package-toggle").nth(index).click();
    const name = await page
      .locator(".at-package-toggle h3")
      .nth(index)
      .innerText();
    await page.locator(".at-package-details:visible button").click();
    await expect(page.locator(".at-selected-offer")).toContainText(name);
    await expect(page.locator("#at-service")).toBeFocused();
  }
  await page
    .getByRole("button", { name: "Let’s talk about your workspace" })
    .click();
  await expect(page.locator("#at-service")).toHaveValue("Commercial cleaning");
});
test("coverage prefill and enquiry review preserve data and never claim sending", async ({
  page,
}) => {
  const sent: string[] = [];
  page.on("request", (r) => {
    if (r.method() === "POST" && r.url().includes("/api/")) sent.push(r.url());
  });
  await page.goto("/");
  await page
    .getByRole("textbox", { name: "Where can we help?" })
    .fill("New Farm 4005");
  await page
    .getByRole("button", { name: "Enquire about cleaning in my area" })
    .click();
  await expect(page.locator("#at-suburb")).toHaveValue("New Farm 4005");
  await page.locator("#at-service").selectOption("Carpet cleaning");
  await page.locator("#at-name").fill("Test Visitor");
  await page.locator("#at-phone").fill("123");
  await page.locator("#at-details").fill("Two rooms; synthetic browser check.");
  await page.getByRole("button", { name: "Review my enquiry" }).click();
  await expect(page.locator("#at-phone-error")).toBeVisible();
  await page.locator("#at-phone").fill("0412 345 678");
  await page.getByRole("button", { name: "Review my enquiry" }).click();
  await expect(page.locator(".at-enquiry-review")).toBeFocused();
  await expect(page.locator(".at-enquiry-review")).toContainText(
    "Your enquiry has not been sent yet.",
  );
  await expect(
    page.getByRole("link", { name: "Send by email" }),
  ).toHaveAttribute("href", /^mailto:contact@cleaningninja.co\?/);
  await page.getByRole("button", { name: "Edit my enquiry" }).click();
  await expect(page.locator("#at-service")).toBeFocused();
  await expect(page.locator("#at-name")).toHaveValue("Test Visitor");
  await page.getByRole("button", { name: "Review my enquiry" }).click();
  await page
    .locator(".at-more-services")
    .getByRole("button", { name: "Leather cleaning", exact: true })
    .click();
  await expect(page.locator("#at-service")).toHaveValue("Leather cleaning");
  await expect(page.locator("#at-service")).toBeFocused();
  expect(sent).toEqual([]);
});
test("mobile menu focus, native FAQ and persistent quote access", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".at-sticky-quote")).toBeHidden();
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Packages" })
    .click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.locator(".at-sticky-quote")).toBeVisible();
  await page.locator("#faq summary").first().click();
  await expect(page.locator("#faq details").first()).toHaveAttribute(
    "open",
    "",
  );
  await page.locator("#quote").scrollIntoViewIfNeeded();
  await expect(page.locator(".at-sticky-quote")).toBeHidden();
});
test("cinematic portal reveals film and keeps concealed controls out of focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(".at-cinema")).toHaveAttribute(
    "data-enhanced",
    "true",
  );
  await expect(page.locator(".at-cinema-portal")).toHaveAttribute("inert", "");
  await page.locator("#experience").evaluate((e) =>
    scrollTo({
      top: e.getBoundingClientRect().top + scrollY,
      behavior: "instant",
    }),
  );
  await page.waitForTimeout(800);
  await mkdir(evidence, { recursive: true });
  await page.screenshot({ path: `${evidence}/portal-1440.jpg`, quality: 90 });
  await page.evaluate(() =>
    scrollBy({ top: innerHeight * 1.4, behavior: "instant" }),
  );
  await expect(page.locator(".at-cinema-portal")).not.toHaveAttribute(
    "inert",
    "",
  );
  await expect(page.locator(".at-film video")).toHaveAttribute(
    "src",
    /desktop.mp4/,
  );
  await expect(page.locator(".at-film video")).toHaveClass("is-ready");
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${evidence}/cinema-1440.jpg`, quality: 90 });
  await page.getByRole("button", { name: "Pause cleaning film" }).click();
  await expect
    .poll(() =>
      page
        .locator(".at-film video")
        .evaluate((v: HTMLVideoElement) => v.paused),
    )
    .toBe(true);
  await page.getByRole("button", { name: "Play cleaning film" }).click();
  await page.locator("#quote").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator(".at-film video")
        .evaluate((v: HTMLVideoElement) => v.paused),
    )
    .toBe(true);
});
for (const mode of ["reduced", "save-data", "failed"])
  test(`media fallback ${mode}`, async ({ page }) => {
    const videos: string[] = [];
    page.on("request", (r) => {
      if (r.url().includes(".mp4")) videos.push(r.url());
    });
    if (mode === "reduced")
      await page.emulateMedia({ reducedMotion: "reduce" });
    if (mode === "save-data")
      await page.addInitScript(() =>
        Object.defineProperty(navigator, "connection", {
          value: { saveData: true },
        }),
      );
    if (mode === "failed") await page.route("**/*.mp4", (r) => r.abort());
    await page.goto("/");
    await page.locator("#experience").scrollIntoViewIfNeeded();
    if (mode !== "reduced") {
      await expect(page.locator(".at-cinema")).toHaveAttribute(
        "data-enhanced",
        "true",
      );
      await page.locator("#experience").evaluate((e) =>
        scrollTo({
          top: e.getBoundingClientRect().top + scrollY + innerHeight * 1.4,
          behavior: "instant",
        }),
      );
    }
    await expect(page.locator(".at-film picture img")).toBeVisible();
    await page.waitForTimeout(800);
    if (mode === "failed")
      await expect(page.locator(".at-film-status")).toBeVisible();
    else expect(videos).toEqual([]);
  });
test("global pause disables scroll movement and allows static film controls", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Pause motion", exact: true }).click();
  await expect(page.locator(".at-site")).toHaveAttribute("data-motion", "off");
  await expect(page.locator(".at-cinema")).not.toHaveAttribute(
    "data-enhanced",
    "true",
  );
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  await expect(page.locator(".at-cinema-portal")).not.toHaveAttribute(
    "inert",
    "",
  );
});
test("without JavaScript the page remains readable and cannot silently submit a lead", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator(".at-package-details").first()).toBeVisible();
  await expect(page.locator("button[type=submit]").last()).toBeDisabled();
  await expect(page.locator(".at-hero-scene video")).not.toHaveAttribute(
    "src",
    /./,
  );
  await expect(page.locator(".at-film video")).not.toHaveAttribute("src", /./);
  await context.close();
});
test("matching legal pages retain content, home navigation and noindex", async ({
  page,
}) => {
  for (const url of ["/legal/privacy", "/legal/terms"]) {
    await page.goto(url);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator("article")).toBeVisible();
    expect(
      await page.locator("meta[name=robots]").getAttribute("content"),
    ).toContain("noindex");
    await page
      .getByRole("link", { name: "Cleaning Ninja home" })
      .first()
      .click();
    await expect(page.locator("h1")).toHaveText("A lighterkind of living.");
  }
});

for (const width of [390, 1440])
  test(`accessibility scan ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
    const violations = await page.evaluate(async () => {
      const axe = (
        window as unknown as {
          axe: {
            run: (
              context: Document,
              options: object,
            ) => Promise<{
              violations: {
                id: string;
                impact: string;
                nodes: { target: string[]; failureSummary: string }[];
              }[];
            }>;
          };
        }
      ).axe;
      const result = await axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
      });
      return result.violations.map(({ id, impact, nodes }) => ({
        id,
        impact,
        nodes: nodes.map(({ target, failureSummary }) => ({
          target,
          failureSummary,
        })),
      }));
    });
    expect(violations).toEqual([]);
  });
