import { useState, useRef, useEffect } from 'react';
import EnvelopeScreen from './components/EnvelopeScreen';
import CoverSection from './components/CoverSection';
import PoemSection from './components/PoemSection';
import LoveStoryCarousel from './components/LoveStoryCarousel';
import CountdownSection from './components/CountdownSection';
import LocationSection from './components/LocationSection';
import RSVPSection from './components/RSVPSection';
import ClosingSection from './components/ClosingSection';
import FloatingMusicButton from './components/FloatingMusicButton';

export default function App() {
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 62-р сургуулийн сүлд дуу ("Жаран жарнаараа дуурсдаг 62 бидний сургууль")
    // Static local asset served directly for zero-latency, reliable playback
    const localAudioUrl = '/audio/school_62_anthem.mp3';
    const fallbackAudioUrl = 'https://docs.google.com/uc?export=download&id=1z63OXfP56OZrptm1sufhuFGxx69e79YI';

    const audio = new Audio(localAudioUrl);
    audio.loop = true;
    audio.preload = 'auto';

    audio.onerror = () => {
      // Fallback if local asset fails
      if (audio.src !== fallbackAudioUrl) {
        audio.src = fallbackAudioUrl;
        audio.load();
      }
    };

    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleOpenEnvelope = () => {
    setHasOpenedEnvelope(true);
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlayingMusic(true))
        .catch(() => {
          // Browser autoplay restrictions may require explicit user click on music button
          setIsPlayingMusic(false);
        });
    }
  };

  const handleToggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlayingMusic(true))
        .catch(() => setIsPlayingMusic(false));
    }
  };

  const handleReopenEnvelope = () => {
    setHasOpenedEnvelope(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#FAF6F0] text-slate-800 antialiased selection:bg-amber-200 selection:text-amber-900 font-sans">
      {/* 3D Envelope Opening Screen */}
      {!hasOpenedEnvelope && (
        <EnvelopeScreen onOpen={handleOpenEnvelope} />
      )}

      {/* Main Anniversary Invitation Document */}
      <main className={`w-full transition-opacity duration-1000 ${hasOpenedEnvelope ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        <CoverSection />
        <PoemSection />
        <LoveStoryCarousel />
        <CountdownSection />
        <LocationSection />
        <RSVPSection />
        <ClosingSection onReopenEnvelope={handleReopenEnvelope} />
      </main>

      {/* Floating Audio Play/Pause Button */}
      {hasOpenedEnvelope && (
        <FloatingMusicButton
          isPlaying={isPlayingMusic}
          onToggle={handleToggleMusic}
        />
      )}
    </div>
  );
}
