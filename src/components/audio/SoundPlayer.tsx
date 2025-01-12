import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function SoundPlayer() {
  const [isMuted, setIsMuted] = useState(true);
  const [error, setError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      audioRef.current.loop = true;
    }
  }, []);

  const toggleMute = async () => {
    if (audioRef.current) {
      try {
        if (isMuted) {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
          }
        } else {
          audioRef.current.pause();
        }
        setIsMuted(!isMuted);
        setError(false);
      } catch (err) {
        console.error('Audio playback error:', err);
        setError(true);
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleMute}
        className={`bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors duration-300 ${
          error ? 'cursor-not-allowed opacity-50' : ''
        }`}
        title={error ? "Audio playback error" : isMuted ? "Play ambient sounds" : "Mute ambient sounds"}
        disabled={error}
      >
        {isMuted ? (
          <VolumeX className="h-6 w-6 text-gray-600" />
        ) : (
          <Volume2 className="h-6 w-6 text-violet-600" />
        )}
      </button>
      <audio ref={audioRef}>
        <source src="https://assets.mixkit.co/active_storage/sfx/2434/2434-preview.mp3" type="audio/mpeg" />
        <source src="https://assets.mixkit.co/active_storage/sfx/2434/2434.wav" type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
      {error && (
        <div className="absolute bottom-full right-0 mb-2 bg-red-100 text-red-600 text-sm px-3 py-1 rounded-lg whitespace-nowrap">
          Unable to play audio
        </div>
      )}
    </div>
  );
}