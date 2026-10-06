# Handoff: new favicon + bold ©

Two small changes for weareinfinit.com. Everything else stays the same.

1. **New favicon**: a bold © in ink on a sand tile.
2. **One © everywhere**: the same bold © replaces the Geist © glyph in the INFINIT© wordmark and is the navigation mark.

## Colours
- Ink `#0e0d0b`
- Sand `#DDCFB8`

## 1. Favicon
Copy the files in `favicon/` to the site's favicon folder, replacing the old ones, including the coloured `favicon-*.svg` variants. Then remove any script that swaps the favicon colour.

| File | Use |
|---|---|
| `favicon.svg` | Main icon, 32×32 viewBox, rounded tile (rx 7) |
| `favicon.ico` | 16, 32 and 48 px |
| `favicon-32.png` | Fallback |
| `apple-touch-icon.png` | 180 px, full-bleed (iOS rounds it) |
| `icon-512.png` | 512 px, full-bleed, for `site.webmanifest` |

```html
<link rel="icon" href="/assets/site/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/site/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/assets/site/apple-touch-icon.png">
```
Adjust the paths to the repo.

Favicon geometry, in a 32×32 viewBox: sand tile with `rx 7`, ring `r 10.5`, C arc `r 4.7` opening to the right (±42°), stroke `2.7`, ink.

## 2. The © in the wordmark and in the navigation
`copyright-mark.svg` is the mark on its own: a 32×32 viewBox, ring `r 13.2`, C arc `r 6` opening right (±42°), `stroke-width 3.3`, `stroke: currentColor`, `fill: none`.

```html
<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="13.2"/><path d="M20.46 11.99A6 6 0 1 0 20.46 20.01"/></svg>
```

**Wordmark (INFINIT©).** Where the wordmark adds the © (the `.r` span, at `.42em`, or `.2em` above 80px), put the SVG above inside the span instead of the "©" character. Add `role="img"` and `aria-label="©"` to the span.
```css
.wm .r svg{display:block;width:.86em;height:.86em;fill:none;stroke:currentColor;stroke-width:3.3}
```
The SVG takes the wordmark's text colour, so it is white on dark and ink on light.

**Navigation mark.** Use the same SVG inside the round mark (48×48 on desktop, 42×42 on mobile):
```css
.nv-mk svg{width:48px;height:48px;fill:none;stroke:currentColor;stroke-width:3.3}
```

**In running text**, keep writing "INFINIT©" with the normal character.

## Files
- `favicon/`: the five favicon files.
- `copyright-mark.svg`: the bold ©.
