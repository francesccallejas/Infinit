// Case: Induktor — sim racing hardware. Unlike the other cases, the page *uses* the brand instead of only showing it:
//   · the air gap: the K assembles on scroll and stops with its 130-unit gap (#gap)
//   · motion is implied: a pinned scroll that brings the spinning motor to rest — spin → exposure → carbon plate (#spn)
//   · the window: the page is dimmed glass, a clear window follows the cursor / finger (#win)
//   · materials, not colours: the palette drawn to its real proportion, strips open on hover / focus (.mat)
//   · the shadow: the K is never printed, it is projected — a gobo shadow that travels with the scroll (#gobo)
// Behaviour: site.js (casePage → airGap, spinSeq, glassWin, gobo). Styles: assets/site/induktor.css.
// Source: the client's brand deliverables (Oct 2026). Product figures are still placeholders, so no frame with [XX] is used.
import { esc, A, url } from '../lib.mjs';
import { C as SECTOR } from './leisure.mjs';
import { T } from '../i18n.mjs';
import { head, end, ending } from '../layout.mjs';
import { chip, caseHero, meta, about, video, nextCase } from './case.mjs';

const K = 'work/induktor/induktor-assets/';

// The symbol, from the supplied outlines (never redrawn): stem = stator, arms = rotor, 130 units apart.
const STEM = 'M0 1400H400V0H0Z';
const ARMS = 'M530 1053.3V551L1232 0H1871L1093 611L1880 1400H1316L777 860Z';
const COPPER = '#B86B3C';

const C = {
  en: {
    title: 'Induktor — Sim racing brand identity case study | INFINIT©',
    desc: 'How INFINIT© built Induktor, a sim racing hardware brand: positioning, a K cut by the air gap of an induction motor, a palette of materials and a digital experience.',
    h1: 'Nothing touches. <b>Everything moves.</b>',
    meta: [['Client', 'Induktor'], ['My role', 'Founder · Brand & Strategy Director'], ['Sector', 'Sim racing · Direct drive hardware'], ['Scope', 'Strategy · Identity · Digital'], ['Platforms', 'PlayStation · Xbox · PC']],
    whoL: 'Who is Induktor', who: 'Induktor makes sim racing hardware engineered around the physics of induction: direct drive wheelbases for PlayStation, Xbox and PC that put every force on the track into the driver’s hands — without loss.',
    defL: 'The idea', quote: '“Induced reality — <b>every force on the track, delivered to your hands.”</b>',
    gapL: '01 · The symbol', gapH: 'Stator, gap, rotor.',
    gapP: 'An inductor is a coil of copper that stores energy in a magnetic field. In an induction motor, force crosses from stator to rotor through a gap of air — nothing touches, and yet everything moves. So we cut the K the same way: its arms set free from the stem by exactly that gap. The R answers it at the end of the name.',
    gapN: 'The gap is drawn by the ground showing through — never by a line, a stroke or a second colour.',
    gapT: ['Stator', 'Rotor', 'Air gap'], gapAlt: 'The Induktor symbol: a K whose arms are separated from the stem by an air gap of 130 units',
    spnL: '02 · Imagery', spnH: 'Motion is implied, never illustrated.',
    spnP: 'One thing stays perfectly sharp — the hub, a hand, a rim — and the world moves around it. A black studio, a single hard key light, long exposures; copper only where real copper catches the light.',
    spn: ['Spin — rotational blur, hub sharp', 'Exposure — light trails on the axis', 'Carbon plate — stillness'],
    spnAlt: ['The Induktor motor spinning, only the hub sharp', 'The motor with light trails along its axis', 'The motor at rest, every detail sharp'],
    winL: '03 · Glass', winH: 'Glass reveals. It never decorates.',
    winP: 'The page is dimmed glass. The window you choose shows the product at full clarity — on the site it follows the cursor; on the wheel’s display it follows the torque.',
    winFine: 'Move the cursor to open the window', winTouch: 'Drag to move the window', winAlt: 'The copper windings inside the Induktor motor', winTag: 'Copper · the windings',
    matL: '04 · Colour', matH: 'Materials, not colours.',
    matP: 'Every tone is taken from the motor itself — the carbon housing, the anodised graphite, the machined chrome ring, the studio light around it — and the copper windings inside, used the way the motor uses them: rarely, and where it matters.',
    mat: ['Carbon', 'Graphite', 'Titanium', 'Chrome', 'Studio', 'Copper'],
    matN: 'Drawn to proportion: carbon and studio carry 80% of every surface, graphite, titanium and chrome build depth, copper stays under 3%.',
    typeL: 'Induktor’s typefaces', tDisplay: 'Display · capitals, always tracked', tText: 'Text · light, sentence case',
    gobL: '05 · Campaign', gobH: 'The K is never printed. It is projected.',
    gobP: 'A gobo in the key light: the symbol exists only as light and shadow — like the force it stands for.',
    vMark: 'The logotype, in motion', sysTag: 'Logo system', sysAlt: 'The Induktor logo system on carbon, studio and copper',
    frL: '06 · The identity', frH: 'Frame by frame.', drag: 'Drag ←→',
    fr: ['Key visual: Induced reality', 'The logotype', 'The symbol and the air gap', 'Typography', 'Colour: materials, not colours', 'Imagery and motion', 'Campaign: the shadow', 'Brand experience: the windings', 'Brand experience: the air gap', 'Brand experience: the end frame'],
  },
  ca: {
    title: 'Induktor — Cas d’identitat de marca de sim racing | INFINIT©',
    desc: 'Com INFINIT© va crear Induktor, marca de hardware de sim racing: posicionament, una K tallada per l’entreferro d’un motor d’inducció, una paleta de materials i web.',
    h1: 'Res no es toca. <b>Tot es mou.</b>',
    meta: [['Client', 'Induktor'], ['El meu rol', 'Fundador · Director de marca i estratègia'], ['Sector', 'Sim racing · Hardware direct drive'], ['Abast', 'Estratègia · Identitat · Digital'], ['Plataformes', 'PlayStation · Xbox · PC']],
    whoL: 'Qui és Induktor', who: 'Induktor fa hardware de sim racing pensat a partir de la física de la inducció: bases direct drive per a PlayStation, Xbox i PC que porten cada força de la pista a les mans del pilot — sense pèrdues.',
    defL: 'La idea', quote: '“Realitat induïda — <b>cada força de la pista, a les teves mans.”</b>',
    gapL: '01 · El símbol', gapH: 'Estator, entreferro, rotor.',
    gapP: 'Un inductor és una bobina de coure que emmagatzema energia en un camp magnètic. En un motor d’inducció, la força passa de l’estator al rotor a través d’un espai d’aire — res no es toca i, tanmateix, tot es mou. Per això vam tallar la K de la mateixa manera: els braços se separen del pal exactament per aquest espai. La R li respon al final del nom.',
    gapN: 'L’entreferro el dibuixa el fons que es veu a través — mai una línia, un traç o un segon color.',
    gapT: ['Estator', 'Rotor', 'Entreferro'], gapAlt: 'El símbol d’Induktor: una K amb els braços separats del pal per un entreferro de 130 unitats',
    spnL: '02 · Imatge', spnH: 'El moviment se suggereix, mai no s’il·lustra.',
    spnP: 'Una sola cosa queda perfectament nítida — la boixa, una mà, una llanta — i el món es mou al seu voltant. Estudi negre, una sola llum dura, exposicions llargues; coure només on el coure real atrapa la llum.',
    spn: ['Gir — desenfocament rotatiu, boixa nítida', 'Exposició — traces de llum sobre l’eix', 'Placa de carboni — quietud'],
    spnAlt: ['El motor d’Induktor girant, només la boixa nítida', 'El motor amb traces de llum al llarg de l’eix', 'El motor en repòs, amb cada detall nítid'],
    winL: '03 · Vidre', winH: 'El vidre revela. Mai no decora.',
    winP: 'La pàgina és vidre enfosquit. La finestra que tries mostra el producte amb tota la nitidesa — a la web segueix el cursor; a la pantalla del volant segueix el parell.',
    winFine: 'Mou el cursor per obrir la finestra', winTouch: 'Arrossega per moure la finestra', winAlt: 'Les bobines de coure dins del motor d’Induktor', winTag: 'Coure · les bobines',
    matL: '04 · Color', matH: 'Materials, no colors.',
    matP: 'Cada to surt del mateix motor — la carcassa de carboni, el grafit anoditzat, l’anell de crom mecanitzat, la llum d’estudi que l’envolta — i el coure de les bobines, fet servir com el fa servir el motor: poc, i on importa.',
    mat: ['Carboni', 'Grafit', 'Titani', 'Crom', 'Estudi', 'Coure'],
    matN: 'A escala: carboni i estudi ocupen el 80% de cada superfície, grafit, titani i crom donen profunditat, el coure no passa del 3%.',
    typeL: 'Les tipografies d’Induktor', tDisplay: 'Display · majúscules, sempre espaiades', tText: 'Text · light, amb majúscula inicial',
    gobL: '05 · Campanya', gobH: 'La K no s’imprimeix mai. Es projecta.',
    gobP: 'Un gobo a la llum principal: el símbol només existeix com a llum i ombra — com la força que representa.',
    vMark: 'El logotip, en moviment', sysTag: 'Sistema de logotip', sysAlt: 'El sistema de logotip d’Induktor sobre carboni, estudi i coure',
    frL: '06 · La identitat', frH: 'Làmina a làmina.', drag: 'Arrossega ←→',
    fr: ['Imatge clau: Induced reality', 'El logotip', 'El símbol i l’entreferro', 'Tipografia', 'Color: materials, no colors', 'Imatge i moviment', 'Campanya: l’ombra', 'Experiència de marca: les bobines', 'Experiència de marca: l’entreferro', 'Experiència de marca: el tancament'],
  },
  es: {
    title: 'Induktor — Caso de identidad de marca de sim racing | INFINIT©',
    desc: 'Cómo INFINIT© creó Induktor, marca de hardware de sim racing: posicionamiento, una K cortada por el entrehierro de un motor de inducción, una paleta de materiales y web.',
    h1: 'Nada se toca. <b>Todo se mueve.</b>',
    meta: [['Cliente', 'Induktor'], ['Mi rol', 'Fundador · Director de marca y estrategia'], ['Sector', 'Sim racing · Hardware direct drive'], ['Alcance', 'Estrategia · Identidad · Digital'], ['Plataformas', 'PlayStation · Xbox · PC']],
    whoL: 'Quién es Induktor', who: 'Induktor fabrica hardware de sim racing pensado desde la física de la inducción: bases direct drive para PlayStation, Xbox y PC que llevan cada fuerza de la pista a las manos del piloto — sin pérdidas.',
    defL: 'La idea', quote: '“Realidad inducida — <b>cada fuerza de la pista, en tus manos.”</b>',
    gapL: '01 · El símbolo', gapH: 'Estátor, entrehierro, rotor.',
    gapP: 'Un inductor es una bobina de cobre que almacena energía en un campo magnético. En un motor de inducción, la fuerza pasa del estátor al rotor a través de un espacio de aire — nada se toca y, sin embargo, todo se mueve. Por eso cortamos la K del mismo modo: sus brazos se separan del asta exactamente por ese espacio. La R le responde al final del nombre.',
    gapN: 'El entrehierro lo dibuja el fondo que se ve a través — nunca una línea, un trazo o un segundo color.',
    gapT: ['Estátor', 'Rotor', 'Entrehierro'], gapAlt: 'El símbolo de Induktor: una K con los brazos separados del asta por un entrehierro de 130 unidades',
    spnL: '02 · Imagen', spnH: 'El movimiento se sugiere, nunca se ilustra.',
    spnP: 'Una sola cosa queda perfectamente nítida — el buje, una mano, una llanta — y el mundo se mueve a su alrededor. Estudio negro, una única luz dura, exposiciones largas; cobre solo donde el cobre real atrapa la luz.',
    spn: ['Giro — desenfoque rotativo, buje nítido', 'Exposición — trazos de luz sobre el eje', 'Placa de carbono — quietud'],
    spnAlt: ['El motor de Induktor girando, solo el buje nítido', 'El motor con trazos de luz a lo largo del eje', 'El motor en reposo, con cada detalle nítido'],
    winL: '03 · Cristal', winH: 'El cristal revela. Nunca decora.',
    winP: 'La página es cristal oscurecido. La ventana que eliges muestra el producto con toda su nitidez — en la web sigue al cursor; en la pantalla del volante sigue al par.',
    winFine: 'Mueve el cursor para abrir la ventana', winTouch: 'Arrastra para mover la ventana', winAlt: 'Las bobinas de cobre dentro del motor de Induktor', winTag: 'Cobre · las bobinas',
    matL: '04 · Color', matH: 'Materiales, no colores.',
    matP: 'Cada tono sale del propio motor — la carcasa de carbono, el grafito anodizado, el anillo de cromo mecanizado, la luz de estudio que lo rodea — y el cobre de las bobinas, usado como lo usa el motor: poco, y donde importa.',
    mat: ['Carbono', 'Grafito', 'Titanio', 'Cromo', 'Estudio', 'Cobre'],
    matN: 'A escala: carbono y estudio ocupan el 80% de cada superficie, grafito, titanio y cromo dan profundidad, el cobre no pasa del 3%.',
    typeL: 'Las tipografías de Induktor', tDisplay: 'Display · mayúsculas, siempre espaciadas', tText: 'Texto · light, con mayúscula inicial',
    gobL: '05 · Campaña', gobH: 'La K nunca se imprime. Se proyecta.',
    gobP: 'Un gobo en la luz principal: el símbolo solo existe como luz y sombra — como la fuerza que representa.',
    vMark: 'El logotipo, en movimiento', sysTag: 'Sistema de logotipo', sysAlt: 'El sistema de logotipo de Induktor sobre carbono, estudio y cobre',
    frL: '06 · La identidad', frH: 'Lámina a lámina.', drag: 'Arrastra ←→',
    fr: ['Imagen clave: Induced reality', 'El logotipo', 'El símbolo y el entrehierro', 'Tipografía', 'Color: materiales, no colores', 'Imagen y movimiento', 'Campaña: la sombra', 'Experiencia de marca: las bobinas', 'Experiencia de marca: el entrehierro', 'Experiencia de marca: el cierre'],
  },
};

// Materials in the order of the brand's colour frame; w = share of the strip row (carbon + studio 80%, copper < 3%).
const MAT = [['#0B0B0C', 40, 1], ['#161719', 7, 1], ['#8E9094', 5, 1], ['#C9CBCE', 5, 0], ['#ECECEC', 40, 0], [COPPER, 3, 1]];
const FR = ['f-key-visual', 'f-logotype', 'f-symbol', 'f-typography', 'f-colour', 'f-motion', 'f-shadow', 'x-windings', 'x-air-gap', 'x-end'];
const SPN = ['spin', 'exposure', 'carbon'];

const img = (s, alt, extra = '') => `<div class="img"${extra}><img src="${A(K + s + '.webp')}" alt="${esc(alt)}" loading="lazy" draggable="false"></div>`;

export function induktor(ctx) {
  const { lang } = ctx, c = C[lang], t = T[lang];

  // 01 · The air gap — the symbol in SVG; the arms (rotor) slide in and stop 130 units from the stem.
  const gap = `<section class="blk"><div class="gap" id="gap">
<div class="gap-v"><svg class="gap-k" viewBox="-60 -230 2000 2010" role="img" aria-label="${esc(c.gapAlt)}">
<g class="gap-a" aria-hidden="true"><rect x="400" y="-60" width="130" height="1560" fill="${COPPER}" opacity=".14"/><path d="M400-60V1560M530-60V1560" stroke="${COPPER}" stroke-width="5"/>
<text x="200" y="-110" text-anchor="middle">${esc(c.gapT[0].toUpperCase())}</text><text x="1205" y="-110" text-anchor="middle">${esc(c.gapT[1].toUpperCase())}</text>
<text class="cu" x="400" y="1690">130 · ${esc(c.gapT[2].toUpperCase())}</text></g>
<path class="gap-s" d="${STEM}"/><path class="gap-r" d="${ARMS}"/></svg></div>
<div class="gap-t rv"><span class="lbl">${esc(c.gapL)}</span><h2 class="h2" data-lines>${esc(c.gapH)}</h2><p>${esc(c.gapP)}</p><p class="gap-n">${esc(c.gapN)}</p></div>
</div></section>`;

  // 02 · Motion is implied — pinned; the scroll brings the motor to rest (static three-up without JS / with reduced motion).
  const spn = `<section class="dark spn" id="spn" style="margin-top:clamp(90px,11vw,170px)"><div class="spn-s">
<div class="spn-ls">${SPN.map((s, i) => `<div class="img spn-l"><img src="${A(K + s + '.webp')}" alt="${esc(c.spnAlt[i])}" loading="lazy"></div>`).join('')}</div>
<div class="spn-t"><span class="lbl">${esc(c.spnL)}</span><h2 class="h2">${esc(c.spnH)}</h2><p>${esc(c.spnP)}</p></div>
<ol class="spn-k">${c.spn.map((s, i) => `<li${i ? '' : ' class="on"'}><span>0${i + 1}</span>${esc(s)}</li>`).join('')}</ol><div class="spn-p" aria-hidden="true"><i></i></div>
</div></section>`;

  // 03 · The window — dimmed glass; a clear window follows the pointer (drifts on its own until touched; arrows move it).
  const win = `<section class="dark win" id="win"><div class="win-h"><div><span class="lbl">${esc(c.winL)}</span><h2 class="h2" data-lines>${esc(c.winH)}</h2></div><p>${esc(c.winP)}</p></div>
<div class="win-s" tabindex="0" role="img" aria-label="${esc(c.winAlt)}"><img class="win-b" src="${A(K + 'copper.webp')}" alt="" loading="lazy"><img class="win-c" src="${A(K + 'copper.webp')}" alt="" loading="lazy">
<div class="win-f" aria-hidden="true"><span class="lbl">${esc(c.winTag)}</span></div><span class="win-hint lbl" aria-hidden="true" data-fine="${esc(c.winFine)}" data-touch="${esc(c.winTouch)}">${esc(c.winTouch)}</span></div></section>`;

  // 04 · Materials, not colours — strips at the real proportion, a legend that always shows every name and value.
  const mat = `<section class="blk"><div class="sh"><div><span class="lbl">${esc(c.matL)}</span><h2 class="h2" data-lines>${esc(c.matH)}</h2></div></div>
<p class="mat-p rv">${esc(c.matP)}</p>
<ul class="mat rv">${MAT.map(([hex, w, light], i) => `<li tabindex="0" class="${w < 10 ? 'n' : ''}${light ? ' lt' : ''}" style="--w:${w};background:${hex}"><b>${esc(c.mat[i])}</b><span>${hex}</span></li>`).join('')}</ul>
<p class="mat-n">${esc(c.matN)}</p>
<div class="tpf rv"><div><span class="lbl">${esc(c.typeL)}</span><span class="aa" aria-hidden="true">Aa</span></div><div><ul><li>Retimoa Straight <span>${esc(c.tDisplay)}</span></li><li style="font-weight:300">Hanken Grotesk <span>${esc(c.tText)}</span></li></ul></div></div></section>`;

  // 05 · The shadow — a gobo K on the studio ground, travelling with the scroll (and the pointer).
  const gobo = `<section class="gobo" id="gobo" style="margin-top:clamp(90px,11vw,170px)"><svg class="gobo-k" viewBox="0 0 1880 1400" aria-hidden="true"><path d="${STEM}"/><path d="${ARMS}"/></svg>
<div class="gobo-t"><span class="lbl">${esc(c.gobL)}</span><h2 class="h2" data-lines>${esc(c.gobH)}</h2><p>${esc(c.gobP)}</p></div></section>`;

  // 06 · The logotype in motion + the logo system, then the identity frames in a drag carousel.
  const mark = `<section class="blk"><div class="vids">
${video({ file: K + 'logo-reveal.mp4', poster: K + 'logo-reveal-poster.webp', label: c.vMark })}
<div class="vd rv" style="transition-delay:.06s"><img src="${A(K + 'f-logo-system.webp')}" alt="${esc(c.sysAlt)}" loading="lazy"><span class="chip">${esc(c.sysTag)}</span></div>
</div></section>`;
  const frames = `<section class="blk"><div class="sh"><div><span class="lbl">${esc(c.frL)}</span><h2 class="h2" data-lines>${esc(c.frH)}</h2></div><span class="lbl" aria-hidden="true">${esc(c.drag)}</span></div>
<div class="car fr" id="art" data-cur="${esc(t.cDrag)}"><div class="car-t">${[0, 1, 2].map(k => FR.map((s, i) => img(s, k === 1 ? c.fr[i] : '', k === 1 ? '' : ' aria-hidden="true"')).join('')).join('')}</div></div></section>`;

  const body = [
    caseHero(ctx, { img: K + 'spin.webp', logo: K + 'logotype-bone.svg', logoStyle: ' style="height:clamp(14px,1.5vw,22px)"', name: 'Induktor', h1: c.h1,
      chips: chip('strategy', lang) + chip('brand', lang) + chip('digital', lang) }),
    meta(c.meta.map((r, i) => i === 2 ? [...r, [url(lang, 'leisure'), SECTOR[lang].lbl]] : r)),
    about(c),
    gap, spn, win, mat, gobo, mark, frames,
    nextCase(ctx, 'bunnker'),
    ending(ctx, { cls: 'afternx' }),
  ].join('\n');

  return head(ctx, { title: c.title, desc: c.desc, og: '/assets/site/og/induktor.jpg', css: ['inner', 'induktor'] }) +
    `\n<main id="main">\n${body}\n</main>\n` + end(ctx);
}
