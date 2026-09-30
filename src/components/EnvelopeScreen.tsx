import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wand2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WEDDING_DATA } from '../data/weddingData';
import anniversaryEmblemImg from '../assets/images/school_62_50th_emblem_1789647932430.jpg';

interface EnvelopeScreenProps {
  onOpen: () => void;
}

export default function EnvelopeScreen({ onOpen }: EnvelopeScreenProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [wandTapped, setWandTapped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fireMagicSpell = () => {
    if (isOpening) return;
    setWandTapped(true);
    setIsOpening(true);

    // Burst of luminous pearl, gold and rose sparkles
    const scalar = 1.6;
    const goldShapes = confetti.shapeFromText({ text: '✦', scalar });
    const starShapes = confetti.shapeFromText({ text: '★', scalar });

    confetti({
      particleCount: 50,
      spread: 85,
      origin: { y: 0.52, x: 0.5 },
      colors: ['#F59E0B', '#FCD34D', '#FB7185', '#F43F5E', '#FFFFFF'],
      shapes: [goldShapes, starShapes],
      scalar: 1.3,
      ticks: 200,
      gravity: 0.7,
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 130,
        origin: { y: 0.48, x: 0.5 },
        colors: ['#FBBF24', '#F472B6', '#E11D48', '#FEF3C7', '#FFFFFF'],
        startVelocity: 38,
      });
    }, 250);

    setTimeout(() => {
      onOpen();
    }, 1600);
  };

  return (
    <div
      id="envelope-screen"
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#FFFDF7] via-[#FFF5E6] to-[#FFEBEB] p-4 overflow-hidden select-none"
    >
      {/* Luminous glowing ambient lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-amber-200/30 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/5 right-1/4 w-[400px] h-[400px] bg-rose-200/35 rounded-full blur-[90px]" />
        
        {/* Twinkling ambient sparkles */}
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.3, scale: 0.7 }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.7, 1.4, 0.7],
              y: [0, -25, 0],
            }}
            transition={{
              duration: 2.5 + (i % 3),
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
            style={{
              top: `${12 + ((i * 21) % 75)}%`,
              left: `${8 + ((i * 37) % 84)}%`,
            }}
            className="absolute w-2 h-2 rounded-full bg-amber-300 blur-[0.5px] shadow-[0_0_8px_rgba(245,158,11,0.6)]"
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center justify-center"
      >
        {/* Instruction Tag - Light, luminous and clear */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-5 flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border-2 border-amber-300 text-amber-900 text-xs sm:text-sm font-semibold tracking-wide shadow-[0_6px_20px_rgba(245,158,11,0.2)]"
        >
          <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Шидэт дохиурыг товшиж урилгыг нээнэ үү</span>
        </motion.div>

        {/* Envelope Container: Luminous Pearl Ivory with Golden Ribbon Accents */}
        <div className="relative w-full aspect-[3/4.1] bg-[#FFFBF5] rounded-2xl shadow-[0_25px_60px_-10px_rgba(180,120,60,0.25),0_10px_25px_rgba(0,0,0,0.08)] border-3 border-amber-300 overflow-hidden flex flex-col">
          {/* Inner royal gold border pattern */}
          <div className="absolute inset-3 border-2 border-amber-300/60 rounded-xl pointer-events-none" />
          <div className="absolute inset-5 border border-dashed border-amber-300/40 rounded-lg pointer-events-none" />

          {/* Envelope Luminous Silk Pearl Base */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] via-[#FFF9F0] to-[#FFF0E6] z-0" />

          {/* Inner Card (slides up smoothly) */}
          <motion.div
            initial={false}
            animate={{
              y: isOpening ? -145 : 0,
              scale: isOpening ? 1.03 : 1,
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-4 top-10 bottom-6 bg-gradient-to-b from-white via-amber-50/50 to-white rounded-xl shadow-xl border-2 border-amber-300 p-5 flex flex-col items-center justify-center text-center z-10 overflow-hidden"
          >
            <div className="w-12 h-1 bg-amber-500 rounded-full mb-3" />

            <div className="relative w-16 h-16 rounded-full p-1 border-2 border-amber-400 shadow-md bg-white mb-2 overflow-hidden">
              <img
                src={anniversaryEmblemImg}
                alt="62-р сургууль 50 жил"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <span className="text-[11px] uppercase tracking-[0.25em] text-amber-700 font-extrabold mb-1">
              Түүхт 50 жилийн ой
            </span>
            <h1 className="font-serif-title text-xl sm:text-2xl text-slate-900 font-extrabold mb-1">
              62 дугаар сургууль
            </h1>
            {WEDDING_DATA.formattedDate ? (
              <p className="font-serif-title text-xs sm:text-sm text-amber-800 font-bold mb-2">
                {WEDDING_DATA.formattedDate} · {WEDDING_DATA.formattedTime}
              </p>
            ) : WEDDING_DATA.formattedTime ? (
              <p className="font-serif-title text-xs sm:text-sm text-amber-800 font-bold mb-2">
                {WEDDING_DATA.formattedTime} цагт
              </p>
            ) : null}
            <div className="text-[11px] text-slate-600 font-medium leading-relaxed max-w-[210px]">
              Эрдмийн өргөөний хагас зуун жилийн баярын хүндэтгэлийн хуудас
            </div>
            <div className="w-12 h-1 bg-amber-500 rounded-full mt-3" />
          </motion.div>

          {/* Envelope Side Fold (Left) - Luminous Soft Champagne */}
          <div
            className="absolute inset-0 z-14 pointer-events-none"
            style={{
              clipPath: 'polygon(0 0, 50% 50%, 0 100%)',
              background: 'linear-gradient(90deg, #FDF7ED 0%, #FFFFFF 100%)',
              boxShadow: 'inset -2px 0 10px rgba(217,119,6,0.1)',
            }}
          />

          {/* Envelope Side Fold (Right) - Luminous Soft Champagne */}
          <div
            className="absolute inset-0 z-14 pointer-events-none"
            style={{
              clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)',
              background: 'linear-gradient(-90deg, #FDF7ED 0%, #FFFFFF 100%)',
              boxShadow: 'inset 2px 0 10px rgba(217,119,6,0.1)',
            }}
          />

          {/* Envelope Bottom Flap (Folds upward) - Luminous Ivory Pearl */}
          <div
            className="absolute inset-0 z-16 pointer-events-none"
            style={{
              clipPath: 'polygon(0 100%, 50% 46%, 100% 100%)',
              background: 'linear-gradient(0deg, #FCE7D6 0%, #FFFFFF 100%)',
              filter: 'drop-shadow(0 -3px 6px rgba(180,100,50,0.12))',
            }}
          />

          {/* Envelope Top Flap (Opens backward with 3D perspective) */}
          <motion.div
            initial={false}
            animate={{
              rotateX: isOpening ? -180 : 0,
              zIndex: isOpening ? 5 : 20,
            }}
            transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1] }}
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
                background: 'linear-gradient(180deg, #FFF6E8 0%, #FFFDF9 100%)',
                filter: isOpening ? 'none' : 'drop-shadow(0 6px 12px rgba(180,120,60,0.15))',
                borderTop: '3px solid #f59e0b',
              }}
            />
          </motion.div>

          {/* Centerpiece: Golden Seal with Interactive Magic Wand Button */}
          <AnimatePresence>
            {!isOpening && (
              <motion.div
                className="absolute top-[49%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center cursor-pointer"
                onClick={fireMagicSpell}
              >
                {/* Floating Wand with Luminous Gold Aura */}
                <motion.div
                  animate={{
                    y: [0, -7, 0],
                    rotate: [-14, -2, -14],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.0,
                    ease: 'easeInOut',
                  }}
                  className="relative -top-2 left-6 z-40"
                >
                  <div className="relative group p-2.5 rounded-full bg-gradient-to-tr from-amber-400 via-amber-200 to-white shadow-[0_0_24px_rgba(245,158,11,0.6)] border-2 border-white">
                    <div className="absolute -inset-2 rounded-full bg-amber-300/40 blur-md animate-ping" style={{ animationDuration: '2s' }} />
                    <Wand2 className="w-6 h-6 text-amber-900 filter drop-shadow-sm" />
                  </div>
                </motion.div>

                {/* Golden Medallion Seal */}
                <motion.button
                  id="magic-wand-open-button"
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.94 }}
                  exit={{ scale: 1.4, opacity: 0, rotate: 20 }}
                  transition={{ duration: 0.4 }}
                  aria-label="Шидэт дохиураар урилга нээх"
                  className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-[0_12px_30px_rgba(217,119,6,0.3),inset_0_2px_6px_rgba(255,255,255,0.9)] bg-gradient-to-br from-[#FFFBEB] via-[#FDE68A] to-[#D97706] p-1.5 focus:outline-none -mt-4"
                >
                  <div className="absolute -inset-2.5 rounded-full border-2 border-amber-400/60 animate-ping opacity-60 pointer-events-none" style={{ animationDuration: '2.2s' }} />
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-200 via-yellow-100 to-rose-200 opacity-80 blur-xs" />

                  {/* Inner stamped medallion in luminous pearl gold */}
                  <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#FFFDF7] via-[#FEF3C7] to-[#FDE68A] flex flex-col items-center justify-center text-amber-900 border-2 border-amber-400 shadow-inner">
                    <div className="absolute inset-1.5 rounded-full border border-dashed border-amber-500/50 pointer-events-none" />

                    <span className="font-serif-title font-black text-2xl text-amber-900 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] tracking-wider">
                      62
                    </span>
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-amber-800 font-extrabold drop-shadow-xs">
                      50 ЖИЛ
                    </span>
                  </div>
                </motion.button>

                {/* Call to action label */}
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8 }}
                  className="mt-2 text-center"
                >
                  <span className="text-xs font-bold text-amber-950 bg-white/95 border border-amber-300 px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    Дохиураар товш
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Flash of magic light when wand is tapped */}
          <AnimatePresence>
            {wandTapped && (
              <motion.div
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: [0, 0.95, 0], scale: [0.2, 2.5, 3.5] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-72 h-72 rounded-full bg-radial from-white via-amber-100 to-transparent pointer-events-none blur-md"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Footer school name indicator */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-xs text-amber-900/80 font-medium tracking-wider text-center flex items-center justify-center gap-2 drop-shadow-sm"
        >
          <span className="h-0.5 w-6 bg-amber-400" />
          Нийслэлийн 62 дугаар сургууль · 1976 - 2026
          <span className="h-0.5 w-6 bg-amber-400" />
        </motion.p>
      </motion.div>
    </div>
  );
}
