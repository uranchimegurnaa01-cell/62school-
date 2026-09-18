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

export default function CountdownSection() {
  const targetDate = new Date(WEDDING_DATA.weddingDate).getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
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

  return (
    <section id="countdown-section" className="relative w-full bg-[#faf6f0] text-neutral-800 pb-16 px-4 sm:px-8">
      <div className="max-w-md mx-auto text-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-1 mb-8"
        >
          <div className="inline-flex items-center justify-center gap-1.5 text-amber-700 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-widest">Хугацаа</span>
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl text-neutral-800 font-normal">
            Ойн баяр хүртэл
          </h2>
          <div className="w-12 h-0.5 bg-amber-600/30 mx-auto mt-2" />
        </motion.div>

        {/* 3D Floating Golden Countdown Blocks */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-sm mx-auto" style={{ perspective: 1000 }}>
          {timeBlocks.map((block, index) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, y: 20, rotateX: -25 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="relative rounded-2xl p-2.5 sm:p-3 bg-gradient-to-b from-white via-amber-50/40 to-white shadow-[0_12px_24px_-6px_rgba(180,83,9,0.18)] border-2 border-amber-200/80 flex flex-col items-center justify-center transition-transform"
            >
              {/* Top glossy reflection light */}
              <div className="absolute top-0 inset-x-2 h-1 bg-gradient-to-r from-transparent via-amber-300/50 to-transparent rounded-t-xl" />

              <span className="font-mono text-2xl sm:text-3xl font-bold text-slate-900 drop-shadow-xs">
                {block.value}
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-amber-800/90 tracking-wide mt-1">
                {block.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Motivational Date Reminder with subtle glow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-6 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100/70 border border-amber-300/40 text-amber-900 text-xs font-light"
        >
          <Sparkles className="w-3 h-3 text-amber-600" />
          <span>{WEDDING_DATA.formattedDate} · {WEDDING_DATA.venueName}</span>
        </motion.div>
      </div>
    </section>
  );
}
