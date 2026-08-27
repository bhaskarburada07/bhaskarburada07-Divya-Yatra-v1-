import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { PrimaryButton } from '../components/common/PrimaryButton';
import {
  Calendar,
  Clock,
  MapPin,
  QrCode,
  Users,
  Plus,
  Compass,
  Train,
} from 'lucide-react';
import { BookingState } from '../types';

export const MyTripsScreen: React.FC = () => {
  const {
    myTrips,
    setCurrentBooking,
    navigateTo,
    startNewBooking,
    setSelectedTemple,
    setDarshanDate,
    setDarshanSlot,
    setPersonsCount,
    setTravelTo,
    setSelectedTravel,
    setSelectedHotel,
    showToast,
  } = useApp();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  // Helper to check if a booking date is strictly completed
  const isTripPastDate = (dateStr: string) => {
    try {
      const parsed = new Date(dateStr);
      if (!isNaN(parsed.getTime())) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        parsed.setHours(23, 59, 59, 999);
        return parsed < today;
      }
    } catch (e) {
      // ignore
    }
    return false;
  };

  const upcomingBookings = myTrips.filter((b) => {
    if (b.status === 'cancelled') return false;
    if (b.status === 'completed' || isTripPastDate(b.darshanDate)) return false;
    return b.status === 'confirmed' || b.status === 'upcoming';
  });

  const completedBookings = myTrips.filter((b) => {
    if (b.status === 'cancelled') return false;
    return b.status === 'completed' || isTripPastDate(b.darshanDate);
  });

  const cancelledBookings = myTrips.filter((b) => b.status === 'cancelled');

  let displayBookings: BookingState[] = [];
  if (activeTab === 'upcoming') displayBookings = upcomingBookings;
  else if (activeTab === 'completed') displayBookings = completedBookings;
  else if (activeTab === 'cancelled') displayBookings = cancelledBookings;

  const handleViewTicket = (booking: BookingState) => {
    setCurrentBooking(booking);
    navigateTo('ticket-confirmation');
  };

  const handleBookTravelForTrip = (trip: BookingState) => {
    setCurrentBooking(trip);
    if (trip.temple) {
      setSelectedTemple(trip.temple);
    }
    setDarshanDate(trip.darshanDate);
    setDarshanSlot(trip.darshanSlot);
    setPersonsCount(trip.personsCount);
    const dest = trip.templeLocation ? trip.templeLocation.split(',')[0].trim() : 'Tirupati';
    setTravelTo(dest);
    setSelectedTravel(null);
    setSelectedHotel(null);
    navigateTo('travel-booking');
    showToast(`Book travel to ${dest} for ${trip.darshanDate} 🚆`);
  };

  return (
    <div className="min-h-full pb-24 bg-[#faf8f5] dark:bg-[#0c0a09] select-none">
      <Header
        title="My Trips & Bookings"
        showBack={false}
        rightElement={
          <button
            onClick={() => startNewBooking()}
            className="flex items-center gap-1 text-xs font-bold text-orange-500 hover:text-orange-600 px-2 py-1"
          >
            <Plus className="w-4 h-4" />
            <span>New Yatra</span>
          </button>
        }
      />

      <div className="p-4 space-y-4">
        {/* Segmented Filter Tabs */}
        <div className="flex rounded-2xl bg-stone-200/80 dark:bg-stone-800/80 p-1">
          {[
            { id: 'upcoming', label: `Upcoming (${upcomingBookings.length})` },
            { id: 'completed', label: `Completed (${completedBookings.length})` },
            { id: 'cancelled', label: `Cancelled (${cancelledBookings.length})` },
          ].map((tab) => {
            const isActive = activeTab === tab.id.split(' ')[0].toLowerCase();
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id.split(' ')[0].toLowerCase() as any)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Trips List */}
        <div className="space-y-3">
          {displayBookings.length > 0 ? (
            displayBookings.map((trip) => {
              const templeName = trip.templeName || trip.temple?.name || 'Sacred Temple';
              const templeLocation = trip.templeLocation || trip.temple?.location || 'India';
              const formattedTotal = trip.totalAmount.toLocaleString('en-IN');

              return (
                <div
                  key={trip.bookingId}
                  className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-2xs overflow-hidden"
                >
                  {/* Trip Header with status pill */}
                  <div className="p-4 border-b border-stone-100 dark:border-stone-800">
                    <div className="flex items-start justify-between">
                      <div className="pr-2">
                        <span className="text-[10px] uppercase font-mono font-bold text-stone-400">
                          #{trip.bookingId}
                        </span>
                        <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 mt-0.5">
                          {templeName}
                        </h3>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-orange-500 shrink-0" />
                          <span className="truncate">{templeLocation}</span>
                        </p>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 ${
                          trip.status === 'confirmed' || trip.status === 'upcoming'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            : trip.status === 'completed'
                            ? 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                            : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                        }`}
                      >
                        {trip.status}
                      </span>
                    </div>

                    {/* Date, Slot & Devotees row */}
                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-stone-100 dark:border-stone-800/80 text-xs">
                      <div className="flex items-center gap-1.5 text-stone-600 dark:text-stone-300">
                        <Calendar className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <span className="truncate">{trip.darshanDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-stone-600 dark:text-stone-300">
                        <Clock className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <span className="truncate">{trip.darshanSlot.split('-')[0]}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-stone-50 dark:border-stone-850 text-[11px] text-stone-500 dark:text-stone-400">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-orange-500" />
                        {trip.personsCount} Devotee{trip.personsCount > 1 ? 's' : ''}
                      </span>
                      {trip.travel && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-semibold truncate">
                          🚆 {trip.travel.operatorOrName}
                        </span>
                      )}
                      {trip.hotel && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 font-semibold truncate">
                          🏨 {trip.hotel.name}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Action Row */}
                  <div className="p-3 bg-stone-50/60 dark:bg-stone-850/40 flex items-center justify-between">
                    <div className="text-xs font-bold text-orange-600 dark:text-orange-400">
                      Total: ₹{formattedTotal}
                    </div>

                    <div className="flex items-center gap-2">
                      {!trip.travel && trip.status !== 'cancelled' && (
                        <button
                          onClick={() => handleBookTravelForTrip(trip)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-orange-500/60 bg-orange-50/80 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 text-xs font-bold hover:bg-orange-100 dark:hover:bg-orange-900/50 active:scale-95 transition-all shadow-2xs"
                        >
                          <Train className="w-3.5 h-3.5" />
                          <span>Book Travel</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleViewTicket(trip)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>View Pass</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : myTrips.length === 0 ? (
            /* Brand New User - No Bookings Yet */
            <div className="text-center py-16 px-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-2xs">
              <div className="w-16 h-16 rounded-full bg-orange-50 dark:bg-orange-950/50 text-orange-500 flex items-center justify-center mx-auto mb-3 text-3xl">
                🪔
              </div>
              <h3 className="text-base font-extrabold text-stone-900 dark:text-stone-100">
                No Trips Yet
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-xs mx-auto leading-relaxed">
                Start planning your sacred pilgrimage journey. Confirmed darshan tokens, travel, and stays will appear here.
              </p>
              <div className="mt-5 max-w-xs mx-auto">
                <PrimaryButton onClick={() => startNewBooking()} size="md">
                  Start Your Yatra
                </PrimaryButton>
              </div>
            </div>
          ) : (
            /* User has bookings, but 0 in active tab */
            <div className="text-center py-14 px-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-2xs">
              <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto mb-2.5 text-xl">
                <Compass className="w-6 h-6 text-stone-400" />
              </div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                No {activeTab} bookings
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-xs mx-auto">
                You have no {activeTab} pilgrimage bookings in your records.
              </p>
              <div className="mt-4 max-w-xs mx-auto">
                <button
                  onClick={() => startNewBooking()}
                  className="px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 transition-colors"
                >
                  Plan New Yatra
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
