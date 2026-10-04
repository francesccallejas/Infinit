---
name: infinit-design
description: Use this skill to generate well-branded interfaces and assets for Infinit® (weareinfinit.com), either for production or throwaway prototypes/mocks. Contains the live V02 design system — Satoshi + Instrument Serif + IBM Plex Mono, ink/sand palette with a single mint accent, two-squircle logo — plus tokens, components, previews and a faithful copy of the live homepage.
user-invocable: true
---

Read `README.md` in this folder first (written in Catalan), then explore `colors_and_type.css`, `components.css`, `preview/` and `ui_kits/website/`.

- This is the **current (V02)** system extracted from the production site. Ignore anything in `.archive/design-system-v01/` (old Inter + blue system).
- For visual artifacts (slides, mocks, prototypes), link `colors_and_type.css` + `components.css`, copy assets from `assets/`, and output static HTML.
- For production code, reuse the class names in `components.css` — they match the live `style.css`.
- Non-negotiables: Satoshi body at weight 500 with `-webkit-font-smoothing: antialiased`; key word of each headline in Instrument Serif via `<em>` (upright, not italic); mono uppercase eyebrows with `.2em` tracking in a fixed muted colour; canvas `#F4F2F0` (never pure white) or ink `#0B0C11`; mint `#D8F3D6` is the only accent and is used sparingly; 14px standard radius; hairlines instead of shadows; `cubic-bezier(.22,1,.36,1)` easing.
- Default site copy is English; the user speaks Catalan.

If invoked without guidance, ask what they want to build, then act as an expert designer for this brand.
