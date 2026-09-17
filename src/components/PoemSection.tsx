import { motion } from 'motion/react';
import { WEDDING_DATA } from '../data/weddingData';

export default function PoemSection() {
  return (
    <section id="poem-section" className="relative w-full bg-[#1b3a5c] text-white pt-10 pb-16 sm:py-20 px-6 sm:px-10">
      {/* Decorative Gold Rings / Floral Accent */}
      <div className="max-w-md mx-auto text-center space-y-6">
        {/* Mongolian Wedding Poem from video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4 text-center font-garamond"
        >
          <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed tracking-wide text-amber-50/95">
            Мэдлэгийн их далайд хөлөг онгоц шиг аялж,<br />
            Мөрөөдлийн цэнхэр алсад далавч дэлгэн нисэхэд<br />
            Эрдмийн түлхүүр атгуулсан ачтай сайхан сургууль минь<br />
            Эх дэлхийд намайг хүн болгосон өргөө минь<br />
          </p>

          <div className="py-2 flex items-center justify-center">
            <span className="w-12 h-px bg-amber-300/30" />
          </div>

          <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed tracking-wide text-amber-50/95">
            Энэхүү  мөчийг<br />
            Эрхэм таньтай хамт хуваалцахыг урьж<br />
            байна.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="pt-4 font-calligraphy text-2xl text-amber-200/90"
        >
          {WEDDING_DATA.bride ? `${WEDDING_DATA.groom} & ${WEDDING_DATA.bride}` : WEDDING_DATA.groom}
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
