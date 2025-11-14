// components/Navbar.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  const link = (href: string, label: string, emoji: string) => (
    <Link
      href={href}
      className={
        'uh-nav-link' + (router.pathname === href ? ' uh-nav-link--active' : '')
      }
      key={href}
    >
      <span>{emoji}</span>
      <span>{label.toUpperCase()}</span>
    </Link>
  );

  return (
    <header className="uh-nav">
      <div className="uh-nav-left">
        <div className="uh-logo-mark">U</div>
        <div className="uh-logo-text">UniHero</div>
      </div>
      <nav className="uh-nav-links">
        {link('/', 'Home', '🏠')}
        {link('/about', 'About', '💬')}
        {link('/resources', 'Resource', '📚')}
        {link('/contact', 'Contact', '📞')}
      </nav>
    </header>
  );
}
