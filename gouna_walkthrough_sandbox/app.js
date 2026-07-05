/* ============================================================
   El Gouna House Walkthrough — sandbox behaviour
   Data source: data/rooms.json (served) with fallback to
   data/rooms.js (window.ROOMS) when opened from disk (file://).
   ============================================================ */

(async function () {
  // ---------- data ----------
  let rooms = [];
  try {
    const res = await fetch("data/rooms.json");
    if (!res.ok) throw new Error(res.status);
    rooms = await res.json();
  } catch (_) {
    rooms = window.ROOMS || [];
  }
  if (!rooms.length) {
    document.getElementById("viewerNotes").textContent =
      "No room data found — check data/rooms.json / data/rooms.js.";
    return;
  }

  const $ = (id) => document.getElementById(id);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  };

  // Graceful fallback for any missing image
  function guard(img, label) {
    img.addEventListener("error", () => {
      const ph = el("div", "img-missing", label || "image missing");
      img.replaceWith(ph);
    });
    return img;
  }

  // ---------- lightbox ----------
  const lightbox = $("lightbox"), lbImage = $("lbImage"), lbCaption = $("lbCaption");
  function openLightbox(src, caption) {
    lbImage.src = src;
    lbCaption.textContent = caption || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }
  $("lbClose").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

  // ---------- walkthrough viewer ----------
  // One scene per room, in JSON order. "Intended look" swaps to design refs.
  const scenes = rooms.filter((r) => (r.frames && r.frames.length) || (r.designReferences && r.designReferences.length));
  let idx = 0;          // current scene
  let showDesign = false; // false = today, true = intended
  let subIdx = 0;       // index within frames / refs of the room

  const viewerImage = $("viewerImage"), stageTag = $("stageTag");
  const viewerName = $("viewerName"), viewerNotes = $("viewerNotes");
  const viewerType = $("viewerType"), viewerStatus = $("viewerStatus");
  const toggleLook = $("toggleLook"), dots = $("viewerDots"), strip = $("thumbStrip");

  viewerImage.addEventListener("error", () => {
    viewerImage.src =
      "data:image/svg+xml;charset=utf-8," +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'><rect width='100%' height='100%' fill='#26211a'/><text x='50%' y='50%' fill='#a9884f' font-family='sans-serif' font-size='20' text-anchor='middle'>image missing</text></svg>`
      );
  });

  function sceneImages(room, design) {
    const list = design ? room.designReferences : room.frames;
    return list && list.length ? list : null;
  }

  function renderScene(fade = true) {
    const room = scenes[idx];
    let imgs = sceneImages(room, showDesign);
    if (!imgs) { showDesign = !showDesign; imgs = sceneImages(room, showDesign) || []; }
    subIdx = Math.min(subIdx, imgs.length - 1);

    const swap = () => {
      viewerImage.src = imgs[subIdx];
      stageTag.textContent = showDesign ? "Intended design" : "Today";
      stageTag.classList.toggle("design", showDesign);
      viewerImage.classList.remove("fading");
    };
    if (fade) {
      viewerImage.classList.add("fading");
      setTimeout(swap, 160);
    } else swap();

    viewerName.textContent = room.name;
    viewerNotes.textContent = room.notes || "";
    viewerType.textContent = room.type || "area";
    viewerStatus.textContent = room.labelStatus === "inferred" ? "inferred" : "confirmed";

    const hasBoth = room.frames && room.frames.length && room.designReferences && room.designReferences.length;
    toggleLook.disabled = !hasBoth;
    toggleLook.textContent = showDesign ? "View today" : "View intended look";

    dots.querySelectorAll("button").forEach((b, i) => b.classList.toggle("on", i === idx));
    strip.querySelectorAll("button").forEach((b, i) => b.classList.toggle("on", i === idx));
  }

  function go(n) {
    idx = (n + scenes.length) % scenes.length;
    subIdx = 0;
    renderScene();
  }

  $("prevBtn").addEventListener("click", () => {
    const imgs = sceneImages(scenes[idx], showDesign) || [];
    if (subIdx > 0) { subIdx--; renderScene(); } else go(idx - 1);
  });
  $("nextBtn").addEventListener("click", () => {
    const imgs = sceneImages(scenes[idx], showDesign) || [];
    if (subIdx < imgs.length - 1) { subIdx++; renderScene(); } else go(idx + 1);
  });
  toggleLook.addEventListener("click", () => { showDesign = !showDesign; subIdx = 0; renderScene(); });
  document.addEventListener("keydown", (e) => {
    const three = document.getElementById("threeOverlay");
    if (!lightbox.hidden || !$("roomSheet").hidden || (three && !three.hidden)) return;
    if (e.key === "ArrowRight") $("nextBtn").click();
    if (e.key === "ArrowLeft") $("prevBtn").click();
  });
  viewerImage.addEventListener("click", () =>
    openLightbox(viewerImage.src, `${scenes[idx].name} — ${showDesign ? "intended design" : "today"}`)
  );

  scenes.forEach((room, i) => {
    const d = el("button");
    d.title = room.name;
    d.addEventListener("click", () => go(i));
    dots.appendChild(d);

    const t = el("button");
    const cover = (room.frames && room.frames[0]) || (room.designReferences && room.designReferences[0]);
    const im = guard(el("img"), room.name); im.src = cover; im.alt = room.name; im.loading = "lazy";
    t.appendChild(im);
    t.appendChild(el("span", null, room.name));
    t.addEventListener("click", () => go(i));
    strip.appendChild(t);
  });

  // ---------- room cards + detail sheet ----------
  const grid = $("roomGrid");
  const sheet = $("roomSheet");
  function openSheet(room) {
    $("sheetName").textContent = room.name;
    const chips = $("sheetChips");
    chips.innerHTML = "";
    chips.appendChild(el("span", "chip", room.type || "area"));
    chips.appendChild(el("span", "chip subtle", room.labelStatus === "inferred" ? "inferred" : "confirmed"));
    chips.appendChild(el("span", "chip subtle", `confidence: ${room.confidence || "–"}`));
    $("sheetNotes").textContent = room.notes || "";

    const fill = (holder, list, cap) => {
      holder.innerHTML = "";
      if (!list || !list.length) {
        holder.appendChild(el("div", "empty", "No images for this yet — add paths in data/rooms.json."));
        return;
      }
      list.forEach((src) => {
        const f = el("figure");
        const im = guard(el("img"), room.name); im.src = src; im.alt = room.name; im.loading = "lazy";
        f.appendChild(im);
        f.addEventListener("click", () => openLightbox(src, `${room.name} — ${cap}`));
        holder.appendChild(f);
      });
    };
    fill($("sheetFrames"), room.frames, "today");
    fill($("sheetRefs"), room.designReferences, "intended design");

    sheet.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeSheet() { sheet.hidden = true; document.body.style.overflow = ""; }
  $("sheetClose").addEventListener("click", closeSheet);
  sheet.addEventListener("click", (e) => { if (e.target === sheet) closeSheet(); });

  rooms.forEach((room) => {
    const card = el("div", "room-card reveal");
    const cover = el("div", "cover");
    const src = (room.frames && room.frames[0]) || (room.designReferences && room.designReferences[0]);
    if (src) { const im = guard(el("img"), room.name); im.src = src; im.alt = room.name; im.loading = "lazy"; cover.appendChild(im); }
    else cover.appendChild(el("div", "img-missing", "no image yet"));
    card.appendChild(cover);
    const body = el("div", "body");
    body.appendChild(el("h3", null, room.name));
    const meta = el("div", "meta");
    meta.appendChild(el("span", "chip", room.type || "area"));
    meta.appendChild(el("span", "chip subtle", room.labelStatus === "inferred" ? "inferred" : "confirmed"));
    body.appendChild(meta);
    card.appendChild(body);
    card.addEventListener("click", () => openSheet(room));
    grid.appendChild(card);
  });

  // ---------- design gallery ----------
  const groups = [
    { name: "Ground floor", test: (n) => (n >= 3 && n <= 19) || (n >= 21 && n <= 25) },
    { name: "Landscape", test: (n) => n >= 27 && n <= 42 },
    { name: "First floor", test: (n) => n >= 44 && n <= 57 },
  ];
  const allRefs = [...new Set(rooms.flatMap((r) => r.designReferences || []))].sort();
  // include every extracted reference, even ones not attached to a room:
  const refNums = allRefs.map((p) => parseInt(p.match(/ref-(\d+)/)?.[1] || "0", 10));
  const tabs = $("galleryTabs"), ggrid = $("galleryGrid");
  let activeGroup = 0;
  function renderGallery() {
    ggrid.innerHTML = "";
    allRefs.forEach((src, i) => {
      if (!groups[activeGroup].test(refNums[i])) return;
      const fig = el("figure");
      const im = guard(el("img"), "design page"); im.src = src; im.alt = "Design reference"; im.loading = "lazy";
      fig.appendChild(im);
      fig.addEventListener("click", () => openLightbox(src, `Design presentation — ${groups[activeGroup].name}`));
      ggrid.appendChild(fig);
    });
  }
  groups.forEach((g, i) => {
    const b = el("button", i === 0 ? "on" : "", g.name);
    b.addEventListener("click", () => {
      activeGroup = i;
      tabs.querySelectorAll("button").forEach((x, j) => x.classList.toggle("on", j === i));
      renderGallery();
    });
    tabs.appendChild(b);
  });
  renderGallery();

  // ---------- video parts ----------
  const player = $("sitePlayer");
  $("videoParts").querySelectorAll("button").forEach((b) => {
    b.addEventListener("click", () => {
      $("videoParts").querySelectorAll("button").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      player.src = b.dataset.src;
      player.play().catch(() => {});
    });
  });

  // ---------- today vs intended ----------
  const compareList = $("compareList");
  rooms
    .filter((r) => r.frames && r.frames.length && r.designReferences && r.designReferences.length)
    .forEach((room) => {
      const row = el("div", "compare-row reveal");
      row.appendChild(el("h3", null, room.name));
      const pair = el("div", "compare-pair");
      const mk = (src, cls, tag, cap) => {
        const cell = el("div", `compare-cell ${cls}`);
        const im = guard(el("img"), room.name); im.src = src; im.alt = `${room.name} — ${tag}`; im.loading = "lazy";
        cell.appendChild(im);
        cell.appendChild(el("span", "tag", tag));
        cell.addEventListener("click", () => openLightbox(src, `${room.name} — ${cap}`));
        return cell;
      };
      pair.appendChild(mk(room.frames[0], "today", "Today", "today"));
      pair.appendChild(mk(room.designReferences[0], "design", "Intended", "intended design"));
      row.appendChild(pair);
      compareList.appendChild(row);
    });

  // expose for the 3D walkthrough (js/walkthrough3d.js)
  window.SANDBOX = { rooms, openRoomSheet: openSheet };

  // ---------- scroll behaviour ----------
  const nav = document.querySelector(".topnav");
  const hero = document.querySelector(".hero");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("solid", window.scrollY > hero.offsetHeight - 80);
  }, { passive: true });

  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
    { threshold: 0.08 }
  );
  document.querySelectorAll(".reveal").forEach((n) => io.observe(n));

  // first paint
  renderScene(false);
})();
