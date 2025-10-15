// frontend/src/components/departments/adminSection.tsx

import React, { useState, useEffect } from 'react';
import { Trash2, PlusCircle, FileText, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

export type DepartmentContentItem = {
  _id: string;
  department: string;
  category: 'Syllabus' | 'Research & Publication' | 'Achievements' | 'Study Materials' | 'Gallery';
  title: string;
  file_url?: string;
  public_id?: string;
  resource_type?: 'image' | 'raw' | 'video';
  link_url?: string;
  description?: string;
  order?: number;
  createdAt: string;
  updatedAt: string;
};

// Props for this component
interface AcademicSectionProps {
  departmentName: string;
}

// Reusable File Display Component
const FileDisplay: React.FC<{ item: DepartmentContentItem; onDelete: (id: string, category: string) => void; isDeleting: boolean }> = ({ item, onDelete, isDeleting }) => {
  const isPDF = item.file_url && item.file_url.toLowerCase().endsWith('.pdf');
  const isImage = item.resource_type === 'image';
  const isDoc = item.file_url && (item.file_url.toLowerCase().endsWith('.docx') || item.file_url.toLowerCase().endsWith('.doc'));

  const getIcon = () => {
    if (isPDF || isDoc) return <FileText className="h-5 w-5 text-red-500" />;
    if (item.link_url) return <LinkIcon className="h-5 w-5 text-blue-500" />;
    if (isImage) return <ImageIcon className="h-5 w-5 text-green-500" />;
    return <FileText className="h-5 w-5 text-gray-500" />;
  };

  const getLinkText = () => {
    if (isPDF) return 'View PDF';
    if (isDoc) return 'Download Doc';
    if (item.link_url) return 'Visit Link';
    return 'View File';
  };

  const targetUrl = item.file_url || item.link_url;

  return (
    <li key={item._id} className="flex items-center justify-between gap-3 p-2 bg-gray-50 rounded-md shadow-sm">
      <div className="flex items-center gap-3 flex-1">
        {getIcon()}
        {targetUrl ? (
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#142143] hover:text-[#ffaf00] font-medium truncate flex-1"
          >
            {item.title} ({getLinkText()})
          </a>
        ) : (
          <span className="text-[#142143] font-medium truncate flex-1">{item.title}</span>
        )}
      </div>
      <button
        onClick={() => onDelete(item._id, item.category)}
        disabled={isDeleting}
        className={`p-2 rounded-full ${isDeleting ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'} text-white transition duration-200`}
        title={`Delete ${item.title}`}
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </li>
  );
};


// Reusable Upload Form Component
interface UploadFormProps {
  departmentName: string;
  category: DepartmentContentItem['category'];
  onUploadSuccess: () => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ departmentName, category, onUploadSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const API_URL = 'http://localhost:5555/api/department-content';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!title) {
      setMessage({ text: 'Title is required.', type: 'error' });
      return;
    }

    const isFileRequired = category !== 'Study Materials';
    const isLinkRequired = category === 'Study Materials';

    if (isFileRequired && !file) {
      setMessage({ text: 'A file is required for this category.', type: 'error' });
      return;
    }
    if (isLinkRequired && !linkUrl) {
      setMessage({ text: 'A link URL is required for Study Materials.', type: 'error' });
      return;
    }
    if (isLinkRequired && file) {
      setMessage({ text: 'Please provide either a link or a file for Study Materials, not both.', type: 'error' });
      return;
    }
    if (isFileRequired && linkUrl) {
      setMessage({ text: 'Links are only for Study Materials. Please upload a file.', type: 'error' });
      return;
    }


    setUploading(true);
    const formData = new FormData();
    formData.append('departmentName', departmentName);
    formData.append('category', category);
    formData.append('title', title);
    formData.append('description', description);
    if (file) {
      formData.append('media', file);
    }
    if (linkUrl) {
      formData.append('link_url', linkUrl);
    }

    try {
      // --- CORRECT API URL: Use POST /item to add a new item ---
      const response = await fetch(`${API_URL}/item`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || `Upload failed with status ${response.status}`);
      }

      setMessage({ text: 'Content uploaded successfully!', type: 'success' });
      setTitle('');
      setDescription('');
      setFile(null);
      setLinkUrl('');
      (document.getElementById(`file-input-${category}`) as HTMLInputElement).value = '';
      onUploadSuccess();
    } catch (error) {
      console.error('Frontend Upload Error:', error);
      setMessage({ text: `Failed to upload content: ${error instanceof Error ? error.message : String(error)}`, type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border border-dashed rounded-lg bg-gray-50 mt-4">
      <h4 className="font-semibold text-[#142143] mb-3 flex items-center gap-2">
        <PlusCircle className="h-5 w-5" /> Add New {category} Item
      </h4>
      <div className="mb-3">
        <label htmlFor={`title-${category}`} className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id={`title-${category}`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
        />
      </div>
      <div className="mb-3">
        <label htmlFor={`description-${category}`} className="block text-sm font-medium text-gray-700">Description (Optional)</label>
        <textarea
          id={`description-${category}`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
        />
      </div>

      {category === 'Study Materials' ? (
        <div className="mb-3">
          <label htmlFor={`linkUrl-${category}`} className="block text-sm font-medium text-gray-700">External Link URL</label>
          <input
            type="url"
            id={`linkUrl-${category}`}
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://example.com/material.pdf"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          />
        </div>
      ) : (
        <div className="mb-3">
          <label htmlFor={`file-input-${category}`} className="block text-sm font-medium text-gray-700">Upload File ({category === 'Gallery' ? 'Image' : 'PDF/Doc'})</label>
          <input
            type="file"
            id={`file-input-${category}`}
            accept={category === 'Gallery' ? 'image/*' : '.pdf,.doc,.docx'}
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#ffaf00] file:text-white hover:file:bg-yellow-400"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={uploading}
        className={`px-6 py-2 rounded-lg font-semibold text-white transition duration-300 ease-in-out ${
          uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#142143] hover:bg-[#2e406e]'
        }`}
      >
        {uploading ? 'Uploading...' : 'Add Content'}
      </button>

      {message && (
        <p className={`mt-3 p-2 rounded text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </p>
      )}
    </form>
  );
};


const AcademicSection: React.FC<AcademicSectionProps> = ({ departmentName }) => {
  const [departmentContent, setDepartmentContent] = useState<any>(null); // State to hold the full content object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null); // For tracking deleting item

  const API_URL = 'http://localhost:5555/api/department-content';

  const fetchContent = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}?departmentName=${encodeURIComponent(departmentName)}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || `Failed to fetch content: ${response.statusText}`);
      }
      const data = await response.json();
      setDepartmentContent(data);
    } catch (err) {
      console.error('Error fetching academic content:', err);
      setError(`Failed to load content: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (departmentName) {
      fetchContent();
    }
  }, [departmentName]);

  const handleDelete = async (id: string, category: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }
    setDeletingId(id);
    try {
      const response = await fetch(`${API_URL}/item/${id}?departmentName=${encodeURIComponent(departmentName)}&category=${encodeURIComponent(category)}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || `Delete failed with status ${response.status}`);
      }
      fetchContent();
    } catch (err) {
      console.error('Delete error:', err);
      setError(`Failed to delete item: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setDeletingId(null);
    }
  };


  const Panel: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="mb-4 border rounded-lg bg-white shadow-sm">
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left px-4 py-3 font-bold text-[#142143] flex justify-between items-center focus:outline-none"
        >
          {title}
          <span>{open ? '−' : '+'}</span>
        </button>
        {open && <div className="px-4 pb-4">{children}</div>}
      </div>
    );
  };

  if (!departmentName) {
    return (
      <section className="p-6 text-center text-gray-600">
        Please select a department to manage its academic content.
      </section>
    );
  }

  if (loading) {
    return <div className="text-center p-8">Loading academic content...</div>;
  }

  if (error) {
    return <div className="text-red-600 p-4 bg-red-100 rounded-md my-4">Error: {error}</div>;
  }

  const syllabus = departmentContent?.syllabus || [];
  const research = departmentContent?.research || [];
  const achievements = departmentContent?.achievements || [];
  
  const hasAcademicContent = syllabus.length > 0 || research.length > 0 || achievements.length > 0;

  return (
    <section className="mb-8 p-4 md:p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-[#142143]">
        {departmentName} - Academic Content
      </h2>

      {!hasAcademicContent ? (
        <p className="text-gray-500">No academic content uploaded yet.</p>
      ) : (
        <>
          <Panel title="Syllabus">
            {syllabus.length === 0 ? <p className="text-gray-500">No syllabus uploaded yet.</p> : (
              <ul className="space-y-2">
                {syllabus.map((item: DepartmentContentItem) => (
                  <FileDisplay key={item._id} item={item} onDelete={(id) => handleDelete(id, 'Syllabus')} isDeleting={deletingId === item._id} />
                ))}
              </ul>
            )}
          </Panel>

          <Panel title="Research & Publications">
            {research.length === 0 ? <p className="text-gray-500">No research & publications uploaded yet.</p> : (
              <ul className="space-y-2">
                {research.map((item: DepartmentContentItem) => (
                  <FileDisplay key={item._id} item={item} onDelete={(id) => handleDelete(id, 'Research & Publication')} isDeleting={deletingId === item._id} />
                ))}
              </ul>
            )}
          </Panel>

          <Panel title="Achievements">
            {achievements.length === 0 ? <p className="text-gray-500">No achievements uploaded yet.</p> : (
              <ul className="space-y-2">
                {achievements.map((item: DepartmentContentItem) => (
                  <FileDisplay key={item._id} item={item} onDelete={(id) => handleDelete(id, 'Achievements')} isDeleting={deletingId === item._id} />
                ))}
              </ul>
            )}
          </Panel>
        </>
      )}

      <UploadForm
        departmentName={departmentName}
        category="Syllabus" // We'll need a way to select the category for upload
        onUploadSuccess={fetchContent}
      />
    </section>
  );
};

export default AcademicSection;