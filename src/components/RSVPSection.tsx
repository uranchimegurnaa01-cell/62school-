import { useState, FormEvent, useEffect } from 'react';
import { motion } from 'motion/react';
import { UserCheck, Minus, Plus, CheckCircle2, FileSpreadsheet, Settings, Loader2, Copy, Check, Sparkles, AlertCircle } from 'lucide-react';
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
  const [copiedCode, setCopiedCode] = useState(false);

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

  const copyAppsScriptCode = () => {
    const code = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Эхний мөр хоосон бол багануудын нэр үүсгэх
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Огноо", "Нэр", "Ирц", "Хүний тоо", "Утасны дугаар"]);
      sheet.getRange(1, 1, 1, 5).setFontWeight("bold").setBackground("#FEF3C7");
    }
    
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var rowDate = data.date || new Date().toLocaleString("mn-MN");
    var rowName = data.name || "Нэргүй";
    var rowAttending = (data.attending === true || data.attending === "Тийм, ирнэ" || data.attending === "Оролцоно") ? "Тийм, ирнэ" : "Очиж чадахгүй";
    var rowCount = data.guestCount !== undefined ? data.guestCount : 1;
    var rowPhone = data.phone ? "'" + data.phone : "";

    sheet.appendRow([rowDate, rowName, rowAttending, rowCount, rowPhone]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


}`;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
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
      const existing = localStorage.getItem('school_anniversary_rsvps');
      const rsvps: RSVPRecord[] = existing ? JSON.parse(existing) : [];
      rsvps.unshift(record);
      localStorage.setItem('school_anniversary_rsvps', JSON.stringify(rsvps));
    } catch {
      // ignore
    }

    // Automatically send to Google Sheets
    let sentToGoogle = false;
    try {
      sentToGoogle = await sendRSVPToGoogleSheet(record);
    } catch {
      sentToGoogle = false;
    }

    setIsSyncing(false);
    setSyncStatus(sentToGoogle ? 'synced' : 'saved_locally');
    setSubmitted(true);

    if (attending) {
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#FCD34D', '#10B981', '#FFFFFF'],
      });
    }
  };

  const isSheetConfigured = Boolean(getGoogleSheetUrl());

  return (
    <section id="rsvp-section" className="relative w-full bg-[#FAF6F0] text-neutral-800 py-16 sm:py-20 px-4 sm:px-8">
      <div className="max-w-md mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center gap-1.5 text-amber-700 mb-1">
            <UserCheck className="w-5 h-5 text-amber-600" />
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl text-neutral-900 font-bold">
            Ирцээ бүртгүүлэх
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-light mt-1">
            Ойн өдрөөс өмнө бүртгэлээ хийнэ үү
          </p>

          {/* Google Sheets Connection Button */}
          <div className="mt-3 flex justify-center">
            <button
              type="button"
              onClick={() => setShowConfigModal(true)}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all shadow-xs cursor-pointer ${
                isSheetConfigured
                  ? 'bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                  : 'bg-white border-2 border-amber-300 text-amber-950 hover:bg-amber-50'
              }`}
            >
              <FileSpreadsheet className={`w-4 h-4 ${isSheetConfigured ? 'text-emerald-600' : 'text-emerald-700'}`} />
              <span>
                {isSheetConfigured ? 'Google Sheet холбогдсон' : 'Google Sheet холбох заавар'}
              </span>
              <Settings className="w-3.5 h-3.5 text-amber-600 ml-0.5" />
            </button>
          </div>
        </motion.div>

        {/* RSVP Card - Luminous White with Golden Border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-6 shadow-xl border-2 border-amber-200"
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
              <h3 className="font-serif-title text-lg font-semibold text-neutral-900">
                Бүртгэл амжилттай баталгаажлаа!
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed max-w-xs mx-auto">
                {name} таны бүртгэлийг хүлээн авлаа.{' '}
                {attending
                  ? `Бид таныг (${guestCount} хүн) тэсэн ядан хүлээж байна!`
                  : 'Хүрэлцэн ирж чадахгүй ч сэтгэлээрээ хамт байгаад талархлаа.'}
              </p>

              {/* Status badge for Google Sheets sync */}
              {syncStatus === 'synced' ? (
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>Google Sheets хүснэгт рүү автоматаар нэмэгдлээ</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                  <span>Бүртгэл амжилттай хадгалагдлаа</span>
                </div>
              )}

              <div>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-xs text-amber-700 hover:text-amber-800 underline underline-offset-4 cursor-pointer font-medium"
                >
                  Мэдээлэл засах
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Input */}
              <div>
                <label htmlFor="rsvp-name" className="block text-xs font-medium text-neutral-700 mb-1.5 text-left">
                  Таны нэр
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Бүтэн нэрээ бичнэ үү"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
                />
              </div>

              {/* Phone Input */}
              <div>
                <label htmlFor="rsvp-phone" className="block text-xs font-medium text-neutral-700 mb-1.5 text-left">
                  Утасны дугаар
                </label>
                <input
                  id="rsvp-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Жишээ: 9911..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
                />
              </div>

              {/* Attendance Radio Buttons */}
              <div className="space-y-2 text-left">
                <span className="block text-xs font-medium text-neutral-700">
                  Та ирэх үү?
                </span>

                <div className="space-y-2">
                  <label
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                      attending
                        ? 'border-amber-400 bg-amber-50/80 text-neutral-900 font-semibold shadow-xs'
                        : 'border-neutral-200 bg-white text-neutral-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      checked={attending}
                      onChange={() => setAttending(true)}
                      className="accent-amber-600 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm">Тийм, заавал ирнэ</span>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                      !attending
                        ? 'border-amber-400 bg-amber-50/80 text-neutral-900 font-semibold shadow-xs'
                        : 'border-neutral-200 bg-white text-neutral-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      checked={!attending}
                      onChange={() => setAttending(false)}
                      className="accent-amber-600 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm">Харамсалтай нь очиж чадахгүй</span>
                  </label>
                </div>
              </div>

              {/* Guest Count Stepper */}
              {attending && (
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-medium text-neutral-700">
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
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-105 text-amber-950 font-bold text-sm sm:text-base shadow-md cursor-pointer hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-75"
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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 text-left max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-800">
                    Google Sheets холболт тохируулах
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                   
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowConfigModal(false)}
                className="text-neutral-400 hover:text-neutral-600 text-sm p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSheetUrl} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Таны Google Web App URL (холбоос):
                </label>
                <input
                  type="url"
                  value={sheetUrlInput}
                  onChange={(e) => setSheetUrlInput(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/1SGV0N9-4wap0nxDI4lf3agvaikq34qcDrmknp_5JjIw/edit?gid=0#gid=0"
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 bg-neutral-50 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                />
                <p className="text-[10px] text-neutral-500 mt-1">
                  Энэ холбоосоо оруулаад <b>"Хадгалах"</b> дарснаар зочдын бүртгүүлсэн нэр, утас шууд таны хүснэгтэд орно.
                </p>
              </div>

              {/* Warning on common mistakes */}
              <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 text-xs text-amber-900 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-amber-950">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Бичигдэхгүй байх 3 түгээмэл шалтгаан:</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-amber-800 pl-1">
                  <li>
                    <b>Who has access:</b> заавал <b>Anyone</b> (Хүн бүр) байх ёстой (Only myself байвал хориглодог).
                  </li>
                  <li>
                    <b>Шинэчилсэн хувилбар:</b> Кодоо сольсны дараа <b>Deploy &gt; Manage deployments</b> орж харандааны дүрс дээр дарж <b>Version: New version</b> болгож хадгалах хэрэгтэй.
                  </li>
                  <li>
                    Холбоос нь <b>/exec</b> гэж төгссөн байх ёстой (<b>/edit</b> биш).
                  </li>
                </ul>
              </div>

              {/* Easy 3-Step Setup Guide */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Apps Script код (Шинэчилсэн)</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyAppsScriptCode}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-[11px] font-semibold text-slate-800 hover:bg-slate-100 transition-colors shadow-xs cursor-pointer"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Код хуулагдлаа</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-amber-700" />
                        <span>Код хуулах</span>
                      </>
                    )}
                  </button>
                </div>

                <ol className="list-decimal list-inside space-y-1.5 text-[11px] leading-relaxed text-slate-700 pl-1">
                  <li>
                    Google Sheet-ийнхээ <b>Extensions &gt; Apps Script</b> руу орно.
                  </li>
                  <li>
                    Дээрх <b>"Код хуулах"</b> товчийг дарж, шинэчилсэн кодоо хуулаад <b>Save (Ctrl+S)</b> дарна.
                  </li>
                  <li>
                    <b>Deploy &gt; Manage deployments</b> (эсвэл New deployment) дарж, <b>Who has access: Anyone</b> байгааг шалгаад Save хийнэ.
                  </li>
                  <li>
                    Гарч ирсэн <b>Web app URL</b>-аа хуулж дээрх нүдэнд тавина.
                  </li>
                </ol>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowConfigModal(false)}
                  className="px-3.5 py-2 rounded-xl text-xs text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                >
                  Болих
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-105 text-white font-bold text-xs shadow-md cursor-pointer transition"
                >
                  {isUrlSaved ? 'Хадгалагдлаа!' : 'Холбоосыг хадгалах'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
}
