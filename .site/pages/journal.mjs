// Journal index (/journal/) and article pages (/journal/<slug>/) — v3 handoff (journal.html, article.html, seo.css).
// Content and rendering: ../jdata.mjs. Static HTML; site.js adds the cluster filter and the table-of-contents scrollspy.
import { url, abs, esc, A as asset } from '../lib.mjs';
import { T } from '../i18n.mjs';
import { head, end, ending } from '../layout.mjs';
import { A, CL, DATE, render, ttl, keyOf } from '../jdata.mjs';
import { REG } from './sector.mjs';
const secName = (k, lang) => REG.sectorName(k, lang);

export const J = {
  en: { title: 'Journal — Brand, website & GEO guides | INFINIT©', desc: 'Clear answers for companies of €1M–€200M: what a rebrand is worth, when it makes sense, what it costs and how Google and AI assistants find you.',
    h1: 'Clear answers. <b>No small print.</b>', lead: 'Guides for companies of €1M–€200M: what a rebrand is worth, when it makes sense, what it costs and how your website gets you found by Google and AI.',
    start: 'Start with why', seg: ['All', 'Why', 'When', 'Cost', 'Process', 'Website'], mins: n => `${n} min read`, read: 'Read',
    role: 'Founder, INFINIT©', toc: 'In this article', ans: 'Short answer', rel: 'Related', go: 'See how we work ↗',
    by: 'Written by', bio: 'Founder of INFINIT©. Cesc Callejas leads every project personally.', more: 'Keep reading', all: 'All articles',
    fromL: 'From the journal', fromH: 'Read before <b>you call.</b>' },
  ca: { title: 'Journal — Guies de marca, web i GEO | INFINIT©', desc: 'Respostes clares per a empreses d’1 a 200 M€: què val un rebranding, quan té sentit, quant costa i com us troben Google i els assistents d’IA.',
    h1: 'Respostes clares. <b>Sense lletra petita.</b>', lead: 'Guies per a empreses d’1 a 200 M€: què val un rebranding, quan té sentit, quant costa i com la web fa que Google i la IA us trobin.',
    start: 'Comenceu pel perquè', seg: ['Tots', 'Per què', 'Quan', 'Cost', 'Procés', 'Web'], mins: n => `${n} min de lectura`, read: 'Llegeix',
    role: 'Fundador, INFINIT©', toc: 'En aquest article', ans: 'Resposta curta', rel: 'Relacionat', go: 'Mireu com treballem ↗',
    by: 'Escrit per', bio: 'Fundador d’INFINIT©. En Cesc Callejas lidera personalment cada projecte.', more: 'Continueu llegint', all: 'Tots els articles',
    fromL: 'Del journal', fromH: 'Llegiu-ho <b>abans de trucar.</b>' },
  es: { title: 'Journal — Guías de marca, web y GEO | INFINIT©', desc: 'Respuestas claras para empresas de 1 a 200 M€: qué vale un rebranding, cuándo tiene sentido, cuánto cuesta y cómo os encuentran Google y la IA.',
    h1: 'Respuestas claras. <b>Sin letra pequeña.</b>', lead: 'Guías para empresas de 1 a 200 M€: qué vale un rebranding, cuándo tiene sentido, cuánto cuesta y cómo la web hace que Google y la IA os encuentren.',
    start: 'Empezad por el porqué', seg: ['Todos', 'Por qué', 'Cuándo', 'Coste', 'Proceso', 'Web'], mins: n => `${n} min de lectura`, read: 'Leer',
    role: 'Fundador, INFINIT©', toc: 'En este artículo', ans: 'Respuesta corta', rel: 'Relacionado', go: 'Mirad cómo trabajamos ↗',
    by: 'Escrito por', bio: 'Fundador de INFINIT©. Cesc Callejas lidera personalmente cada proyecto.', more: 'Seguid leyendo', all: 'Todos los artículos',
    fromL: 'Del journal', fromH: 'Leedlo <b>antes de llamar.</b>' },
};
const KEYS = ['all', 'why', 'when', 'cost', 'process', 'website'];

// Cover image (website screenshots may set cover_fit / cover_pos / cover_bg).
const cst = a => a.cover_fit || a.cover_pos ? ` style="object-fit:${a.cover_fit || 'cover'};object-position:${a.cover_pos || '50% 50%'}"` : '';
const cbg = a => a.cover_bg ? ` style="background:${a.cover_bg}"` : '';

// Related page of an article: its sector / service page.
export const related = (a, lang) => keyOf(a.related_sector);

// One row of an article list. big = Journal index (number, description, sector · read time).
export function row(a, lang, big = false, sectorName = secName) {
  const j = J[lang], k = related(a, lang);
  return `<li data-c="${a.cluster}"><a href="${url(lang, 'j:' + a.slug)}" data-cur="${esc(j.read)}">${big ? `<span class="lbl">${String(a.n).padStart(2, '0')}</span>` : ''}${a.cover ? `<div class="img"${cbg(a)}><img src="${asset(a.cover)}" alt="" loading="lazy"${cst(a)}></div>` : ''}<div><${big ? 'h2' : 'h3'}>${esc(a.title)}</${big ? 'h2' : 'h3'}>${big ? `<p>${esc(a.description)}</p>` : ''}</div><div class="jl-m"><span class="tg">${esc(CL[lang][a.cluster])}</span>${big ? `<span class="lbl">${esc(sectorName(k, lang))} · ${esc(j.mins(a.mins))}</span>` : ''}</div><span class="ar" aria-hidden="true">↗</span></a></li>`;
}

// Three articles for a sector page: the ones about that page first, then the core reading path.
export function forPage(key, lang) {
  const own = A[lang].filter(a => keyOf(a.related_sector) === key);
  const core = ['what-is-a-rebrand-worth', 'how-much-does-a-rebrand-cost', 'what-is-brand-strategy'].map(s => A[lang].find(a => a.slug === s));
  return [...own, ...core.filter(a => !own.includes(a))].slice(0, 3);
}

export function journal(ctx, sectorName = secName) {
  const { lang } = ctx, t = T[lang], j = J[lang];
  const header = `<header class="lt" id="top"><div class="lt-t"><a class="gbtn" href="${url(lang, 'home')}"><span class="ar bk" aria-hidden="true">←</span><span class="roll">${esc(t.home)}</span></a><span class="lbl">Journal</span></div>
<h1 class="em hin">${j.h1}</h1><p class="lt-p">${esc(j.lead)}</p></header>`;
  const list = `<section class="blk"><div class="wf"><span class="lbl">${esc(j.start)}</span><div class="seg" id="jf" role="group" aria-label="${esc(t.filterLabel)}"><i></i>${j.seg.map((s, i) => `<button type="button" data-k="${KEYS[i]}"${i ? ' aria-pressed="false"' : ' class="on" aria-pressed="true"'}>${esc(s)}</button>`).join('')}</div></div>
<ol class="jl" id="jl">${A[lang].map(a => row(a, lang, true, sectorName)).join('')}</ol></section>`;
  return head(ctx, { title: j.title, desc: j.desc, og: '/assets/site/og/home.jpg', css: ['inner', 'seo'], ld: { crumbs: [['Journal', 'journal']], list: A[lang].map(x => [x.title, abs(lang, 'j:' + x.slug)]) } }) +
    `\n<main id="main">\n${header}\n${list}\n${ending(ctx)}\n</main>\n` + end(ctx);
}

export function article(ctx, slug, sectorName = secName) {
  const { lang } = ctx, t = T[lang], j = J[lang], L = A[lang], k = L.findIndex(a => a.slug === slug), a = L[k];
  const r = render(a, lang), rk = related(a, lang);
  const header = `<header class="lt" id="top"><div class="lt-t"><a class="gbtn" href="${url(lang, 'journal')}"><span class="ar bk" aria-hidden="true">←</span><span class="roll">Journal</span></a><span class="lbl">${esc(sectorName(rk, lang))} · ${esc(CL[lang][a.cluster])}</span></div>
<h1 class="em hin">${ttl(a.title)}</h1><p class="lt-p">${esc(a.description)}</p>
<div class="by"><div class="img"><img src="${asset('project/assets/imagery/francesc.webp')}" alt="" width="40" height="40"></div><span>Cesc Callejas<small>${esc(j.role)}</small></span><span class="lbl"><time datetime="${DATE}">${new Date(DATE).toLocaleDateString(lang === 'en' ? 'en-GB' : lang, { day: 'numeric', month: 'long', year: 'numeric' })}</time> · ${esc(j.mins(a.mins))}</span></div></header>`;
  const cover = a.cover ? `<figure class="cv"><div class="img"${cbg(a)}><img src="${asset(a.cover)}" alt="${esc(a.cover_alt || '')}" fetchpriority="high"${cst(a)}></div></figure>` : '';
  const body = `<section class="art"><nav class="toc" id="toc" aria-label="${esc(j.toc)}"><span class="lbl">${esc(j.toc)}</span>${r.toc.map(([id, h]) => `<a href="#${id}">${esc(h)}</a>`).join('')}</nav>
<article class="prose">${r.ans ? `<div class="ans"><span class="lbl">${esc(j.ans)}</span>${r.ans}</div>` : ''}${r.html}${r.end ? `<p class="end">${r.end}</p>` : ''}</article>
<aside class="art-r"><a class="rel" href="${url(lang, rk)}"><span class="lbl">${esc(j.rel)}</span><b>${esc(sectorName(rk, lang))}</b><span class="go">${esc(j.go)}</span></a></aside></section>`;
  const author = `<section class="blk"><div class="au"><div class="img"><img src="${asset('project/assets/imagery/francesc.webp')}" alt="Cesc Callejas" loading="lazy"></div><div><span class="lbl">${esc(j.by)}</span><b>Cesc Callejas</b><p>${esc(j.bio)}</p></div></div></section>`;
  const next = [L[(k + 1) % L.length], L[(k + 2) % L.length]];
  const more = `<section class="blk"><div class="sh"><div><span class="lbl">${esc(j.more)}</span></div><a class="gbtn" href="${url(lang, 'journal')}" style="background:oklch(.16 .004 85 / .06)"><span class="roll">${esc(j.all)}</span><span class="ar" aria-hidden="true">↗</span></a></div>
<ul class="jl sm">${next.map(x => row(x, lang)).join('')}</ul></section>`;
  // Long titles drop the brand suffix (search results cut at ~60 characters).
  return head(ctx, { title: a.title.length > 52 ? a.title : `${a.title} | INFINIT©`, desc: a.description, og: asset(a.cover), css: ['inner', 'seo'],
    ld: { crumbs: [['Journal', 'journal'], [a.title, 'j:' + a.slug]], article: { ...a, faq: r.faq, date: DATE, sectorKey: rk, sectorName: sectorName(rk, lang) } } }) +
    `\n<main id="main">\n${header}\n${cover}\n${body}\n${author}\n${more}\n${ending(ctx)}\n</main>\n` + end(ctx);
}
