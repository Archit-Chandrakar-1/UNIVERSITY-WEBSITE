// src/pages/about/annualReport.tsx
import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import ActionMenu from '../../components/actionMenu/actionMenu';
import ChatBot from '../../components/chatbot/chatbot';
import { FileText, X, ArrowDownToLine } from 'lucide-react';

// Dummy annual reports data
const annualReports = [
  {
    id: 1,
    title: "Annual Report 2022-23",
    img: "/images/annual_report_2022_23.jpg",  // Replace with actual thumbnail image path
    pdf: "/pdfs/annual_report_2022_23.pdf"
  },
  {
    id: 2,
    title: "Annual Report 2023-24",
    img: "/images/annual_report_2023_24.jpg",  // Replace with actual thumbnail image path
    pdf: "/pdfs/annual_report_2023_24.pdf"
  },
  // Add more reports as needed
];

const AnnualReportPage: React.FC = () => {
  const [modalReport, setModalReport] = useState<null | typeof annualReports[number]>(null);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-32">

        {/* Hero/title section */}
        <section className="bg-[#142143] text-white py-16 rounded-2xl ml-5 mr-5">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Annual Reports</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Yearly overviews of our institutional progress, achievements, and impact.
            </p>
          </div>
        </section>

        {/* Annual Reports Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#142143] mb-4">Latest Annual Reports</h2>
              <p className="text-gray-700 mb-4">Download detailed annual reports for each academic year.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {annualReports.map(report => (
                <button
                  key={report.id}
                  onClick={() => setModalReport(report)}
                  className="bg-gray-100 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center p-6 group"
                >
                  <div className="w-40 h-56 mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-white group-hover:ring-4 group-hover:ring-[#ffaf00] transition">
                    {report.img
                      ? <img src={report.img} alt={report.title} className="object-contain w-full h-full" />
                      : <FileText className="h-20 w-20 text-[#142143]/40" />
                    }
                  </div>
                  <span className="text-[#142143] font-semibold text-lg text-center">{report.title}</span>
                  <span className="mt-2 text-sm text-gray-600">Click to preview & download</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Modal for annual report preview & download */}
        {modalReport && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative p-8">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-[#ffaf00] transition"
                onClick={() => setModalReport(null)}
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="flex flex-col items-center">
                <div className="w-full max-w-xl mb-6 rounded-lg overflow-hidden bg-gray-100 flex justify-center items-center" style={{ aspectRatio: '3 / 4' }}>
                  {modalReport.img
                    ? <img src={modalReport.img} alt={modalReport.title} className="object-contain max-h-[60vh] w-auto" />
                    : <FileText className="h-32 w-32 text-[#142143]/40" />
                  }
                </div>
                <h3 className="text-2xl font-bold text-[#142143] mb-4 text-center">{modalReport.title}</h3>
                <a
                  href={modalReport.pdf}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#ffaf00] text-[#142143] px-8 py-3 rounded-full font-bold flex items-center space-x-2 hover:bg-yellow-400 transition-colors shadow-lg hover:shadow-xl"
                >
                  <ArrowDownToLine className="mr-2 h-5 w-5" />
                  <span>Download PDF</span>
                </a>
                <button
                  className="mt-4 text-gray-600 hover:text-[#ffaf00] underline text-sm"
                  onClick={() => setModalReport(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ActionMenu />
      <ChatBot />
      <Footer />
    </>
  );
};

export default AnnualReportPage;
