import { useState, PointerEvent } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { WEDDING_DATA } from '../data/weddingData';
import smoothGalaBg from '../assets/images/smooth_gala_bg_1789650457106.jpg';
import anniversaryEmblemImg from '../assets/images/school_62_50th_emblem_1789647932430.jpg';

export default function CoverSection() {
  const scrollToNext = () => {
    const nextElem = document.getElementById('poem-section');
    if (nextElem) {
      nextElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Interactive 3D Card Tilt on pointer movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-120, 120], [10, -10]);
  const rotateY = useTransform(mouseX, [-120, 120], [-10, 10]);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="cover-section" className="relative w-full min-h-[95vh] sm:min-h-screen flex flex-col justify-between overflow-hidden bg-[#FAF6F0] text-slate-800">
      {/* Background Gala Jubilee Ambience with luminous gentle overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={smoothGalaBg}
          alt="50 жилийн ойн баярын хүндэтгэлийн фон"
          className="w-full h-full object-cover object-center filter brightness-[1.1] contrast-[0.95] opacity-35"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF7]/90 via-[#FFF9F2]/75 to-[#FFF5EC]/95 pointer-events-none" />
      </div>

      {/* Radiant Floating ambient lights in warm ivory & soft champagne gold */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-1">
        <div className="absolute top-16 left-8 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-24 right-8 w-88 h-88 bg-rose-200/30 rounded-full blur-3xl" />
      </div>

      {/* Top Header / Date Area */}
      <div className="relative z-10 pt-10 sm:pt-14 px-6 text-center max-w-xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center justify-center gap-3 mb-2 px-5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-amber-300 shadow-[0_4px_16px_rgba(217,119,6,0.12)]"
        >
          <span className="h-0.5 w-6 sm:w-10 bg-amber-400" />
          <span className="font-serif-title tracking-[0.35em] uppercase text-xs sm:text-sm text-amber-900 font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            ХҮНДЭТГЭЛИЙН УРИЛГА
          </span>
          <span className="h-0.5 w-6 sm:w-10 bg-amber-400" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xs sm:text-sm tracking-[0.25em] text-amber-800 font-mono font-semibold"
        >
          {WEDDING_DATA.formattedDate}
        </motion.p>
      </div>

      {/* 3D Glassmorphism Jubilee Medallion Stage */}
      <div className="relative z-10 my-auto py-3 px-4 text-center flex flex-col items-center" style={{ perspective: 1000 }}>
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative group cursor-grab active:cursor-grabbing p-5 sm:p-7 rounded-3xl bg-white/85 backdrop-blur-md border-2 border-amber-300/80 shadow-[0_20px_50px_rgba(180,120,60,0.18),inset_0_2px_4px_rgba(255,255,255,0.9)] max-w-[320px] sm:max-w-sm flex flex-col items-center"
        >
          {/* Layered gentle glow */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-amber-300/20 via-rose-200/25 to-yellow-200/20 blur-xl pointer-events-none" />

          {/* Golden Jubilee Emblem with Luminous 3D Depth */}
          <div className="relative w-46 h-46 sm:w-54 sm:h-54 md:w-58 md:h-58 rounded-full p-2 bg-gradient-to-tr from-amber-400 via-amber-200 to-yellow-100 shadow-[0_12px_28px_rgba(180,120,60,0.25)] mb-4 flex items-center justify-center">
            {/* Concentric rotating glow aura */}
            <div className="absolute -inset-2.5 rounded-full border-2 border-amber-400/50 animate-ping opacity-50 pointer-events-none" style={{ animationDuration: '3.5s' }} />

            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white bg-white shadow-inner">
              <img
                src="https://lh3.googleusercontent.com/d/19zE8QDzQdOdozCZu7w6phgy9BP81IKyS"
                onError={(e) => {
                  e.currentTarget.src = anniversaryEmblemImg;
                }}
                alt="62-р сургууль 50 жилийн ой"
                className="w-full h-full object-cover object-center scale-[1.02] group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Titles & Details sitting on 3D Card */}
          <div className="space-y-1.5 text-center">
            <div className="text-amber-700 text-[11px] sm:text-xs tracking-[0.28em] uppercase font-bold">
              Сонгинохайрхан дүүрэг
            </div>
            <h1 className="font-serif-title text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-wide">
              62 ДУГААР СУРГУУЛЬ
            </h1>
            <p className="font-serif-title text-sm sm:text-base text-amber-800 font-semibold">
              Түүхт 50 жилийн ойн баяр (1976 - 2026)
            </p>
          </div>

          {/* Interactive 3D hint badge */}
          <span className="mt-3 text-[11px] text-amber-800 font-medium tracking-wider flex items-center gap-1 bg-amber-50 px-3.5 py-0.5 rounded-full border border-amber-200">
            ✦ гар утсаа хөдөлгөж үзнэ үү ✦
          </span>
        </motion.div>
      </div>

      {/* Scroll Down Prompt */}
      <div className="relative z-10 pb-8 sm:pb-10 text-center">
        <motion.button
          type="button"
          onClick={scrollToNext}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="inline-flex flex-col items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer group"
          aria-label="Доош гүйлгэх"
        >
          <span className="text-xs sm:text-sm font-medium tracking-wider">
            Урилгыг доош гүйлгэж үзнэ үү
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-6 h-6 text-amber-600 group-hover:text-amber-700 transition-colors" />
          </motion.div>
        </motion.button>
      </div>

      {/* Decorative Scalloped Border Wave connecting to Poem Section */}
      <div className="relative z-20 w-full overflow-hidden leading-none text-[#FFF5EC]">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-8 sm:h-12 fill-current"
        >
          <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
