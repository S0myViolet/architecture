# Part 2 — timestamp anchor map
Source: `part_2.mp4` · split_clip · duration (metadata) **60.01s** ·
master offset **+51.37s** (fallback +00:51, Δ0.37s). master = local + 51.37.
Frames: `frames/anchors/p2/`.

| # | local | master | expected (prompt) | observed in frames | match |
|---|---|---|---|---|---|
| B01 | 00:02 | 00:53 | terrace under balcony | Flagstone walkway along the house with the upper glass-rail balcony directly above; **raised stone-edged planter (dark soil)** between the walk and the boundary; at −2s the camera looks over the corner at a **street** with white apartment blocks — the side street of the corner lot. | ✔ |
| B02 | 00:04 | 00:55 | side path: 2 columns + gray wall | Covered side passage: **tall dark-gray textured wall** on one side, **two thick round concrete columns** carrying the balcony above, bougainvillea planter, and at its end a **recessed glass slider with wood-slat band** — the same recessed opening seen from the colonnade at Part 1 00:38–40. | ✔ |
| B03 | 00:11 | 01:02 | small room w/ AC | Camera enters through that slider into a **small white room with a wall-split AC already installed**, gray tile, timber door frame onward. This is a separate family/den room — not the main living. | ✔ |
| B04a | 00:20 | 01:11 | bathroom/vanity start | Approach through a larger inner room (glazed door to the terrace at its far corner); then an open **vanity nook: long white stone counter + oval mirror**, with the WC beyond its own timber door. | ✔ |
| B04b | 00:27 | 01:18 | bathroom/vanity end (small window) | Inside the WC: toilet + small counter, round mirror, **small high black-framed frosted window** above — implies an exterior wall (position uncertain in-model; flagged). | ✔ |
| B05 | 00:38 | 01:29 | under-stair passage w/ panel | The **L-stair from its lobby**: dark marble treads, frameless glass rail, quarter-turn left at a landing, bright double-height void above; **open under-stair passage with a leaning mirror/panel**; through the doorway beyond the stair a window room is visible. | ✔ |
| B06 | 00:40 | 01:31 | side room w/ ladder | Room with a wooden A-ladder, **windows on two walls (corner room)**, own AC above the door, gray tile. | ✔ |
| B07 | 00:46 | 01:37 | bathroom | Guest shower room: **beige/cream large-format tile** (not gray), oval timber-framed mirror, wall-hung basin, walk-in shower with rain + hand shower, linear drain. | ✔ |
| B08 | 00:53 | 01:44 | look-back | Corridor look-back: timber veneer door, **two black distribution-board plates flush in the wall near the stair**, and the corridor axis pointing straight at the living's bright glazing a few metres away — the corridor is SHORT. | ✔ |
| B09 | 00:58.5 | 01:49.9 | stair ascent | First flight up: wall right, glass left, **wide horizontal window strip on the wall beside the top of the flight**, quarter-turn LEFT at the landing, short second flight; dark grille panel on the wall under the second flight. Part 2 ends mid-ascent (clean cut into Part 3). | ✔ |

Timebase note: all Part-2 anchors converted with the metadata offset +51.37s;
never seek master times inside this file directly.
