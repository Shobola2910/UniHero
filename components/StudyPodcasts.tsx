// components/StudyPodcasts.tsx

const podcastChannels = [
  { name: "Ali Abdaal", url: "https://www.youtube.com/c/aliabdaal" },
  { name: "Thomas Frank", url: "https://www.youtube.com/c/ThomasFrank" },
  { name: "Matt D'Avella", url: "https://www.youtube.com/c/MattDAvella" },
  { name: "Tim Ferriss", url: "https://www.youtube.com/c/timferriss" },
  { name: "Hurry Slowly", url: "https://www.youtube.com/c/HurrySlowly" },
  { name: "Marie Forleo", url: "https://www.youtube.com/c/MarieForleo" },
  // Add more YouTube channels here
];

const getRandomPodcast = () => {
  const randomIndex = Math.floor(Math.random() * podcastChannels.length);
  return podcastChannels[randomIndex];
};

const StudyPodcasts = () => {
  const podcast = getRandomPodcast();

  return (
    <div className="study-podcasts">
      <h2>Study Podcasts</h2>
      <p>Listen to a random podcast:</p>
      <a href={podcast.url} target="_blank" rel="noopener noreferrer">
        {podcast.name}
      </a>
    </div>
  );
};

export default StudyPodcasts;
