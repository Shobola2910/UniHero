// components/Header.tsx

import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky-header">
      <div className="logo">
        <img src="/images/unihero-logo.png" alt="UniHero" />
      </div>
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/resources">Resources</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
