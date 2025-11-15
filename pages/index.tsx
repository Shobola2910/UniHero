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
      alert("Iltimos, barcha maydonlarni to‘ldiring 🙂");
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
        throw new Error("Server xatosi");
      }

      setFullName("");
      setTelegramUser("");
      setComment("");
      alert("Xabaringiz muvaffaqiyatli yuborildi! ✅");
    } catch (err) {
      console.error(err);
      alert("Xabar yuborishda xatolik yuz berdi. Keyinroq urinib ko‘ring.");
    } finally {
      setSending(false);
    }
  };

  // Timeline kartalarining classini hisoblash (chap / o‘rta / o‘ng / yashirin)
  const getTimelineCardClass = (index: number) => {
    if (index === activeTimeline) return "uh-timeline-card uh-timeline-card--center";

    const prev = (activeTimeline - 1 + timelineItems.length) % timelineItems.length;
    const next = (activeTimeline + 1) % timelineItems.length;

    if (index === prev) return "uh-timeline-card uh-timeline-card--left";
    if (index === next) return "uh-timeline-card uh-timeline-card--right";

    return "uh-timeline-card uh-timeline-card--hidden";
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
              {/* LOGO RASMI – shu faylni public/images ichiga qo‘ygan bo‘lishingiz kerak */}
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
                Practical resources, a helpful community, and simple tools.
                Learn smarter with study guides, templates and quick support.
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

            <div className="uh-t
