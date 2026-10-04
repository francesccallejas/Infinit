// Case: Bunnker — port of prototype/pages/case-bunnker.html.
import { esc, A, dot, tint } from '../lib.mjs';
import { T } from '../i18n.mjs';
import { head, end } from '../layout.mjs';
import { chip, caseHero, meta, about, video, nextCase, swatches } from './case.mjs';

const B = 'work/bunnker/bunnker-assets/';
// COAC photos that are far from the 16:10 frame (portrait / squarish) are shown whole over a blurred copy; the rest fill it.
const FIT = [3, 5]; // coac-1 is zoomed 5% (its source has a thin white line along the bottom)

const C = {
  en: {
    title: 'Bunnker — Brand strategy & identity case study | INFINIT©',
    desc: 'How INFINIT© positioned and built Bunnker: strategy, identity and digital product for long-stay rentals in Barcelona — and a home recognised by COAC.',
    h1: 'Homes made for <b>living.</b>', award: 'COAC Award',
    meta: [['Client', 'Bunnker'], ['My role', 'Founder · Brand & Strategy Director'], ['Sector', 'Proptech · Long-stay rentals'], ['Scope', 'Strategy · Identity · Digital'], ['Recognition', 'COAC Award']],
    whoL: 'Who is Bunnker', who: 'Bunnker manages long-stay rentals end to end — designing and equipping homes that add value for owners, give tenants a place they love, and help agencies fill properties faster.',
    defL: 'The vision', quote: '“We make renting a true way of life — <b>homes designed and equipped, by and for living.”</b>',
    workL: 'The work', workH: 'Strategy, identity, experience.',
    pil: [['01 · Positioning', 'Strategy', 'We positioned Bunnker as a platform that manages long-stay rentals end to end — one model that adds value for owners, gives tenants a home they love, and helps agencies fill properties faster.'],
      ['02 · Brand & art direction', 'Identity', 'A warm coral-and-earth world, a living brandmark and an art direction that turn renting into a true way of life — homes designed and equipped, by and for living.'],
      ['03 · Digital & product', 'Experience', 'The website and product system — Bunnkea tu piso, Bunnky and Partner — bringing owners, tenants and agencies into one seamless experience.']],
    vMark: 'The mark, in motion', vWeb: 'The website, in motion',
    artL: 'Art direction', artH: 'The feeling, before the space.', drag: 'Drag ←→', artAlt: 'Bunnker art direction',
    intL: 'Interior design', intH: 'Spaces, in detail.', intAlt: 'Bunnker interior',
    awL: 'Recognition · COAC Award', awH: 'An award-winning home.',
    awP: 'A rooftop home in Barcelona — wood, brick and light — honoured by the Col·legi d’Arquitectes de Catalunya. Tap through the gallery to explore the project.',
    coacAlt: n => `COAC award-winning project — image ${n}`,
    sysL: 'The system · Colour & type', sysH: 'The Bunnker palette — coral, earth and light.',
    sw: ['Coral', 'Earth', 'Cream', 'White'], typeL: 'Bunnker’s typeface',
  },
  ca: {
    title: 'Bunnker — Estratègia i identitat de marca | INFINIT©',
    desc: 'Com INFINIT© va posicionar i construir Bunnker: estratègia, identitat i producte digital per al lloguer de llarga estada. Premi COAC.',
    h1: 'Llars fetes per <b>viure.</b>', award: 'Premi COAC',
    meta: [['Client', 'Bunnker'], ['El meu rol', 'Fundador · Director de marca i estratègia'], ['Sector', 'Proptech · Lloguer de llarga estada'], ['Abast', 'Estratègia · Identitat · Digital'], ['Reconeixement', 'Premi COAC']],
    whoL: 'Qui és Bunnker', who: 'Bunnker gestiona lloguers de llarga estada de principi a fi — dissenya i equipa habitatges que aporten valor als propietaris, donen als inquilins un lloc que estimen i ajuden les agències a llogar més ràpid.',
    defL: 'La visió', quote: '“Fem del lloguer una autèntica manera de viure — <b>llars dissenyades i equipades per i per a viure.”</b>',
    workL: 'La feina', workH: 'Estratègia, identitat, experiència.',
    pil: [['01 · Posicionament', 'Estratègia', 'Vam posicionar Bunnker com una plataforma que gestiona el lloguer de llarga estada de principi a fi — un sol model que aporta valor als propietaris, dona als inquilins una llar que estimen i ajuda les agències a llogar més ràpid.'],
      ['02 · Marca i direcció d’art', 'Identitat', 'Un univers càlid de corall i terra, un símbol viu i una direcció d’art que converteixen el lloguer en una autèntica manera de viure — llars dissenyades i equipades per i per a viure.'],
      ['03 · Digital i producte', 'Experiència', 'La web i el sistema de producte — Bunnkea tu piso, Bunnky i Partner — que reuneixen propietaris, inquilins i agències en una sola experiència fluida.']],
    vMark: 'El símbol, en moviment', vWeb: 'La web, en moviment',
    artL: 'Direcció d’art', artH: 'La sensació, abans que l’espai.', drag: 'Arrossega ←→', artAlt: 'Direcció d’art de Bunnker',
    intL: 'Interiorisme', intH: 'Espais, en detall.', intAlt: 'Interior de Bunnker',
    awL: 'Reconeixement · Premi COAC', awH: 'Una llar premiada.',
    awP: 'Un àtic a Barcelona — fusta, maó i llum — reconegut pel Col·legi d’Arquitectes de Catalunya. Passa les imatges de la galeria per descobrir el projecte.',
    coacAlt: n => `Projecte premiat pel COAC — imatge ${n}`,
    sysL: 'El sistema · Color i tipografia', sysH: 'La paleta de Bunnker — corall, terra i llum.',
    sw: ['Corall', 'Terra', 'Crema', 'Blanc'], typeL: 'La tipografia de Bunnker',
  },
  es: {
    title: 'Bunnker — Estrategia e identidad de marca | INFINIT©',
    desc: 'Cómo INFINIT© posicionó y construyó Bunnker: estrategia, identidad y producto digital para el alquiler de larga estancia. Premio COAC.',
    h1: 'Hogares hechos para <b>vivir.</b>', award: 'Premio COAC',
    meta: [['Cliente', 'Bunnker'], ['Mi rol', 'Fundador · Director de marca y estrategia'], ['Sector', 'Proptech · Alquiler de larga estancia'], ['Alcance', 'Estrategia · Identidad · Digital'], ['Reconocimiento', 'Premio COAC']],
    whoL: 'Quién es Bunnker', who: 'Bunnker gestiona alquileres de larga estancia de principio a fin — diseña y equipa viviendas que aportan valor a los propietarios, dan a los inquilinos un lugar que les encanta y ayudan a las agencias a alquilar más rápido.',
    defL: 'La visión', quote: '“Hacemos del alquiler una auténtica forma de vida — <b>hogares diseñados y equipados por y para vivir.”</b>',
    workL: 'El trabajo', workH: 'Estrategia, identidad, experiencia.',
    pil: [['01 · Posicionamiento', 'Estrategia', 'Posicionamos Bunnker como una plataforma que gestiona el alquiler de larga estancia de principio a fin — un solo modelo que aporta valor a los propietarios, da a los inquilinos un hogar que les encanta y ayuda a las agencias a alquilar más rápido.'],
      ['02 · Marca y dirección de arte', 'Identidad', 'Un universo cálido de coral y tierra, un símbolo vivo y una dirección de arte que convierten el alquiler en una auténtica forma de vida — hogares diseñados y equipados por y para vivir.'],
      ['03 · Digital y producto', 'Experiencia', 'La web y el sistema de producto — Bunnkea tu piso, Bunnky y Partner — que reúnen a propietarios, inquilinos y agencias en una única experiencia fluida.']],
    vMark: 'El símbolo, en movimiento', vWeb: 'La web, en movimiento',
    artL: 'Dirección de arte', artH: 'La sensación, antes que el espacio.', drag: 'Arrastra ←→', artAlt: 'Dirección de arte de Bunnker',
    intL: 'Interiorismo', intH: 'Espacios, en detalle.', intAlt: 'Interior de Bunnker',
    awL: 'Reconocimiento · Premio COAC', awH: 'Un hogar premiado.',
    awP: 'Un ático en Barcelona — madera, ladrillo y luz — reconocido por el Col·legi d’Arquitectes de Catalunya. Pasa las imágenes de la galería para descubrir el proyecto.',
    coacAlt: n => `Proyecto premiado por el COAC — imagen ${n}`,
    sysL: 'El sistema · Color y tipografía', sysH: 'La paleta de Bunnker — coral, tierra y luz.',
    sw: ['Coral', 'Tierra', 'Crema', 'Blanco'], typeL: 'La tipografía de Bunnker',
  },
};

const ART = ['art-01', 'art-02', 'art-03', 'art-04', 'art-05', 'art-07', 'art-08', 'art-10', 'art-11'];
const INT = ['int-01', 'int-02', 'int-03', 'int-04', 'int-05', 'int-06', 'int-07', 'int-08', 'int-09', 'int-11', 'int-12', 'int-13', 'int-15'];
const PH = [165, 255, 285];

export function bunnker(ctx) {
  const { lang } = ctx, t = T[lang], c = C[lang];
  const img = (s, alt, cls = '', extra = '') => `<div class="img${cls ? ' ' + cls : ''}"${extra}><img src="${A(B + s + '.webp')}" alt="${esc(alt)}" loading="lazy" draggable="false"></div>`;

  const body = [
    caseHero(ctx, { img: B + 'hero.webp', logo: B + 'bunnker-logo-white.png', name: 'Bunnker', h1: c.h1,
      chips: chip('strategy', lang) + chip('brand', lang) + chip('digital', lang) + `<span class="chip">${esc(c.award)}</span>` }),
    meta(c.meta),
    about(c),
    `<section class="blk" data-h="165"><div class="sh"><div><span class="lbl">${esc(c.workL)}</span><h2 class="h2" data-lines>${esc(c.workH)}</h2></div></div>
<div class="pil">${c.pil.map((p, i) => `<div class="pc rv" data-hh="${PH[i]}" style="--c:${tint(PH[i])}${i ? `;transition-delay:${i * .06}s` : ''}"><div class="n"><span class="lbl">${esc(p[0])}</span><i style="background:${dot(PH[i])}" aria-hidden="true"></i></div><div><h3>${esc(p[1])}</h3><p>${esc(p[2])}</p></div></div>`).join('')}</div></section>`,
    `<section class="blk"><div class="vids">
${video({ file: B + 'logo-motion.mp4', poster: B + 'logo-motion-poster.jpg', label: c.vMark })}
${video({ file: B + 'web.mp4', poster: B + 'web-poster.jpg', label: c.vWeb, delay: '.06s' })}
</div></section>`,
    `<section class="blk" data-h="30"><div class="sh"><div><span class="lbl">${esc(c.artL)}</span><h2 class="h2" data-lines>${esc(c.artH)}</h2></div><span class="lbl" aria-hidden="true">${esc(c.drag)}</span></div>
<div class="car" id="art" data-cur="${esc(t.cDrag)}"><div class="car-t">${[0, 1, 2].map(k => ART.map(s => img(s, k === 1 ? c.artAlt : '', '', k === 1 ? '' : ' aria-hidden="true"')).join('')).join('')}</div></div></section>`,
    `<section class="blk" data-h="88"><div class="sh"><div><span class="lbl">${esc(c.intL)}</span><h2 class="h2" data-lines>${esc(c.intH)}</h2></div></div><div class="mas">${INT.map(s => img(s, c.intAlt, 'rv')).join('')}</div></section>`,
    `<section class="dark" style="margin-top:clamp(90px,11vw,170px)"><div class="aw2">
<div class="tap" id="tap" data-cur="${esc(t.cNext)}">${[1, 2, 3, 4, 5].map(i => FIT.includes(i)
  ? `<div class="tp img fit" style="--bgi:url('${A(B + 'coac-' + i + '.webp')}')"><img src="${A(B + 'coac-' + i + '.webp')}" alt="${esc(c.coacAlt(i))}" loading="lazy"></div>`
  : `<div class="tp img"><img src="${A(B + 'coac-' + i + '.webp')}" alt="${esc(c.coacAlt(i))}" loading="lazy"${i === 1 ? ' style="transform:scale(1.05);transform-origin:50% 30%"' : ''}></div>`).join('')}<div class="ctl"><span class="chip" data-n aria-live="polite">01 / 05</span><div><button type="button" data-prev aria-label="${esc(t.prevImg)}">←</button><button type="button" data-next aria-label="${esc(t.nextImg)}">→</button></div></div></div>
<div class="tx"><span class="lbl">${esc(c.awL)}</span><h2 class="h2" data-lines>${esc(c.awH)}</h2><p>${esc(c.awP)}</p><img src="${A('project/assets/clients/coac-trim.png')}" alt="COAC" loading="lazy"></div></div></section>`,
    `<section class="blk"><div class="sh"><div><span class="lbl">${esc(c.sysL)}</span><h2 class="h2" data-lines>${esc(c.sysH)}</h2></div></div>
${swatches([[c.sw[0], '#FE585A', '#fff'], [c.sw[1], '#524741', '#fff'], [c.sw[2], '#E8E5E0'], [c.sw[3], '#FFFFFF', '', true]])}
<div class="tpf rv"><div><span class="lbl">${esc(c.typeL)}</span><span class="aa" aria-hidden="true">Aa</span></div><div><ul><li>Suisse Int’l <span>Regular</span></li><li style="font-weight:700">Suisse Int’l <span>SemiBold</span></li></ul></div></div></section>`,
    nextCase(ctx, 'relats'),
  ].join('\n');

  return head(ctx, { title: c.title, desc: c.desc, og: '/assets/site/og/bunnker.jpg', css: ['inner'] }) +
    `\n<main id="main">\n${body}\n</main>\n` + end(ctx);
}
