import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Copy, Check, ExternalLink } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export default function LocationSection() {
  const [copiedMap, setCopiedMap] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyMap = () => {
    navigator.clipboard.writeText(WEDDING_DATA.mapUrl);
    setCopiedMap(true);
    setTimeout(() => setCopiedMap(false), 2500);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(WEDDING_DATA.venueAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleOpenMap = () => {
    window.open(WEDDING_DATA.mapUrl, '_blank', 'noopener,noreferrer');
  };

  const handleOpenGoogleMaps = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=47.903850,106.922647', '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="location-section" className="relative w-full bg-[#FAF6F0] text-neutral-800 py-16 sm:py-20 px-4 sm:px-8">
      <div className="max-w-md mx-auto text-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-1 mb-8"
        >
          <div className="inline-flex items-center justify-center gap-1.5 text-amber-700 mb-1">
            <MapPin className="w-5 h-5 text-amber-600" />
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl text-neutral-900 font-bold">
            Байршил
          </h2>
          <p className="font-serif-title text-lg text-amber-900 font-semibold">
            {WEDDING_DATA.venueName}
          </p>
          <p className="text-xs sm:text-sm text-neutral-600 font-light">
            {WEDDING_DATA.locationCity}
          </p>
        </motion.div>

        {/* Venue Photo Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl overflow-hidden shadow-xl border-2 border-amber-200 mb-6"
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80"
              alt={WEDDING_DATA.venueName}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-left text-white">
              <p className="text-xs font-light text-amber-200">
                Хүлээн авалтын танхим
              </p>
              <p className="text-sm font-medium">
                {WEDDING_DATA.venueAddress}
              </p>
            </div>
          </div>

          <div className="p-3 sm:p-4 flex items-center justify-between gap-2 bg-[#FFFDF9] border-t border-amber-100">
            <button
              type="button"
              onClick={handleCopyMap}
              className="flex items-center gap-1.5 text-xs text-amber-900 hover:text-amber-950 font-semibold transition-colors py-2 px-3 rounded-lg hover:bg-amber-100/60 cursor-pointer border border-amber-200/80 bg-amber-50/50"
              title="Газрын зургийн холбоос хуулах"
            >
              {copiedMap ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Холбоос хуулагдлаа!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-amber-700" />
                  <span>Газрын зураг хуулах</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCopyAddress}
              className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-900 transition-colors py-2 px-3 rounded-lg hover:bg-neutral-100 cursor-pointer"
              title="Хаягийн текстийг хуулах"
            >
              {copiedAddress ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-medium">Хаяг хуулагдлаа!</span>
                </>
              ) : (
                <>
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Хаяг хуулах</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Primary Map Button */}
        <motion.button
          type="button"
          onClick={handleOpenMap}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-105 text-amber-950 font-bold text-sm sm:text-base shadow-md flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg transition-all"
        >
          <Navigation className="w-4 h-4 text-amber-900" />
          <span>Газрын зурагт харах</span>
        </motion.button>

        {/* Optional alternative for Google Maps */}
        <div className="mt-3 flex items-center justify-center gap-4 text-xs">
          <button
            type="button"
            onClick={handleOpenGoogleMaps}
            className="inline-flex items-center gap-1 text-neutral-500 hover:text-amber-800 transition-colors cursor-pointer py-1 px-2 rounded hover:bg-amber-50/60"
          >
            <ExternalLink className="w-3 h-3 text-neutral-400" />
            <span>Google Maps дээр нээх</span>
          </button>
        </div>
      </div>
    </section>
  );
}
