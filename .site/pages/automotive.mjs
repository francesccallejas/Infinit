// Sector page: branding for automotive & mobility companies (EN / CA / ES). Template + shared copy: sector.mjs.
// Facts: Relats case (automotive · e-mobility), Julià and Induktor (work in progress on the Home), the founder's
// experience, the services list.
import { sectorPage } from './sector.mjs';

const R = 'work/relats/relats-assets/';

export const C = {
  en: {
    title: 'Automotive & mobility branding — Barcelona | INFINIT©',
    desc: 'Branding for automotive and mobility companies (€1M–€200M): components, aftermarket, campers and dealerships. Strategy, identity, web, SEO & GEO.',
    lbl: 'Automotive & mobility branding',
    h1: 'Automotive companies moving faster than <b>their brand.</b>',
    meta: [['For', 'Automotive & mobility companies'], ['Size', '€1M–€200M revenue'], ['Sectors', 'Components · Aftermarket · Vehicles & campers · Dealerships · E-mobility'], ['Markets', 'Catalonia · Spain · Europe'], ['Led by', 'Cesc Callejas, founder']],
    prob: 'Automotive is changing faster than ever: electrification, new players, software, buyers who research everything online. Many component makers, converters and dealer groups still present themselves as they did ten years ago — spec sheets, stock photos and a logo nobody remembers.',
    quote: 'The product evolved. <b>The brand is still last year’s model.</b>',
    sigH: 'Three signs your brand is holding you back.',
    sig: [
      ['01', 'You compete on specs and price', 'If OEMs, distributors and buyers only compare datasheets and prices, your brand isn’t doing its job: the value of your engineering, quality and service gets lost.'],
      ['02', 'Every dealer tells it differently', 'Distributors, dealers and installers explain you in their own way. Without a clear brand system, you look different at every point of sale.'],
      ['03', 'The end customer doesn’t know you', 'From aftermarket parts to vans and campers, buyers search, compare and ask AI assistants before they talk to sales. If you’re not clear online, you’re not on the shortlist.'],
    ],
    howH: 'From the workshop to the showroom — one clear brand.',
    how: [
      ['Strategy', '2–4 weeks', 'Initial interviews with management, sales and key OEM or dealer clients, one workshop and a deliverable session: where you compete, who you really are and the idea that makes you win beyond the spec sheet.'],
      ['Brand identity', 'From 2 weeks', 'Logo, visual system and tone of voice for product, packaging, fleet, dealership and trade-show stand. Progress sessions along the way and a final presentation. 3D renders, photography or extra content add time.'],
      ['Website, SEO & GEO', '1–2 months', 'UX/UI, design and custom development — product catalogue, configurator or dealer locator if you need them — with progress reviews until launch. Built to be found by Google and by AI assistants.'],
      ['Launch', 'Optional', 'A launch plan for the new brand, with a brand video — for dealers, distributors, trade fairs, social and the end customer.'],
    ],
    caseL: 'Case · Relats', caseH: 'Protecting what moves the world.',
    caseP: 'Relats engineers technical covering solutions for e-mobility, automotive and wind energy. We repositioned it from component supplier to global partner in innovative, safety-driven solutions — strategy, identity and a new digital platform.',
    caseBtn: 'See the Relats case',
    exp: 'Relats · Julià (premium adventure vans) · Induktor (sim racing hardware) · Repsol · SAP · Seidor · Glovo',
    faqH: 'What automotive companies ask us.',
    faq: [
      ['Can you work with our dealer and distributor network?', 'Yes. We design the brand so that dealers, distributors and installers can apply it consistently — guidelines, templates and point-of-sale and digital assets — and we include them in the launch plan.'],
    ],
  },
  ca: {
    title: 'Branding d’automoció i mobilitat — Barcelona | INFINIT©',
    desc: 'Branding per a empreses d’automoció i mobilitat (d’1 a 200 M€): components, recanvis, campers i concessionaris. Estratègia, identitat, web, SEO i GEO.',
    lbl: 'Branding per a automoció i mobilitat',
    h1: 'Empreses d’automoció que van més ràpid que <b>la seva marca.</b>',
    meta: [['Per a', 'Empreses d’automoció i mobilitat'], ['Mida', 'D’1 a 200 M€ de facturació'], ['Sectors', 'Components · Recanvis · Vehicles i campers · Concessionaris · Mobilitat elèctrica'], ['Mercats', 'Catalunya · Espanya · Europa'], ['Liderat per', 'Cesc Callejas, fundador']],
    prob: 'L’automoció canvia més ràpid que mai: electrificació, nous actors, software i compradors que ho investiguen tot en línia. Molts fabricants de components, carrossers i grups de concessionaris encara es presenten com fa deu anys — fitxes tècniques, fotos de banc d’imatges i un logo que ningú no recorda.',
    quote: 'El producte ha evolucionat. <b>La marca encara és el model de l’any passat.</b>',
    sigH: 'Tres senyals que la marca us frena.',
    sig: [
      ['01', 'Competiu només per fitxa i preu', 'Si fabricants, distribuïdors i compradors només comparen fitxes tècniques i preus, la marca no fa la seva feina: el valor de la vostra enginyeria, qualitat i servei es perd.'],
      ['02', 'Cada concessionari ho explica diferent', 'Distribuïdors, concessionaris i instal·ladors us expliquen a la seva manera. Sense un sistema de marca clar, a cada punt de venda sembleu una empresa diferent.'],
      ['03', 'El client final no us coneix', 'Dels recanvis a les furgonetes i campers, els compradors busquen, comparen i pregunten als assistents d’IA abans de parlar amb un comercial. Si a internet no sou clars, no entreu a la llista.'],
    ],
    howH: 'Del taller al concessionari — una sola marca clara.',
    how: [
      ['Estratègia', '2–4 setmanes', 'Entrevistes inicials amb direcció, equip comercial i clients clau (fabricants o concessionaris), un workshop i una sessió d’entrega: on competiu, qui sou de debò i la idea que us fa guanyar més enllà de la fitxa tècnica.'],
      ['Identitat de marca', 'Des de 2 setmanes', 'Logo, sistema visual i to de veu per a producte, packaging, flota, concessionari i estand de fira. Sessions per veure l’avenç i una presentació final. Els renders 3D, la fotografia o més contingut allarguen el termini.'],
      ['Web, SEO i GEO', '1–2 mesos', 'UX/UI, disseny i programació a mida — catàleg de producte, configurador o cercador de distribuïdors si us calen — ensenyant-vos el progrés fins al llançament. Feta perquè la trobin Google i els assistents d’IA.'],
      ['Llançament', 'Opcional', 'Un pla de llançament de la nova marca, amb un vídeo de marca — per a concessionaris, distribuïdors, fires, xarxes i el client final.'],
    ],
    caseL: 'Cas · Relats', caseH: 'Protegint el que mou el món.',
    caseP: 'Relats desenvolupa solucions tècniques de protecció per a la mobilitat elèctrica, l’automoció i l’energia eòlica. La vam reposicionar de proveïdor de components a soci global en solucions innovadores i de seguretat — estratègia, identitat i una nova plataforma digital.',
    caseBtn: 'Mira el cas Relats',
    exp: 'Relats · Julià (campers premium) · Induktor (hardware de sim racing) · Repsol · SAP · Seidor · Glovo',
    faqH: 'El que ens pregunten les empreses d’automoció.',
    faq: [
      ['Podeu treballar amb la nostra xarxa de concessionaris i distribuïdors?', 'Sí. Dissenyem la marca perquè concessionaris, distribuïdors i instal·ladors la puguin aplicar de manera coherent — guies, plantilles i materials de punt de venda i digitals — i els incloem al pla de llançament.'],
    ],
  },
  es: {
    title: 'Branding de automoción y movilidad — Barcelona | INFINIT©',
    desc: 'Branding para empresas de automoción y movilidad (de 1 a 200 M€): componentes, recambios, campers y concesionarios. Estrategia, identidad, web y GEO.',
    lbl: 'Branding para automoción y movilidad',
    h1: 'Empresas de automoción que van más rápido que <b>su marca.</b>',
    meta: [['Para', 'Empresas de automoción y movilidad'], ['Tamaño', 'De 1 a 200 M€ de facturación'], ['Sectores', 'Componentes · Recambios · Vehículos y campers · Concesionarios · Movilidad eléctrica'], ['Mercados', 'Cataluña · España · Europa'], ['Liderado por', 'Cesc Callejas, fundador']],
    prob: 'La automoción cambia más rápido que nunca: electrificación, nuevos actores, software y compradores que lo investigan todo online. Muchos fabricantes de componentes, carroceros y grupos de concesionarios todavía se presentan como hace diez años — fichas técnicas, fotos de banco de imágenes y un logo que nadie recuerda.',
    quote: 'El producto ha evolucionado. <b>La marca sigue siendo el modelo del año pasado.</b>',
    sigH: 'Tres señales de que la marca os frena.',
    sig: [
      ['01', 'Competís solo por ficha y precio', 'Si fabricantes, distribuidores y compradores solo comparan fichas técnicas y precios, la marca no hace su trabajo: el valor de vuestra ingeniería, calidad y servicio se pierde.'],
      ['02', 'Cada concesionario lo cuenta distinto', 'Distribuidores, concesionarios e instaladores os explican a su manera. Sin un sistema de marca claro, en cada punto de venta parecéis una empresa distinta.'],
      ['03', 'El cliente final no os conoce', 'De los recambios a las furgonetas y campers, los compradores buscan, comparan y preguntan a los asistentes de IA antes de hablar con un comercial. Si en internet no sois claros, no entráis en la lista.'],
    ],
    howH: 'Del taller al concesionario — una sola marca clara.',
    how: [
      ['Estrategia', '2–4 semanas', 'Entrevistas iniciales con dirección, equipo comercial y clientes clave (fabricantes o concesionarios), un workshop y una sesión de entrega: dónde competís, quiénes sois de verdad y la idea que os hace ganar más allá de la ficha técnica.'],
      ['Identidad de marca', 'Desde 2 semanas', 'Logo, sistema visual y tono de voz para producto, packaging, flota, concesionario y stand de feria. Sesiones para ver el avance y una presentación final. Los renders 3D, la fotografía o más contenido alargan el plazo.'],
      ['Web, SEO y GEO', '1–2 meses', 'UX/UI, diseño y programación a medida — catálogo de producto, configurador o buscador de distribuidores si os hacen falta — enseñándoos el progreso hasta el lanzamiento. Hecha para que la encuentren Google y los asistentes de IA.'],
      ['Lanzamiento', 'Opcional', 'Un plan de lanzamiento de la nueva marca, con un vídeo de marca — para concesionarios, distribuidores, ferias, redes y el cliente final.'],
    ],
    caseL: 'Caso · Relats', caseH: 'Protegiendo lo que mueve el mundo.',
    caseP: 'Relats desarrolla soluciones técnicas de protección para la movilidad eléctrica, la automoción y la energía eólica. La reposicionamos de proveedor de componentes a socio global en soluciones innovadoras y de seguridad — estrategia, identidad y una nueva plataforma digital.',
    caseBtn: 'Mira el caso Relats',
    exp: 'Relats · Julià (campers premium) · Induktor (hardware de sim racing) · Repsol · SAP · Seidor · Glovo',
    faqH: 'Lo que nos preguntan las empresas de automoción.',
    faq: [
      ['¿Podéis trabajar con nuestra red de concesionarios y distribuidores?', 'Sí. Diseñamos la marca para que concesionarios, distribuidores e instaladores la puedan aplicar de forma coherente — guías, plantillas y materiales de punto de venta y digitales — y los incluimos en el plan de lanzamiento.'],
    ],
  },
};

export const automotive = ctx => sectorPage(ctx, {
  C, hero: 'project/assets/imagery/Julia Yosemite.webp', og: '/assets/site/og/relats.jpg',
  proof: { img: R + 'emi-hero-lg-2400.webp', case: 'relats', name: 'Relats' },
});
