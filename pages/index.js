import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to UniHero</h1>
      <p>Your education companion powered by UniHero!</p>
      <div>
        <Link href="https://t.me/UniHero_news">
          <a>Join the Community</a>
        </Link>
        <Link href="/about">
          <a>Learn More</a>
        </Link>
      </div>
    </div>
  );
}
