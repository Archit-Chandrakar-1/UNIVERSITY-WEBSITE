// src/components/adminComponents/adminProgrammesTable.tsx

import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Edit } from 'lucide-react'; // Icons

// --- Type Definition for Programme ---
export interface ProgrammeItem {
  _id: string;
  department: string;
  name: string;
  duration: string;
  level: string;
  entry_qualification: string;
  fees_semester: string;
  order?: number;
  createdAt: string;
  updatedAt: string;
}

interface AdminProgrammesTableProps {
  departmentName: string; // The department this section is managing (passed from dashboard)
}

// --- Fields configuration for table headers and form inputs ---
const programmeFields = [
  { key: 'name', label: 'Name of the Programs Offered', type: 'text' },
  { key: 'duration', label: 'Duration', type: 'text' },
  { key: 'level', label: 'Level', type: 'text' },
  { key: 'entry_qualification', label: 'Entry Qualification', type: 'textarea' },
  { key: 'fees_semester', label: 'Fees/Semester', type: 'text' },
];

// --- Programme Management Component ---
const AdminProgrammesTable: React.FC<AdminProgrammesTableProps> = ({ departmentName }) => {
  const [programs, setPrograms] = useState<ProgrammeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false); // State to control add form visibility
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingProgramme, setEditingProgramme] = useState<ProgrammeItem | null>(null); // State for the programme being edited

  // API URL - Ensure this matches your backend
  const API_URL = 'http://localhost:5555/api/programmes';

  // State for form data (used for both Add and Edit)
  const [formData, setFormData] = useState<Partial<ProgrammeItem>>({});

  // --- Fetch Programs Function ---
  const fetchProgrammes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}?department=${encodeURIComponent(departmentName)}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || `Failed to fetch programs: ${response.statusText}`);
      }
      setPrograms(await response.json());
    } catch (err) {
      console.error('Error fetching programs:', err);
      setError(`Failed to load programmes: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  // --- Initial Fetch on Component Mount and Department Name Change ---
  useEffect(() => {
    fetchProgrammes();
  }, [departmentName]);

  // --- Form Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ name: '', duration: '', level: '', entry_qualification: '', fees_semester: '', order: 0 });
    setEditingProgramme(null);
    setIsAdding(false);
  };

  const handleEditClick = (programme: ProgrammeItem) => {
    setEditingProgramme(programme);
    // Populate formData state with the current program details for the modal
    setFormData({
      ...programme,
      order: programme.order !== undefined ? programme.order : 0 // Ensure order is a number
    });
  };

  // --- Add/Update Programme Submission ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const method = editingProgramme ? 'PUT' : 'POST';
    const url = editingProgramme ? `${API_URL}/${editingProgramme._id}` : API_URL;

    // Final payload verification
    if (!formData.name || !formData.duration || !formData.level || !formData.entry_qualification || !formData.fees_semester) {
      setError('All programme fields are required.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        department: departmentName, // Ensure department is always included
        order: formData.order === undefined ? 0 : Number(formData.order),
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || `${method} operation failed: ${response.statusText}`);
      }

      resetForm();
      fetchProgrammes(); // Refresh data
    } catch (err) {
      console.error(`Error ${method} programme:`, err);
      setError(`Failed to ${method === 'POST' ? 'add' : 'update'} programme: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  // --- Handle Delete Programme ---
  const handleDeleteProgramme = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this programme?')) {
      return;
    }
    setDeletingId(id);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            // Note: Authorization token should be included here if the route is protected
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || `Delete failed with status ${response.status}`);
      }

      fetchProgrammes(); // Refresh list
    } catch (err) {
      console.error('Delete programme error:', err);
      setError(`Failed to delete programme: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setDeletingId(null);
    }
  };

  // --- Render Functions ---

  const renderProgrammeForm = (isEdit: boolean) => (
    <form onSubmit={handleSubmit} className="p-4 border border-dashed rounded-lg bg-gray-50 mt-4">
      <h4 className="font-semibold text-[#142143] mb-3 flex items-center gap-2">
        {isEdit ? <Edit className="h-5 w-5" /> : <PlusCircle className="h-5 w-5" />}
        {isEdit ? 'Edit Programme' : 'Add New Programme'}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {programmeFields.map(field => (
          <div key={field.key} className="mb-3">
            <label htmlFor={field.key} className="block text-sm font-medium text-gray-700">
              {field.label}:
            </label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.key}
                name={field.key}
                value={(formData as any)[field.key] || ''}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm p-2"
                required
              />
            ) : (
              <input
                type={field.type}
                id={field.key}
                name={field.key}
                value={(formData as any)[field.key] || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm p-2"
                required
              />
            )}
          </div>
        ))}
        {/* Order field */}
        <div className="mb-3">
          <label htmlFor="order" className="block text-sm font-medium text-gray-700">
            Order (0 = First):
          </label>
          <input
            type="number"
            id="order"
            name="order"
            value={(formData as any).order?.toString() || '0'}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm p-2"
          />
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 rounded-lg font-semibold text-white transition duration-300 ease-in-out ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#142143] hover:bg-[#2e406e]'
          }`}
        >
          {loading ? (isEdit ? 'Updating...' : 'Adding...') : (isEdit ? 'Save Changes' : 'Add Programme')}
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-2 rounded-lg font-semibold bg-gray-600 text-white hover:bg-gray-700 transition duration-300 ease-in-out"
          >
            Cancel Edit
          </button>
        )}
      </div>
      {error && <p className="text-red-600 p-3 bg-red-100 rounded-md mt-4">Error: {error}</p>}
    </form>
  );

  if (!departmentName) {
    return (
      <section className="p-6 text-center text-gray-600">
        Please select a department to manage its programmes offered.
      </section>
    );
  }

  if (loading) {
    return <div className="text-center p-8">Loading programmes...</div>;
  }

  return (
    <section className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-[#142143]">
        {departmentName} - Programme Management
      </h2>

      {/* Add New Programme Button & Form */}
      {editingProgramme ? renderProgrammeForm(true) : (
        <>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="mb-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-200"
          >
            {isAdding ? 'Cancel Add Programme' : 'Add New Programme'}
          </button>
          {isAdding && renderProgrammeForm(false)}
        </>
      )}


      {/* Programmes List (Table for Desktop, Cards for Mobile) */}
      {programs.length === 0 ? (
        <p className="text-gray-500 mt-4">No programmes added yet for this department.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white shadow rounded overflow-hidden mb-8 mt-4">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-200 text-[#142143] font-semibold text-base">
                <tr>
                  {programmeFields.map(field => (
                    <th key={field.key} className="py-3 px-4 border-b">
                      {field.label}
                    </th>
                  ))}
                  <th className="py-3 px-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((p) => (
                  <tr key={p._id} className="border-b hover:bg-gray-50">
                    {programmeFields.map(field => (
                      <td key={field.key} className="border-r px-4 py-2 text-sm">
                        {(p as any)[field.key]}
                      </td>
                    ))}
                    <td className="px-4 py-2 text-center flex justify-center gap-2">
                      <button
                        onClick={() => handleEditClick(p)}
                        className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition duration-200"
                        title="Edit Programme"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProgramme(p._id)}
                        disabled={deletingId === p._id}
                        className={`p-2 rounded-full ${deletingId === p._id ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'} text-white transition duration-200`}
                        title="Delete Programme"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: Cards */}
          <div className="md:hidden mt-4">
            {programs.map((p) => (
              <div key={p._id} className="bg-white shadow rounded divide-y border border-gray-200 p-3 mb-4">
                <h3 className="text-lg font-bold text-[#142143] mb-2">{p.name}</h3>
                {programmeFields.filter(f => f.key !== 'name').map(field => (
                  <div key={field.key} className="grid grid-cols-2 items-center text-xs py-1">
                    <span className="font-semibold text-gray-700">{field.label}</span>
                    <span className="break-words text-gray-600">{(p as any)[field.key]}</span>
                  </div>
                ))}
                <div className="mt-4 pt-3 border-t border-gray-200 flex justify-end gap-2">
                  <button
                    onClick={() => setEditingProgramme(p)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProgramme(p._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal is now rendered inline using conditional rendering of the form */}
      {/* The form acts as a self-contained modal/form component */}
      {editingProgramme && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
            <form onSubmit={handleSubmit}>
              <h4 className="font-semibold text-[#142143] mb-3 flex items-center gap-2">
                Edit Programme
              </h4>
              {programmeFields.map(field => (
                <div key={field.key} className="mb-3">
                  <label htmlFor={`edit-${field.key}`} className="block text-sm font-medium text-gray-700">
                    {field.label}:
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={`edit-${field.key}`}
                      name={field.key}
                      value={(editingProgramme as any)[field.key] || ''}
                      onChange={(e) => setEditingProgramme({ ...editingProgramme, [e.target.name]: e.target.value })}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm p-2"
                      required
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={`edit-${field.key}`}
                      name={field.key}
                      value={(editingProgramme as any)[field.key] || ''}
                      onChange={(e) => setEditingProgramme({ ...editingProgramme, [e.target.name]: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm p-2"
                      required
                    />
                  )}
                </div>
              ))}
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-2 rounded-lg font-semibold text-white transition duration-300 ease-in-out ${
                    loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#142143] hover:bg-[#2e406e]'
                  }`}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProgramme(null)}
                  className="px-6 py-2 rounded-lg font-semibold bg-gray-600 text-white hover:bg-gray-700 transition duration-300 ease-in-out"
                >
                  Cancel Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminProgrammesTable;