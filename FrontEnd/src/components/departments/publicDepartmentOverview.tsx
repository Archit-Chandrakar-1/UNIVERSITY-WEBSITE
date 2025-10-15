// src/components/departments/publicDepartmentOverview.tsx

import React, { useState, useEffect } from 'react';

interface PublicDepartmentOverviewProps {
  departmentName: string;
}

interface DepartmentOverviewData {
  _id: string;
  departmentName: string;
  description: string;
}

const API_URL = 'http://localhost:5555/api/department-overview';

const PublicDepartmentOverview: React.FC<PublicDepartmentOverviewProps> = ({ departmentName }) => {
  const [overview, setOverview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOverview = async () => {
      setLoading(true);
      setError(null); // Clear previous errors
      setOverview(null); // Clear previous overview

      try {
        const response = await fetch(`${API_URL}?departmentName=${encodeURIComponent(departmentName)}`);
        
        if (response.status === 404) {
          // If 404, it means no overview exists yet. This is not a fatal error for public view.
          setOverview('No detailed overview available for this department yet. Please check back later!');
          setError(null); // Ensure no error message is shown for 404
        } else if (!response.ok) {
          // Handle other HTTP errors (e.g., 500 Internal Server Error)
          const errorData = await response.json();
          throw new Error(errorData.error || response.statusText);
        } else {
          // Successfully fetched existing overview
          const data: DepartmentOverviewData = await response.json();
          setOverview(data.description);
        }
      } catch (err) {
        // Catch network errors or errors thrown from non-404 failed responses
        setError(`Failed to load department overview: ${err instanceof Error ? err.message : String(err)}`);
        setOverview(null); // Ensure no old overview is displayed if there's an error
      } finally {
        setLoading(false);
      }
    };

    if (departmentName) {
      fetchOverview();
    }
  }, [departmentName]); // Dependency array to re-run when departmentName changes

  if (loading) {
    return <p className="text-gray-600 p-4">Loading department overview...</p>;
  }

  // Display error message if a true error occurred (not a 404)
  if (error) {
    return <p className="text-red-600 p-4 bg-red-100 rounded-md my-4">Error: {error}</p>;
  }

  // Display the overview text (which might be the "not available yet" message or actual description)
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-[#142143]">About {departmentName}</h2>
      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap"> {/* Added whitespace-pre-wrap */}
        {overview}
      </p>
    </div>
  );
};

export default PublicDepartmentOverview;