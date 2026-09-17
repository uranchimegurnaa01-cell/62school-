import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';
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

  return (
    <section id="countdown-section" className="relative w-full bg-[#faf6f0] text-neutral-800 pb-12 px-4 sm:px-8">
      <div className="max-w-md mx-auto text-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-1 mb-6"
        >
          <div className="inline-flex items-center justify-center gap-1.5 text-sky-600 mb-1">
            <Clock className="w-4 h-4" />
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl text-neutral-800 font-normal">
            Ой хүртэл
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-mono tracking-wider">
            {WEDDING_DATA.formattedDate} · {WEDDING_DATA.formattedTime}
          </p>
        </motion.div>

        {/* Countdown Timer Display (Matching video frame 00:16) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-xs rounded-2xl p-5 shadow-sm border border-sky-900/10"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-neutral-800">
            {/* Days */}
            <div className="flex flex-col items-center flex-1">
              <span className="font-mono text-2xl sm:text-3xl font-light text-sky-700">
                {formatNum(timeLeft.days)}
              </span>
              <span className="text-[10px] sm:text-xs text-neutral-500 font-light mt-1">
                Өдөр
              </span>
            </div>

            <span className="font-mono text-xl sm:text-2xl text-neutral-300 pb-4">:</span>

            {/* Hours */}
            <div className="flex flex-col items-center flex-1">
              <span className="font-mono text-2xl sm:text-3xl font-light text-sky-700">
                {formatNum(timeLeft.hours)}
              </span>
              <span className="text-[10px] sm:text-xs text-neutral-500 font-light mt-1">
                Цаг
              </span>
            </div>

            <span className="font-mono text-xl sm:text-2xl text-neutral-300 pb-4">:</span>

            {/* Minutes */}
            <div className="flex flex-col items-center flex-1">
              <span className="font-mono text-2xl sm:text-3xl font-light text-sky-700">
                {formatNum(timeLeft.minutes)}
              </span>
              <span className="text-[10px] sm:text-xs text-neutral-500 font-light mt-1">
                Минут
              </span>
            </div>

            <span className="font-mono text-xl sm:text-2xl text-neutral-300 pb-4">:</span>

            {/* Seconds */}
            <div className="flex flex-col items-center flex-1">
              <span className="font-mono text-2xl sm:text-3xl font-light text-sky-700">
                {formatNum(timeLeft.seconds)}
              </span>
              <span className="text-[10px] sm:text-xs text-neutral-500 font-light mt-1">
                Секунд
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
