import React from 'react';

export const SaveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
      d="M16.5 3.75V16.5a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 16.5V3.75m13.5 0H5.25m11.25 0c0-1.036-.84-1.875-1.875-1.875H6.75A1.875 1.875 0 004.875 3.75m11.625 0c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-9.75c-.621 0-1.125-.504-1.125-1.125V4.875c0-.621.504-1.125 1.125-1.125H16.5zM9.75 8.25H14.25m-4.5 3H14.25m-4.5 3H12" 
    />
  </svg>
);