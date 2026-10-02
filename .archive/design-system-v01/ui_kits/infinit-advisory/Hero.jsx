// Hero.jsx — Advisory hero
function AdvHero({ onNavigate }) {
  return (
    <section className="inf-hero">
      <div className="inf-hero__eyebrow">
        <span>Advisory</span>
        <span className="inf-dot">·</span>
        <span>Enterprise architecture, systems &amp; AI</span>
      </div>
      <h1 className="inf-hero__title">
        Strategic &amp; Digital<br/>
        Architecture<br/>
        <span className="inf-soft">designed to scale.</span>
      </h1>
      <div className="inf-hero__foot">
        <p className="inf-hero__lede">
          Infinit Advisory is a strategic advisory firm defining direction for
          companies navigating complex digital ecosystems.
        </p>
        <a className="inf-link" onClick={() => onNavigate?.('services')}>
          What we do <span className="inf-arrow" aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
window.AdvHero = AdvHero;
