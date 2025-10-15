// src/components/ExaminationCell/DownloadButton.tsx
import React from 'react';
import { ReactNode } from 'react';
import { DownloadCloud } from 'lucide-react'; // Icon

interface DownloadButtonProps {
  icon: ReactNode;
  text: string;
  href: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ icon, text, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-start p-3 bg-gray-100 rounded-lg shadow-sm hover:bg-green-50 hover:shadow-md transition duration-200 ease-in-out group"
    >
      <div className="text-green-600 group-hover:text-green-800 mr-3">{icon || <DownloadCloud />}</div>
      <span className="text-[#142143] group-hover:text-green-700 font-medium text-sm md:text-base truncate flex-1">
        {text}
      </span>
    </a>
  );
};

export default DownloadButton;