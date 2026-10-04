// Service page: B2B websites that sell (EN / CA / ES). Template + shared copy: sector.mjs.
// Facts: the founder's website approach (custom builds, no WordPress/Webflow, simple maintenance, custom back office,
// ~1 month — 2 if complex or with back office), the GEO set-up we use on our own site, the Relats case (new digital platform).
import { sectorPage } from './sector.mjs';

const R = 'work/relats/relats-assets/';

export const C = {
  en: {
    title: 'B2B websites that sell — Barcelona | INFINIT©',
    desc: 'Custom B2B websites for companies of €1M–€200M: fast, multilingual, built for SEO & GEO, with a custom back office. No templates. Studio in Barcelona.',
    lbl: 'B2B websites',
    h1: 'A website that works as hard as <b>your sales team.</b>',
    meta: [
      ['For', 'Mid-sized B2B companies, startups & scaleups'],
      ['Size', '€1M–€200M revenue'],
      ['Includes', 'Strategy · UX/UI · Custom development · SEO & GEO · Back office'],
      ['Markets', 'Catalonia · Spain · Europe'],
      ['Led by', 'Cesc Callejas, founder'],
    ],
    prob: 'For most B2B buyers, your website is the first meeting — and often the one that decides whether there will be a second. Yet many companies still run on a template that never quite fit: slow, hard to update, telling a different story in each language, and invisible when buyers ask Google or an AI assistant who to call.',
    quote: 'Your buyers visit before they call. <b>What do they find?</b>',
    sigH: 'Three signs your website is costing you sales.',
    sig: [
      ['01', 'Every change is a ticket', 'Updating a product sheet or a case study means calling a developer or fighting the theme. So nobody does it, and the website falls months behind the company.'],
      ['02', 'It lists, but it doesn’t sell', 'A product catalogue and a contact form. No clear reason to choose you, no path for the buyer, nothing your sales team would send before a meeting.'],
      ['03', 'Google and AI can’t find you', 'Slow pages, thin content, one language done properly and the rest machine-translated. When buyers ask ChatGPT or Google for a supplier, clearer competitors get named.'],
    ],
    howH: 'From the first sketch to launch — one website that sells.',
    how: [
      ['Strategy & architecture', '2–4 weeks', 'Interviews with management and sales, one workshop and a deliverable session: who the website is for, what it must get them to do, and the structure, pages and messages to get there.'],
      ['Design & development', '1–2 months', 'UX/UI, design and custom development — no WordPress, no Webflow, no templates — with progress reviews until launch. Fast, multilingual and built for SEO & GEO from the first line of code. Two months if it’s complex or has a back office.'],
      ['Back office', 'Optional', 'When your team needs to update products, cases or news, a custom back office built around your content — much faster to work with than a generic CMS.'],
      ['Launch & care', 'Ongoing', 'We set up Google Search Console and Bing Webmaster Tools and submit the sitemap. After that, simple maintenance by design: your team updates the content and the website keeps pace with the company.'],
    ],
    caseL: 'Case · Relats',
    caseH: 'A new digital platform for a global partner.',
    caseP: 'Relats engineers technical covering solutions for e-mobility, automotive and wind energy. Its brand read like a parts supplier. We repositioned it as a global partner — strategy, identity and a new digital platform: a fast, scalable website, live at relats.com.',
    caseBtn: 'See the Relats case',
    exp: 'Relats · Bunnker · Instellar · Induktor · Girbau · Seidor · SAP · Repsol · Glovo',
    faqH: 'What companies ask us about their website.',
    faq: [
      ['Who maintains the website after launch?', 'Mostly, your own team — that’s the point. We build custom websites designed for simple maintenance and, when you need it, a custom back office so you can update products, cases and news yourselves, much faster than in a generic CMS.'],
    ],
  },
  ca: {
    title: 'Webs B2B que venen — Barcelona | INFINIT©',
    desc: 'Webs B2B a mida per a empreses d’1 a 200 M€: ràpides, multilingües, fetes per al SEO i el GEO, amb backoffice a mida. Sense plantilles. Estudi a Barcelona.',
    lbl: 'Webs B2B',
    h1: 'Una web que treballa tant com <b>el vostre equip comercial.</b>',
    meta: [
      ['Per a', 'Empreses B2B mitjanes, startups i scaleups'],
      ['Mida', 'D’1 a 200 M€ de facturació'],
      ['Inclou', 'Estratègia · UX/UI · Programació a mida · SEO i GEO · Backoffice'],
      ['Mercats', 'Catalunya · Espanya · Europa'],
      ['Liderat per', 'Cesc Callejas, fundador'],
    ],
    prob: 'Per a la majoria de compradors B2B, la web és la primera reunió — i sovint la que decideix si n’hi haurà una segona. Tot i així, moltes empreses encara funcionen amb una plantilla que mai no s’hi va acabar d’ajustar: lenta, difícil d’actualitzar, amb un relat diferent a cada idioma i invisible quan els compradors pregunten a Google o a un assistent d’IA a qui han de trucar.',
    quote: 'Els compradors us visiten abans de trucar. <b>Què hi troben?</b>',
    sigH: 'Tres senyals que la web us fa perdre vendes.',
    sig: [
      ['01', 'Cada canvi és un tiquet', 'Actualitzar una fitxa de producte o un cas vol dir trucar a un programador o barallar-se amb la plantilla. Així que ningú no ho fa, i la web va mesos per darrere de l’empresa.'],
      ['02', 'Enumera, però no ven', 'Un catàleg de productes i un formulari de contacte. Cap motiu clar per triar-vos, cap camí per al comprador, res que el vostre equip comercial enviaria abans d’una reunió.'],
      ['03', 'Google i la IA no us troben', 'Pàgines lentes, poc contingut, un idioma ben fet i la resta traduïts automàticament. Quan els compradors demanen un proveïdor a ChatGPT o a Google, hi surten competidors més clars.'],
    ],
    howH: 'Del primer esbós al llançament — una web que ven.',
    how: [
      ['Estratègia i arquitectura', '2–4 setmanes', 'Entrevistes amb direcció i equip comercial, un workshop i una sessió d’entrega: per a qui és la web, què ha d’aconseguir que facin, i l’estructura, les pàgines i els missatges per arribar-hi.'],
      ['Disseny i programació', '1–2 mesos', 'UX/UI, disseny i programació a mida — ni WordPress, ni Webflow, ni plantilles — ensenyant-vos el progrés fins al llançament. Ràpida, multilingüe i feta per al SEO i el GEO des de la primera línia de codi. Dos mesos si és complexa o té backoffice.'],
      ['Backoffice', 'Opcional', 'Quan el vostre equip ha d’actualitzar productes, casos o notícies, un backoffice a mida pensat per al vostre contingut — molt més ràpid de fer servir que un gestor genèric.'],
      ['Llançament i manteniment', 'Continu', 'Configurem Google Search Console i Bing Webmaster Tools i hi enviem el sitemap. Després, un manteniment senzill per disseny: el vostre equip actualitza el contingut i la web segueix el ritme de l’empresa.'],
    ],
    caseL: 'Cas · Relats',
    caseH: 'Una nova plataforma digital per a un soci global.',
    caseP: 'Relats desenvolupa solucions tècniques de protecció per a la mobilitat elèctrica, l’automoció i l’energia eòlica. La seva marca semblava la d’un proveïdor de peces. La vam reposicionar com a soci global — estratègia, identitat i una nova plataforma digital: una web ràpida i escalable, en línia a relats.com.',
    caseBtn: 'Mira el cas Relats',
    exp: 'Relats · Bunnker · Instellar · Induktor · Girbau · Seidor · SAP · Repsol · Glovo',
    faqH: 'El que ens pregunten les empreses sobre la seva web.',
    faq: [
      ['Qui manté la web després del llançament?', 'Sobretot, el vostre equip — d’això es tracta. Fem webs a mida pensades per a un manteniment senzill i, quan cal, un backoffice a mida perquè actualitzeu productes, casos i notícies vosaltres mateixos, molt més ràpid que amb un gestor genèric.'],
    ],
  },
  es: {
    title: 'Webs B2B que venden — Barcelona | INFINIT©',
    desc: 'Webs B2B a medida para empresas de 1 a 200 M€: rápidas, multilingües, hechas para SEO y GEO, con backoffice a medida. Sin plantillas. Estudio en Barcelona.',
    lbl: 'Webs B2B',
    h1: 'Una web que trabaja tanto como <b>vuestro equipo comercial.</b>',
    meta: [
      ['Para', 'Empresas B2B medianas, startups y scaleups'],
      ['Tamaño', 'De 1 a 200 M€ de facturación'],
      ['Incluye', 'Estrategia · UX/UI · Programación a medida · SEO y GEO · Backoffice'],
      ['Mercados', 'Cataluña · España · Europa'],
      ['Liderado por', 'Cesc Callejas, fundador'],
    ],
    prob: 'Para la mayoría de compradores B2B, la web es la primera reunión — y a menudo la que decide si habrá una segunda. Aun así, muchas empresas siguen funcionando con una plantilla que nunca acabó de encajar: lenta, difícil de actualizar, con un relato distinto en cada idioma e invisible cuando los compradores preguntan a Google o a un asistente de IA a quién llamar.',
    quote: 'Los compradores os visitan antes de llamar. <b>¿Qué encuentran?</b>',
    sigH: 'Tres señales de que la web os hace perder ventas.',
    sig: [
      ['01', 'Cada cambio es un ticket', 'Actualizar una ficha de producto o un caso significa llamar a un programador o pelearse con la plantilla. Así que nadie lo hace, y la web va meses por detrás de la empresa.'],
      ['02', 'Enumera, pero no vende', 'Un catálogo de productos y un formulario de contacto. Ningún motivo claro para elegiros, ningún camino para el comprador, nada que vuestro equipo comercial enviaría antes de una reunión.'],
      ['03', 'Google y la IA no os encuentran', 'Páginas lentas, poco contenido, un idioma bien hecho y el resto traducidos automáticamente. Cuando los compradores piden un proveedor a ChatGPT o a Google, aparecen competidores más claros.'],
    ],
    howH: 'Del primer boceto al lanzamiento — una web que vende.',
    how: [
      ['Estrategia y arquitectura', '2–4 semanas', 'Entrevistas con dirección y equipo comercial, un workshop y una sesión de entrega: para quién es la web, qué tiene que conseguir que hagan, y la estructura, las páginas y los mensajes para lograrlo.'],
      ['Diseño y programación', '1–2 meses', 'UX/UI, diseño y programación a medida — ni WordPress, ni Webflow, ni plantillas — enseñándoos el progreso hasta el lanzamiento. Rápida, multilingüe y hecha para el SEO y el GEO desde la primera línea de código. Dos meses si es compleja o tiene backoffice.'],
      ['Backoffice', 'Opcional', 'Cuando vuestro equipo tiene que actualizar productos, casos o noticias, un backoffice a medida pensado para vuestro contenido — mucho más rápido de usar que un gestor genérico.'],
      ['Lanzamiento y mantenimiento', 'Continuo', 'Configuramos Google Search Console y Bing Webmaster Tools y enviamos el sitemap. Después, un mantenimiento sencillo por diseño: vuestro equipo actualiza el contenido y la web sigue el ritmo de la empresa.'],
    ],
    caseL: 'Caso · Relats',
    caseH: 'Una nueva plataforma digital para un socio global.',
    caseP: 'Relats desarrolla soluciones técnicas de protección para la movilidad eléctrica, la automoción y la energía eólica. Su marca parecía la de un proveedor de piezas. La reposicionamos como socio global — estrategia, identidad y una nueva plataforma digital: una web rápida y escalable, en línea en relats.com.',
    caseBtn: 'Mira el caso Relats',
    exp: 'Relats · Bunnker · Instellar · Induktor · Girbau · Seidor · SAP · Repsol · Glovo',
    faqH: 'Lo que nos preguntan las empresas sobre su web.',
    faq: [
      ['¿Quién mantiene la web después del lanzamiento?', 'Sobre todo, vuestro equipo — de eso se trata. Hacemos webs a medida pensadas para un mantenimiento sencillo y, cuando hace falta, un backoffice a medida para que actualicéis productos, casos y noticias vosotros mismos, mucho más rápido que con un gestor genérico.'],
    ],
  },
};

export const website = ctx => sectorPage(ctx, {
  C, hero: 'project/assets/images/ipad-sunset.webp', og: '/assets/site/og/relats.jpg',
  proof: { img: R + 'mobile.webp', case: 'relats', name: 'Relats' },
});
