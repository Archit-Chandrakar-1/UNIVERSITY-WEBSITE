import React, { useState, useEffect } from 'react';
import { Trash2, Image, Video } from 'lucide-react'; 

// Define the type for a media item coming from the backend
type MediaItem = {
  _id: string; // MongoDB's unique ID
  public_id: string; // Cloudinary's public ID
  media_url: string; // <--- CHANGED FROM image_url to media_url
  resource_type: string; // <--- Also add resource_type if you want to use it
  caption?: string; // Optional caption
};



const AdminCarousel: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>(''); // State for custom caption
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [loadingMedia, setLoadingMedia] = useState(true); // New state for initial media load

  // Set your backend API URL. Make sure the port matches your Express server.
  const API_URL = 'http://localhost:5555/api/carousel';

  // Fetch all existing media from the backend when the component loads
  useEffect(() => {
    const fetchMedia = async () => {
      setLoadingMedia(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMediaList(data);
      } catch (error) {
        console.error('Error fetching media:', error);
        setUploadMessage(`Failed to load media: ${error instanceof Error ? error.message : String(error)}`);
      } finally {
        setLoadingMedia(false);
      }
    };
    fetchMedia();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setCaption(selectedFile.name.split('.').slice(0, -1).join('.')); // Pre-fill caption with filename
      setUploadMessage(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadMessage('Please select a file to upload.');
      return;
    }
    setUploading(true);
    setUploadMessage(null); // Clear previous messages
    
    const formData = new FormData();
    formData.append('media', file);
    formData.append('caption', caption); // Use the state caption

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get more specific error from backend
        throw new Error(`Upload failed with status ${response.status}: ${errorText}`);
      }

      const newMedia = await response.json();
      setMediaList((prevList) => [...prevList, newMedia]);
      setUploadMessage('File uploaded successfully!');
      setFile(null); // Clear the file input
      setCaption(''); // Clear caption
      (document.getElementById('file-upload') as HTMLInputElement).value = ''; // Reset file input visually
    } catch (error) {
      console.error('Upload error:', error);
      setUploadMessage(`Failed to upload file: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this media item? This action cannot be undone.')) {
      return;
    }
    setDeletingId(id);
    setUploadMessage(null); // Clear previous messages

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorText = await response.text(); // Get more specific error from backend
        throw new Error(`Delete failed with status ${response.status}: ${errorText}`);
      }
      setMediaList(mediaList.filter((item) => item._id !== id));
      setUploadMessage('Item deleted successfully!');
    } catch (error) {
      console.error('Delete error:', error);
      setUploadMessage(`Failed to delete item: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-[#142143] mb-6">Manage Carousel Media</h2>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-bold text-[#142143] mb-4">Upload New Media</h3>
        <input
          type="file"
          id="file-upload"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="mb-4 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-[#ffaf00] file:text-white
            hover:file:bg-yellow-400"
        />
        {file && (
          <div className="mb-4">
            <label htmlFor="caption-input" className="block text-sm font-medium text-gray-700 mb-1">
              Caption (Optional):
            </label>
            <input
              type="text"
              id="caption-input"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Enter caption for media"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            />
          </div>
        )}
        <button
          onClick={handleUpload}
          disabled={uploading || !file}
          className={`px-8 py-3 rounded-lg font-semibold text-lg text-white transition duration-300 ease-in-out ${
            uploading || !file ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#ffaf00] hover:bg-yellow-400'
          }`}
        >
          {uploading ? 'Uploading...' : 'Upload Media'}
        </button>
      </div>
      
      {uploadMessage && (
        <p className={`mt-4 p-3 rounded ${uploadMessage.includes('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {uploadMessage}
        </p>
      )}

      <hr className="my-8 border-gray-300" />
      
      <h3 className="text-2xl font-bold text-[#142143] mb-4">Uploaded Media</h3>
      {loadingMedia ? (
        <p className="text-gray-600">Loading media...</p>
      ) : mediaList.length === 0 ? (
        <p className="text-gray-600">No media uploaded yet. Please upload files above.</p>
      ) : (
        <ul className="space-y-4">
          {mediaList.map(({ _id, media_url, caption, resource_type }) => ( // Ensure media_url and resource_type are destructured
            <li
              key={_id}
              className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center space-x-4 mb-3 sm:mb-0 sm:w-3/4">
                {/* Safety check: Ensure media_url exists before trying to use it */}
                {media_url ? ( // Check if media_url is defined
                    resource_type === 'video' ? (
                        <Video className="h-10 w-10 text-gray-500" /> // Video icon
                    ) : (
                        <Image className="h-10 w-10 text-gray-500" /> // Image icon
                    )
                ) : (
                    <span className="h-10 w-10 text-gray-500 flex items-center justify-center">?</span> // Placeholder for missing URL
                )}

                {media_url ? ( // Check again before rendering img/video tag
                    resource_type === 'video' ? (
                        <video src={media_url} controls className="w-48 h-28 object-cover rounded-md border border-gray-200" preload="metadata" />
                    ) : (
                        <img src={media_url} alt={caption || "Carousel media"} className="w-48 h-28 object-cover rounded-md border border-gray-200" />
                    )
                ) : (
                    <div className="w-48 h-28 bg-gray-200 flex items-center justify-center text-gray-500 rounded-md border border-gray-200">
                        No Preview
                    </div>
                )}
                <span className="flex-1 truncate font-medium text-gray-800 text-lg">
                  {caption || 'No Caption'}
                </span>
              </div>
              <button
                onClick={() => handleDelete(_id)}
                disabled={deletingId === _id}
                className={`flex items-center px-4 py-2 rounded-md font-semibold text-white transition duration-300 ease-in-out ${
                  deletingId === _id ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {deletingId === _id ? (
                  <>
                    <span className="mr-2">Deleting...</span>
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                  </>
                ) : (
                  <>
                    <Trash2 className="h-5 w-5 mr-2" />
                    Delete
                  </>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default AdminCarousel;