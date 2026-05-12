// Problem.jsx — The deck's diagnosis statement
function Problem() {
  const bullets = [
    'Systems grow.',
    'Integrations break.',
    'Decisions fragment.',
    'Complexity increases.',
    'Direction disappears.',
  ];
  return (
    <section className="adv-problem">
      <div className="inf-eyebrow">The Problem</div>
      <h2 className="adv-problem__head">
        Most companies don't lack tools.<br/>
        <span className="inf-accent">They lack structure.</span>
      </h2>
      <ul className="adv-problem__list">
        {bullets.map((b, i) => (
          <li key={b}>
            <span className="adv-problem__n">{String(i+1).padStart(2,'0')}</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <hr className="inf-rule" style={{borderColor: 'rgba(243,240,239,.16)'}}/>
      <p className="adv-problem__kicker">
        We don't implement tools.<br/>
        We define how systems should work.
      </p>
    </section>
  );
}
window.Problem = Problem;
