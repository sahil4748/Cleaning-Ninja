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
const evidence = "docs/execution/photographic-homepage/screenshots";
for (const [width, height] of widths)
  test(`photographic responsive ${width}`, async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await page
      .locator(".cn-photo-media img")
      .evaluate((img: HTMLImageElement) => img.decode());
    await expect(page.locator("h1")).toHaveText("That freshhome feeling.");
    await expect(page.locator(".cn-photo-hero .cn-button")).toBeInViewport({
      ratio: 1,
    });
    await expect(page.locator(".cn-header-phone")).toHaveText("123456789");
    await expect(page.locator("canvas")).toHaveCount(0);
    expect(await page.locator("body").innerText()).not.toMatch(
      /prototype|illustrative|demo only|example price/i,
    );
    await expect(page.locator(".im-service-detail h3")).toHaveText(
      "Carpet cleaning",
    );
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
        Promise.all(
          images
            .filter((img) => (img as HTMLImageElement).complete)
            .map((img) => (img as HTMLImageElement).decode()),
        ),
      );
    if (
      testInfo.project.name === "chromium" &&
      [375, 390, 430, 768, 1024, 1440].includes(width)
    ) {
      await mkdir(evidence, { recursive: true });
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      await expect(page.locator(".cn-header")).toHaveAttribute(
        "data-scrolled",
        "false",
      );
      await expect(page.locator(".cn-header")).toHaveCSS(
        "background-color",
        "rgba(0, 0, 0, 0)",
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
          await page.locator(`#${id}`).evaluate((el) =>
            scrollTo({
              top: el.getBoundingClientRect().top + scrollY - 105,
              behavior: "instant",
            }),
          );
          await expect(page.locator(".cn-header")).toHaveAttribute(
            "data-scrolled",
            "true",
          );
          if (id === "quote")
            await expect(page.locator(".cn-sticky")).toBeHidden();
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
    await expect(page.locator("#offer-detail")).toContainText(
      "quote will confirm",
    );
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
      .locator(".im-service-rail")
      .getByRole("button", { name, exact: true })
      .click();
    await page.locator(".im-service-detail .cn-button").click();
    await expect(page.locator("#cn-service")).toHaveValue(name);
  }
  await page.getByRole("button", { name: "Get a commercial quote" }).click();
  await expect(page.locator("#cn-service")).toHaveValue("Commercial cleaning");
  await page
    .locator(".im-more-services")
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
  await expect(page.locator("#quote").getByRole("status")).toContainText(
    "Your enquiry has not been sent yet",
  );
  const draft = await page
    .getByRole("link", { name: "Send by email" })
    .getAttribute("href");
  expect(decodeURIComponent(draft!)).toContain("Name: Prototype Review");
  expect(decodeURIComponent(draft!)).toContain("Phone: 0412345678");
  expect(draft).toMatch(/^mailto:contact@cleaningninja.co\?/);
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
  test(`film uses independent source and pauses ${width}`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator(".cn-film video")).not.toHaveAttribute(
      "src",
      /./,
    );
    if (
      !(await page.evaluate(
        () => matchMedia("(prefers-reduced-motion: reduce)").matches,
      ))
    )
      await expect(page.locator(".im-journey")).toHaveAttribute(
        "data-motion",
        "true",
      );
    await page.locator(".im-journey").evaluate((el) => {
      scrollTo({
        top:
          el.getBoundingClientRect().top +
          scrollY +
          el.clientHeight -
          innerHeight,
        behavior: "instant",
      });
    });
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
    await expect
      .poll(() => video.evaluate((v: HTMLVideoElement) => v.paused))
      .toBe(true);
    if (width < 768) {
      const copy = await page.locator(".cn-film-copy").boundingBox();
      const controls = await page.locator(".cn-film-controls").boundingBox();
      expect(copy!.y + copy!.height + 16).toBeLessThanOrEqual(controls!.y);
    }
    if (testInfo.project.name === "chromium") {
      await mkdir(evidence, { recursive: true });
      await page.screenshot({
        path: `${evidence}/cinema-${width}.jpg`,
        quality: 85,
      });
    }
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
    if (
      !(await page.evaluate(
        () => matchMedia("(prefers-reduced-motion: reduce)").matches,
      ))
    )
      await expect(page.locator(".im-journey")).toHaveAttribute(
        "data-motion",
        "true",
      );
    await page.locator(".im-journey").evaluate((el) => {
      scrollTo({
        top:
          el.getBoundingClientRect().top +
          scrollY +
          el.clientHeight -
          innerHeight,
        behavior: "instant",
      });
    });
    await expect(page.locator(".cn-film picture")).toBeVisible();
    if (mode === "failed")
      await expect(page.locator(".cn-film-status")).toBeVisible();
    else {
      await page.waitForTimeout(300);
      expect(requests).toEqual([]);
    }
  });
test("legal pages explain enquiries without internal labels and remain noindex", async ({
  page,
}) => {
  for (const path of ["/legal/privacy", "/legal/terms"]) {
    await page.goto(path);
    await expect(page.locator("main h1")).toBeVisible();
    expect(await page.locator("body").innerText()).not.toMatch(
      /prototype|illustrative|draft|demo/i,
    );
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
    .locator(".cn-photo-media img")
    .evaluate((img: HTMLImageElement) => img.decode());
  await page.evaluate(() => document.fonts.ready);
  const colours = await page
    .locator(".cn-film h2,.cn-commercial h2")
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

test("cinematic aperture opens as the user scrolls and leaves navigation usable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(".im-journey")).toHaveAttribute(
    "data-motion",
    "true",
  );
  await page.locator(".im-journey").evaluate((el) =>
    scrollTo({
      top: el.getBoundingClientRect().top + scrollY,
      behavior: "instant",
    }),
  );
  await expect(page.locator(".im-portal-intro")).toHaveCSS("opacity", "1");
  await page.screenshot({
    path: `${evidence}/make-room-1440.jpg`,
    quality: 85,
  });
  await page.locator(".im-journey").evaluate((el) =>
    scrollTo({
      top:
        el.getBoundingClientRect().top +
        scrollY +
        el.clientHeight -
        innerHeight,
      behavior: "instant",
    }),
  );
  await expect(page.locator(".im-portal-intro")).toHaveCSS("opacity", "0");
  await expect(page.locator(".cn-film-copy")).toHaveCSS("opacity", "1");
  await page.screenshot({
    path: "docs/execution/photographic-homepage/screenshots/cinema-1440.jpg",
  });
  await page.locator(".cn-film-copy a").click();
  await expect(page.locator("#quote")).toBeInViewport();
});

test("photographic hero choices prefill the quote and scrolling changes header contrast", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".cn-header")).toHaveAttribute(
    "data-scrolled",
    "false",
  );
  for (const [name, service] of [
    ["Carpets", "Carpet cleaning"],
    ["Upholstery", "Upholstery cleaning"],
    ["Rugs", "Rug cleaning"],
  ]) {
    await page
      .locator(".cn-photo-services")
      .getByRole("button", { name: new RegExp(name) })
      .click();
    await expect(page.locator("#cn-service")).toHaveValue(service);
    await expect(page.locator(".cn-header")).toHaveAttribute(
      "data-scrolled",
      "true",
    );
  }
});
test("reduced motion keeps the photo static and provides a playable film", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".cn-photo-media")).toHaveCSS("transform", "none");
  await page.locator("#experience").scrollIntoViewIfNeeded();
  await expect(page.locator(".cn-photo-media")).toHaveCSS("transform", "none");
  await expect(page.locator("video")).not.toHaveAttribute("src", /./);
  await page.getByRole("button", { name: "Play cleaning film" }).click();
  await expect(page.locator("video")).toHaveClass("is-ready");
});

for (const reason of ["AbortError", "NotAllowedError"]) {
  test(`interrupted autoplay ${reason} keeps the poster without a false failure`, async ({
    page,
  }) => {
    await page.addInitScript((name) => {
      HTMLMediaElement.prototype.play = function () {
        return Promise.reject(new DOMException("Playback did not start", name));
      };
    }, reason);
    await page.goto("/");
    await expect(page.locator(".im-journey")).toHaveAttribute(
      "data-motion",
      "true",
    );
    await page
      .locator(".im-journey")
      .evaluate((el) =>
        scrollTo({
          top:
            el.getBoundingClientRect().top +
            scrollY +
            el.clientHeight -
            innerHeight,
          behavior: "instant",
        }),
      );
    await expect(page.locator(".cn-film video")).toHaveAttribute(
      "src",
      /\.mp4/,
    );
    await expect(page.locator(".cn-film-status")).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: "Play cleaning film" }),
    ).toBeVisible();
    await expect(page.locator(".cn-film picture img")).toBeVisible();
  });
}
