// src/pages/about/regulationsApproval.tsx
import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import ActionMenu from '../../components/actionMenu/actionMenu';
import ChatBot from '../../components/chatbot/chatbot';
import { FileText, X, ArrowDownToLine } from 'lucide-react';

// Approvals and Recognitions Documents
const approvalDocs = [
  {
    id: 1,
    title: "UGC 2f",
    img: "/images/ugc2f.jpg",
    pdf: "/pdfs/ugc2f.pdf",
  },
  {
    id: 2,
    title: "AICTE Approval MATS University 2025-2026",
    img: "/images/aicte-2025.jpg",
    pdf: "/pdfs/aicte-2025.pdf"
  },
  {
    id: 3,
    title: "PCI Approval MATS University 2024-25",
    img: "/images/pci-2024.jpg",
    pdf: "/pdfs/pci-2024.pdf"
  },
];

// Act, Statutes and Ordinances Documents
const actStatuteDocs = [
  {
    id: 101,
    title: "University Act Document",
    img: "/images/act_document.jpg",
    pdf: "/pdfs/act_document.pdf"
  },
  {
    id: 102,
    title: "Statutes Document",
    img: "/images/statutes_document.jpg",
    pdf: "/pdfs/statutes_document.pdf"
  },
  {
    id: 103,
    title: "Ordinances Document",
    img: "/images/ordinances_document.jpg",
    pdf: "/pdfs/ordinances_document.pdf"
  },
];

const RegulationsApprovalPage: React.FC = () => {
  const [modalDoc, setModalDoc] = useState<null | (typeof approvalDocs[number] & typeof actStatuteDocs[number])>(null);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-32">

        {/* Hero/title section */}
        <section className="bg-[#142143] text-white py-16 rounded-2xl ml-5 mr-5">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Regulations & Approvals</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              View all major regulations, statutes, ordinances, and statutory body documents.
            </p>
          </div>
        </section>

        {/* Approvals and Recognitions */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#142143] mb-4">
                Approvals and Recognitions
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {approvalDocs.map(doc => (
                <button
                  key={doc.id}
                  onClick={() => setModalDoc(doc)}
                  className="bg-gray-100 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center p-6 group"
                >
                  <div className="w-40 h-40 mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-white group-hover:ring-4 group-hover:ring-[#ffaf00] transition">
                    {doc.img
                      ? <img src={doc.img} alt={doc.title} className="object-contain w-full h-full" />
                      : <FileText className="h-16 w-16 text-[#142143]/40" />
                    }
                  </div>
                  <span className="text-[#142143] font-semibold text-lg text-center">{doc.title}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Act, Statutes and Ordinances */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#142143] mb-4">
                Act, Statutes and Ordinances
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {actStatuteDocs.map(doc => (
                <button
                  key={doc.id}
                  onClick={() => setModalDoc(doc)}
                  className="bg-gray-100 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center p-6 group"
                >
                  <div className="w-40 h-40 mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-white group-hover:ring-4 group-hover:ring-[#ffaf00] transition">
                    {doc.img
                      ? <img src={doc.img} alt={doc.title} className="object-contain w-full h-full" />
                      : <FileText className="h-16 w-16 text-[#142143]/40" />
                    }
                  </div>
                  <span className="text-[#142143] font-semibold text-lg text-center">{doc.title}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Modal for document preview & download */}
        {modalDoc && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative p-8">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-[#ffaf00] transition"
                onClick={() => setModalDoc(null)}
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="flex flex-col items-center">
                <div className="w-full max-w-4xl mb-6 rounded-lg overflow-hidden bg-gray-100 flex justify-center items-center" style={{ aspectRatio: '4 / 3' }}>
                  {modalDoc.img
                    ? <img src={modalDoc.img} alt={modalDoc.title} className="object-contain max-h-[80vh] w-auto" />
                    : <FileText className="h-32 w-32 text-[#142143]/40" />
                  }
                </div>
                <h3 className="text-3xl font-bold text-[#142143] mb-6 text-center">{modalDoc.title}</h3>
                <a
                  href={modalDoc.pdf}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#ffaf00] text-[#142143] px-10 py-4 rounded-full font-bold flex items-center space-x-3 hover:bg-yellow-400 transition-colors shadow-lg hover:shadow-xl"
                >
                  <ArrowDownToLine className="h-6 w-6" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Placeholder Statutory Bodies Section */}
        <section className="py-12 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-white rounded-xl shadow p-8">
      <h3 className="text-2xl font-bold text-[#142143] mb-6">Statutory Bodies</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center max-w-4xl mx-auto">
        {[
          "Governing Body",
          "Board of Management",
          "Finance Committee",
          "Academic Council",
          "Board of Studies"
        ].map((body) => (
          <button
            key={body}
            type="button"
            className="w-full px-6 py-3 bg-[#142143] text-[#ffaf00] font-semibold rounded-lg shadow-md hover:bg-[#ffaf00] hover:text-[#142143] transition-colors focus:outline-none focus:ring-4 focus:ring-[#ffaf00]/50"
          >
            {body}
          </button>
        ))}
      </div>
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

export default RegulationsApprovalPage;
