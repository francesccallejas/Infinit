// Footer.jsx — Dark footer used on both Studio and Advisory
function Footer({ practice = 'studio' }) {
  return (
    <footer className="inf-footer">
      <div className="inf-footer__top">
        <h2 className="inf-footer__head">
          Let's structure <span className="inf-accent">what's next.</span>
        </h2>
        <div className="inf-footer__cols">
          <div>
            <h4>Studio</h4>
            <a>Strategy</a><a>Identity</a><a>Digital</a>
          </div>
          <div>
            <h4>Advisory</h4>
            <a>Architecture</a><a>Platform Strategy</a><a>Data &amp; AI</a>
          </div>
          <div>
            <h4>Contact</h4>
            <a>hello@weareinfinit.com</a>
            <a>+34 689 022 383</a>
            <a>Barcelona · Remote</a>
          </div>
        </div>
      </div>
      <div className="inf-footer__bottom">
        <span className="inf-wm inf-wm--sm">
          <span>infinit</span>
          <span className={`inf-mark ${practice === 'advisory' ? 'inf-mark--accent' : ''}`}>c</span>
          {practice === 'advisory' && <span style={{opacity:.6,marginLeft:6}}>advisory</span>}
        </span>
        <span>© 2026 Infinit. All rights reserved.</span>
      </div>
    </footer>
  );
}
window.Footer = Footer;
