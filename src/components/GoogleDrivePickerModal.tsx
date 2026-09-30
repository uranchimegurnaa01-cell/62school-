import { useState, useEffect, FormEvent, ChangeEvent, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Search,
  Loader2,
  Upload,
  Link as LinkIcon,
  RotateCcw,
  CheckCircle2,
  FolderOpen,
  LogOut,
  RefreshCw,
  HardDrive,
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  googleSignIn,
  logoutGoogle,
  initAuth,
  getAccessToken,
} from '../services/googleAuth';
import {
  listDriveImages,
  getDirectDriveImageUrl,
  DriveFile,
} from '../services/googleDriveService';

interface GoogleDrivePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  slideTitle: string;
  currentHasCustomImage: boolean;
  onSelectImageUrl: (url: string) => void;
  onUploadFile: (file: File) => void;
  onResetImage: () => void;
}

type TabType = 'drive' | 'link' | 'upload';

export default function GoogleDrivePickerModal({
  isOpen,
  onClose,
  slideTitle,
  currentHasCustomImage,
  onSelectImageUrl,
  onUploadFile,
  onResetImage,
}: GoogleDrivePickerModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('drive');
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Drive browser state
  const [driveFiles, setDriveFiles] = useState<DriveFile[]>([]);
  const [isLoadingDrive, setIsLoadingDrive] = useState(false);
  const [driveError, setDriveError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  // Link tab state
  const [inputUrl, setInputUrl] = useState('');

  // Hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch Drive photos when user is authenticated and modal is open
  useEffect(() => {
    if (isOpen && accessToken && activeTab === 'drive') {
      fetchDriveFiles(accessToken, searchQuery);
    }
  }, [isOpen, accessToken, activeTab]);

  const fetchDriveFiles = async (token: string, search = '') => {
    setIsLoadingDrive(true);
    setDriveError(null);
    try {
      const result = await listDriveImages(token, search);
      setDriveFiles(result.files || []);
    } catch (err: any) {
      console.error('Failed to load drive images:', err);
      setDriveError(err.message || 'Google Drive-аас зураг татахад алдаа гарлаа');
    } finally {
      setIsLoadingDrive(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSigningIn(true);
    setDriveError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
        await fetchDriveFiles(result.accessToken, searchQuery);
      }
    } catch (err: any) {
      setDriveError(err.message || 'Google-ээр нэвтрэхэд алдаа гарлаа.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleGoogleLogout = async () => {
    await logoutGoogle();
    setUser(null);
    setAccessToken(null);
    setDriveFiles([]);
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (accessToken) {
      fetchDriveFiles(accessToken, searchQuery);
    }
  };

  const handleSelectDrivePhoto = (file: DriveFile) => {
    setSelectedFileId(file.id);
    const directUrl = getDirectDriveImageUrl(file.id);
    onSelectImageUrl(directUrl);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleSaveUrlSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    onSelectImageUrl(inputUrl.trim());
    setInputUrl('');
    onClose();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadFile(file);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border-2 border-red-200 text-left flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-red-100 shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-red-100 text-red-700">
                  <HardDrive className="w-5 h-5 text-red-700" />
                </div>
                <h3 className="font-serif-title text-base sm:text-lg font-bold text-neutral-900">
                  Зураг сонгох / оруулах
                </h3>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5">
                Слайд: <strong className="text-neutral-800">{slideTitle}</strong>
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl my-3 shrink-0 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('drive')}
              className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
                activeTab === 'drive'
                  ? 'bg-white text-red-800 shadow-xs font-bold'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <HardDrive className="w-3.5 h-3.5 text-red-600" />
              <span>Google Drive</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('link')}
              className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
                activeTab === 'link'
                  ? 'bg-white text-red-800 shadow-xs font-bold'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5 text-red-600" />
              <span>Линк буулгах</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
                activeTab === 'upload'
                  ? 'bg-white text-red-800 shadow-xs font-bold'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Upload className="w-3.5 h-3.5 text-red-600" />
              <span>Файл оруулах</span>
            </button>
          </div>

          {/* Tab 1: Google Drive Integration */}
          {activeTab === 'drive' && (
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              {!user ? (
                // Sign in with Google Prompt
                <div className="py-8 px-4 flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-3 text-red-600 shadow-inner">
                    <FolderOpen className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif-title text-base font-bold text-neutral-900 mb-1">
                    Google Drive-аас зураг сонгох
                  </h4>
                  <p className="text-xs text-neutral-500 max-w-xs mb-5">
                    Өөрийн Google Drive дансанд хадгалагдсан 62-р сургуулийн дурсамж, ойн гэрэл зургуудыг шууд сонгон оруулаарай.
                  </p>

                  {/* Standard Sign in with Google Button */}
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isSigningIn}
                    className="inline-flex items-center justify-center gap-3 px-5 py-2.5 rounded-full border border-neutral-300 bg-white hover:bg-neutral-50 active:bg-neutral-100 shadow-md text-xs sm:text-sm font-medium text-neutral-700 transition cursor-pointer disabled:opacity-50"
                  >
                    {isSigningIn ? (
                      <Loader2 className="w-5 h-5 animate-spin text-red-600" />
                    ) : (
                      <svg className="w-5 h-5" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                      </svg>
                    )}
                    <span>{isSigningIn ? 'Google-ээр нэвтэрч байна...' : 'Sign in with Google'}</span>
                  </button>

                  {driveError && (
                    <p className="text-xs text-rose-600 mt-3 max-w-xs">{driveError}</p>
                  )}
                </div>
              ) : (
                // Authenticated Google Drive Photo Browser
                <div className="flex-1 flex flex-col min-h-0">
                  {/* User Profile Bar & Refresh */}
                  <div className="flex items-center justify-between py-1.5 px-2 bg-red-50/60 rounded-xl mb-2.5 text-xs border border-red-100 shrink-0">
                    <div className="flex items-center gap-2 overflow-hidden">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || 'Google хэрэглэгч'}
                          className="w-6 h-6 rounded-full border border-red-300"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-red-700 text-white flex items-center justify-center font-bold text-[10px]">
                          {user.email?.[0]?.toUpperCase()}
                        </div>
                      )}
                      <span className="truncate font-semibold text-neutral-800">
                        {user.displayName || user.email}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => accessToken && fetchDriveFiles(accessToken, searchQuery)}
                        title="Зургуудыг дахин ачаалах"
                        className="p-1 rounded-lg hover:bg-white text-neutral-600 transition cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleGoogleLogout}
                        title="Данснаас гарах"
                        className="p-1 rounded-lg hover:bg-white text-neutral-600 hover:text-red-700 transition cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <form onSubmit={handleSearchSubmit} className="flex gap-1.5 mb-2.5 shrink-0">
                    <div className="relative flex-1">
                      <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-neutral-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Drive-аас зургийн нэрээр хайх..."
                        className="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-red-500 bg-neutral-50/50"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      Хайх
                    </button>
                  </form>

                  {/* Photos Grid Container */}
                  <div className="flex-1 overflow-y-auto pr-1">
                    {isLoadingDrive ? (
                      <div className="h-44 flex flex-col items-center justify-center text-center text-xs text-neutral-500">
                        <Loader2 className="w-6 h-6 animate-spin text-red-600 mb-2" />
                        <span>Google Drive-аас зургуудыг ачаалж байна...</span>
                      </div>
                    ) : driveError ? (
                      <div className="py-6 px-3 text-center text-xs text-rose-600">
                        <p>{driveError}</p>
                        <button
                          type="button"
                          onClick={() => accessToken && fetchDriveFiles(accessToken, searchQuery)}
                          className="mt-2 text-xs font-semibold underline text-red-800 cursor-pointer"
                        >
                          Дахин оролдох
                        </button>
                      </div>
                    ) : driveFiles.length === 0 ? (
                      <div className="py-8 px-4 text-center text-xs text-neutral-500">
                        <p className="font-semibold text-neutral-700 mb-1">
                          Зураг олдсонгүй
                        </p>
                        <p>Google Drive дотроос зургийн файл олдсонгүй. Дээрх линк буулгах эсвэл файл оруулах хэсгийг ашиглаж болно.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-2 pb-2">
                        {driveFiles.map((file) => {
                          const isSelected = selectedFileId === file.id;
                          return (
                            <button
                              key={file.id}
                              type="button"
                              onClick={() => handleSelectDrivePhoto(file)}
                              className={`group relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer text-left bg-neutral-100 ${
                                isSelected
                                  ? 'border-red-600 ring-2 ring-red-400'
                                  : 'border-neutral-200 hover:border-red-400 hover:shadow-md'
                              }`}
                            >
                              <img
                                src={file.thumbnailLink || getDirectDriveImageUrl(file.id)}
                                alt={file.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                referrerPolicy="no-referrer"
                                loading="lazy"
                              />
                              <div className="absolute inset-x-0 bottom-0 p-1 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                <p className="text-[10px] text-white font-medium truncate">
                                  {file.name}
                                </p>
                              </div>
                              {isSelected && (
                                <div className="absolute top-1.5 right-1.5 text-white bg-red-600 rounded-full p-0.5 shadow-md">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Paste Copied Link */}
          {activeTab === 'link' && (
            <div className="py-2">
              <form onSubmit={handleSaveUrlSubmit} className="space-y-3">
                <label className="block text-xs font-bold text-neutral-800">
                  Хуулсан Google Drive эсвэл зургийн линк буулгах:
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-neutral-400">
                    <LinkIcon className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="url"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="https://drive.google.com/file/d/.../view"
                    className="w-full pl-8 pr-2.5 py-2.5 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-red-400 bg-neutral-50/50"
                  />
                </div>
                <p className="text-[11px] text-neutral-500">
                  Та Google Drive-аас хуулсан дурын холбоос (share link)-ийг оруулж болно.
                </p>
                <button
                  type="submit"
                  disabled={!inputUrl.trim()}
                  className="w-full py-2.5 bg-red-700 hover:bg-red-800 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow-sm transition cursor-pointer"
                >
                  Зургийг оруулах
                </button>
              </form>
            </div>
          )}

          {/* Tab 3: Upload File from Device */}
          {activeTab === 'upload' && (
            <div className="py-4 text-center">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-6 rounded-2xl border-2 border-dashed border-red-300 bg-red-50/40 hover:bg-red-100/40 cursor-pointer transition flex flex-col items-center justify-center"
              >
                <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center mb-2 shadow-xs">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-neutral-800 mb-1">
                  Утас эсвэл компьютерээс зураг сонгох
                </p>
                <p className="text-[11px] text-neutral-500">
                  PNG, JPG, JPEG зургийн файлууд
                </p>
              </div>
            </div>
          )}

          {/* Reset custom image button if user previously set custom image */}
          {currentHasCustomImage && (
            <div className="pt-3 border-t border-neutral-100 mt-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  onResetImage();
                  onClose();
                }}
                className="w-full py-1.5 text-xs text-neutral-500 hover:text-red-700 flex items-center justify-center gap-1.5 transition cursor-pointer font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Энэ слайдын анхны зураг руу буцаах</span>
              </button>
            </div>
          )}

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
