// pages/resources.tsx

import ResourceLink from '../components/ResourceLink';

const ResourcesPage = () => {
  return (
    <div className="resources-page">
      <h2>Resources & Assignments</h2>
      <ResourceLink label="Assignments" botLink="https://t.me/UniHero_BOT?start=assignments" />
      <ResourceLink label="Exam Prep" botLink="https://t.me/UniHero_BOT?start=examprep" />
    </div>
  );
};

export default ResourcesPage;
