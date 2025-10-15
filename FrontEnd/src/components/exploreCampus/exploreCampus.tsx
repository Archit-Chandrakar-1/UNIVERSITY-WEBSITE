// src/components/ExploreCampus.tsx
import React from 'react';
import { Globe, ArrowRight, MapPin } from 'lucide-react';

const ExploreCampus: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#142143] mb-4">Explore Our Campus</h2>
          <p className="text-gray-600 text-lg">
            Take a virtual tour of our state-of-the-art campus and find our location.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Virtual Tour Section */}
          <div className="bg-[#142143] rounded-2xl p-8 text-center text-white relative overflow-hidden">
            {/* Background Globe Icon */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
              <Globe className="h-32 w-32" />
            </div>
            
            <div className="relative z-10">
              <div className="bg-[#ffaf00] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-[#142143]" />
              </div>
              
              <h3 className="text-3xl font-bold mb-4">360° Virtual Tour</h3>
              <p className="text-white/80 mb-8">Double-click to explore our campus</p>
              
              <a
                href="https://panel123.s3.ap-south-1.amazonaws.com/360Vtour_Mats_Univ/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#ffaf00] text-[#142143] px-8 py-4 rounded-full font-bold hover:bg-yellow-400 transition-colors"
              >
                Start Virtual Tour <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Find Campus Section with Google Map */}
          <div className="bg-gray-100 rounded-2xl p-4 sm:p-8">
            <div className="rounded-xl overflow-hidden w-full h-64 sm:h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.6190493924387!2d81.99600327559251!3d21.246949780457552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28bd079978adad%3A0x6f0422cd945200ed!2sMATS%20University%20l%20Best%20University%20In%20Raipur!5e0!3m2!1sen!2sin!4v1755060514202!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MATS University Location"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom Descriptions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Virtual Campus Description */}
          <div>
            <h3 className="text-2xl font-bold text-[#142143] mb-4">Virtual Campus Experience</h3>
            <p className="text-gray-600 leading-relaxed">
              Explore our modern facilities, classrooms, laboratories, and campus life through 
              an immersive 360° experience.
            </p>
          </div>

          {/* Find Campus Description */}
          <div>
            <h3 className="text-2xl font-bold text-[#142143] mb-4">Find Our Campus</h3>
            <div className="flex items-start space-x-3">
              <MapPin className="h-6 w-6 text-[#ffaf00] flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-[#142143] mb-1">Campus Address:</p>
                <p className="text-gray-600">
                  Aarang-Kharora Highway, Gullu, Aarang, Raipur (Chhattisgarh)
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExploreCampus;
