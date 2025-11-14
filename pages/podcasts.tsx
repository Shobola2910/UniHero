// pages/podcasts.tsx
import StudyPodcasts from '../components/StudyPodcasts';

export default function PodcastsPage() {
  return (
    <div className="uh-page">
      <h1 className="uh-section-title">Study Podcasts</h1>
      <p className="uh-section-sub">
        We randomly pick a deep-focus study channel for you.
      </p>
      <StudyPodcasts />
    </div>
  );
}
