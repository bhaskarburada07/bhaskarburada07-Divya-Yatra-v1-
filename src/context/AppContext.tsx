import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  ScreenType,
  Temple,
  TravelOption,
  Hotel,
  BookingState,
  NotificationItem,
  AIChatMessage,
  UserProfile,
  WalletTransaction,
} from '../types';
import {
  TEMPLES_DATA,
  INITIAL_USER_PROFILE,
  INITIAL_WALLET_TRANSACTIONS,
} from '../data/mockData';

interface AppContextType {
  currentScreen: ScreenType;
  screenHistory: ScreenType[];
  navigateTo: (screen: ScreenType) => void;
  goBack: () => void;
  isLoggedIn: boolean;
  login: (phoneOrEmail: string) => void;
  logout: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setThemeMode: (mode: 'light' | 'dark') => void;
  language: string;
  setLanguage: (lang: string) => void;
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  
  // Wallet & Rewards
  divyaCoins: number;
  walletTransactions: WalletTransaction[];
  addWalletCoins: (amount: number, title: string, description?: string) => void;
  redeemWalletCoins: (amount: number, title: string, description?: string) => boolean;

  // Temples & Search
  temples: Temple[];
  selectedTemple: Temple;
  setSelectedTemple: (temple: Temple) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedStateFilter: string;
  setSelectedStateFilter: (state: string) => void;
  wishlist: string[];
  toggleWishlist: (templeId: string) => void;

  // Active Booking flow draft state
  darshanDate: string;
  setDarshanDate: (date: string) => void;
  darshanSlot: string;
  setDarshanSlot: (slot: string) => void;
  personsCount: number;
  setPersonsCount: (count: number | ((prev: number) => number)) => void;
  darshanPricePerPerson: number;
  setDarshanPricePerPerson: (price: number) => void;
  
  // Travel
  selectedTravel: TravelOption | null;
  setSelectedTravel: (travel: TravelOption | null) => void;
  travelMode: 'train' | 'bus' | 'flight';
  setTravelMode: (mode: 'train' | 'bus' | 'flight') => void;
  travelFrom: string;
  setTravelFrom: (from: string) => void;
  travelTo: string;
  setTravelTo: (to: string) => void;

  // Hotel
  selectedHotel: Hotel | null;
  setSelectedHotel: (hotel: Hotel | null) => void;
  hotelNights: number;
  setHotelNights: (nights: number) => void;

  // Payment & Confirmation
  couponCode: string;
  setCouponCode: (code: string) => void;
  couponDiscount: number;
  applyCoupon: (code: string) => boolean;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'wallet';
  setPaymentMethod: (method: 'upi' | 'card' | 'netbanking' | 'wallet') => void;
  currentBooking: BookingState | null;
  setCurrentBooking: (booking: BookingState | null) => void;
  startNewBooking: (temple?: Temple) => void;
  completePayment: () => void;
  cancelBooking: (bookingId: string) => void;

  // My Trips & Bookings
  myTrips: BookingState[];
  activeTripTab: 'upcoming' | 'completed' | 'cancelled';
  setActiveTripTab: (tab: 'upcoming' | 'completed' | 'cancelled') => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadNotificationsCount: number;

  // AI Pilgrimage Planner
  chatMessages: AIChatMessage[];
  isAiTyping: boolean;
  sendChatMessage: (message: string) => Promise<void>;
  clearChat: () => void;

  // Global toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const [screenHistory, setScreenHistory] = useState<ScreenType[]>(['splash']);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<string>('English');
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('divyayatra_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_USER_PROFILE, ...parsed };
      }
    } catch (e) {}
    return INITIAL_USER_PROFILE;
  });

  const [divyaCoins, setDivyaCoins] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('divyayatra_coins');
      if (saved !== null) return Number(saved) || 0;
    } catch (e) {}
    return 450;
  });

  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(() => {
    try {
      const saved = localStorage.getItem('divyayatra_wallet_tx');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return INITIAL_WALLET_TRANSACTIONS;
  });

  // Persist userProfile, coins & wallet transactions
  useEffect(() => {
    try {
      localStorage.setItem('divyayatra_user_profile', JSON.stringify(userProfile));
    } catch (e) {}
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('divyayatra_coins', divyaCoins.toString());
    } catch (e) {}
  }, [divyaCoins]);

  useEffect(() => {
    try {
      localStorage.setItem('divyayatra_wallet_tx', JSON.stringify(walletTransactions));
    } catch (e) {}
  }, [walletTransactions]);

  const addWalletCoins = (amount: number, title: string, description: string = '') => {
    setDivyaCoins((prev) => prev + amount);
    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      title,
      amount,
      type: 'credit',
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      description: description || `Credited ₹${amount} reward coins`,
    };
    setWalletTransactions((prev) => [newTx, ...prev]);
  };

  const redeemWalletCoins = (amount: number, title: string, description: string = ''): boolean => {
    if (divyaCoins < amount) {
      showToast('Insufficient Divya Coins balance');
      return false;
    }
    setDivyaCoins((prev) => Math.max(0, prev - amount));
    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      title,
      amount,
      type: 'debit',
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      description: description || `Redeemed ₹${amount} coins for pilgrimage`,
    };
    setWalletTransactions((prev) => [newTx, ...prev]);
    return true;
  };

  const [temples] = useState<Temple[]>(TEMPLES_DATA);
  const [selectedTemple, setSelectedTemple] = useState<Temple>(TEMPLES_DATA[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('All');
  const [wishlist, setWishlist] = useState<string[]>(['tirupati', 'vaishnodevi', 'kedarnath']);

  // Booking Flow Draft State
  const [darshanDate, setDarshanDate] = useState<string>('9 June 2026');
  const [darshanSlot, setDarshanSlot] = useState<string>('07:00 AM - 08:00 AM');
  const [personsCount, setPersonsCount] = useState<number>(2);
  const [darshanPricePerPerson, setDarshanPricePerPerson] = useState<number>(300);

  // Travel State
  const [selectedTravel, setSelectedTravel] = useState<TravelOption | null>(null);
  const [travelMode, setTravelMode] = useState<'train' | 'bus' | 'flight'>('train');
  const [travelFrom, setTravelFrom] = useState<string>('Visakhapatnam (VSKP)');
  const [travelTo, setTravelTo] = useState<string>('Tirupati (TPTY)');

  // Hotel State
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [hotelNights, setHotelNights] = useState<number>(1);

  // Coupon & Payment
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');

  // Real Bookings storage key helper for user-specific isolation
  const getStorageKey = (profile: UserProfile) => {
    const identifier = profile.email || profile.phone || 'default_user';
    return `divyayatra_bookings_${identifier.replace(/[^a-zA-Z0-9]/g, '_')}`;
  };

  // Real Bookings list - starts empty by default or loads user's saved bookings
  const [myTrips, setMyTrips] = useState<BookingState[]>(() => {
    try {
      const saved = localStorage.getItem(getStorageKey(INITIAL_USER_PROFILE));
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load trips from storage', e);
    }
    return [];
  });

  const [currentBooking, setCurrentBooking] = useState<BookingState | null>(null);
  const [activeTripTab, setActiveTripTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  // Sync trips when user profile changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(getStorageKey(userProfile));
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setMyTrips(parsed);
          return;
        }
      }
      setMyTrips([]);
    } catch (e) {
      console.warn('Failed to sync trips for user', e);
    }
  }, [userProfile.email, userProfile.phone]);

  // Persist trips to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem(getStorageKey(userProfile), JSON.stringify(myTrips));
    } catch (e) {
      console.warn('Failed to persist trips to storage', e);
    }
  }, [myTrips, userProfile]);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n-welcome',
      type: 'festival',
      title: 'Welcome to DivyaYatra 🙏',
      description: 'Your sacred pilgrimage platform for authentic darshan tokens, travel, and satvik stays.',
      timeAgo: 'Just now',
      isRead: false,
      actionUrl: 'search',
    },
    {
      id: 'n-offer',
      type: 'offer',
      title: 'Special Offer For You! 🎁',
      description: 'Use coupon code DIVYA100 to get instant ₹100 off on your next pilgrimage booking.',
      timeAgo: '1 day ago',
      isRead: false,
      actionUrl: 'search',
    },
  ]);

  // AI Chat
  const [chatMessages, setChatMessages] = useState<AIChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'user',
      text: 'I want a 2 day trip to Tirupati from Visakhapatnam',
      timestamp: '10:30 AM',
    },
    {
      id: 'msg-2',
      sender: 'ai',
      text: `🙏 **Here is your personalised trip plan for Tirupati:**\n\n**🗓️ 2 Days Sacred Darshan Plan**\n\n**Day 1**\n• **Morning:** Travel to Tirupati (Vande Bharat Exp / Flight)\n• **Afternoon:** Hotel check-in & freshen up\n• **Evening:** Local sightseeing (Padmavathi Ammavari Temple & Kapileswara Swamy)\n\n**Day 2**\n• **Morning:** Holy Darshan of Lord Venkateswara at Tirumala (07:00 AM slot)\n• **Afternoon:** Shopping & Laddu Prasadam collection\n• **Evening:** Return to Visakhapatnam\n\n**💰 Estimated Budget:** ₹4,500 per person`,
      timestamp: '10:31 AM',
    },
  ]);
  const [isAiTyping, setIsAiTyping] = useState<boolean>(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Theme synchronization with html class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    showToast(`Switched to ${theme === 'light' ? 'Dark' : 'Light'} Mode`);
  };

  const setThemeMode = (mode: 'light' | 'dark') => {
    setTheme(mode);
  };

  // Navigation handlers
  const navigateTo = (screen: ScreenType) => {
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop();
      const previousScreen = newHistory[newHistory.length - 1];
      setScreenHistory(newHistory);
      setCurrentScreen(previousScreen);
    } else {
      setCurrentScreen('home');
    }
  };

  const login = (phoneOrEmail: string) => {
    setIsLoggedIn(true);
    setUserProfile((prev) => ({
      ...prev,
      phone: phoneOrEmail.includes('@') ? prev.phone : phoneOrEmail,
      email: phoneOrEmail.includes('@') ? phoneOrEmail : prev.email,
    }));
    showToast('Welcome to DivyaYatra! 🙏');
    navigateTo('home');
  };

  const logout = () => {
    setIsLoggedIn(false);
    showToast('Logged out successfully');
    navigateTo('login');
  };

  const updateUserProfile = (newProfile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...newProfile }));
    showToast('Profile updated successfully');
  };

  const toggleWishlist = (templeId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(templeId);
      const updated = exists ? prev.filter((id) => id !== templeId) : [...prev, templeId];
      showToast(exists ? 'Removed from Wishlist' : 'Added to Divine Wishlist 🕉️');
      return updated;
    });
  };

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'DIVYA100' || clean === 'FIRSTYATRA') {
      setCouponCode(clean);
      setCouponDiscount(100);
      showToast('₹100 Divine Discount Applied! 🎉');
      return true;
    } else if (clean === 'FESTIVAL200') {
      setCouponCode(clean);
      setCouponDiscount(200);
      showToast('₹200 Festival Discount Applied! 🎉');
      return true;
    } else {
      showToast('Invalid Coupon Code');
      return false;
    }
  };

  const startNewBooking = (temple?: Temple) => {
    if (temple) {
      setSelectedTemple(temple);
      setTravelTo(`${temple.location.split(',')[0]} (${temple.name.split(' ')[0]})`);
    }
    setDarshanDate('9 June 2026');
    setDarshanSlot('07:00 AM - 08:00 AM');
    setPersonsCount(2);
    setDarshanPricePerPerson(300);
    setSelectedTravel(null);
    setSelectedHotel(null);
    setHotelNights(1);
    setCouponCode('');
    setCouponDiscount(0);
    setPaymentMethod('upi');
    
    if (temple) {
      navigateTo('darshan-slot');
    } else {
      navigateTo('search');
    }
  };

  const completePayment = () => {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const newBookingId = `DYT260800${randomSuffix}`;
    
    const darshanAmount = darshanPricePerPerson * personsCount;
    const travelAmount = selectedTravel ? selectedTravel.price * personsCount : 0;
    const hotelAmount = selectedHotel ? selectedHotel.pricePerNight * hotelNights : 0;
    const subtotal = darshanAmount + travelAmount + hotelAmount;
    const taxesAndFees = Math.round(subtotal * 0.05);
    const totalAmount = Math.max(0, subtotal + taxesAndFees - couponDiscount);

    const now = new Date();
    const formattedBookingTime = now.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }) + ', ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const qrPayload = `DIVYAYATRA:${newBookingId}:${selectedTemple.name}:${darshanDate}:${darshanSlot}:${personsCount}DEVOTEES:INR_${totalAmount}`;

    const newBooking: BookingState = {
      bookingId: newBookingId,
      temple: selectedTemple,
      templeId: selectedTemple.id,
      templeName: selectedTemple.name,
      templeLocation: selectedTemple.location,
      templeImage: selectedTemple.image,
      darshanDate: darshanDate,
      darshanSlot: darshanSlot,
      personsCount: personsCount,
      darshanPricePerPerson: darshanPricePerPerson,
      darshanAmount: darshanAmount,
      travel: selectedTravel,
      travelAmount: travelAmount,
      hotel: selectedHotel,
      hotelNights: hotelNights,
      hotelAmount: hotelAmount,
      taxesAndFees: taxesAndFees,
      couponCode: couponCode,
      couponDiscount: couponDiscount,
      totalAmount: totalAmount,
      paymentMethod: paymentMethod,
      paymentStatus: 'SUCCESS',
      status: 'confirmed',
      createdAt: now.toISOString(),
      bookingTime: formattedBookingTime,
      qrData: qrPayload,
      devoteeNames: Array.from({ length: personsCount }, (_, i) =>
        i === 0 ? userProfile.name : `Devotee ${i + 1} (${userProfile.name.split(' ')[0]} Family)`
      ),
      primaryContact: {
        name: userProfile.name,
        phone: userProfile.phone,
        email: userProfile.email,
      },
    };

    setMyTrips((prev) => [newBooking, ...prev]);
    setCurrentBooking(newBooking);

    // Add confirmation and reminder notifications
    const confirmNotif: NotificationItem = {
      id: `notif-${Date.now()}-confirm`,
      type: 'booking',
      title: 'Booking Confirmed 🎉',
      description: `Your ${selectedTemple.name} Darshan booking for ${darshanDate} (${darshanSlot}) has been confirmed.`,
      timeAgo: 'Just now',
      isRead: false,
      actionUrl: 'ticket-confirmation',
    };

    const reminderNotif: NotificationItem = {
      id: `notif-${Date.now()}-remind`,
      type: 'reminder',
      title: 'Darshan Reminder ⏰',
      description: `Reporting slot for ${selectedTemple.name} is ${darshanSlot} on ${darshanDate}. Please carry original Aadhaar ID card.`,
      timeAgo: 'Just now',
      isRead: false,
      actionUrl: 'my-trips',
    };

    setNotifications((prev) => [confirmNotif, reminderNotif, ...prev]);

    // Award bonus 100 Divya Coins for pilgrimage booking
    addWalletCoins(100, `Yatra Reward - ${selectedTemple.name}`, `Earned 100 Divya Coins for Darshan booking #${newBookingId}`);

    showToast(`Payment Successful! Booking ${newBookingId} Confirmed 🙏`);
    navigateTo('ticket-confirmation');
  };

  const cancelBooking = (bookingId: string) => {
    let targetTempleName = 'Temple';
    setMyTrips((prev) =>
      prev.map((trip) => {
        if (trip.bookingId === bookingId) {
          targetTempleName = trip.templeName || trip.temple?.name || 'Temple';
          return {
            ...trip,
            status: 'cancelled',
            paymentStatus: 'REFUNDED',
          };
        }
        return trip;
      })
    );

    if (currentBooking && currentBooking.bookingId === bookingId) {
      setCurrentBooking((prev) => (prev ? { ...prev, status: 'cancelled', paymentStatus: 'REFUNDED' } : null));
    }

    // Add notification for cancellation
    const cancelNotif: NotificationItem = {
      id: `notif-${Date.now()}-cancel`,
      type: 'booking',
      title: 'Booking Cancelled ⚠️',
      description: `Your ${targetTempleName} booking (${bookingId}) has been cancelled. Refund will be processed in 24-48 hours.`,
      timeAgo: 'Just now',
      isRead: false,
      actionUrl: 'my-trips',
    };
    setNotifications((prev) => [cancelNotif, ...prev]);

    showToast(`Booking ${bookingId} has been cancelled.`);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('All notifications marked as read');
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  const sendChatMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMsg: AIChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsAiTyping(true);

    try {
      const res = await fetch('/api/ai-planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: message,
          history: chatMessages.slice(-4),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: AIChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: data.plan,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setChatMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error('API request failed');
      }
    } catch (e) {
      setTimeout(() => {
        let reply = `🙏 **Namaste Devotee! Here is your tailored pilgrimage itinerary:**\n\n**🗓️ 2 Days Sacred Darshan Plan**\n\n• **Day 1:** Arrival, hotel check-in, sacred pushkarini bath, and evening temple aarti.\n• **Day 2:** Early morning VIP / Special Entry Darshan (06:00 AM), holy laddu collection, and return travel.\n\n**💰 Estimated Budget:** ₹4,200 - ₹5,500 per person.`;
        if (message.toLowerCase().includes('shirdi')) {
          reply = `🙏 **Om Sai Ram! Here is your 2-Day Shirdi Itinerary:**\n\n• **Day 1:** Arrival at Shirdi, Samadhi Mandir Darshan, Dwarkamai & Chavadi visit, evening Dhoop Aarti.\n• **Day 2:** Early morning Kakad Aarti (04:30 AM), excursion to Shani Shingnapur (70 km), return by evening.`;
        }
        const aiMsg: AIChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setChatMessages((prev) => [...prev, aiMsg]);
      }, 1000);
    } finally {
      setIsAiTyping(false);
    }
  };

  const clearChat = () => {
    setChatMessages([]);
    showToast('Conversation cleared');
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        screenHistory,
        navigateTo,
        goBack,
        isLoggedIn,
        login,
        logout,
        theme,
        toggleTheme,
        setThemeMode,
        language,
        setLanguage,
        userProfile,
        updateUserProfile,
        temples,
        selectedTemple,
        setSelectedTemple,
        searchQuery,
        setSearchQuery,
        selectedStateFilter,
        setSelectedStateFilter,
        wishlist,
        toggleWishlist,
        darshanDate,
        setDarshanDate,
        darshanSlot,
        setDarshanSlot,
        personsCount,
        setPersonsCount,
        darshanPricePerPerson,
        setDarshanPricePerPerson,
        selectedTravel,
        setSelectedTravel,
        travelMode,
        setTravelMode,
        travelFrom,
        setTravelFrom,
        travelTo,
        setTravelTo,
        selectedHotel,
        setSelectedHotel,
        hotelNights,
        setHotelNights,
        couponCode,
        setCouponCode,
        couponDiscount,
        applyCoupon,
        paymentMethod,
        setPaymentMethod,
        currentBooking,
        setCurrentBooking,
        startNewBooking,
        completePayment,
        cancelBooking,
        myTrips,
        activeTripTab,
        setActiveTripTab,
        divyaCoins,
        walletTransactions,
        addWalletCoins,
        redeemWalletCoins,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        unreadNotificationsCount,
        chatMessages,
        isAiTyping,
        sendChatMessage,
        clearChat,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
