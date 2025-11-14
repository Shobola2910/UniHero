// components/StudyPodcasts.tsx
const channels = [
  { name: 'Ali Abdaal', url: 'https://www.youtube.com/c/aliabdaal' },
  { name: 'Thomas Frank', url: 'https://www.youtube.com/c/ThomasFrank' },
  { name: "Matt D'Avella", url: 'https://www.youtube.com/c/MattDAvella' },
  { name: 'Tim Ferriss', url: 'https://www.youtube.com/c/timferriss' },
  {
    name: 'Deep Work Playlist 1',
    url: 'https://www.youtube.com/playlist?list=PLEITKg6BYjonkVKAPYaHMMa4-4ZU-EEYs',
  },
  { name: 'Hurry Slowly', url: 'https://www.youtube.com/c/HurrySlowly' },
  { name: 'Marie Forleo', url: 'https://www.youtube.com/c/MarieForleo' },
  {
    name: 'Deep Work Playlist 2',
    url: 'https://www.youtube.com/playlist?list=PL27GCkYOrUzvoENAkd1MfXG2NnkdbIJMq',
  },
  {
    name: 'Cal Newport',
    url: 'https://www.youtube.com/c/CalNewportDeepQuestions',
  },
  {
    name: 'Before Breakfast',
    url: 'https://www.youtube.com/c/BeforeBreakfast',
  },
];

export default function StudyPodcasts() {
  const random = channels[Math.floor(Math.random() * channels.length)];
  return (
    <div style={{ textAlign: 'center' }}>
      <p className="uh-modal-text">
        Random study channel for you right now:
      </p>
      <a
        href={random.url}
        target="_blank"
        rel="noopener noreferrer"
        className="uh-btn uh-btn-primary"
      >
        ▶️ Start learning with {random.name}
      </a>
    </div>
  );
}
