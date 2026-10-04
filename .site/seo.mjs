// Structured data (schema.org JSON-LD) for search engines and AI answer engines.
// One connected @graph per page: the studio (Organization + ProfessionalService), its founder, the
// website, the page itself, breadcrumbs and — on case pages — the case study as a CreativeWork.
// Facts here must match the visible copy; nothing is claimed that the site doesn't say.
import { SITE, LANGS, EMAIL, PHONE, LINKEDIN, INSTAGRAM, abs } from './lib.mjs';
import { T } from './i18n.mjs';
import { S } from './data.mjs';

export const FOUNDER_LINKEDIN = 'https://www.linkedin.com/in/francesc-callejas-%E2%98%81%EF%B8%8F%E2%98%98%EF%B8%8F-99416a90/';
const ORG = SITE + '/#org', WEB = SITE + '/#website', FOUNDER = SITE + '/#founder';
const INLANG = { en: 'en-GB', ca: 'ca-ES', es: 'es-ES' };
const NAMES = { sectors: { en: 'Sectors', ca: 'Sectors', es: 'Sectores' }, home: { en: 'Home', ca: 'Inici', es: 'Inicio' }, work: { en: 'Work', ca: 'Projectes', es: 'Proyectos' }, studio: { en: 'Studio', ca: 'Estudi', es: 'Estudio' } };

// Case-study facts (mirror the case pages' meta rows).
export const CASES = {
  bunnker: {
    client: 'Bunnker', img: '/assets/site/og/bunnker.jpg', award: { en: 'COAC Award', ca: 'Premi COAC', es: 'Premio COAC' },
    sector: { en: 'Proptech · Long-stay rentals', ca: 'Proptech · Lloguer de llarga estada', es: 'Proptech · Alquiler de larga estancia' },
    services: ['strategy', 'brand', 'digital'],
  },
  relats: {
    client: 'Relats', img: '/assets/site/og/relats.jpg', partner: 'Firma',
    sector: { en: 'Sustainable mobility · Automotive · Energy', ca: 'Mobilitat sostenible · Automoció · Energia', es: 'Movilidad sostenible · Automoción · Energía' },
    services: ['strategy', 'brand', 'digital'],
  },
};

const org = lang => ({
  '@type': 'Organization',
  '@id': ORG,
  name: 'INFINIT©',
  alternateName: ['INFINIT', 'We Are Infinit', 'weareinfinit'],
  url: SITE + '/',
  logo: { '@type': 'ImageObject', url: SITE + '/assets/site/icon-512.png', width: 512, height: 512 },
  image: SITE + '/assets/site/og/home.jpg',
  description: T[lang].homeDesc,
  slogan: T[lang].h1.replace(/^INFINIT© — /, ''),
  email: EMAIL,
  telephone: PHONE.replace(/\s/g, ''),
  address: { '@type': 'PostalAddress', addressLocality: 'Barcelona', addressRegion: 'Catalonia', addressCountry: 'ES' },
  areaServed: [{ '@type': 'City', name: 'Barcelona' }, { '@type': 'Country', name: 'Spain' }, { '@type': 'Place', name: 'Europe' }, { '@type': 'Place', name: 'Worldwide' }],
  knowsLanguage: ['en', 'ca', 'es'],
  founder: { '@id': FOUNDER },
  sameAs: [LINKEDIN, INSTAGRAM],
  knowsAbout: S.flatMap(s => [s.n.en, ...s.t.en]).filter((v, i, a) => a.indexOf(v) === i)
    .concat(['B2B branding', 'Industrial branding', 'Automotive branding', 'Food & beverage branding', 'Rebranding', 'Brand positioning for mid-sized companies']),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: T[lang].capabilities || 'Capabilities',
    itemListElement: S.map(s => ({
      '@type': 'OfferCatalog',
      name: s.n[lang],
      itemListElement: s.t[lang].map(c => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: c, serviceType: s.n[lang], provider: { '@id': ORG } } })),
    })),
  },
  contactPoint: { '@type': 'ContactPoint', contactType: 'new business', email: EMAIL, telephone: PHONE.replace(/\s/g, ''), availableLanguage: ['English', 'Catalan', 'Spanish'] },
});

const founder = lang => ({
  '@type': 'Person',
  '@id': FOUNDER,
  name: 'Cesc Callejas',
  alternateName: 'Francesc Callejas',
  jobTitle: { en: 'Founder · Brand & Strategy Director', ca: 'Fundador · Director de marca i estratègia', es: 'Fundador · Director de marca y estrategia' }[lang],
  worksFor: { '@id': ORG },
  image: SITE + '/project/assets/imagery/francesc.webp',
  url: abs(lang, 'studio'),
  sameAs: [FOUNDER_LINKEDIN],
  homeLocation: { '@type': 'City', name: 'Barcelona' },
  knowsAbout: ['Brand strategy', 'Positioning', 'Visual identity', 'Growth strategy', 'Fractional CMO', 'Digital transformation'],
});

const website = () => ({
  '@type': 'WebSite', '@id': WEB, url: SITE + '/', name: 'INFINIT©', publisher: { '@id': ORG },
  inLanguage: LANGS.map(l => INLANG[l]),
});

const crumbs = (lang, page, crumbName) => {
  const items = [[NAMES.home[lang], abs(lang, 'home')]];
  if (page === 'studio') items.push([NAMES.studio[lang], abs(lang, 'studio')]);
  // Sector / moment pages sit under the Sectors hub: Home › Sectors › page.
  if (crumbName && page !== 'sectors') items.push([NAMES.sectors[lang], abs(lang, 'sectors')]);
  if (crumbName) items.push([crumbName, abs(lang, page)]);
  if (CASES[page]) items.push([CASES[page].client, abs(lang, page)]);
  return { '@type': 'BreadcrumbList', '@id': abs(lang, page) + '#breadcrumb', itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) };
};

// page: 'home' | 'studio' | case key | sector key. meta: { title, desc, og, ld? } — ld: sector-page extras (service, FAQ).
export function graph(lang, page, meta) {
  const u = abs(lang, page);
  const webpage = {
    '@type': page === 'studio' ? 'AboutPage' : page === 'home' ? ['WebPage', 'CollectionPage'] : 'WebPage',
    '@id': u + '#webpage', url: u, name: meta.title, description: meta.desc, inLanguage: INLANG[lang],
    isPartOf: { '@id': WEB }, about: { '@id': ORG }, primaryImageOfPage: SITE + meta.og,
    breadcrumb: { '@id': u + '#breadcrumb' },
  };
  // #org / #founder are shared nodes (same @id on every page): keep their content language-neutral (English).
  const g = [org('en'), founder('en'), website(), webpage];
  if (page !== 'home') g.push(crumbs(lang, page, meta.ld && meta.ld.name)); else delete webpage.breadcrumb;
  // Sector pages: the service they describe + the visible FAQ.
  if (meta.ld && meta.ld.hub) webpage['@type'] = 'CollectionPage';
  if (meta.ld && !meta.ld.hub) {
    webpage.mainEntity = { '@id': u + '#service' };
    g.push({
      '@type': 'Service', '@id': u + '#service', name: meta.ld.name, serviceType: meta.ld.serviceType, description: meta.desc, url: u,
      provider: { '@id': ORG }, areaServed: [{ '@type': 'Place', name: 'Catalonia' }, { '@type': 'Country', name: 'Spain' }, { '@type': 'Place', name: 'Europe' }],
      audience: { '@type': 'BusinessAudience', name: meta.ld.audience },
      ...(meta.ld.caseUrl ? { subjectOf: { '@type': 'CreativeWork', name: meta.ld.caseName, url: meta.ld.caseUrl } } : {}),
    });
    if (meta.ld.faq && meta.ld.faq.length) g.push({ '@type': 'FAQPage', '@id': u + '#faq', inLanguage: INLANG[lang], isPartOf: { '@id': u + '#webpage' },
      mainEntity: meta.ld.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
  }
  const c = CASES[page];
  if (c) {
    webpage.mainEntity = { '@id': u + '#case' };
    g.push({
      '@type': 'CreativeWork', '@id': u + '#case', name: meta.title, headline: meta.title, description: meta.desc,
      genre: { en: 'Case study', ca: 'Cas d’estudi', es: 'Caso de estudio' }[lang], inLanguage: INLANG[lang], url: u, image: SITE + c.img,
      about: { '@type': 'Organization', name: c.client, description: c.sector[lang] },
      author: { '@id': FOUNDER }, publisher: { '@id': ORG }, creator: [{ '@id': FOUNDER }, ...(c.partner ? [{ '@type': 'Organization', name: c.partner }] : [])],
      keywords: c.services.map(k => S.find(s => s.k === k).n[lang]).concat(c.sector[lang].split(' · ')).join(', '),
      ...(c.award ? { award: c.award[lang] } : {}),
    });
  }
  return { '@context': 'https://schema.org', '@graph': g };
}

// Domain root (language gateway): the site-wide nodes only — WebSite + Organization + founder.
export const siteGraph = () => ({ '@context': 'https://schema.org', '@graph': [org('en'), founder('en'), website()] });
