// src/components/carousel/carousel.tsx
import React, { useState, useEffect } from 'react';


// Define the type for a media item coming from the backend
type MediaItem = {
  _id: string; // MongoDB's unique ID
  media_url: string; // <--- CHANGED: This must be 'media_url'
  resource_type: 'image' | 'video'; // <--- NEW: Add resource_type for conditional rendering
  caption?: string; // Optional caption
};

const Carousel: React.FC = () => {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [current, setCurrent] = useState(0);

  // Set your backend API URL. Make sure the port matches your Express server.
  const API_URL = 'http://localhost:5555/api/carousel';

  // Fetch all existing media from the backend when the component loads
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) { // Added error checking for fetch response
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: MediaItem[] = await response.json(); // Cast data to MediaItem[]
        setMediaList(data);
      } catch (error) {
        console.error('Failed to fetch carousel media:', error);
        // Optionally set an error state here to display a message to the user
      }
    };
    fetchMedia();
  }, []);

  // Auto-slide every 2.5 seconds
  useEffect(() => {
    if (mediaList.length === 0) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % mediaList.length);
    }, 2500);
    return () => clearInterval(id);
  }, [mediaList]);

  if (mediaList.length === 0) {
    return (
      <section className="relative h-screen overflow-hidden pt-32 flex items-center justify-center text-gray-600 bg-gray-100">
        Loading carousel...
      </section>
    );
  }

  return (
    <section className="relative h-screen overflow-hidden pt-32">
      {/* slides */}
      <div className="absolute inset-0">
        {mediaList.map((media, idx) => (
          <div
            key={media._id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Conditional rendering for image or video */}
            {media.resource_type === 'video' ? (
              <video
                src={media.media_url}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted // Mute video for autoplay in carousels
                playsInline // Important for iOS autoplay
                // REMOVED: alt={media.caption || "Carousel video"} // <--- THIS LINE WAS THE PROBLEM
                title={media.caption || "Carousel video"} // OPTIONAL: Use title for tooltip if desired
                // preload="auto" // Consider 'auto' for faster loading, but 'metadata' might be sufficient
              />
            ) : (
              <img
                src={media.media_url} // <--- CHANGED: Use media.media_url
                alt={media.caption || "Carousel image"}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-[#142143]/40" />
            
            
          </div>
        ))}
      </div>

      {/* action buttons */}
      <div className="absolute bottom-[10%] inset-x-0 z-20">
        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
          {[
            {
              label: 'MATS CENTRE FOR OPEN AND DISTANCE EDUCATION (ODL MODE)',
              link: 'https://matsodl.com/',
            },
            {
              label: 'MATS CENTRE FOR ONLINE EDUCATION (ONLINE MODE)',
              link: 'https://matsuniversityonline.com/',
            },
          ].map(({ label, link }) => (
            <a
              key={label}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-1 rounded-full font-bold text-lg text-center hover:bg-white hover:text-[#142143] transition-colors"
            >
              {label}
              {/* <ArrowRight className="ml-1 h-3 w-4" /> */}
            </a>
          ))}

          <a
            href="https://panel123.s3.ap-south-1.amazonaws.com/360Vtour_Mats_Univ/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg text-center hover:bg-white hover:text-[#142143] transition-colors"
          >
            Virtual Tour
          </a>

          <a
            href=" https://smarthubeducation.hdfcbank.com/SmartFees/Landing.action?instId=2659"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg text-center hover:bg-white hover:text-[#142143] transition-colors"
          >
            Online Fee Payment
          </a>
        </div>
      </div>

      {/* indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {mediaList.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${idx === current ? 'bg-[#ffaf00]' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;