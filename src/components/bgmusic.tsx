import { useEffect, useRef } from 'react';

const BackgroundMusic: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleInteraction = () => {
      const audio = audioRef.current;
      if (audio && audio.paused) {
        audio.volume = 0.25;
        audio.play();
      }

      // Remove after first trigger
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
