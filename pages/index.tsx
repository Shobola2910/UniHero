// pages/index.tsx
import Head from "next/head";
import React, { useEffect, useState } from "react";

interface TimelineItem {
  emoji: string;
  date: string;
  title: string;
  img: string;
}

type ResourceKey =
  | "assignments"
  | "examPrep"
  | "motivation"
  | "studyGuides"
  | "uniheroHub"
  | "studyPodcasts";

interface MotivationQuote {
  text: string;
  author: string;
}

const TELEGRAM_NEWS = "https://t.me/UniHero_news";
const TELEGRAM_BOT = "https://t.me/UniHero_BOT";
const TELEGRAM_ADMIN = "https://t.me/Unihero_admin";

// Agar keyin linklar o'zgarsa, faqat shu joydan almashtirasiz
const STUDY_GUIDES_LINK = TELEGRAM_BOT;

const MOTIVATION_QUOTES: MotivationQuote[] = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "It always seems impossible until it’s done.", author: "Nelson Mandela" },
  { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
  { text: "You don’t have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Your future is created by what you do today, not tomorrow.", author: "Robert Kiyosaki" },
  { text: "Small progress is still progress. Keep going.", author: "Unknown" },
  { text: "Dream big. Start small. Act now.", author: "Robin Sharma" },
];

const PODCAST_LINKS: string[] = [
  "https://www.youtube.com/c/aliabdaal",
  "https://www.youtube.com/c/ThomasFrank",
  "https://www.youtube.com/c/MattDAvella",
  "https://www.youtube.com/c/timferriss",
  "https://www.youtube.com/playlist?list=PLEITKg6BYjonkVKAPYaHMMa4-4ZU-EEYs",
  "https://www.youtube.com/c/HurrySlowly",
  "https://www.youtube.com/c/MarieForleo",
  "https://www.youtube.com/playlist?list=PL27GCkYOrUzvoENAkd1MfXG2NnkdbIJMq",
  "https://www.youtube.com/c/CalNewportDeepQuestions",
  "https://www.youtube.com/c/BeforeBreakfast",
];

const RESOURCE_EMOJI: Record<ResourceKey, string> = {
  assignments: "📑",
  examPrep: "📝",
  motivation: "🚀",
  studyGuides: "📖",
  uniheroHub: "📨",
  studyPodcasts: "🎧",
};

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

  /* ========= RESOURCES MODAL STATE ========= */

  const [activeResource, setActiveResource] = useState<ResourceKey | null>(null);
  const [motivationIndex, setMotivationIndex] = useState<number | null>(null);
  const [podcastUrl, setPodcastUrl] = useState<string | null>(null);

  const openResource = (key: ResourceKey) => {
    if (key === "motivation") {
      const idx = Math.floor(Math.random() * MOTIVATION_QUOTES.length);
      setMotivationIndex(idx);
    }
    if (key === "studyPodcasts") {
      const idx = Math.floor(Math.random() * PODCAST_LINKS.length);
      setPodcastUrl(PODCAST_LINKS[idx]);
    }
    setActiveResource(key);
  };

  const closeResource = () => {
    setActiveResource(null);
  };

  const currentQuote =
    motivationIndex !== null
      ? MOTIVATION_QUOTES[motivationIndex]
      : MOTIVATION_QUOTES[0];

  const currentPodcastUrl = podcastUrl ?? PODCAST_LINKS[0];

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
                  href={TELEGRAM_NEWS}
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
                <button
                  type="button"
                  className="uh-resource-pill"
                  onClick={() => openResource("assignments")}
                >
                  <span className="uh-resource-label">Assignments</span>
                  <span className="uh-resource-emoji">📑</span>
                </button>
                <button
                  type="button"
                  className="uh-resource-pill"
                  onClick={() => openResource("motivation")}
                >
                  <span className="uh-resource-label">Motivation</span>
                  <span className="uh-resource-emoji">🚀</span>
                </button>
                <button
                  type="button"
                  className="uh-resource-pill"
                  onClick={() => openResource("uniheroHub")}
                >
                  <span className="uh-resource-label">UniHero Hub</span>
                  <span className="uh-resource-emoji">📨</span>
                </button>
              </div>

              {/* Markazdagi logo */}
              <div className="uh-resources-center">
                <div className="uh-resources-logo-circle">
                  <img
                    src="/images/unihero-center.png"
                    alt="UniHero"
                    className="uh-resources-logo"
                  />
                </div>
              </div>

              {/* O‘ng tomondagi 3 ta pill */}
              <div className="uh-resources-col">
                <button
                  type="button"
                  className="uh-resource-pill"
                  onClick={() => openResource("examPrep")}
                >
                  <span className="uh-resource-label">Exam Prep</span>
                  <span className="uh-resource-emoji">📝</span>
                </button>
                <button
                  type="button"
                  className="uh-resource-pill"
                  onClick={() => openResource("studyGuides")}
                >
                  <span className="uh-resource-label">Study Guides</span>
                  <span className="uh-resource-emoji">📖</span>
                </button>
                <button
                  type="button"
                  className="uh-resource-pill"
                  onClick={() => openResource("studyPodcasts")}
                >
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
                href={TELEGRAM_NEWS}
                target="_blank"
                rel="noreferrer"
                className="uh-chip"
              >
                📣 UniHero_News
              </a>
              <a
                href={TELEGRAM_BOT}
                target="_blank"
                rel="noreferrer"
                className="uh-chip"
              >
                🤖 UniHero BOT
              </a>
              <a
                href={TELEGRAM_ADMIN}
                target="_blank"
                rel="noreferrer"
                className="uh-chip"
              >
                👨🏻‍💻 Admin
              </a>
            </div>
          </section>
        </main>

        {/* ===== RESOURCES MODAL OVERLAY ===== */}
        {activeResource && (
          <div className="uh-modal-backdrop" onClick={closeResource}>
            <div
              className="uh-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="uh-modal-close"
                onClick={closeResource}
                aria-label="Close"
              >
                ×
              </button>

              <div className="uh-modal-icon-badge">
                {RESOURCE_EMOJI[activeResource]}
              </div>

              {activeResource === "assignments" && (
                <>
                  <h3 className="uh-modal-title">Assignments</h3>
                  <p className="uh-modal-body">
                    Need help with your university assignments? Place your
                    order directly via UniHero bot.
                  </p>
                  <a
                    href={TELEGRAM_BOT}
                    target="_blank"
                    rel="noreferrer"
                    className="uh-modal-btn"
                  >
                    Order
                  </a>
                </>
              )}

              {activeResource === "examPrep" && (
                <>
                  <h3 className="uh-modal-title">Exam Prep</h3>
                  <p className="uh-modal-body">
                    You can find all exam preparation resources in our UniHero
                    bot: past papers, tips, plans and more.
                  </p>
                  <a
                    href={TELEGRAM_BOT}
                    target="_blank"
                    rel="noreferrer"
                    className="uh-modal-btn"
                  >
                    Join!
                  </a>
                </>
              )}

              {activeResource === "motivation" && (
                <>
                  <h3 className="uh-modal-title">Motivation</h3>
                  <p className="uh-modal-quote">
                    “{currentQuote.text}”
                  </p>
                  <p className="uh-modal-quote-author">
                    — {currentQuote.author}
                  </p>
                  <button
                    type="button"
                    className="uh-secondary-btn uh-modal-secondary"
                    onClick={() => {
                      const idx = Math.floor(
                        Math.random() * MOTIVATION_QUOTES.length
                      );
                      setMotivationIndex(idx);
                    }}
                  >
                    Another quote
                  </button>
                </>
              )}

              {activeResource === "studyGuides" && (
                <>
                  <h3 className="uh-modal-title">Study Guides</h3>
                  <p className="uh-modal-body">
                    Get structured study guides and materials for your
                    university subjects.
                  </p>
                  <a
                    href={STUDY_GUIDES_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="uh-modal-btn"
                  >
                    Download
                  </a>
                </>
              )}

              {activeResource === "uniheroHub" && (
                <>
                  <h3 className="uh-modal-title">UniHero Hub</h3>
                  <p className="uh-modal-body">
                    Connect with the UniHero community: channel, bot and
                    direct contact with admin.
                  </p>
                  <div className="uh-modal-links-row">
                    <a
                      href={TELEGRAM_NEWS}
                      target="_blank"
                      rel="noreferrer"
                      className="uh-modal-chip"
                    >
                      📣 UniHero_News
                    </a>
                    <a
                      href={TELEGRAM_BOT}
                      target="_blank"
                      rel="noreferrer"
                      className="uh-modal-chip"
                    >
                      🤖 UniHero BOT
                    </a>
                    <a
                      href={TELEGRAM_ADMIN}
                      target="_blank"
                      rel="noreferrer"
                      className="uh-modal-chip"
                    >
                      👨🏻‍💻 Admin
                    </a>
                  </div>
                </>
              )}

              {activeResource === "studyPodcasts" && (
                <>
                  <h3 className="uh-modal-title">Study Podcasts</h3>
                  <p className="uh-modal-body">
                    We collected focused productivity & study channels for you.
                    We&apos;ll open a random one to start learning.
                  </p>
                  <a
                    href={currentPodcastUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="uh-modal-btn"
                  >
                    Start learn
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
