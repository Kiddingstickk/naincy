import React, { useState } from 'react';
import { Leaf } from 'lucide-react';

const ChooseALeafGame: React.FC = () => {
  const [selectedLeaves, setSelectedLeaves] = useState<number[]>([]);
  const [builtSentence, setBuiltSentence] = useState<string>('');

  const leafPhrases = [
    { id: 1, phrase: "You're made of sunlight" },
    { id: 2, phrase: "that finds its way through clouds" },
    { id: 3, phrase: "You carry a calmness" },
    { id: 4, phrase: "that makes storms feel like spring rain" },
    { id: 5, phrase: "Your smile blooms" },
    { id: 6, phrase: "like flowers after a gentle shower" },
    { id: 7, phrase: "You're the kind of magic" },
    { id: 8, phrase: "that makes ordinary moments feel infinite" },
  ];

  const handleLeafClick = (leafId: number) => {
    if (selectedLeaves.includes(leafId)) {
      setSelectedLeaves(selectedLeaves.filter(id => id !== leafId));
    } else {
      setSelectedLeaves([...selectedLeaves, leafId]);
    }
  };

  React.useEffect(() => {
    const sentence = leafPhrases
      .filter(leaf => selectedLeaves.includes(leaf.id))
      .map(leaf => leaf.phrase)
      .join(' ');
    setBuiltSentence(sentence);
  }, [selectedLeaves]);

  return (
    <div className="py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-green-800 mb-8">
          Choose a leaf
        </h2>
        
        <div className="grid grid-cols-4 gap-6 mb-12 max-w-2xl mx-auto">
          {leafPhrases.map((leaf) => (
            <button
              key={leaf.id}
              onClick={() => handleLeafClick(leaf.id)}
              className={`group relative p-4 rounded-full transition-all duration-300 transform hover:scale-110 ${
                selectedLeaves.includes(leaf.id)
                  ? 'bg-green-200 shadow-lg'
                  : 'bg-green-50 hover:bg-green-100'
              }`}
            >
              <Leaf 
                className={`w-8 h-8 mx-auto transition-all duration-300 ${
                  selectedLeaves.includes(leaf.id)
                    ? 'text-green-700 rotate-12'
                    : 'text-green-500 group-hover:text-green-600'
                }`}
              />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                {leaf.phrase}
              </div>
            </button>
          ))}
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-green-100 min-h-[120px] flex items-center justify-center">
          <p className="text-2xl md:text-3xl font-playfair text-green-800 leading-relaxed">
            {builtSentence || "Click the leaves above to build your message..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChooseALeafGame;