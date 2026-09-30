import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// 2026 оны 10 сарын 07-ны 17:00 цаг (Монголын / Улаанбаатарын цагаар UTC+8 -> 09:00 UTC)
// Safari болон бүх төрлийн гар утсанд алдаагүй, 100% нарийвчлалтай тооцоолно
const TARGET_TIMESTAMP = Date.UTC(2026, 9, 7, 9, 0, 0);

export default function CountdownSection() {
  const calculateTimeLeft = (): TimeLeft => {
    const now = Date.now();
    const difference = TARGET_TIMESTAMP - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    // Тоолуурыг нээгдмэгц шууд шинэчлэн явуулна
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNum = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  const timeBlocks = [
    { label: 'Өдөр', value: formatNum(timeLeft.days) },
    { label: 'Цаг', value: formatNum(timeLeft.hours) },
    { label: 'Минут', value: formatNum(timeLeft.minutes) },
    { label: 'Секунд', value: formatNum(timeLeft.seconds) },
  ];

  const isEventStarted = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <section id="countdown-section" className="relative w-full bg-[#FAF6F0] text-slate-800 pb-16 px-4 sm:px-8">
      <div className="max-w-md mx-auto text-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-1 mb-8"
        >
          <div className="inline-flex items-center justify-center gap-1.5 text-amber-700 mb-1">
            <Clock className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">Хүлээн авалтын хугацаа</span>
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl text-slate-900 font-bold">
            {isEventStarted ? 'Хүлээн авалт эхэллээ' : 'Хүлээн авалт эхлэхэд'}
          </h2>
          <div className="w-16 h-1 bg-amber-400 rounded-full mx-auto mt-2" />
        </motion.div>

        {/* 3D Floating Luminous Pearl & Golden Countdown Blocks */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-sm mx-auto" style={{ perspective: 1000 }}>
          {timeBlocks.map((block, index) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, y: 20, rotateX: -25 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="relative rounded-2xl p-2.5 sm:p-3 bg-white shadow-[0_10px_25px_-5px_rgba(180,120,60,0.18)] border-2 border-amber-300 flex flex-col items-center justify-center transition-transform"
            >
              {/* Top glossy reflection light */}
              <div className="absolute top-0 inset-x-2 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent rounded-t-xl" />

              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-slate-900">
                {block.value}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-amber-800 tracking-wide mt-1 uppercase">
                {block.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Motivational Date Reminder with gentle luminous badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-6 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-amber-300 text-amber-900 text-xs font-semibold shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{WEDDING_DATA.formattedDate ? `${WEDDING_DATA.formattedDate} · ` : ''}{WEDDING_DATA.formattedTime ? `${WEDDING_DATA.formattedTime} цагт · ` : ''}{WEDDING_DATA.venueName} Hotel</span>
        </motion.div>
      </div>
    </section>
  );
}
