// src/components/departments/publicSyllabusSection.tsx

import React, { useState, useEffect } from 'react';
import { FileText, Download } from 'lucide-react';

// Simplified type for this specific component
export type SyllabusItem = {
  _id: string;
  department: string;
  title: string;
  file_url: string;
  public_id: string;
  createdAt: string;
  updatedAt: string;
};

interface PublicSyllabusSectionProps {
  departmentName: string;
}

const API_URL = 'http://localhost:5555/api/syllabus';

const PublicSyllabusSection: React.FC<PublicSyllabusSectionProps> = ({ departmentName }) => {
  const [syllabusList, setSyllabusList] = useState<SyllabusItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSyllabus = async () => {
      setLoading(true);
      setError(null);
      if (!departmentName) {
        setError("Department name is required to fetch syllabus.");
        setLoading(false);
        return;
      }
      try {
        // Correct the query parameter name to 'department'
        const response = await fetch(`${API_URL}?department=${encodeURIComponent(departmentName)}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || errorData.error || `Failed to fetch syllabus: ${response.statusText}`);
        }
        setSyllabusList(await response.json());
      } catch (err) {
        console.error('Error fetching syllabus:', err);
        setError(`Failed to load syllabus: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoading(false);
      }
    };
    fetchSyllabus();
  }, [departmentName]);

  const renderContent = () => {
    if (loading) {
      return <p className="text-center text-gray-600 p-8">Loading syllabus...</p>;
    }

    if (error) {
      return <p className="text-red-600 p-3 bg-red-100 rounded-md my-4">Error: {error}</p>;
    }

    if (syllabusList.length === 0) {
      return <p className="text-center text-gray-500 p-8">No syllabus available for {departmentName}.</p>;
    }

    return (
      <ul className="space-y-3">
        {syllabusList.map((item) => (
          item.file_url && (
            <li key={item._id} className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 transition">
              <div className="flex items-center gap-3 flex-1">
                <FileText className="h-5 w-5 text-red-500" />
                <span className="font-medium text-[#142143] truncate">{item.title}</span>
              </div>
              <a
                href={item.file_url}
                download={true}
                className="text-blue-600 hover:text-blue-800"
                title={`Download ${item.title}`}
              >
                <Download className="h-5 w-5" />
              </a>
            </li>
          )
        ))}
      </ul>
    );
  };
  
  return (
    <section className="mb-8 p-4 md:p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-[#142143]">
        {departmentName} - Syllabus
      </h2>
      {renderContent()}
    </section>
  );
};

export default PublicSyllabusSection;