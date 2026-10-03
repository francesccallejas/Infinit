// Content data: services (S), projects (P), client logos (CH). Source: prototype shared.js.
import { A } from './lib.mjs';

// Five services, each with a hue. Names + capability lists per language.
export const S = [
  { k: 'strategy', h: 165,
    n: { en: 'Strategy', ca: 'Estratègia', es: 'Estrategia' },
    t: {
      en: ['Brand Strategy', 'Positioning', 'Growth Strategy', 'Fractional CMO', 'Research', 'AI Opportunity Mapping'],
      ca: ['Estratègia de marca', 'Posicionament', 'Estratègia de creixement', 'CMO fraccional', 'Recerca', 'Mapeig d’oportunitats IA'],
      es: ['Estrategia de marca', 'Posicionamiento', 'Estrategia de crecimiento', 'CMO fraccional', 'Investigación', 'Mapeo de oportunidades IA'] } },
  { k: 'brand', h: 255,
    n: { en: 'Brand', ca: 'Marca', es: 'Marca' },
    t: {
      en: ['Visual Identity', 'Naming', 'Design Systems', 'Art Direction', 'Creative Direction'],
      ca: ['Identitat visual', 'Naming', 'Sistemes de disseny', 'Direcció d’art', 'Direcció creativa'],
      es: ['Identidad visual', 'Naming', 'Sistemas de diseño', 'Dirección de arte', 'Dirección creativa'] } },
  { k: 'digital', h: 285,
    n: { en: 'Digital', ca: 'Digital', es: 'Digital' },
    t: {
      en: ['Websites & Platforms', 'SEO & GEO', 'Performance Marketing', 'Analytics & Conversion', 'AI Experiences'],
      ca: ['Webs i plataformes', 'SEO i GEO', 'Performance marketing', 'Analítica i conversió', 'Experiències IA'],
      es: ['Webs y plataformas', 'SEO y GEO', 'Performance marketing', 'Analítica y conversión', 'Experiencias IA'] } },
  { k: 'product', h: 30,
    n: { en: 'Product', ca: 'Producte', es: 'Producto' },
    t: {
      en: ['UX / UI Direction', 'Product Design', 'Prototyping', 'Design Systems'],
      ca: ['Direcció UX / UI', 'Disseny de producte', 'Prototipatge', 'Sistemes de disseny'],
      es: ['Dirección UX / UI', 'Diseño de producto', 'Prototipado', 'Sistemas de diseño'] } },
  { k: 'content', h: 88,
    n: { en: 'Content', ca: 'Contingut', es: 'Contenido' },
    t: {
      en: ['Motion', 'Social & Content', 'Photo & Film', 'Campaigns'],
      ca: ['Motion', 'Social i contingut', 'Foto i vídeo', 'Campanyes'],
      es: ['Motion', 'Social y contenido', 'Foto y vídeo', 'Campañas'] } },
];
export const svc = k => S.find(s => s.k === k);

const B = 'work/bunnker/bunnker-assets/', R = 'work/relats/relats-assets/', I = 'project/assets/imagery/', IM = 'project/assets/images/';

// Projects. `page` = case page key (null → work in progress / NDA, not clickable).
export const P = [
  { n: 'Bunnker', page: 'bunnker', t: ['strategy', 'brand'],
    d: { en: 'beyond renting', ca: 'més que llogar', es: 'más que alquilar' },
    img: IM + 'Bunnker Final.webp', g: [B + 'int-03.webp', B + 'int-12.webp', B + 'art-07.webp', B + 'int-15.webp', B + 'coac-1.webp'] },
  { n: 'Relats', page: 'relats', t: ['strategy', 'brand', 'digital'],
    d: { en: 'ahead of the curve', ca: 'al capdavant', es: 'por delante de la curva' },
    img: IM + 'Relats Brand.webp', g: [R + 'sleeve-macro.webp', R + 'join-the-ride.webp', R + 'cover-glow.webp', R + 'lake-curve.webp', R + 'staying-ahead.webp', R + 'offices.webp'] },
  { n: 'Instellar', page: null, s: 'wip', t: ['strategy', 'brand', 'digital'],
    d: { en: 'mission performance', ca: 'rendiment de missió', es: 'rendimiento de misión' },
    img: IM + 'instellar-aircraft.webp', g: [] },
  { n: 'Induktor', page: null, s: 'wip', t: ['strategy', 'brand', 'digital'],
    d: { en: 'sim racing hardware', ca: 'hardware de sim racing', es: 'hardware de sim racing' },
    // Same image the previous site used for Induktor (remote Unsplash, QA #8) — replace with own imagery when available.
    img: 'https://images.unsplash.com/photo-1778757949749-345b125f2ccb?q=80&w=1600&auto=format&fit=crop', g: [] },
  { n: 'Julià', page: null, s: 'wip', t: ['strategy', 'brand', 'digital'],
    d: { en: 'premium adventure vans', ca: 'campers premium', es: 'campers premium' },
    img: I + 'Julia Yosemite.webp', g: [I + 'julia-camper.webp'] },
  { n: 'Almirall', page: null, s: 'nda', t: ['strategy', 'digital'],
    d: { en: 'beautifully clinical', ca: 'clínicament bell', es: 'clínicamente bello' },
    img: I + 'Almirall.webp', g: [] },
];
// Card hue = hue of the project's last service.
P.forEach(p => { p.h = svc(p.t[p.t.length - 1]).h; p.all = [p.img, ...p.g]; });
export const src = p => /^https?:/.test(p) ? p : A(p);

// Client logos for the marquee — each has its own height so the visual weight is equal (ink-area normalised).
export const CH = { sap: 28, glovo: 37, almirall: 22, instellar: 21, relats: 22, bunnker: 26, '11onze': 17, dronparc: 21 };
export const CLIENT_NAMES = 'SAP, Glovo, Almirall, Instellar, Relats, Bunnker, 11onze, DronParc';

// Home hero rotation (conceptual imagery, as in the prototype) — the first 5 also feed the approach section.
export const HS = [IM + 'Relats Brand.webp', B + 'hero.webp', I + 'Julia Yosemite.webp', B + 'int-12.webp', I + 'night-lake.webp', IM + 'instellar-aircraft.webp', I + 'device-knob.webp', IM + 'Bunnker Final.webp', I + 'mountains-tekapo.webp', I + 'Almirall.webp'];
