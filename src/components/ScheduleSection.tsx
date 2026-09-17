import { motion } from 'motion/react';
import { WEDDING_DATA } from '../data/weddingData';

export default function ScheduleSection() {
  return (
    <section id="schedule-section" className="relative w-full bg-[#1b3a5c] text-white py-16 sm:py-20 px-4 sm:px-8">
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

      <div className="max-w-md mx-auto">
        {/* Title matching video frame 00:17: Calligraphy "Хөтөлбөр" */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-calligraphy text-4xl sm:text-5xl text-amber-100 font-normal">
            Хөтөлбөр
          </h2>
          <div className="w-16 h-px bg-amber-300/40 mx-auto mt-2" />
        </motion.div>

        {/* Schedule List matching video */}
        <div className="space-y-4">
          {WEDDING_DATA.schedule.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="flex items-center gap-3.5 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
            >
              {/* Time Badge */}
              <div className="w-16 text-right font-mono text-sm sm:text-base text-amber-200 font-medium">
                {item.time}
              </div>

              {/* Diamond Sparkle Icon */}
              <div className="text-amber-300 text-xs select-none">
                ✦
              </div>

              {/* Title & Subtitle */}
              <div className="flex-1">
                <h3 className="text-sm sm:text-base font-normal text-white">
                  {item.title}
                </h3>
                {item.subtitle && item.subtitle !== item.title && (
                  <p className="text-xs text-amber-100/70 font-light">
                    {item.subtitle}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute -bottom-1 inset-x-0 overflow-hidden leading-none text-[#faf6f0]">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-6 sm:h-8 fill-current"
        >
          <path d="M0,0 C200,80 500,-30 800,70 C1000,120 1120,40 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
