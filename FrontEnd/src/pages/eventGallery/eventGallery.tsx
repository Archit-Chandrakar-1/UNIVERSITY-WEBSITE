// src/pages/EventGallery.tsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import ActionMenu from '../../components/actionMenu/actionMenu';
import ChatBot from '../../components/chatbot/chatbot';

// Static sample data
const eventImages: Record<string, string[]> = {
  'matsotsav-2024': [
    'https://images.pexels.com/photos/1704120/pexels-photo-1704120.jpeg',
    'https://images.pexels.com/photos/1704120/pexels-photo-1704120.jpeg',
    'https://images.pexels.com/photos/1704120/pexels-photo-1704120.jpeg',
    
    'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
    'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg',
    'https://images.pexels.com/photos/3184402/pexels-photo-3184402.jpeg',
  ],
  // Add more events...
};

const EventGallery: React.FC = () => {
  const { eventSlug } = useParams<{ eventSlug: string }>();
  const images = eventImages[eventSlug || ''] || [];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images.length) {
    return (
      <div className="pt-32 text-center">
        <p className="text-gray-600">No images found for this event.</p>
        <Link to="/gallery" className="text-[#ffaf00] font-semibold underline">
          Back to Gallery
        </Link>
      </div>
    );
  }

  const openModal = (idx: number) => setSelectedIndex(idx);
  const closeModal = () => setSelectedIndex(null);

  const prevImage = () =>
    setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : images.length - 1));
  const nextImage = () =>
    setSelectedIndex((prev) => (prev! < images.length - 1 ? prev! + 1 : 0));

  return (
    <>
    <Navbar/>
    <section className="bg-gray-50 min-h-screen pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold text-[#142143] capitalize">
            {eventSlug?.replace(/-/g, ' ')}
          </h1>
          <Link
            to="/gallery"
            className="text-[#ffaf00] font-semibold hover:underline"
          >
            ← Back
          </Link>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => openModal(idx)}
            >
              <img
                src={src}
                alt={`Event photo ${idx + 1}`}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal Viewer */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            className="absolute top-6 right-6 text-white hover:text-[#ffaf00]"
            onClick={closeModal}
          >
            <X className="h-8 w-8" />
          </button>

          <button
            className="absolute left-4 text-white hover:text-[#ffaf00]"
            onClick={prevImage}
          >
            <ChevronLeft className="h-10 w-10" />
          </button>

          <img
            src={images[selectedIndex]}
            alt={`Full view ${selectedIndex + 1}`}
            className="max-h-[90vh] max-w-full object-contain rounded-lg"
          />

          <button
            className="absolute right-4 text-white hover:text-[#ffaf00]"
            onClick={nextImage}
          >
            <ChevronRight className="h-10 w-10" />
          </button>
        </div>
      )}
    </section>
    <Footer/>
    <ActionMenu/>
    <ChatBot/>

    </>  );
};

export default EventGallery;
