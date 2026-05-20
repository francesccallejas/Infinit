# Infinit® — Design System (V2)

> Brand & Strategy studio site. One grid, one type scale, one motion system.
> Static HTML/CSS/JS. Lenis smooth scroll + GSAP ScrollTrigger.
> Files: `v2/index.html` · `v2/style.css` (tokens in `:root`).

---

## 1 · Color

| Token | Hex / value | Use |
|---|---|---|
| `--bg` | `#F4F2F0` | Page background (cream) |
| `--paper` | `#FBFAF9` | Raised surfaces, lightest card |
| `--ink` | `#0B0C11` | Text, dark sections (blue-black) |
| `--deep` | `#08080C` | Deepest dark zones |
| Mist | `#E7E2D9` | Warm gray — mid card / frosted tint |
| Sand | `#DCD5C8` | Warm gray — deepest card, CTA band |
| `--accent` | `#EFE6AE` | Chamomile yellow — **ACCENT ONLY** |
| Body text | `rgba(11,12,17,.82)` | Long-form sans copy |
| `--muted` | `rgba(11,12,17,.56)` | Secondary / serif taglines / mono labels |
| `--line` | `rgba(11,12,17,.11)` | Hairlines, borders |

**Rule:** the yellow is never a full background — only badges, hover fills, arrows, small accents. Warm grays (Paper → Mist → Sand) are the neutral family for zones (services stack, CTA, bento card).

---

## 2 · Typography

| Family | Role | Weights |
|---|---|---|
| **Hanken Grotesk** (`--sans`) | Primary / structure | 400 body · 600 display · 900 logo |
| **Instrument Serif** (`--serif`) | Accent / concept | 400 — **always upright, never italic styling** |
| **IBM Plex Mono** (`--mono`) | Labels / eyebrows / numbers / tags | 400–500 |

- All display headings: **weight 600**.
- Serif used for `em`, signature words (`scale®`, `growth.`) and taglines — it's the "idea" voice.
- Mono: 11–13px, `letter-spacing .12–.2em`, UPPERCASE.
- Body: 17px / line-height 1.6 / color `rgba(11,12,17,.82)`.
- Hero h1: `clamp(78px, 12.5vw, 238px)`, `letter-spacing -.05em`.
- Section heads: `clamp(34px, 4.4vw, 78px)`.

---

## 3 · Radius scale

| Tier | Value | Applies to |
|---|---|---|
| Inner badges | `10px` | arrow squares inside buttons |
| Controls | `12px` | buttons, mail CTA, ov-close, cookie buttons |
| Cards & media | `16px` | photos, work tiles, bento cards, KPI grid, reel window, claim window, fab, menu-card, cookies |
| Large panels | `20px` | pull-down menu, services stack cards, intro push-up |
| Pills / chips | `999px` | scroll pill, subservice chips, status pills, reel circle controls |

---

## 4 · Spacing & grid

- `--section: clamp(96px, 15vh, 200px)` — vertical section rhythm.
- Centred container: `--maxw: 1840px`, `--pad: clamp(26px, 4.5vw, 80px)`, `--edge = side + pad` (logo / nav / full-bleed align to the centred `.wrap`).
- Section-head bottom margin: `clamp(18px, 2.2vw, 36px)`.

---

## 5 · Motion

- Easing: `--ease: cubic-bezier(.22, 1, .36, 1)`.
- Engine: **Lenis** smooth scroll + **GSAP ScrollTrigger** (synced via `gsap.ticker` + `lenis.on('scroll', ScrollTrigger.update)`).
- Reveal primitive: `.r` → `opacity 0 → 1` + `translateY(22px) → 0`; delays `.d1/.d2/.d3`. Triggered by IntersectionObserver.
- `@media (prefers-reduced-motion)` disables transforms.

**Signature moments**
- **Image-filled words** — `scale®` (hero) & `growth.` (approach): serif/sans with a drifting image via `background-clip:text`.
- **Reel** — small window grows to full-bleed on scroll, montage → frame video → logo, frosted controls + ambient audio.
- **Services sticky stack** — 3 cards stack on scroll; previous card scales down + dims (depth).
- **Pull-down menu** — cream frosted drawer slides from top, rounded bottom (20px), push-up to close, staggered link reveal.
- **Overview** — frosted dark bento overlay (Work / Services / Studio / Approach), opened by a floating "NEW" card + a menu mini-card.
- **Intro** — ink splash lifts up with rounded bottom corners.

---

## 6 · Components & section order

`Nav (logo · Contact pill · hamburger)` → pull-down menu · Overview overlay + floating card

Page: **Hero** → **Statement** ("What we do" manifest) → **Reel** → **Approach** ("We're built for growth.") → **Claim** (Connected window) → **Services** (sticky stack) → **Work** (tiles + COAC/Awwwards badges) → **Studio** (bio · KPIs 2×3 · photo · LinkedIn button · clients marquee) → **CTA band** (sand, dark mail pill + accent arrow) → **Footer** (waving brandmark · email · +34 689 022 383 · Barcelona — Worldwide).

---

## 7 · Voice / contact

- Email: `hello@weareinfinit.com`
- Phone: `+34 689 022 383`
- Location: Barcelona — Worldwide
- Tagline: *Built to scale.*
