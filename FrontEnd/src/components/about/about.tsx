// src/components/About.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const aboutLinks = [
  {
    name: "Overview & Leadership",
    link: "/overview",
    src: "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    // Sketch: Item 1 (top-left) - wide rectangle, spans 2 grid rows
    customClasses: "row-start-1 row-span-2 col-start-1 col-span-1"
  },
  {
    name: "Governance & Administration",
    link: "/governance",
    src: "https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    // Sketch: Item 2 (top-right) - tall rectangle/square, spans 3 grid rows
    customClasses: "row-start-1 row-span-3 col-start-2 col-span-1"
  },
  {
    name: "Regulations & Approvals",
    link: "/regulation",
    src: "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    // Sketch: Item 3 (middle-left) - square, spans 2 grid rows
    customClasses: "row-start-3 row-span-2 col-start-1 col-span-1"
  },
  {
    name: "Development & Accreditation",
    link: "/development",
    src: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    // Sketch: Item 4 (middle-right) - short wide rectangle, spans 1 grid row
    customClasses: "row-start-4 row-span-1 col-start-2 col-span-1"
  },
  {
    name: "Annual Reports",
    link: "/reports",
    src: "https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    // Sketch: Item 5 (bottom-left) - short wide rectangle, spans 1 grid row
    customClasses: "row-start-5 row-span-1 col-start-1 col-span-1"
  },
  {
    name: "Faculty & Staff",
    link: "/faculty-staff",
    src: "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    // Sketch: Item 6 (bottom-right) - short wide rectangle, spans 1 grid row
    customClasses: "row-start-5 row-span-1 col-start-2 col-span-1"
  },
];

const About: React.FC = () => (
  <section id="about" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-5">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Dynamic Photo Grid (Custom Staggered Layout) */}
        <div className="grid grid-cols-2 grid-rows-5 gap-4 h-[calc(20rem*2.4)]"> {/* Fixed height for consistency */}
          {aboutLinks.map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              // Added h-full to ensure the link fills its grid cell's height
              className={`relative w-full overflow-hidden rounded-lg bg-gray-200 transition-transform duration-300 hover:scale-105 group block ${item.customClasses} h-full`}
            >
              <img
                src={item.src}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-end">
                <p className="px-4 py-3 text-white text-sm font-semibold w-full transition-transform duration-300 transform translate-y-full group-hover:translate-y-0">
                  {item.name}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Text */}
        <div className="pt-6 lg:pt-0">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#142143] mb-6">About Us</h2>
          <p className="text-xl text-gray-700 mb-6">
            MATS University is one of the leading universities of Central India.
          </p>
          <p className="text-gray-600 mb-6">
          MATS University is one of the leading universities of Central India.
          At MATS, we are committed to developing leaders who are not merely skilled professionals but also compassionate people with strong ethical values and discipline.
          We provide our students with the information, skills, confidence, and experience necessary to improve the world around them. MATS University not only develops their students individually but also gives them time and opportunity to develop new interests, learn new skills, and meet new people.
          Established in 2006, MATS University has emerged as a leading educational institute in Raipur, committed to nurturing future leaders and professionals across various disciplines. We take pride in our distinguished faculty members who are experts in their respective roles, dedicating themselves to imparting knowledge and mentorship to our students.
          </p>
          <p className="text-gray-600 mb-6">
          MATS University is one of the leading universities of Central India.
          At MATS, we are committed to developing leaders who are not merely skilled professionals but also compassionate people with strong ethical values and discipline.
          We provide our students with the information, skills, confidence, and experience necessary to improve the world around them. MATS University not only develops their students individually but also gives them time and opportunity to develop new interests, learn new skills, and meet new people.
          Established in 2006, MATS University has emerged as a leading educational institute in Raipur, committed to nurturing future leaders and professionals across various disciplines. We take pride in our distinguished faculty members who are experts in their respective roles, dedicating themselves to imparting knowledge and mentorship to our students.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default About;