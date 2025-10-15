// src/components/departments/publicAchievementsSection.tsx

import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, ExternalLink } from 'lucide-react';


import { AchievementsContentItem } from '../adminComponents/adminAchievmentsSection';

interface PublicAchievementsSectionProps {
  departmentName: string; // The department whose achievements are to be displayed
}

const API_URL = 'http://localhost:5555/api/achievementsCertification';

const PublicAchievementsSection: React.FC<PublicAchievementsSectionProps> = ({ departmentName }) => {
  const [achievements, setAchievements] = useState<AchievementsContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      setLoading(true);
      setError(null);
      if (!departmentName) {
        // This check is good, but the backend will also validate.
        setError("Department name is required to fetch achievements.");
        setLoading(false);
        return;
      }
      try {
        // --- FIX HERE: Changed 'departmentName' to 'department' and removed 'category' ---
        const response = await fetch(
          `${API_URL}?department=${encodeURIComponent(departmentName)}`
        );

        if (!response.ok) {
          const errorText = await response.text(); // Read raw text for debugging non-JSON errors
          console.error("Raw error response from server:", errorText); 
          try {
            const errorData = JSON.parse(errorText); // Try parsing as JSON
            throw new Error(errorData.details || errorData.error || `Failed to fetch achievements: ${response.statusText}`);
          } catch (jsonError) {
            // If JSON parsing fails, it's likely HTML or malformed JSON
            throw new Error(`Server returned non-JSON response (Status: ${response.status}). Details: ${errorText.substring(0, 200)}...`);
          }
        }
        
        const data: AchievementsContentItem[] = await response.json();
        setAchievements(data || []); // Backend should return an array directly
      } catch (err) {
        console.error('Error fetching public achievements:', err);
        setError(`Failed to load achievements: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, [departmentName]);

  // Conditional rendering for content inside the box
  const renderContent = () => {
    if (loading) {
      return <p className="text-center text-gray-600 p-8">Loading achievements...</p>;
    }

    if (error) {
      return <p className="text-red-600 p-4 bg-red-100 rounded-md my-4">Error: {error}</p>;
    }

    if (achievements.length === 0) {
      return <p className="text-center text-gray-500 p-8">No achievements available for {departmentName} yet.</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
        {achievements.map((item) => (
          <div key={item._id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
            <div className="relative group overflow-hidden aspect-w-16 aspect-h-9 w-full">
              {item.cover_image_url ? ( // Use item.cover_image_url as per backend model
                <a href={item.pdf_url} target="_blank" rel="noopener noreferrer" className="block">
                  <img
                    src={item.cover_image_url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </a>
              ) : (
                <div className="flex items-center justify-center bg-gray-100 text-gray-400 w-full h-full">
                  <ImageIcon className="h-16 w-16" />
                  <span className="sr-only">No Image Available</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.pdf_url && (
                  <a href={item.pdf_url} target="_blank" rel="noopener noreferrer"
                    className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full flex items-center gap-2 text-lg font-semibold shadow-lg">
                    <ExternalLink className="h-6 w-6" /> View PDF
                  </a>
                )}
              </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-[#142143] mb-2 leading-tight">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-gray-700 text-base mb-4 flex-grow line-clamp-3">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="mb-8 p-4 md:p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-[#142143]">
        Department Achievements & Certifications
      </h2>
      {renderContent()}
    </section>
  );
};

export default PublicAchievementsSection;