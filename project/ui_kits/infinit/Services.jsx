// Services.jsx — Strategy / Identity / Digital triplet
const STUDIO_SERVICES = [
  {
    id: 'strategy',
    eyebrow: 'Strategy',
    head: 'The discipline behind growth.',
    body: 'We help companies define who they are, where they are going, and how they should evolve. Our approach combines business understanding, positioning, growth thinking and real operational experience to create strategies designed to scale.',
    items: ['Brand Strategy', 'Brand Positioning', 'Brand Narrative', 'Brand Architecture', 'Growth Strategy', 'Founder Positioning', 'Investment & Pitch', 'AI-enabled Growth Opportunities', 'Strategic Workshops', 'Experience Strategy', 'Innovation & Opportunity Mapping'],
  },
  {
    id: 'identity',
    eyebrow: 'Identity',
    head: 'Structure made visible.',
    body: 'Identity is not decoration. It is how a company expresses clarity, positioning and ambition across every touchpoint. We design scalable visual and verbal systems built to work across digital, physical and cultural environments.',
    items: ['Visual Identity', 'Verbal Identity', 'Naming', 'Art Direction', 'Motion Systems', 'Design Systems', 'Brand Guidelines', 'Presentation Systems', 'Campaign Concepts', 'Creative Direction', 'Digital-first Identity Systems', 'Content & Activation Assets'],
  },
  {
    id: 'digital',
    eyebrow: 'Digital',
    head: 'Where identity scales.',
    body: 'We combine design, technology, content and growth systems to create digital ecosystems that generate visibility, engagement and measurable business impact.',
    items: ['Websites', 'UX / UI Direction', 'Product & Experience Design', 'Interactive Storytelling', 'Conversion-focused Experiences', 'Social & Activation', 'Performance Marketing', 'AI-generated Content', 'SEO Strategy', 'GEO (Generative Engine Optimization)', 'SEM / Paid Media', 'Analytics & Conversion Optimization', 'Growth Funnels'],
  },
];

function Services() {
  const [open, setOpen] = React.useState('strategy');
  return (
    <section className="inf-services">
      <header className="inf-services__header">
        <div className="inf-eyebrow">Our Services</div>
        <h2 className="inf-services__title">Our approach.</h2>
      </header>
      <div className="inf-services__tabs">
        {STUDIO_SERVICES.map(s => (
          <button
            key={s.id}
            className={`inf-tab ${open === s.id ? 'is-open' : ''}`}
            onClick={() => setOpen(s.id)}>
            <span className="inf-tab__num">0{STUDIO_SERVICES.indexOf(s)+1}</span>
            <span className="inf-tab__label">{s.eyebrow}</span>
          </button>
        ))}
      </div>
      {STUDIO_SERVICES.filter(s => s.id === open).map(s => (
        <div className="inf-service" key={s.id}>
          <div className="inf-service__left">
            <h3 className="inf-service__head">{s.head}</h3>
            <p className="inf-service__body">{s.body}</p>
          </div>
          <ul className="inf-service__items">
            {s.items.map((it, i) => (
              <li key={it}>
                <span className="inf-service__n">{String(i+1).padStart(2,'0')}</span>
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
window.Services = Services;
