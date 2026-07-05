/* ============================================================
   3D walkthrough layout — APPROXIMATE reconstruction
   Inferred from the site walkthrough video + design pages.
   Units are metres, axis-aligned. Ground floor y=0, first floor y=3.2.
   Everything here is editable: rooms (zones + hotspots), walls
   (with door gaps already left as separate segments), glazing,
   stairs, columns, and simple furniture cues.
   `roomId` links a zone to data/rooms.json for the info sheet.
   ============================================================ */
window.LAYOUT3D = {
  floorHeight: 3.2,
  eyeHeight: 1.6,

  /* Zones: rect = [x1, z1, x2, z2]. `at` = hotspot/label position.  */
  zones: [
    { id: "entry-porch",   roomId: "exterior-entrance", name: "Entrance",            floor: 0, rect: [-3.4, 2.6, 0, 5.4],   at: [-1.7, 4.0] },
    { id: "living",        roomId: "living-area",       name: "Living Area",         floor: 0, rect: [0, 0, 9, 6.5],        at: [4.0, 3.0], stand: [1.2, 5.6], look: [6.5, 1.5] },
    { id: "dining-kitchen",roomId: "dining-kitchen",    name: "Dining & Kitchen",    floor: 0, rect: [9, 0, 14, 4],         at: [11.5, 2.0] },
    { id: "stair-hall",    roomId: "staircase",         name: "Stair Hall",          floor: 0, rect: [9, 4, 14, 6.5],       at: [10.4, 5.2] },
    { id: "powder",        roomId: "powder-room",       name: "Powder Room",         floor: 0, rect: [0, 7.5, 2.6, 10],     at: [1.3, 8.7] },
    { id: "guest-bath",    roomId: "bathrooms",         name: "Guest Bathroom",      floor: 0, rect: [2.6, 7.5, 5, 10],     at: [3.8, 8.7] },
    { id: "guest-bed",     roomId: "guest-bedroom",     name: "Guest Bedroom",       floor: 0, rect: [5, 7.5, 10, 10],      at: [7.5, 8.7] },
    { id: "utility",       roomId: null,                name: "Utility (approx.)",   floor: 0, rect: [10, 7.5, 14, 10],     at: [12, 8.7] },
    { id: "terrace",       roomId: "front-terrace",     name: "Covered Terrace",     floor: 0, rect: [0, -3.6, 9, 0],       at: [4.5, -1.8], look: [4.5, -6] },
    { id: "garden",        roomId: "garden",            name: "Garden",              floor: 0, rect: [-3.4, -8.5, 14, -3.6],at: [6, -6], look: [6, 0] },

    { id: "master",        roomId: "master-bedroom",    name: "Master Bedroom",      floor: 1, rect: [0, 0, 6, 6.5],        at: [3.0, 3.2], stand: [1.3, 1.3], look: [3.6, 4.8] },
    { id: "master-bath",   roomId: "bathrooms",         name: "Master Bathroom",     floor: 1, rect: [0, 6.5, 3, 10],       at: [1.5, 8.2] },
    { id: "dressing",      roomId: "master-bedroom",    name: "Dressing",            floor: 1, rect: [3, 6.5, 6, 10],       at: [4.5, 8.2] },
    { id: "hall-up",       roomId: null,                name: "Upper Hall",          floor: 1, rect: [6, 0, 9, 10],         at: [7.5, 5.0] },
    { id: "bedroom-2",     roomId: "bedroom-2",         name: "Bedroom 2",           floor: 1, rect: [9, 0, 14, 4],         at: [11.5, 2.0] },
    { id: "bedroom-3",     roomId: "bedroom-2",         name: "Bedroom 3",           floor: 1, rect: [9, 7.5, 14, 10],      at: [11.5, 8.7] },
    { id: "landing",       roomId: "staircase",         name: "Landing",             floor: 1, rect: [9, 4, 14, 7.5],       at: [10.4, 6.6] },
    { id: "balcony",       roomId: "upper-balcony",     name: "Master Terrace",      floor: 1, rect: [0, -3.6, 9, 0],       at: [4.5, -1.8], look: [4.5, -7] }
  ],

  /* Interior + exterior walls. Door openings are simply gaps
     between segments. seg = [x1, z1, x2, z2]. h = height override. */
  walls: {
    ground: [
      /* outer shell (gaps = glazing or doors, see `glass`) */
      [0, 10, 14, 10],            /* back wall */
      [14, 0, 14, 10],            /* east wall  */
      [0, 5.4, 0, 10],            /* west wall above entry door */
      [0, 0, 0, 2.6],             /* west wall below entry door */
      [9.5, 0, 14, 0],            /* south wall behind kitchen */
      /* interior partitions */
      [9, 0, 9, 1.6],             /* living | kitchen (wide opening) */
      [9, 3.2, 9, 6.5],           /* living | stair hall */
      [9, 6.5, 9, 10],            /* guest bed | utility... east side */
      [0, 6.5, 3.6, 6.5],         /* corridor wall west of opening */
      [4.6, 6.5, 9, 6.5],         /* corridor wall east of opening */
      [9, 6.5, 14, 6.5],          /* stair hall | utility, solid */
      [2.6, 7.5, 2.6, 10],        /* powder | guest bath */
      [5, 7.5, 5, 10],            /* guest bath | guest bedroom */
      [10, 7.5, 10, 10],          /* guest bedroom | utility */
      [0, 7.5, 1.0, 7.5],         /* powder front + door gap */
      [1.9, 7.5, 3.0, 7.5],       /* powder/guest-bath front */
      [3.9, 7.5, 6.2, 7.5],       /* guest-bath/bed front */
      [7.2, 7.5, 10.6, 7.5],      /* guest bed front */
      [11.5, 7.5, 14, 7.5]        /* utility front + door gap */
    ],
    first: [
      [0, 10, 14, 10],
      [14, 0, 14, 10],
      [0, 0, 0, 10],
      [0, 0, 3.2, 0],             /* south wall, gap = master terrace door */
      [4.4, 0, 6, 0],
      [9, 0, 14, 0],              /* bedrooms south wall (windows) */
      [6, 0, 6, 2.4],             /* master | hall, gap = door */
      [6, 3.4, 6, 10],
      [0, 6.5, 1.0, 6.5],         /* master bath front + door */
      [1.9, 6.5, 4.2, 6.5],
      [5.1, 6.5, 6, 6.5],         /* dressing front + door */
      [3, 6.5, 3, 10],            /* master bath | dressing */
      [9, 0, 9, 4],               /* bedroom 2 | hall, door on z side */
      [9, 4, 9, 4.9],             /* landing west + gap */
      [9, 6.1, 9, 10],
      [9, 4, 10.6, 4],            /* bedroom 2 front + door gap */
      [11.6, 4, 14, 4],
      [9, 7.5, 10.6, 7.5],        /* bedroom 3 front + door gap */
      [11.6, 7.5, 14, 7.5]
    ]
  },

  /* Glazing planes (floor-to-ceiling sliders): [x1, z1, x2, z2, floor] */
  glass: [
    [0, 0, 9.5, 0, 0],            /* living/dining south glazing to terrace */
    [0, 0, 0, 2.6, 0],            /* living west glazing below the entry door gap */
    [3.2, 0, 4.4, 0, 1],          /* master terrace slider */
    [9, 10, 14, 10, 1]            /* landing back window strip */
  ],

  /* Straight stair: base→top, rises floorHeight. width metres. */
  stair: { base: [9.6, 5.6], top: [13.4, 5.6], width: 1.2 },

  /* Terrace columns from the video: round, dark. [x, z] on ground. */
  columns: [ [2.2, -1.8], [6.2, -1.8], [8.8, -1.8] ],

  /* Minimal furnishing cues — clearly abstract placeholders.
     type: block|disc|bed. pos=[x, z], size=[w, d, h], floor. */
  cues: [
    { type: "block", name: "sofa",   floor: 0, pos: [3.2, 1.6],  size: [3.4, 1.1, 0.65], color: "#e8e2d4" },
    { type: "block", name: "sofa",   floor: 0, pos: [1.6, 3.4],  size: [1.1, 2.2, 0.65], color: "#efeadd" },
    { type: "disc",  name: "table",  floor: 0, pos: [11.2, 2.0], size: [1.1, 1.1, 0.74], color: "#f1ece0" },
    { type: "block", name: "kitchen",floor: 0, pos: [13.55, 2.0],size: [0.75, 3.6, 0.95], color: "#cfc3ac" },
    { type: "bed",   name: "bed",    floor: 0, pos: [7.5, 9.0],  size: [1.7, 2.0, 0.55], color: "#efeadd" },
    { type: "bed",   name: "bed",    floor: 1, pos: [3.0, 4.6],  size: [1.9, 2.1, 0.55], color: "#efeadd" },
    { type: "bed",   name: "bed",    floor: 1, pos: [11.5, 1.6], size: [1.7, 2.0, 0.55], color: "#efeadd" },
    { type: "bed",   name: "bed",    floor: 1, pos: [11.5, 9.0], size: [1.7, 2.0, 0.55], color: "#efeadd" },
    { type: "block", name: "outdoor sofa", floor: 0, pos: [4.5, -6.2], size: [2.8, 1.0, 0.6], color: "#e6ddca" }
  ],

  /* Where the visitor starts. */
  start: { pos: [-2.6, 4.0], floor: 0, lookAt: [4, 3] }
};
