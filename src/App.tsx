import { useState, useRef, useEffect } from 'react';
import EnvelopeScreen from './components/EnvelopeScreen';
import CoverSection from './components/CoverSection';
import PoemSection from './components/PoemSection';
import LoveStoryCarousel from './components/LoveStoryCarousel';
import ScheduleSection from './components/ScheduleSection';
import CountdownSection from './components/CountdownSection';
import LocationSection from './components/LocationSection';
import WeddingRequestsSection from './components/WeddingRequestsSection';
import RSVPSection from './components/RSVPSection';
import GuestbookSection from './components/GuestbookSection';
import ClosingSection from './components/ClosingSection';
import FloatingMusicButton from './components/FloatingMusicButton';

export default function App() {
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 62-р сургуулийн дуу ("Жаран жарнаараа дуурсдаг 62 бидний сургууль")
    // Google Drive direct media stream ID: 1z63OXfP56OZrptm1sufhuFGxx69e79YI
    const driveAudioUrl = 'https://docs.google.com/uc?export=download&id=1z63OXfP56OZrptm1sufhuFGxx69e79YI';
    const fallbackAudioUrl = 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3';

    const audio = new Audio(driveAudioUrl);
    audio.loop = true;
    audio.preload = 'auto';

    audio.onerror = () => {
      // If Google Drive download quota/cors blocks streaming, switch to backup track
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
          // Browser autoplay restrictions may prevent immediate playback
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
    <div className="min-h-screen bg-[#faf6f0] text-neutral-800 font-serif antialiased selection:bg-amber-200 selection:text-amber-900">
      {!hasOpenedEnvelope ? (
        <EnvelopeScreen onOpen={handleOpenEnvelope} />
      ) : (
        <main className="relative flex flex-col w-full max-w-xl mx-auto min-h-screen bg-[#faf6f0] shadow-2xl overflow-x-hidden">
          <CoverSection />
          <PoemSection />
          <LoveStoryCarousel />
          <ScheduleSection />
          <CountdownSection />
          <LocationSection />
          <WeddingRequestsSection />
          <RSVPSection />
          <GuestbookSection />
          <ClosingSection onReopenEnvelope={handleReopenEnvelope} />
          <FloatingMusicButton isPlaying={isPlayingMusic} onToggle={handleToggleMusic} />
        </main>
      )}
    </div>
  );
}
