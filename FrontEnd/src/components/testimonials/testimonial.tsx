import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

// Define the type for a testimonial item coming from the backend
type TestimonialItem = {
  _id: string;
  quote: string;
  name: string;
  details: string;
};

const AUTO_SLIDE_INTERVAL = 3000; // ms
const VISIBLE_CARDS_COUNT = 3;

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < 768,
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from the backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('http://localhost:5555/api/testimonials');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  // detect resize
  useEffect(() => {
    const onResize = () =>
      setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // auto-slide for mobile
  useEffect(() => {
    if (!isMobile || testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, [isMobile, testimonials]);

  // Infinite loop logic for desktop
  useEffect(() => {
    if (isMobile || testimonials.length <= VISIBLE_CARDS_COUNT) return;
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrent((prev) => prev + 1);
    }, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, [isMobile, testimonials]);

  // Jump back to the start for infinite loop illusion
  useEffect(() => {
    if (isMobile || !isTransitioning || testimonials.length <= VISIBLE_CARDS_COUNT) return;
    
    if (current >= testimonials.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrent(0);
      }, 500);
    }
  }, [current, isTransitioning, isMobile, testimonials.length]);

  const getCardColors = (index: number) => {
    const isDark = index % 2 !== 0;
    return {
      bgColor: isDark ? 'bg-[#142143]' : 'bg-[#ffaf00]',
      textColor: isDark ? 'text-white' : 'text-[#142143]',
      quoteColor: isDark ? 'text-white/30' : 'text-[#142143]/30',
      initialBg: isDark ? 'bg-[#ffaf00]' : 'bg-[#142143]',
      initialText: isDark ? 'text-[#142143]' : 'text-white',
      detailsColor: isDark ? 'text-white/80' : 'text-[#142143]/80',
    };
  };

  const Card = ({
    testimonial,
    index,
  }: {
    testimonial: TestimonialItem;
    index: number;
  }) => {
    const { bgColor, textColor, quoteColor, initialBg, initialText, detailsColor } = getCardColors(index);
    const initial = testimonial.name.charAt(0);

    return (
      <div
        className={`${bgColor} ${textColor} rounded-2xl p-8 relative flex-shrink-0 w-full lg:w-[calc(90%/3)]`}
      >
        <Quote className={`h-12 w-12 mb-6 ${quoteColor}`} />
        <p className="text-lg mb-8 leading-relaxed">"{testimonial.quote}"</p>
        <div className="flex items-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mr-4 ${initialBg} ${initialText}`}>
            {initial}
          </div>
          <div>
            <h4 className="font-bold text-lg">{testimonial.name}</h4>
            <p className={`text-sm ${detailsColor}`}>{testimonial.details}</p>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50 flex justify-center items-center">
        <p className="text-[#142143] text-lg font-semibold">Loading testimonials...</p>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-16 bg-gray-50 flex justify-center items-center">
        <p className="text-[#142143] text-lg font-semibold">No testimonials available.</p>
      </section>
    );
  }

  const infiniteTestimonials = isMobile ? testimonials : [...testimonials, ...testimonials.slice(0, VISIBLE_CARDS_COUNT)];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#142143] mb-4">
            What Our Students Say
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Hear from our successful graduates and current students about their
            MATS University experience.
          </p>
        </div>

        {/* Dynamic Carousel */}
        <div className="relative overflow-hidden">
          <div
            className={`flex gap-11 ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
            style={{ transform: `translateX(-${current * (isMobile ? 100 : (100 / VISIBLE_CARDS_COUNT)) }%)` }}
          >
            {infiniteTestimonials.map((t, i) => (
              <Card key={t._id + i} testimonial={t} index={i} />
            ))}
          </div>
          {/* Mobile indicators */}
          {isMobile && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-3 h-3 rounded-full ${
                    idx === current ? 'bg-[#ffaf00]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;