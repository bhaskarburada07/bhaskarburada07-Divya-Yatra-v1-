import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { PrimaryButton } from '../components/common/PrimaryButton';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';

export const DarshanSlotScreen: React.FC = () => {
  const {
    selectedTemple,
    darshanDate,
    setDarshanDate,
    darshanSlot,
    setDarshanSlot,
    personsCount,
    setPersonsCount,
    darshanPricePerPerson,
    setDarshanPricePerPerson,
    navigateTo,
    showToast,
  } = useApp();

  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(9);
  const [currentMonthName, setCurrentMonthName] = useState<string>('June 2024');

  // Calendar dates matrix matching Reference 6
  const calendarDays = [
    { day: 'Sun', date: 7, disabled: true },
    { day: 'Mon', date: 2, disabled: false },
    { day: 'Tue', date: 7, disabled: false },
    { day: 'Wed', date: 9, disabled: false },
    { day: 'Thu', date: 3, disabled: false },
    { day: 'Fri', date: 8, disabled: false },
    { day: 'Sat', date: 13, disabled: false },
    { day: 'Sun', date: 14, disabled: false },
    { day: 'Mon', date: 10, isSpecial: true, disabled: false },
    { day: 'Tue', date: 18, disabled: false },
    { day: 'Wed', date: 15, disabled: false },
    { day: 'Thu', date: 12, disabled: false },
    { day: 'Fri', date: 12, disabled: false },
    { day: 'Sat', date: 28, disabled: false },
  ];

  const slots = [
    { id: '1', time: '06:00 AM - 07:00 AM', price: 300, quota: 'Special Entry Darshan', available: true },
    { id: '2', time: '07:00 AM - 08:00 AM', price: 300, quota: 'Special Entry Darshan', available: true },
    { id: '3', time: '08:00 AM - 09:00 AM', price: 300, quota: 'Special Entry Darshan', available: true },
    { id: '4', time: '09:00 AM - 10:00 AM', price: 300, quota: 'Special Entry Darshan', available: true },
    { id: '5', time: '04:00 PM - 05:00 PM', price: 300, quota: 'Special Entry Darshan', available: true },
    { id: '6', time: '06:00 PM - 07:00 PM', price: 300, quota: 'Special Entry Darshan', available: true },
  ];

  const handleDateSelect = (dayNum: number) => {
    setSelectedDayNumber(dayNum);
    const newDateStr = `${dayNum} June 2024`;
    setDarshanDate(newDateStr);
    showToast(`Selected Darshan Date: ${newDateStr}`);
  };

  const handleSlotSelect = (slotTime: string, price: number) => {
    setDarshanSlot(slotTime);
    setDarshanPricePerPerson(price);
  };

  const handleContinue = () => {
    navigateTo('payment');
  };

  return (
    <div className="min-h-full pb-28 bg-[#faf8f5] dark:bg-[#0c0a09] select-none">
      <Header title="Select Date & Time" subtitle={selectedTemple.name} showBack={true} />

      <div className="p-4 space-y-4">
        {/* Calendar Card (Matching Reference 6) */}
        <div className="p-4 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-2xs">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-3 px-1">
            <button
              onClick={() => showToast('Previous month')}
              className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-stone-900 dark:text-stone-100 tracking-wide">
              {currentMonthName}
            </span>
            <button
              onClick={() => showToast('Next month')}
              className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
              <span key={i} className="text-[10px] font-semibold text-stone-400">
                {d}
              </span>
            ))}
          </div>

          {/* Calendar Dates Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Week 1 */}
            {[4, 7, 2, 7, 9, 3, 8].map((d, idx) => {
              const isSelected = selectedDayNumber === d;
              return (
                <button
                  key={`w1-${idx}`}
                  onClick={() => handleDateSelect(d)}
                  className={`h-9 w-9 mx-auto rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-orange-500 text-white shadow-sm ring-2 ring-orange-500/30'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  {d}
                </button>
              );
            })}

            {/* Week 2 */}
            {[13, 14, 10, 18, 15, 12, 12].map((d, idx) => {
              const isSpecial = idx === 2; // 10th
              const isSelected = selectedDayNumber === d && !isSpecial;
              return (
                <button
                  key={`w2-${idx}`}
                  onClick={() => handleDateSelect(d)}
                  className={`h-9 w-9 mx-auto rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                    isSpecial
                      ? 'bg-orange-500 text-white font-bold shadow-xs'
                      : isSelected
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  {d}
                </button>
              );
            })}

            {/* Week 3 */}
            {[28, 24, 23, 23, 28, 28, 28].map((d, idx) => (
              <button
                key={`w3-${idx}`}
                onClick={() => handleDateSelect(d)}
                className="h-9 w-9 mx-auto rounded-full flex items-center justify-center text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Available Slots Section (Matching Reference 6) */}
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              Available Slots - {darshanDate}
            </h3>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Fast-track entry
            </span>
          </div>

          <div className="space-y-2">
            {slots.map((slot) => {
              const isSelected = darshanSlot === slot.time;
              return (
                <div
                  key={slot.id}
                  onClick={() => handleSlotSelect(slot.time, slot.price)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-orange-50/80 dark:bg-orange-950/40 border-orange-500 shadow-xs ring-2 ring-orange-500/20'
                      : 'bg-white dark:bg-stone-900 border-stone-200/80 dark:border-stone-800 hover:border-orange-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Clock className={`w-4 h-4 ${isSelected ? 'text-orange-500' : 'text-stone-400'}`} />
                    <div>
                      <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                        {slot.time}
                      </span>
                      <span className="block text-[10px] text-stone-400">{slot.quota}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-orange-600 dark:text-orange-400">
                      ₹{slot.price}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-orange-500 fill-orange-500 text-white shrink-0" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Number of Persons Section (Matching Reference 6) */}
        <div className="p-4 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 flex items-center justify-between shadow-2xs">
          <div>
            <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
              Number of Persons
            </h4>
            <span className="text-[10px] text-stone-400">Max 6 devotees per token</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (personsCount > 1) {
                  setPersonsCount((prev) => prev - 1);
                }
              }}
              disabled={personsCount <= 1}
              className="w-8 h-8 rounded-full border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold text-sm flex items-center justify-center active:scale-95 disabled:opacity-30"
            >
              -
            </button>
            <span className="text-sm font-extrabold text-stone-900 dark:text-stone-100 w-5 text-center">
              {personsCount}
            </span>
            <button
              onClick={() => {
                if (personsCount < 6) {
                  setPersonsCount((prev) => prev + 1);
                }
              }}
              disabled={personsCount >= 6}
              className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold text-sm flex items-center justify-center shadow-xs active:scale-95 disabled:opacity-30"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Continue CTA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200/80 dark:border-stone-800/80 p-3.5 flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-stone-400 font-medium">Darshan Total</span>
          <div className="text-base font-extrabold text-orange-600 dark:text-orange-400">
            ₹{(darshanPricePerPerson * personsCount).toLocaleString('en-IN')}
          </div>
        </div>
        <div className="w-1/2">
          <PrimaryButton onClick={handleContinue} size="md">
            Continue
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
