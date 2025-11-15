// pages/index.tsx
import Head from "next/head";
import React, { useEffect, useState } from "react";

interface TimelineItem {
  emoji: string;
  date: string;
  title: string;
  img: string;
}

const timelineItems: TimelineItem[] = [
  {
    emoji: "🤖",
    date: "2024 · Dec",
    title: "UniHero Bot created",
    img: "/images/timeline/unihero-bot-created.png",
  },
  {
    emoji: "🧑‍🤝‍🧑",
    date: "2024 · Oct",
    title: "2 anonym founders",
    img: "/images/timeline/anonym-founders.png",
  },
  {
    emoji: "🧠",
    date: "2025 · Mar",
    title: "Focused more on AI detectors and others",
    img: "/images/timeline/ai-detectors.png",
  },
  {
    emoji: "🎉",
    date: "2025 · May",
    title: "180+ Students success",
    img: "/images/timeline/students-success.png",
  },
  {
    emoji: "📥",
    date: "2025 · June",
    title: "UniHero Bot 200+ users",
    img: "/images/timeline/bot-200-users.png",
  },
];

export default function HomePage() {
  const [activeTimeline, setActiveTimeline] = useState<number>(1);

  // 7 sekundda bir timeline slayderi aylanib turadi
  useEffect(() => {
    const id = setInterval(() => {
      setActiveTimeline((prev) => (prev + 1) % timelineItems.length);
    }, 7000);

    return () => clearInterval(id);
  }, []);

  // Contact form
  const [fullName, setFullName] = useState("");
  const [telegramUser, setTelegramUser] = useState("");
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !telegramUser || !comment) {
      alert("Please fill in all fields 🙂");
      return;
    }

    try {
      setSending(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, telegramUser, comment }),
      });

      if (!res.ok) {
        throw new Error("Server Error❗️");
      }

      setFullName("");
      setTelegramUser("");
      setComment("");
      alert("Your message has been sent successfully! ✅");
    } catch (err) {
      console.error(err);
      alert("There was an error sending the message. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  // Timeline kartalarining classini hisoblash (chap / o‘rta / o‘ng / yashirin)
  const getTimelineItemClass = (index: number) => {
    if (index === activeTimeline) {
      return "uh-timeline-item uh-timeline-item--center";
    }

    const prev =
      (activeTimeline - 1 + timelineItems.length) % timelineItems.length;
    const next = (activeTimeline + 1) % timelineItems.length;

    if (index === prev) {
      return "uh-timeline-item uh-timeline-item--left";
    }
    if (index === next) {
      return "uh-timeline-item uh-timeline-item--right";
    }

    // qolgan 2 ta slayd ko‘rinmasin
    return "uh-timeline-item uh-timeline-item--hidden";
  };

  return (
    <>
      <Head>
        <title>UniHero — For Students, By Students</title>
        <meta
          name="description"
          content="Practical resources, a helpful community, and simple tools for university students."
        />
      </Head>

      <div className="uh-page">
        {/* NAVBAR */}
        <header className="uh-navbar">
          <div className="uh-navbar-inner">
            <div className="uh-logo-wrap">
              <img
                src="/images/unihero-logo-full.png"
                alt="UniHero logo"
                className="uh-logo-img"
              />
            </div>

            <nav className="uh-nav-links">
              <a href="#hero" className="uh-nav-pill">
                <span className="uh-nav-icon">🏠</span>
                <span>HOME</span>
              </a>
              <a href="#about" className="uh-nav-pill">
                <span className="uh-nav-icon">💬</span>
                <span>ABOUT</span>
              </a>
              <a href="#resources" className="uh-nav-pill">
                <span className="uh-nav-icon">📚</span>
                <span>RESOURCE</span>
              </a>
              <a href="#contact" className="uh-nav-pill">
                <span className="uh-nav-icon">📞</span>
                <span>CONTACT</span>
              </a>
            </nav>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="uh-main">
          {/* HERO */}
          <section id="hero" className="uh-hero-section">
            <div className="uh-hero-card">
              <div className="uh-pill">
                <span>✨</span>
                <span>For Students, By Students</span>
              </div>

              <h1 className="uh-hero-title">
                UniHero — For Students, By Students
              </h1>

              <p className="uh-hero-text">
                Practical resources, a helpful community, and simple tools. Learn
                smarter with study guides, templates and quick support.
              </p>

              <div className="uh-hero-actions">
                <a
                  href="https://t.me/UniHero_news"
                  target="_blank"
                  rel="noreferrer"
                  className="uh-primary-btn"
                >
                  Join the Community
                </a>
                <a href="#about" className="uh-secondary-btn">
                  Learn More
                </a>
              </div>
            </div>
          </section>

          {/* ABOUT / TIMELINE */}
          <section id="about" className="uh-section">
            <div className="uh-section-header">
              <h2>Our story</h2>
              <p>
                A small student-run project that turned into a study companion
                for hundreds of learners.
              </p>
            </div>

            {/* TIMELINE */}
            <div className="uh-timeline">
              <div className="uh-timeline-items-row">
                {timelineItems.map((item, idx) => (
                  <div
                    key={item.title}
                    className={getTimelineItemClass(idx)}
                    onClick={() => setActiveTimeline(idx)}
                  >
                    <div className="uh-timeline-card">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="uh-timeline-img"
                      />
                    </div>

                    <div className="uh-timeline-meta">
                      <div className="uh-timeline-line" />
                      <div className="uh-timeline-meta-title">
                        <span className="uh-timeline-meta-emoji">
                          {item.emoji}
                        </span>
                        <span>{item.title}</span>
                      </div>
                      <div className="uh-timeline-meta-date">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WHY STUDENTS LOVE */}
            <div className="uh-section uh-section-header--spaced">
              <div className="uh-section-header">
                <h2>Why students love UniHero</h2>
                <p>Built around clarity, speed and a friendly vibe.</p>
              </div>

              <div className="uh-benefits-grid">
                <div className="uh-benefit-card">
                  <div className="uh-benefit-icon">📘</div>
                  <h3>Clear guidance</h3>
                  <p>No fluff — short, practical and exam-aligned.</p>
                </div>
                <div className="uh-benefit-card">
                  <div className="uh-benefit-icon">🧠</div>
                  <h3>Smart tools</h3>
                  <p>Templates, checklists and quick planners.</p>
                </div>
                <div className="uh-benefit-card">
                  <div className="uh-benefit-icon">⚡</div>
                  <h3>Fast help</h3>
                  <p>Ask on Telegram, get answers in minutes.</p>
                </div>
                <div className="uh-benefit-card">
                  <div className="uh-benefit-icon">🎯</div>
                  <h3>Student-first</h3>
                  <p>Built by and for learners — friendly and simple.</p>
                </div>
                <div className="uh-benefit-card">
                  <div className="uh-benefit-icon">⏰</div>
                  <h3>24/7</h3>
                  <p>Support availability when you need it.</p>
                </div>
              </div>
            </div>
          </section>

          {/* RESOURCES */}
          <section id="resources" className="uh-section">
            <div className="uh-section-header">
              <h2>Resources</h2>
              <p>
                All your UniHero tools in one place: assignments, exam prep,
                motivation, study guides and more.
              </p>
            </div>

            <div className="uh-resources">
              {/* Chap tomondagi 3 ta pill */}
              <div className="uh-resources-col">
                <button type="button" className="uh-resource-pill">
                  <span className="uh-resource-label">Assignments</span>
                  <span className="uh-resource-emoji">📑</span>
                </button>
                <button type="button" className="uh-resource-pill">
                  <span className="uh-resource-label">Motivation</span>
                  <span className="uh-resource-emoji">🚀</span>
                </button>
                <button type="button" className="uh-resource-pill">
                  <span className="uh-resource-label">UniHero Hub</span>
                  <span className="uh-resource-emoji">📨</span>
                </button>
              </div>

              {/* Markazdagi logo */}
              <div className="uh-resources-center">
                <div className="uh-resources-logo-circle">
                  {/* 3-rasmni /public/images/unihero-mark.png nomi bilan qo‘yib ishlatsang bo‘ladi */}
                  <img
                    src="/images/unihero-mark.png"
                    alt="UniHero"
                    className="uh-resources-logo"
                  />
                </div>
              </div>

              {/* O‘ng tomondagi 3 ta pill */}
              <div className="uh-resources-col">
                <button type="button" className="uh-resource-pill">
                  <span className="uh-resource-label">Exam Prep</span>
                  <span className="uh-resource-emoji">📝</span>
                </button>
                <button type="button" className="uh-resource-pill">
                  <span className="uh-resource-label">Study Guides</span>
                  <span className="uh-resource-emoji">📖</span>
                </button>
                <button type="button" className="uh-resource-pill">
                  <span className="uh-resource-label">Study Podcasts</span>
                  <span className="uh-resource-emoji">🎧</span>
                </button>
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="uh-section">
            <div className="uh-section-header">
              <h2>Contact</h2>
              <p>
                Have a question or want to leave a comment? Write to us and it
                will be forwarded to the UniHero Telegram bot.
              </p>
            </div>

            <form className="uh-contact-form" onSubmit={handleContactSubmit}>
              <div className="uh-contact-row">
                <input
                  className="uh-input"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <input
                  className="uh-input"
                  placeholder="Telegram Username"
                  value={telegramUser}
                  onChange={(e) => setTelegramUser(e.target.value)}
                />
              </div>
              <textarea
                className="uh-textarea"
                placeholder="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="submit"
                className="uh-primary-btn uh-contact-submit"
                disabled={sending}
              >
                {sending ? "Sending..." : "Submit"}
              </button>
            </form>

            <div className="uh-contact-links">
              <a
                href="https://t.me/UniHero_news"
                target="_blank"
                rel="noreferrer"
                className="uh-chip"
              >
                📣 UniHero_News
              </a>
              <a
                href="https://t.me/UniHero_BOT"
                target="_blank"
                rel="noreferrer"
                className="uh-chip"
              >
                🤖 UniHero BOT
              </a>
              <a
                href="https://t.me/Unihero_admin"
                target="_blank"
                rel="noreferrer"
                className="uh-chip"
              >
                👨🏻‍💻 Admin
              </a>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
