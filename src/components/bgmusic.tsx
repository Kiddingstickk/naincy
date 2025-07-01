import { useEffect, useRef } from 'react';

const BackgroundAudio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3; // Soft background
      audio.play().catch((e) => {
        // Browser blocked autoplay — you could prompt to start music
        console.warn("Autoplay prevented:", e);
      });
    }
  }, []);

  return (
    <audio ref={audioRef} src="/audio/crazy.mp3" loop preload="auto" />
  );
};

export default BackgroundAudio;
