import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { HotelCard } from '../components/hotel/HotelCard';
import { MOCK_HOTELS_DATA } from '../data/mockData';
import { Hotel } from '../types';
import { SlidersHorizontal, ArrowUpDown, Building, Check, Sparkles } from 'lucide-react';

export const HotelBookingScreen: React.FC = () => {
  const {
    selectedTemple,
    selectedHotel,
    setSelectedHotel,
    hotelNights,
    setHotelNights,
    personsCount,
    navigateTo,
    showToast,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'near' | 'budget' | 'luxury'>('all');
  const [activeSort, setActiveSort] = useState<'popular' | 'price-low' | 'rating'>('popular');

  const handleSelectHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    showToast(`Selected ${hotel.name}`);
  };

  const handleContinue = () => {
    navigateTo('payment');
  };

  const handleSkip = () => {
    setSelectedHotel(null);
    showToast('Skipped hotel booking');
    navigateTo('payment');
  };

  // Filter & Sort hotels
  let displayHotels = [...MOCK_HOTELS_DATA];

  if (activeFilter === 'near') {
    displayHotels = displayHotels.filter((h) => parseFloat(h.distanceFromTemple) <= 1.5);
  } else if (activeFilter === 'budget') {
    displayHotels = displayHotels.filter((h) => h.pricePerNight < 2500);
  } else if (activeFilter === 'luxury') {
    displayHotels = displayHotels.filter((h) => h.pricePerNight >= 2500);
  }

  if (activeSort === 'price-low') {
    displayHotels.sort((a, b) => a.pricePerNight - b.pricePerNight);
  } else if (activeSort === 'rating') {
    displayHotels.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="min-h-full pb-28 bg-[#faf8f5] dark:bg-[#0c0a09] select-none">
      <Header
        title={`Hotels in ${selectedTemple.location.split(',')[0]}`}
        subtitle={`12 June - 13 June | ${personsCount} Guests`}
        showBack={true}
      />

      <div className="p-4 space-y-4">
        {/* Filter & Sort Bar (Matching Reference 8) */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'All Stays' },
              { id: 'near', label: 'Near Temple (<1.5km)' },
              { id: 'budget', label: 'Under ₹2,500' },
              { id: 'luxury', label: 'Premium & Luxury' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setActiveFilter(f.id as any);
                  showToast(`Filter: ${f.label}`);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeFilter === f.id
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              const nextSort =
                activeSort === 'popular'
                  ? 'price-low'
                  : activeSort === 'price-low'
                  ? 'rating'
                  : 'popular';
              setActiveSort(nextSort);
              showToast(`Sorted by: ${nextSort.replace('-', ' ')}`);
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold shrink-0 shadow-2xs"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-orange-500" />
            <span>Sort</span>
          </button>
        </div>

        {/* Stay Summary / Nights counter */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
              Duration of Stay
            </span>
            <span className="text-[10px] text-stone-400 block">Check-in 12:00 PM • Satvik Breakfast</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (hotelNights > 1) setHotelNights(hotelNights - 1);
              }}
              disabled={hotelNights <= 1}
              className="w-7 h-7 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold text-xs flex items-center justify-center disabled:opacity-30"
            >
              -
            </button>
            <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
              {hotelNights} Night{hotelNights > 1 ? 's' : ''}
            </span>
            <button
              onClick={() => setHotelNights(hotelNights + 1)}
              className="w-7 h-7 rounded-full bg-orange-500 text-white font-bold text-xs flex items-center justify-center shadow-xs"
            >
              +
            </button>
          </div>
        </div>

        {/* Hotels List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
            <span>
              <strong>{displayHotels.length}</strong> Verified Pilgrim Guest Houses & Hotels
            </span>
            <button onClick={handleSkip} className="text-orange-500 font-bold hover:underline">
              Skip Hotel ➔
            </button>
          </div>

          {displayHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              isSelected={selectedHotel?.id === hotel.id}
              onSelect={handleSelectHotel}
            />
          ))}
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200/80 dark:border-stone-800/80 p-3.5 flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-stone-400 font-medium">Selected Stay</span>
          <div className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
            {selectedHotel
              ? `₹${(selectedHotel.pricePerNight * hotelNights).toLocaleString('en-IN')}`
              : 'None Selected'}
          </div>
        </div>
        <div className="w-1/2">
          <PrimaryButton onClick={handleContinue} size="md">
            Review Payment
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
