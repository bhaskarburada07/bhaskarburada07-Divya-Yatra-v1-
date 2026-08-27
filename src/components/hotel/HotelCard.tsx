import React from 'react';
import { Hotel } from '../../types';
import { Star, MapPin, Check, Wifi, Utensils } from 'lucide-react';

interface HotelCardProps {
  hotel: Hotel;
  isSelected?: boolean;
  onSelect: (hotel: Hotel) => void;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, isSelected = false, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(hotel)}
      className={`group relative flex items-center gap-3 p-2.5 rounded-2xl border transition-all cursor-pointer ${
        isSelected
          ? 'bg-orange-50/70 dark:bg-orange-950/40 border-orange-500 ring-2 ring-orange-500/20 shadow-md'
          : 'bg-white dark:bg-stone-900 border-stone-200/80 dark:border-stone-800/80 hover:border-orange-300 dark:hover:border-orange-800 shadow-xs'
      }`}
    >
      <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-stone-100 dark:bg-stone-800">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        {hotel.tag && (
          <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-orange-600/90 backdrop-blur-xs text-[8px] font-bold text-white uppercase rounded tracking-wider">
            {hotel.tag}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 pr-1">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 line-clamp-1">
              {hotel.name}
            </h4>
            <div className="flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400 font-semibold mt-0.5">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{hotel.rating}</span>
              <span className="text-stone-400 font-normal">({hotel.reviewCount})</span>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-stone-500 dark:text-stone-400 flex items-center gap-1 mt-1">
          <MapPin className="w-2.5 h-2.5 text-orange-500 shrink-0" />
          <span className="truncate">{hotel.distanceFromTemple}</span>
        </p>

        <div className="flex items-baseline justify-between mt-2 pt-1 border-t border-stone-100 dark:border-stone-800/70">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-extrabold text-orange-600 dark:text-orange-400">
              ₹{hotel.pricePerNight.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-stone-400">/night</span>
            <span className="text-[9px] text-stone-400 line-through">
              ₹{hotel.originalPrice}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(hotel);
            }}
            className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-colors ${
              isSelected
                ? 'bg-orange-500 text-white'
                : 'bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400 hover:bg-orange-100'
            }`}
          >
            {isSelected ? 'Selected' : 'Select'}
          </button>
        </div>
      </div>
    </div>
  );
};
