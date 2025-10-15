// // frontend/src/pages/departmentAdmin/departmentAdminDashoard.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AdminSyllabusSection from '../../components/adminComponents/adminSyllabusSection';
import AdminGallerySection from '../../components/adminComponents/adminGallerySection';
import AdminAcademicContent from '../../components/adminComponents/adminAcademicSection';
import AdminStudyMaterial from '../../components/adminComponents/adminStudyMaterial';
import AdminProgrammesTable from '../../components/adminComponents/adminProgrammesTable';
import AdminAchievementsSection from '../../components/adminComponents/adminAchievmentsSection';
import AdminFacultyDirectory from '../../components/adminComponents/adminFacultyDirectory';
import AdminDepartmentOverview from '../../components/adminComponents/adminDepartmentOverview';
import AdminTestimonialsDepartment from '../../components/adminComponents/adminTestimonialsDepartment';
import { logoutDepartmentUser } from '../../services/authDepartmentService';

const DepartmentAdminDashboard: React.FC = () => {
  const navigate = useNavigate(); 
  const [authenticatedDepartmentName, setAuthenticatedDepartmentName] = useState<string | null>(null);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<'academic'|'departmentTestimonials' |'faculty'|'overview'| 'gallery' | 'study_materials' | 'programmes' | 'syllabus' | 'achievements'>('academic');

  useEffect(() => {
    // On mount, check if department is logged in
    const storedDepartmentName = localStorage.getItem('departmentName');
    const token = localStorage.getItem('departmentUserToken');

    if (!storedDepartmentName || !token) {
      // If not logged in, redirect to login page
      navigate('/department-login');
    } else {
      setAuthenticatedDepartmentName(storedDepartmentName);
    }
  }, [navigate]);

  const handleLogout = () => {
    logoutDepartmentUser(); // Clear token and department name from local storage
    navigate('/department-login'); // Redirect to login page
  };

  if (!authenticatedDepartmentName) {
    // Render a loading state or nothing while redirecting
    return <div className="text-center p-8">Checking login status...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar for navigation between content types */}
      <aside className="w-64 bg-[#142143] text-white p-6 shadow-lg flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-yellow-400">
          {authenticatedDepartmentName} Admin
        </h2>
        <nav className="flex-1">
          <ul>
          
            <li className="mb-2">
              <button
                onClick={() => setSelectedCategoryTab('academic')}
                className={`block w-full text-left p-3 rounded-lg transition duration-200 ${
                  selectedCategoryTab === 'academic' ? 'bg-yellow-600 text-white' : 'hover:bg-[#2e406e]'
                }`}
              >
                Academic Content
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setSelectedCategoryTab('overview')}
                className={`block w-full text-left p-3 rounded-lg transition duration-200 ${
                  selectedCategoryTab === 'overview' ? 'bg-yellow-600 text-white' : 'hover:bg-[#2e406e]'
                }`}
              >
                Overview & Vision
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setSelectedCategoryTab('programmes')}
                className={`block w-full text-left p-3 rounded-lg transition duration-200 ${
                  selectedCategoryTab === 'programmes' ? 'bg-yellow-600 text-white' : 'hover:bg-[#2e406e]'
                }`}
              >
                Programmes Offered
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setSelectedCategoryTab('faculty')}
                className={`block w-full text-left p-3 rounded-lg transition duration-200 ${
                  selectedCategoryTab === 'faculty' ? 'bg-yellow-600 text-white' : 'hover:bg-[#2e406e]'
                }`}
              >
                Admin Faculty Directory
              </button>
          </li>  
          <li className="mb-2">
              <button
                onClick={() => setSelectedCategoryTab('study_materials')}
                className={`block w-full text-left p-3 rounded-lg transition duration-200 ${
                  selectedCategoryTab === 'study_materials' ? 'bg-yellow-600 text-white' : 'hover:bg-[#2e406e]'
                }`}
              >
                Study Materials
              </button>
          </li>
            
          <li className="mb-2">
              <button
                onClick={() => setSelectedCategoryTab('syllabus')}
                className={`block w-full text-left p-3 rounded-lg transition duration-200 ${
                  selectedCategoryTab === 'syllabus' ? 'bg-yellow-600 text-white' : 'hover:bg-[#2e406e]'
                }`}
              >
                Syllabus
              </button>
          </li>
          <li className="mb-2">
              <button
                onClick={() => setSelectedCategoryTab('gallery')}
                className={`block w-full text-left p-3 rounded-lg transition duration-200 ${
                  selectedCategoryTab === 'gallery' ? 'bg-yellow-600 text-white' : 'hover:bg-[#2e406e]'
                }`}
              >
                Gallery
              </button>
          </li>
            <li className="mb-2">
              <button
                onClick={() => setSelectedCategoryTab('achievements')}
                className={`block w-full text-left p-3 rounded-lg transition duration-200 ${
                  selectedCategoryTab === 'achievements' ? 'bg-yellow-600 text-white' : 'hover:bg-[#2e406e]'
                }`}
              >
                Achievements
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setSelectedCategoryTab('departmentTestimonials')}
                className={`block w-full text-left p-3 rounded-lg transition duration-200 ${
                  selectedCategoryTab === 'departmentTestimonials' ? 'bg-yellow-600 text-white' : 'hover:bg-[#2e406e]'
                }`}
              >
                Alumni Testimonials & Placement Statistics
              </button>
            </li>
          </ul>
        </nav>
        <div className="mt-auto pt-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-8 overflow-y-auto">
      {selectedCategoryTab === 'faculty' && (
          <AdminFacultyDirectory departmentName={authenticatedDepartmentName} />
        )}
        {selectedCategoryTab === 'academic' && (
          <AdminAcademicContent departmentName={authenticatedDepartmentName} />
        )}
        {selectedCategoryTab === 'gallery' && (
          <AdminGallerySection departmentName={authenticatedDepartmentName} />
        )}
        {selectedCategoryTab === 'study_materials' && (
          <AdminStudyMaterial departmentName={authenticatedDepartmentName} />
        )}
        {selectedCategoryTab === 'programmes' && (
          <AdminProgrammesTable departmentName={authenticatedDepartmentName} />
        )}
        {selectedCategoryTab === 'syllabus' && (
          <AdminSyllabusSection departmentName={authenticatedDepartmentName} />
        )}
        {selectedCategoryTab === 'achievements' && (
          <AdminAchievementsSection departmentName={authenticatedDepartmentName} />
        )}
        {selectedCategoryTab === 'overview' && (
          <AdminDepartmentOverview departmentName={authenticatedDepartmentName} />
        )}
        {selectedCategoryTab === 'departmentTestimonials' && (
          <AdminTestimonialsDepartment departmentName={authenticatedDepartmentName} />
        )}
      </main>
    </div>
  );
};

export default DepartmentAdminDashboard;