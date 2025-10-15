import React, { useState, useEffect } from 'react';
import { Plus, Minus, } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Define the carousel items here
const carouselItems = [
  {
    title: 'ABOUT UNIVERSITY - Overview & Leadership',
    description: 'Established in 2006, MATS University has emerged as a leading educational institute in Raipur, committed to nurturing future leaders and professionals across various disciplines. We take pride in our distinguished faculty members who are experts in their respective roles, dedicating themselves to imparting knowledge and mentorship to our students.',
    image: 'https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
    bgColor: 'bg-[#142143]', 
  },
  {
    title: 'ABOUT UNIVERSITY - Governing Bodies',
    description: 'MATS University is one of the leading universities of Central India. At MATS, we are committed to developing leaders who are not merely skilled professionals but also compassionate people with strong ethical values and discipline. We provide our students with the information, skills, confidence, and experience necessary to improve the world around them. MATS University not only develops their students individually but also gives them time and opportunity to develop new interests, learn new skills, and meet new people.',
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
    bgColor: 'bg-[#142143]', 
  },
  {
    title: 'ABOUT UNIVERSITY - Vision & Mission',
    description: 'Our mission is to foster an intellectual and ethical environment in which the spirit and skills within MATS will thrive to impart high quality education, training, research and consultancy services with a global outlook and human values.',
    image: 'https://images.pexels.com/photos/3762804/pexels-photo-3762804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
    bgColor: 'bg-[#142143]', 
  },
  {
    title: 'ABOUT UNIVERSITY - Milestones & Achievements',
    description: 'Our mission is to foster an intellectual and ethical environment in which the spirit and skills within MATS will thrive to impart high quality education, training, research and consultancy services with a global outlook and human values.',
    image: 'https://images.pexels.com/photos/3762804/pexels-photo-3762804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
    bgColor: 'bg-[#142143]', 
  },
  {
    title: 'ABOUT UNIVERSITY - Accerditations',
    description: 'Our mission is to foster an intellectual and ethical environment in which the spirit and skills within MATS will thrive to impart high quality education, training, research and consultancy services with a global outlook and human values.',
    image: 'https://images.pexels.com/photos/3762804/pexels-photo-3762804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
    bgColor: 'bg-[#142143]', 
  },
  {
    title: 'ABOUT UNIVERSITY - University Policies',
    description: 'Our mission is to foster an intellectual and ethical environment in which the spirit and skills within MATS will thrive to impart high quality education, training, research and consultancy services with a global outlook and human values.',
    image: 'https://images.pexels.com/photos/3762804/pexels-photo-3762804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
    bgColor: 'bg-[#142143]', 
  },
];

const AboutCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (carouselItems.length === 0) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const toggleReadMore = () => {
    setIsReadMoreOpen(!isReadMoreOpen);
  };

  const handleCarouselClick = () => {
    navigate('/overview');
  };

  const currentItem = carouselItems[current];
  const shortDescription = currentItem.description.substring(0, 200) + (currentItem.description.length > 200 ? '...' : '');
  const fullDescription = currentItem.description;

  return (
    <section 
      className={`relative h-[70vh] overflow-hidden flex items-center justify-center bg-white text-black cursor-pointer`}
      onClick={handleCarouselClick}
    >
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
        <div className="text-black">
        <h2 className="text-5xl font-extrabold mb-4">{currentItem.title}</h2>
          <p className="text-lg leading-relaxed mb-6">
            {isReadMoreOpen ? fullDescription : shortDescription}
          </p>
          {currentItem.description.length > 200 && (
            <button
              onClick={(e) => { e.stopPropagation(); toggleReadMore(); }}
              className="flex items-center text-[#142143] hover:text-[#142143] font-semibold transition duration-200"
            >
              {isReadMoreOpen ? (
                <>
                  <Minus className="h-5 w-5 mr-2" />
                  Read Less
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5 mr-2" />
                  Read More
                </>
              )}
            </button>
          )}
        </div>

        <div className="flex justify-center md:justify-end">
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="rounded-lg shadow-2xl object-cover w-full max-w-md h-auto"
          />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {carouselItems.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => { e.stopPropagation(); setCurrent(idx); }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === current ? 'bg-[#142143] w-8' : 'bg-white/40'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default AboutCarousel;