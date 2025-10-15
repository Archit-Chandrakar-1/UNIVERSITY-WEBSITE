// // src/pages/departments/SchoolOfSciences.tsx

import React from 'react';
import Navbar from '../../components/navbar/navbar';
import ActionMenu from '../../components/actionMenu/actionMenu';
import Footer from '../../components/footer/footer';
import DescriptionBlock from '../../components/departments/publicDepartmentBlock'; 
import StudyMaterialSection from '../../components/departments/publicStudyMaterialSection';
import GallerySection from '../../components/departments/publicGallerySection';
import ProgrammesTable from '../../components/departments/publicProgrammesTable';
import PublicAcademicSection from '../../components/departments/publicAcademicSection';
import PublicSyllabusSection from '../../components/departments/publicSyllabusSection';
import PublicAchievementsSection from '../../components/departments/publicAchievementsSection';

const SchoolOfSciencesPage: React.FC = () => {
  const departmentFullName = "MATS SCHOOL OF SCIENCES & FORESNSIC SCIENCE";
  
  // Hardcoded description for now, as no dedicated description API is confirmed
  const descriptionText = "MATS School of Sciences & Forensic Science offers modern undergraduate and postgraduate programs in sciences and forensic investigation, emphasizing hands-on research, analytical skills, and professional development for careers in science and allied fields.";

  return (
    <>
      <Navbar />
      <main style={{ marginLeft: '10px', marginRight: '10px' }} className="w-full pt-20 py-10 bg-gray-50">

        {/* Description Block */}
        <section className="mb-8 px-1 sm:px-6 md:px-12 mt-8">
            <h2 className="text-2xl font-bold mb-3 text-[#142143]">About {departmentFullName}</h2>
            <DescriptionBlock
                description={descriptionText}
                departmentname={departmentFullName}
            />
        </section>

        {/* Programmes Offered */}
        <ProgrammesTable departmentName={departmentFullName} title="PROGRAMMES OFFERED" />

        
        

        <section className="mb-8 px-1 sm:px-6 md:px-12 mt-8">
            <h2 className="text-2xl font-bold mb-3 text-[#142143]">ACADEMIC CONTENT</h2>
            <PublicAcademicSection departmentName={departmentFullName} />
        </section>

        <section className="mb-8 px-1 sm:px-6 md:px-12 mt-8">
            <h2 className="text-2xl font-bold mb-3 text-[#142143]"> ACHIEVEMENTS</h2>
            <PublicAchievementsSection departmentName={departmentFullName} />
        </section>

        

        <section className="mb-8 px-1 sm:px-6 md:px-12 mt-8">
            <h2 className="text-2xl font-bold mb-3 text-[#142143]">SYLLABUS</h2>
            <PublicSyllabusSection departmentName={departmentFullName} />
        </section>

        {/* Study Materials */}
        <section className="mb-8 px-1 sm:px-6 md:px-12 mt-8">
            <h2 className="text-2xl font-bold mb-3 text-[#142143]">STUDY MATERIALS</h2>
            <StudyMaterialSection departmentName={departmentFullName} />
        </section>

        {/* Gallery */}
        <section className="mb-8 px-1 sm:px-6 md:px-12 mt-8">
            <h2 className="text-2xl font-bold mb-3 text-[#142143]">GALLERY</h2>
            <GallerySection departmentName={departmentFullName} />
        </section>

      </main>
      <ActionMenu />
      <Footer />
    </>
  );
};

export default SchoolOfSciencesPage;