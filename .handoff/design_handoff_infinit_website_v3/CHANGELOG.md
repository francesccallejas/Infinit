# Changelog — INFINIT© website handoff

## v3 — 6 October 2026
- **Sober, monochrome colour treatment.** The service hues, the colour line, the ambient hue, tints, the rainbow email sweep and the colour-cycling favicon are retired. Colour comes from the imagery only. See README › Colour and `pages/sober.css`.
- **New navigation** (`nav.css`, `nav.js`): rotating © mark + glass pill (Menu · Let’s talk) that opens a single-colour card above it. Replaces the dock, the fullscreen menu and the mobile burger.
- **New SEO pages:** sector landing template, Work index, Journal index, Article template.
- **Journal content:** nine English articles in `content/journal/` (six new: 04–09).
- **New README sections:** SEO & GEO (from the audit of the live site) and Content — Journal.
- **One accent: Sand** (`oklch(.86 .035 80)`), on the Let’s talk CTA, text selection, the email underline and the © hover.
- Internal links: a sectors block on the home, case → sector links in the meta bar, and one “Sectors” + one “Journal” link in the footer.
- **Quick look removed** (the hero card and the overlay), and the founder card in the Studio hero.
- **One ending for every page:** Let’s talk, the email and the full-width wordmark, then the same footer.
- Journal: cover image per article (list thumbnails and article header).
- Sectors block moved from Home to Studio.
- Fixed the image paths in `shared.js`.

The prototype in `prototype/pages/` is the source of truth. Diff each file against the previous handoff to see the exact values. All values are also documented in `README.md`.

## v2 — changes since the first handoff

### Colour system
- **Service colours are muted everywhere.** One main colour per service, `oklch(.72 .05 h)`, used for dots, service tags, case chips, menu dots, the colour line, the favicon and the email hover sweep. Card backs keep the pale tint `oklch(.92 .025 h)`. Hues: Strategy 165, Brand 255, Digital 285, Product 30, Content 88. In `shared.js`, `INF.dot(h)` returns the main colour and `INF.tint(h)` returns the tint.
- **Colour line ("One colour").** The multi-colour rainbow gradient is gone. The 3px line now shows one muted service colour at a time: a 20s loop, about 3.2s per colour with a 0.8s crossfade (keyframes `ln1` in `shared.css`). It is synced to the clock (`--lnd` = `-(Date.now() % 20000)ms`), so it carries over between pages. It appears in three places: the hero bottom edge, the light → dark transition before the contact block, and the preloader bar. Delete the `?line=spectrum` / `.ln-sp` comparison code.
- **The page background never changes colour.** The ambient tint on `body` was removed. The ambient hue `--h` now only tints two things:
  - **Cursor label:** the pale tint `oklch(.92 min(.025, --ac*2.3) h)`, which turns neutral grey in neutral sections.
  - **Dock dot:** `oklch(.72 min(.05, --ac*7) h)`, which turns grey in neutral sections.
- **Work cards all use ochre (88)** as their hover hue (`data-hh="88"`).

### Favicon & social
- New favicon set in `prototype/assets/favicon/`:
  - The I is centred in the space above the line; the line is 3/32 thick.
  - The line uses the muted Strategy colour by default.
  - Files: `favicon.svg`, `favicon.ico` (16/32/48), `favicon-32.png`, `apple-touch-icon.png` (180, full-bleed) and `icon-512.png`. Add a `site.webmanifest`.
- **Live favicon.** The SVG favicon swaps every 4s to match the colour line (`favicon-mint|blue|lilac|coral|ochre.svg`, see `shared.js`). With `prefers-reduced-motion` it is set once on load. Safari ignores live favicon changes.
- `instagram-avatar.png` (1080): the wordmark only, without the line. It is not used on the site.

### Work section
- Hover gallery is subtler: a slow crossfade with 1.8s per image and a 1.1s fade (two stacked layers, `.cy-ov` in `kit.css`).
- Relats gallery: EMI render, yellow tie cord (`tie-cord-poster.jpg`), sofa/office posters (`offices.webp`).
- Induktor: a single black motor image, `project/assets/imagery/induktor-motor.jpg`, now self-hosted.

### Performance (the page was stalling while images loaded)
- `decoding="async"` on all images.
- The hover gallery preloads on first hover and calls `img.decode()` before showing each image, so it never swaps to an undecoded image.

### Navigation & UI
- Dock: auto-hides at the footer and returns on scroll up. Active-section dot ("where am I").
- Mobile: burger → coral X. Quick look moves into the menu on mobile.
- Language buttons removed from the dock. CA/ES/EN are clickable in the footer and stored in `localStorage`; translations are still to do.
- Studio has a "← Home" button in the hero.
- Contact buttons above the footer were removed, because they duplicated the footer.
- Client logos: each one has its own height so the visual weight is equal (`CH` in `shared.js`).
- Project cards: service tags (dot + name) replace the unexplained colour dots.

### Typography & layout
- **Inner-page hero H1 (Studio and cases):** clamp(50px, 8.2vw, 150px), weight 600, -0.05em, line-height 0.96, vertically centred.
- **Studio scale reduced** to match the Home:
  - Manifesto: clamp(28px, 3.4vw, 56px).
  - Value titles: clamp(44px, 5.6vw, 96px).
  - Value text: 16–19px.
  - Value images: 3:2.
  - "Experience across" names: clamp(28px, 3.4vw, 52px).
  - Closing CTA: clamp(40px, 5.6vw, 96px); email clamp(26px, 4.6vw, 80px).
  - Section padding: clamp(70px, 8vw, 120px).
  - Sticky scroll lengths: manifesto 170vh, values 260vh.
- **Founder section:**
  - The photo is no longer sticky (no inner scroll); photo and text sit centred side by side.
  - Statement text: clamp(20px, 1.7vw, 28px).
  - Stats: clamp(26px, 2.4vw, 40px).
