export type ScreenType =
  | 'splash'
  | 'login'
  | 'home'
  | 'search'
  | 'temple-details'
  | 'darshan-slot'
  | 'travel-booking'
  | 'hotel-booking'
  | 'payment'
  | 'ticket-confirmation'
  | 'my-trips'
  | 'ai-planner'
  | 'profile'
  | 'notifications'
  | 'settings';

export interface Temple {
  id: string;
  name: string;
  deity: string;
  location: string;
  state: string;
  rating: number;
  reviewsCount: string;
  waitingTime: string;
  distance: string;
  image: string;
  description: string;
  timings: {
    suprabhatam?: string;
    sarvaDarshan: string;
    vipDarshan?: string;
    eveningAarti?: string;
    closingTime: string;
  };
  sevas: {
    id: string;
    name: string;
    time: string;
    price: number;
    description: string;
  }[];
  facilities: string[];
  nearbyAttractions: {
    name: string;
    distance: string;
    image: string;
  }[];
  gallery: string[];
  slotsAvailable: {
    time: string;
    price: number;
    available: boolean;
    quota: string;
  }[];
}

export interface TravelOption {
  id: string;
  type: 'train' | 'bus' | 'flight';
  operatorOrName: string;
  number?: string;
  fromCode: string;
  fromCity: string;
  toCode: string;
  toCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  classType: string;
  seatsLeft: number;
  badge?: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  rating: number;
  reviewCount: string;
  distanceFromTemple: string;
  pricePerNight: number;
  originalPrice: number;
  image: string;
  amenities: string[];
  tag?: string;
  roomType: string;
}

export interface BookingState {
  bookingId: string;
  temple: Temple;
  templeId: string;
  templeName: string;
  templeLocation: string;
  templeImage: string;
  darshanDate: string; // e.g. "9 June 2026"
  darshanSlot: string; // e.g. "07:00 AM - 08:00 AM"
  personsCount: number;
  darshanPricePerPerson: number;
  darshanAmount: number;
  travel: TravelOption | null;
  travelAmount: number;
  hotel: Hotel | null;
  hotelNights: number;
  hotelAmount: number;
  taxesAndFees: number;
  couponCode: string;
  couponDiscount: number;
  totalAmount: number;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'wallet';
  paymentStatus: 'SUCCESS' | 'FAILED' | 'REFUNDED';
  status: 'confirmed' | 'upcoming' | 'completed' | 'cancelled';
  createdAt: string;
  bookingTime: string;
  qrData: string;
  devoteeNames: string[];
  primaryContact: {
    name: string;
    phone: string;
    email: string;
  };
}

export interface NotificationItem {
  id: string;
  type: 'booking' | 'reminder' | 'festival' | 'offer' | 'payment';
  title: string;
  description: string;
  timeAgo: string;
  isRead: boolean;
  actionUrl?: ScreenType;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  itineraryPlan?: {
    templeName: string;
    daysCount: number;
    estimatedBudget: string;
  };
}

export interface WalletTransaction {
  id: string;
  title: string;
  amount: number;
  type: 'credit' | 'debit';
  date: string;
  description: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  avatar: string;
  gotra: string;
  rashi: string;
  idProof: string;
  dob?: string;
  gender?: string;
  addresses: {
    id: string;
    title: string;
    addressLine: string;
    city: string;
    state: string;
    pincode: string;
    isDefault: boolean;
  }[];
}
