// src/pages/gallery.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import ChatBot from '../../components/chatbot/chatbot';
import ActionMenu from '../../components/actionMenu/actionMenu';

const galleries = [
  {
    title: 'MATSOTSAV 2024',
    slug: 'matsotsav-2024',
    cover: '/gallery/matsotsav-2024/cover.jpg', 
    description: 'Annual cultural festival—photos & highlights.',
  },
  {
    title: 'FASHIONOTSAV 2022',
    slug: 'fashionotsav-2022',
    cover: '/gallery/fashionotsav-2022/cover.jpg',
    description: 'Fashion & talent showcase.',
  },
  // ...
];

const GalleryPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
    <Navbar/>
    <section className="bg-gray-50 min-h-screen pt-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#142143] mb-4">
            Event Galleries
          </h1>
          <p className="text-lg text-gray-600">
            Relive the memories through our photo archives.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {galleries.map((gallery) => (
            <button
              key={gallery.slug}
              onClick={() => navigate(`/gallery/${gallery.slug}`)}
              className="group bg-white rounded-2xl shadow hover:shadow-xl transition flex flex-col items-center overflow-hidden"
            >
              <div className="w-full aspect-[4/3] bg-gray-200 relative overflow-hidden">
                <img
                  src={gallery.cover}
                  alt={gallery.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="w-full p-6 text-center">
                <span className="block text-xl font-bold text-[#142143] mb-2">
                  {gallery.title}
                </span>
                <span className="block text-gray-600 text-sm">
                  {gallery.description}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
    <Footer/>
    <ChatBot/>
    <ActionMenu/>
    

    </>  );
};

export default GalleryPage;
