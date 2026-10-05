// Sector landing pages (e.g. /industrial-branding/, /automotive-branding/): one template, shared copy.
// Built from the case-page building blocks (inner.css) + the Studio contact block (studio.css).
// SHARED holds what every sector page says the same way — process labels, the timing & investment
// table, the general FAQ and the contact block — so a price change is made once. Durations, price
// ranges and process as given by Cesc Callejas (Oct 2026). Each sector module adds its own copy.
import { EMAIL, url, abs, esc, A, dot, tint } from '../lib.mjs';
import { T } from '../i18n.mjs';
import { head, end, heroLine, ftLine } from '../layout.mjs';
import { chip } from './case.mjs';

const PH = [165, 255, 285]; // card hues: strategy · brand · digital

export const SHARED = {
  en: {
    probL: 'The problem',
    quoteL: 'In one line',
    sigL: 'Signs it’s time',
    howL: 'How we work',
    pxL: 'Timing & investment',
    pxH: 'Clear timings. Clear budgets.',
    pxCols: ['Phase', 'Duration', 'Companies €1–10M', '€10–50M', '€50–200M'],
    px: [
      ['Strategy', '2–4 weeks', '€2–3k', '€4–7k', 'from €10k'],
      ['Brand identity', 'from 2 weeks', '€2–3k', '€5–10k', 'from €15k*'],
      ['Website, SEO & GEO', '1–2 months', '~€10k', '€12–18k', 'from €20k'],
      ['Launch plan + brand video', 'optional', '~€5k', '€7–8k', '~€10k'],
    ],
    pxNote: 'Guide figures, not fixed rates: we adapt to each company’s budget — tell us what you have and we’ll propose a scope that fits. *More with many assets: 3D, photography, content. Strategy and brand can be ready in little over a month.',
    expL: 'Experience across',
    faqL: 'FAQ',
    faq: [
      ['Do we have to change our name and logo?', 'Not necessarily. Often the name carries decades of trust and should stay; what changes is the positioning, the story and how the brand is applied. We recommend a full rebrand only when the strategy shows the current one is holding you back.'],
      ['How long does it take?', 'Strategy usually takes 2 weeks to a month, depending on how complex the company is. A rebrand can be done in about 2 weeks. A website takes around a month — two if it is complex or needs a back office. 3D, photography or extra content add time. We work fast: strategy and brand can be ready in little over a month.'],
      ['How much does it cost?', 'It depends on the size of the company and the scope. Companies of €1–10M: strategy €2–3k, brand identity €2–3k, website ~€10k. Companies of €10–50M: strategy €4–7k, brand identity €5–10k, website €12–18k. Companies of €50–200M: strategy from €10k, brand identity from €15k (more with 3D, photography or content), website from €20k. A launch plan with a brand video: around €5k, €7–8k for companies of €10–50M and around €10k from €50M. These are guide figures: if your budget is different, tell us — we adapt the scope.'],
      ['What does the process look like?', 'Strategy: initial interviews, one workshop and a deliverable session. Brand: time to work, progress sessions and a final presentation. Then UX/UI, design and development, showing you the progress until the result is live. Cesc Callejas leads every project personally.'],
      ['Do you build on WordPress or Webflow?', 'No. Templates never quite fit and become expensive to change. We build custom, lightweight websites with simple maintenance — and a custom back office when you need one, which is much faster to work with.'],
      ['Do you work outside Catalonia?', 'Yes. We are based in Barcelona and work in Catalan, Spanish and English with companies across Spain and Europe, and with brands that sell worldwide.'],
    ],
    ctaH: 'Is your brand behind <b>your company?</b>',
    ctaP: 'Tell us where you are. We’ll tell you honestly whether a brand project makes sense now.',
  },
  ca: {
    probL: 'El problema',
    quoteL: 'En una frase',
    sigL: 'Senyals',
    howL: 'Com treballem',
    pxL: 'Terminis i inversió',
    pxH: 'Terminis clars. Pressupostos clars.',
    pxCols: ['Fase', 'Durada', 'Empreses d’1 a 10 M€', 'De 10 a 50 M€', 'De 50 a 200 M€'],
    px: [
      ['Estratègia', '2–4 setmanes', '2–3 k€', '4–7 k€', 'des de 10 k€'],
      ['Identitat de marca', 'des de 2 setmanes', '2–3 k€', '5–10 k€', 'des de 15 k€*'],
      ['Web, SEO i GEO', '1–2 mesos', '~10 k€', '12–18 k€', 'des de 20 k€'],
      ['Pla de llançament + vídeo de marca', 'opcional', '~5 k€', '7–8 k€', '~10 k€'],
    ],
    pxNote: 'Xifres orientatives, no tarifes tancades: ens adaptem al pressupost de cada empresa — expliqueu-nos de què disposeu i us proposarem un abast que hi encaixi. *Més si hi ha molts recursos: 3D, fotografia, contingut. Estratègia i marca poden estar llestes en poc més d’un mes.',
    expL: 'Experiència a',
    faqL: 'Preguntes freqüents',
    faq: [
      ['Hem de canviar el nom i el logo?', 'No necessàriament. Sovint el nom porta dècades de confiança i s’ha de mantenir; el que canvia és el posicionament, el relat i com s’aplica la marca. Només recomanem un rebranding complet quan l’estratègia demostra que l’actual us frena.'],
      ['Quant dura?', 'L’estratègia sol durar de 15 dies a un mes, segons la complexitat de l’empresa. Un rebranding es pot fer en unes 2 setmanes. Una web, un mes de feina — dos si és complexa o té backoffice. El 3D, la fotografia o més contingut allarguen el termini. Som àgils: estratègia i marca poden estar llestes en poc més d’un mes.'],
      ['Quant costa?', 'Depèn de la mida de l’empresa i de l’abast. Empreses d’1 a 10 M€: estratègia 2–3 k€, identitat de marca 2–3 k€, web ~10 k€. Empreses de 10 a 50 M€: estratègia 4–7 k€, identitat de marca 5–10 k€, web 12–18 k€. Empreses de 50 a 200 M€: estratègia des de 10 k€, identitat de marca des de 15 k€ (més amb 3D, fotografia o contingut), web des de 20 k€. Un pla de llançament amb vídeo de marca: uns 5 k€; 7–8 k€ per a empreses de 10 a 50 M€ i uns 10 k€ a partir de 50 M€. Són xifres orientatives: si el vostre pressupost és un altre, digueu-nos-ho — adaptem l’abast.'],
      ['Com és el procés?', 'Estratègia: entrevistes inicials, un workshop i una sessió d’entrega. Marca: temps de feina, sessions per veure l’avenç i una presentació final. Després, UX/UI, disseny i programació, ensenyant-vos el progrés fins tenir el resultat. En Cesc Callejas lidera personalment cada projecte.'],
      ['Feu webs amb WordPress o Webflow?', 'No. Les plantilles mai s’acaben d’ajustar i costa molt tocar-les. Fem webs a mida, lleugeres i amb un manteniment senzill — i, si cal, un backoffice a mida, molt més ràpid de fer servir.'],
      ['Treballeu fora de Catalunya?', 'Sí. Som a Barcelona i treballem en català, castellà i anglès amb empreses de tot l’Estat i d’Europa, i amb marques que venen arreu del món.'],
    ],
    ctaH: 'La vostra marca va per darrere <b>de l’empresa?</b>',
    ctaP: 'Expliqueu-nos on sou. Us direm amb sinceritat si ara té sentit un projecte de marca.',
  },
  es: {
    probL: 'El problema',
    quoteL: 'En una frase',
    sigL: 'Señales',
    howL: 'Cómo trabajamos',
    pxL: 'Plazos e inversión',
    pxH: 'Plazos claros. Presupuestos claros.',
    pxCols: ['Fase', 'Duración', 'Empresas de 1 a 10 M€', 'De 10 a 50 M€', 'De 50 a 200 M€'],
    px: [
      ['Estrategia', '2–4 semanas', '2–3 k€', '4–7 k€', 'desde 10 k€'],
      ['Identidad de marca', 'desde 2 semanas', '2–3 k€', '5–10 k€', 'desde 15 k€*'],
      ['Web, SEO y GEO', '1–2 meses', '~10 k€', '12–18 k€', 'desde 20 k€'],
      ['Plan de lanzamiento + vídeo de marca', 'opcional', '~5 k€', '7–8 k€', '~10 k€'],
    ],
    pxNote: 'Cifras orientativas, no tarifas cerradas: nos adaptamos al presupuesto de cada empresa — contadnos de qué disponéis y os propondremos un alcance que encaje. *Más si hay muchos recursos: 3D, fotografía, contenido. Estrategia y marca pueden estar listas en poco más de un mes.',
    expL: 'Experiencia en',
    faqL: 'Preguntas frecuentes',
    faq: [
      ['¿Tenemos que cambiar el nombre y el logo?', 'No necesariamente. A menudo el nombre acumula décadas de confianza y hay que mantenerlo; lo que cambia es el posicionamiento, el relato y cómo se aplica la marca. Solo recomendamos un rebranding completo cuando la estrategia demuestra que el actual os frena.'],
      ['¿Cuánto dura?', 'La estrategia suele durar de 15 días a un mes, según la complejidad de la empresa. Un rebranding se puede hacer en unas 2 semanas. Una web, un mes de trabajo — dos si es compleja o tiene backoffice. El 3D, la fotografía o más contenido alargan el plazo. Somos ágiles: estrategia y marca pueden estar listas en poco más de un mes.'],
      ['¿Cuánto cuesta?', 'Depende del tamaño de la empresa y del alcance. Empresas de 1 a 10 M€: estrategia 2–3 k€, identidad de marca 2–3 k€, web ~10 k€. Empresas de 10 a 50 M€: estrategia 4–7 k€, identidad de marca 5–10 k€, web 12–18 k€. Empresas de 50 a 200 M€: estrategia desde 10 k€, identidad de marca desde 15 k€ (más con 3D, fotografía o contenido), web desde 20 k€. Un plan de lanzamiento con vídeo de marca: unos 5 k€; 7–8 k€ para empresas de 10 a 50 M€ y unos 10 k€ a partir de 50 M€. Son cifras orientativas: si vuestro presupuesto es otro, decídnoslo — adaptamos el alcance.'],
      ['¿Cómo es el proceso?', 'Estrategia: entrevistas iniciales, un workshop y una sesión de entrega. Marca: tiempo de trabajo, sesiones para ver el avance y una presentación final. Después, UX/UI, diseño y programación, enseñándoos el progreso hasta tener el resultado. Cesc Callejas lidera personalmente cada proyecto.'],
      ['¿Hacéis webs con WordPress o Webflow?', 'No. Las plantillas nunca acaban de ajustarse y cuesta mucho tocarlas. Hacemos webs a medida, ligeras y con un mantenimiento sencillo — y, si hace falta, un backoffice a medida, mucho más rápido de usar.'],
      ['¿Trabajáis fuera de Cataluña?', 'Sí. Estamos en Barcelona y trabajamos en catalán, castellano e inglés con empresas de toda España y Europa, y con marcas que venden en todo el mundo.'],
    ],
    ctaH: '¿Vuestra marca va por detrás <b>de la empresa?</b>',
    ctaP: 'Contadnos dónde estáis. Os diremos con sinceridad si ahora tiene sentido un proyecto de marca.',
  },
};

// def: { C: sector copy per language, hero: image path, og, proof?: { img, case: page key, name }, prices?: false, sharedFaq?: [indices] }
export function sectorPage(ctx, def) {
  const { lang } = ctx, t = T[lang], own = def.C[lang];
  // Sector copy overrides the shared copy; sector-specific questions go before the shared FAQ.
  // def.prices === false hides the price table (and the shared cost/duration answers) on pages whose
  // prices aren't published (e.g. GEO, fractional CMO). def.sharedFaq picks shared questions by index.
  const keep = def.sharedFaq || (def.prices === false ? [3, 4, 5] : null);
  const shared = keep ? keep.map(i => SHARED[lang].faq[i]) : SHARED[lang].faq;
  const c = { ...SHARED[lang], ...own, faq: [...(own.faq || []), ...shared] };

  const hero = `<section class="ch dark" id="top" data-h="n"><div class="ch-bg${def.dim ? ' dim' : ''}"><div class="img"><img src="${A(def.hero)}" alt="" fetchpriority="high"></div></div>
<div class="ch-t"><a class="gbtn" href="${url(lang, 'home')}"><span class="ar bk" aria-hidden="true">←</span><span class="roll">${esc(t.home)}</span></a></div>
<div class="ch-m"><span class="lbl sx-l">${esc(c.lbl)}</span><h1 class="hin">${c.h1}</h1></div>
<div class="ch-b"><div class="chips">${chip('strategy', lang)}${chip('brand', lang)}${chip('digital', lang)}</div><a class="scd" href="#sector">${esc(t.scroll)}<i></i></a></div>
${heroLine}</section>`;

  const meta = `<section class="meta" id="sector">${c.meta.map(([k, v]) => `<div><span class="lbl">${esc(k)}</span><b>${esc(v)}</b></div>`).join('')}</section>`;

  const problem = `<section class="blk g12 ab" data-h="n"><div class="who rv"><span class="lbl">${esc(c.probL)}</span><p>${esc(c.prob)}</p></div>
<div class="q"><span class="lbl">${esc(c.quoteL)}</span><blockquote class="em" data-lines>${c.quote}</blockquote></div></section>`;

  const signs = `<section class="blk"><div class="sh"><div><span class="lbl">${esc(c.sigL)}</span><h2 class="h2" data-lines>${esc(c.sigH)}</h2></div></div>
<div class="pil">${c.sig.map((s, i) => `<div class="pc rv" data-hh="${PH[i]}" style="--c:${tint(PH[i])}${i ? `;transition-delay:${i * .06}s` : ''}"><div class="n"><span class="lbl">${esc(s[0])}</span><i style="background:${dot(PH[i])}" aria-hidden="true"></i></div><div><h3>${esc(s[1])}</h3><p>${esc(s[2])}</p></div></div>`).join('')}</div></section>`;

  const how = `<section class="blk" data-h="255"><div class="sh"><div><span class="lbl">${esc(c.howL)}</span><h2 class="h2" data-lines>${esc(c.howH)}</h2></div></div>
<ol class="proc">${c.how.map((s, i) => `<li class="rv" style="transition-delay:${(i * .05).toFixed(2)}s"><span class="lbl">0${i + 1}</span><div><h3>${esc(s[0])}</h3><span class="chip" style="color:var(--t4);background:oklch(.16 .004 85 / .06);margin-top:12px">${esc(s[1])}</span></div><p>${esc(s[2])}</p></li>`).join('')}</ol></section>`;

  const prices = `<section class="blk" data-h="88" id="pricing"><div class="sh"><div><span class="lbl">${esc(c.pxL)}</span><h2 class="h2" data-lines>${esc(c.pxH)}</h2></div></div>
<table class="px rv"><thead><tr>${c.pxCols.map(h => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead>
<tbody>${c.px.map(r => `<tr><th scope="row">${esc(r[0])}</th>${r.slice(1).map((v, i) => `<td data-k="${esc(c.pxCols[i + 1])}">${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table>
<p class="px-n">${esc(c.pxNote)}</p></section>`;

  // Proof: a case (image + link) when there is one; the experience line always.
  const exp = `<section class="blk sx-exp"><span class="lbl">${esc(c.expL)}</span><p>${esc(c.exp)}</p></section>`;
  const proof = (def.proof ? `<section class="full" style="margin-top:clamp(90px,11vw,170px)"><div class="img"><img src="${A(def.proof.img)}" alt="" loading="lazy"></div><div><span class="lbl">${esc(c.caseL)}</span><h2 class="h2" data-lines>${esc(c.caseH)}</h2><p>${esc(c.caseP)}</p>
<a class="gbtn" href="${url(lang, def.proof.case)}" style="--bh:30;align-self:flex-start;color:#fff;background:oklch(1 0 0 / .14)"><span class="roll">${esc(c.caseBtn)}</span><span class="ar" aria-hidden="true">↗</span></a></div></section>\n` : '') + exp;

  const faq = `<section class="blk g12 sx-faq" data-h="88"><div class="sx-fh"><span class="lbl">${esc(c.faqL)}</span><h2 class="h2" data-lines>${esc(c.faqH)}</h2></div>
<div class="faq">${c.faq.map(([q, a]) => `<details><summary><span>${esc(q)}</span><i aria-hidden="true"></i></summary><p>${esc(a)}</p></details>`).join('')}</div></section>`;

  const cta = `<section class="dark xp" id="contact" data-h="n" style="margin-top:clamp(90px,11vw,170px)">${ftLine}
<div class="cta2"><h2 class="em" data-lines>${c.ctaH}</h2><p class="sx-cp">${esc(c.ctaP)}</p>
<button class="mail" type="button" data-copy="${EMAIL}" data-cur="${esc(t.cCopy)}" aria-label="${esc(t.copyEmail)}: ${EMAIL}"><span class="mt">${EMAIL}</span></button></div></section>`;

  const ld = { name: c.lbl, serviceType: 'Branding', audience: c.meta[0][1] + ' · ' + c.meta[1][1] + ' · ' + c.meta[3][1], faq: own.faq || [],
    ...(def.proof ? { caseName: def.proof.name, caseUrl: abs(lang, def.proof.case) } : {}) };
  return head(ctx, { title: c.title, desc: c.desc, og: def.og, css: ['inner', 'studio'], ld }) +
    `\n<main id="main">\n${[hero, meta, problem, signs, how, def.prices === false ? '' : prices, proof, faq, cta].filter(Boolean).join('\n')}\n</main>\n` + end(ctx);
}
