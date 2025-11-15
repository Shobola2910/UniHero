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
  | "uniHeroHub"
  | "studyPodcasts";

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

/**
 * Motivation generator – kombinatsiyalar soni:
 * openers * actions * endings = 10 * 10 * 10 = 1000+ turli gap chiqadi
 */

const QUOTE_OPENERS: string[] = [
  "Today is a good day to",
  "UniHero reminder:",
  "Tiny steps every day will",
  "Future you will thank you if you",
  "Even 20 minutes of focus can",
  "Hard days are the best time to",
  "You don’t need to be perfect to",
  "Right now is the perfect moment to",
  "If you want calmer exams, start to",
  "You’re closer than you think if you",
];

const QUOTE_ACTIONS: string[] = [
  "open the book and start.",
  "review your notes once more.",
  "turn off distractions and focus.",
  "rewrite one messy paragraph.",
  "solve just one extra problem.",
  "summarise what you learned in five sentences.",
  "teach a friend what you studied.",
  "plan tomorrow’s tasks in three bullets.",
  "watch a short explainer instead of scrolling.",
  "ask one honest question you’ve been avoiding.",
];

const QUOTE_ENDINGS: string[] = [
  "Your effort compounds faster than you imagine.",
  "Consistency beats last-minute panic every time.",
  "Smart, calm work today becomes freedom tomorrow.",
  "Progress is a decision, not a feeling.",
  "Even 1% better every day is huge in a semester.",
  "You are building skills, not just chasing grades.",
  "Rest is allowed; giving up isn’t.",
  "Your current situation is not your final destination.",
  "Future you is quietly cheering for you right now.",
  "Small focused sessions beat long distracted ones.",
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

export default function HomePage() {
  const [activeTimeline, setActiveTimeline] = useState<number>(1);

  const [activeResource, setActiveResource] = useState<ResourceKey | null>(null);
  const [motivationQuote, setMotivationQuote] = useState<string>("");

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

  /* ====== TIMELINE HELPERS ====== */

  const goPrevTimeline = () => {
    setActiveTimeline(
      (prev) => (prev - 1 + timelineItems.length) % timelineItems.length
    );
  };

  const goNextTimeline = () => {
    setActiveTimeline((prev) => (prev + 1) % timelineItems.length);
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

  /* ====== RESOURCES HELPERS ====== */

  const pickRandomQuote = () => {
    const opener =
      QUOTE_OPENERS[Math.floor(Math.random() * QUOTE_OPENERS.length)];
    const action =
      QUOTE_ACTIONS[Math.floor(Math.random() * QUOTE_ACTIONS.length)];
    const ending =
      QUOTE_ENDINGS[Math.floor(Math.random() * QUOTE_ENDINGS.length)];

    return `${opener} ${action} ${ending}`;
  };

  const openUrl = (url: string) => {
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const openRandomPodcast = () => {
    const i = Math.floor(Math.random() * PODCAST_LINKS.length);
    openUrl(PODCAST_LINKS[i]);
  };

  const openResource = (key: ResourceKey) => {
    if (key === "motivation") {
      setMotivationQuote(pickRandomQuote());
    }
    setActiveResource(key);
  };

  const closeResourceModal = () => setActiveResource(null);

  const renderSimpleResourceModal = (
    title: string,
    emoji: string,
    body: React.ReactNode,
    ctaLabel?: string,
    ctaOnClick?: () => void
  ) => (
    <div
      className="uh-resources-modal-backdrop"
      onClick={closeResourceModal}
    >
      <div
        className="uh-resources-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="uh-resources-modal-close"
          onClick={closeResourceModal}
          aria-label="Close"
        >
          ✕
        </button>
        <div className="uh-resources-modal-title">
          <span>{title}</span>
          <span className="uh-resources-modal-emoji">{emoji}</span>
        </div>
        <div className="uh-resources-modal-body">{body}</div>
        {ctaLabel && ctaOnClick && (
          <button
            type="button"
            className="uh-primary-btn uh-resources-modal-primary"
            onClick={ctaOnClick}
          >
            {ctaLabel}
          </button>
        )}
      </div>
    </div>
  );

  const renderResourceModal = () => {
    if (!activeResource) return null;

    switch (activeResource) {
      case "assignments":
        return renderSimpleResourceModal(
          "Assignments",
          "📑",
          <p className="uh-resources-modal-text">
            Need help with assignments? You can place an order via the UniHero
            BOT and get support from our team.
          </p>,
          "Order",
          () => openUrl("https://t.me/UniHero_BOT")
        );

      case "examPrep":
        return renderSimpleResourceModal(
          "Exam Prep",
          "📝",
          <p className="uh-resources-modal-text">
            You can find all exam prep resources in our UniHero BOT – summaries,
            tips and practice questions. Join and get ready smarter.
          </p>,
          "Join",
          () => openUrl("https://t.me/UniHero_BOT")
        );

      case "motivation":
        return (
          <div
            className="uh-resources-modal-backdrop"
            onClick={closeResourceModal}
          >
            <div
              className="uh-resources-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="uh-resources-modal-close"
                onClick={closeResourceModal}
                aria-label="Close"
              >
                ✕
              </button>
              <div className="uh-resources-modal-title">
                <span>Motivation</span>
                <span className="uh-resources-modal-emoji">🚀</span>
              </div>

              <div className="uh-resources-quote-card">
                <div className="uh-resources-quote-marks">“”</div>
                <p className="uh-resources-quote-text">{motivationQuote}</p>
              </div>

              <button
                type="button"
                className="uh-primary-btn uh-resources-modal-primary"
                onClick={() => setMotivationQuote(pickRandomQuote())}
              >
                Another quote
              </button>
            </div>
          </div>
        );

      case "studyGuides":
        return renderSimpleResourceModal(
          "Study Guides",
          "📖",
          <p className="uh-resources-modal-text">
            Get UniHero study guides, checklists and templates for university
            courses. We&apos;ll send the link via UniHero BOT.
          </p>,
          "Download",
          () => openUrl("https://t.me/UniHero_BOT")
        );

      case "uniHeroHub":
        return (
          <div
            className="uh-resources-modal-backdrop"
            onClick={closeResourceModal}
          >
            <div
              className="uh-resources-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="uh-resources-modal-close"
                onClick={closeResourceModal}
                aria-label="Close"
              >
                ✕
              </button>
              <div className="uh-resources-modal-title">
                <span>UniHero Hub</span>
                <span className="uh-resources-modal-emoji">📨</span>
              </div>
              <p className="uh-resources-modal-text">
                Connect with our community, bot and admin directly from UniHero
                Hub.
              </p>

              <div className="uh-resources-hub-links">
                <a
                  href="https://t.me/UniHero_news"
                  target="_blank"
                  rel="noreferrer"
                  className="uh-resources-hub-chip"
                >
                  📣 UniHero_News
                </a>
                <a
                  href="https://t.me/UniHero_BOT"
                  target="_blank"
                  rel="noreferrer"
                  className="uh-resources-hub-chip"
                >
                  🤖 UniHero BOT
                </a>
                <a
                  href="https://t.me/Unihero_admin"
                  target="_blank"
                  rel="noreferrer"
                  className="uh-resources-hub-chip"
                >
                  👨🏻‍💻 Admin
                </a>
              </div>
            </div>
          </div>
        );

      case "studyPodcasts":
        return (
          <div
            className="uh-resources-modal-backdrop"
            onClick={closeResourceModal}
          >
            <div
              className="uh-resources-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="uh-resources-modal-close"
                onClick={closeResourceModal}
                aria-label="Close"
              >
                ✕
              </button>
              <div className="uh-resources-modal-title">
                <span>Study Podcasts</span>
                <span className="uh-resources-modal-emoji">🎧</span>
              </div>
              <p className="uh-resources-modal-text">
                Boost your productivity with curated study podcasts and YouTube
                channels. We&apos;ll open a random channel for you.
              </p>

              <div className="uh-resources-youtube-icon">▶</div>

              <button
                type="button"
                className="uh-primary-btn uh-resources-modal-primary"
                onClick={openRandomPodcast}
              >
                Start learn
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
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
              {/* Chap strelka */}
              <button
                type="button"
                className="uh-timeline-arrow uh-timeline-arrow--left"
                onClick={goPrevTimeline}
                aria-label="Previous story"
              >
                ‹
              </button>

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

              {/* O‘ng strelka */}
              <button
                type="button"
                className="uh-timeline-arrow uh-timeline-arrow--right"
                onClick={goNextTimeline}
                aria-label="Next story"
              >
                ›
              </button>
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
                  className={
                    activeResource === "assignments"
                      ? "uh-resource-pill uh-resource-pill--active"
                      : "uh-resource-pill"
                  }
                  onClick={() => openResource("assignments")}
                >
                  <span className="uh-resource-label">Assignments</span>
                  <span className="uh-resource-emoji">📑</span>
                </button>

                <button
                  type="button"
                  className={
                    activeResource === "motivation"
                      ? "uh-resource-pill uh-resource-pill--active"
                      : "uh-resource-pill"
                  }
                  onClick={() => openResource("motivation")}
                >
                  <span className="uh-resource-label">Motivation</span>
                  <span className="uh-resource-emoji">🚀</span>
                </button>

                <button
                  type="button"
                  className={
                    activeResource === "uniHeroHub"
                      ? "uh-resource-pill uh-resource-pill--active"
                      : "uh-resource-pill"
                  }
                  onClick={() => openResource("uniHeroHub")}
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
                  className={
                    activeResource === "examPrep"
                      ? "uh-resource-pill uh-resource-pill--active"
                      : "uh-resource-pill"
                  }
                  onClick={() => openResource("examPrep")}
                >
                  <span className="uh-resource-label">Exam Prep</span>
                  <span className="uh-resource-emoji">📝</span>
                </button>

                <button
                  type="button"
                  className={
                    activeResource === "studyGuides"
                      ? "uh-resource-pill uh-resource-pill--active"
                      : "uh-resource-pill"
                  }
                  onClick={() => openResource("studyGuides")}
                >
                  <span className="uh-resource-label">Study Guides</span>
                  <span className="uh-resource-emoji">📖</span>
                </button>

                <button
                  type="button"
                  className={
                    activeResource === "studyPodcasts"
                      ? "uh-resource-pill uh-resource-pill--active"
                      : "uh-resource-pill"
                  }
                  onClick={() => openResource("studyPodcasts")}
                >
                  <span className="uh-resource-label">Study Podcasts</span>
                  <span className="uh-resource-emoji">🎧</span>
                </button>
              </div>
            </div>

            {/* Modal (overlay) */}
            {renderResourceModal()}
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

            <div className="uh-contact-layout">
              {/* Chap – katta logo card */}
              <div className="uh-contact-left">
                <div className="uh-contact-logo-card">
                  <img
                    src="/images/contact/unihero-contact-main.png" // 3-rasmni shu nom bilan saqla
                    alt="UniHero contact"
                    className="uh-contact-logo-img"
                  />
                </div>
              </div>

              {/* O'ng – avatar + forma */}
              <div className="uh-contact-right">
                <div className="uh-contact-avatar">
                  <div className="uh-contact-avatar-circle">
                    <img
                      src="/images/unihero-center.png"
                      alt="UniHero"
                      className="uh-contact-avatar-img"
                    />
                  </div>
                </div>

                <form
                  className="uh-contact-form"
                  onSubmit={handleContactSubmit}
                >
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
              </div>
            </div>

            {/* Pastdagi chiplar */}
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
