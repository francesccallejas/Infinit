/* ============================================================
   Infinit® — lightweight i18n
   CA · ES · EN  (default EN) · auto-detect from navigator, manual toggle persists
   Texts are tagged in the HTML with data-i18n="key" (innerHTML, keeps <em> etc.)
   ============================================================ */
(function () {
  var DEFAULT = 'en';

  var DICT = {
    en: {
      /* nav / menu */
      'nav.work': 'Work', 'nav.services': 'Services', 'nav.studio': 'Studio', 'nav.contact': 'Contact',
      'mbar.contact': 'Contact',
      'meta.firm': 'Brand &amp; Strategy firm', 'meta.loc': 'Barcelona — Worldwide',
      'quick.label': 'A quick look', 'quick.overview': 'Overview', 'quick.glance': 'The studio at a glance',
      'fab.title': 'A quick look <span class="fab-new">NEW</span>', 'fab.sub': 'Overview of the studio', 'fab.view': 'View',
      /* overview overlay */
      'ov.title': 'One studio, <em>everything connected.</em>',
      'ov.work': 'Selected work', 'ov.pillars': 'Three pillars', 'ov.studio': 'The studio',
      'ov.claim': 'Brands built to <em>scale.</em>', 'ov.approach': 'Our approach',
      'ov.talk': 'Let’s <em>talk.</em>', 'ov.getintouch': 'Get in touch',
      'pillar.strategy': 'Strategy', 'pillar.identity': 'Identity', 'pillar.digital': 'Digital',
      /* hero */
      'hero.l1': 'Brands built', 'hero.l2': 'to <em>scale</em><sup class="hero-reg">&reg;</sup>',
      'hero.tag': 'Brand &amp; Strategy firm · Barcelona — Worldwide', 'hero.cue': 'Scroll ↓',
      /* statement / claim / approach */
      'stmt.main': 'A strategic brand and digital firm for companies navigating <em>growth</em>, transformation and <em>modernization</em>.',
      'claim.h': 'Strategic credibility, <em>aesthetic</em> sophistication.',
      'claim.p': 'Built through real transformation experience',
      'approach.eb': 'Our approach',
      'approach.main': 'Building brands that <em>move</em> business <em>forward.</em>',
      'approach.sub': 'Strategy, identity and digital — <em>connected.</em>',
      /* services */
      'svc.eb': 'Capabilities', 'svc.h': 'Three disciplines.<br>One studio.',
      'svc.strategy.ttl': 'Strategy',
      'svc.strategy.p': 'Direction aligning business ambition, market opportunity and execution. Positioning, growth systems, strategic clarity and modern brand evolution.',
      'svc.strategy.subs': '<span>Brand Strategy</span><span>Positioning</span><span>Growth Strategy</span><span>Fractional CMO</span><span>Research</span><span>AI Opportunity Mapping</span>',
      'svc.identity.ttl': 'Identity',
      'svc.identity.p': 'Scalable visual and verbal systems designed for clarity, recognition and consistency across every touchpoint.',
      'svc.identity.subs': '<span>Visual Identity</span><span>Naming</span><span>Design Systems</span><span>Art Direction</span><span>Motion</span><span>Creative Direction</span>',
      'svc.digital.ttl': 'Digital',
      'svc.digital.p': 'Digital experiences built for discoverability, engagement and measurable business impact.',
      'svc.digital.subs': '<span>Websites &amp; Platforms</span><span>UX / UI Direction</span><span>SEO &amp; GEO</span><span>Performance Marketing</span><span>Social &amp; Content</span><span>Analytics &amp; Conversion</span><span>AI Experiences</span>',
      /* work */
      'work.h': 'Selected <em>work.</em>', 'work.wip': 'Work in progress',
      'work.bunnker.sub': 'beyond renting', 'work.induktor.sub': 'sim racing hardware',
      'work.instellar.sub': 'mission performance', 'work.relats.sub': 'ahead of the curve',
      'work.julia.sub': 'premium adventure vans', 'work.almirall.sub': 'beautifully clinical',
      'tag.sb': 'Strategy<i class="s">·</i>Brand',
      'tag.sbd': 'Strategy<i class="s">·</i>Brand<i class="s">·</i>Digital',
      'tag.sd': 'Strategy<i class="s">·</i>Digital',
      /* clients / cta */
      'clients.eb': 'Experience across',
      'cta.h': 'Brands built <em>to scale.</em>', 'cta.start': 'Start the conversation',
      /* footer / cookies */
      'foot.claim': 'Built to scale.', 'foot.studio': 'Studio', 'foot.connect': 'Connect',
      'foot.rec': 'Founder recognised by', 'foot.loc': 'Barcelona — Worldwide',
      'ck.msg': 'We use cookies to enhance your experience and analyse traffic.',
      'ck.more': 'Learn more', 'ck.decline': 'Decline', 'ck.accept': 'Accept',
      /* ---- studio page ---- */
      'st.eb': 'The studio',
      'st.hero.h': 'Brands that move —<br>fast, and <em>with clarity.</em>',
      'st.lead': 'Infinit® is a brand &amp; strategy studio built on one belief: branding is a craft — and craft is made by <span class="acc">people.</span>',
      'st.clarity.ttl': 'Clarity',
      'st.clarity.p': 'Simple, fast, understood at first glance. We strip away everything that isn’t the idea, so the brand reads instantly and moves with speed. Clarity is a competitive advantage — and a faster path to market.',
      'st.alive.ttl': 'Alive',
      'st.alive.p': 'A brand is never a static logo. We build living identities — systems that move, breathe and iterate, designed to evolve with the company. Infinite by design, never finished.',
      'st.people.ttl': 'People',
      'st.people.p': 'Branding should be a recognised craft — built by senior hands and fairly valued. A sector that counts on its people, values their craft, and rewards it as the discipline it is. People first, always.',
      'st.exp': 'Experience across',
      'st.big': 'All led hands-on by <span class="chip"><img src="project/assets/imagery/francesc.jpg" alt="Cesc Callejas"></span> <span class="snm">Cesc Callejas</span> — two decades on both sides of the table: building brands, and running the operations that depend on them. No layers. You work with him.',
      'st.k.scratch': 'Built from scratch', 'st.k.growth': 'Growth · 2 yrs', 'st.k.vis': 'Visibility',
      'st.cta.h': 'Let’s build something <em>that scales.</em>'
    },

    es: {
      'nav.work': 'Proyectos', 'nav.services': 'Servicios', 'nav.studio': 'Estudio', 'nav.contact': 'Contacto',
      'mbar.contact': 'Contacto',
      'meta.firm': 'Estudio de marca y estrategia', 'meta.loc': 'Barcelona — Internacional',
      'quick.label': 'Un vistazo', 'quick.overview': 'Resumen', 'quick.glance': 'El estudio de un vistazo',
      'fab.title': 'Un vistazo <span class="fab-new">NUEVO</span>', 'fab.sub': 'Resumen del estudio', 'fab.view': 'Ver',
      'ov.title': 'Un estudio, <em>todo conectado.</em>',
      'ov.work': 'Proyectos', 'ov.pillars': 'Tres pilares', 'ov.studio': 'El estudio',
      'ov.claim': 'Marcas hechas <em>para escalar.</em>', 'ov.approach': 'Nuestro enfoque',
      'ov.talk': '<em>Hablemos.</em>', 'ov.getintouch': 'Contacta',
      'pillar.strategy': 'Estrategia', 'pillar.identity': 'Identidad', 'pillar.digital': 'Digital',
      'hero.l1': 'Marcas hechas', 'hero.l2': 'para <em>escalar</em><sup class="hero-reg">&reg;</sup>',
      'hero.tag': 'Estudio de marca y estrategia · Barcelona — Internacional', 'hero.cue': 'Desliza ↓',
      'stmt.main': 'Un estudio estratégico de marca y digital para empresas en <em>crecimiento</em>, transformación y <em>modernización</em>.',
      'claim.h': 'Credibilidad estratégica, sofisticación <em>estética</em>.',
      'claim.p': 'Construido con experiencia real en transformación',
      'approach.eb': 'Nuestro enfoque',
      'approach.main': 'Creamos marcas que <em>impulsan</em> el <em>negocio.</em>',
      'approach.sub': 'Estrategia, identidad y digital — <em>conectados.</em>',
      'svc.eb': 'Capacidades', 'svc.h': 'Tres disciplinas.<br>Un estudio.',
      'svc.strategy.ttl': 'Estrategia',
      'svc.strategy.p': 'Dirección que alinea la ambición del negocio, la oportunidad de mercado y la ejecución. Posicionamiento, sistemas de crecimiento, claridad estratégica y evolución de marca.',
      'svc.strategy.subs': '<span>Estrategia de marca</span><span>Posicionamiento</span><span>Estrategia de crecimiento</span><span>CMO fraccional</span><span>Investigación</span><span>Mapeo de oportunidades IA</span>',
      'svc.identity.ttl': 'Identidad',
      'svc.identity.p': 'Sistemas visuales y verbales escalables, diseñados para la claridad, el reconocimiento y la coherencia en cada punto de contacto.',
      'svc.identity.subs': '<span>Identidad visual</span><span>Naming</span><span>Sistemas de diseño</span><span>Dirección de arte</span><span>Motion</span><span>Dirección creativa</span>',
      'svc.digital.ttl': 'Digital',
      'svc.digital.p': 'Experiencias digitales creadas para la visibilidad, la interacción y un impacto de negocio medible.',
      'svc.digital.subs': '<span>Webs y plataformas</span><span>Dirección UX / UI</span><span>SEO y GEO</span><span>Performance Marketing</span><span>Social y contenido</span><span>Analítica y conversión</span><span>Experiencias IA</span>',
      'work.h': 'Proyectos <em>destacados.</em>', 'work.wip': 'En progreso',
      'work.bunnker.sub': 'más que alquilar', 'work.induktor.sub': 'hardware de sim racing',
      'work.instellar.sub': 'rendimiento de misión', 'work.relats.sub': 'por delante de la curva',
      'work.julia.sub': 'campers premium', 'work.almirall.sub': 'clínicamente bello',
      'tag.sb': 'Estrategia<i class="s">·</i>Marca',
      'tag.sbd': 'Estrategia<i class="s">·</i>Marca<i class="s">·</i>Digital',
      'tag.sd': 'Estrategia<i class="s">·</i>Digital',
      'clients.eb': 'Experiencia en',
      'cta.h': 'Marcas hechas <em>para escalar.</em>', 'cta.start': 'Empieza la conversación',
      'foot.claim': 'Hechas para escalar.', 'foot.studio': 'Estudio', 'foot.connect': 'Contacto',
      'foot.rec': 'Fundador reconocido por', 'foot.loc': 'Barcelona — Internacional',
      'ck.msg': 'Usamos cookies para mejorar tu experiencia y analizar el tráfico.',
      'ck.more': 'Más información', 'ck.decline': 'Rechazar', 'ck.accept': 'Aceptar',
      'st.eb': 'El estudio',
      'st.hero.h': 'Marcas que se mueven —<br>rápido y <em>con claridad.</em>',
      'st.lead': 'Infinit® es un estudio de marca y estrategia con una convicción: el branding es un oficio — y el oficio lo hacen las <span class="acc">personas.</span>',
      'st.clarity.ttl': 'Claridad',
      'st.clarity.p': 'Simple, rápido, entendido a la primera. Eliminamos todo lo que no es la idea, para que la marca se lea al instante y avance rápido. La claridad es una ventaja competitiva — y un camino más rápido al mercado.',
      'st.alive.ttl': 'Viva',
      'st.alive.p': 'Una marca nunca es un logo estático. Creamos identidades vivas — sistemas que se mueven, respiran e iteran, diseñados para evolucionar con la empresa. Infinitas por diseño, nunca terminadas.',
      'st.people.ttl': 'Personas',
      'st.people.p': 'El branding debería ser un oficio reconocido — hecho por manos sénior y valorado con justicia. Un sector que cuenta con su gente, valora su oficio y lo recompensa como la disciplina que es. Las personas primero, siempre.',
      'st.exp': 'Experiencia en',
      'st.big': 'Todo liderado en persona por <span class="chip"><img src="project/assets/imagery/francesc.jpg" alt="Cesc Callejas"></span> <span class="snm">Cesc Callejas</span> — dos décadas a ambos lados de la mesa: construyendo marcas y dirigiendo las operaciones que dependen de ellas. Sin capas. Trabajas con él.',
      'st.k.scratch': 'Construido de cero', 'st.k.growth': 'Crecimiento · 2 años', 'st.k.vis': 'Visibilidad',
      'st.cta.h': 'Construyamos algo <em>que escale.</em>'
    },

    ca: {
      'nav.work': 'Projectes', 'nav.services': 'Serveis', 'nav.studio': 'Estudi', 'nav.contact': 'Contacte',
      'mbar.contact': 'Contacte',
      'meta.firm': 'Estudi de marca i estratègia', 'meta.loc': 'Barcelona — Internacional',
      'quick.label': 'Un cop d’ull', 'quick.overview': 'Resum', 'quick.glance': 'L’estudi d’un cop d’ull',
      'fab.title': 'Un cop d’ull <span class="fab-new">NOU</span>', 'fab.sub': 'Resum de l’estudi', 'fab.view': 'Veure',
      'ov.title': 'Un estudi, <em>tot connectat.</em>',
      'ov.work': 'Projectes', 'ov.pillars': 'Tres pilars', 'ov.studio': 'L’estudi',
      'ov.claim': 'Marques fetes <em>per escalar.</em>', 'ov.approach': 'El nostre enfocament',
      'ov.talk': '<em>Parlem.</em>', 'ov.getintouch': 'Contacta',
      'pillar.strategy': 'Estratègia', 'pillar.identity': 'Identitat', 'pillar.digital': 'Digital',
      'hero.l1': 'Marques fetes', 'hero.l2': 'per <em>escalar</em><sup class="hero-reg">&reg;</sup>',
      'hero.tag': 'Estudi de marca i estratègia · Barcelona — Internacional', 'hero.cue': 'Llisca ↓',
      'stmt.main': 'Un estudi estratègic de marca i digital per a empreses en <em>creixement</em>, transformació i <em>modernització</em>.',
      'claim.h': 'Credibilitat estratègica, sofisticació <em>estètica</em>.',
      'claim.p': 'Construït amb experiència real en transformació',
      'approach.eb': 'El nostre enfocament',
      'approach.main': 'Creem marques que <em>impulsen</em> el <em>negoci.</em>',
      'approach.sub': 'Estratègia, identitat i digital — <em>connectats.</em>',
      'svc.eb': 'Capacitats', 'svc.h': 'Tres disciplines.<br>Un estudi.',
      'svc.strategy.ttl': 'Estratègia',
      'svc.strategy.p': 'Direcció que alinea l’ambició del negoci, l’oportunitat de mercat i l’execució. Posicionament, sistemes de creixement, claredat estratègica i evolució de marca.',
      'svc.strategy.subs': '<span>Estratègia de marca</span><span>Posicionament</span><span>Estratègia de creixement</span><span>CMO fraccional</span><span>Recerca</span><span>Mapeig d’oportunitats IA</span>',
      'svc.identity.ttl': 'Identitat',
      'svc.identity.p': 'Sistemes visuals i verbals escalables, dissenyats per a la claredat, el reconeixement i la coherència a cada punt de contacte.',
      'svc.identity.subs': '<span>Identitat visual</span><span>Naming</span><span>Sistemes de disseny</span><span>Direcció d’art</span><span>Motion</span><span>Direcció creativa</span>',
      'svc.digital.ttl': 'Digital',
      'svc.digital.p': 'Experiències digitals creades per a la visibilitat, la interacció i un impacte de negoci mesurable.',
      'svc.digital.subs': '<span>Webs i plataformes</span><span>Direcció UX / UI</span><span>SEO i GEO</span><span>Performance Marketing</span><span>Social i contingut</span><span>Analítica i conversió</span><span>Experiències IA</span>',
      'work.h': 'Projectes <em>destacats.</em>', 'work.wip': 'En curs',
      'work.bunnker.sub': 'més que llogar', 'work.induktor.sub': 'hardware de sim racing',
      'work.instellar.sub': 'rendiment de missió', 'work.relats.sub': 'al capdavant',
      'work.julia.sub': 'campers premium', 'work.almirall.sub': 'clínicament bell',
      'tag.sb': 'Estratègia<i class="s">·</i>Marca',
      'tag.sbd': 'Estratègia<i class="s">·</i>Marca<i class="s">·</i>Digital',
      'tag.sd': 'Estratègia<i class="s">·</i>Digital',
      'clients.eb': 'Experiència a',
      'cta.h': 'Marques fetes <em>per escalar.</em>', 'cta.start': 'Comencem a parlar',
      'foot.claim': 'Fetes per escalar.', 'foot.studio': 'Estudi', 'foot.connect': 'Contacte',
      'foot.rec': 'Fundador reconegut per', 'foot.loc': 'Barcelona — Internacional',
      'ck.msg': 'Fem servir cookies per millorar la teva experiència i analitzar el trànsit.',
      'ck.more': 'Més informació', 'ck.decline': 'Rebutjar', 'ck.accept': 'Acceptar',
      'st.eb': 'L’estudi',
      'st.hero.h': 'Marques que es mouen —<br>ràpid i <em>amb claredat.</em>',
      'st.lead': 'Infinit® és un estudi de marca i estratègia amb una convicció: el branding és un ofici — i l’ofici el fan les <span class="acc">persones.</span>',
      'st.clarity.ttl': 'Claredat',
      'st.clarity.p': 'Simple, ràpid, entès a la primera. Traiem tot el que no és la idea, perquè la marca es llegeixi a l’instant i avanci ràpid. La claredat és un avantatge competitiu — i un camí més ràpid al mercat.',
      'st.alive.ttl': 'Viva',
      'st.alive.p': 'Una marca mai és un logo estàtic. Creem identitats vives — sistemes que es mouen, respiren i iteren, dissenyats per evolucionar amb l’empresa. Infinites per disseny, mai acabades.',
      'st.people.ttl': 'Persones',
      'st.people.p': 'El branding hauria de ser un ofici reconegut — fet per mans sènior i valorat amb justícia. Un sector que compta amb la seva gent, valora el seu ofici i el recompensa com la disciplina que és. Les persones primer, sempre.',
      'st.exp': 'Experiència a',
      'st.big': 'Tot liderat en persona per <span class="chip"><img src="project/assets/imagery/francesc.jpg" alt="Cesc Callejas"></span> <span class="snm">Cesc Callejas</span> — dues dècades a banda i banda de la taula: construint marques i dirigint les operacions que en depenen. Sense capes. Treballes amb ell.',
      'st.k.scratch': 'Construït de zero', 'st.k.growth': 'Creixement · 2 anys', 'st.k.vis': 'Visibilitat',
      'st.cta.h': 'Construïm alguna cosa <em>que escali.</em>'
    }
  };

  function detect() {
    // default to English always; only honour a manual choice the user made before
    try { var s = localStorage.getItem('inf_lang'); if (s && DICT[s]) return s; } catch (e) {}
    return DEFAULT;
  }

  function wrapWords(html) {
    return html.replace(/(<[^>]+>)|([^<\s]+)/g, function (m, tag, word) {
      return tag ? tag : '<span class="wd">' + word + '</span> ';
    });
  }

  function apply(lang, live) {
    var d = DICT[lang] || DICT[DEFAULT], en = DICT[DEFAULT];
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      var v = (d[k] != null) ? d[k] : en[k];
      if (v == null) return;
      if (el.hasAttribute('data-words')) {
        if (live) {                                   // re-split + show now (animation already played)
          el.innerHTML = wrapWords(v);
          el.classList.add('lit');
          var st = el.closest('.statement'); if (st) st.classList.add('in');
        } else {                                      // initial load: leave raw, the page splitter wraps it
          el.innerHTML = v;
        }
      } else {
        el.innerHTML = v;
        if (el.hasAttribute('data-t')) el.setAttribute('data-t', el.textContent);
      }
    });
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      var on = b.getAttribute('data-lang') === lang;
      b.classList.toggle('on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    try { localStorage.setItem('inf_lang', lang); } catch (e) {}
    window.__lang = lang;
  }

  function closeAll() {
    document.querySelectorAll('.lang.open').forEach(function (l) { l.classList.remove('open'); });
  }

  apply(detect(), false);

  var swapping = false;
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.lang [data-lang]');
    if (!btn) { closeAll(); return; }          // click elsewhere → collapse the pill
    e.preventDefault();
    var box = btn.closest('.lang');
    var next = btn.getAttribute('data-lang');
    // tapping the active language toggles the pill open/closed
    if (next === window.__lang) { if (box) box.classList.toggle('open'); return; }
    if (swapping) return;
    swapping = true;
    document.documentElement.classList.add('lang-swapping');   // fade text out
    setTimeout(function () {
      apply(next, true);                       // swap copy while hidden
      document.documentElement.classList.remove('lang-swapping'); // fade back in
      closeAll();                              // collapse after choosing
      swapping = false;
    }, 240);
  });

  window.I18N = { apply: apply, dict: DICT, detect: detect };
})();
