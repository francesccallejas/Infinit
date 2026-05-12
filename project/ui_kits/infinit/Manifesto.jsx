// Manifesto.jsx — The negative-definition statement (lifted from the deck)
function Manifesto() {
  return (
    <section className="inf-manifesto">
      <div className="inf-eyebrow">Positioning</div>
      <p className="inf-manifesto__body">
        Not another creative agency.<br/>
        Not a traditional consultancy.<br/>
        We work at the intersection of <em>brand</em>, <em>technology</em> and <em>business</em>.<br/>
        Defining direction. Structuring ambition. Designing for scale.
      </p>
      <hr className="inf-rule"/>
      <p className="inf-manifesto__kicker">
        We don't build brands for today.<br/>
        We build brands prepared for <span className="inf-accent">what's next.</span>
      </p>
    </section>
  );
}
window.Manifesto = Manifesto;
