# Part 5 + final batch — timestamp anchor map
Source: **original full WhatsApp video** (not among uploads) · source_type
`original_full_video` · **offset applied: NONE** — visible timestamps are master
times.

## ⚠ Coverage limitation
The three split clips end at master **03:32.55**. Every anchor below (03:33 →
04:39) lies **beyond the available footage**. Only the first anchor (03:33)
could be cross-checked against the last second of part_3 (`frames/anchors/p5x/`):
that boundary frame shows the **balcony end/corner looking down at the
planter-strip ladder** — matching the 03:33 description within ~1s and
validating the timebase. Everything else in this file is transcribed from the
user's written evidence observations and **cannot be verified frame-by-frame
until the original full video is provided.** Status column: `boundary-verified`
or `unverified (user evidence)`.

## Part 5 anchors (03:33 – 03:49)
| master | user evidence | status |
|---|---|---|
| 03:33 | balcony end / corner | **boundary-verified** (part_3 final frames show this exact position) |
| 03:35 | room seen from the balcony | unverified (user evidence) |
| 03:38 | wire hanging at the ceiling | unverified (user evidence) |
| 03:40 | internal door + AC above | unverified (user evidence) |
| 03:45 | internal door + AC above (second) | unverified (user evidence) |
| 03:46–49 | bathroom: toilet ahead, shower glass left, vanity right, small high window, beige/tan tones | unverified (user evidence) — NOTE: beige/tan palette matches the GROUND guest shower (Part 2 00:46); if this is upstairs it is a third palette-variant bathroom; flagged for dedup |

## Final batch anchors (03:53 – 04:39)
| master | user evidence | status |
|---|---|---|
| 03:53–… | grey-tiled ensuite with black-framed shower | unverified — likely the SAME gray ensuite already filmed at master 02:45 and 03:00–03:10 (flagged: may be one room seen twice) |
| — | corridor cluster (multiple doors) | unverified — consistent with the confirmed upper corridor cluster |
| — | room with AC + paint bucket | unverified (user evidence) |
| — | street-facing sliding glass | unverified — consistent with confirmed street-side balcony doors |
| 04:35 | balcony wrap with glass balustrade + **linear drain** | unverified — the linear drain IS independently confirmed at master 02:29–33 (Part 3 frames) |
| 04:39 | final orientation, street-facing | unverified (user evidence) |

## Model impact
No unverified anchor introduces NEW geometry: every element it mentions
(balcony wrap, drains, gray ensuite, corridor cluster, street-facing sliders,
over-door ACs) is already confirmed by in-footage anchors. Therefore the model
takes **no speculative geometry** from Part 5 / final batch; they only
corroborate. If the original video is provided later, re-run this part's
extraction to verify and to resolve the two dedup flags.
