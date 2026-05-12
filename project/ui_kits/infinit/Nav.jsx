// Nav.jsx — Infinit Studio top navigation
// Sticky, hairline bottom, sub-brand switcher (Studio ↔ Advisory)
function Nav({ active = 'home', onNavigate, theme = 'light' }) {
  const links = [
    { id: 'home', label: 'Studio' },
    { id: 'services', label: 'Services' },
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
  ];
  const dark = theme === 'dark';
  return (
    <header className={`inf-nav ${dark ? 'inf-nav--dark' : ''}`}>
      <a className="inf-wm" onClick={() => onNavigate?.('home')}>
        <span>infinit</span>
        <span className="inf-mark">c</span>
      </a>
      <nav className="inf-nav__links">
        {links.map(l => (
          <a key={l.id}
             className={active === l.id ? 'is-active' : ''}
             onClick={() => onNavigate?.(l.id)}>{l.label}</a>
        ))}
      </nav>
      <div className="inf-nav__right">
        <a className="inf-nav__switch" onClick={() => onNavigate?.('advisory')}>
          <span>infinit</span><span className="inf-mark inf-mark--accent">c</span><span>advisory</span>
          <span className="inf-arrow" aria-hidden>↗</span>
        </a>
        <a className="inf-btn inf-btn--ghost" onClick={() => onNavigate?.('contact')}>
          Start a project <span className="inf-arrow" aria-hidden>→</span>
        </a>
      </div>
    </header>
  );
}
window.Nav = Nav;
