import { mkdir, writeFile } from "node:fs/promises";
import { expect, test as base, type Page } from "@playwright/test";

const routePath = "/services/carpet-cleaning";
const evidencePath = ".local-evidence/carpet-service";
const test = base.extend<{ writeGuard: void; errorGuard: void }>({
  writeGuard: [
    async ({ context }, use) => {
      const unexpectedWrites: string[] = [];
      // Page-specific quote mocks take precedence over this context route.
      await context.route("**/*", (route) => {
        const request = route.request();
        if (!["GET", "HEAD"].includes(request.method())) {
          unexpectedWrites.push(`${request.method()} ${request.url()}`);
          return route.abort();
        }
        return route.continue();
      });
      await use();
      expect(unexpectedWrites, "Only mocked quote requests may write").toEqual([]);
    },
    { auto: true },
  ],
  errorGuard: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() !== "error") return;
        // A deliberate unavailable response is covered by the retry test.
        if (
          message.location().url.endsWith("/api/quote") &&
          /status of 503/.test(message.text())
        ) return;
        errors.push(message.text());
      });
      await use();
      expect(errors, "No runtime, hydration or unexpected console errors").toEqual([]);
    },
    { auto: true },
  ],
});

async function openQuote(page: Page) {
  await page.locator(".cp-nav").getByRole("button", { name: "Get a Free Quote", exact: true }).click();
  await expect(page.locator("#cp-form-title")).toBeFocused();
  await expect.poll(() => page.locator("#cp-form-title").evaluate((element) => {
    const box = element.getBoundingClientRect();
    const target = Number.parseFloat(getComputedStyle(element).scrollMarginTop);
    return Math.abs(box.top - target) <= 2 && box.bottom < innerHeight;
  })).toBe(true);
}

async function fillQuote(page: Page) {
  await page.locator("#cp-name").fill("Synthetic Tester");
  await page.locator("#cp-phone").fill("0400 000 000");
  await page.locator("#cp-suburb").fill("Testville 4000");
  await page.locator("#cp-email").fill("synthetic@example.invalid");
  await page.locator("#cp-details").fill("Synthetic test request only.");
}

async function settleImages(page: Page) {
  await page.evaluate(async () => { await document.fonts.ready; });
  await expect.poll(() => page.locator(".cp-poster img").evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
}

async function noOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), "No horizontal overflow").toBe(true);
}

async function filmFillsHero(page: Page) {
  const hero = await page.locator(".cp-hero").boundingBox();
  const film = await page.locator(".cp-film").boundingBox();
  expect(hero).not.toBeNull();
  expect(film).not.toBeNull();
  for (const dimension of ["x", "y", "width", "height"] as const) {
    expect(Math.abs(film![dimension] - hero![dimension]), `Film fills hero ${dimension}`).toBeLessThanOrEqual(1);
  }
  const title = await page.locator("#cp-title").boundingBox();
  expect(title!.x).toBeGreaterThanOrEqual(hero!.x);
  expect(title!.x + title!.width).toBeLessThanOrEqual(hero!.x + hero!.width + 1);
}

async function headerQuoteIsInViewport(page: Page) {
  const action = page.locator(".cp-nav").getByRole("button", { name: "Get a Free Quote", exact: true });
  await expect(action).toBeVisible();
  const bounds = await action.boundingBox();
  expect(bounds!.y).toBeGreaterThanOrEqual(0);
  expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(page.viewportSize()!.height);
  expect(bounds!.height).toBeGreaterThanOrEqual(44);
}

async function scrollImmediately(page: Page, y: number) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeCloseTo(y, 0);
}

async function noRunway(page: Page) {
  const layout = await page.locator(".cp-opening").evaluate((element) => {
    const opening = element as HTMLElement;
    const hero = opening.querySelector<HTMLElement>(".cp-hero")!;
    return { extra: opening.offsetHeight - hero.offsetHeight, position: getComputedStyle(hero).position };
  });
  expect(Math.abs(layout.extra), "This device or preference has no pinned scroll runway").toBeLessThanOrEqual(1);
  expect(layout.position).toMatch(/^(relative|static)$/);
}

async function screenshot(page: Page, name: string) {
  await settleImages(page);
  const method = page.locator(".cp-method-image img");
  await method.scrollIntoViewIfNeeded();
  await expect.poll(() => method.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await scrollImmediately(page, 0);
  const dir = `${evidencePath}/${test.info().project.name}`;
  await mkdir(dir, { recursive: true });
  await page.screenshot({ path: `${dir}/${name}-hero.png` });
  await page.screenshot({ path: `${dir}/${name}-page.png`, fullPage: true });
}

async function offersAnchor(page: Page) {
  await page.locator(".cp-scroll-cue").click();
  await expect(page).toHaveURL(new RegExp(`${routePath}#cp-offers$`));
  await expect.poll(() => page.locator("#cp-offers").evaluate((element) => {
    const top = element.getBoundingClientRect().top;
    return top >= document.querySelector(".cp-nav")!.getBoundingClientRect().bottom - 2 && top < innerHeight / 2;
  })).toBe(true);
}

async function decodedFrameHash(page: Page) {
  return page.locator(".cp-film video").evaluate((element) => {
    const canvas = document.createElement("canvas");
    canvas.width = 32; canvas.height = 18;
    const context = canvas.getContext("2d")!;
    context.drawImage(element as HTMLVideoElement, 0, 0, 32, 18);
    const pixels = context.getImageData(0, 0, 32, 18).data;
    let hash = 2166136261;
    for (const value of pixels) hash = Math.imul(hash ^ value, 16777619) >>> 0;
    return hash.toString(16);
  });
}

test("standalone route preserves content, metadata, media and quote access", async ({ page, request }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  expect((await page.goto(routePath))?.status()).toBe(200);
  await settleImages(page);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Carpet\s*cleaning/i);
  await expect(page).toHaveTitle("Carpet Cleaning | Cleaning Ninja");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://cleaningninja.co${routePath}`);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex.*nofollow/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", "https://cleaningninja.co/media/carpet-cleaning/poster.webp");
  for (const media of ["film.mp4", "film-mobile.mp4"]) {
    const response = await request.head(`/media/carpet-cleaning/${media}`, { maxRedirects: 0 });
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toMatch(/^video\/mp4/);
  }
  const schemas = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) => scripts.flatMap((script) => {
    const value = JSON.parse(script.textContent ?? "null");
    return Array.isArray(value) ? value : [value];
  }));
  expect(schemas).toContainEqual(expect.objectContaining({ "@type": "Service", name: "Carpet Cleaning", url: `https://cleaningninja.co${routePath}` }));
  expect(schemas.find((schema) => schema?.["@type"] === "BreadcrumbList")?.itemListElement).toEqual([
    expect.objectContaining({ name: "Home", item: "https://cleaningninja.co/" }),
    expect.objectContaining({ name: "Carpet Cleaning", item: `https://cleaningninja.co${routePath}` }),
  ]);
  await expect(page.locator(".cp-offer")).toHaveCount(5);
  await expect(page.locator(".cp-methods details")).toHaveCount(4);
  await expect(page.getByRole("link", { name: "Home", exact: true }).first()).toHaveAttribute("href", "/");
  await expect(page.getByRole("link", { name: "Our services", exact: true }).first()).toHaveAttribute("href", "/#services");
  await filmFillsHero(page);
  await noOverflow(page);
  await screenshot(page, "desktop-1440");
  await openQuote(page);
});

test("native wheel scroll drives decoded film promptly forwards and backwards", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(routePath);
  const opening = page.locator(".cp-opening");
  const video = page.locator(".cp-film video");
  await expect(opening).toHaveAttribute("data-motion-ready", "true");
  const layout = await opening.evaluate((element) => {
    const wrapper = element as HTMLElement;
    const hero = wrapper.querySelector<HTMLElement>(".cp-hero")!;
    return { span: wrapper.offsetHeight - hero.offsetHeight, start: wrapper.getBoundingClientRect().top + scrollY - parseFloat(getComputedStyle(hero).top) };
  });
  expect(layout.span).toBeGreaterThan(0);
  expect(layout.span, "Desktop story lasts no more than one extra viewport plus small tolerance").toBeLessThanOrEqual(1100);
  await expect(video).not.toHaveAttribute("autoplay", /.*/);
  await expect(video).not.toHaveAttribute("loop", /.*/);
  const duration = await video.evaluate((element) => (element as HTMLVideoElement).duration);
  expect(duration).toBeGreaterThan(0);
  async function atFraction(fraction: number) {
    await scrollImmediately(page, Math.round(layout.start + layout.span * fraction));
    await expect.poll(() => video.evaluate((element, target) => {
      const player = element as HTMLVideoElement;
      return player.paused && !player.seeking && player.readyState >= 2 && Math.abs(player.currentTime - target) < 0.16;
    }, (duration - 1 / 30) * fraction), { timeout: 2000, message: "Decoded footage reaches the current scroll position without a long trailing cursor" }).toBe(true);
    return decodedFrameHash(page);
  }
  const start = await atFraction(.08);
  await page.mouse.move(1100, 500);
  const before = await page.evaluate(() => scrollY);
  const began = Date.now();
  await page.mouse.wheel(0, Math.round(layout.span * .6));
  await expect.poll(() => page.evaluate(() => scrollY), { timeout: 1000 }).toBeGreaterThan(before + layout.span * .4);
  const wheelResponseMs = Date.now() - began;
  const middle = await atFraction(.65);
  const reverse = await atFraction(.2);
  expect(new Set([start, middle, reverse]).size, "Scroll changes actual decoded imagery in both directions").toBe(3);
  await filmFillsHero(page);
  await headerQuoteIsInViewport(page);
  await expect(page.locator(".cp-hero-quote")).toBeVisible();
  await page.getByRole("button", { name: "Pause motion", exact: true }).click();
  const paused = await video.evaluate((element) => (element as HTMLVideoElement).currentTime);
  await scrollImmediately(page, Math.round(layout.span * .55));
  await expect(video).toHaveJSProperty("currentTime", paused);
  await page.getByRole("button", { name: "Resume motion", exact: true }).click();
  await atFraction(.55);
  const dir = `${evidencePath}/${testInfo.project.name}`;
  await mkdir(dir, { recursive: true });
  await page.screenshot({ path: `${dir}/desktop-film-mid.png` });
  await scrollImmediately(page, 0);
  await offersAnchor(page);
  await writeFile(`${dir}/scroll-metrics.json`, JSON.stringify({ browser: testInfo.project.name, viewport: page.viewportSize(), extraHeroScrollPx: layout.span, wheelResponseMs, note: "Local automated browser sample; not field CWV or physical-device FPS." }, null, 2));
});

test("responsive portrait and short landscape layouts remain readable and reach the quote", async ({ page }) => {
  test.setTimeout(120000);
  for (const [width, height] of [[320,568], [360,800], [390,844], [605,720], [768,1024], [844,390], [1024,600], [1024,900]]) {
    await page.setViewportSize({ width, height });
    await page.goto(routePath);
    await settleImages(page);
    await filmFillsHero(page);
    await noOverflow(page);
    await headerQuoteIsInViewport(page);
    if (width < 900 || height < 650) await noRunway(page);
    const cta = page.locator(".cp-hero-quote");
    const hero = page.locator(".cp-hero");
    expect(await cta.evaluate((element) => element.getBoundingClientRect().bottom <= element.closest(".cp-hero")!.getBoundingClientRect().bottom + 1), "Hero quote fits within hero even in landscape").toBe(true);
    await cta.scrollIntoViewIfNeeded();
    await expect(cta).toBeInViewport();
    await expect(hero).toBeVisible();
    if ([320,390,768,844,1024].includes(width)) await screenshot(page, `${width}x${height}`);
    await scrollImmediately(page, 0);
    await offersAnchor(page);
    await openQuote(page);
    await expect(page.locator(".cp-form-service strong")).toHaveText("Carpet cleaning");
    await page.locator(".cp-submit").scrollIntoViewIfNeeded();
    await expect(page.locator(".cp-submit")).toBeInViewport();
    await noOverflow(page);
  }
});

test("reduced motion, Save Data and slow connections show poster without media requests", async ({ page }) => {
  const films: string[] = [];
  page.on("request", (request) => { if (/\/film(?:-mobile)?\.mp4/.test(request.url())) films.push(request.url()); });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(routePath);
  await settleImages(page);
  await noRunway(page);
  await expect(page.locator(".cp-film video")).not.toHaveAttribute("src", /.+/);
  await expect(page.getByRole("button", { name: /^(Play film|Pause motion)$/ })).toHaveCount(0);
  await openQuote(page);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => Object.defineProperty(navigator, "connection", { configurable: true, value: { saveData: true, effectiveType: "4g" } }));
  await page.goto(routePath);
  await settleImages(page);
  await noRunway(page);
  await expect(page.locator(".cp-film video")).not.toHaveAttribute("src", /.+/);
  await offersAnchor(page);
  await openQuote(page);
  await page.addInitScript(() => Object.defineProperty(navigator, "connection", { configurable: true, value: { saveData: false, effectiveType: "2g" } }));
  await page.goto(routePath);
  await settleImages(page);
  await noRunway(page);
  expect(films, "Data preferences avoid film downloads altogether").toEqual([]);
});

test("small screens load the optional film only after play and can pause it", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const films: string[] = [];
  page.on("request", (request) => { if (/\/film(?:-mobile)?\.mp4/.test(request.url())) films.push(request.url()); });
  await page.goto(routePath);
  await settleImages(page);
  await noRunway(page);
  const play = page.getByRole("button", { name: "Play film", exact: true });
  await expect(play).toBeVisible();
  expect(films).toEqual([]);
  await play.click();
  await expect(page.locator(".cp-film video")).toHaveAttribute("src", "/media/carpet-cleaning/film-mobile.mp4");
  await expect.poll(() => page.locator(".cp-film video").evaluate((element) => (element as HTMLVideoElement).currentTime)).toBeGreaterThan(.05);
  await page.getByRole("button", { name: "Pause film", exact: true }).click();
  await expect(page.locator(".cp-film video")).toHaveJSProperty("paused", true);
  await expect(play).toBeVisible();
  expect(films.length).toBeGreaterThan(0);
  await noRunway(page);
  await page.setViewportSize({ width: 844, height: 390 });
  await expect(page.locator(".cp-film video")).not.toHaveAttribute("src", /.+/);
  await expect(page.locator(".cp-film video")).toHaveJSProperty("paused", true);
  await play.click();
  await expect(page.locator(".cp-film video")).toHaveAttribute("src", "/media/carpet-cleaning/film.mp4");
  await expect(page.getByRole("button", { name: "Pause film", exact: true })).toBeVisible();
  await noRunway(page);
  await openQuote(page);
});

test("delayed film readiness does not move the quote or offers away from the visitor", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  let release: () => void = () => {};
  const held = new Promise<void>((resolve) => { release = resolve; });
  await page.route("**/media/carpet-cleaning/film*.mp4", async (route) => { await held; await route.continue(); });
  await page.goto(routePath, { waitUntil: "domcontentloaded" });
  await openQuote(page);
  const before = await page.locator("#cp-form-title").boundingBox();
  release();
  await expect.poll(() => page.locator(".cp-film video").evaluate((element) => (element as HTMLVideoElement).readyState)).toBeGreaterThanOrEqual(2);
  const after = await page.locator("#cp-form-title").boundingBox();
  expect(Math.abs(after!.y - before!.y), "Late media readiness cannot insert scroll distance above focused content").toBeLessThanOrEqual(2);
  await expect(page.locator("#cp-form-title")).toBeFocused();
});

test("unavailable film retains its poster and all quote interactions", async ({ page }) => {
  let attempted = false;
  await page.route("**/media/carpet-cleaning/film*.mp4", (route) => {
    attempted = true;
    return route.fulfill({ status: 200, contentType: "video/mp4", body: "unavailable film" });
  });
  await page.goto(routePath);
  await settleImages(page);
  await expect.poll(() => attempted).toBe(true);
  await expect(page.locator(".cp-film video")).not.toHaveAttribute("src", /.+/);
  await expect(page.getByRole("button", { name: /^(Play film|Pause motion)$/ })).toHaveCount(0);
  await expect(page.locator(".cp-poster img")).toBeVisible();
  await expect(page.locator(".cp-film video")).toHaveCSS("opacity", "0");
  await offersAnchor(page);
  await openQuote(page);
});

test("keyboard, disclosures, form errors and 200 percent reflow remain usable", async ({ page, browserName }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(routePath);
  // macOS Safari uses Option-Tab for links when full keyboard access is disabled.
  await page.keyboard.press(browserName === "webkit" && process.platform === "darwin" ? "Alt+Tab" : "Tab");
  await expect(page.getByRole("link", { name: "Skip to content", exact: true })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(new RegExp(`${routePath}#cp-main$`));
  const conditions = page.getByRole("button", { name: "Offer conditions", exact: true });
  await conditions.focus();
  await page.keyboard.press("Enter");
  await expect(conditions).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#cp-offer-terms")).toBeVisible();
  await page.keyboard.press("Space");
  await expect(conditions).toHaveAttribute("aria-expanded", "false");
  const method = page.locator(".cp-methods details").nth(1);
  await method.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(method).toHaveAttribute("open", "");
  await page.keyboard.press("Enter");
  await expect(method).not.toHaveAttribute("open", "");
  await openQuote(page);
  await page.keyboard.press("Tab");
  await expect(page.locator("#cp-name")).toBeFocused();
  await page.locator(".cp-submit").click();
  await expect(page.locator("#cp-name")).toBeFocused();
  await expect(page.locator("#cp-name")).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#cp-name-error")).toBeVisible();
  await expect(page.locator("#cp-name")).toHaveAttribute("aria-describedby", /cp-name-error/);
  await fillQuote(page);
  await expect(page.locator("#cp-name")).toHaveAttribute("aria-invalid", "false");
  // Browser zoom to 200% produces the same 640 CSS-pixel layout as a 1280px window.
  await page.setViewportSize({ width: 640, height: 450 });
  await noOverflow(page);
  await noRunway(page);
  await page.locator(".cp-submit").scrollIntoViewIfNeeded();
  await expect(page.locator(".cp-submit")).toBeInViewport();
  await headerQuoteIsInViewport(page);
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("poster, service content and direct email contact remain available", async ({ page }) => {
    await page.goto(routePath);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator(".cp-poster img")).toBeVisible();
    await expect(page.locator(".cp-film video")).not.toHaveAttribute("src", /.+/);
    await noRunway(page);
    await offersAnchor(page);
    await expect(page.getByRole("link", { name: "email Cleaning Ninja", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "email Cleaning Ninja", exact: true })).toHaveAttribute("href", "mailto:contact@cleaningninja.co");
    await expect(page.locator(".cp-submit")).toBeDisabled();
  });
});

test.describe("touch tablet", () => {
  test.use({ hasTouch: true, viewport: { width: 1024, height: 1366 } });
  test("coarse pointer keeps natural page flow and tap-accessible controls", async ({ page }) => {
    await page.goto(routePath);
    await settleImages(page);
    await noRunway(page);
    await expect(page.locator(".cp-film video")).not.toHaveAttribute("src", /.+/);
    await page.locator(".cp-scroll-cue").tap();
    await expect(page).toHaveURL(new RegExp(`${routePath}#cp-offers$`));
    const conditions = page.getByRole("button", { name: "Offer conditions", exact: true });
    await conditions.tap();
    await expect(conditions).toHaveAttribute("aria-expanded", "true");
    await page.locator(".cp-nav").getByRole("button", { name: "Get a Free Quote", exact: true }).tap();
    await expect(page.locator("#cp-form-title")).toBeFocused();
    await expect(page.locator("#cp-name")).not.toBeFocused();
    await noOverflow(page);
  });
});

test("quote retries preserve fields and attribution without duplicate submissions", async ({ page }) => {
  const posts: { key?: string; body: Record<string, unknown> }[] = [];
  await page.route("**/api/quote", async (route) => {
    const request = route.request();
    posts.push({ key: request.headers()["idempotency-key"], body: request.postDataJSON() });
    await new Promise((resolve) => setTimeout(resolve, 500));
    return posts.length === 1
      ? route.fulfill({ status: 503, json: { status: "unavailable" } })
      : route.fulfill({ status: 201, json: { status: "accepted", durableId: "00000000-0000-4000-8000-000000000001" } });
  });
  await page.goto(routePath);
  await page.getByRole("button", { name: "Get a Free Quote for 5-seat leather lounge", exact: true }).click();
  await expect(page.locator("#cp-form-title")).toBeFocused();
  await expect(page.locator(".cp-selected-package")).toHaveText("5-seat leather lounge");
  await fillQuote(page);
  const submit = page.locator(".cp-submit");
  await submit.click();
  await expect(submit).toBeDisabled();
  for (const packageButton of await page.locator(".cp-offer button").all()) {
    await expect(packageButton).toBeDisabled();
  }
  await submit.evaluate((button) => (button as HTMLButtonElement).click());
  await expect(page.locator('.cp-form-status[role="alert"]')).toContainText(/not been sent|couldn.t send|not available/i);
  await expect(submit).toBeEnabled();
  await expect(page.locator("#cp-name")).toHaveValue("Synthetic Tester");
  await expect(page.locator("#cp-phone")).toHaveValue("0400 000 000");
  await expect(page.locator("#cp-email")).toHaveValue("synthetic@example.invalid");
  await expect(page.locator("#cp-details")).toHaveValue("Synthetic test request only.");
  expect(posts).toHaveLength(1);
  await submit.click();
  await expect(page.getByRole("status")).toContainText("We've received your quote request.");
  expect(posts).toHaveLength(2);
  expect(posts[0].key).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  expect(posts[1].key).toBe(posts[0].key);
  expect(posts[1].body).toMatchObject({
    schemaVersion: 1,
    leadSource: "service-page",
    sourcePage: routePath,
    service: "leather-cleaning",
    name: "Synthetic Tester",
    email: "synthetic@example.invalid",
  });
  expect(posts[1].body.description).toContain("5-seat leather lounge");
});

test("reference package service, removal and requested date preserve enquiry semantics", async ({ page }) => {
  const posts: Record<string, unknown>[] = [];
  await page.route("**/api/quote", (route) => {
    posts.push(route.request().postDataJSON());
    return route.fulfill({ status: 201, json: { status: "accepted", durableId: "00000000-0000-4000-8000-000000000002" } });
  });
  await page.goto(routePath);
  await page.getByRole("button", { name: "Get a Free Quote for 5-seat leather lounge", exact: true }).click();
  await expect(page.locator(".cp-form-service strong")).toHaveText("Leather cleaning");
  await expect(page.locator(".cp-selected-package")).toHaveText("5-seat leather lounge");
  await page.getByRole("button", { name: "Remove package", exact: true }).click();
  await expect(page.locator(".cp-form-service strong")).toHaveText("Carpet cleaning");
  await expect(page.locator(".cp-selected-package")).toHaveCount(0);
  await page.getByRole("button", { name: "Get a Free Quote for 5-seat leather lounge", exact: true }).click();
  await fillQuote(page);
  await page.locator("#cp-date").fill("2026-10-15");
  await page.locator(".cp-submit").click();
  await expect(page.getByRole("status")).toContainText("We've received your quote request.");
  await expect(page.getByRole("status")).toContainText("This is not a confirmed booking.");
  expect(posts).toHaveLength(1);
  expect(posts[0]).toMatchObject({
    service: "leather-cleaning",
    sourcePage: routePath,
    intent: "booking",
    preferredDateTime: { date: "2026-10-15", timeZone: "Australia/Brisbane" },
  });
  expect(posts[0].description).toContain("5-seat leather lounge");
  await page.getByRole("button", { name: "Send another request", exact: true }).click();
  await expect(page.locator("#cp-name")).toHaveValue("");
  await expect(page.locator(".cp-form-service strong")).toHaveText("Leather cleaning");
  await page.getByRole("button", { name: "Remove package", exact: true }).click();
  await expect(page.locator(".cp-form-service strong")).toHaveText("Carpet cleaning");
  await expect(page.locator(".cp-selected-package")).toHaveCount(0);
  expect(posts).toHaveLength(1);
});
