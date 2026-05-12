// Leadership.jsx — Founder card from the deck
function Leadership() {
  return (
    <section className="adv-lead">
      <header className="adv-lead__head">
        <div className="inf-eyebrow">The Leadership</div>
        <h2>20+ years defining and scaling complex business systems.</h2>
      </header>
      <article className="adv-lead__card">
        <div className="adv-lead__person">
          <div className="adv-lead__avatar" aria-hidden></div>
          <div>
            <div className="adv-lead__name">Francesc Callejas</div>
            <div className="adv-lead__role">Founder, Infinit · Strategy, Digital &amp; Advisory</div>
            <div className="adv-lead__contact">
              <a>cesc@weareinfinit.com</a>
              <span>·</span>
              <a>+34 689 022 383</a>
            </div>
          </div>
        </div>
        <div className="adv-lead__grid">
          <div>
            <h4>Executive experience</h4>
            <ul>
              <li>Global CDIO &amp; CMO, Relats</li>
              <li>Former CTO (CIO), Girbau</li>
              <li>SAP Director (S/4HANA, enterprise transformation)</li>
            </ul>
          </div>
          <div>
            <h4>Impact</h4>
            <ul>
              <li>+40% business growth through digital transformation</li>
              <li>+35% operational efficiency via data &amp; AI</li>
              <li>Led enterprise platform transformation (SAP, CRM, data)</li>
            </ul>
          </div>
          <div>
            <h4>Advisory &amp; Startups</h4>
            <ul>
              <li>Advisor to growing companies (Glovo, 11onze, …)</li>
              <li>2 startups founded</li>
              <li>Experience in fundraising, pitch &amp; growth strategy</li>
            </ul>
          </div>
          <div>
            <h4>Education</h4>
            <ul>
              <li>IESE PDD 2025</li>
              <li>INSEAD Digital Strategy</li>
              <li>Master Computer Science</li>
              <li>Telecommunication</li>
            </ul>
          </div>
        </div>
      </article>
    </section>
  );
}
window.Leadership = Leadership;
