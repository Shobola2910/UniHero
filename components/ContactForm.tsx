// components/ContactForm.tsx

import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    telegramUser: '',
    comment: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (data.status === 'success') {
      alert('Your message has been sent!');
    } else {
      alert('There was an error submitting the form.');
    }
  };

  return (
    <div className="contact-form">
      <div className="logo">
        <img src="/images/unihero-logo.png" alt="UniHero" />
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="telegramUser">Telegram User:</label>
          <input
            type="text"
            id="telegramUser"
            placeholder="Enter your Telegram username"
            value={formData.telegramUser}
            onChange={(e) => setFormData({ ...formData, telegramUser: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            placeholder="Your comment"
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div className="telegram-links">
        <h3>Connect with us:</h3>
        <ul>
          <li><a href="https://t.me/UniHero_news" target="_blank" rel="noopener noreferrer">📣 UniHero_News</a></li>
          <li><a href="https://t.me/UniHero_BOT" target="_blank" rel="noopener noreferrer">🤖 UniHero BOT</a></li>
          <li><a href="https://t.me/Unihero_admin" target="_blank" rel="noopener noreferrer">👨🏻‍💻 Admin</a></li>
        </ul>
      </div>
    </div>
  );
};

export default ContactForm;
