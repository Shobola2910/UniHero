// pages/contact.tsx

import { useState } from 'react';

const ContactPage = () => {
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
    <div className="contact-page">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Telegram Username"
          value={formData.telegramUser}
          onChange={(e) => setFormData({ ...formData, telegramUser: e.target.value })}
        />
        <textarea
          placeholder="Comment"
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactPage;

