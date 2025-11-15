// pages/index.tsx
import Head from "next/head";
import { useEffect, useState } from "react";

type TimelineItem = {
  emoji: string;
  date: string;
  title: string;
  img: string;
};

type ResourceKey =
  | "assignments"
  | "examPrep"
  | "motivation"
  | "studyGuides"
  | "hub"
  | "podcasts"
  | null;

const TIMELINE_ITEMS: TimelineItem[] = [
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
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(1);
  const [selectedResource, setSelectedResource] = useState<ResourceKey>(null);
  const [showGate, setShowGate] = useState(true);

  const [fullName, setFullName] = useState("");
  const [telegramUser, setTelegramUser] = useState("");
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "ok" | "error">("idle");

  // Timeline auto-slide (har 7 sekundda)
  useEffect(() => {
    const id = setInterval(() => {
      setActiveTimelineIndex((prev) => (prev + 1) % TIMELINE_ITEMS.length);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, telegramUser, comment }),
      });

      if (!res.ok) throw new Error("Request failed");

      setSendStatus("ok");
      setFullName("");
      setTelegramUser("");
      setComment("");
    } catch (err) {
      console.error(err);
      setSendStatus("error");
    } finally {
      setSending(false);
    }
  };

  const currentTimeline = TIMELINE_ITEMS[activeTimelineIndex];

  const randomPodcast =
    PODCAST_LINKS[Math.floor(Math.random() * PODCAST_LINKS.length)];

  return (
    <>
      <Head>
        <title>UniHero — For Students, By Students</title>
        <meta
          name="description"
          content="Practical resources, study guides, motivation and quick support for university students."
        />
      </Head>

      <div className="uh-page" id="home">
        {/* GATE MODAL — kanalga join qilish talabi */}
        {showGate && (
          <div className="uh-gate-backdrop">
            <div className="uh-gate-card">
              <div className="uh-gate-logo">U</div>
              <h2>Welcome to UniHero 👋</h2>
              <p>
                Avval{" "}
                <a
                  href="https://t.me/UniHero_news"
                  target="_blank"
                  rel="noreferrer"
                  className="uh-link"
                >
                  📣 UniHero_news
                </a>{" "}
                kanaliga qo‘shiling. Shundan keyin saytni to‘liq ishlatishingiz
                mumkin bo‘ladi.
              </p>
              <button
                className="uh-primary-btn"
                onClick={() => setShowGate(false)}
              >
                I already joined ✅
              </button>
            </div>
          </div>
        )}

        {/* NAVBAR */}
        <header className="uh-navbar">
          <div className="uh-navbar-inner">
            <div className="uh-logo-wrap">
              <div className="uh-logo-circle">U</div>
              <span className="uh-logo-text">UniHero</span>
            </div>
            <nav className="uh-nav-links">
              <a href="#home" className="uh-nav-pill">
                <span className="uh-nav-icon">🏠</span> HOME
              </a>
              <a href="#about" className="uh-nav-pill">
                <span className="uh-nav-icon">💬</span> ABOUT
              </a>
              <a href="#resources" className="uh-nav-pill">
                <span className="uh-nav-icon">📚</span> RESOURCE
              </a>
              <a href="#contact" className="uh-nav-pill">
                <span className="uh-nav-icon">📞</span> CONTACT
              </a>
            </nav>
          </div>
        </header>

        <main className="uh-main">
          {/* HERO */}
          <section className="uh-hero-section">
            <div className="uh-hero-card">
              <div className="uh-pill">
                ✨ For Students, By Students
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
                  className="uh-primary-btn"
                  href="https://t.me/UniHero_news"
                  target="_blank"
                  rel="noreferrer"
                >
                  Join the Community
                </a>
                <a href="#about" className="uh-secondary-btn">
                  Learn More
                </a>
              </div>
            </div>
          </section>

          {/* ABOUT + TIMELINE */}
          <section className="uh-section" id="about">
            <div className="uh-section-header">
              <h2>Our story</h2>
              <p>
                A small student-run project that turned into a study companion
                for hundreds of learners.
              </p>
            </div>

            <div className="uh-timeline">
              <div className="uh-timeline-track" />

              <div className="uh-timeline-cards">
                {TIMELINE_ITEMS.map((item, index) => {
                  let position: "center" | "left" | "right" | "hidden" = "hidden";

                  const leftIndex =
                    (activeTimelineIndex - 1 + TIMELINE_ITEMS.length) %
                    TIMELINE_ITEMS.length;
                  const rightIndex =
                    (activeTimelineIndex + 1) % TIMELINE_ITEMS.length;

                  if (index === activeTimelineIndex) position = "center";
                  else if (index === leftIndex) position = "left";
                  else if (index === rightIndex) position = "right";

                  return (
                    <article
                      key={item.title}
                      className={`uh-timeline-card uh-timeline-card--${position}`}
                    >
                      <img
                        src={item.img}
                        alt={item.title}
                        className="uh-timeline-img"
                      />
                      <div className="uh-timeline-caption">
                        <div className="uh-timeline-emoji">{item.emoji}</div>
                        <div className="uh-timeline-title">{item.title}</div>
                        <div className="uh-timeline-date">{item.date}</div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="uh-timeline-dots">
                {TIMELINE_ITEMS.map((_, i) => (
                  <button
                    key={i}
                    className={
                      "uh-dot" +
                      (i === activeTimelineIndex ? " uh-dot--active" : "")
                    }
                    onClick={() => setActiveTimelineIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* WHY STUDENTS LOVE */}
            <div className="uh-section-header uh-section-header--spaced">
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
          </section>

          {/* RESOURCES */}
          <section className="uh-section" id="resources">
            <div className="uh-section-header">
              <h2>Resources</h2>
              <p>
                All your UniHero tools in one place: assignments, exam prep,
                motivation, study guides and more.
              </p>
            </div>

            <div className="uh-resources-layout">
              <div className="uh-resources-column">
                <button
                  className="uh-resource-pill"
                  onClick={() => setSelectedResource("assignments")}
                >
                  <span>Assignments</span>
                  <span className="uh-resource-emoji">📂</span>
                </button>
                <button
                  className="uh-resource-pill"
                  onClick={() => setSelectedResource("motivation")}
                >
                  <span>Motivation</span>
                  <span className="uh-resource-emoji">🚀</span>
                </button>
                <button
                  className="uh-resource-pill"
                  onClick={() => setSelectedResource("hub")}
                >
                  <span>UniHero Hub</span>
                  <span className="uh-resource-emoji">📣</span>
                </button>
              </div>

              <div className="uh-resources-center">
                <div className="uh-resources-logo-circle">U</div>
              </div>

              <div className="uh-resources-column">
                <button
                  className="uh-resource-pill"
                  onClick={() => setSelectedResource("examPrep")}
                >
                  <span>Exam Prep</span>
                  <span className="uh-resource-emoji">📝</span>
                </button>
                <button
                  className="uh-resource-pill"
                  onClick={() => setSelectedResource("studyGuides")}
                >
                  <span>Study Guides</span>
                  <span className="uh-resource-emoji">📖</span>
                </button>
                <button
                  className="uh-resource-pill"
                  onClick={() => setSelectedResource("podcasts")}
                >
                  <span>Study Podcasts</span>
                  <span className="uh-resource-emoji">🎧</span>
                </button>
              </div>
            </div>

            {/* RESOURCE MODALS */}
            {selectedResource && (
              <div
                className="uh-modal-backdrop"
                onClick={() => setSelectedResource(null)}
              >
                <div
                  className="uh-modal-card"
                  onClick={(e) => e.stopPropagation()}
                >
                  {selectedResource === "assignments" && (
                    <>
                      <h3>Assignments</h3>
                      <p>
                        Buyurtma qilish uchun UniHero bot orqali biz bilan
                        bog‘laning.
                      </p>
                      <a
                        href="https://t.me/UniHero_BOT?start=assignments"
                        target="_blank"
                        rel="noreferrer"
                        className="uh-primary-btn"
                      >
                        Order
                      </a>
                    </>
                  )}

                  {selectedResource === "examPrep" && (
                    <>
                      <h3>Exam Prep</h3>
                      <p>
                        Barcha exam materiallar va resurslarni UniHero bot orqali
                        olishingiz mumkin. Join qiling va start qiling.
                      </p>
                      <a
                        href="https://t.me/UniHero_BOT?start=examprep"
                        target="_blank"
                        rel="noreferrer"
                        className="uh-primary-btn"
                      >
                        Join!
                      </a>
                    </>
                  )}

                  {selectedResource === "motivation" && (
                    <>
                      <h3>Motivation</h3>
                      <p className="uh-quote">
                        “The only way to do great work is to love what you do.”
                      </p>
                      <p className="uh-quote-author">— Steve Jobs</p>
                      <button
                        className="uh-secondary-btn"
                        onClick={() => setSelectedResource(null)}
                      >
                        Close
                      </button>
                    </>
                  )}

                  {selectedResource === "studyGuides" && (
                    <>
                      <h3>Study Guides</h3>
                      <p>Universitet fanlari bo‘yicha study guide fayllar.</p>
                      <a
                        href="https://t.me/UniHero_news"
                        target="_blank"
                        rel="noreferrer"
                        className="uh-primary-btn"
                      >
                        Download
                      </a>
                    </>
                  )}

                  {selectedResource === "hub" && (
                    <>
                      <h3>UniHero Hub</h3>
                      <div className="uh-hub-links">
                        <a
                          className="uh-chip"
                          href="https://t.me/UniHero_news"
                          target="_blank"
                          rel="noreferrer"
                        >
                          📣 UniHero_News
                        </a>
                        <a
                          className="uh-chip"
                          href="https://t.me/UniHero_BOT"
                          target="_blank"
                          rel="noreferrer"
                        >
                          🤖 UniHero BOT
                        </a>
                        <a
                          className="uh-chip"
                          href="https://t.me/Unihero_admin"
                          target="_blank"
                          rel="noreferrer"
                        >
                          👨🏻‍💻 Admin
                        </a>
                      </div>
                      <button
                        className="uh-secondary-btn"
                        onClick={() => setSelectedResource(null)}
                      >
                        Close
                      </button>
                    </>
                  )}

                  {selectedResource === "podcasts" && (
                    <>
                      <h3>Study Podcasts</h3>
                      <p>
                        Foydali productivity va learning podkastlar ro‘yxati.
                        Bosganingizda random kanal ochiladi.
                      </p>
                      <a
                        href={randomPodcast}
                        target="_blank"
                        rel="noreferrer"
                        className="uh-primary-btn"
                      >
                        Start learn ▶
                      </a>
                    </>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* CONTACT */}
          <section className="uh-section" id="contact">
            <div className="uh-section-header">
              <h2>Contact</h2>
              <p>
                Savollaringiz, takliflaringiz yoki feedback bo‘lsa — shu formadan
                yozib qoldiring.
              </p>
            </div>

            <div className="uh-contact-layout">
              <div className="uh-contact-logo-card">
                <img
                  src="/images/unihero-logo-big.png"
                  alt="UniHero"
                  className="uh-contact-logo-img"
                  onError={(e) => {
                    // agar rasm bo'lmasa ham sahifa buzilmasin
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="uh-contact-logo-circle">U</div>
              </div>

              <form className="uh-contact-form" onSubmit={handleContactSubmit}>
                <div className="uh-input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="Your full name"
                  />
                </div>

                <div className="uh-input-group">
                  <label>Telegram User</label>
                  <input
                    type="text"
                    value={telegramUser}
                    onChange={(e) => setTelegramUser(e.target.value)}
                    required
                    placeholder="@username"
                  />
                </div>

                <div className="uh-input-group">
                  <label>Comment</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    required
                    placeholder="How can we help?"
                  />
                </div>

                <button
                  type="submit"
                  className="uh-primary-btn"
                  disabled={sending}
                >
                  {sending ? "Sending..." : "Submit"}
                </button>

                {sendStatus === "ok" && (
                  <p className="uh-status-ok">
                    ✅ Xabaringiz yuborildi, tez orada javob beramiz.
                  </p>
                )}
                {sendStatus === "error" && (
                  <p className="uh-status-error">
                    ❌ Yuborishda xato bo‘ldi. Keyinroq yana urinib ko‘ring.
                  </p>
                )}

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
              </form>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
