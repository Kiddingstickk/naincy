import { useEffect, useRef } from 'react';

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleInteraction = () => {
      const audio = audioRef.current;
      if (audio && audio.paused) {
        audio.volume = 0.25;
        audio.play().catch((err) => {
          console.warn("Autoplay blocked. Will wait for further interaction:", err);
        });
      }

      // Only fire once
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
    <audio ref={audioRef} src="/audio/crazy.mp3" loop preload="auto" />
  );
};

export default BackgroundMusic;
