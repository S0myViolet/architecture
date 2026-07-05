/* ============================================================
   3D layout — ALMAZA, SAHEL
   GROUND FLOOR rebuilt from the Kymera technical floor plan
   (phone photo of "KYMERA - MR.KARIM HELALY - TECH..." drawing).
   Key plan facts encoded here:
     · garden + colonnade to the NORTH (z<0), entry court SE
     · kitchen WEST (counter run 3.67m, island 2.0×0.61m)
     · central Reception & Dining (sofa 3.39m, oval table 1.85×1.0, 8 chairs)
     · separate LIVING ROOM on the EAST
     · powder room + guest toilet east, guest bedroom (bed 1.6×2.07) + ensuite south
     · driver's room (round table Ø1.0) + driver's toilet SE
     · U-shaped stair: 11 + 9 risers ⇒ floor height ≈ 3.4m
     · outdoor dining NW under pergola, outdoor lounge NE (circled on plan)
   FIRST FLOOR remains an assumption (no upper plan provided) —
   scaled to the same footprint, stair arrival correct.
   Units: metres. x: 0→15.2 west→east · z: 0→12 north→south wall.
   ============================================================ */
window.LAYOUT3D = {
  floorHeight: 3.4,
  eyeHeight: 1.6,

  zones: [
    /* ---------- ground floor (from plan) ---------- */
    { id: "court",         roomId: "exterior-entrance", name: "Entrance Court",      floor: 0, rect: [15.2, 5.0, 19.0, 12.0], at: [17.0, 8.6], look: [15.2, 7.0] },
    { id: "corridor",      roomId: null,                name: "Gallery Corridor",    floor: 0, rect: [3.2, 6.2, 15.2, 7.6],   at: [10.5, 6.9] },
    { id: "reception",     roomId: "living-area",       name: "Reception & Dining",  floor: 0, rect: [3.2, 0, 10.4, 6.2],     at: [6.6, 2.6], stand: [6.6, 5.4], look: [6.2, 0.5] },
    { id: "kitchen",       roomId: "dining-kitchen",    name: "Kitchen",             floor: 0, rect: [0, 0, 3.2, 5.4],        at: [1.7, 2.6], stand: [2.7, 4.6], look: [0.8, 1.6] },
    { id: "lounge",        roomId: "living-area",       name: "Living Room",         floor: 0, rect: [10.4, 0.8, 15.2, 4.9],  at: [12.8, 2.6], stand: [11.2, 4.2], look: [13.8, 1.6] },
    { id: "powder",        roomId: "powder-room",       name: "Powder Room",         floor: 0, rect: [10.6, 4.9, 12.4, 6.2],  at: [11.5, 5.5] },
    { id: "guest-wc",      roomId: "bathrooms",         name: "Guest Toilet",        floor: 0, rect: [12.4, 4.9, 14.2, 6.2],  at: [13.3, 5.5] },
    { id: "stairs",        roomId: "staircase",         name: "Staircase",           floor: 0, rect: [3.2, 7.6, 6.0, 12.0],   at: [4.6, 8.4] },
    { id: "guest-bed",     roomId: "guest-bedroom",     name: "Guest Bedroom",       floor: 0, rect: [6.0, 7.6, 9.6, 12.0],   at: [7.8, 9.8], stand: [8.8, 8.6], look: [6.8, 10.6] },
    { id: "guest-bath",    roomId: "bathrooms",         name: "Guest Ensuite",       floor: 0, rect: [9.6, 8.6, 11.4, 12.0],  at: [10.5, 10.3] },
    { id: "drivers",       roomId: null,                name: "Driver's Room",       floor: 0, rect: [12.8, 7.6, 15.2, 12.0], at: [14.0, 9.8] },
    { id: "drivers-wc",    roomId: null,                name: "Driver's Toilet",     floor: 0, rect: [11.4, 8.6, 12.8, 12.0], at: [12.1, 10.3] },
    { id: "utility",       roomId: null,                name: "Pantry / Utility",    floor: 0, rect: [0, 5.4, 3.2, 7.6],      at: [1.6, 6.5] },
    { id: "colonnade",     roomId: "front-terrace",     name: "Garden Colonnade",    floor: 0, rect: [3.2, -2.6, 10.4, 0],    at: [6.8, -1.3], look: [6.8, -5] },
    { id: "out-dining",    roomId: "front-terrace",     name: "Outdoor Dining",      floor: 0, rect: [0, -2.6, 3.2, 0],       at: [1.6, -1.3], look: [1.6, -4] },
    { id: "out-lounge",    roomId: "garden",            name: "Garden Lounge",       floor: 0, rect: [10.6, -4.8, 14.8, -1.0],at: [12.7, -2.9], look: [8, 0] },
    { id: "garden",        roomId: "garden",            name: "Garden",              floor: 0, rect: [0, -6.5, 15.2, -2.6],   at: [6.5, -4.5], look: [6.5, 0] },

    /* ---------- first floor (assumed — no upper plan yet) ---------- */
    { id: "landing",       roomId: "staircase",         name: "Landing",             floor: 1, rect: [3.2, 7.6, 6.0, 12.0],   at: [4.6, 9.0] },
    { id: "hall-up",       roomId: null,                name: "Upper Hall",          floor: 1, rect: [3.2, 5.4, 15.2, 7.6],   at: [9.0, 6.5] },
    { id: "master",        roomId: "master-bedroom",    name: "Master Bedroom",      floor: 1, rect: [6.0, 0, 11.0, 5.4],     at: [8.5, 2.7], stand: [7.0, 4.6], look: [9.4, 1.2] },
    { id: "master-bath",   roomId: "bathrooms",         name: "Master Bathroom",     floor: 1, rect: [11.0, 4.9, 15.2, 7.6],  at: [13.0, 6.2] },
    { id: "bedroom-2",     roomId: "bedroom-2",         name: "Bedroom 2",           floor: 1, rect: [0, 0, 6.0, 5.4],        at: [3.0, 2.7], stand: [4.6, 4.4], look: [1.6, 1.4] },
    { id: "bedroom-3",     roomId: "bedroom-2",         name: "Bedroom 3",           floor: 1, rect: [11.0, 0, 15.2, 4.9],    at: [13.1, 2.4], stand: [11.8, 4.0], look: [13.8, 1.2] },
    { id: "bath-2",        roomId: "bathrooms",         name: "Bathroom",            floor: 1, rect: [6.0, 7.6, 9.6, 12.0],   at: [7.8, 9.4] },
    { id: "dressing",      roomId: "master-bedroom",    name: "Dressing",            floor: 1, rect: [9.6, 7.6, 15.2, 12.0],  at: [12.4, 9.4] },
    { id: "balcony",       roomId: "upper-balcony",     name: "North Terrace",       floor: 1, rect: [3.2, -2.6, 11.0, 0],    at: [7.0, -1.3], look: [7.0, -6] }
  ],

  /* walls: [x1,z1,x2,z2] — door openings are gaps between segments */
  walls: {
    ground: [
      /* --- outer shell --- */
      [0, 0, 0.6, 0],  [2.7, 0, 3.2, 0],            /* N kitchen wall, window gap */
      [10.4, 0, 10.9, 0], [14.6, 0, 15.2, 0],       /* N living-room wall, window gap */
      [0, 0, 0, 12],                                 /* W wall */
      [15.2, 0, 15.2, 6.3], [15.2, 7.5, 15.2, 12],   /* E wall, MAIN ENTRY gap z 6.3–7.5 */
      [0, 12, 15.2, 12],                             /* S wall */
      /* --- kitchen / reception --- */
      [3.2, 0, 3.2, 0.9],  [3.2, 4.7, 3.2, 5.4],     /* kitchen|reception, wide opening */
      [0, 5.4, 3.2, 5.4],                            /* kitchen|utility */
      [3.2, 5.4, 3.2, 7.6],                          /* utility|stair block */
      /* --- reception | east lounge --- */
      [10.4, 0, 10.4, 1.6], [10.4, 3.2, 10.4, 4.9],  /* opening z 1.6–3.2 */
      [10.4, 0.8, 15.2, 0.8],                        /* lounge N inner wall (glazing above plinth = window) */
      [10.4, 4.9, 15.2, 4.9],                        /* lounge S wall (powder/WC behind) */
      [12.4, 4.9, 12.4, 6.2],                        /* powder | guest WC */
      [14.2, 4.9, 14.2, 6.2],                        /* guest WC | shaft */
      [10.6, 6.2, 11.1, 6.2], [11.9, 6.2, 12.9, 6.2], [13.7, 6.2, 15.2, 6.2], /* corridor wall w/ 2 doors */
      [10.6, 4.9, 10.6, 6.2],                        /* powder W wall */
      /* --- reception | corridor: mostly open --- */
      [3.2, 6.2, 4.2, 6.2], [9.4, 6.2, 10.6, 6.2],
      /* --- south band --- */
      [3.2, 7.6, 4.9, 7.6], [6.0, 7.6, 6.9, 7.6], [7.9, 7.6, 9.6, 7.6], /* stair opening 4.9–6.0, guest door 6.9–7.9 */
      [9.6, 7.6, 12.0, 7.6], [12.9, 7.6, 15.2, 7.6], /* corridor wall, drivers door gap */
      [6.0, 7.6, 6.0, 12],                           /* stairs | guest bed */
      [9.6, 7.6, 9.6, 9.2], [9.6, 10.2, 9.6, 12],    /* guest bed | ensuite, door gap */
      [9.6, 8.6, 11.4, 8.6],                         /* ensuite N wall */
      [11.4, 8.6, 11.4, 12],                         /* ensuite | drivers WC */
      [12.8, 8.6, 12.8, 9.4], [12.8, 10.4, 12.8, 12],/* drivers WC | drivers room, door */
      [11.4, 8.6, 12.1, 8.6],                        /* drivers WC N wall + door gap */
      /* --- stair block --- */
      [3.2, 7.6, 3.2, 12]                            /* stair W wall */
    ],
    first: [
      [0, 0, 3.2, 0], [3.8, 0, 6.0, 0],              /* N wall bedroom2, window */
      [6.0, 0, 6.6, 0], [10.4, 0, 11.0, 0],          /* N wall master, terrace slider gap 6.6–10.4 */
      [11.0, 0, 11.6, 0], [14.6, 0, 15.2, 0],        /* N wall bedroom3, window */
      [0, 0, 0, 12], [15.2, 0, 15.2, 12], [0, 12, 15.2, 12],
      [6.0, 0, 6.0, 2.2], [6.0, 3.4, 6.0, 5.4],      /* bedroom2 | master, door */
      [11.0, 0, 11.0, 2.2], [11.0, 3.4, 11.0, 4.9],  /* master | bedroom3, door */
      [0, 5.4, 2.2, 5.4], [3.2, 5.4, 5.0, 5.4],      /* hall S of bedroom2, door */
      [6.0, 5.4, 7.4, 5.4], [8.6, 5.4, 11.0, 5.4],   /* hall S of master, door */
      [11.0, 4.9, 12.2, 4.9], [13.4, 4.9, 15.2, 4.9],/* hall S of bedroom3, door */
      [11.0, 4.9, 11.0, 7.6],                        /* master bath W wall */
      [3.2, 7.6, 6.9, 7.6], [7.9, 7.6, 9.0, 7.6],    /* bath-2 wall + door */
      [10.2, 7.6, 12.0, 7.6], [12.9, 7.6, 15.2, 7.6],/* dressing wall + door */
      [9.6, 7.6, 9.6, 12],                           /* bath-2 | dressing */
      [6.0, 7.6, 6.0, 12],                           /* landing | bath-2 */
      [3.2, 7.6, 3.2, 12]                            /* landing W wall */
    ]
  },

  /* glazing: [x1,z1,x2,z2,floor] — sliders/windows */
  glass: [
    [3.2, 0, 10.4, 0, 0],       /* reception N glazing to colonnade (sliders, partly open) */
    [0.6, 0, 2.7, 0, 0],        /* kitchen window */
    [10.9, 0, 14.6, 0, 0],      /* living room window */
    [6.6, 0, 10.4, 0, 1],       /* master terrace slider */
    [3.8, 0, 6.0, 0, 1],        /* bedroom2 window */
    [11.6, 0, 14.6, 0, 1]       /* bedroom3 window */
  ],
  /* which glass panes are walkable (open slider) */
  openGlass: [ { floor: 0, x1: 5.2, x2: 7.0, z: 0 } ],

  /* U-stair from plan: flight A 11 risers up (south), landing, flight B 9 risers (north) */
  stair: {
    flightA: { x: 5.5, z1: 7.9, z2: 10.9, w: 1.0, y1: 0, y2: 1.87 },   /* along east side of stairwell */
    landing: { x1: 3.4, x2: 6.0, z1: 10.9, z2: 12.0, y: 1.87 },
    flightB: { x: 3.9, z1: 10.9, z2: 7.9, w: 1.0, y1: 1.87, y2: 3.4 }  /* back north on west side */
  },

  columns: [ [3.6, -1.3], [6.4, -1.3], [9.2, -1.3] ],   /* garden colonnade (video/renders) */

  start: { pos: [17.6, 8.8], floor: 0, lookAt: [15.2, 7.0] }
};
