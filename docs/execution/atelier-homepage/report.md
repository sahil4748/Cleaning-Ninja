# The Art of the Reset — frontend build

29 September 2026 · `rebuild-2026` · starting commit `e563962`

Cleaning Ninja now has a new photographic direction built around warm beige, light olive, tactile materials and a clear path to an enquiry. The homepage and matching privacy/terms presentation replace the previous visual system. The intended effect is a progression from the feeling of home to the surfaces, services and practical details behind a clean.

The identity combines a large lowercase masthead, a compact new mark, Geist and Instrument Serif. The layered hero pairs an architectural room scene with an inset fabric photograph. Its new five-second desktop film loads after the poster, plays once and holds rather than repeatedly cutting back to the opening frame. Mobile uses a separately composed crop and static hero treatment. Reduced motion, saved data, slow connections and the page motion control preserve a still experience where applicable.

The full page includes an image-led service accordion; five quote-first package choices; the GSAP aperture sequence, “Make room for living”; a cleaning film; a commercial scene; a three-part process; a suburb/postcode enquiry; native FAQ disclosures; and a one-screen quote form. Selection controls prefill the enquiry, and the coverage entry carries the suburb forward without claiming service eligibility. The active homepage displays no sample prices, discounts or placeholder telephone number. Existing isolated prototype data is not promoted into business truth or structured offers.

Submitting the form prepares a review of the enquiry. A separate “Send by email” action opens the visitor’s email app; the interface explicitly states that the enquiry has not yet been sent. Editing preserves entered details. No real lead, customer message or business notification was sent during verification. The matching legal pages use the new typography, mark, header and restrained footer; the pricing paragraph now reflects the quote-first display.

Research informed the composition rather than supplying copied layouts: [Norm Architects](https://normcph.com/), [Aesop](https://www.aesop.com/), [Savoir](https://www.savoirbeds.com/) and [Unseen](https://unseen.co/world/) were references for atmosphere, editorial pacing and visual storytelling. [Blue Sky Carpet Cleaning](https://blueskycarpetcleaning.com.au/) informed content completeness only. Competitor claims, reviews and business facts were not adopted.

[GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), the [Lenis repository](https://github.com/darkroomengineering/lenis) and [14islands scroll rig](https://github.com/14islands/r3f-scroll-rig) were evaluated during technique research. The implementation uses native scrolling with GSAP for the aperture and restrained transitions. Photography, layering and purposeful motion provide the depth.

Three still-image jobs and one film job produced the new material. The [asset manifest](asset-manifest.json) records job IDs, derived assets, dimensions, file hashes and visual-review notes. The estimated generation total is **43.25 credits**, not a confirmed final debit. The hero film is 5.04 seconds, 1280 × 720, 24 fps, silent H.264; optimized stills and reusable existing service media complete the collection. Generated imagery is brand illustration, not proof of completed customer work.

| Verification | Recorded result |
| --- | --- |
| Typecheck | Passed |
| Production build | Passed |
| Unit tests | 23 passed |
| Lint | 0 errors; 62 existing warnings |
| Content check | 0 critical, 0 high; 7 medium warnings in warn-only mode, including a new CSS false positive |
| Focused browser suite | 20 passed (18.5 seconds) |
| Automated accessibility | Zero detected WCAG 2 A/AA and 2.1 AA violations at 390px and 1440px; included in the 20 checks |

The correction pass addressed concealed film-control focus, playback resumption, enquiry editing focus, overlap between the floating quote action and film controls, mobile image source selection, and two text contrast findings.

Responsive coverage uses eight widths: **320, 390, 430, 768, 1024, 1366, 1440 and 1920px**. Browser checks cover overflow, service/package selection, coverage prefill, enquiry review and retained input, navigation focus, FAQ disclosure, cinematic controls, pause/reduced-motion/data-saving behaviour, no-JavaScript fallback and the legal pages. Desktop and mobile section captures are included in the user-facing `outputs/browser-review` folder. Automated browser sizes emulate viewports; physical iOS/Android devices and independent design approval were not claimed.

Work remains local on `rebuild-2026`. No production deployment, push, merge or backend change was made. Production publication and verified operating claims remain separate decisions; noindex is retained.
