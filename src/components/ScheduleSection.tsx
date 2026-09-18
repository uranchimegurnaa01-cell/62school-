import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export default function ScheduleSection() {
  return (
    <section id="schedule-section" className="relative w-full bg-[#132744] text-white py-16 sm:py-20 px-4 sm:px-8 overflow-hidden">
      {/* 3D Cosmic Background Lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 left-1/4 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl" />
      </div>

      {/* Decorative top wave */}
      <div className="absolute -top-1 inset-x-0 overflow-hidden leading-none text-[#faf6f0]">
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
          <div className="inline-flex items-center gap-1 text-amber-300 text-xs uppercase tracking-widest mb-1 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>50 жилийн ойн ёслол</span>
          </div>
          <h2 className="font-calligraphy text-4xl sm:text-5xl text-amber-100 font-normal drop-shadow-sm">
            Хөтөлбөр
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto mt-2" />
        </motion.div>

        {/* 3D Glass Timeline Schedule Cards */}
        <div className="space-y-3.5" style={{ perspective: 1000 }}>
          {WEDDING_DATA.schedule.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.5 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className="flex items-center gap-3.5 py-3 px-4 rounded-2xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 hover:from-white/15 hover:to-white/15 transition-all border border-amber-300/20 shadow-[0_8px_20px_rgba(0,0,0,0.3)] backdrop-blur-md"
            >
              {/* Time Badge with Golden Pill */}
              <div className="w-20 py-1 rounded-lg bg-amber-400/20 border border-amber-300/40 text-center font-mono text-xs sm:text-sm text-amber-200 font-semibold shadow-xs">
                {item.time}
              </div>

              {/* Diamond Sparkle Icon */}
              <div className="text-amber-300 text-sm select-none drop-shadow-sm">
                ✦
              </div>

              {/* Title & Subtitle */}
              <div className="flex-1">
                <h3 className="text-sm sm:text-base font-medium text-white drop-shadow-xs">
                  {item.title}
                </h3>
                {item.subtitle && item.subtitle !== item.title && (
                  <p className="text-xs text-amber-100/75 font-light">
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
