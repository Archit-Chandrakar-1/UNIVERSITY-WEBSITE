import React, { useState, useEffect } from 'react';
import { FileText, Link as LinkIcon, Download } from 'lucide-react'; // Added Download icon

// Simplified and corrected type for this specific component
export type StudyMaterialItem = {
  _id: string;
  department: string;
  title: string;
  file_url?: string;
  public_id?: string;
  link_url?: string;
  createdAt: string;
  updatedAt: string;
};

interface PublicStudyMaterialSectionProps {
  departmentName: string;
}

// Correct API endpoint for study materials
const API_URL = 'http://localhost:5555/api/studyMaterials';

const PublicStudyMaterialSection: React.FC<PublicStudyMaterialSectionProps> = ({ departmentName }) => {
  const [materials, setMaterials] = useState<StudyMaterialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      setLoading(true);
      setError(null);
      if (!departmentName) {
        setError("Department name is required to fetch study materials.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(
          `${API_URL}?department=${encodeURIComponent(departmentName)}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || errorData.error || `Failed to fetch study materials: ${response.statusText}`);
        }
        const data = await response.json();
        setMaterials(data);
      } catch (err) {
        console.error('Error fetching study materials:', err);
        setError(`Failed to load study materials: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, [departmentName]);

  const MaterialItem: React.FC<{ item: StudyMaterialItem }> = ({ item }) => {
    const isFile = item.file_url && item.file_url.toLowerCase().match(/\.(pdf|doc|docx|ppt|pptx)$/i);
    const targetUrl = item.file_url || item.link_url;
    
    return (
      <li className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-md shadow-sm border border-gray-200 hover:bg-gray-100 transition">
        <div className="flex items-center gap-3">
          {isFile ? <FileText className="h-5 w-5 text-red-500" /> : <LinkIcon className="h-5 w-5 text-blue-500" />}
          <span className="text-[#142143] font-medium truncate">{item.title}</span>
        </div>
        {targetUrl && (
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
            title="Download/View"
          >
            {isFile ? <Download className="h-5 w-5" /> : <LinkIcon className="h-5 w-5" />}
          </a>
        )}
      </li>
    );
  };
  
  const renderContent = () => {
    if (loading) {
      return <p className="text-center text-gray-600 p-8">Loading study materials...</p>;
    }
  
    if (error) {
      return <p className="text-red-600 p-3 bg-red-100 rounded-md my-4">Error: {error}</p>;
    }
  
    if (materials.length === 0) {
      return <p className="text-center text-gray-500 p-8">No study materials available for {departmentName}.</p>;
    }
  
    return (
      <ul className="space-y-2">
        {materials.map((material) => (
          <MaterialItem key={material._id} item={material} />
        ))}
      </ul>
    );
  };

  return (
    <section className="mb-8 p-4 md:p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-[#142143]">
        {departmentName} - Study Materials
      </h2>
      {renderContent()}
    </section>
  );
};

export default PublicStudyMaterialSection;