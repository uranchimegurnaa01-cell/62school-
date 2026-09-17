import { useState, useRef, useEffect, TouchEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

  return (
    <section id="story-section" className="relative w-full bg-[#faf6f0] text-neutral-800 py-16 sm:py-20 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-md mx-auto text-center">
        {/* Section Heading matching video */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-1 mb-8"
        >
          <h2 className="font-serif-title text-2xl sm:text-3xl text-neutral-800 tracking-wide font-normal">
            Бидний түүх
          </h2>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-neutral-500 font-light">
            <span>Нийслэлийн ерөнхий боловсролын 62 дугаар сургууль • 50 жил</span>
          </div>
        </motion.div>

        {/* Carousel Slider Card */}
        <div
          className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-xl bg-white border border-amber-900/10 select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0 flex flex-col"
            >
              {/* Photo */}
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={slides[currentIndex].image}
                  alt={slides[currentIndex].title}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              </div>

              {/* Caption Overlay at bottom */}
              <div className="absolute bottom-0 inset-x-0 p-5 text-left text-white">
                <span className="inline-block text-[11px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-amber-200 mb-1.5">
                  {slides[currentIndex].date}
                </span>
                <h3 className="font-serif-title text-lg font-medium text-white mb-1">
                  {slides[currentIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-200/90 font-light leading-relaxed">
                  "{slides[currentIndex].description}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Өмнөх зураг"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition cursor-pointer border border-white/10"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Дараагийн зураг"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition cursor-pointer border border-white/10"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Carousel Dots Pagination (Matching video: 5-9 dots) */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Зураг ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentIndex
                  ? 'w-6 h-1.5 bg-sky-600'
                  : 'w-1.5 h-1.5 bg-neutral-300 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
