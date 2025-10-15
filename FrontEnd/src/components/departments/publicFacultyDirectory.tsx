import React, { useState, useEffect } from 'react';
import { X, Mail, Phone } from 'lucide-react';

interface FacultyItem {
  _id: string;
  department: string;
  name: string;
  position: string;
  email: string;
  phone?: string;
  photo_url?: string;
  details?: string;
  order?: number;
}

interface PublicFacultyDirectoryProps {
  departmentName: string;
}

const API_URL = 'http://localhost:5555/api/faculty';
const MARQUEE_SPEED_FACTOR = 4; // Adjust speed: lower = faster

const marqueeStyles = `
  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }

  .animate-marquee {
    animation: marquee var(--marquee-speed) linear infinite;
  }
`;

const PublicFacultyDirectory: React.FC<PublicFacultyDirectoryProps> = ({ departmentName }) => {
  const [faculty, setFaculty] = useState<FacultyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyItem | null>(null);

  useEffect(() => {
    const fetchFaculty = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}?department=${encodeURIComponent(departmentName)}`);
        if (!response.ok) throw new Error(`Failed to fetch faculty: ${response.statusText}`);
        setFaculty(await response.json());
      } catch (err) {
        setError(`Failed to load faculty directory: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setLoading(false);
      }
    };
    if (departmentName) fetchFaculty();
  }, [departmentName]);

  if (loading) return <div className="text-center p-8">Loading faculty directory...</div>;
  if (error) return <div className="text-red-600 p-4 bg-red-100 rounded-md my-4">Error: {error}</div>;
  if (faculty.length === 0) return <p className="text-center text-gray-500">No faculty members listed for {departmentName}.</p>;

  const marqueeSpeed = `${faculty.length * MARQUEE_SPEED_FACTOR}s`; 

  const FacultyCard: React.FC<{ member: FacultyItem }> = ({ member }) => (
    <div 
      onClick={() => setSelectedFaculty(member)}
      className="flex-shrink-0 w-64 cursor-pointer bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
    >
      <img
        src={member.photo_url || 'https://via.placeholder.com/96x96.png?text=Photo'}
        alt={member.name}
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover grayscale hover:grayscale-0 transition-all duration-500"
      />
      <h4 className="text-lg font-bold text-[#142143] mb-1 truncate">{member.name}</h4>
      <p className="text-gray-600 text-sm italic">{member.position}</p>
    </div>
  );

  return (
    <section className="py-8">
      <style>{marqueeStyles}</style>

      <div className="relative overflow-hidden bg-gray-50 py-8 rounded-lg shadow-inner">
        <div 
          className="flex flex-nowrap gap-6 animate-marquee"
          style={{ 
            '--marquee-speed': marqueeSpeed, 
            width: `${(faculty.length * 2) * 18}rem`
          } as React.CSSProperties} 
        >
          {faculty.map((member) => (
            <FacultyCard key={member._id} member={member} />
          ))}
        </div>
      </div>

      {selectedFaculty && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg relative p-6">
            <button onClick={() => setSelectedFaculty(null)} className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition">
              <X className="h-6 w-6" />
            </button>
            <div className="flex flex-col items-center text-center">
              <img src={selectedFaculty.photo_url || 'https://via.placeholder.com/150x150.png?text=Photo'} 
                   alt={selectedFaculty.name} 
                   className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-[#ffaf00]" />
              <h3 className="text-2xl font-bold text-[#142143]">{selectedFaculty.name}</h3>
              <p className="text-lg text-[#142143] mb-4">{selectedFaculty.position}</p>
              
              <div className="space-y-3 text-left w-full mt-4 border-t pt-4">
                {selectedFaculty.email && (
                  <p className="flex items-center gap-3 text-gray-700 font-medium">
                    <Mail className="h-5 w-5 text-gray-500" /> {selectedFaculty.email}
                  </p>
                )}
                {selectedFaculty.phone && (
                  <p className="flex items-center gap-3 text-gray-700 font-medium">
                    <Phone className="h-5 w-5 text-gray-500" /> {selectedFaculty.phone}
                  </p>
                )}
                {selectedFaculty.details && (
                  <div className="mt-4 pt-4 border-t text-gray-700">
                    <h4 className="font-bold text-md mb-2">Biography:</h4>
                    <p className="text-sm leading-relaxed">{selectedFaculty.details}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PublicFacultyDirectory;