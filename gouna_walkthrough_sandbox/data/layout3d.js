/* ============================================================
   3D layout v6 — ALMAZA, SAHEL — FULL STRUCTURAL REBUILD
   Rebuilt per data/source_understanding/full_structure_rebuild_diagnosis.md
   from the walkthrough evidence (timestamps are evidence markers only).
   LAYOUT ONLY — no furniture, no toggles.

   Orientation (corner lot, unit 14A):
     garden/rear = NORTH (z<0, preserved anchor)
     FRONT STREET = SOUTH (z>12.6): approach path, recessed entry,
       carport at the SE corner where the two streets meet
     side street = EAST · neighbour villa = WEST
   x 0→15.6 W→E, z 0→12.6 N→S. Floor height 3.4m · eye 1.65m.

   Structure (video-derived):
   - Entry = deep recess in the SOUTH façade (gray stone west flank,
     timber east flank, slat band, 4-panel slider) → straight through
     the open living to the garden glazing (see-through, P1 00:16).
   - Living opens N (sliders) + W (glazing return, corner wrap).
   - L-stair hugs the SE corner: flight A east along the front wall,
     landing SE, flight B north along the east wall (window strip),
     lobby open to the living/hall (P1 00:25 sight-line).
   - Continuous balcony wrap upstairs: N terrace → E long balcony
     (linear drain) → SE over the carport → FRONT street balcony
     (skylight box over flight A, room sliders) → W stone-parapet
     terrace (P3/P4/P5 + final anchors).
   conf: "c"=confirmed · "i"=inferred · "a"=assumed
   ============================================================ */
window.LAYOUT3D = {
  floorHeight: 3.4,
  eyeHeight: 1.65,
  showFurniture: false,
  showDebug: true,

  zones: [
    /* ---------- ground ---------- */
    { id: "carport",    conf: "c", roomId: "exterior-entrance", name: "Carport",             floor: 0, rect: [12.6, 13.6, 16.6, 17.8], at: [14.6, 15.7], look: [5.4, 11.6] },
    { id: "path",       conf: "c", roomId: "exterior-entrance", name: "Entry Path",          floor: 0, rect: [3.8, 12.6, 12.6, 15.0],  at: [9.2, 13.8],  look: [5.4, 11.5] },
    { id: "porch",      conf: "c", roomId: "exterior-entrance", name: "Entry Porch",         floor: 0, rect: [3.8, 10.7, 7.0, 12.6],  at: [5.4, 11.6],  look: [5.4, 3.5] },
    { id: "living",     conf: "c", roomId: "living-area",       name: "Living & Reception",  floor: 0, rect: [0, 0, 8.8, 7.4],        at: [4.4, 3.4], stand: [6.4, 5.6], look: [1.4, 0.8] },
    { id: "kitchen",    conf: "i", roomId: "dining-kitchen",    name: "Kitchen",             floor: 0, rect: [8.8, 0, 12.2, 4.2],     at: [10.5, 2.1], stand: [10.0, 3.4], look: [11.4, 0.8] },
    { id: "side-room",  conf: "c", roomId: "living-area",       name: "Side Room (AC)",      floor: 0, rect: [12.2, 0, 15.6, 4.6],    at: [13.9, 2.3], stand: [13.1, 3.6], look: [14.9, 2.4] },
    { id: "powder",     conf: "c", roomId: "powder-room",       name: "Vanity Nook",         floor: 0, rect: [12.2, 4.6, 13.9, 6.9],  at: [13.0, 5.75] },
    { id: "guest-wc",   conf: "c", roomId: "bathrooms",         name: "Guest WC",            floor: 0, rect: [13.9, 4.6, 15.6, 6.9],  at: [14.7, 5.75] },
    { id: "hall",       conf: "c", roomId: null,                name: "Hall",                floor: 0, rect: [8.8, 4.2, 12.2, 8.7],   at: [10.5, 6.4] },
    { id: "stair-hall", conf: "c", roomId: "staircase",         name: "Stair Lobby",         floor: 0, rect: [7.0, 8.7, 15.6, 12.6],  at: [8.6, 10.0], stand: [8.3, 9.7], look: [12.4, 11.85] },
    { id: "guest-room", conf: "c", roomId: "guest-bedroom",     name: "Guest / Service Room",floor: 0, rect: [0, 9.0, 3.8, 12.6],     at: [1.9, 10.8], stand: [2.8, 9.9], look: [0.9, 11.8] },
    { id: "bath-g",     conf: "i", roomId: "bathrooms",         name: "Bathroom (beige)",    floor: 0, rect: [0, 7.4, 2.0, 9.0],      at: [1.0, 8.2] },
    { id: "store",      conf: "a", roomId: null,                name: "Store / Service",     floor: 0, rect: [2.0, 7.4, 3.8, 9.0],    at: [2.9, 8.2] },
    { id: "colonnade",  conf: "c", roomId: "front-terrace",     name: "Garden Colonnade",    floor: 0, rect: [3.0, -2.6, 15.6, 0],    at: [7.9, -1.5], look: [7.9, -5] },
    { id: "out-dining", conf: "i", roomId: "front-terrace",     name: "Outdoor Dining",      floor: 0, rect: [0, -2.6, 3.0, 0],       at: [1.5, -1.3], look: [1.5, -4] },
    { id: "out-lounge", conf: "i", roomId: "garden",            name: "Garden Lounge",       floor: 0, rect: [10.8, -4.8, 15.0, -1.0],at: [12.9, -2.9], look: [8, 0] },
    { id: "garden",     conf: "c", roomId: "garden",            name: "Garden",              floor: 0, rect: [0, -6.5, 15.6, -2.6],   at: [6.0, -4.4], look: [6.0, 0] },
    { id: "side-terr",  conf: "c", roomId: "front-terrace",     name: "Side Passage (east)", floor: 0, rect: [15.6, 0, 17.8, 8.2],    at: [16.6, 4.6], look: [15.9, 2.6] },

    /* ---------- first floor (elements confirmed; partitions assumed — no upper plan) ---------- */
    { id: "hall-up",    conf: "c", roomId: null,                name: "Upper Hall",          floor: 1, rect: [0, 6.6, 15.6, 8.9],     at: [7.6, 7.75] },
    { id: "stairwell",  conf: "c", roomId: "staircase",         name: "Stairwell",           floor: 1, rect: [13.4, 8.9, 15.6, 12.6], at: [14.0, 9.4] },
    { id: "master",     conf: "i", roomId: "master-bedroom",    name: "Master Bedroom",      floor: 1, rect: [0, 0, 6.4, 6.6],        at: [3.2, 3.3], stand: [4.9, 5.2], look: [1.0, 1.0] },
    { id: "m-ensuite",  conf: "i", roomId: "bathrooms",         name: "Master Ensuite",      floor: 1, rect: [6.4, 0, 8.8, 3.0],      at: [7.6, 1.5] },
    { id: "dressing",   conf: "i", roomId: "master-bedroom",    name: "Dressing",            floor: 1, rect: [6.4, 3.0, 8.8, 6.6],    at: [7.6, 4.8] },
    { id: "bedroom-2",  conf: "i", roomId: "bedroom-2",         name: "Bedroom 2",           floor: 1, rect: [8.8, 0, 12.2, 6.6],     at: [10.5, 3.3], stand: [11.2, 5.2], look: [9.4, 0.8] },
    { id: "bedroom-3",  conf: "i", roomId: "bedroom-2",         name: "Bedroom 3",           floor: 1, rect: [12.2, 0, 15.6, 6.6],    at: [13.9, 3.3], stand: [12.9, 5.2], look: [14.9, 2.4] },
    { id: "bath-2",     conf: "i", roomId: "bathrooms",         name: "Bathroom (gray)",     floor: 1, rect: [0, 8.9, 2.6, 12.6],     at: [1.3, 10.7] },
    { id: "bath-3",     conf: "i", roomId: "bathrooms",         name: "Bathroom 2 (gray)",   floor: 1, rect: [2.6, 8.9, 5.2, 12.6],   at: [3.9, 10.7] },
    { id: "room-x",     conf: "c", roomId: "bedroom-2",         name: "Street Room (AC)",    floor: 1, rect: [5.2, 8.9, 9.8, 12.6],   at: [7.5, 10.7], stand: [7.5, 10.2], look: [7.5, 14.0] },
    { id: "room-y",     conf: "c", roomId: "bedroom-2",         name: "Room (balcony door)", floor: 1, rect: [9.8, 8.9, 13.4, 11.2],  at: [11.6, 10.0], stand: [11.0, 9.8], look: [12.5, 11.6] },
    { id: "balc-sky",   conf: "i", roomId: "upper-balcony",     name: "Skylight Balcony",    floor: 1, rect: [9.8, 11.2, 13.4, 12.6], at: [12.7, 11.9], look: [10.6, 12.0] },
    { id: "terrace-w",  conf: "c", roomId: "upper-balcony",     name: "West Terrace (stone parapet)", floor: 1, rect: [-2.4, 0, 0, 12.6], at: [-1.2, 4.0], look: [-5, 5] },
    { id: "terrace-n",  conf: "c", roomId: "upper-balcony",     name: "North Terrace",       floor: 1, rect: [0, -2.6, 15.6, 0],      at: [4.6, -1.3], look: [4.6, -6] },
    { id: "balcony-e",  conf: "c", roomId: "upper-balcony",     name: "East Balcony (long)", floor: 1, rect: [15.6, -2.55, 16.9, 14.0], at: [16.25, 5.0], look: [16.25, 10.5] },
    { id: "balcony-f",  conf: "c", roomId: "upper-balcony",     name: "Street Balcony (front)", floor: 1, rect: [0, 12.6, 15.6, 14.0], at: [7.5, 13.3], look: [7.5, 17.5] }
  ],

  walls: {
    ground: [
      /* outer — N (garden): living glazing 0.6–8.8 · kitchen win 9.2–11.8 · side-room win 13.0–15.0 */
      [0, 0, 0.6, 0], [8.8, 0, 9.2, 0], [11.8, 0, 12.2, 0], [12.2, 0, 13.0, 0], [15.0, 0, 15.6, 0],
      /* outer — W: glazing return z 0.6–5.0 (custom glass in engine), wall below/after */
      [0, 0, 0, 0.6], [0, 5.0, 0, 12.6],
      /* outer — S (FRONT): guest window 0.8–2.4 (custom) · ENTRY RECESS 3.8–7.0 */
      [0, 12.6, 0.8, 12.6], [2.4, 12.6, 3.8, 12.6], [7.0, 12.6, 15.6, 12.6],
      /* outer — E: side-room slider 1.6–3.6 · WC high window 5.4–6.4 (custom) · stair window 9.0–12.5 (custom) */
      [15.6, 0, 15.6, 1.6], [15.6, 3.6, 15.6, 5.4], [15.6, 6.4, 15.6, 9.0],
      /* ENTRY RECESS: west flank (gray stone) · east flank/lobby wall (timber) · back wall w/ slider 4.3–6.5 */
      [3.8, 10.7, 3.8, 12.6],
      [7.0, 8.7, 7.0, 12.6],
      [3.8, 10.7, 4.3, 10.7], [6.5, 10.7, 7.0, 10.7],
      /* living | kitchen (opening z 0.8–3.4) */
      [8.8, 0, 8.8, 0.8], [8.8, 3.4, 8.8, 4.2],
      /* kitchen | hall (opening x 9.4–11.6) */
      [8.8, 4.2, 9.4, 4.2], [11.6, 4.2, 12.2, 4.2],
      /* side room: W wall w/ door z 2.2–3.2 · S wall */
      [12.2, 0, 12.2, 2.2], [12.2, 3.2, 12.2, 4.6],
      [12.2, 4.6, 15.6, 4.6],
      /* vanity nook | WC (door z 5.4–6.2) · powder block S wall */
      [13.9, 4.6, 13.9, 5.4], [13.9, 6.2, 13.9, 6.9],
      [12.2, 6.9, 15.6, 6.9],
      /* SW service block: N wall (bath door 0.8–1.8 · store door 2.6–3.4) */
      [0, 7.4, 0.8, 7.4], [1.8, 7.4, 2.6, 7.4], [3.4, 7.4, 3.8, 7.4],
      [2.0, 7.4, 2.0, 9.0],
      [0, 9.0, 3.8, 9.0],
      /* service block E wall (guest door z 9.6–10.6) */
      [3.8, 7.4, 3.8, 9.6], [3.8, 10.6, 3.8, 10.7]
    ],
    first: [
      /* outer — N: master slider 0.8–3.2 (open) · ensuite win 6.9–8.1 · bed2 win 9.4–11.6 · bed3 win 12.8–15.0 */
      [0, 0, 0.8, 0], [3.2, 0, 6.9, 0], [8.1, 0, 9.4, 0], [11.6, 0, 12.8, 0], [15.0, 0, 15.6, 0],
      /* outer — W (terrace slider z 2.0–4.4) */
      [0, 0, 0, 2.0], [0, 4.4, 0, 12.6],
      /* outer — E: bed3 balcony door 1.6–3.0 · hall balcony door 6.9–8.1 */
      [15.6, 0, 15.6, 1.6], [15.6, 3.0, 15.6, 6.9], [15.6, 8.1, 15.6, 12.6],
      /* outer — S (street): room-x slider 6.4–8.4 · skylight-balcony gap 9.8–13.4 */
      [0, 12.6, 6.4, 12.6], [8.4, 12.6, 9.8, 12.6], [13.4, 12.6, 15.6, 12.6],
      /* hall N wall: master door 2.8–3.8 · bed2 door 9.7–10.7 · bed3 door 12.9–13.9 */
      [0, 6.6, 2.8, 6.6], [3.8, 6.6, 9.7, 6.6], [10.7, 6.6, 12.9, 6.6], [13.9, 6.6, 15.6, 6.6],
      /* master suite internals (doors z 1.0–2.0, 4.0–5.0) */
      [6.4, 0, 6.4, 1.0], [6.4, 2.0, 6.4, 4.0], [6.4, 5.0, 6.4, 6.6],
      [6.4, 3.0, 8.8, 3.0],
      [8.8, 0, 8.8, 6.6],
      [12.2, 0, 12.2, 6.6],
      /* hall S wall: bath2 0.8–1.8 · bath3 3.4–4.4 · room-x 6.7–7.7 · room-y 11.0–12.0 · arrival OPEN 13.4→ */
      [0, 8.9, 0.8, 8.9], [1.8, 8.9, 3.4, 8.9], [4.4, 8.9, 6.7, 8.9], [7.7, 8.9, 11.0, 8.9], [12.0, 8.9, 13.4, 8.9],
      /* front band partitions */
      [2.6, 8.9, 2.6, 12.6], [5.2, 8.9, 5.2, 12.6], [9.8, 8.9, 9.8, 12.6], [13.4, 8.9, 13.4, 11.2],
      /* room-y | skylight balcony (glazed door x 11.9–12.9) */
      [9.8, 11.2, 11.9, 11.2], [12.9, 11.2, 13.4, 11.2]
    ]
  },

  doors: [
    /* ground */
    [5.4, 10.7, 2.2, "x", 0],  /* ENTRY slider at the back of the recess — P1 00:16 */
    [8.8, 2.1, 2.6, "z", 0],   /* living → kitchen opening */
    [10.5, 4.2, 2.2, "x", 0],  /* kitchen → hall opening */
    [15.6, 2.6, 2.0, "z", 0],  /* side-room slider off the east passage — P2 M01:02 */
    [12.2, 2.7, 1.0, "z", 0],  /* side room → kitchen door */
    [13.9, 5.8, 0.8, "z", 0],  /* WC door (high window room) */
    [1.3, 7.4, 1.0, "x", 0],   /* beige bathroom door */
    [3.0, 7.4, 0.8, "x", 0],   /* store door */
    [3.8, 10.1, 1.0, "z", 0],  /* guest/service room door */
    /* first */
    [3.3, 6.6, 1.0, "x", 1], [10.2, 6.6, 1.0, "x", 1], [13.4, 6.6, 1.0, "x", 1],
    [6.4, 1.5, 1.0, "z", 1], [6.4, 4.5, 1.0, "z", 1],
    [1.3, 8.9, 1.0, "x", 1], [3.9, 8.9, 1.0, "x", 1], [7.2, 8.9, 1.0, "x", 1], [11.5, 8.9, 1.0, "x", 1],
    [7.4, 12.6, 2.0, "x", 1],  /* room-x slider → street balcony — final M04:21 */
    [12.4, 11.2, 1.0, "x", 1], /* room-y → skylight balcony — P3 M02:11 */
    [0, 3.2, 2.4, "z", 1],     /* master → west terrace slider */
    [2.0, 0, 2.4, "x", 1],     /* master → north terrace slider */
    [15.6, 2.3, 1.4, "z", 1],  /* bedroom3 → east balcony */
    [15.6, 7.5, 1.2, "z", 1]   /* hall → east balcony */
  ],

  /* glazing (x-axis runs; z-axis doorways stay open with lintels; W return is custom) */
  glass: [
    [0.6, 0, 8.8, 0, 0],       /* living N sliders */
    [9.2, 0, 11.8, 0, 0],      /* kitchen window */
    [13.0, 0, 15.0, 0, 0],     /* side-room window */
    [6.9, 0, 8.1, 0, 1],       /* ensuite window */
    [9.4, 0, 11.6, 0, 1],      /* bedroom2 window */
    [12.8, 0, 15.0, 0, 1]      /* bedroom3 window */
  ],
  openGlass: [
    { floor: 0, x1: 4.2, x2: 6.0, z: 0 },
    { floor: 1, x1: 0.8, x2: 3.2, z: 0 }
  ],

  /* L-stair at the SE corner (P2 M01:41–01:51): flight A east along the front
     wall, landing SE, flight B north along the east wall (window strip beside
     it; skylight balcony above flight A). */
  stair: {
    flights: [
      { axis: "x", fixed: 11.85, from: 10.5, to: 13.35, w: 1.1, y1: 0, y2: 1.87 },
      { axis: "z", fixed: 14.0, from: 11.2, to: 9.0, w: 1.1, y1: 1.87, y2: 3.4 }
    ],
    landing: { x1: 13.35, x2: 14.5, z1: 11.2, z2: 12.4, y: 1.87 }
  },

  /* thick raw-concrete columns: 4 colonnade + 2 east passage (balcony bearers) */
  columns: [ [3.2, -1.3], [6.4, -1.3], [9.6, -1.3], [12.8, -1.3], [16.6, 2.4], [16.6, 5.6] ],

  /* timestamp-anchored debug markers (evidence refs only), tour order */
  debugAnchors: [
    { p: [17.2, 16.8], f: 0, part: 1, t: "P1 0:02", m: "M 0:02", n: "street corner · 14A" },
    { p: [14.6, 15.7], f: 0, part: 1, t: "P1 0:09", m: "M 0:09", n: "carport" },
    { p: [5.4, 11.6],  f: 0, part: 1, t: "P1 0:16", m: "M 0:16", n: "entry recess" },
    { p: [5.0, 4.6],   f: 0, part: 1, t: "P1 0:23", m: "M 0:23", n: "living" },
    { p: [7.0, 6.4],   f: 0, part: 1, t: "P1 0:25", m: "M 0:25", n: "stair seen from living" },
    { p: [5.0, -0.9],  f: 0, part: 1, t: "P1 0:29", m: "M 0:29", n: "terrace slider" },
    { p: [6.0, -4.4],  f: 0, part: 1, t: "P1 0:34", m: "M 0:34", n: "garden · no pool" },
    { p: [9.6, -1.6],  f: 0, part: 1, t: "P1 0:38", m: "M 0:38", n: "rear façade" },
    { p: [13.9, -1.0], f: 0, part: 1, t: "P1 0:49", m: "M 0:49", n: "gray service wall" },
    { p: [16.7, 0.4],  f: 0, part: 2, t: "P2 0:02", m: "M 0:53", n: "side passage · planter" },
    { p: [16.6, 4.4],  f: 0, part: 2, t: "P2 0:04", m: "M 0:55", n: "2 columns · gray wall" },
    { p: [13.9, 2.3],  f: 0, part: 2, t: "P2 0:11", m: "M 1:02", n: "side room · AC" },
    { p: [13.0, 5.75], f: 0, part: 2, t: "P2 0:22", m: "M 1:13", n: "vanity + WC" },
    { p: [10.5, 2.1],  f: 0, part: 2, t: "P2 0:30", m: "M 1:21", n: "kitchen stubs" },
    { p: [9.0, 11.0],  f: 0, part: 2, t: "P2 0:38", m: "M 1:29", n: "under-stair · panel" },
    { p: [1.9, 10.8],  f: 0, part: 2, t: "P2 0:40", m: "M 1:31", n: "service room · ladder" },
    { p: [1.0, 8.2],   f: 0, part: 2, t: "P2 0:46", m: "M 1:37", n: "beige bathroom" },
    { p: [9.6, 9.6],   f: 0, part: 2, t: "P2 0:53", m: "M 1:44", n: "look-back to living" },
    { p: [10.9, 11.85],f: 0, part: 2, t: "P2 0:58", m: "M 1:50", n: "stair ascent" },
    { p: [-1.2, 4.0],  f: 1, part: 3, t: "P3 0:01", m: "M 1:52", n: "stone-parapet terrace" },
    { p: [7.6, 7.75],  f: 1, part: 3, t: "P3 0:10", m: "M 2:01", n: "upper hall · DB" },
    { p: [3.2, 3.3],   f: 1, part: 3, t: "P3 0:15", m: "M 2:06", n: "corner bedroom" },
    { p: [12.7, 11.9], f: 1, part: 3, t: "P3 0:20", m: "M 2:11", n: "skylight over stair" },
    { p: [15.4, 13.3], f: 1, part: 3, t: "P3 0:27", m: "M 2:18", n: "balcony over carport" },
    { p: [16.25, 2.1], f: 1, part: 3, t: "P3 0:40", m: "M 2:31", n: "E balcony · slat + drain" },
    { p: [1.3, 10.7],  f: 1, part: 3, t: "P3 0:54", m: "M 2:45", n: "gray bathroom" },
    { p: [11.6, 10.0], f: 1, part: 4, t: "P4",      m: "M 3:06", n: "room w/ AC" },
    { p: [13.9, 3.3],  f: 1, part: 4, t: "P4",      m: "M 3:16", n: "room · balcony door" },
    { p: [16.25, 8.6], f: 1, part: 4, t: "P4",      m: "M 3:26", n: "long balcony walkway" },
    { p: [16.25, 12.6],f: 1, part: 5, t: "P5",      m: "M 3:33", n: "balcony corner (boundary-verified)" },
    { p: [7.5, 10.5],  f: 1, part: 5, t: "F",       m: "M 4:21", n: "street room · slider" },
    { p: [7.5, 13.3],  f: 1, part: 5, t: "F",       m: "M 4:31", n: "front balcony over path" }
  ],

  start: { pos: [16.8, 17.4], floor: 0, lookAt: [5.4, 11.5] }
};
