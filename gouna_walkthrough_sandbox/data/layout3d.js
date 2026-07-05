/* ============================================================
   3D layout v4 — ALMAZA, SAHEL — SOURCE-BASED RECONSTRUCTION
   Built from data/source_understanding/video_sequence_map.md and
   layout_evidence_map.md. LAYOUT ONLY — no furniture.

   Axes: garden = NORTH (z<0, preserved anchor) · entry path +
   carport = WEST (x<0) · street = SW. x 0→15.6 W→E, z 0→12.6 N→S.
   Floor height 3.4m (plan: 20 risers) · eye 1.65m · doors 2.1m head.

   conf: "c"=confirmed (video/plan) · "i"=inferred · "a"=assumed
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
    { id: "den",        conf: "i", roomId: "living-area",       name: "Living Room (den)",  floor: 0, rect: [12.6, 0, 15.6, 6.2],    at: [14.1, 2.6], stand: [13.4, 5.0], look: [14.6, 1.2] },
    { id: "powder",     conf: "c", roomId: "powder-room",       name: "Powder Room",        floor: 0, rect: [9.4, 4.2, 11.2, 6.2],   at: [10.3, 5.2] },
    { id: "guest-wc",   conf: "c", roomId: "bathrooms",         name: "Guest Toilet",       floor: 0, rect: [11.2, 4.2, 12.6, 6.2],  at: [11.9, 5.2] },
    { id: "corridor",   conf: "c", roomId: null,                name: "Corridor",           floor: 0, rect: [0, 6.2, 15.6, 8.8],     at: [7.6, 7.5] },
    { id: "guest-bed",  conf: "c", roomId: "guest-bedroom",     name: "Guest Bedroom",      floor: 0, rect: [0, 8.8, 3.8, 12.6],     at: [1.9, 10.7], stand: [2.9, 9.5], look: [1.0, 11.6] },
    { id: "guest-sh",   conf: "c", roomId: "bathrooms",         name: "Guest Shower",       floor: 0, rect: [3.8, 8.8, 5.4, 12.6],   at: [4.6, 10.7] },
    { id: "drivers",    conf: "i", roomId: null,                name: "Driver's Room",      floor: 0, rect: [5.4, 8.8, 8.2, 12.6],   at: [6.8, 10.7] },
    { id: "drivers-wc", conf: "i", roomId: null,                name: "Driver's WC",        floor: 0, rect: [8.2, 8.8, 9.4, 12.6],   at: [8.8, 10.7] },
    { id: "storage",    conf: "c", roomId: null,                name: "Storage / Panels",   floor: 0, rect: [9.4, 8.8, 11.0, 12.6],  at: [10.2, 10.7] },
    { id: "stair-hall", conf: "c", roomId: "staircase",         name: "Staircase",          floor: 0, rect: [11.0, 8.8, 15.6, 12.6], at: [12.4, 9.6], stand: [11.6, 9.4], look: [14.4, 11.9] },
    { id: "colonnade",  conf: "c", roomId: "front-terrace",     name: "Garden Colonnade",   floor: 0, rect: [3.0, -2.6, 9.4, 0],     at: [6.2, -1.3], look: [6.2, -5] },
    { id: "out-dining", conf: "i", roomId: "front-terrace",     name: "Outdoor Dining",     floor: 0, rect: [0, -2.6, 3.0, 0],       at: [1.5, -1.3], look: [1.5, -4] },
    { id: "out-lounge", conf: "i", roomId: "garden",            name: "Garden Lounge",      floor: 0, rect: [10.8, -4.8, 15.0, -1.0],at: [12.9, -2.9], look: [8, 0] },
    { id: "garden",     conf: "c", roomId: "garden",            name: "Garden",             floor: 0, rect: [0, -6.5, 15.6, -2.6],   at: [6.0, -4.4], look: [6.0, 0] },

    /* ---------- first floor (assumed partitions, confirmed elements) ---------- */
    { id: "hall-up",    conf: "c", roomId: null,                name: "Upper Hall",         floor: 1, rect: [0, 6.2, 15.6, 8.8],     at: [7.6, 7.5] },
    { id: "stairwell",  conf: "c", roomId: "staircase",         name: "Stairwell",          floor: 1, rect: [11.0, 8.8, 15.6, 12.6], at: [12.2, 9.6] },
    { id: "master",     conf: "i", roomId: "master-bedroom",    name: "Master Bedroom",     floor: 1, rect: [0, 0, 6.2, 6.2],        at: [3.1, 3.1], stand: [4.9, 5.0], look: [1.0, 1.2] },
    { id: "m-ensuite",  conf: "i", roomId: "bathrooms",         name: "Master Ensuite",     floor: 1, rect: [6.2, 0, 8.4, 2.8],      at: [7.3, 1.4] },
    { id: "dressing",   conf: "i", roomId: "master-bedroom",    name: "Dressing",           floor: 1, rect: [6.2, 2.8, 8.4, 6.2],    at: [7.3, 4.5] },
    { id: "bedroom-2",  conf: "i", roomId: "bedroom-2",         name: "Bedroom 2",          floor: 1, rect: [8.4, 0, 12.0, 6.2],     at: [10.2, 3.1], stand: [11.0, 5.0], look: [9.2, 1.0] },
    { id: "bedroom-3",  conf: "i", roomId: "bedroom-2",         name: "Bedroom 3",          floor: 1, rect: [12.0, 0, 15.6, 6.2],    at: [13.8, 3.1], stand: [12.8, 5.0], look: [14.6, 1.0] },
    { id: "bath-2",     conf: "i", roomId: "bathrooms",         name: "Bathroom",           floor: 1, rect: [0, 8.8, 2.8, 12.6],     at: [1.4, 10.7] },
    { id: "bath-3",     conf: "i", roomId: "bathrooms",         name: "Bathroom 2",         floor: 1, rect: [2.8, 8.8, 5.4, 12.6],   at: [4.1, 10.7] },
    { id: "laundry",    conf: "a", roomId: null,                name: "Laundry",            floor: 1, rect: [5.4, 8.8, 8.2, 12.6],   at: [6.8, 10.7] },
    { id: "room-x",     conf: "a", roomId: null,                name: "Room",               floor: 1, rect: [8.2, 8.8, 11.0, 12.6],  at: [9.6, 10.7] },
    { id: "terrace-w",  conf: "c", roomId: "upper-balcony",     name: "West Terrace",       floor: 1, rect: [-2.4, 0, 0, 6.2],       at: [-1.2, 3.1], look: [-5, 5] },
    { id: "terrace-n",  conf: "c", roomId: "upper-balcony",     name: "North Terrace",      floor: 1, rect: [0, -2.6, 9.4, 0],       at: [4.6, -1.3], look: [4.6, -6] },
    { id: "balcony-e",  conf: "a", roomId: "upper-balcony",     name: "East Balcony",       floor: 1, rect: [15.6, 0.6, 17.4, 3.6],  at: [16.5, 2.1], look: [18.5, 2.1] }
  ],

  walls: {
    ground: [
      /* outer shell — N */
      [0, 0, 0.6, 0],                                    /* N: living glazing 0.6–9.4 */
      [9.4, 0, 9.9, 0], [12.1, 0, 12.6, 0],              /* kitchen window 9.9–12.1 */
      [12.6, 0, 13.1, 0], [15.1, 0, 15.6, 0],            /* den window 13.1–15.1 */
      /* outer — W (ENTRY slider gap z 1.6–3.8) */
      [0, 0, 0, 1.6], [0, 3.8, 0, 12.6],
      /* outer — E + S */
      [15.6, 0, 15.6, 12.6],
      [0, 12.6, 15.6, 12.6],
      /* living | kitchen (opening z 0.8–3.4) */
      [9.4, 0, 9.4, 0.8], [9.4, 3.4, 9.4, 4.2],
      /* kitchen S wall */
      [9.4, 4.2, 12.6, 4.2],
      /* den W wall (solid to kitchen + powder) */
      [12.6, 0, 12.6, 6.2],
      /* powder | guest wc */
      [11.2, 4.2, 11.2, 6.2],
      /* living | corridor: open 0.8–8.6 */
      [0, 6.2, 0.8, 6.2], [8.6, 6.2, 9.4, 6.2],
      /* corridor N wall east part with doors: powder 10.0–10.8, wc 11.6–12.4, den 13.6–14.6 */
      [9.4, 6.2, 10.0, 6.2], [10.8, 6.2, 11.6, 6.2], [12.4, 6.2, 13.6, 6.2], [14.6, 6.2, 15.6, 6.2],
      /* corridor S wall doors: guest bed 1.6–2.8 · drivers 6.2–7.2 · drivers wc 8.4–9.2 · storage 9.9–10.7 · stair open 11.4+ */
      [0, 8.8, 1.6, 8.8], [2.8, 8.8, 6.2, 8.8], [7.2, 8.8, 8.4, 8.8], [9.2, 8.8, 9.9, 8.8], [10.7, 8.8, 11.4, 8.8],
      /* south band partitions */
      [3.8, 8.8, 3.8, 10.2], [3.8, 11.2, 3.8, 12.6],     /* guest bed | shower, door z 10.2–11.2 */
      [5.4, 8.8, 5.4, 12.6],
      [8.2, 8.8, 8.2, 12.6],
      [9.4, 8.8, 9.4, 12.6],
      [11.0, 8.8, 11.0, 12.6]
    ],
    first: [
      /* outer — N: master slider 0.8–3.2 · ensuite win 6.7–7.9 · bed2 win 9.0–11.4 · bed3 win 12.6–15.0 */
      [0, 0, 0.8, 0], [3.2, 0, 6.7, 0], [7.9, 0, 9.0, 0], [11.4, 0, 12.6, 0], [15.0, 0, 15.6, 0],
      /* outer — W (terrace slider z 2.0–4.4) · E (balcony slider z 1.4–2.8) · S */
      [0, 0, 0, 2.0], [0, 4.4, 0, 12.6],
      [15.6, 0, 15.6, 1.4], [15.6, 2.8, 15.6, 12.6],
      [0, 12.6, 15.6, 12.6],
      /* hall N wall: master door 3.0–4.0 · bed2 door 9.6–10.6 · bed3 door 13.2–14.2 */
      [0, 6.2, 3.0, 6.2], [4.0, 6.2, 9.6, 6.2], [10.6, 6.2, 13.2, 6.2], [14.2, 6.2, 15.6, 6.2],
      /* master | ensuite + dressing (internal doors z 1.0–2.0, z 4.0–5.0) */
      [6.2, 0, 6.2, 1.0], [6.2, 2.0, 6.2, 4.0], [6.2, 5.0, 6.2, 6.2],
      [6.2, 2.8, 8.4, 2.8],
      [8.4, 0, 8.4, 6.2],                                /* suite | bedroom2 — SOLID */
      [12.0, 0, 12.0, 6.2],                              /* bedroom2 | bedroom3 — SOLID */
      /* hall S wall: bath2 0.9–1.9 · bath3 3.5–4.5 · laundry 6.2–7.2 · room 9.0–10.0 · stairwell open 11.4+ */
      [0, 8.8, 0.9, 8.8], [1.9, 8.8, 3.5, 8.8], [4.5, 8.8, 6.2, 8.8], [7.2, 8.8, 9.0, 8.8], [10.0, 8.8, 11.4, 8.8],
      /* south band partitions */
      [2.8, 8.8, 2.8, 12.6], [5.4, 8.8, 5.4, 12.6], [8.2, 8.8, 8.2, 12.6], [11.0, 8.8, 11.0, 12.6]
    ]
  },

  doors: [
    /* ground */
    [0, 2.7, 2.2, "z", 0],     /* ENTRY slider (open leaf) */
    [9.4, 2.1, 2.6, "z", 0],   /* living → kitchen opening */
    [10.4, 6.2, 0.8, "x", 0], [12.0, 6.2, 0.8, "x", 0], [14.1, 6.2, 1.0, "x", 0],
    [2.2, 8.8, 1.2, "x", 0], [3.8, 10.7, 1.0, "z", 0],
    [6.7, 8.8, 1.0, "x", 0], [8.8, 8.8, 0.8, "x", 0], [10.3, 8.8, 0.8, "x", 0],
    /* first */
    [3.5, 6.2, 1.0, "x", 1], [10.1, 6.2, 1.0, "x", 1], [13.7, 6.2, 1.0, "x", 1],
    [6.2, 1.5, 1.0, "z", 1], [6.2, 4.5, 1.0, "z", 1],
    [1.4, 8.8, 1.0, "x", 1], [4.0, 8.8, 1.0, "x", 1], [6.7, 8.8, 1.0, "x", 1], [9.5, 8.8, 1.0, "x", 1],
    [0, 3.2, 2.4, "z", 1],     /* master → west terrace slider */
    [2.0, 0, 2.4, "x", 1],     /* master → north terrace slider */
    [15.6, 2.1, 1.4, "z", 1]   /* bedroom3 → east balcony */
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

  /* L-stair (video+plan): 11 risers east along the south wall, LEFT turn, 9 risers north */
  stair: {
    flights: [
      { axis: "x", fixed: 11.9, from: 11.5, to: 14.35, w: 1.1, y1: 0, y2: 1.87 },
      { axis: "z", fixed: 14.95, from: 11.3, to: 9.1, w: 1.1, y1: 1.87, y2: 3.4 }
    ],
    landing: { x1: 14.35, x2: 15.5, z1: 11.3, z2: 12.5, y: 1.87 }
  },

  columns: [ [1.6, -1.3], [4.7, -1.3], [7.8, -1.3] ],

  /* numbered walkthrough sequence (video order) for debug display */
  debugPath: [
    [-3.0, 10.3], [-1.0, 6.4], [-1.2, 2.7], [3.4, 2.8], [5.0, -1.3], [6.0, -4.4],
    [7.8, 4.6], [10.3, 5.2], [11.0, 2.1], [7.6, 7.5], [1.9, 10.6], [12.4, 11.9]
  ],

  start: { pos: [-3.0, 10.8], floor: 0, lookAt: [-1.2, 4.0] }
};
