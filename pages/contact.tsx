// pages/contact.tsx
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  return (
    <div className="uh-page">
      <h1 className="uh-section-title">Contact</h1>
      <p className="uh-section-sub">
        Leave your full name, Telegram user and comment — we&apos;ll receive it
        directly in our UniHero bot.
      </p>

      <div className="uh-contact-grid">
        <div className="uh-contact-logo">
          {/* Bu yerga 3D UniHero icon rasmini qo'yasiz */}
          <img src="/images/unihero-3d.png" alt="UniHero" />
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
