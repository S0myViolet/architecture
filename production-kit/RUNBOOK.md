# DIY Walkthrough Runbook — no vendors, no Kymera contact

You are making a furnished-home walkthrough yourself, using AI tools, from two assets you already own: the empty-house video and Kymera's design renders. Total cost roughly **$0–100**, one weekend of work plus retries.

## What's in this kit

| Folder | Contents |
|---|---|
| `empty-frames/` | 13 clean frames of the empty house, one per room/area, pulled from your site video (464×832 portrait) |
| `design-renders/` | All 58 pages of the Kymera presentation as individual images (`page-NN.jpg` — see map below) |
| `pairs/` | Side-by-side sheets: your empty room LEFT, Kymera's target design RIGHT — the exact input for AI staging |

**Render page map:** 03 entrance/stair · 04–13 reception/dining/kitchen · 14 powder · 15 guest WC · 16–18 guest bedroom · 19 guest bath · 21–25 reception (more angles) · 27–34 landscape day · 35–42 landscape night · 44–48 master bedroom · 49 dressing · 50 master bath · 51–55 general bedroom · 56–57 general bath.

## The pipeline

**Stage stills → animate each still → stitch into a film.** No 3D software, no render farm. A 60–120 second cut of 10–14 room shots is very achievable.

### Phase 0 — Better inputs (strongly recommended, next site visit)

The video frames work for testing, but they're 464×832 WhatsApp-compressed. For the final version, shoot **photos**: phone camera (not video), **landscape**, main lens (not 0.5× — it distorts), chest height, stand in a corner aiming at the far corner, HDR on, midday. Two shots per room, every room + terrace + garden + front. Re-run Phase 1 on those and quality jumps a full tier. If you'd rather keep the vertical/reel format for WhatsApp/Instagram sharing, portrait photos are fine too — just be consistent.

### Phase 1 — Stage each room (the design transfer)

For each sheet in `pairs/`: open **Gemini** (gemini.google.com, image editing — free tier works; Google AI Studio for more control). Upload **both** images from the pair (the empty frame and the render), then prompt:

> *Furnish and decorate the room in the first photo so it exactly matches the interior design shown in the second image: same furniture pieces, same layout, same rugs, artwork, lighting fixtures and plants. Keep the first photo's architecture, camera angle, walls, floor, windows and lighting direction unchanged. Photorealistic result.*

Iterate: if the sofa's wrong, reply "keep everything, but make the sofa match the reference exactly." Save the best take per room at max resolution.

- Alternative tools if Gemini disappoints on a room: Flux Kontext (via fal.ai / Krea), or Virtual Staging AI ($16/mo, has "custom style from reference" but matches style, not exact pieces).
- Bathrooms/powder room are already 90% fitted — often need only décor, towels, plants. Sometimes skip staging entirely.
- The garden pairs (01–03): also tell it to *"complete the landscaping: green lawn, mature planting, finished boundary fence with dark horizontal slats."*

### Phase 2 — Animate each staged still (6–8 s per room)

Use **Kling** (klingai.com, ~$10/mo tier) or **Veo 3.1 inside the Gemini app** or **Runway** ($12/mo). Feed each staged still as the **start frame**, prompt:

> *Slow smooth dolly forward through the room at walking pace, camera at eye level, no people, photorealistic interior, consistent lighting, subtle depth parallax.*

Rules that keep it believable: slow moves only (dolly-in, gentle pan — never orbit), 1 move per clip, generate 2–4 takes and keep the best, expect ~1 in 3 to be usable. For the exterior, a slow push-in toward the front door works beautifully as the opening shot.

Budget: 12 rooms × 3 takes × 6 s ≈ 200 s of generation — inside a $10–30/mo tier on Kling; roughly $30–60 via Veo API pricing.

### Phase 3 — The edit (CapCut, free)

1. Order the clips as a real visit: street → entrance path → front door → reception/dining → kitchen wall → garden & terrace → staircase → master bedroom → other bedrooms → bathroom beauty shot → balcony/sunset ending (use a night landscape render, pages 35–42, as a closing still).
2. Cut on motion: each clip 4–6 s, cut while the camera is still moving — it reads as one continuous walk.
3. Music: one calm track (CapCut's library or artlist.io single license ~$20). Fade in/out.
4. Title card: "The Palm Niche — El Gouna" over the exterior shot; end card over the night render.
5. Export 1080p (or 9:16 vertical for WhatsApp/IG). Optional: CapCut "Enhance"/Topaz upscale pass.

## What to expect

Polished, emotional, shareable — a real "this is what our home becomes" film. **Not**: SKU-exact furniture in every shot, or the same sofa pixel-identical between two shots of the same room. AI furniture is "faithful to the design," not manufactured from it. Avoid showing two AI clips of the same room back-to-back and nobody will notice.

## Upgrade paths (later, still without contacting Kymera)

- **$300–1,500:** hand this exact kit to one Upwork/Fiverr "AI video" freelancer to run the same pipeline with pro polish.
- **$2,000–6,000:** hand this kit + a CubiCasa phone scan to an Egyptian archviz freelancer/studio to rebuild the villa in real 3D and render a true cinematic walkthrough + 360° tour (see `../el-gouna-walkthrough-strategy.md`, Plan C — the deck serves as the complete art-direction brief).
