import { useState } from 'react';
import { motion } from 'motion/react';
import { Share2, Mail, Calendar, Check } from 'lucide-react';
import schoolBuildingImg from '../school-cover.jpeg';
import smoothGalaBg from '../assets/images/smooth_gala_bg_1789650457106.jpg';

interface ClosingSectionProps {
  onReopenEnvelope: () => void;
}

export default function ClosingSection({ onReopenEnvelope }: ClosingSectionProps) {
  const [copied, setCopied] = useState(false);

  // Ойн арга хэмжээний мэдээлэл
  const eventDetails = {
    title: 'Нийслэлийн ерөнхий боловсролын 62 дугаар сургууль',
    description: 'Эрдмийн их уурхай, эрдэмтэн багш нар, үе үеийн төгсөгчдийн түүхт 50 жилийн ойн баярын арга хэмжээ',
    venueName: 'The Corporate Hotel',
    venueAddress: 'Хан-Уул дүүрэг, 15-р хороо',
    locationCity: 'Улаанбаатар хот',
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Урилга | ${eventDetails.title}`,
          text: 'Сургуулийн 50 жилийн ойн цахим урилгатай танилцана уу.',
          url,
        });
        return;
      } catch {
        // fall back to copy
      }
    }
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToCalendar = () => {
    const startTime = '20261007T170000';
    const endTime = '20261007T235900';
    const title = encodeURIComponent(`Ойн баяр: ${eventDetails.title}`);
    const details = encodeURIComponent(eventDetails.description);
    const location = encodeURIComponent(`${eventDetails.venueName}, ${eventDetails.venueAddress}`);
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="closing-section" className="relative w-full bg-[#FAF6F0] text-slate-800 py-16 sm:py-20 px-4 sm:px-8 text-center overflow-hidden">
      {/* Background Gala Jubilee Ambience with luminous gentle overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={smoothGalaBg}
          alt="50 жилийн ойн баярын төгсгөлийн фон"
          className="w-full h-full object-cover object-center filter brightness-[1.1] contrast-[0.95] opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5EC]/90 via-[#FFF9F2]/80 to-[#FAF6F0]/95 pointer-events-none" />
      </div>

      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-rose-200/35 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-md mx-auto flex flex-col items-center">
        {/* School Frame / Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white p-3.5 pb-6 rounded-3xl shadow-[0_20px_50px_rgba(180,120,60,0.18)] border-4 border-amber-300 max-w-[270px] sm:max-w-[290px] text-neutral-800 mb-8"
        >
          <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 shadow-inner">
            <img
              src={schoolBuildingImg}
              alt={eventDetails.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="font-calligraphy text-base sm:text-lg font-bold text-neutral-900 leading-snug">
            {eventDetails.title}
          </p>
          <p className="text-[11px] font-mono text-amber-800 font-extrabold mt-1">
            1976 - 2026 (50 ЖИЛ)
          </p>
        </motion.div>

        {/* Closing Warm Message */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-3 mb-8"
        >
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed px-2">
            Эрдэм мэдлэгийн оч бадрааж, ирээдүйн эздийг бэлтгэсэн сургуулийн маань түүхэн замнал, эрдмийн өргөөний 50 жилийн ой тохиож байна.
          </p>
          <h2 className="font-serif-title text-xl sm:text-2xl font-bold text-slate-900 leading-snug px-4">
      
          </h2>
          <p className="font-calligraphy text-xl sm:text-2xl text-amber-800">
            {eventDetails.title}
          </p>
        </motion.div>

        {/* Traditional Motif */}
        <div className="text-amber-500 text-2xl mb-8 select-none font-serif">
          ❖ ❖ ❖
        </div>

        {/* Action Buttons - Luminous Ivory and Gold */}
        <div className="w-full space-y-3 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleAddToCalendar}
              className="py-3 px-3 rounded-xl bg-white hover:bg-amber-50/60 text-xs text-amber-900 flex items-center justify-center gap-1.5 border-2 border-amber-300 cursor-pointer transition shadow-sm font-semibold"
            >
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>Календарт нэмэх</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="py-3 px-3 rounded-xl bg-white hover:bg-amber-50/60 text-xs text-amber-900 flex items-center justify-center gap-1.5 border-2 border-amber-300 cursor-pointer transition shadow-sm font-semibold"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Хуулагдлаа</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-amber-600" />
                  <span>Холбоос хуулах</span>
                </>
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={onReopenEnvelope}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:brightness-105 text-xs text-amber-950 font-bold flex items-center justify-center gap-2 border-2 border-white cursor-pointer transition shadow-md"
          >
            <Mail className="w-4 h-4 text-amber-900" />
            <span>Дугтуйг дахин харах</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="mt-12 text-[11px] text-slate-500 font-medium">
          {eventDetails.venueName} · {eventDetails.locationCity}
        </div>
      </div>
    </section>
  );
}
