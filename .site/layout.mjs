// Shared page chrome: <head>, dock, fullscreen menu, footer, toast.
import { SITE, LANGS, LOCALE, EMAIL, PHONE, LINKEDIN, INSTAGRAM, url, abs, esc, A, wm } from './lib.mjs';
import { graph } from './seo.mjs';
import { T } from './i18n.mjs';

// Strings the client script needs.
const jsT = t => ({ menu: t.menu, close: t.close, openMenu: t.openMenu, closeMenu: t.closeMenu, copyToast: t.copyToast, copied: t.copied, firm: t.firm, loc: t.loc, soundOn: t.soundOn, soundOff: t.soundOff, vPause: t.vPause, vPlay: t.vPlay, cPause: t.cPause, cPlay: t.cPlay });

export function head(ctx, { title, desc, og, css, ld }) {
  const { lang, page, V } = ctx;
  const alt = LANGS.map(l => `<link rel="alternate" hreflang="${l}" href="${abs(l, page)}">`).join('\n') +
    `\n<link rel="alternate" hreflang="x-default" href="${SITE}/">`;
  const ogImg = SITE + og;
  const styles = ['base', ...css].map(n => `<link rel="stylesheet" href="/assets/site/${n}.css?v=${V[n + '.css']}">`).join('\n');
  return `<!doctype html>
<html lang="${lang}" data-page="${ctx.kind}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<script>document.documentElement.classList.add('js');document.documentElement.style.setProperty('--lnd',-(Date.now()%20000)+'ms');
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
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/site/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<script>(function(){var f=document.querySelector('link[rel=icon][type="image/svg+xml"]');if(!f)return;var N=['mint','blue','lilac','coral','ochre'],set=function(){f.href='/favicon-'+N[Math.floor(Date.now()%20000/4000)]+'.svg'};set();if(!matchMedia('(prefers-reduced-motion: reduce)').matches)setTimeout(function(){set();setInterval(set,4000)},4000-Date.now()%4000)})()</script>
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
    // The contact block lives on Home and Studio; case pages point to the footer.
    contact: kind === 'work' ? '#ft' : '#contact',
  };
}

export function dock(ctx) {
  const t = T[ctx.lang], L = links(ctx);
  const cur = k => (ctx.kind === 'studio' && k === 'studio') ? ' aria-current="page"' : '';
  return `<nav class="dock" aria-label="${esc(t.navLabel)}">
<a class="wmk" href="${L.top}" aria-label="${esc(t.homeAria)}">${wm(15)}</a><i class="amb" aria-hidden="true"></i>
<a class="dl" href="${L.work}"><span class="roll">${esc(t.work)}</span></a><a class="dl" href="${L.services}"><span class="roll">${esc(t.services)}</span></a><a class="dl" href="${L.studio}"${cur('studio')}><span class="roll">${esc(t.studio)}</span></a>
<button class="mb" id="mb" type="button" aria-label="${esc(t.openMenu)}" aria-expanded="false" aria-controls="menu"><span class="roll">${esc(t.menu)}</span><span class="b3" aria-hidden="true"><i></i><i></i><i></i></span></button>
<a class="go mag" href="${L.contact}"><span class="roll">${esc(t.letsTalk)}</span></a>
</nav>`;
}

// Language switchers: each points to the same page in the other language.
const langLinks = (ctx, cls = '') => LANGS.map(l => {
  const on = l === ctx.lang;
  return `<a href="${url(l, ctx.page)}" hreflang="${l}" lang="${l}" data-lang="${l}"${on ? ' class="on" aria-current="true"' : ''}>${l.toUpperCase()}</a>`;
});
const ORDER = ['ca', 'es', 'en'];
const ordered = ctx => ORDER.map(l => langLinks(ctx)[LANGS.indexOf(l)]);

export function menu(ctx, extra = '') {
  const t = T[ctx.lang], L = links(ctx);
  const items = [[t.work, L.work, 255], [t.services, L.services, 165], [t.studio, L.studio, 285], [t.contact, L.contact, 88]];
  return `<div class="menu dark" id="menu" role="dialog" aria-label="${esc(t.menu)}"><div class="menu-i">
<div class="menu-t">${wm(22)}<div class="seg sm" data-langseg role="group" aria-label="${esc(t.language)}"><i></i>${ordered(ctx).join('')}</div></div>
<nav class="menu-l" aria-label="${esc(t.menu)}">${items.map((l, i) => `<a href="${l[1]}" data-hh="${l[2]}" style="--bh:${l[2]};--i:${i}"${ctx.kind === 'studio' && i === 2 ? ' aria-current="page"' : ''}><span class="lbl">0${i + 1}</span><span class="mt">${esc(l[0])}</span><i aria-hidden="true"></i></a>`).join('')}</nav>
${extra}<div class="menu-b"><button class="gbtn" type="button" data-copy="${EMAIL}" aria-label="${esc(t.copyEmail)}: ${EMAIL}"><span class="mt">${EMAIL}</span></button><span class="lbl">${esc(t.loc)} · <span data-clock></span></span></div></div></div>`;
}

export function footer(ctx) {
  const t = T[ctx.lang], L = links(ctx);
  return `<footer class="ft dark" id="ft"><div class="ft-g">
<div><p class="lbl">${esc(t.ftStudio)}</p><a href="${L.work}">${esc(t.work)}</a><a href="${L.services}">${esc(t.services)}</a><a href="${L.studio}">${esc(t.studio)}</a></div>
<div><p class="lbl">${esc(t.ftSecL)}</p>${t.ftSecs.map(([k, n]) => `<a href="${url(ctx.lang, k)}">${esc(n)}</a>`).join('')}</div>
<div><p class="lbl">${esc(t.ftConnect)}</p><a href="mailto:${EMAIL}">${EMAIL}</a><a href="tel:${PHONE.replace(/\s/g, '')}">${PHONE.replace(/ /g, '\u00a0')}</a><a href="${LINKEDIN}" target="_blank" rel="noopener">LinkedIn ↗</a><a href="${INSTAGRAM}" target="_blank" rel="noopener">Instagram ↗</a></div>
<div><p class="lbl">${esc(t.ftRec)}</p><div class="aw"><img src="${A('project/assets/clients/Awwwards-Logo-Vector.svg-.png')}" alt="Awwwards" loading="lazy"><img src="${A('project/assets/clients/coac-trim.png')}" alt="COAC" loading="lazy"></div></div></div>
<div class="ft-b lbl"><span>${esc(t.loc)}</span><nav class="fl" aria-label="${esc(t.language)}">${ordered(ctx).join('')}</nav><span data-clock></span><span>© 2026 INFINIT©</span></div></footer>`;
}

// Cookie consent (same storage key as the previous site, so earlier choices are kept). Shown by site.js.
export function cookies(ctx) {
  const t = T[ctx.lang];
  return `<aside class="ck" id="ck" aria-label="${esc(t.ckLabel)}" hidden><p>${esc(t.ckMsg)}</p><div class="ck-a"><button type="button" class="ck-no" data-ck="declined">${esc(t.ckDecline)}</button><button type="button" class="ck-ok" data-ck="accepted"><span class="roll">${esc(t.ckAccept)}</span></button></div></aside>`;
}

// Colour line on the light → dark transition before the final dark block (drawn in on scroll).
export const ftLine = '<div class="ft-hl" aria-hidden="true"><i></i></div>';
export const heroLine = '<div class="hl" aria-hidden="true"><i></i></div>';

export function end(ctx, extra = '') {
  return `${footer(ctx)}
${dock(ctx)}
${menu(ctx, ctx.menuExtra || '')}
${extra}<div class="toast" id="toast" role="status" aria-live="polite"></div>
${cookies(ctx)}
</body>
</html>
`;
}
