import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import {
  Sun,
  Moon,
  Globe,
  Bell,
  Volume2,
  Lock,
  Compass,
  Shield,
  Trash2,
  Info,
  ChevronRight,
  Sparkles,
  Check,
} from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const { theme, toggleTheme, language, setLanguage, showToast } = useApp();

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [panchangAlerts, setPanchangAlerts] = useState(true);
  const [nearbyAlerts, setNearbyAlerts] = useState(true);
  const [biometricLock, setBiometricLock] = useState(false);
  const [showLangModal, setShowLangModal] = useState(false);

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  ];

  const handleClearCache = () => {
    localStorage.clear();
    showToast('Offline cache cleared successfully');
  };

  return (
    <div className="min-h-full pb-24 bg-[#faf8f5] dark:bg-[#0c0a09] select-none">
      <Header title="Settings" showBack={true} />

      <div className="p-4 space-y-4">
        {/* Appearance & Sound Section */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-stone-400 px-2 tracking-wider">
            Appearance & Audio
          </span>
          <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-2xs overflow-hidden divide-y divide-stone-100 dark:divide-stone-800">
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between p-3.5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500">
                  {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block">
                    Dark Theme
                  </span>
                  <span className="text-[10px] text-stone-400">
                    Spiritual Twilight Night Mode
                  </span>
                </div>
              </div>

              <button
                onClick={toggleTheme}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  theme === 'dark' ? 'bg-orange-500 justify-end' : 'bg-stone-300 dark:bg-stone-700 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            {/* Sacred Temple Bells & Sound */}
            <div className="flex items-center justify-between p-3.5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-500">
                  <Volume2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block">
                    Sacred Chants & Bells
                  </span>
                  <span className="text-[10px] text-stone-400">
                    Play audio feedback on booking confirmations
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSoundEnabled(!soundEnabled);
                  showToast(soundEnabled ? 'Sacred sound disabled' : 'Sacred sound enabled 🔔');
                }}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  soundEnabled ? 'bg-orange-500 justify-end' : 'bg-stone-300 dark:bg-stone-700 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>
          </div>
        </div>

        {/* Language & Regional Section */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-stone-400 px-2 tracking-wider">
            Language & Region
          </span>
          <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-2xs overflow-hidden">
            <button
              onClick={() => setShowLangModal(true)}
              className="w-full flex items-center justify-between p-3.5 hover:bg-stone-50 dark:hover:bg-stone-850 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                  <Globe className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block">
                    App Language
                  </span>
                  <span className="text-[10px] text-stone-400">
                    Currently selected: {language}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-orange-500">{language}</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </div>
            </button>
          </div>
        </div>

        {/* Spiritual Alerts & Panchang */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-stone-400 px-2 tracking-wider">
            Spiritual Alerts
          </span>
          <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-2xs overflow-hidden divide-y divide-stone-100 dark:divide-stone-800">
            <div className="flex items-center justify-between p-3.5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                  <Bell className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block">
                    Daily Panchangam & Tithi
                  </span>
                  <span className="text-[10px] text-stone-400">
                    Auspicious Muhurat & Ekadashi reminders
                  </span>
                </div>
              </div>

              <button
                onClick={() => setPanchangAlerts(!panchangAlerts)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  panchangAlerts ? 'bg-orange-500 justify-end' : 'bg-stone-300 dark:bg-stone-700 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                  <Compass className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block">
                    Nearby Temple Discovery
                  </span>
                  <span className="text-[10px] text-stone-400">
                    Notify when travelling near famous shrines
                  </span>
                </div>
              </div>

              <button
                onClick={() => setNearbyAlerts(!nearbyAlerts)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  nearbyAlerts ? 'bg-orange-500 justify-end' : 'bg-stone-300 dark:bg-stone-700 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>
          </div>
        </div>

        {/* Security & Maintenance */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-stone-400 px-2 tracking-wider">
            System & Storage
          </span>
          <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-2xs overflow-hidden divide-y divide-stone-100 dark:divide-stone-800">
            <button
              onClick={handleClearCache}
              className="w-full flex items-center justify-between p-3.5 hover:bg-stone-50 dark:hover:bg-stone-850 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                  <Trash2 className="w-4 h-4 text-rose-500" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block">
                    Clear Offline Cache
                  </span>
                  <span className="text-[10px] text-stone-400">Free up local storage</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>
          </div>
        </div>

        {/* App Version Info */}
        <div className="text-center pt-2 pb-6">
          <div className="flex items-center justify-center gap-1.5 text-xs font-extrabold text-orange-500">
            <span>🕉️</span>
            <span>DivyaYatra v2.4.1</span>
          </div>
          <p className="text-[10px] text-stone-400 mt-0.5">
            Every Pilgrimage, Divinely Simplified.
          </p>
        </div>
      </div>

      {/* Language Modal */}
      {showLangModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-stone-900 rounded-3xl p-5 shadow-2xl border border-stone-200 dark:border-stone-800">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-3">
              Select Sacred Language
            </h3>
            <div className="space-y-1.5 max-h-72 overflow-y-auto no-scrollbar">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLanguage(l.name);
                    setShowLangModal(false);
                    showToast(`Language set to ${l.name} (${l.native})`);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all ${
                    language === l.name
                      ? 'bg-orange-500 text-white font-bold'
                      : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <div className="text-left">
                    <div className="text-xs font-bold">{l.name}</div>
                    <div className={`text-[10px] ${language === l.name ? 'text-white/80' : 'text-stone-400'}`}>
                      {l.native}
                    </div>
                  </div>
                  {language === l.name && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
