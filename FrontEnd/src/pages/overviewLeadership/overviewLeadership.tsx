// src/pages/about/overviewLeadership.tsx
import React from 'react';
import { Target, Users, Heart, Award, Globe, Lightbulb, BookOpen, Shield } from 'lucide-react';

import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import ActionMenu from '../../components/actionMenu/actionMenu';
import ChatBot from '../../components/chatbot/chatbot';

// Keyframe animation for the marquee effect
// We'll define it here for easier embedding.
// You might also put this in your global CSS (e.g., index.css or global.css)
const marqueeStyles = `
  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-100%); }
  }

  .animate-marquee {
    animation: marquee var(--marquee-speed) linear infinite;
  }

  .animate-marquee:hover {
    animation-play-state: paused; /* Pause on hover */
  }
`;

const OverviewLeadershipPage: React.FC = () => {
  // Leadership team data
  const leadershipTeam = [
    {
      id: 1,
      name: "Dr. Deepika Dhand",
      position: "Pro Vice-Chancellor, MATS University, Raipur (C.G.)",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      message: ""
    },
    {
      id: 2,
      name: "Priyesh Pagariya",
      position: "Director General, MATS University, Raipur (C.G.)",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      message: ""
    },
    {
      id: 3,
      name: "Shri Gokulananda Panda",
      position: "Registrar, MATS University, Raipur (C.G.)",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      message: ""
    }
  ];

  // Inspirational figures (add more here to activate slider)
  const inspirationalFigures = [
    {
      name: "Dr Umesh Gupta",
      title: "MATS SCHOOL OF MANAGEMENT & BUSINESS STUDIES",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Prashant Kumar",
      title: "MATS LAW SCHOOL",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Dr Brijesh Patel",
      title: "MATS SCHOOL OF ENGINEERING & IT",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Dr Parvinder Hanspal",
      title: "MATS SCHOOL OF EDUCATION",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Dr Om Prakash Chandrakar",
      title: "MATS SCHOOL OF INFORMATION TECHNOLOGY ",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Dr Kalpana Chandrakar",
      title: "MATS SCHOOL OF LIBRARY SCIENCES",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "DR Ashish Sharaf",
      title: "MATS SCHOOL OF SCIENCES & FORENSIC SCIENCES",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face"
    },
    {
        name: "DR Amit Nayak",
        title: "MATS SCHOOL OF PHARMACY",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face"
    },
    {
        name: "Dr Mithlesh Singh",
        title: "MATS SCHOOL OF PHYSICAL EDUCATION & YOGA",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "PRAVINDAR KAUR",
      title: "MATS SCHOOL OF FASHION DESIGING & TECHNOLOGY",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "DR RAJANA DAS",
      title: "MATS SCHOOL OF ARTS & HUMANITIES - ENGLISH",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "DR RESHMA ANSARI",
      title: "MATS SCHOOL OF ARTS & HUMANITIES - HINDI",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "DR SHAISHTA ANSARI",
      title: "MATS SCHOOL OF ARTS & HUMANITIES - PSYCHOLOGY",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "DR PAYAL SINGH PODDAR",
      title: "MATS SCHOOL OF ARTS & HUMANITIES - SOCIAL WORK",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    }
  ];

  // Our values
  const values = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description: "We strive for excellence in all our endeavors, maintaining the highest standards in education, research, and service."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Integrity",
      description: "We uphold the highest ethical standards and conduct ourselves with honesty, transparency, and accountability."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Innovation",
      description: "We embrace creativity and innovation, encouraging new ideas and approaches to learning and problem-solving."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Compassion",
      description: "We care for our students, faculty, staff, and community, fostering an environment of mutual respect and support."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Diversity",
      description: "We celebrate diversity and create an inclusive environment where all individuals can thrive and succeed."
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Leadership",
      description: "We develop leaders who make a positive impact in their communities and contribute to society's betterment."
    }
  ];

  const InspirationalSlider: React.FC = () => { // Renamed from InspirationalMarqueeSlider to match usage
    // If there are few items (e.g., 4 or fewer), render a static grid instead of a slider
    // You can adjust this threshold
    if (inspirationalFigures.length <= 4) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {inspirationalFigures.map((figure, index) => (
            <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <img
                src={figure.photo}
                alt={figure.name}
                className="w-24 h-24 rounded-lg mx-auto mb-4 object-cover grayscale hover:grayscale-0 transition-all duration-300"
              />
              <h4 className="text-lg font-bold text-[#142143] mb-2">{figure.title}</h4>
              <p className="text-gray-600 text-sm italic">{figure.name}</p>
            </div>
          ))}
        </div>
      );
    }

    // Duplicate the figures to create a seamless loop for the marquee effect
    // This effectively doubles the array
    const doubledFigures = [...inspirationalFigures, ...inspirationalFigures];

    // Calculate a dynamic speed based on the number of items
    // More items = longer duration to maintain a consistent perceived speed
    const marqueeSpeed = `${inspirationalFigures.length * 5}s`; // e.g., 13 items * 5s = 65s

    return (
      <div className="relative overflow-hidden py-8 mt-12 bg-white rounded-xl shadow-inner">
        {/* Embed the CSS styles for the marquee animation */}
        <style>{marqueeStyles}</style>

        {/* The inner container that holds the duplicated items and will be animated */}
        <div
          className="flex flex-nowrap gap-6 animate-marquee"
          style={{ '--marquee-speed': marqueeSpeed, width: `${doubledFigures.length * 18}rem` } as React.CSSProperties} // Set a large enough width based on item width (w-64 is 16rem, + gap)
        >
          {doubledFigures.map((figure, index) => (
            <div
              key={index} // It's okay to use index here since items are only added/removed from the end
              className="flex-shrink-0 w-64 bg-gray-50 border-2 border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
            >
              <img
                src={figure.photo}
                alt={figure.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover grayscale hover:grayscale-0 transition-all duration-300"
              />
              <h4 className="text-lg font-bold text-[#142143] mb-2">{figure.title}</h4>
              <p className="text-gray-600 text-sm italic">{figure.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-32">
        
        {/* Hero Section */}
        <section className="bg-[#142143] text-white py-16 rounded-2xl ml-5 mr-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Overview & Leadership</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our journey, leadership, and the values that drive MATS University forward
            </p>
          </div>
        </section>

        {/* About University Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#142143] mb-4">About MATS University</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop"
                  alt="MATS University Campus"
                  className="rounded-2xl shadow-lg"
                />
              </div>
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Welcome to MATS UNIVERSITY - a university whose top priority is to help students fulfill 
                  their aspirations and dreams. We work in tandem with students to design customized 
                  educational plans that meet their individual goals.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Among other things, we offer our students a personalized learning environment with a great 
                  deal of flexibility and continuous mentoring. We integrate technical knowledge with strong 
                  ethics and leadership quality to churn out the best.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our vision is to be recognized for high-quality academic programmes and research through 
                  industry programmes, excellence of our motivated faculty, and state-of-the-art facilities 
                  that we provide students.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Messages */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[#142143] mb-4">Messages from Leadership</h2>
            </div>

            {/* Chancellor Message */}
            <div className="bg-white rounded-2xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#142143] mb-2">CHANCELLOR'S MESSAGE</h3>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <div className="text-center">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
                      alt="Shri Gajraj Pagariya"
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h4 className="text-lg font-bold text-[#142143]">Shri Gajraj Pagariya</h4>
                    <p className="text-[#142143]">Chancellor, MATS University</p>
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  <div className="space-y-4 text-[#142143]">
                    <p><strong>Dear Achievers,</strong></p>
                    <p>
                      We are witnessing a phenomenal change in the education scenario. The change has been 
                      both in terms of the content as well as the reach. The trend has been to instill the element 
                      of <span className="text-red-500 font-semibold">excellence</span> in every field. The best in every field of knowledge is being made available 
                      for the progress of the country. This has been a very crucial moment for us 
                      in taking important and far-reaching decisions to provide what is much needed for the 
                      students of the country.
                    </p>
                    <p>
                      We are aware of the needs of our country to make her a knowledge-based superpower in 
                      the next decade or two. With this in view, we have stepped in to meet the present-day 
                      academic milieu for the student community. The idea is to create opportunities in various 
                      fields by incorporating the latest specialties of learning, which would cater to the critical 
                      needs of the industry and economy.
                    </p>
                    <p>
                      We foresee a close interaction among the <span className="text-red-500 font-semibold">universities, industries,</span> business houses, and associations in modeling the content and skills. 
                      This will make education more vocational and skill-based, resulting in better employability and productivity, ultimately contributing to the 
                      nation's economy.
                    </p>
                    <p>
                      The latest advances in technology and communication have provided a great impetus in designing and delivering innovative ways of 
                      learning. Distance learning and virtual education have been a boon in enlisting thousands of hitherto wasted human potential into useful, 
                      skillful, employable citizens.
                    </p>
                    <p>
                      Yet another futuristic guidepost for the respective generations is the field of <span className="text-red-500 font-semibold">Entrepreneurship.</span> Join Group of Institutions, through its 
                      remarkable new child, MATS University, aims at crafting and nurturing budding entrepreneurs who would eventually build a new-fangled 
                      knowledge society that contributes towards the national cause.
                    </p>
                    <div className="mt-6">
                      <p className="font-semibold">Best Wishes</p>
                      <p>Shri Gajraj Pagariya</p>
                      <p>Chancellor, MATS University</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vice Chancellor Message */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 mt-10">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#142143] mb-2">VICE CHANCELLOR'S MESSAGE</h3>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <div className="text-center">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                      alt="Prof. (Dr.) K.P. Yadav"
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h4 className="text-lg font-bold text-[#142143]">Prof. (Dr.) K.P. Yadav</h4>
                    <p className="text-gray-600">Vice Chancellor, MATS University</p>
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  <div className="space-y-4 text-gray-700">
                    <p><strong>Dear Achievers,</strong></p>
                    <p>
                      Welcome to MATS UNIVERSITY - a university whose top priority is to help students fulfill 
                      their aspirations and dreams. We work in tandem with students to design customized 
                      educational plans that meet their individual goals. Among other things, we offer our 
                      students a personalized learning environment with a great deal of flexibility and 
                      continuous mentoring. We integrate technical knowledge with strong ethics and 
                      leadership quality to churn out the best.
                    </p>
                    <p>
                      Our vision is to be recognized for high-quality academic programmes and research 
                      through industry programmes, excellence of our motivated faculty, and state-of-the-art 
                      facilities that we provide students. Our academic programmes prepare students better to 
                      face new challenges through stronger ethics and entrepreneurship components. We are 
                      committed to giving our students an environment, in which they develop critical-thinking 
                      and problem-solving skills.
                    </p>
                    <p>
                      We are committed to molding world-class leaders who make a difference to society. We inspire dreams, ignite curiosity, motivate actions, 
                      and define the vision beyond tomorrow. I am happy that you are considering MATS for your studies and I look forward to helping you take 
                      this exciting step in your life.
                    </p>
                    <p>
                      At MATS, students are guided and motivated to practically implement the principles learnt in classrooms through experimentation in 
                      laboratories, making them confident and skilled professionals. As we strive to be at the forefront of education, We collaborate with and 
                      maintain excellent relationships with industries and leading research centers for joint projects, training, and internships. This gives our 
                      students an edge, which reflects fully in our high placement records year after year.
                    </p>
                    <div className="mt-6">
                      <p className="font-semibold">Best Wishes</p>
                      <p>Prof. (Dr.) K.P. Yadav</p>
                      <p>Vice Chancellor, MATS University</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </section>

        {/* Our Leadership Team */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#142143] mb-4">Our Leadership Team</h2>
              <p className="text-lg text-gray-600">
                Meet the visionary leaders who guide MATS University towards excellence
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {leadershipTeam.map((leader) => (
                <div key={leader.id} className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                  <img
                    src={leader.photo}
                    alt={leader.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-xl font-bold text-[#142143] mb-2">{leader.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{leader.position}</p>
                </div>
              ))}
            </div>

            {/* Inspirational Figures - UPDATED TO USE SLIDER */}
            <InspirationalSlider /> {/* This now correctly points to the new marquee slider */}
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[#142143] mb-4">Vision & Mission</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Vision */}
              <div className="bg-[#142143] rounded-2xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <div className="bg-[#ffaf00] rounded-full p-4 mr-4">
                    <Target className="h-8 w-8 text-[#142143]" />
                  </div>
                  <h3 className="text-3xl font-bold">VISION</h3>
                </div>
                <p className="text-lg leading-relaxed">
                  To become a world-class center in providing globally relevant education. MATS will be the 
                  Global University, known for the <span className="text-[#ffaf00] font-semibold">quality academic programs</span> and <span className="text-[#ffaf00] font-semibold">outstanding faculty,</span> 
                  products, and services to students and clients independent of place and time constraints. 
                  MATS University will be a benchmark institution for <span className="text-[#ffaf00] font-semibold">lifelong partnerships</span> with students, 
                  the workforce, and public and private enterprises. Building on its proud tradition, MATS 
                  University will extend educational opportunities to those who will make our state 
                  (Chhattisgarh), our nation, and global society a better place to live and work.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-[#ffaf00] rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-[#142143] rounded-full p-4 mr-4">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-[#142143]">MISSION</h3>
                </div>
                <div className="space-y-4 text-[#142143]">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-[#142143] rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <p>
                      To foster an intellectual and ethical environment in which the spirit and skills within MATS will thrive to 
                      impart high quality education, training, research and consultancy services with a global outlook and 
                      human values.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-[#142143] rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <p>
                      To create and develop technocrats, entrepreneurs and business leaders who will strive to improve the 
                      quality of human life.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-[#142143] rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <p>
                      To create truly world class schools of Management Sciences, Engineering Sciences, Information 
                      Technology, Life Science, Basic and Applied Sciences, Humanities & Social Sciences and Life Skills.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[#142143] mb-4">Our Values</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                The core values that guide everything we do at MATS University
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-8 hover:bg-[#ffaf00]/10 transition-colors group">
                  <div className="text-[#ffaf00] group-hover:text-[#142143] transition-colors mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#142143] mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <ActionMenu />
      <ChatBot />
      <Footer />
    </>
  );
};

export default OverviewLeadershipPage;