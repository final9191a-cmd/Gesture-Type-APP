import React from 'react';

export const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12l8.954-8.955a.75.75 0 011.06 0l8.955 8.955M3 11.25V21a1.5 1.5 0 001.5 1.5h15A1.5 1.5 0 0021 21v-9.75M12 22.5V15"
    />
  </svg>
);
