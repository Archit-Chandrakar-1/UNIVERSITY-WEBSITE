// src/components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => (
  // The outer footer container that will act as the slightly lighter background
  // giving the illusion of the card floating on it.
  // Using a slightly darker shade for the outer background to make the card "pop" more
  <footer className="bg-gray-950 text-white py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      {/* This div acts as the "card" with the dark background, rounded corners, and shadow */}
      {/* Added max-w-[98%] and mx-auto for the 98% width and centering */}
      {/* Changed shadow-2xl to shadow-xl and added a custom shadow for more depth */}
      <div className="bg-[#142143] rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden max-w-[100%] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8 p-8 md:p-12">

          {/* Left section: Admission Office */}
          <div>
            <h3 className="font-bold text-lg mb-4">Admission Office</h3>
            <div className="mb-4">
              <p className="font-semibold text-gray-300">Address Raipur:</p>
              <p className="text-gray-200">MATS Tower, Pandri, Raipur (Chhattisgarh), Pincode-492 004</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold text-gray-300">Campus Address Gullu, Aarang:</p>
              <p className="text-gray-200">Aarang-Kharora Highway, Gullu, Aarang, Raipur (Chhattisgarh)</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold text-gray-300">Admission Helpline No.:</p>
              <p className="text-gray-200">1800123819999</p>
              <p className="text-gray-200">(0771) 4078995, 4078996, 4078998</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold text-gray-300">Email:</p>
              <p className="text-gray-200">admissions@matsuniversity.ac.in</p>
            </div>
            <div className="font-bold mt-6 text-gray-100 hover:text-white cursor-pointer transition duration-200">
                <Link to="/public-disclosure">Public Self Disclosure</Link>
            </div>
          </div>

          {/* Middle section: Top Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Top Links</h3>
            <ul className="flex flex-col gap-2 text-gray-200">
              <li><Link to="/admission" className="hover:text-white transition duration-200">Admission</Link></li>
              <li><Link to="/examination" className="hover:text-white transition duration-200">Examination</Link></li>
              <li><Link to="/library" className="hover:text-white transition duration-200">Library</Link></li>
              <li><Link to="/placement" className="hover:text-white transition duration-200">Placement</Link></li>
              <li><Link to="/anti-ragging" className="hover:text-white transition duration-200">Anti Ragging</Link></li>
              <li><Link to="/grievances" className="hover:text-white transition duration-200">Grievances Redressal</Link></li>
              <li><Link to="/icc" className="hover:text-white transition duration-200">Internal Complaints Committee</Link></li>
              <li><Link to="/ncc-nss" className="hover:text-white transition duration-200">NCC And NSS</Link></li>
              <li><Link to="/convocation" className="hover:text-white transition duration-200">Convocation</Link></li>
              <li><Link to="/iqac" className="hover:text-white transition duration-200">IQAC</Link></li>
              <li><Link to="/job-openings" className="hover:text-white transition duration-200">Job Openings</Link></li>
              <li><Link to="/contact-us" className="hover:text-white transition duration-200">Contact Us</Link></li>
              <li>
                <Link to="/department-login" className="text-gray-300 hover:text-white transition duration-200 font-bold">
                  Department Login
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-300 hover:text-white transition duration-200 font-bold">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Right section: Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-2 text-gray-200">
              <li><a href="https://www.ugc.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">UGC</a></li>
              <li><a href="https://naac.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">NAAC</a></li>
              <li><a href="http://rajbhavancg.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">Rajbhavan</a></li>
              <li><a href="http://highereducation.cg.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">CG Higher Education</a></li>
              <li><a href="https://www.cgpurc.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">CG PURC</a></li>
              <li><a href="https://www.aicte-india.org/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">AICTE</a></li>
              <li><a href="https://barcouncilofindia.org/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">BCI</a></li>
              <li><a href="https://www.pci.nic.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">PCI</a></li>
              <li><a href="https://ncte.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">NCTE</a></li>
              <li><a href="https://wrc.ncte.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">NCTE WRC</a></li>
              <li><a href="https://www.nirf.org/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">NIRF</a></li>
              <li><a href="https://aishe.nic.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">AISHE</a></li>
              <li><a href="https://ugc.ac.in/ugcesamadhan/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">UGC E-Samadhan</a></li>
              <li><a href="https://studyinindia.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">Study in India</a></li>
              <li><a href="https://www.aiu.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">AIU</a></li>
              <li><a href="https://voterportal.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">ECI – Voter Portal</a></li>
              <li><a href="https://www.abc.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">Academic Bank of Credits</a></li>
              <li><a href="https://nad.digilocker.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">NAD – Digilocker</a></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright section - inside the card */}
        <div className="text-center py-6 text-gray-400 text-sm border-t border-white/10 px-8">
          © MATS University. All rights reserved.
        </div>
      </div>

      {/* "MATS UNIVERSITY" text below the card */}
      <div className="text-center mt-16 pb-12">
        <p className="text-gray-700 text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-wider opacity-60">
          MATS UNIVERSITY
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;