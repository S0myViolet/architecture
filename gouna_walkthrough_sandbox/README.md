# El Gouna House — Walkthrough Sandbox

A local, self-contained web platform for exploring the house: the real walkthrough
(video + extracted frames) side by side with the intended finished design (from the
Kymera presentation PDF).

## Open it

Double-click **`index.html`** — it works straight from disk.

Optional (slightly better, enables loading `rooms.json` directly):

```bash
cd gouna_walkthrough_sandbox
python3 -m http.server 8000
# then open http://localhost:8000
```

## What's inside

| Path | Contents |
|---|---|
| `index.html` / `styles.css` / `app.js` | The platform (plain HTML/CSS/JS, no build step) |
| `data/rooms.json` | **The room data** — names, notes, image paths, confidence labels |
| `data/rooms.js` | Identical mirror of `rooms.json`, used when opened via double-click (browsers block reading `.json` from `file://`) |
| `assets/frames/` | 15 key frames extracted from the site video |
| `assets/design-references/` | 52 design pages rendered from the PDF |
| `assets/video/` | The original walkthrough video (3 parts) |
| `assets/pdf/design-presentation.pdf` | The full Kymera design PDF |

## Updating it

- **Room names, notes, images, order** → edit `data/rooms.json`, then copy the same
  array into `data/rooms.js` (keep the `window.ROOMS = ...;` wrapper). The walkthrough
  sequence follows the array order.
- **New site photos** → drop into `assets/frames/`, add the path to the room's `frames` list.
- **New design images** → drop into `assets/design-references/`, add to `designReferences`.
- **Look & feel** → `styles.css` (colours live in the `:root` block at the top).
- **Behaviour / sections** → `app.js` and `index.html`.

Missing images never break the page — they show a labelled placeholder instead.

## Asking an AI assistant to change it

Point it at this folder and be specific, e.g.:

> "In `gouna_walkthrough_sandbox`, rename 'Bedroom — General Design' to 'Kids' Room',
> add the new photos in `assets/frames/` to it, and make the hero headline smaller."

Everything is deliberately plain (no framework, no build) so any assistant can edit it safely.
