// Sector landing page: branding for industrial & B2B companies (EN / CA / ES).
// Built from the case-page building blocks (inner.css) + the Studio contact block (studio.css).
// Facts: Relats case, the founder's experience, the services list; durations, price ranges and process
// as given by Cesc Callejas (Oct 2026).
import { EMAIL, url, abs, esc, A, dot, tint } from '../lib.mjs';
import { T } from '../i18n.mjs';
import { head, end, heroLine, ftLine } from '../layout.mjs';
import { chip } from './case.mjs';

const R = 'work/relats/relats-assets/';
const PH = [165, 255, 285]; // card hues: strategy · brand · digital

export const C = {
  en: {
    title: 'Industrial & B2B branding — Barcelona | INFINIT©',
    desc: 'Branding and positioning for industrial and B2B companies (€1M–€200M): strategy, identity, website, SEO & GEO. Senior-led studio in Barcelona. See the Relats case.',
    lbl: 'Industrial & B2B branding',
    h1: 'Industrial companies that have outgrown <b>their brand.</b>',
    meta: [['For', 'Industrial & B2B companies'], ['Size', '€1M–€200M revenue'], ['Sectors', 'Manufacturing · Components · Automotive · Machinery'], ['Markets', 'Catalonia · Spain · Europe'], ['Led by', 'Cesc Callejas, founder']],
    probL: 'The problem',
    prob: 'Most industrial companies we meet are better than they look. Decades of engineering, quality and loyal clients — presented with a logo from another era, a catalogue website and a story only the founders can tell.',
    quoteL: 'In one line',
    quote: 'The company kept moving forward. <b>The brand stayed behind.</b>',
    sigL: 'Signs it’s time', sigH: 'Three signs your brand is holding you back.',
    sig: [
      ['01', 'You read like a supplier', 'Buyers, engineers and distributors see a component maker — not the partner, the technology or the leadership you’ve built.'],
      ['02', 'Sales carries the brand', 'Your team explains the company in every meeting, because the website, the catalogue and the trade-fair stand don’t do it for them.'],
      ['03', 'Abroad, you start from zero', 'International buyers, new markets and young talent find a company that looks smaller than it is. And when they ask Google or an AI assistant, clearer competitors get the mention.'],
    ],
    howL: 'How we work', howH: 'From the plant to the trade fair — one clear brand.',
    how: [
      ['Strategy', '2–4 weeks', 'Initial interviews with management, sales and key clients, one workshop and a deliverable session: how you are seen, who you really are, and the one idea that makes you win.'],
      ['Brand identity', 'From 2 weeks', 'Logo, visual system and tone of voice for plant, fleet, packaging, catalogue and stand. Progress sessions along the way and a final presentation. 3D, photography or extra content add time.'],
      ['Website, SEO & GEO', '1–2 months', 'UX/UI, design and custom development — no templates — with progress reviews until launch. Built to be found by Google and by AI assistants. More time if it includes a back office.'],
      ['Launch', 'Optional', 'A launch plan for the new brand, with a brand video — catalogues, trade fairs, sales decks and social, and your team ready to use it.'],
    ],
    pxL: 'Timing & investment', pxH: 'Clear timings. Clear budgets.',
    pxCols: ['Phase', 'Duration', 'Companies €1–10M', '€10–50M', '€50–200M'],
    px: [
      ['Strategy', '2–4 weeks', '€2–3k', '€4–7k', 'from €10k'],
      ['Brand identity', 'from 2 weeks', '€2–3k', '€5–10k', 'from €15k*'],
      ['Website, SEO & GEO', '1–2 months', '~€10k', '€12–18k', 'from €20k'],
      ['Launch plan + brand video', 'optional', '~€5k', '€7–8k', '~€10k'],
    ],
    pxNote: 'Guide figures, not fixed rates: we adapt to each company’s budget — tell us what you have and we’ll propose a scope that fits. *More with many assets: 3D, photography, content. Strategy and brand can be ready in little over a month.',
    caseL: 'Case · Relats', caseH: 'From component supplier to global partner.',
    caseP: 'Relats engineers technical covering solutions for e-mobility, automotive and wind energy. Its brand read like a parts supplier. We repositioned it as a global partner in innovative, safety-driven solutions — strategy, identity and a new digital platform.',
    caseBtn: 'See the Relats case',
    expL: 'Experience across', exp: 'Girbau · Relats · Repsol · SAP · Seidor · Almirall · Glovo · Mercadona · Casa Tarradellas',
    faqL: 'FAQ', faqH: 'What industrial companies ask us.',
    faq: [
      ['Do we have to change our name and logo?', 'Not necessarily. Often the name carries decades of trust and should stay; what changes is the positioning, the story and how the brand is applied. We recommend a full rebrand only when the strategy shows the current one is holding you back.'],
      ['How long does it take?', 'Strategy usually takes 2 weeks to a month, depending on how complex the company is. A rebrand can be done in about 2 weeks. A website takes around a month — two if it is complex or needs a back office. 3D, photography or extra content add time. We work fast: strategy and brand can be ready in little over a month.'],
      ['How much does it cost?', 'It depends on the size of the company and the scope. Companies of €1–10M: strategy €2–3k, brand identity €2–3k, website ~€10k. Companies of €10–50M: strategy €4–7k, brand identity €5–10k, website €12–18k. Companies of €50–200M: strategy from €10k, brand identity from €15k (more with 3D, photography or content), website from €20k. A launch plan with a brand video: around €5k, €7–8k for companies of €10–50M and around €10k from €50M. These are guide figures: if your budget is different, tell us — we adapt the scope.'],
      ['What does the process look like?', 'Strategy: initial interviews, one workshop and a deliverable session. Brand: time to work, progress sessions and a final presentation. Then UX/UI, design and development, showing you the progress until the result is live. Cesc Callejas leads every project personally.'],
      ['Do you build on WordPress or Webflow?', 'No. Templates never quite fit and become expensive to change. We build custom, lightweight websites with simple maintenance — and a custom back office when you need one, which is much faster to work with.'],
      ['Do you work outside Catalonia?', 'Yes. We are based in Barcelona and work in Catalan, Spanish and English with companies across Spain and Europe, and with brands that sell worldwide.'],
    ],
    ctaH: 'Is your brand behind <b>your company?</b>', ctaP: 'Tell us where you are. We’ll tell you honestly whether a brand project makes sense now.',
  },
  ca: {
    title: 'Branding industrial i B2B — Barcelona | INFINIT©',
    desc: 'Branding i posicionament per a empreses industrials i B2B (d’1 a 200 M€): estratègia, identitat, web, SEO i GEO. Estudi sènior a Barcelona. Mira el cas Relats.',
    lbl: 'Branding industrial i B2B',
    h1: 'Empreses industrials que han crescut més que <b>la seva marca.</b>',
    meta: [['Per a', 'Empreses industrials i B2B'], ['Mida', 'D’1 a 200 M€ de facturació'], ['Sectors', 'Fabricació · Components · Automoció · Maquinària'], ['Mercats', 'Catalunya · Espanya · Europa'], ['Liderat per', 'Cesc Callejas, fundador']],
    probL: 'El problema',
    prob: 'La majoria d’empreses industrials que coneixem són millors del que semblen. Dècades d’enginyeria, qualitat i clients fidels — presentades amb un logo d’una altra època, una web catàleg i una història que només saben explicar els fundadors.',
    quoteL: 'En una frase',
    quote: 'L’empresa ha seguit avançant. <b>La marca s’ha quedat enrere.</b>',
    sigL: 'Senyals', sigH: 'Tres senyals que la marca us frena.',
    sig: [
      ['01', 'Sembleu un proveïdor', 'Compradors, enginyers i distribuïdors hi veuen un fabricant de components — no el soci, la tecnologia ni el lideratge que heu construït.'],
      ['02', 'La marca la carrega l’equip comercial', 'Els vostres comercials expliquen l’empresa a cada reunió, perquè ni la web, ni el catàleg, ni l’estand de fira ho fan per ells.'],
      ['03', 'Fora, comenceu de zero', 'Compradors internacionals, nous mercats i talent jove hi troben una empresa que sembla més petita del que és. I quan pregunten a Google o a un assistent d’IA, surten competidors amb una marca més clara.'],
    ],
    howL: 'Com treballem', howH: 'De la planta a la fira — una sola marca clara.',
    how: [
      ['Estratègia', '2–4 setmanes', 'Entrevistes inicials amb direcció, equip comercial i clients clau, un workshop i una sessió d’entrega: com us veuen, qui sou de debò i la idea que us fa guanyar.'],
      ['Identitat de marca', 'Des de 2 setmanes', 'Logo, sistema visual i to de veu per a planta, flota, packaging, catàleg i estand. Sessions per veure l’avenç i una presentació final. El 3D, la fotografia o més contingut allarguen el termini.'],
      ['Web, SEO i GEO', '1–2 mesos', 'UX/UI, disseny i programació a mida — sense plantilles — ensenyant-vos el progrés fins al llançament. Feta perquè la trobin Google i els assistents d’IA. Més temps si inclou backoffice.'],
      ['Llançament', 'Opcional', 'Un pla de llançament de la nova marca, amb un vídeo de marca — catàlegs, fires, presentacions comercials i xarxes, i l’equip preparat per fer-la servir.'],
    ],
    pxL: 'Terminis i inversió', pxH: 'Terminis clars. Pressupostos clars.',
    pxCols: ['Fase', 'Durada', 'Empreses d’1 a 10 M€', 'De 10 a 50 M€', 'De 50 a 200 M€'],
    px: [
      ['Estratègia', '2–4 setmanes', '2–3 k€', '4–7 k€', 'des de 10 k€'],
      ['Identitat de marca', 'des de 2 setmanes', '2–3 k€', '5–10 k€', 'des de 15 k€*'],
      ['Web, SEO i GEO', '1–2 mesos', '~10 k€', '12–18 k€', 'des de 20 k€'],
      ['Pla de llançament + vídeo de marca', 'opcional', '~5 k€', '7–8 k€', '~10 k€'],
    ],
    pxNote: 'Xifres orientatives, no tarifes tancades: ens adaptem al pressupost de cada empresa — expliqueu-nos de què disposeu i us proposarem un abast que hi encaixi. *Més si hi ha molts recursos: 3D, fotografia, contingut. Estratègia i marca poden estar llestes en poc més d’un mes.',
    caseL: 'Cas · Relats', caseH: 'De proveïdor de components a soci global.',
    caseP: 'Relats desenvolupa solucions tècniques de protecció per a la mobilitat elèctrica, l’automoció i l’energia eòlica. La seva marca semblava la d’un proveïdor de peces. La vam reposicionar com a soci global en solucions innovadores i de seguretat — estratègia, identitat i una nova plataforma digital.',
    caseBtn: 'Mira el cas Relats',
    expL: 'Experiència a', exp: 'Girbau · Relats · Repsol · SAP · Seidor · Almirall · Glovo · Mercadona · Casa Tarradellas',
    faqL: 'Preguntes freqüents', faqH: 'El que ens pregunten les empreses industrials.',
    faq: [
      ['Hem de canviar el nom i el logo?', 'No necessàriament. Sovint el nom porta dècades de confiança i s’ha de mantenir; el que canvia és el posicionament, el relat i com s’aplica la marca. Només recomanem un rebranding complet quan l’estratègia demostra que l’actual us frena.'],
      ['Quant dura?', 'L’estratègia sol durar de 15 dies a un mes, segons la complexitat de l’empresa. Un rebranding es pot fer en unes 2 setmanes. Una web, un mes de feina — dos si és complexa o té backoffice. El 3D, la fotografia o més contingut allarguen el termini. Som àgils: estratègia i marca poden estar llestes en poc més d’un mes.'],
      ['Quant costa?', 'Depèn de la mida de l’empresa i de l’abast. Empreses d’1 a 10 M€: estratègia 2–3 k€, identitat de marca 2–3 k€, web ~10 k€. Empreses de 10 a 50 M€: estratègia 4–7 k€, identitat de marca 5–10 k€, web 12–18 k€. Empreses de 50 a 200 M€: estratègia des de 10 k€, identitat de marca des de 15 k€ (més amb 3D, fotografia o contingut), web des de 20 k€. Un pla de llançament amb vídeo de marca: uns 5 k€; 7–8 k€ per a empreses de 10 a 50 M€ i uns 10 k€ a partir de 50 M€. Són xifres orientatives: si el vostre pressupost és un altre, digueu-nos-ho — adaptem l’abast.'],
      ['Com és el procés?', 'Estratègia: entrevistes inicials, un workshop i una sessió d’entrega. Marca: temps de feina, sessions per veure l’avenç i una presentació final. Després, UX/UI, disseny i programació, ensenyant-vos el progrés fins tenir el resultat. En Cesc Callejas lidera personalment cada projecte.'],
      ['Feu webs amb WordPress o Webflow?', 'No. Les plantilles mai s’acaben d’ajustar i costa molt tocar-les. Fem webs a mida, lleugeres i amb un manteniment senzill — i, si cal, un backoffice a mida, molt més ràpid de fer servir.'],
      ['Treballeu fora de Catalunya?', 'Sí. Som a Barcelona i treballem en català, castellà i anglès amb empreses de tot l’Estat i d’Europa, i amb marques que venen arreu del món.'],
    ],
    ctaH: 'La vostra marca va per darrere <b>de l’empresa?</b>', ctaP: 'Expliqueu-nos on sou. Us direm amb sinceritat si ara té sentit un projecte de marca.',
  },
  es: {
    title: 'Branding industrial y B2B — Barcelona | INFINIT©',
    desc: 'Branding y posicionamiento para empresas industriales y B2B (de 1 a 200 M€): estrategia, identidad, web, SEO y GEO. Estudio sénior en Barcelona. Mira el caso Relats.',
    lbl: 'Branding industrial y B2B',
    h1: 'Empresas industriales que han crecido más que <b>su marca.</b>',
    meta: [['Para', 'Empresas industriales y B2B'], ['Tamaño', 'De 1 a 200 M€ de facturación'], ['Sectores', 'Fabricación · Componentes · Automoción · Maquinaria'], ['Mercados', 'Cataluña · España · Europa'], ['Liderado por', 'Cesc Callejas, fundador']],
    probL: 'El problema',
    prob: 'La mayoría de empresas industriales que conocemos son mejores de lo que parecen. Décadas de ingeniería, calidad y clientes fieles — presentadas con un logo de otra época, una web catálogo y una historia que solo saben contar los fundadores.',
    quoteL: 'En una frase',
    quote: 'La empresa ha seguido avanzando. <b>La marca se ha quedado atrás.</b>',
    sigL: 'Señales', sigH: 'Tres señales de que la marca os frena.',
    sig: [
      ['01', 'Parecéis un proveedor', 'Compradores, ingenieros y distribuidores ven un fabricante de componentes — no el socio, la tecnología ni el liderazgo que habéis construido.'],
      ['02', 'La marca la carga el equipo comercial', 'Vuestros comerciales explican la empresa en cada reunión, porque ni la web, ni el catálogo, ni el stand de feria lo hacen por ellos.'],
      ['03', 'Fuera, empezáis de cero', 'Compradores internacionales, nuevos mercados y talento joven encuentran una empresa que parece más pequeña de lo que es. Y cuando preguntan a Google o a un asistente de IA, aparecen competidores con una marca más clara.'],
    ],
    howL: 'Cómo trabajamos', howH: 'De la planta a la feria — una sola marca clara.',
    how: [
      ['Estrategia', '2–4 semanas', 'Entrevistas iniciales con dirección, equipo comercial y clientes clave, un workshop y una sesión de entrega: cómo os ven, quiénes sois de verdad y la idea que os hace ganar.'],
      ['Identidad de marca', 'Desde 2 semanas', 'Logo, sistema visual y tono de voz para planta, flota, packaging, catálogo y stand. Sesiones para ver el avance y una presentación final. El 3D, la fotografía o más contenido alargan el plazo.'],
      ['Web, SEO y GEO', '1–2 meses', 'UX/UI, diseño y programación a medida — sin plantillas — enseñándoos el progreso hasta el lanzamiento. Hecha para que la encuentren Google y los asistentes de IA. Más tiempo si incluye backoffice.'],
      ['Lanzamiento', 'Opcional', 'Un plan de lanzamiento de la nueva marca, con un vídeo de marca — catálogos, ferias, presentaciones comerciales y redes, y el equipo preparado para usarla.'],
    ],
    pxL: 'Plazos e inversión', pxH: 'Plazos claros. Presupuestos claros.',
    pxCols: ['Fase', 'Duración', 'Empresas de 1 a 10 M€', 'De 10 a 50 M€', 'De 50 a 200 M€'],
    px: [
      ['Estrategia', '2–4 semanas', '2–3 k€', '4–7 k€', 'desde 10 k€'],
      ['Identidad de marca', 'desde 2 semanas', '2–3 k€', '5–10 k€', 'desde 15 k€*'],
      ['Web, SEO y GEO', '1–2 meses', '~10 k€', '12–18 k€', 'desde 20 k€'],
      ['Plan de lanzamiento + vídeo de marca', 'opcional', '~5 k€', '7–8 k€', '~10 k€'],
    ],
    pxNote: 'Cifras orientativas, no tarifas cerradas: nos adaptamos al presupuesto de cada empresa — contadnos de qué disponéis y os propondremos un alcance que encaje. *Más si hay muchos recursos: 3D, fotografía, contenido. Estrategia y marca pueden estar listas en poco más de un mes.',
    caseL: 'Caso · Relats', caseH: 'De proveedor de componentes a socio global.',
    caseP: 'Relats desarrolla soluciones técnicas de protección para la movilidad eléctrica, la automoción y la energía eólica. Su marca parecía la de un proveedor de piezas. La reposicionamos como socio global en soluciones innovadoras y de seguridad — estrategia, identidad y una nueva plataforma digital.',
    caseBtn: 'Mira el caso Relats',
    expL: 'Experiencia en', exp: 'Girbau · Relats · Repsol · SAP · Seidor · Almirall · Glovo · Mercadona · Casa Tarradellas',
    faqL: 'Preguntas frecuentes', faqH: 'Lo que nos preguntan las empresas industriales.',
    faq: [
      ['¿Tenemos que cambiar el nombre y el logo?', 'No necesariamente. A menudo el nombre acumula décadas de confianza y hay que mantenerlo; lo que cambia es el posicionamiento, el relato y cómo se aplica la marca. Solo recomendamos un rebranding completo cuando la estrategia demuestra que el actual os frena.'],
      ['¿Cuánto dura?', 'La estrategia suele durar de 15 días a un mes, según la complejidad de la empresa. Un rebranding se puede hacer en unas 2 semanas. Una web, un mes de trabajo — dos si es compleja o tiene backoffice. El 3D, la fotografía o más contenido alargan el plazo. Somos ágiles: estrategia y marca pueden estar listas en poco más de un mes.'],
      ['¿Cuánto cuesta?', 'Depende del tamaño de la empresa y del alcance. Empresas de 1 a 10 M€: estrategia 2–3 k€, identidad de marca 2–3 k€, web ~10 k€. Empresas de 10 a 50 M€: estrategia 4–7 k€, identidad de marca 5–10 k€, web 12–18 k€. Empresas de 50 a 200 M€: estrategia desde 10 k€, identidad de marca desde 15 k€ (más con 3D, fotografía o contenido), web desde 20 k€. Un plan de lanzamiento con vídeo de marca: unos 5 k€; 7–8 k€ para empresas de 10 a 50 M€ y unos 10 k€ a partir de 50 M€. Son cifras orientativas: si vuestro presupuesto es otro, decídnoslo — adaptamos el alcance.'],
      ['¿Cómo es el proceso?', 'Estrategia: entrevistas iniciales, un workshop y una sesión de entrega. Marca: tiempo de trabajo, sesiones para ver el avance y una presentación final. Después, UX/UI, diseño y programación, enseñándoos el progreso hasta tener el resultado. Cesc Callejas lidera personalmente cada proyecto.'],
      ['¿Hacéis webs con WordPress o Webflow?', 'No. Las plantillas nunca acaban de ajustarse y cuesta mucho tocarlas. Hacemos webs a medida, ligeras y con un mantenimiento sencillo — y, si hace falta, un backoffice a medida, mucho más rápido de usar.'],
      ['¿Trabajáis fuera de Cataluña?', 'Sí. Estamos en Barcelona y trabajamos en catalán, castellano e inglés con empresas de toda España y Europa, y con marcas que venden en todo el mundo.'],
    ],
    ctaH: '¿Vuestra marca va por detrás <b>de la empresa?</b>', ctaP: 'Contadnos dónde estáis. Os diremos con sinceridad si ahora tiene sentido un proyecto de marca.',
  },
};

export function industrial(ctx) {
  const { lang } = ctx, c = C[lang], t = T[lang];

  const hero = `<section class="ch dark" id="top" data-h="n"><div class="ch-bg"><div class="img"><img src="${A('project/assets/imagery/relats-industrial.webp')}" alt="" fetchpriority="high"></div></div>
<div class="ch-t"><a class="gbtn" href="${url(lang, 'home')}"><span class="ar bk" aria-hidden="true">←</span><span class="roll">${esc(t.home)}</span></a></div>
<div class="ch-m"><span class="lbl sx-l">${esc(c.lbl)}</span><h1 data-lines>${c.h1}</h1></div>
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

  const proof = `<section class="full" style="margin-top:clamp(90px,11vw,170px)"><div class="img"><img src="${A(R + 'offices.webp')}" alt="" loading="lazy"></div><div><span class="lbl">${esc(c.caseL)}</span><h2 class="h2" data-lines>${esc(c.caseH)}</h2><p>${esc(c.caseP)}</p>
<a class="gbtn" href="${url(lang, 'relats')}" style="--bh:30;align-self:flex-start;color:#fff;background:oklch(1 0 0 / .14)"><span class="roll">${esc(c.caseBtn)}</span><span class="ar" aria-hidden="true">↗</span></a></div></section>
<section class="blk sx-exp"><span class="lbl">${esc(c.expL)}</span><p>${esc(c.exp)}</p></section>`;

  const faq = `<section class="blk g12 sx-faq" data-h="88"><div class="sx-fh"><span class="lbl">${esc(c.faqL)}</span><h2 class="h2" data-lines>${esc(c.faqH)}</h2></div>
<div class="faq">${c.faq.map(([q, a]) => `<details><summary><span>${esc(q)}</span><i aria-hidden="true"></i></summary><p>${esc(a)}</p></details>`).join('')}</div></section>`;

  const cta = `<section class="dark xp" id="contact" data-h="n" style="margin-top:clamp(90px,11vw,170px)">${ftLine}
<div class="cta2"><h2 class="em" data-lines>${c.ctaH}</h2><p class="sx-cp">${esc(c.ctaP)}</p>
<button class="mail" type="button" data-copy="${EMAIL}" data-cur="${esc(t.cCopy)}" aria-label="${esc(t.copyEmail)}: ${EMAIL}"><span class="mt">${EMAIL}</span></button></div></section>`;

  const ld = { name: c.lbl, serviceType: 'Branding', audience: c.meta[0][1] + ' · ' + c.meta[1][1] + ' · ' + c.meta[3][1], faq: c.faq,
    caseName: 'Relats', caseUrl: abs(lang, 'relats') };
  return head(ctx, { title: c.title, desc: c.desc, og: '/assets/site/og/relats.jpg', css: ['inner', 'studio'], ld }) +
    `\n<main id="main">\n${[hero, meta, problem, signs, how, prices, proof, faq, cta].join('\n')}\n</main>\n` + end(ctx);
}
