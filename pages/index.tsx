// pages/index.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="uh-page">
      <section className="uh-hero-card">
        <div className="uh-pill">
          <span>✨</span>
          <span>For Students, By Students</span>
        </div>

        <h1 className="uh-hero-title">UniHero — For Students, By Students</h1>

        <p className="uh-hero-text">
          Practical resources, a helpful community, and simple tools. Learn
          smarter with study guides, templates and quick support.
        </p>

        <div className="uh-hero-buttons">
          <a
            href="https://t.me/UniHero_news"
            target="_blank"
            rel="noopener noreferrer"
            className="uh-btn uh-btn-primary"
          >
            Join the Community
          </a>
          <Link href="/about" className="uh-btn uh-btn-secondary">
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
}
