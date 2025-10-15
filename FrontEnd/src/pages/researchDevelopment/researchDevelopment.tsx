// src/pages/researchDevelopment.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Microscope, 
  BookOpen, 
  Users, 
  Award, 
  Lightbulb, 
  FileText, 
  Building, 
  ExternalLink,
  Download,
  X
} from 'lucide-react';
import Footer from '../../components/footer/footer';
import ChatBot from '../../components/chatbot/chatbot';
import ActionMenu from '../../components/actionMenu/actionMenu';
import Navbar from '../../components/navbar/navbar';

/* ------------ Ph.D. Programs Data ------------ */
const phdPrograms = [
  {
    school: 'School of Engineering & IT',
    programs: [
      'Computer Science & Engineering',
      'Mechanical Engineering', 
      'Civil Engineering',
      'Electronics & Communication'
    ]
  },
  {
    school: 'School of Management',
    programs: [
      'Business Administration',
      'Commerce',
      'Economics'
    ]
  },
  {
    school: 'School of Sciences',
    programs: [
      'Physics',
      'Chemistry',
      'Mathematics',
      'Biotechnology'
    ]
  },
  {
    school: 'School of Humanities',
    programs: [
      'English Literature',
      'Psychology',
      'Education'
    ]
  }
];

/* ------------ Research Areas ------------ */
const researchAreas = [
  {
    icon: <Microscope className="h-8 w-8" />,
    title: 'Science & Technology',
    description: 'Advanced research in biotechnology, nanotechnology, and materials science.',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    icon: <Lightbulb className="h-8 w-8" />,
    title: 'Innovation & Engineering',
    description: 'Cutting-edge solutions in AI, IoT, renewable energy, and smart systems.',
    color: 'bg-green-100 text-green-600'
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: 'Social Sciences',
    description: 'Research in sociology, psychology, education, and human behavior.',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    icon: <Building className="h-8 w-8" />,
    title: 'Business & Management',
    description: 'Studies in organizational behavior, entrepreneurship, and market analysis.',
    color: 'bg-orange-100 text-orange-600'
  }
];

/* ------------ Research Facilities ------------ */
const facilities = [
  'Advanced Computing Laboratory',
  'Biotechnology Research Center',
  'Materials Testing Laboratory',
  'Digital Innovation Hub',
  'Psychology Research Lab',
  'Business Analytics Center'
];

/* ------------ All Publications (Extended List for Modal) ------------ */
const allPublications = [
  {
    title: 'Artificial Intelligence in Healthcare: A Comprehensive Review',
    authors: 'Dr. Smith, Dr. Patel',
    journal: 'International Journal of AI Research',
    year: '2024'
  },
  {
    title: 'Sustainable Energy Solutions for Rural Development',
    authors: 'Dr. Kumar, Dr. Sharma',
    journal: 'Renewable Energy Today',
    year: '2024'
  },
  {
    title: 'Machine Learning Applications in Financial Markets',
    authors: 'Dr. Gupta, Dr. Singh',
    journal: 'Journal of Financial Technology',
    year: '2024'
  },
  {
    title: 'Blockchain Technology for Supply Chain Management',
    authors: 'Dr. Verma, Dr. Joshi',
    journal: 'Supply Chain Innovation Quarterly',
    year: '2023'
  },
  {
    title: 'IoT-Based Smart City Infrastructure Development',
    authors: 'Dr. Rao, Dr. Mishra',
    journal: 'Smart Cities Review',
    year: '2023'
  },
  {
    title: 'Nanotechnology in Drug Delivery Systems',
    authors: 'Dr. Pandey, Dr. Agarwal',
    journal: 'Biomedical Nanotechnology',
    year: '2023'
  },
  {
    title: 'Digital Transformation in Higher Education',
    authors: 'Dr. Chandra, Dr. Tiwari',
    journal: 'Educational Technology & Society',
    year: '2023'
  },
  {
    title: 'Climate Change Impact on Agricultural Productivity',
    authors: 'Dr. Saxena, Dr. Dubey',
    journal: 'Environmental Science & Policy',
    year: '2022'
  }
];

// Recent publications (first 2 for display)
const publications = allPublications.slice(0, 2);

const ResearchDevelopment: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
    <Navbar/>
    <section className="bg-gray-50 min-h-screen pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-[#142143] mb-6">
            Research & Development
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Advancing knowledge through innovative research, fostering academic excellence, 
            and driving technological breakthroughs that shape the future.
          </p>
        </div>

        {/* Ph.D. Programs */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#142143] mb-4">Ph.D. Programs</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The Doctor of Philosophy (Ph.D.) programs provide an opportunity to students to undertake 
              advanced studies in subjects where they have already acquired post-graduation qualifications.
            </p>
          </div>

          <div className="space-y-8">
            {phdPrograms.map(({ school, programs }) => (
              <div key={school} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-[#142143] mb-4">{school}</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {programs.map((program) => (
                    <div key={program} className="bg-[#ffaf00]/10 p-4 rounded-lg border-l-4 border-[#ffaf00]">
                      <span className="font-semibold text-[#142143]">Ph.D. in {program}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Research Areas */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#142143] mb-4">Research Areas</h2>
            <p className="text-lg text-gray-600">
              Our multidisciplinary research spans across various domains of knowledge.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {researchAreas.map((area, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
                <div className={`w-16 h-16 rounded-full ${area.color} flex items-center justify-center mb-4`}>
                  {area.icon}
                </div>
                <h3 className="text-xl font-bold text-[#142143] mb-3">{area.title}</h3>
                <p className="text-gray-600">{area.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Research Facilities */}
        <div className="mb-16">
          <div className="bg-[#142143] rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Research Facilities</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {facilities.map((facility, idx) => (
                <div key={idx} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <Building className="h-6 w-6 text-[#ffaf00]" />
                    <span className="font-semibold">{facility}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Publications */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-[#142143]">Recent Publications</h2>
            <button 
              onClick={() => setShowModal(true)}
              className="text-[#ffaf00] font-semibold hover:underline flex items-center"
            >
              View All <ExternalLink className="ml-1 h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            {publications.map((pub, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-[#142143] mb-2">{pub.title}</h3>
                <p className="text-gray-600 mb-2">
                  <strong>Authors:</strong> {pub.authors}
                </p>
                <p className="text-gray-600 mb-3">
                  <strong>Published in:</strong> {pub.journal} ({pub.year})
                </p>
                <button className="text-[#ffaf00] font-semibold hover:underline flex items-center">
                  <Download className="mr-1 h-4 w-4" />
                  Download PDF
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#142143] to-[#ffaf00] rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Join Our Research Community</h2>
          <p className="text-lg mb-6 opacity-90">
            Explore opportunities to contribute to groundbreaking research and innovation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              className="bg-white text-[#142143] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition"
              onClick={() => navigate('/phd-admission')}
            >
              Apply for Ph.D.
            </button>
            <button 
              className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-[#142143] transition"
              onClick={() => navigate('/research-collaboration')}
            >
              Research Collaboration
            </button>
          </div>
        </div>
      </div>

      {/* Publications Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-[#142143]">All Publications</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-4">
                {allPublications.map((pub, idx) => (
                  <div key={idx} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                    <h3 className="text-lg font-bold text-[#142143] mb-2">{pub.title}</h3>
                    <p className="text-gray-600 mb-1">
                      <strong>Authors:</strong> {pub.authors}
                    </p>
                    <p className="text-gray-600 mb-3">
                      <strong>Published in:</strong> {pub.journal} ({pub.year})
                    </p>
                    <button className="text-[#ffaf00] font-semibold hover:underline flex items-center text-sm">
                      <Download className="mr-1 h-4 w-4" />
                      Download PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
    <Footer/>
    <ChatBot/>
    <ActionMenu/>
    </>
  );
};

export default ResearchDevelopment;
