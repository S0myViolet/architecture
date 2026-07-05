# Part 3 — timestamp anchor map
Source: `part_3.mp4` · split_clip · duration (metadata) **101.17s** ·
master offset **+111.38s** (fallback +01:51, Δ0.38s). master = local + 111.38.
Frames: `frames/anchors/p3/`.

| # | local | master | expected (prompt) | observed in frames | match |
|---|---|---|---|---|---|
| C01 | 00:00–00:03 | 01:51–01:54 | stair top area | Part 3 opens **already on an upper terrace**: ~1.2m **dark stacked-stone parapet wall**, gray screed floor, glass balustrade on the open edge, view over low villas + greenery; then back inside a lobby with floor-to-ceiling glazing onto that terrace. (The final steps of the ascent fell in the cut between clips.) | ◐ partial — terrace, not the literal stair top |
| C02 | 00:10 | 02:01 | stair top / landing | Upper **hall/lobby**: big timber door frames, a room with **AC mounted directly above its door**, and a **white surface-mounted DB cabinet** on the hall wall. | ◐ hall rather than landing |
| C03 | 00:13 | 02:04 | corridor: wooden doors + panel | Hall with multiple timber doors (one open to a window room ahead), light switches — the upper corridor cluster. | ✔ |
| C04a | 00:15 | 02:06 | upper rooms start | **Corner bedroom with glazed doors on TWO adjacent walls** (one to the parapet terrace, one to another balcony); sun patches on floor. | ✔ |
| C04b | 00:20 | 02:11 | upper rooms mid | Hand opens a black-framed glass door onto the street-side balcony; **a glazed skylight box sits in the balcony floor** — the rooflight over the stair void. | ✔ (adds skylight) |
| C04c | 00:24 | 02:15 | upper rooms end | Balcony views: glass balustrade, palm + white apartment blocks + street below. | ✔ |
| C05 | 00:26–29 | 02:17–20 | terrace | Looking down from the balcony at the **timber slats of the carport pergola** and the hedge at the street corner — this balcony wraps the approach corner. | ✔ |
| C06 | 00:36 | 02:27 | upper façade w/ slat trim | View down the street verge (breeze-block-topped wall, palms); the balcony run has a **slat-trim band** on the façade above the openings; neighbouring villa visible along the street. | ✔ |
| C07 | 00:38–42 | 02:29–33 | terrace wrap + gray wall | **Narrow balcony walkway**: glass balustrade (protective film still on), tall dark-framed window on the room side, **linear drain grille strip in the balcony floor**; then back inside a bedroom with AC above the door. | ✔ |
| C08a | 00:45 | 02:36 | long balcony start | Bedroom interior (veined gray marble-look floor, AC above door, tall slot window beside the door) — the long-balcony walk itself happens later (see Part 4 anchors M03:26–30). | ✘ label early — observed a bedroom |
| C08b | 00:54 | 02:45 | long balcony mid | **Gray-tiled bathroom with black-framed shower screen**, rain + hand shower, small top-hinged frosted window, oval timber mirror, linear drain, tall slot window beside the shower. | ✘ label — observed the gray bathroom |
| C08c | 01:03 | 02:54 | long balcony end | Upper hall movement between rooms (doors, opening to a bright balcony-door room ahead). | ✘ label — observed the hall |

Observed-vs-expected note: the user's "00:45–01:03 long balcony" range actually
contains bedroom/bathroom/hall footage; the long balcony walkway appears at
master 03:26–03:30 (Part 4 anchors, still inside this file at local 01:35–01:39).
Anchor mismatches are label-timing drift, not timebase errors — the offset was
verified by the clean stair-ascent cut at the Part2→Part3 boundary and by the
balcony-end content at the end of this file matching the 03:33 anchor.
