// components/WhyChooseUs.tsx

const reasons = [
  "Personalized assignments and study resources.",
  "Access to exclusive Telegram groups and channels.",
  "Motivational content to keep you inspired.",
  "Free study guides and podcasts for better learning.",
];

const WhyChooseUs = () => {
  return (
    <div className="why-choose-us">
      <h2>Why Choose Us?</h2>
      <ul>
        {reasons.map((reason, index) => (
          <li key={index} className="reason-item">
            <p>{reason}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhyChooseUs;
