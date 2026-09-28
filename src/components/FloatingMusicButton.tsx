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
        className="relative flex items-center gap-2 p-3 rounded-full bg-white/95 hover:bg-white text-amber-950 shadow-[0_10px_25px_-5px_rgba(217,119,6,0.3)] backdrop-blur-md border-2 border-amber-300 transition-all cursor-pointer group"
      >
        {/* Animated equalizer waves when playing */}
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-4 w-4">
            <span className="w-0.5 bg-amber-500 rounded-full animate-pulse h-full" style={{ animationDuration: '0.6s' }} />
            <span className="w-0.5 bg-amber-500 rounded-full animate-pulse h-2/3" style={{ animationDuration: '0.9s' }} />
            <span className="w-0.5 bg-amber-500 rounded-full animate-pulse h-4/5" style={{ animationDuration: '0.4s' }} />
            <span className="w-0.5 bg-amber-500 rounded-full animate-pulse h-1/2" style={{ animationDuration: '0.7s' }} />
          </div>
        ) : (
          <Music className="w-4 h-4 text-amber-600" />
        )}

        <div className="flex items-center">
          {isPlaying ? (
            <Pause className="w-4 h-4 text-amber-800" />
          ) : (
            <Play className="w-4 h-4 text-amber-800 fill-amber-800 ml-0.5" />
          )}
        </div>

        {/* Floating pulse indicator ring */}
        {isPlaying && (
          <span className="absolute -inset-1 rounded-full border border-amber-400/40 animate-ping opacity-60 pointer-events-none" style={{ animationDuration: '3s' }} />
        )}
      </motion.button>
    </div>
  );
}
