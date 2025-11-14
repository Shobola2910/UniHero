// pages/_app.tsx
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import NewsGate from '../components/NewsGate';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <NewsGate />
      <div className="uh-main">
        <Component {...pageProps} />
      </div>
    </>
  );
}
