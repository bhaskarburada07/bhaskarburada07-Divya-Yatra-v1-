import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import {
  ChevronLeft,
  Heart,
  Share2,
  Star,
  Clock,
  MapPin,
  Sparkles,
  Info,
  Calendar,
  CheckCircle2,
  Navigation,
} from 'lucide-react';

export const TempleDetailsScreen: React.FC = () => {
  const { selectedTemple, goBack, navigateTo, wishlist, toggleWishlist, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<
    'about' | 'timings' | 'sevas' | 'facilities' | 'nearby' | 'photos'
  >('about');

  const temple = selectedTemple;
  const isFavorited = wishlist.includes(temple.id);

  const tabs: { id: 'about' | 'timings' | 'sevas' | 'facilities' | 'nearby' | 'photos'; label: string }[] = [
    { id: 'about', label: 'About Temple' },
    { id: 'timings', label: 'Timings' },
    { id: 'sevas', label: 'Sevas' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'nearby', label: 'Nearby' },
    { id: 'photos', label: 'Photos' },
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: temple.name,
        text: `Plan your pilgrimage to ${temple.name} on DivyaYatra!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Temple link copied to clipboard! 🕉️');
    }
  };

  return (
    <div className="min-h-full pb-24 bg-[#faf8f5] dark:bg-[#0c0a09] select-none">
      {/* Hero Image Section */}
      <div className="relative h-64 sm:h-72 w-full bg-stone-900 overflow-hidden">
        <ImageWithFallback
          src={temple.image}
          alt={temple.name}
          fallbackText={temple.name}
          className="w-full h-full object-cover"
          containerClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60" />

        {/* Floating Top Navigation */}
        <div className="absolute top-0 left-0 right-0 p-4 pt-3 flex items-center justify-between z-10">
          <button
            onClick={goBack}
            className="p-2 rounded-xl bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-transform active:scale-95"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-transform active:scale-95"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleWishlist(temple.id)}
              className="p-2 rounded-xl bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-transform active:scale-95"
              aria-label="Favorite"
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Hero Title & Location Over Image */}
        <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-orange-500 text-[10px] font-bold uppercase tracking-wider mb-1.5 shadow-xs">
            {temple.state}
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight drop-shadow-sm">
            {temple.name}
          </h1>
          <p className="text-xs text-stone-200 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{temple.location}</span>
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="px-4 py-3 bg-white dark:bg-stone-900 border-b border-stone-200/80 dark:border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 font-bold text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{temple.rating}</span>
          </div>
          <span className="text-[11px] text-stone-400 font-medium">({temple.reviewsCount})</span>
        </div>

        <div className="flex items-center gap-1 text-xs text-stone-600 dark:text-stone-300 font-medium">
          <Clock className="w-3.5 h-3.5 text-orange-500" />
          <span>{temple.waitingTime}</span>
        </div>
      </div>

      {/* Pill Filter Tabs (Matching Reference 5) */}
      <div className="sticky top-0 z-20 bg-[#faf8f5]/95 dark:bg-[#0c0a09]/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800 px-4 py-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200/80 dark:border-stone-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Container */}
      <div className="p-4 space-y-4">
        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-2xs">
              <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-2">
                About Temple
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {temple.description}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-orange-50/70 dark:bg-orange-950/30 border border-orange-200/80 dark:border-orange-900/50">
              <h4 className="text-xs font-bold text-orange-900 dark:text-orange-200 flex items-center gap-1.5 mb-1.5">
                <Info className="w-3.5 h-3.5 text-orange-500" />
                <span>Devotee Guidelines & Dress Code</span>
              </h4>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-normal">
                Traditional Indian attire is strictly recommended. Men must wear Dhoti / Kurta-Pyjama. Women must wear Saree / Half Saree / Churidar with Dupatta.
              </p>
            </div>
          </div>
        )}

        {/* Timings Tab */}
        {activeTab === 'timings' && (
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-3 animate-in fade-in duration-150">
            <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-2">
              Temple Schedule & Darshan Hours
            </h3>
            {temple.timings.suprabhatam && (
              <div className="flex justify-between items-center py-2 border-b border-stone-100 dark:border-stone-800 text-xs">
                <span className="font-semibold text-stone-700 dark:text-stone-300">Suprabhatam / Awakening</span>
                <span className="text-orange-600 dark:text-orange-400 font-bold">{temple.timings.suprabhatam}</span>
              </div>
            )}
            <div className="flex justify-between items-center py-2 border-b border-stone-100 dark:border-stone-800 text-xs">
              <span className="font-semibold text-stone-700 dark:text-stone-300">General Sarva Darshan</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{temple.timings.sarvaDarshan}</span>
            </div>
            {temple.timings.vipDarshan && (
              <div className="flex justify-between items-center py-2 border-b border-stone-100 dark:border-stone-800 text-xs">
                <span className="font-semibold text-stone-700 dark:text-stone-300">Special Entry / Sheegra</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">{temple.timings.vipDarshan}</span>
              </div>
            )}
            {temple.timings.eveningAarti && (
              <div className="flex justify-between items-center py-2 border-b border-stone-100 dark:border-stone-800 text-xs">
                <span className="font-semibold text-stone-700 dark:text-stone-300">Evening Deepa Aarti</span>
                <span className="text-orange-600 dark:text-orange-400 font-bold">{temple.timings.eveningAarti}</span>
              </div>
            )}
            <div className="flex justify-between items-center py-2 text-xs">
              <span className="font-semibold text-stone-700 dark:text-stone-300">Temple Closes</span>
              <span className="text-stone-500 font-bold">{temple.timings.closingTime}</span>
            </div>
          </div>
        )}

        {/* Sevas Tab */}
        {activeTab === 'sevas' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            {temple.sevas.map((seva) => (
              <div
                key={seva.id}
                className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 flex items-start justify-between gap-3 shadow-2xs"
              >
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">{seva.name}</h4>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">{seva.description}</p>
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                    <Clock className="w-3 h-3" />
                    <span>Time: {seva.time}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-extrabold text-orange-600 dark:text-orange-400">
                    ₹{seva.price}
                  </div>
                  <button
                    onClick={() => {
                      showToast(`Selected ${seva.name} for booking!`);
                      navigateTo('darshan-slot');
                    }}
                    className="mt-1.5 px-3 py-1 rounded-lg bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400 hover:bg-orange-100 text-[10px] font-bold"
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Facilities Tab */}
        {activeTab === 'facilities' && (
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-2.5 animate-in fade-in duration-150">
            <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-2">
              Pilgrim Amenities & Facilities
            </h3>
            {temple.facilities.map((fac, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-stone-700 dark:text-stone-300 py-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{fac}</span>
              </div>
            ))}
          </div>
        )}

        {/* Nearby Tab */}
        {activeTab === 'nearby' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            {temple.nearbyAttractions.map((att, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-2.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-2xs"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-stone-100 dark:bg-stone-800">
                  <ImageWithFallback
                    src={att.image}
                    alt={att.name}
                    fallbackText={att.name}
                    className="w-full h-full object-cover"
                    containerClassName="w-full h-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">{att.name}</h4>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    Distance: {att.distance} from Sanctum
                  </p>
                </div>
                <button
                  onClick={() => showToast(`Directions to ${att.name} opened in Maps`)}
                  className="p-2 rounded-xl bg-orange-50 dark:bg-orange-950 text-orange-500"
                >
                  <Navigation className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Photos Tab */}
        {activeTab === 'photos' && (
          <div className="grid grid-cols-2 gap-2.5 animate-in fade-in duration-150">
            {temple.gallery.map((img, idx) => (
              <div key={idx} className="h-32 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-800">
                <ImageWithFallback
                  src={img}
                  alt={`${temple.name} Gallery ${idx + 1}`}
                  fallbackText={temple.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                  containerClassName="w-full h-full"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fixed Bottom CTA: Book Darshan Button (Matching Reference 5) */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200/80 dark:border-stone-800/80 p-3.5">
        <PrimaryButton onClick={() => navigateTo('darshan-slot')} size="md">
          Book Darshan
        </PrimaryButton>
      </div>
    </div>
  );
};
