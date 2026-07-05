/* ============================================================
   ALMAZA, SAHEL — 3D walkthrough engine
   Ground floor follows the Kymera technical plan (see
   data/layout3d.js header). First floor is a stated assumption.
   Realism layer: procedural textures, PBR-ish materials, soft
   shadows, plan-accurate furniture, warm coastal lighting.
   Controls: drag look · WASD/arrows walk · click floor to move ·
   U-stair walkable · gold rings open room sheets · Esc exits.
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

  /* ================= procedural textures ================= */
  function makeTex(px, draw, repeat = [1, 1]) {
    const c = document.createElement("canvas");
    c.width = c.height = px;
    draw(c.getContext("2d"), px);
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat[0], repeat[1]);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }
  const noise = (g, px, base, amp, n = 900) => {
    for (let i = 0; i < n; i++) {
      const v = base + (Math.random() - 0.5) * amp;
      g.fillStyle = `rgba(${v},${v - 4},${v - 12},${0.16 + Math.random() * 0.2})`;
      g.fillRect(Math.random() * px, Math.random() * px, 2 + Math.random() * 5, 2 + Math.random() * 5);
    }
  };
  const TEX = {
    tile: (rep) => makeTex(512, (g, px) => {           /* 1.2m greige porcelain grid */
      g.fillStyle = "#d7cfc0"; g.fillRect(0, 0, px, px);
      noise(g, px, 208, 26, 1400);
      g.strokeStyle = "rgba(120,110,95,.55)"; g.lineWidth = 2;
      g.strokeRect(0, 0, px, px);
    }, rep),
    plaster: makeTex(256, (g, px) => {
      g.fillStyle = "#f1ece1"; g.fillRect(0, 0, px, px);
      noise(g, px, 236, 14, 500);
    }, [2, 1]),
    wood: makeTex(256, (g, px) => {                    /* light oak veneer */
      g.fillStyle = "#c9a878"; g.fillRect(0, 0, px, px);
      for (let i = 0; i < 42; i++) {
        g.fillStyle = `rgba(${150 + Math.random() * 40},${110 + Math.random() * 30},${70},${0.25})`;
        g.fillRect(0, Math.random() * px, px, 1 + Math.random() * 3);
      }
    }, [1, 1]),
    cane: makeTex(256, (g, px) => {                    /* rattan weave */
      g.fillStyle = "#d9b985"; g.fillRect(0, 0, px, px);
      g.fillStyle = "rgba(90,65,35,.5)";
      for (let y = 6; y < px; y += 18) for (let x = 6; x < px; x += 18) {
        g.beginPath(); g.arc(x, y, 4, 0, 7); g.fill();
      }
    }, [3, 3]),
    jute: makeTex(256, (g, px) => {
      g.fillStyle = "#d3c3a3"; g.fillRect(0, 0, px, px);
      g.strokeStyle = "rgba(150,128,92,.6)"; g.lineWidth = 2;
      for (let i = 0; i < px; i += 6) { g.beginPath(); g.moveTo(0, i); g.lineTo(px, i); g.stroke(); }
      for (let i = 0; i < px; i += 6) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, px); g.stroke(); }
    }, [3, 2]),
    flag: makeTex(512, (g, px) => {                    /* flagstone */
      g.fillStyle = "#c4bfb1"; g.fillRect(0, 0, px, px);
      noise(g, px, 190, 28, 1200);
      g.strokeStyle = "rgba(255,253,246,.85)"; g.lineWidth = 5;
      for (let i = 0; i < 9; i++) {
        g.beginPath();
        let x = Math.random() * px, y = 0;
        g.moveTo(x, y);
        while (y < px) { y += 40 + Math.random() * 60; x += (Math.random() - 0.5) * 90; g.lineTo(x, y); }
        g.stroke();
      }
    }, [3, 2]),
    grass: makeTex(256, (g, px) => {
      g.fillStyle = "#8aa46e"; g.fillRect(0, 0, px, px);
      for (let i = 0; i < 1800; i++) {
        g.fillStyle = `rgba(${90 + Math.random() * 60},${140 + Math.random() * 50},${80},.4)`;
        g.fillRect(Math.random() * px, Math.random() * px, 2, 4);
      }
    }, [8, 4]),
    boucle: makeTex(128, (g, px) => {
      g.fillStyle = "#efe9dc"; g.fillRect(0, 0, px, px);
      for (let i = 0; i < 700; i++) {
        g.fillStyle = `rgba(210,200,180,.5)`;
        g.beginPath(); g.arc(Math.random() * px, Math.random() * px, 1.6, 0, 7); g.fill();
      }
    }, [4, 4]),
    terrazzo: makeTex(256, (g, px) => {
      g.fillStyle = "#e4ded2"; g.fillRect(0, 0, px, px);
      for (let i = 0; i < 240; i++) {
        const v = 140 + Math.random() * 90;
        g.fillStyle = `rgba(${v},${v - 6},${v - 14},.8)`;
        g.beginPath(); g.arc(Math.random() * px, Math.random() * px, 1 + Math.random() * 4, 0, 7); g.fill();
      }
    }, [2, 2])
  };

  const std = (o) => new THREE.MeshStandardMaterial(o);
  const MAT = {
    wall:    std({ map: TEX.plaster, roughness: 0.95 }),
    floor0:  std({ map: TEX.tile([12, 10]), roughness: 0.55, metalness: 0.05 }),
    floor1:  std({ map: TEX.tile([12, 10]), roughness: 0.6 }),
    slabEdge:std({ color: 0xe9e3d5, roughness: 0.9 }),
    flag:    std({ map: TEX.flag, roughness: 0.9 }),
    grass:   std({ map: TEX.grass, roughness: 1 }),
    sand:    std({ color: 0xd3c7ad, roughness: 1 }),
    pave:    std({ map: TEX.tile([6, 8]), roughness: 0.85 }),
    wood:    std({ map: TEX.wood, roughness: 0.6 }),
    woodDark:std({ color: 0x6d5236, roughness: 0.65 }),
    cane:    std({ map: TEX.cane, roughness: 0.85 }),
    caneDark:std({ map: TEX.cane, color: 0x6b5638, roughness: 0.85 }),
    jute:    std({ map: TEX.jute, roughness: 1 }),
    boucle:  std({ map: TEX.boucle, roughness: 0.95 }),
    linen:   std({ color: 0xf3efe6, roughness: 0.95 }),
    duvet:   std({ color: 0xf7f4ec, roughness: 0.9 }),
    stoneTop:std({ map: TEX.terrazzo, roughness: 0.35, metalness: 0.05 }),
    dark:    std({ color: 0x453d33, roughness: 0.7 }),
    black:   std({ color: 0x2a2723, roughness: 0.5 }),
    glass:   std({ color: 0xc8dde0, transparent: true, opacity: 0.18, roughness: 0.1, metalness: 0.2, side: THREE.DoubleSide }),
    frame:   std({ color: 0x39342e, roughness: 0.5, metalness: 0.4 }),
    white:   std({ color: 0xfaf7ef, roughness: 0.4 }),
    ceramic: std({ color: 0xf4f1ea, roughness: 0.25 }),
    plant:   std({ color: 0x5e7a4c, roughness: 1 }),
    trunk:   std({ color: 0x7a6448, roughness: 1 }),
    shade:   std({ color: 0xdec89a, roughness: 0.9, emissive: 0x8a6f3c, emissiveIntensity: 0.25 }),
    tv:      std({ color: 0x11100e, roughness: 0.2, metalness: 0.5 }),
    art1:    std({ color: 0xc96f4a, roughness: 0.9 }),
    art2:    std({ color: 0x7d8f6a, roughness: 0.9 }),
    ring:    new THREE.MeshBasicMaterial({ color: 0xb08a4f })
  };

  /* ================= primitives ================= */
  function box(w, h, d, mat, x, y, z, ry = 0, shadow = true) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    if (ry) m.rotation.y = ry;
    if (shadow) { m.castShadow = true; m.receiveShadow = true; } else m.receiveShadow = true;
    scene.add(m);
    return m;
  }
  function cyl(r1, r2, h, mat, x, y, z, seg = 22) {
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
    const horizontal = Math.abs(x2 - x1) > Math.abs(z2 - z1);
    const w = horizontal ? len : WALL_T, d = horizontal ? WALL_T : len;
    const cx = (x1 + x2) / 2, cz = (z1 + z2) / 2;
    box(w, WALL_H, d, MAT.wall, cx, y0 + WALL_H / 2, cz);
    addCollider(fl, cx - w / 2, cz - d / 2, cx + w / 2, cz + d / 2);
  }
  function makeLabel(text, x, y, z, scale = 1) {
    const c = document.createElement("canvas");
    c.width = 512; c.height = 128;
    const g = c.getContext("2d");
    const w = Math.min(490, 80 + text.length * 19);
    g.fillStyle = "rgba(36,31,24,.72)";
    g.beginPath(); g.roundRect((512 - w) / 2, 34, w, 62, 31); g.fill();
    g.fillStyle = "#f6f0e2"; g.font = "500 32px Georgia, serif";
    g.textAlign = "center"; g.textBaseline = "middle";
    g.fillText(text, 256, 66);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
    sp.scale.set(2.6 * scale, 0.65 * scale, 1);
    sp.position.set(x, y, z);
    scene.add(sp);
  }

  /* ================= furniture kit ================= */
  function sofa(x, z, len, ry, mat = MAT.boucle) {
    const g = new THREE.Group();
    const seatD = 1.0;
    const mk = (w, h, d, px, py, pz) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.position.set(px, py, pz); m.castShadow = m.receiveShadow = true; g.add(m);
    };
    mk(len, 0.34, seatD, 0, 0.17, 0);                       /* base */
    const n = Math.max(2, Math.round(len / 0.95));
    for (let i = 0; i < n; i++) mk(len / n - 0.06, 0.16, seatD - 0.12, -len / 2 + (i + 0.5) * (len / n), 0.42, 0.02);
    mk(len, 0.42, 0.22, 0, 0.6, -seatD / 2 + 0.09);         /* back */
    mk(0.22, 0.3, seatD, -len / 2 + 0.11, 0.48, 0);         /* arms */
    mk(0.22, 0.3, seatD, len / 2 - 0.11, 0.48, 0);
    g.position.set(x, 0, z); g.rotation.y = ry;
    scene.add(g);
    return g;
  }
  function armchairCane(x, z, ry) {
    const g = new THREE.Group();
    const mk = (geo, mat, px, py, pz, rx = 0) => { const m = new THREE.Mesh(geo, mat); m.position.set(px, py, pz); m.rotation.x = rx; m.castShadow = true; g.add(m); };
    mk(new THREE.BoxGeometry(0.62, 0.1, 0.58), MAT.linen, 0, 0.4, 0);
    mk(new THREE.BoxGeometry(0.62, 0.5, 0.08), MAT.cane, 0, 0.68, -0.28, -0.15);
    [[-0.27, -0.24], [0.27, -0.24], [-0.27, 0.24], [0.27, 0.24]].forEach(([lx, lz]) =>
      mk(new THREE.CylinderGeometry(0.025, 0.02, 0.4), MAT.woodDark, lx, 0.2, lz));
    g.position.set(x, 0, z); g.rotation.y = ry; scene.add(g);
  }
  function coffeeTable(x, z, r = 0.42) {
    cyl(r, r, 0.09, MAT.wood, x, 0.33, z, 26);
    cyl(0.09, 0.13, 0.3, MAT.wood, x, 0.15, z, 14);
  }
  function diningSet(x, z, w = 1.85, d = 1.0, chairs = 8) {
    const top = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.07, 30), MAT.white);
    top.scale.set(w, 1, d); top.position.set(x, 0.74, z); top.castShadow = true; scene.add(top);
    cyl(0.16, 0.22, 0.72, MAT.white, x - w * 0.22, 0.36, z, 18);
    cyl(0.16, 0.22, 0.72, MAT.white, x + w * 0.22, 0.36, z, 18);
    const perSide = chairs / 2;
    for (let i = 0; i < perSide; i++) {
      const cx = x - w / 2 + (i + 0.5) * (w / perSide);
      chair(cx, z - d / 2 - 0.32, 0);
      chair(cx, z + d / 2 + 0.32, Math.PI);
    }
  }
  function chair(x, z, ry) {
    const g = new THREE.Group();
    const mk = (w, h, d, px, py, pz, mat) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(px, py, pz); m.castShadow = true; g.add(m); };
    mk(0.42, 0.06, 0.42, 0, 0.45, 0, MAT.cane);
    mk(0.42, 0.46, 0.05, 0, 0.72, -0.19, MAT.cane);
    [[-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18]].forEach(([lx, lz]) => mk(0.04, 0.45, 0.04, lx, 0.22, lz, MAT.woodDark));
    g.position.set(x, 0, z); g.rotation.y = ry; scene.add(g);
  }
  function bed(x, z, w, ry, y0 = 0, dark = false) {
    const g = new THREE.Group();
    const mk = (w2, h, d, px, py, pz, mat) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w2, h, d), mat); m.position.set(px, py, pz); m.castShadow = m.receiveShadow = true; g.add(m); };
    mk(w + 0.2, 0.22, 2.2, 0, 0.11, 0, MAT.wood);                    /* platform */
    mk(w, 0.24, 2.0, 0, 0.34, 0, MAT.duvet);                          /* mattress+duvet */
    mk(w - 0.2, 0.12, 0.5, 0, 0.5, -0.68, MAT.linen);                 /* pillows */
    mk(w + 0.7, 1.15, 0.09, 0, 0.62, -1.12, dark ? MAT.caneDark : MAT.cane); /* headboard */
    mk(0.45, 0.4, 0.45, -w / 2 - 0.45, 0.2, -0.8, MAT.wood);          /* side tables */
    mk(0.45, 0.4, 0.45, w / 2 + 0.45, 0.2, -0.8, MAT.wood);
    const lamp = (lx) => {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 10), MAT.shade);
      s.position.set(lx, 0.56, -0.8); g.add(s);
    };
    lamp(-w / 2 - 0.45); lamp(w / 2 + 0.45);
    g.position.set(x, y0, z); g.rotation.y = ry; scene.add(g);
  }
  function wardrobe(x, z, len, ry, y0 = 0, dark = false) {
    box(len, 2.5, 0.62, dark ? MAT.caneDark : MAT.cane, x, y0 + 1.25, z, ry);
  }
  function rug(x, z, w, d, y0 = 0) {
    plane(w, d, MAT.jute, x, y0 + 0.012, z);
  }
  function plantPot(x, z, y0 = 0, s = 1) {
    cyl(0.16 * s, 0.2 * s, 0.34 * s, MAT.ceramic, x, y0 + 0.17 * s, z, 16);
    cyl(0.02 * s, 0.03 * s, 0.5 * s, MAT.trunk, x, y0 + 0.55 * s, z, 8);
    const f = new THREE.Mesh(new THREE.SphereGeometry(0.3 * s, 10, 8), MAT.plant);
    f.position.set(x, y0 + 0.95 * s, z); f.scale.y = 1.2; f.castShadow = true; scene.add(f);
  }
  function pendant(x, y, z, r = 0.32, light = false) {
    const dome = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2), MAT.shade);
    dome.rotation.x = Math.PI; dome.position.set(x, y, z); scene.add(dome);
    cyl(0.008, 0.008, 0.7, MAT.black, x, y + 0.35, z, 6);
    if (light) {
      const p = new THREE.PointLight(0xffe3b3, 14, 7, 2);
      p.position.set(x, y - 0.15, z); scene.add(p);
    }
  }
  function art(x, y, z, w, h, ry, mat) {
    box(w + 0.08, h + 0.08, 0.04, MAT.wood, x, y, z, ry);
    const m = box(w, h, 0.05, mat, x, y, z, ry);
    return m;
  }
  function tv(x, y, z, ry, w = 1.5) {
    box(w, w * 0.56, 0.06, MAT.tv, x, y, z, ry, false);
  }
  function bathSet(zone, y0, fl) {
    const [x1, z1, x2, z2] = zone.rect;
    const cx = (x1 + x2) / 2;
    /* vanity + basin + mirror on the north wall of the room */
    box(1.1, 0.5, 0.5, MAT.wood, cx, y0 + 0.62, z1 + 0.33);
    cyl(0.16, 0.14, 0.14, MAT.ceramic, cx, y0 + 0.95, z1 + 0.33, 18);
    const mir = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.02, 24), std({ color: 0xbfd2d4, roughness: 0.05, metalness: 0.8 }));
    mir.rotation.x = Math.PI / 2; mir.position.set(cx, y0 + 1.65, z1 + 0.06); scene.add(mir);
    /* WC */
    box(0.4, 0.42, 0.6, MAT.ceramic, x2 - 0.45, y0 + 0.21, z1 + 0.5);
    /* shower corner: glass + tray + head */
    box(0.02, 2.0, (z2 - z1) * 0.45, MAT.glass, x1 + 0.9, y0 + 1.0, z2 - (z2 - z1) * 0.25, 0, false);
    plane(0.85, (z2 - z1) * 0.45, MAT.stoneTop, x1 + 0.46, y0 + 0.02, z2 - (z2 - z1) * 0.25);
    cyl(0.01, 0.01, 1.1, MAT.frame, x1 + 0.2, y0 + 1.9, z2 - 0.4, 6);
  }
  function deckChair(x, z, ry, y0 = 0) {
    const g = new THREE.Group();
    const mk = (w, h, d, px, py, pz, rx, mat) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(px, py, pz); m.rotation.x = rx || 0; m.castShadow = true; g.add(m); };
    mk(0.6, 0.05, 1.0, 0, 0.32, 0.1, 0.18, MAT.woodDark);
    mk(0.6, 0.05, 0.7, 0, 0.62, -0.5, -0.9, MAT.woodDark);
    mk(0.55, 0.08, 0.9, 0, 0.38, 0.08, 0.18, MAT.linen);
    g.position.set(x, y0, z); g.rotation.y = ry; scene.add(g);
  }

  /* ================= world build ================= */
  function init() {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.93;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd7e2e8);
    scene.fog = new THREE.Fog(0xd7e2e8, 40, 110);
    camera = new THREE.PerspectiveCamera(66, 1, 0.05, 220);

    scene.add(new THREE.HemisphereLight(0xfdf7ea, 0xb1a58c, 0.68));
    const sun = new THREE.DirectionalLight(0xfff0d6, 1.25);
    sun.position.set(20, 30, 18);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -26; sun.shadow.camera.right = 26;
    sun.shadow.camera.top = 26; sun.shadow.camera.bottom = -26;
    sun.shadow.camera.far = 90;
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
    s.moveTo(0, 0); s.lineTo(15.2, 0); s.lineTo(15.2, 12); s.lineTo(0, 12); s.closePath();
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
    const VOID = { x1: 3.3, x2: 6.1, z1: 7.7, z2: 12 };  /* stairwell */

    /* --- site --- */
    plane(80, 80, MAT.sand, 7, -0.02, 3);
    plane(15.2, 3.9, MAT.grass, 7.6, 0.005, -4.55);                 /* lawn */
    plane(7.2, 2.6, MAT.flag, 6.8, 0.01, -1.3);                     /* colonnade paving */
    plane(3.2, 2.6, MAT.flag, 1.6, 0.01, -1.3);                     /* outdoor dining paving */
    plane(4.2, 3.8, MAT.flag, 12.7, 0.012, -2.9);                   /* garden lounge pad */
    plane(3.8, 7.0, MAT.pave, 17.1, 0.01, 8.5);                     /* entrance court */
    plane(4.0, 12, MAT.pave, -2.1, 0.005, 6);                       /* driveway */
    for (let i = 0; i < 4; i++) plane(0.9, 0.5, MAT.flag, 16.4 - 0, 0.02, 7.0 + 0 + i * 0.75); /* path pads */

    /* boundary: low wall + dark slat fence (per renders) */
    const fence = (x, z, len, ry) => {
      box(len, 0.5, 0.15, MAT.wall, x, 0.25, z, ry);
      for (let i = 0; i < 4; i++) box(len, 0.07, 0.03, MAT.dark, x, 0.68 + i * 0.28, z, ry);
    };
    fence(7.6, -6.6, 15.6, 0);
    fence(-0.2, -3.2, 6.8, Math.PI / 2);
    fence(15.4, -3.2, 6.8, Math.PI / 2);
    addCollider(0, -0.4, -6.8, 15.6, -6.4);
    addCollider(0, -0.5, -6.8, -0.1, 0); addCollider(0, 15.1, -6.8, 15.7, 0);

    /* --- interior floors --- */
    plane(15.2, 12, MAT.floor0, 7.6, 0.02, 6);
    slabWithHole(FH - 0.26, VOID, MAT.slabEdge);                    /* first floor slab */
    const f1 = plane(15.2, 12, MAT.floor1, 7.6, FH + 0.015, 6);     /* first floor finish */
    f1.material = MAT.floor1;
    /* punch visual hole in floor1 finish: cover void with dark shaft look instead */
    const voidMask = new THREE.Mesh(new THREE.PlaneGeometry(VOID.x2 - VOID.x1, VOID.z2 - VOID.z1), std({ color: 0x24201a, roughness: 1 }));
    voidMask.rotation.x = -Math.PI / 2;
    voidMask.position.set((VOID.x1 + VOID.x2) / 2, FH + 0.02, (VOID.z1 + VOID.z2) / 2);
    scene.add(voidMask);
    /* roof + skylight over stairwell */
    slabWithHole(FH + WALL_H + 0.04, { x1: 4.0, x2: 5.8, z1: 8.2, z2: 10.4 }, MAT.wall);
    box(1.8, 0.05, 2.2, MAT.glass, 4.9, FH + WALL_H + 0.2, 9.3, 0, false);
    /* first-floor north terrace slab over colonnade */
    box(7.8, 0.28, 2.6, MAT.slabEdge, 7.1, FH - 0.14, -1.3);
    plane(7.8, 2.6, MAT.flag, 7.1, FH + 0.01, -1.3);
    /* roof overhang over terrace */
    box(8.6, 0.22, 3.0, MAT.wall, 7.1, FH + WALL_H + 0.02, -1.4);

    /* --- walls --- */
    L.walls.ground.forEach((s) => wallSeg(s, 0, 0));
    L.walls.first.forEach((s) => wallSeg(s, FH, 1));

    /* --- glazing --- */
    L.glass.forEach(([x1, z1, x2, z2, fl]) => {
      const y0 = fl * FH;
      const horizontal = Math.abs(x2 - x1) > Math.abs(z2 - z1);
      const len = Math.hypot(x2 - x1, z2 - z1);
      const cx = (x1 + x2) / 2, cz = (z1 + z2) / 2;
      const open = (L.openGlass || []).find((o) => o.floor === fl && Math.abs(cz - o.z) < 0.3 && o.x1 >= x1 && o.x2 <= x2);
      box(horizontal ? len : 0.1, 0.14, horizontal ? 0.1 : len, MAT.frame, cx, y0 + WALL_H - 0.13, cz, 0, false);
      box(horizontal ? len : 0.1, 0.08, horizontal ? 0.1 : len, MAT.frame, cx, y0 + 0.04, cz, 0, false);
      if (open) {
        /* two panes with a walkable gap; slid-open panel doubled at one side */
        const segs = [[x1, open.x1], [open.x2, x2]];
        segs.forEach(([a, b]) => {
          if (b - a < 0.05) return;
          box(b - a, WALL_H - 0.3, 0.05, MAT.glass, (a + b) / 2, y0 + WALL_H / 2 - 0.08, cz, 0, false);
          addCollider(fl, a, cz - 0.15, b, cz + 0.15);
        });
        box(open.x2 - open.x1, WALL_H - 0.3, 0.05, MAT.glass, open.x1 - (open.x2 - open.x1) / 2, y0 + WALL_H / 2 - 0.08, cz + 0.09, 0, false);
        for (const [a, b] of [[x1, open.x1], [open.x2, x2]]) if (b - a > 0.05)
          cyl(0.02, 0.02, WALL_H - 0.2, MAT.frame, b === open.x1 ? b : a, y0 + WALL_H / 2, cz, 8);
      } else {
        box(horizontal ? len : 0.05, WALL_H - 0.3, horizontal ? 0.05 : len, MAT.glass, cx, y0 + WALL_H / 2 - 0.08, cz, 0, false);
        addCollider(fl, Math.min(x1, x2), cz - 0.15, Math.max(x1, x2), cz + 0.15);
        const n = Math.max(1, Math.round(len / 1.6));
        for (let i = 1; i < n; i++) cyl(0.02, 0.02, WALL_H - 0.2, MAT.frame, horizontal ? x1 + (len * i) / n : cx, y0 + WALL_H / 2, horizontal ? cz : z1 + (len * i) / n, 8);
      }
    });

    /* main entry door (east wall gap z 6.3–7.5): pivot door + canopy + slat band */
    box(0.09, WALL_H, 1.06, MAT.woodDark, 15.24, WALL_H / 2, 6.9, 0);
    box(0.4, 0.5, 2.2, MAT.wood, 15.25, WALL_H - 0.28, 6.9, 0);      /* wood-slat band over door (video) */
    for (let i = 0; i < 4; i++) box(0.5, 0.06, 2.0, MAT.woodDark, 15.28, 2.35 + i * 0.14, 6.9, 0, false);
    /* keep door leaf open: no collider in the gap */

    /* --- U-stair (plan: 11 + 9 risers, dark stone, glass rail) --- */
    const A = L.stair.flightA, B = L.stair.flightB, Ld = L.stair.landing;
    const stoneDark = std({ color: 0x54514b, roughness: 0.6 });
    const stepsA = 11, runA = (A.z2 - A.z1) / stepsA;
    for (let i = 0; i < stepsA; i++) {
      const h = A.y1 + ((i + 1) / stepsA) * (A.y2 - A.y1);
      box(A.w, h, runA + 0.02, stoneDark, A.x, h / 2, A.z1 + (i + 0.5) * runA);
    }
    box(Ld.x2 - Ld.x1, Ld.y, Ld.z2 - Ld.z1, stoneDark, (Ld.x1 + Ld.x2) / 2, Ld.y / 2, (Ld.z1 + Ld.z2) / 2);
    const stepsB = 9, runB = (B.z1 - B.z2) / stepsB;
    for (let i = 0; i < stepsB; i++) {
      const h = B.y1 + ((i + 1) / stepsB) * (B.y2 - B.y1);
      box(B.w, h - 0.0, runB + 0.02, stoneDark, B.x, h / 2 + 0, B.z1 - (i + 0.5) * runB);
    }
    /* glass rails: center divider + floor-1 void guard */
    box(0.05, 2.6, 3.4, MAT.glass, (A.x + B.x) / 2, 1.9, 9.6, 0, false);
    addCollider(0, (A.x + B.x) / 2 - 0.15, 7.8, (A.x + B.x) / 2 + 0.15, 11.2);
    box(0.05, 1.05, VOID.z2 - VOID.z1, MAT.glass, 4.62, FH + 0.55, (VOID.z1 + VOID.z2) / 2, 0, false);
    addCollider(1, 4.5, VOID.z1, 6.2, VOID.z2);              /* block east half of stairwell on floor 1 */
    addCollider(1, VOID.x1 - 0.1, 8.2, 4.5, VOID.z2);        /* block rest except arrival strip z 7.7–8.2 */

    /* --- colonnade columns --- */
    L.columns.forEach(([x, z]) => {
      cyl(0.17, 0.17, FH + 0.4, MAT.dark, x, (FH + 0.4) / 2, z, 24);
      addCollider(0, x - 0.3, z - 0.3, x + 0.3, z + 0.3);
    });

    /* --- context: neighbourhood + palms --- */
    for (let i = 0; i < 6; i++) box(6, 2.8 + (i % 3) * 0.8, 4, MAT.wall, -16 + i * 8, 1.5, -20 - (i % 2) * 5);
    const palm = (x, z, s = 1) => {
      cyl(0.09 * s, 0.14 * s, 3.4 * s, MAT.trunk, x, 1.7 * s, z, 8);
      for (let i = 0; i < 6; i++) {
        const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.14 * s, 1.9 * s, 5), MAT.plant);
        leaf.position.set(x + Math.cos(i) * 0.7 * s, 3.5 * s, z + Math.sin(i) * 0.7 * s);
        leaf.rotation.z = Math.cos(i) * 1.25; leaf.rotation.x = Math.sin(i) * 1.25;
        leaf.castShadow = true; scene.add(leaf);
      }
    };
    palm(1.2, -5.6); palm(9.8, -5.9, 1.15); palm(14.4, -5.2, 0.9); palm(17.8, 4.4, 1.1);

    /* ================= furniture per plan ================= */
    /* Reception & Dining (G05) */
    rug(6.6, 1.9, 3.6, 2.7);
    sofa(6.5, 2.8, 3.39, Math.PI);                                  /* 3.39m sofa facing garden */
    armchairCane(5.3, 1.15, 0.5); armchairCane(7.7, 1.15, -0.5);
    coffeeTable(6.5, 1.85, 0.4);
    diningSet(6.8, 4.85, 1.85, 1.0, 8);                             /* oval 1.85×1.0, 8 chairs */
    pendant(6.8, 2.52, 4.85, 0.42, true);
    plantPot(3.7, 0.5, 0, 1.2);
    art(10.32, 1.6, 2.4, 1.3, 1.0, -Math.PI / 2, MAT.art1);         /* art on reception E wall */

    /* Kitchen (west): 3.67m run + island 2.0×0.61 */
    box(0.62, 0.92, 3.67, MAT.wood, 0.32, 0.46, 2.14);
    plane(0.62, 3.67, MAT.stoneTop, 0.32, 0.945, 2.14);
    box(0.62, 1.0, 3.67, MAT.wood, 0.32, 2.35, 2.14);               /* uppers */
    box(0.61, 0.95, 2.0, MAT.stoneTop, 1.8, 0.475, 2.45);           /* island */
    addCollider(0, 1.45, 1.45, 2.15, 3.45);
    addCollider(0, 0, 0.3, 0.68, 4.0);
    chair(2.45, 2.0, -Math.PI / 2); chair(2.45, 2.9, -Math.PI / 2); /* stools */
    box(0.7, 2.0, 0.75, MAT.wood, 0.4, 1.0, 4.6);                   /* fridge unit */
    pendant(1.8, 2.2, 2.45, 0.24, true);

    /* Living Room (east) */
    rug(12.8, 2.9, 3.2, 2.4);
    sofa(12.6, 4.25, 3.2, Math.PI);                                 /* along S wall */
    sofa(14.6, 2.6, 2.0, -Math.PI / 2, MAT.linen);                  /* return */
    coffeeTable(12.7, 2.9, 0.45);
    tv(12.8, 1.35, 0.95, 0, 1.6);
    box(2.6, 0.35, 0.4, MAT.stoneTop, 12.8, 0.18, 0.98);            /* tv plinth */
    plantPot(10.9, 4.4, 0, 1.1);
    art(14.4, 1.7, 4.83, 1.6, 1.1, Math.PI, MAT.art2);

    /* Corridor planters (plan shows plant row) */
    plantPot(5.0, 6.5, 0, 0.9); plantPot(8.8, 6.5, 0, 0.9); plantPot(12.6, 6.7, 0, 0.8);

    /* Guest bedroom (bed 1.6, plan G01) + wardrobe */
    rug(7.9, 9.9, 2.6, 2.2);
    bed(7.8, 10.0, 1.6, -Math.PI / 2, 0, true);                     /* headboard on W wall */
    wardrobe(7.7, 11.66, 3.0, 0, 0, true);
    addCollider(0, 6.2, 11.3, 9.3, 12);
    tv(9.5, 1.4, 9.9, -Math.PI / 2, 1.2);

    /* Bathrooms ground */
    bathSet(L.zones.find((z) => z.id === "guest-bath"), 0, 0);
    /* powder + guest WC minimal */
    box(0.9, 0.5, 0.45, MAT.wood, 11.5, 0.62, 5.2); cyl(0.14, 0.12, 0.12, MAT.ceramic, 11.5, 0.93, 5.2, 16);
    box(0.4, 0.42, 0.6, MAT.ceramic, 13.3, 0.21, 5.35);

    /* Driver's room (plan: round table Ø1.0) */
    cyl(0.5, 0.5, 0.06, MAT.wood, 14.0, 0.73, 9.8, 26);
    cyl(0.07, 0.1, 0.7, MAT.woodDark, 14.0, 0.36, 9.8, 12);
    [[13.4, 9.2], [14.6, 9.2], [13.4, 10.4], [14.6, 10.4]].forEach(([cx, cz], i) => chair(cx, cz, [0.7, -0.7, 2.4, -2.4][i]));
    box(0.9, 0.5, 2.0, MAT.linen, 14.7, 0.25, 11.0);                /* daybed */

    /* Outdoor dining (NW pergola, 8 chairs per plan) */
    box(2.0, 0.08, 0.95, MAT.wood, 1.6, 0.72, -1.3);
    box(0.5, 0.68, 0.7, MAT.white, 1.6, 0.34, -1.3);
    [[-0.7, -0.85], [0, -0.85], [0.7, -0.85], [-0.7, 0.85], [0, 0.85], [0.7, 0.85]].forEach(([ox, oz]) =>
      cyl(0.26, 0.3, 0.62, MAT.cane, 1.6 + ox, 0.31, -1.3 + oz, 14));
    /* pergola slats above outdoor dining */
    for (let i = 0; i < 7; i++) box(3.0, 0.05, 0.12, MAT.woodDark, 1.6, 2.75, -2.35 + i * 0.34, 0, false);
    cyl(0.09, 0.09, 2.8, MAT.dark, 0.25, 1.4, -2.45, 12); cyl(0.09, 0.09, 2.8, MAT.dark, 2.95, 1.4, -2.45, 12);

    /* Garden lounge NE (circled zone on the plan) */
    sofa(12.7, -1.6, 2.8, Math.PI, MAT.linen);
    deckChair(11.6, -3.9, 2.6); deckChair(13.2, -4.1, 3.4);
    coffeeTable(12.6, -2.9, 0.45); coffeeTable(13.3, -2.6, 0.28);
    /* BBQ counter on west garden edge (plan) */
    box(0.7, 0.9, 1.9, MAT.stoneTop, 0.6, 0.45, -3.6);
    addCollider(0, 0.2, -4.6, 1.0, -2.6);

    /* Colonnade pots + facade sconces */
    plantPot(3.6, -0.45, 0, 1.3); plantPot(9.9, -0.5, 0, 1.3);
    for (let i = 0; i < 3; i++) box(0.12, 0.3, 0.12, MAT.woodDark, 11.4 + i * 1.2, 2.2, -0.06, 0, false);

    /* ---------- first floor (assumed) ---------- */
    /* Master */
    rug(8.5, 3.4, 3.0, 2.4, FH);
    bed(8.5, 3.9, 1.9, Math.PI, FH);                                /* headboard on S wall, faces terrace */
    box(1.7, 0.42, 0.5, MAT.caneDark, 8.5, FH + 0.21, 2.45);        /* bench */
    pendant(7.5, FH + 2.0, 4.9, 0.2, false); pendant(9.5, FH + 2.0, 4.9, 0.2, true);
    art(8.5, FH + 2.1, 5.3, 2.2, 1.0, Math.PI, MAT.art1);
    tv(8.5, FH + 1.5, 0.55, 0, 1.5);
    /* Bedroom 2 */
    rug(3.0, 2.6, 2.6, 2.1, FH);
    bed(2.6, 2.6, 1.6, Math.PI / 2, FH);
    wardrobe(0.35, 2.6, 3.4, Math.PI / 2, FH);
    /* Bedroom 3 */
    rug(13.1, 2.4, 2.4, 2.0, FH);
    bed(13.4, 2.3, 1.6, -Math.PI / 2, FH);
    wardrobe(14.85, 2.3, 3.0, Math.PI / 2, FH);
    /* Baths */
    bathSet(L.zones.find((z) => z.id === "master-bath"), FH, 1);
    bathSet(L.zones.find((z) => z.id === "bath-2"), FH, 1);
    /* Dressing */
    wardrobe(12.4, 11.66, 4.6, 0, FH);
    wardrobe(9.95, 9.8, 3.6, Math.PI / 2, FH);
    /* North terrace loungers + glass rail */
    deckChair(5.4, -1.3, Math.PI, FH); deckChair(6.6, -1.5, Math.PI, FH);
    box(7.8, 1.05, 0.05, MAT.glass, 7.1, FH + 0.55, -2.58, 0, false);
    box(0.05, 1.05, 2.6, MAT.glass, 3.25, FH + 0.55, -1.3, 0, false);
    box(0.05, 1.05, 2.6, MAT.glass, 10.95, FH + 0.55, -1.3, 0, false);
    addCollider(1, 3.1, -2.75, 11.1, -2.45);
    addCollider(1, 3.05, -2.7, 3.4, 0.1); addCollider(1, 10.8, -2.7, 11.15, 0.1);

    /* interior warm fills (few, cheap) */
    const warm = (x, y, z, i = 8, d = 8) => { const p = new THREE.PointLight(0xffe8c2, i, d, 2); p.position.set(x, y, z); scene.add(p); };
    warm(12.8, 2.4, 2.8, 7, 7);          /* east lounge */
    warm(7.8, 2.3, 9.9, 6, 6);           /* guest bed */
    warm(8.5, FH + 2.3, 3.2, 8, 8);      /* master */
    warm(4.7, 2.6, 9.6, 5, 7);           /* stairwell */

    /* ---------- zone labels + markers ---------- */
    const roomsById = {};
    (window.SANDBOX?.rooms || []).forEach((r) => (roomsById[r.id] = r));
    L.zones.forEach((zn) => {
      const y0 = zn.floor * FH;
      makeLabel(zn.name, zn.at[0], y0 + 2.3, zn.at[1], 0.92);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.03, 10, 30), MAT.ring);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(zn.at[0], y0 + 0.05, zn.at[1]);
      scene.add(ring);
      markers.push({ mesh: ring, zone: zn, room: zn.roomId ? roomsById[zn.roomId] : null });
    });

    /* click-to-move planes */
    [0, 1].forEach((fl) => {
      const g = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), new THREE.MeshBasicMaterial({ visible: false }));
      g.rotation.x = -Math.PI / 2;
      g.position.set(7.6, fl * FH + 0.01, 5);
      g.userData.floor = fl;
      scene.add(g);
      floorMeshes.push(g);
    });
  }

  /* ================= movement / U-stair ================= */
  function stairY(x, z) {
    const A = L.stair.flightA, B = L.stair.flightB, Ld = L.stair.landing;
    if (x > A.x - A.w / 2 - 0.2 && x < A.x + A.w / 2 + 0.2 && z >= A.z1 - 0.25 && z <= A.z2 + 0.1) {
      const t = Math.max(0, Math.min(1, (z - A.z1) / (A.z2 - A.z1)));
      return A.y1 + t * (A.y2 - A.y1);
    }
    if (x >= Ld.x1 + 0.1 && x <= Ld.x2 - 0.1 && z >= Ld.z1 - 0.05 && z <= Ld.z2 - 0.15) return Ld.y;
    if (x > B.x - B.w / 2 - 0.2 && x < B.x + B.w / 2 + 0.2 && z <= B.z1 + 0.1 && z >= B.z2 - 0.25) {
      const t = Math.max(0, Math.min(1, (B.z1 - z) / (B.z1 - B.z2)));
      return B.y1 + t * (B.y2 - B.y1);
    }
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
      const sp = 3.1 * dt;
      let mx = 0, mz = 0;
      if (state.keys.KeyW || state.keys.ArrowUp) mz -= 1;
      if (state.keys.KeyS || state.keys.ArrowDown) mz += 1;
      if (state.keys.KeyA || state.keys.ArrowLeft) mx -= 1;
      if (state.keys.KeyD || state.keys.ArrowRight) mx += 1;
      if (mx || mz) {
        state.moveTarget = null;
        const len = Math.hypot(mx, mz);
        const s = Math.sin(state.yaw), c = Math.cos(state.yaw);
        tryMove(((mx * c + -mz * s) / len) * sp, ((mx * s + mz * c) / len) * sp);
      }
      if (state.moveTarget) {
        const d = new THREE.Vector2(state.moveTarget.x - state.pos.x, state.moveTarget.z - state.pos.z);
        if (d.length() < 0.15) state.moveTarget = null;
        else {
          d.normalize().multiplyScalar(3.1 * dt);
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

  /* ================= input ================= */
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

  /* ================= zone jump / UI ================= */
  function jumpTo(zone) {
    const [x1, z1, x2, z2] = zone.rect;
    const cx = zone.stand ? zone.stand[0] : (x1 + x2) / 2;
    const cz = zone.stand ? zone.stand[1] : (z1 + z2) / 2;
    let lk = zone.look || zone.at;
    if (Math.abs(lk[0] - cx) < 0.3 && Math.abs(lk[1] - cz) < 0.3) lk = [7.6, 5];
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
      jumpTo(L.zones.find((z) => z.id === (fl ? "master" : "reception")));
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
