import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { TravelCard } from '../components/travel/TravelCard';
import { MOCK_TRAVEL_DATA } from '../data/mockData';
import { TravelOption } from '../types';
import {
  Train,
  Bus,
  Plane,
  ArrowUpDown,
  Calendar,
  Users,
  Search,
  History,
  CheckCircle2,
} from 'lucide-react';

export const TravelBookingScreen: React.FC = () => {
  const {
    darshanDate,
    travelMode,
    setTravelMode,
    travelFrom,
    setTravelFrom,
    travelTo,
    setTravelTo,
    selectedTravel,
    setSelectedTravel,
    personsCount,
    navigateTo,
    showToast,
  } = useApp();

  const [hasSearched, setHasSearched] = useState<boolean>(true);
  const [journeyDate, setJourneyDate] = useState<string>(darshanDate || '12 June 2024');

  const handleSwap = () => {
    const temp = travelFrom;
    setTravelFrom(travelTo);
    setTravelTo(temp);
    showToast('Swapped travel origin & destination');
  };

  const handleSearch = () => {
    setHasSearched(true);
    showToast(`Found available ${travelMode}s for ${travelFrom} → ${travelTo}`);
  };

  const handleSelectTravel = (travel: TravelOption) => {
    setSelectedTravel(travel);
    showToast(`Selected ${travel.operatorOrName}`);
  };

  const handleContinue = () => {
    navigateTo('hotel-booking');
  };

  const handleSkip = () => {
    setSelectedTravel(null);
    showToast('Skipped travel booking');
    navigateTo('hotel-booking');
  };

  // Filter mock travels by current selected tab mode
  const filteredTravels = MOCK_TRAVEL_DATA.filter((t) => t.type === travelMode);

  return (
    <div className="min-h-full pb-28 bg-[#faf8f5] dark:bg-[#0c0a09] select-none">
      <Header title="Where do you want to go?" showBack={true} />

      <div className="p-4 space-y-4">
        {/* Mode Selector Tabs (Matching Reference 7) */}
        <div className="flex rounded-2xl bg-stone-200/80 dark:bg-stone-800/80 p-1">
          {[
            { id: 'train', label: 'Train', icon: Train },
            { id: 'bus', label: 'Bus', icon: Bus },
            { id: 'flight', label: 'Flight', icon: Plane },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = travelMode === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setTravelMode(tab.id as 'train' | 'bus' | 'flight')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Travel Form Card (Matching Reference 7) */}
        <div className="p-4 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-2xs space-y-3">
          {/* From & To with Swap Button */}
          <div className="relative space-y-2">
            <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/70">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">
                From
              </span>
              <input
                type="text"
                value={travelFrom}
                onChange={(e) => setTravelFrom(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-stone-900 dark:text-stone-100 outline-none mt-0.5"
              />
            </div>

            {/* Swap Button */}
            <button
              onClick={handleSwap}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-orange-500 text-white shadow-md flex items-center justify-center z-10 hover:bg-orange-600 active:scale-95 transition-transform"
              title="Swap"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>

            <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/70">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">
                To
              </span>
              <input
                type="text"
                value={travelTo}
                onChange={(e) => setTravelTo(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-stone-900 dark:text-stone-100 outline-none mt-0.5"
              />
            </div>
          </div>

          {/* Journey Date & Passengers */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/70">
              <span className="text-[10px] uppercase font-bold text-stone-400 flex items-center gap-1">
                <Calendar className="w-2.5 h-2.5" />
                Journey Date
              </span>
              <input
                type="text"
                value={journeyDate}
                onChange={(e) => setJourneyDate(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-stone-900 dark:text-stone-100 outline-none mt-0.5"
              />
            </div>

            <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/70">
              <span className="text-[10px] uppercase font-bold text-stone-400 flex items-center gap-1">
                <Users className="w-2.5 h-2.5" />
                Passengers
              </span>
              <span className="block text-xs font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                {personsCount} Adults
              </span>
            </div>
          </div>

          <PrimaryButton onClick={handleSearch} size="md">
            Search {travelMode.charAt(0).toUpperCase() + travelMode.slice(1)}s
          </PrimaryButton>
        </div>

        {/* Recent Searches Pills (Matching Reference 7) */}
        <div>
          <span className="text-xs font-bold text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-1">
            <History className="w-3 h-3 text-orange-500" />
            Recent Searches
          </span>
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {[
              { from: 'VSKP', to: 'TPTY', name: 'Visakhapatnam → Tirupati' },
              { from: 'HYB', to: 'TPTY', name: 'Hyderabad → Tirupati' },
              { from: 'BLR', to: 'TPTY', name: 'Bangalore → Tirupati' },
            ].map((rec, i) => (
              <button
                key={i}
                onClick={() => {
                  setTravelFrom(`${rec.from} (City)`);
                  setTravelTo(`${rec.to} (Tirupati)`);
                  showToast(`Selected recent search: ${rec.name}`);
                }}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-[11px] font-semibold whitespace-nowrap hover:border-orange-300 shadow-2xs"
              >
                {rec.from} ➔ {rec.to}
              </button>
            ))}
          </div>
        </div>

        {/* Travel Options Results */}
        {hasSearched && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
              <span className="font-bold text-stone-800 dark:text-stone-200">
                Available {travelMode.toUpperCase()} Options ({filteredTravels.length})
              </span>
              <button
                onClick={handleSkip}
                className="text-orange-500 font-bold hover:underline"
              >
                Skip Travel ➔
              </button>
            </div>

            {filteredTravels.map((t) => (
              <TravelCard
                key={t.id}
                travel={t}
                isSelected={selectedTravel?.id === t.id}
                onSelect={handleSelectTravel}
              />
            ))}
          </div>
        )}
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200/80 dark:border-stone-800/80 p-3.5 flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-stone-400 font-medium">Selected Travel</span>
          <div className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
            {selectedTravel ? `₹${selectedTravel.price.toLocaleString('en-IN')}` : 'None Selected'}
          </div>
        </div>
        <div className="w-1/2">
          <PrimaryButton onClick={handleContinue} size="md">
            Continue to Stay
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
