// components/TimelineSlider.tsx
import { useEffect, useState } from "react";
import Image from "next/image";

type TimelineItem = {
  emoji: string;
  date: string;
  title: string;
  image: string;
};

const TIMELINE_ITEMS: TimelineItem[] = [
  {
    emoji: "🤖",
    date: "2024 · Dec",
    title: "UniHero Bot created",
    image: "/images/timeline/unihero-bot-created.png",
  },
  {
    emoji: "🧑‍🤝‍🧑",
    date: "2024 · Oct",
    title: "2 anonym founders",
    image: "/images/timeline/anonym-founders.png",
  },
  {
    emoji: "🧠",
    date: "2025 · Mar",
    title: "Focused more on AI detectors and others",
    image: "/images/timeline/ai-detectors.png",
  },
  {
    emoji: "🎉",
    date: "2025 · May",
    title: "180+ Students success",
    image: "/images/timeline/students-success.png",
  },
  {
    emoji: "📥",
    date: "2025 · June",
    title: "UniHero Bot 200+ users",
    image: "/images/timeline/bot-200-users.png",
  },
];

export default function TimelineSlider() {
  // markazda ko‘rinishi uchun default — 2 anonym founders
  const [activeIndex, setActiveIndex] = useState(1);

  // har 7 soniyada slayd almashinadi
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TIMELINE_ITEMS.length);
    }, 7000);

    return () => clearInterval(id);
  }, []);

  const goTo = (index: number) => {
    setActiveIndex((index + TIMELINE_ITEMS.length) % TIMELINE_ITEMS.length);
  };

  return (
    <div className="uh-timeline">
      <div className="uh-timeline-row">
        {[-1, 0, 1].map((offset) => {
          const index =
            (activeIndex + offset + TIMELINE_ITEMS.length) %
            TIMELINE_ITEMS.length;
          const item = TIMELINE_ITEMS[index];
          const isCenter = offset === 0;

          return (
            <div
              key={item.title}
              className={
                "uh-timeline-card " +
                (isCenter
                  ? "uh-timeline-card--active"
                  : "uh-timeline-card--side")
              }
              onClick={() => goTo(index)}
            >
              <div className="uh-timeline-image-wrapper">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 260px, 320px"
                  className="uh-timeline-image"
                />
              </div>
              <div className="uh-timeline-meta">
                <div className="uh-timeline-emoji">{item.emoji}</div>
                <div className="uh-timeline-title">{item.title}</div>
                <div className="uh-timeline-date">{item.date}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* pastdagi progress chiziq / nuqtalar */}
      <div className="uh-timeline-dots">
        {TIMELINE_ITEMS.map((_, idx) => (
          <button
            key={idx}
            className={
              "uh-timeline-dot " +
              (idx === activeIndex ? "uh-timeline-dot--active" : "")
            }
            onClick={() => goTo(idx)}
          />
        ))}
      </div>
    </div>
  );
}
