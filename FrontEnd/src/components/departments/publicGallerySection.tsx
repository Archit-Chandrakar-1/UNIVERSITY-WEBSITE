import React, { useState, useEffect } from 'react';
import { ArrowLeft, X } from 'lucide-react';

// Type for individual photos within an album
export type GalleryPhotoItem = {
  _id: string;
  title?: string; // Title is optional
  file_url: string;
  public_id: string;
  resource_type: 'image' | 'video'; // Only image or video for gallery items
  order?: number; // Order might be useful for sorting
  createdAt: string;
  updatedAt: string;
};
 
// Type for the full album structure as received from the backend
export type GalleryAlbum = {
  _id: string;
  department: string;
  album_name: string; // Matches backend field
  album_date?: string; // Matches backend field, optional
  cover_image_url: string;
  cover_image_public_id: string;
  photos: GalleryPhotoItem[]; // Array of photos
  createdAt: string;
  updatedAt: string;
};

interface PublicGallerySectionProps {
  departmentName: string;
}

// Use the correct, dedicated API endpoint for gallery
const API_URL = 'http://localhost:5555/api/gallery';

const PublicGallerySection: React.FC<PublicGallerySectionProps> = ({ departmentName }) => {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      setLoading(true);
      setError(null);
      if (!departmentName) {
        setError("Department name is required to fetch gallery.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_URL}?department=${encodeURIComponent(departmentName)}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || errorData.error || `Failed to fetch gallery albums: ${response.statusText}`);
        }
        const data: GalleryAlbum[] = await response.json();
        setAlbums(data);
      } catch (err) {
        console.error('Error fetching albums:', err);
        setError(`Failed to load albums: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, [departmentName]);

  const openAlbum = (album: GalleryAlbum) => {
    setSelectedAlbum(album);
  };

  const closeAlbum = () => {
    setSelectedAlbum(null);
  };

  if (loading) {
    return <p className="text-center text-gray-600 p-8">Loading gallery albums...</p>;
  }

  if (error) {
    return <p className="text-red-600 p-4 bg-red-100 rounded-md my-4">Error: {error}</p>;
  }

  if (albums.length === 0) {
    return <p className="text-center text-gray-500 p-8">No gallery albums available for {departmentName}.</p>;
  }

  return (
    <section className="mb-8 p-4 md:p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-[#142143]">
        {departmentName} - Gallery
      </h2>

      {/* --- Main Album Grid View --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {albums.map((album) => (
          <div 
            key={album._id} 
            onClick={() => openAlbum(album)}
            className="relative rounded-lg shadow-md overflow-hidden cursor-pointer group transition-transform duration-300 hover:scale-105"
          >
            {/* Cover Image */}
            <img
              src={album.cover_image_url}
              alt={album.album_name} // Use album_name here
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            {/* Album Name Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
              <h3 className="text-lg font-bold text-white">{album.album_name}</h3> {/* Use album_name here */}
              {album.album_date && <p className="text-sm text-gray-300">{album.album_date}</p>} {/* Use album_date here */}
            </div>
          </div>
        ))}
      </div>

      {/* --- Album Detail Modal --- */}
      {selectedAlbum && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full h-full max-w-5xl overflow-y-auto relative p-6">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <button onClick={closeAlbum} className="text-gray-600 hover:text-[#ffaf00] transition flex items-center gap-2">
                <ArrowLeft className="h-6 w-6" /> Back to Albums
              </button>
              <h3 className="text-2xl font-bold text-[#142143]">{selectedAlbum.album_name}</h3> {/* Use album_name */}
              <button onClick={closeAlbum} className="text-gray-600 hover:text-[#ffaf00] transition">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {selectedAlbum.photos.length > 0 ? (
                selectedAlbum.photos.map((photo) => (
                  <div key={photo._id} className="relative rounded-lg overflow-hidden shadow-md">
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
                        alt={photo.title || 'Gallery Photo'}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    {photo.title && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                            <p className="text-white text-sm truncate">{photo.title}</p>
                        </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 col-span-full text-center">No photos or videos in this album.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PublicGallerySection;