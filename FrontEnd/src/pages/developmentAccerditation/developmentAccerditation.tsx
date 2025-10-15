// src/pages/about/developmentAccredination.tsx
import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import ActionMenu from '../../components/actionMenu/actionMenu';
import ChatBot from '../../components/chatbot/chatbot';
import { FileText, X, ArrowDownToLine, Award } from 'lucide-react';

const idpData = {
  title: "Institutional Development Plan (IDP)",
  description: `The Institutional Development Plan (IDP) at MATS University outlines our strategic vision and roadmap for achieving academic excellence, innovation, and holistic growth. This comprehensive plan focuses on enhancing teaching-learning processes, research and innovation, infrastructure development, and stakeholder engagement. By aligning with our mission and values, the IDP aims to foster a dynamic and inclusive environment that nurtures talent, promotes sustainability, and meets the evolving needs of our students and society. Through continuous improvement and collaboration, we strive to position ourselves as a leading institution of higher learning.[3]`,
  pdf: "/pdfs/Institutional_Development_Plan.pdf", // replace with actual path
  img: "/images/idp-cover.jpg" // optional: add IDP cover image
};

const accreditation = {
  certificateImg: "/images/approval-certification.jpeg", // use the provided image
  description: `MATS University is accredited with NAAC A+ and is recognized by the University Grants Commission (UGC) under Section 2(f) of the UGC Act, 1956. The University is also approved by top national regulatory bodies, including the All India Council for Technical Education (AICTE), the Bar Council of India (BCI), the Pharmacy Council of India (PCI), and the National Council for Teacher Education (NCTE). 

This accreditation and recognition reaffirm MATS University’s commitment to providing quality education, global academic standards, and continuous institutional growth.`
};

const DevelopmentAccredinationPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-32">
        {/* Title Section */}
        <section className="bg-[#142143] text-white py-16 rounded-2xl ml-5 mr-5">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Development & Accreditation</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Growth, strategy, and recognized excellence at MATS University
            </p>
          </div>
        </section>

        {/* Off Campus Centre */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#142143] mb-6">Off Campus Centre</h2>
            <p className="text-gray-700 text-lg">
              MATS University extends its educational footprint beyond its main campus via approved off-campus centres. These centres enable more students to access quality education, modern learning resources, and expert faculty, while fostering innovation and regional development.
            </p>
          </div>
        </section>

        {/* Institutional Development Plan (IDP) */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-[#142143] mb-4">Institutional Development Plan (IDP)</h2>
                <p className="text-gray-700 text-lg mb-6">{idpData.description}</p>
                <button
                  className="inline-flex items-center bg-[#ffaf00] text-[#142143] px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-400 transition-colors shadow-lg hover:shadow-xl"
                  onClick={() => setShowModal(true)}
                >
                  <FileText className="mr-2 h-6 w-6" />
                  View Full IDP (PDF)
                </button>
              </div>
              <div className="hidden md:flex flex-1 justify-center">
                {/* Optional: show IDP cover or relevant illustration */}
                {idpData.img && (
                  <img src={idpData.img} alt="Institutional Development Plan Cover" className="w-72 h-96 object-contain rounded-xl shadow-xl" />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Modal for IDP PDF Preview and Download */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative p-8">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-[#ffaf00] transition"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-bold text-[#142143] mb-4 text-center">{idpData.title}</h3>
                <div className="w-full flex justify-center mb-6">
                  {/* Optional: Show document preview image */}
                  {idpData.img ? (
                    <img src={idpData.img} alt="IDP Preview" className="object-contain max-h-[60vh] w-auto rounded-xl" />
                  ) : (
                    <FileText className="h-32 w-32 text-[#142143]/40" />
                  )}
                </div>
                <a
                  href={idpData.pdf}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#ffaf00] text-[#142143] px-8 py-3 rounded-full font-bold flex items-center space-x-2 hover:bg-yellow-400 transition-colors mb-4"
                >
                  <ArrowDownToLine className="mr-2 h-5 w-5" />
                  <span>Download as PDF</span>
                </a>
                <button
                  className="text-gray-600 hover:text-[#ffaf00] underline text-sm"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Accreditation & Certification */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#142143] mb-6">Accreditation & Certification</h2>
              <p className="text-gray-700 text-lg whitespace-pre-line">{accreditation.description}</p>

              <ul className="mt-6 space-y-2 text-[#142143] font-semibold">
                <li>
                  <Award className="inline mr-2 text-[#ffaf00]" />
                  NAAC Accredited (A+)
                </li>
                <li>
                  <Award className="inline mr-2 text-[#ffaf00]" />
                  UGC Recognized (Section 2(f) of UGC Act, 1956)
                </li>
                <li>
                  <Award className="inline mr-2 text-[#ffaf00]" />
                  Approved by AICTE, BCI, PCI, NCTE
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <img
                src={accreditation.certificateImg}
                alt="Accreditation and Certification"
                className="max-w-full w-96 rounded-xl shadow-xl border-2 border-[#ffaf00] bg-white"
              />
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

export default DevelopmentAccredinationPage;
