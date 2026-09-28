import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export default function ScheduleSection() {
  return (
    <section id="schedule-section" className="relative w-full bg-gradient-to-b from-[#FFF5EC] via-[#FFF9F2] to-[#FAF6F0] text-slate-800 py-16 sm:py-20 px-4 sm:px-8 overflow-hidden">
      {/* Dynamic Background Lights in Soft Gold and Ivory */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 left-1/4 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-80 h-80 bg-rose-200/25 rounded-full blur-3xl" />
      </div>

      {/* Decorative top wave */}
      <div className="absolute -top-1 inset-x-0 overflow-hidden leading-none text-[#FFF5EC]">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-6 sm:h-8 fill-current rotate-180"
        >
          <path d="M0,0 C300,90 600,-40 900,60 C1050,110 1150,40 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>

      <div className="max-w-md mx-auto relative z-10">
        {/* Title: Calligraphy "Хөтөлбөр" */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-1.5 text-amber-800 text-xs uppercase tracking-widest mb-1 font-mono font-bold bg-white/80 px-3.5 py-1 rounded-full border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>50 жилийн ойн ёслол</span>
          </div>
          <h2 className="font-calligraphy text-4xl sm:text-5xl text-amber-950 font-normal">
            Хөтөлбөр
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2" />
        </motion.div>

        {/* 3D Glass Timeline Schedule Cards - Luminous White with Golden Accents */}
        <div className="space-y-3.5" style={{ perspective: 1000 }}>
          {WEDDING_DATA.schedule.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.5 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className="flex items-center gap-3.5 py-3.5 px-4 rounded-2xl bg-white/90 hover:bg-white transition-all border-2 border-amber-200/80 shadow-[0_6px_20px_rgba(180,120,60,0.1)] backdrop-blur-md"
            >
              {/* Time Badge with Soft Golden Pill */}
              <div className="w-20 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 text-center font-mono text-xs sm:text-sm text-amber-950 font-extrabold shadow-sm">
                {item.time}
              </div>

              {/* Diamond Sparkle Icon */}
              <div className="text-amber-500 text-sm select-none font-serif">
                ✦
              </div>

              {/* Title & Subtitle */}
              <div className="flex-1">
                <h3 className="text-sm sm:text-base font-semibold text-slate-800">
                  {item.title}
                </h3>
                {item.subtitle && item.subtitle !== item.title && (
                  <p className="text-xs text-slate-500 font-light">
                    {item.subtitle}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
