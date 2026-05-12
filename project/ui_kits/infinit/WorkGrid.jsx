// WorkGrid.jsx — Case-study grid for the Studio site
// Imagery is intentionally placeholder; drop real photography into assets/work/ and swap the `bg` value.
const STUDIO_WORK = [
  { id: 'relats', client: 'Relats Group', tag: 'Industrial · 2025',
    head: 'The global trusted partner in innovative and safety covering solutions.',
    services: ['Strategy', 'Identity', 'Digital'],
    bg: 'linear-gradient(135deg, #0a1240 0%, #000728 70%)' },
  { id: 'instellar', client: 'instellar.co', tag: 'Platform · 2024',
    head: 'A platform for engineering teams shipping infrastructure that scales with the org.',
    services: ['Identity', 'Digital'],
    bg: 'linear-gradient(135deg, #1d1d1d 0%, #000728 100%)' },
  { id: 'onze', client: '11onze', tag: 'Fintech · Advisory · 2024',
    head: 'Re-architecting a digital cooperative for member growth.',
    services: ['Strategy', 'Advisory'],
    bg: 'linear-gradient(135deg, #2C5BFF 0%, #1F47D6 100%)' },
  { id: 'scuff', client: 'ScuffArmour', tag: 'Product · 2025',
    head: 'A protection product line, named, structured and brought to market.',
    services: ['Naming', 'Identity'],
    bg: 'linear-gradient(135deg, #2a2a2a 0%, #0d0d0d 100%)' },
];

function WorkGrid({ onOpen }) {
  return (
    <section className="inf-work">
      <header className="inf-work__header">
        <div className="inf-eyebrow">Selected Work</div>
        <h2 className="inf-work__title">Direction, made operational.</h2>
      </header>
      <div className="inf-work__grid">
        {STUDIO_WORK.map(w => (
          <a key={w.id} className="inf-tile" onClick={() => onOpen?.(w.id)}>
            <div className="inf-tile__img" style={{ background: w.bg }}>
              <span className="inf-tile__client">{w.client}</span>
            </div>
            <div className="inf-tile__meta">
              <span className="inf-eyebrow">{w.tag}</span>
              <h3 className="inf-tile__head">{w.head}</h3>
              <div className="inf-tile__svc">
                {w.services.map(s => <span key={s} className="inf-chip">{s}</span>)}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
window.WorkGrid = WorkGrid;
