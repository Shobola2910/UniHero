// components/MotivationQuotes.tsx
const quotes = [
  {
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
  },
  {
    text: 'Success is not the key to happiness. Happiness is the key to success.',
    author: 'Albert Schweitzer',
  },
  {
    text: "Don’t watch the clock; do what it does. Keep going.",
    author: 'Sam Levenson',
  },
  {
    text: 'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt',
  },
];

export default function MotivationQuotes() {
  const random = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="uh-quote-box">
      <p className="uh-quote-text">“{random.text}”</p>
      <p className="uh-quote-author">— {random.author}</p>
    </div>
  );
}
