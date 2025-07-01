import { useEffect, useRef, useState } from 'react';

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true);

      const audio = audioRef.current;
      if (audio && audio.paused) {
        audio.volume = 0.25;
        audio.play().catch((err) => {
          console.warn("Autoplay blocked. Will wait for further interaction:", err);
        });
      }

      // Remove listeners after first interaction
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('scroll', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/audio/crazy.mp3" loop preload="auto" />
      
      {!hasInteracted && (
        <div className="fixed bottom-6 right-6 bg-white/90 px-4 py-2 rounded-lg shadow-md backdrop-blur-md text-green-700 text-sm animate-fade-in z-50">
          🎶 Tap or scroll to start music
        </div>
      )}
    </>
  );
};

export default BackgroundMusic;
