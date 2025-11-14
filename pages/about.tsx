// pages/about.tsx
import TimelineSlider from '../components/TimelineSlider';
import WhyUniHero from '../components/WhyUniHero';

export default function AboutPage() {
  return (
    <div className="uh-page">
      <section>
        <h1 className="uh-section-title">Our story</h1>
        <p className="uh-section-sub">
          A small student-run project that turned into a study companion for
          hundreds of learners.
        </p>
        <TimelineSlider />
      </section>

      <WhyUniHero />
    </div>
  );
}
