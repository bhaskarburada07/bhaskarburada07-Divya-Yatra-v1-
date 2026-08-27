import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { Globe, Phone, Mail, Sparkles, Check, ArrowRight, ShieldCheck, X } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { login, language, setLanguage, showToast } = useApp();
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otpValues, setOtpValues] = useState(['4', '8', '1', '9']);
  const [emailInput, setEmailInput] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);

  const languages = ['English', 'हिंदी', 'తెలుగు', 'தமிழ்', 'ಕನ್ನಡ', 'मराठी'];
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      showToast('Please enter a valid 10-digit mobile number');
      return;
    }
    setShowOtpDialog(true);
    showToast('OTP sent to +91 ' + phoneNumber);
  };

  const handleVerifyOtp = () => {
    login(`+91 ${phoneNumber}`);
    setShowOtpDialog(false);
  };

  const handleGoogleLogin = () => {
    showToast('Signing in with Google...');
    setTimeout(() => {
      login('bhaskarburada141@gmail.com');
    }, 600);
  };

  const handleGuestLogin = () => {
    login('+91 98765 43210');
  };

  return (
    <div className="min-h-full flex flex-col justify-between bg-[#faf8f5] dark:bg-[#0c0a09] p-5 relative select-none">
      {/* Top Bar with Language Selector */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-1.5 font-extrabold text-orange-600 dark:text-orange-400">
          <span className="text-xl">🕉️</span>
          <span className="text-sm tracking-tight">DivyaYatra</span>
        </div>

        {/* Language selector pill */}
        <div className="relative">
          <button
            onClick={() => setShowLangDropdown(!showLangDropdown)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-medium text-stone-700 dark:text-stone-300 shadow-2xs hover:bg-stone-50"
          >
            <Globe className="w-3.5 h-3.5 text-orange-500" />
            <span>{language}</span>
            <span className="text-[10px] text-stone-400">▼</span>
          </button>

          {showLangDropdown && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setShowLangDropdown(false)}
              />
              <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-xl z-30 py-1 overflow-hidden">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setShowLangDropdown(false);
                      showToast(`Language set to ${lang}`);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                      language === lang
                        ? 'bg-orange-50 dark:bg-orange-950/60 text-orange-600 font-bold'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="my-auto py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white shadow-lg shadow-orange-500/20 mb-4">
            <span className="text-3xl">🪔</span>
          </div>
          <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
            Welcome to <span className="text-orange-500">DivyaYatra</span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Begin your spiritual journey across India's sacred shrines
          </p>
        </div>

        {/* Mobile Input Form */}
        <form onSubmit={handleSendOtp} className="space-y-3.5">
          <div className="flex items-center rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-1.5 shadow-xs focus-within:ring-2 focus-within:ring-orange-500/30 focus-within:border-orange-500 transition-all">
            <div className="flex items-center gap-1 px-3 py-2 border-r border-stone-200 dark:border-stone-800 text-xs font-bold text-stone-700 dark:text-stone-300">
              <span className="text-sm">🇮🇳</span>
              <span>+91</span>
            </div>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="Enter Mobile Number"
              className="flex-1 bg-transparent px-3 py-2 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 outline-none font-medium"
              required
            />
          </div>

          <PrimaryButton type="submit" size="md">
            Continue with OTP
          </PrimaryButton>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-200 dark:border-stone-800" />
          </div>
          <span className="relative bg-[#faf8f5] dark:bg-[#0c0a09] px-3 text-[11px] font-medium text-stone-400">
            or continue with
          </span>
        </div>

        {/* Secondary Login Options */}
        <div className="space-y-2.5">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-850 text-stone-700 dark:text-stone-200 text-xs font-semibold shadow-2xs transition-all active:scale-[0.99]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <button
            onClick={() => setShowEmailModal(true)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-850 text-stone-700 dark:text-stone-200 text-xs font-semibold shadow-2xs transition-all active:scale-[0.99]"
          >
            <Mail className="w-4 h-4 text-orange-500" />
            <span>Continue with Email</span>
          </button>

          <button
            onClick={handleGuestLogin}
            className="w-full py-2.5 text-xs text-orange-600 dark:text-orange-400 font-bold hover:underline transition-all"
          >
            Continue as Guest →
          </button>
        </div>
      </div>

      {/* Footer Notice */}
      <div className="text-center text-[10px] text-stone-400 dark:text-stone-500 leading-relaxed px-2">
        By continuing, you agree to DivyaYatra's{' '}
        <span className="text-orange-500 underline cursor-pointer">Terms & Conditions</span> and{' '}
        <span className="text-orange-500 underline cursor-pointer">Privacy Policy</span>.
      </div>

      {/* OTP Verification Modal */}
      {showOtpDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-stone-900 rounded-3xl p-6 shadow-2xl border border-stone-200 dark:border-stone-800 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <button
                onClick={() => setShowOtpDialog(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Verify Mobile Number
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Enter the 4-digit divine OTP sent to <strong className="text-stone-700 dark:text-stone-300">+91 {phoneNumber}</strong>
            </p>

            <div className="flex justify-center gap-3 my-6">
              {otpValues.map((val, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={val}
                  onChange={(e) => {
                    const next = [...otpValues];
                    next[idx] = e.target.value;
                    setOtpValues(next);
                  }}
                  className="w-12 h-12 text-center text-lg font-extrabold rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none"
                />
              ))}
            </div>

            <PrimaryButton onClick={handleVerifyOtp} size="md">
              Verify & Enter DivyaYatra
            </PrimaryButton>

            <p className="text-center text-[11px] text-stone-400 mt-4">
              Didn't receive code?{' '}
              <button
                onClick={() => showToast('Resending OTP...')}
                className="text-orange-500 font-bold hover:underline"
              >
                Resend OTP
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Email Login Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-stone-900 rounded-3xl p-6 shadow-2xl border border-stone-200 dark:border-stone-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                Continue with Email
              </h3>
              <button
                onClick={() => setShowEmailModal(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <input
              type="email"
              placeholder="name@example.com"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm text-stone-900 dark:text-stone-100 outline-none mb-4 focus:border-orange-500"
            />
            <PrimaryButton
              onClick={() => {
                if (emailInput) {
                  login(emailInput);
                  setShowEmailModal(false);
                } else {
                  showToast('Please enter a valid email address');
                }
              }}
            >
              Sign In
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
};
