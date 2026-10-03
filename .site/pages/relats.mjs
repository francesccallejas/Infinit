// Case: Relats — port of prototype/pages/case-relats.html.
import { esc, A } from '../lib.mjs';
import { T } from '../i18n.mjs';
import { head, end } from '../layout.mjs';
import { chip, caseHero, meta, about, video, nextCase, swatches } from './case.mjs';

const R = 'work/relats/relats-assets/';
const LIVE = 'https://www.relats.com';

const C = {
  en: {
    title: 'Relats case study — INFINIT©',
    desc: 'How INFINIT© repositioned Relats — strategy, identity and digital for a global leader in technical covering solutions.',
    h1: 'Staying ahead of <b>the curve.</b>', live: 'See it live ↗',
    meta: [['Client', 'Relats'], ['My role', 'CDMO — Brand Director & Project Lead'], ['Partner', 'In collaboration with Firma'], ['Sector', 'Sustainable mobility · Automotive · Energy'], ['Scope', 'Strategy · Identity · Digital']],
    whoL: 'Who is Relats', who: 'Relats protects what moves the world. From e-mobility and automotive to wind energy, it engineers innovative, safety-driven covering solutions trusted by industries across the globe.',
    defL: 'The definition', quote: '“We are your global trusted partner in <b>innovative and safety covering solutions.”</b>',
    vFilm: 'Brand film', vMark: 'The mark, in motion', vCord: 'Tie cord product film',
    steps: [['01 · The challenge', 'Engineering ahead of its image.', 'Relats isn’t just a manufacturer — it’s a partner protecting what moves the world, from e-mobility to wind energy. But its brand read like a component supplier, not the innovation-led leader it has become.', 'Positioning', 'Join the ride campaign'],
      ['02 · The idea', 'Anticipating what’s <b>around the bend.</b>', 'One line to lead everything — a confident story built on partnerships with industry leaders and innovators who share a commitment to excellence and cutting-edge technology.', 'Strategy', 'Relats brand on screen'],
      ['03 · The build', 'A vivid system — on every screen.', 'Orange, electric blue and green over warm greys, a colour-overlap mark and a fast, scalable website. Technical where it matters, human where it counts.', 'Identity · Digital', 'EMI shielding sleeve']],
    fullL: 'Made visible', fullH: 'Protection you can see.',
    fullP: 'From electromagnetic shielding to extreme heat and abrasion, Relats’ covering solutions perform where it’s invisible — so we made the engineering the hero of the story.',
    webL: 'The brand, online', webH: 'Now live on the web.', webBtn: 'See it in action', webAlt: 'Relats website',
    sysL: 'The system · Colour & type', sysH: 'The real Relats palette — primary, accent and neutral.',
    sw: ['Orange', 'Black', 'Blue', 'Green', 'Orange 02', 'Ultimate Grey', 'Warm Grey', 'White'],
    typeL: 'Relats’ typefaces', tDisplay: 'Display / UI', tData: 'Technical data',
    fldL: 'Selected work', fldH: 'In the field.', topTier: 'Top Tier Products — Landing Page · Recognised by Awwwards',
    fld: ['Social', 'App', 'Workplace', 'Performance', 'Merchandise', 'Product site', 'Landing', 'Mobile'],
    anL: 'Last but not least', anH: 'One analytics language for every internal app.',
    anP: 'We defined a set of <b style="color:var(--t4);font-weight:500">Analytics Guidelines</b> — shared dashboards, metrics and data-visualisation rules — so every internal application speaks the same language. Consistent, legible, and built to scale across the organisation.',
    anAlt: 'Relats Data Center dashboard',
  },
  ca: {
    title: 'Relats, cas d’estudi — INFINIT©',
    desc: 'Com INFINIT© va reposicionar Relats — estratègia, identitat i digital per a un líder global en solucions de protecció tècnica.',
    h1: 'Un pas <b>per davant.</b>', live: 'Visita la web ↗',
    meta: [['Client', 'Relats'], ['El meu rol', 'CDMO — Director de marca i cap de projecte'], ['Partner', 'En col·laboració amb Firma'], ['Sector', 'Mobilitat sostenible · Automoció · Energia'], ['Abast', 'Estratègia · Identitat · Digital']],
    whoL: 'Qui és Relats', who: 'Relats protegeix allò que mou el món. De la mobilitat elèctrica i l’automoció a l’energia eòlica, desenvolupa solucions de protecció innovadores i centrades en la seguretat, en què confien indústries de tot el món.',
    defL: 'La definició', quote: '“Som el teu partner global de confiança en <b>solucions de protecció innovadores i segures.”</b>',
    vFilm: 'Film de marca', vMark: 'El símbol, en moviment', vCord: 'Film de producte del cordó',
    steps: [['01 · El repte', 'Una enginyeria per davant de la seva imatge.', 'Relats no és només un fabricant — és un partner que protegeix allò que mou el món, de la mobilitat elèctrica a l’energia eòlica. Però la seva marca semblava la d’un proveïdor de components, no la del líder innovador en què s’ha convertit.', 'Posicionament', 'Campanya Join the ride'],
      ['02 · La idea', 'Anticipar el que hi ha <b>després del revolt.</b>', 'Una sola línia per liderar-ho tot — un relat segur, construït sobre aliances amb líders del sector i innovadors que comparteixen el compromís amb l’excel·lència i la tecnologia més avançada.', 'Estratègia', 'La marca Relats en pantalla'],
      ['03 · La construcció', 'Un sistema viu — a cada pantalla.', 'Taronja, blau elèctric i verd sobre grisos càlids, un símbol de colors superposats i una web ràpida i escalable. Tècnica on cal, humana on compta.', 'Identitat · Digital', 'Funda de blindatge EMI']],
    fullL: 'Fet visible', fullH: 'Protecció que es veu.',
    fullP: 'Del blindatge electromagnètic a la calor extrema i l’abrasió, les solucions de Relats treballen on no es veu — per això vam fer de l’enginyeria la protagonista del relat.',
    webL: 'La marca, en línia', webH: 'Ara en línia.', webBtn: 'Mira-la en acció', webAlt: 'Web de Relats',
    sysL: 'El sistema · Color i tipografia', sysH: 'La paleta real de Relats — primaris, accents i neutres.',
    sw: ['Taronja', 'Negre', 'Blau', 'Verd', 'Taronja 02', 'Ultimate Grey', 'Gris càlid', 'Blanc'],
    typeL: 'Les tipografies de Relats', tDisplay: 'Display / UI', tData: 'Dades tècniques',
    fldL: 'Feina seleccionada', fldH: 'Sobre el terreny.', topTier: 'Top Tier Products — Landing page · Reconeguda per Awwwards',
    fld: ['Social', 'App', 'Espai de treball', 'Performance', 'Marxandatge', 'Web de producte', 'Landing', 'Mòbil'],
    anL: 'Per acabar', anH: 'Un sol llenguatge analític per a totes les apps internes.',
    anP: 'Vam definir unes <b style="color:var(--t4);font-weight:500">Analytics Guidelines</b> — dashboards, mètriques i normes de visualització de dades compartides — perquè totes les aplicacions internes parlin el mateix llenguatge. Coherent, llegible i fet per escalar a tota l’organització.',
    anAlt: 'Dashboard del Data Center de Relats',
  },
  es: {
    title: 'Relats, caso de estudio — INFINIT©',
    desc: 'Cómo INFINIT© reposicionó Relats — estrategia, identidad y digital para un líder global en soluciones de protección técnica.',
    h1: 'Un paso <b>por delante.</b>', live: 'Visita la web ↗',
    meta: [['Cliente', 'Relats'], ['Mi rol', 'CDMO — Director de marca y jefe de proyecto'], ['Partner', 'En colaboración con Firma'], ['Sector', 'Movilidad sostenible · Automoción · Energía'], ['Alcance', 'Estrategia · Identidad · Digital']],
    whoL: 'Quién es Relats', who: 'Relats protege lo que mueve el mundo. De la movilidad eléctrica y la automoción a la energía eólica, desarrolla soluciones de protección innovadoras y centradas en la seguridad, en las que confían industrias de todo el mundo.',
    defL: 'La definición', quote: '“Somos tu partner global de confianza en <b>soluciones de protección innovadoras y seguras.”</b>',
    vFilm: 'Film de marca', vMark: 'El símbolo, en movimiento', vCord: 'Film de producto del cordón',
    steps: [['01 · El reto', 'Una ingeniería por delante de su imagen.', 'Relats no es solo un fabricante — es un partner que protege lo que mueve el mundo, de la movilidad eléctrica a la energía eólica. Pero su marca parecía la de un proveedor de componentes, no la del líder innovador en que se ha convertido.', 'Posicionamiento', 'Campaña Join the ride'],
      ['02 · La idea', 'Anticipar lo que hay <b>tras la curva.</b>', 'Una sola línea para liderarlo todo — un relato seguro, construido sobre alianzas con líderes del sector e innovadores que comparten el compromiso con la excelencia y la tecnología más avanzada.', 'Estrategia', 'La marca Relats en pantalla'],
      ['03 · La construcción', 'Un sistema vivo — en cada pantalla.', 'Naranja, azul eléctrico y verde sobre grises cálidos, un símbolo de colores superpuestos y una web rápida y escalable. Técnica donde importa, humana donde cuenta.', 'Identidad · Digital', 'Funda de blindaje EMI']],
    fullL: 'Hecho visible', fullH: 'Protección que se ve.',
    fullP: 'Del blindaje electromagnético al calor extremo y la abrasión, las soluciones de Relats trabajan donde no se ve — por eso hicimos de la ingeniería la protagonista del relato.',
    webL: 'La marca, en línea', webH: 'Ya en línea.', webBtn: 'Mírala en acción', webAlt: 'Web de Relats',
    sysL: 'El sistema · Color y tipografía', sysH: 'La paleta real de Relats — primarios, acentos y neutros.',
    sw: ['Naranja', 'Negro', 'Azul', 'Verde', 'Naranja 02', 'Ultimate Grey', 'Gris cálido', 'Blanco'],
    typeL: 'Las tipografías de Relats', tDisplay: 'Display / UI', tData: 'Datos técnicos',
    fldL: 'Trabajo seleccionado', fldH: 'Sobre el terreno.', topTier: 'Top Tier Products — Landing page · Reconocida por Awwwards',
    fld: ['Social', 'App', 'Espacio de trabajo', 'Performance', 'Merchandising', 'Web de producto', 'Landing', 'Móvil'],
    anL: 'Por último', anH: 'Un único lenguaje analítico para todas las apps internas.',
    anP: 'Definimos unas <b style="color:var(--t4);font-weight:500">Analytics Guidelines</b> — dashboards, métricas y normas de visualización de datos compartidas — para que todas las aplicaciones internas hablen el mismo lenguaje. Coherente, legible y hecho para escalar en toda la organización.',
    anAlt: 'Dashboard del Data Center de Relats',
  },
};

const STEP_IMG = ['join-the-ride', 'brand-context-2', 'emi-hero'], STEP_H = [165, 255, 285];
const FLD = ['social-1', 'mobile-app', 'offices', 'social-2', 'brand-context-1', 'web-section', 'web-mockup', 'mobile'];
const SW = [['#FF5710', '#fff'], ['#1C1C1C', '#fff'], ['#3131FF', '#fff'], ['#42CC8B'], ['#FF9E2C'], ['#E0DBD7'], ['#F5F1ED'], ['#FFFFFF', '', true]];
const darkChip = 'style="color:var(--t4);background:oklch(.16 .004 85 / .06);align-self:flex-start"';

export function relats(ctx) {
  const { lang } = ctx, c = C[lang];

  const body = [
    caseHero(ctx, { img: R + 'emi-hero-lg-2400.webp', logo: 'project/assets/clients/relats.png', logoStyle: ' style="filter:brightness(0) invert(1)"', name: 'Relats', h1: c.h1,
      chips: chip('strategy', lang) + chip('brand', lang) + chip('digital', lang) + `<a class="chip" href="${LIVE}" target="_blank" rel="noopener">${esc(c.live)}</a>` }),
    meta(c.meta),
    about(c),
    `<section class="blk"><div class="vids">
${video({ file: R + 'brand-film.mp4', poster: R + 'film-poster.jpg', label: c.vFilm, cls: 'wide' })}
${video({ file: R + 'logo-motion-dark.mp4', poster: R + 'logo-dark-poster.jpg', label: c.vMark })}
${video({ file: R + 'tie-cord.mp4', poster: R + 'tie-cord-poster.jpg', alt: c.vCord, delay: '.06s' })}
</div></section>`,
    `<section class="blk"><div>${c.steps.map((s, i) => `<div class="step" data-h="${STEP_H[i]}"><div class="tx rv"><span class="lbl">${esc(s[0])}</span><h3${i === 1 ? ' class="em"' : ''}>${s[1]}</h3><p>${esc(s[2])}</p><span class="chip" ${darkChip}>${esc(s[3])}</span></div><div class="img clip"><img src="${A(R + STEP_IMG[i] + '.webp')}" alt="${esc(s[4])}" loading="lazy"></div></div>`).join('')}</div></section>`,
    `<section class="full" style="margin-top:clamp(70px,8vw,120px)"><div class="img"><img src="${A(R + 'turbine-2400.webp')}" alt="" loading="lazy"></div><div><span class="lbl">${esc(c.fullL)}</span><h2 class="h2" data-lines>${esc(c.fullH)}</h2><p>${esc(c.fullP)}</p></div></section>`,
    `<section class="blk"><div class="sh"><div><span class="lbl">${esc(c.webL)}</span><h2 class="h2" data-lines>${esc(c.webH)}</h2></div><a class="gbtn" href="${LIVE}" target="_blank" rel="noopener" style="--bh:30"><span class="roll">${esc(c.webBtn)}</span><span class="ar" aria-hidden="true">↗</span></a></div>
<div class="img clip" style="border-radius:14px;aspect-ratio:16/9"><img src="${A(R + 'staying-ahead.webp')}" alt="${esc(c.webAlt)}" loading="lazy"></div></section>`,
    `<section class="blk"><div class="sh"><div><span class="lbl">${esc(c.sysL)}</span><h2 class="h2" data-lines>${esc(c.sysH)}</h2></div></div>
${swatches(SW.map(([hex, fg, b], i) => [c.sw[i], hex, fg, b]), 8)}
<div class="tpf rv"><div><span class="lbl">${esc(c.typeL)}</span><span class="aa" aria-hidden="true">Aa</span></div><div><ul><li>Roobert <span>${esc(c.tDisplay)}</span></li><li style="font-family:ui-monospace,monospace;font-size:clamp(18px,1.8vw,28px)">DM Mono <span>${esc(c.tData)}</span></li></ul></div></div></section>`,
    `<section class="blk" data-h="30"><div class="sh"><div><span class="lbl">${esc(c.fldL)}</span><h2 class="h2" data-lines>${esc(c.fldH)}</h2></div></div>
${video({ file: R + 'top-tier.mp4', poster: R + 'top-tier-poster.jpg', label: c.topTier, cls: 'wide' }).replace('class="vd rv wide"', 'class="vd rv wide" style="margin-bottom:12px"')}
<div class="fld">${FLD.map((s, i) => `<div class="rv" style="transition-delay:${(i % 4) * .05}s"><div class="img"><img src="${A(R + s + '.webp')}" alt="${esc(c.fld[i])}" loading="lazy"></div><span class="chip">${esc(c.fld[i])}</span></div>`).join('')}</div></section>`,
    `<section class="blk g12" data-h="255"><div style="grid-column:1/6;display:flex;flex-direction:column;gap:18px" class="rv"><span class="lbl">${esc(c.anL)}</span><h2 class="h2">${esc(c.anH)}</h2><p style="font-size:17px;line-height:1.5;color:var(--t3)">${c.anP}</p></div>
<div style="grid-column:7/13;position:relative"><div class="img clip" style="border-radius:14px;aspect-ratio:4/3"><img src="${A(R + 'analytics.webp')}" alt="${esc(c.anAlt)}" loading="lazy"></div><span class="chip" style="position:absolute;left:14px;bottom:14px">data.relats.com</span></div></section>`,
    nextCase(ctx, 'bunnker'),
  ].join('\n');

  return head(ctx, { title: c.title, desc: c.desc, og: '/assets/site/og/relats.jpg', css: ['inner'] }) +
    `\n<main id="main">\n${body}\n</main>\n` + end(ctx);
}
