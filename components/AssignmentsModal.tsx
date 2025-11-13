// components/AssignmentsModal.tsx

import { useState } from 'react';

const AssignmentsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Order Assignments</h2>
        <p>Click below to order your assignments via the UniHero Bot:</p>
        <a href="https://t.me/UniHero_BOT?start=assignments" target="_blank" rel="noopener noreferrer">
          <button>Order Assignments</button>
        </a>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AssignmentsModal;
