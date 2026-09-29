import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export default function PoemSection() {
  return (
    <section id="poem-section" className="relative w-full bg-[#FFF5EC] text-slate-800 py-16 sm:py-24 px-5 sm:px-8 overflow-hidden">
      {/* Dynamic Luminous Ambient Lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-12 left-1/3 w-88 h-88 bg-amber-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute -bottom-16 right-1/4 w-80 h-80 bg-rose-200/35 rounded-full blur-3xl" />
      </div>

      <div className="max-w-md mx-auto relative z-10 text-center" style={{ perspective: 1000 }}>
        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 text-amber-800 text-xs tracking-widest uppercase mb-3 font-mono font-bold bg-white/80 px-3.5 py-1 rounded-full border border-amber-200 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Мэндчилгээ</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </motion.div>

        {/* 3D Glassmorphism Frame for the Poem - Luminous Ivory with Golden Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.02, rotateY: 1 }}
          className="relative p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border-2 border-amber-300 shadow-[0_16px_40px_rgba(180,120,60,0.14)]"
        >
          {/* Inner Golden border embellishment */}
          <div className="absolute inset-3 border border-amber-300/40 rounded-2xl pointer-events-none" />

          {/* Top Calligraphy Symbol */}
          <div className="text-amber-500 text-xl mb-4 select-none font-serif">
            ✦ ✦ ✦
          </div>

          {/* Greeting Stanzas */}
          <div className="space-y-3 font-serif-poem text-base sm:text-lg leading-relaxed text-slate-800 font-normal tracking-wide">
            {WEDDING_DATA.invitationPoem.map((line, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + index * 0.08, duration: 0.6 }}
                className={line === '' ? 'h-2' : ''}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Bottom Calligraphy Symbol */}
          <div className="text-amber-500 text-xl mt-6 select-none font-serif">
            ✦ ✦ ✦
          </div>

          {/* Dedication Subtitle */}
          <p className="mt-4 text-xs tracking-widest text-amber-800 uppercase font-mono font-semibold">
          
          </p>
        </motion.div>
      </div>
    </section>
  );
}
