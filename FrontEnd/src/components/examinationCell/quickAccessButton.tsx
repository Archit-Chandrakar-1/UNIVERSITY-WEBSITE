// src/components/ExaminationCell/QuickAccessButton.tsx
import React from 'react';
import { ReactNode } from 'react';

interface QuickAccessButtonProps {
  icon: ReactNode;
  text: string;
  href: string;
}

const QuickAccessButton: React.FC<QuickAccessButtonProps> = ({ icon, text, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-yellow-50 hover:shadow-md transition duration-200 ease-in-out group"
    >
      <div className="text-[#ffaf00] group-hover:text-[#142143] mb-2">{icon}</div>
      <span className="text-center text-[#142143] group-hover:text-[#ffaf00] font-medium text-sm md:text-base">
        {text}
      </span>
    </a>
  );
};

export default QuickAccessButton;