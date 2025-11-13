// components/ResourceLink.tsx

import React from 'react';

interface ResourceLinkProps {
  label: string;
  botLink: string;
}

const ResourceLink: React.FC<ResourceLinkProps> = ({ label, botLink }) => {
  return (
    <div className="resource-link">
      <h4>{label}</h4>
      <a href={botLink} target="_blank" rel="noopener noreferrer">
        <button>Access {label}</button>
      </a>
    </div>
  );
};

export default ResourceLink;
