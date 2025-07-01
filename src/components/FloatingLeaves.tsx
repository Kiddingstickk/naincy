import React, { useEffect, useState } from 'react';

interface Leaf {
  id: number;
  x: number;
  y: number;
  rotation: number;
  size: number;
  speed: number;
  opacity: number;
}

const FloatingLeaves: React.FC = () => {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    const initialLeaves: Leaf[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      size: Math.random() * 0.5 + 0.5,
      speed: Math.random() * 0.5 + 0.3,
      opacity: Math.random() * 0.4 + 0.2,
    }));
    setLeaves(initialLeaves);
  }, []);

  useEffect(() => {
    const animateLeaves = () => {
      setLeaves(prevLeaves =>
        prevLeaves.map(leaf => ({
          ...leaf,
          x: (leaf.x + leaf.speed * 0.1) % 105,
          y: (leaf.y + Math.sin(leaf.x * 0.01) * 0.1) % 105,
          rotation: leaf.rotation + 0.5,
        }))
      );
    };

    const interval = setInterval(animateLeaves, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {leaves.map(leaf => (
        <div
          key={leaf.id}
          className="absolute transition-all duration-1000 ease-out"
          style={{
            left: `${leaf.x}%`,
            top: `${leaf.y}%`,
            transform: `rotate(${leaf.rotation}deg) scale(${leaf.size})`,
            opacity: leaf.opacity,
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="text-green-300 drop-shadow-sm"
          >
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.19 0 2.34-.21 3.41-.6C17.86 20.67 19 18.48 19 16c0-3.31-2.69-6-6-6-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2c0-.55-.45-1-1-1s-1 .45-1 1"
              opacity="0.7"
            />
            <path
              fill="currentColor"
              d="M12 7c2.21 0 4 1.79 4 4 0 .55-.45 1-1 1s-1-.45-1-1c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2c2.21 0 4-1.79 4-4 0-3.31-2.69-6-6-6S6 8.69 6 12s2.69 6 6 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2"
              opacity="0.5"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FloatingLeaves;