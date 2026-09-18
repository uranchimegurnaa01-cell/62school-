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

    // 1. Burst of golden magical particles & stars from the wand tip
    const scalar = 1.6;
    const goldShapes = confetti.shapeFromText({ text: '✦', scalar });
    const starShapes = confetti.shapeFromText({ text: '★', scalar });

    confetti({
      particleCount: 40,
      spread: 80,
      origin: { y: 0.52, x: 0.5 },
      colors: ['#FFE082', '#FFD54F', '#FFC107', '#FFA000', '#FFF8E1'],
      shapes: [goldShapes, starShapes],
      scalar: 1.3,
      ticks: 200,
      gravity: 0.7,
    });

    // 2. Secondary wider celebratory burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 120,
        origin: { y: 0.48, x: 0.5 },
        colors: ['#F59E0B', '#38BDF8', '#E0F2FE', '#FBBF24', '#FFFFFF'],
        startVelocity: 35,
      });
    }, 250);

    // 3. Complete opening transition
    setTimeout(() => {
      onOpen();
    }, 1600);
  };

  return (
    <div
      id="envelope-screen"
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#060c18] via-[#0b172a] to-[#040810] p-4 overflow-hidden select-none"
    >
      {/* Dynamic magical ambient cosmic starlight background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep blue and golden aurora light glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-sky-600/25 rounded-full blur-[110px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/5 right-1/4 w-[360px] h-[360px] bg-amber-400/20 rounded-full blur-[100px]" />
        
        {/* Twinkling ambient sparkles in the air */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.2, scale: 0.6 }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.6, 1.2, 0.6],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
            style={{
              top: `${15 + ((i * 23) % 70)}%`,
              left: `${10 + ((i * 37) % 80)}%`,
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-amber-200/80 blur-[0.5px] shadow-[0_0_8px_rgba(251,191,36,0.8)]"
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center justify-center"
      >
        {/* Helper instruction tag at the top with magic wand motif */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-5 flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-amber-300/30 text-amber-200 text-xs sm:text-sm font-medium tracking-wide shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '7s' }} />
          <span>Шидэт дохиурыг товшиж урилгыг нээнэ үү</span>
        </motion.div>

        {/* Envelope Container */}
        <div className="relative w-full aspect-[3/4.1] bg-[#0c192d] rounded-2xl shadow-[0_28px_70px_-10px_rgba(0,0,0,0.95)] border-2 border-amber-400/30 overflow-hidden flex flex-col">
          {/* Inner royal border pattern */}
          <div className="absolute inset-3 border border-amber-300/20 rounded-xl pointer-events-none" />
          <div className="absolute inset-5 border border-dashed border-amber-300/15 rounded-lg pointer-events-none" />

          {/* Envelope Deep Blue Satin Base */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e1d35] via-[#091526] to-[#050b14] z-0" />

          {/* Inner Card (slides up smoothly when wand is cast) */}
          <motion.div
            initial={false}
            animate={{
              y: isOpening ? -145 : 0,
              scale: isOpening ? 1.03 : 1,
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-4 top-10 bottom-6 bg-gradient-to-b from-white via-amber-50/60 to-white rounded-xl shadow-2xl border border-amber-300/40 p-5 flex flex-col items-center justify-center text-center z-10 overflow-hidden"
          >
            {/* Subtle inner watermark motif */}
            <div className="w-10 h-0.5 bg-amber-500/40 mb-3" />

            <div className="relative w-16 h-16 rounded-full p-1 border border-amber-400/50 shadow-md bg-amber-50 mb-2 overflow-hidden">
              <img
                src={anniversaryEmblemImg}
                alt="62-р сургууль 50 жил"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <span className="text-[10px] uppercase tracking-[0.25em] text-amber-900/70 font-semibold mb-1">
              Түүхт 50 жилийн ой
            </span>
            <h1 className="font-serif-title text-xl sm:text-2xl text-slate-900 font-bold mb-1">
              62 дугаар сургууль
            </h1>
            <p className="font-serif-title text-xs sm:text-sm text-amber-700 font-medium mb-2">
              {WEDDING_DATA.formattedDate} · {WEDDING_DATA.formattedTime}
            </p>
            <div className="text-[11px] text-slate-600 font-light leading-relaxed max-w-[210px]">
              Эрдмийн өргөөний хагас зуун жилийн баярын хүндэтгэлийн хуудас
            </div>
            <div className="w-10 h-0.5 bg-amber-500/40 mt-3" />
          </motion.div>

          {/* Envelope Side Fold (Left) */}
          <div
            className="absolute inset-0 z-14 pointer-events-none"
            style={{
              clipPath: 'polygon(0 0, 50% 50%, 0 100%)',
              background: 'linear-gradient(90deg, #0b172a 0%, #102444 100%)',
              boxShadow: 'inset -2px 0 10px rgba(0,0,0,0.5)',
            }}
          />

          {/* Envelope Side Fold (Right) */}
          <div
            className="absolute inset-0 z-14 pointer-events-none"
            style={{
              clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)',
              background: 'linear-gradient(-90deg, #0b172a 0%, #102444 100%)',
              boxShadow: 'inset 2px 0 10px rgba(0,0,0,0.5)',
            }}
          />

          {/* Envelope Bottom Flap (Folds upward to center) */}
          <div
            className="absolute inset-0 z-16 pointer-events-none"
            style={{
              clipPath: 'polygon(0 100%, 50% 46%, 100% 100%)',
              background: 'linear-gradient(0deg, #081222 0%, #142d54 100%)',
              filter: 'drop-shadow(0 -4px 6px rgba(0,0,0,0.4))',
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
                background: 'linear-gradient(180deg, #132749 0%, #0c1a30 100%)',
                filter: isOpening ? 'none' : 'drop-shadow(0 6px 12px rgba(0,0,0,0.6))',
                borderTop: '2px solid rgba(251, 191, 36, 0.4)',
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
                {/* Floating Wand with Magic Starlight Sparks that points into the seal */}
                <motion.div
                  animate={{
                    y: [0, -6, 0],
                    rotate: [-12, -4, -12],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.2,
                    ease: 'easeInOut',
                  }}
                  className="relative -top-2 left-6 z-40"
                >
                  <div className="relative group p-2.5 rounded-full bg-gradient-to-tr from-amber-600 via-amber-300 to-yellow-100 shadow-[0_0_24px_rgba(251,191,36,0.9)] border-2 border-white">
                    {/* Glowing magic particle aura around the wand */}
                    <div className="absolute -inset-2 rounded-full bg-amber-400/40 blur-md animate-ping" style={{ animationDuration: '2s' }} />
                    <Wand2 className="w-6 h-6 text-slate-900 filter drop-shadow-sm" />
                  </div>
                </motion.div>

                {/* Golden Medallion Seal */}
                <motion.button
                  id="magic-wand-open-button"
                  type="button"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  exit={{ scale: 1.4, opacity: 0, rotate: 20 }}
                  transition={{ duration: 0.4 }}
                  aria-label="Шидэт дохиураар урилга нээх"
                  className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-[0_16px_36px_rgba(0,0,0,0.8),inset_0_2px_6px_rgba(255,255,255,0.7)] bg-gradient-to-br from-[#fef08a] via-[#f59e0b] to-[#78350f] p-1.5 focus:outline-none -mt-4"
                >
                  {/* Concentric glowing energy aura */}
                  <div className="absolute -inset-3 rounded-full border border-amber-300/50 animate-ping opacity-60 pointer-events-none" style={{ animationDuration: '2.4s' }} />
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 opacity-80 blur-xs" />

                  {/* Inner stamped medallion with Mongolian 62-р сургууль 50 жил emblem */}
                  <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#d97706] via-[#b45309] to-[#78350f] flex flex-col items-center justify-center text-amber-100 border border-amber-200/60 shadow-inner">
                    <div className="absolute inset-1.5 rounded-full border border-dashed border-amber-200/40 pointer-events-none" />

                    <span className="font-serif-title font-black text-xl sm:text-2xl text-amber-50 drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] tracking-wider">
                      62
                    </span>
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-amber-200 font-bold drop-shadow-xs">
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
                  <span className="text-[11px] font-semibold text-amber-100 bg-slate-900/90 border border-amber-300/40 backdrop-blur-md px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-yellow-300" />
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
                animate={{ opacity: [0, 0.9, 0], scale: [0.2, 2.5, 3.5] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-72 h-72 rounded-full bg-radial from-white via-amber-200/80 to-transparent pointer-events-none blur-md"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Footer school name indicator */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-xs text-amber-200/80 tracking-wider text-center flex items-center justify-center gap-2"
        >
          <span className="h-px w-6 bg-amber-400/40" />
          Нийслэлийн 62 дугаар сургууль · 1976 - 2026
          <span className="h-px w-6 bg-amber-400/40" />
        </motion.p>
      </motion.div>
    </div>
  );
}
