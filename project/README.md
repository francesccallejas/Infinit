# Infinit Design System

A brand and product design system for **Infinit** — a hybrid firm operating across strategy, branding, digital, growth and advisory. Infinit is neither a traditional creative agency nor a classic consultancy: it is a contemporary, system-driven practice helping companies structure, scale and evolve.

The system covers two connected practices that share one visual ecosystem:

| Practice | Focus | Tone |
|---|---|---|
| **Infinit** (Studio) | Strategy, Identity & Digital | More expressive, creative, cultural |
| **Infinit Advisory** | Enterprise architecture, systems, data & AI | More structured, technical, strategic |

Both sit under the same wordmark (`infinit ⓒ`), share the same typography and palette, and only diverge in pacing, copy register, and the density of editorial layout.

---

## Positioning at a glance

> **Brand & Strategy designed to scale.** (Studio)
> **Strategic & Digital Architecture designed to scale.** (Advisory)

> Not another creative agency. Not a traditional consultancy.
> We work at the intersection of brand, technology and business.
> Defining direction. Structuring ambition. Designing for scale.

The brand should feel: **intelligent · minimal · international · elegant · system-driven · contemporary · premium · timeless**.

It should NOT feel: startup-y, generically "tech", AI-futuristic, corporate-consulting, or flashy-agency.

Visual references the founder pointed to: **Instrument, Basic/Dept, Porto Rocha, Someform**, modern boutique consultancies, Swiss / minimal editorial systems, contemporary luxury tech aesthetics.

---

## Sources

| Source | Where it lives |
|---|---|
| Founder brand deck — 54 slides covering positioning, services, palette, type, and reference imagery | `uploads/Infinit vF - Studio & Advisory.pdf` |
| Verbatim extracted copy from the deck | quoted throughout this README and the UI kits |

There is no production codebase or Figma file yet. Everything here is derived from the deck, the written brief, and the named visual references.

---

## Index of this system

| File / folder | What it is |
|---|---|
| `README.md` | This file. High-level context, content & visual foundations, iconography. |
| `SKILL.md` | Cross-compatible Agent Skill front matter. |
| `colors_and_type.css` | All color and typography tokens (base + semantic) as CSS custom properties. |
| `fonts/` | Self-hosted webfonts used by the system. |
| `assets/` | Logos, marks, and reusable visual assets. |
| `preview/` | One small HTML card per token/component for the Design System tab. |
| `ui_kits/infinit/` | Studio marketing site UI kit (homepage, services, case study, contact). |
| `ui_kits/infinit-advisory/` | Advisory site UI kit (homepage, services, methodology, leadership). |
| `slides/` | Editorial 16:9 slide templates derived from the founder deck. |
| `index.html` | **Brand System LIVE** — the live index that surfaces every deliverable on one page. **Start here.** |

---

## Live deliverables — V01 handoff

The system is locked at **V01 · 2026**. All previous iterations have been cleared. Every deliverable below is production-ready.

| # | Deliverable | Path | Notes |
|---|---|---|---|
| 00 | **Live index** | `index.html` | Surfaces all seven deliverables in one page. Open this first. |
| 01 | **Brand System snapshot** | `preview/01-brand-system.html` | Final end-to-end snapshot — slogan, marquee, two-practices, services, work, KPIs, founder. |
| 02 | **Company deck** | `slides/index.html` | 10 slides, 1920×1080, built on `deck-stage.js`. Cover · slogan · two practices · services · work · KPIs · founder · close. |
| 03 | **Business card** | `preview/03-business-card.html` | Front + back, two colour-ways (Warm/Deep · Warm/Studio Blue). 85 × 55 mm, Mohawk 350 gsm. |
| 04 | **Merchandising** | `preview/02-merch.html` | Seven items: bottle, pen, notebook, mug, t-shirt, cap, tote. One imprint system across all surfaces. |
| 05 | **Studio site (UI kit)** | `ui_kits/infinit/` | Brand & strategy site mock. |
| 06 | **Advisory site (UI kit)** | `ui_kits/infinit-advisory/` | Architecture / platforms / data & AI site mock. |
| 07 | **Foundations** | `colors_and_type.css` + `preview/*` | Tokens, type, spacing, components. |

### Tokens (final)

| Token | Value | Use |
|---|---|---|
| `--ink` | `#00041C` | Primary text on light. |
| `--deep` | `#000728` | Dark canvas. |
| `--studio` | `#2C5BFF` | Single accent — links, mark on dark, italic-serif emphasis. |
| `--warm` | `#F3F0EF` | Light canvas. |
| `--warm-50` | `#FAF8F7` | Tile / card surface. |
| `--warm-200` | `#E6E2E0` | Subtle elevation. |
| `--blue-gray` | `#7F838B` | Secondary text. |
| `--line` | `rgba(0,4,28,.10)` | Hairline dividers. |
| `--sans` | `Inter, …` | All UI + body. |
| `--serif` | `"Source Serif 4", …` | Italic-300 only, for editorial emphasis ("scale.", "designed to scale."). |
| `--mono` | `"JetBrains Mono", …` | Imprint codes, file refs. |

### The slogan

> *Designed to scale.*

Used as a flat tagline (Inter) on the snapshot hero and as an italic-serif accent (Source Serif 4, light, Studio Blue) on every other surface — back of business card, mug, tote, deck close. It is the only line that travels with the mark.

### Handoff to Claude Code

This project is ready to import into a developer environment:

1. Copy the repo as-is. `index.html` is the entry point.
2. `colors_and_type.css` is the single source of design tokens — wire it into your CSS pipeline first.
3. Self-host **Inter** and **Source Serif 4** (currently loaded via Google Fonts) for production.
4. Replace the SVG product mocks in `preview/02-merch.html` with real product photography when available.
5. Replace placeholder client logos under `assets/clients/` with vectors when available.
6. The deck uses `slides/deck-stage.js` (a small web component); keep it co-located with `slides/index.html`.

No build step is required — every HTML file is standalone and references `colors_and_type.css` by relative path.

---

## Content fundamentals

Infinit's copy is **editorial, declarative, and structurally clear**. It reads more like a manifesto or a financial-grade prospectus than like marketing. The default register is professional, slightly formal, and confident without bravado.

### Voice rules

- **Sentences are short.** Often one clause. They can stand alone on a line.
  > *We don't build brands for today. We build brands prepared for what's next.*
- **Use "We", never "I".** Infinit speaks as a firm. "You" is rare — the reader is implied, not addressed.
- **Statement, then counter-statement.** A recurring rhythm:
  > *Not another creative agency. Not a traditional consultancy.*
  > *Not a traditional consultancy. Not a system integrator.*
- **Verbs first when describing the practice.** *Defining direction. Structuring ambition. Designing for scale.*
- **Triplets are a signature.** Three nouns, three verbs, three services. Studio's pillars: *Strategy / Identity / Digital*. Advisory's: *Architecture / Platform Strategy / Data & AI*.
- **Headlines are sentences, not slogans.** They end in a period. *Structure made visible.* *Where identity scales.* *The discipline behind growth.*

### Casing & punctuation

- **Wordmark is always lowercase** with the ⓒ mark trailing: `infinit ⓒ`. Never capitalise the *i*. Sub-brand reads `infinit ⓒ advisory` or `infinit ⓒ studio`.
- **Section titles are sentence-case with a terminal period** in the deck style: *Our Services.* *Our approach.* *The leadership.*
- **Service lists** use a leading bullet glyph `•` and Title Case items: *Brand Strategy*, *Visual Identity*, *AI-enabled Growth Opportunities*.
- **Avoid exclamation marks.** Never. They break the register.
- **Avoid emoji.** The ⓒ mark is the only glyph treated as ornamentation, and only inside the wordmark.

### Vocabulary the brand uses

`direction · structure · scale · system · architecture · clarity · ambition · discipline · operate · evolve · coherent · distinctive · governance · roadmap · ecosystem`

Avoid: *disrupt, revolutionary, cutting-edge, supercharge, unlock, game-changing, leverage, synergy, journey, magic, AI-powered* (especially the last — Infinit talks about AI as architecture, not as a buzzword).

### Example copy patterns

| Pattern | Example |
|---|---|
| **Tagline split across two lines** | *Brand & Strategy* / *designed to scale.* |
| **"is a … firm that …"** | *infinit ⓒ is a brand & strategy firm that brings direction for companies building their next stage of growth.* |
| **Service column** | A short verb-phrase headline (*Structure made visible.*), a one-paragraph rationale, then a bulleted list. |
| **Negative definition** | *We don't build brands for today.* / *We don't implement tools.* |

---

## Visual foundations

The whole system is built from **type, space, and one accent of blue**. There are no decorative shapes, no gradients, no illustrative ornaments. Restraint is the default.

### Colour

Four colours, no more, from the deck:

| Token | Hex | Role |
|---|---|---|
| Deep blue | `#000728` | Primary text on light; canvas in dark mode. Replaces black. |
| Warm gray | `#F3F0EF` | Canvas in light mode. A neutral with a faint warm cast — never pure white. |
| Light blue | `#2C5BFF` | Single accent. Links, the ⓒ mark on dark backgrounds, micro-interactions, key emphasis. Used sparingly. |
| Blue gray | `#7F838B` | Secondary text, captions, dividers, muted UI. |

Light mode and dark mode are both first-class. The light canvas is warm gray (never `#FFFFFF`); the dark canvas is deep blue (never pure black). Hover states darken or lighten by ~6–10% — no extra hues are introduced.

### Typography

A single typeface family — **Inter** — used at editorial scale.

- **Display sizes are large and tight.** Hero numerals and statements hit 120–200px with `letter-spacing: -0.02em` and `line-height: 0.95`.
- **Headings are still type, not graphics.** Weights stay in the 400–600 range; the brand does not use 700+ except for very small UI labels (and even there, it's preferred to scale up rather than embolden).
- **Body is 16–18px / 1.55** with `letter-spacing: -0.005em` for warmth.
- **Tags / eyebrows** are 12px, uppercase, `letter-spacing: 0.12em`, weight 500.
- **Numbers** are tabular (`font-variant-numeric: tabular-nums`) wherever they line up in columns.

### Spacing

An 8px base grid, expressed as power-of-two-ish steps: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192`. Section vertical rhythm is generous — 128–192px between major editorial blocks. Density inside the Studio brand is looser; Advisory is tighter and more table-like.

### Layout

- **Editorial grid: 12 columns, 24px gutter.** Most layouts only use 1–3 strong vertical alignments per page.
- **Long left rails of text against a short right column** is the signature service-page layout (see slide 10/20 of the deck).
- **Triplet columns** (Strategy / Identity / Digital) recur — three equal columns with a one-word headline, a paragraph, then a bullet list.
- **Generous left margin** (≈8% on desktop) so titles breathe.
- A **horizontal hairline** (`1px solid #000728` at 12% alpha, or `#7F838B` at 30%) is the only divider primitive. No box-shadows for separation.

### Backgrounds

Solid `#F3F0EF` or solid `#000728`. No gradients. No textures. No imagery as background except in dedicated "case study" or "campaign" layouts, where a single full-bleed photograph is the entire frame.

### Imagery

When imagery appears (case studies, campaign decks), it is:

- **Cool, slightly desaturated**, occasionally near-monochrome.
- **Industrial / architectural / product-photography** in subject — Relats's covering solutions and similar B2B subjects shown in the deck.
- **Full-bleed or full-column** — never floated inside text, never with rounded corners.
- Set against the deep-blue or warm-gray canvas with white space, not framed inside a card.

### Motion

Subtle and slow.

- Default easing: `cubic-bezier(0.2, 0.6, 0.2, 1)` (a soft material-style ease).
- Entrances: **opacity 0 → 1 over 600–800ms**, optionally with an 8px upward translate.
- Hover transitions: **150ms** on color and border.
- No bounces, no spring overshoots, no parallax. Motion exists to acknowledge intent, not to perform.

### Hover / press

- **Hover (links, buttons):** opacity 1 → 0.72, or background darkens by 6%. The accent blue darkens to `#1F47D6`.
- **Press:** scale `0.98`, instantaneous (no transition on the press, only on the release).
- **Focus:** 2px outline in `#2C5BFF`, offset 2px. Never use the browser default.

### Corner radii

- Buttons & inputs: `6px`.
- Cards / images: `4px` if anything, but the default is **no radius** — content meets the canvas edge.
- Pills / tags (used very sparingly): `999px`.

### Borders, dividers, shadows

- **Borders:** 1px in `#000728/12` or `#7F838B/30`. Never coloured borders.
- **Dividers:** the same 1px hairline. Used between sections, not around them.
- **Shadows:** essentially none. If a floating surface is needed (a menu, a modal), use `0 1px 2px rgba(0,7,40,0.06), 0 24px 48px -16px rgba(0,7,40,0.18)` — soft, blue-tinted, never grey.

### Cards

The system does not lean on cards. When a "card" is needed (a case study tile, a service module), it is built from type + a 1px top hairline + generous internal padding (32–48px) and **no enclosing border**. The block is defined by its alignment, not its frame.

### Transparency & blur

- Used **only** for sticky headers in scroll: `background: rgba(243,240,239,0.78); backdrop-filter: blur(16px);` over the warm-gray canvas (or the deep-blue equivalent on dark).
- Not used decoratively. No glass effects, no frosted cards.

### Fixed / sticky elements

- **Top nav** is sticky, always 64–72px tall, with the wordmark left and a 4–5 item link cluster right.
- **Contact email** (`hello@weareinfinit.com`) often appears bottom-left as a near-fixed footer note on title slides.

---

## Iconography

See the dedicated **Iconography** section below; the short version: **the brand is almost icon-free**. The only persistent glyph is the ⓒ mark in the wordmark, plus a 16px arrow (`→`) used as the universal "next" / "read more" affordance.

### Approach

- **No icon family is used in the marketing or brand material.** The deck contains zero decorative icons — every visual signal is carried by type, spacing, or a hairline.
- For functional UI (forms, navigation, advisory dashboards), **Lucide** is the substitute set we link from CDN: thin 1.5px stroke, no fill, square-cap, 24px nominal box. It matches the brand's restraint and Swiss-leaning geometry. *Substitution flagged — no in-house icon set exists yet.*
- **Unicode glyphs in active use:** `ⓒ` (the brand mark), `→` (next / link affordance), `•` (bullet in service lists), `—` (em dash as a structural separator), `·` (middle dot for in-line metadata).
- **Emoji are never used.** Not in product, not in marketing, not in slides.
- **Logos & wordmarks** sit in `assets/`. The primary mark is the wordmark `infinit ⓒ`; there is no separate icon mark.

---

## Type & font substitution note

The deck specifies **Inter** as the brand typeface. We load Inter from Google Fonts at weights 400/500/600 (the only weights the system uses) — this is the canonical Inter, no substitution needed. If a future direction wants a more editorial display face (similar to Söhne, Neue Haas Grotesk Display, or GT America), we'll flag and swap it here.

> **Action item for the user:** confirm Inter is the locked typeface, or send a final display face if one has been chosen. The system is built so a single `--font-display` swap propagates everywhere.
