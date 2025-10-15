// src/pages/about/governanceAdministration.tsx
import React from 'react';
import { ExternalLink, Building, Mail } from 'lucide-react';

import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import ActionMenu from '../../components/actionMenu/actionMenu';
import ChatBot from '../../components/chatbot/chatbot';

const GovernanceAdministrationPage: React.FC = () => {
  // Sponsoring Body Data
  const sponsoringBodyMembers = [
    { sno: 1, name: "Shri Gajraj Pagariya", designation: "President" },
    { sno: 2, name: "Shri Ashok Lunkad", designation: "Vice President" },
    { sno: 3, name: "Shri Priyesh Pagariya", designation: "Secretary" },
    { sno: 4, name: "Smt Priyanka Pagariya", designation: "Joint Secretary" },
    { sno: 5, name: "Shri Jaspreet Singh Bhata", designation: "Treasurer" },
    { sno: 6, name: "Shri Shaswat Lunawat", designation: "Member" },
    { sno: 7, name: "Shri Bankim Shukla", designation: "Member" },
    { sno: 8, name: "Shri Shubhas Agrawal", designation: "Member" },
    { sno: 9, name: "Smt Ugam Devi Pagariya", designation: "Member" },
    { sno: 10, name: "Dr Shubra Pagariya", designation: "Member" }
  ];

  // University Officials Data
  const universityOfficials = [
    { sno: 1, name: "Shri Gokulananda Panda", position: "Registrar", role: "Registrar's Office", email: "registrar@matsuniversity.ac.in" },
    { sno: 2, name: "Dr. Pradeep Kumar Saxena", position: "Controller of Examination", role: "Examination", email: "coe@matsuniversity.ac.in" },
    { sno: 3, name: "Prof. (Dr.) Parvinder Hanspal", position: "Director", role: "MCDOE", email: "directorodl@matsuniversity.ac.in" },
    { sno: 4, name: "Dr. Ashish Jha", position: "CoE, MCDOE", role: "PA to Chancellor", email: "drashishjha@matsuniversity.ac.in" },
    { sno: 5, name: "CA Sourabh Soni", position: "CFAO", role: "Accounts", email: "sourabhsoni@matsuniversity.ac.in" },
    { sno: 6, name: "Dr. Ramesh Kumar Sahu", position: "Deputy Registrar", role: "Academic Administration", email: "dr@matsuniversity.ac.in" },
    { sno: 7, name: "Syed Toufeeq", position: "Director", role: "Liasoning", email: "dcl@matsuniversity.ac.in" },
    { sno: 8, name: "Ms. Urshita Baranwal", position: "Assistant Registrar", role: "Academic Administration", email: "urshita@matsuniversity.ac.in" },
    { sno: 9, name: "Mr. Y. Krishna Rao", position: "Human Resources", role: "HR", email: "hr@matsuniversity.ac.in" },
    { sno: 10, name: "Mr. Shrikant", position: "Assistant Registrar", role: "Training & Placement", email: "tnp@matsuniversity.ac.in" },
    { sno: 11, name: "Mr. Swarit Choudhrie", position: "Administrative Registrar", role: "Facilities & Operations", email: "swarit@matsuniversity.ac.in" },
    { sno: 12, name: "Mr. Ashish Kumar Dash", position: "Administrative Officer", role: "Facilities & Operations", email: "ashishkdash@matsuniversity.ac.in" },
    { sno: 13, name: "Mr. Meghanadhudu Katabathuni", position: "Manager", role: "Corporate Communications", email: "meghanadhudu@matsuniversity.ac.in" },
    { sno: 14, name: "Mr. Md. Sahir Siddiqui", position: "Manager", role: "Transport F&O", email: "sahirsiddiqui@matsuniversity.ac.in" },
    { sno: 15, name: "Mrs. Shahina Khan", position: "Manager", role: "Admissions F&O", email: "shahina@matsuniversity.ac.in" },
    { sno: 16, name: "Mrs. Rashida Amin", position: "Manager", role: "Admissions", email: "rashidaa@matsuniversity.ac.in" },
    { sno: 17, name: "Md. Shahid", position: "System Administrator", role: "IT", email: "shahid@matsuniversity.ac.in" },
    { sno: 18, name: "Mr. Gaurav Singh", position: "System Administrator", role: "IT", email: "gauravsingh@matsuniversity.ac.in" }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-32">
        
        {/* Hero Section */}
        <section className="bg-[#142143] text-white py-16 rounded-2xl ml-5 mr-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Governance & Administration</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our organizational structure, leadership hierarchy, and administrative framework
            </p>
          </div>
        </section>

        {/* Sponsoring Body */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#142143] mb-4">Sponsoring Body - "SBMJECS"</h2>
              <p className="text-lg text-gray-600">
                Shri Bhagwan Mahaveer Jain Educational and Cultural Society (SBMJECS)
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-[#142143] text-white py-4">
                <div className="grid grid-cols-3 gap-4 px-6">
                  <div className="font-bold text-lg">S. No.</div>
                  <div className="font-bold text-lg">Name of the Officials</div>
                  <div className="font-bold text-lg">Designation</div>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {sponsoringBodyMembers.map((member, index) => (
                  <div key={member.sno} className={`grid grid-cols-3 gap-4 px-6 py-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-[#ffaf00]/10 transition-colors`}>
                    <div className="font-semibold text-[#142143]">{member.sno}</div>
                    <div className="text-gray-700">{member.name}</div>
                    <div className="text-gray-700">{member.designation}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* University Officials Directory */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#142143] mb-4">University Officials Directory</h2>
              <p className="text-lg text-gray-600">
                Contact information for key administrative personnel
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-[#142143] text-white py-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-6">
                  <div className="font-bold text-sm md:text-base">Sr. No.</div>
                  <div className="font-bold text-sm md:text-base">Name & Position</div>
                  <div className="font-bold text-sm md:text-base">Role</div>
                  <div className="font-bold text-sm md:text-base">Email</div>
                </div>
              </div>
              <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {universityOfficials.map((official, index) => (
                  <div key={official.sno} className={`grid grid-cols-1 md:grid-cols-4 gap-4 px-6 py-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-[#ffaf00]/10 transition-colors`}>
                    <div className="font-semibold text-[#142143] md:text-center">{official.sno}</div>
                    <div>
                      <div className="font-semibold text-gray-800">{official.name}</div>
                      <div className="text-sm text-gray-600">{official.position}</div>
                    </div>
                    <div className="text-gray-700 text-sm">{official.role}</div>
                    <div>
                      <a 
                        href={`mailto:${official.email}`}
                        className="text-[#142143] hover:text-[#ffaf00] transition-colors text-sm flex items-center"
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        {official.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      {/* Organization Hierarchy Image */}
      <section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-[#142143] mb-4">Organization Hierarchy</h2>
      <p className="text-lg text-gray-600">Organizational structure of MATS University</p>
    </div>

    {/* Replaced img with iframe for Miro board */}
    <div className="flex justify-center w-full"> {/* Ensure full width for iframe container */}
      <iframe
        width="100%" // Use 100% width to make it responsive within its container
        height="600" // You can adjust this height as needed
        src="https://miro.com/app/live-embed/uXjVJ-8MmLw=/?embedMode=view_only_without_ui&moveToViewport=-77,-321,1568,890&embedId=309342128961"
        frameBorder="0"
        scrolling="no"
        allow="fullscreen; clipboard-read; clipboard-write"
        allowFullScreen
        className="rounded-lg shadow-lg" 
        title="MATS University Organization Hierarchy Miro Board"
      ></iframe>
      
    </div>
  </div>
</section>

{/* Visitor of the University */}
<section className="py-16 bg-white text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#142143] mb-4">Visitor of the University</h2>
            <p className="text-lg text-gray-600 mb-8">
              The Hon'ble Governor of Chhattisgarh serves as the Visitor of MATS University
            </p>
            <a
              href="https://rajbhavancg.gov.in/honorable-governors/honorable-governors.php"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#ffaf00] text-[#142143] px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Building className="mr-3 h-6 w-6" />
              Visit Raj Bhavan Official Website
              <ExternalLink className="ml-3 h-5 w-5" />
            </a>
          </div>
        </section>

      </div>

      <ActionMenu />
      <ChatBot />
      <Footer />
    </>
  );
};

export default GovernanceAdministrationPage;
