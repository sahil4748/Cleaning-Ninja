# Performance baseline and proposed budget

Measured 2026-09-21 from local locked production build. No optimisation or bundle-analyser dependency added.

| Artifact | Baseline |
|---|---:|
| Emitted client JS chunks, all routes | 31 |
| Total emitted JS, uncompressed | 1,599,216 bytes |
| Sum of individually gzip-compressed chunks | 487,131 bytes |
| Emitted WOFF2 fonts | 11 files; 277,856 bytes |
| Public brand assets | 8 files; 2,338,819 bytes |
| Remote image URL references | 43 distinct Pexels URLs |
| Shipped video / frame sequences / 3D models | None found |

Whole-build sizes are not route transfer cost. Gzip sums are offline estimates, not observed CDN compression. No Lighthouse, RUM/CrUX, throttled mobile, bundle treemap or CPU/GPU profile was available/configured. Browser samples, if present in baseline-checks.md, are unthrottled single local runs with mixed cache/image behavior and must not be used as production scores.

Risks: heavy client homepage, Motion+GSAP+Lenis overlap; root loader and custom cursor on every route; hero/wipe/cursor continuous loops; GSAP comparison triggers; raw brand PNGs (logo.png about 1.4 MB, even though not necessarily loaded on every route); build-dependent fonts; remote photo reliability. Browser/server audit observed timeouts while images loaded. 11 emitted font files reflect subsets/styles, not 11 necessarily requested at once. No third-party analytics script or active video/WebGL found.

Unused candidates: three, @types/three and dotlottie have no application imports; no R3F/drei installed. Do not infer their full package size is downloaded. npm ls flags @emnapi/runtime extraneous while exiting 0. Duplication/unused findings require later dependency-graph review before removal.

## Proposed targets — not measured results or approved implementation

- Representative mobile target: LCP ≤2.5s, CLS ≤0.1, interaction latency ≤200ms; establish repeatable throttled and field measurements before enforcing.
- Initial route JS target ≤250 KiB compressed; initial font payload ≤120 KiB; mobile hero still ≤200 KiB; initial page transfer ≤1 MiB. Review against an approved visual plan, not arbitrary package removal.
- Zero forced loader wait; no automatic mobile WebGL/video requirement; no all-frame preload. Each cinematic feature needs a media budget and static/reduced-motion fallback.
- Pause offscreen work, avoid decorative pointer replacement in form flows, and justify any new library against CSS/Motion first.

No performance claim is certified by passing next build. Re-measure when lead integrations, content/media or motion change.
