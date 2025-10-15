// src/pages/universityAcademic.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import ChatBot from '../../components/chatbot/chatbot';
import ActionMenu from '../../components/actionMenu/actionMenu';
import Navbar from '../../components/navbar/navbar';

/* ------------ Programmes Photos (demo links for now) ------------ */
const programmePhotos = [
  'https://via.placeholder.com/300x150?text=Programme+1',
  'https://via.placeholder.com/300x150?text=Programme+2',
  'https://via.placeholder.com/300x150?text=Programme+3',
  'https://via.placeholder.com/300x150?text=Programme+4',
];

/* ------------ Library Photos (demo links for now) ------------ */
const libraryPhotos = [
  'https://via.placeholder.com/300x150?text=Library+1',
  'https://via.placeholder.com/300x150?text=Library+2',
  'https://via.placeholder.com/300x150?text=Library+3',
];

/* ------------ Programmes Data ------------ */
const programmeData = [
  {
    school: 'MATS School of Management and Business Studies',
    programs: [
      { name: 'Bachelor of Business Administration (BBA)', duration: '3/4 Years', level: 'UG', fees: '86,000' },
      { name: 'Bachelor of Commerce (B.Com Honours)', duration: '3/4 Years', level: 'UG', fees: '55,000' },
      { name: 'Master of Commerce (M.Com)', duration: '2 Years', level: 'PG', fees: '35,000' },
    ],
  },
  {
    school: 'MATS School of Information Technology',
    programs: [
      { name: 'Bachelor of Computer Application (BCA)', duration: '3/4 Years', level: 'UG', fees: '68,000' },
      { name: 'Master of Computer Application (MCA)', duration: '2 Years', level: 'PG', fees: '55,000' },
    ],
  },
  {
    school: 'MATS School of Law',
    programs: [
      { name: 'Bachelor of Arts + Bachelor of Law (BA LLB)', duration: '5 Years', level: 'Integrated', fees: '75,000' },
      { name: 'Bachelor of Law (LLB)', duration: '3 Years', level: 'UG', fees: '50,000' },
    ],
  },
];

/* ------------ Library Data ------------ */
const librarySections = [
  {
    title: 'Library Resources',
    content: (
      <table className="w-full text-left bg-white rounded shadow overflow-auto mt-2">
        <thead>
          <tr className="bg-[#ffaf00]/30">
            <th className="py-2 px-4">Type</th>
            <th className="py-2 px-4">Number/Volume</th>
            <th className="py-2 px-4">Remark</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="py-2 px-4">Text Books</td><td>53,717</td><td></td></tr>
          <tr><td className="py-2 px-4">Rare Books</td><td>07</td><td></td></tr>
          <tr><td className="py-2 px-4">Reference Books</td><td>18,265</td><td></td></tr>
          <tr><td className="py-2 px-4">E-Books</td><td>310,000</td><td>DELNET</td></tr>
          <tr><td className="py-2 px-4">E-Journals</td><td>45,000</td><td>DELNET</td></tr>
          <tr><td className="py-2 px-4">Journals (Hard Copy)</td><td>143/350</td><td></td></tr>
          <tr><td className="py-2 px-4">CDs & Videos</td><td>998</td><td></td></tr>
        </tbody>
      </table>
    ),
  },
  {
    title: 'Online E-Resources',
    content: (
      <ul className="list-disc pl-5 text-gray-700 mt-2 space-y-1">
        <li>Delnet</li>
        <li>NDL</li>
        <li>Swayam</li>
        <li>NPTEL</li>
        <li>ePGpathshala</li>
        <li>World Bank Publication</li>
        <li>Virtual Library of India</li>
        <li>DOAJ</li>
        <li>Free ebooks</li>
        <li>oAcharya</li>
        <li>Infibnet Open Access Journals</li>
        <li>World ebook library</li>
      </ul>
    ),
  },
  {
    title: 'Digital Database',
    content: (
      <ul className="list-disc pl-5 text-gray-700 mt-2 space-y-1">
        <li>Manupatra (Law)</li>
        <li>E-Shodhsindhu</li>
      </ul>
    ),
  },
];

/* ------------ Academic Calendars ------------ */
const academicCalendarImgs = [
  '/images/calendar1.jpg',
  '/images/calendar2.jpg',
];

/* ------------ Collaboration Desc ------------ */
const collaborationDesc = `MATS University, Raipur, proudly collaborates with numerous prestigious national and international universities, institutions, academic organizations, and industries through extensive Memorandums of Understanding (MoUs). These partnerships enable us to foster academic excellence, innovation, and global engagement. Our collaborations span diverse areas, including faculty and student exchanges, joint research initiatives, skill development programs, and industry-integrated learning opportunities. With alliances across the USA, UK, Canada, Australia, and top institutions in India, MATS University bridges the gap between academia and industry, ensuring holistic development and employability for our students. Together, we aim to push boundaries, drive innovation, and create a transformative impact on education and society.`;

const UniversityAcademic: React.FC = () => {
  const [openSchool, setOpenSchool] = useState<string | null>(null);
  const [openLibrary, setOpenLibrary] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <>
    <Navbar/>
    <section className="bg-gray-50 min-h-screen pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">

        
        {/* Page Title */}
        <div className="text-center mb-12 bg-[#142143] text-white py-16 rounded-2xl ">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            University Academic
          </h1>
          <p className="text-lg text-white">
            Explore our programmes, library, academic calendars, and collaborations.
          </p>
        </div>

        {/* Programmes */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#142143] mb-4">Programmes</h2>
          
          {/* Photo Row */}
          <div className="flex gap-4 overflow-x-auto mb-6">
            {programmePhotos.map((src, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 rounded-lg overflow-hidden shadow-lg w-[80vw] sm:w-[45vw] md:w-[30vw]"
              >
                <img src={src} alt={`Programme Photo ${idx + 1}`} className="w-full h-32 object-cover" />
              </div>
            ))}
          </div>

          {/* Expandable School List */}
          <div className="space-y-4">
            {programmeData.map(({ school, programs }) => (
              <div key={school} className="bg-white rounded-lg shadow p-4">
                <button
                  onClick={() => setOpenSchool(openSchool === school ? null : school)}
                  className="w-full text-left font-semibold text-lg text-[#142143] flex justify-between items-center"
                >
                  {school}
                  <span>{openSchool === school ? '−' : '+'}</span>
                </button>
                {openSchool === school && (
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full border">
                      <thead className="bg-[#ffaf00]/30">
                        <tr>
                          <th className="px-4 py-2">Program Name</th>
                          <th className="px-4 py-2">Duration</th>
                          <th className="px-4 py-2">Level</th>
                          <th className="px-4 py-2">Fees/Year</th>
                        </tr>
                      </thead>
                      <tbody>
                        {programs.map((p) => (
                          <tr key={p.name} className="border-t">
                            <td className="px-4 py-2">{p.name}</td>
                            <td className="px-4 py-2">{p.duration}</td>
                            <td className="px-4 py-2">{p.level}</td>
                            <td className="px-4 py-2">{p.fees}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Library */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#142143] mb-4">Library</h2>

          {/* Photo Row */}
          <div className="flex gap-4 overflow-x-auto mb-6">
            {libraryPhotos.map((src, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 rounded-lg overflow-hidden shadow-lg w-[80vw] sm:w-[45vw] md:w-[30vw]"
              >
                <img src={src} alt={`Library Photo ${idx + 1}`} className="w-full h-32 object-cover" />
              </div>
            ))}
          </div>

          {/* Expandable Library Sections */}
          {librarySections.map(({ title, content }) => (
            <div key={title} className="bg-white rounded-lg shadow p-4 mb-4">
              <button
                onClick={() => setOpenLibrary(openLibrary === title ? null : title)}
                className="w-full text-left font-semibold text-lg text-[#142143] flex justify-between items-center"
              >
                {title}
                <span>{openLibrary === title ? '−' : '+'}</span>
              </button>
              {openLibrary === title && <div className="mt-3">{content}</div>}
            </div>
          ))}
        </div>

        {/* Academic Calendar */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#142143] mb-4">Academic Calendars</h2>
          <div className="flex gap-6 overflow-x-auto pb-2">
            {academicCalendarImgs.map((src, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden shadow min-w-[220px] max-w-[320px] flex-shrink-0">
                <img src={src} alt={`Academic Calendar ${idx + 1}`} className="w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Collaborations */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#142143] mb-4">Collaborations</h2>
          <p className="text-gray-700 mb-8">{collaborationDesc}</p>
          <div className="flex gap-4 flex-wrap">
            <button
              className="bg-[#142143] text-[#ffaf00] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#ffaf00] hover:text-[#142143] transition"
              onClick={() => navigate('/mou-national')}
            >
              MOU National
            </button>
            <button
              className="bg-[#142143] text-[#ffaf00] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#ffaf00] hover:text-[#142143] transition"
              onClick={() => navigate('/mou-international')}
            >
              MOU International
            </button>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    <ChatBot/>
    <ActionMenu/>

    </>  );
};

export default UniversityAcademic;
