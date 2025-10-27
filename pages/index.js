// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to UniHero</h1>
      <p>Your go-to platform for educational resources.</p>
      <Link href="/contact">Contact Us</Link>
      <br />
      <Link href="/resources">View Resources</Link>
    </div>
  );
}
