/* ============================================================
   3D layout v5 — ALMAZA, SAHEL — TIMESTAMP-ANCHORED RECONSTRUCTION
   Built from the 5-part timestamp protocol:
   data/source_understanding/timeline_registry.md + part1..part5
   anchor maps / evidence / corrections + final_consolidation.md.
   LAYOUT ONLY — no furniture.

   Timebase: split clips P1/P2/P3 offset +0 / +51.37s / +111.38s
   (metadata); original-video anchors (P4/P5) carry NO offset.

   Axes: garden = NORTH (z<0, preserved anchor) · entry path +
   carport = WEST/SW · main street = S · side street = E (corner
   lot, unit 14A). x 0→15.6 W→E, z 0→12.6 N→S.
   Floor height 3.4m (plan: 20 risers) · eye 1.65m · doors 2.1m head.

   conf: "c"=confirmed (timestamped frames) · "i"=inferred · "a"=assumed
   ============================================================ */
window.LAYOUT3D = {
  floorHeight: 3.4,
  eyeHeight: 1.65,
  showFurniture: false,
  showDebug: true,

  zones: [
    /* ---------- ground ---------- */
    { id: "carport",    conf: "c", roomId: "exterior-entrance", name: "Carport",            floor: 0, rect: [-4.8, 8.2, -1.2, 12.4], at: [-3.0, 10.3], look: [-1.4, 4.5] },
    { id: "path",       conf: "c", roomId: "exterior-entrance", name: "Entry Path",         floor: 0, rect: [-2.0, 1.0, 0, 8.2],     at: [-1.0, 6.2],  look: [-1.0, 2.0] },
    { id: "porch",      conf: "c", roomId: "exterior-entrance", name: "Porch",              floor: 0, rect: [-2.4, 1.0, 0, 4.4],     at: [-1.2, 2.7],  look: [2.5, 2.7] },
    { id: "living",     conf: "c", roomId: "living-area",       name: "Living & Reception", floor: 0, rect: [0, 0, 9.4, 6.2],        at: [4.2, 2.6], stand: [7.8, 4.9], look: [1.6, 1.2] },
    { id: "kitchen",    conf: "i", roomId: "dining-kitchen",    name: "Kitchen",            floor: 0, rect: [9.4, 0, 12.6, 4.2],     at: [11.0, 2.1], stand: [10.2, 3.4], look: [12.0, 1.0] },
    { id: "den",        conf: "c", roomId: "living-area",       name: "Family Room (AC)",   floor: 0, rect: [12.6, 0, 15.6, 6.2],    at: [14.1, 2.6], stand: [13.4, 5.0], look: [14.9, 2.2] },
    { id: "powder",     conf: "c", roomId: "powder-room",       name: "Powder / Vanity",    floor: 0, rect: [9.4, 4.2, 11.2, 6.2],   at: [10.3, 5.2] },
    { id: "guest-wc",   conf: "c", roomId: "bathrooms",         name: "Guest WC",           floor: 0, rect: [11.2, 4.2, 12.6, 6.2],  at: [11.9, 5.2] },
    { id: "corridor",   conf: "c", roomId: null,                name: "Corridor",           floor: 0, rect: [0, 6.2, 15.6, 8.8],     at: [7.6, 7.5] },
    { id: "guest-bed",  conf: "c", roomId: "guest-bedroom",     name: "Guest Bedroom",      floor: 0, rect: [0, 8.8, 3.8, 12.6],     at: [1.9, 10.7], stand: [2.9, 9.5], look: [1.0, 11.6] },
    { id: "guest-sh",   conf: "c", roomId: "bathrooms",         name: "Guest Shower",       floor: 0, rect: [3.8, 8.8, 5.4, 12.6],   at: [4.6, 10.7] },
    { id: "drivers",    conf: "i", roomId: null,                name: "Driver's Room",      floor: 0, rect: [5.4, 8.8, 8.2, 12.6],   at: [6.8, 10.7] },
    { id: "drivers-wc", conf: "i", roomId: null,                name: "Driver's WC",        floor: 0, rect: [8.2, 8.8, 9.4, 12.6],   at: [8.8, 10.7] },
    { id: "stair-hall", conf: "c", roomId: "staircase",         name: "Stair Lobby",        floor: 0, rect: [9.4, 8.8, 15.6, 12.6], at: [10.6, 9.8], stand: [10.0, 9.6], look: [13.0, 11.9] },
    { id: "colonnade",  conf: "c", roomId: "front-terrace",     name: "Garden Colonnade",   floor: 0, rect: [3.0, -2.6, 15.6, 0],    at: [7.9, -1.5], look: [7.9, -5] },
    { id: "out-dining", conf: "i", roomId: "front-terrace",     name: "Outdoor Dining",     floor: 0, rect: [0, -2.6, 3.0, 0],       at: [1.5, -1.3], look: [1.5, -4] },
    { id: "out-lounge", conf: "i", roomId: "garden",            name: "Garden Lounge",      floor: 0, rect: [10.8, -4.8, 15.0, -1.0],at: [12.9, -2.9], look: [8, 0] },
    { id: "garden",     conf: "c", roomId: "garden",            name: "Garden",             floor: 0, rect: [0, -6.5, 15.6, -2.6],   at: [6.0, -4.4], look: [6.0, 0] },
    { id: "side-terr",  conf: "c", roomId: "front-terrace",     name: "Side Terrace (east)",floor: 0, rect: [15.6, 0, 17.8, 8.2],    at: [16.6, 4.6], look: [15.9, 3.0] },

    /* ---------- first floor (partitions assumed; elements confirmed) ---------- */
    { id: "hall-up",    conf: "c", roomId: null,                name: "Upper Hall",         floor: 1, rect: [0, 6.2, 15.6, 8.8],     at: [7.6, 7.5] },
    { id: "stairwell",  conf: "c", roomId: "staircase",         name: "Stairwell",          floor: 1, rect: [13.4, 8.8, 15.6, 12.6], at: [14.05, 9.5] },
    { id: "master",     conf: "i", roomId: "master-bedroom",    name: "Master Bedroom",     floor: 1, rect: [0, 0, 6.2, 6.2],        at: [3.1, 3.1], stand: [4.9, 5.0], look: [1.0, 1.2] },
    { id: "m-ensuite",  conf: "i", roomId: "bathrooms",         name: "Master Ensuite",     floor: 1, rect: [6.2, 0, 8.4, 2.8],      at: [7.3, 1.4] },
    { id: "dressing",   conf: "i", roomId: "master-bedroom",    name: "Dressing",           floor: 1, rect: [6.2, 2.8, 8.4, 6.2],    at: [7.3, 4.5] },
    { id: "bedroom-2",  conf: "i", roomId: "bedroom-2",         name: "Bedroom 2",          floor: 1, rect: [8.4, 0, 12.0, 6.2],     at: [10.2, 3.1], stand: [11.0, 5.0], look: [9.2, 1.0] },
    { id: "bedroom-3",  conf: "i", roomId: "bedroom-2",         name: "Bedroom 3",          floor: 1, rect: [12.0, 0, 15.6, 6.2],    at: [13.8, 3.1], stand: [12.8, 5.0], look: [14.6, 1.0] },
    { id: "bath-2",     conf: "i", roomId: "bathrooms",         name: "Bathroom (gray)",    floor: 1, rect: [0, 8.8, 2.8, 12.6],     at: [1.4, 10.7] },
    { id: "bath-3",     conf: "i", roomId: "bathrooms",         name: "Bathroom 2 (gray)",  floor: 1, rect: [2.8, 8.8, 5.4, 12.6],   at: [4.1, 10.7] },
    { id: "laundry",    conf: "a", roomId: null,                name: "Laundry",            floor: 1, rect: [5.4, 8.8, 8.2, 12.6],   at: [6.8, 10.7] },
    { id: "room-x",     conf: "a", roomId: null,                name: "Room",               floor: 1, rect: [8.2, 8.8, 13.4, 11.0],  at: [10.6, 9.9] },
    { id: "balc-sky",   conf: "i", roomId: "upper-balcony",     name: "Skylight Balcony",   floor: 1, rect: [10.0, 11.0, 13.4, 12.6],at: [12.7, 11.8], look: [10.8, 12.0] },
    { id: "terrace-w",  conf: "c", roomId: "upper-balcony",     name: "West Terrace (stone parapet)", floor: 1, rect: [-2.4, 0, 0, 12.6], at: [-1.2, 4.0], look: [-5, 5] },
    { id: "terrace-n",  conf: "c", roomId: "upper-balcony",     name: "North Terrace",      floor: 1, rect: [0, -2.6, 15.6, 0],      at: [4.6, -1.3], look: [4.6, -6] },
    { id: "balcony-e",  conf: "c", roomId: "upper-balcony",     name: "East Balcony (long)",floor: 1, rect: [15.6, -2.55, 16.9, 11.0], at: [16.25, 5.5], look: [16.25, 9.5] }
  ],

  walls: {
    ground: [
      /* outer shell — N */
      [0, 0, 0.6, 0],                                    /* N: living glazing 0.6–9.4 */
      [9.4, 0, 9.9, 0], [12.1, 0, 12.6, 0],              /* kitchen window 9.9–12.1 */
      [12.6, 0, 13.1, 0], [15.1, 0, 15.6, 0],            /* den window 13.1–15.1 */
      /* outer — W (ENTRY slider gap z 1.6–3.8) */
      [0, 0, 0, 1.6], [0, 3.8, 0, 12.6],
      /* outer — E: den slider gap z 2.0–4.0 (P2 M01:02) · stair window sill z 9.2–12.6 built in engine */
      [15.6, 0, 15.6, 2.0], [15.6, 4.0, 15.6, 9.2],
      /* outer — S */
      [0, 12.6, 15.6, 12.6],
      /* living | kitchen (opening z 0.8–3.4) */
      [9.4, 0, 9.4, 0.8], [9.4, 3.4, 9.4, 4.2],
      /* kitchen S wall */
      [9.4, 4.2, 12.6, 4.2],
      /* den W wall */
      [12.6, 0, 12.6, 6.2],
      /* powder | guest wc */
      [11.2, 4.2, 11.2, 6.2],
      /* living | corridor: WIDE opening 0.8–9.4 (P1 00:25 stair sight-line) */
      [0, 6.2, 0.8, 6.2],
      /* corridor N wall east part: powder 10.0–10.8, wc 11.6–12.4, den 13.6–14.6 */
      [9.4, 6.2, 10.0, 6.2], [10.8, 6.2, 11.6, 6.2], [12.4, 6.2, 13.6, 6.2], [14.6, 6.2, 15.6, 6.2],
      /* corridor S wall: guest bed 1.6–2.8 · drivers 6.2–7.2 · drivers wc 8.4–9.2 · OPEN 9.4→ (lobby) */
      [0, 8.8, 1.6, 8.8], [2.8, 8.8, 6.2, 8.8], [7.2, 8.8, 8.4, 8.8], [9.2, 8.8, 9.4, 8.8],
      /* south band partitions */
      [3.8, 8.8, 3.8, 10.2], [3.8, 11.2, 3.8, 12.6],     /* guest bed | shower, door z 10.2–11.2 */
      [5.4, 8.8, 5.4, 12.6],
      [8.2, 8.8, 8.2, 12.6],
      [9.4, 8.8, 9.4, 12.6]                              /* drivers wc | stair lobby */
    ],
    first: [
      /* outer — N: master slider 0.8–3.2 · ensuite win 6.7–7.9 · bed2 win 9.0–11.4 · bed3 win 12.6–15.0 */
      [0, 0, 0.8, 0], [3.2, 0, 6.7, 0], [7.9, 0, 9.0, 0], [11.4, 0, 12.6, 0], [15.0, 0, 15.6, 0],
      /* outer — W (terrace slider z 2.0–4.4) */
      [0, 0, 0, 2.0], [0, 4.4, 0, 12.6],
      /* outer — E: bed3 balcony door 1.4–2.8 · hall balcony door 6.9–8.1 */
      [15.6, 0, 15.6, 1.4], [15.6, 2.8, 15.6, 6.9], [15.6, 8.1, 15.6, 12.6],
      /* outer — S: OPEN 10.0–13.4 for the skylight balcony (P3 M02:11) */
      [0, 12.6, 10.0, 12.6], [13.4, 12.6, 15.6, 12.6],
      /* hall N wall: master door 3.0–4.0 · bed2 door 9.6–10.6 · bed3 door 13.2–14.2 */
      [0, 6.2, 3.0, 6.2], [4.0, 6.2, 9.6, 6.2], [10.6, 6.2, 13.2, 6.2], [14.2, 6.2, 15.6, 6.2],
      /* master | ensuite + dressing (internal doors z 1.0–2.0, z 4.0–5.0) */
      [6.2, 0, 6.2, 1.0], [6.2, 2.0, 6.2, 4.0], [6.2, 5.0, 6.2, 6.2],
      [6.2, 2.8, 8.4, 2.8],
      [8.4, 0, 8.4, 6.2],
      [12.0, 0, 12.0, 6.2],
      /* hall S wall: bath2 0.9–1.9 · bath3 3.5–4.5 · laundry 6.2–7.2 · room 9.0–10.0 · stair arrival OPEN 13.2→ */
      [0, 8.8, 0.9, 8.8], [1.9, 8.8, 3.5, 8.8], [4.5, 8.8, 6.2, 8.8], [7.2, 8.8, 9.0, 8.8], [10.0, 8.8, 13.2, 8.8],
      /* south band partitions */
      [2.8, 8.8, 2.8, 12.6], [5.4, 8.8, 5.4, 12.6], [8.2, 8.8, 8.2, 12.6],
      /* room-x | skylight balcony (glazed door gap x 12.0–13.0) + balcony W wall + stair W wall */
      [8.2, 11.0, 12.0, 11.0], [13.0, 11.0, 13.4, 11.0],
      [10.0, 11.0, 10.0, 12.6],
      [13.4, 8.8,13.4, 11.0]
    ]
  },

  doors: [
    /* ground */
    [0, 2.7, 2.2, "z", 0],     /* ENTRY slider (open leaf) — P1 00:16 */
    [9.4, 2.1, 2.6, "z", 0],   /* living → kitchen opening */
    [15.6, 3.0, 2.0, "z", 0],  /* family room slider off the side terrace — P2 M01:02 */
    [10.4, 6.2, 0.8, "x", 0], [12.0, 6.2, 0.8, "x", 0], [14.1, 6.2, 1.0, "x", 0],
    [2.2, 8.8, 1.2, "x", 0], [3.8, 10.7, 1.0, "z", 0],
    [6.7, 8.8, 1.0, "x", 0], [8.8, 8.8, 0.8, "x", 0],
    /* first */
    [3.5, 6.2, 1.0, "x", 1], [10.1, 6.2, 1.0, "x", 1], [13.7, 6.2, 1.0, "x", 1],
    [6.2, 1.5, 1.0, "z", 1], [6.2, 4.5, 1.0, "z", 1],
    [1.4, 8.8, 1.0, "x", 1], [4.0, 8.8, 1.0, "x", 1], [6.7, 8.8, 1.0, "x", 1], [9.5, 8.8, 1.0, "x", 1],
    [0, 3.2, 2.4, "z", 1],     /* master → west terrace slider — P3 M02:06 */
    [2.0, 0, 2.4, "x", 1],     /* master → north terrace slider */
    [15.6, 2.1, 1.4, "z", 1],  /* bedroom3 → east balcony */
    [15.6, 7.5, 1.2, "z", 1],  /* hall → east balcony (long walkway access) — P4 M03:26 */
    [12.5, 11.0, 1.0, "x", 1]  /* room → skylight balcony — P3 M02:11 */
  ],

  /* glazing (x-axis runs; z-axis doorways are left open with lintels) */
  glass: [
    [0.6, 0, 9.4, 0, 0],       /* living N sliders */
    [9.9, 0, 12.1, 0, 0],      /* kitchen window */
    [13.1, 0, 15.1, 0, 0],     /* den window */
    [6.7, 0, 7.9, 0, 1],       /* ensuite window */
    [9.0, 0, 11.4, 0, 1],      /* bedroom2 window */
    [12.6, 0, 15.0, 0, 1]      /* bedroom3 window */
  ],
  openGlass: [
    { floor: 0, x1: 4.2, x2: 6.0, z: 0 },   /* living slider open panel */
    { floor: 1, x1: 0.8, x2: 3.2, z: 0 }    /* master N slider fully open */
  ],

  /* L-stair (P2 M01:41–01:51): flight A 11 risers EAST along the south wall,
     LEFT quarter-turn on the SE landing, flight B 9 risers NORTH along the
     east wall (window strip beside it; skylight balcony above flight A). */
  stair: {
    flights: [
      { axis: "x", fixed: 11.9, from: 10.6, to: 13.45, w: 1.1, y1: 0, y2: 1.87 },
      { axis: "z", fixed: 14.05, from: 11.3, to: 9.1, w: 1.1, y1: 1.87, y2: 3.4 }
    ],
    landing: { x1: 13.45, x2: 14.6, z1: 11.3, z2: 12.5, y: 1.87 }
  },

  /* thick raw-concrete columns: 4 along the colonnade (P1 00:29–40) +
     2 carrying the long balcony on the east side passage (P2 M00:55) */
  columns: [ [3.2, -1.3], [6.4, -1.3], [9.6, -1.3], [12.8, -1.3], [16.6, 2.6], [16.6, 5.8] ],

  /* timestamp-anchored debug markers (local | master), in tour order */
  debugAnchors: [
    { p: [-4.2, 13.2], f: 0, part: 1, t: "P1 0:02", m: "M 0:02", n: "street · 14A" },
    { p: [-3.0, 10.3], f: 0, part: 1, t: "P1 0:09", m: "M 0:09", n: "carport" },
    { p: [-1.2, 2.7],  f: 0, part: 1, t: "P1 0:16", m: "M 0:16", n: "entry porch" },
    { p: [3.4, 2.8],   f: 0, part: 1, t: "P1 0:23", m: "M 0:23", n: "living" },
    { p: [7.8, 5.6],   f: 0, part: 1, t: "P1 0:25", m: "M 0:25", n: "stair seen from living" },
    { p: [5.0, -0.9],  f: 0, part: 1, t: "P1 0:29", m: "M 0:29", n: "terrace slider" },
    { p: [6.0, -4.4],  f: 0, part: 1, t: "P1 0:34", m: "M 0:34", n: "garden · no pool" },
    { p: [9.6, -1.6],  f: 0, part: 1, t: "P1 0:38", m: "M 0:38", n: "rear façade" },
    { p: [13.9, -1.0], f: 0, part: 1, t: "P1 0:49", m: "M 0:49", n: "gray service wall" },
    { p: [16.7, 0.4],  f: 0, part: 2, t: "P2 0:02", m: "M 0:53", n: "side terrace · planter" },
    { p: [16.6, 4.2],  f: 0, part: 2, t: "P2 0:04", m: "M 0:55", n: "2 columns · gray wall" },
    { p: [14.1, 2.6],  f: 0, part: 2, t: "P2 0:11", m: "M 1:02", n: "family room · AC" },
    { p: [10.3, 5.2],  f: 0, part: 2, t: "P2 0:22", m: "M 1:13", n: "vanity + WC" },
    { p: [11.0, 2.1],  f: 0, part: 2, t: "P2 0:30", m: "M 1:21", n: "kitchen stubs" },
    { p: [11.2, 10.4], f: 0, part: 2, t: "P2 0:38", m: "M 1:29", n: "under-stair · panel" },
    { p: [1.9, 10.7],  f: 0, part: 2, t: "P2 0:40", m: "M 1:31", n: "guest room · ladder" },
    { p: [4.6, 10.7],  f: 0, part: 2, t: "P2 0:46", m: "M 1:37", n: "guest shower · beige" },
    { p: [8.8, 7.9],   f: 0, part: 2, t: "P2 0:53", m: "M 1:44", n: "corridor look-back" },
    { p: [11.0, 11.9], f: 0, part: 2, t: "P2 0:58", m: "M 1:50", n: "stair ascent" },
    { p: [-1.2, 4.0],  f: 1, part: 3, t: "P3 0:01", m: "M 1:52", n: "stone-parapet terrace" },
    { p: [7.6, 7.5],   f: 1, part: 3, t: "P3 0:10", m: "M 2:01", n: "upper hall · DB" },
    { p: [3.1, 3.1],   f: 1, part: 3, t: "P3 0:15", m: "M 2:06", n: "corner bedroom" },
    { p: [12.7, 11.8], f: 1, part: 3, t: "P3 0:20", m: "M 2:11", n: "skylight over stair" },
    { p: [-1.4, 11.6], f: 1, part: 3, t: "P3 0:27", m: "M 2:18", n: "balcony over carport" },
    { p: [16.25, 2.1], f: 1, part: 3, t: "P3 0:40", m: "M 2:31", n: "balcony · slat + drain" },
    { p: [1.4, 10.7],  f: 1, part: 3, t: "P3 0:54", m: "M 2:45", n: "gray bathroom" },
    { p: [10.2, 3.1],  f: 1, part: 4, t: "P4",      m: "M 3:06", n: "room w/ AC" },
    { p: [13.8, 3.1],  f: 1, part: 4, t: "P4",      m: "M 3:16", n: "room · balcony door" },
    { p: [16.25, 8.6], f: 1, part: 4, t: "P4",      m: "M 3:26", n: "long balcony walkway" },
    { p: [16.25, 10.6],f: 1, part: 5, t: "P5",      m: "M 3:33", n: "balcony end (boundary-verified)" }
  ],

  start: { pos: [-3.6, 12.2], floor: 0, lookAt: [-1.0, 3.0] }
};
