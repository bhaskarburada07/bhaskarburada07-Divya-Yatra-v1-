import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { QRGenerator } from '../components/common/QRGenerator';
import {
  CheckCircle2,
  Download,
  Share2,
  Calendar,
  Clock,
  Users,
  MapPin,
  AlertTriangle,
  XCircle,
  CreditCard,
  Building,
  Train,
  X,
} from 'lucide-react';

export const TicketConfirmationScreen: React.FC = () => {
  const {
    currentBooking,
    userProfile,
    navigateTo,
    showToast,
    cancelBooking,
    setSelectedTemple,
    setDarshanDate,
    setDarshanSlot,
    setPersonsCount,
    setTravelTo,
    setSelectedTravel,
    setSelectedHotel,
  } = useApp();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showTravelPrompt, setShowTravelPrompt] = useState<boolean>(() => {
    return Boolean(currentBooking && !currentBooking.travel && currentBooking.status !== 'cancelled');
  });

  if (!currentBooking) {
    return (
      <div className="min-h-full pb-24 bg-[#faf8f5] dark:bg-[#0c0a09] select-none p-6 text-center">
        <Header title="Ticket Confirmation" showBack={false} />
        <div className="py-20 max-w-xs mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto text-2xl">
            🪔
          </div>
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
            No Active Pass Selected
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Please select a booking from My Trips or complete a new temple booking.
          </p>
          <PrimaryButton onClick={() => navigateTo('home')} size="md">
            Go to Home
          </PrimaryButton>
        </div>
      </div>
    );
  }

  const isCancelled = currentBooking.status === 'cancelled';
  const templeName = currentBooking.templeName || currentBooking.temple?.name || 'Sacred Temple';
  const templeLocation = currentBooking.templeLocation || currentBooking.temple?.location || 'India';
  const templeImage = currentBooking.templeImage || currentBooking.temple?.image;

  const handleDownload = () => {
    showToast(`Official E-Pass #${currentBooking.bookingId} downloaded to device 📄`);
  };

  const handleShareWhatsApp = () => {
    const text = `🪔 *DivyaYatra Digital E-Pass*\nTemple: ${templeName}\nDate: ${currentBooking.darshanDate}\nSlot: ${currentBooking.darshanSlot}\nBooking ID: ${currentBooking.bookingId}\nDevotees: ${currentBooking.personsCount} PAX\nStatus: ${currentBooking.status.toUpperCase()}`;
    if (navigator.share) {
      navigator.share({ title: `${templeName} Darshan Pass`, text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      showToast('E-Pass details copied to clipboard! Ready to share on WhatsApp.');
    }
  };

  const handleConfirmCancel = () => {
    cancelBooking(currentBooking.bookingId);
    setShowCancelModal(false);
  };

  const handleAcceptTravelBooking = () => {
    setShowTravelPrompt(false);
    if (currentBooking.temple) {
      setSelectedTemple(currentBooking.temple);
    }
    setDarshanDate(currentBooking.darshanDate);
    setDarshanSlot(currentBooking.darshanSlot);
    setPersonsCount(currentBooking.personsCount);
    const dest = currentBooking.templeLocation ? currentBooking.templeLocation.split(',')[0].trim() : 'Tirupati';
    setTravelTo(dest);
    setSelectedTravel(null);
    setSelectedHotel(null);
    navigateTo('travel-booking');
    showToast(`Opening Travel Booking to ${dest} 🚆`);
  };

  const handleDeclineTravelBooking = () => {
    setShowTravelPrompt(false);
    showToast('Darshan ticket is ready! You can book travel anytime from My Trips.');
  };

  return (
    <div className="min-h-full pb-28 bg-[#faf8f5] dark:bg-[#0c0a09] select-none">
      <Header
        title={isCancelled ? 'Cancelled E-Pass' : 'Ticket Confirmation'}
        showBack={true}
        rightElement={
          <button
            onClick={() => navigateTo('home')}
            className="text-xs font-bold text-orange-500 hover:text-orange-600 px-2 py-1"
          >
            Home
          </button>
        }
      />

      <div className="p-4 space-y-4">
        {/* Top Status Header */}
        {!isCancelled ? (
          <div className="text-center py-2 animate-in fade-in zoom-in duration-300">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center mx-auto mb-2 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-extrabold text-stone-900 dark:text-stone-100">
              Booking Confirmed! 🕉️
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Your sacred pilgrimage pass is verified & ready for reporting
            </p>
          </div>
        ) : (
          <div className="text-center py-2 animate-in fade-in zoom-in duration-300">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-500 to-red-600 text-white flex items-center justify-center mx-auto mb-2 shadow-lg shadow-rose-500/20">
              <XCircle className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-extrabold text-rose-600 dark:text-rose-400">
              Booking Cancelled
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              This token has been cancelled. Refund of ₹{currentBooking.totalAmount.toLocaleString('en-IN')} is processing.
            </p>
          </div>
        )}

        {/* Sacred Boarding Pass / Ticket Card */}
        <div className="relative rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-md overflow-hidden">
          {/* Top Temple Header Banner */}
          <div className={`p-4 text-white relative overflow-hidden ${
            isCancelled ? 'bg-gradient-to-r from-stone-700 to-stone-800' : 'bg-gradient-to-r from-orange-600 to-amber-600'
          }`}>
            {templeImage && (
              <img
                src={templeImage}
                alt={templeName}
                className="absolute inset-0 w-full h-full object-cover opacity-20"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full backdrop-blur-xs ${
                  isCancelled ? 'bg-rose-500 text-white' : 'bg-white/20 text-white'
                }`}>
                  {isCancelled ? 'CANCELLED PASS' : 'OFFICIAL E-DARSHAN PASS'}
                </span>
                <span className="text-[11px] font-mono font-bold tracking-wider">
                  #{currentBooking.bookingId}
                </span>
              </div>
              <h3 className="text-base font-extrabold tracking-tight">
                {templeName}
              </h3>
              <p className="text-xs text-orange-100 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3" />
                <span>{templeLocation}</span>
              </p>
            </div>
          </div>

          {/* Devotee & Details Grid */}
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] uppercase text-stone-400 font-semibold block">
                  Primary Devotee
                </span>
                <span className="font-bold text-stone-900 dark:text-stone-100">
                  {currentBooking.primaryContact?.name || userProfile.name}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-stone-400 font-semibold block">
                  Total Pilgrims
                </span>
                <span className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-orange-500" />
                  {currentBooking.personsCount} Devotee{currentBooking.personsCount > 1 ? 's' : ''}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-stone-400 font-semibold block">
                  Darshan Date
                </span>
                <span className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-orange-500" />
                  {currentBooking.darshanDate}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-stone-400 font-semibold block">
                  Reporting Slot
                </span>
                <span className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-orange-500" />
                  {currentBooking.darshanSlot}
                </span>
              </div>
            </div>

            {/* Travel & Hotel sub-badges if booked */}
            <div className="pt-2.5 border-t border-stone-100 dark:border-stone-800 flex flex-wrap gap-2 text-[11px]">
              <div className="flex items-center gap-1.5 p-1.5 px-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                <Train className="w-3.5 h-3.5 text-blue-500" />
                <span>
                  Travel: {currentBooking.travel ? currentBooking.travel.operatorOrName : 'Not Selected'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 p-1.5 px-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                <Building className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  Hotel: {currentBooking.hotel ? `${currentBooking.hotel.name} (${currentBooking.hotelNights}N)` : 'Not Selected'}
                </span>
              </div>
            </div>

            {/* Payment Record details */}
            <div className="p-2.5 rounded-xl bg-orange-50/70 dark:bg-orange-950/30 border border-orange-200/60 dark:border-orange-900/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300 font-medium">
                <CreditCard className="w-3.5 h-3.5 text-orange-500" />
                <span>Paid via {currentBooking.paymentMethod.toUpperCase()}</span>
              </div>
              <div className="font-extrabold text-orange-600 dark:text-orange-400">
                ₹{currentBooking.totalAmount.toLocaleString('en-IN')} • {currentBooking.paymentStatus}
              </div>
            </div>
          </div>

          {/* Ticket Perforation */}
          <div className="relative py-1.5 flex items-center justify-between">
            <div className="w-5 h-5 -ml-2.5 rounded-full bg-[#faf8f5] dark:bg-[#0c0a09] border-r border-stone-200 dark:border-stone-800" />
            <div className="flex-1 border-t-2 border-dashed border-stone-200 dark:border-stone-800 mx-2" />
            <div className="w-5 h-5 -mr-2.5 rounded-full bg-[#faf8f5] dark:bg-[#0c0a09] border-l border-stone-200 dark:border-stone-800" />
          </div>

          {/* Dynamic Deterministic QR Code Scanner Area */}
          <div className="p-4 flex flex-col items-center justify-center bg-stone-50/50 dark:bg-stone-850/40">
            <QRGenerator
              data={currentBooking.qrData || `DIVYAYATRA:${currentBooking.bookingId}:${templeName}:${currentBooking.darshanDate}`}
              size={140}
              subText={isCancelled ? 'VOID - CANCELLED' : `GATE SCAN #${currentBooking.bookingId.slice(-6)}`}
            />
            <p className="text-[10px] text-stone-500 dark:text-stone-400 text-center mt-2.5 max-w-xs">
              {!isCancelled ? (
                <>
                  Present this digital QR token at the <strong>Temple Entry Gate</strong> along with original Aadhaar Card for all {currentBooking.personsCount} pilgrims.
                </>
              ) : (
                <span className="text-rose-500 font-semibold">
                  This token was cancelled. Entry will be denied at the temple verification gates.
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Darshan Ticket Ready Banner & Quick Travel CTA (if travel was skipped) */}
        {!isCancelled && !currentBooking.travel && (
          <div className="p-3.5 rounded-2xl bg-orange-50/80 dark:bg-orange-950/40 border border-orange-200/80 dark:border-orange-900/60 flex items-center justify-between shadow-2xs">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-orange-950 dark:text-orange-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Darshan Ticket Ready</span>
              </div>
              <span className="text-[11px] text-stone-600 dark:text-stone-400 block mt-0.5">
                You can book Travel later from My Trips.
              </span>
            </div>
            <button
              onClick={() => setShowTravelPrompt(true)}
              className="px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
            >
              Book Travel
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold shadow-2xs hover:bg-stone-50 active:scale-95 transition-all"
          >
            <Download className="w-4 h-4 text-orange-500" />
            <span>Download Darshan Ticket</span>
          </button>

          <button
            onClick={handleShareWhatsApp}
            className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold shadow-2xs hover:bg-stone-50 active:scale-95 transition-all"
          >
            <Share2 className="w-4 h-4 text-emerald-500" />
            <span>Share Ticket</span>
          </button>
        </div>

        {/* Cancel Booking Button (if not cancelled yet) */}
        {!isCancelled && (
          <button
            onClick={() => setShowCancelModal(true)}
            className="w-full py-3 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 text-xs font-bold shadow-2xs hover:bg-rose-100 active:scale-[0.99] transition-all flex items-center justify-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Cancel Booking</span>
          </button>
        )}

        {/* View in My Trips CTA */}
        <PrimaryButton onClick={() => navigateTo('my-trips')} size="md">
          View in My Trips
        </PrimaryButton>
      </div>

      {/* Optional Travel Decision Prompt Modal / Bottom Sheet */}
      {showTravelPrompt && !isCancelled && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-stone-200 dark:border-stone-800 space-y-4 animate-in slide-in-from-bottom-5 duration-300">
            {/* Header with Title and Close Button */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-orange-50 dark:bg-orange-950/60 text-orange-500 border border-orange-200/80 dark:border-orange-800/80 flex items-center justify-center text-xl shadow-xs">
                  🪔
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-stone-900 dark:text-stone-100">
                    Your Darshan is confirmed! 🙏
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    Would you like to book your travel to the temple?
                  </p>
                </div>
              </div>
              <button
                onClick={handleDeclineTravelBooking}
                className="p-1.5 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Details Card */}
            <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-stone-900 dark:text-stone-100 font-bold">
                <span className="truncate">{templeName}</span>
                <span className="text-orange-600 dark:text-orange-400 shrink-0 font-mono text-[11px]">
                  #{currentBooking.bookingId}
                </span>
              </div>
              <div className="flex items-center gap-3 text-stone-500 dark:text-stone-400 text-[11px]">
                <span>📅 {currentBooking.darshanDate}</span>
                <span>👥 {currentBooking.personsCount} Devotees</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <PrimaryButton onClick={handleAcceptTravelBooking} size="lg">
                Yes, Book Travel →
              </PrimaryButton>

              <button
                onClick={handleDeclineTravelBooking}
                className="w-full py-3 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-200 dark:hover:bg-stone-750 active:scale-[0.99] transition-all"
              >
                Not Now
              </button>
            </div>

            {/* Reassurance Note */}
            <p className="text-[11px] text-center text-stone-400 dark:text-stone-500">
              Travel booking is optional. You can book it anytime from My Trips.
            </p>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Dialog Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-stone-900 rounded-3xl p-5 shadow-2xl border border-stone-200 dark:border-stone-800 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto text-xl">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-base font-extrabold text-stone-900 dark:text-stone-100">
                Cancel this booking?
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed">
                Are you sure you want to cancel your Darshan token for <strong>{templeName}</strong> on <strong>{currentBooking.darshanDate}</strong>?
              </p>
              <div className="mt-2 p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 text-[11px] text-stone-600 dark:text-stone-300">
                Refund amount: <strong>₹{currentBooking.totalAmount.toLocaleString('en-IN')}</strong> will be credited within 24-48 hours.
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setShowCancelModal(false)}
                className="py-2.5 px-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-50 active:scale-95"
              >
                Keep Booking
              </button>
              <button
                onClick={handleConfirmCancel}
                className="py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm active:scale-95 transition-all"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
