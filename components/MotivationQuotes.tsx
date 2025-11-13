// components/MotivationQuotes.tsx

const quotes = [
  "The only way to do great work is to love what you do. – Steve Jobs",
  "Success is not the key to happiness. Happiness is the key to success. – Albert Schweitzer",
  "Don’t watch the clock; do what it does. Keep going. – Sam Levenson",
  "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
  // Add more quotes as needed
];

const MotivationQuotes = () => {
  return (
    <div className="motivation-quotes">
      <h3>Motivational Quotes</h3>
      {quotes.map((quote, index) => (
        <p key={index}>"{quote}"</p>
      ))}
    </div>
  );
};

export default MotivationQuotes;

