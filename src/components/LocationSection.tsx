import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Copy, Check, ExternalLink } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export default function LocationSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(WEDDING_DATA.venueAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenMap = () => {
    window.open(WEDDING_DATA.googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="location-section" className="relative w-full bg-[#faf6f0] text-neutral-800 py-16 sm:py-20 px-4 sm:px-8">
      <div className="max-w-md mx-auto text-center">
        {/* Title matching video frame 00:20 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-1 mb-8"
        >
          <div className="inline-flex items-center justify-center gap-1.5 text-sky-600 mb-1">
            <MapPin className="w-5 h-5" />
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl text-neutral-800 font-normal">
            Байршил
          </h2>
          <p className="font-serif-title text-lg text-neutral-700 font-medium">
            {WEDDING_DATA.venueName}
          </p>
          <p className="text-xs sm:text-sm text-neutral-500 font-light">
            {WEDDING_DATA.locationCity}
          </p>
        </motion.div>

        {/* Venue Photo Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl overflow-hidden shadow-lg border border-sky-900/10 mb-6"
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

          <div className="p-4 flex items-center justify-between gap-2 bg-[#f8fbfe] border-t border-sky-900/5">
            <button
              type="button"
              onClick={handleCopyAddress}
              className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-900 transition-colors py-1.5 px-3 rounded-lg hover:bg-neutral-100 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-medium">Хаяг хуулагдлаа!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Хаяг хуулах</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleOpenMap}
              className="flex items-center gap-1 text-xs text-sky-700 hover:text-sky-800 font-medium py-1.5 px-3 rounded-lg hover:bg-sky-50 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Google Maps</span>
            </button>
          </div>
        </motion.div>

        {/* Primary Map Button matching video: "Газрын зурагт харах" */}
        <motion.button
          type="button"
          onClick={handleOpenMap}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white font-medium text-sm sm:text-base shadow-md flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg transition-all"
        >
          <Navigation className="w-4 h-4" />
          <span>Газрын зурагт харах</span>
        </motion.button>
      </div>
    </section>
  );
}
