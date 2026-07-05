/* ============================================================
   3D layout v3 — ALMAZA, SAHEL — LAYOUT ACCURACY PASS
   Furniture is HIDDEN (showFurniture:false) until layout approval.

   EVIDENCE USED
   · Kymera technical ground-floor plan (room schedule + mm dims)
   · Site walkthrough video sequence (71 frames, entry→rooms→stairs→upper)
   · Design PDF for room identity only
   · Garden/colonnade preserved as the trusted anchor (north side)

   KEY CORRECTIONS IN THIS VERSION
   · Corridor widened 1.4m → 2.6m gallery (plan shows ~2.0m + planters)
   · Entry moved to the SOUTH court through an entry hall — you walk in
     facing the open reception + garden glazing, matching the video flow
   · First floor: every bedroom opens off the upper corridor; NO
     bedroom-to-bedroom doors; master gets internal ensuite + dressing
   · Bathrooms placed on exterior walls (small windows, as in video)
   · Human scale: eye 1.65m, walk 2.0 m/s, door lintels at 2.1m
   · House depth grows to 12.8m to absorb the wider corridor

   Units metres. x: 0→15.2 (W→E) · z: 0→12.8 (N wall→S wall).
   Garden z<0 (UNCHANGED). Entry court z>12.8 south.
   First floor remains an ASSUMPTION (no upper plan) but now follows
   sane circulation rules + video evidence.
   ============================================================ */
window.LAYOUT3D = {
  floorHeight: 3.4,
  eyeHeight: 1.65,
  showFurniture: false,          /* flip to true to restore furniture */

  zones: [
    /* ---------- ground floor ---------- */
    { id: "court",      roomId: "exterior-entrance", name: "Entrance Court",     floor: 0, rect: [9.4, 12.8, 15.2, 17.4], at: [12.1, 14.8], look: [12.1, 12.8] },
    { id: "entry-hall", roomId: "exterior-entrance", name: "Entry Hall",         floor: 0, rect: [11.4, 8.5, 12.8, 12.8], at: [12.1, 10.6], look: [12.1, 8.5] },
    { id: "corridor",   roomId: null,                name: "Gallery Corridor",   floor: 0, rect: [3.2, 5.9, 15.2, 8.5],   at: [9.0, 7.2] },
    { id: "reception",  roomId: "living-area",       name: "Reception & Dining", floor: 0, rect: [3.2, 0, 10.4, 5.9],     at: [6.8, 2.8], stand: [6.8, 5.2], look: [6.6, 0.4] },
    { id: "kitchen",    roomId: "dining-kitchen",    name: "Kitchen",            floor: 0, rect: [0, 0, 3.2, 5.9],        at: [1.6, 2.8], stand: [2.6, 4.8], look: [0.8, 1.4] },
    { id: "lounge",     roomId: "living-area",       name: "Living Room",        floor: 0, rect: [10.4, 0, 15.2, 3.9],    at: [12.8, 2.0], stand: [11.2, 3.2], look: [13.6, 1.2] },
    { id: "powder",     roomId: "powder-room",       name: "Powder Room",        floor: 0, rect: [10.4, 3.9, 12.4, 5.9],  at: [11.4, 4.9] },
    { id: "guest-wc",   roomId: "bathrooms",         name: "Guest Toilet",       floor: 0, rect: [12.4, 3.9, 14.4, 5.9],  at: [13.4, 4.9] },
    { id: "stairs",     roomId: "staircase",         name: "Staircase",          floor: 0, rect: [3.2, 8.5, 6.0, 12.8],   at: [4.6, 9.1] },
    { id: "guest-bed",  roomId: "guest-bedroom",     name: "Guest Bedroom",      floor: 0, rect: [6.0, 8.5, 9.6, 12.8],   at: [7.8, 10.6], stand: [8.7, 9.3], look: [6.9, 11.4] },
    { id: "guest-bath", roomId: "bathrooms",         name: "Guest Ensuite",      floor: 0, rect: [9.6, 9.4, 11.4, 12.8],  at: [10.5, 11.1] },
    { id: "drivers",    roomId: null,                name: "Driver's Room",      floor: 0, rect: [12.8, 8.5, 15.2, 12.8], at: [14.0, 10.6] },
    { id: "utility",    roomId: null,                name: "Pantry / Utility",   floor: 0, rect: [0, 5.9, 3.2, 8.5],      at: [1.6, 7.2] },
    { id: "colonnade",  roomId: "front-terrace",     name: "Garden Colonnade",   floor: 0, rect: [3.2, -2.6, 10.4, 0],    at: [6.8, -1.3], look: [6.8, -5] },
    { id: "out-dining", roomId: "front-terrace",     name: "Outdoor Dining",     floor: 0, rect: [0, -2.6, 3.2, 0],       at: [1.6, -1.3], look: [1.6, -4] },
    { id: "out-lounge", roomId: "garden",            name: "Garden Lounge",      floor: 0, rect: [10.6, -4.8, 14.8, -1.0],at: [12.7, -2.9], look: [8, 0] },
    { id: "garden",     roomId: "garden",            name: "Garden",             floor: 0, rect: [0, -6.5, 15.2, -2.6],   at: [6.5, -4.5], look: [6.5, 0] },

    /* ---------- first floor (assumed; corrected circulation) ---------- */
    { id: "stairwell",  roomId: "staircase",         name: "Stairwell",          floor: 1, rect: [3.2, 8.5, 6.0, 12.8],   at: [5.2, 10.4] },
    { id: "hall-up",    roomId: null,                name: "Upper Corridor",     floor: 1, rect: [3.2, 5.9, 15.2, 8.5],   at: [9.0, 7.2] },
    { id: "master",     roomId: "master-bedroom",    name: "Master Bedroom",     floor: 1, rect: [6.0, 0, 10.6, 5.9],     at: [8.3, 2.9], stand: [7.2, 4.9], look: [9.2, 1.0] },
    { id: "m-ensuite",  roomId: "bathrooms",         name: "Master Ensuite",     floor: 1, rect: [10.6, 0, 12.7, 2.9],    at: [11.65, 1.45] },
    { id: "dressing",   roomId: "master-bedroom",    name: "Dressing",           floor: 1, rect: [10.6, 2.9, 12.7, 5.9],  at: [11.65, 4.4] },
    { id: "bedroom-2",  roomId: "bedroom-2",         name: "Bedroom 2",          floor: 1, rect: [0, 0, 6.0, 5.9],        at: [3.0, 2.9], stand: [4.5, 4.7], look: [1.6, 1.2] },
    { id: "bedroom-3",  roomId: "bedroom-2",         name: "Bedroom 3",          floor: 1, rect: [12.7, 0, 15.2, 5.9],    at: [13.95, 2.9], stand: [13.2, 4.6], look: [14.2, 1.2] },
    { id: "bath-2",     roomId: "bathrooms",         name: "Bathroom",           floor: 1, rect: [6.0, 8.5, 8.6, 12.8],   at: [7.3, 10.4] },
    { id: "laundry",    roomId: null,                name: "Laundry (assumed)",  floor: 1, rect: [8.6, 8.5, 11.4, 12.8],  at: [10.0, 10.4] },
    { id: "upper-room", roomId: null,                name: "Room (assumed)",     floor: 1, rect: [11.4, 8.5, 15.2, 12.8], at: [13.3, 10.4] },
    { id: "balcony",    roomId: "upper-balcony",     name: "North Terrace",      floor: 1, rect: [3.2, -2.6, 11.0, 0],    at: [7.0, -1.3], look: [7.0, -6] }
  ],

  /* walls: [x1,z1,x2,z2] — door gaps are openings between segments */
  walls: {
    ground: [
      /* outer shell */
      [0, 0, 0.6, 0], [2.7, 0, 3.2, 0],                 /* N kitchen, window gap */
      [10.4, 0, 10.9, 0], [14.6, 0, 15.2, 0],           /* N living room, window gap */
      [0, 0, 0, 12.8],                                   /* W wall */
      [15.2, 0, 15.2, 12.8],                             /* E wall (no east door now) */
      [0, 12.8, 11.5, 12.8], [12.7, 12.8, 15.2, 12.8],   /* S wall, MAIN ENTRY gap x 11.5–12.7 */
      /* kitchen / reception / utility */
      [3.2, 0, 3.2, 0.9], [3.2, 4.7, 3.2, 5.9],          /* kitchen|reception wide opening */
      [0, 5.9, 3.2, 5.9],                                /* kitchen|utility */
      [3.2, 5.9, 3.2, 8.5],                              /* utility|corridor wall */
      [0, 8.5, 3.2, 8.5],                                /* utility S wall (garage side) */
      /* reception | corridor: open gallery x 4.4–9.4 */
      [3.2, 5.9, 4.4, 5.9], [9.4, 5.9, 10.4, 5.9],
      /* reception | east lounge */
      [10.4, 0, 10.4, 1.2], [10.4, 2.8, 10.4, 3.9],      /* opening z 1.2–2.8 */
      /* lounge | powder band */
      [10.4, 3.9, 15.2, 3.9],
      [12.4, 3.9, 12.4, 5.9],                            /* powder | guest wc */
      [14.4, 3.9, 14.4, 5.9],                            /* guest wc | shaft */
      [10.4, 3.9, 10.4, 5.9],                            /* powder W wall */
      /* corridor S wall doors: powder x10.9–11.9? no — powder door on corridor: */
      [10.4, 5.9, 10.8, 5.9], [11.8, 5.9, 12.6, 5.9], [13.6, 5.9, 15.2, 5.9], /* powder + guest wc doors */
      /* south band N wall (corridor side) with doors */
      [3.2, 8.5, 4.8, 8.5],                              /* stair opening x 4.8–6.0 */
      [6.0, 8.5, 6.8, 8.5], [8.0, 8.5, 9.6, 8.5],        /* guest bed door x 6.8–8.0 */
      [9.6, 8.5, 11.4, 8.5],                             /* ensuite has no corridor door */
      [12.8, 8.5, 13.4, 8.5], [14.6, 8.5, 15.2, 8.5],    /* drivers door x 13.4–14.6 from entry side */
      /* south band partitions */
      [6.0, 8.5, 6.0, 12.8],                             /* stairs | guest bed */
      [9.6, 8.5, 9.6, 10.0], [9.6, 11.0, 9.6, 12.8],     /* guest bed | ensuite, door z 10.0–11.0 */
      [11.4, 8.5, 11.4, 12.8],                           /* ensuite | entry hall */
      [12.8, 8.5, 12.8, 12.8],                           /* entry hall | drivers */
      [9.6, 9.4, 11.4, 9.4]                              /* ensuite N wall */
    ],
    first: [
      /* outer shell */
      [0, 0, 3.6, 0], [5.4, 0, 6.0, 0],                  /* N bedroom2, window */
      [6.0, 0, 6.6, 0], [10.2, 0, 10.6, 0],              /* N master, terrace slider gap 6.6–10.2 */
      [10.6, 0, 11.0, 0], [12.3, 0, 12.7, 0],            /* N ensuite window gap 11.0–12.3 */
      [12.7, 0, 13.1, 0], [14.8, 0, 15.2, 0],            /* N bedroom3 window gap */
      [0, 0, 0, 12.8], [15.2, 0, 15.2, 12.8], [0, 12.8, 15.2, 12.8],
      /* corridor N wall with bedroom doors */
      [0, 5.9, 4.0, 5.9], [5.0, 5.9, 7.2, 5.9],          /* bedroom2 door x 4.0–5.0 */
      [8.4, 5.9, 12.9, 5.9],                              /* master door x 7.2–8.4 */
      [13.9, 5.9, 15.2, 5.9],                             /* bedroom3 door x 12.9–13.9 */
      /* bedroom partitions (NO doors between bedrooms) */
      [6.0, 0, 6.0, 5.9],                                 /* bedroom2 | master — solid */
      [10.6, 0, 10.6, 1.2], [10.6, 2.2, 10.6, 3.6], [10.6, 4.6, 10.6, 5.9], /* master | ensuite door z1.2–2.2, dressing door z3.6–4.6 */
      [10.6, 2.9, 12.7, 2.9],                             /* ensuite | dressing */
      [12.7, 0, 12.7, 5.9],                               /* dressing/ensuite | bedroom3 — solid */
      /* corridor S wall with doors */
      [3.2, 8.5, 4.8, 8.5],                               /* stairwell opening x 4.8–6.0 */
      [6.0, 8.5, 6.6, 8.5], [7.8, 8.5, 9.2, 8.5],         /* bath-2 door x 6.6–7.8 */
      [10.4, 8.5, 11.9, 8.5],                             /* laundry door x 9.2–10.4 */
      [13.1, 8.5, 15.2, 8.5],                             /* upper room door x 11.9–13.1 */
      /* south band partitions */
      [6.0, 8.5, 6.0, 12.8],
      [8.6, 8.5, 8.6, 12.8],
      [11.4, 8.5, 11.4, 12.8]
    ]
  },

  /* door openings (for lintels at 2.1m + threshold strips): [cx, cz, width, axis(x|z), floor] */
  doors: [
    [12.1, 12.8, 1.2, "x", 0],   /* main entry */
    [11.3, 5.9, 1.0, "x", 0],    /* powder */
    [13.1, 5.9, 1.0, "x", 0],    /* guest wc */
    [7.4, 8.5, 1.2, "x", 0],     /* guest bedroom */
    [9.6, 10.5, 1.0, "z", 0],    /* guest ensuite (from bedroom) */
    [14.0, 8.5, 1.2, "x", 0],    /* driver's room */
    [4.5, 5.9, 1.0, "x", 1],     /* bedroom 2 */
    [7.8, 5.9, 1.2, "x", 1],     /* master */
    [13.4, 5.9, 1.0, "x", 1],    /* bedroom 3 */
    [10.6, 1.7, 1.0, "z", 1],    /* master → ensuite */
    [10.6, 4.1, 1.0, "z", 1],    /* master → dressing */
    [7.2, 8.5, 1.2, "x", 1],     /* bath-2 */
    [9.8, 8.5, 1.2, "x", 1],     /* laundry */
    [12.5, 8.5, 1.2, "x", 1]     /* upper room */
  ],

  glass: [
    [3.2, 0, 10.4, 0, 0],        /* reception N glazing (sliders to colonnade) */
    [0.6, 0, 2.7, 0, 0],         /* kitchen window */
    [10.9, 0, 14.6, 0, 0],       /* living room window */
    [6.6, 0, 10.2, 0, 1],        /* master terrace slider */
    [3.6, 0, 5.4, 0, 1],         /* bedroom2 window */
    [11.0, 0, 12.3, 0, 1],       /* ensuite window */
    [13.1, 0, 14.8, 0, 1]        /* bedroom3 window */
  ],
  openGlass: [ { floor: 0, x1: 5.4, x2: 7.2, z: 0 } ],

  /* U-stair: 11 risers south, landing, 9 risers back north (plan) */
  stair: {
    flightA: { x: 5.5, z1: 8.8, z2: 11.7, w: 1.05, y1: 0, y2: 1.87 },
    landing: { x1: 3.4, x2: 6.0, z1: 11.7, z2: 12.8, y: 1.87 },
    flightB: { x: 3.9, z1: 11.7, z2: 8.8, w: 1.05, y1: 1.87, y2: 3.4 }
  },

  columns: [ [3.6, -1.3], [6.4, -1.3], [9.2, -1.3] ],

  start: { pos: [12.1, 15.6], floor: 0, lookAt: [11.6, 12.8] }
};
