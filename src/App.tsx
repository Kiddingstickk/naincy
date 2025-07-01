import React, { useEffect, useState } from 'react';
import FloatingLeaves from './components/FloatingLeaves';
import HeroSection from './components/HeroSection';
import ChooseALeafGame from './components/ChooseALeafGame';
import MicroJournal from './components/MicroJournal';
import EasterEgg from './components/EasterEgg';
import BackgroundAudio from './components/bgmusic';

function App() {
  const [showHero, setShowHero] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Hide hero when scrolling down
      if (currentScrollY > 100) {
        setShowHero(false);
      } else {
        setShowHero(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-25 via-white to-green-50 relative overflow-x-hidden">
      {/* Floating Leaves Background */}
      <FloatingLeaves />
      <BackgroundAudio/>
      
      {/* Hero Section */}
      <HeroSection isVisible={showHero} />
      
      {/* Main Content */}
      <div className={`relative z-20 transition-all duration-1000 ${showHero ? 'opacity-0' : 'opacity-100'}`}>
        {/* Spacer to account for hero height */}
        <div className="h-screen" />
        
        {/* Choose a Leaf Game */}
        <section className="bg-white/60 backdrop-blur-sm">
          <ChooseALeafGame />
        </section>
        
        {/* Micro Journal */}
        <section>
          <MicroJournal />
        </section>
        
        {/* Footer */}
        <footer className="py-16 text-center">
          <p className="text-green-600 font-inter font-light text-lg">
            Made with 💚 for someone who deserves all the green flags
          </p>
        </footer>
      </div>
      
      {/* Easter Egg */}
      <EasterEgg />
    </div>
  );
}

export default App;