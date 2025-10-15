import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate for protected routes

import HomePage from './pages/homePage/homePage';
import PlacementPage from './pages/placementPage/placement';
import OverviewLeadershipPage from './pages/overviewLeadership/overviewLeadership';
import GovernanceAdministrationPage from './pages/governanceAdministration/governanceAdministration';
import RegulationsApprovalPage from './pages/regulationApproval/regulationApproval';
import DevelopmentAccredinationPage from './pages/developmentAccerditation/developmentAccerditation';
import AnnualReportPage from './pages/annualReport/annualReport';
import GalleryPage from './pages/gallery/gallery';
import EventGallery from './pages/eventGallery/eventGallery';
import UniversityAcademic from './pages/universityAcademic/universityAcademic';
import ResearchDevelopment from './pages/researchDevelopment/researchDevelopment';
import ManagementBusinessPage from './pages/departments/managementBusiness';
import LawSchoolPage from './pages/departments/lawSchool';
import EngineeringITPage from './pages/departments/engineeringIT';
import SchoolOfEducationPage from './pages/departments/schoolEducation';
import InformationTechnologyPage from './pages/departments/informationTechnology';
import LibrarySciencesPage from './pages/departments/librarySciences';
import SchoolOfSciencesPage from './pages/departments/schoolOfSciences';
import SchoolOfPharmacyPage from './pages/departments/schoolOfPharmacy';
import SchoolOfPhysicalEducationYogaPage from './pages/departments/physicalEducation';
import FashionDesigningPage from './pages/departments/fashionDesigning';


import AdminDashboard from './pages/admin/adminDashboard'; // Assuming this is your super-admin dashboard

// Import the new department-specific components
import DepartmentLoginPage from './pages/departmentLogin/departmentLoginPage';
import DepartmentAdminDashboard from './pages/departmentAdmin/departmentAdminDashoard';


import ExaminationCellPage from './pages/examCell/examinationCell';
// --- Helper Component for Protected Routes ---
// This component checks if a user is authenticated (by looking for a token in localStorage)
// If authenticated, it renders its children. Otherwise, it redirects to the department login page.
const PrivateDepartmentRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('departmentUserToken');
  return isAuthenticated ? children : <Navigate to="/department-login" />;
};
// --- End Helper Component ---


function App() {
  return (
    <Router>
      <Routes>
        {/* --- Public-Facing Website Routes --- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/placement" element={<PlacementPage />} />
        <Route path="/overview" element={<OverviewLeadershipPage />} />
        <Route path="/governance" element={<GovernanceAdministrationPage />} />
        <Route path="/regulation" element={<RegulationsApprovalPage />} />
        <Route path="/development" element={<DevelopmentAccredinationPage />} />
        <Route path="/reports" element={<AnnualReportPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/gallery/:eventSlug" element={<EventGallery />} />
        <Route path="/academics" element={<UniversityAcademic />} />
        <Route path="/research-development" element={<ResearchDevelopment />} />
        {/* Department Public Pages */}
        <Route path="/management-business" element={<ManagementBusinessPage/>} />
        <Route path="/law-school" element={<LawSchoolPage/>} />
        <Route path="/Engineering-IT" element={< EngineeringITPage/>} />
        <Route path="/School-education" element={< SchoolOfEducationPage/>} />
        <Route path="/Information-Technology" element={< InformationTechnologyPage/>} />
        <Route path="/Library-Science" element={< LibrarySciencesPage/>} />
        <Route path="/Sciences-Forensic" element={< SchoolOfSciencesPage/>} />
        <Route path="/pharmacy" element={< SchoolOfPharmacyPage/>} />
        <Route path="/physical-education-yoga" element={< SchoolOfPhysicalEducationYogaPage/>} />
        <Route path="/fashion-designing-technology" element={< FashionDesigningPage/>} />
        
        {/* --- Admin / Login Routes --- */}
        
        {/* Super-Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/examination-cell" element={<ExaminationCellPage />} />

        {/* Department Login Page */}
        <Route path="/department-login" element={<DepartmentLoginPage />} />

        {/* Department Admin Dashboard - PROTECTED ROUTE */}
        <Route
          path="/department-admin"
          element={
            <PrivateDepartmentRoute>
              <DepartmentAdminDashboard />
            </PrivateDepartmentRoute>
          }
        />
        
        {/* Optional: Fallback for any unmatched routes */}
        {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
        
      </Routes>
    </Router>
  );
}

export default App;