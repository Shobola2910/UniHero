// components/CommentForm.js
import { useState } from 'react';
import axios from 'axios';

const CommentForm = () => {
  const [name, setName] = useState('');
  const [telegramUsername, setTelegramUsername] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call the API to send the comment to Telegram
      await axios.post('/api/send-comment', { name, telegramUsername, comment });
      alert('Comment submitted successfully!');
      setName('');
      setTelegramUsername('');
      setComment('');
    } catch (error) {
      alert('Failed to submit comment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        required
      />
      <input
        type="text"
        value={telegramUsername}
        onChange={(e) => setTelegramUsername(e.target.value)}
        placeholder="Your Telegram Username"
        required
      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Your Comment"
        required
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Comment'}
      </button>
    </form>
  );
};

export default CommentForm;
