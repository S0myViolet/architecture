# Timeline registry — Almaza, Sahel walkthrough

The walkthrough exists as **three split clips** (each restarts at 00:00) plus an
**original full WhatsApp video** that was never uploaded. All reconstruction work is
anchored to the **master timeline** = the original video's clock.

**Rule (split clips):** `master_time = local_file_time + sum(durations of prior parts)`.
Never seek a master time directly inside a split file; convert to local first. Never
double-add offsets.
**Rule (original video):** visible timestamps are already master times — **no offset**.

## Registry

| part | source file | type | duration (metadata) | fallback | master window | offset applied |
|---|---|---|---|---|---|---|
| 1 | part_1.mp4 | split_clip | **51.37s** | 00:51 | 00:00.00 – 00:51.37 | none |
| 2 | part_2.mp4 | split_clip | **60.01s** | 01:00 | 00:51.37 – 01:51.38 | **+51.37s** (fallback +51s, Δ0.37s) |
| 3 | part_3.mp4 | split_clip | **101.17s** | — | 01:51.38 – 03:32.55 | **+111.38s** (fallback +111s, Δ0.38s) |
| 4 | original video | original_full_video | — | — | anchors 02:56 – 03:30 | **none** |
| 5 | original video | original_full_video | — | — | anchors 03:33 – 03:49 | **none** |
| final | original video | original_full_video | — | — | anchors 03:53 – 04:39 | **none** |

Durations are taken from ffmpeg container metadata (`duration_source_used: metadata`);
the user-supplied fallbacks (P1 = 00:51, P2 = 01:00, P3 offset = 01:51) agree within
0.4s and are kept only as fallbacks.

## Coverage

- Split parts 1–3 concatenate to **212.55s = 03:32.55** of master time.
- **Part 4 anchors (02:56–03:30) ARE covered**: they map into part_3 at
  `local = master − 111.38s` → local 01:04.6 – 01:38.6. Frames for Part 4 are
  extracted from part_3 at those local times; the anchors themselves keep their
  original-video timestamps with no offset.
- **Part 5 (03:33–03:49) and the final batch (03:53–04:39) are NOT covered** —
  they lie past the end of all split footage (gap ≈ 66s). part_3's last second
  (master ≈ 03:31.6–03:32.5) is extracted as a boundary cross-check for the 03:33
  anchor. Everything else in those ranges is reconstructed from the user's written
  evidence observations and is flagged as such in the anchor maps — it cannot be
  verified frame-by-frame until the original full video is provided.

## Sanity checks

- Frame rate 59.94 fps, 464×832 portrait, consistent across all three parts —
  no retiming detected, so simple duration addition is valid.
- Part-boundary continuity: end of part_1 (gray service wall / walkway) flows into
  start of part_2 (terrace under balcony, side path) — same area of the site,
  consistent with a clean cut. End of part_2 (stair ascent) flows into start of
  part_3 (stair top / landing) — confirmed clean cut mid-ascent.
