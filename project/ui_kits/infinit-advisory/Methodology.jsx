// Methodology.jsx — Understand → Map → Structure → Decide → Scale
const STEPS = [
  { n: '01', t: 'Understand', d: 'We assess your current systems and challenges.' },
  { n: '02', t: 'Map', d: 'Architecture audit, integrations, dependencies.' },
  { n: '03', t: 'Structure', d: 'Define target architecture and decision model.' },
  { n: '04', t: 'Decide', d: 'Direction, roadmap and vendor selection.' },
  { n: '05', t: 'Scale', d: 'Guide implementation, governance and evolution.' },
];

const PHASES = [
  { t: 'Diagnosis', d: 'We assess your current systems and challenges.' },
  { t: 'Direction', d: 'We define architecture and roadmap.' },
  { t: 'Execution', d: 'We guide implementation and decisions.' },
];

function Methodology() {
  return (
    <section className="adv-method">
      <header className="adv-method__head">
        <div className="inf-eyebrow">How we work</div>
        <h2>From diagnosis to scale.</h2>
      </header>
      <div className="adv-method__phases">
        {PHASES.map((p, i) => (
          <div className="adv-phase" key={p.t}>
            <span className="adv-phase__n">{String(i+1).padStart(2,'0')}</span>
            <h3>{p.t}</h3>
            <p>{p.d}</p>
          </div>
        ))}
      </div>
      <div className="adv-method__bar">
        {STEPS.map((s) => (
          <div className="adv-step" key={s.n}>
            <span className="adv-step__n">{s.n}</span>
            <span className="adv-step__t">{s.t}</span>
            <span className="adv-step__d">{s.d}</span>
          </div>
        ))}
      </div>
      <p className="adv-method__foot">
        Fractional or Interim <span className="inf-accent">CIO / CDO</span> engagement available across all phases.
      </p>
    </section>
  );
}
window.Methodology = Methodology;
