# Handoff: INFINIT© website (Home, Studio, Case studies)

## Overview
New marketing website for **INFINIT©**, a strategic brand and digital studio based in Barcelona (weareinfinit.com). The site has 4 finished screens: **Home**, **Studio**, and two case studies, **Bunnker** and **Relats**. Four more cases (Instellar, Induktor, Julià, Almirall) are listed on the Home but marked "Work in progress" / "Customer NDA". They have no page yet.

The task: **implement the site in the repo `francesccallejas/Infinit`, deploy it, wire it up properly, keep the motion quality, and fix bugs** (see "Known issues & QA checklist").

## About the design files
The files in `prototype/` are **design references built in HTML/CSS/vanilla JS**. They are working prototypes that show the intended look, motion and behaviour. They are not production code to ship as-is.

Recreate them in the repo's existing environment. The current live site is plain static HTML, so a static build is the natural fit. If you need i18n routing (`/ca`, `/es`, `/en`), a static-site framework such as Astro is a good fit. Use your judgement after inspecting the repo. Keep the pages, copy, timings and easings identical to the prototype.

Open `prototype/pages/home.html` in a browser to see everything working. Asset paths are relative, so the folder works offline. Two exceptions: case videos and the Geist font load from the web.

## Fidelity
**High-fidelity.** Final colours, typography, spacing, copy and motion. Recreate pixel-perfectly. Every value in this README comes from the prototype source. When in doubt, the prototype CSS/JS is the source of truth.

---

## Design tokens

### Typography
Only two families. Do **not** use the serif or mono from the older design-system folder (Instrument Serif / IBM Plex Mono). They are superseded.
- **Satoshi** (variable, 300–900). Used for all UI and text. Files: `prototype/fonts/Satoshi-Variable.woff2|woff` (+ italic).
- **Geist 900** (Google Fonts, weights 500 and 900). Used **only** for the wordmark `INFINIT©`. The © is set in Geist 500 at 0.42em (0.2em when the wordmark is larger than 80px). Letters are individually measured with canvas so the wordmark can fit a container exactly (`wm()` in `shared.js`, `data-wm="fit"` / `data-wm="<px>"`).

Type scale in use (all Satoshi, all with negative tracking):
| Role | Size | Weight | Tracking | Line height |
|---|---|---|---|---|
| Hero side text ("Brands built" / "to scale") | clamp(30px, 3.8vw, 64px) | 500 | -0.045em | 1 |
| Intro statement | clamp(30px, 3.8vw, 62px) | 500 | -0.04em | 1.05 |
| Section H2 (`.h2`) | clamp(32px, 3.8vw, 60px) | 700 | -0.04em | 1 |
| Approach statements | clamp(36px, 5.6vw, 96px) | 700 | -0.05em | 0.98 |
| Service accordion H3 | clamp(44px, 7vw, 120px) | 700 | -0.06em | 0.92 |
| "Let's talk." | clamp(52px, 9vw, 160px) (17vw on mobile) | 700 | -0.06em | 0.88 |
| Big copyable email | clamp(30px, 6.4vw, 112px) (fits the width on mobile) | 700 | -0.05em | 1 |
| Card title (carousel) | clamp(22px, 2vw, 30px) | 700 | -0.035em | — |
| Label (`.lbl`) | 13px | 500 | — | 1.5 |
| Body | 16–18px | 400–500 | — | 1.45 |

Grey/black emphasis pattern (`.em`): the sentence is grey `#9A999A` and the key words in `<b>` are full ink with the same weight, e.g. "Selected **work.**"

### Colour (OKLCH is the source of truth; hex is the sRGB equivalent)
Light ground
- `--bg` oklch(.975 .002 85) ≈ `#f7f7f5`, page background
- `--l1` oklch(.91 .003 85) ≈ `#e2e1df`, hairlines, image placeholders
- `--t2` `#9A999A`, de-emphasised text (`.em`)
- `--t3` oklch(.45 .003 85) ≈ `#565553`, secondary text
- `--t4` oklch(.16 .004 85) ≈ `#0e0d0b`, ink / primary text

Dark ground (`.dark`)
- `--d0` oklch(.14 .012 245) ≈ `#060a0e`, dark background (brand ink, close to `#03050F`)
- `--d1` oklch(.24 .009 245) ≈ `#1c2023`, hairlines on dark
- `--d2` oklch(.52 .009 245) ≈ `#656a6e`
- `--d3` oklch(.7 .009 245) ≈ `#9a9fa4`, secondary text on dark
- `--d4` oklch(.95 .004 245) ≈ `#eceff1`, primary text on dark

**Service colour system.** Five services, each with a hue. These colours are used **subtly**: dots, ambient tint, card backs, the colour line. Never as large saturated fills.
| Service | Hue | Dot oklch(.72 .05 h) | Tint oklch(.92 .025 h) | Strong oklch(.78 .08 h) |
|---|---|---|---|---|
| Strategy (mint) | 165 | `#88af9d` | `#d6eae0` | `#86c8ab` |
| Brand / Identity (blue) | 255 | `#90a7c4` | `#dae6f5` | `#95baea` |
| Digital (lilac) | 285 | `#a1a1c3` | `#e2e3f5` | `#b1b1e9` |
| Product (coral) | 30 | `#c29992` | `#f5dfdb` | `#e6a599` |
| Content (ochre) | 88 | `#b2a381` | `#ebe4d2` | `#cdb57b` |

**Colour line ("One colour").** A 3px line that shows **one service colour at a time**: mint → blue → lilac → coral → ochre, then back to mint. It loops over **20s**. Each colour holds for about 3.2s, then crossfades to the next in 0.8s. The short fades are deliberate, so blended in-between tones (for example pink between lilac and coral) barely show. Use the keyframes `ln1` in `shared.css`.
- Colours: oklch(.8 .13 165) #5ed8a9 · oklch(.72 .14 255) #65a7fa · oklch(.7 .14 285) #9690f1 · oklch(.72 .15 30) #f47c6b · oklch(.84 .14 88) #f0c551.
- **Synced to the clock**: `animation-delay: -(Date.now() % 20000)ms` (CSS var `--lnd`), so the colour carries over when you change page instead of restarting.
- It appears in three places:
  1. The bottom edge of every hero.
  2. The **light → dark transition** before the final contact block. It draws in left→right (`scaleX 0→1`, 1.6s, cubic-bezier(.7,0,.2,1)) when it enters the viewport.
  3. The preloader progress bar.
- The old multi-colour gradient ("rainbow") was replaced on purpose. Its CSS is still in the files under `.ln-sp` / `?line=spectrum` for comparison only; delete it in production.
- Still rainbow: the hover sweep on the big contact email (`.mail .mt`). Pending decision; leave as is.

**Accent "close" coral:** oklch(.7 .14 28) ≈ `#e8796c`. Used for the mobile menu X and the Quick look close hover.

### Spacing, radius, shadow
- Side padding `--pad`: clamp(20px, 3vw, 44px)
- Section vertical rhythm: clamp(100px, 12vw, 180–190px)
- Radius: pills 99px · cards 10–14px · Quick look panels 14px · stacked project cards 12px
- Frosted glass (`.gbtn`, dock, `.ql`): light ground uses `background: oklch(1 0 0 / .42)` plus `backdrop-filter: blur(16px) saturate(1.6)`. Dark ground uses `oklch(1 0 0 / .1)`.
- Hover shadow: `0 14px 40px -16px oklch(.6 .09 <hue> / .5)`
- Dock on dark: `box-shadow: 0 12px 40px #0006`

### Easing & timing (used everywhere)
- **In-out "expo":** `cubic-bezier(.7,0,.2,1)`. Used for menu reveal, flips, clip wipes and the dock hide.
- **Out:** `cubic-bezier(.2,.7,.2,1)`. Used for hovers, image zoom, reveals, letter-spacing changes.
- Typical durations: hovers 0.3–0.5s, reveals 0.6–1s, image zoom 1–1.8s.

---

## Global components & behaviour (all pages)

**Preloader** (`K.pre`). On the first visit of the session only (`sessionStorage inf-pre-<key>`), the letters of INFINIT rise one by one in the 5 service colours, with a counter and a progress bar in the colour line (one service colour at a time), and a curtain then lifts. Respect `prefers-reduced-motion` (currently not handled, see QA).

**Smooth scroll** (`K.smooth`, desktop only, not on coarse pointers). Wheel input is lerped (`cur = lerp(cur, tgt, .085)`) while native scroll is kept, so `position: sticky` still works. It is disabled while `body.lock` is set. Anchor links (`a[href^="#"]`) scroll smoothly and close the menu. A library such as Lenis is an acceptable replacement if it feels identical.

**Dock** (floating navigation, bottom centre, `position: fixed; bottom: 18px`, height 52px, pill).
- Desktop contents: wordmark (15px) · Work · Services · Studio · **Let's talk** (solid pill). Below 760px: wordmark · burger · Let's talk.
- **Auto-contrast:** it samples the element under the dock (`elementFromPoint`) and switches to the dark style (`.dk`) over `.dark` sections.
- **Hides at the footer:** when scrolling down and the footer top is within `innerHeight - 60`, it slides down (`translate(-50%, calc(100% + 40px))`, opacity 0, 0.7s expo) so it never covers the footer clock or language buttons. Any upward scroll brings it back. It always shows while the menu is open.
- **Active state ("where am I"):** the active link gets a 4px `currentColor` dot under it. On Home this follows the section crossing 45% of the viewport (#work, #services, #contact). On Studio it is always Studio. On cases it is always Work.
- **Let's talk hover:** like every other button, it fills with the current ambient hue, `oklch(.9 .06 var(--h))`, with dark text and the hover shadow. Same on light and dark docks.
- **Mobile burger:** 20×14 icon, three 2px lines, button 48×40, 8px gap between dock items. When the menu opens, the middle line collapses (scaleX 0), the outer lines rotate ±45° into an **X in coral** `oklch(.7 .14 28)`, and the button gets a coral 16% background. Transition 0.55s expo.

**Fullscreen menu** (`.menu.dark`). It opens with a circular clip-path from the dock: `circle(0% → 150% at 50% calc(100% - 40px))`, 1s expo. Contents:
- Top: wordmark and a CA/ES/EN segmented control.
- Links: 01 Work · 02 Services · 03 Studio · 04 Contact, at clamp(52px, 14vw, 150px), weight 700. Each link rises in staggered. On hover, a 14px dot in the link's hue scales in. The active link shows its dot and turns white.
- Home only, mobile only: a **"A quick look" card** that closes the menu and opens Quick look.
- Bottom: the copyable email button and "Barcelona — Worldwide · <live clock>".

Esc closes the menu. The body is scroll-locked while it is open.

**Custom cursor** (`KIT.cursor`, desktop only, hidden on `hover:none`). A 12px dot follows the pointer with a lerp. Over `[data-cur]` it grows into a label showing the attribute text ("View", "Drag", "Open", "Copy", "Next", "Soon"…).

**Ambient colour** (`KIT.ambient`). The element with `[data-h]` / `[data-hh]` at the screen centre, or under the cursor, sets `--h` and gives the page background a very faint hue tint (`--ac` .002 → .011 chroma). `data-h="n"` means neutral.

**Text reveals.**
- `[data-lines]`: text is split into lines, and each line slides up from a mask in sequence when it enters the viewport.
- `.rv`: fade and rise via IntersectionObserver at threshold .12.
- `.clip`: images wipe in with clip-path, checked on scroll.

**Roll hover** (`.roll`). Button and link labels are duplicated, and on hover the text rolls up and is replaced by its copy (0.5s expo).

**Magnetic** (`.mag`). Elements follow the pointer slightly.

**Copy email** (`[data-copy]`). Copies to the clipboard and shows a toast pill above the dock.

**Client logo marquee** (`clients()`). 8 logos in an infinite marquee (45s linear) with edge mask fades. Logos are monochrome via filter: black on light, white on dark. **Each logo has its own height so the visual weight is equal** (ink-area normalised): sap 28 · glovo 37 · almirall 22 · instellar 21 · relats 22 · bunnker 26 · 11onze 17 · dronparc 21 (px). Logo files are in `prototype/assets/clients/` (the prototype loads them from weareinfinit.com).

**Footer** (`footer()` in `shared.js`, dark).
- Columns: Studio links · Connect (email, phone +34 689 022 383, LinkedIn, Instagram) · "Founder recognised by" (Awwwards and COAC logos).
- Bottom row: "Barcelona — Worldwide" · **CA ES EN buttons** · live Barcelona clock (`en-GB`, Europe/Madrid, followed by "BCN") · "© 2026 INFINIT©".
- Language buttons: the active one has opacity 1 and a 10% white pill. The choice persists in `localStorage inf-lang`. **No translations exist yet**: implementing i18n is part of the build (copy is English only for now).
- Responsive: 1 column below 520px, 2 columns below 820px. On mobile the bottom row is a 2-column grid with odd items left-aligned and even items right-aligned.

---

## Screens

### 1. Home (`pages/home.html`)
1. **Hero** (`.hx.dark`, 100svh). Background images cross-fade (1.6s) with a slow zoom (scale 1.08 → 1, 7s). Content, top to bottom:
   - "Brands built" (left).
   - The **INFINIT© wordmark fitted to the full width**.
   - "to scale" (right). There is no ® here; the only mark is the © on INFINIT.
   - Bottom row: **Quick look** card on the left (72×54 thumbnail, "A quick look" + NEW pill, "Overview of the studio") and a "Scroll" indicator on the right (1px line with a white segment falling every 2s).
   - Colour line on the bottom edge.

   Mobile: the Quick look card is removed from the hero (it moves into the menu). Only the scroll line stays, aligned right.
2. **Intro.** Centred statement: "A strategic brand and digital firm for companies navigating **growth**, transformation and **modernization**." Label "INFINIT©" sits at the top left.
3. **Selected work** (#work).
   - A segmented control switches between two views:
     - **Infinite drag carousel.** Cards are clamp(280px, 34vw, 520px) wide (78vw on mobile) with 4/5 images. The DOM content is tripled for the loop. Click opens the project.
     - **12-column editorial grid** with fixed spans and aspect ratios: [1/8 16:10], [9/13 4:5], [1/6 4:5], [7/13 16:10], [2/8 16:10], [9/13 1:1].
   - Each card shows: image (on hover it cycles through the project gallery, and a frosted "View case ↗" / "Work in progress" chip appears), then **name + short description**, then **service tags**. Tags are pills with a 7px dot in the service colour plus the service name. They replaced unexplained colour dots.
   - Projects (name · description · services): Bunnker · beyond renting · Strategy, Brand → case page. Relats · ahead of the curve · Strategy, Brand, Digital → case page. Instellar · mission performance · WIP. Induktor · sim racing hardware · WIP. Julià · premium adventure vans · WIP. Almirall · beautifully clinical · Customer NDA.
4. **Our approach** (#approach, dark, 420vh tall with a sticky 100vh stage). A **scroll-scrubbed image sequence** of 40 frames (`project/assets/imagery/approach-seq/`) is painted on a canvas, with clip-path image transitions. Three statements swap in turn (fade + 40px rise): "Strategic credibility, aesthetic sophistication." / "Building brands that move business forward." / "Strategy, identity and digital — connected." Progress pills sit at the bottom right.
5. **Services** (#services). Heading "Five disciplines. One studio."
   - **Five flip cards** (5 columns, 3 below 1100px, 2 below 760px). Front: number, coloured dot, service name. Back: the service tint, and the list of capabilities.
   - Flip: rotateY 180°, 1.1s expo. It is triggered **on hover on desktop and on tap on touch** devices.
   - Below the cards, the **Capabilities accordion**: big titles, + button, and the open row fills with the service tint.
   - Service copy and capability lists are in `S` in `shared.js`.
6. **Contact** (#contact, dark). "Experience across" + client marquee, then "Let's talk." and the giant copyable email `hello@weareinfinit.com`. The email has a rainbow sweep on hover. (The extra contact buttons were removed on purpose, because they duplicated the footer.) The colour line sits on the top edge of this dark block.
7. **Footer** (see above).

**Quick look overlay** (Home). Triggered by the hero card on desktop and by the menu card on mobile.
- Fullscreen frosted dark layer: `oklch(.1 .01 245 / .6)` + `blur(30px) saturate(1.5)`, fading in over 0.55s.
- Header: label "A quick look", H2 "One studio, **everything connected.**", and a 48px round close button (rotates 90° and turns coral on hover).
- **Bento grid** of 4 columns × 2 rows, with cards rising in staggered (0.05–0.33s):
  - Selected work: 2×2, Bunnker image → #work.
  - Services list with the 5 coloured dots, "Five services, one system" → #services.
  - The studio: founder photo → studio page.
  - "Brands built to **scale.**" / Our approach → #approach.
- Mobile: the cards stack and the layer scrolls. An extra light "Let's talk." card → #contact appears.
- Closes with ×, Esc, a click outside the cards, or any card link. The body is locked while it is open.

### 2. Studio (`pages/studio.html`)
- Dark hero: Tekapo mountains image, "← Home" frosted back button at top left, label "The studio" at top right, H1 "Brands that move — fast, and **with clarity.**", founder card "Cesc Callejas · Led hands-on, no layers" → #founder.
- Then: manifesto (word-by-word highlight), **What we believe** (values: Clarity, Alive, … with images and service hues), **The founder** (sticky image, stats: Built from scratch / Growth · 2 yrs / Visibility), "Experience across" marquee, closing CTA "Let's build something **that scales.**" + copyable email, footer.

### 3. Case: Bunnker (`pages/case-bunnker.html`)
- Hero: logo, H1 "Homes made for living.", "← All work" button, service chips.
- Then:
  - Meta bar: Client / My role / Sector / Scope / Recognition.
  - Who is Bunnker / The vision.
  - The work: 01 Positioning · 02 Brand & art direction · 03 Digital & product, with videos.
  - Art direction drag gallery.
  - Interior design.
  - COAC Award tap gallery (01 / 05).
  - Palette & typeface: Coral `#FE585A` · Earth `#524741` · light `#E8E5E0`.
  - Next case → Relats.

### 4. Case: Relats (`pages/case-relats.html`)
- Same template. Hero H1 "Staying ahead of the curve.", with Relats logo.
- Sections: meta (Client / My role / Partner / Sector / Scope) · Who is Relats / The definition · 01 The challenge / 02 The idea / 03 The build · "Protection you can see." · "Now live on the web." · palette & typefaces · "In the field." gallery · "One analytics language for every internal app." · Next case → Bunnker.

Case template rules: dark hero with white text and the colour line, the same frosted UI, line reveals, clip-wiped images, autoplaying muted videos with a poster (they fall back to the poster image if the video fails), and a "Next case" block with a big name whose letter-spacing opens up on hover.

---

## Responsive summary
Breakpoints: 1180 · 1100 · 900 · 820 · 760 · 520 px. Below 760px:
- The dock becomes wordmark + burger + Let's talk.
- Quick look moves into the menu.
- Hero bottom row: scroll line only.
- Carousel cards are 78vw wide.
- The grid becomes a single column.
- Services use 2 columns.
- The footer stacks.
- The custom cursor is hidden on touch.

No horizontal overflow is allowed (`html, body { overflow-x: clip }`).

---

## Known issues & QA checklist (please fix / verify)
1. **Duplicate `id="contact"`**: the contact section and the `<footer>` both use it. Keep it on the section only.
2. **i18n**: CA/ES/EN controls exist (menu + footer) but switch nothing. Implement real localisation:
   - Routes `/ca` `/es` `/en` and `hreflang`.
   - Browser-language detection on first visit.
   - Persist the choice.

   Catalan and Spanish copy will run longer than the English. Check that headlines don't break the layout.
3. **Reduced motion**: add a `prefers-reduced-motion` path. It should skip the preloader and smooth scroll, and replace reveals and flips with instant states.
4. **Accessibility**:
   - Visible focus states on all buttons and links.
   - Focus trap and `aria-expanded` on the menu and Quick look.
   - Flip cards reachable by keyboard.
   - Alt text on project images.
   - Contrast of grey `.em` text (`#9A999A`) on light. It is a deliberate style; keep it for display sizes only.
5. **Mobile was only reviewed in code.** Test on real iOS Safari and Android Chrome:
   - `100svh` hero.
   - The dock not overlapping content.
   - Burger → X.
   - Quick look scroll.
   - Carousel drag vs vertical scroll (`touch-action: pan-y`).
   - Flip on tap.
   - Footer alignment.
6. **Performance**:
   - Lazy-load images; serve AVIF/WebP at proper sizes.
   - Preload only the first approach frames.
   - Pause videos and marquees off-screen.
   - Keep the long scroll at 60fps (transforms and opacity only).
7. **Remote assets**: case videos (`*.mp4`) and the client logos load from `https://www.weareinfinit.com/...`. Self-host them in the repo.
8. **Placeholders**:
   - The showreel imagery is provisional (a real reel will replace it).
   - Induktor uses an Unsplash image.
   - The 4 WIP cases have no pages. Show them as non-clickable "Work in progress" (as now) until they exist.
9. **SEO/meta**: titles, descriptions, Open Graph images and sitemap per page and language. The favicon set is in `assets/favicon/` and already linked in the prototype pages; add a `site.webmanifest` that uses `icon-512.png`.
10. Remove prototype-only bits: `#ctl` toggle styles, the `?line=spectrum` comparison (`.ln-sp` rules and the old gradient on `.hl i` / `.ft-hl i` / `.pre2-l i`), and Babel/devtools if any.

## State (minimal)
- `menu-open`, `qk-open` and `lock` on `<body>`.
- Work view: carousel or grid.
- Active nav key.
- Language (`localStorage inf-lang`).
- Preloader seen (`sessionStorage inf-pre-<page>`).
- Ambient hue `--h`.

## Assets
- `prototype/project/assets/images/`: hero / project key images (Bunnker Final, Relats Brand, instellar-aircraft).
- `prototype/project/assets/imagery/`: imagery, founder photo, and `approach-seq/` (40 frames: every 4th frame of the original sequence; use the full sequence from the repo if you want it smoother).
- `prototype/work/bunnker/bunnker-assets/`, `prototype/work/relats/relats-assets/`: case images and video posters.
- `prototype/assets/clients/`: client and award logos.
- `prototype/fonts/`: Satoshi variable.
- `prototype/assets/favicon/`: `favicon.svg` (main, mint line), `favicon-mint|blue|lilac|coral|ochre.svg` (on load, `shared.js` swaps the SVG favicon to the colour the line is showing at that moment), `favicon.ico` (16/32/48), `favicon-32.png`, `apple-touch-icon.png` (180, full-bleed), `icon-512.png` (full-bleed, for the web manifest). `instagram-avatar.png` (1080) is for the Instagram profile and is not used on the site.

All of these already exist in the repo (`project/`, `work/`), which is where they were taken from.

## Files
- `prototype/pages/home.html`, `studio.html`, `case-bunnker.html`, `case-relats.html`: the four screens.
- `prototype/pages/shared.css`, `shared.js`:
  - Tokens and base styles.
  - Data: services `S`, projects `P`, client logos `CH`.
  - Footer, marquee and wordmark builder.
- `prototype/pages/kit.css`, `kit.js`: cursor, magnetic, roll, seg control, reveal, ambient colour, image sequence, gallery cycling.
- `prototype/pages/kit2.css`, `kit2.js`:
  - Smooth scroll, anchors, line and clip reveals, toast/copy.
  - Dock (auto-contrast, hide at footer, scrollspy), menu, preloader.
  - Shared page init, drag carousel, tap gallery.
- `prototype/pages/case.css`: case and Studio template.
