// Shared page chrome: <head>, navigation (v3: © mark + glass pill + menu card), footer, toast.
import { SITE, LANGS, LOCALE, EMAIL, PHONE, LINKEDIN, INSTAGRAM, url, abs, esc, A, wm, pngDim, MARK_SVG, ogName, icons } from './lib.mjs';
import { existsSync } from 'node:fs';
import { graph } from './seo.mjs';
import { T } from './i18n.mjs';

// Strings the client script needs.
const jsT = t => ({ copyToast: t.copyToast, copied: t.copied, firm: t.firm, loc: t.loc, soundOn: t.soundOn, soundOff: t.soundOff, vPause: t.vPause, vPlay: t.vPlay, cPause: t.cPause, cPlay: t.cPlay });

export function head(ctx, { title, desc, og, css, ld }) {
  const { lang, page, V } = ctx;
  const alt = LANGS.map(l => `<link rel="alternate" hreflang="${l}" href="${abs(l, page)}">`).join('\n') +
    `\n<link rel="alternate" hreflang="x-default" href="${page === 'home' ? SITE + '/' : abs('en', page)}">`;
  // Per-page social image (og.mjs) when it exists; otherwise the one the page passed.
  const own = `/assets/site/og/${ogName(page)}.jpg`;
  if (existsSync(new URL('..' + own, import.meta.url))) og = own;
  const ogImg = SITE + og;
  ctx.og = og; // read by the build for the sitemap's image entries
  const styles = ['base', ...css].map(n => `<link rel="stylesheet" href="/assets/site/${n}.css?v=${V[n + '.css']}">`).join('\n');
  return `<!doctype html>
<html lang="${lang}" data-page="${ctx.kind}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<script>document.documentElement.classList.add('js');
/* iOS 26+ Safari, bottom toolbar: the page draws ~58px below 100lvh → html.bar lets the hero reach the physical bottom.
   Checked: iPhone Safari (not in-app/other browsers), Face ID size, not a home-screen app, and screen − 100lvh in the
   bottom-toolbar range (status bar + toolbar zone ≈ 114–120px; the Top tab layout is smaller). */
(function(){var d=document.documentElement,u=navigator.userAgent,v=/Version\\/(\\d+)/.exec(u);if(!/iPhone/.test(u)||/CriOS|FxiOS|EdgiOS|OPiOS|GSA\\/|FBAN|FBAV|Instagram/.test(u)||!v||+v[1]<26||navigator.standalone||screen.height<780)return;var p=document.createElement('i');p.style.cssText='position:absolute;top:0;width:0;height:100lvh;visibility:hidden';d.appendChild(p);var g=screen.height-p.getBoundingClientRect().height;d.removeChild(p);if(g>=100&&g<=140)d.classList.add('bar')})()</script>
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${abs(lang, page)}">
${alt}
<meta property="og:type" content="website">
<meta property="og:site_name" content="INFINIT©">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${abs(lang, page)}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="${LOCALE[lang]}">
${LANGS.filter(l => l !== lang).map(l => `<meta property="og:locale:alternate" content="${LOCALE[l]}">`).join('\n')}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${ogImg}">
<meta name="author" content="INFINIT© · Cesc Callejas">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
<link rel="alternate" type="text/plain" href="/llms.txt" title="INFINIT© for AI assistants">
<meta name="theme-color" content="#060a0e">
${icons(V)}
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/assets/site/fonts/Satoshi-Variable.woff2" as="font" type="font/woff2" crossorigin>
${styles}
<script type="application/ld+json">${JSON.stringify(graph(lang, page, { title, desc, og, ld })).replace(/</g, '\\u003c')}</script>
<script>window.T=${JSON.stringify(jsT(T[lang]))}</script>
<script src="/assets/site/site.js?v=${V['site.js']}" defer></script>
</head>
<body>
<a class="skip" href="#main">${esc(T[lang].skip)}</a>`;
}

// Links that differ between the home (in-page anchors) and inner pages.
export function links(ctx) {
  const { lang, kind } = ctx, home = url(lang, 'home');
  const onHome = kind === 'home';
  return {
    top: onHome ? '#top' : home,
    work: onHome ? '#work' : home + '#work',
    services: onHome ? '#services' : home + '#services',
    studio: url(lang, 'studio'),
    journal: url(lang, 'journal'),
    // Every page ends with the same dark #contact block (v3).
    contact: '#contact',
  };
}


// Navigation: rendered in the HTML (crawlable, works without JS as plain links); site.js adds open/close,
// the turning mark, auto-contrast and hide-at-footer. The card is inert until the menu opens.
export function nav(ctx) {
  const t = T[ctx.lang], L = links(ctx), k = ctx.kind, pg = ctx.page;
  const cur = on => on ? ' aria-current="page"' : '';
  const big = [[t.work, L.work, k === 'work'], [t.services, L.services, false], [t.studio, L.studio, k === 'studio'], [t.journal, L.journal, k === 'journal' || k === 'article']];
  const small = [[t.ftSecL, url(ctx.lang, 'sectors'), pg === 'sectors'], [t.allWork, url(ctx.lang, 'workidx'), pg === 'workidx']]; // Contact is the "Let’s talk" button
  return `<div class="nv" id="nv"><div class="nv-c" id="nvc" role="dialog" aria-label="${esc(t.menu)}" tabindex="-1" inert><nav class="nv-l" aria-label="${esc(t.navLabel)}">${big.map(([n, h, c], i) => `<a href="${h}" style="--i:${i}"${cur(c)}><span>${esc(n)}</span><i aria-hidden="true">↗</i></a>`).join('')}</nav>
<div class="nv-s"><div>${small.map(([n, h, c]) => `<a href="${h}"${cur(c)}>${esc(n)}</a>`).join('')}</div><div class="nv-lang" role="group" aria-label="${esc(t.language)}">${ordered(ctx).join('')}</div></div></div>
<div class="nv-bar"><a class="nv-mk" href="${L.top}" aria-label="${esc(t.homeAria)}"><svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">${MARK_SVG}</svg></a><div class="nv-p"><button class="nv-b" type="button" aria-expanded="false" aria-controls="nvc"><span class="nv-ic" aria-hidden="true"><i></i><i></i></span><span class="nv-lb"><span>${esc(t.menu)}</span><span aria-hidden="true">${esc(t.close)}</span></span></button><a class="nv-go" href="${L.contact}"><span class="roll">${esc(t.letsTalk)}</span></a></div></div></div>`;
}

// Language switchers: each points to the same page in the other language.
const langLinks = (ctx, cls = '') => LANGS.map(l => {
  const on = l === ctx.lang;
  return `<a href="${url(l, ctx.page)}" hreflang="${l}" lang="${l}" data-lang="${l}"${on ? ' class="on" aria-current="true"' : ''}>${l.toUpperCase()}</a>`;
});
const ORDER = ['ca', 'es', 'en'];
const ordered = ctx => ORDER.map(l => langLinks(ctx)[LANGS.indexOf(l)]);

export function footer(ctx) {
  const t = T[ctx.lang], L = links(ctx);
  return `<footer class="ft dark" id="ft"><div class="ft-g">
<div><p class="lbl">${esc(t.ftStudio)}</p><a href="${L.work}">${esc(t.work)}</a><a href="${L.services}">${esc(t.services)}</a><a href="${L.studio}">${esc(t.studio)}</a><a href="${L.journal}">${esc(t.journal)}</a></div>
<div><p class="lbl">${esc(t.ftSecL)}</p>${t.ftSecs.map(([k, n]) => `<a href="${url(ctx.lang, k)}">${esc(n)}</a>`).join('')}<a href="${url(ctx.lang, 'sectors')}">${esc(t.ftAll)}</a></div>
<div><p class="lbl">${esc(t.ftConnect)}</p><a href="mailto:${EMAIL}">${EMAIL}</a><a href="tel:${PHONE.replace(/\s/g, '')}">${PHONE.replace(/ /g, '\u00a0')}</a><a href="${LINKEDIN}" target="_blank" rel="noopener">LinkedIn ↗</a><a href="${INSTAGRAM}" target="_blank" rel="noopener">Instagram ↗</a></div>
<div><p class="lbl">${esc(t.ftRec)}</p><div class="aw"><img src="${A('project/assets/clients/Awwwards-Logo-Vector.svg-.png')}" alt="Awwwards"${pngDim('project/assets/clients/Awwwards-Logo-Vector.svg-.png', 22)} loading="lazy"><img src="${A('project/assets/clients/coac-trim.png')}" alt="COAC"${pngDim('project/assets/clients/coac-trim.png', 22)} loading="lazy"></div></div></div>
<div class="ft-b lbl"><span>${esc(t.loc)}</span><nav class="fl" aria-label="${esc(t.language)}">${ordered(ctx).join('')}</nav><span data-clock></span><span>© 2026 INFINIT©</span></div></footer>`;
}

// Cookie consent (same storage key as the previous site, so earlier choices are kept). Shown by site.js.
export function cookies(ctx) {
  const t = T[ctx.lang];
  return `<aside class="ck" id="ck" aria-label="${esc(t.ckLabel)}" hidden><p>${esc(t.ckMsg)}</p><div class="ck-a"><button type="button" class="ck-no" data-ck="declined">${esc(t.ckDecline)}</button><button type="button" class="ck-ok" data-ck="accepted"><span class="roll">${esc(t.ckAccept)}</span></button></div></aside>`;
}

// 1px neutral line on the light → dark transition before the final dark block (drawn in on scroll).
export const ftLine = '<div class="ft-hl" aria-hidden="true"><i></i></div>';

// One ending for every page (v3): Let’s talk, the big copyable email, the wordmark at full width.
// `before` goes first inside the block (Home / Studio: "Experience across" + the clients).
export function ending(ctx, { before = '', cls = '' } = {}) {
  const t = T[ctx.lang];
  return `<section class="dark endb${cls ? ' ' + cls : ''}" id="contact">${cls.includes('afternx') ? '' : ftLine}${before}<div class="end"><h2 data-lines>${esc(t.talk)}</h2><button class="mail" type="button" data-copy="${EMAIL}" data-cur="${esc(t.cCopy)}" aria-label="${esc(t.copyEmail)}: ${EMAIL}"><span class="mt">${EMAIL}</span></button></div>
<div class="endw" aria-hidden="true">${wm('fit')}</div></section>`;
}

export function end(ctx, extra = '') {
  return `${footer(ctx)}
${nav(ctx)}
${extra}<div class="toast" id="toast" role="status" aria-live="polite"></div>
${cookies(ctx)}
</body>
</html>
`;
}
