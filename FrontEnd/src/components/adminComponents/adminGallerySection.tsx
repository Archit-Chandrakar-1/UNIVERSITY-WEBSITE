// src/components/adminComponents/adminGallerySection.tsx

import React, { useState, useEffect, useRef } from 'react';
import { PlusCircle, Trash2, ArrowLeft, Image as ImageIcon, Video, UploadCloud, X } from 'lucide-react';

// --- Type Definitions ---
export interface GalleryPhotoItem {
  _id: string; 
  title?: string; // Made optional as per backend route
  file_url: string;
  public_id: string;
  resource_type: 'image' | 'video';
  order?: number; // Optional order for display
  createdAt: string; // Add timestamps for better data management
  updatedAt: string; // Add timestamps
}

export interface GalleryAlbum {
  _id: string;
  department: string;
  album_name: string;
  album_date?: string; // Date of the event/album
  cover_image_url: string;
  cover_image_public_id: string; // To delete from cloudinary
  photos: GalleryPhotoItem[]; // Array of photos/videos in the album
  createdAt: string;
  updatedAt: string;
}

interface AdminGallerySectionProps {
  departmentName: string; // The department this section is managing
}

const API_URL = 'http://localhost:5555/api/gallery';

const AdminGallerySection: React.FC<AdminGallerySectionProps> = ({ departmentName }) => {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null); // For album deletion
  const [deletingPhotoId, setDeletingPhotoId] = useState<string | null>(null); // For photo deletion
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null); // State for navigating into an album
  
  // States for the album creation form
  const [newAlbumName, setNewAlbumName] = useState('');
  const [newAlbumDate, setNewAlbumDate] = useState('');
  const [newCoverImage, setNewCoverImage] = useState<File | null>(null);
  const [uploadingAlbum, setUploadingAlbum] = useState(false);
  const [albumMessage, setAlbumMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Function to fetch all albums for the current department
  const fetchAlbums = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}?department=${encodeURIComponent(departmentName)}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || `Failed to fetch albums: ${response.statusText}`);
      }
      const data: GalleryAlbum[] = await response.json();
      setAlbums(data);
      // If we were viewing an album, update its details
      if (selectedAlbum) {
        const updatedSelected = data.find(album => album._id === selectedAlbum._id);
        setSelectedAlbum(updatedSelected || null); // Keep selected album updated or deselect if not found
      }
    } catch (err) {
      console.error('Error fetching gallery albums:', err);
      setError(`Failed to load gallery albums: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch albums on component mount and when departmentName changes
  useEffect(() => {
    if (departmentName) {
      fetchAlbums();
    }
  }, [departmentName]);

  // Handle album creation form submission
  const handleAlbumSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlbumMessage(null);
    if (!newAlbumName || !newCoverImage) {
      setAlbumMessage({ text: 'Album name and cover image are required.', type: 'error' });
      return;
    }

    setUploadingAlbum(true);
    const formData = new FormData();
    formData.append('department', departmentName);
    formData.append('album_name', newAlbumName);
    formData.append('album_date', newAlbumDate);
    formData.append('coverImage', newCoverImage); 

    try {
      const response = await fetch(API_URL, { 
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || `Album creation failed with status ${response.status}`);
      }
      setAlbumMessage({ text: 'Album added successfully!', type: 'success' });
      setNewAlbumName('');
      setNewAlbumDate('');
      setNewCoverImage(null);
      // Reset file input manually
      const fileInput = document.getElementById('cover-image') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      fetchAlbums(); // Re-fetch albums to update the list
    } catch (err) {
      console.error('Frontend Album Upload Error:', err);
      setAlbumMessage({ text: `Failed to add album: ${err instanceof Error ? err.message : String(err)}`, type: 'error' });
    } finally {
      setUploadingAlbum(false);
    }
  };

  // Handle album deletion
  const handleAlbumDelete = async (albumId: string) => {
    if (!window.confirm('Are you sure you want to delete this album and all its photos? This action cannot be undone.')) return;
    setDeletingId(albumId);
    try {
      const response = await fetch(`${API_URL}/${albumId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || `Delete failed with status ${response.status}`);
      }
      setAlbumMessage({ text: 'Album deleted successfully!', type: 'success' });
      fetchAlbums(); // Re-fetch list after successful deletion
      if (selectedAlbum?._id === albumId) { // If the deleted album was the one selected, deselect it
        setSelectedAlbum(null);
      }
    } catch (err) {
      console.error('Delete album error:', err);
      setAlbumMessage({ text: `Failed to delete album: ${err instanceof Error ? err.message : String(err)}`, type: 'error' });
    } finally {
      setDeletingId(null);
    }
  };
  
  // --- Photo/Video Management within an Album ---
  const PhotoUploadForm = ({ albumId, onPhotoUploadSuccess }: { albumId: string, onPhotoUploadSuccess: () => void }) => {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [photoMessage, setPhotoMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    const handlePhotoSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setPhotoMessage(null);
      if (!file) {
        setPhotoMessage({ text: 'Please select a photo or video file.', type: 'error' });
        return;
      }
      setUploadingPhoto(true);

      const formData = new FormData();
      formData.append('media', file); // 'media' is the expected field name for the file
      formData.append('title', title || file.name); // Use file name as default title if not provided

      try {
        const response = await fetch(`${API_URL}/${albumId}/photos`, {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || errorData.error || `Media upload failed with status ${response.status}`);
        }
        setPhotoMessage({ text: 'Media uploaded successfully!', type: 'success' });
        setFile(null);
        setTitle('');
        // Reset file input manually
        const fileInput = document.getElementById('photo-file') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        onPhotoUploadSuccess(); // Trigger refresh of the selected album's photos
      } catch (err) {
        console.error('Frontend Media Upload Error:', err);
        setPhotoMessage({ text: `Failed to upload media: ${err instanceof Error ? err.message : String(err)}`, type: 'error' });
      } finally {
        setUploadingPhoto(false);
      }
    };

    return (
      <form onSubmit={handlePhotoSubmit} className="p-4 border border-dashed rounded-lg bg-gray-50 mt-4">
        <h4 className="font-semibold text-[#142143] mb-3 flex items-center gap-2">
          <UploadCloud className="h-5 w-5" /> Add New Photo/Video to Album
        </h4>
        <div className="mb-3">
          <label htmlFor="photo-title" className="block text-sm font-medium text-gray-700">Media Title (Optional)</label>
          <input
            type="text"
            id="photo-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="photo-file" className="block text-sm font-medium text-gray-700">Photo/Video File</label>
          <input
            type="file"
            id="photo-file"
            accept="image/*,video/*" // Allow both image and video files
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            required
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#ffaf00] file:text-white hover:file:bg-yellow-400"
          />
        </div>
        <button
          type="submit"
          disabled={uploadingPhoto || !file}
          className={`px-6 py-2 rounded-lg font-semibold text-white ${
            uploadingPhoto || !file ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#142143] hover:bg-[#2e406e]'
          }`}
        >
          {uploadingPhoto ? 'Uploading...' : 'Add Media'}
        </button>
        {photoMessage && (
          <p className={`mt-3 p-2 rounded text-sm ${photoMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {photoMessage.text}
          </p>
        )}
      </form>
    );
  };

  const handleDeletePhoto = async (albumId: string, photoId: string) => {
    if (!window.confirm('Are you sure you want to delete this photo/video? This cannot be undone.')) return;
    setDeletingPhotoId(photoId); // Set for specific photo being deleted
    try {
      const response = await fetch(`${API_URL}/${albumId}/photos/${photoId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || `Photo deletion failed with status ${response.status}`);
      }
      setAlbumMessage({ text: 'Photo deleted successfully!', type: 'success' });
      // Immediately update the selected album's photos in the UI
      setSelectedAlbum(prevAlbum => {
        if (!prevAlbum) return null;
        return {
          ...prevAlbum,
          photos: prevAlbum.photos.filter(p => p._id !== photoId)
        };
      });
      fetchAlbums(); // Also re-fetch all albums to keep the overall list consistent (e.g., photo counts in future)
    } catch (err) {
      console.error('Delete photo error:', err);
      setAlbumMessage({ text: `Failed to delete photo: ${err instanceof Error ? err.message : String(err)}`, type: 'error' });
    } finally {
      setDeletingPhotoId(null);
    }
  };


  if (!departmentName) {
    return (
      <section className="p-6 text-center text-gray-600">
        Please select a department to manage its gallery.
      </section>
    );
  }

  if (loading) {
    return <div className="text-center p-8 text-gray-700">Loading gallery...</div>;
  }

  if (error) {
    return <div className="text-red-600 p-4 bg-red-100 rounded-md my-4">Error: {error}</div>;
  }

  // --- Render Album Management View (when no album is selected) ---
  if (!selectedAlbum) {
    return (
      <section className="mb-8 p-4 md:p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-[#142143]">
          {departmentName} - Gallery Albums
        </h2>
        
        {/* Album Creation Form */}
        <form onSubmit={handleAlbumSubmit} className="p-4 border border-dashed rounded-lg bg-gray-50 mt-4 mb-6">
          <h3 className="font-semibold text-[#142143] mb-3 flex items-center gap-2">
            <PlusCircle className="h-5 w-5" /> Add New Album
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-3">
              <label htmlFor="album-name" className="block text-sm font-medium text-gray-700">Album Name</label>
              <input type="text" id="album-name" value={newAlbumName} onChange={(e) => setNewAlbumName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-3">
              <label htmlFor="album-date" className="block text-sm font-medium text-gray-700">Album Date (Optional)</label>
              <input type="date" id="album-date" value={newAlbumDate} onChange={(e) => setNewAlbumDate(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded" />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="cover-image" className="block text-sm font-medium text-gray-700">Album Cover Image</label>
            <input type="file" id="cover-image" accept="image/*" onChange={(e) => setNewCoverImage(e.target.files ? e.target.files[0] : null)} required className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#ffaf00] file:text-white hover:file:bg-yellow-400" />
          </div>
          <button
            type="submit"
            disabled={uploadingAlbum || !newAlbumName || !newCoverImage}
            className={`px-6 py-2 rounded-lg font-semibold text-white ${
              uploadingAlbum || !newAlbumName || !newCoverImage ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#142143] hover:bg-[#2e406e]'
            }`}
          >
            {uploadingAlbum ? 'Creating Album...' : 'Add Album'}
          </button>
        </form>

        {albumMessage && (
          <p className={`mt-3 p-2 rounded text-sm ${albumMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {albumMessage.text}
          </p>
        )}

        <h3 className="text-xl font-bold mt-8 mb-4 text-[#142143]">Existing Albums</h3>
        {albums.length === 0 ? (
          <p className="text-gray-500">No albums uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {albums.map((album) => (
              <div
                key={album._id}
                className="relative rounded-lg shadow-md overflow-hidden group transition-transform duration-300 hover:scale-105"
              >
                <div className="relative w-full aspect-video"> {/* Using aspect-video for consistent aspect ratio */}
                  <img
                    src={album.cover_image_url}
                    alt={album.album_name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 bg-white flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-bold text-[#142143]">{album.album_name}</h4>
                    {album.album_date && <p className="text-sm text-gray-500">{album.album_date}</p>}
                  </div>
                  <div className="flex gap-2">
                    {/* Button to view/edit photos for this album */}
                    <button onClick={() => setSelectedAlbum(album)} className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition" title="View/Edit Photos">
                      <ImageIcon className="h-5 w-5" />
                    </button>
                    {/* Button to delete this album */}
                    <button onClick={() => handleAlbumDelete(album._id)} disabled={deletingId === album._id} className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition" title="Delete Album">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }

  // --- Render Album Detail View (when an album is selected) ---
  return (
    <section className="mb-8 p-4 md:p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        {/* Button to go back to the album list */}
        <button onClick={() => setSelectedAlbum(null)} className="text-gray-600 hover:text-[#ffaf00] transition flex items-center gap-2">
          <ArrowLeft className="h-6 w-6" /> Back to Albums
        </button>
        <h3 className="text-2xl font-bold text-[#142143]">{selectedAlbum.album_name} - Media</h3>
        {/* Optional: Close button similar to back, or just use back */}
        <button onClick={() => setSelectedAlbum(null)} className="text-gray-600 hover:text-[#ffaf00] transition">
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Form to upload new photos/videos to the selected album */}
      <PhotoUploadForm albumId={selectedAlbum._id} onPhotoUploadSuccess={fetchAlbums} />

      <h4 className="text-xl font-bold mt-8 mb-4 text-[#142143]">Existing Photos & Videos</h4>
      {selectedAlbum.photos.length === 0 ? (
        <p className="text-gray-500">No photos or videos in this album yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {selectedAlbum.photos.map((photo) => (
            <div key={photo._id} className="relative rounded-lg overflow-hidden shadow-md group">
              {photo.resource_type === 'video' ? (
                 <video 
                   src={photo.file_url} 
                   controls 
                   className="w-full h-48 object-cover bg-black"
                   preload="metadata" // Load video metadata only
                 >
                   Your browser does not support the video tag.
                 </video>
              ) : (
                <img
                  src={photo.file_url}
                  alt={photo.title || 'Gallery Media'}
                  className="w-full h-48 object-cover"
                />
              )}
              {/* Overlay with delete button for each photo/video */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => handleDeletePhoto(selectedAlbum._id, photo._id)}
                  disabled={deletingPhotoId === photo._id}
                  className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
                  title="Delete Photo/Video"
                >
                  {deletingPhotoId === photo._id ? '...' : <Trash2 className="h-6 w-6" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminGallerySection;