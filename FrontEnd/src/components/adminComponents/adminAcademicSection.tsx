// src/components/adminComponents/adminAcademicSection.tsx

import React, { useState, useEffect, useRef } from 'react';
import { PlusCircle, Trash2, Edit, FileText, ImageIcon, X, ExternalLink } from 'lucide-react';

// --- Type Definition for Academic Content Item ---
// This type strictly defines the data structure expected from the backend for an academic item.
export type AcademicContentItem = {
  _id: string;
  department: string;
  title: string;
  description?: string;
  pdf_url: string;
  pdf_public_id: string;
  cover_image_url: string;
  cover_image_public_id: string;
  order?: number;
  createdAt: string;
  updatedAt: string;
};

interface AdminAcademicSectionProps {
  departmentName: string; // The department this section is managing (passed from parent)
}

// --- API Endpoint ---
// Dedicated API endpoint for academic
const API_URL = 'http://localhost:5555/api/department-content';

// --- Reusable Content Display Component ---
const ContentDisplay: React.FC<{
  item: AcademicContentItem;
  onEdit: (item: AcademicContentItem) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}> = ({ item, onEdit, onDelete, isDeleting }) => {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-md bg-white border border-gray-200 aspect-video">
      {/* Cover Image */}
      <img
        src={item.cover_image_url}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />

      {/* Overlay for actions and title */}
      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
        <h3 className="text-white text-lg font-bold text-center mb-2 line-clamp-2">{item.title}</h3>
        {item.pdf_url && (
          <a
            href={item.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition"
            title={`View PDF: ${item.title}`}
          >
            <ExternalLink className="h-4 w-4" /> View PDF
          </a>
        )}
      </div>

      {/* Action Buttons (Edit/Delete) always visible on hover */}
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => onEdit(item)}
          className="p-2 rounded-full bg-white text-blue-600 hover:bg-gray-100 transition duration-200"
          title="Edit Academic Item"
        >
          <Edit className="h-5 w-5" />
        </button>
        <button
          onClick={() => onDelete(item._id)}
          disabled={isDeleting}
          className={`p-2 rounded-full ${isDeleting ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'} text-white transition duration-200`}
          title="Delete Academic Item"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};


// --- Form Component for Add/Edit Academic Items ---
interface AcademicFormProps {
  departmentName: string;
  onFormSuccess: () => void;
  itemToEdit?: AcademicContentItem | null;
  onCancel: () => void; // onCancel is now required
}

// Broaden types for form state to support File during create/edit
type AcademicFormState = Omit<AcademicContentItem, 'pdf_url' | 'cover_image_url' | 'department'> & {
  department: string; // Ensure department is always a string
  pdf_file_upload?: File; // Temporary field for new PDF file upload
  cover_image_file_upload?: File; // Temporary field for new cover image file upload
  // Existing URLs are kept as strings if not replaced by a new File
  pdf_url?: string;
  cover_image_url?: string;
};

const AcademicForm: React.FC<AcademicFormProps> = ({ departmentName, onFormSuccess, itemToEdit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<AcademicFormState>>(() => {
    // Initialize form with existing item data or defaults for new item
    if (itemToEdit) {
      return { ...itemToEdit, department: departmentName };
    } else {
      return { department: departmentName, title: '', description: '', order: 0 };
    }
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const pdfInputRef = useRef<HTMLInputElement>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Reset form state when itemToEdit or departmentName changes
    if (itemToEdit) {
      setFormData({ ...itemToEdit, department: departmentName });
    } else {
      setFormData({ department: departmentName, title: '', description: '', order: 0 });
    }
    setMessage(null);
    if (pdfInputRef.current) pdfInputRef.current.value = '';
    if (coverImageInputRef.current) coverImageInputRef.current.value = '';
  }, [itemToEdit, departmentName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'pdf_file_upload' | 'cover_image_file_upload') => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }));
    } else {
      setFormData(prev => {
        const newState = { ...prev };
        delete newState[field]; // Remove file if none selected
        return newState;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const isEdit = !!itemToEdit;
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `${API_URL}/${itemToEdit._id}` : API_URL; // Corrected URL for POST

    // --- Validation ---
    if (!formData.title) {
      setMessage({ text: 'Title is required.', type: 'error' });
      return;
    }

    const hasNewPdf = !!formData.pdf_file_upload;
    const hasExistingPdf = !!itemToEdit?.pdf_url;
    if (!hasNewPdf && !hasExistingPdf) {
      setMessage({ text: 'A PDF file is required.', type: 'error' });
      return;
    }

    const hasNewImage = !!formData.cover_image_file_upload;
    const hasExistingImage = !!itemToEdit?.cover_image_url;
    if (!hasNewImage && !hasExistingImage) {
      setMessage({ text: 'A Cover Image is required.', type: 'error' });
      return;
    }
    // --- End Validation ---

    setUploading(true);
    const payload = new FormData();
    payload.append('department', departmentName); // Always send current department name
    payload.append('title', formData.title || '');
    if (formData.description) payload.append('description', formData.description);
    if (formData.order !== undefined) payload.append('order', String(formData.order));
    
    // Append PDF and image files only if they are new or replaced
    if (formData.pdf_file_upload) {
      payload.append('pdfFile', formData.pdf_file_upload);
    }
    if (formData.cover_image_file_upload) {
      payload.append('imageFile', formData.cover_image_file_upload);
    }

    try {
      const response = await fetch(url, { method, body: payload });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || `Operation failed with status ${response.status}`);
      }
      onFormSuccess(); // Call to re-fetch data in parent
      setMessage({ text: `Academic item ${isEdit ? 'updated' : 'added'} successfully!`, type: 'success' });
      onCancel(); // Close modal on success
    } catch (err) {
      console.error('Submission error:', err);
      setMessage({ text: `Failed to ${isEdit ? 'update' : 'add'} academic item: ${err instanceof Error ? err.message : String(err)}`, type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-xl">
      <h4 className="font-bold text-xl text-[#142143] mb-4 flex items-center gap-2">
        {itemToEdit ? <Edit className="h-6 w-6" /> : <PlusCircle className="h-6 w-6" />}
        {itemToEdit ? 'Edit Academic Item' : 'Add New Academic Item'}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div className="mb-3 md:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            required
          />
        </div>
        
        {/* Description */}
        <div className="md:col-span-2 mb-3">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description (Optional):</label>
          <textarea
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
        </div>

        {/* PDF File Input */}
        <div className="mb-3">
          <label htmlFor="pdf-file-upload" className="block text-sm font-medium text-gray-700">Upload PDF File:</label>
          <input
            type="file"
            id="pdf-file-upload"
            name="pdfFile"
            accept=".pdf"
            onChange={(e) => handleFileChange(e, 'pdf_file_upload')}
            ref={pdfInputRef}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 hover:file:bg-blue-200"
          />
          {itemToEdit?.pdf_url && !formData.pdf_file_upload && (
            <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
              Current PDF: <a href={itemToEdit.pdf_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline truncate">{itemToEdit.pdf_url.split('/').pop()}</a>
            </p>
          )}
        </div>
        {/* Cover Image Input */}
        <div className="mb-3">
          <label htmlFor="cover-image-file-upload" className="block text-sm font-medium text-gray-700">Upload Cover Image:</label>
          <input
            type="file"
            id="cover-image-file-upload"
            name="imageFile"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'cover_image_file_upload')}
            ref={coverImageInputRef}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 hover:file:bg-green-200"
          />
          {itemToEdit?.cover_image_url && !formData.cover_image_file_upload && (
            <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
              Current Image: <a href={itemToEdit.cover_image_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline truncate">{itemToEdit.cover_image_url.split('/').pop()}</a>
            </p>
          )}
        </div>

        {/* Order Field */}
        <div className="mb-3 md:col-span-2">
          <label htmlFor="order" className="block text-sm font-medium text-gray-700">Order (0 = First):</label>
          <input
            type="number"
            id="order"
            name="order"
            value={formData.order?.toString() || '0'}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          />
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          disabled={uploading}
          className={`px-6 py-2 rounded-lg font-semibold text-white transition duration-300 ease-in-out ${
            uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#142143] hover:bg-[#2e406e]'
          }`}
        >
          {uploading ? (itemToEdit ? 'Updating...' : 'Adding...') : (itemToEdit ? 'Save Changes' : 'Add Academic Item')}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 rounded-lg font-semibold bg-gray-600 text-white hover:bg-gray-700 transition duration-300 ease-in-out"
        >
          Cancel
        </button>
      </div>
      {message && <p className={`mt-3 p-2 rounded text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message.text}</p>}
    </form>
  );
};


// --- Main AdminAcademicSection Component ---
const AdminAcademicSection: React.FC<AdminAcademicSectionProps> = ({ departmentName }) => {
  const [contentItems, setContentItems] = useState<AcademicContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<AcademicContentItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const fetchContent = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}?department=${encodeURIComponent(departmentName)}`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Raw error response from server:", errorText); 
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.details || errorData.error || `Failed to fetch academic content: ${response.statusText}`);
        } catch (jsonError) {
          throw new Error(`Server returned non-JSON response (Status: ${response.status}). Details: ${errorText.substring(0, 200)}...`);
        }
      }
      
      const data: AcademicContentItem[] = await response.json();
      setContentItems(data);
    } catch (err) {
      console.error('Error fetching academic content:', err);
      setError(`Failed to load academic content: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (departmentName) {
      fetchContent();
    }
  }, [departmentName]);

  const resetFormAndCloseModal = () => {
    setEditingItem(null);
    setIsAdding(false);
  };

  const handleEditClick = (item: AcademicContentItem) => {
    setEditingItem(item);
    setIsAdding(false);
  };

  const handleDeleteItem = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this academic item? This action cannot be undone.')) return;
    
    setDeletingId(id);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || `Delete failed: ${response.statusText}`);
      }
      fetchContent();
    } catch (err) {
      console.error('Delete item error:', err);
      setError(`Failed to delete item: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-[#142143]">
        {departmentName} - Academic Content Management
      </h2>
      
      {/* "Add New Academic Item" button */}
      {!isAdding && !editingItem && (
        <button
          onClick={() => setIsAdding(true)}
          className="mb-6 px-5 py-2 bg-[#ffaf00] text-white rounded-md hover:bg-yellow-600 transition duration-200 flex items-center gap-2 font-semibold"
        >
          <PlusCircle className="h-5 w-5" /> Add New Academic Item
        </button>
      )}

      {/* Modal for Add/Edit Form */}
      {(isAdding || editingItem) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full overflow-y-auto max-h-[90vh] relative">
            <button
              onClick={resetFormAndCloseModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
              title="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <AcademicForm
              departmentName={departmentName}
              onFormSuccess={() => {
                fetchContent();
                resetFormAndCloseModal();
              }}
              itemToEdit={editingItem}
              onCancel={resetFormAndCloseModal}
            />
          </div>
        </div>
      )}

      {/* Display List of Academic Items */}
      <h3 className="text-xl font-bold mt-8 mb-4 text-[#142143]">Existing Academic Content</h3>
      {loading ? (
        <p className="text-gray-500 text-center p-4">Loading academic content...</p>
      ) : error ? (
        <p className="text-red-600 p-4 bg-red-100 rounded-md my-4">Error: {error}</p>
      ) : (
        <>
          {contentItems.length === 0 ? (
            <p className="text-gray-500 text-center p-4">No academic content uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {contentItems.map(item => (
                <ContentDisplay
                  key={item._id}
                  item={item}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteItem}
                  isDeleting={deletingId === item._id}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default AdminAcademicSection;