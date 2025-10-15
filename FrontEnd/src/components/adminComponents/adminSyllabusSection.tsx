// src/components/adminComponents/adminSyllabusSection.tsx

import React, { useState, useEffect, useRef } from 'react';
import { PlusCircle, Trash2, FileText, Download } from 'lucide-react';

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

interface AdminSyllabusSectionProps {
  departmentName: string;
}

const API_URL = 'http://localhost:5555/api/syllabus';

// --- Display Component for a Single Syllabus Item ---
const SyllabusDisplay: React.FC<{ item: SyllabusItem; onDelete: (id: string) => void; isDeleting: boolean }> = ({ item, onDelete, isDeleting }) => {
  return (
    <li key={item._id} className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm border border-gray-200">
      <div className="flex items-center gap-3 flex-1">
        <FileText className="h-5 w-5 text-red-500" />
        <span className="font-medium text-[#142143] truncate">{item.title}</span>
        {item.file_url && (
          <a href={item.file_url} download={true} className="text-blue-600 hover:text-blue-800" title={`Download ${item.title}`}>
            <Download className="h-5 w-5" />
          </a>
        )}
      </div>
      <button
        onClick={() => onDelete(item._id)}
        disabled={isDeleting}
        className={`p-2 rounded-full ${isDeleting ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'} text-white transition duration-200`}
        title={`Delete ${item.title}`}
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </li>
  );
};


// --- Upload Form Component for Syllabus ---
interface SyllabusUploadFormProps {
  departmentName: string;
  onUploadSuccess: () => void;
}

const SyllabusUploadForm: React.FC<SyllabusUploadFormProps> = ({ departmentName, onUploadSuccess }) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!title || !file) {
      setMessage({ text: 'Title and file are required.', type: 'error' });
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('department', departmentName); // Match backend field name
    formData.append('title', title);
    formData.append('media', file);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || `Upload failed with status ${response.status}`);
      }

      setMessage({ text: 'Syllabus uploaded successfully!', type: 'success' });
      setTitle('');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      onUploadSuccess();
    } catch (error) {
      console.error('Frontend Upload Error:', error);
      setMessage({ text: `Failed to upload syllabus: ${error instanceof Error ? error.message : String(error)}`, type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border border-dashed rounded-lg bg-gray-50 mt-4">
      <h4 className="font-semibold text-[#142143] mb-3 flex items-center gap-2">
        <PlusCircle className="h-5 w-5" /> Add New Syllabus PDF
      </h4>
      <div className="mb-3">
        <label htmlFor="syllabus-title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="syllabus-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="syllabus-file-input" className="block text-sm font-medium text-gray-700">Upload PDF File</label>
        <input
          type="file"
          id="syllabus-file-input"
          ref={fileInputRef}
          accept=".pdf"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          required
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#ffaf00] file:text-white hover:file:bg-yellow-400"
        />
      </div>

      <button
        type="submit"
        disabled={uploading || !file}
        className={`px-6 py-2 rounded-lg font-semibold text-white transition duration-300 ease-in-out ${
          uploading || !file ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#142143] hover:bg-[#2e406e]'
        }`}
      >
        {uploading ? 'Uploading...' : 'Add Syllabus'}
      </button>

      {message && (
        <p className={`mt-3 p-2 rounded text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </p>
      )}
    </form>
  );
};


// --- Main AdminSyllabusSection Component ---
const AdminSyllabusSection: React.FC<AdminSyllabusSectionProps> = ({ departmentName }) => {
  const [syllabusList, setSyllabusList] = useState<SyllabusItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const API_URL = 'http://localhost:5555/api/syllabus';

  const fetchSyllabus = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}?department=${encodeURIComponent(departmentName)}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || `Failed to fetch syllabus: ${response.statusText}`);
      }
      const data = await response.json();
      setSyllabusList(data || []);
    } catch (err) {
      console.error('Error fetching syllabus:', err);
      setError(`Failed to load syllabus: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (departmentName) {
      fetchSyllabus();
    }
  }, [departmentName]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this syllabus?')) return;
    setDeletingId(id);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || `Delete failed with status ${response.status}`);
      }
      fetchSyllabus();
    } catch (err) {
      console.error('Delete error:', err);
      setError(`Failed to delete syllabus: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="mb-8 p-4 md:p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-[#142143]">
        {departmentName} - Syllabus Management
      </h2>

      {loading ? (
        <p className="text-gray-600">Loading syllabus...</p>
      ) : error ? (
        <p className="text-red-600 p-3 bg-red-100 rounded-md my-4">Error: {error}</p>
      ) : (
        <>
          {syllabusList.length === 0 ? (
            <p className="text-gray-500 mb-4">No syllabus documents uploaded yet.</p>
          ) : (
            <ul className="space-y-3 mb-6">
              {syllabusList.map((item) => (
                <SyllabusDisplay key={item._id} item={item} onDelete={handleDelete} isDeleting={deletingId === item._id} />
              ))}
            </ul>
          )}
          <SyllabusUploadForm departmentName={departmentName} onUploadSuccess={fetchSyllabus} />
        </>
      )}
    </section>
  );
};

export default AdminSyllabusSection;