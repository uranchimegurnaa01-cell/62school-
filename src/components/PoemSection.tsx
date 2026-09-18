import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export default function PoemSection() {
  return (
    <section id="poem-section" className="relative w-full bg-gradient-to-b from-[#1b3a5c] via-[#152e4a] to-[#12253b] text-white pt-10 pb-16 sm:py-20 px-6 sm:px-10 overflow-hidden">
      {/* 3D Ambient Lighting Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating 3D parchment frame */}
      <div className="max-w-md mx-auto text-center relative z-10" style={{ perspective: 1000 }}>
        <motion.div
          initial={{ opacity: 0, y: 25, rotateX: 12 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-6 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-amber-300/30 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] space-y-6"
        >
          {/* Top spark */}
          <div className="flex justify-center text-amber-300">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>

          <div className="space-y-4 text-center font-garamond">
            <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed tracking-wide text-amber-50 drop-shadow-sm">
              Мэдлэгийн их далайд хөлөг онгоц шиг аялж,<br />
              Мөрөөдлийн цэнхэр алсад далавч дэлгэн нисэхэд<br />
              Эрдмийн түлхүүр атгуулсан ачтай сайхан сургууль минь<br />
              Эх дэлхийд намайг хүн болгосон өргөө минь<br />
            </p>

            <div className="py-2 flex items-center justify-center gap-2">
              <span className="w-12 h-px bg-gradient-to-r from-transparent to-amber-300/50" />
              <span className="w-1.5 h-1.5 rotate-45 border border-amber-300 bg-amber-200/40" />
              <span className="w-12 h-px bg-gradient-to-l from-transparent to-amber-300/50" />
            </div>

            <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed tracking-wide text-amber-50/95 drop-shadow-sm">
              Энэхүү түүхт баярын мөчийг<br />
              Эрхэм тантай хамт хуваалцахыг урьж<br />
              байна.
            </p>
          </div>

          <div className="pt-2 font-calligraphy text-2xl sm:text-3xl text-amber-200 drop-shadow-md">
            {WEDDING_DATA.bride ? `${WEDDING_DATA.groom} & ${WEDDING_DATA.bride}` : WEDDING_DATA.groom}
          </div>
        </motion.div>
      </div>

      {/* Scalloped transition to next section */}
      <div className="absolute -bottom-1 inset-x-0 overflow-hidden leading-none text-[#faf6f0]">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-8 sm:h-12 fill-current"
        >
          <path d="M0,0 C300,90 600,-40 900,60 C1050,110 1150,40 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
