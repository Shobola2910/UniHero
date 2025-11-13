// components/ResourceLink.tsx

import Link from 'next/link';

const ResourceLink = ({ label, botLink }) => {
  return (
    <div className="resource-link">
      <h4>{label}</h4>
      <Link href={botLink}>
        <button>Access {label}</button>
      </Link>
    </div>
  );
};

const ResourcesSection = () => {
  return (
    <div className="resources-section">
      <h2>Resources</h2>
      <ResourceLink label="Assignments" botLink="https://t.me/UniHero_BOT?start=assignments" />
      <ResourceLink label="Exam Prep" botLink="https://t.me/UniHero_BOT?start=examprep" />
    </div>
  );
};

export default ResourcesSection;
