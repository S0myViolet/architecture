# El Gouna Finished-Home Walkthrough — Strategy & Execution Plan

**Prepared for:** Owner of a villa under construction in El Gouna, Hurghada, Egypt
**Assets on hand:** ~64 design renders from the furnishing company (Kymera, delivered as a 60 MB "3DS Presentation" PDF) + a rough WhatsApp walkthrough video (35.7 MB) of the current unfurnished house
**Goal:** A polished, realistic walkthrough of the *finished, furnished* home that matches the purchased design as closely as possible
**Date:** July 2026

---

## 1. Executive Summary

The single most important fact in this entire project is hiding in your PDF's filename: **"KYMERA … 3DS PRESENTATION."** Your furnishing company produced those 64 renders in 3ds Max — which means a fully furnished, fully lit, render-ready 3D model of *your exact house with your exact furniture* already exists on their computers. Every workflow gets dramatically cheaper, faster, and more faithful to the design if that scene is reused, and one of them becomes almost trivially easy: **having Kymera themselves render the walkthrough from their own scene.**

So the strategy is not "which technology should I use?" — it is a **decision tree that starts with one email to Kymera**:

- **Plan A (best case):** Kymera quotes a 2–3 minute cinematic walkthrough + 10–20 rendered 360° panoramas from their existing scene. Perfect design fidelity (it's literally the same scene as your renders), lowest total cost (~$1,000–4,000 at Egyptian rates, estimate), 1–3 weeks.
- **Plan B:** Kymera won't do the animation but will release or license the scene files → hire an Egyptian archviz freelancer/studio to animate and render it ($1,000–4,000 offline-render route, or $500–3,000 real-time route).
- **Plan C (fallback):** No scene available → commission a rebuild from an Egyptian archviz studio using the 64 renders as the art-direction bible and a cheap phone scan for measurements ($2,000–6,000 locally, 4–8 weeks).
- **Budget lane (any time):** AI staging of hero frames + AI image-to-video clips stitched into a cinematic montage ($100–600 DIY, $300–1,500 hired) — polished and emotionally convincing, but furniture will be "similar," not identical, and will drift between shots.

What to **avoid paying for**: Matterport/scan-based tours and Gaussian-splat reconstructions as the main deliverable (they can only reproduce the *empty* house that exists today), and AI video-to-video on the WhatsApp footage (inherits the shake and compression; furniture identity drifts between clips).

Recommended deliverable pair: a **4K cinematic walkthrough video** (the emotional showpiece, shareable on WhatsApp/YouTube) **plus a rendered 360° interactive tour** (one web link, works on any phone, VR-capable for free). Both come from the same 3D scene, so the second costs a few hundred dollars once the first exists.

---

## 2. Best Overall Approach (recommended)

**"Source-scene recovery" hybrid: reuse Kymera's existing 3ds Max scene → cinematic 4K walkthrough + rendered 360° tour.**

Why this wins on every axis you care about:

- **Realism:** The output is rendered by the same engine and scene that produced the 64 renders — the video is *by definition* indistinguishable in quality from the design images you already approved.
- **Design fidelity:** No AI approximation, no "similar sofa." The exact furniture, materials, and lighting you bought are in the scene already.
- **Cost:** The expensive 80% of archviz work (modeling, furnishing, materials, lighting) is already done and paid for. What remains is camera animation, rendering, and post — the cheap part.
- **Practicality:** One email starts it. Kymera has every incentive to say yes — it's near-pure-margin work for them and a portfolio piece.

Execution order:
1. Send Kymera the request message (Section 13). Ask them to quote the walkthrough themselves *and*, separately, the cost of releasing archived scene files.
2. If they quote reasonably → Plan A. Approve a camera path on a fast preview ("clay") pass, then per-room still keyframes, *then* let them render final frames. Never skip the keyframe sign-off — it is the single best cost-control gate in this industry.
3. If they won't animate but release files → Plan B: hire an Egyptian archviz artist (Upwork/Behance, $20–40/hr) or studio to animate the scene. Offline Corona rendering gives maximum fidelity; a D5 Render/Twinmotion real-time pass gives ~90% of the look for a fraction of the render cost.
4. If neither → Plan C (Section 5, rebuild pipeline).
5. In all cases, add the 360° tour: 10–20 extra panoramas rendered from the same scene, assembled in Kuula/3DVista into one shareable link.

**Important caveat:** the archviz industry norm is that studios *retain* source files — they are not a standard deliverable. That is exactly why "quote us the animation yourselves" is the leading ask, and "release the files" is the backup. Expect a buyout fee if you want the files; that's normal and often still worth it.

---

## 3. Best Budget-Friendly Approach

**If the source scene is recovered:** a real-time walkthrough by a D5 Render / Twinmotion freelancer — **$500–1,500 (estimate), 1–2 weeks.** Twinmotion and Unreal Engine are free for private use, D5 Pro is ~$360–456/yr (the freelancer owns the license, not you), and render time is minutes instead of farm-days. Honest quality note: real-time output is close to offline rendering in motion but visibly behind on still close-ups, fabric detail, and dim-room lighting subtlety. D5 also exports a free browser-based "virtual tour" link — a bonus interactive deliverable at zero extra cost.

**If no scene is recovered:** the AI lane —
1. Extract 12–20 wide "hero" frames (one to two per room) from a *re-shot, stabilized* video of the empty house, or shoot new photos.
2. Have each frame virtually staged to copy the matching Kymera render. Human-in-loop services (Stuccco $24.50–35/image, 24 h; BoxBrownie $24–32/image, 48 h) accept "copy this reference render" briefs and get much closer to a specific design than pure AI. Pure-AI alternative: Virtual Staging AI ($16–79/mo) can be trained on your 64 renders as a custom style.
3. Animate each staged still into a 6–8 s slow camera move with image-to-video AI (Veo 3.1 at $0.15–0.40/sec, Kling 3.0, Higgsfield camera presets).
4. Stitch 10–15 clips with music and titles in CapCut/Premiere/DaVinci.

**Cost: ~$100–600 DIY over 1–2 weeks, or $300–1,500 hiring an AI-video freelancer for 2–3 weeks.** What you get is a genuinely polished, emotionally convincing marketing-style montage. What you don't get: exact furniture matching, dimensional accuracy, or consistency of pieces between shots — AI furniture is "inspired by," and it will morph subtly across clips.

---

## 4. Comparison Table of All Approaches

| # | Approach | How it works | Cost (2–3 min villa) | Time | Realism | Design fidelity | Difficulty for you | Suitable? |
|---|---|---|---|---|---|---|---|---|
| 1 | **Kymera renders from own scene (Plan A)** | Their 3ds Max/Corona scene + camera animation + render farm | ~$1,000–4,000 *(Egypt estimate — get quote)* | 1–3 wks | Ceiling — identical to your renders | Perfect | Trivial (one email) | ★ **Best** |
| 2 | **Traditional offline archviz rebuild (Plan C)** | Studio remodels house from plans/scan, furnishes to match renders, Corona/V-Ray render | Egypt studio $2,000–6,000; US/EU $12,000–45,000; +farm $1,500–6,000 at 4K | 4–8 wks (stage-gated); up to 6–12 wks | Photoreal benchmark | Very high (with FF&E list) | Low (vendor-managed) | ✔ Fallback |
| 3 | **Real-time engine (D5/Twinmotion/UE5)** | Import scene (or rebuild), real-time lighting, render video + free web tour | $500–3,000 with scene; roughly 2× without | 1–2 wks with scene; 2–5 wks without | ~90% of offline; weaker close-ups & dim interiors | High | Low | ✔ Budget star |
| 4 | **Rendered 360° tour** | 10–20 ray-traced panoramas from CG scene → clickable tour (Kuula/3DVista/CloudPano) | $300–2,500 incl. assembly | 1–2 wks (with scene) | Identical to renders (static viewpoints) | Perfect | Low | ✔ **Best interactive add-on** |
| 5 | **Shapespark free-roam web walkthrough** | Bake CG scene to WebGL, walk freely in mobile browser + WebXR VR | $1,500–6,000 labor + $35–58/mo hosting | 1–3 wks | 80–90% of renders | High | Low | ◐ Premium add-on |
| 6 | **AI staging stills + image-to-video montage** | Stage hero frames to match renders, animate 6–8 s clips, stitch | $100–600 DIY; $300–1,500 hired | 1–3 wks | Polished but AI-telltale under scrutiny | Style-level only; drifts between shots | Medium (DIY) | ✔ Budget lane |
| 7 | **AI video-to-video (Runway Aleph 2.0)** | Furnish existing footage per ≤30 s clip via prompts | $100–500 in credits + reshoot | 1–2 wks | Inherits source shake/compression; furniture morphs | Low-medium | Medium-high | ✖ Not as primary |
| 8 | **Gaussian splatting / NeRF / photogrammetry** | Reconstruct 3D from video → web-walkable splat | $0–100 DIY (needs recapture); pro $250–5,000 | days–2 wks | Photoreal — **of the EMPTY house** | None (can't furnish to a specific scheme in 2026) | High | ✖ Wrong tool for goal |
| 9 | **Matterport / iGuide scan tour** | Technician scans house → hosted dollhouse tour; staging add-ons composite generic furniture | Scan ~$150–500 in Egypt *(estimate)* + $20/mo hosting; staging $25/view–$500/room | days | Photographic — but empty; staged views look composited | Generic staging only | Low | ✖ As deliverable; ◐ as as-built record |

Notes: Egyptian-market figures marked *(estimate)* are modeled from published rates, not live quotes — the 3-vendor RFQ in Section 12 turns them into real numbers. Published anchors: walkthrough animation worldwide averages $2,000–8,000 per finished minute; one US vendor (Trim Render) publishes a flat $75/second; Upwork's own data puts architectural-rendering freelancers at $20–40/hr (median ~$25) with Egypt at the low end.

---

## 5. Recommended End-to-End Workflow

### Phase 0 — Scoping (you, this week, free)
Answer three questions that change everything downstream:
1. **Audience & purpose?** Personal enjoyment / showing family vs. marketing for resale or rental. Marketing justifies the premium tier; personal viewing is well served by the mid tier.
2. **Deliverable type?** Cinematic video, interactive tour, or both (recommended: both — the marginal cost of the second is small once a scene exists).
3. **Scope?** House size (m², floors, rooms to include), target length (60–90 s tight vs. 2–3 min full), interior only vs. interior + exterior/garden/pool. Every quote you receive is meaningless without these numbers.

### Phase 1 — Asset recovery (week 1)
- Send Kymera the message in Section 13.
- In parallel, request the architectural drawings (DWG/PDF floor plans, elevations) from your contractor or Orascom/El Gouna's technical office — El Gouna developments keep plans on file.
- Check your 60 MB PDF page by page: Egyptian design packages often include dimensioned plans, material schedules, and an FF&E (furniture) list alongside the renders. If those pages exist, the "no plans" problem largely disappears.
- **Fallback trigger:** no usable Kymera response within 7–10 days → proceed to Plan C without waiting.

### Phase 2 — Measurement & reference (only if rebuilding — Plan C)
- Walk the house with a LiDAR-capable phone and **CubiCasa** (~5 min scan; first 2D floor plan free; DWG/CAD export $50; vendor claims 95–97% accuracy) — this is the default measurement base. A Matterport scan ($150–500 in Egypt, estimate) is an optional upgrade, useful later as an as-built record for the furnishing contractor, but redundant for measurement if CubiCasa succeeds.
- Re-shoot the walkthrough video properly (5–10 min, slow steady pans, every room, corners and ceilings, locked exposure, daylight) — as *reference*, and to keep the splat/scan option open.

### Phase 3 — Production (weeks 2–6)
Whoever produces (Kymera, studio, or freelancer), enforce this gate sequence — it is the industry-standard cost control:
1. **Camera path approval** on a fast clay/preview animatic (walking pace ≈ 1.0–1.5 m/s, eye height ~1.55–1.65 m, no drone-swoops indoors).
2. **Per-room still keyframes** rendered at final quality → you compare side-by-side against the matching Kymera render → sign off room by room. *All* fidelity arguments happen here, before animation money is spent.
3. **Low-res draft animation** (720p, draft sampling) → one revision round.
4. **Final 4K render** (farm), then post: denoise, color grade, music, titles. Ask for 2K-render + AI-upscale as a cost option — it can halve farm cost with minimal visible loss.
5. **360° tour pass:** 10–20 panoramas (1–3 per room, 8K equirectangular) from the same scene → assembled in Kuula (~$16–20/mo) or 3DVista ($499 one-time, freelancers usually own it) with floor-plan navigation → one URL.

### Phase 4 — Delivery (final week)
- Master: 4K H.265 + a WhatsApp-friendly 1080p H.264 version (under ~64 MB for direct sending).
- Tour link + QR code.
- Archive everything (project files if licensed, all renders, panoramas) — you may want a re-render after real furnishing reveals deviations.

---

## 6. Exact Files and Inputs to Gather

**From Kymera (furnishing company) — in order of value:**
1. **Archived 3D scene files** — in 3ds Max: File → Archive (bundles textures/assets). Ask which renderer + version (Corona 12/13/14/15? V-Ray?). This is the crown jewel.
2. Failing that: **FBX/OBJ export + texture folder** (loses render settings but keeps geometry/furniture).
3. **Floor plans & elevations** (DWG + PDF) they worked from.
4. **FF&E schedule** — the furniture & fixtures list: item, manufacturer, model, finish, per room.
5. **Material/finish schedule** and moodboards.
6. **The 64 renders at original resolution** (your PDF averages <1 MB per image — almost certainly compressed) + camera positions if available.
7. **Lighting specs** (fixture models, color temperatures) if a lighting plan exists.

**From your contractor / Orascom technical office:**
8. As-built architectural drawings (DWG/PDF), window/door schedule.

**Created by you:**
9. CubiCasa scan (if rebuilding), re-shot reference video, list of any as-built deviations from the design you already know about.

**Missing information that currently limits planning** (flagged per your constraints): audience/purpose, house size and scope, whether the PDF contains plans + FF&E pages, and Kymera's actual stack/terms. None block starting — all are resolved by Phase 0–1 actions.

---

## 7. Best Tools / Software / Platforms

| Layer | Recommended | Price | Notes |
|---|---|---|---|
| Offline rendering (max fidelity) | 3ds Max + Corona (what Kymera uses) | Vendor's license | Corona 15 (May 2026) now also targets Blender |
| Real-time (budget/speed) | D5 Render 3.0 | Pro $360–456/yr (verify) | Free virtual-tour web link included |
| Real-time (free) | Twinmotion 2026 / Unreal Engine 5 | Free for private use (<$1M revenue) | UE5 path tracer narrows the gap to offline |
| Render farm | GarageFarm / RebusFarm | ~$1,500–6,000 for 2–3 min 4K Corona; optimize via 2K+upscale | Real line item — budget it explicitly |
| 360° tour hosting | Kuula Pro (~$16–20/mo) or 3DVista ($499 one-time) | — | One link, phone + VR, WhatsApp-able |
| Free-roam web tour (premium) | Shapespark | Starter $35/mo, Standard $58/mo | 80–90% of render quality, WebXR VR |
| Measurement | CubiCasa | Free 2D plan; $50 CAD files | Default; Matterport optional as-built record |
| AI staging (budget lane) | Stuccco / BoxBrownie (human) $24–35/img; Virtual Staging AI $16–79/mo | — | Human-in-loop matches references far better |
| AI image-to-video (budget lane) | Veo 3.1 ($0.15–0.40/sec), Kling 3.0, Higgsfield | ~$100–600 total | 6–8 s clips per room, stitched |
| Editing | DaVinci Resolve (free) / CapCut / Premiere | Free–$23/mo | Grade, music, titles |

Avoid for this goal: Matterport staging add-ons (generic, $25/view–$500/room), splat-editing pipelines (VFX-grade effort, generic results), AI video-to-video on WhatsApp-compressed footage.

---

## 8. Who to Hire

**Nobody yet — Kymera first.** Then, depending on the branch:

- **Plan B/C — Egyptian archviz studio (recommended tier):**
  - **Nara Studios, Cairo** (nara-studios.com) — MENA-leading archviz; verified clients include **Orascom Development — El Gouna's own developer** (incl. Makadi Heights on the same coast); does both cinematic animation *and* 360/VR tours, so one RFQ covers both deliverables.
  - **HM Studios, Cairo** (hm-studios.com) — architecture + viz firm with a real-estate animation line.
  - **VA Studio, Cairo** (vastudios.net).
  - **Sketch Hurghada** — local firm with delivered El Gouna projects; more useful for site coordination than animation.
  - Screening warning: several "Cairo archviz studios" found in search (Yantram, 3DLabz, Renderby) are India-based outsourcers running Egypt SEO pages — ask for a local reference project before treating a vendor as Egyptian.
- **Plan B — freelancer (budget tier):** Upwork Egypt pool ($20–40/hr, median ~$25) or Behance portfolios (strong Egyptian Corona/V-Ray talent). Fiverr walkthrough gigs run $290–560 at the credible end — sub-$300 gigs are real-time quality, not Corona-match quality.
- **Budget lane:** one AI-video freelancer (Upwork, $300–1,500) to run the staging + image-to-video pipeline.
- **Not needed:** a dedicated AI developer (nothing custom to build), or a separate video editor (grading/music belongs in the animator's scope — write it into the brief).

**Contract terms that protect you** (industry standard): 50% / 25% / 25% milestones (start / keyframe-and-draft approval / final delivery); 2 revision rounds per stage written in; watermarked drafts until final payment; payment via platform escrow for freelancers; explicitly negotiate usage rights (marketing use if you may rent/sell) and — if you ever want re-renders — source-file handover, which costs extra and is never the default. Verify portfolios by reverse-image-searching hero frames and asking for a wireframe/clay breakdown of one shot; commission a paid single-room test still before committing the full project.

---

## 9. Estimated Time and Cost

| Tier | What you get | Cost | Timeline |
|---|---|---|---|
| **Ultra-budget (DIY AI)** | Staged stills + stitched AI montage, 60–120 s | $100–600 | 1–2 wks |
| **Budget** | D5/Twinmotion walkthrough from recovered scene + free web tour; or hired AI montage | $500–1,500 | 1–2 wks |
| **Recommended mid** | Plan A/B: 2–3 min 4K Corona-quality walkthrough + 360° tour, perfect design match | $1,500–6,000 *(Egypt estimates — RFQ to confirm)* | 2–5 wks (Plan A/B); 4–8 wks (Plan C rebuild) |
| **Premium** | US/EU studio, film-grade art direction | $12,000–45,000+ | 6–12 wks |

Hidden line items to budget: render farm ($1,500–6,000 at 4K offline, avoidable via real-time or 2K+upscale), source-file buyout if you want the .max files (negotiable, often a few hundred dollars in Egypt), tour hosting ($0–58/mo), music licensing (~$20–50, e.g. Artlist single license).

The premium tier buys art direction, not fidelity — fidelity comes from the source scene, which is why Plan A at $1,500–4,000 can visually beat a $30,000 Western rebuild.

---

## 10. Risks and How to Avoid Them

1. **Kymera stalls or refuses** → highest-probability risk. Mitigate: lead with "quote us the animation" (pure upside for them), set a 7–10 day fallback trigger, pursue drawings from Orascom/contractor in parallel.
2. **Source files exist but are withheld** → normal industry posture. Mitigate: offer a license/buyout; or have Kymera render panoramas/animation in-house so files never leave them.
3. **As-built house deviates from the design scene** → walk the house against the renders and list deviations before production; give the list to whoever animates; the reference video catches the rest.
4. **Budget-tier quality trap** ($500–1,000/min freelancers: floaty cameras, flickering GI, mismatched furniture) → paid test still of one room; animation showreel review (not just stills); keyframe sign-off gate.
5. **Render-farm cost surprise** → fix it in the quote: "price includes final 4K rendering" or a capped farm budget; consider 2K + AI upscale.
6. **Revision spiral** → all subjective feedback at the still-keyframe stage; 2 written rounds per stage; feedback returned on schedule (contracts make *your* response time binding too).
7. **AI-lane overpromise** (if budget lane chosen) → treat vendor demos skeptically; furniture WILL vary between shots; never promise viewers "this is exactly your sofa."
8. **Fake-local/scam vendors** → escrow only, reverse-image-search portfolios, no Telegram-only "studios," never pay 100% upfront.
9. **Platform churn on AI tools** (e.g., Sora 2's reported 2026 pull-back) → prefer the 3D route for anything you want to re-render in a year; keep source assets.

---

## 11. Final Recommendation

**Send the email to Kymera today.** Ask them to quote (a) a 2–3 minute 4K cinematic walkthrough and (b) 10–20 rendered 360° panoramas, both from their existing 3ds Max scene — and, separately, the price of releasing archived scene files. This is the highest-leverage single action available: it converts a $3,000–15,000, 6–12-week rebuild problem into a ~$1,500–4,000, 1–3-week rendering job with *perfect* fidelity to the design you already bought.

If Kymera doesn't deliver within 10 days, RFQ three vendors (Nara Studios + one more Cairo studio + one vetted Upwork Egypt freelancer) for the rebuild route, armed with your drawings, the 64 renders, a CubiCasa scan, and a proper reference video. Add the AI-montage lane only as a cheap teaser while the real thing is in production, or if budget collapses.

Deliverables to end up with: **4K cinematic video + 1080p WhatsApp cut + one interactive 360°-tour link (VR-capable).**

---

## 12. Immediate Next Steps (this week)

- [ ] **Day 1:** Send the Kymera request (Section 13). CC whoever manages your build.
- [ ] **Day 1:** Answer the three scoping questions (audience, deliverable type, scope/length) — one paragraph, drives every quote.
- [ ] **Day 1–2:** Go through the 60 MB PDF page by page; note whether it contains floor plans, material schedules, or an FF&E furniture list in addition to renders.
- [ ] **Day 2–3:** Request as-built drawings from your contractor / Orascom El Gouna technical office.
- [ ] **Next site visit:** Re-shoot the walkthrough properly (slow, steady, landscape, every room + corners, locked exposure, daylight, 5–10 min) and run a free CubiCasa scan while there.
- [ ] **Day 5–7:** If Kymera is unresponsive, send the RFQ to Nara Studios, HM Studios, and one vetted Upwork Egypt freelancer (attach: renders PDF, drawings, scan, video, scope paragraph; request: itemized quote with keyframe sign-off gate, 50/25/25 milestones, 2 revision rounds, farm cost included).
- [ ] **Day 10:** Decision point — Plan A, B, or C locked; production starts.

---

## 13. Ready-to-Send Request to the Furnishing Company

> **Subject: Request — walkthrough animation & design assets for the El Gouna villa (Mr. Karim Helaly project)**
>
> Dear Kymera team,
>
> Thank you for the design presentation for our villa in El Gouna — we're very happy with the direction shown in the renders.
>
> We would like to commission a **realistic walkthrough of the finished, furnished home**, matching the approved design exactly. Since your team produced the presentation renders in 3ds Max, you are naturally our first choice, and we'd like to ask for a quotation in two parts:
>
> **1. Walkthrough production (preferred option — produced by you):**
> - A cinematic walkthrough animation of the villa (interior + exterior), approximately 2–3 minutes, rendered at 4K from your existing 3D scene, including camera-path preview for our approval, per-room still keyframes for sign-off before final rendering, color grading and music.
> - Additionally (or alternatively), **10–20 rendered 360° panoramas** (8K equirectangular, 1–3 per room) from the same scene, for an interactive online tour.
> - Please quote each item separately, with timeline, number of revision rounds included, and payment milestones.
>
> **2. Design assets (please include with any option):**
> - The **floor plans and elevations** used for the design (DWG and PDF).
> - The **furniture & fixtures (FF&E) schedule** — item, brand/manufacturer, model and finish per room.
> - The **material/finish schedule** and any moodboards.
> - The **original full-resolution renders** (the presentation PDF compresses them).
> - If a lighting plan exists: fixture models and color temperatures.
>
> **3. Scene files (only if you prefer not to produce the animation):**
> - A quotation for releasing the **archived 3D scene** (3ds Max File → Archive, including textures and assets), noting the renderer and version used (e.g., Corona/V-Ray), under a license limited to visualization of this villa for our own use.
>
> Could you let us know feasibility, pricing and timeline within the next few days? We're aiming to start production within two weeks, and we'd genuinely prefer to keep this work with the team that created the design.
>
> Best regards,
> [Name]
> [Phone / WhatsApp]

*Arabic version available on request — for an Egyptian vendor, sending both often speeds things up.*

---

### Appendix A — As-built condition (assessed from the site walkthrough video, reviewed July 2026)

The ~3.5-minute site video (villa 14A) shows the house is much further along than "structurally built" — it is at **fit-out/snagging stage**, which changes several cost and feasibility assumptions in this document for the better:

**Already installed:** large-format porcelain flooring throughout; interior painting; wood-veneer doors hung; recessed ceiling lighting; split AC units in most rooms; bathrooms ~90% fitted (WCs, wall-hung basins, oval mirrors, black-framed walk-in showers, grey concrete-look tile); feature staircase with dark stone treads, glass balustrade and skylight; floor-to-ceiling sliding glazing; covered terrace with circular columns and flagstone paving; upper-floor terraces/balconies with glass balustrades.

**Still missing (the visualization gap):** kitchen (walls show capped MEP stubs only), built-in wardrobes (empty niches), all loose furniture and décor, window treatments, some electrical finals (hanging cables in places), landscaping (bare beds, patchy new grass, unrendered block boundary wall), and the **swimming pool — excavated pit only**.

**Implications:**
1. *Every visible finish is real and photographable* — whoever produces the walkthrough can match floors, tiles, doors and bathroom fixtures from footage/photos instead of guessing from renders. This shrinks Plan C's modeling risk and cost.
2. *The AI-staging budget lane gets stronger*: rooms already have final floors, paint and light fixtures, so AI only needs to add furniture — its weakest skill (changing materials) isn't needed.
3. *The remaining gap is almost exactly what Kymera's 3D scene contains* (furniture, kitchen, wardrobes, décor, landscaping) — reinforcing Plan A as the primary move.
4. *The video is good reference material* (steady enough, daylight, full coverage: approach, ground floor, garden, stairs, upper floor, bathrooms, balconies) but remains below 3D-reconstruction quality due to WhatsApp compression and fast pans — the re-shoot advice stands only if a scan route is ever attempted.
5. *Landscaping/pool are unfinished in reality* — make sure the walkthrough brief explicitly includes finished pool + garden from the design scene, as these will sell the exterior shots.

### Appendix B — Design package audit (Kymera "The Palm Niche" deck, 58 pages, reviewed July 2026)

**Confirmed:** the design is for this exact villa — the entrance stepping-stone path, round dark columns, wood-slat band above the entry, fence pier layout, and Red Sea mountain backdrop in the renders all match the site video. The renders are 3ds Max work ("3DS Presentation"), so Kymera holds the furnished scene. One page header oddity: every page reads "MR KARIM ELHELALY /// **ALMAZA**" — likely an internal client/address label; confirm with Kymera that the scene is the El Gouna villa's final revision.

**What the deck contains:** cover + section dividers; Ground Floor 01 (Entrance & Staircase, Reception/Dining/Kitchen ~9 views, Powder Room, Guest Toilet, Guest Bedroom ×3, Guest Bathroom); Ground Floor 02 (Reception & Dining ×5); Landscape (day ×7 + night ×7: pergola with outdoor kitchen/bar, outdoor dining, garden lounge, entrance path); First Floor (Master Bedroom ×5, Master Dressing, Master Bathroom, General Bedroom ×5, General Bathroom ×2); Thank-You page with Kymera contacts (kymeradesigns.com). Several pages carry blue-pen review markups — evidence of a revision round; request the *final* approved scene.

**What the deck does NOT contain** (keep these in the asset request): floor plans, dimensions, FF&E/furniture schedule, material schedule, lighting plan.

**Design language** (for briefing any artist): coastal-boho — white/ivory textured plaster, light large-format floors, rattan/cane wardrobe fronts and furniture, jute rugs, woven pendant lights, wood ceiling fans, palm-motif artwork, LED-backlit plaster niche wall in reception, terrazzo master bathroom, black-frame glazing.

**Design ↔ as-built deviations to resolve in the walkthrough brief:**
1. **Pool:** the site shows what appears to be a pool excavation; NO pool exists anywhere in the landscape renders. The walkthrough scene must add the pool (get its drawings from the pool contractor) or the exterior shots will contradict reality.
2. **Staircase:** render shows light stone treads + thin metal handrail + LED step lights; as-built has dark stone treads + glass balustrade. Decide which the walkthrough shows (as-built recommended).
3. **Floor tone:** as-built ground-floor tile is warmer/darker greige than the near-white renders — the scene's floor material should be matched to reality for honesty.
4. **Reception niche wall** (organic LED-backlit shelving) is a to-be-built gypsum feature, not yet on site — confirm it's still planned before featuring it.
5. **Roof terrace** exists on site (glass balustrades, visible in video) but has no design pages — decide whether the walkthrough includes it.
6. **Ceilings:** renders show textured plaster + cornice in bedrooms; as-built ceilings are smooth painted — minor, but pick one for the scene.

### Appendix C — source notes

Figures marked *(estimate)* are modeled from published marketplace rates, not live quotes. Published anchors used: Upwork architectural-rendering rate page ($20–40/hr, median ~$25); Trim Render public $75/sec flat rate (single-vendor anchor); NoTriangle $5,000–30,000 per 30–60 s; ArchiCGI animation from $3,600; Stuccco/BoxBrownie staging price pages; Runway/Veo/Kling 2026 pricing pages via trackers; Shapespark $35/$58/mo (2026-verified); Kuula ~$16–20/mo; 3DVista $499 one-time; CubiCasa pricing page; Matterport 2026 plan guides. Vendor capability claims (Matterport "Genesis" generative staging, splat AI staging, "SketchUp-to-UE5 in an hour") were treated as marketing until corroborated and are excluded from the recommendation where unverified.
