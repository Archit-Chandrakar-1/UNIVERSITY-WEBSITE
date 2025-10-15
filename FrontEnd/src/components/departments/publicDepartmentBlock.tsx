import React from 'react';

interface DescriptionBlockProps {
  description: string; 
  departmentname:string;
}

const DescriptionBlock: React.FC<DescriptionBlockProps> = ({ description, departmentname }) => (
  <>
   <section className="bg-[#142143] text-white py-16 rounded-2xl ml-5 mr-5">
    <h1 className="ml-5 mr-5 text-white text-5xl mb-5 font-bold text-[#ffaf00]">{departmentname}</h1>
    <h2 className="text-3xl ml-5 mr-5 font-bold text-[#ffaf00] mb-4">About Department</h2>
    <p className=" ml-5 mr-5 text-white text-lg">{description}</p>
  </section>
  </> 
);

export default DescriptionBlock;
