import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { PrimaryButton } from '../components/common/PrimaryButton';
import {
  ShieldCheck,
  CreditCard,
  Smartphone,
  Building,
  CheckCircle2,
  Tag,
  Lock,
  Sparkles,
} from 'lucide-react';

export const PaymentScreen: React.FC = () => {
  const {
    selectedTemple,
    darshanDate,
    darshanSlot,
    personsCount,
    darshanPricePerPerson,
    selectedTravel,
    selectedHotel,
    hotelNights,
    paymentMethod,
    setPaymentMethod,
    completePayment,
    couponCode,
    setCouponCode,
    couponDiscount,
    applyCoupon,
    showToast,
  } = useApp();

  const [isProcessing, setIsProcessing] = useState(false);
  const [promoInput, setPromoInput] = useState('DIVYA100');

  // Calculate pricing breakdown
  const darshanTotal = darshanPricePerPerson * personsCount;
  const travelTotal = selectedTravel ? selectedTravel.price * personsCount : 0;
  const hotelTotal = selectedHotel ? selectedHotel.pricePerNight * hotelNights : 0;
  const subtotal = darshanTotal + travelTotal + hotelTotal;
  const taxesAndFees = Math.round(subtotal * 0.05); // 5% GST/Service
  const grandTotal = Math.max(0, subtotal + taxesAndFees - couponDiscount);

  const handleApplyCoupon = () => {
    applyCoupon(promoInput);
  };

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      completePayment();
      setIsProcessing(false);
    }, 1500);
  };

  const paymentOptions = [
    {
      id: 'upi',
      name: 'UPI (GPay / PhonePe / Paytm / QR)',
      icon: Smartphone,
      badge: 'Fastest & Zero Fee',
      color: 'text-emerald-500',
    },
    {
      id: 'card',
      name: 'Credit / Debit Card',
      icon: CreditCard,
      badge: 'Visa, Mastercard, RuPay',
      color: 'text-blue-500',
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: Building,
      badge: 'SBI, HDFC, ICICI, Axis',
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="min-h-full pb-28 bg-[#faf8f5] dark:bg-[#0c0a09] select-none">
      <Header title="Payment & Review" showBack={true} />

      <div className="p-4 space-y-4">
        {/* Booking Summary Card (Matching Reference 9) */}
        <div className="p-4 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
            <div>
              <span className="text-[10px] uppercase font-bold text-orange-500 tracking-wider block">
                Pilgrimage Booking
              </span>
              <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                {selectedTemple.name}
              </h3>
            </div>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
              {darshanDate}
            </span>
          </div>

          {/* Breakdown items */}
          <div className="py-3 space-y-2 text-xs border-b border-stone-100 dark:border-stone-800">
            <div className="flex justify-between items-center">
              <span className="text-stone-600 dark:text-stone-400">
                Darshan Token ({personsCount} {personsCount > 1 ? 'Persons' : 'Person'} • {darshanSlot.split('-')[0]})
              </span>
              <span className="font-bold text-stone-900 dark:text-stone-100">
                ₹{darshanTotal.toLocaleString('en-IN')}
              </span>
            </div>

            {selectedTravel && (
              <div className="flex justify-between items-center">
                <span className="text-stone-600 dark:text-stone-400">
                  Travel ({selectedTravel.operatorOrName} • {personsCount}x)
                </span>
                <span className="font-bold text-stone-900 dark:text-stone-100">
                  ₹{travelTotal.toLocaleString('en-IN')}
                </span>
              </div>
            )}

            {selectedHotel && (
              <div className="flex justify-between items-center">
                <span className="text-stone-600 dark:text-stone-400">
                  Hotel Stay ({selectedHotel.name} • {hotelNights}N)
                </span>
                <span className="font-bold text-stone-900 dark:text-stone-100">
                  ₹{hotelTotal.toLocaleString('en-IN')}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center text-stone-500">
              <span>Taxes & Temple Trust Donation</span>
              <span>₹{taxesAndFees.toLocaleString('en-IN')}</span>
            </div>

            {couponDiscount > 0 && (
              <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>Promo Discount ({couponCode})</span>
                <span>-₹{couponDiscount}</span>
              </div>
            )}
          </div>

          {/* Total Row */}
          <div className="pt-3 flex justify-between items-baseline">
            <div>
              <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                Total Payable Amount
              </span>
              <span className="block text-[10px] text-stone-400">
                Includes all temple trusts & taxes
              </span>
            </div>
            <div className="text-lg font-extrabold text-orange-600 dark:text-orange-400">
              ₹{grandTotal.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Promo Code Input */}
        <div className="p-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 flex items-center gap-2">
          <Tag className="w-4 h-4 text-orange-500 shrink-0" />
          <input
            type="text"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
            placeholder="Enter Promo Code (DIVYA100)"
            className="flex-1 bg-transparent text-xs font-bold text-stone-900 dark:text-stone-100 outline-none uppercase placeholder:normal-case"
          />
          <button
            onClick={handleApplyCoupon}
            className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-bold hover:bg-orange-500 hover:text-white transition-colors"
          >
            Apply
          </button>
        </div>

        {/* Payment Methods (Matching Reference 9) */}
        <div>
          <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 mb-2.5 px-1">
            Select Payment Method
          </h4>
          <div className="space-y-2.5">
            {paymentOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = paymentMethod === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setPaymentMethod(opt.id as any)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-orange-50/80 dark:bg-orange-950/40 border-orange-500 shadow-xs ring-2 ring-orange-500/20'
                      : 'bg-white dark:bg-stone-900 border-stone-200/80 dark:border-stone-800 hover:border-orange-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-stone-100 dark:bg-stone-800 ${opt.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block">
                        {opt.name}
                      </span>
                      <span className="text-[10px] text-stone-400">{opt.badge}</span>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'border-orange-500 bg-orange-500 text-white'
                        : 'border-stone-300 dark:border-stone-700'
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 py-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>256-Bit SSL Encrypted & Verified by Temple Trust</span>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200/80 dark:border-stone-800/80 p-3.5">
        <PrimaryButton onClick={handlePayNow} disabled={isProcessing} size="lg">
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Allocating Sacred Pass...
            </span>
          ) : (
            `Pay ₹${grandTotal.toLocaleString('en-IN')}`
          )}
        </PrimaryButton>
      </div>

      {/* Processing Animation Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm p-6 text-white text-center">
          <div className="w-20 h-20 rounded-full bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center mb-4 animate-pulse">
            <span className="text-3xl animate-bounce">🪔</span>
          </div>
          <h3 className="text-base font-bold">Connecting with Temple Gateway...</h3>
          <p className="text-xs text-stone-300 mt-1 max-w-xs">
            Allocating verified sacred queue token for {selectedTemple.name}. Please do not refresh.
          </p>
        </div>
      )}
    </div>
  );
};
