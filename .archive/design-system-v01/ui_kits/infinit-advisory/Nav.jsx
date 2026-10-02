// Nav.jsx — Advisory top nav (dark)
function AdvNav({ active = 'home', onNavigate }) {
  const links = [
    { id: 'home', label: 'Advisory' },
    { id: 'services', label: 'Services' },
    { id: 'methodology', label: 'Methodology' },
    { id: 'leadership', label: 'Leadership' },
  ];
  return (
    <header className="inf-nav inf-nav--dark">
      <a className="inf-wm" onClick={() => onNavigate?.('home')}>
        <span>infinit</span>
        <span className="inf-mark inf-mark--accent">c</span>
        <span style={{opacity:.7, marginLeft:6}}>advisory</span>
      </a>
      <nav className="inf-nav__links">
        {links.map(l => (
          <a key={l.id}
             className={active === l.id ? 'is-active' : ''}
             onClick={() => onNavigate?.(l.id)}>{l.label}</a>
        ))}
      </nav>
      <div className="inf-nav__right">
        <a className="inf-nav__switch" onClick={() => onNavigate?.('studio')}>
          <span>infinit</span><span className="inf-mark">c</span><span style={{opacity:.7}}>studio</span>
          <span className="inf-arrow" aria-hidden>↗</span>
        </a>
        <a className="inf-btn inf-btn--ghost" onClick={() => onNavigate?.('contact')}>
          Book a call <span className="inf-arrow" aria-hidden>→</span>
        </a>
      </div>
    </header>
  );
}
window.AdvNav = AdvNav;
