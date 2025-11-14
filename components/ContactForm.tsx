// components/ContactForm.tsx
import { FormEvent, useState } from 'react';

export default function ContactForm() {
  const [fullName, setFullName] = useState('');
  const [telegramUser, setTelegramUser] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !telegramUser || !comment) return;

    try {
      setLoading(true);
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, telegramUser, comment }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        alert('✅ Your message has been sent!');
        setFullName('');
        setTelegramUser('');
        setComment('');
      } else {
        alert('❌ Error: ' + data.message);
      }
    } catch (err) {
      alert('❌ Failed to send. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="uh-contact-card">
      <div className="uh-contact-avatar">U</div>
      <form onSubmit={handleSubmit} className="uh-contact-fields">
        <input
          className="uh-input"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          className="uh-input"
          placeholder="Telegram User (@username)"
          value={telegramUser}
          onChange={(e) => setTelegramUser(e.target.value)}
          required
        />
        <textarea
          className="uh-textarea"
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button
          type="submit"
          className="uh-btn uh-btn-primary"
          disabled={loading}
        >
          {loading ? 'Sending…' : 'Submit'}
        </button>
      </form>

      <div className="uh-contact-footer">
        <a
          href="https://t.me/UniHero_news"
          target="_blank"
          rel="noopener noreferrer"
          className="uh-chip-link"
        >
          📣 UniHero_News
        </a>
        <a
          href="https://t.me/UniHero_BOT"
          target="_blank"
          rel="noopener noreferrer"
          className="uh-chip-link"
        >
          🤖 UniHero BOT
        </a>
        <a
          href="https://t.me/Unihero_admin"
          target="_blank"
          rel="noopener noreferrer"
          className="uh-chip-link"
        >
          👨🏻‍💻 Admin
        </a>
      </div>
    </div>
  );
}
