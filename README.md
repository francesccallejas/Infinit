# weareinfinit.com

Marketing site for **INFINIT©** — Brand & Strategy studio, Barcelona.
Static, multilingual (EN / CA / ES), deployed by Cloudflare Pages from `main`.

```bash
node .site/build.mjs        # regenerate /en /ca /es, gateway, sitemap, redirects…
python3 -m http.server 8080 # preview at http://localhost:8080/
```

Conventions and architecture: see [`CLAUDE.md`](CLAUDE.md).
Design reference: `.handoff/design_handoff_infinit_website/`.
