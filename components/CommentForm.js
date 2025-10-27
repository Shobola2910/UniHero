// components/CommentForm.js
import { useState } from 'react';

const CommentForm = () => {
  const [name, setName] = useState('');
  const [telegramUsername, setTelegramUsername] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // API chaqiruvini amalga oshirish
      await axios.post('/api/send-comment', { name, telegramUsername, comment });
      alert('Izoh muvaffaqiyatli yuborildi!');
      setName('');
      setTelegramUsername('');
      setComment('');
    } catch (error) {
      console.error('Izoh yuborishda xatolik:', error);
      alert('Izoh yuborishda xatolik yuz berdi.');
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
        placeholder="Ismingiz"
        required
      />
      <input
        type="text"
        value={telegramUsername}
        onChange={(e) => setTelegramUsername(e.target.value)}
        placeholder="Telegram foydalanuvchi nomi"
        required
      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Izohingiz"
        required
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Yuborilmoqda...' : 'Izohni yuborish'}
      </button>
    </form>
  );
};

export default CommentForm;
