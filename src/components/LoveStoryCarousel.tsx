import { useState, useRef, useEffect, TouchEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, Camera, Upload, Image as ImageIcon } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export default function LoveStoryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = WEDDING_DATA.storySlides;
  const touchStartX = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Allow custom uploaded image per slide persisted in browser
  const [customImages, setCustomImages] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('school_story_custom_images');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        const slideId = slides[currentIndex].id;
        setCustomImages((prev) => {
          const updated = { ...prev, [slideId]: result };
          try {
            localStorage.setItem('school_story_custom_images', JSON.stringify(updated));
          } catch {
            // quota limit fallback
          }
          return updated;
        });
        setImageErrors((prev) => ({ ...prev, [slideId]: false }));
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

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
  const activeImage = customImages[currentSlide.id] || currentSlide.image;
  const hasError = imageErrors[currentSlide.id] && !customImages[currentSlide.id];

  return (
    <section id="story-section" className="relative w-full bg-[#fffaf8] text-neutral-800 py-16 sm:py-20 px-4 sm:px-8 overflow-hidden">
      {/* Dynamic ambient light behind 3D carousel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md mx-auto text-center relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-1.5 mb-8"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-100 border border-red-300 text-red-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>Түүхийн алтан хуудас</span>
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl text-neutral-900 tracking-wide font-bold">
            Бидний түүх
          </h2>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-red-800 font-medium">
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
          <div className="absolute inset-0 bg-white/70 rounded-2xl shadow-md border border-red-900/10 rotate-3 scale-[0.96] translate-y-3 pointer-events-none" />
          <div className="absolute inset-0 bg-white/80 rounded-2xl shadow-md border border-red-900/10 -rotate-2 scale-[0.98] translate-y-1.5 pointer-events-none" />

          {/* Active 3D Flipping Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, rotateY: 60, scale: 0.9 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: -60, scale: 0.9 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative w-full h-full bg-white rounded-2xl shadow-[0_20px_45px_-10px_rgba(220,38,38,0.3)] border-2 border-red-200 p-4 flex flex-col justify-between"
            >
              {/* Photo Frame */}
              <div className="relative w-full aspect-[4/3.1] rounded-xl overflow-hidden shadow-inner bg-neutral-100 border border-neutral-200/80 group">
                {!hasError ? (
                  <img
                    src={activeImage}
                    alt={currentSlide.title}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                    onError={() => {
                      setImageErrors((prev) => ({ ...prev, [currentSlide.id]: true }));
                    }}
                  />
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-amber-50/70 to-red-50/70 text-center cursor-pointer hover:bg-amber-100/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center mb-2 shadow-sm">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-neutral-800 mb-0.5">
                      {currentSlide.title}
                    </p>
                    <p className="text-[11px] text-red-700 font-medium underline underline-offset-2">
                      Зургаа сонгож оруулах (IMG_7570.jpeg)
                    </p>
                  </div>
                )}

                {/* Subtle camera icon on top left to replace or upload image anytime */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Энэ зургийг солих / оруулах"
                  className="absolute top-2.5 left-2.5 p-1.5 rounded-full bg-black/50 hover:bg-black/75 text-white backdrop-blur-xs transition cursor-pointer shadow-md"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>

                <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-red-800 text-[11px] font-mono font-bold text-white border border-yellow-300 shadow-md">
                  {currentSlide.date}
                </div>
              </div>

              {/* Text Area */}
              <div className="my-auto py-2 text-center">
                <h3 className="font-serif-title text-lg sm:text-xl text-neutral-900 font-bold mb-1">
                  {currentSlide.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed px-2">
                  {currentSlide.description}
                </p>
              </div>

              {/* Bottom Card Index Counter */}
              <div className="flex items-center justify-between text-[11px] text-red-600 font-mono font-semibold px-2 pt-2 border-t border-red-100">
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
            className="w-10 h-10 rounded-full bg-white hover:bg-red-50 active:scale-95 shadow-md border-2 border-red-200 flex items-center justify-center text-red-700 transition cursor-pointer font-bold"
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
                aria-label={`Зураг ${i + 1}`}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  i === currentIndex ? 'w-6 bg-red-600' : 'w-2.5 bg-red-200 hover:bg-red-300'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Дараах зураг"
            className="w-10 h-10 rounded-full bg-white hover:bg-red-50 active:scale-95 shadow-md border-2 border-red-200 flex items-center justify-center text-red-700 transition cursor-pointer font-bold"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Hidden File Input for uploading photo */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageFileChange}
        />
      </div>
    </section>
  );
}
