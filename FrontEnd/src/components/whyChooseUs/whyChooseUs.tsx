// src/component/whyChooseUs/whyChooseUs.tsx
import React from 'react';
import { Award, Users, Globe, Heart } from 'lucide-react';

const cardData = [
  {
    number: '01',
    title: 'Holistic Learning',
    description:
      'We focus on the all-round development of every student — blending academics, creativity, leadership, and life skills.',
    icon: <Award className="h-6 w-6 text-gray-300" />,
  },
  {
    number: '02',
    title: 'Industry-Linked Curriculum',
    description:
      'Our curriculum is co-designed with industry experts to keep pace with emerging technologies and market needs.',
    icon: <Users className="h-6 w-6 text-gray-300" />,
  },
  {
    number: '03',
    title: 'Innovative & Global Outlook',
    description:
      'From modern pedagogy to international collaborations, we prepare students for a global stage.',
    icon: <Globe className="h-6 w-6 text-gray-300" />,
  },
  {
    number: '04',
    title: 'Value-Based Education',
    description:
      'We believe education goes beyond degrees. Our value-based approach fosters ethics, empathy, and compassion.',
    icon: <Heart className="h-6 w-6 text-gray-300" />,
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="bg-white text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-left mb-10">
          <p className="text-sm uppercase tracking-widest text-gray-400 ">Why Choose Us <strong>- MATS UNIVERSITY</strong></p>

          <h2 className="text-5xl font-extrabold text-white/95 mb-6 leading-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
            A Legacy of Excellence, a Future of Possibility
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line max-w-3xl">
            From world-renowned academics to a one-of-a-kind <br /> 
            collegiate experience, discover what sets 
            MATS University apart <br />
            — and why it’s the first choice for scholars, researchers, and leaders from around the globe. <br />
            Experience innovation, excellence, and growth beyond boundaries.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="bg-[#142143] rounded-2xl border border-gray-800 p-6 hover:border-gray-700 transition-all duration-300 flex flex-col justify-between min-h-[240px]"
            >
              <div>
                <div className="text-gray-500 text-sm font-medium mb-3">{card.number}</div>
                <div className="mb-3">{card.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-white/95 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
                  {card.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

