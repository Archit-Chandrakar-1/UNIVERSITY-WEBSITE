// frontend/src/components/ProgrammesTable.tsx // Note: Consider placing this in a 'public' or 'display' components folder

import React, { useState, useEffect } from 'react';

// --- Type Definition (matching backend ProgrammeItem) ---
export interface ProgrammeItem { // Renamed from Program to ProgrammeItem for clarity and consistency
  _id: string; // Added _id as it comes from the backend
  department: string; // Added department as it's part of the data
  name: string; // Name of the Programs Offered
  duration: string;
  level: string;
  entry_qualification: string; // Renamed from 'entry' to match backend
  fees_semester: string; // Renamed from 'fees' to match backend
  order?: number; // Optional, for sorting
  createdAt?: string; // Optional, not usually displayed
  updatedAt?: string; // Optional, not usually displayed
}

interface ProgrammesTableProps {
  departmentName: string; // The department whose programs are to be displayed
  title?: string; // Optional title for the section
}

const fields = [
  { key: 'name', label: 'Name of the Programs Offered' },
  { key: 'duration', label: 'Duration' },
  { key: 'level', label: 'Level' },
  { key: 'entry_qualification', label: 'Entry Qualification' }, // Updated key
  { key: 'fees_semester', label: 'Fees/Semester' }, // Updated key
];

const ProgrammesTable: React.FC<ProgrammesTableProps> = ({ departmentName, title = "Programmes Offered" }) => {
  const [programs, setPrograms] = useState<ProgrammeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'http://localhost:5555/api/programmes'; // Your backend API URL

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      setError(null);
      if (!departmentName) {
        setError("Department name is required to fetch programmes.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_URL}?department=${encodeURIComponent(departmentName)}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || errorData.error || `Failed to fetch programmes: ${response.statusText}`);
        }
        const data: ProgrammeItem[] = await response.json();
        setPrograms(data);
      } catch (err) {
        console.error('Error fetching programmes:', err);
        setError(`Failed to load programmes: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, [departmentName]); // Re-fetch whenever the departmentName changes

  if (loading) {
    return (
      <section className="mb-8 px-1 sm:px-6 md:px-12 mt-8">
        <h2 className="text-2xl font-bold mb-3 text-[#142143]">{title}</h2>
        <p className="text-gray-600">Loading programmes...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-8 px-1 sm:px-6 md:px-12 mt-8">
        <h2 className="text-2xl font-bold mb-3 text-[#142143]">{title}</h2>
        <p className="text-red-600 p-3 bg-red-50 rounded">Error: {error}</p>
      </section>
    );
  }

  if (programs.length === 0) {
    return (
      <section className="mb-8 px-1 sm:px-6 md:px-12 mt-8">
        <h2 className="text-2xl font-bold mb-3 text-[#142143]">{title}</h2>
        <p className="text-gray-500">No programmes currently listed for {departmentName}.</p>
      </section>
    );
  }

  return (
    <section className="mb-8 px-1 sm:px-6 md:px-12 mt-8">
      <h2 className="text-2xl font-bold mb-3 text-[#142143]">{title}</h2>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white shadow rounded overflow-hidden"> {/* Added overflow-hidden */}
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-200 text-[#142143] font-semibold text-base">
            <tr>
              {fields.map(field => (
                <th key={field.key} className="border px-2 py-2 text-left">{field.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {programs.map((p, idx) => (
              <tr key={p._id || idx} className="hover:bg-gray-50"> {/* Use p._id for key */}
                {fields.map(field => (
                  <td key={field.key} className="border px-2 py-2 text-sm">{(p as any)[field.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: Two-column label-value pairs per program */}
      <div className="md:hidden">
        <div className="bg-white shadow rounded divide-y">
          {programs.map((p, i) => (
            <div key={p._id || i} className={`py-2 px-2`}> {/* Use p._id for key */}
              {fields.map(field => (
                <div key={field.key} className="grid grid-cols-2 items-center text-xs py-1">
                  <span className="font-semibold text-[#142143] pr-2">{field.label}</span>
                  <span className="break-words pl-2 text-gray-700">{(p as any)[field.key]}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgrammesTable;