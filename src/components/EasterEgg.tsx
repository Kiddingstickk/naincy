import React, { useState } from 'react';
import { Leaf, X } from 'lucide-react';

const EasterEgg: React.FC = () => {
  const [isFound, setIsFound] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleLeafClick = () => {
    if (!isFound) {
      setIsFound(true);
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {/* Hidden Easter Egg Leaf */}
      <button
        onClick={handleLeafClick}
        className={`fixed bottom-8 right-8 p-3 rounded-full transition-all duration-500 z-20 ${
          isFound
            ? 'bg-green-500 text-white shadow-2xl scale-110'
            : 'bg-green-100 text-green-500 hover:bg-green-200 hover:scale-105'
        } shadow-lg`}
        style={{
          animation: isFound ? 'none' : 'pulse 2s infinite',
        }}
      >
        <Leaf className="w-6 h-6" />
      </button>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border-2 border-green-100 relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 p-2 text-green-500 hover:text-green-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <div className="mb-6">
                <Leaf className="w-16 h-16 text-green-500 mx-auto animate-spin" style={{ animationDuration: '3s' }} />
              </div>
              
              <h3 className="text-2xl font-playfair font-bold text-green-800 mb-4">
                You found the secret leaf? 🍃
              </h3>
              
              <p className="text-lg font-inter text-green-700 leading-relaxed">
                Guess that makes you the<br />
                <span className="font-bold text-green-800">cleverest, cutest bug hunter alive.</span>
              </p>
              
              <div className="mt-6 flex justify-center">
                <div className="animate-bounce">
                  <span className="text-4xl">🐞</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EasterEgg;