import React, { useState, useEffect } from 'react';
import { FileText, Bell, BookOpen, X, Eye, Download } from 'lucide-react';

const staticSections = [
  {
    label: "Examination Timetable",
    icon: <FileText className="h-10 w-10 text-blue-600" />,
    bgColor: "bg-blue-100",
  },
  {
    label: "Examination Notification",
    icon: <Bell className="h-10 w-10 text-purple-600" />,
    bgColor: "bg-purple-100",
  },
  {
    label: "Information Brochure",
    icon: <BookOpen className="h-10 w-10 text-cyan-600" />,
    bgColor: "bg-cyan-100",
  },
];



type QuickAccessItem = {
  _id: string;
  name?: string;
  url?: string;
  message?: string;
  link?: string;
};

type QuickAccessSection = {
  _id: string;
  label: string;
  items: QuickAccessItem[];
};

const QuickAccess: React.FC = () => {
  const [quickAccessData, setQuickAccessData] = useState<QuickAccessSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<QuickAccessSection | null>(null);
  const [pdfToView, setPdfToView] = useState<string | null>(null);

  const API_URL = 'http://localhost:5555/api/quick-access';

  useEffect(() => {
    const fetchQuickAccessData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setQuickAccessData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch quick access data:', error);
        setIsLoading(false);
      }
    };
    fetchQuickAccessData();
  }, []);

  const handleIconClick = (label: string) => {
    const sectionData = quickAccessData.find(sec => sec.label === label);
    setModalData(sectionData || { _id: '', label: label, items: [] });
    setIsModalOpen(true);
    setPdfToView(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPdfToView(null);
  };
  
  const openPdfInModal = (url: string) => {
    setPdfToView(url);
  };

  const staticQuickSections = [
    {
      label: "Modern Infrastructure",
      content: (
        <ul className="space-y-4 text-[#142143] list-disc pl-2 text-sm sm:text-base">
          <li>
            <strong>State-of-the-Art Facilities:</strong> Advanced classrooms and labs for enhanced learning.
          </li>
          <li>
            <strong>Sustainability:</strong> Green buildings, eco-friendly practices.
          </li>
          <li>
            <strong>Technology Integration:</strong> Smart classrooms and digital resources for better education.
          </li>
        </ul>
      )
    },
    {
      label: "Expert Faculty",
      content: (
        <ul className="space-y-4 text-[#142143] list-disc pl-2">
          <li>
            <strong>Experienced Professors:</strong> Industry veterans and high-qualified teachers.
          </li>
          <li>
            <strong>Research Focus:</strong> Active involvement in academic research and innovation.
          </li>
          <li>
            <strong>Mentorship:</strong> Frequent student mentorship programs.
          </li>
        </ul>
      )
    },
    {
      label: "Campus Culture",
      content: (
        <ul className="space-y-4 text-[#142143] list-disc pl-2">
          <li>
            <strong>Diversity & Inclusion:</strong> Welcoming students from all backgrounds.
          </li>
          <li>
            <strong>Student Life:</strong> Clubs, activities, events and fests year-round.
          </li>
          <li>
            <strong>Support Services:</strong> Counseling, wellness, and placement preparation.
          </li>
        </ul>
      )
    },
  ];
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="grid grid-cols-3 gap-8 mb-16">
        {staticSections.map((sec) => (
          <div
            key={sec.label}
            className="text-center cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={() => handleIconClick(sec.label)}
          >
            <div className={`${sec.bgColor} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}>
              {sec.icon}
            </div>
            <h3 className="text-lg font-bold text-[#142143] mb-2">
              {sec.label}
            </h3>
          </div>
        ))}
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#142143]">What makes University Unique?</h2>
      </div>

      <div className="bg-[#ffaf00] rounded-2xl p-8">
        {isLoading ? (
          <div className="text-center text-[#142143] font-semibold">
            Loading tabs...
          </div>
        ) : (
          <>
            <div className="bg-[#ffaf00] rounded-2xl p-8">
        <div className="grid grid-cols-3 gap-2 mb-6">
          {staticQuickSections.map((sec, idx) => (
            <button
              key={idx}
              className={`
                text-xs sm:text-xl
                font-bold text-[#142143] py-2 rounded-lg transition-all
                ${activeTab === idx
                  ? 'bg-white shadow'
                  : 'bg-transparent hover:bg-[#fff2cc]'}
              `}
              onClick={() => setActiveTab(idx)}
            >
              {sec.label}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-xl p-6 min-h-[120px]">
          {staticQuickSections[activeTab].content}
        </div>
      </div>
      
            {/* <div className="bg-white rounded-xl p-6 min-h-[120px]">
              {quickAccessData.length > 0 && quickAccessData[activeTab]?.items?.length > 0 ? (
                <div className="space-y-4 text-[#142143] list-disc pl-2 text-sm sm:text-base">
                  {quickAccessData[activeTab].items.map((item, idx) => (
                    <li key={item._id || idx}>
                      <strong className="text-sm">{item.name || item.message}</strong>
                      {item.url && (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2 text-xs">
                          [Link]
                        </a>
                      )}
                      {item.link && (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2 text-xs">
                          [Link]
                        </a>
                      )}
                    </li>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-600 mt-4">
                  {quickAccessData.length > 0 ? "No items available for this section." : "Please check back later."}
                </div>
              )}
            </div> */}
          </>
        )}
      </div>

      {/* Main Modal Window */}
      {isModalOpen && modalData && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#142143] rounded-lg p-6 w-11/12 max-w-2xl relative shadow-xl text-white">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
            >
              <X className="h-6 w-6" />
            </button>
            {/* Modal Content */}
            <h2 className="text-2xl font-bold text-[#ffaf00] mb-4">{modalData.label}</h2>
            
            {pdfToView ? (
              <div className="h-96 w-full">
                <iframe src={pdfToView} className="w-full h-full border-0" title="PDF Viewer" />
              </div>
            ) : modalData.items.length === 0 ? (
              <div className="text-center text-gray-400 mt-4">
                No items available for this section.
              </div>
            ) : (
              <ul className="space-y-4">
                {modalData.items.map((item, index) => (
                  <li key={item._id || index} className="flex justify-between items-center text-white p-3 rounded-lg bg-[#142143] hover:bg-white hover:text-[#142143] transition">
                    <span>{item.name || item.message}</span>
                    <div className="flex space-x-4">
                      {item.url && (
                        <>
                          <button
                            onClick={() => openPdfInModal(item.url!)}
                            className="text-white hover:text-cyan-400 transition"
                          >
                            <Eye className="h-6 w-6" />
                          </button>
                          <a href={item.url} download className="text-white hover:text-cyan-400 transition">
                            <Download className="h-6 w-6" />
                          </a>
                        </>
                      )}
                      {item.link && (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-400 transition">
                          <Eye className="h-6 w-6" />
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default QuickAccess;