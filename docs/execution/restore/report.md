# Cleaning Ninja — Order, restored

3 October 2026 · `rebuild-2026` · local only, no deployment.

**Thesis.** Cleaning Ninja restores order. One locked-off room moves from disorder to calm as the visitor scrolls: haze, grime and clutter resolve into the same room, clean, as a noise-edged front of light crosses it (from the window on desktop, from the floor upward on mobile). No slider, no sparkle.

**Implementation.** `components/homepage/restore/` (Restore.tsx, RoomStage.tsx WebGL shader, Mark.tsx, restore.css), wired from `app/page.tsx`. Business content, the quote panel (user-controlled email draft, never claims delivery), legal routes, backend, noindex and release guards are reused unchanged from `components/homepage/renewal/`.

**Update 3 Oct (no tint):** the grey/teal grading was dropped. The room was regenerated in natural white with a deep-teal (#06768D) velvet chair as the brand colour, and two locked-off Seedance 2.5 films (disorder, order) now drive the shader on desktop, so the room itself moves. Mobile keeps stills (lower motion intensity). Data-saver, slow-connection and reduced-motion visitors keep stills. Credits: 4 images (11) + 2 films (120) = 131; balance 734.75 → 603.75.
  - after-wide/before-wide are frame 0 of the films (continuity); after-tall job 4acd6e9d-ac65-4e0d-b7ce-9aa12878f2e4, before-tall a4d54eb1-2e88-459f-863f-831f560e7b60; wide source stills 7e66fc63-6ee3-44fe-946d-ce2054eeb4d5 / da9f4e36-aedb-4bfc-9b8b-5ad8f20459fe; films after 0e09fe62-8bf5-4376-9313-e24d95a04fc5, before b163660c-5a65-4778-874e-906b0fcd623f (HEVC → H.264 via avconvert).
  - Service photos are the earlier natural stills until the owner supplies the set in `image-requests.md`.

**Identity.** New negative-space N-in-a-room mark and wordmark; Instrument Serif + Hanken Grotesk; ivory, linen, light sage, deep olive, warm charcoal.

**Media (Higgsfield, gpt_image_2_5, 2K, high; 4 × 2.75 = 11 credits).** Project `b6bcbe6e-fa01-41f4-ab22-6e7e1747bad0`.
- after-wide.webp — job 542c8985-0d13-4fc2-ba9d-677d734beac8
- after-tall.webp — job f0c3c35a-f809-4723-ba0a-311109c1f867
- before-wide.webp — job 8b05e3ef-ba81-4815-a87c-9aa6e1648e3c (edit of after-wide)
- before-tall.webp — job 07bb4d8b-22a6-4923-a8c3-18e107147bcf (edit of after-tall)
Service imagery reuses the earlier renewal stills plus crops of the new room. All is editorial imagery, not customer work.

**Facts not published by the source (not invented):** dollar prices, offer expiry, minimum-charge amount. "Up to 30% off" and package scopes are the owner-adopted source terms.

**Checks.** tsc, production build, 23 unit tests, 5 new Playwright tests (`playwright.restore.config.ts`, port 8143), lint 0 errors. `tests/renewal-homepage.spec.ts` targets the superseded page. Browser-inspected at 1440 and 390 plus reduced motion.

**Deals section (3 Oct):** redesigned as an image-led stage — crossfade (1.4s) with slow transform-only drift (1.14→1.03), light scroll parallax (±3%), masked copy rise on change, thumbnail rail, swipe/arrow/keyboard control, no scroll-jacking; reduced motion is a static image. Copy cut to name, four keyword chips, "Up to 30% off" and one CTA; conditions stay in a one-line note plus "Package terms". Six Higgsfield stills (gpt_image_2_5, 2K, 16.5 credits): jobs f57137a8-0427-47fc-892e-3eba6781dd17, 0f6257de-6acd-454b-bdfb-ea5f46de59f1, 6b91b7b8-756c-45ae-9bfb-25456a029830, 2268b57d-bf70-4357-accb-e354ec2888dc, ab96c63f-9e6f-4fd3-a450-400bcee17058, 64a81f15-5e73-4fae-9084-93ecea373382. Only the Deals JSX/CSS changed.

**Free quote section (3 Oct):** rebuilt as `components/homepage/restore/QuotePanel.tsx` + `quote.css` (renewal QuotePanel untouched; same validation, review step and user-controlled mailto). Image-led split (resolved-room photo, no new generation) + refined card; pill CTA; the native select replaced by a styled, keyboard-complete listbox (select-only combobox: arrows, Home/End, type-ahead, Esc, outside click, flips upward near the viewport bottom). Field set unchanged (3 required + suburb, 2 optional). Research: keep ≤5 visible fields, single-choice controls, premium whitespace/hierarchy, instant feedback.
