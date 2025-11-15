// pages/index.tsx
import Link from 'next/link';
import TimelineSlider from '../components/TimelineSlider';
import WhyUniHero from '../components/WhyUniHero';
import MotivationQuotes from '../components/MotivationQuotes';
import StudyPodcasts from '../components/StudyPodcasts';
import ContactForm from '../components/ContactForm';
import { useState } from 'react';

type ResourceKind =
  | 'assignments'
  | 'exam'
  | 'motivation'
  | 'guides'
  | 'hub'
  | 'podcasts'
  | null;

export default function LandingPage() {
  const [open, setOpen] = useState<ResourceKind>(null);

  return (
    <div className="uh-page">
      {/* HOME */}
      <section id="home">
        <div className="uh-hero-card">
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
            <a href="#about" className="uh-btn uh-btn-secondary">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT + TIMELINE */}
      <section id="about">
  <h2 className="uh-section-title">Our story</h2>
  <p className="uh-section-sub">
    A small student-run project that turned into a study companion for
    hundreds of learners.
  </p>
  <TimelineSlider />
</section>


      {/* WHY UNI HERO */}
      <section>
        <WhyUniHero />
      </section>

      {/* RESOURCES */}
      <section id="resources">
        <h2 className="uh-section-title">Resources</h2>
        <p className="uh-section-sub">
          All your UniHero tools in one place: assignments, exam prep,
          motivation, study guides and more.
        </p>

        <div className="uh-resource-layout">
          <div className="uh-resource-column">
            <button
              className="uh-resource-pill"
              onClick={() => setOpen('assignments')}
            >
              <span>Assignments</span>
              <span>📂</span>
            </button>
            <button
              className="uh-resource-pill"
              onClick={() => setOpen('motivation')}
            >
              <span>Motivation</span>
              <span>🚀</span>
            </button>
            <button
              className="uh-resource-pill"
              onClick={() => setOpen('hub')}
            >
              <span>UniHero Hub</span>
              <span>📨</span>
            </button>
          </div>

          <div className="uh-resource-center">
            <div className="uh-resource-logo-circle">U</div>
          </div>

          <div className="uh-resource-column">
            <button
              className="uh-resource-pill"
              onClick={() => setOpen('exam')}
            >
              <span>Exam Prep</span>
              <span>📝</span>
            </button>
            <button
              className="uh-resource-pill"
              onClick={() => setOpen('guides')}
            >
              <span>Study Guides</span>
              <span>📖</span>
            </button>
            <button
              className="uh-resource-pill"
              onClick={() => setOpen('podcasts')}
            >
              <span>Study Podcasts</span>
              <span>🎧</span>
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <h2 className="uh-section-title">Contact</h2>
        <p className="uh-section-sub">
          Leave your full name, Telegram user and comment — we&apos;ll receive
          it directly in our UniHero bot.
        </p>

        <div className="uh-contact-grid">
          <div className="uh-contact-logo">
            {/* bu yerga 3D logo png qo'yasiz: /public/images/unihero-3d.png */}
            <img src="/images/unihero-3d.png" alt="UniHero" />
          </div>
          <ContactForm />
        </div>
      </section>

      {/* RESOURCES MODAL */}
      {open && (
        <div className="uh-modal-overlay" onClick={() => setOpen(null)}>
          <div
            className="uh-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="uh-modal-close" onClick={() => setOpen(null)}>
              ×
            </div>

            {open === 'assignments' && (
              <>
                <h2 className="uh-modal-title">Assignments</h2>
                <p className="uh-modal-text">
                  Order custom assignments and help directly via UniHero Bot.
                </p>
                <div className="uh-modal-buttons">
                  <a
                    href="https://t.me/UniHero_BOT?start=assignments"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="uh-btn uh-btn-primary"
                  >
                    Order
                  </a>
                </div>
              </>
            )}

            {open === 'exam' && (
              <>
                <h2 className="uh-modal-title">Exam Prep</h2>
                <p className="uh-modal-text">
                  You can find all resources from our bot – join us on Telegram
                  and get exam-focused materials.
                </p>
                <div className="uh-modal-buttons">
                  <a
                    href="https://t.me/UniHero_BOT?start=examprep"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="uh-btn uh-btn-primary"
                  >
                    Join!
                  </a>
                </div>
              </>
            )}

            {open === 'motivation' && (
              <>
                <h2 className="uh-modal-title">Motivation</h2>
                <MotivationQuotes />
              </>
            )}

            {open === 'guides' && (
              <>
                <h2 className="uh-modal-title">Study Guides</h2>
                <p className="uh-modal-text">
                  Get university study guides, syllabi and key exam outlines.
                </p>
                <div className="uh-modal-buttons">
                  {/* bu yerga haqiqiy link qo'yasan */}
                  <a
                    href="https://example.com/study-guides"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="uh-btn uh-btn-primary"
                  >
                    Download
                  </a>
                </div>
              </>
            )}

            {open === 'hub' && (
              <>
                <h2 className="uh-modal-title">UniHero Hub</h2>
                <p className="uh-modal-text">
                  Connect with UniHero through our channels and bot.
                </p>
                <div className="uh-modal-buttons">
                  <a
                    href="https://t.me/UniHero_news"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="uh-btn uh-btn-secondary"
                  >
                    📣 UniHero_News
                  </a>
                  <a
                    href="https://t.me/UniHero_BOT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="uh-btn uh-btn-secondary"
                  >
                    🤖 UniHero BOT
                  </a>
                  <a
                    href="https://t.me/Unihero_admin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="uh-btn uh-btn-secondary"
                  >
                    👨🏻‍💻 Admin
                  </a>
                </div>
              </>
            )}

            {open === 'podcasts' && (
              <>
                <h2 className="uh-modal-title">Study Podcasts</h2>
                <StudyPodcasts />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
