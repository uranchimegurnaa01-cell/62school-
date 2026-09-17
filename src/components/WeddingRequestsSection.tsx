import { motion } from 'motion/react';
import { WEDDING_DATA } from '../data/weddingData';

export default function WeddingRequestsSection() {
  return (
    <section id="requests-section" className="relative w-full bg-[#1b3a5c] text-white py-16 sm:py-20 px-4 sm:px-8">
      {/* Decorative top wave */}
      <div className="absolute -top-1 inset-x-0 overflow-hidden leading-none text-[#faf6f0]">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-6 sm:h-8 fill-current rotate-180"
        >
          <path d="M0,0 C200,80 500,-30 800,70 C1000,120 1120,40 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>

      <div className="max-w-md mx-auto text-center">
        {/* Title matching video frame 00:21 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="font-calligraphy text-4xl sm:text-5xl text-amber-100 font-normal">
           Хүсэлт
          </h2>
          <div className="w-16 h-px bg-amber-300/40 mx-auto mt-2" />
        </motion.div>

        {/* Note Paragraph matching video */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs sm:text-sm text-amber-100/90 font-light leading-relaxed mb-8 max-w-sm mx-auto"
        >
          Энэхүү мөчид бидэнтэй хамтдаа бүтээж, нэгэн үдшийг дурсамж дүүрэн өнгөрүүлье.
        </motion.p>

        {/* Two Guideline Cards matching video */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left">
          {WEDDING_DATA.guidelineCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
              className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15"
            >
              <h3 className="text-xs sm:text-sm font-medium text-amber-200 mb-1">
                {card.title}:
              </h3>
              <p className="text-[11px] sm:text-xs text-neutral-100/90 font-light leading-relaxed">
                {card.text}
              </p>
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
          <path d="M0,0 C300,90 600,-40 900,60 C1050,110 1150,40 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
