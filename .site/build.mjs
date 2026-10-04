// Static build for weareinfinit.com — no dependencies (Node ≥ 18).
//   node .site/build.mjs
// Writes /en/, /ca/, /es/ pages, the language gateway (/index.html), 404, sitemap, robots, _redirects, _headers.
// Cloudflare Pages serves the repo root as-is, so the generated files are committed.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, LANGS, ROUTES, url, abs, esc } from './lib.mjs';
import { T } from './i18n.mjs';
import { S, P, CLIENT_NAMES } from './data.mjs';
import { FOUNDER_LINKEDIN } from './seo.mjs';
import { home } from './pages/home.mjs';
import { studio } from './pages/studio.mjs';
import { bunnker } from './pages/bunnker.mjs';
import { relats } from './pages/relats.mjs';
import { industrial } from './pages/industrial.mjs';
import { automotive } from './pages/automotive.mjs';
import { food } from './pages/food.mjs';
import { pharma } from './pages/pharma.mjs';
import { realestate } from './pages/realestate.mjs';
import { tech } from './pages/tech.mjs';
import { family } from './pages/family.mjs';
import { international } from './pages/international.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = (p, s) => { const f = join(ROOT, p); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, s); };

// Cache-busting: short content hash per asset.
const V = {};
for (const f of ['base.css', 'home.css', 'inner.css', 'studio.css', 'site.js']) {
  V[f] = createHash('sha1').update(readFileSync(join(ROOT, 'assets/site', f))).digest('hex').slice(0, 8);
}

const PAGES = [
  { page: 'home', kind: 'home', render: home },
  { page: 'studio', kind: 'studio', render: studio },
  { page: 'bunnker', kind: 'work', render: bunnker },
  { page: 'relats', kind: 'work', render: relats },
  { page: 'industrial', kind: 'sector', render: industrial },
  { page: 'automotive', kind: 'sector', render: automotive },
  { page: 'food', kind: 'sector', render: food },
  { page: 'pharma', kind: 'sector', render: pharma },
  { page: 'realestate', kind: 'sector', render: realestate },
  { page: 'tech', kind: 'sector', render: tech },
  { page: 'family', kind: 'sector', render: family },
  { page: 'international', kind: 'sector', render: international },
];


let n = 0;
for (const lang of LANGS) {
  for (const p of PAGES) {
    const ctx = { lang, page: p.page, kind: p.kind, V };
    out(`${lang}/${ROUTES[p.page]}index.html`, p.render(ctx).replace(/<img (?![^>]*decoding=)/g, '<img decoding="async" '));
    n++;
  }
}

// Language gateway: saved choice → browser language → English. Crawlers get hreflang alternates.
const gateway = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(T.en.homeTitle)}</title>
<meta name="description" content="${esc(T.en.homeDesc)}">
<link rel="canonical" href="${SITE}/">
${LANGS.map(l => `<link rel="alternate" hreflang="${l}" href="${abs(l, 'home')}">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${SITE}/">
<meta name="theme-color" content="#060a0e">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/site/apple-touch-icon.png">
<script>(function(){var L=['ca','es','en'],s=null;try{s=localStorage.getItem('inf-lang')}catch(e){}
if(L.indexOf(s)<0){s='en';var n=navigator.languages||[navigator.language||''];for(var i=0;i<n.length;i++){var c=String(n[i]).slice(0,2).toLowerCase();if(L.indexOf(c)>-1){s=c;break}}}
location.replace('/'+s+'/'+location.search+location.hash)})()</script>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#060a0e;color:#eceff1;font:500 16px system-ui,sans-serif}nav{display:flex;gap:16px}a{color:inherit}</style>
</head>
<body>
<noscript><nav aria-label="Language">${LANGS.map(l => `<a href="${url(l, 'home')}" hreflang="${l}" lang="${l}">${{ en: 'English', ca: 'Català', es: 'Español' }[l]}</a>`).join('')}</nav></noscript>
</body>
</html>
`;
out('index.html', gateway);

// 404 (Cloudflare Pages serves /404.html with status 404).
out('404.html', `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Page not found — INFINIT©</title>
<meta name="robots" content="noindex">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/site/apple-touch-icon.png">
<link rel="stylesheet" href="/assets/site/base.css?v=${V['base.css']}">
<style>main{min-height:100svh;display:flex;flex-direction:column;justify-content:space-between;padding:22px var(--pad) 40px}h1{font-size:clamp(56px,10vw,184px);line-height:.92;letter-spacing:-.06em;font-weight:700}nav{display:flex;gap:10px;flex-wrap:wrap}</style>
</head>
<body class="dark">
<main><span class="lbl">404 · INFINIT©</span>
<div><h1 class="em">Page not <b>found.</b></h1><p class="lbl" style="margin-top:24px">No s’ha trobat la pàgina · No se ha encontrado la página</p></div>
<nav aria-label="Language">${LANGS.map(l => `<a class="gbtn" href="${url(l, 'home')}" hreflang="${l}" lang="${l}">${{ en: 'Home', ca: 'Inici', es: 'Inicio' }[l]} · ${l.toUpperCase()}</a>`).join('')}</nav></main>
</body>
</html>
`);

// Sitemap with hreflang alternates.
const today = new Date().toISOString().slice(0, 10);
out('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${PAGES.flatMap(p => LANGS.map(lang => `<url><loc>${abs(lang, p.page)}</loc><lastmod>${today}</lastmod>
${LANGS.map(l => `  <xhtml:link rel="alternate" hreflang="${l}" href="${abs(l, p.page)}"/>`).join('\n')}
  <xhtml:link rel="alternate" hreflang="x-default" href="${p.page === 'home' ? SITE + '/' : abs('en', p.page)}"/>
  <image:image><image:loc>${SITE}/assets/site/og/${p.page}.jpg</image:loc></image:image>
</url>`)).join('\n')}
</urlset>
`);


// Old URLs (previous site) → new English pages.
// Web app manifest (handoff: uses icon-512.png).
out('site.webmanifest', JSON.stringify({
  name: 'INFINIT©', short_name: 'INFINIT©', start_url: '/', display: 'browser',
  background_color: '#03050F', theme_color: '#03050F',
  icons: [
    { src: '/assets/site/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    { src: '/assets/site/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
  ],
}, null, 2) + '\n');

// robots.txt — search engines and AI assistants (training, search and user-triggered fetchers) are all welcome:
// being read and cited by ChatGPT, Claude, Perplexity, Gemini, Copilot… is the point.
const AI_BOTS = ['Googlebot', 'Google-Extended', 'Bingbot', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
  'anthropic-ai', 'PerplexityBot', 'Perplexity-User', 'Applebot', 'Applebot-Extended', 'DuckAssistBot', 'meta-externalagent', 'MistralAI-User', 'CCBot'];
out('robots.txt', `# INFINIT© — search engines and AI assistants are welcome. Summary for AI: ${SITE}/llms.txt
User-agent: *
Allow: /
Disallow: /project/uploads/

${AI_BOTS.map(b => `User-agent: ${b}`).join('\n')}
Allow: /
Disallow: /project/uploads/

Sitemap: ${SITE}/sitemap.xml
`);

// llms.txt (llmstxt.org): a plain summary for AI assistants, built from the same data as the pages.
const svcLines = S.map(s => `- **${s.n.en}** — ${s.t.en.join(', ')}`).join('\n');
const projLines = P.map(p => `- **${p.n}** — ${p.d.en}${p.page ? ` · case study: ${abs('en', p.page)}` : p.s === 'nda' ? ' (under NDA)' : ' (in progress)'}`).join('\n');
out('llms.txt', `# INFINIT©

> INFINIT© is a branding and strategy studio based in Barcelona, led hands-on by its founder Cesc Callejas. It helps growing mid-sized companies — roughly €1M to €200M in revenue, in Catalonia, Spain and the rest of Europe — build brands that scale: strategy, identity, websites, SEO & GEO, product and content. Senior people on every project, no layers. Works in English, Catalan and Spanish.

## Who INFINIT© works with
- Mid-sized and growing companies (about €1M–€200M revenue) going through growth, transformation or modernisation
- Often family-owned or founder-led Catalan and Spanish manufacturers and consumer-goods makers with international reach, whose brand has fallen behind the company they have become
- Sectors: industrial and B2B manufacturers, automotive and mobility (components, suspensions, wheels, vehicles, dealerships), food & beverage, technology, real estate / proptech and consumer brands
- Based in Barcelona; clients in Catalonia, Spain, Europe and worldwide

## Services
${svcLines}

## Selected work
${projLines}
- Experience across: ${CLIENT_NAMES}, plus Desigual, Casa Tarradellas, Mercadona, Santander, MartiDerm, Girbau, Seidor and Repsol

## Founder
- Cesc Callejas — founder, brand & strategy director. Two decades on both sides of the table: building brands and running the operations that depend on them.
- Track record shown on the studio page: a business built from scratch (€0 → €1.7M), +50% growth in two years, ×10 visibility.
- LinkedIn: ${FOUNDER_LINKEDIN}

## Contact
- Email: hello@weareinfinit.com
- Phone: +34 689 022 383
- Barcelona, Spain · LinkedIn: https://www.linkedin.com/company/weareinfinit/ · Instagram: https://www.instagram.com/weareinfinit.studio/

## Pages
- [Home (English)](${abs('en', 'home')}): studio overview, work, approach, services, contact
- [Studio (English)](${abs('en', 'studio')}): beliefs, founder, experience
- [Bunnker case study](${abs('en', 'bunnker')}): strategy, identity and digital for long-stay rentals — COAC Award
- [Relats case study](${abs('en', 'relats')}): repositioning a global leader in technical covering solutions (automotive, e-mobility, energy)
- [Industrial & B2B branding](${abs('en', 'industrial')}): how INFINIT© works with industrial and B2B companies — signs the brand is holding you back, process, FAQ (also in [Català](${abs('ca', 'industrial')}) and [Español](${abs('es', 'industrial')}))
- [Automotive & mobility branding](${abs('en', 'automotive')}): for component makers, aftermarket, vehicle and camper builders, dealer groups and e-mobility — process, prices, FAQ (also in [Català](${abs('ca', 'automotive')}) and [Español](${abs('es', 'automotive')}))
- [Food & beverage branding](${abs('en', 'food')}): food, beverage and consumer-goods brands — packaging system, retail, process, prices, FAQ (also in [Català](${abs('ca', 'food')}) and [Español](${abs('es', 'food')}))
- [Pharma, health & dermocosmetics branding](${abs('en', 'pharma')}): rigorous and human brands for pharma, OTC, dermocosmetics and health — process, prices, FAQ (also in [Català](${abs('ca', 'pharma')}) and [Español](${abs('es', 'pharma')}))
- [Real estate & proptech branding](${abs('en', 'realestate')}): developers, rentals, proptech and construction — Bunnker case (COAC Award), process, prices, FAQ (also in [Català](${abs('ca', 'realestate')}) and [Español](${abs('es', 'realestate')}))
- [Tech, startups & scaleups branding](${abs('en', 'tech')}): brand, website, SEO & GEO and fractional CMO for fast-growing tech companies — process, prices, FAQ (also in [Català](${abs('ca', 'tech')}) and [Español](${abs('es', 'tech')}))
- [Branding for going international](${abs('en', 'international')}): positioning, identity and multilingual website for companies selling abroad — process, prices, FAQ (also in [Català](${abs('ca', 'international')}) and [Español](${abs('es', 'international')}))
- [Family business branding](${abs('en', 'family')}): rebranding for family businesses in generational change, growth or internationalisation — process, prices, FAQ (also in [Català](${abs('ca', 'family')}) and [Español](${abs('es', 'family')}))
- Català: ${abs('ca', 'home')} · Español: ${abs('es', 'home')}
`);

out('_redirects', `# Previous site URLs → new language-prefixed pages
/index.html            /                    301
/studio.html           /en/studio/          301
/studio                /en/studio/          301
/work/bunnker/         /en/work/bunnker/    301
/work/bunnker          /en/work/bunnker/    301
/work/bunnker/index.html /en/work/bunnker/  301
/work/relats/          /en/work/relats/     301
/work/relats           /en/work/relats/     301
/work/relats/index.html  /en/work/relats/   301
`);

out('_headers', `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/assets/site/fonts/*
  Cache-Control: public, max-age=31536000, immutable
  Access-Control-Allow-Origin: *

# CSS/JS are referenced with a content hash (?v=…)
/assets/site/*.css
  Cache-Control: public, max-age=31536000, immutable
/assets/site/*.js
  Cache-Control: public, max-age=31536000, immutable

/llms.txt
  Content-Type: text/plain; charset=utf-8

/project/assets/*
  Cache-Control: public, max-age=604800
/work/*
  Cache-Control: public, max-age=604800
`);

if (!existsSync(join(ROOT, 'assets/site/og/home.jpg'))) console.warn('! OG images missing in assets/site/og/');
console.log(`built ${n} pages + gateway, 404, sitemap, robots, _redirects, _headers`);
console.log('asset versions', V);
