// components/NewsGate.tsx
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'uh_joined_news_v1';
const NEWS_LINK = 'https://t.me/UniHero_news';

export default function NewsGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const joined = window.localStorage.getItem(STORAGE_KEY);
    if (!joined) setOpen(true);
  }, []);

  const handleJoined = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, 'yes');
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="uh-news-gate-overlay">
      <div className="uh-news-gate-card">
        <h2 className="uh-news-gate-title">👋 Welcome to UniHero</h2>
        <p className="uh-news-gate-text">
          Avval bizning <strong>UniHero_News</strong> kanaliga qo‘shiling.
          Shundan keyin sayt funksiyalaridan to‘liq foydalanishingiz mumkin.
        </p>
        <div className="uh-modal-buttons" style={{ marginBottom: 10 }}>
          <a
            href={NEWS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="uh-btn uh-btn-primary"
          >
            📣 Join UniHero_News
          </a>
        </div>
        <button className="uh-btn uh-btn-secondary" onClick={handleJoined}>
          ✅ I Joined
        </button>
      </div>
    </div>
  );
}
