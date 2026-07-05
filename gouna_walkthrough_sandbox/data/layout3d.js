/* ============================================================
   3D layout v7 — ALMAZA, SAHEL — NAVIGATION-BASED REBUILD
   Source of truth: the user's corrected first-person walkthrough
   (villa_3d_total_layout_reset_prompt) > walkthrough videos >
   Kymera references. LAYOUT ONLY — no furniture, no toggles.

   Orientation: garden = NORTH (z<0, anchor) · front street = SOUTH ·
   side street = EAST · neighbour = WEST. x 0→15.6, z 0→12.6.

   Ground flow (user): outside → SLIDING GLASS OPENING with the FRONT
   DOOR directly to its right (same recess) → enter door → open
   living/reception (Kymera RECEPTION & DINING) → look back toward the
   entrance → STAIR visible beside the entrance zone (Kymera ENTRANCE &
   STAIRCASE) → DOWNSTAIRS ROOM right next to the stair → GUEST BATHROOM
   beside it → from the entrance, left along the west side path, then
   right → GARDEN (Kymera LANDSCAPE DAY).

   First floor (user): stair → small landing → turn left, ONE corridor →
   Room A (bedroom-3) faces the stairs → Room B (room-y) immediately
   left, terrace door at its far-left corner (skylight balcony) →
   exit B, left + left → Room C (room-x, street room) with slider to the
   front balcony → terrace forward + right → HUGE slider of the master
   (Room D) on the west terrace → bathroom directly facing Room C's exit
   → right to the MASTER → master bath straight/right inside the suite →
   master's big sliders reconnect to the same terrace wrap.
   conf: "c"=confirmed · "i"=inferred · "a"=assumed
   ============================================================ */
window.LAYOUT3D = {
  floorHeight: 3.4,
  eyeHeight: 1.65,
  showFurniture: false,
  showDebug: true,

  zones: [
    /* ---------- ground ---------- */
    { id: "carport",    conf: "c", roomId: "exterior-entrance", name: "Carport",              floor: 0, rect: [12.6, 13.6, 16.6, 17.8], at: [14.6, 15.7], look: [5.6, 11.6] },
    { id: "path",       conf: "c", roomId: "exterior-entrance", name: "Entry Path",           floor: 0, rect: [3.4, 12.6, 12.6, 15.0],  at: [9.2, 13.8],  look: [5.6, 11.5] },
    { id: "porch",      conf: "c", roomId: "exterior-entrance", name: "Entry (slider + door)",floor: 0, rect: [3.4, 10.7, 7.4, 12.6],  at: [5.4, 11.6],  look: [5.4, 3.5] },
    { id: "side-path-w",conf: "c", roomId: "garden",            name: "Garden Side Path",     floor: 0, rect: [-2.3, 0, 0, 12.6],      at: [-1.15, 6.5], look: [-1.15, 0.5] },
    { id: "living",     conf: "c", roomId: "living-area",       name: "Living & Reception",   floor: 0, rect: [0, 0, 8.8, 7.4],        at: [4.4, 3.4], stand: [6.2, 5.4], look: [1.4, 0.8] },
    { id: "kitchen",    conf: "i", roomId: "dining-kitchen",    name: "Kitchen",              floor: 0, rect: [8.8, 0, 12.2, 4.2],     at: [10.5, 2.1], stand: [10.0, 3.4], look: [11.4, 0.8] },
    { id: "side-room",  conf: "c", roomId: "living-area",       name: "Side Room (AC)",       floor: 0, rect: [12.2, 0, 15.6, 4.6],    at: [13.9, 2.3], stand: [13.1, 3.6], look: [14.9, 2.4] },
    { id: "powder",     conf: "c", roomId: "powder-room",       name: "Vanity Nook",          floor: 0, rect: [12.2, 4.6, 13.9, 6.9],  at: [13.0, 5.75] },
    { id: "guest-wc",   conf: "c", roomId: "bathrooms",         name: "Guest WC",             floor: 0, rect: [13.9, 4.6, 15.6, 6.9],  at: [14.7, 5.75] },
    { id: "hall",       conf: "c", roomId: null,                name: "Hall",                 floor: 0, rect: [8.8, 4.2, 12.2, 6.9],   at: [9.6, 5.6] },
    { id: "stair-hall", conf: "c", roomId: "staircase",         name: "Stair Lobby",          floor: 0, rect: [7.4, 8.7, 15.6, 12.6],  at: [8.6, 10.2], stand: [8.0, 10.2], look: [12.4, 11.85] },
    { id: "guest-room", conf: "c", roomId: "guest-bedroom",     name: "Downstairs Room (guest)", floor: 0, rect: [10.4, 6.9, 13.3, 10.7], at: [11.8, 8.8], stand: [11.0, 8.2], look: [12.8, 10.0] },
    { id: "guest-bath", conf: "i", roomId: "bathrooms",         name: "Guest Bathroom (candidate)", floor: 0, rect: [13.3, 6.9, 15.6, 8.7], at: [14.4, 7.8] },
    { id: "drivers",    conf: "i", roomId: null,                name: "Driver's Room",        floor: 0, rect: [0, 9.0, 3.4, 12.6],     at: [1.7, 10.8] },
    { id: "drivers-wc", conf: "a", roomId: null,                name: "Driver's WC",          floor: 0, rect: [0, 7.4, 2.0, 9.0],      at: [1.0, 8.2] },
    { id: "store",      conf: "a", roomId: null,                name: "Store / Service",      floor: 0, rect: [2.0, 7.4, 3.4, 9.0],    at: [2.7, 8.2] },
    { id: "colonnade",  conf: "c", roomId: "front-terrace",     name: "Garden Colonnade",     floor: 0, rect: [3.0, -2.6, 15.6, 0],    at: [7.9, -1.5], look: [7.9, -5] },
    { id: "out-dining", conf: "i", roomId: "front-terrace",     name: "Outdoor Dining",       floor: 0, rect: [0, -2.6, 3.0, 0],       at: [1.5, -1.3], look: [1.5, -4] },
    { id: "out-lounge", conf: "i", roomId: "garden",            name: "Garden Lounge",        floor: 0, rect: [10.8, -4.8, 15.0, -1.0],at: [12.9, -2.9], look: [8, 0] },
    { id: "garden",     conf: "c", roomId: "garden",            name: "Garden",               floor: 0, rect: [0, -6.5, 15.6, -2.6],   at: [6.0, -4.4], look: [6.0, 0] },
    { id: "side-terr",  conf: "c", roomId: "front-terrace",     name: "Side Passage (east)",  floor: 0, rect: [15.6, 0, 17.8, 8.2],    at: [16.6, 4.6], look: [15.9, 2.6] },

    /* ---------- first floor ---------- */
    { id: "hall-up",    conf: "c", roomId: null,                name: "Upper Corridor",       floor: 1, rect: [0, 6.6, 15.6, 8.9],     at: [7.6, 7.75] },
    { id: "stairwell",  conf: "c", roomId: "staircase",         name: "Stair Landing",        floor: 1, rect: [13.4, 8.9, 15.6, 12.6], at: [14.0, 9.4] },
    { id: "master",     conf: "c", roomId: "master-bedroom",    name: "Master Bedroom (Room D)", floor: 1, rect: [0, 0, 6.4, 6.6],     at: [3.2, 3.3], stand: [4.9, 5.2], look: [1.0, 1.0] },
    { id: "m-ensuite",  conf: "c", roomId: "bathrooms",         name: "Master Bathroom",      floor: 1, rect: [6.4, 0, 8.8, 3.0],      at: [7.6, 1.5] },
    { id: "bath-1",     conf: "c", roomId: "bathrooms",         name: "Bathroom (faces Room C)", floor: 1, rect: [6.4, 3.0, 8.8, 6.6], at: [7.6, 4.8] },
    { id: "bedroom-2",  conf: "i", roomId: "bedroom-2",         name: "Bedroom 2",            floor: 1, rect: [8.8, 0, 12.2, 6.6],     at: [10.5, 3.3], stand: [11.2, 5.2], look: [9.4, 0.8] },
    { id: "bedroom-3",  conf: "c", roomId: "bedroom-2",         name: "Bedroom 3 (Room A · faces stairs)", floor: 1, rect: [12.2, 0, 15.6, 6.6], at: [13.9, 3.3], stand: [12.9, 5.2], look: [14.9, 2.4] },
    { id: "bath-2",     conf: "i", roomId: "bathrooms",         name: "Bathroom 2 (gray)",    floor: 1, rect: [0, 8.9, 2.6, 12.6],     at: [1.3, 10.7] },
    { id: "bath-3",     conf: "i", roomId: "bathrooms",         name: "Bathroom 3 (gray)",    floor: 1, rect: [2.6, 8.9, 5.2, 12.6],   at: [3.9, 10.7] },
    { id: "room-x",     conf: "c", roomId: "bedroom-2",         name: "Street Bedroom (Room C)", floor: 1, rect: [5.2, 8.9, 9.8, 12.6], at: [7.5, 10.7], stand: [7.5, 10.2], look: [6.8, 14.0] },
    { id: "room-y",     conf: "c", roomId: "bedroom-2",         name: "Bedroom (Room B)",     floor: 1, rect: [9.8, 8.9, 13.4, 11.2],  at: [11.6, 10.0], stand: [11.0, 9.6], look: [12.5, 11.6] },
    { id: "balc-sky",   conf: "i", roomId: "upper-balcony",     name: "Skylight Balcony",     floor: 1, rect: [9.8, 11.2, 13.4, 12.6], at: [12.7, 11.9], look: [10.6, 12.0] },
    { id: "terrace-w",  conf: "c", roomId: "upper-balcony",     name: "West Terrace (stone parapet)", floor: 1, rect: [-2.4, 0, 0, 12.6], at: [-1.2, 4.0], look: [-5, 5] },
    { id: "terrace-n",  conf: "c", roomId: "upper-balcony",     name: "North Terrace",        floor: 1, rect: [0, -2.6, 15.6, 0],      at: [4.6, -1.3], look: [4.6, -6] },
    { id: "balcony-e",  conf: "c", roomId: "upper-balcony",     name: "East Balcony (long)",  floor: 1, rect: [15.6, -2.55, 16.9, 14.0], at: [16.25, 5.0], look: [16.25, 10.5] },
    { id: "balcony-f",  conf: "c", roomId: "upper-balcony",     name: "Street Balcony (front)", floor: 1, rect: [0, 12.6, 15.6, 14.0], at: [7.5, 13.3], look: [7.5, 17.5] }
  ],

  walls: {
    ground: [
      /* outer — N: living glazing 0.6–8.8 · kitchen win 9.2–11.8 · side-room win 13.0–15.0 */
      [0, 0, 0.6, 0], [8.8, 0, 9.2, 0], [11.8, 0, 12.2, 0], [12.2, 0, 13.0, 0], [15.0, 0, 15.6, 0],
      /* outer — W: glazing return z 0.6–5.0 (custom) */
      [0, 0, 0, 0.6], [0, 5.0, 0, 12.6],
      /* outer — S: driver's window 0.8–2.4 (custom) · ENTRY RECESS 3.4–7.4 */
      [0, 12.6, 0.8, 12.6], [2.4, 12.6, 3.4, 12.6], [7.4, 12.6, 15.6, 12.6],
      /* outer — E: side-room slider 1.6–3.6 · WC high window 5.4–6.4 (custom) · stair window 9.0–12.5 (custom) */
      [15.6, 0, 15.6, 1.6], [15.6, 3.6, 15.6, 5.4], [15.6, 6.4, 15.6, 9.0],
      /* ENTRY RECESS: flanks + back wall — SLIDER 3.6–5.9 (glass) with the
         FRONT DOOR 6.2–7.2 DIRECTLY TO ITS RIGHT (user correction) */
      [3.4, 10.7, 3.4, 12.6], [7.4, 10.7, 7.4, 12.6],
      [3.4, 10.7, 3.6, 10.7], [5.9, 10.7, 6.2, 10.7], [7.2, 10.7, 7.4, 10.7],
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
      /* DOWNSTAIRS ROOM right next to the stair (user #5 / video P2 M01:31):
         door on its W wall beside the stair base (z 9.4–10.4) */
      [10.4, 6.9, 10.4, 9.4], [10.4, 10.4, 10.4, 10.7],
      [10.4, 6.9, 12.2, 6.9],
      [10.4, 10.7, 13.3, 10.7],
      /* GUEST BATHROOM beside the room/stair (user #6): ensuite-style door z 7.3–8.1 */
      [13.3, 6.9, 13.3, 7.3], [13.3, 8.1, 13.3, 10.7],
      [13.3, 8.7, 15.6, 8.7],
      /* SW service block (driver's suite, plan-inferred) */
      [0, 7.4, 0.8, 7.4], [1.8, 7.4, 2.4, 7.4], [3.2, 7.4, 3.4, 7.4],
      [2.0, 7.4, 2.0, 9.0],
      [0, 9.0, 3.4, 9.0],
      [3.4, 7.4, 3.4, 9.6], [3.4, 10.6, 3.4, 10.7]
    ],
    first: [
      /* outer — N: master slider 0.8–3.2 (open) · ensuite win 6.9–8.1 · bed2 win 9.4–11.6 · bed3 win 12.8–15.0 */
      [0, 0, 0.8, 0], [3.2, 0, 6.9, 0], [8.1, 0, 9.4, 0], [11.6, 0, 12.8, 0], [15.0, 0, 15.6, 0],
      /* outer — W (master terrace slider z 2.0–4.4 — Room D's huge slider) */
      [0, 0, 0, 2.0], [0, 4.4, 0, 12.6],
      /* outer — E: bed3 balcony door 1.6–3.0 · corridor balcony door 6.9–8.1 */
      [15.6, 0, 15.6, 1.6], [15.6, 3.0, 15.6, 6.9], [15.6, 8.1, 15.6, 12.6],
      /* outer — S: Room C slider 5.8–7.8 (right corner of the room) · skylight-balcony gap 9.8–13.4 */
      [0, 12.6, 5.8, 12.6], [7.8, 12.6, 9.8, 12.6], [13.4, 12.6, 15.6, 12.6],
      /* corridor N wall: master door 2.8–3.8 · bath-1 door 6.7–7.7 (faces Room C's exit) ·
         bed2 door 9.7–10.7 · Room A door 12.9–13.9 (faces the stair arrival) */
      [0, 6.6, 2.8, 6.6], [3.8, 6.6, 6.7, 6.6], [7.7, 6.6, 9.7, 6.6], [10.7, 6.6, 12.9, 6.6], [13.9, 6.6, 15.6, 6.6],
      /* master suite: ensuite door z 1.0–2.0 only (bath-1 has NO door to the master) */
      [6.4, 0, 6.4, 1.0], [6.4, 2.0, 6.4, 6.6],
      [6.4, 3.0, 8.8, 3.0],
      [8.8, 0, 8.8, 6.6],
      [12.2, 0, 12.2, 6.6],
      /* corridor S wall: bath2 0.8–1.8 · bath3 3.4–4.4 · Room C 6.7–7.7 · Room B 11.0–12.0 · arrival OPEN 13.4→ */
      [0, 8.9, 0.8, 8.9], [1.8, 8.9, 3.4, 8.9], [4.4, 8.9, 6.7, 8.9], [7.7, 8.9, 11.0, 8.9], [12.0, 8.9, 13.4, 8.9],
      /* front band partitions */
      [2.6, 8.9, 2.6, 12.6], [5.2, 8.9, 5.2, 12.6], [9.8, 8.9, 9.8, 12.6], [13.4, 8.9, 13.4, 11.2],
      /* Room B | skylight balcony (terrace door at the room's far-left corner x 11.9–12.9) */
      [9.8, 11.2, 11.9, 11.2], [12.9, 11.2, 13.4, 11.2]
    ]
  },

  doors: [
    /* ground */
    [6.7, 10.7, 1.0, "x", 0],  /* FRONT DOOR — directly right of the entry slider (user #1) */
    [8.8, 2.1, 2.6, "z", 0],   /* living → kitchen opening */
    [10.5, 4.2, 2.2, "x", 0],  /* kitchen → hall opening */
    [15.6, 2.6, 2.0, "z", 0],  /* side-room slider off the east passage */
    [12.2, 2.7, 1.0, "z", 0],  /* side room → kitchen door */
    [13.9, 5.8, 0.8, "z", 0],  /* guest WC door (high window) */
    [10.4, 9.9, 1.0, "z", 0],  /* DOWNSTAIRS ROOM door — beside the stair base (user #5) */
    [13.3, 7.7, 0.8, "z", 0],  /* GUEST BATHROOM door (user #6) */
    [1.3, 7.4, 1.0, "x", 0],   /* driver's WC door */
    [2.8, 7.4, 0.8, "x", 0],   /* store door */
    [3.4, 10.1, 1.0, "z", 0],  /* driver's room door */
    /* first */
    [3.3, 6.6, 1.0, "x", 1],   /* master door */
    [7.2, 6.6, 1.0, "x", 1],   /* bath-1 door — DIRECTLY facing Room C's door (user #9) */
    [10.2, 6.6, 1.0, "x", 1],  /* bedroom 2 door */
    [13.4, 6.6, 1.0, "x", 1],  /* Room A door — faces the stair arrival (user #3) */
    [6.4, 1.5, 1.0, "z", 1],   /* master → master bathroom (straight/right inside, user #11) */
    [1.3, 8.9, 1.0, "x", 1], [3.9, 8.9, 1.0, "x", 1],
    [7.2, 8.9, 1.0, "x", 1],   /* Room C door */
    [11.5, 8.9, 1.0, "x", 1],  /* Room B door — immediately left of the arrival (user #4) */
    [6.8, 12.6, 2.0, "x", 1],  /* Room C slider → street balcony (right corner) */
    [12.4, 11.2, 1.0, "x", 1], /* Room B terrace door — far-left corner → skylight balcony */
    [0, 3.2, 2.4, "z", 1],     /* MASTER huge slider → west terrace (Room D, seen from the terrace going right) */
    [2.0, 0, 2.4, "x", 1],     /* master second slider → north terrace (right after exiting the bath) */
    [15.6, 2.3, 1.4, "z", 1],  /* Room A → east balcony */
    [15.6, 7.5, 1.2, "z", 1]   /* corridor → east balcony */
  ],

  /* glazing (runs at fixed z; walkable openings via openGlass) */
  glass: [
    [0.6, 0, 8.8, 0, 0],       /* living N sliders */
    [9.2, 0, 11.8, 0, 0],      /* kitchen window */
    [13.0, 0, 15.0, 0, 0],     /* side-room window */
    [3.6, 10.7, 5.9, 10.7, 0], /* ENTRY SLIDING GLASS — left of the front door (user #1) */
    [6.9, 0, 8.1, 0, 1],       /* master bath window */
    [9.4, 0, 11.6, 0, 1],      /* bedroom2 window */
    [12.8, 0, 15.0, 0, 1]      /* Room A window */
  ],
  openGlass: [
    { floor: 0, x1: 4.2, x2: 6.0, z: 0 },
    { floor: 1, x1: 0.8, x2: 3.2, z: 0 }
  ],

  /* L-stair beside the entrance/living zone (user #4 + Kymera ENTRANCE &
     STAIRCASE): flight A east along the front wall, landing SE, flight B
     north along the east wall (window strip beside it). */
  stair: {
    flights: [
      { axis: "x", fixed: 11.85, from: 10.5, to: 13.35, w: 1.1, y1: 0, y2: 1.87 },
      { axis: "z", fixed: 14.0, from: 11.2, to: 9.0, w: 1.1, y1: 1.87, y2: 3.4 }
    ],
    landing: { x1: 13.35, x2: 14.5, z1: 11.2, z2: 12.4, y: 1.87 }
  },

  columns: [ [3.2, -1.3], [6.4, -1.3], [9.6, -1.3], [12.8, -1.3], [16.6, 2.4], [16.6, 5.6] ],

  /* timestamp-anchored debug markers (evidence refs only) */
  debugAnchors: [
    { p: [17.2, 16.8], f: 0, part: 1, t: "P1 0:02", m: "M 0:02", n: "street corner · 14A" },
    { p: [14.6, 15.7], f: 0, part: 1, t: "P1 0:09", m: "M 0:09", n: "carport" },
    { p: [5.4, 11.6],  f: 0, part: 1, t: "P1 0:16", m: "M 0:16", n: "entry: slider + door" },
    { p: [5.0, 4.6],   f: 0, part: 1, t: "P1 0:23", m: "M 0:23", n: "living" },
    { p: [7.0, 6.6],   f: 0, part: 1, t: "P1 0:25", m: "M 0:25", n: "stair seen from living" },
    { p: [5.0, -0.9],  f: 0, part: 1, t: "P1 0:29", m: "M 0:29", n: "terrace slider" },
    { p: [6.0, -4.4],  f: 0, part: 1, t: "P1 0:34", m: "M 0:34", n: "garden · no pool" },
    { p: [9.6, -1.6],  f: 0, part: 1, t: "P1 0:38", m: "M 0:38", n: "rear façade" },
    { p: [13.9, -1.0], f: 0, part: 1, t: "P1 0:49", m: "M 0:49", n: "gray service wall" },
    { p: [16.7, 0.4],  f: 0, part: 2, t: "P2 0:02", m: "M 0:53", n: "side passage · planter" },
    { p: [16.6, 4.4],  f: 0, part: 2, t: "P2 0:04", m: "M 0:55", n: "2 columns · gray wall" },
    { p: [13.9, 2.3],  f: 0, part: 2, t: "P2 0:11", m: "M 1:02", n: "side room · AC" },
    { p: [13.0, 5.75], f: 0, part: 2, t: "P2 0:22", m: "M 1:13", n: "vanity + WC" },
    { p: [10.5, 2.1],  f: 0, part: 2, t: "P2 0:30", m: "M 1:21", n: "kitchen stubs" },
    { p: [9.0, 11.6],  f: 0, part: 2, t: "P2 0:38", m: "M 1:29", n: "under-stair · panel" },
    { p: [11.8, 8.8],  f: 0, part: 2, t: "P2 0:40", m: "M 1:31", n: "downstairs room" },
    { p: [14.4, 7.8],  f: 0, part: 2, t: "P2 0:46", m: "M 1:37", n: "guest bathroom" },
    { p: [8.8, 9.6],   f: 0, part: 2, t: "P2 0:53", m: "M 1:44", n: "look-back to living" },
    { p: [10.9, 11.85],f: 0, part: 2, t: "P2 0:58", m: "M 1:50", n: "stair ascent" },
    { p: [-1.2, 4.0],  f: 1, part: 3, t: "P3 0:01", m: "M 1:52", n: "stone-parapet terrace" },
    { p: [7.6, 7.75],  f: 1, part: 3, t: "P3 0:10", m: "M 2:01", n: "upper corridor · DB" },
    { p: [3.2, 3.3],   f: 1, part: 3, t: "P3 0:15", m: "M 2:06", n: "master (Room D)" },
    { p: [12.7, 11.9], f: 1, part: 3, t: "P3 0:20", m: "M 2:11", n: "skylight over stair" },
    { p: [15.4, 13.3], f: 1, part: 3, t: "P3 0:27", m: "M 2:18", n: "balcony over carport" },
    { p: [16.25, 2.1], f: 1, part: 3, t: "P3 0:40", m: "M 2:31", n: "E balcony · slat + drain" },
    { p: [1.3, 10.7],  f: 1, part: 3, t: "P3 0:54", m: "M 2:45", n: "gray bathroom" },
    { p: [11.6, 10.0], f: 1, part: 4, t: "P4",      m: "M 3:06", n: "Room B · AC" },
    { p: [13.9, 3.3],  f: 1, part: 4, t: "P4",      m: "M 3:16", n: "Room A · balcony door" },
    { p: [16.25, 8.6], f: 1, part: 4, t: "P4",      m: "M 3:26", n: "long balcony walkway" },
    { p: [16.25, 12.6],f: 1, part: 5, t: "P5",      m: "M 3:33", n: "balcony corner" },
    { p: [7.5, 10.5],  f: 1, part: 5, t: "F",       m: "M 4:21", n: "Room C · street slider" },
    { p: [7.5, 13.3],  f: 1, part: 5, t: "F",       m: "M 4:31", n: "front balcony over path" }
  ],

  start: { pos: [16.8, 17.4], floor: 0, lookAt: [5.6, 11.5] }
};
