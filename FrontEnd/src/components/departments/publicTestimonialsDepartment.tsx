import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

// --- Type Definition for a Testimonial Item ---
export type DepartmentTestimonialItem = {
  _id: string;
  department: string;
  quote: string;
  name: string;
  details: string;
};

interface PublicTestimonialsDepartmentProps {
  departmentName: string; // The department whose testimonials are to be displayed
}

const API_URL = 'http://localhost:5555/api/department-testimonials';
const MARQUEE_SPEED_FACTOR = 60; // Adjust speed: lower = faster
const MIN_VISIBLE_CARDS = 3.5; // Minimum number of cards to make the marquee look good

// CSS for the marquee effect
const marqueeStyles = `
  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); } /* Only move 50% since we duplicate the content */
  }

  .animate-marquee {
    animation: marquee var(--marquee-speed) linear infinite;
  }
`;

const PublicTestimonialsDepartment: React.FC<PublicTestimonialsDepartmentProps> = ({ departmentName }) => {
  const [testimonials, setTestimonials] = useState<DepartmentTestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}?department=${encodeURIComponent(departmentName)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        setTestimonials(await response.json());
      } catch (err) {
        setError(`Failed to load testimonials: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoading(false);
      }
    };
    if (departmentName) fetchTestimonials();
  }, [departmentName]);

  const getCardColors = (index: number) => {
    // We want the colors to cycle based on the actual testimonial list, not the doubled list index
    const actualIndex = index % testimonials.length; 
    const isDark = actualIndex % 2 !== 0; // Use actualIndex for color pattern
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
    testimonial: DepartmentTestimonialItem;
    index: number;
  }) => {
    // Pass the original testimonial index to getCardColors
    const { bgColor, textColor, quoteColor, initialBg, initialText, detailsColor } = getCardColors(index);
    const initial = testimonial.name.charAt(0);

    return (
      <div
        className={`${bgColor} ${textColor} rounded-2xl p-8 relative flex-shrink-0 w-72`} 
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

  if (loading) {
    return (
        <section className="py-8 bg-gray-50 flex justify-center items-center">
            <p className="text-[#142143] text-lg font-semibold">Loading testimonials...</p>
        </section>
    );
  }
  if (error) {
    return <div className="text-red-600 p-4 bg-red-100 rounded-md my-4">Error: {error}</div>;
  }
  if (testimonials.length === 0) {
    return (
        <section className="py-8 bg-gray-50 flex justify-center items-center">
            <p className="text-gray-500 text-lg font-semibold">No testimonials available for {departmentName}.</p>
        </section>
    );
  }

  // --- FIX START ---
  // Create a list that's long enough to make the marquee seamless
  // If there are fewer testimonials than MIN_VISIBLE_CARDS, duplicate them enough times
  // to ensure a smooth loop. Otherwise, just duplicate them once.
  const requiredCopies = testimonials.length < MIN_VISIBLE_CARDS ? Math.ceil(MIN_VISIBLE_CARDS / testimonials.length) + 1 : 2;
  let carouselContent: DepartmentTestimonialItem[] = [];
  for (let i = 0; i < requiredCopies; i++) {
      carouselContent = carouselContent.concat(testimonials);
  }
  // --- FIX END ---
  
  const cardWidth = 288; // w-72 = 18rem = 18 * 16px = 288px (approx, for gap calculation)
  const gapWidth = 24; // gap-6 = 1.5rem = 24px (approx)
  const totalItemWidth = cardWidth + gapWidth;
  const totalContentWidth = testimonials.length * totalItemWidth;
  const marqueeSpeed = `${totalContentWidth / MARQUEE_SPEED_FACTOR}s`;

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6 text-[#142143] text-center">What Our Students Say</h2>
        
        <style>{marqueeStyles}</style>

        <div className="relative overflow-hidden py-10 rounded-lg shadow-inner">
          <div 
            className="flex flex-nowrap gap-8 animate-marquee"
            style={{ 
              '--marquee-speed': marqueeSpeed, 
              width: `${carouselContent.length * totalItemWidth}px` // Use carouselContent length for total width
            } as React.CSSProperties} 
          >
            {carouselContent.map((t, i) => (
              // Use a unique key for each duplicated item, e.g., combining _id and its position in carouselContent
              <Card key={`${t._id}-${i}`} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicTestimonialsDepartment;