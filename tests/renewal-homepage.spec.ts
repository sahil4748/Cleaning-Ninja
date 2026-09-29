import { expect, test, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";
import type { AxeResults, RunOptions } from "axe-core";

// Run with a caller-supplied config that does not start the legacy 8136 server.
test.use({
  baseURL: "http://127.0.0.1:8140",
  viewport: { width: 1440, height: 900 },
  contextOptions: { reducedMotion: "reduce" },
  serviceWorkers: "block",
});

const serviceGroups = [
  {
    label: "Soft furnishings",
    services: [
      ["carpet-cleaning", "Carpets"],
      ["upholstery-cleaning", "Upholstery"],
      ["rugs-cleaning", "Rugs"],
      ["mattress-cleaning", "Mattresses"],
      ["leather-cleaning", "Leather"],
    ],
  },
  {
    label: "Floors & more",
    services: [
      ["tile-cleaning", "Tiles & stone"],
      ["stain-and-odour-removal", "Stains & odours"],
    ],
  },
  {
    label: "Whole spaces",
    services: [
      ["commercial-cleaning", "Workspaces"],
      ["end-of-lease-cleaning", "Moving home"],
      ["pest-control", "Pest care"],
      ["car-seats-cleaning", "Car interiors"],
    ],
  },
] as const;

const packageChoices = [
  ["3 bedrooms", "carpet-cleaning"],
  ["5 bedrooms", "carpet-cleaning"],
  ["3 rugs", "rugs-cleaning"],
  ["5-seat fabric lounge", "upholstery-cleaning"],
  ["5-seat leather lounge", "leather-cleaning"],
] as const;

const fullServiceNames: Record<string, string> = {
  "carpet-cleaning": "Carpet cleaning",
  "upholstery-cleaning": "Upholstery & curtain cleaning",
  "rugs-cleaning": "Rug cleaning",
  "mattress-cleaning": "Mattress cleaning",
  "leather-cleaning": "Leather cleaning",
  "stain-and-odour-removal": "Stain & odour removal",
  "tile-cleaning": "Tile & grout cleaning",
  "commercial-cleaning": "Commercial cleaning",
  "end-of-lease-cleaning": "End-of-lease cleaning",
  "pest-control": "Pest control",
  "car-seats-cleaning": "Car seat cleaning",
};

const commercialHeadline = /Carpet &\s*upholstery\.\s*Beautifully clean\./;

const visitor = {
  name: "Test Visitor",
  phone: "0491 570 156",
  suburb: "4005",
  email: "browser-check@example.com",
  details:
    "Synthetic browser check — two rooms & one rug.\nPlease assess a tea mark.",
};

test.beforeEach(async ({ context }) => {
  // Never let a browser check create a lead or send a message, even after a regression.
  await context.route("**/*", (route) => {
    if (/^(POST|PUT|PATCH|DELETE)$/i.test(route.request().method())) {
      return route.abort("blockedbyclient");
    }
    return route.continue();
  });
});

async function openHome(page: Page) {
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Review my enquiry" }),
  ).toBeEnabled();
}

async function fillVisitor(page: Page, service = "carpet-cleaning") {
  await page.locator("#rn-service").selectOption(service);
  await page.locator("#rn-name").fill(visitor.name);
  await page.locator("#rn-phone").fill(visitor.phone);
  await page.locator("#rn-suburb").fill(visitor.suburb);
  await page.locator("#rn-email").fill(visitor.email);
  await page.locator("#rn-details").fill(visitor.details);
}

async function choosePackage(page: Page, title: string) {
  await page
    .locator(".rn-offer-index")
    .getByRole("button", { name: title, exact: true })
    .click();
  await page
    .getByRole("button", { name: "Get this offer", exact: true })
    .click();
}

for (const [width, height] of [
  [320, 740],
  [390, 844],
  [768, 1024],
  [1440, 900],
]) {
  test(`homepage remains within the viewport at ${width}px`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await openHome(page);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      commercialHeadline,
    );
    await expect(page.locator(".rn-header-quote")).toBeInViewport({
      ratio: 1,
    });
    for (const selector of [
      "#home",
      "#services",
      "#care-story",
      "#packages",
      "#quote",
      ".rn-faq",
      ".rn-footer",
    ]) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      const extent = await page.evaluate(() => ({
        content: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
      }));
      expect(
        extent.content,
        `${selector} overflows at ${width}px`,
      ).toBeLessThanOrEqual(extent.viewport + 1);
    }
    for (const selector of [
      ".rn-header",
      ".rn-tabs",
      ".rn-offer-folio",
      ".rn-quote-form-area",
    ]) {
      const bounds = await page.locator(selector).boundingBox();
      expect(bounds).not.toBeNull();
      expect(bounds!.x, `${selector} left edge`).toBeGreaterThanOrEqual(-1);
      expect(
        bounds!.x + bounds!.width,
        `${selector} right edge`,
      ).toBeLessThanOrEqual(width + 1);
    }
    expect(errors).toEqual([]);
  });
}

test("all eleven services are discoverable and each enquiry selects its service ID", async ({
  page,
}) => {
  await openHome(page);
  let visited = 0;
  for (const group of serviceGroups) {
    await page.getByRole("tab", { name: group.label, exact: true }).click();
    await expect(page.getByRole("tabpanel")).toBeVisible();
    for (const [id, label] of group.services) {
      const toggle = page
        .getByRole("tabpanel")
        .getByRole("button", { name: label, exact: true });
      await toggle.click();
      await expect(toggle).toHaveAttribute("aria-expanded", "true");
      await page
        .getByRole("button", {
          name: `Enquire about ${label.toLowerCase()}`,
          exact: true,
        })
        .click();
      await expect(page.locator("#rn-service")).toHaveValue(id);
      await expect(page.locator("#rn-service")).toBeFocused();
      await expect(page.locator(".rn-selected-package")).toHaveCount(0);
      visited += 1;
    }
  }
  expect(visited).toBe(11);
  await expect(page.locator("#rn-service option")).toHaveCount(12);
});

test("service tabs support arrow keys, Home and End with one tab stop", async ({
  page,
}) => {
  await openHome(page);
  const tabs = page.getByRole("tablist", { name: "Service categories" });
  await tabs.getByRole("tab", { name: "Soft furnishings" }).focus();
  for (const [key, label] of [
    ["ArrowRight", "Floors & more"],
    ["End", "Whole spaces"],
    ["ArrowRight", "Soft furnishings"],
    ["Home", "Soft furnishings"],
  ]) {
    await page.keyboard.press(key);
    const active = tabs.getByRole("tab", { name: label, exact: true });
    await expect(active).toBeFocused();
    await expect(active).toHaveAttribute("aria-selected", "true");
    await expect(tabs.locator('[tabindex="0"]')).toHaveCount(1);
    await expect(page.getByRole("tabpanel")).toHaveAttribute(
      "aria-labelledby",
      (await active.getAttribute("id")) as string,
    );
  }
});

test("all five offers prefill the right service and package", async ({
  page,
}) => {
  await openHome(page);
  await expect(page.locator(".rn-offer-index button")).toHaveCount(5);
  for (const [title, service] of packageChoices) {
    await choosePackage(page, title);
    await expect(page.locator("#rn-service")).toHaveValue(service);
    await expect(page.locator("#rn-service")).toBeFocused();
    await expect(page.locator(".rn-selected-package strong")).toHaveText(title);
  }
});

test("blank enquiry exposes labelled errors and focuses the first missing field", async ({
  page,
}) => {
  await openHome(page);
  await page.getByRole("button", { name: "Review my enquiry" }).click();
  for (const field of ["service", "name", "phone", "suburb"]) {
    await expect(page.locator(`#rn-${field}`)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    await expect(page.locator(`#rn-${field}`)).toHaveAttribute(
      "aria-describedby",
      `rn-${field}-error`,
    );
    await expect(page.locator(`#rn-${field}-error`)).toBeVisible();
  }
  await expect(page.locator("#rn-service")).toBeFocused();
  await expect(page.locator(".rn-enquiry-review")).toHaveCount(0);
});

test("invalid phone, postcode and optional email cannot reach review", async ({
  page,
}) => {
  await openHome(page);
  await fillVisitor(page);
  for (const phone of ["123", "+1 415 555 0123", "0412 letters"]) {
    await page.locator("#rn-phone").fill(phone);
    await page.getByRole("button", { name: "Review my enquiry" }).click();
    await expect(page.locator("#rn-phone-error")).toBeVisible();
    await expect(page.locator("#rn-phone")).toBeFocused();
    await expect(page.locator(".rn-enquiry-review")).toHaveCount(0);
  }
  await page.locator("#rn-phone").fill(visitor.phone);
  await page.locator("#rn-suburb").fill("123");
  await page.locator("#rn-email").fill("incomplete@");
  await page.getByRole("button", { name: "Review my enquiry" }).click();
  await expect(page.locator("#rn-suburb-error")).toContainText("four digits");
  await expect(page.locator("#rn-email-error")).toBeVisible();
  await expect(page.locator("#rn-suburb")).toBeFocused();
  await expect(page.locator(".rn-enquiry-review")).toHaveCount(0);
});

test("review prepares an accurate email draft without sending data or confirming a booking", async ({
  page,
}) => {
  const mutations: string[] = [];
  page.on("request", (request) => {
    if (/^(POST|PUT|PATCH|DELETE)$/i.test(request.method()))
      mutations.push(request.url());
  });
  await openHome(page);
  await fillVisitor(page, "leather-cleaning");
  await choosePackage(page, "5-seat leather lounge");
  await page.getByRole("button", { name: "Review my enquiry" }).click();
  const review = page.locator(".rn-enquiry-review");
  await expect(review).toBeFocused();
  await expect(review.getByRole("status")).toContainText("Not sent yet");
  await expect(review).toContainText("no booking is confirmed");
  const href = await review
    .getByRole("link", { name: "Send by email" })
    .getAttribute("href");
  const draft = new URL(href!);
  expect(draft.protocol).toBe("mailto:");
  expect(draft.pathname).toBe("contact@cleaningninja.co");
  expect(draft.searchParams.get("subject")).toBe(
    "Cleaning enquiry — Leather cleaning",
  );
  expect(draft.searchParams.get("body")).toBe(
    [
      "Hello Cleaning Ninja, I would like a quote.",
      "",
      "Service: Leather cleaning",
      "Selected package: 5-seat leather lounge",
      `Name: ${visitor.name}`,
      `Phone: ${visitor.phone}`,
      `Suburb or postcode: ${visitor.suburb}`,
      `Email: ${visitor.email}`,
      `Details: ${visitor.details}`,
    ].join("\n"),
  );
  // Inspect the mailto only. Never activate a user's email application.
  expect(mutations).toEqual([]);
});

test("editing a reviewed enquiry retains every entered field and package", async ({
  page,
}) => {
  await openHome(page);
  await fillVisitor(page);
  await choosePackage(page, "3 bedrooms");
  await page.getByRole("button", { name: "Review my enquiry" }).click();
  await page.getByRole("button", { name: "Edit my enquiry" }).click();
  await expect(page.locator("#rn-service")).toBeFocused();
  await expect(page.locator("#rn-service")).toHaveValue("carpet-cleaning");
  for (const [field, value] of Object.entries(visitor)) {
    await expect(page.locator(`#rn-${field}`)).toHaveValue(value);
  }
  await expect(page.locator(".rn-selected-package strong")).toHaveText(
    "3 bedrooms",
  );
  await page.locator("#rn-details").fill("Updated synthetic request.");
  await page.getByRole("button", { name: "Review my enquiry" }).click();
  await expect(page.locator(".rn-review-message")).toHaveText(
    "Updated synthetic request.",
  );
});

test("removing a package or changing service clears stale offer context without losing contact details", async ({
  page,
}) => {
  await openHome(page);
  await fillVisitor(page);
  await choosePackage(page, "3 rugs");
  await page.getByRole("button", { name: "Remove selected package" }).click();
  await expect(page.locator(".rn-selected-package")).toHaveCount(0);
  await expect(page.locator("#rn-service")).toHaveValue("rugs-cleaning");
  await choosePackage(page, "5 bedrooms");
  await page.locator("#rn-service").selectOption("tile-cleaning");
  await expect(page.locator(".rn-selected-package")).toHaveCount(0);
  await expect(page.locator("#rn-name")).toHaveValue(visitor.name);
  await page.getByRole("button", { name: "Review my enquiry" }).click();
  const href = await page
    .getByRole("link", { name: "Send by email" })
    .getAttribute("href");
  expect(new URL(href!).searchParams.get("body")).toContain(
    "Service: Tile & grout cleaning",
  );
  expect(new URL(href!).searchParams.get("body")).not.toContain(
    "Selected package:",
  );
});

test("mobile menu contains keyboard focus and Escape restores its trigger", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openHome(page);
  const trigger = page.getByRole("button", { name: "Open menu" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Mobile navigation" });
  const close = dialog.getByRole("button", { name: "Close menu" });
  await expect(dialog).toBeVisible();
  await expect(close).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await page.keyboard.press("Shift+Tab");
  await expect(
    dialog.getByRole("link", { name: "contact@cleaningninja.co" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("mobile menu links navigate and the floating quote respects hero and form visibility", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openHome(page);
  const floating = page.locator(".rn-floating-quote");
  await expect(floating).toBeHidden();
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Special offers", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page).toHaveURL(/\/#packages$/);
  await expect(floating).toBeVisible();
  await floating.click();
  await expect(page).toHaveURL(/\/#quote$/);
  await expect(page.locator("#rn-service")).toBeInViewport();
  await expect(floating).toBeHidden();
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("dialog", { name: "Mobile navigation" })
    .getByRole("link", { name: "Get a Free Quote", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page).toHaveURL(/\/#quote$/);
  await expect(page.locator("#rn-service")).toBeInViewport();
});

test("reduced motion keeps the story static and never requests its video", async ({
  page,
}) => {
  const mediaRequests: string[] = [];
  page.on("request", (request) => {
    if (/\.(mp4|webm)(?:\?|$)/.test(request.url()))
      mediaRequests.push(request.url());
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openHome(page);
  await expect(page.locator(".rn-site")).toHaveAttribute("data-motion", "off");
  await page.locator("#care-story").scrollIntoViewIfNeeded();
  await expect(page.locator("#care-story .rn-story-room img")).toBeVisible();
  await expect(page.locator("#story-title")).toBeVisible();
  await expect(page.locator("#care-story video")).toHaveCount(0);
  await page.locator("#packages").scrollIntoViewIfNeeded();
  expect(mediaRequests).toEqual([]);
});

test("commercial content uses the sourced percentage and quotes without fabricated dollar prices or proof", async ({
  page,
}) => {
  await openHome(page);
  await expect(page.locator(".rn-discount")).toContainText("up to");
  await expect(page.locator(".rn-discount")).toContainText("30%");
  await expect(page.locator(".rn-offer-details")).toContainText(
    "Tailored quote",
  );
  await expect(page.locator(".rn-offer-details")).toContainText(
    "minimum charges",
  );
  const publicCopy = await page.locator(".rn-site").innerText();
  expect(publicCopy).not.toMatch(/(?:\$|AUD\s*)\s*\d/);
  expect(publicCopy).not.toMatch(
    /50\s*%\s*off|40\s*%\s*off|4\.9|★★★★★|100%\s*bond|10\+\s*years/i,
  );
  await expect(page.locator('.rn-site a[href^="tel:"]')).toHaveCount(0);
  const source = readFileSync("components/homepage/renewal/content.ts", "utf8");
  expect(source).not.toMatch(/(?:\$|AUD\s*)\s*\d/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
});

test("all six FAQs use native details and work with keyboard activation", async ({
  page,
}) => {
  await openHome(page);
  const answers = page.locator(".rn-faq-list details");
  await expect(answers).toHaveCount(6);
  for (let index = 0; index < 6; index += 1) {
    const item = answers.nth(index);
    const summary = item.locator("summary");
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(item).toHaveAttribute("open", "");
    await expect(item.locator("p")).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(item).not.toHaveAttribute("open", "");
  }
});

test("footer legal navigation reaches matching pages with a working route home", async ({
  page,
}) => {
  for (const [label, path, heading] of [
    ["Privacy", "/legal/privacy", "Your privacy matters."],
    ["Offer conditions", "/legal/terms", "Clear from the start."],
  ]) {
    await openHome(page);
    await page
      .getByRole("navigation", { name: "Footer navigation" })
      .getByRole("link", { name: label, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
    await expect(page.locator(".rn-legal-article")).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
    await expect(
      page.getByRole("navigation", { name: "Legal pages" }).getByRole("link"),
    ).toHaveCount(2);
    await page.getByRole("link", { name: "Back to home", exact: true }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      commercialHeadline,
    );
  }
});

for (const width of [390, 1440]) {
  test(`homepage WCAG accessibility scan at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await openHome(page);
    await page.evaluate(() => document.fonts.ready);
    await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
    const violations = await page.evaluate(async () => {
      const axe = (
        window as unknown as {
          axe: {
            run: (
              context: Document,
              options: RunOptions,
            ) => Promise<AxeResults>;
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
}

test.describe("without JavaScript", () => {
  test.use({
    javaScriptEnabled: false,
    contextOptions: { reducedMotion: "no-preference" },
  });

  test("hero and static story remain readable with a usable direct email enquiry", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      commercialHeadline,
    );
    await page.locator("#care-story").scrollIntoViewIfNeeded();
    await expect(page.locator("#story-title")).toBeVisible();
    await expect(page.locator(".rn-story-last")).toHaveCSS("opacity", "1");
    await expect(page.locator(".rn-story-first")).toBeHidden();
    await expect(page.locator(".rn-story-detail")).toHaveCSS("opacity", "0");
    await expect(page.locator("#care-story video")).toHaveCount(0);
    const heading = await page.locator("#story-title").boundingBox();
    const paragraph = await page.locator(".rn-story-last > p").boundingBox();
    const action = await page.locator(".rn-story-last > a").boundingBox();
    expect(heading).not.toBeNull();
    expect(paragraph).not.toBeNull();
    expect(action).not.toBeNull();
    expect(heading!.y + heading!.height).toBeLessThanOrEqual(paragraph!.y);
    expect(paragraph!.y + paragraph!.height).toBeLessThanOrEqual(action!.y);
    await page.locator("#quote").scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("button", { name: "Review my enquiry" }),
    ).toBeDisabled();
    const fallback = page.locator("#quote noscript a");
    await expect(fallback).toBeVisible();
    await expect(fallback).toHaveAttribute(
      "href",
      "mailto:contact@cleaningninja.co",
    );
    await expect(page.locator(".rn-quote-contact")).toHaveAttribute(
      "href",
      "mailto:contact@cleaningninja.co",
    );
    // Read the address only; never open an email application or send a message.
  });
});

test("cinematic film decodes, plays and pauses without moving the page", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await openHome(page);
  await page.locator("#care-story").evaluate((el) =>
    window.scrollTo({
      top:
        el.getBoundingClientRect().top +
        scrollY +
        el.clientHeight -
        innerHeight,
      behavior: "instant",
    }),
  );
  const film = page.locator("#care-story video");
  await expect
    .poll(() => film.evaluate((v: HTMLVideoElement) => v.readyState))
    .toBeGreaterThanOrEqual(2);
  await expect
    .poll(() => film.evaluate((v: HTMLVideoElement) => v.currentTime))
    .toBeGreaterThan(0.1);
  const before = await page
    .locator("#care-story")
    .evaluate((el) => ({ height: el.clientHeight, y: scrollY }));
  await page.getByRole("button", { name: "Pause film", exact: true }).click();
  await expect
    .poll(() => film.evaluate((v: HTMLVideoElement) => v.paused))
    .toBe(true);
  const after = await page
    .locator("#care-story")
    .evaluate((el) => ({ height: el.clientHeight, y: scrollY }));
  expect(after.height).toBe(before.height);
  expect(Math.abs(after.y - before.y)).toBeLessThan(3);
  await page.getByRole("button", { name: "Play film", exact: true }).click();
  await expect
    .poll(() => film.evaluate((v: HTMLVideoElement) => v.paused))
    .toBe(false);
  await page.locator("#home").scrollIntoViewIfNeeded();
  await expect
    .poll(() => film.evaluate((v: HTMLVideoElement) => v.paused))
    .toBe(true);
});

test("data-saving preference avoids downloading the atmosphere film", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "connection", {
      value: { saveData: true, effectiveType: "4g" },
      configurable: true,
    }),
  );
  const requests: string[] = [];
  page.on("request", (r) => {
    if (r.url().includes(".mp4")) requests.push(r.url());
  });
  await openHome(page);
  await page.locator("#care-story").scrollIntoViewIfNeeded();
  await expect(page.locator("#care-story video")).toHaveCount(0);
  await expect(page.locator(".rn-story-caption")).toContainText("Still view");
  expect(requests).toEqual([]);
});

test("commercial opening shows the service, offer and free-quote action above the desktop fold", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await openHome(page);
  await page.evaluate(() => document.fonts.ready);
  const headline = page.getByRole("heading", { level: 1 });
  await expect(headline).toHaveText(commercialHeadline);
  await expect(headline).toBeInViewport({ ratio: 1 });
  const headerQuote = page.locator(".rn-header-quote");
  await expect(headerQuote).toHaveText("Get a Free Quote");
  await expect(headerQuote).toHaveAttribute("href", "#quote");
  await expect(headerQuote).toBeInViewport({ ratio: 1 });
  const announcement = page.locator(".rn-announcement");
  await expect(announcement).toContainText(
    "Up to 30% off selected cleaning packages",
  );
  await expect(announcement).toHaveAttribute("href", "#packages");
  await expect(announcement).toBeInViewport({ ratio: 1 });
  await expect(
    page
      .getByRole("form", { name: "Start your free quote" })
      .getByRole("button", { name: "Get a Free Quote", exact: true }),
  ).toBeInViewport({ ratio: 1 });
});

for (const width of [390, 1440]) {
  test(`commercial opening quote starter hands service and suburb to contact details at ${width}px without sending`, async ({
    page,
  }) => {
    const mutations: string[] = [];
    page.on("request", (request) => {
      if (/^(POST|PUT|PATCH|DELETE)$/i.test(request.method()))
        mutations.push(request.url());
    });
    await page.setViewportSize({ width, height: 900 });
    await openHome(page);
    const starter = page.getByRole("form", {
      name: "Start your free quote",
      exact: true,
    });
    await expect(
      starter.getByRole("combobox", { name: "What would you like cleaned?" }),
    ).toHaveAttribute("id", "rn-start-service");
    await expect(
      starter.getByRole("textbox", { name: "Your suburb or postcode" }),
    ).toHaveAttribute("id", "rn-start-suburb");
    await page.locator("#rn-start-service").selectOption("upholstery-cleaning");
    await page.locator("#rn-start-suburb").fill("  New Farm 4005  ");
    await starter
      .getByRole("button", { name: "Get a Free Quote", exact: true })
      .click();
    await expect(page.locator("#rn-service")).toHaveValue(
      "upholstery-cleaning",
    );
    await expect(page.locator("#rn-suburb")).toHaveValue("New Farm 4005");
    await expect(page.locator("#rn-name")).toBeFocused();
    await expect(page.locator("#rn-name")).toBeInViewport();
    await expect(page.locator("#rn-name")).toHaveValue("");
    await expect(page.locator(".rn-selected-package")).toHaveCount(0);
    await expect(page.locator(".rn-enquiry-review")).toHaveCount(0);
    expect(mutations).toEqual([]);
  });
}

test("commercial opening quote starter blocks missing service and suburb with native validation", async ({
  page,
}) => {
  await openHome(page);
  const starter = page.getByRole("form", {
    name: "Start your free quote",
    exact: true,
  });
  const service = page.locator("#rn-start-service");
  const suburb = page.locator("#rn-start-suburb");
  await suburb.fill("4005");
  await starter
    .getByRole("button", { name: "Get a Free Quote", exact: true })
    .click();
  await expect(service).toBeFocused();
  expect(
    await service.evaluate(
      (element: HTMLSelectElement) => element.validity.valueMissing,
    ),
  ).toBe(true);
  await expect(page.locator("#rn-service")).toHaveValue("");
  await expect(page.locator("#rn-suburb")).toHaveValue("");
  await service.selectOption("rugs-cleaning");
  await suburb.fill("");
  await starter
    .getByRole("button", { name: "Get a Free Quote", exact: true })
    .click();
  await expect(suburb).toBeFocused();
  expect(
    await suburb.evaluate(
      (element: HTMLInputElement) => element.validity.valueMissing,
    ),
  ).toBe(true);
  await expect(page.locator("#rn-service")).toHaveValue("");
  await expect(page.locator(".rn-enquiry-review")).toHaveCount(0);
});

test("commercial opening native service menu lists all services, selects their group and closes with Escape", async ({
  page,
}) => {
  await openHome(page);
  const menu = page.locator("details.rn-services-menu");
  const summary = menu.locator("summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("open", "");
  await expect(menu.locator(".rn-dropdown-list").getByRole("link")).toHaveCount(
    11,
  );
  await menu
    .getByRole("link", { name: "Carpet cleaning", exact: true })
    .focus();
  await page.keyboard.press("Escape");
  await expect(menu).not.toHaveAttribute("open", "");
  await expect(summary).toBeFocused();

  for (const group of serviceGroups) {
    for (const [id] of group.services) {
      await summary.click();
      const item = menu.getByRole("link", {
        name: fullServiceNames[id],
        exact: true,
      });
      await expect(item).toHaveAttribute("href", "#services");
      await item.click();
      await expect(menu).not.toHaveAttribute("open", "");
      await expect(
        page.getByRole("tab", { name: group.label, exact: true }),
      ).toHaveAttribute("aria-selected", "true");
      await expect(
        page.locator(`[aria-controls="service-${id}"]`),
      ).toHaveAttribute("aria-expanded", "true");
      await expect(page.locator(`#service-${id}`)).toBeVisible();
      await expect(page).toHaveURL(/\/#services$/);
    }
  }
});

test("commercial opening quick offer navigation selects the matching package in the folio", async ({
  page,
}) => {
  await openHome(page);
  const quickOffers = page.getByRole("navigation", {
    name: "Quick access to special offers",
    exact: true,
  });
  await expect(quickOffers.locator(".rn-offer-preview-links a")).toHaveCount(5);
  for (const [title, service] of packageChoices) {
    await quickOffers
      .getByRole("link", { name: new RegExp(`^${title}`) })
      .click();
    await expect(page).toHaveURL(/\/#packages$/);
    await expect(page.locator(".rn-offer-details h3")).toHaveText(title);
    await expect(
      page
        .locator(".rn-offer-index")
        .getByRole("button", { name: title, exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await page
      .getByRole("button", { name: "Get this offer", exact: true })
      .click();
    await expect(page.locator("#rn-service")).toHaveValue(service);
    await expect(page.locator(".rn-selected-package strong")).toHaveText(title);
  }
});
