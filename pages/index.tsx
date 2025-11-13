// pages/index.tsx

import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to UniHero!</h1>
      <p>✨ For Students, By Students</p>
      
      <div>
        <Link href="https://t.me/UniHero_news">
          <button>Join the Community</button>
        </Link>
        <Link href="/about">
          <button>Learn More</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
