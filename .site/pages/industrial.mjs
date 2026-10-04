// Sector landing page: branding for industrial & B2B companies (EN / CA / ES).
// Built from the case-page building blocks (inner.css) + the Studio contact block (studio.css).
// Facts only from the site: Relats case, the founder's experience, the services list. No prices or
// durations are promised — the FAQ explains how they are set instead.
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
      ['Diagnosis', 'Interviews with management, sales and key clients. How you are seen versus who you really are — and what that gap is costing you.'],
      ['Positioning & story', 'One clear idea of why you win, written for buyers, partners and talent, in every language you sell in.'],
      ['Identity & system', 'Name, logo, visual system and tone of voice that work everywhere: plant, fleet, packaging, catalogue, stand.'],
      ['Website, SEO & GEO', 'A website that sells in every market and gets found — by Google and by AI assistants like ChatGPT, Claude or Perplexity.'],
      ['Rollout', 'Catalogues, sales decks, trade fairs, signage and social — and your team trained to use the brand on their own.'],
    ],
    caseL: 'Case · Relats', caseH: 'From component supplier to global partner.',
    caseP: 'Relats engineers technical covering solutions for e-mobility, automotive and wind energy. Its brand read like a parts supplier. We repositioned it as a global partner in innovative, safety-driven solutions — strategy, identity and a new digital platform.',
    caseBtn: 'See the Relats case',
    expL: 'Experience across', exp: 'Girbau · Relats · Repsol · SAP · Seidor · Almirall · Glovo · Mercadona · Casa Tarradellas',
    faqL: 'FAQ', faqH: 'What industrial companies ask us.',
    faq: [
      ['Do we have to change our name and logo?', 'Not necessarily. Often the name carries decades of trust and should stay; what changes is the positioning, the story and how the brand is applied. We recommend a full rebrand only when the diagnosis shows the current one is holding you back.'],
      ['How long does a rebranding take?', 'It depends on scope: a repositioning with a new visual identity is quicker than one that also includes a multilingual website and a full rollout to fleet, packaging and trade fairs. After a first conversation we propose a plan with clear phases and dates.'],
      ['How much does it cost?', 'It depends on scope and on the number of markets and languages. We agree a closed budget per phase before starting, so there are no surprises — and you can start with the diagnosis and decide from there.'],
      ['How do you involve management, the family and the sales team?', 'From day one. Interviews, workshops and checkpoints with the people who run and sell the company — the brand has to be theirs, not ours. Cesc Callejas leads every project personally.'],
      ['Do you also do the website, SEO and GEO?', 'Yes. Strategy, identity, website, SEO and GEO (being found and cited by AI assistants), product and content — one senior team, so nothing gets lost between agencies.'],
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
      ['Diagnosi', 'Entrevistes amb direcció, equip comercial i clients clau. Com us veuen i qui sou de debò — i què us costa aquesta diferència.'],
      ['Posicionament i relat', 'Una idea clara de per què guanyeu, escrita per a compradors, socis i talent, en tots els idiomes en què veneu.'],
      ['Identitat i sistema', 'Nom, logo, sistema visual i to de veu que funcionen a tot arreu: planta, flota, packaging, catàleg i estand.'],
      ['Web, SEO i GEO', 'Una web que ven a tots els mercats i que es troba — a Google i als assistents d’IA com ChatGPT, Claude o Perplexity.'],
      ['Desplegament', 'Catàlegs, presentacions comercials, fires, senyalística i xarxes — i l’equip preparat per fer servir la marca pel seu compte.'],
    ],
    caseL: 'Cas · Relats', caseH: 'De proveïdor de components a soci global.',
    caseP: 'Relats desenvolupa solucions tècniques de protecció per a la mobilitat elèctrica, l’automoció i l’energia eòlica. La seva marca semblava la d’un proveïdor de peces. La vam reposicionar com a soci global en solucions innovadores i de seguretat — estratègia, identitat i una nova plataforma digital.',
    caseBtn: 'Mira el cas Relats',
    expL: 'Experiència a', exp: 'Girbau · Relats · Repsol · SAP · Seidor · Almirall · Glovo · Mercadona · Casa Tarradellas',
    faqL: 'Preguntes freqüents', faqH: 'El que ens pregunten les empreses industrials.',
    faq: [
      ['Hem de canviar el nom i el logo?', 'No necessàriament. Sovint el nom porta dècades de confiança i s’ha de mantenir; el que canvia és el posicionament, el relat i com s’aplica la marca. Només recomanem un rebranding complet quan la diagnosi demostra que l’actual us frena.'],
      ['Quant dura un rebranding?', 'Depèn de l’abast: un reposicionament amb nova identitat visual és més ràpid que un que també inclou una web multilingüe i el desplegament a flota, packaging i fires. Després d’una primera conversa us proposem un pla amb fases i dates clares.'],
      ['Quant costa?', 'Depèn de l’abast i del nombre de mercats i idiomes. Acordem un pressupost tancat per fase abans de començar, sense sorpreses — i podeu començar per la diagnosi i decidir a partir d’aquí.'],
      ['Com hi impliqueu la direcció, la família i l’equip comercial?', 'Des del primer dia. Entrevistes, tallers i punts de control amb les persones que dirigeixen i venen l’empresa — la marca ha de ser seva, no nostra. En Cesc Callejas lidera personalment cada projecte.'],
      ['També feu la web, el SEO i el GEO?', 'Sí. Estratègia, identitat, web, SEO i GEO (que els assistents d’IA us trobin i us citin), producte i contingut — un sol equip sènior, perquè res no es perdi entre agències.'],
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
      ['Diagnóstico', 'Entrevistas con dirección, equipo comercial y clientes clave. Cómo os ven y quiénes sois de verdad — y qué os cuesta esa diferencia.'],
      ['Posicionamiento y relato', 'Una idea clara de por qué ganáis, escrita para compradores, socios y talento, en todos los idiomas en los que vendéis.'],
      ['Identidad y sistema', 'Nombre, logo, sistema visual y tono de voz que funcionan en todas partes: planta, flota, packaging, catálogo y stand.'],
      ['Web, SEO y GEO', 'Una web que vende en todos los mercados y que se encuentra — en Google y en asistentes de IA como ChatGPT, Claude o Perplexity.'],
      ['Despliegue', 'Catálogos, presentaciones comerciales, ferias, señalética y redes — y el equipo preparado para usar la marca por su cuenta.'],
    ],
    caseL: 'Caso · Relats', caseH: 'De proveedor de componentes a socio global.',
    caseP: 'Relats desarrolla soluciones técnicas de protección para la movilidad eléctrica, la automoción y la energía eólica. Su marca parecía la de un proveedor de piezas. La reposicionamos como socio global en soluciones innovadoras y de seguridad — estrategia, identidad y una nueva plataforma digital.',
    caseBtn: 'Mira el caso Relats',
    expL: 'Experiencia en', exp: 'Girbau · Relats · Repsol · SAP · Seidor · Almirall · Glovo · Mercadona · Casa Tarradellas',
    faqL: 'Preguntas frecuentes', faqH: 'Lo que nos preguntan las empresas industriales.',
    faq: [
      ['¿Tenemos que cambiar el nombre y el logo?', 'No necesariamente. A menudo el nombre acumula décadas de confianza y hay que mantenerlo; lo que cambia es el posicionamiento, el relato y cómo se aplica la marca. Solo recomendamos un rebranding completo cuando el diagnóstico demuestra que el actual os frena.'],
      ['¿Cuánto dura un rebranding?', 'Depende del alcance: un reposicionamiento con nueva identidad visual es más rápido que uno que también incluye una web multilingüe y el despliegue a flota, packaging y ferias. Tras una primera conversación os proponemos un plan con fases y fechas claras.'],
      ['¿Cuánto cuesta?', 'Depende del alcance y del número de mercados e idiomas. Acordamos un presupuesto cerrado por fase antes de empezar, sin sorpresas — y podéis empezar por el diagnóstico y decidir a partir de ahí.'],
      ['¿Cómo implicáis a la dirección, la familia y el equipo comercial?', 'Desde el primer día. Entrevistas, talleres y puntos de control con las personas que dirigen y venden la empresa — la marca tiene que ser suya, no nuestra. Cesc Callejas lidera personalmente cada proyecto.'],
      ['¿También hacéis la web, el SEO y el GEO?', 'Sí. Estrategia, identidad, web, SEO y GEO (que los asistentes de IA os encuentren y os citen), producto y contenido — un solo equipo sénior, para que nada se pierda entre agencias.'],
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
<ol class="proc">${c.how.map((s, i) => `<li class="rv" style="transition-delay:${(i * .05).toFixed(2)}s"><span class="lbl">0${i + 1}</span><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p></li>`).join('')}</ol></section>`;

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
    `\n<main id="main">\n${[hero, meta, problem, signs, how, proof, faq, cta].join('\n')}\n</main>\n` + end(ctx);
}
