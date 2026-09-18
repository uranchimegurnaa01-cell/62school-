import { useState, useRef, useEffect, TouchEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export default function LoveStoryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = WEDDING_DATA.storySlides;
  const touchStartX = useRef<number | null>(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  const currentSlide = slides[currentIndex];

  return (
    <section id="story-section" className="relative w-full bg-[#faf6f0] text-neutral-800 py-16 sm:py-20 px-4 sm:px-8 overflow-hidden">
      {/* Subtle ambient light behind 3D carousel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md mx-auto text-center relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-1.5 mb-8"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300/40 text-amber-900 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Түүхийн алтан хуудас</span>
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl text-neutral-800 tracking-wide font-normal">
            Бидний түүх
          </h2>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-neutral-500 font-light">
            <span>Нийслэлийн ерөнхий боловсролын 62 дугаар сургууль · 50 жил</span>
          </div>
        </motion.div>

        {/* 3D Floating Polaroid Card Presentation */}
        <div
          className="relative w-full max-w-[320px] sm:max-w-[340px] mx-auto aspect-[3/4.2] mb-6 select-none"
          style={{ perspective: 1200 }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Layered decorative card behind to create physical 3D stack illusion */}
          <div className="absolute inset-0 bg-white/70 rounded-2xl shadow-md border border-amber-900/10 rotate-3 scale-[0.96] translate-y-3 pointer-events-none" />
          <div className="absolute inset-0 bg-white/80 rounded-2xl shadow-md border border-amber-900/10 -rotate-2 scale-[0.98] translate-y-1.5 pointer-events-none" />

          {/* Active 3D Flipping Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, rotateY: 60, scale: 0.9 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: -60, scale: 0.9 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative w-full h-full bg-white rounded-2xl shadow-[0_20px_45px_-10px_rgba(40,20,5,0.25)] border-2 border-amber-200/70 p-4 flex flex-col justify-between"
            >
              {/* Photo Frame */}
              <div className="relative w-full aspect-[4/3.1] rounded-xl overflow-hidden shadow-inner bg-neutral-100 border border-neutral-200/80">
                <img
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[11px] font-mono text-amber-200 border border-amber-300/30 shadow-md">
                  {currentSlide.date}
                </div>
              </div>

              {/* Text Area */}
              <div className="my-auto py-2 text-center">
                <h3 className="font-serif-title text-lg sm:text-xl text-neutral-800 font-semibold mb-1">
                  {currentSlide.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed px-2">
                  {currentSlide.description}
                </p>
              </div>

              {/* Bottom Card Index Counter */}
              <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono px-2 pt-2 border-t border-neutral-100">
                <span>1976 - 2026</span>
                <span>{currentIndex + 1} / {slides.length}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Өмнөх зураг"
            className="w-10 h-10 rounded-full bg-white hover:bg-neutral-50 active:scale-95 shadow-md border border-amber-900/10 flex items-center justify-center text-neutral-700 transition cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                aria-label={`Хуудас ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === i
                    ? 'w-6 bg-amber-600 shadow-xs'
                    : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Дараах зураг"
            className="w-10 h-10 rounded-full bg-white hover:bg-neutral-50 active:scale-95 shadow-md border border-amber-900/10 flex items-center justify-center text-neutral-700 transition cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
