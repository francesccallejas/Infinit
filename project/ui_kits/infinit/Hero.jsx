// Hero.jsx — Editorial hero echoing the deck's title slide
function Hero({ onNavigate }) {
  return (
    <section className="inf-hero">
      <div className="inf-hero__eyebrow">
        <span>Studio</span>
        <span className="inf-dot">·</span>
        <span>Strategy, Identity &amp; Digital</span>
      </div>
      <h1 className="inf-hero__title">
        Brand &amp; Strategy<br/>
        <span className="inf-soft">designed to scale.</span>
      </h1>
      <div className="inf-hero__foot">
        <p className="inf-hero__lede">
          Infinit is a brand &amp; strategy firm that brings direction for companies
          building their next stage of growth.
        </p>
        <a className="inf-link" onClick={() => onNavigate?.('services')}>
          Our services <span className="inf-arrow" aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
window.Hero = Hero;
