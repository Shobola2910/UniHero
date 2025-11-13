// components/ExamPrepModal.tsx

import { useState } from 'react';

const ExamPrepModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Exam Preparation</h2>
        <p>Get all your exam prep resources from our UniHero Bot:</p>
        <a href="https://t.me/UniHero_BOT?start=examprep" target="_blank" rel="noopener noreferrer">
          <button>Join for Exam Prep</button>
        </a>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ExamPrepModal;
