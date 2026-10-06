// Journal content: the articles in .site/journal/NN-name.{en,ca,es}.md, rendered to static HTML at build time.
// Front matter: slug (same in every language), lang, title, description, author, related_sector, cover, cover_alt,
// cover_fit / cover_pos / cover_bg (optional, for website screenshots), cluster, status.
// Body: H1 = title; first paragraph "**Short answer:** …"; H2 sections; a "FAQ" H2 whose items are
// "**Question?** Answer."; a closing line after "---" (italic, with the email and a link to the related page).
import { readFileSync, readdirSync } from 'node:fs';
import { LANGS, ROUTES, url, esc } from './lib.mjs';

const DIR = new URL('./journal/', import.meta.url);
// Reading path = order of the Journal (README › Content — Journal).
const ORDER = ['04', '05', '02', '06', '01', '07', '08', '03', '09'];
export const DATE = '2026-10-06'; // first published

export const CL = {
  en: { why: 'Why rebrand', when: 'When to act', cost: 'Cost & timing', process: 'How it works', website: 'Website & GEO' },
  ca: { why: 'Per què canviar', when: 'Quan actuar', cost: 'Cost i terminis', process: 'Com funciona', website: 'Web i GEO' },
  es: { why: 'Por qué cambiar', when: 'Cuándo actuar', cost: 'Coste y plazos', process: 'Cómo funciona', website: 'Web y GEO' },
};

const front = s => {
  const m = s.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const fm = {};
  m[1].split('\n').forEach(l => { const i = l.indexOf(': '); if (i > 0) fm[l.slice(0, i).trim()] = l.slice(i + 2).trim(); });
  return { fm, md: m[2] };
};

const files = readdirSync(DIR).filter(f => /^\d\d-.+\.(en|ca|es)\.md$/.test(f));
export const A = {}; // A[lang] = articles in reading order
for (const lang of LANGS) {
  A[lang] = ORDER.map((n, i) => {
    const f = files.find(x => x.startsWith(n + '-') && x.endsWith(`.${lang}.md`));
    const { fm, md } = front(readFileSync(new URL(f, DIR), 'utf8'));
    return { ...fm, n: i + 1, md, mins: Math.max(2, Math.round(md.split(/\s+/).length / 220)) };
  });
}
// Routes: /<lang>/journal/<slug>/ (page key "j:<slug>").
for (const a of A.en) ROUTES['j:' + a.slug] = `journal/${a.slug}/`;
export const SLUGS = A.en.map(a => a.slug);
export const art = (lang, slug) => A[lang].find(a => a.slug === slug);

// Page key for a site path like "/ca/industrial-branding/" (used for links and the related card).
const KEY = Object.fromEntries(Object.entries(ROUTES).map(([k, r]) => [r, k]));
export const keyOf = path => KEY[path.replace(/^\/(en|ca|es)\//, '')];

// Inline Markdown: links (site paths become this language's URLs), bold, italic.
function inl(s, lang) {
  return esc(s)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, t, u) => {
      const [p, h] = u.split('#'), k = p.startsWith('/') ? keyOf(p) : null;
      const href = k ? url(lang, k) + (h ? '#' + h : '') : u;
      return `<a href="${href}"${/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : ''}>${t}</a>`;
    })
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
}
const plain = s => s.replace(/\*\*|\*/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
const slugify = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const SHORT = /^\*\*(Short answer|Resposta curta|Respuesta corta):\*\*\s*/i;
const FAQH = /^(faq|preguntes freqüents|preguntas frecuentes)$/i;

// Article body → { html, toc, faq, ans, end }.
export function render(a, lang) {
  const L = a.md.replace(/\r/g, '').split('\n'), out = [], toc = [], faq = [];
  let i = 0, inFaq = false, ans = '', end = '';
  const blk = /^(#|\||- |\d+\. |---)/;
  while (i < L.length) {
    const l = L[i];
    if (!l.trim() || /^# /.test(l)) { i++; continue; }
    if (/^---\s*$/.test(l)) { end = inl(L.slice(i + 1).join(' ').trim().replace(/^\*|\*$/g, ''), lang); break; }
    if (/^## /.test(l)) { const t = l.slice(3).trim(), id = slugify(plain(t)); inFaq = FAQH.test(t); toc.push([id, plain(t)]); out.push(`<h2 id="${id}">${inl(t, lang)}</h2>`); i++; continue; }
    if (/^### /.test(l)) { out.push(`<h3>${inl(l.slice(4).trim(), lang)}</h3>`); i++; continue; }
    if (/^\|/.test(l)) {
      const R = []; while (i < L.length && /^\|/.test(L[i])) R.push(L[i++]);
      const c = r => r.trim().replace(/^\||\|$/g, '').split('|').map(x => x.trim());
      out.push(`<div class="tbw"><table class="tb"><thead><tr>${c(R[0]).map(x => `<th scope="col">${inl(x, lang)}</th>`).join('')}</tr></thead><tbody>${R.slice(2).map(r => `<tr>${c(r).map(x => `<td>${inl(x, lang)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      continue;
    }
    if (/^\d+\. /.test(l)) { const it = []; while (i < L.length && /^\d+\. /.test(L[i])) it.push(L[i++].replace(/^\d+\. /, '')); out.push(`<ol>${it.map(x => `<li>${inl(x, lang)}</li>`).join('')}</ol>`); continue; }
    if (/^- /.test(l)) { const it = []; while (i < L.length && /^- /.test(L[i])) it.push(L[i++].slice(2)); out.push(`<ul>${it.map(x => `<li>${inl(x, lang)}</li>`).join('')}</ul>`); continue; }
    const p = []; while (i < L.length && L[i].trim() && !blk.test(L[i])) p.push(L[i++]);
    const t = p.join(' ');
    if (!ans && SHORT.test(t)) { const s = t.replace(SHORT, ''); ans = inl(s.charAt(0).toUpperCase() + s.slice(1), lang); continue; }
    const q = t.match(/^\*\*(.+?\?)\*\*\s*(.+)$/);
    if (inFaq && q) { faq.push([plain(q[1]), plain(q[2])]); out.push(`<details class="qa"${faq.length === 1 ? ' open' : ''}><summary>${inl(q[1], lang)}<i aria-hidden="true"></i></summary><p>${inl(q[2], lang)}</p></details>`); continue; }
    out.push(`<p>${inl(t, lang)}</p>`);
  }
  return { html: out.join('\n'), toc, faq, ans, end };
}

// Title: first clause in ink, the rest grey (.em pattern).
export function ttl(t) {
  const m = t.match(/^(.+?[?.:])\s(.+)$/) || t.match(/^(.+?)\s(\(.+\))$/);
  return m ? `<b>${esc(m[1])}</b> ${esc(m[2])}` : `<b>${esc(t)}</b>`;
}
