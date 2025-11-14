// components/WhyUniHero.tsx
const reasons = [
  {
    emoji: '📘',
    title: 'Clear guidance',
    text: 'No fluff — short, practical and exam-aligned.',
  },
  {
    emoji: '🧠',
    title: 'Smart tools',
    text: 'Templates, checklists and quick planners.',
  },
  {
    emoji: '⚡',
    title: 'Fast help',
    text: 'Ask on Telegram, get answers in minutes.',
  },
  {
    emoji: '🎯',
    title: 'Student-first',
    text: 'Built by and for learners — friendly and simple.',
  },
  {
    emoji: '🕐',
    title: '24/7',
    text: 'Support availability when you need it.',
  },
];

export default function WhyUniHero() {
  return (
    <section>
      <h2 className="uh-section-title">Why students love UniHero</h2>
      <p className="uh-section-sub">
        Built around clarity, speed and a friendly vibe.
      </p>
      <div className="uh-why-grid">
        {reasons.map((r) => (
          <div key={r.title} className="uh-why-card">
            <div className="uh-why-title">
              <span style={{ marginRight: 8 }}>{r.emoji}</span>
              {r.title}
            </div>
            <div className="uh-why-text">{r.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
