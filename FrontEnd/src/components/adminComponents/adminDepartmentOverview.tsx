// src/components/adminComponents/adminDepartmentOverview.tsx

import React, { useState, useEffect } from 'react';

interface AdminDepartmentOverviewProps {
  departmentName: string;
}

interface DepartmentOverviewData {
  _id: string;
  departmentName: string;
  description: string;
}

const API_URL = 'http://localhost:5555/api/department-overview';

const AdminDepartmentOverview: React.FC<AdminDepartmentOverviewProps> = ({ departmentName }) => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false); // New state to track initial load

  useEffect(() => {
    const fetchOverview = async () => {
      setLoading(true);
      setMessage(null);
      try {
        const response = await fetch(`${API_URL}?departmentName=${encodeURIComponent(departmentName)}`);
        
        if (response.status === 404) {
          // If 404 (Not Found), it means no overview exists yet.
          // This is NOT an error we need to show, but a state where the user can create one.
          setDescription(''); // Start with an empty description for a new entry
          setMessage({ text: `No existing overview found for ${departmentName}. Please add one.`, type: 'info' }); // Optional info message
        } else if (!response.ok) {
          // Handle other HTTP errors (e.g., 500 Internal Server Error)
          const errorData = await response.json();
          throw new Error(errorData.error || response.statusText);
        } else {
          // Successfully fetched existing overview
          const data: DepartmentOverviewData = await response.json();
          setDescription(data.description);
          setMessage(null); // Clear any previous messages
        }
      } catch (err) {
        // Catch network errors or errors thrown from non-404 failed responses
        setMessage({ text: `Failed to load department overview: ${err instanceof Error ? err.message : String(err)}`, type: 'error' });
        setDescription('');
      } finally {
        setLoading(false);
        setInitialLoadComplete(true); // Mark initial load as complete
      }
    };

    if (departmentName) {
      fetchOverview();
    }
  }, [departmentName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!description.trim()) {
      setMessage({ text: 'Description cannot be empty.', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST', // Use POST, backend will upsert
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ departmentName, description }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || response.statusText);
      }

      setMessage({ text: 'Department overview saved successfully!', type: 'success' });
      // Optionally re-fetch to ensure the state is fully synchronized with DB
      // Or just assume the description is now correct
    } catch (err) {
      setMessage({ text: `Failed to save description: ${err instanceof Error ? err.message : String(err)}`, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-[#142143]">Manage Overview for {departmentName}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Department Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={10} // Increased rows for better editing experience
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            disabled={loading}
            placeholder={
              loading && !initialLoadComplete // Show loading placeholder only during first fetch if no initial data
                ? "Loading existing description..."
                : initialLoadComplete && !description && !message?.text?.includes('No existing overview')
                ? "Start typing the department's overview here..." // Placeholder for new entries
                : "Enter department description..."
            }
          />
        </div>
        <button
          type="submit"
          disabled={loading || !description.trim()} // Disable if loading or description is empty
          className={`px-6 py-2 rounded-lg font-semibold text-white transition duration-300 ease-in-out ${
            loading || !description.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#142143] hover:bg-[#2e406e]'
          }`}
        >
          {loading ? 'Saving...' : 'Save Description'}
        </button>
      </form>
      {message && (
        <p className={`mt-3 p-2 rounded text-sm 
          ${message.type === 'success' ? 'bg-green-100 text-green-700' : 
            message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'} `}>
          {message.text}
        </p>
      )}
    </div>
  );
};

export default AdminDepartmentOverview;