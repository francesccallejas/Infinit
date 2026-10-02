# Infinit Studio — UI Kit

A high-fidelity recreation of the **Infinit Studio** marketing site: the public face of the strategy / identity / digital practice. Editorial, restrained, and dominated by typography.

## Files

| File | What it is |
|---|---|
| `index.html` | Click-thru prototype: Home → Services → Work → Contact |
| `Nav.jsx` | Sticky top navigation, with sub-brand switcher |
| `Hero.jsx` | "Brand & Strategy / designed to scale." hero |
| `Manifesto.jsx` | Negative-definition statement block |
| `Services.jsx` | Strategy / Identity / Digital triplet with deep-list |
| `WorkGrid.jsx` | Case-study grid, full-bleed-image tiles |
| `Footer.jsx` | Dark footer with contact + columns |
| `Contact.jsx` | Contact view with form |
| `tokens.css` | Imports the design system's `colors_and_type.css` and adds Studio-specific tweaks |

## Notes

- All copy in this kit is **lifted verbatim from the founder deck** wherever possible. Anything not in the deck (e.g. case-study summary lines) is clearly synthetic and ready for swap-in by the user.
- The kit uses **Inter** loaded from Google Fonts and **Lucide** icons from CDN — both already noted as substitutions in the root README.
- No real client photography exists in this project. Case-study tiles use solid-color frames with hairline detail in place of imagery, with the file path the user should drop a real photo into noted as a comment in `WorkGrid.jsx`.
