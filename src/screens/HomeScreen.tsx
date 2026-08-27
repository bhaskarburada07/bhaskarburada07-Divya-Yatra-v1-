import React from 'react';
import { useApp } from '../context/AppContext';
import { TempleCard } from '../components/temple/TempleCard';
import {
  Bell,
  Search,
  SlidersHorizontal,
  Flame,
  Train,
  Building2,
  Sparkles,
  Tag,
  CalendarCheck,
  MoreHorizontal,
  ChevronRight,
  SunMedium,
  HeartHandshake,
} from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const {
    userProfile,
    navigateTo,
    setSelectedTemple,
    temples,
    unreadNotificationsCount,
    setSearchQuery,
    showToast,
  } = useApp();

  const services = [
    {
      id: 'darshan',
      label: 'Darshan Booking',
      icon: Flame,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/40',
      action: () => navigateTo('search'),
    },
    {
      id: 'travel',
      label: 'Travel',
      icon: Train,
      color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-900/40',
      action: () => navigateTo('travel-booking'),
    },
    {
      id: 'hotels',
      label: 'Hotels',
      icon: Building2,
      color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950/40 border-yellow-200 dark:border-yellow-900/40',
      action: () => navigateTo('hotel-booking'),
    },
    {
      id: 'pooja',
      label: 'Pooja & Seva',
      icon: SunMedium,
      color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/40',
      action: () => {
        setSelectedTemple(temples[0]);
        navigateTo('temple-details');
      },
    },
    {
      id: 'offers',
      label: 'Offers',
      icon: Tag,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/40',
      action: () => {
        showToast('Promo: Use code DIVYA100 for ₹100 Off on all Pilgrimages!');
      },
    },
    {
      id: 'ai-planner',
      label: 'AI Planner',
      icon: Sparkles,
      color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900/40',
      action: () => navigateTo('ai-planner'),
    },
    {
      id: 'my-trips',
      label: 'My Trips',
      icon: CalendarCheck,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/40',
      action: () => navigateTo('my-trips'),
    },
    {
      id: 'more',
      label: 'More',
      icon: MoreHorizontal,
      color: 'text-stone-500 bg-stone-50 dark:bg-stone-850 border-stone-200 dark:border-stone-800',
      action: () => navigateTo('settings'),
    },
  ];

  return (
    <div className="pb-24 bg-[#faf8f5] dark:bg-[#0c0a09] min-h-full select-none">
      {/* Top Header & Greeting */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => navigateTo('profile')}
              className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-orange-500/60 shadow-sm active:scale-95 transition-transform"
            >
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                  Namaste, {userProfile.name.split(' ')[0]}!
                </span>
                <span className="text-sm">👋</span>
              </div>
              <h1 className="text-base font-extrabold text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
                Where do you want to go today?
              </h1>
            </div>
          </div>

          {/* Notifications button */}
          <button
            onClick={() => navigateTo('notifications')}
            className="relative p-2.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-stone-700 dark:text-stone-300 shadow-xs hover:bg-stone-50 active:scale-95 transition-all"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-orange-500 rounded-full ring-2 ring-white dark:ring-stone-900 animate-pulse" />
            )}
          </button>
        </div>

        {/* Search Bar matching reference */}
        <div
          onClick={() => navigateTo('search')}
          className="mt-4 flex items-center justify-between px-4 py-3 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/90 dark:border-stone-800 shadow-xs cursor-pointer hover:border-orange-300 dark:hover:border-orange-800 transition-all"
        >
          <div className="flex items-center gap-2.5 text-stone-400 dark:text-stone-500">
            <Search className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-medium">Search temples, places...</span>
          </div>
          <div className="p-1 rounded-lg bg-stone-50 dark:bg-stone-800 text-stone-500 dark:text-stone-400">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* 8 Core Service Grid (Reference 3) */}
      <div className="px-5 py-2">
        <div className="grid grid-cols-4 gap-3">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <button
                key={srv.id}
                onClick={srv.action}
                className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800/80 shadow-2xs hover:shadow-sm hover:border-orange-300 active:scale-95 transition-all group"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center border mb-1.5 transition-transform group-hover:scale-105 ${srv.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-semibold text-stone-700 dark:text-stone-300 text-center leading-tight">
                  {srv.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* AI Planner Divine Hero Card */}
      <div className="px-5 my-3">
        <div
          onClick={() => navigateTo('ai-planner')}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-amber-500 text-white p-4 shadow-md shadow-orange-500/20 cursor-pointer active:scale-[0.99] transition-all"
        >
          <div className="absolute top-0 right-0 -mt-2 -mr-2 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between relative z-10">
            <div className="max-w-[70%]">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs mb-1.5">
                <Sparkles className="w-2.5 h-2.5 text-amber-200" />
                <span>AI Pilgrimage Planner</span>
              </div>
              <h3 className="text-sm font-bold leading-tight">
                Plan a Complete Sacred Itinerary in Seconds
              </h3>
              <p className="text-[11px] text-amber-100/90 mt-1">
                Personalized timings, travel, stay & budget estimates.
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
              <ChevronRight className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Popular Temples Carousel */}
      <div className="mt-2">
        <div className="flex items-center justify-between px-5 mb-2.5">
          <h2 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
            Popular Temples
          </h2>
          <button
            onClick={() => navigateTo('search')}
            className="text-xs font-bold text-orange-500 hover:text-orange-600 flex items-center gap-0.5"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar pb-2">
          {temples.map((temple) => (
            <TempleCard key={temple.id} temple={temple} variant="compact" />
          ))}
        </div>
      </div>

      {/* Divine Yatra Special Darshan Highlight */}
      <div className="px-5 mt-4">
        <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center text-lg shrink-0 shadow-sm">
            🪔
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
              Char Dham Yatra Special Slots
            </h4>
            <p className="text-[10px] text-stone-600 dark:text-stone-400 mt-0.5">
              Verified VIP tokens & Helicopter bookings now open for Katra & Kedarnath.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedTemple(temples[2]); // Vaishno Devi
              navigateTo('temple-details');
            }}
            className="px-2.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-bold shrink-0 shadow-xs"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};
