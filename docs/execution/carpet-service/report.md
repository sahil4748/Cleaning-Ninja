# Carpet Cleaning service page

Latest implementation: [8 October premium scrolling refinement](refinement-report.md), with [passing cross-browser QA](qa-report.md). The chronological notes below describe earlier iterations; the latest refinement supersedes their motion behavior and verification limits.

6 October 2026. Local implementation on `codex/service-pages`, based on verified remote/local `main` commit `f647b4d7e6ca15b8c384f46ffb5e9a3cf78ca2bd`. That commit's latest Vercel production build was READY when inspected. No deployment, push or merge was performed.

## Scope and content

Only `/services/carpet-cleaning` is rebuilt. Homepage source, homepage CSS, homepage assets and `app/page.tsx` are unchanged. The shared shell adds one exact route exception; retired routes remain redirected.

Primary reference: https://blueskycarpetcleaning.com.au/services/carpet-cleaning/. Its information sequence is retained: service opening, five package offers, overview, cleaning methods, care differentiators, quote invitation and footer. The reference's third-party prose is not copied verbatim. The service overview/methods/care copy is original (approximately 155 words including headings). Existing owner-authorised package content is reused from `components/homepage/renewal/content.ts`. Competitor testimonials, identity, phone, credentials, warranty, safety and availability claims are not transferred. No invented reviews are displayed.

The page inherits the actual current teal/ivory identity, supplied SVG logos, Instrument Serif and Hanken Grotesk. Burnished copper quote actions contrast with the teal surfaces. Native disclosures, ordinary scrolling and background film provide the interaction; no dependency was added to the application.

## Film

Higgsfield job: `2965ffff-6a9e-497f-a804-e4007f648d30`, Seedance 2.5. One generation submitted after a 120-credit cost preflight. Requested 10 seconds, 1080p, 16:9, silent continuous extraction pass. Returned duration approximately 10.04 seconds at 1920 × 1080, 24 fps. This is illustrative service media, not evidence of a completed customer job.

Equipment geometry, carpet contact, texture, lower-body anatomy and framing were inspected across generated frames. Local encodes under `public/media/carpet-cleaning/`:

- `film.mp4`: H.264, 1920 × 1080, about 3.7 MB.
- `film-mobile.mp4`: independently framed centre crop, 720 × 1280, about 1.4 MB.
- `poster.webp`: about 101 KB.
- `poster-mobile.webp`: about 39 KB.

Both videos use fast-start MP4 and omit audio. A temporary media utility was installed under `/private/tmp/carpet-media-tools`; it is not a project dependency. The large source MP4 remains under `/private/tmp`, outside Git. Posters appear before playback; reduced-motion, Save-Data and slow connections suppress automatic loading. Offscreen/hidden-page playback pauses.

## Quote and route behaviour

The independent service form reuses `LeadSchema` and `submitLead` without editing the homepage form or backend. It defaults to Carpet Cleaning and supplies `leadSource: service-page` and `sourcePage: /services/carpet-cleaning`. Package choices retain their display context. The existing canonical catalogue has no separate rug ID, so a rug-package enquiry uses its existing carpet service relationship and includes the visible rug/package description.

Name, Australian phone and suburb/address are required; email, details and requested date are optional. Date preferences use the existing request-only booking contract and Brisbane time. Validation focuses the first invalid field. Inputs and idempotency keys survive failure; accepted status requires the existing durable-ID response. Package controls lock during submission. No booking confirmation is invented. JavaScript-disabled visitors receive an email fallback.

The exact page bypasses LegacyShell. Its canonical, social metadata and Service/Breadcrumb schemas are route-specific. Existing preview `noindex, nofollow` remains; the sitemap and release state were not changed. Media URLs use `/media/` so the retired `/services/*` redirect does not intercept them.

## Verification

- Typecheck: passed.
- Production build: passed after final implementation fixes.
- Repository lint: passed, 0 errors and 62 existing warnings.
- Targeted new/changed-file lint: passed with 0 warnings.
- Content check: passed in existing warning-only mode, 0 critical/high findings; schema identifier spelling triggers a source-code false positive.
- Focused browser run: 8/8 passed, including five Carpet tests and three current homepage regressions.
- Desktop 1440 and mobile 360/390: no document overflow; decoded posters and direct video responses checked; full-page captures at 1440 and 390 visually reviewed.
- The initial run verified reduced-motion explicit playback/pause, package context, requested-date semantics, unavailable → retry → durable acceptance, stable idempotency, disabled package controls and console/runtime checks.
- Unit suite: 22/23 passed. The pre-existing `tests/unit/readiness.test.ts:75` failure expects release readiness to reject production even though current `main` records APPROVED with no blockers. Release behaviour was preserved; the unrelated historical expectation was not rewritten.
- `git diff --check`: passed. Existing `.gitignore` edit was preserved.

Browser submissions used synthetic data and mocked local responses, with other writes blocked. Test/preview database and email credentials are empty; no real lead, email or notification was sent. These checks do not claim live provider delivery or field performance.

Local evidence lives under `.local-evidence/carpet-service/` (ignored): build/lint/typecheck/browser logs, `desktop-1440.png` and `mobile-390.png`.

## 8 October refinement

At the owner's request, removed the film playback button and the visible "Illustrative service film" caption. Reduced-motion and data-saving visitors retain the poster fallback. Primary quote buttons now use burnished copper `#a64c35` with ivory `#fff8ec` text (5.37:1 contrast), a champagne circular arrow badge and a small hover/focus movement. No continuous button animation was added. The sticky header and existing mobile quote bar keep the quote action within reach; homepage files remain unchanged.

Refinement verification: typecheck, targeted lint, production build and all five focused browser tests passed. Desktop 1440 and mobile 360/390 captures were reviewed; the existing in-app browser was refreshed to the updated build. The browser checks cover absent control/caption, reduced-motion poster-only behaviour, quote access, retries and package/date context. Logs use the `refinement-` prefix in the existing ignored evidence directory.

## 8 October hero and scroll pass

The owner requested a more immediate visual hook and a cinematic transition without losing service clarity. The hero now separates a bright ivory statement from the unshaded service film. A large red sans-serif "Carpet" headline pairs with the existing ink serif "cleaning."; the vague tagline is replaced by "Steam cleaning. Stain treatment. Carpet care." Mobile presents the service and quote action before a wide film window. Copper primary actions and the sticky header remain.

A shaded, extruded SVG arrow leads to offers using a native anchor. A small local hook updates one CSS progress property through passive native scrolling and requestAnimationFrame: the film gently scales into a rounded frame, the statement lifts and the arrow changes its perspective. The scroll distance is 240px desktop, 160px tablet and 120px mobile. The offers enter with a curved upper edge. Scrolling, quote access and browser navigation remain native; no runtime dependency was added. Reduced motion removes the sticky interval and transformations and retains the still poster. The previously removed film button and visible caption remain absent.

The attached Blue Sky screenshot and https://threeui.com/ were reviewed for visual hierarchy and purposeful dimensional interaction. No competitor claims, reviews or contact details were introduced. Homepage code, APIs, media sources and release settings remain unchanged by this pass.

Final verification: targeted lint, typecheck, production build and all five focused browser tests passed. Responsive checks cover 320/360/390/768/1024/1440px; captures include desktop/mobile openings, tablet, 1024px and the half-scroll state. Tests verify progress, visible header quote access, the native arrow landing, reduced-motion static layout and unchanged quote retry/package/date semantics. The 320px arrow was lowered to separate its hit target from the quote button. Capture helpers wait for completed poster-to-film opacity before pausing the local video. One rebuild hit a generated Turbopack Google-font import-map error in unchanged legacy legal-page code; archiving `.next` under `/private/tmp/cleaning-ninja-next-20261008-carpet-hero` and retrying the normal build succeeded. No tooling configuration or dependency changed. Logs use the `hero-` prefix in the ignored local evidence directory.

## 8 October full-frame correction

The owner rejected the split/stacked composition and the changed headline typography/colours. The film now fills the complete hero at every breakpoint with the text layered over it. Both title words use the established Instrument Serif; the normal white "Carpet" and italic pale-mint "cleaning." sit over a soft deep-teal scrim using the actual homepage palette. The cream statement surface, red headline and sans-serif title override are removed. The copper quote action remains the warm accent requested earlier. The smaller dimensional arrow now uses teal/mint and sits within the film rather than on a text/video seam. Native scroll framing and the complete quote flow are retained. Homepage files remain unchanged.

Typecheck, targeted lint, production build and all five focused browser tests passed. Tests additionally require full-frame film geometry, text contained within the film and the established serif across every title word. Responsive checks cover 320/360/390/605/768/1024/1440px; the 605 × 720 capture matches the narrow browser composition in the owner's annotation. Final captures and `overlay-` logs live in the ignored evidence directory. The local preview was restarted with providers disabled; the film control and visible illustrative caption remain absent.

## 8 October clean-carpet still reveal — rejected by owner

The owner requested a scroll transition that communicates the service result, rather than a small squeeze of the film. The full-frame cleaning footage now gives way to a matched clean-carpet scene through a soft reveal from the bottom upward. The original title and teal scrim fade out, then the existing “A fresh start underfoot.” statement appears over the clean room before the offers enter. The film keeps its full dimensions throughout; no framing scale or rounded film window remains. The initial overlay, Instrument Serif/Hanken Grotesk typography and teal/ivory/mint identity are preserved. The header quote action remains visible during the entire sequence.

Native scroll progress follows the actual position over approximately 135 ms, reverses naturally, and stops scheduling frames when settled. It drives four local CSS variables with a short reveal interval, a text exit, and a result entrance. No scroll hijacking, animation framework or dependency was added. Invisible hero controls leave the tab order; if a focused hero action is about to disappear, focus transfers to the visible header quote action. Reduced motion retains the static original poster and ordinary page flow without the additional scroll interval or result overlay.

Matched scene created with the built-in image generation tool in edit mode, using `public/media/carpet-cleaning/poster.webp` as the reference. One generation. Reviewed against the film frame for room geometry, perspective, furniture, carpet texture and natural lighting. The scene is illustrative, not a documented customer before/after or evidence of a specific cleaning outcome. Saved assets: `public/media/carpet-cleaning/clean.webp` (1920 × 1080, approximately 112 KB) and `clean-mobile.webp` (720 × 1280, approximately 45 KB). The portrait uses the same centre crop as the film poster. Original generation remains outside the project at `/Users/arsh/.codex/generated_images/01a11257-12f8-7581-889b-4fce4e38548a/exec-bbf8c091-ba25-41a9-8988-1a5f16a34a1c.png`.

Verification: typecheck, targeted lint (zero warnings), production build including content/release checks, and all five focused browser tests passed. Tests cover 320/360/390/605/768/1024/1440px, initial/mid/result/reverse states, full-frame film and clean-image geometry, image decoding and direct media responses, reduced-motion layout, focus handoff, header quote visibility, and unchanged quote retry/package/date contracts. Initial, intermediate and clean-result captures at 1440/390/605px were reviewed. No unexpected browser console/runtime errors or unmocked writes occurred. Evidence uses the `reveal-` log prefix and `result-`/`transition-` images in the ignored local evidence folder. Homepage diff remains empty. A fresh `.next` build was used to avoid the earlier font-cache failure; previous generated output is recoverable at `/private/tmp/cleaning-ninja-next-20261008-clean-reveal`.

### Final image prompt

> Edit the supplied cinematic carpet-cleaning film frame into the exact same room immediately after the technician has left. Make one tightly controlled object removal edit: remove the technician's legs and shoes, the metal carpet extraction wand, and all black hoses. Replace only those removed regions with a naturally clean, freshly groomed beige carpet continuing the existing carpet plane, perspective, fibre scale, colour and lighting. Preserve the original room, camera position and low angle, exact 16:9 composition, sofa on the left, curtain and window shapes, wall, depth of field, sunlight and neutral colour grade. The original furniture and carpet must stay in precisely the same screen positions so the two images can be layered for a seamless scroll reveal. Preserve believable carpet texture with restrained groomed nap; no bleaching, stripes, sparkles, impossible cleanliness, extra furniture, text, logos, people, or tools. Photorealistic premium interior still, realistic and understated. Output landscape 16:9, matching the input framing.

## 8 October scroll-controlled film — superseded

The owner clarified that cleaning and the clean-carpet result must happen inside the video as scrolling progresses. Removed the separate clean-room picture, wipe mask and additional hero headline. Native scrolling now advances the actual paused film timeline; scrolling upward reverses it. The existing hero title and scrim leave the footage clear during the pass. The film keeps its full frame, the header quote action remains visible, and the original typography, identity, content sections and homepage are preserved. The opening holds the first decoded frame until scrolling starts; automatic looping is removed so playback cannot fight the scroll position.

Higgsfield forward extension: Seedance 2.5 job `6f554641-f2d3-466b-b853-8191bc7823d2`, based on original film job `2965ffff-6a9e-497f-a804-e4007f648d30`. One five-second 1080p generation after a 60-credit preflight. The technician physically finishes the pass, lifts the wand and walks out to the right with the equipment, leaving groomed carpet visible in the same continuous shot. First-frame continuity, room geometry, equipment, movement and the final carpet view were inspected independently. This remains illustrative service media, with no customer before/after claim. A short final hold keeps the unobstructed carpet in view before the offers enter. No still-image overlay or new narrative headline appears in the opening.

The hook maps native smoothed progress to the film's duration. It keeps only the latest seek target, allows one seek at a time and flushes that target on the media `seeked` event. Frames stop when position settles or the hero/page is hidden. Reduced motion, Save-Data, slow connections and media errors retain the original poster and natural page flow without an extra scroll interval. The scroll stage becomes sticky only after the film can decode a frame. Keyboard focus transfers to the header quote action before disappearing hero controls are hidden.

The original movie and rejected generated stills are retained in ignored `.local-evidence/carpet-service/original-film/` and `retired-still-reveal/`. The application references only the film and original posters. The new continuation source remains outside Git at `/private/tmp/carpet-cleaning-extension.mp4`.

Web encodes combine the original footage and continuation into a 16.5-second timeline including a 1.5-second final hold. Desktop is 1600 × 900; mobile is 720 × 1280. Both use H.264 at 30 fps, a keyframe every three frames, no B-frames or audio, and fast-start MP4. This gives seeking frequent decode points without shipping a frame-sequence application. An explicit constant frame rate before the closing hold fixes the variable-rate concat output initially omitting that hold.

Final verification: typecheck, targeted lint with zero warnings, production build including content/release checks, and five focused browser tests passed. The browser checks compare decoded video frames at early/mid/end positions, require actual media time to follow scroll and reverse, and retain full-frame geometry, focus handoff, visible quote access, poster-only reduced motion, schema/content and synthetic quote retry/package/date checks. Responsive widths are 320/360/390/605/768/1024/1440px. Reviewed the mid/end desktop and mobile frames and the unobstructed final desktop frame after correcting the closing hold. No runtime/console errors or unmocked writes occurred. Logs use the `scrub-` prefix; final captures use `video-mid-` and `video-end-`. Film sizes are approximately 8 MB desktop and 4.4 MB mobile. Homepage diff remains empty; release and backend settings were preserved. Local preview was restarted with providers disabled.

The existing in-app preview was refreshed and native wheel scrolling verified the media at approximately 0 → 9 → 15.5 seconds, then back to its first frame. A separate 13.28-second browser recording at 1280 × 800 shows the native forward/reverse interaction: `.local-evidence/carpet-service/scroll-demo.mp4`. Its browser recorded zero runtime errors and zero non-GET/HEAD attempts; no real form submission was made.

### Video extension prompt

> Continue the exact carpet-cleaning footage seamlessly from its final frame. One uninterrupted photorealistic shot in the same room with the same beige sofa, curtains, beige carpet, daylight, low camera height and colour grade. The professional technician completes the extraction pass with the existing metal wand touching the carpet, then lifts the wand slightly, draws the hose with it and walks away to the right until the wand, hose and shoes leave the frame. Finish with an unobstructed close view of the freshly groomed carpet, its natural fibres and restrained extraction tracks; let the camera settle gently and hold the clean carpet for the final two seconds. Preserve equipment geometry and natural body movement. No cuts, no dissolves, no image transitions, no text or graphics, no new person or furniture, no artificial dirt transformation, bleaching, sparkles or change in carpet colour. The result must happen inside the continuous video through the real movement of the technician and equipment, with understated cinematic realism.

Implementation references: [HTMLMediaElement currentTime](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime), [seeked event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeked_event), [FFmpeg codec options](https://ffmpeg.org/ffmpeg-codecs.html#libx264).

## 8 October controlled cleaning pass — current candidate

The owner rejected the rapid technician movement and disappearing service text. This revision removes the entire walk-away extension and uses only seconds 3–7 of the original Higgsfield film: one continuous extraction pass with the wand touching the carpet and natural grooming visible alongside it. The four-second source interval is slowed to ten seconds, with motion interpolation for smooth intermediate frames. Small stance adjustments remain; no lift, exit or walk-away appears. No further generation or credits were used. The replaced encodes remain recoverable in ignored `.local-evidence/carpet-service/retired-walk-away-film/`.

The title, summary, breadcrumb, quote action and teal scrim stay visible throughout the pinned shot. Existing fonts, colours and page content are preserved. Native scrolling still controls the actual paused movie, but a separate media cursor advances or reverses at no more than 1.5 movie seconds per second. With the 0.4× retimed source, even a fast scroll cannot rush the physical action past 0.6× its original speed. The longer scroll interval gives the pass room to unfold. Scrolling remains native and can leave the hero immediately; offscreen and hidden-page activity stops, and the cursor catches up gradually on returning. All text hiding, scroll-driven copy opacity and focus transfer were removed. Reduced motion and unavailable media retain a static poster and ordinary page flow.

The web films are H.264 fast-start MP4s with frequent keyframes, no B-frames and no audio: 1600 × 900 desktop (approximately 6.3 MB) and 720 × 1280 mobile (approximately 2.7 MB). Posters were extracted from the new opening frame, at the matching landscape and portrait sizes. Both complete encodes decode successfully; the timeline is ten seconds.

Verification: typecheck, targeted lint with zero warnings, production build including content/release checks, and all five focused browser tests passed (2.3 minutes). Checks cover the fast-scroll media speed bound, real decoded-frame changes, forward and reverse seeking, continuously visible service copy, retained hero-quote focus, full-frame video, 320/360/390/605/768/1024/1440px layouts, reduced motion and Save Data poster fallback, metadata/content, and synthetic quote retry/package/date contracts. No runtime/console errors or unmocked writes occurred. Desktop and portrait midpoint/end captures were reviewed. Unit tests remain at 22/23 with the previously recorded production release-guard assertion failure; this refinement does not touch the guard or its test. Logs use the `slow-pass-` prefix; current captures use `video-mid-` and `video-end-`. Homepage diff remains empty. The local preview was restored with providers disabled, and its existing in-app tab was refreshed. Native wheel input selected a gentle intermediate movie frame with the copy still fully visible, then reversed to the opening.

Current proof: `.local-evidence/carpet-service/slow-pass-demo.mp4`, a 24.44-second 1280 × 800 H.264 browser recording at real playback speed. Native wheel input moves forward over 9.5 seconds to 90% of the scroll interval, holds briefly and reverses over 7.5 seconds. Movie samples progress from 0 to 4.51 to 8.96 seconds, then return to 0.007. Service text and the hero quote action remain fully visible in all 21 sampled phases. There were zero browser errors, text visibility issues or non-GET/HEAD attempts. Mid/end screenshots and JSON samples accompany the recording in the ignored evidence folder. This supersedes the earlier `scroll-demo.mp4` proof.
