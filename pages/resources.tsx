// pages/resources.tsx

import { useState } from 'react';
import AssignmentsModal from '../components/AssignmentsModal';
import ExamPrepModal from '../components/ExamPrepModal';

const ResourcesPage = () => {
  const [isAssignmentsModalOpen, setAssignmentsModalOpen] = useState(false);
  const [isExamPrepModalOpen, setExamPrepModalOpen] = useState(false);

  return (
    <div className="resources-page">
      <h2>Resources & Assignments</h2>
      <div className="resource-buttons">
        <button onClick={() => setAssignmentsModalOpen(true)}>Assignments</button>
        <button onClick={() => setExamPrepModalOpen(true)}>Exam Prep</button>
      </div>

      <AssignmentsModal isOpen={isAssignmentsModalOpen} onClose={() => setAssignmentsModalOpen(false)} />
      <ExamPrepModal isOpen={isExamPrepModalOpen} onClose={() => setExamPrepModalOpen(false)} />
    </div>
  );
};

export default ResourcesPage;
