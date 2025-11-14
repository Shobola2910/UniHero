// components/Navbar.tsx
export default function Navbar() {
  const link = (href: string, label: string, emoji: string) => (
    <a href={href} className="uh-nav-link" key={href}>
      <span>{emoji}</span>
      <span>{label.toUpperCase()}</span>
    </a>
  );

  return (
    <header className="uh-nav">
      <div className="uh-nav-left">
        <div className="uh-logo-mark">U</div>
        <div className="uh-logo-text">UniHero</div>
      </div>
      <nav className="uh-nav-links">
        {link('#home', 'Home', '🏠')}
        {link('#about', 'About', '💬')}
        {link('#resources', 'Resource', '📚')}
        {link('#contact', 'Contact', '📞')}
      </nav>
    </header>
  );
}
