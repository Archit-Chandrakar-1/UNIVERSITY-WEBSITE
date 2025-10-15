// src/pages/ExaminationCellPage.tsx
import React from 'react';
import Navbar from '../../components/navbar/navbar';
import ActionMenu from '../../components/actionMenu/actionMenu';
import Footer from '../../components/footer/footer';
import DownloadButton from '../../components/examinationCell/downloadButton';

import {
  CheckCircle, Lightbulb, Link as LinkIcon,
  Book, Download, Users, MessageSquareText
} from 'lucide-react'; // Icons

// Placeholder for University Name - replace with actual
const UNIVERSITY_NAME = "MATS UNIVERSITY";



// COE Details
const COE_PHOTO_URL = "https://via.placeholder.com/150x150.png?text=Dr.+Pradeep+Saxena"; // Replace with actual URL
const COE_NAME = "Dr. Pradeep Saxena"; // Controller of Examinations
const COE_MESSAGE = "The Examination Cell is committed to maintaining the highest standards of integrity and fairness in all assessment processes. Our goal is to ensure a smooth and equitable examination experience for all students. We are continuously working towards adopting innovative technologies to enhance efficiency and transparency in result management. I urge all students to adhere strictly to the examination guidelines and wish you the very best in your academic pursuits.";


const ExaminationCellPage: React.FC = () => {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen pt-20 pb-10 px-2 sm:px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">

        <section className="mt-36 mb-5 bg-[#142143] text-white py-16 rounded-2xl ml-5 mr-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Examination Cell</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Where Academic Assessments Meet Transparency and Efficiency
            </p>
          </div>
        </section>
          

          {/* Short Introduction */}
          <section className="bg-white p-6 md:p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-[#ffaf00] mb-4 flex items-center gap-3">
              <Lightbulb className="text-[#142143]" /> Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The Examination Cell of {UNIVERSITY_NAME} is responsible for planning, conducting, and managing all academic examinations in a fair and transparent manner. The cell ensures that all evaluation processes align with university regulations, academic integrity, and quality standards.
            </p>
          </section>

          {/* COE Message and Photo */}
          <section className="bg-white p-6 md:p-8 rounded-lg shadow-md mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex-shrink-0 text-center md:text-left">
              <img
                src={COE_PHOTO_URL}
                alt={COE_NAME}
                className="w-32 h-32 rounded-full object-cover border-4 border-[#ffaf00] shadow-lg mx-auto md:mx-0"
              />
              <p className="text-lg font-semibold text-[#142143] mt-3">{COE_NAME}</p>
              <p className="text-gray-600 text-sm">Controller of Examinations</p>
            </div>
            <div className="flex-1 text-gray-700 leading-relaxed text-center md:text-left">
              <h3 className="text-xl font-semibold text-[#ffaf00] mb-3 flex items-center gap-2 justify-center md:justify-start">
                <MessageSquareText className="text-[#142143]" /> Message from the COE
              </h3>
              <p>"{COE_MESSAGE}"</p>
            </div>
          </section>

          {/* Vision & Mission */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#142143] mb-3 flex items-center gap-2">
                <CheckCircle className="text-[#ffaf00]" /> Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To uphold excellence, transparency, and efficiency in the examination and evaluation system.
              </p>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#142143] mb-3 flex items-center gap-2">
                <Lightbulb className="text-[#ffaf00]" /> Mission
              </h3>
              <ul className="list-disc pl-5 text-gray-700 leading-relaxed space-y-2">
                <li>To conduct examinations in a fair and systematic manner.</li>
                <li>To maintain confidentiality and integrity in assessment.</li>
                <li>To adopt digital and innovative methods for exam management.</li>
                <li>To ensure timely publication of results and academic records.</li>
              </ul>
            </div>
          </section>

          {/* Roles & Responsibilities */}
          <section className="bg-white p-6 md:p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-[#ffaf00] mb-4 flex items-center gap-3">
              <Users className="text-[#142143]" /> Roles & Responsibilities
            </h2>
            <ul className="list-disc pl-5 text-gray-700 leading-relaxed space-y-2">
              <li>Scheduling and conducting semester/annual examinations.</li>
              <li>Preparing and distributing examination timetables.</li>
              <li>Issuing admit cards and seating arrangements.</li>
              <li>Coordinating with departments for question papers and invigilation.</li>
              <li>Evaluation and result processing.</li>
              <li>Handling revaluation, rechecking, and grievance redressal.</li>
              <li>Maintaining examination records and transcripts.</li>
              <li>Conducting supplementary/improvement exams.</li>
            </ul>
          </section>

          {/* Examination Services */}
          <section className="bg-white p-6 md:p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-[#ffaf00] mb-4 flex items-center gap-3">
              <LinkIcon className="text-[#142143]" /> Examination Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <DownloadButton icon={<Book />} text="Admit Card Download" href="#" />
              <DownloadButton icon={<CheckCircle />} text="Results Portal" href="#" />
              <DownloadButton icon={<Lightbulb />} text="Revaluation / Rechecking Form" href="#" />
            </div>
          </section>

          {/* Examination Guidelines */}
          <section className="bg-white p-6 md:p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-[#ffaf00] mb-4 flex items-center gap-3">
              <Book className="text-[#142143]" /> Examination Guidelines
            </h2>
            <ul className="list-disc pl-5 text-gray-700 leading-relaxed space-y-2">
              <li>Carry your admit card and valid ID proof to the examination hall.</li>
              <li>Reach the venue at least 15 minutes before the scheduled time.</li>
              <li>Use only permitted materials inside the hall.</li>
              <li>Any form of malpractice will lead to strict disciplinary action.</li>
              <li>Mobile phones, smartwatches, and electronic devices are strictly prohibited.</li>
            </ul>
          </section>

          {/* Download Section (Optional - kept for other forms) */}
          <section className="bg-white p-6 md:p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-[#ffaf00] mb-4 flex items-center gap-3">
              <Download className="text-[#142143]" /> Download Section
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <DownloadButton icon={<Book />} text="Examination Form" href="#" />
              {/* Removed Admit Card Sample and Revaluation Request Form as they are now in Examination Services */}
              <DownloadButton icon={<Book />} text="Grievance Form" href="#" />
            </div>
          </section>

          
          

        </div>
      </main>
      <ActionMenu />
      <Footer />
    </>
  );
};

export default ExaminationCellPage;