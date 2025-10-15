// src/components/departments/publicAcademicSection.tsx

import React, { useState, useEffect } from 'react';
import { FileText, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

import { DepartmentContentItem } from './adminSection';

interface PublicAcademicSectionProps {
  departmentName: string;
}

const FileDisplay: React.FC<{ item: DepartmentContentItem }> = ({ item }) => {
  const isPDF = item.file_url && item.file_url.toLowerCase().endsWith('.pdf');
  const isImage = item.resource_type === 'image';
  const isDoc = item.file_url && (item.file_url.toLowerCase().endsWith('.docx') || item.file_url.toLowerCase().endsWith('.doc'));

  const getIcon = () => {
    if (isPDF || isDoc) return <FileText className="h-5 w-5 text-red-500" />;
    if (item.link_url) return <LinkIcon className="h-5 w-5 text-blue-500" />;
    if (isImage) return <ImageIcon className="h-5 w-5 text-green-500" />;
    return <FileText className="h-5 w-5 text-gray-500" />;
  };

  const getLinkText = () => {
    if (isPDF) return 'View PDF';
    if (isDoc) return 'Download Doc';
    if (item.link_url) return 'Visit Link';
    return 'View File';
  };

  const targetUrl = item.file_url || item.link_url;

  return (
    <li className="flex items-center gap-3 p-2 bg-white rounded-md shadow-sm">
      {getIcon()}
      {targetUrl ? (
        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#142143] hover:text-[#ffaf00] font-medium truncate flex-1"
        >
          {item.title} ({getLinkText()})
        </a>
      ) : (
        <span className="text-[#142143] font-medium truncate flex-1">{item.title}</span>
      )}
    </li>
  );
};

const Panel: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-4 border rounded-lg bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3 font-bold text-[#142143] flex justify-between items-center focus:outline-none"
      >
        {title}
        <span>{open ? '−' : '+'}</span>
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
};

const PublicAcademicSection: React.FC<PublicAcademicSectionProps> = ({ departmentName }) => {
  const [departmentContent, setDepartmentContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'http://localhost:5555/api/department-content';

  const fetchContent = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}?departmentName=${encodeURIComponent(departmentName)}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || `Failed to fetch content: ${response.statusText}`);
      }
      const data = await response.json();
      setDepartmentContent(data);
    } catch (err) {
      console.error('Error fetching academic content:', err);
      setError(`Failed to load content: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (departmentName) {
      fetchContent();
    }
  }, [departmentName]);

  const syllabus = departmentContent?.syllabus || [];
  const research = departmentContent?.research || [];
  const achievements = departmentContent?.achievements || [];
  
  const hasAcademicContent = syllabus.length > 0 || research.length > 0 || achievements.length > 0;

  if (!departmentName) {
    return (
      <section className="p-6 text-center text-gray-600">
        Please select a department to manage its academic content.
      </section>
    );
  }

  if (loading) {
    return <div className="text-center p-8">Loading academic content...</div>;
  }

  if (error) {
    return <div className="text-red-600 p-4 bg-red-100 rounded-md my-4">Error: {error}</div>;
  }

  return (
    <section className="mb-8 p-4 md:p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-[#142143]">
        {departmentName} - Academic Content
      </h2>

      {!hasAcademicContent ? (
        <p className="text-gray-500">No academic content uploaded yet.</p>
      ) : (
        <>
          <Panel title="Syllabus">
            {syllabus.length === 0 ? <p className="text-gray-500">No syllabus uploaded yet.</p> : (
              <ul className="space-y-2">
                {syllabus.map((item: DepartmentContentItem) => (
                  <FileDisplay key={item._id} item={item} />
                ))}
              </ul>
            )}
          </Panel>

          <Panel title="Research & Publications">
            {research.length === 0 ? <p className="text-gray-500">No research & publications uploaded yet.</p> : (
              <ul className="space-y-2">
                {research.map((item: DepartmentContentItem) => (
                  <FileDisplay key={item._id} item={item} />
                ))}
              </ul>
            )}
          </Panel>

          <Panel title="Achievements">
            {achievements.length === 0 ? <p className="text-gray-500">No achievements uploaded yet.</p> : (
              <ul className="space-y-2">
                {achievements.map((item: DepartmentContentItem) => (
                  <FileDisplay key={item._id} item={item} />
                ))}
              </ul>
            )}
          </Panel>
        </>
      )}
    </section>
  );
};

export default PublicAcademicSection;