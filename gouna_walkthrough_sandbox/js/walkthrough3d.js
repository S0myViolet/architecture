/* ============================================================
   ALMAZA, SAHEL — 3D walkthrough engine v5 (LAYOUT-ONLY)
   Timestamp-anchored reconstruction: see data/source_understanding/
   (timeline_registry + part1..part5 anchor maps + final_consolidation).
   No furniture, no decoration — walls, floors, openings, L-stair,
   terraces, garden anchor, labels + timestamp-anchored debug markers.
   The previous furnished engine is kept in backup/pre-v4-rebuild/.
   Controls: drag look · WASD/arrows · click floor · Esc exits.
   ============================================================ */

(function () {
  const L = window.LAYOUT3D;
  if (!L || !window.THREE) return;

  const overlay = document.getElementById("threeOverlay");
  const canvas = document.getElementById("threeCanvas");
  const exitBtn = document.getElementById("exit3d");
  const helpBtn = document.getElementById("help3d");
  const helpCard = document.getElementById("threeHelp");
  const zoneSelect = document.getElementById("zoneSelect");
  const floorBtns = document.querySelectorAll("[data-floor]");
  const hudZone = document.getElementById("hudZone");
  const hudDetails = document.getElementById("hudDetails");

  const FH = L.floorHeight, EYE = L.eyeHeight;
  const WALL_H = 3.05, WALL_T = 0.18, RADIUS = 0.3;
  const W_HOUSE = 15.6, D_HOUSE = 12.6;

  let renderer, scene, camera, running = false, started = false;
  const state = {
    pos: new THREE.Vector3(L.start.pos[0], EYE, L.start.pos[1]),
    yaw: 0, pitch: 0, floor: L.start.floor,
    keys: {}, moveTarget: null, jump: null
  };
  {
    const dx = L.start.lookAt[0] - L.start.pos[0];
    const dz = L.start.lookAt[1] - L.start.pos[1];
    state.yaw = Math.atan2(dx, -dz);
  }
  window.SANDBOX3D = state;

  const colliders = { 0: [], 1: [] };
  window.SANDBOX3D_DEBUG = { colliders, hit: (x, z, fl) => (colliders[fl] || []).filter((c) => x > c.minX && x < c.maxX && z > c.minZ && z < c.maxZ) };
  const markers = [];
  const floorMeshes = [];

  /* ---------- textures / materials (minimal, calm) ---------- */
  function makeTex(px, draw, repeat) {
    const c = document.createElement("canvas");
    c.width = c.height = px;
    draw(c.getContext("2d"), px);
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat[0], repeat[1]);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }
  const noise = (g, px, base, amp, n) => {
    for (let i = 0; i < n; i++) {
      const v = base + (Math.random() - 0.5) * amp;
      g.fillStyle = `rgba(${v},${v - 4},${v - 12},.2)`;
      g.fillRect(Math.random() * px, Math.random() * px, 3, 3);
    }
  };
  const std = (o) => new THREE.MeshStandardMaterial(o);
  const MAT = {
    wall: std({ map: makeTex(256, (g, px) => { g.fillStyle = "#f1ece1"; g.fillRect(0, 0, px, px); noise(g, px, 236, 12, 400); }, [2, 1]), roughness: 0.95 }),
    floor: std({ map: makeTex(512, (g, px) => { g.fillStyle = "#d8d0c1"; g.fillRect(0, 0, px, px); noise(g, px, 210, 20, 900); g.strokeStyle = "rgba(120,110,95,.5)"; g.lineWidth = 2; g.strokeRect(0, 0, px, px); }, [13, 10]), roughness: 0.6 }),
    slab: std({ color: 0xe9e3d5, roughness: 0.9 }),
    flag: std({ map: makeTex(512, (g, px) => { g.fillStyle = "#c4bfb1"; g.fillRect(0, 0, px, px); noise(g, px, 190, 26, 900); g.strokeStyle = "rgba(255,253,246,.8)"; g.lineWidth = 5; for (let i = 0; i < 8; i++) { g.beginPath(); let x = Math.random() * px, y = 0; g.moveTo(x, 0); while (y < px) { y += 50 + Math.random() * 60; x += (Math.random() - 0.5) * 90; g.lineTo(x, y); } g.stroke(); } }, [3, 2]), roughness: 0.9 }),
    grass: std({ map: makeTex(256, (g, px) => { g.fillStyle = "#8aa46e"; g.fillRect(0, 0, px, px); for (let i = 0; i < 1500; i++) { g.fillStyle = `rgba(${90 + Math.random() * 60},${140 + Math.random() * 50},80,.4)`; g.fillRect(Math.random() * px, Math.random() * px, 2, 4); } }, [8, 4]), roughness: 1 }),
    sand: std({ color: 0xd3c7ad, roughness: 1 }),
    pave: std({ color: 0xc9c0ae, roughness: 0.9 }),
    stone: std({ color: 0x54514b, roughness: 0.6 }),
    darkWall: std({ color: 0x4b463f, roughness: 0.85 }),
    wood: std({ color: 0xb98d5f, roughness: 0.65 }),
    dark: std({ color: 0x453d33, roughness: 0.7 }),
    glass: std({ color: 0xc8dde0, transparent: true, opacity: 0.2, roughness: 0.1, metalness: 0.2, side: THREE.DoubleSide }),
    frame: std({ color: 0x39342e, roughness: 0.5, metalness: 0.4 }),
    plant: std({ color: 0x5e7a4c, roughness: 1 }),
    trunk: std({ color: 0x7a6448, roughness: 1 }),
    conc: std({ color: 0x9a948a, roughness: 0.95 }),
    pit: std({ color: 0x8a7a5e, roughness: 1 }),
    ring: new THREE.MeshBasicMaterial({ color: 0xb08a4f }),
    debug: new THREE.MeshBasicMaterial({ color: 0xc96f4a })
  };

  /* ---------- helpers ---------- */
  function box(w, h, d, mat, x, y, z, ry = 0, shadow = true) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    if (ry) m.rotation.y = ry;
    if (shadow) { m.castShadow = true; m.receiveShadow = true; } else m.receiveShadow = true;
    scene.add(m);
    return m;
  }
  function cyl(r1, r2, h, mat, x, y, z, seg = 20) {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, seg), mat);
    m.position.set(x, y, z);
    m.castShadow = m.receiveShadow = true;
    scene.add(m);
    return m;
  }
  function plane(w, d, mat, x, y, z) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat);
    m.rotation.x = -Math.PI / 2;
    m.position.set(x, y, z);
    m.receiveShadow = true;
    scene.add(m);
    return m;
  }
  function addCollider(fl, x1, z1, x2, z2) {
    colliders[fl].push({ minX: Math.min(x1, x2) - RADIUS, maxX: Math.max(x1, x2) + RADIUS, minZ: Math.min(z1, z2) - RADIUS, maxZ: Math.max(z1, z2) + RADIUS });
  }
  function wallSeg(seg, y0, fl) {
    const [x1, z1, x2, z2] = seg;
    const len = Math.hypot(x2 - x1, z2 - z1);
    if (len < 0.05) return;
    const horizontal = Math.abs(x2 - x1) > Math.abs(z2 - z1);
    const w = horizontal ? len : WALL_T, d = horizontal ? WALL_T : len;
    const cx = (x1 + x2) / 2, cz = (z1 + z2) / 2;
    box(w, WALL_H, d, MAT.wall, cx, y0 + WALL_H / 2, cz);
    addCollider(fl, cx - w / 2, cz - d / 2, cx + w / 2, cz + d / 2);
  }
  function makeLabel(text, x, y, z, scale = 1, color = "rgba(36,31,24,.72)") {
    const c = document.createElement("canvas");
    c.width = 512; c.height = 128;
    const g = c.getContext("2d");
    const w = Math.min(495, 80 + text.length * 17);
    g.fillStyle = color;
    g.beginPath(); g.roundRect((512 - w) / 2, 34, w, 62, 31); g.fill();
    g.fillStyle = "#f6f0e2"; g.font = "500 30px Georgia, serif";
    g.textAlign = "center"; g.textBaseline = "middle";
    g.fillText(text, 256, 66);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
    sp.scale.set(2.7 * scale, 0.68 * scale, 1);
    sp.position.set(x, y, z);
    scene.add(sp);
    return sp;
  }

  /* ---------- init ---------- */
  function init() {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd7e2e8);
    scene.fog = new THREE.Fog(0xd7e2e8, 45, 120);
    camera = new THREE.PerspectiveCamera(66, 1, 0.05, 240);

    scene.add(new THREE.HemisphereLight(0xfdf7ea, 0xb1a58c, 0.7));
    const sun = new THREE.DirectionalLight(0xfff0d6, 1.25);
    sun.position.set(22, 30, 16);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -28; sun.shadow.camera.right = 28;
    sun.shadow.camera.top = 28; sun.shadow.camera.bottom = -28;
    sun.shadow.camera.far = 100;
    sun.shadow.bias = -0.0004;
    scene.add(sun);
    sun.target.position.set(7, 0, 4); scene.add(sun.target);
    scene.add(new THREE.AmbientLight(0xffffff, 0.16));

    buildWorld();
    resize();
    window.addEventListener("resize", resize);
  }

  function slabWithHole(y, hole, mat) {
    const s = new THREE.Shape();
    s.moveTo(0, 0); s.lineTo(W_HOUSE, 0); s.lineTo(W_HOUSE, D_HOUSE); s.lineTo(0, D_HOUSE); s.closePath();
    if (hole) {
      const h = new THREE.Path();
      h.moveTo(hole.x1, hole.z1); h.lineTo(hole.x2, hole.z1); h.lineTo(hole.x2, hole.z2); h.lineTo(hole.x1, hole.z2); h.closePath();
      s.holes.push(h);
    }
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.26, bevelEnabled: false });
    const m = new THREE.Mesh(g, mat);
    m.rotation.x = Math.PI / 2;
    m.position.y = y + 0.26;
    m.receiveShadow = true; m.castShadow = true;
    scene.add(m);
  }

  function buildWorld() {
    /* void over flight B + landing only — flight A sits under the skylight balcony (P3 M02:11) */
    const VOID = { x1: 13.35, x2: 15.52, z1: 8.85, z2: 12.45 };

    /* ---------- site (garden anchor preserved) ---------- */
    plane(90, 90, MAT.sand, 7, -0.02, 3);
    plane(W_HOUSE, 3.9, MAT.grass, 7.8, 0.005, -4.55);          /* lawn */
    plane(12.6, 2.6, MAT.flag, 9.3, 0.01, -1.3);                /* colonnade paving (full north face) */
    plane(3.0, 2.6, MAT.flag, 1.5, 0.01, -1.3);                 /* outdoor dining paving */
    plane(4.2, 3.8, MAT.flag, 12.9, 0.012, -2.9);               /* garden lounge pad */
    /* garden bench wall at the lawn edge (P1 00:29–34) */
    box(4.0, 0.45, 0.35, MAT.stone, 5.0, 0.22, -2.85);
    addCollider(0, 3.0, -3.05, 7.0, -2.65);

    /* corner lot streets (P1 00:00–08): FRONT street S + side street E,
       meeting at the SE corner by the carport */
    plane(44, 5.4, MAT.pave, 8, 0.004, 18.0);
    plane(5.2, 34, MAT.pave, 21.9, 0.004, 6);
    /* east boundary: low wall + hedge along the side street (runs to the garden corner) */
    box(0.18, 0.55, 19.2, MAT.wall, 19.25, 0.27, 3.1);
    box(0.55, 0.85, 18.8, MAT.plant, 19.7, 0.42, 3.1);
    addCollider(0, 19.0, -6.6, 20.0, 12.7);

    /* east side passage + planters (P2 M00:53–00:57 · P4 M03:24–30) */
    plane(2.3, 8.4, MAT.flag, 16.7, 0.012, 4.1);                /* side terrace paving */
    box(2.0, 0.55, 1.4, MAT.stone, 17.7, 0.27, -1.8);           /* NE corner planter (wrap path stays clear) */
    box(0.7, 0.8, 0.7, MAT.plant, 17.2, 1.0, -1.9);
    box(0.7, 0.9, 0.7, MAT.plant, 18.2, 1.05, -1.7);
    addCollider(0, 16.7, -2.5, 18.7, -1.1);
    box(1.15, 0.5, 3.6, MAT.stone, 18.35, 0.25, 2.3);           /* finished planter strip */
    plane(0.95, 3.4, MAT.pit, 18.35, 0.52, 2.3);
    addCollider(0, 17.75, 0.5, 18.95, 4.1);
    /* unfinished blockwork excavation strip (P4 M03:24–30) */
    box(1.15, 0.42, 6.0, MAT.pit, 18.35, 0.21, 7.5);
    plane(0.95, 5.8, MAT.dark, 18.35, 0.02, 7.5);
    makeLabel("planter / water feature (under construction) · uncertain", 18.35, 1.15, 7.5, 0.85, "rgba(120,70,40,.8)");
    addCollider(0, 17.75, 4.5, 18.95, 10.5);

    /* FRONT strip (P1 00:00–00:16 + final M04:31): sand bed, stepping-stone
       path from the SE carport to the recessed entry, planting bed with a
       blockwork under-construction section below the front balcony, low
       stone boundary wall along the street */
    plane(12.6, 2.5, MAT.sand, 6.3, 0.006, 13.85);
    for (let i = 0; i < 6; i++) plane(0.95, 0.62, MAT.flag, 11.9 - i * 1.15, 0.02, 13.5);
    plane(0.7, 0.9, MAT.flag, 5.4, 0.02, 13.1);
    plane(3.0, 1.8, MAT.flag, 5.4, 0.018, 11.6);                /* porch paving inside the recess */
    box(6.0, 0.35, 0.85, MAT.pit, 4.9, 0.17, 14.45);            /* under-construction bed (final M04:31) */
    addCollider(0, 1.8, 13.95, 8.0, 14.95);
    box(11.6, 0.5, 0.22, MAT.wall, 5.8, 0.25, 15.15);           /* low front boundary */
    addCollider(0, -0.2, 14.95, 11.7, 15.35);
    /* carport at the SE street corner (P1 00:09) */
    plane(4.0, 4.2, MAT.pave, 14.6, 0.01, 15.7);
    [[12.9, 13.9], [16.3, 13.9], [12.9, 17.5], [16.3, 17.5]].forEach(([x, z]) => cyl(0.09, 0.09, 2.5, MAT.wood, x, 1.25, z, 10));
    for (let i = 0; i < 8; i++) box(3.8, 0.05, 0.12, MAT.dark, 14.6, 2.55, 13.95 + i * 0.48, 0, false);
    /* vertical louvre screen on the front façade near the carport (P1 00:09) */
    for (let i = 0; i < 4; i++) box(0.07, 2.6, 0.13, MAT.dark, 13.45 + i * 0.5, 1.6, 12.72, 0, false);
    /* low garden boundary + slat fence (anchor) */
    const fence = (x, z, len, ry) => {
      box(len, 0.5, 0.15, MAT.wall, x, 0.25, z, ry);
      for (let i = 0; i < 4; i++) box(len, 0.07, 0.03, MAT.dark, x, 0.68 + i * 0.28, z, ry);
    };
    fence(9.7, -6.6, 19.8, 0);
    fence(-2.7, -3.2, 6.8, Math.PI / 2);
    addCollider(0, -0.4, -6.8, 19.7, -6.4);
    addCollider(0, -3.0, -6.8, -2.5, -0.2);
    /* GARDEN SIDE PATH (user: from the entrance go left, then right, to the
       garden): stepping stones along the west wall, under the west terrace */
    for (let i = 0; i < 11; i++) plane(0.95, 0.62, MAT.flag, -1.15, 0.02, 12.1 - i * 1.12);
    box(0.16, 0.5, 12.4, MAT.wall, -2.55, 0.25, 6.4);           /* low west boundary beside the path */
    addCollider(0, -2.75, 0.0, -2.35, 12.7);
    /* neighbourhood + palms */
    for (let i = 0; i < 6; i++) box(6, 2.8 + (i % 3) * 0.8, 4, MAT.wall, -16 + i * 8, 1.5, -21 - (i % 2) * 5);
    const palm = (x, z, s = 1) => {
      cyl(0.09 * s, 0.14 * s, 3.4 * s, MAT.trunk, x, 1.7 * s, z, 8);
      for (let i = 0; i < 6; i++) {
        const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.14 * s, 1.9 * s, 5), MAT.plant);
        leaf.position.set(x + Math.cos(i) * 0.7 * s, 3.5 * s, z + Math.sin(i) * 0.7 * s);
        leaf.rotation.z = Math.cos(i) * 1.25; leaf.rotation.x = Math.sin(i) * 1.25;
        leaf.castShadow = true; scene.add(leaf);
      }
    };
    palm(0.9, -5.6); palm(10.0, -5.9, 1.15); palm(14.6, -5.4, 0.9); palm(9.4, 16.6, 1.05); palm(-2.6, 16.0, 0.95);

    /* ---------- floors / slabs ---------- */
    plane(W_HOUSE, D_HOUSE, MAT.floor, W_HOUSE / 2, 0.02, D_HOUSE / 2);
    slabWithHole(FH - 0.26, VOID, MAT.slab);
    plane(W_HOUSE, D_HOUSE, MAT.floor, W_HOUSE / 2, FH + 0.015, D_HOUSE / 2);
    const voidMask = new THREE.Mesh(new THREE.PlaneGeometry(VOID.x2 - VOID.x1, VOID.z2 - VOID.z1), std({ color: 0x24201a }));
    voidMask.rotation.x = -Math.PI / 2;
    voidMask.position.set((VOID.x1 + VOID.x2) / 2, FH + 0.02, (VOID.z1 + VOID.z2) / 2);
    scene.add(voidMask);
    /* roof with rooflight hole over the stair landing */
    slabWithHole(FH + WALL_H + 0.04, { x1: 13.35, x2: 14.6, z1: 11.15, z2: 12.45 }, MAT.wall);
    box(1.5, 0.07, 1.6, MAT.glass, 13.98, FH + WALL_H + 0.12, 11.8, 0, false);

    /* CONTINUOUS BALCONY WRAP (P3/P4/P5 + final):
       N terrace → E long balcony → SE over the carport → FRONT street
       balcony → W stone-parapet terrace */
    /* west terrace slab — full west side (P3 M01:52) */
    box(2.6, 0.28, D_HOUSE + 0.4, MAT.slab, -1.2, FH - 0.14, 6.3);
    plane(2.4, 12.6, MAT.flag, -1.2, FH + 0.01, 6.3);
    /* north terrace over colonnade — full north face */
    box(15.8, 0.28, 2.8, MAT.slab, 7.8, FH - 0.14, -1.3);
    plane(15.6, 2.6, MAT.flag, 7.8, FH + 0.01, -1.3);
    /* long east balcony walkway (P4 M03:26–30) */
    box(1.5, 0.24, 15.15, MAT.slab, 16.25, FH - 0.12, 5.02);
    plane(1.3, 14.95, MAT.flag, 16.25, FH + 0.01, 5.02);
    box(1.1, 0.02, 14.6, MAT.dark, 16.78, FH + 0.02, 5.0, 0, false); /* linear drain strip (P3 M02:31) */
    /* FRONT street balcony over the entry path (final M04:21–04:35) */
    box(19.3, 0.24, 1.5, MAT.slab, 7.25, FH - 0.12, 13.3);
    plane(19.1, 1.3, MAT.flag, 7.25, FH + 0.01, 13.3);
    box(15.0, 0.02, 0.16, MAT.dark, 7.0, FH + 0.02, 13.85, 0, false); /* linear drain (final M04:35) */
    /* roof overhangs above terraces */
    box(3.0, 0.22, D_HOUSE + 1, MAT.wall, -1.3, FH + WALL_H + 0.02, 6.3);
    box(10.4, 0.22, 3.2, MAT.wall, 4.7, FH + WALL_H + 0.02, -1.4);
    box(2.0, 0.22, 17.6, MAT.wall, 16.4, FH + WALL_H + 0.02, 5.6);
    box(19.8, 0.22, 1.9, MAT.wall, 7.25, FH + WALL_H + 0.02, 13.4);
    /* dark stone PARAPET on the west terrace (~1.3m — P3 M01:52) */
    box(0.22, 1.3, 5.2, MAT.darkWall, -2.35, FH + 0.65, 3.6);
    /* terrace glass rails + colliders (continuous wrap, no dead ends) */
    const rail = (x, z, len, ry) => box(ry ? 0.05 : len, 1.05, ry ? len : 0.05, MAT.glass, x, FH + 0.55, z, 0, false);
    rail(-1.2, -2.58, 2.6);                       /* n terrace west return edge */
    rail(7.8, -2.58, 15.6);                       /* north terrace front */
    rail(16.25, -2.58, 1.4);                      /* NE corner segment */
    rail(-2.38, 0.5, 2.2, 1); rail(-2.38, 10.1, 7.7, 1);  /* west outer (parapet fills 1.0–6.2) */
    rail(16.94, 5.68, 16.55, 1);                  /* east outer, down to the SE corner */
    rail(7.25, 13.94, 19.3);                      /* front outer */
    addCollider(1, -2.6, -2.75, 17.05, -2.45);
    addCollider(1, -2.6, -2.6, -2.2, 14.05);
    addCollider(1, 16.8, -2.7, 17.1, 14.05);
    addCollider(1, -2.5, 13.8, 17.05, 14.1);

    /* ---------- walls ---------- */
    L.walls.ground.forEach((s) => wallSeg(s, 0, 0));
    L.walls.first.forEach((s) => wallSeg(s, FH, 1));

    /* ---------- glazing ---------- */
    L.glass.forEach(([x1, z1, x2, z2, fl]) => {
      const y0 = fl * FH;
      const len = x2 - x1;
      const cx = (x1 + x2) / 2, cz = z1;
      const open = (L.openGlass || []).find((o) => o.floor === fl && Math.abs(cz - o.z) < 0.3 && o.x1 >= x1 - 0.05 && o.x2 <= x2 + 0.05);
      box(len, 0.14, 0.1, MAT.frame, cx, y0 + WALL_H - 0.13, cz, 0, false);
      box(len, 0.08, 0.1, MAT.frame, cx, y0 + 0.04, cz, 0, false);
      if (open) {
        [[x1, open.x1], [open.x2, x2]].forEach(([a, b]) => {
          if (b - a < 0.08) return;
          box(b - a, WALL_H - 0.3, 0.05, MAT.glass, (a + b) / 2, y0 + WALL_H / 2 - 0.08, cz, 0, false);
          addCollider(fl, a, cz - 0.15, b, cz + 0.15);
        });
      } else {
        box(len, WALL_H - 0.3, 0.05, MAT.glass, cx, y0 + WALL_H / 2 - 0.08, cz, 0, false);
        addCollider(fl, x1, cz - 0.15, x2, cz + 0.15);
        const n = Math.max(1, Math.round(len / 1.6));
        for (let i = 1; i < n; i++) cyl(0.02, 0.02, WALL_H - 0.2, MAT.frame, x1 + (len * i) / n, y0 + WALL_H / 2, cz, 8);
      }
    });

    /* ENTRY RECESS dressing (P1 00:14–00:18 + user correction: sliding glass
       opening with the FRONT DOOR directly to its right): slat band over the
       opening, gray stone panel on the west flank, timber cladding on the
       east flank beside the door */
    box(3.9, 0.55, 0.45, MAT.wood, 5.4, WALL_H - 0.3, 12.62);
    for (let i = 0; i < 4; i++) box(3.7, 0.06, 0.55, MAT.dark, 5.4, 2.28 + i * 0.15, 12.6, 0, false);
    box(0.1, WALL_H - 0.1, 1.85, MAT.darkWall, 3.47, (WALL_H - 0.1) / 2, 11.65, 0, false);
    box(0.1, WALL_H - 0.2, 1.85, MAT.wood, 7.33, (WALL_H - 0.2) / 2, 11.65, 0, false);
    /* front-door leaf hint: timber frame around the door gap beside the slider */
    box(0.12, 2.1, 0.1, MAT.wood, 6.16, 1.05, 10.7, 0, false);
    box(0.12, 2.1, 0.1, MAT.wood, 7.24, 1.05, 10.7, 0, false);

    /* side-room slider dressing (P2 M00:55–01:02): slat band + gray reveal */
    for (let i = 0; i < 4; i++) box(0.3, 0.06, 2.2, MAT.dark, 15.7, 2.32 + i * 0.15, 2.6, 0, false);
    box(0.26, WALL_H, 1.2, MAT.darkWall, 15.72, WALL_H / 2, 4.2);
    /* gray service wall panel on the north façade (P1 00:49) */
    box(1.15, WALL_H - 0.1, 0.3, MAT.darkWall, 12.5, (WALL_H - 0.1) / 2, -0.08);

    /* west glazing return — the living's corner glass (P1 00:16–00:23) */
    box(0.05, WALL_H - 0.3, 4.4, MAT.glass, 0, WALL_H / 2 - 0.08, 2.8, 0, false);
    box(0.1, 0.14, 4.4, MAT.frame, 0, WALL_H - 0.13, 2.8, 0, false);
    box(0.1, 0.08, 4.4, MAT.frame, 0, 0.04, 2.8, 0, false);
    for (let i = 1; i < 3; i++) cyl(0.02, 0.02, WALL_H - 0.2, MAT.frame, 0, WALL_H / 2, 0.6 + i * 1.47, 8);
    addCollider(0, -0.15, 0.6, 0.15, 5.0);

    /* guest/service room front window (P1 00:02 façade) */
    box(1.7, 0.9, 0.18, MAT.wall, 1.6, 0.45, 12.6);
    box(1.6, 1.35, 0.06, MAT.glass, 1.6, 1.62, 12.6, 0, false);
    box(1.7, 0.72, 0.18, MAT.wall, 1.6, 2.69, 12.6);
    addCollider(0, 0.7, 12.45, 2.5, 12.75);

    /* guest WC high frosted window — east wall (P2 M01:18) */
    box(0.18, 1.9, 1.05, MAT.wall, 15.6, 0.95, 5.9);
    box(0.06, 0.7, 0.9, MAT.glass, 15.6, 2.32, 5.9, 0, false);
    box(0.18, 0.34, 1.05, MAT.wall, 15.6, 2.88, 5.9);
    addCollider(0, 15.45, 5.4, 15.75, 6.4);

    /* stair window strip — EAST wall beside flight B + landing (P2 M01:50):
       sill band below, glass above, cut into the east wall z 9.0–12.5 */
    box(0.18, 1.9, 3.5, MAT.wall, 15.6, 0.95, 10.75);
    addCollider(0, 15.45, 9.0, 15.75, 12.6);
    box(0.06, 1.15, 3.4, MAT.glass, 15.6, 2.47, 10.75, 0, false);
    box(0.1, 0.08, 3.4, MAT.frame, 15.6, 1.92, 10.75, 0, false);
    box(0.1, 0.08, 3.4, MAT.frame, 15.6, 3.02, 10.75, 0, false);

    /* ---------- door lintels + thresholds ---------- */
    (L.doors || []).forEach(([cx, cz, w, axis, fl]) => {
      const y0 = fl * FH;
      const lw = axis === "x" ? w + 0.1 : WALL_T + 0.04;
      const ld = axis === "x" ? WALL_T + 0.04 : w + 0.1;
      box(lw, WALL_H - 2.1, ld, MAT.wall, cx, y0 + 2.1 + (WALL_H - 2.1) / 2, cz, 0, false);
      const th = new THREE.Mesh(new THREE.BoxGeometry(axis === "x" ? w : 0.3, 0.012, axis === "x" ? 0.3 : w), MAT.slab);
      th.position.set(cx, y0 + 0.021, cz);
      scene.add(th);
    });

    /* ---------- L-stair ---------- */
    const ST = L.stair;
    ST.flights.forEach((f) => {
      const steps = Math.max(3, Math.round(Math.abs(f.to - f.from) / 0.27));
      const run = (f.to - f.from) / steps;
      for (let i = 0; i < steps; i++) {
        const h = f.y1 + ((i + 1) / steps) * (f.y2 - f.y1);
        const p = f.from + (i + 0.5) * run;
        if (f.axis === "x") box(Math.abs(run) + 0.02, h, f.w, MAT.stone, p, h / 2, f.fixed);
        else box(f.w, h, Math.abs(run) + 0.02, MAT.stone, f.fixed, h / 2, p);
      }
    });
    const Ld = ST.landing;
    box(Ld.x2 - Ld.x1, Ld.y, Ld.z2 - Ld.z1, MAT.stone, (Ld.x1 + Ld.x2) / 2, Ld.y / 2, (Ld.z1 + Ld.z2) / 2);
    /* frameless glass rail along flight A's lobby side (P2 M01:29) */
    box(2.85, 2.4, 0.05, MAT.glass, 11.92, 1.9, 11.24, 0, false);
    addCollider(0, 10.5, 11.1, 13.35, 11.38);
    /* under-stair passage: leaning panel/mirror + DB plates (P2 M01:29 + M01:44) */
    box(0.9, 1.35, 0.07, MAT.dark, 12.75, 0.68, 11.5, 0.12, false);
    box(0.05, 0.55, 0.4, MAT.dark, 7.07, 1.5, 9.4, 0, false);
    box(0.05, 0.55, 0.4, MAT.dark, 7.07, 1.5, 10.0, 0, false);
    /* skylight box over flight A — sits in the street-balcony floor (P3 M02:11) */
    box(1.8, 0.12, 0.8, MAT.frame, 11.15, FH + 0.2, 11.95, 0, false);
    box(1.7, 0.3, 0.7, MAT.glass, 11.15, FH + 0.42, 11.95, 0, false);
    addCollider(1, 10.3, 11.6, 12.0, 12.3);
    box(0.05, 1.05, 1.4, MAT.glass, 13.42, FH + 0.55, 11.9, 0, false); /* guard to the void */
    addCollider(1, 13.3, 11.2, 13.55, 12.6);
    /* floor-1 void guards: east side of flight B + hall edge */
    box(0.05, 1.05, 2.3, MAT.glass, 14.62, FH + 0.55, 10.1, 0, false);
    addCollider(1, 14.45, 8.95, 14.78, 11.3);
    box(0.8, 1.05, 0.05, MAT.glass, 15.15, FH + 0.55, 8.87, 0, false);
    addCollider(1, 14.75, 8.72, 15.55, 8.97);

    /* ---------- concrete columns (colonnade + east passage) ---------- */
    L.columns.forEach(([x, z]) => {
      cyl(0.22, 0.22, FH - 0.15, MAT.conc, x, (FH - 0.15) / 2, z, 22);
      addCollider(0, x - 0.34, z - 0.34, x + 0.34, z + 0.34);
    });

    /* ---------- labels + hotspots (+confidence when debug) ---------- */
    const roomsById = {};
    (window.SANDBOX?.rooms || []).forEach((r) => (roomsById[r.id] = r));
    const confTxt = { c: "", i: " · inferred", a: " · assumed" };
    L.zones.forEach((zn) => {
      const y0 = zn.floor * FH;
      const label = zn.name + (L.showDebug ? (confTxt[zn.conf] || "") : "");
      makeLabel(label, zn.at[0], y0 + 2.3, zn.at[1], 0.9);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.03, 10, 30), MAT.ring);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(zn.at[0], y0 + 0.05, zn.at[1]);
      scene.add(ring);
      markers.push({ mesh: ring, zone: zn, room: zn.roomId ? roomsById[zn.roomId] : null });
    });

    /* ---------- debug: timestamp-anchored markers (local | master times) ---------- */
    if (L.showDebug && L.debugAnchors) {
      const PART_COLOR = { 1: "#c96f4a", 2: "#4a8f8a", 3: "#8f4a7a", 4: "#4a6a8f", 5: "#6b6b6b" };
      /* route lines per floor, in tour order */
      [0, 1].forEach((fl) => {
        const pts = L.debugAnchors.filter((a) => a.f === fl).map((a) => new THREE.Vector3(a.p[0], fl * FH + 0.12, a.p[1]));
        if (pts.length > 1) scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0xc96f4a })));
      });
      L.debugAnchors.forEach((a, i) => {
        const y0 = a.f * FH;
        const col = PART_COLOR[a.part] || "#c96f4a";
        const c = document.createElement("canvas");
        c.width = 320; c.height = 120;
        const g = c.getContext("2d");
        g.fillStyle = col; g.beginPath(); g.arc(46, 60, 40, 0, 7); g.fill();
        g.fillStyle = "#fff"; g.font = "bold 38px Arial"; g.textAlign = "center"; g.textBaseline = "middle";
        g.fillText(String(i + 1), 46, 63);
        g.fillStyle = "rgba(30,26,20,.82)"; g.beginPath(); g.roundRect(94, 14, 214, 92, 14); g.fill();
        g.fillStyle = "#ffd9a0"; g.font = "bold 30px Arial"; g.textAlign = "left";
        g.fillText(`${a.t} | ${a.m}`, 106, 43);
        g.fillStyle = "#f2ece0"; g.font = "24px Georgia, serif";
        g.fillText(a.n.slice(0, 18), 106, 82);
        const tex = new THREE.CanvasTexture(c);
        tex.colorSpace = THREE.SRGBColorSpace;
        const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
        sp.scale.set(1.35, 0.51, 1);
        sp.position.set(a.p[0], y0 + 0.62, a.p[1]);
        scene.add(sp);
      });
      /* entrance arrow at the FRONT DOOR (right of the slider) pointing in */
      const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.7, 12), MAT.debug);
      arrow.rotation.x = -Math.PI / 2;
      arrow.position.set(6.7, 1.3, 13.3);
      scene.add(arrow);
    }

    /* click-to-move planes */
    [0, 1].forEach((fl) => {
      const g = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshBasicMaterial({ visible: false }));
      g.rotation.x = -Math.PI / 2;
      g.position.set(7.6, fl * FH + 0.01, 5);
      g.userData.floor = fl;
      scene.add(g);
      floorMeshes.push(g);
    });
  }

  /* ---------- movement / L-stair ---------- */
  function stairY(x, z) {
    for (const f of L.stair.flights) {
      const along = f.axis === "x" ? x : z;
      const across = f.axis === "x" ? z : x;
      if (Math.abs(across - f.fixed) > f.w / 2 + 0.2) continue;
      const lo = Math.min(f.from, f.to), hi = Math.max(f.from, f.to);
      if (along < lo - 0.25 || along > hi + 0.25) continue;
      const t = Math.max(0, Math.min(1, (along - f.from) / (f.to - f.from)));
      return f.y1 + t * (f.y2 - f.y1);
    }
    const Ld = L.stair.landing;
    if (x >= Ld.x1 && x <= Ld.x2 && z >= Ld.z1 && z <= Ld.z2) return Ld.y;
    return null;
  }
  function onStairs() {
    const sy = stairY(state.pos.x, state.pos.z);
    return sy !== null && sy > 0.08 && sy < FH - 0.08;
  }
  function collide(nx, nz) {
    if (onStairs()) return false;
    for (const c of colliders[state.floor] || []) {
      if (nx > c.minX && nx < c.maxX && nz > c.minZ && nz < c.maxZ) return true;
    }
    return false;
  }
  function tryMove(dx, dz) {
    const nx = state.pos.x + dx, nz = state.pos.z + dz;
    if (!collide(nx, state.pos.z)) state.pos.x = nx;
    if (!collide(state.pos.x, nz)) state.pos.z = nz;
  }

  let last = 0;
  function tick(ts) {
    if (!running) return;
    const dt = Math.min(0.12, (ts - last) / 1000 || 0.016);
    last = ts;

    if (state.jump) {
      const j = state.jump;
      j.t += dt / j.dur;
      const e = j.t < 1 ? 1 - Math.pow(1 - j.t, 3) : 1;
      state.pos.x = j.fx + (j.x - j.fx) * e;
      state.pos.z = j.fz + (j.z - j.fz) * e;
      state.yaw = j.fyaw + j.dyaw * e;
      state.floor = j.floor;
      if (j.t >= 1) state.jump = null;
    } else {
      const sp = 2.0 * dt;
      let mx = 0, mz = 0;
      if (state.keys.KeyW || state.keys.ArrowUp) mz -= 1;
      if (state.keys.KeyS || state.keys.ArrowDown) mz += 1;
      if (state.keys.KeyA || state.keys.ArrowLeft) mx -= 1;
      if (state.keys.KeyD || state.keys.ArrowRight) mx += 1;
      if (mx || mz) {
        state.moveTarget = null;
        const len = Math.hypot(mx, mz);
        const s = Math.sin(state.yaw), c = Math.cos(state.yaw);
        tryMove(((mx * c - mz * s) / len) * sp, ((mx * s + mz * c) / len) * sp);
      }
      if (state.moveTarget) {
        const d = new THREE.Vector2(state.moveTarget.x - state.pos.x, state.moveTarget.z - state.pos.z);
        if (d.length() < 0.15) state.moveTarget = null;
        else {
          d.normalize().multiplyScalar(2.0 * dt);
          const bx = state.pos.x, bz = state.pos.z;
          tryMove(d.x, d.y);
          if (Math.abs(bx - state.pos.x) < 1e-4 && Math.abs(bz - state.pos.z) < 1e-4) state.moveTarget = null;
        }
      }
    }

    const sy = stairY(state.pos.x, state.pos.z);
    if (sy !== null) state.floor = sy > FH * 0.55 ? 1 : 0;
    const targetY = (sy !== null ? sy : state.floor * FH) + EYE;
    state.pos.y += (targetY - state.pos.y) * Math.min(1, dt * 10);

    floorBtns.forEach((b) => b.classList.toggle("on", +b.dataset.floor === state.floor));
    const pulse = 1 + Math.sin(ts * 0.004) * 0.12;
    markers.forEach((m) => m.mesh.scale.set(pulse, pulse, 1));

    camera.position.copy(state.pos);
    const dir = new THREE.Vector3(
      Math.sin(state.yaw) * Math.cos(state.pitch),
      Math.sin(state.pitch),
      -Math.cos(state.yaw) * Math.cos(state.pitch)
    );
    camera.lookAt(state.pos.clone().add(dir));

    let best = null, bd = 1e9;
    L.zones.forEach((zn) => {
      if (zn.floor !== state.floor) return;
      const [x1, z1, x2, z2] = zn.rect;
      const inside = state.pos.x >= x1 && state.pos.x <= x2 && state.pos.z >= z1 && state.pos.z <= z2;
      const d = inside ? 0 : Math.hypot((x1 + x2) / 2 - state.pos.x, (z1 + z2) / 2 - state.pos.z);
      if (d < bd) { bd = d; best = zn; }
    });
    if (best && hudZone.dataset.zone !== best.id) {
      hudZone.dataset.zone = best.id;
      hudZone.textContent = best.name;
      hudDetails.style.display = best.roomId ? "" : "none";
      hudDetails.dataset.room = best.roomId || "";
    }

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  /* ---------- input ---------- */
  let dragging = false, moved = 0, px = 0, py = 0;
  canvas.addEventListener("pointerdown", (e) => {
    dragging = true; moved = 0; px = e.clientX; py = e.clientY;
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - px, dy = e.clientY - py;
    px = e.clientX; py = e.clientY;
    moved += Math.abs(dx) + Math.abs(dy);
    state.yaw += dx * 0.0042;
    state.pitch = Math.max(-1.2, Math.min(1.2, state.pitch - dy * 0.0038));
  });
  canvas.addEventListener("pointerup", (e) => {
    dragging = false;
    if (moved > 6) return;
    const r = canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    const ray = new THREE.Raycaster();
    ray.setFromCamera(ndc, camera);
    const hitM = ray.intersectObjects(markers.map((m) => m.mesh));
    if (hitM.length) {
      const mk = markers.find((m) => m.mesh === hitM[0].object);
      if (mk?.room && window.SANDBOX?.openRoomSheet) window.SANDBOX.openRoomSheet(mk.room);
      return;
    }
    const hitF = ray.intersectObjects(floorMeshes).filter((h) => h.object.userData.floor === state.floor);
    if (hitF.length) state.moveTarget = { x: hitF[0].point.x, z: hitF[0].point.z };
  });
  document.addEventListener("keydown", (e) => {
    if (!running) return;
    state.keys[e.code] = true;
    if (e.code === "Escape") close3D();
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) e.preventDefault();
  });
  document.addEventListener("keyup", (e) => (state.keys[e.code] = false));

  /* ---------- zone jump / UI ---------- */
  function jumpTo(zone) {
    const [x1, z1, x2, z2] = zone.rect;
    const cx = zone.stand ? zone.stand[0] : (x1 + x2) / 2;
    const cz = zone.stand ? zone.stand[1] : (z1 + z2) / 2;
    let lk = zone.look || zone.at;
    if (Math.abs(lk[0] - cx) < 0.3 && Math.abs(lk[1] - cz) < 0.3) lk = [7.6, 5.5];
    let dyaw = Math.atan2(lk[0] - cx || 0.01, -(lk[1] - cz || 0.01)) - state.yaw;
    dyaw = ((dyaw + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
    state.jump = { fx: state.pos.x, fz: state.pos.z, x: cx, z: cz, fyaw: state.yaw, dyaw, floor: zone.floor, t: 0, dur: 1.1 };
    state.moveTarget = null;
  }
  L.zones.forEach((zn) => {
    const o = document.createElement("option");
    o.value = zn.id;
    o.textContent = `${zn.floor ? "▲" : "▽"}  ${zn.name}`;
    zoneSelect.appendChild(o);
  });
  zoneSelect.addEventListener("change", () => {
    const zn = L.zones.find((z) => z.id === zoneSelect.value);
    if (zn) jumpTo(zn);
    zoneSelect.blur();
  });
  floorBtns.forEach((b) =>
    b.addEventListener("click", () => {
      const fl = +b.dataset.floor;
      jumpTo(L.zones.find((z) => z.id === (fl ? "master" : "living")));
    })
  );
  hudDetails.addEventListener("click", () => {
    const room = (window.SANDBOX?.rooms || []).find((r) => r.id === hudDetails.dataset.room);
    if (room && window.SANDBOX?.openRoomSheet) window.SANDBOX.openRoomSheet(room);
  });

  function open3D() {
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    if (!started) { init(); started = true; helpCard.hidden = false; }
    running = true;
    resize();
    requestAnimationFrame(tick);
  }
  function close3D() {
    running = false;
    overlay.hidden = true;
    document.body.style.overflow = "";
  }
  function resize() {
    if (!renderer) return;
    const w = overlay.clientWidth, h = overlay.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  document.querySelectorAll("[data-enter3d]").forEach((b) => b.addEventListener("click", open3D));
  exitBtn.addEventListener("click", close3D);
  helpBtn.addEventListener("click", () => (helpCard.hidden = false));
  helpCard.addEventListener("click", () => (helpCard.hidden = true));
})();
