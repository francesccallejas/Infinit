// Work index (/work/) — v3 handoff (work.html, seo.css): every project as a row; live cases link to their page.
// The service filter (All · Strategy · Brand · Digital) and the live count are added by site.js.
import { url, abs, esc } from '../lib.mjs';
import { T } from '../i18n.mjs';
import { P, S, svc, src } from '../data.mjs';
import { head, end, ending } from '../layout.mjs';
import { sectorName } from './sectors.mjs';

const W = {
  en: { title: 'Work — Brand, strategy & digital projects | INFINIT©', desc: 'Selected work by INFINIT©: brand strategy, identity and digital for Bunnker (COAC Award), Relats and more — mid-sized companies in Barcelona and Europe.', all: 'All' },
  ca: { title: 'Projectes — Marca, estratègia i digital | INFINIT©', desc: 'Projectes d’INFINIT©: estratègia de marca, identitat i digital per a Bunnker (Premi COAC), Relats i més — empreses mitjanes de Barcelona i Europa.', all: 'Tots' },
  es: { title: 'Proyectos — Marca, estrategia y digital | INFINIT©', desc: 'Proyectos de INFINIT©: estrategia de marca, identidad y digital para Bunnker (Premio COAC), Relats y más — empresas medianas de Barcelona y Europa.', all: 'Todos' },
};
const FILTER = ['strategy', 'brand', 'digital'];

export function workidx(ctx) {
  const { lang } = ctx, t = T[lang], w = W[lang];
  const header = `<header class="lt" id="top"><div class="lt-t"><a class="gbtn" href="${url(lang, 'home')}"><span class="ar bk" aria-hidden="true">←</span><span class="roll">${esc(t.home)}</span></a><span class="lbl">${esc(t.work)}</span></div>
<h1 class="em hin">${t.workH}</h1><p class="lt-p">${esc(t.intro.replace(/<\/?b>/g, ''))}</p></header>`;
  const rows = P.map(p => {
    const live = !!p.page, tag = live ? 'a' : 'div';
    const inner = `<div class="img"><img src="${src(p.img)}" alt="${esc(p.n + ' — ' + p.d[lang])}" loading="lazy"></div><div><b>${esc(p.n)}</b><span class="ds">${esc(p.d[lang])}${p.rec ? ` · ${esc(p.rec[lang])}` : ''}</span></div><span class="sc">${esc(sectorName(p.sec, lang))}</span><div class="tgs">${p.t.map(k => `<span class="tg">${esc(svc(k).n[lang])}</span>`).join('')}</div><span class="st">${esc(live ? t.viewCase + ' ↗' : p.s === 'nda' ? t.nda : t.wip)}</span>`;
    return `<${tag}${live ? ` href="${url(lang, p.page)}" data-cur="${esc(t.cView)}"` : ''} data-sv="${p.t.join(' ')}">${inner}</${tag}>`;
  }).join('');
  const list = `<section class="blk"><div class="wf"><span class="lbl" id="wcount" data-fmt="${esc(t.projects('#'))}" aria-live="polite">${esc(t.projects(P.length))}</span><div class="seg" id="wfs" role="group" aria-label="${esc(t.filterLabel)}"><i></i><button type="button" data-k="all" class="on" aria-pressed="true">${esc(w.all)}</button>${FILTER.map(k => `<button type="button" data-k="${k}" aria-pressed="false">${esc(svc(k).n[lang])}</button>`).join('')}</div></div>
<div class="wl" id="wl">${rows}</div></section>`;
  return head(ctx, { title: w.title, desc: w.desc, og: '/assets/site/og/home.jpg', css: ['inner', 'seo'],
    ld: { crumbs: [[t.work, 'workidx']], list: P.filter(p => p.page).map(p => [p.n, abs(lang, p.page)]) } }) +
    `\n<main id="main">\n${header}\n${list}\n${ending(ctx)}\n</main>\n` + end(ctx);
}
