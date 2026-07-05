/* ============================================================
   3D indoor walkthrough — first-person exploration of the
   approximate house shell defined in data/layout3d.js.
   Controls: drag to look · WASD / arrows to move · click floor
   to walk there · click a marker for room info · Esc to exit.
   ============================================================ */

(function () {
  const L = window.LAYOUT3D;
  if (!L || !window.THREE) return;

  const overlay = document.getElementById("threeOverlay");
  const canvas = document.getElementById("threeCanvas");
  const enterBtns = document.querySelectorAll("[data-enter3d]");
  const exitBtn = document.getElementById("exit3d");
  const helpBtn = document.getElementById("help3d");
  const helpCard = document.getElementById("threeHelp");
  const zoneSelect = document.getElementById("zoneSelect");
  const floorBtns = document.querySelectorAll("[data-floor]");
  const hudZone = document.getElementById("hudZone");
  const hudDetails = document.getElementById("hudDetails");

  const FH = L.floorHeight, EYE = L.eyeHeight;
  const WALL_H = 3.0, WALL_T = 0.16, RADIUS = 0.32;

  /* ---------- renderer / scene ---------- */
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

  window.SANDBOX3D = state; /* handy for debugging / future scripting */

  const colliders = { 0: [], 1: [] };
  const markers = [];   // { mesh, zone }
  const floorMeshes = [];

  function init() {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.02;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdfe5e8);
    scene.fog = new THREE.Fog(0xdfe5e8, 30, 90);

    camera = new THREE.PerspectiveCamera(68, 1, 0.05, 200);

    /* light: soft coastal daylight */
    scene.add(new THREE.HemisphereLight(0xfdf6e8, 0xb8ac93, 0.85));
    const sun = new THREE.DirectionalLight(0xfff1d8, 0.95);
    sun.position.set(18, 26, -14);
    scene.add(sun);
    scene.add(new THREE.AmbientLight(0xffffff, 0.12));

    buildWorld();
    resize();
    window.addEventListener("resize", resize);
  }

  const MAT = {
    wall:   new THREE.MeshLambertMaterial({ color: 0xf3efe6 }),
    wallIn: new THREE.MeshLambertMaterial({ color: 0xefe9dc }),
    floorIn:new THREE.MeshLambertMaterial({ color: 0xd9d2c2 }),
    slab:   new THREE.MeshLambertMaterial({ color: 0xe8e2d4 }),
    terr:   new THREE.MeshLambertMaterial({ color: 0xc9c4b6 }),
    grass:  new THREE.MeshLambertMaterial({ color: 0x87a06c }),
    sand:   new THREE.MeshLambertMaterial({ color: 0xd6cbb2 }),
    dark:   new THREE.MeshLambertMaterial({ color: 0x4a4238 }),
    stone:  new THREE.MeshLambertMaterial({ color: 0x8e8677 }),
    glass:  new THREE.MeshLambertMaterial({ color: 0xbfd4d8, transparent: true, opacity: 0.22, side: THREE.DoubleSide }),
    frame:  new THREE.MeshLambertMaterial({ color: 0x3c3733 }),
    cue:    (c) => new THREE.MeshLambertMaterial({ color: new THREE.Color(c) }),
    ring:   new THREE.MeshBasicMaterial({ color: 0xa9884f })
  };

  function box(w, h, d, mat, x, y, z, group) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    (group || scene).add(m);
    return m;
  }

  function wallSeg(seg, y0, mat) {
    const [x1, z1, x2, z2] = seg;
    const len = Math.hypot(x2 - x1, z2 - z1);
    const horizontal = Math.abs(x2 - x1) > Math.abs(z2 - z1);
    const w = horizontal ? len : WALL_T;
    const d = horizontal ? WALL_T : len;
    const cx = (x1 + x2) / 2, cz = (z1 + z2) / 2;
    box(w, WALL_H, d, mat, cx, y0 + WALL_H / 2, cz);
    return {
      minX: cx - w / 2 - RADIUS, maxX: cx + w / 2 + RADIUS,
      minZ: cz - d / 2 - RADIUS, maxZ: cz + d / 2 + RADIUS
    };
  }

  function slabWithStairVoid(y) {
    const s = new THREE.Shape();
    s.moveTo(0, 0); s.lineTo(14, 0); s.lineTo(14, 10); s.lineTo(0, 10); s.closePath();
    const hole = new THREE.Path();
    const hb = { x1: L.stair.base[0] - 0.2, x2: L.stair.top[0] + 0.4, z1: L.stair.base[1] - L.stair.width / 2 - 0.1, z2: L.stair.base[1] + L.stair.width / 2 + 0.1 };
    hole.moveTo(hb.x1, hb.z1); hole.lineTo(hb.x2, hb.z1); hole.lineTo(hb.x2, hb.z2); hole.lineTo(hb.x1, hb.z2); hole.closePath();
    s.holes.push(hole);
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.25, bevelEnabled: false });
    const m = new THREE.Mesh(g, MAT.slab);
    m.rotation.x = Math.PI / 2;
    m.position.y = y + 0.25;
    scene.add(m);
    return hb;
  }

  function makeLabel(text, x, y, z, scale = 1) {
    const c = document.createElement("canvas");
    c.width = 512; c.height = 128;
    const g = c.getContext("2d");
    g.fillStyle = "rgba(38,33,25,0.78)";
    const w = Math.min(480, 90 + text.length * 19);
    g.beginPath(); g.roundRect((512 - w) / 2, 30, w, 68, 34); g.fill();
    g.fillStyle = "#f6f0e2";
    g.font = "500 34px Georgia, serif";
    g.textAlign = "center"; g.textBaseline = "middle";
    g.fillText(text, 256, 66);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
    sp.scale.set(3.0 * scale, 0.75 * scale, 1);
    sp.position.set(x, y, z);
    scene.add(sp);
    return sp;
  }

  function buildWorld() {
    /* site ground */
    box(60, 0.2, 60, MAT.sand, 7, -0.11, 3);

    /* interior ground slab */
    box(14, 0.22, 10, MAT.floorIn, 7, -0.1, 5);

    /* outdoor patches from zones */
    L.zones.forEach((zn) => {
      if (zn.id === "terrace" || zn.id === "balcony") {
        const [x1, z1, x2, z2] = zn.rect;
        box(x2 - x1, 0.06, z2 - z1, MAT.terr, (x1 + x2) / 2, (zn.floor ? FH : 0) + 0.02, (z1 + z2) / 2);
      }
      if (zn.id === "garden") {
        const [x1, z1, x2, z2] = zn.rect;
        box(x2 - x1, 0.05, z2 - z1, MAT.grass, (x1 + x2) / 2, 0.01, (z1 + z2) / 2);
      }
    });

    /* entry stepping stones */
    for (let i = 0; i < 5; i++) box(0.9, 0.05, 0.5, MAT.stone, -0.8 - i * 0.62, 0.03, 4.0);

    /* walls */
    L.walls.ground.forEach((s) => colliders[0].push(wallSeg(s, 0, MAT.wall)));
    L.walls.first.forEach((s) => colliders[1].push(wallSeg(s, FH, MAT.wallIn)));

    /* first-floor slab with stair void + roof */
    slabWithStairVoid(FH - 0.25);
    const roofY = FH + WALL_H + 0.05;
    box(15.4, 0.25, 11.4, MAT.wall, 7, roofY, 5);
    box(10, 0.22, 4.6, MAT.wall, 4.5, FH + 0.3, -1.8); /* terrace canopy = balcony slab */

    /* glazing */
    L.glass.forEach(([x1, z1, x2, z2, fl]) => {
      const len = Math.hypot(x2 - x1, z2 - z1);
      const horizontal = Math.abs(x2 - x1) > Math.abs(z2 - z1);
      const y0 = fl * FH;
      const cx = (x1 + x2) / 2, cz = (z1 + z2) / 2;
      box(horizontal ? len : 0.06, WALL_H - 0.25, horizontal ? 0.06 : len, MAT.glass, cx, y0 + (WALL_H - 0.25) / 2 + 0.05, cz);
      box(horizontal ? len : 0.1, 0.12, horizontal ? 0.1 : len, MAT.frame, cx, y0 + WALL_H - 0.12, cz);
      box(horizontal ? len : 0.1, 0.1, horizontal ? 0.1 : len, MAT.frame, cx, y0 + 0.06, cz);
      /* low glass keeps you in, still see through: add collider */
      colliders[fl].push({ minX: Math.min(x1, x2) - 0.2, maxX: Math.max(x1, x2) + 0.2, minZ: Math.min(z1, z2) - 0.2, maxZ: Math.max(z1, z2) + 0.2, glass: true });
    });
    /* leave living glazing walkable: remove its collider (slider open) */
    colliders[0] = colliders[0].filter((c) => !(c.glass && c.minZ < 0.3 && c.maxZ > -0.3 && c.maxX > 8));

    /* balcony + landing guard rails (glass) */
    box(9, 1.05, 0.06, MAT.glass, 4.5, FH + 0.55, -3.55);
    box(0.06, 1.05, 3.6, MAT.glass, -0.03, FH + 0.55, -1.8);
    box(0.06, 1.05, 3.6, MAT.glass, 9.03, FH + 0.55, -1.8);
    colliders[1].push({ minX: -0.4, maxX: 9.4, minZ: -3.9, maxZ: -3.3 });
    colliders[1].push({ minX: -0.4, maxX: 0.2, minZ: -3.8, maxZ: 0.2 });
    colliders[1].push({ minX: 8.8, maxX: 9.4, minZ: -3.8, maxZ: 0.2 });

    /* stair steps */
    const st = L.stair, steps = 14;
    const dx = (st.top[0] - st.base[0]) / steps;
    for (let i = 0; i < steps; i++) {
      const h = ((i + 1) / steps) * FH;
      box(Math.abs(dx) + 0.02, h, st.width, MAT.stone, st.base[0] + dx * (i + 0.5), h / 2, st.base[1]);
    }
    /* stair glass rail */
    box(st.top[0] - st.base[0] + 0.6, 1.0, 0.05, MAT.glass, (st.base[0] + st.top[0]) / 2, FH * 0.55 + 0.5, st.base[1] - st.width / 2 - 0.05);
    colliders[0].push({ minX: st.base[0] - 0.4, maxX: st.top[0] + 0.4, minZ: st.base[1] - st.width / 2 - 0.35, maxZ: st.base[1] - st.width / 2 - 0.05 });
    colliders[0].push({ minX: st.base[0] - 0.4, maxX: st.top[0] + 0.4, minZ: st.base[1] + st.width / 2 + 0.05, maxZ: st.base[1] + st.width / 2 + 0.35 });

    /* columns */
    L.columns.forEach(([x, z]) => {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, FH + 0.3, 20), MAT.dark);
      m.position.set(x, (FH + 0.3) / 2, z);
      scene.add(m);
      colliders[0].push({ minX: x - 0.35, maxX: x + 0.35, minZ: z - 0.35, maxZ: z + 0.35 });
    });

    /* furnishing cues (abstract placeholders) */
    L.cues.forEach((c) => {
      const y0 = c.floor * FH;
      const mat = MAT.cue(c.color);
      if (c.type === "disc") {
        const m = new THREE.Mesh(new THREE.CylinderGeometry(c.size[0] / 2, c.size[0] / 2, 0.06, 28), mat);
        m.position.set(c.pos[0], y0 + c.size[2], c.pos[1]);
        scene.add(m);
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.14, c.size[2], 16), mat);
        leg.position.set(c.pos[0], y0 + c.size[2] / 2, c.pos[1]);
        scene.add(leg);
      } else {
        box(c.size[0], c.size[2], c.size[1], mat, c.pos[0], y0 + c.size[2] / 2, c.pos[1]);
        if (c.type === "bed")
          box(c.size[0], 0.55, 0.12, mat, c.pos[0], y0 + c.size[2] + 0.22, c.pos[1] - c.size[1] / 2 + 0.06);
      }
    });

    /* zone labels + hotspot markers */
    const roomsById = {};
    (window.SANDBOX?.rooms || []).forEach((r) => (roomsById[r.id] = r));
    L.zones.forEach((zn) => {
      const y0 = zn.floor * FH;
      makeLabel(zn.name, zn.at[0], y0 + 2.35, zn.at[1], 0.95);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.035, 10, 32), MAT.ring);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(zn.at[0], y0 + 0.06, zn.at[1]);
      scene.add(ring);
      markers.push({ mesh: ring, zone: zn, room: zn.roomId ? roomsById[zn.roomId] : null });
    });

    /* invisible floor planes for click-to-move raycasts */
    [0, 1].forEach((fl) => {
      const g = new THREE.Mesh(new THREE.PlaneGeometry(64, 64), new THREE.MeshBasicMaterial({ visible: false }));
      g.rotation.x = -Math.PI / 2;
      g.position.set(7, fl * FH + 0.01, 3);
      g.userData.floor = fl;
      scene.add(g);
      floorMeshes.push(g);
    });

    /* soft outer context: distant white blocks like the compound */
    for (let i = 0; i < 6; i++) {
      box(6, 2.6 + (i % 3), 4, MAT.wall, -14 + i * 7, 1.3, -18 - (i % 2) * 4);
    }
  }

  /* ---------- movement ---------- */
  function stairInfo(x, z) {
    const st = L.stair;
    const within = z > st.base[1] - st.width / 2 - 0.25 && z < st.base[1] + st.width / 2 + 0.25;
    if (!within) return null;
    const t = (x - st.base[0]) / (st.top[0] - st.base[0]);
    if (t < -0.15 || t > 1.15) return null;
    return Math.max(0, Math.min(1, t));
  }

  function groundY(x, z) {
    const t = stairInfo(x, z);
    if (t !== null && (state.floor === 0 ? t > -0.2 : true)) return t * FH;
    return state.floor * FH;
  }

  function collide(nx, nz) {
    const list = colliders[state.floor] || [];
    const t = stairInfo(state.pos.x, state.pos.z);
    for (const c of list) {
      if (t !== null && t > 0.05 && t < 0.98) continue; /* on stairs: skip wall push */
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

    /* zone jump animation */
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
      /* keyboard */
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
        tryMove(((mx * c - mz * s) / len) * sp, ((mx * s + mz * c) / len) * -sp * -1);
      }
      /* click-to-move */
      if (state.moveTarget) {
        const d = new THREE.Vector2(state.moveTarget.x - state.pos.x, state.moveTarget.z - state.pos.z);
        if (d.length() < 0.15) state.moveTarget = null;
        else {
          d.normalize().multiplyScalar(3.1 * dt);
          const before = { x: state.pos.x, z: state.pos.z };
          tryMove(d.x, d.y);
          if (Math.abs(before.x - state.pos.x) < 1e-4 && Math.abs(before.z - state.pos.z) < 1e-4) state.moveTarget = null;
        }
      }
    }

    /* stairs / floor transitions */
    const t = stairInfo(state.pos.x, state.pos.z);
    if (t !== null) state.floor = t > 0.55 ? 1 : 0;
    const targetY = (t !== null ? t * FH : state.floor * FH) + EYE;
    state.pos.y += (targetY - state.pos.y) * Math.min(1, dt * 10);

    /* keep floor buttons in sync with actual floor */
    floorBtns.forEach((b) => b.classList.toggle("on", +b.dataset.floor === state.floor));

    /* markers pulse */
    const pulse = 1 + Math.sin(ts * 0.004) * 0.12;
    markers.forEach((m) => m.mesh.scale.set(pulse, pulse, 1));

    /* camera */
    camera.position.copy(state.pos);
    const dir = new THREE.Vector3(
      Math.sin(state.yaw) * Math.cos(state.pitch),
      Math.sin(state.pitch),
      -Math.cos(state.yaw) * Math.cos(state.pitch)
    );
    camera.lookAt(state.pos.clone().add(dir));

    /* HUD: nearest zone on this floor */
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
    if (moved > 6) return; /* was a look-drag, not a click */
    const r = canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    const ray = new THREE.Raycaster();
    ray.setFromCamera(ndc, camera);
    /* markers first */
    const hitM = ray.intersectObjects(markers.map((m) => m.mesh));
    if (hitM.length) {
      const mk = markers.find((m) => m.mesh === hitM[0].object);
      if (mk?.room && window.SANDBOX?.openRoomSheet) window.SANDBOX.openRoomSheet(mk.room);
      return;
    }
    /* floor click-to-move (same floor only) */
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

  /* ---------- zone jump / floors ---------- */
  function jumpTo(zone) {
    const [x1, z1, x2, z2] = zone.rect;
    const cx = zone.stand ? zone.stand[0] : (x1 + x2) / 2;
    const cz = zone.stand ? zone.stand[1] : (z1 + z2) / 2;
    let lk = zone.look || zone.at;
    if (Math.abs(lk[0] - cx) < 0.3 && Math.abs(lk[1] - cz) < 0.3) lk = [7, 5]; /* face the house */
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
      floorBtns.forEach((x) => x.classList.toggle("on", x === b));
      const fl = +b.dataset.floor;
      jumpTo(L.zones.find((z) => z.id === (fl ? "hall-up" : "living")));
    })
  );
  hudDetails.addEventListener("click", () => {
    const room = (window.SANDBOX?.rooms || []).find((r) => r.id === hudDetails.dataset.room);
    if (room && window.SANDBOX?.openRoomSheet) window.SANDBOX.openRoomSheet(room);
  });

  /* ---------- open / close ---------- */
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
  enterBtns.forEach((b) => b.addEventListener("click", open3D));
  exitBtn.addEventListener("click", close3D);
  helpBtn.addEventListener("click", () => (helpCard.hidden = false));
  helpCard.addEventListener("click", () => (helpCard.hidden = true));
})();
