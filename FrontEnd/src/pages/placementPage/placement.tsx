// src/pages/placement/placement.tsx
import Navbar from '../../components/navbar/navbar';
import React, { useState } from 'react';
import { ArrowRight, Building, Users, Target, Globe, Briefcase, X, Upload, User, Mail, Phone, BookOpen, GraduationCap } from 'lucide-react';
import Footer from '../../components/footer/footer';
import ActionMenu from '../../components/actionMenu/actionMenu';
import ChatBot from '../../components/chatbot/chatbot';

const PlacementPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    studentId: '',
    course: '',
    year: '',
    cgpa: '',
    skills: '',
    resume: null as File | null
  });

  // Dummy student placement data
  const placementData = [
    {
      id: 1,
      name: "Rajesh Kumar",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      company: "TCS",
      position: "Software Engineer",
      package: "₹6.5 LPA"
    },
    {
      id: 2,
      name: "Priya Sharma",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      company: "Infosys",
      position: "System Analyst",
      package: "₹7.2 LPA"
    },
    {
      id: 3,
      name: "Amit Singh",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      company: "Wipro",
      position: "Business Analyst",
      package: "₹8.0 LPA"
    },
    {
      id: 4,
      name: "Sneha Patel",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      company: "Accenture",
      position: "Consultant",
      package: "₹9.5 LPA"
    },
    {
      id: 5,
      name: "Rohit Gupta",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      company: "IBM",
      position: "Data Scientist",
      package: "₹12.0 LPA"
    },
    {
      id: 6,
      name: "Kavya Reddy",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      company: "Microsoft",
      position: "Software Developer",
      package: "₹15.0 LPA"
    },
    {
      id: 7,
      name: "Arjun Mehta",
      photo: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
      company: "Google",
      position: "Product Manager",
      package: "₹22.0 LPA"
    },
    {
      id: 8,
      name: "Divya Agarwal",
      photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      company: "Amazon",
      position: "UX Designer",
      package: "₹18.0 LPA"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile: File = files[0];
      setFormData(prev => ({ 
        ...prev, 
        resume: selectedFile 
      }));
    } else {
      setFormData(prev => ({ 
        ...prev, 
        resume: null 
      }));
    }
  };
  
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Registration submitted successfully!');
    setIsModalOpen(false);
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      studentId: '',
      course: '',
      year: '',
      cgpa: '',
      skills: '',
      resume: null
    });
  };

  return ( 
    <>
      <Navbar/>
      <div className="min-h-screen bg-gray-50 pt-32">
        {/* Hero Section */}
        <section className="bg-[#142143] text-white py-16 rounded-2xl ml-5 mr-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Training & Placement Cell</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Building bridges between academic excellence and industry success
            </p>
            
            {/* Registration Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-[#142143] px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Register for Placement
              <ArrowRight className="inline ml-2 h-5 w-5" />
            </button>
          </div>
        </section>

        {/* About T&P Cell */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#142143] mb-4">About T&P Cell</h2>
            </div>

            <div className="mb-12">
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                The Training and Placement Cell (T&P Cell) of MATS University facilitates prospective employers 
                by organizing institute-industry interactions regularly, providing complete support for arranging 
                placement activities on campus, and recommending students for internship and placement.
              </p>
            </div>

            {/* Vision */}
            <div className="mb-12">
              <div className="bg-[#142143] rounded-2xl p-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#142143] rounded-full p-3 flex-shrink-0">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">VISION STATEMENT OF T&P Cell</h3>
                    <p className="text-white leading-relaxed mb-6">
                      The T&P Cell of MATS envisions an ideal interface between industry requirements and student 
                      aspirations, ensuring that the right person is placed in the right job. This also ensures that 
                      the industry benefits from students taking up roles and responsibilities, contributing to the 
                      growth of the organization.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <ArrowRight className="h-5 w-5 text-white mt-1 flex-shrink-0" />
                        <p className="text-white">
                          To develop national and international links with business organizations, creating meaningful 
                          relationships and opportunities for student placement in global job markets.
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <ArrowRight className="h-5 w-5 text-white mt-1 flex-shrink-0" />
                        <p className="text-white">
                          To develop students who are globally employable and industry-ready.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission & Objectives */}
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {/* Mission */}
              <div className="bg-gray-100 rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-[#142143] rounded-full p-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#142143]">MISSION</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ffaf00] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      To strengthen and enhance the Industry-Institute partnership through campus connects initiatives.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ffaf00] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      To create maximum placement opportunities for eligible students by establishing strong rapport 
                      with industry professionals.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ffaf00] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      To impart personality development training to help students excel in this competitive era.
                    </p>
                  </div>
                </div>
              </div>

              {/* Objectives */}
              <div className="bg-gray-100 rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-[#142143] rounded-full p-3">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#142143]">OBJECTIVES</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ffaf00] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      To source profiles that offer futuristic growth with broader horizons.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ffaf00] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      Establish connections with corporate and start-ups across verticals.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ffaf00] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      Develop a market for MATS students in the industry, positioning them as future management leaders.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ffaf00] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      Maintain a comprehensive database of companies and establish strategic links for campus recruitment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Student Placements Showcase */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#142143] mb-4">Our Success Stories</h2>
              <p className="text-lg text-gray-600">
                Meet our talented graduates who have secured excellent placements
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {placementData.map((student) => (
                <div key={student.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="text-center mb-4">
                      <img
                        src={student.photo}
                        alt={student.name}
                        className="w-20 h-20 rounded-full mx-auto object-cover mb-4"
                      />
                      <h3 className="text-lg font-bold text-[#142143] mb-1">{student.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">{student.package}</p>
                    </div>
                    
                    <div className="bg-[#ffaf00] rounded-lg p-4 text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Building className="h-4 w-4 text-[#142143]" />
                        <p className="font-bold text-[#142143] text-sm">{student.company}</p>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Briefcase className="h-4 w-4 text-[#142143]" />
                        <p className="text-[#142143] text-sm">{student.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-[#142143] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-[#ffaf00] mb-2">95%</div>
                <div className="text-white/80">Placement Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#ffaf00] mb-2">250+</div>
                <div className="text-white/80">Companies</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#ffaf00] mb-2">₹22 LPA</div>
                <div className="text-white/80">Highest Package</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#ffaf00] mb-2">₹6.8 LPA</div>
                <div className="text-white/80">Average Package</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#142143]">Placement Registration</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <User className="inline h-4 w-4 mr-1" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffaf00] focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Mail className="inline h-4 w-4 mr-1" />
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffaf00] focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Phone className="inline h-4 w-4 mr-1" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffaf00] focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Student ID */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <BookOpen className="inline h-4 w-4 mr-1" />
                      Student ID *
                    </label>
                    <input
                      type="text"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffaf00] focus:border-transparent"
                      placeholder="Enter your student ID"
                    />
                  </div>

                  {/* Course */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <GraduationCap className="inline h-4 w-4 mr-1" />
                      Course *
                    </label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffaf00] focus:border-transparent"
                    >
                      <option value="">Select your course</option>
                      <option value="B.Tech">B.Tech</option>
                      <option value="MBA">MBA</option>
                      <option value="MCA">MCA</option>
                      <option value="B.Com">B.Com</option>
                      <option value="BBA">BBA</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Year */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Year of Study *
                    </label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffaf00] focus:border-transparent"
                    >
                      <option value="">Select year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="Final Year">Final Year</option>
                    </select>
                  </div>
                </div>

                {/* CGPA */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    CGPA *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    name="cgpa"
                    value={formData.cgpa}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffaf00] focus:border-transparent"
                    placeholder="Enter your CGPA"
                  />
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Skills & Technologies
                  </label>
                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffaf00] focus:border-transparent"
                    placeholder="List your skills and technologies (e.g., Java, Python, React, etc.)"
                  />
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Upload className="inline h-4 w-4 mr-1" />
                    Resume Upload *
                  </label>
                  <input
                    type="file"
                    name="resume"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffaf00] focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">Upload your resume (PDF, DOC, or DOCX format)</p>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#ffaf00] text-[#142143] rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                  >
                    Submit Registration
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <ActionMenu/>
      <ChatBot/>
      <Footer/>
    </>
  );
};

export default PlacementPage;
