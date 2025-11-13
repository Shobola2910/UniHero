'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Send } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(2);
  const [isJoined, setIsJoined] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [formData, setFormData] = useState({ fullName: '', telegramUser: '', comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeline = [
    { 
      emoji: "🤖", 
      date: "2024 · Dec", 
      title: "UniHero Bot created",
      image: "/images/timeline/1-unihero-bot-created.jpg"
    },
    { 
      emoji: "🧑‍🤝‍🧑", 
      date: "2024 · Oct", 
      title: "2 anonym founders",
      image: "/images/timeline/2-anonym-founders.jpg"
    },
    { 
      emoji: "🧠", 
      date: "2025 · Mar", 
      title: "Focused more on AI detectors and others",
      image: "/images/timeline/3-ai-detectors.jpg"
    },
    { 
      emoji: "🎉", 
      date: "2025 · May", 
      title: "180+ Students success",
      image: "/images/timeline/4-students-success.jpg"
    },
    { 
      emoji: "📥", 
      date: "2025 · June", 
      title: "UniHero Bot 200+ users",
      image: "/images/timeline/5-bot-200-users.jpg"
    }
  ];

  const motivationalQuotes = [
    "Education is the passport to the future, for tomorrow belongs to those who prepare for it today. - Malcolm X",
    "The beautiful thing about learning is that no one can take it away from you. - B.B. King",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The expert in anything was once a beginner. - Helen Hayes",
    "Learning never exhausts the mind. - Leonardo da Vinci",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Education is not preparation for life; education is life itself. - John Dewey",
    "The mind is not a vessel to be filled, but a fire to be kindled. - Plutarch",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
  ];

  const studyPodcasts = [
    "https://www.youtube.com/c/aliabdaal",
    "https://www.youtube.com/c/ThomasFrank",
    "https://www.youtube.com/c/MattDAvella",
    "https://www.youtube.com/c/timferriss",
    "https://www.youtube.com/playlist?list=PLEITKg6BYjonkVKAPYaHMMa4-4ZU-EEYs",
    "https://www.youtube.com/c/HurrySlowly",
    "https://www.youtube.com/c/MarieForleo",
    "https://www.youtube.com/playlist?list=PL27GCkYOrUzvoENAkd1MfXG2NnkdbIJMq",
    "https://www.youtube.com/c/CalNewportDeepQuestions",
    "https://www.youtube.com/c/BeforeBreakfast"
  ];

  useEffect(() => {
    const checkJoinStatus = () => {
      const joined = localStorage.getItem('unihero_joined');
      setIsJoined(!!joined);
    };
    checkJoinStatus();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % timeline.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [timeline.length]);

  const handleJoinCommunity = () => {
    window.open('https://t.me/UniHero_news', '_blank');
    localStorage.setItem('unihero_joined', 'true');
    setIsJoined(true);
  };

  const handleResourceClick = (type: string) => {
    setModalContent(type);
    setShowModal(true);
  };

  const handleStudyPodcast = () => {
    const randomPodcast = studyPodcasts[Math.floor(Math.random() * studyPodcasts.length)];
    window.open(randomPodcast, '_blank');
  };

  const handleSubmitContact = async () => {
    if (!formData.fullName || !formData.telegramUser || !formData.comment) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ fullName: '', telegramUser: '', comment: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const Navigation = () => (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image 
            src="/images/logo-white.svg" 
            alt="UniHero Logo" 
            width={40} 
            height={40}
            className="w-10 h-10"
          />
          <h1 className="text-2xl font-bold">UniHero</h1>
        </div>
        <div className="hidden md:flex gap-6">
          {['home', 'about', 'resources', 'contact'].map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`capitalize hover:text-yellow-300 transition ${currentPage === page ? 'text-yellow-300' : ''}`}
            >
              {page}
            </button>
          ))}
        </div>
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-2">
          {['home', 'about', 'resources', 'contact'].map(page => (
            <button
              key={page}
              onClick={() => { setCurrentPage(page); setMobileMenuOpen(false); }}
              className="capitalize text-left p-2 hover:bg-purple-700 rounded"
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </nav>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <Image 
            src="/images/logo-icon.svg" 
            alt="UniHero" 
            width={120} 
            height={120}
            className="w-32 h-32"
          />
        </div>
        <h2 className="text-5xl font-bold text-purple-600 mb-4">Welcome to UniHero</h2>
        <p className="text-2xl text-gray-700 mb-8">✨ For Students, By Students</p>
        <p className="text-lg text-gray-600 mb-8">
          Your ultimate companion for academic success. We provide resources, guidance, and support to help you excel in your university journey.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={handleJoinCommunity}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-xl transition transform hover:scale-105"
          >
            Join the Community
          </button>
          <button
            onClick={() => setCurrentPage('about')}
            className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold border-2 border-purple-600 hover:bg-purple-50 transition"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-purple-600 mb-12">Our Journey</h2>
        <div className="relative overflow-hidden h-[500px] mb-12">
          <div className="flex items-center justify-center gap-8">
            {[-1, 0, 1].map((offset) => {
              const index = (currentSlide + offset + timeline.length) % timeline.length;
              const item = timeline[index];
              return (
                <div
                  key={index}
                  className={`transition-all duration-500 ${offset === 0 ? 'scale-110 opacity-100 z-10' : 'scale-90 opacity-40 blur-sm'}`}
                >
                  <div className="bg-white rounded-xl shadow-xl p-6 w-80">
                    <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                      <Image 
                        src={item.image} 
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-purple-600 font-bold mb-2 text-center">{item.date}</p>
                    <p className="text-gray-800 text-center font-semibold">{item.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <h3 className="text-3xl font-bold text-center text-purple-600 mb-8">Why Choose UniHero?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: "📚", title: "Comprehensive Resources", desc: "Access study materials, guides, and exam prep" },
            { icon: "🤖", title: "AI-Powered Tools", desc: "Advanced AI detectors and assistance" },
            { icon: "🎯", title: "Student Success", desc: "Join 180+ successful students" }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-6 text-center hover:scale-105 transition transform">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h4 className="text-xl font-bold text-purple-600 mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ResourcesPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-purple-600 mb-12">Resources</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Assignment", icon: "📝", action: () => handleResourceClick('assignment') },
            { title: "Exam Prep", icon: "📖", action: () => handleResourceClick('exam') },
            { title: "Motivation", icon: "💪", action: () => handleResourceClick('motivation') },
            { title: "Study Guides", icon: "📚", action: () => handleResourceClick('guides') },
            { title: "UniHero Hub", icon: "🌐", action: () => handleResourceClick('hub') },
            { title: "Study Podcasts", icon: "🎧", action: handleStudyPodcast }
          ].map((resource, idx) => (
            <button
              key={idx}
              onClick={resource.action}
              className="bg-white rounded-xl shadow-lg p-8 text-center hover:scale-105 transition transform hover:shadow-2xl"
            >
              <div className="text-6xl mb-4">{resource.icon}</div>
              <h3 className="text-xl font-bold text-purple-600">{resource.title}</h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-purple-600 mb-12">Contact Us</h2>
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              className="w-full p-3 border-2 border-purple-200 rounded-lg focus:border-purple-600 outline-none"
              disabled={isSubmitting}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Telegram Username</label>
            <input
              type="text"
              value={formData.telegramUser}
              onChange={(e) => setFormData({...formData, telegramUser: e.target.value})}
              className="w-full p-3 border-2 border-purple-200 rounded-lg focus:border-purple-600 outline-none"
              placeholder="@username"
              disabled={isSubmitting}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Comment</label>
            <textarea
              value={formData.comment}
              onChange={(e) => setFormData({...formData, comment: e.target.value})}
              className="w-full p-3 border-2 border-purple-200 rounded-lg focus:border-purple-600 outline-none h-32"
              disabled={isSubmitting}
            />
          </div>
          <button
            onClick={handleSubmitContact}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:shadow-xl transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} /> {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
        <div className="mt-8 text-center">
          <h3 className="text-xl font-bold text-purple-600 mb-4">Connect With Us</h3>
          <div className="flex flex-col gap-2">
            <a href="https://t.me/UniHero_news" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">📣 UniHero_News</a>
            <a href="https://t.me/UniHero_BOT" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">🤖 UniHero BOT</a>
            <a href="https://t.me/Unihero_admin" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">👨🏻‍💻 Admin</a>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isJoined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <Image 
              src="/images/logo-icon.svg" 
              alt="UniHero" 
              width={100} 
              height={100}
              className="w-24 h-24"
            />
          </div>
          <h2 className="text-3xl font-bold text-purple-600 mb-4">Welcome to UniHero!</h2>
          <p className="text-gray-700 mb-6">Please join our Telegram channel to access the website</p>
          <button
            onClick={handleJoinCommunity}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-xl transition transform hover:scale-105"
          >
            Join UniHero News
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'resources' && <ResourcesPage />}
      {currentPage === 'contact' && <ContactPage />}
      
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-purple-600 mb-4 capitalize">{modalContent}</h3>
            {modalContent === 'assignment' && (
              <div>
                <p className="mb-4">Order assignments through our UniHero Bot</p>
                <a href="https://t.me/UniHero_BOT" target="_blank" rel="noopener noreferrer" className="bg-purple-600 text-white px-6 py-2 rounded-lg inline-block hover:bg-purple-700">Go to Bot</a>
              </div>
            )}
            {modalContent === 'exam' && (
              <div>
                <p className="mb-4">Get all exam preparation resources from our bot</p>
                <a href="https://t.me/UniHero_BOT" target="_blank" rel="noopener noreferrer" className="bg-purple-600 text-white px-6 py-2 rounded-lg inline-block hover:bg-purple-700">Access Resources</a>
              </div>
            )}
            {modalContent === 'motivation' && (
              <div>
                <p className="text-lg italic text-gray-700 mb-4">"{motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]}"</p>
                <button onClick={() => setShowModal(false)} className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">Close</button>
              </div>
            )}
            {modalContent === 'guides' && (
              <div>
                <p className="mb-4">Access university study guides through our bot</p>
                <a href="https://t.me/UniHero_BOT" target="_blank" rel="noopener noreferrer" className="bg-purple-600 text-white px-6 py-2 rounded-lg inline-block hover:bg-purple-700">Get Guides</a>
              </div>
            )}
            {modalContent === 'hub' && (
              <div className="flex flex-col gap-3">
                <p className="mb-2">Connect with UniHero Hub</p>
                <a href="https://t.me/UniHero_news" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">📣 UniHero_News</a>
                <a href="https://t.me/UniHero_BOT" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">🤖 UniHero BOT</a>
                <a href="https://t.me/Unihero_admin" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">👨🏻‍💻 Admin</a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
