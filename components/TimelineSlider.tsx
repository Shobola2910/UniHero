// components/TimelineSlider.tsx
import { useEffect, useState } from 'react';

const timelineItems = [
  {
    emoji: '🤖',
    date: '2024 · Dec',
    title: 'UniHero Bot created',
    img: '/images/1-unihero-bot-created.png',
  },
  {
    emoji: '🧑‍🤝‍🧑',
    date: '2024 · Oct',
    title: '2 anonym founders',
    img: '/images/2-anonym-founders.png',
  },
  {
    emoji: '🧠',
    date: '2025 · Mar',
    title: 'Focused more on AI detectors and others',
    img: '/images/3-ai-detectors.png',
  },
  {
    emoji: '🎉',
    date: '2025 · May',
    title: '180+ Students success',
    img: '/images/4-students-success.png',
  },
  {
    emoji: '📥',
    date: '2025 · June',
    title: 'UniHero Bot 200+ users',
    img: '/images/5-bot-200-users.png',
  },
];

export default function TimelineSlider() {
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    const id = setInterval(
      () => setActiveIndex((prev) => (prev + 1) % timelineItems.length),
      7000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="uh-timeline">
      {timelineItems.map((item, index) => {
        const isActive = index === activeIndex;
        return (
          <div
            key={item.title}
            className={
              'uh-timeline-item' + (isActive ? ' uh-timeline-item--active' : '')
            }
          >
            <img src={item.img} alt={item.title} />
            <div className="uh-timeline-caption">
              <div className="uh-timeline-title">
                {item.emoji} {item.title}
              </div>
              <div className="uh-timeline-date">{item.date}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
