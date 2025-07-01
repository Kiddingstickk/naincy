import React, { useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';

interface HeroSectionProps {
  isVisible: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isVisible }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className={`fixed inset-0 flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 transition-all duration-1000 ease-out z-10 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
      }`}
    >
      <div className="text-center px-6 max-w-4xl mx-auto">
        <div className={`transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center mb-6">
            <Leaf className="text-green-500 mr-3 w-8 h-8 animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-playfair font-bold text-green-800 tracking-tight">
              Hello, Naincy
            </h1>
            <span className="text-4xl md:text-6xl ml-3">🌱</span>
          </div>
          
          <p className="text-xl md:text-2xl text-green-700 font-inter font-light leading-relaxed max-w-2xl mx-auto">
            You once said you've never met a guy with green flags...
            <br />
            <span className="font-medium text-green-800">So I made you a whole world of them.</span>
          </p>
        </div>

        <div className={`mt-12 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="animate-bounce">
            <svg
              className="w-8 h-8 text-green-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;