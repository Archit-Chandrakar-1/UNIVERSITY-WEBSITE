import React, { useState, useEffect, useRef } from 'react';
import { PlusCircle, Trash2, FileText, Download, Link as LinkIcon } from 'lucide-react';

// Reusing the StudyMaterialItem type from publicStudyMaterialSection.tsx
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

interface AdminStudyMaterialSectionProps {
  departmentName: string; // The department this section is managing
}

const API_URL = 'http://localhost:5555/api/studyMaterials';

// --- Display Component for a Single Study Material Item ---
const StudyMaterialDisplay: React.FC<{ item: StudyMaterialItem; onDelete: (id: string) => void; isDeleting: boolean }> = ({ item, onDelete, isDeleting }) => {
  const isFile = item.file_url && item.file_url.toLowerCase().match(/\.(pdf|doc|docx|ppt|pptx)$/i);
  const targetUrl = item.file_url || item.link_url;

  return (
    <li key={item._id} className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm border border-gray-200">
      <div className="flex items-center gap-3 flex-1">
        {isFile ? <FileText className="h-5 w-5 text-red-500" /> : <LinkIcon className="h-5 w-5 text-blue-500" />}
        <span className="font-medium text-[#142143] truncate">{item.title}</span>
        {targetUrl && (
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 ml-2"
            title={isFile ? `Download ${item.title}` : `View ${item.title}`}
          >
            {isFile ? <Download className="h-5 w-5" /> : <LinkIcon className="h-5 w-5" />}
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


// --- Upload/Link Form Component for Study Material ---
interface StudyMaterialUploadFormProps {
  departmentName: string;
  onUploadSuccess: () => void;
}

const StudyMaterialUploadForm: React.FC<StudyMaterialUploadFormProps> = ({ departmentName, onUploadSuccess }) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!title) {
      setMessage({ text: 'Title is required.', type: 'error' });
      return;
    }
    if (!file && !linkUrl) {
      setMessage({ text: 'Either upload a file or provide an external link.', type: 'error' });
      return;
    }
    if (file && linkUrl) {
        setMessage({ text: 'Please upload either a file OR provide a link, not both.', type: 'error' });
        return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('department', departmentName);
    formData.append('title', title);
    if (file) {
      formData.append('media', file); // 'media' is the key your backend expects for file uploads
    }
    if (linkUrl) {
      formData.append('link_url', linkUrl);
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || `Upload failed with status ${response.status}`);
      }

      setMessage({ text: 'Study Material added successfully!', type: 'success' });
      setTitle('');
      setFile(null);
      setLinkUrl('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      onUploadSuccess();
    } catch (error) {
      console.error('Frontend Upload Error:', error);
      setMessage({ text: `Failed to add study material: ${error instanceof Error ? error.message : String(error)}`, type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border border-dashed rounded-lg bg-gray-50 mt-4">
      <h4 className="font-semibold text-[#142143] mb-3 flex items-center gap-2">
        <PlusCircle className="h-5 w-5" /> Add New Study Material
      </h4>
      <div className="mb-3">
        <label htmlFor="material-title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="material-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="material-file-input" className="block text-sm font-medium text-gray-700">Upload PDF/Word File (Optional)</label>
        <input
          type="file"
          id="material-file-input"
          ref={fileInputRef}
          accept=".pdf,.doc,.docx,.ppt,.pptx"
          onChange={(e) => { setFile(e.target.files ? e.target.files[0] : null); setLinkUrl(''); }} // Clear link if file is chosen
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#ffaf00] file:text-white hover:file:bg-yellow-400"
        />
      </div>

      <p className="text-center my-4 text-gray-600 font-bold">-- OR --</p>

      <div className="mb-4">
        <label htmlFor="material-link-url" className="block text-sm font-medium text-gray-700">External Link URL (Optional)</label>
        <input
          type="url"
          id="material-link-url"
          value={linkUrl}
          onChange={(e) => { setLinkUrl(e.target.value); setFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }} // Clear file if link is provided
          placeholder="https://example.com/external-resource"
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
        />
      </div>

      <button
        type="submit"
        disabled={uploading || !title || (!file && !linkUrl)} // Disable if no title and neither file nor link
        className={`px-6 py-2 rounded-lg font-semibold text-white transition duration-300 ease-in-out ${
          (uploading || !title || (!file && !linkUrl)) ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#142143] hover:bg-[#2e406e]'
        }`}
      >
        {uploading ? 'Adding Material...' : 'Add Material'}
      </button>

      {message && (
        <p className={`mt-3 p-2 rounded text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </p>
      )}
    </form>
  );
};


// --- Main AdminStudyMaterialSection Component ---
const AdminStudyMaterialSection: React.FC<AdminStudyMaterialSectionProps> = ({ departmentName }) => {
  const [materialsList, setMaterialsList] = useState<StudyMaterialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchMaterials = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}?department=${encodeURIComponent(departmentName)}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || `Failed to fetch study materials: ${response.statusText}`);
      }
      const data = await response.json();
      setMaterialsList(data);
    } catch (err) {
      console.error('Error fetching study materials:', err);
      setError(`Failed to load study materials: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (departmentName) {
      fetchMaterials();
    }
  }, [departmentName]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this study material?')) return;
    setDeletingId(id);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || `Delete failed with status ${response.status}`);
      }
      fetchMaterials(); // Re-fetch list after successful deletion
    } catch (err) {
      console.error('Delete error:', err);
      setError(`Failed to delete study material: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="mb-8 p-4 md:p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-[#142143]">
        {departmentName} - Study Materials Management
      </h2>

      {loading ? (
        <p className="text-gray-600">Loading study materials...</p>
      ) : error ? (
        <p className="text-red-600 p-3 bg-red-100 rounded-md my-4">Error: {error}</p>
      ) : (
        <>
          {materialsList.length === 0 ? (
            <p className="text-gray-500 mb-4">No study materials uploaded or linked yet for this department.</p>
          ) : (
            <ul className="space-y-3 mb-6">
              {materialsList.map((item) => (
                <StudyMaterialDisplay key={item._id} item={item} onDelete={handleDelete} isDeleting={deletingId === item._id} />
              ))}
            </ul>
          )}
          <StudyMaterialUploadForm departmentName={departmentName} onUploadSuccess={fetchMaterials} />
        </>
      )}
    </section>
  );
};

export default AdminStudyMaterialSection;