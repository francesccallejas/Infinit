# Handoff: INFINIT© website — v3 (Home, Studio, cases, SEO pages, Journal)

## Overview
New marketing website for **INFINIT©**, a brand and strategy studio in Barcelona (weareinfinit.com) for growing mid-sized companies (€1M–€200M).

This package covers:
- **Home**, **Studio** and two case studies, **Bunnker** and **Relats**. Four more cases (Instellar, Induktor, Julià, Almirall) are listed as "Work in progress" / "Customer NDA" and have no page yet.
- **SEO pages (new in v3):** the sector landing template (Industrial & B2B), the **Work** index, the **Journal** index and the **Article** template.
- **Journal content (new in v3):** nine articles in English (Markdown) in `content/journal/`.
- **v3 design changes:** a new navigation (glass pill + rotating © mark) and a **sober, monochrome** colour treatment. The service-colour system is retired.

The task: implement the site in the repo `francesccallejas/Infinit`, deploy it, keep the motion quality, and fix the items in "Known issues & QA checklist" and "SEO & GEO".

See `CHANGELOG.md` for everything that changed since the previous handoff.

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
| Inner-page hero H1 (Studio, cases) | clamp(50px, 8.2vw, 150px) | 600 | -0.05em | 0.96 |
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

### Colour — sober and monochrome (v3)
The interface is ink, white and warm greys. **Colour comes only from the project imagery.** The five service hues, the colour line, the ambient hue and every tint are retired. Wherever a screen description below still mentions a service colour, a tint, a coloured dot, the colour line or the ambient hue, apply the "Sober treatment" table instead.

Light ground
- `--bg` oklch(.975 .002 85) ≈ `#f7f7f5`, page background (never pure white)
- `--l1` oklch(.91 .003 85) ≈ `#e2e1df`, hairlines, image placeholders
- `--t2` `#9A999A`, de-emphasised text in the `.em` pattern (display sizes only)
- `--t3` oklch(.45 .003 85) ≈ `#565553`, secondary text
- `--t4` oklch(.16 .004 85) ≈ `#0e0d0b`, ink / primary text
- Neutral fills: `oklch(.16 .004 85 / .045)` cards, `/ .06` pills and controls

Dark ground (`.dark`)
- `--d0` oklch(.14 .012 245) ≈ `#060a0e`, dark background
- `--d1` oklch(.24 .009 245) ≈ `#1c2023`, hairlines on dark
- `--d2` oklch(.52 .009 245) ≈ `#656a6e`
- `--d3` oklch(.7 .009 245) ≈ `#9a9fa4`, secondary text on dark
- `--d4` oklch(.95 .004 245) ≈ `#eceff1`, primary text on dark

**One accent: Sand** `oklch(.86 .035 80)` ≈ `#DDCFB8`, always with ink text. It appears in four places only: the "Let’s talk" CTA in the navigation, text selection, the underline of the big email on hover, and the © mark on hover over dark backgrounds. Sand is also the hover fill of list rows (Journal, Work, home sectors), the background of the related-page card in articles, the highlighted column of the price table and the open FAQ icon. Never use it for text or focus rings (keep ink on light and `--d4` on dark).

Emphasis pattern (`.em`): the sentence is grey `--t2` and the key words in `<b>` are full ink with the same weight, e.g. "Selected **work.**"

#### Sober treatment
| Element | v3 behaviour |
|---|---|
| Service dots (tags, chips, cards, menu, Quick look list, case labels) | Removed. Tags and chips are text-only pills. |
| Colour line under heroes | Removed. |
| Line before the contact block, preloader bar | 1px neutral line, `oklch(1 0 0 / .55)` on dark. No colour cycle. |
| Ambient hue (`--h`, `data-h`, `data-hh`) | Removed. |
| Cursor label | `--bg` background, ink text, shadow `0 10px 30px oklch(.14 .012 245 / .25)`. |
| Button hover (`.gbtn`) | Solid ink with `--bg` text on light. Solid `--d4` with `--d0` text on dark and over images. Shadow `0 14px 40px -18px oklch(.14 .012 245 / .5)`. |
| Service flip cards, back face | Ink `--t4`, text `--bg` (label at 60% opacity). |
| Tinted backgrounds (case pillar hover, capabilities open row) | Neutral grey `oklch(.9 .004 85)`. |
| Big copyable email, hover | No colour sweep. A Sand underline fades in (thickness .045em, offset .14em, .5s). |
| Wordmark letters, preloader letters | One colour. |
| Text selection | Sand background, ink text. |
| Favicon | Static `favicon-mono.svg`. No colour cycling. |

In the prototype these rules live in `pages/sober.css` as overrides on `html.sober` (on by default; add `?colour` to any page to see the old version). **In production, build them as the base styles and delete the colour rules.**

### Spacing, radius, shadow
- Side padding `--pad`: clamp(20px, 3vw, 44px)
- Section vertical rhythm: clamp(100px, 12vw, 180–190px)
- Radius: pills 99px · cards 10–14px · Quick look panels 14px · stacked project cards 12px
- Frosted glass (`.gbtn`, `.ql`, chips): light ground uses `background: oklch(1 0 0 / .42)` plus `backdrop-filter: blur(16px) saturate(1.6)`. Dark ground uses `oklch(1 0 0 / .1)`. The navigation pill has its own glass (see Navigation).
- Hover shadow: `0 14px 40px -16px oklch(.6 .09 <hue> / .5)`
- Dock on dark: `box-shadow: 0 12px 40px #0006`

### Easing & timing (used everywhere)
- **In-out "expo":** `cubic-bezier(.7,0,.2,1)`. Used for menu reveal, flips, clip wipes and the dock hide.
- **Out:** `cubic-bezier(.2,.7,.2,1)`. Used for hovers, image zoom, reveals, letter-spacing changes.
- Typical durations: hovers 0.3–0.5s, reveals 0.6–1s, image zoom 1–1.8s.

---

## Global components & behaviour (all pages)

**Preloader** (`K.pre`). On the first visit of the session only (`sessionStorage inf-pre-<key>`), the letters of INFINIT rise one by one in one colour (`--d4`), with a counter and a 1px neutral progress bar, and a curtain then lifts. Respect `prefers-reduced-motion` (currently not handled, see QA).

**Smooth scroll** (`K.smooth`, desktop only, not on coarse pointers). Wheel input is lerped (`cur = lerp(cur, tgt, .085)`) while native scroll is kept, so `position: sticky` still works. It is disabled while `body.lock` is set. Anchor links (`a[href^="#"]`) scroll smoothly and close the menu. A library such as Lenis is an acceptable replacement if it feels identical.

**Navigation (v3)** (`nav.css`, `nav.js`). One component on desktop and mobile. It replaces the old dock, the fullscreen circular menu and the mobile burger.
- **Container:** fixed, centred, `bottom: 18px` (12px below 760px), width `min(456px, 100vw − 24px)` (`100vw − 20px` on mobile), height 60px (56px on mobile), z-index 62.
- **Mark:** the © of the wordmark (Geist ©, the SVG path is in `nav.js`, viewBox `322.2 -72 33 33`), 48×48px (42 on mobile) inside a 60×60 hit area on the left, `currentColor`. It **rotates with the scroll**: target angle = `scrollY × 0.2°`, eased each frame with lerp .09. On hover and on keyboard focus it eases back upright to the nearest 0° (a normal ©, lerp .16) and changes colour: Sand over dark backgrounds, Sand mixed with 38% black over light ones (plain Sand would not show); on leave it goes back to following the scroll. Opening the menu adds 180° (closing removes it). Off with `prefers-reduced-motion`. Links to home.
- **Glass pill:** starts 8px right of the mark, radius 99px, padding 6px. "Glass in volume":
  - Light: `linear-gradient(180deg, oklch(1 0 0 / .66), oklch(1 0 0 / .38))`, `backdrop-filter: blur(20px) saturate(1.8)`, `box-shadow: inset 0 1px 1px oklch(1 0 0 / .95), inset 0 -1px 1px oklch(1 0 0 / .4), inset 0 12px 18px -14px oklch(1 0 0 / .9), inset 0 -14px 20px -16px oklch(.16 .004 85 / .22), 0 20px 44px -20px oklch(.14 .012 245 / .4), 0 2px 8px -3px oklch(.14 .012 245 / .2)`. A 1px rim with a gradient border (172°: white 1 → white .25 at 38% → ink .1 at 66% → white .7), drawn with a masked pseudo-element.
  - Dark (`.dk`): `linear-gradient(180deg, oklch(1 0 0 / .2), oklch(1 0 0 / .05) 52%, oklch(1 0 0 / .1))`, `box-shadow: inset 0 1px 1px oklch(1 0 0 / .55), inset 0 -1px 1px oklch(1 0 0 / .2), inset 0 12px 20px -14px oklch(1 0 0 / .4), inset 0 -14px 20px -14px oklch(0 0 0 / .4), 0 20px 44px -18px oklch(0 0 0 / .6), 0 2px 8px -3px oklch(0 0 0 / .35)`. Rim: white .8 → .12 → .04 → .45.
  - **Auto-contrast:** on scroll, sample the element under `(innerWidth/2, innerHeight − 48)` with the nav hidden. Inside `.dark` or a full-bleed image section (`.full`) → dark style, text `--d4`. Otherwise light style, text ink.
- **Menu button (left):** two 2px lines (24×10, 8px apart) + label "Menu" (Satoshi 500 17px). Open: the lines rotate ±45° into an X (`scaleX(.82)`) and the label rolls to "Close" (.55s expo). Hover fill `oklch(.16 .004 85 / .06)` (light) / `oklch(1 0 0 / .1)` (dark).
- **CTA "Let’s talk" (right):** the only solid element, in the accent: Sand `oklch(.86 .035 80)` with ink text, on light and dark. Full pill height (48px), padding 0 26px (20px on mobile), Satoshi 600 16px, roll hover. Hover: Sand mixed with 12% black (`color-mix(in oklch, sand, #000 12%)`). Goes to `#contact`.
- **Open state:** the mark fades and scales to .5. The pill slides left to cover it (`left → 0`, .7s expo) and turns solid `--bg` (no blur) with shadow `0 20px 50px -20px oklch(.14 .012 245 / .55)`. A card rises 8px above it: same width, radius 26px, `--bg`, shadow `0 34px 80px -34px oklch(.14 .012 245 / .6)`, padding `clamp(20px,2.4vw,30px) clamp(24px,2.8vw,34px)`, revealed with `clip-path: inset(100% 0 0 0 round 26px) → inset(0 round 26px)`, .75s expo.
- **Card content:** big links Work · Services · Studio · Journal in Satoshi 600 `clamp(34px, 3.4vw, 44px)`, −.045em, line-height 1.04, padding 12px 0 14px, 1px `--l1` hairline under each. Each rises from a mask (`translateY(112%) → 0`, .9s out, delay `.1s + i × .05s`). Hover: a 22px ↗ slides in on the right and the other links dim to `--t2`. The current page shows its ↗ and gets `aria-current="page"`. Below: a small row that fades in after .32s, with Sectors · All work · Contact (17px, `--t3`, ink on hover; on Home also "A quick look", which opens the Quick look overlay), and CA · ES · EN on the right (13px pills, active one with `oklch(.16 .004 85 / .07)`, saved in `localStorage inf-lang`).
- **Closing:** the button, Esc (focus goes back to the button), a click outside, any link, or scrolling more than 90px. No scroll lock. On open, focus moves to the first link. The card is `inert` and `aria-hidden` while closed. The button has `aria-expanded` and `aria-controls`.
- **Hides at the footer** like the old dock: it slides down (`translate(-50%, calc(100% + 40px))`, opacity 0, .7s expo) when scrolling down with the footer top within `innerHeight − 60`. Any upward scroll brings it back.

**Custom cursor** (`KIT.cursor`, desktop only, hidden on `hover:none`). A 12px dot follows the pointer with a lerp. Over `[data-cur]` it grows into a 92px label showing the attribute text ("View", "Drag", "Open", "Copy", "Next", "Read"…). Label: `--bg` background, ink text, shadow `0 10px 30px oklch(.14 .012 245 / .25)`.

**Ambient colour:** retired in v3. The `data-h` / `data-hh` attributes and `KIT.ambient` can be removed.

**Text reveals.**
- `[data-lines]`: text is split into lines, and each line slides up from a mask in sequence when it enters the viewport.
- `.rv`: fade and rise via IntersectionObserver at threshold .12.
- `.clip`: images wipe in with clip-path, checked on scroll.

**Roll hover** (`.roll`). Button and link labels are duplicated, and on hover the text rolls up and is replaced by its copy (0.5s expo).

**Magnetic** (`.mag`). Elements follow the pointer slightly.

**Copy email** (`[data-copy]`). Copies to the clipboard and shows a toast pill above the dock.

**Client logo marquee** (`clients()`). 8 logos in an infinite marquee (45s linear) with edge mask fades. Logos are monochrome via filter: black on light, white on dark. **Each logo has its own height so the visual weight is equal** (ink-area normalised): sap 28 · glovo 37 · almirall 22 · instellar 21 · relats 22 · bunnker 26 · 11onze 17 · dronparc 21 (px). Logo files are in `prototype/assets/clients/` (the prototype loads them from weareinfinit.com).

**One ending for every page** (v3). Every page ends the same way: a dark block (`#contact`) with "Let’s talk." (Satoshi 700, `clamp(52px, 9vw, 160px)`, −.06em, line-height .88, centred), the big copyable email, and the INFINIT© wordmark fitted to the full width; then the footer. On Home and Studio the same block starts with "Experience across" and the client marquee. On the cases it comes right after "Next case", separated by a 1px `--d1` line. Spacing: `margin-top clamp(100px,12vw,180px)` from the last light section, `padding-top clamp(70px,8vw,120px)`, the wordmark `padding-top clamp(80px,10vw,140px)`.

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
   - Bottom row: a "Scroll" indicator on the right (1px line with a white segment falling every 2s).
   - Colour line on the bottom edge.
2. **Intro.** Centred statement: "A strategic brand and digital firm for companies navigating **growth**, transformation and **modernization**." Label "INFINIT©" sits at the top left.
3. **Selected work** (#work).
   - A segmented control switches between two views:
     - **Infinite drag carousel.** Cards are clamp(280px, 34vw, 520px) wide (78vw on mobile) with 4/5 images. The DOM content is tripled for the loop. Click opens the project.
     - **12-column editorial grid** with fixed spans and aspect ratios: [1/8 16:10], [9/13 4:5], [1/6 4:5], [7/13 16:10], [2/8 16:10], [9/13 1:1].
   - Each card shows: image (on hover it slowly crossfades through the project gallery: 1.8s per image, 1.1s fade, each image decoded before it is shown so the page never stalls, and a frosted "View case ↗" / "Work in progress" chip appears), then **name + short description**, then **service tags**. Tags are pills with a 7px dot in the service colour plus the service name. They replaced unexplained colour dots.
   - Projects (name · description · services): Bunnker · beyond renting · Strategy, Brand → case page. Relats · ahead of the curve · Strategy, Brand, Digital → case page (gallery: EMI render, yellow tie cord, sofa/office posters). Instellar · mission performance · WIP. Induktor · sim racing hardware · WIP. Julià · premium adventure vans · WIP. Almirall · beautifully clinical · Customer NDA.
4. **Our approach** (#approach, dark, 420vh tall with a sticky 100vh stage). A **scroll-scrubbed image sequence** of 40 frames (`project/assets/imagery/approach-seq/`) is painted on a canvas, with clip-path image transitions. Three statements swap in turn (fade + 40px rise): "Strategic credibility, aesthetic sophistication." / "Building brands that move business forward." / "Strategy, identity and digital — connected." Progress pills sit at the bottom right.
5. **Services** (#services). Heading "Five disciplines. One studio."
   - **Five flip cards** (5 columns, 3 below 1100px, 2 below 760px). Front: number, coloured dot, service name. Back: the service tint, and the list of capabilities.
   - Flip: rotateY 180°, 1.1s expo. It is triggered **on hover on desktop and on tap on touch** devices.
   - Below the cards, the **Capabilities accordion**: big titles, + button, and the open row fills with the service tint.
   - Service copy and capability lists are in `S` in `shared.js`.
6. **Contact** (#contact, dark). "Experience across" + client marquee, then "Let's talk." and the giant copyable email `hello@weareinfinit.com`. The email has a rainbow sweep on hover. (The extra contact buttons were removed on purpose, because they duplicated the footer.) The colour line sits on the top edge of this dark block.
7. **Footer** (see above).

### 2. Studio (`pages/studio.html`)
- Dark hero: Tekapo mountains image, "← Home" frosted back button at top left, label "The studio" at top right, H1 "Brands that move — fast, and **with clarity.**".
- Then: manifesto (word-by-word highlight), **What we believe** (values: Clarity, Alive, … with images and service hues), **The founder** (sticky image, stats: Built from scratch / Growth · 2 yrs / Visibility), "Experience across" marquee, closing CTA "Let's build something **that scales.**" + copyable email, footer.

- **Sectors** (#sectors, new in v3), after "Experience across" and before the closing CTA. Label "Sectors", H2 "Sectors and moments we know **from the inside.**" (32–64px 700, `.em`), a frosted "All sectors & services ↗" button (→ `/sectors/`), and a list of the nine sectors in 3 columns (2 below 1000px, 1 below 600px): name (20–26px 600) + descriptor (14px `--t3`) + ↗, 1px top hairline, padding 22px 0 24px. Hover: the arrow moves up-right and the other names dim to `--t2`.

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

### 5. Sector landing (`pages/sector.html`)
All 17 sector and "moment" pages are in the prototype with the live copy word for word: `sector.html` (Industrial & B2B) and `sector-<slug>.html` (same slugs as the live URLs), plus the hub `sectors.html` (two lists: Sectors and Moments & services). One template for all of them; the pricing and case blocks only appear where the live page has them. The hero back button goes to the hub.
- **Hero:** same as the cases (`.ch.dark`): image, "← Home", the sector name as label, H1, service chips (text only), Scroll.
- **Facts bar** (`.meta`, 5 columns, 2 below 900px): For · Size · Sectors · Markets · Led by.
- **The problem** (cols 1–4) and **In one line** (cols 6–12, `.em` quote, 30–60px).
- **Three signs:** three `.pc` cards (number, title 28–42px 700, text). Hover: the card fills from the bottom with neutral grey (.8s expo).
- **How we work** (`.proc`, 4 columns, 2 below 900px, 1 below 560px): a 1px top hairline with a 7px ink dot, number, title (24–34px 700), duration pill (13px, `oklch(.16 .004 85 / .06)`), text 16px `--t3`.
- **Timing & investment** (`#pricing`): segmented control €1–10M · €10–50M · €50–200M that highlights one column of the price table (fill `oklch(.16 .004 85 / .055)`, 12px rounded top and bottom). Phase names 18px 600 ink, prices 20–30px 700 (`--t2`, ink in the highlighted column). Below 760px the duration column and the non-selected columns are hidden. Note below the table, 14px `--t3`.
- **Case:** `.full` image block with label, H2, text and a frosted "See the Relats case ↗".
- **Experience across:** client names as text, 26–46px 500, grey.
- **FAQ:** heading sticky on the left (5/12), `<details>` accordion on the right (7/12). Question 19–25px 600, 36px round icon (+ turns into −, ink fill with `--bg` icon when open or on hover). First item open.
- **From the journal:** three related articles (`data-jr`). Then a row of sector links (pills), the dark contact block with the copyable email, and the footer.

### 6. Work index (`pages/work.html`, new URL `/work/`)
- **Header** (`.lt`, light): "← Home", label, H1 "Selected **work.**" (44–124px 600, −.05em), lead 17–20px `--t3`.
- **Filter:** segmented control All · Strategy · Brand · Digital and a live count ("6 projects").
- **Rows** (`.wl`, 5 columns: 120px · 1.3fr · 1fr · 1.2fr · 150px): 4:3 thumbnail (radius 10, zooms to 1.06 on hover), name (24–34px 700) + short description in grey, sector, service tags, status ("View case ↗", or "Work in progress" / "Customer NDA" in grey). Work-in-progress rows are not links. Below 900px: thumbnail + one column.
- Dark contact block "Let’s build something **that scales.**" + email. Footer.
- The sectors shown for Instellar, Induktor and Julià are a proposal. Confirm them with the client.

### 7. Journal (`pages/journal.html`, `/journal/`)
- **Header:** H1 "Clear answers. **No small print.**", lead.
- **Filter:** All · Why · When · Cost · Process · Website.
- **List** (`.jl`): number, title (26–44px 700, −.045em), description 16px `--t3`, cluster tag, related sector · read time, ↗. Hover: a full-width neutral fill rises from the bottom (`scaleY 0 → 1`, .7s expo) and the arrow moves up-right.
- The order is the reading path (see "Content — Journal").

### 8. Article (`pages/article.html?a=<slug>`, `/journal/<slug>/`)
- **Cover** (v3): `cover` and `cover_alt` in the front matter. Full-width under the header (16:7, radius 14; 4:3 below 900px), `fetchpriority="high"`. Also a 4:3 thumbnail in the Journal list (168px; 96px in compact lists) that zooms to 1.05 on hover. Use it as `og:image` and as `image` in the Article JSON-LD. The prototype covers are images from the work (Relats, studio library): replace them with dedicated ones if you have them.
- **Header:** "← Journal", label (related sector · cluster), H1 with the first clause in ink and the rest in grey (`.em`), description, byline (40px avatar, name, role, read time).
- **Body** (12-column grid): sticky table of contents (cols 1–3, scrollspy; the active item has a 2px ink left border), prose (cols 4–9, 19px / 1.6), sticky related-page card on the right (cols 10–12, fills with ink on hover). Below 1100px: no TOC, one column, max-width 720px.
- **"Short answer" box** first: ink background, `--bg` text, 19–23px, radius 14. This is the passage AI assistants quote (40–70 words).
- H2 28–40px 700 (72px top margin), H3 21–25px 700, tables in the price-table style, FAQ as `<details>`, closing italic line with the email and a link to the related page.
- Then the author block (96px photo), "Keep reading" (next two articles), the dark contact block and the footer.
- The prototype renders the Markdown at runtime (`journal.js` + `journal/articles.js`). **In production, render static HTML at build time**, with Article, BreadcrumbList and FAQPage JSON-LD. The prototype injects the exact structure into `<head>`; inspect it in the DOM.

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
   - Already done in the v3 prototype: native scrolling by default (the wheel smoothing only runs with `?smooth`; use Lenis in production only if it feels identical on trackpads), every scroll handler throttled to one `requestAnimationFrame` with reads before writes, the home carousel paused off-screen, the approach canvas sized only on resize with its frames pre-decoded, the ambient hue removed, the menu card animated with `transform` and `opacity` only, and hero Ken Burns started after the image is decoded.
   - Lazy-load images; serve AVIF/WebP at proper sizes.
   - Preload only the first approach frames.
   - Pause videos and marquees off-screen.
   - Keep the long scroll at 60fps (transforms and opacity only).
7. **Remote assets**: case videos (`*.mp4`) and the client logos load from `https://www.weareinfinit.com/...`. Self-host them in the repo.
8. **Placeholders**:
   - The showreel imagery is provisional (a real reel will replace it).
   - Induktor uses a single black motor image (`project/assets/imagery/induktor-motor.jpg`, originally from Unsplash; replace with the client's own render).
   - The 4 WIP cases have no pages. Show them as non-clickable "Work in progress" (as now) until they exist.
9. **SEO/meta**: see "SEO & GEO" below. Add a `site.webmanifest` that uses `icon-512.png`.

10. Remove prototype-only bits: `#ctl` toggle styles, the `?line=spectrum` comparison (`.ln-sp` rules and the old gradient on `.hl i` / `.ft-hl i` / `.pre2-l i`), and Babel/devtools if any.

## SEO & GEO
From an audit of the live site (home, Industrial & B2B, sectors hub) and the repo (head tags, robots.txt, sitemap.xml, llms.txt), October 2026.

Already in place on the live site, keep it: unique titles and descriptions, canonical, hreflang (en / ca / es + x-default), robots meta, an Open Graph image per page, Organization JSON-LD, sitemap.xml, robots.txt, llms.txt, 17 sector landings, and the Sectors column in the footer.

To fix:
1. **The projects are in the home HTML four times** (carousel ×3 + grid), and the copies have empty alt text. Keep one list in the HTML and build the carousel copies in JS with `aria-hidden="true"` and `inert`.
2. **Nine hero `<img>` have no `src`.** Give the first one a real `src` and a descriptive `alt`; use `data-src` or CSS backgrounds for the rest.
3. **Sector links inside the content.** Studio gets a sectors block before its closing CTA (see Studio › Sectors), and each case links to its sector from the meta bar (Relats → Industrial & B2B, Bunnker → Real estate & proptech). Sector pages link back to their case.
4. **Publish `/work/`** (Work index).
5. **Publish `/journal/` and `/journal/<slug>/`** in en / ca / es, with Article, BreadcrumbList and FAQPage JSON-LD, author and date. Link each article from the FAQ of its sector page, and add the pages to sitemap.xml and llms.txt.
6. **The email is hidden by Cloudflare** ("[email protected]" for crawlers). Add `contactPoint` (email, telephone) to the Organization JSON-LD and keep it in llms.txt.
7. Add `og:locale:alternate` = `ca_ES` on every page.
8. Descriptive `alt` on case images in the landings (`alt=""` only for decorative images).

To verify: FAQPage and BreadcrumbList on the landings; Core Web Vitals on the home and on one landing.

## Content — Journal
Nine articles in English in `content/journal/*.en.md` (front matter: slug, lang, title, description, author, related_sector, cluster, status). 01–03 already exist in the repo (`.lab/articles/`, in ca / es / en). **04–09 are new** and need Catalan and Spanish versions that follow the tone of the existing translations.

Reading path, also the order of the Journal:
| # | Cluster | Title | Related page |
|---|---|---|---|
| 1 | Why | What a rebrand is actually worth to a mid-sized company | /en/industrial-branding/ |
| 2 | Why | Why B2B buyers choose the brand they already know | /en/industrial-branding/ |
| 3 | When | 5 signs your company’s brand has fallen behind | /en/family-business-branding/ |
| 4 | When | Refresh or rebrand? How to know how far to go | /en/family-business-branding/ |
| 5 | Cost | How much does a rebrand cost for an industrial company | /en/industrial-branding/ |
| 6 | Process | What a brand strategy actually is | /en/industrial-branding/ |
| 7 | Website | Your website is the first meeting. Is it ready? | /en/b2b-website-design/ |
| 8 | Website | Custom website or WordPress | /en/industrial-branding/ |
| 9 | Website | How AI assistants decide which companies to recommend | /en/geo-ai-search/ |

**Before publishing:** articles 1 and 2 cite McKinsey (*The Business Value of Design*, 2018), Gartner (B2B buyers spend 17% of their buying time with suppliers) and the Ehrenberg-Bass Institute for the LinkedIn B2B Institute (*The 95-5 Rule*, 2021). Check the figures against the sources and add links. All nine are drafts for review by Cesc Callejas.

Structure for future articles: H1 = title. First paragraph "**Short answer:** …". H2 sections. One real case where it fits. FAQ with 2–3 questions written as "**Question?** Answer.". A closing italic line with the email and a link to the related page.

## State (minimal)
- `nav-open`, `qk-open` and `lock` on `<body>`.
- Home work view: carousel or grid. Work index filter. Journal filter. Pricing column on sector pages.
- Current page (nav `aria-current`).
- Language (`localStorage inf-lang`).
- Preloader seen (`sessionStorage inf-pre-<page>`).

## Assets
- `prototype/project/assets/images/`: hero / project key images (Bunnker Final, Relats Brand, instellar-aircraft).
- `prototype/project/assets/imagery/`: imagery, founder photo, and `approach-seq/` (40 frames: every 4th frame of the original sequence; use the full sequence from the repo if you want it smoother).
- `prototype/work/bunnker/bunnker-assets/`, `prototype/work/relats/relats-assets/`: case images and video posters.
- `prototype/assets/clients/`: client and award logos.
- `prototype/fonts/`: Satoshi variable.
- `prototype/assets/favicon/`: `favicon-mono.svg` (v3, static: the white I on ink, linked on every page), `favicon.ico` (16/32/48), `favicon-32.png`, `apple-touch-icon.png` (180), `icon-512.png` (web manifest). Regenerate the ICO and PNG files from `favicon-mono.svg`: they still carry the old colour line. The coloured SVG favicons (`favicon-mint|blue|lilac|coral|ochre.svg`) are retired. `instagram-avatar.png` (1080) is for Instagram only.

All of these already exist in the repo (`project/`, `work/`), which is where they were taken from.

## Files
- `prototype/pages/home.html`, `studio.html`, `case-bunnker.html`, `case-relats.html`: core screens.
- `prototype/pages/sector.html`, `sector-*.html`, `sectors.html`, `work.html`, `journal.html`, `article.html`: SEO pages (v3).
- `prototype/pages/shared.css`, `shared.js`:
  - Tokens and base styles.
  - Data: services `S`, projects `P`, client logos `CH`.
  - Footer, marquee, wordmark builder, sober switch.
- `prototype/pages/kit.css`, `kit.js`: cursor, magnetic, roll, segmented control, reveal, image sequence, gallery cycling.
- `prototype/pages/kit2.css`, `kit2.js`: smooth scroll, anchors, line and clip reveals, toast/copy, preloader, page init, drag carousel, tap gallery. Its dock and menu are replaced by `nav.js`.
- `prototype/pages/nav.css`, `nav.js`: the v3 navigation.
- `prototype/pages/sober.css`: the monochrome treatment (fold it into the base styles).
- `prototype/pages/case.css`: case, Studio and sector template. `seo.css`: sector, Work, Journal and Article.
- `prototype/pages/journal.js`, `journal/articles.js`: Markdown renderer and generated data (prototype only).
- `content/journal/*.en.md`: the nine articles.
