# H-01 final static cleanup

2026-09-27 · rebuild-2026. Owner-approved desktop production base; no release performed.

- **Logo limitation:** a deterministic trial removed border-connected near-ivory pixels while retaining enclosed illustration highlights. Inspection on a dark background revealed pale edge fringes; the unchanged charcoal wordmark also lost contrast against H-01. No trial derivative was shipped. Original logo files and current backing remain unchanged, verified by SHA-256. A clean transparent master would be needed to remove the backing reliably without compromising the identity.
- **Image label:** desktop hero badge hidden. The decorative image retains empty alt text within its aria-hidden media wrapper. Internal illustrative classification is unchanged; this is not job evidence.
- **1440×900 ending:** hero fills 900px. Centred cover crops approximately 5.3% from each side, with no additional zoom transform. The threshold stays clear of the headline. This adjustment is limited to 1400–1500px widths and 850–950px heights.
- **Other compositions:** 1366×768, 1728×1000 and 1920×1080 retain their prior framing. Mobile and lower sections are unchanged.
- **Cut:** polygon coordinates unchanged. Only the preview layer's source-to-screen mapping follows the new cover size at the affected breakpoint.
- **Preserved:** H-01 checksum, headline words, font families, CTA styling, navigation structure and original logo pixels.

Application change: `app/homepage.css` only. The two screenshots below capture the final composition; Next.js developer tooling was hidden for capture.

- [1440×900](h01-final-static-screenshots/hero-1440.png)
- [1920×1080](h01-final-static-screenshots/hero-1920.png)

Validation: typecheck, lint (0 errors / 70 existing warnings), content/preview release checks, production build and all 20 unit tests passed. All 16 focused Chromium homepage tests passed, including mobile regressions. All four requested desktop sizes were inspected locally with no page errors. Database/email delivery credentials were disabled for checks. Original H-01 SHA-256 remains `5c7871e1b311271575ad1e7b483044e9f47fb350a15852e052f203316b923cff`.

No deployment, merge, Higgsfield, generated imagery or video.
