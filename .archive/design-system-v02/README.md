# Infinit® Design System — V02 (2026)

Sistema visual **viu** de [weareinfinit.com](https://weareinfinit.com). Extret directament del codi en producció (`style.css` v=338, `index.html`), així que el que hi ha aquí és el que es veu a la web avui.

> Substitueix el V01 (Inter + blau `#2C5BFF` + Source Serif), que està arxivat a `.archive/design-system-v01/` i **ja no s'ha d'usar**.

**Infinit®** és una firma de Brand & Strategy (Barcelona — Worldwide) que treballa a la intersecció de marca, tecnologia i negoci. Tres disciplines: **Strategy · Identity · Digital**. Claim: **Brands built to scale®** / *Built to scale.*

---

## Índex

| Fitxer / carpeta | Què és |
|---|---|
| `index.html` | **Comença aquí.** Pàgina viva amb totes les fitxes del sistema. |
| `colors_and_type.css` | Tokens: color, tipografia (+ càrrega de fonts), radis, layout, moviment, escala tipogràfica. |
| `components.css` | Components en versió estàtica, amb **els mateixos noms de classe que la web** (portables 1:1 a `style.css`). |
| `preview/` | Una fitxa HTML per token/component (01 color → 13 layout i moviment). |
| `ui_kits/website/` | Còpia fidel de la home en producció (HTML + `style.css` + `i18n.js`), amb rutes d'assets locals. Referència de composició real. |
| `assets/logo/` | Marca en SVG (ink, bg, blanc, menta), favicons (ink, clar, menta), lockup PNG. |
| `assets/imagery/` | Imatges de rotació del hero i dels casos. |
| `assets/clients/` | Logos de clients i reconeixements (Awwwards, COAC). |

Sense build: tot és HTML/CSS estàtic. Cada fitxa enllaça `../colors_and_type.css` i `../components.css`.

---

## Fonaments visuals

Tot el sistema es construeix amb **tipus, espai i un sol accent**. Res de formes decoratives, il·lustracions ni degradats (només scrims foscos sobre imatge). La contenció és la norma.

### Color

| Token | Valor | Ús |
|---|---|---|
| `--ink` | `#0B0C11` | Text principal sobre clar · canvas fosc (footer, serveis). Substitueix el negre. |
| `--deep` | `#08080C` | Negre més profund: scrims, intro, ombres. |
| `--bg` | `#F4F2F0` | Canvas clar (sorra càlida). **Mai `#FFFFFF`.** |
| `--paper` | `#FBFAF9` | Superfície / card sobre bg. |
| `--accent` | `#D8F3D6` | **Menta pàl·lida — l'únic accent.** Fons/badge/selecció/hover, sempre amb text ink. |
| `--accent-ink` | `#2F8F66` | Menta profunda per a text accent sobre fons clar. |
| `--sand-2` | `#EBE9E4` | Placeholder de tiles. |
| `--sand-3` | `#E7E2D9` | Card overview, 2a capa. |
| `--sand-4` | `#DCD5C8` | Banda CTA, card de serveis al bento. |
| `--sand-5` / `--clay` | `#A89887` | Només detalls. |
| `--muted` | `rgba(11,12,17,.56)` | Text secundari, eyebrows, `em` en subtítols. |
| `--line` | `rgba(11,12,17,.11)` | Hairline — **l'únic separador**. |
| Sobre fosc | `rgba(244,242,240,.42–.7)` | Eyebrows .42 · links .7 · claim .55 · línies .14 |

On va la menta (i només aquí): xip de fletxa del CTA principal, badge NEW, `::selection`, hover de botons suaus i del plus de servei, card “Let's talk”.

### Tipografia

| Família | Font | Ús |
|---|---|---|
| `--sans` | **Satoshi** (Fontshare, 300–900) | Tot: titulars, UI, cos. **Cos a pes 500**, no 400. Wordmark a 900. |
| `--serif` | **Instrument Serif** 400, recta (no cursiva) | Només accents `<em>` dins titulars i grans titulars editorials (accordion de serveis, claim del footer). |
| `--mono` | **IBM Plex Mono** 400/500 | Eyebrows, tags, chips, meta, rellotge, base del footer. |

Regles:
- **El titular és Satoshi; la paraula clau passa a Instrument Serif amb `<em>`**: “Brands built to *scale*”, “Selected *work.*”, “Let's *talk.*”, “One studio, *everything connected.*”
- `em` en subtítols / text petit → gris apagat (`--muted` o `.5`), no ink ple.
- Display gran i estret: `line-height .92–1`, `letter-spacing -.04 / -.05em`.
- **Eyebrows**: mono, 400, 12px, majúscules, `.2em` de tracking, color gris **fix** (no `opacity`, perquè el reveal `.r` anima l'opacitat).
- `body` **ha de tenir** `-webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility;` (si no, tot es veu massa gruixut).

Escala (classes a `colors_and_type.css`):

| Classe | Mida | Pes / lh / tracking | On |
|---|---|---|---|
| `.t-hero` | clamp(52–168px) | 500 / .92 / -.04em | Hero |
| `.t-display` | clamp(44–128px) | 500 / 1 / -.045em | CTA band |
| `.t-svc` | clamp(54–150px) | 500 / .92 / -.05em | Cards de servei |
| `.t-serif-xl` | clamp(44–142px) | Serif / .92 | Claim del footer |
| `.t-serif-l` | clamp(38–96px) | Serif / 1 | Títols accordion |
| `.t-h1` | clamp(30–67px) | 500 / 1.22 / -.025em | Statement |
| `.t-h2` | clamp(28–52px) | 500 / 1.08 / -.03em | Capçalera de secció |
| `.t-h3` | clamp(24–40px) | 600 / 1.1 / -.03em | KPIs, “Selected work.” |
| `.t-h4` | clamp(17–22px) | 600 | Botons grans, subtítols |
| `.t-lead` | clamp(16–21px) | 500 / 1.62 | Descripcions |
| `.t-body` | 18px | 500 / 1.6 | Cos |
| `.eyebrow` | 12px mono | 400 / .2em / upper | Labels de secció |
| `.tag-line` | 10px mono | upper | Tags de projecte |

### Logo

- **Marca**: dos squircles (80×88, `rx 34`, separats 8 unitats) — `viewBox 0 0 240 132`.
- **Wordmark**: `infinit` en minúscula, Satoshi 900, `-.035em`, amb `®` petit en superíndex. En text corrent: **Infinit®**.
- **Living mark**: el 2n squircle fa l'ullet (`scaleY .12`) cada ~5 s. A la intro, els dos squircles entren escalant i fan un “wink” en ona; després la cortina puja.
- Sobre imatge: blanc amb `mix-blend-mode: difference`.

### Layout

- Contenidor centrat: `--maxw 1840px`, `--pad clamp(26px, 4.5vw, 80px)`, `--edge = --side + --pad` (logo, nav i seccions full-bleed s'alineen amb `.wrap`).
- Ritme vertical molt generós: `--section clamp(96px, 15vh, 200px)`; seccions principals de 110–260px de padding.
- Composicions centrades per a manifestos (statement, CTA, capabilities); graella asimètrica de 3 columnes per al treball (tiles 3/4 · 1/1 · 5/4).
- Separació = hairline o canvi de fons. Ombres només per a elements flotants (barra, overlay, fab).

### Radis

`--r-pill 999px` (chips, lang, dots) · `--r-lg clamp(16–22px)` (panell que puja sobre el hero) · **`--r 14px` estàndard** (menú, cards, tiles, imatges, botons) · `10px` xip de fletxa · `--r-sm 9px` (thumbs).

### Superfícies de vidre (frost)

Barra de menú, overlay, cookies i fab: `rgba(30,30,36,.62)` + `blur(22px) saturate(120%)` + `0 14px 50px rgba(8,8,12,.3)`. Sobre seccions clares passa a frost clar `rgba(255,255,255,.34)` amb text ink (`.on-light`), amb crossfade.

### Moviment

- `--ease: cubic-bezier(.22,1,.36,1)` per a tot. Reveals: `--ease-rev cubic-bezier(.16,1,.3,1)`.
- **Un sol primitiu de reveal**: `.r` → `.r.in` (translateY 34px + opacitat, 1.15s; delays `.d1 .12s / .d2 .24s / .d3 .36s`).
- Scroll suau amb **Lenis** (`lerp: 0.09, smoothWheel: true`).
- **iconFly**: la fletxa ↗ surt per dalt-dreta i torna per baix-esquerra al hover.
- Statement: les paraules s'encenen (opacitat .2 → 1) amb el scroll.
- Menú: la card cau (clip-path), les paraules pugen enmascarades en seqüència; hover = “roll” vertical a una còpia atenuada. Dots: giren 45° al hover.
- Hero: crossfade d'imatges conceptuals cada 3,5 s.
- Footer fix que es revela quan el `main` hi passa per sobre (fade + blur del contingut).
- Sempre amb fallback `prefers-reduced-motion`.

### Imatgeria

Fotografia editorial i conceptual (producte, arquitectura, paisatge, retrat), sovint amb un sol subjecte i molt d'aire. Full-bleed al hero i als tiles; scrim inferior fosc per llegir el text en blanc. Logos de client sempre en blanc (`filter: brightness(0) invert(1)`) sobre imatge.

### Iconografia

Mínima: fletxa ↗ (stroke 2.2–2.4, round), creu de tancar, plus/menys fet amb dues línies, i els 4 dots del menú. Res d'icones il·lustratives ni emoji.

---

## Components (`components.css`)

| Component | Classe(s) | Notes |
|---|---|---|
| Logo | `.logo-lockup` (`.lg`, `.wink`) | Marca + wordmark |
| CTA principal | `.cta-mail` (`.sm`) | Ink + xip fletxa menta; invertit sobre fosc |
| Botó suau | `.btn-soft` | 6% ink, hover menta |
| Outline | `.btn-outline` | Sobretot sobre fosc / frost |
| Silenciós | `.btn-quiet` | Text gris |
| Link fletxa | `.link-arrow` | Minúscula, el gap creix al hover |
| Icona / plus / dots | `.btn-icon` · `.btn-plus` · `.mbar-dots` | |
| Chips / badge / tag | `.chip` · `.badge-new` · `.tag-line` | |
| Idioma | `.lang` (`.open`, `button.on`) | Píndola col·lapsable CA/ES/EN |
| Frost | `.frost` (`.on-light`) | Base de vidre |
| Barra de menú | `.mbar` + `.mbar-right` | |
| Overlay menú | `.mmenu-card`, `.mmenu-nav`, `.mmenu-aside`, `.mmenu-foot` | |
| Mini card | `.ovcard` · `.fab` | Thumb + text + acció |
| Cookies | `.cookies.frost` | |
| Hero | `.hero-card`, `.hero-scrim`, `.hero-inner`, `.hero-foot` | |
| Statement | `.statement`, `.stmt-line`, `.stmt-sub` | |
| Capabilities | `.cap-acc`, `.cap-item`, `.cap-row`, `.cap-ttl`, `.cap-body` | Sobre ink |
| Fila de servei | `.svc-row` | Hover → ink + chips |
| Work | `.work-grid`, `.tile` (`.tall/.mid/.short`), `.tile-cap`, `.logo-over` | |
| Bento | `.bento`, `.b-card` (`.sand`, `.mint`) | |
| KPIs | `.kpi-grid`, `.kpi` | |
| CTA band | `.cta-band` | Sorra-4 |
| Footer | `.foot`, `.foot-grid`, `.foot-col`, `.foot-bot`, `.foot-base` | Ink, claim serif |

---

## Veu i copy

L'idioma per defecte de la web és **anglès** (amb CA/ES via i18n). To editorial, declaratiu, segur, sense estridències.

- **Frases curtes**, sovint d'una sola clàusula. Acaben amb punt: *Selected work.* *Built to scale.* *Let's talk.*
- **“We”**, mai “I”. Infinit parla com a firma.
- **Triplets**: *Strategy · Identity · Digital*; *strategy, identity and digital — connected.*
- **Parelles amb contrapunt**: *Strategic credibility, aesthetic sophistication.* *Three disciplines. One studio.*
- La paraula clau de cada titular va en serif (`<em>`).
- Sense signes d'exclamació ni emoji. Evitar: *disrupt, revolutionary, cutting-edge, supercharge, unlock, game-changing, synergy, magic, AI-powered*.

Frases de referència (web actual):

> Brands built to *scale*®
> A strategic brand and digital firm for companies navigating *growth*, transformation and *modernization*.
> Strategic credibility, *aesthetic* sophistication.
> Building brands that *move* business *forward.*
> Three disciplines. One studio.
> One studio, *everything connected.*
> Brands built *to scale.* — Start the conversation

Contacte: hello@weareinfinit.com · +34 689 022 383 · Barcelona — Worldwide.

---

## Fonts — càrrega

```html
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,600,700,900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

(`colors_and_type.css` ja les importa.)

## Portar canvis a la web

Els noms de classe de `components.css` coincideixen amb `style.css` de producció. Per a pàgines noves de la web: copiar `index.html` com a base (regla #1 de `CLAUDE.md`) i, si es toca `style.css`, pujar `?v=NNN` a tots els HTML.
