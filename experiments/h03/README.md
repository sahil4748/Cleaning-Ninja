# H-03 development evidence — inactive

Raw and retimed H-03 are rejected for the current production hero. H-01 desktop / H-02 mobile remain the approved static base. No generation is authorised.

The `.txt` snapshots preserve the comparison component, CSS, Playwright cases and config for review only. They are not imported, compiled or automatically discovered as tests. The old component expected `MEDIA.motionPreview` raw/retimed URLs; those entries and the entire motion effect have been removed from application source. `?hero-motion=raw` and `?hero-motion=retimed` now have no effect in either development or production. Existing development-only `?ninja-cut=1` static previews remain.

Both MP4s are preserved locally under `.local-evidence/stabilization-2026-09-27/public/homepage/` and are deliberately absent from Git and `public`. The local archive is not a portable backup. The [inventory](../../docs/execution/repository-stabilization-inventory.md) records original paths, sizes and SHA-256 hashes, including every archived screenshot. No unique asset was deleted.

The [evaluation report](../../docs/execution/h03-motion-integration-report.md), [comparison sheet](../../docs/execution/h03-screenshots/comparison-contact-sheet.png) and [frame map](../../docs/execution/h03-screenshots/frame-map.json) remain tracked. The [offline retime recipe](../../scripts/retime-h03.py) now reads and writes only in the local archive and was not executed during stabilization. Re-enabling a live comparison requires a separately authorised implementation; the snapshots are not a runnable alternate application.

## Masked salvage follow-up — 2026-09-28

A new development-only masked experiment reads these same local archived files directly; they remain outside public and Git. See [masked salvage report](../../docs/execution/h03-masked-salvage-report.md) for switches, interaction-start behavior, evidence and recommendation B. Historical raw/retimed runtime snapshots remain archival, not the current implementation.

## Approved masked composition checkpoint — 2026-09-28

The owner has approved the refined masked composition at the current visual gate. See the [refinement report](../../docs/execution/h03-mask-refinement-report.md) for final geometry and [checkpoint report](../../docs/execution/h03-masked-checkpoint-report.md) for verification. H-01/H-02 remain production defaults; this is not production-motion authorisation. Open `/?hero-motion=masked` on a task-owned development server, then click the room or press a key. Raw is preferred; the existing retimed comparison remains archival comparison functionality. Test captures now go to ignored `test-results/h03-masked`, preserving dated evidence.
