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
    title: 'Нийслэлийн ерөнхий боловсролын түүхт 50 жилийн ой',
    description: 'Эрдмийн их уурхай, эрдэмтэн багш нар, үе үеийн төгсөгчдийн түүхт 50 жилийн ойн баярын арга хэмжээ',
    venueName: 'Сургуулийн төв талбай',
    venueAddress: 'Эрдмийн өргөө 1-р гудамж',
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
    // Google Calendar-т ойн баярын цагийг сануулах холбоос
    const startTime = '20260816T170000';
    const endTime = '20260816T235900';
    const title = encodeURIComponent(`Ойн баяр: ${eventDetails.title}`);
    const details = encodeURIComponent(eventDetails.description);
    const location = encodeURIComponent(`${eventDetails.venueName}, ${eventDetails.venueAddress}`);
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="closing-section" className="relative w-full bg-slate-900 text-white py-16 sm:py-20 px-4 sm:px-8 text-center overflow-hidden">
      {/* Background Gala Jubilee Ambience matching the top section */}
      <div className="absolute inset-0 z-0">
        <img
          src={smoothGalaBg}
          alt="50 жилийн ойн баярын төгсгөлийн фон"
          className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.1]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1b3a5c]/95 via-slate-950/80 to-slate-950/95 pointer-events-none" />
      </div>

      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-amber-400/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-md mx-auto flex flex-col items-center">
        {/* School Frame / Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white p-3 pb-6 rounded-xl shadow-2xl border-4 border-amber-200/90 max-w-[260px] sm:max-w-[280px] text-neutral-800 mb-8"
        >
          <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
            <img
              src={schoolBuildingImg}
              alt={eventDetails.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="font-calligraphy text-base sm:text-lg font-bold text-neutral-700 leading-snug">
            {eventDetails.title}
          </p>
          <p className="text-[10px] font-mono text-neutral-400 mt-1">
            2026.10.07
          </p>
        </motion.div>

        {/* Closing Warm Message */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-3 mb-8"
        >
          <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed px-2">
            Эрдэм мэдлэгийн оч бадрааж, ирээдүйн эздийг бэлтгэсэн сургуулийн маань түүхэн замнал, эрдмийн өргөөний 50 жилийн ой тохиож байна.
          </p>
          <h2 className="font-serif-title text-xl sm:text-2xl font-light text-amber-100 leading-snug px-4">
            Үе үеийн төгсөгчид, багш та бүхэнтэйгээ уулзахыг тэсэн ядан хүлээж байна!
          </h2>
          <p className="font-calligraphy text-xl sm:text-2xl text-amber-300 drop-shadow-sm">
            {eventDetails.title}
          </p>
        </motion.div>

        {/* Traditional Mongolian Motif */}
        <div className="text-amber-300/60 text-2xl mb-8 select-none">
          ❖ ❖ ❖
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-3 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleAddToCalendar}
              className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-amber-100 flex items-center justify-center gap-1.5 border border-amber-200/20 cursor-pointer transition shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-200" />
              <span>Календарт нэмэх</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-amber-100 flex items-center justify-center gap-1.5 border border-amber-200/20 cursor-pointer transition shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-medium">Хуулагдлаа</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-amber-200" />
                  <span>Холбоос хуулах</span>
                </>
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={onReopenEnvelope}
            className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-neutral-200 flex items-center justify-center gap-1.5 border border-white/15 cursor-pointer transition"
          >
            <Mail className="w-3.5 h-3.5 text-amber-200" />
            <span>Дугтуйг дахин харах</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="mt-12 text-[11px] text-neutral-300/80 font-light">
          {eventDetails.venueName} · {eventDetails.locationCity}
        </div>
      </div>
    </section>
  );
}