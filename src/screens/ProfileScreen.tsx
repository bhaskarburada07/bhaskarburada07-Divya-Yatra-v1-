import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { PrimaryButton } from '../components/common/PrimaryButton';
import {
  User,
  Phone,
  Mail,
  ShieldCheck,
  Heart,
  Wallet,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Sparkles,
  Camera,
  CheckCircle2,
  X,
  CreditCard,
  Calendar,
  ReceiptText,
  Moon,
  Sun,
  Globe,
  Lock,
  FileText,
  Info,
  Headphones,
  Upload,
  Trash2,
  ArrowUpRight,
  ArrowDownLeft,
  Coins,
  MapPin,
  Star,
  Clock,
  MessageCircle,
} from 'lucide-react';
import { Temple } from '../types';

export const ProfileScreen: React.FC = () => {
  const {
    userProfile,
    updateUserProfile,
    logout,
    navigateTo,
    wishlist,
    toggleWishlist,
    temples,
    myTrips,
    showToast,
    setCurrentBooking,
    theme,
    toggleTheme,
    language,
    setLanguage,
    divyaCoins,
    walletTransactions,
    startNewBooking,
    unreadNotificationsCount,
  } = useApp();

  // Modals state
  const [isEditing, setIsEditing] = useState(false);
  const [showPaymentsModal, setShowPaymentsModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Edit Profile Form State
  const [editName, setEditName] = useState(userProfile.name);
  const [editEmail, setEditEmail] = useState(userProfile.email);
  const [editPhone, setEditPhone] = useState(userProfile.phone);
  const [editAvatar, setEditAvatar] = useState(userProfile.avatar);
  const [editGotra, setEditGotra] = useState(userProfile.gotra || '');
  const [editRashi, setEditRashi] = useState(userProfile.rashi || '');
  const [editDob, setEditDob] = useState(userProfile.dob || '1992-06-15');
  const [editGender, setEditGender] = useState(userProfile.gender || 'Male');
  const [editIdProof, setEditIdProof] = useState(userProfile.idProof || 'Aadhaar (XXXX-XXXX-4819)');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper for Initials Avatar
  const getInitials = (name: string) => {
    if (!name) return 'DY';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const handleOpenEdit = () => {
    setEditName(userProfile.name);
    setEditEmail(userProfile.email);
    setEditPhone(userProfile.phone);
    setEditAvatar(userProfile.avatar);
    setEditGotra(userProfile.gotra || '');
    setEditRashi(userProfile.rashi || '');
    setEditDob(userProfile.dob || '1992-06-15');
    setEditGender(userProfile.gender || 'Male');
    setEditIdProof(userProfile.idProof || 'Aadhaar (XXXX-XXXX-4819)');
    setIsEditing(true);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        showToast('Image size should be less than 3MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setEditAvatar(result);
          showToast('Profile photo selected');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    if (!editName.trim()) {
      showToast('Please enter your name');
      return;
    }
    updateUserProfile({
      name: editName.trim(),
      email: editEmail.trim(),
      phone: editPhone.trim(),
      avatar: editAvatar,
      gotra: editGotra.trim(),
      rashi: editRashi.trim(),
      dob: editDob,
      gender: editGender,
      idProof: editIdProof.trim(),
    });
    setIsEditing(false);
    showToast('Profile updated successfully! 🪔');
  };

  // Saved favorite temples
  const favoriteTemples = temples.filter((t) => wishlist.includes(t.id));
  const activeTripsCount = myTrips.filter((t) => t.status === 'confirmed' || t.status === 'upcoming').length;

  const languagesList = [
    { code: 'English', native: 'English', sub: 'Default' },
    { code: 'Hindi', native: 'हिन्दी', sub: 'Hindi' },
    { code: 'Telugu', native: 'తెలుగు', sub: 'Telugu' },
    { code: 'Tamil', native: 'தமிழ்', sub: 'Tamil' },
    { code: 'Kannada', native: 'ಕನ್ನಡ', sub: 'Kannada' },
    { code: 'Marathi', native: 'मराठी', sub: 'Marathi' },
    { code: 'Gujarati', native: 'ગુજરાતી', sub: 'Gujarati' },
    { code: 'Bengali', native: 'বাংলা', sub: 'Bengali' },
  ];

  return (
    <div className="min-h-full pb-28 bg-[#faf8f5] dark:bg-[#0c0a09] select-none">
      <Header
        title="Profile"
        showBack={false}
        rightElement={
          <button
            onClick={handleOpenEdit}
            className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 px-2 py-1 active:scale-95 transition-transform"
          >
            Edit
          </button>
        }
      />

      <div className="p-4 space-y-4 max-w-md mx-auto">
        {/* 1. TOP PROFILE HEADER & USER INFO */}
        <div className="p-4.5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-2xs">
          <div className="flex items-center gap-3.5">
            {/* Avatar with dynamic initials fallback */}
            <div className="relative group shrink-0">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange-500/90 dark:border-orange-500/80 shadow-sm flex items-center justify-center bg-gradient-to-br from-orange-400 to-amber-500 text-white font-extrabold text-xl tracking-wider">
                {userProfile.avatar ? (
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span>{getInitials(userProfile.name)}</span>
                )}
              </div>
              <button
                onClick={handleOpenEdit}
                className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-white dark:bg-stone-800 text-orange-600 dark:text-orange-400 border border-stone-200 dark:border-stone-700 shadow-xs hover:scale-110 active:scale-95 transition-transform"
                title="Change Photo"
              >
                <Camera className="w-3 h-3" />
              </button>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-extrabold text-stone-900 dark:text-stone-100 truncate">
                  {userProfile.name}
                </h2>
                <span
                  className="inline-flex items-center justify-center p-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 shrink-0"
                  title="Aadhaar Verified Pilgrim"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 truncate mt-0.5 flex items-center gap-1">
                <Phone className="w-3 h-3 text-orange-500/80 shrink-0" />
                <span>{userProfile.phone || '+91 98765 43210'}</span>
              </p>
              <p className="text-[11px] text-stone-400 dark:text-stone-500 truncate flex items-center gap-1 mt-0.5">
                <Mail className="w-3 h-3 text-orange-500/80 shrink-0" />
                <span>{userProfile.email || 'bhaskarburada141@gmail.com'}</span>
              </p>
            </div>
          </div>

          {/* Devotee Astrological & Gotra Pill Highlights */}
          <div className="mt-3.5 pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center gap-1.5 text-[10px]">
            <span className="px-2 py-0.5 rounded-full bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 font-semibold border border-orange-200/50 dark:border-orange-900/40">
              🪔 {userProfile.gotra || 'Kashyapa Gotra'}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-semibold border border-amber-200/50 dark:border-amber-900/40">
              ✨ {userProfile.rashi || 'Dhanu Rashi'}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-medium">
              🆔 {userProfile.idProof || 'Aadhaar Verified'}
            </span>
          </div>

          {/* 3. DYNAMIC PROFILE STATISTICS (Yatras Booked, Favorites, Divya Coins) */}
          <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3 border-t border-stone-100 dark:border-stone-800 text-center">
            {/* Yatras Booked */}
            <button
              onClick={() => navigateTo('my-trips')}
              className="p-2.5 rounded-2xl bg-orange-50/70 dark:bg-orange-950/30 hover:bg-orange-100/70 dark:hover:bg-orange-900/40 transition-colors border border-orange-100 dark:border-orange-900/30 active:scale-98 text-left"
            >
              <span className="text-base font-extrabold text-orange-600 dark:text-orange-400 block leading-tight">
                {myTrips.length}
              </span>
              <span className="text-[10px] text-stone-600 dark:text-stone-400 font-medium block mt-0.5">
                Yatras Booked
              </span>
            </button>

            {/* Favorites */}
            <button
              onClick={() => setShowWishlistModal(true)}
              className="p-2.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 hover:bg-amber-100/70 dark:hover:bg-amber-900/40 transition-colors border border-amber-100 dark:border-amber-900/30 active:scale-98 text-left"
            >
              <span className="text-base font-extrabold text-amber-600 dark:text-amber-400 block leading-tight">
                {wishlist.length}
              </span>
              <span className="text-[10px] text-stone-600 dark:text-stone-400 font-medium block mt-0.5">
                Favorites
              </span>
            </button>

            {/* Divya Coins */}
            <button
              onClick={() => setShowWalletModal(true)}
              className="p-2.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 hover:bg-emerald-100/70 dark:hover:bg-emerald-900/40 transition-colors border border-emerald-100 dark:border-emerald-900/30 active:scale-98 text-left"
            >
              <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 block leading-tight">
                ₹{divyaCoins}
              </span>
              <span className="text-[10px] text-stone-600 dark:text-stone-400 font-medium block mt-0.5">
                Divya Coins
              </span>
            </button>
          </div>
        </div>

        {/* 4, 5, 6, 7. PILGRIMAGE & ACCOUNTS MENU GROUP */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-stone-400 dark:text-stone-500 px-2 tracking-wider">
            Pilgrimage & Accounts
          </span>
          <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-2xs overflow-hidden divide-y divide-stone-100 dark:divide-stone-800">
            {/* My Bookings & E-Passes */}
            <button
              onClick={() => navigateTo('my-trips')}
              className="w-full flex items-center justify-between p-3.5 hover:bg-stone-50 dark:hover:bg-stone-850 transition-colors text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 block">
                    My Bookings & E-Passes
                  </span>
                  <span className="text-[10px] text-stone-400">View confirmed darshan tokens & tickets</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {activeTripsCount > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    {activeTripsCount} Active
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>

            {/* My Payments & Transactions */}
            <button
              onClick={() => setShowPaymentsModal(true)}
              className="w-full flex items-center justify-between p-3.5 hover:bg-stone-50 dark:hover:bg-stone-850 transition-colors text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                  <ReceiptText className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 block">
                    My Payments & Transactions
                  </span>
                  <span className="text-[10px] text-stone-400">Receipts, refunds & transaction logs</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                  {myTrips.length} {myTrips.length === 1 ? 'Order' : 'Orders'}
                </span>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>

            {/* Saved & Favorite Temples */}
            <button
              onClick={() => setShowWishlistModal(true)}
              className="w-full flex items-center justify-between p-3.5 hover:bg-stone-50 dark:hover:bg-stone-850 transition-colors text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 block">
                    Saved & Favorite Temples
                  </span>
                  <span className="text-[10px] text-stone-400">Bookmarked shrines for future yatras</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                  {wishlist.length} {wishlist.length === 1 ? 'Temple' : 'Temples'}
                </span>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>

            {/* Divya Wallet & Rewards */}
            <button
              onClick={() => setShowWalletModal(true)}
              className="w-full flex items-center justify-between p-3.5 hover:bg-stone-50 dark:hover:bg-stone-850 transition-colors text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                  <Wallet className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 block">
                    Divya Wallet & Rewards
                  </span>
                  <span className="text-[10px] text-stone-400">Redeem coins on temple bookings</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  ₹{divyaCoins}
                </span>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* 8. PREFERENCES & SYSTEM SECTION */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-stone-400 dark:text-stone-500 px-2 tracking-wider">
            Preferences & System
          </span>
          <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-2xs overflow-hidden divide-y divide-stone-100 dark:divide-stone-800">
            {/* Language */}
            <button
              onClick={() => setShowLanguageModal(true)}
              className="w-full flex items-center justify-between p-3.5 hover:bg-stone-50 dark:hover:bg-stone-850 transition-colors text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 block">
                    Language
                  </span>
                  <span className="text-[10px] text-stone-400">App interface language</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                  {language}
                </span>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>

            {/* Dark Mode Toggle */}
            <div className="w-full flex items-center justify-between p-3.5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                  {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </div>
                <div>
                  <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 block">
                    Dark Mode
                  </span>
                  <span className="text-[10px] text-stone-400">
                    {theme === 'dark' ? 'Night atmosphere enabled' : 'Clean daylight theme'}
                  </span>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  theme === 'dark' ? 'bg-orange-500' : 'bg-stone-300 dark:bg-stone-700'
                }`}
                role="switch"
                aria-checked={theme === 'dark'}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Notifications */}
            <button
              onClick={() => navigateTo('notifications')}
              className="w-full flex items-center justify-between p-3.5 hover:bg-stone-50 dark:hover:bg-stone-850 transition-colors text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 block">
                    Notifications
                  </span>
                  <span className="text-[10px] text-stone-400">Darshan alerts & festival reminders</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {unreadNotificationsCount > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400">
                    {unreadNotificationsCount} New
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>

            {/* Privacy Policy */}
            <button
              onClick={() => setShowPrivacyModal(true)}
              className="w-full flex items-center justify-between p-3.5 hover:bg-stone-50 dark:hover:bg-stone-850 transition-colors text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 block">
                    Privacy Policy
                  </span>
                  <span className="text-[10px] text-stone-400">Pilgrim data encryption & Aadhaar security</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Terms & Conditions */}
            <button
              onClick={() => setShowTermsModal(true)}
              className="w-full flex items-center justify-between p-3.5 hover:bg-stone-50 dark:hover:bg-stone-850 transition-colors text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 block">
                    Terms & Conditions
                  </span>
                  <span className="text-[10px] text-stone-400">Temple trust darshan protocol & guidelines</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* About DivyaYatra */}
            <button
              onClick={() => setShowAboutModal(true)}
              className="w-full flex items-center justify-between p-3.5 hover:bg-stone-50 dark:hover:bg-stone-850 transition-colors text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 block">
                    About DivyaYatra
                  </span>
                  <span className="text-[10px] text-stone-400">Version 2.4.0 • Verified Pilgrim Platform</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* 24x7 Pilgrim Helpdesk */}
            <button
              onClick={() => setShowSupportModal(true)}
              className="w-full flex items-center justify-between p-3.5 hover:bg-stone-50 dark:hover:bg-stone-850 transition-colors text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 block">
                    24x7 Pilgrim Helpdesk
                  </span>
                  <span className="text-[10px] text-stone-400">Instant assistance & WhatsApp support</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-rose-600 dark:text-rose-400 text-xs font-bold shadow-2xs hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all active:scale-[0.99]"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out of DivyaYatra</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* 10 & 11. REAL EDIT PROFILE MODAL */}
      {/* ========================================================= */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl p-5 shadow-2xl border border-stone-200 dark:border-stone-800 animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800 shrink-0">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-orange-50 dark:bg-orange-950 text-orange-600">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                    Edit Devotee Profile
                  </h3>
                  <p className="text-[10px] text-stone-400">Update pilgrim details for sacred darshan tokens</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-3.5 text-xs">
              {/* Photo Upload Section */}
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/70">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange-500 bg-gradient-to-br from-orange-400 to-amber-500 text-white font-extrabold text-xl flex items-center justify-center shrink-0">
                  {editAvatar ? (
                    <img src={editAvatar} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span>{getInitials(editName)}</span>
                  )}
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-[11px] shadow-2xs flex items-center gap-1.5 active:scale-95 transition-transform"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Upload Photo</span>
                    </button>
                    {editAvatar && (
                      <button
                        type="button"
                        onClick={() => setEditAvatar('')}
                        className="p-1.5 rounded-xl bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 text-[11px] font-semibold hover:bg-stone-300"
                        title="Remove photo & use initials"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <p className="text-[10px] text-stone-400">
                    Supports JPG, PNG (Max 3MB). Reverts to initials if empty.
                  </p>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400 block mb-1">
                  Full Name (as per Govt ID) *
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="e.g. Bhaskar Rao"
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-semibold outline-none focus:border-orange-500 text-stone-900 dark:text-stone-100"
                />
              </div>

              {/* Phone & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400 block mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-semibold outline-none focus:border-orange-500 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-semibold outline-none focus:border-orange-500 text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              {/* Astrological / Traditional Info Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400 block mb-1">
                    Gotra (For Sankalpam)
                  </label>
                  <input
                    type="text"
                    value={editGotra}
                    onChange={(e) => setEditGotra(e.target.value)}
                    placeholder="e.g. Kashyapa Gotra"
                    className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-semibold outline-none focus:border-orange-500 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400 block mb-1">
                    Rashi (Zodiac)
                  </label>
                  <input
                    type="text"
                    value={editRashi}
                    onChange={(e) => setEditRashi(e.target.value)}
                    placeholder="e.g. Dhanu (Sagittarius)"
                    className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-semibold outline-none focus:border-orange-500 text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              {/* DOB & Gender */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400 block mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={editDob}
                    onChange={(e) => setEditDob(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-semibold outline-none focus:border-orange-500 text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400 block mb-1">
                    Gender
                  </label>
                  <select
                    value={editGender}
                    onChange={(e) => setEditGender(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-semibold outline-none focus:border-orange-500 text-stone-900 dark:text-stone-100"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* ID Proof */}
              <div>
                <label className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-400 block mb-1">
                  Identity Proof Record
                </label>
                <input
                  type="text"
                  value={editIdProof}
                  onChange={(e) => setEditIdProof(e.target.value)}
                  placeholder="e.g. Aadhaar (XXXX-XXXX-4819)"
                  className="w-full p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-semibold outline-none focus:border-orange-500 text-stone-900 dark:text-stone-100"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 shrink-0">
              <PrimaryButton onClick={handleSaveProfile} size="md">
                Save Devotee Profile
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. DIVYA WALLET & REWARDS MODAL */}
      {/* ========================================================= */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl p-5 shadow-2xl border border-stone-200 dark:border-stone-800 animate-in fade-in zoom-in duration-200 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800 shrink-0">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
                  <Wallet className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                    Divya Wallet & Rewards
                  </h3>
                  <p className="text-[10px] text-stone-400">Official pilgrimage cashback & reward balance</p>
                </div>
              </div>
              <button
                onClick={() => setShowWalletModal(false)}
                className="p-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-3.5 text-xs">
              {/* Wallet Balance Hero Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-md relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-100">
                    Available Pilgrim Coins
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-extrabold tracking-tight">₹{divyaCoins}</span>
                    <span className="text-xs text-emerald-100">Divya Coins</span>
                  </div>
                  <p className="text-[11px] text-emerald-100/90 mt-2 leading-relaxed">
                    1 Coin = ₹1. Coins can be redeemed instantly towards Darshan tokens, travel bookings, and hotel stays.
                  </p>
                </div>
                <Coins className="absolute -right-3 -bottom-3 w-24 h-24 text-white/10" />
              </div>

              {/* Recent Coin Activity */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-stone-900 dark:text-stone-100">
                    Transaction History
                  </span>
                  <span className="text-[10px] text-stone-400">
                    {walletTransactions.length} records
                  </span>
                </div>

                <div className="space-y-2">
                  {walletTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`p-2 rounded-xl ${
                            tx.type === 'credit'
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600'
                              : 'bg-rose-100 dark:bg-rose-950 text-rose-600'
                          }`}
                        >
                          {tx.type === 'credit' ? (
                            <ArrowDownLeft className="w-4 h-4" />
                          ) : (
                            <ArrowUpRight className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                            {tx.title}
                          </h4>
                          <span className="text-[10px] text-stone-400 block mt-0.5">
                            {tx.date} • {tx.description}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-xs font-extrabold ${
                          tx.type === 'credit'
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {tx.type === 'credit' ? `+₹${tx.amount}` : `-₹${tx.amount}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. REAL PAYMENTS & TRANSACTIONS MODAL */}
      {/* ========================================================= */}
      {showPaymentsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl p-5 shadow-2xl border border-stone-200 dark:border-stone-800 animate-in fade-in zoom-in duration-200 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800 shrink-0">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-orange-50 dark:bg-orange-950 text-orange-600">
                  <ReceiptText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                    Payment Receipts
                  </h3>
                  <p className="text-[10px] text-stone-400">
                    {myTrips.length} {myTrips.length === 1 ? 'transaction receipt' : 'transaction receipts'} on record
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPaymentsModal(false)}
                className="p-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-3">
              {myTrips.length > 0 ? (
                myTrips.map((trip) => {
                  const templeName = trip.templeName || trip.temple?.name || 'Sacred Temple';
                  return (
                    <div
                      key={trip.bookingId}
                      className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/70 space-y-2"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">
                            #{trip.bookingId}
                          </span>
                          <h4 className="text-xs font-extrabold text-stone-900 dark:text-stone-100">
                            {templeName}
                          </h4>
                          <span className="text-[11px] text-stone-500 dark:text-stone-400 block mt-0.5">
                            {trip.darshanDate} • {trip.bookingTime}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            trip.paymentStatus === 'SUCCESS'
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                              : 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {trip.paymentStatus}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-stone-200/50 dark:border-stone-700/50 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-stone-600 dark:text-stone-300 text-[11px]">
                          <CreditCard className="w-3.5 h-3.5 text-orange-500" />
                          <span>Method: {trip.paymentMethod.toUpperCase()}</span>
                        </div>
                        <div className="font-extrabold text-orange-600 dark:text-orange-400">
                          ₹{trip.totalAmount.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setShowPaymentsModal(false);
                          setCurrentBooking(trip);
                          navigateTo('ticket-confirmation');
                        }}
                        className="w-full text-center text-[11px] font-bold text-orange-500 hover:text-orange-600 pt-1"
                      >
                        View Official Pass ➔
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-stone-400">
                  <ReceiptText className="w-10 h-10 mx-auto mb-2 text-stone-300 dark:text-stone-700" />
                  <p className="text-xs font-semibold">No Payment Receipts Found</p>
                  <p className="text-[10px] mt-1 max-w-xs mx-auto">
                    Complete your first temple booking to view official payment records and GST invoices.
                  </p>
                  <div className="mt-4 max-w-xs mx-auto">
                    <button
                      onClick={() => {
                        setShowPaymentsModal(false);
                        startNewBooking();
                      }}
                      className="px-4 py-2 rounded-xl bg-orange-500 text-white font-bold text-xs"
                    >
                      Book Darshan
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. SAVED & FAVORITE TEMPLES MODAL */}
      {/* ========================================================= */}
      {showWishlistModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl p-5 shadow-2xl border border-stone-200 dark:border-stone-800 animate-in fade-in zoom-in duration-200 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800 shrink-0">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                    Saved Temples ({wishlist.length})
                  </h3>
                  <p className="text-[10px] text-stone-400">Your spiritual wishlist for upcoming yatras</p>
                </div>
              </div>
              <button
                onClick={() => setShowWishlistModal(false)}
                className="p-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-3">
              {favoriteTemples.length > 0 ? (
                favoriteTemples.map((temple) => (
                  <div
                    key={temple.id}
                    className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/70 flex items-center gap-3"
                  >
                    <img
                      src={temple.image}
                      alt={temple.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                        {temple.name}
                      </h4>
                      <p className="text-[10px] text-stone-500 dark:text-stone-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-orange-500 shrink-0" />
                        <span className="truncate">{temple.location}</span>
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <button
                          onClick={() => {
                            setShowWishlistModal(false);
                            startNewBooking(temple);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-orange-500 text-white text-[10px] font-bold shadow-2xs hover:bg-orange-600 active:scale-95"
                        >
                          Book Darshan
                        </button>
                        <button
                          onClick={() => toggleWishlist(temple.id)}
                          className="text-[10px] font-semibold text-rose-500 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-stone-400">
                  <Heart className="w-10 h-10 mx-auto mb-2 text-stone-300 dark:text-stone-700" />
                  <p className="text-xs font-semibold">No Saved Temples</p>
                  <p className="text-[10px] mt-1 max-w-xs mx-auto">
                    Tap the heart icon on any temple card to add it to your pilgrimage wishlist.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* LANGUAGE SELECTOR MODAL */}
      {/* ========================================================= */}
      {showLanguageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-stone-900 rounded-3xl p-5 shadow-2xl border border-stone-200 dark:border-stone-800 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800 mb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-orange-500" />
                <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                  Select Language
                </h3>
              </div>
              <button
                onClick={() => setShowLanguageModal(false)}
                className="p-1 text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {languagesList.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setShowLanguageModal(false);
                    showToast(`Language switched to ${lang.code} (${lang.native})`);
                  }}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    language === lang.code
                      ? 'border-orange-500 bg-orange-50/60 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 font-bold'
                      : 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <span className="block text-sm font-extrabold">{lang.native}</span>
                  <span className="text-[10px] text-stone-400 block">{lang.code}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 24x7 PILGRIM HELPDESK MODAL */}
      {/* ========================================================= */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-stone-900 rounded-3xl p-5 shadow-2xl border border-stone-200 dark:border-stone-800 animate-in fade-in zoom-in duration-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-orange-500" />
                <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                  24x7 Pilgrim Support
                </h3>
              </div>
              <button
                onClick={() => setShowSupportModal(false)}
                className="p-1 text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200/60 dark:border-orange-900/40">
                <span className="text-[10px] uppercase font-bold text-orange-700 dark:text-orange-300 block">
                  Toll-Free Pilgrim Helpline
                </span>
                <span className="text-base font-extrabold text-stone-900 dark:text-stone-100 mt-0.5 block">
                  1800-425-1111 / 1800-425-2222
                </span>
                <span className="text-[10px] text-stone-500 dark:text-stone-400 block mt-1">
                  24x7 assistance for temple token verification, reporting queues & special sevas.
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/40 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 block">
                    WhatsApp Pilgrim Desk
                  </span>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 block">
                    Instant chat support with temple trust officers
                  </span>
                </div>
                <button
                  onClick={() => {
                    setShowSupportModal(false);
                    showToast('Opening WhatsApp Pilgrim Chat (+91 91234 56789)...');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-[11px]"
                >
                  Chat Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* ABOUT DIVYAYATRA MODAL */}
      {/* ========================================================= */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-stone-900 rounded-3xl p-5 shadow-2xl border border-stone-200 dark:border-stone-800 animate-in fade-in zoom-in duration-200 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-orange-500" />
                <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                  About DivyaYatra
                </h3>
              </div>
              <button
                onClick={() => setShowAboutModal(false)}
                className="p-1 text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs space-y-2 text-stone-600 dark:text-stone-300">
              <p>
                <strong>DivyaYatra</strong> is India's dedicated spiritual pilgrimage companion, partnering with verified temple trusts including TTD, Shri Saibaba Sansthan, and Vaishno Devi Shrine Board.
              </p>
              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 text-[11px] space-y-1">
                <div><strong>Version:</strong> 2.4.0 (Build 2026.08)</div>
                <div><strong>Security:</strong> 256-Bit SSL Encrypted</div>
                <div><strong>Certifications:</strong> Ministry of Tourism Yatra Partner</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* PRIVACY POLICY MODAL */}
      {/* ========================================================= */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-stone-900 rounded-3xl p-5 shadow-2xl border border-stone-200 dark:border-stone-800 animate-in fade-in zoom-in duration-200 space-y-3 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800 shrink-0">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-orange-500" />
                <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                  Privacy & Data Policy
                </h3>
              </div>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="p-1 text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto text-xs space-y-2.5 text-stone-600 dark:text-stone-300 pr-1">
              <p>
                Your pilgrim records, Aadhaar references, and contact coordinates are encrypted end-to-end and transmitted solely to designated Temple Trust verification portals.
              </p>
              <p>
                We do not sell personal devotee data to third-party commercial brokers. Payment transactions are processed via PCI-DSS certified gateways.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TERMS & CONDITIONS MODAL */}
      {/* ========================================================= */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-stone-900 rounded-3xl p-5 shadow-2xl border border-stone-200 dark:border-stone-800 animate-in fade-in zoom-in duration-200 space-y-3 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800 shrink-0">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-orange-500" />
                <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                  Terms & Darshan Rules
                </h3>
              </div>
              <button
                onClick={() => setShowTermsModal(false)}
                className="p-1 text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto text-xs space-y-2.5 text-stone-600 dark:text-stone-300 pr-1">
              <p>
                1. Traditional Indian dress code is strictly enforced at sanctum sanctorum entry gates (Dhoti/Kurta for Men; Saree/Chudidar for Women).
              </p>
              <p>
                2. Original Aadhaar or Govt photo ID cards must be presented for physical matching at biometric counters.
              </p>
              <p>
                3. Electronic devices and cameras are restricted in inner temple parikramas.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* LOGOUT CONFIRM MODAL */}
      {/* ========================================================= */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-stone-900 rounded-3xl p-5 shadow-2xl border border-stone-200 dark:border-stone-800 animate-in fade-in zoom-in duration-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto text-xl">
              <LogOut className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-base font-extrabold text-stone-900 dark:text-stone-100">
                Sign out of DivyaYatra?
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed">
                You will need to sign in again with your phone number or email to access your pilgrimage passes and reward coins.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="py-2.5 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-50 active:scale-95"
              >
                Stay Signed In
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  logout();
                }}
                className="py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm active:scale-95 transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
