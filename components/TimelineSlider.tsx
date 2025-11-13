// components/TimelineSlider.tsx

import { useState, useEffect } from 'react';

const timelineData = [
  { emoji: "🤖", date: "2024 · Dec", title: "UniHero Bot created", img: "/images/1-unihero-bot-created.png" },
  { emoji: "🧑‍🤝‍🧑", date: "2024 · Oct", title: "2 anonym founders", img: "/images/2-anonym-founders.png" },
  { emoji: "🧠", date: "2025 · Mar", title: "Focused more on AI detectors and others", img: "/images/3-ai-detectors.png" },
  { emoji: "🎉", date: "2025 · May", title: "180+ Students success", img: "/images/4-students-success.png" },
  { emoji: "📥", date: "2025 · June", title: "UniHero Bot 200+ users", img: "/images/5-bot-200-users.png" },
];

const TimelineSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % timelineData.length);
    }, 7000); // Switch every 7 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  return (
    <div className="timeline-slider">
      {timelineData.map((item, index) => (
        <div
          key={index}
          className={`timeline-item ${index === currentIndex ? 'active' : ''}`}
          style={{ filter: index === currentIndex ? 'none' : 'blur(5px)' }}
        >
          <img src={item.img} alt={item.title} />
          <p>{item.emoji} {item.date} - {item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default TimelineSlider;

