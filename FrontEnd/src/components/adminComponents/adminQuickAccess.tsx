import React, { useState, useEffect } from 'react';

// Define the type for an item coming from the backend
type QuickAccessItem = {
  _id: string; // MongoDB's unique ID
  name?: string;
  url?: string;
  message?: string;
  link?: string;
};

const AdminQuickAccess: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'timetables' | 'notifications' | 'brochures'>('timetables');
  const [file, setFile] = useState<File | null>(null);
  const [itemName, setItemName] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationLink, setNotificationLink] = useState('');
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [mediaList, setMediaList] = useState<QuickAccessItem[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const API_URL = `http://localhost:5555/api/quick-access`;

  const fetchMedia = async (label: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/${label}`);
      if (!response.ok) {
        throw new Error('Failed to fetch media');
      }
      const data = await response.json();
      setMediaList(data.items); // Assuming the response has an 'items' property
    } catch (error) {
      console.error('Error fetching media:', error);
      setUploadMessage('Failed to load media.');
      setMediaList([]); // Clear the list on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const labelMap = {
      timetables: 'Examination Timetable',
      notifications: 'Examination Notification',
      brochures: 'Information Brochure'
    };
    fetchMedia(labelMap[activeSection]);
  }, [activeSection]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      setFile(e.target.files[0]);
      // Corrected line below: removed the extra single quote
      setItemName(e.target.files[0].name.split('.').slice(0, -1).join('.'));
      setUploadMessage(null);
    }
};

  const handleUpload = async () => {
    setUploading(true);
    setUploadMessage(null);

    let endpoint = '';
    let body;

    if (activeSection === 'notifications') {
      endpoint = `${API_URL}/notifications`;
      if (!notificationMessage) {
        setUploadMessage('Please enter a notification message.');
        setUploading(false);
        return;
      }
      body = JSON.stringify({ message: notificationMessage, link: notificationLink });
    } else { // Timetables and Brochures
      endpoint = `${API_URL}/${activeSection}`;
      if (!file || !itemName) {
        setUploadMessage('Please select a file and enter a name.');
        setUploading(false);
        return;
      }
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', itemName);
      body = formData;
    }
    
    try {
      const isFormData = activeSection !== 'notifications';
      const response = await fetch(endpoint, {
        method: 'POST',
        body: isFormData ? body as FormData : JSON.stringify(body),
        headers: isFormData ? {} : { 'Content-Type': 'application/json' },
      });
      
      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const newMedia = await response.json();
      setMediaList((prevList) => [...prevList, newMedia]);
      setUploadMessage('Item uploaded successfully!');
      
      setFile(null);
      setItemName('');
      setNotificationMessage('');
      setNotificationLink('');
    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadMessage(`Failed to upload: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    setDeletingId(id);
    
    const labelMap = {
      timetables: 'Examination Timetable',
      notifications: 'Examination Notification',
      brochures: 'Information Brochure'
    };
    
    // Corrected URL for the delete endpoint
    try {
      const response = await fetch(`${API_URL}/${labelMap[activeSection]}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Delete failed with status: ${response.status}`);
      }
      setMediaList(mediaList.filter((item) => item._id !== id));
      setUploadMessage('Item deleted successfully!');
    } catch (error: any) {
      console.error('Delete error:', error);
      setUploadMessage(`Failed to delete: ${error.message}`);
    } finally {
      setDeletingId(null);
    }
};

  return (
    <section>
      <h2 className="text-xl font-bold text-[#142143] mb-4">Manage Quick Access Content</h2>
      
      <div className="flex gap-4 mb-6 border-b border-gray-300">
        <button
          onClick={() => setActiveSection('timetables')}
          className={`px-4 py-2 font-semibold transition-colors ${activeSection === 'timetables' ? 'text-[#ffaf00] border-b-2 border-[#ffaf00]' : 'text-gray-500 hover:text-[#142143]'}`}
        >
          Timetables
        </button>
        <button
          onClick={() => setActiveSection('notifications')}
          className={`px-4 py-2 font-semibold transition-colors ${activeSection === 'notifications' ? 'text-[#ffaf00] border-b-2 border-[#ffaf00]' : 'text-gray-500 hover:text-[#142143]'}`}
        >
          Notifications
        </button>
        <button
          onClick={() => setActiveSection('brochures')}
          className={`px-4 py-2 font-semibold transition-colors ${activeSection === 'brochures' ? 'text-[#ffaf00] border-b-2 border-[#ffaf00]' : 'text-gray-500 hover:text-[#142143]'}`}
        >
          Brochures
        </button>
      </div>

      {activeSection === 'notifications' ? (
        <div>
          <h3 className="text-lg font-bold text-[#142143] mb-2">Add New Notification</h3>
          <input
            type="text"
            placeholder="Enter notification message"
            value={notificationMessage}
            onChange={(e) => setNotificationMessage(e.target.value)}
            className="block w-full px-4 py-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="Optional link URL"
            value={notificationLink}
            onChange={(e) => setNotificationLink(e.target.value)}
            className="block w-full px-4 py-2 border rounded mb-4"
          />
          <button
            onClick={handleUpload}
            disabled={uploading || !notificationMessage}
            className={`px-6 py-2 rounded font-semibold text-white ${
              uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#ffaf00] hover:bg-yellow-400'
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-bold text-[#142143] mb-2">Add New {activeSection === 'timetables' ? 'Timetable' : 'Brochure'}</h3>
          <input type="file" onChange={handleFileChange} className="mb-2" />
          <input
            type="text"
            placeholder={`Enter item name (e.g., 'B.Tech ${activeSection === 'timetables' ? 'Timetable' : 'Brochure'}')`}
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="block w-full px-4 py-2 border rounded mb-4"
          />
          <button
            onClick={handleUpload}
            disabled={uploading || !file || !itemName}
            className={`px-6 py-2 rounded font-semibold text-white ${
              uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#ffaf00] hover:bg-yellow-400'
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      )}

      {uploadMessage && <p className="mt-4 text-[#142143]">{uploadMessage}</p>}
      <hr className="my-6" />
      <h3 className="text-lg font-semibold text-[#142143] mb-2">Uploaded Items</h3>
      {isLoading ? (
        <p className="text-gray-600">Loading items...</p>
      ) : mediaList.length === 0 ? (
        <p className="text-gray-600">No items uploaded yet.</p>
      ) : (
        <ul className="space-y-3">
          {mediaList.map((item) => (
            <li
              key={item._id}
              className="flex items-center justify-between p-3 bg-white rounded shadow"
            >
              <div className="flex items-center space-x-4 max-w-xs truncate">
                <span className="truncate font-medium">
                  {'name' in item ? item.name : 'message' in item ? item.message : ''}
                </span>
              </div>
              <button
                onClick={() => handleDelete(item._id)}
                disabled={deletingId === item._id}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                {deletingId === item._id ? 'Deleting...' : 'Delete'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default AdminQuickAccess;