// src/components/adminComponents/adminFacultyDirectory.tsx

import React, { useState, useEffect, useRef } from 'react';
import { PlusCircle, Trash2, Edit, User, Mail, Phone, UploadCloud } from 'lucide-react';

interface FacultyItem {
  _id: string;
  department: string;
  name: string;
  position: string;
  email: string;
  phone?: string;
  photo_url?: string;
  public_id?: string;
  details?: string;
  order?: number;
}

interface AdminFacultyDirectoryProps {
  departmentName: string;
}

const API_URL = 'http://localhost:5555/api/faculty';

// Extend form state to support local File before upload
type FacultyFormState = Partial<FacultyItem> & {
  photo?: File;
};

const AdminFacultyDirectory: React.FC<AdminFacultyDirectoryProps> = ({ departmentName }) => {
  const [faculty, setFaculty] = useState<FacultyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<FacultyFormState>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Data Fetching ---
  const fetchFaculty = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?department=${encodeURIComponent(departmentName)}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch faculty: ${response.statusText}`);
      }
      setFaculty(await response.json());
    } catch (err) {
      setError(`Failed to load faculty directory: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (departmentName) {
      fetchFaculty();
      setFormData({}); // Clear form when department changes
    }
  }, [departmentName]);

  // --- Form Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.position || !formData.email) {
      setError("Please fill in Name, Position, and Email.");
      return;
    }
    setLoading(true);

    const data = new FormData();
    data.append('department', departmentName);
    data.append('name', formData.name);
    data.append('position', formData.position);
    data.append('email', formData.email);
    if (formData.phone) data.append('phone', formData.phone);
    if (formData.details) data.append('details', formData.details);
    if (formData.photo) data.append('photo', formData.photo); // The file upload

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      setFormData({});
      setIsAdding(false);
      fetchFaculty();
    } catch (err) {
      setError(`Failed to add faculty: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this faculty member?')) return;
    setDeletingId(id);
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`Delete failed: ${response.statusText}`);
      }
      fetchFaculty();
    } catch (err) {
      setError(`Failed to delete faculty: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setDeletingId(null);
    }
  };

  if (!departmentName) return <p className="p-6 text-center text-gray-600">Select a department to manage faculty.</p>;
  if (loading) return <div className="text-center p-8">Loading faculty directory...</div>;
  if (error) return <div className="text-red-600 p-4 bg-red-100 rounded-md my-4">Error: {error}</div>;

  return (
    <section className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-[#142143]">
        {departmentName} - Faculty Directory
      </h2>

      {/* Add New Faculty Button */}
      <button
        onClick={() => setIsAdding(!isAdding)}
        className="mb-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-200 flex items-center gap-2"
      >
        <PlusCircle className="h-5 w-5" /> {isAdding ? 'Cancel' : 'Add New Faculty'}
      </button>

      {/* Add/Edit Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="p-4 border border-dashed rounded-lg bg-gray-50 mb-6">
          <h3 className="text-xl font-semibold mb-4">Add Faculty Member</h3>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="name" placeholder="Name" onChange={handleInputChange} required className="p-2 border rounded" />
            <input type="text" name="position" placeholder="Position (e.g., HOD)" onChange={handleInputChange} required className="p-2 border rounded" />
            <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required className="p-2 border rounded" />
            <input type="tel" name="phone" placeholder="Phone (Optional)" onChange={handleInputChange} className="p-2 border rounded" />
            <input type="file" name="photo" accept="image/*" onChange={handleFileChange} ref={fileInputRef} required className="col-span-2 p-2 border rounded bg-white" />
            <textarea name="details" placeholder="Detailed Bio/Message" onChange={handleInputChange} rows={3} className="col-span-2 p-2 border rounded" />
          </div>
          <button type="submit" disabled={loading} className="mt-4 px-4 py-2 bg-[#142143] text-white rounded-md hover:bg-[#2e406e] transition">
            Add Member
          </button>
        </form>
      )}

      {/* Faculty List */}
      <h3 className="text-xl font-bold mt-8 mb-4 text-[#142143]">Existing Faculty ({faculty.length})</h3>
      {faculty.length === 0 ? (
        <p className="text-gray-500">No faculty members found for this department.</p>
      ) : (
        <div className="space-y-4">
          {faculty.map((member) => (
            <div key={member._id} className="bg-white border p-4 rounded-lg flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <img src={member.photo_url || 'https://via.placeholder.com/64x64.png?text=AC'} alt={member.name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <p className="font-bold text-lg text-[#142143]">{member.name}</p>
                  <p className="text-gray-600 text-sm">{member.position}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700" title="Edit">
                  <Edit className="h-5 w-5" />
                </button>
                <button onClick={() => handleDelete(member._id)} disabled={deletingId === member._id} className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700" title="Delete">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminFacultyDirectory;