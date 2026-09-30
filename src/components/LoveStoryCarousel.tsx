import { useState, useRef, useEffect, TouchEvent, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, Camera, Upload, Link as LinkIcon, X, RotateCcw } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

// Helper to convert Google Drive URLs to direct image CDN links
const normalizeImageUrl = (url: string): string => {
  if (!url) return '';
  const driveMatch = url.match(/(?:drive\.google\.com\/(?:file\/d\/|open\?id=)|lh3\.googleusercontent\.com\/d\/)([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
  }
  return url;
};

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

  // Link input modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState('');

  const currentSlide = slides[currentIndex];
  const rawImage = customImages[currentSlide.id] || currentSlide.image;
  const activeImage = normalizeImageUrl(rawImage);
  const hasError = imageErrors[currentSlide.id] && !customImages[currentSlide.id];

  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        const slideId = currentSlide.id;
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
        setIsModalOpen(false);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSaveUrl = (e: FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    const slideId = currentSlide.id;
    const cleanUrl = inputUrl.trim();
    setCustomImages((prev) => {
      const updated = { ...prev, [slideId]: cleanUrl };
      try {
        localStorage.setItem('school_story_custom_images', JSON.stringify(updated));
      } catch {
        // storage fallback
      }
      return updated;
    });
    setImageErrors((prev) => ({ ...prev, [slideId]: false }));
    setInputUrl('');
    setIsModalOpen(false);
  };

  const handleResetSlideImage = () => {
    const slideId = currentSlide.id;
    setCustomImages((prev) => {
      const updated = { ...prev };
      delete updated[slideId];
      try {
        localStorage.setItem('school_story_custom_images', JSON.stringify(updated));
      } catch {
        // fallback
      }
      return updated;
    });
    setImageErrors((prev) => ({ ...prev, [slideId]: false }));
    setIsModalOpen(false);
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
                    onClick={() => setIsModalOpen(true)}
                    className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-amber-50/70 to-red-50/70 text-center cursor-pointer hover:bg-amber-100/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center mb-2 shadow-sm">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-neutral-800 mb-0.5">
                      {currentSlide.title}
                    </p>
                    <span className="text-[11px] text-red-700 underline font-medium">
                      Зургийн линк оруулах эсвэл файл сонгох
                    </span>
                  </div>
                )}

                {/* Subtle camera icon on top left to replace or upload image anytime */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  title="Энэ зургийг линкээр эсвэл файлаар солих"
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

        {/* Modal for Inserting Image by Link or File */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl border-2 border-red-200 text-left"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-red-100">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-red-100 text-red-700">
                      <Camera className="w-4 h-4" />
                    </div>
                    <h4 className="font-serif-title text-base font-bold text-neutral-900">
                      Зураг оруулах / солих
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-xs text-neutral-600 mt-2.5 mb-4">
                  Слайд: <strong className="text-neutral-900">{currentSlide.title}</strong>
                </p>

                {/* Option 1: Paste Copied Link */}
                <form onSubmit={handleSaveUrl} className="space-y-2 mb-4">
                  <label className="block text-xs font-bold text-neutral-700">
                    1. Хуулсан линкээр оруулах:
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-neutral-400">
                        <LinkIcon className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="url"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        placeholder="Google Drive линк эсвэл зургийн URL..."
                        className="w-full pl-8 pr-2.5 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 bg-neutral-50/50"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!inputUrl.trim()}
                      className="px-3 py-2 bg-red-700 hover:bg-red-800 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow-sm transition cursor-pointer"
                    >
                      Оруулах
                    </button>
                  </div>
                  <span className="block text-[11px] text-neutral-500">
                    Google Drive-ийн хуулсан линк шууд автоматаар танигдана.
                  </span>
                </form>

                <div className="relative flex items-center justify-center my-3">
                  <div className="border-t border-neutral-200 w-full" />
                  <span className="bg-white px-2 text-[10px] text-neutral-400 uppercase font-bold tracking-wider">
                    эсвэл
                  </span>
                </div>

                {/* Option 2: Upload File from Device */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-neutral-700">
                    2. Төхөөрөмжөөс файл сонгох:
                  </label>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2.5 px-3 rounded-xl border-2 border-dashed border-red-300 bg-red-50/50 hover:bg-red-100/50 text-red-800 font-semibold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Upload className="w-4 h-4 text-red-600" />
                    <span>Утас / компьютерээс зураг сонгох</span>
                  </button>
                </div>

                {/* Reset custom image button if exists */}
                {customImages[currentSlide.id] && (
                  <button
                    type="button"
                    onClick={handleResetSlideImage}
                    className="w-full mt-3 py-1.5 text-[11px] text-neutral-500 hover:text-red-700 flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Анхны зураг руу буцаах</span>
                  </button>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
