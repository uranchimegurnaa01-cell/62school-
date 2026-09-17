import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
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

  return (
    <section id="cover-section" className="relative w-full min-h-[95vh] sm:min-h-screen flex flex-col justify-between overflow-hidden bg-slate-900 text-white">
      {/* Background Gala Jubilee Ambience with clean seamless gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src={smoothGalaBg}
          alt="50 жилийн ойн баярын хүндэтгэлийн фон"
          className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-[#1b3a5c]/90 pointer-events-none" />
      </div>

      {/* Top Header / Date & Poetic Motto Area */}
      <div className="relative z-10 pt-10 sm:pt-14 px-6 text-center max-w-xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 mb-2"
        >
          <span className="h-px w-8 bg-amber-200/70" />
          <span className="font-serif-title tracking-[0.35em] uppercase text-xs sm:text-sm text-amber-200 font-light">
            ХҮНДЭТГЭЛИЙН УРИЛГА
          </span>
          <span className="h-px w-8 bg-amber-200/70" />
        </motion.div>

        {/* Poetic line with elegant ornamental dividers */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="my-2.5 flex items-center justify-center gap-3 w-full max-w-md"
        >
          <div className="flex items-center gap-1 flex-1 justify-end">
            <span className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-amber-300/60" />
            <span className="w-1.5 h-1.5 rotate-45 border border-amber-300/70 bg-amber-200/40" />
          </div>
          
          <p className="font-serif-title italic text-amber-100/95 text-xs sm:text-sm md:text-[15px] tracking-wide px-1 drop-shadow-sm whitespace-nowrap">
            "Мэдлэгийн их далайд хөлөг онгоц шиг аялж..."
          </p>

          <div className="flex items-center gap-1 flex-1 justify-start">
            <span className="w-1.5 h-1.5 rotate-45 border border-amber-300/70 bg-amber-200/40" />
            <span className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-amber-300/60" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xs sm:text-sm tracking-[0.25em] text-white/90 font-mono"
        >
          {WEDDING_DATA.formattedDate}
        </motion.p>
      </div>

      {/* Official 50th Anniversary Logo Centerpiece perfectly framed */}
      <div className="relative z-10 my-auto py-4 px-4 text-center flex flex-col items-center">
        {/* Emblem Medallion with perfect glowing concentric rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-5 group flex items-center justify-center"
        >
          {/* Outer radial ambient glow */}
          <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-amber-400/25 via-amber-200/20 to-orange-400/20 blur-xl animate-pulse pointer-events-none" />
          
          {/* Concentric gold decorative ring */}
          <div className="absolute -inset-3 rounded-full border border-amber-300/40 shadow-[0_0_20px_rgba(245,158,11,0.3)] pointer-events-none" />
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-300 to-amber-500 p-[2px] shadow-2xl">
            <div className="w-full h-full rounded-full bg-slate-950/40" />
          </div>

          {/* Medallion Circle Logo */}
          <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-amber-300/90 shadow-[0_16px_36px_rgba(0,0,0,0.6)] bg-gradient-to-b from-slate-900 to-amber-950/40 flex items-center justify-center">
            <img
              src="https://lh3.googleusercontent.com/d/19zE8QDzQdOdozCZu7w6phgy9BP81IKyS"
              onError={(e) => {
                // Fallback to local high-res emblem if Google Drive access is restricted
                e.currentTarget.src = anniversaryEmblemImg;
              }}
              alt="62-р сургууль 50 жилийн ой (1976-2026)"
              className="w-full h-full object-cover object-center scale-[1.02] transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </motion.div>

        {/* Title & Subtitles */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="space-y-1.5"
        >
          <div className="text-amber-200/90 text-xs sm:text-sm tracking-[0.25em] uppercase font-light">
            Сонгинохайрхан дүүрэг
          </div>
          <h1 className="font-serif-title text-2xl sm:text-3xl md:text-4xl font-normal text-white drop-shadow-[0_4px_16px_rgba(15,23,42,0.9)] tracking-wide">
            62 ДУГААР СУРГУУЛЬ
          </h1>
          <p className="font-serif-title text-base sm:text-lg text-amber-100 font-light drop-shadow-sm">
            Түүхт 50 жилийн ойн баяр (1976 - 2026)
          </p>
        </motion.div>
      </div>

      {/* Scroll Down Prompt */}
      <div className="relative z-10 pb-8 sm:pb-12 text-center">
        <motion.button
          type="button"
          onClick={scrollToNext}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="inline-flex flex-col items-center gap-1.5 text-white/90 hover:text-white transition-colors cursor-pointer group"
          aria-label="Доош гүйлгэх"
        >
          <span className="text-xs sm:text-sm font-light tracking-wider drop-shadow-sm">
            Урилгыг доош гүйлгэж үзнэ үү
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5 text-amber-200 group-hover:text-amber-100 transition-colors" />
          </motion.div>
        </motion.button>
      </div>

      {/* Decorative Scalloped Border Wave connecting to Poem Section */}
      <div className="relative z-20 w-full overflow-hidden leading-none text-[#1b3a5c]">
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


