# Infinit® website — working conventions

## ⚠️ RULE #1 — New pages: COPY the home, then edit
When creating ANY new page (case study, landing, sub-page), **start by copying `index.html`** (the home) as the base and edit from there. **Never build a page from scratch.**

Why: it guarantees every shared element is byte-identical from the start — the top bar + overlay menu (`mbar`/`mmenu`), the footer (`foot`), typography, `-webkit-font-smoothing: antialiased`, Lenis smooth scroll, the `:root` design tokens, eyebrows, serif accents, etc. Building fresh and then reconciling differences one by one wastes time and credits. Copy first, customise second.

- The shared chrome (menu + footer) and base styles live in `index.html` / `studio.html` + `style.css`. Reuse them verbatim — don't re-port or re-type them.
- If a page needs its own inline styles, still inherit the tokens and body rules from the home.

## Deployment
- GitHub `main` → Cloudflare Pages → **weareinfinit.com** (auto-deploys on push to `main`).
- **Dot-prefixed folders are NOT deployed** (`.lab`, `.archive`, `.chats`). Prototypes / WIP cases live in `.lab/`.
- After editing `style.css`, **bump the cache version** `style.css?v=NNN` in every HTML that links it (`index.html`, `studio.html`, …). Same for `i18n.js?v=NNN`.

## Brand tokens (source of truth: `style.css` `:root`)
- `--ink:#0B0C11` · `--deep:#08080C` · `--bg:#F4F2F0` · `--paper:#FBFAF9`
- `--accent:#D8F3D6` (pale mint, with ink text) · `--accent-ink:#2F8F66`
- Muted/secondary text = `--muted: rgba(11,12,17,.56)`; on dark ≈ `rgba(244,242,240,.5–.6)`
- Fonts: `--sans/--menu-font:"Satoshi"` · `--serif:"Instrument Serif"` · `--mono:"IBM Plex Mono"`
- Serif `em` accents render in **muted grey**, NOT full white/ink.
- Eyebrows: mono, weight 400, uppercase, `.2em` tracking, muted grey (use a fixed colour, not `opacity`, because `.r` reveal animates opacity).
- `body` MUST have `-webkit-font-smoothing:antialiased; text-rendering:optimizeLegibility;` (otherwise all text looks too bold).
- Smooth scroll: `new Lenis({ lerp:0.09, smoothWheel:true })`.
- Layout: `--maxw:1840px`, `--pad:clamp(26px,4.5vw,80px)`, `--edge:calc(--side + --pad)`.

## Menu / footer behaviour to preserve
- Overlay menu opens on **click** of the dots (`#menuBtn`); dots rotate 45° on hover.
- Logo "living mark": the 2nd squircle winks (`markWink`, every ~5s).
- Adaptive frost: `.mbar.on-light` toggled by scroll when over light sections.
- Footer is `position:fixed` and revealed as `main { margin-bottom:100vh }` scrolls over it.
- Language pill `.lang` is collapsible (shows active lang, expands on click); lives in the menu foot row and the page footer.
