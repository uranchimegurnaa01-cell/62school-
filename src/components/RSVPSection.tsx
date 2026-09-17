import { useState, FormEvent, useEffect } from 'react';
import { motion } from 'motion/react';
import { UserCheck, Minus, Plus, CheckCircle2, FileSpreadsheet, Settings, ExternalLink, HelpCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RSVPRecord } from '../types';
import { getGoogleSheetUrl, saveGoogleSheetUrl, sendRSVPToGoogleSheet } from '../utils/googleSheets';

export default function RSVPSection() {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<boolean>(true);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'synced' | 'saved_locally'>('idle');

  // Google Sheet Webhook Configuration Modal State
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [sheetUrlInput, setSheetUrlInput] = useState('');
  const [isUrlSaved, setIsUrlSaved] = useState(false);

  useEffect(() => {
    setSheetUrlInput(getGoogleSheetUrl());
  }, []);

  const handleSaveSheetUrl = (e: FormEvent) => {
    e.preventDefault();
    saveGoogleSheetUrl(sheetUrlInput);
    setIsUrlSaved(true);
    setTimeout(() => {
      setIsUrlSaved(false);
      setShowConfigModal(false);
    }, 1200);
  };

  const handleIncrement = () => {
    if (guestCount < 10) setGuestCount((c) => c + 1);
  };

  const handleDecrement = () => {
    if (guestCount > 1) setGuestCount((c) => c - 1);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSyncing(true);

    const record: RSVPRecord = {
      id: 'rsvp-' + Date.now(),
      name: name.trim(),
      attending,
      guestCount: attending ? guestCount : 0,
      phone: phone.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    // Save locally to localStorage
    try {
      const existing = localStorage.getItem('wedding_rsvps');
      const list = existing ? JSON.parse(existing) : [];
      localStorage.setItem('wedding_rsvps', JSON.stringify([...list, record]));
    } catch {
      // ignore
    }

    // Try syncing to Google Sheets if Webhook URL is set
    const hasUrl = Boolean(getGoogleSheetUrl());
    if (hasUrl) {
      await sendRSVPToGoogleSheet(record);
      setSyncStatus('synced');
    } else {
      setSyncStatus('saved_locally');
    }

    setIsSyncing(false);

    if (attending) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#0284c7', '#38bdf8', '#e0f2fe', '#d4af37'],
        });
      } catch {
        // ignore
      }
    }

    setSubmitted(true);
  };

  return (
    <section id="rsvp-section" className="relative w-full bg-[#faf6f0] text-neutral-800 pb-16 sm:pb-20 px-4 sm:px-8">
      <div className="max-w-md mx-auto">
        {/* Title matching video frame 00:25 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center gap-1.5 text-sky-600 mb-1">
            <UserCheck className="w-5 h-5" />
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl text-neutral-800 font-normal">
            Ирцээ бүртгүүлэх
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-light mt-1">
            Ойн өдрөөс өмнө бүртгэлээ хийнэ үү
          </p>

          {/* Quick link to connect Google Sheets */}
          <div className="mt-2.5 flex justify-center">
            <button
              type="button"
              onClick={() => setShowConfigModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-600/20 text-sky-800 text-[11px] font-medium hover:bg-sky-100 transition-colors shadow-xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-sky-600" />
              <span>
                {getGoogleSheetUrl() ? 'Google Sheets холбогдсон' : 'Google Sheets холбох'}
              </span>
              <Settings className="w-3 h-3 text-sky-600 ml-0.5" />
            </button>
          </div>
        </motion.div>

        {/* RSVP Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-sky-900/10"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif-title text-lg font-medium text-neutral-800">
                Бүртгэл амжилттай баталгаажлаа!
              </h3>
              <p className="text-xs text-neutral-500 font-light leading-relaxed max-w-xs mx-auto">
                {name} таны бүртгэлийг хүлээн авлаа.{' '}
                {attending
                  ? `Бид таныг (${guestCount} хүн) тэсэн ядан хүлээж байна!`
                  : 'Хүрэлцэн ирж чадахгүй ч сэтгэлээрээ хамт байгаад талархлаа.'}
              </p>

              {/* Status badge for Google Sheets sync */}
              {syncStatus === 'synced' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Google Sheets хүснэгт рүү автоматаар нэмэгдлээ</span>
                </div>
              )}

              <div>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-xs text-sky-700 underline underline-offset-4 cursor-pointer"
                >
                  Мэдээлэл засах
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Input */}
              <div>
                <label htmlFor="rsvp-name" className="block text-xs font-medium text-neutral-600 mb-1.5 text-left">
                  Таны нэр
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Бүтэн нэрээ бичнэ үү"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition"
                />
              </div>

              {/* Phone Input */}
              <div>
                <label htmlFor="rsvp-phone" className="block text-xs font-medium text-neutral-600 mb-1.5 text-left">
                  Утасны дугаар
                </label>
                <input
                  id="rsvp-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Жишээ: 9911..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition"
                />
              </div>

              {/* Attendance Radio Buttons */}
              <div className="space-y-2 text-left">
                <span className="block text-xs font-medium text-neutral-600">
                  Та ирэх үү?
                </span>

                <div className="space-y-2">
                  <label
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                      attending
                        ? 'border-sky-600 bg-sky-50 text-neutral-900 font-medium'
                        : 'border-neutral-200 bg-white text-neutral-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      checked={attending}
                      onChange={() => setAttending(true)}
                      className="accent-sky-600 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm">Тийм, заавал ирнэ</span>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                      !attending
                        ? 'border-sky-600 bg-sky-50 text-neutral-900 font-medium'
                        : 'border-neutral-200 bg-white text-neutral-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      checked={!attending}
                      onChange={() => setAttending(false)}
                      className="accent-sky-600 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm">Харамсалтай нь очиж чадахгүй</span>
                  </label>
                </div>
              </div>

              {/* Guest Count Stepper */}
              {attending && (
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-medium text-neutral-600">
                    Хэдүүлээ ирэх вэ?
                  </span>

                  <div className="flex items-center gap-3 bg-neutral-100 p-1 rounded-xl border border-neutral-200">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      disabled={guestCount <= 1}
                      aria-label="Хасах"
                      className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <span className="font-mono text-sm font-semibold w-6 text-center text-neutral-800">
                      {guestCount}
                    </span>

                    <button
                      type="button"
                      onClick={handleIncrement}
                      disabled={guestCount >= 10}
                      aria-label="Нэмэх"
                      className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSyncing}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white font-medium text-sm sm:text-base shadow-md cursor-pointer hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-75"
              >
                {isSyncing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Бүртгэж байна...</span>
                  </>
                ) : (
                  <span>Илгээх</span>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>

      {/* Google Sheets Integration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 text-left max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-neutral-800">
                    Google Sheets холболт
                  </h3>
                  <p className="text-[11px] text-neutral-500">
                    Ирцийн бүртгэлийг өөрийн Google Excel рүү шууд авах
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowConfigModal(false)}
                className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-500 hover:bg-neutral-200 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSheetUrl} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Google Apps Script Web App URL:
                </label>
                <input
                  type="url"
                  value={sheetUrlInput}
                  onChange={(e) => setSheetUrlInput(e.target.value)}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
                <p className="text-[11px] text-neutral-500 mt-1">
                  Таны Google Sheets-ээс гаргаж авсан Web App холбоос (URL).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-medium shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Холболтыг хадгалах</span>
                </button>
                {isUrlSaved && (
                  <span className="text-xs text-emerald-600 font-medium animate-pulse">
                    Амжилттай хадгалагдлаа!
                  </span>
                )}
              </div>
            </form>

            {/* Step by step guide */}
            <div className="mt-6 pt-4 border-t border-neutral-100 bg-neutral-50 -mx-6 -mb-6 p-6 rounded-b-2xl">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800 mb-2">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                <span>Google Sheets холбоосыг хэрхэн бэлдэх вэ? (3 алхам)</span>
              </div>
              <ol className="text-xs text-neutral-600 space-y-2 list-decimal list-inside leading-relaxed font-light">
                <li>
                  <strong className="font-medium text-neutral-800">Google Sheet үүсгэх:</strong> Дээд багануудад <code>Огноо</code>, <code>Нэр</code>, <code>Ирэх эсэх</code>, <code>Хүний тоо</code>, <code>Утас</code> гэж нэрлэнэ.
                </li>
                <li>
                  <strong className="font-medium text-neutral-800">Apps Script нээх:</strong> Цэснээс <em>Өргөтгөл (Extensions) &rarr; Apps Script</em> сонгоод доорх 7 мөр кодыг хуулж тавина:
                  <pre className="mt-1.5 p-2.5 bg-neutral-900 text-emerald-300 text-[10px] rounded-lg overflow-x-auto font-mono">
{`function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var d = JSON.parse(e.postData.contents);
  sheet.appendRow([d.date, d.name, d.attending, d.guestCount, d.phone]);
  return ContentService.createTextOutput("OK");
}`}
                  </pre>
                </li>
                <li>
                  <strong className="font-medium text-neutral-800">Deploy хийх:</strong> Баруун дээд талын <em>Deploy &rarr; New deployment</em> дараад:
                  <br />- Төрөл: <strong>Web app</strong>
                  <br />- Who has access: <strong>Anyone</strong> гэж сонгоод Deploy дарж гаргаж авсан <code>https://script.google.com/macros/s/.../exec</code> холбоосоо дээрх талбарт хуулна.
                </li>
              </ol>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}

