// pages/motivation.tsx
import MotivationQuotes from '../components/MotivationQuotes';

export default function MotivationPage() {
  return (
    <div className="uh-page">
      <h1 className="uh-section-title">Motivation</h1>
      <p className="uh-section-sub">
        Short quotes from famous people to keep you going.
      </p>
      <MotivationQuotes />
    </div>
  );
}
