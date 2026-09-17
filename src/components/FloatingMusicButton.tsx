import { Play, Pause, Music } from 'lucide-react';
import { motion } from 'motion/react';

interface FloatingMusicButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export default function FloatingMusicButton({ isPlaying, onToggle }: FloatingMusicButtonProps) {
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <motion.button
        id="floating-music-toggle"
        type="button"
        onClick={onToggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isPlaying ? 'Хөгжим зогсоох' : 'Хөгжим тоглуулах'}
        className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-sky-700/90 hover:bg-sky-800 text-white shadow-xl backdrop-blur-md border border-white/20 transition-all cursor-pointer group"
      >
        {/* Animated equalizer waves when playing */}
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-3.5 w-3.5 mb-0.5">
            <span className="w-0.5 bg-amber-200 rounded-full animate-pulse h-full" style={{ animationDuration: '0.6s' }} />
            <span className="w-0.5 bg-amber-200 rounded-full animate-pulse h-2/3" style={{ animationDuration: '0.9s' }} />
            <span className="w-0.5 bg-amber-200 rounded-full animate-pulse h-4/5" style={{ animationDuration: '0.4s' }} />
            <span className="w-0.5 bg-amber-200 rounded-full animate-pulse h-1/2" style={{ animationDuration: '0.7s' }} />
          </div>
        ) : (
          <Music className="w-3.5 h-3.5 text-amber-200" />
        )}

        <div className="flex items-center">
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 text-white/90" />
          ) : (
            <Play className="w-3.5 h-3.5 text-white/90 fill-white/90 ml-0.5" />
          )}
        </div>

        {/* Floating pulse indicator ring */}
        {isPlaying && (
          <span className="absolute -inset-1 rounded-full border border-amber-300/30 animate-ping opacity-60 pointer-events-none" style={{ animationDuration: '3s' }} />
        )}
      </motion.button>
    </div>
  );
}
