# Service image requests (for the owner to generate)

Use **GPT Image 2.5, high quality, 2K**, aspect **4:5** (portrait), unless noted. Save as WebP at the file names below into `public/homepage/restore/services/`. One art direction for the whole set so it reads as one shoot with the new hero room.

**Shared style line (append to every prompt):** "Natural true colours, true white balance, no colour cast, no tint, no filters. Bright, airy, premium editorial interiors photography in the style of Kinfolk and Architectural Digest, soft natural window light with one clean diagonal blade of sunlight, gentle film grain, generous calm negative space. A restrained palette of white, ivory, pale oak and one accent of deep peacock teal (#06768D) as a real object colour. No people, no hands, no text, no logos, no brand names, no cleaning tools, no sparkles, no before/after."

| File | Service | Prompt (before the style line) |
|---|---|---|
| carpet.webp | Carpet cleaning | Low macro of a thick ivory-white hand-loomed wool carpet with crisp fresh vacuum lines, a blade of morning sun raking across the pile, the soft blurred leg of a deep teal velvet chair at the edge of frame. |
| upholstery.webp | Upholstery & curtain | Corner of a rounded ivory bouclé sofa with one deep teal velvet cushion, a floor-length sheer white linen curtain beside it moving in light, pale plaster wall. |
| rugs.webp | Rug cleaning | Three-quarter view of a hand-woven ivory wool rug with a subtle teal geometric border on pale oak flooring, sunlit, fringe perfectly combed. |
| mattress.webp | Mattress cleaning | A calm hotel-style bed with crisp white linen, plump pillows and a folded deep teal throw, soft side light from a window, pale wall. |
| leather.webp | Leather cleaning | A sculptural tan leather lounge chair with a soft supple sheen against a white plaster wall and pale oak floor, a single teal ceramic vase on a plinth. |
| commercial.webp | Commercial cleaning | A bright modern office reception: pale carpet tiles, white walls, a long oak desk, two deep teal lounge chairs, floor-to-ceiling windows, immaculate and empty. Landscape 3:2 also welcome. |
| end-of-lease.webp | End-of-lease | An empty, freshly cleaned bright apartment room: white walls, pale oak floor, a window with the sun casting a clean diagonal on the floor, one teal-framed door detail, spotless skirting boards. |
| stain-odour.webp | Stain & odour removal | Extreme close-up of immaculate white upholstery weave with a small glass of water on a travertine side table, shallow depth of field, soft light, a hint of teal in the soft-focus background. |
| tile-grout.webp | Tile & grout | A bright bathroom or kitchen floor of pale large-format stone tiles with perfectly clean crisp grout lines, sun raking across them, a folded deep teal towel at the edge. |
| pest-control.webp | Pest control | A calm, clean home threshold: an open timber door onto a green garden in soft light, spotless skirting board and floor, a teal doormat; reassuring, no insects. |
| car-seats.webp | Car seat cleaning | Interior of a premium car with immaculate ivory leather seats and pale carpeted mats, soft daylight through the windscreen, shallow depth of field, a teal stitching accent. |

Optional extras: `quote-bg.webp` (16:9) — close, softly out-of-focus detail of the deep teal velvet chair and white boucle sofa in morning light, for the quote section; `og.webp` (1200×630) — the resolved room.

When these arrive, drop them in `public/homepage/restore/services/` and tell me; I will wire them into the services index (the `picture` map in `components/homepage/restore/Restore.tsx`).
