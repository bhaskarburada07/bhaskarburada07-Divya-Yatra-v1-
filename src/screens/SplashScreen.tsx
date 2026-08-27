import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { ArrowRight } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { navigateTo, isLoggedIn } = useApp();
  const [activeDot, setActiveDot] = useState(0);

  // Cycle the dots subtly every 800ms
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % 3);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const handleBeginJourney = () => {
    if (isLoggedIn) {
      navigateTo('login');
    } else {
      navigateTo('login');
    }
  };

  return (
    <div
      id="divyayatra-splash-screen"
      className="relative w-full h-full min-h-[100dvh] flex flex-col justify-between items-center text-white overflow-hidden select-none bg-stone-950"
    >
      {/* 1. Realistic Full-Screen Illuminated Indian Temple Background */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <img
          src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85"
          alt="Sacred Tirumala Indian Temple Gopuram"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />

        {/* Subtle dark gradient overlay to preserve temple visibility while ensuring high legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/85" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/80" />
      </motion.div>

      {/* TOP: Sacred Om Symbol */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 pt-10 sm:pt-12 flex flex-col items-center"
      >
        <div className="relative flex items-center justify-center">
          {/* Subtle soft golden aura */}
          <div className="absolute w-12 h-12 bg-amber-500/20 rounded-full blur-md" />
          <span className="relative text-3xl sm:text-4xl font-serif text-amber-400 font-normal tracking-wide drop-shadow-[0_0_16px_rgba(251,191,36,0.65)]">
            ॐ
          </span>
        </div>
      </motion.div>

      {/* CENTER: DivyaYatra Sacred Mandala Logo, Title & Tagline */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 my-auto">
        {/* Sacred Divine Mandala Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-5"
        >
          {/* Golden radial background glow */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-orange-500/40 via-amber-400/30 to-yellow-500/40 rounded-full blur-xl animate-pulse" />

          {/* Geometric Sacred Mandala Icon */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center bg-gradient-to-br from-amber-300 via-orange-500 to-amber-600 p-[2.5px] shadow-[0_0_30px_rgba(249,115,22,0.45)]">
            <div className="w-full h-full rounded-full bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 border border-amber-400/30">
              <svg
                viewBox="0 0 100 100"
                className="w-12 h-12 sm:w-14 sm:h-14 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer lotus petals / rays */}
                <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                <circle cx="50" cy="50" r="38" stroke="url(#goldGrad)" strokeWidth="1.5" />
                
                {/* 8-Pointed Star / Sacred Mandala */}
                <path
                  d="M50 12 L58 38 L84 38 L63 54 L71 80 L50 64 L29 80 L37 54 L16 38 L42 38 Z"
                  stroke="url(#goldGrad)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  fill="rgba(249, 115, 22, 0.15)"
                />
                
                {/* Inner Sacred Center */}
                <circle cx="50" cy="50" r="14" fill="url(#goldGrad)" />
                <circle cx="50" cy="50" r="8" fill="#1c1917" />
                <circle cx="50" cy="50" r="4" fill="#fbbf24" />

                <defs>
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FDE68A" />
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#D97706" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
        >
          <span className="text-white font-serif tracking-normal">Divya</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-amber-400 font-serif tracking-normal drop-shadow-[0_0_15px_rgba(251,146,60,0.5)]">
            Yatra
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-2 text-xs sm:text-sm text-stone-200/90 font-medium tracking-wide max-w-[260px] drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]"
        >
          Every Pilgrimage, Divinely Simplified.
        </motion.p>

        {/* Loading / Page Indicator Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-6 flex items-center justify-center gap-2"
        >
          {[0, 1, 2].map((idx) => {
            const isActive = activeDot === idx;
            return (
              <motion.div
                key={idx}
                animate={{
                  scale: isActive ? 1.3 : 1,
                  opacity: isActive ? 1 : 0.45,
                  backgroundColor: isActive ? '#f97316' : '#a8a29e',
                }}
                transition={{ duration: 0.35 }}
                className={`h-1.5 rounded-full ${
                  isActive ? 'w-5 shadow-[0_0_8px_rgba(249,115,22,0.8)]' : 'w-1.5'
                }`}
              />
            );
          })}
        </motion.div>
      </div>

      {/* BOTTOM CTA BUTTON */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.95, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-xs sm:max-w-sm px-6 pb-8 sm:pb-10"
      >
        <button
          id="btn-begin-spiritual-journey"
          onClick={handleBeginJourney}
          className="group relative w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-600 hover:via-amber-600 hover:to-orange-600 active:scale-[0.98] transition-all duration-200 text-white font-bold text-sm sm:text-base tracking-wide shadow-[0_4px_25px_rgba(249,115,22,0.45)] border border-amber-300/30 flex items-center justify-center gap-3 overflow-hidden cursor-pointer"
        >
          {/* Subtle light shimmer sweep */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

          <span className="relative z-10 font-semibold drop-shadow-sm">
            Begin Spiritual Journey
          </span>
          <ArrowRight className="relative z-10 w-5 h-5 text-white transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>
    </div>
  );
};
