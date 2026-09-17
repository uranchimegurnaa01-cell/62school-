import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

interface EnvelopeScreenProps {
  onOpen: () => void;
}

export default function EnvelopeScreen({ onOpen }: EnvelopeScreenProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleSealClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    // Allow flap opening and card reveal animation to complete before transitioning
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div
      id="envelope-screen"
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#0b1320] via-[#0f1d30] to-[#070b12] p-4 overflow-hidden"
    >
      {/* Ambient background particles / glow in serene sapphire & soft gold */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-[#D4AF37]/15 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full max-w-sm sm:max-w-md mx-auto aspect-[3/4.4] flex flex-col items-center justify-center"
      >
        {/* Helper instruction tag at the top */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-200/90 text-xs sm:text-sm font-medium tracking-wide shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Урилга нээхийн тулд лацыг товшино уу</span>
        </motion.div>

        {/* Envelope Container */}
        <div className="relative w-full aspect-[3/4] bg-[#f8f4ee] rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] border border-amber-900/15 overflow-hidden flex flex-col">
          {/* Subtle paper grain & elegant frame */}
          <div className="absolute inset-3 border border-amber-800/10 rounded-xl pointer-events-none" />
          <div className="absolute inset-5 border border-dashed border-amber-800/10 rounded-lg pointer-events-none" />

          {/* Envelope Body Base Background */}
          <div className="absolute inset-0 bg-[#f4ede2] z-0" />

          {/* Card Inside Envelope (Slides Up upon opening) */}
          <motion.div
            initial={false}
            animate={{
              y: isOpening ? -140 : 0,
              scale: isOpening ? 1.03 : 1,
            }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-5 top-12 bottom-6 bg-white rounded-xl shadow-lg border border-amber-800/15 p-6 flex flex-col items-center justify-center text-center z-10"
          >
            <div className="w-10 h-0.5 bg-amber-700/30 mb-4" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-medium mb-1">
              Түүхт 50 жилийн ой
            </span>
            <h1 className="font-serif-title text-xl sm:text-2xl text-neutral-800 font-semibold mb-1">
              62 дугаар сургууль
            </h1>
            <p className="font-serif-title text-sm text-amber-900/80 mb-3">
              {WEDDING_DATA.formattedDate} · {WEDDING_DATA.formattedTime}
            </p>
            <div className="text-xs text-neutral-500 font-light leading-relaxed max-w-[220px]">
              Энэхүү түүхт баярын мөчийг бидэнтэй хамт хуваалцаарай
            </div>
            <div className="w-10 h-0.5 bg-amber-700/30 mt-4" />
          </motion.div>

          {/* Envelope Side Fold (Left) */}
          <div
            className="absolute inset-0 z-14 pointer-events-none"
            style={{
              clipPath: 'polygon(0 0, 50% 50%, 0 100%)',
              background: 'linear-gradient(90deg, #ede3d4 0%, #f7efe4 100%)',
              boxShadow: 'inset -2px 0 6px rgba(0,0,0,0.03)',
            }}
          />

          {/* Envelope Side Fold (Right) */}
          <div
            className="absolute inset-0 z-14 pointer-events-none"
            style={{
              clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)',
              background: 'linear-gradient(-90deg, #ede3d4 0%, #f7efe4 100%)',
              boxShadow: 'inset 2px 0 6px rgba(0,0,0,0.03)',
            }}
          />

          {/* Envelope Bottom Flap (Folds upward to center, perfectly overlapping sides) */}
          <div
            className="absolute inset-0 z-16 pointer-events-none"
            style={{
              clipPath: 'polygon(0 100%, 50% 46%, 100% 100%)',
              background: 'linear-gradient(0deg, #e7dcce 0%, #f5ece0 100%)',
              filter: 'drop-shadow(0 -3px 4px rgba(0,0,0,0.06))',
            }}
          />

          {/* Envelope Top Flap (Triangular 3D Fold that closes all the way down) */}
          <motion.div
            initial={false}
            animate={{
              rotateX: isOpening ? -180 : 0,
              zIndex: isOpening ? 5 : 20,
            }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            style={{
              transformOrigin: 'top center',
              perspective: 1200,
            }}
            className="absolute inset-0 pointer-events-none"
          >
            <div
              className="w-full h-full"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 55%)',
                background: 'linear-gradient(180deg, #f7efe4 0%, #e5d8c6 100%)',
                filter: isOpening ? 'none' : 'drop-shadow(0 4px 6px rgba(0,0,0,0.12))',
              }}
            />
          </motion.div>

          {/* Wax Seal Stamp (Centerpiece) */}
          <AnimatePresence>
            {!isOpening && (
              <motion.button
                id="wax-seal-button"
                type="button"
                onClick={handleSealClick}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                exit={{ scale: 1.3, opacity: 0, rotate: 15 }}
                transition={{ duration: 0.4 }}
                aria-label="Урилга нээх"
                className="absolute top-[49%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer focus:outline-none"
              >
                {/* Golden Wax Seal with realistic layered shadow and metallic relief */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-[0_12px_24px_rgba(110,65,15,0.45),inset_0_2px_4px_rgba(255,255,255,0.45)] bg-gradient-to-br from-[#e8c872] via-[#c99a38] to-[#996c1b] p-1.5 transition-transform duration-300">
                  {/* Outer organic wax wavy rim */}
                  <div className="absolute inset-0 rounded-full border-2 border-amber-200/50 shadow-inner" />
                  
                  {/* Subtle pulsing golden glow ring */}
                  <div className="absolute -inset-2 rounded-full border border-amber-300/40 animate-ping opacity-75 pointer-events-none" style={{ animationDuration: '2.5s' }} />

                  {/* Inner stamped medallion */}
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#c99a38] via-[#ab7e26] to-[#805510] flex flex-col items-center justify-center text-amber-100 border border-amber-400/40 shadow-inner">
                    {/* Laurel / floral circular accent */}
                    <div className="absolute inset-2 rounded-full border border-dashed border-amber-200/35 pointer-events-none" />

                    {/* Monogram for School 62 Jubilee */}
                    <span className="font-serif-title font-bold text-lg sm:text-xl text-amber-50 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)] tracking-wider">
                      62
                    </span>
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-amber-200/90 font-medium">
                      50 ЖИЛ
                    </span>
                  </div>
                </div>

                {/* Subtle pulse label underneath */}
                <motion.div
                  animate={{ y: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8 }}
                  className="mt-3 text-center"
                >
                  <span className="text-[11px] font-medium text-amber-900/80 bg-white/70 backdrop-blur-xs px-2.5 py-0.5 rounded-full shadow-xs">
                    Дарж нээнэ үү
                  </span>
                </motion.div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Subtle preview at the bottom */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-xs text-neutral-400 tracking-wider text-center"
        >
          Нийслэлийн 62 дугаар сургууль · {WEDDING_DATA.formattedDate}
        </motion.p>
      </motion.div>
    </div>
  );
}
