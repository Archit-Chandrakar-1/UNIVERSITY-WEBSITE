// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Menu,
  X,
  Phone,
  ChevronDown,
} from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const matsSchools = [
    'MATS School of Management & Business Studies',
    'MATS Law School',
    'MATS School of Engineering & Information Technology',
    'MATS School of Education',
    'MATS School of Information Technology',
    'MATS School of Library Science',
    'MATS School of Sciences & Forensic Science',
    'MATS School of Arts & Humanities',
    'MATS School of Pharmacy',
    'MATS School of Physical Education & Yoga',
    'MATS School of Fashion Designing and Technology',
  ];
  const navigate = useNavigate();

  // Mapping labels to routes
  const routeMap: { [key: string]: string } = {
    'MATS School of Management & Business Studies': '/management-business',
    'MATS Law School': '/law-school',
    'MATS School of Engineering & Information Technology': '/Engineering-IT',
    'MATS School of Education': '/School-education',
    'MATS School of Information Technology': '/information-technology',
    'MATS School of Library Science': '/library-science',
    'MATS School of Sciences & Forensic Science': '/Sciences-Forensic',
    'MATS School of Arts & Humanities': '/arts-humanities',
    'MATS School of Pharmacy': '/pharmacy',
    'MATS School of Physical Education & Yoga': '/physical-education-yoga',
    'MATS School of Fashion Designing and Technology': '/fashion-designing-technology',
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#142143] shadow-lg' : 'bg-[#142143]/95 backdrop-blur-sm'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        {/* Top Row */}
        <div className="flex items-center justify-between py-2 border-b border-[#ffaf00]/20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="https://matsuniversity.ac.in/image/NEW%20LOGO.jpg"
              alt="MATS University Logo"
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Top Right */}
          <div className="hidden lg:flex items-center space-x-6 text-sm">
            <button className="text-white hover:text-[#ffaf00] font-bold transition-colors">Alumni</button>
            <button className="text-white hover:text-[#ffaf00] font-bold transition-colors">Career</button>
            <button className="text-white hover:text-[#ffaf00] font-bold transition-colors">International Admission</button>
            
            <div className="flex items-center space-x-4 ml-6">
              <div className="flex items-center space-x-2 text-white">
                <Phone className="h-4 w-4" />
                <span>0771-4078995</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Phone className="h-4 w-4" />
                <span>1800123819999</span>
              </div>
              <a
                href="https://apply.matsuniversity.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#ffaf00] text-[#142143] px-4 py-2 rounded-full font-bold hover:bg-yellow-400 transition-colors"
              >
                Apply Online
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Navigation for Desktop */}
        <div className="flex items-center justify-between py-3">
          <div className="flex-1" />
          <nav className="hidden lg:flex items-center space-x-8">
            {/* HOME */}
            <button onClick={() => navigate('/')} className="text-white hover:text-[#ffaf00] font-bold transition-colors">
              Home
            </button>

            {/* ABOUT */}
            <div className="relative group">
              <button className="text-white hover:text-[#ffaf00] font-bold flex items-center">
                About <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-[220%] bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-30 py-2">
                <button onClick={() => navigate('/overview')} className="block w-full text-left px-4 py-2 text-[#142143] hover:bg-[#ffaf00] hover:text-white font-semibold text-sm">
                  Overview & Leadership
                </button>
                <button onClick={() => navigate('/governance')} className="block w-full text-left px-4 py-2 text-[#142143] hover:bg-[#ffaf00] hover:text-white font-semibold text-sm">
                  Governance & Administration
                </button>
                <button onClick={() => navigate('/regulation')} className="block w-full text-left px-4 py-2 text-[#142143] hover:bg-[#ffaf00] hover:text-white font-semibold text-sm">
                  Regulations & Approvals
                </button>
                <button onClick={() => navigate('/development')} className="block w-full text-left px-4 py-2 text-[#142143] hover:bg-[#ffaf00] hover:text-white font-semibold text-sm">
                  Development & Accreditation
                </button>
                <button onClick={() => navigate('/reports')} className="block w-full text-left px-4 py-2 text-[#142143] hover:bg-[#ffaf00] hover:text-white font-semibold text-sm">
                  Reports & Publications
                </button>
              </div>
            </div>

            {/* ACADEMIC */}
            <div className="relative group">
              <button className="text-white hover:text-[#ffaf00] font-bold flex items-center">
                Academic <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-[220%] bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-30 py-2">
                <button onClick={() => navigate('/examination-cell')} className="block w-full text-left px-4 py-2 text-[#142143] hover:bg-[#ffaf00] hover:text-white font-semibold text-sm">
                  Examination-Cell
                </button>
                <button onClick={() => navigate('/academics')} className="block w-full text-left px-4 py-2 text-[#142143] hover:bg-[#ffaf00] hover:text-white font-semibold text-sm">
                  University Academic
                </button>
                <button onClick={() => navigate('/governance')} className="block w-full text-left px-4 py-2 text-[#142143] hover:bg-[#ffaf00] hover:text-white font-semibold text-sm">
                  Beyond Academic
                </button>
                <button onClick={() => navigate('/research-development')} className="block w-full text-left px-4 py-2 text-[#142143] hover:bg-[#ffaf00] hover:text-white font-semibold text-sm">
                  Research & Development
                </button>
                <button onClick={() => navigate('/regulation')} className="block w-full text-left px-4 py-2 text-[#142143] hover:bg-[#ffaf00] hover:text-white font-semibold text-sm">
                  Admission
                </button>                                        
              </div>
            </div>

            {/* MATS SCHOOL */}
            <div className="relative group">
              <button className="text-white hover:text-[#ffaf00] font-bold flex items-center">
                MATS School <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-[220%] bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-30 py-2">
                {matsSchools.map((label, idx) => {
                  const path = routeMap[label] || '/';
                  return (
                    <Link
                      key={idx}
                      to={path}
                      className="block px-4 py-2 text-[#142143] hover:bg-[#ffaf00] hover:text-white font-semibold text-sm"
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* MCDOE */}
            <div className="relative group">
              <button className="text-white hover:text-[#ffaf00] font-bold flex items-center">
                MCDOE <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-[220%] bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-30 py-2">
                {[
                  ['MATS CENTRE FOR OPEN AND DISTANCE EDUCATION (ODL MODE)', 'https://matsodl.com/'],
                  ['MATS CENTRE FOR ONLINE EDUCATION (ONLINE MODE)', 'https://matsuniversityonline.com/'],
                ].map(([label, link], idx) => (
                  <a
                    key={idx}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-[#142143] hover:bg-[#ffaf00] hover:text-white font-semibold text-sm"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* OTHERS */}
            <button onClick={() => navigate('/placement')} className="text-white hover:text-[#ffaf00] font-bold transition-colors">
              Placement
            </button>
            <a href="https://lms.matsuniversityonline.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#ffaf00] font-bold transition-colors">
              SLM
            </a>
            <button className="text-white hover:text-[#ffaf00] font-bold transition-colors">
              Gallery
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-white hover:bg-[#ffaf00]/20"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-[#ffaf00]/20">
            <nav className="flex flex-col space-y-3 pt-4">
              <button onClick={() => { navigate('/'); setIsMenuOpen(false); }} className="text-white hover:text-[#ffaf00] font-bold text-left">
                Home
              </button>

              {/* Mobile ABOUT */}
              <div className="relative">
                <button
                  onClick={() => toggleMobileDropdown('about')}
                  className="text-white hover:text-[#ffaf00] font-bold text-left flex items-center w-full"
                >
                  About <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {openDropdown === 'about' && (
                  <div className="mt-1 bg-white rounded-md shadow-lg">
                    <button
                      onClick={() => {
                        navigate('/overview');
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-[#142143] hover:bg-[#ffaf00] hover:text-white text-sm"
                    >
                      Overview & Leadership
                    </button>
                    {[
                      ['Governance & Administration', 'https://matsuniversityonline.com/'],
                      ['Regulations & Approvals', 'https://matsuniversityonline.com/'],
                      ['Development & Accreditation', 'https://matsuniversityonline.com/'],
                      ['Reports & Publications', 'https://matsuniversityonline.com/'],
                    ].map(([label, link], idx) => (
                      <a
                        key={idx}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-[#142143] hover:bg-[#ffaf00] hover:text-white text-sm"
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Academic */}
              <div className="relative">
                <button
                  onClick={() => toggleMobileDropdown('academic')}
                  className="text-white hover:text-[#ffaf00] font-bold text-left flex items-center w-full"
                >
                  Academic <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {openDropdown === 'academic' && (
                  <div className="mt-1 bg-white rounded-md shadow-lg">
                    <button
                      onClick={() => {
                        navigate('/examination-cell');
                        setIsMenuOpen(false);
                        setOpenDropdown(null);
                      }}
                      className="block w-full text-left px-4 py-2 text-[#142143] hover:bg-[#ffaf00] hover:text-white text-sm"
                    >
                      Examination-Cell
                    </button>
                    {[
                      ['University Academic', 'https://matsodl.com/'],
                      ['Beyond Academic', 'https://matsuniversityonline.com/'],
                      ['Admission', 'https://matsuniversityonline.com/'],
                    ].map(([label, link], idx) => (
                      <a
                        key={idx}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-[#142143] hover:bg-[#ffaf00] hover:text-white text-sm"
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile MATS School */}
              <div className="relative">
                <button
                  onClick={() => toggleMobileDropdown('school')}
                  className="text-white hover:text-[#ffaf00] font-bold text-left flex items-center w-full"
                >
                  MATS School <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {openDropdown === 'school' && (
                  <div className="mt-1 bg-white rounded-md shadow-lg max-h-64 overflow-y-auto">
                    {matsSchools.map((label, idx) => {
                      const path = routeMap[label] || '/';
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            navigate(path);
                            setIsMenuOpen(false);
                            setOpenDropdown(null);
                          }}
                          className="block w-full text-left px-4 py-2 text-[#142143] hover:bg-[#ffaf00] hover:text-white text-sm"
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Mobile MCDOE */}
              <div className="relative">
                <button
                  onClick={() => toggleMobileDropdown('mcdoe')}
                  className="text-white hover:text-[#ffaf00] font-bold text-left flex items-center w-full"
                >
                  MCDOE <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {openDropdown === 'mcdoe' && (
                  <div className="mt-1 bg-white rounded-md shadow-lg">
                    {[
                      ['MATS CENTRE FOR OPEN AND DISTANCE EDUCATION (ODL MODE)', 'https://matsodl.com/'],
                      ['MATS CENTRE FOR ONLINE EDUCATION (ONLINE MODE)', 'https://matsuniversityonline.com/'],
                    ].map(([label, link], idx) => (
                      <a
                        key={idx}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-[#142143] hover:bg-[#ffaf00] hover:text-white text-sm"
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={() => { navigate('/placement'); setIsMenuOpen(false); }} className="text-white hover:text-[#ffaf00] font-bold text-left">
                Placement
              </button>
              <button className="text-white hover:text-[#ffaf00] font-bold text-left">Gallery</button>
              <a
                href="https://apply.matsuniversity.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ffaf00] hover:text-white font-bold text-left"
              >
                Apply Online
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
