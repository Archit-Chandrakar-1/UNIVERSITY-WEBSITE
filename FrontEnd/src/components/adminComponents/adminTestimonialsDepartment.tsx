// src/components/adminComponents/adminTestimonialsDepartment.tsx

import React, { useState, useEffect } from 'react';
import { Quote, X, Edit2, PlusCircle } from 'lucide-react';

export type DepartmentTestimonialItem = {
  _id: string;
  department: string;
  quote: string;
  name: string;
  details: string;
};

interface AdminTestimonialsDepartmentProps {
  departmentName: string;
}

const API_URL = 'http://localhost:5555/api/department-testimonials';

const AdminTestimonialsDepartment: React.FC<AdminTestimonialsDepartmentProps> = ({ departmentName }) => {
  const [quote, setQuote] = useState('');
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [testimonialsList, setTestimonialsList] = useState<DepartmentTestimonialItem[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${API_URL}?department=${encodeURIComponent(departmentName)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        setTestimonialsList(await response.json());
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setUploadMessage('Failed to load testimonials.');
      }
    };
    if (departmentName) fetchTestimonials();
  }, [departmentName]);

  const handleUpload = async () => {
    if (!quote || !name || !details) {
      setUploadMessage('Please fill all fields.');
      return;
    }
    setUploading(true);

    const newTestimonial = { department: departmentName, quote, name, details };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTestimonial),
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const createdTestimonial = await response.json();
      setTestimonialsList((prevList) => [...prevList, createdTestimonial]);
      setUploadMessage('Testimonial added successfully!');
      setQuote('');
      setName('');
      setDetails('');
    } catch (error) {
      console.error('Upload error:', error);
      setUploadMessage('Failed to add testimonial.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    setDeletingId(id);

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Delete failed');
      }
      setTestimonialsList(testimonialsList.filter((item) => item._id !== id));
      setUploadMessage('Testimonial deleted successfully.');
    } catch (error) {
      console.error('Delete error:', error);
      setUploadMessage('Failed to delete testimonial.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (testimonial: DepartmentTestimonialItem) => {
    setEditingId(testimonial._id);
    setQuote(testimonial.quote);
    setName(testimonial.name);
    setDetails(testimonial.details);
  };

  const handleUpdate = async () => {
    if (!quote || !name || !details || !editingId) {
      setUploadMessage('Please fill all fields for update.');
      return;
    }
    setUploading(true);

    const updatedTestimonial = { department: departmentName, quote, name, details };

    try {
      const response = await fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTestimonial),
      });

      if (!response.ok) {
        throw new Error('Update failed');
      }

      const returnedTestimonial = await response.json();
      setTestimonialsList((prevList) =>
        prevList.map((item) => (item._id === editingId ? returnedTestimonial : item))
      );
      setUploadMessage('Testimonial updated successfully!');
      handleCancelEdit();
    } catch (error) {
      console.error('Update error:', error);
      setUploadMessage('Failed to update testimonial.');
    } finally {
      setUploading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setQuote('');
    setName('');
    setDetails('');
    setUploadMessage(null);
  };

  return (
    <section>
      <h2 className="text-xl font-bold text-[#142143] mb-4">Manage Student Testimonials for {departmentName}</h2>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-bold text-[#142143] mb-2">{editingId ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
        <textarea
          placeholder="Enter student quote"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          className="block w-full px-4 py-2 border rounded mb-4 h-24"
        />
        <input
          type="text"
          placeholder="Enter student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full px-4 py-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Enter student details (e.g., 'MBA Graduate, 2023')"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="block w-full px-4 py-2 border rounded mb-4"
        />
        <div className="flex gap-4">
          {editingId ? (
            <>
              <button
                onClick={handleUpdate}
                disabled={uploading}
                className={`px-6 py-2 rounded font-semibold text-white ${
                  uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {uploading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={handleCancelEdit}
                disabled={uploading}
                className={`px-6 py-2 rounded font-semibold text-[#142143] bg-gray-200 hover:bg-gray-300 ${
                  uploading ? 'cursor-not-allowed' : ''
                }`}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleUpload}
              disabled={uploading}
              className={`px-6 py-2 rounded font-semibold text-white ${
                uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#ffaf00] hover:bg-yellow-400'
              }`}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          )}
        </div>
      </div>
      
      {uploadMessage && <p className="mt-4 text-[#142143]">{uploadMessage}</p>}
      <hr className="my-6" />
      <h3 className="text-lg font-bold text-[#142143] mb-2">Uploaded Testimonials</h3>
      {testimonialsList.length === 0 ? (
        <p className="text-gray-600">No testimonials uploaded yet.</p>
      ) : (
        <ul className="space-y-3">
          {testimonialsList.map((testimonial) => (
            <li
              key={testimonial._id}
              className="flex items-center justify-between p-3 bg-white rounded shadow"
            >
              <div className="flex-1 mr-4">
                <p className="text-sm font-medium italic text-gray-800">
                  <Quote className="inline-block h-4 w-4 text-gray-400 mr-2" />
                  "{testimonial.quote}"
                </p>
                <p className="text-xs text-gray-500 ml-6">
                  {testimonial.name}, {testimonial.details}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(testimonial)}
                  className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
                  aria-label="Edit testimonial"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(testimonial._id)}
                  disabled={deletingId === testimonial._id}
                  className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700"
                  aria-label="Delete testimonial"
                >
                  {deletingId === testimonial._id ? (
                    <span className="text-sm">...</span>
                  ) : (
                    <X className="h-5 w-5" />
                  )}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default AdminTestimonialsDepartment;