// Services.jsx — Advisory three pillars
const ADV_SERVICES = [
  {
    id: 'architecture',
    eyebrow: 'Digital Architecture',
    head: 'Design the system.',
    body: 'We design how your systems should work. From fragmented systems to structured architecture.',
    items: ['Architecture audit', 'Integration & platform design', 'Technology & vendor selection', 'Roadmap to value'],
  },
  {
    id: 'platform',
    eyebrow: 'Platform Strategy',
    head: 'Make it work.',
    body: 'We ensure platforms support the business — not the other way around. We guide how systems are implemented, governed and evolved over time.',
    items: ['Platform definition (ERP, CRM, etc.)', 'Implementation direction', 'Operation model & governance', 'Vendor & partner management'],
  },
  {
    id: 'data',
    eyebrow: 'Data & AI',
    head: 'Make it smart.',
    body: 'From data to decisions. We design the foundations that turn information into action.',
    items: ['Data strategy & architecture', 'Analytics & decision systems', 'AI use-case definition', 'AI opportunity identification'],
  },
];

function AdvServices() {
  return (
    <section className="adv-services">
      <header className="adv-services__head">
        <div className="inf-eyebrow">What we do</div>
        <h2>We bring structure to complexity.</h2>
      </header>
      <div className="adv-services__grid">
        {ADV_SERVICES.map((s, i) => (
          <div className="adv-service" key={s.id}>
            <div className="adv-service__top">
              <span className="adv-service__n">{String(i+1).padStart(2,'0')}</span>
              <span className="inf-eyebrow" style={{color:'var(--light-blue)'}}>{s.eyebrow}</span>
            </div>
            <h3 className="adv-service__head">{s.head}</h3>
            <p className="adv-service__body">{s.body}</p>
            <ul className="adv-service__items">
              <li className="adv-service__heading">Includes</li>
              {s.items.map(it => <li key={it}>{it}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
window.AdvServices = AdvServices;
