# Part 4 — timestamp anchor map
Source: **original full WhatsApp video** (not among uploads) · source_type
`original_full_video` · **offset applied: NONE** — visible timestamps are master
times. Footage resolution: these master times fall inside `part_3.mp4`
(local = master − 111.38s), so frames were extracted from part_3 at the mapped
local times. Frames: `frames/anchors/p4/`.

| # | master | part_3 local | expected (prompt) | observed in frames | match |
|---|---|---|---|---|---|
| D01 | 02:56 | 01:04.6 | terrace over garden | Upper hall → **bedroom with a big glazed door/window** (greenery outside, turquoise gas bottle on floor) → **gray bathroom** (oval mirror, counter basin, wall-hung toilet). | ✘ label ~6s early — room + bathroom on screen |
| D02 | 02:57–58 | 01:06.1 | corner / gray wall | Bedroom with AC + balcony slider; **rust/copper-veneer bathroom door with a frosted transom window above it**; gray tile, oval mirror. | ✘ label — ensuite sequence |
| D03 | 03:00 | 01:08.6 | terrace door into room | **Gray/green cement-tile ensuite: black-framed shower screen, wall-hung toilet, rain + hand shower.** | ✘ label — bathroom on screen |
| D04 | 03:06 | 01:14.6 | room w/ AC | Shower close-up: **speckled terrazzo-look wall tile** (matches the design PDF's terrazzo master bath); exit past the copper door + basin; small frosted transom above the door. | ◐ (bathroom, then door toward the room) |
| D05 | 03:08–10 | 01:17.6 | corridor cluster | Copper-veneer door close-ups with black lever handles; **frosted borrowed-light window on the corridor wall**; through the doorway a room with high wall AC. | ✔ |
| D06a | 03:11 | 01:19.6 | room w/ balcony door | Corridor + frosted window; bedroom with high wall AC (turquoise bottle again — likely the same room as D01 seen twice). | ✔ |
| D06b | 03:16 | 01:24.6 | room w/ balcony door (end) | Bedroom with AC + **black-framed glazed door to the balcony** (deep overhang above). | ✔ |
| D07a | 03:19 | 01:27.6 | terrace views | On the balcony: glass balustrade, street with white apartment blocks, palms, cars. | ✔ |
| D07b | 03:24 | 01:32.6 | terrace views end | Balcony corner; **looking down: unfinished blockwork excavation strip with a ladder + timber formwork inside**, between the house and the side-street boundary. | ✔ — this is the "excavation": a planter/water-feature strip on the SIDE, not in the garden |
| D08a | 03:26 | 01:34.6 | long balcony walkway | **Long narrow balcony walkway**: glass balustrade wrapping an L, large light floor tiles, view along the side street. | ✔ |
| D08b | 03:30 | 01:38.6 | long balcony walkway end | Walkway corner continues; below: the planter/excavation strip; palms + white blocks beyond. | ✔ |

Timebase note: NO offset was added to these anchors (original-video rule). The
inverse mapping into part_3 (−111.38s) was used only to locate frames. The
~5–8s drift between the user's remembered labels and on-screen content at
D01–D04 is label drift, not a timebase error — D05–D08 line up exactly.
