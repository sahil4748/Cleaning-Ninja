# Cleaning Ninja — Renewal media

Created 29 September 2026 for the fresh frontend redesign. These are original AI-generated editorial illustrations of the brand's intended atmosphere and services, not photographs of actual Cleaning Ninja customer projects or team members.

## Production and cost

- Provider: Higgsfield, user's connected private Plus workspace.
- Project: `Cleaning Ninja — Renewal` (`b6bcbe6e-fa01-41f4-ab22-6e7e1747bad0`). The project ID is also its default folder ID.
- Initial account balance: 839 credits. No credits purchased. No free-trial/unlimited mode available or used.
- Image model: GPT Image 2.5, Flare, high quality, 2K, six separate original prompts.
- Preflight image cost: 2.75 credits per still; 16.5 credits for six.
- Film model: Seedance 2.5, 1080p, 5 seconds, audio disabled, derived from the original generated hero image.
- Preflight film cost: 60 credits.
- Confirmed total: 76.5 credits, under the assigned 80-credit ceiling. Final balance: 762.5 credits.

## Delivered stills

Location: `/Users/arsh/Downloads/Cleaning-Ninja/public/homepage/renewal/`

| File | Dimensions | Job | Direction |
|---|---:|---|---|
| hero.webp | 2688 × 1520 | `78f19513-2724-4b27-904b-c39c9654f58d` | Low carpet-level architectural photograph. Oatmeal linen sofa left, olive armchair right, travertine, beige limewash, sunlit courtyard through large arch, calm upper-left wall. |
| hero-mobile.webp | 1520 × 2688 | `26eef886-2277-49f8-b39a-56aaa13efbac` | Deliberate tall mobile composition: broad calm upper wall, sofa and textured carpet below, arched opening restricted to right edge. |
| detail.webp | 1792 × 2240 | `5d0f2dd5-1fe0-4345-8bc0-81b4bc8ea463` | Tactile close-up of rounded oatmeal linen sofa and plush wool carpet. |
| care.webp | 1792 × 2240 | `25280dea-a9aa-4cc4-84f9-78247d977088` | Hand and olive uniform sleeve guiding transparent upholstery extraction nozzle on clean beige linen sofa. |
| stone.webp | 1792 × 2240 | `73b5553b-e6aa-4cbb-9134-a3785cc3cb45` | Warm limestone bathroom tiles with sunlight and folded olive towel. |
| leather.webp | 1792 × 2240 | `d770664c-edea-4c42-b669-c58530888087` | Sculptural cognac leather armchair on beige wool rug, warm natural side light. |

Original PNGs are retained in this chat's `work/media/`. WebP encoding used cwebp quality 88 for hero and hero-mobile, and 86 for supporting stills. No material visual edits were applied to the stills. All six source images were visually inspected for composition, realism, unwanted text, and service relevance. No existing site imagery was reused.

## Atmosphere film

- Job: `b0b7d21a-6a81-4f9b-be04-8d17696c30dd`.
- Reference: hero generation job `78f19513-2724-4b27-904b-c39c9654f58d` as start_image.
- Direction: locked-off camera, exact room preservation, tiny outside foliage movement, restrained corresponding shadows, constant light and exposure, no people/dust/text/new objects, quiet near-seamless loop.
- Completed and visually inspected using extracted frames at 0, 1, 2.5 and 4.7 seconds. Quiet stable room with slight foliage/shadow changes; no obvious geometry deformation.
- Original output used HEVC/hvc1, which failed Chromium playback. Transcoded with AVAssetReader/AVAssetWriter into H.264/avc1 High profile, 1920 × 1080, 24 fps, 5.0417 seconds, no audio.
- Final `atmosphere.mp4`: 1,521,521 bytes, target bitrate 2.4 Mbps, fast-start metadata before video data. Final transcoded frame also visually inspected.
- Browser playback validation is being completed by the integrating parent agent.

## Original asset source URLs

- Hero: https://d8j0ntlcm91z4.cloudfront.net/user_3Jt4fmAE1y1Oyj5MBLsLkIQBgNY/hf_20260929_091201_78f19513-2724-4b27-904b-c39c9654f58d.png
- Detail: https://d8j0ntlcm91z4.cloudfront.net/user_3Jt4fmAE1y1Oyj5MBLsLkIQBgNY/hf_20260929_091201_5d0f2dd5-1fe0-4345-8bc0-81b4bc8ea463.png
- Care: https://d8j0ntlcm91z4.cloudfront.net/user_3Jt4fmAE1y1Oyj5MBLsLkIQBgNY/hf_20260929_091340_25280dea-a9aa-4cc4-84f9-78247d977088.png
- Stone: https://d8j0ntlcm91z4.cloudfront.net/user_3Jt4fmAE1y1Oyj5MBLsLkIQBgNY/hf_20260929_091342_73b5553b-e6aa-4cbb-9134-a3785cc3cb45.png
- Leather: https://d8j0ntlcm91z4.cloudfront.net/user_3Jt4fmAE1y1Oyj5MBLsLkIQBgNY/hf_20260929_091341_d770664c-edea-4c42-b669-c58530888087.png

- Hero mobile: https://d8j0ntlcm91z4.cloudfront.net/user_3Jt4fmAE1y1Oyj5MBLsLkIQBgNY/hf_20260929_092201_26eef886-2277-49f8-b39a-56aaa13efbac.png
- Film: https://d8j0ntlcm91z4.cloudfront.net/user_3Jt4fmAE1y1Oyj5MBLsLkIQBgNY/hf_20260929_091314_b0b7d21a-6a81-4f9b-be04-8d17696c30dd.mp4

## Exact prompt provenance

All exact generation prompts, model settings, job IDs, source URLs, costs, final byte sizes and SHA-256 hashes are retained in `docs/execution/renewal/asset-manifest.json`. Impeccable stores prompt metadata for WebP as `.webp.json` sidecars. All six have been populated with the exact prompt received by the generation tool. Final metadata scan: **6 rasters, 0 missing**.
