// Auto-mirror of rooms.json so the app works when opened directly from disk (file://).
// Edit rooms.json, then keep this file in sync (same array), or edit both identically.
window.ROOMS = [
  {
    "id": "exterior-entrance",
    "name": "Exterior & Entrance",
    "type": "exterior",
    "frames": [
      "assets/frames/01-exterior-entrance.jpg"
    ],
    "designReferences": [
      "assets/design-references/ref-31.jpg",
      "assets/design-references/ref-39.jpg"
    ],
    "notes": "Front approach with stepping-stone path and wood-slat canopy over the door. Planting beds exist but are not yet landscaped.",
    "confidence": "high",
    "labelStatus": "confirmed",
    "updateNotes": "Replace frame with a proper landscape photo on the next site visit."
  },
  {
    "id": "front-terrace",
    "name": "Covered Terrace & Outdoor Kitchen",
    "type": "outdoor",
    "frames": [
      "assets/frames/02-terrace-pergola.jpg"
    ],
    "designReferences": [
      "assets/design-references/ref-27.jpg",
      "assets/design-references/ref-28.jpg",
      "assets/design-references/ref-34.jpg",
      "assets/design-references/ref-35.jpg",
      "assets/design-references/ref-42.jpg"
    ],
    "notes": "Columned terrace with flagstone paving, built. Design adds an outdoor kitchen counter, dining table and wall lights.",
    "confidence": "high",
    "labelStatus": "confirmed",
    "updateNotes": ""
  },
  {
    "id": "garden",
    "name": "Garden & Lawn",
    "type": "outdoor",
    "frames": [
      "assets/frames/03-garden-lawn.jpg"
    ],
    "designReferences": [
      "assets/design-references/ref-29.jpg",
      "assets/design-references/ref-30.jpg",
      "assets/design-references/ref-32.jpg",
      "assets/design-references/ref-33.jpg",
      "assets/design-references/ref-37.jpg",
      "assets/design-references/ref-40.jpg",
      "assets/design-references/ref-41.jpg"
    ],
    "notes": "New lawn partially laid; boundary wall awaits its slatted fence. Note: an excavation visible on site (possible pool) does not appear in the design pages.",
    "confidence": "high",
    "labelStatus": "confirmed",
    "updateNotes": "Confirm whether the excavation is a pool and add its design when available."
  },
  {
    "id": "living-area",
    "name": "Living Area",
    "type": "interior",
    "frames": [
      "assets/frames/04-living-wide.jpg",
      "assets/frames/06-living-tv-wall.jpg"
    ],
    "designReferences": [
      "assets/design-references/ref-07.jpg",
      "assets/design-references/ref-08.jpg",
      "assets/design-references/ref-09.jpg",
      "assets/design-references/ref-12.jpg",
      "assets/design-references/ref-13.jpg",
      "assets/design-references/ref-21.jpg",
      "assets/design-references/ref-22.jpg",
      "assets/design-references/ref-23.jpg",
      "assets/design-references/ref-24.jpg",
      "assets/design-references/ref-25.jpg"
    ],
    "notes": "Open-plan reception with floor-to-ceiling glazing on two sides. Floors, paint and ceiling lighting installed. Design adds bouclé sofas, rattan chairs, jute rugs and a sculpted niche shelf wall.",
    "confidence": "high",
    "labelStatus": "confirmed",
    "updateNotes": ""
  },
  {
    "id": "dining-kitchen",
    "name": "Dining & Kitchen",
    "type": "interior",
    "frames": [
      "assets/frames/08-kitchen-wall.jpg"
    ],
    "designReferences": [
      "assets/design-references/ref-04.jpg",
      "assets/design-references/ref-05.jpg",
      "assets/design-references/ref-06.jpg",
      "assets/design-references/ref-10.jpg",
      "assets/design-references/ref-11.jpg"
    ],
    "notes": "Kitchen not yet installed — wall shows capped connections only. Design shows wood-veneer cabinetry, stone island, oval dining table with woven chairs and a rattan pendant.",
    "confidence": "high",
    "labelStatus": "confirmed",
    "updateNotes": ""
  },
  {
    "id": "staircase",
    "name": "Entrance Hall & Staircase",
    "type": "interior",
    "frames": [
      "assets/frames/09-entrance-staircase.jpg",
      "assets/frames/15-stair-skylight.jpg"
    ],
    "designReferences": [
      "assets/design-references/ref-03.jpg"
    ],
    "notes": "Stair with skylight above, built with dark stone treads and glass balustrade. The design page shows a lighter stone finish with a metal handrail — finishes differ from as-built.",
    "confidence": "high",
    "labelStatus": "confirmed",
    "updateNotes": "Decide which stair finish the final presentation should show."
  },
  {
    "id": "powder-room",
    "name": "Powder Room & Guest WC",
    "type": "interior",
    "frames": [
      "assets/frames/07-powder-room.jpg"
    ],
    "designReferences": [
      "assets/design-references/ref-14.jpg",
      "assets/design-references/ref-15.jpg"
    ],
    "notes": "Ground-floor WC largely fitted: basin, mirror and sanitaryware in place. Design adds a pebble-texture wall and timber counter.",
    "confidence": "medium",
    "labelStatus": "confirmed",
    "updateNotes": ""
  },
  {
    "id": "guest-bedroom",
    "name": "Guest Bedroom (Ground Floor)",
    "type": "interior",
    "frames": [
      "assets/frames/10-guest-bedroom.jpg"
    ],
    "designReferences": [
      "assets/design-references/ref-16.jpg",
      "assets/design-references/ref-17.jpg",
      "assets/design-references/ref-18.jpg"
    ],
    "notes": "Ground-floor room inferred as the guest bedroom. Wardrobe niche empty; design shows a dark rattan wardrobe wall and woven pendant.",
    "confidence": "medium",
    "labelStatus": "inferred",
    "updateNotes": "Confirm room assignment against a floor plan when available."
  },
  {
    "id": "master-bedroom",
    "name": "Master Bedroom",
    "type": "interior",
    "frames": [
      "assets/frames/11-master-bedroom.jpg"
    ],
    "designReferences": [
      "assets/design-references/ref-44.jpg",
      "assets/design-references/ref-45.jpg",
      "assets/design-references/ref-46.jpg",
      "assets/design-references/ref-47.jpg",
      "assets/design-references/ref-48.jpg",
      "assets/design-references/ref-49.jpg",
      "assets/design-references/ref-50.jpg"
    ],
    "notes": "Largest upper-floor room with private terrace access — inferred as the master. Design: cane headboard wall, textured ceiling, terrazzo en-suite and rattan dressing wardrobes.",
    "confidence": "medium",
    "labelStatus": "inferred",
    "updateNotes": ""
  },
  {
    "id": "bedroom-2",
    "name": "Bedroom — General Design",
    "type": "interior",
    "frames": [
      "assets/frames/12-general-bedroom.jpg"
    ],
    "designReferences": [
      "assets/design-references/ref-51.jpg",
      "assets/design-references/ref-52.jpg",
      "assets/design-references/ref-53.jpg",
      "assets/design-references/ref-54.jpg",
      "assets/design-references/ref-55.jpg"
    ],
    "notes": "Kymera's “General Bedroom” scheme — light rattan wardrobes, floating desk and abstract artwork — applies to the remaining upper bedrooms.",
    "confidence": "medium",
    "labelStatus": "inferred",
    "updateNotes": ""
  },
  {
    "id": "bathrooms",
    "name": "Bathrooms",
    "type": "interior",
    "frames": [
      "assets/frames/13-bathroom.jpg"
    ],
    "designReferences": [
      "assets/design-references/ref-19.jpg",
      "assets/design-references/ref-56.jpg",
      "assets/design-references/ref-57.jpg"
    ],
    "notes": "Bathrooms are ~90% fitted: walk-in showers, wall-hung basins and oval mirrors already match the design language closely.",
    "confidence": "high",
    "labelStatus": "confirmed",
    "updateNotes": ""
  },
  {
    "id": "upper-balcony",
    "name": "Upper Terraces & Balconies",
    "type": "outdoor",
    "frames": [
      "assets/frames/14-upper-balcony.jpg"
    ],
    "designReferences": [],
    "notes": "Wide upper terraces with glass balustrades and lagoon/mountain views. No design pages cover these areas yet.",
    "confidence": "high",
    "labelStatus": "confirmed",
    "updateNotes": "Add design references here if the terraces get designed later."
  }
];
