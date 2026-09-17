import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquareText, ThumbsUp, Send, GraduationCap } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { GuestWish } from '../types';

export default function GuestbookSection() {
  const [wishes, setWishes] = useState<GuestWish[]>(() => {
    try {
      const saved = localStorage.getItem('school_anniversary_wishes');
      return saved ? JSON.parse(saved) : WEDDING_DATA.initialWishes;
    } catch {
      return WEDDING_DATA.initialWishes;
    }
  });

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);
  const [hasSubmittedNow, setHasSubmittedNow] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    const displayName = role.trim() ? `${name.trim()} (${role.trim()})` : name.trim();

    const newWish: GuestWish = {
      id: 'wish-' + Date.now(),
      name: displayName,
      message: message.trim(),
      timestamp: 'Саяхан',
      likes: 1,
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem('school_anniversary_wishes', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setName('');
    setRole('');
    setMessage('');
    setIsSubmitting(false);
    setSuccessNotice(true);
    setHasSubmittedNow(true);
    setTimeout(() => setSuccessNotice(false), 4000);
  };

  const handleLike = (id: string) => {
    const updated = wishes.map((w) =>
      w.id === id ? { ...w, likes: w.likes + 1 } : w
    );
    setWishes(updated);
    try {
      localStorage.setItem('school_anniversary_wishes', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  return (
    <section id="guestbook-section" className="relative w-full bg-[#faf6f0] text-neutral-800 py-16 sm:py-20 px-4 sm:px-8">
      <div className="max-w-md mx-auto">
        {/* Title for School Anniversary Guestbook */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center gap-1.5 text-sky-600 mb-1">
            <MessageSquareText className="w-5 h-5" />
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl text-neutral-800 font-normal">
            Ойн баярын мэндчилгээ
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-light mt-1">
            Сургуульдаа, багш нартаа болон төгсөгчдөдөө зориулан сэтгэлийн үгээ үлдээнэ үү
          </p>
        </motion.div>

        {/* Input Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-5 shadow-lg border border-sky-900/10 mb-6"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="wish-name" className="block text-xs font-medium text-neutral-600 mb-1 text-left">
                  Таны нэр
                </label>
                <input
                  id="wish-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Бүтэн нэрээ бичнэ үү"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition"
                />
              </div>

              <div>
                <label htmlFor="wish-role" className="block text-xs font-medium text-neutral-600 mb-1 text-left">
                  Төгссөн он / Албан тушаал
                </label>
                <input
                  id="wish-role"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Жишээ: 1995 оны төгсөгч"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition"
                />
              </div>
            </div>

            <div>
              <label htmlFor="wish-message" className="block text-xs font-medium text-neutral-600 mb-1 text-left">
                Мэндчилгээний үг
              </label>
              <textarea
                id="wish-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Сургуулийнхаа 50 жилийн ойд зориулсан халуун дулаан сэтгэгдэл, дурсамж, ерөөлөө бичнэ үү..."
                rows={3}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition resize-none"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white font-medium text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg transition-all disabled:opacity-70"
            >
              <Send className="w-4 h-4" />
              <span>Мэндчилгээ илгээх</span>
            </motion.button>
          </form>

          {successNotice && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-xs text-center text-emerald-600 font-medium"
            >
              Таны ойн баярын мэндчилгээ амжилттай бүртгэгдэж нийтлэгдлээ. Баярлалаа!
            </motion.p>
          )}
        </motion.div>

        {/* Wishes List: Зочид өөрсдөө бичсэний дараа эсвэл өмнө нь бичсэн мэндчилгээ байвал гарч ирнэ */}
        {wishes.length > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-xs font-medium text-neutral-600 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-sky-600" />
                Нийт үлдээсэн мэндчилгээ ({wishes.length})
              </span>
            </div>

            <AnimatePresence>
              {wishes.map((wish) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white/90 backdrop-blur-xs rounded-xl p-4 shadow-xs border border-sky-900/10 text-left flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-neutral-800">
                      {wish.name}
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      {wish.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-700 font-light leading-relaxed mb-3">
                    "{wish.message}"
                  </p>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleLike(wish.id)}
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-neutral-100 hover:bg-sky-50 text-[11px] text-neutral-600 hover:text-sky-700 transition-colors cursor-pointer"
                    >
                      <ThumbsUp className="w-3 h-3 text-sky-600" />
                      <span>{wish.likes}</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="p-4 rounded-xl border border-dashed border-neutral-300 text-center text-xs text-neutral-500 font-light">
            Та сургуулийнхаа түүхт ойн баярт анхны сэтгэгдэл, мэндчилгээгээ үлдээгээрэй!
          </div>
        )}
      </div>
    </section>
  );
}
