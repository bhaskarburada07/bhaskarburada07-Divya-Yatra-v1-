import React from 'react';
import { Temple } from '../../types';
import { useApp } from '../../context/AppContext';
import { Star, Clock, Heart } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface TempleCardProps {
  temple: Temple;
  variant?: 'horizontal' | 'compact' | 'featured';
  onClick?: () => void;
}

export const TempleCard: React.FC<TempleCardProps> = ({
  temple,
  variant = 'horizontal',
  onClick,
}) => {
  const { setSelectedTemple, navigateTo, wishlist, toggleWishlist } = useApp();

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      setSelectedTemple(temple);
      navigateTo('temple-details');
    }
  };

  const isFavorited = wishlist.includes(temple.id);

  if (variant === 'compact') {
    return (
      <div
        onClick={handleCardClick}
        className="group relative flex-shrink-0 w-36 sm:w-40 bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200/80 dark:border-stone-800/80 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.98]"
      >
        <div className="relative h-28 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
          <ImageWithFallback
            src={temple.image}
            alt={temple.name}
            fallbackText={temple.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            containerClassName="w-full h-full"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(temple.id);
            }}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-transform active:scale-75 z-10"
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
          <div className="absolute bottom-1.5 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-md z-10">
            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
            <span>{temple.rating}</span>
          </div>
        </div>

        <div className="p-2.5">
          <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100 line-clamp-1">
            {temple.name}
          </h3>
          <p className="text-[10px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
            {temple.location.split(',')[0]}
          </p>
        </div>
      </div>
    );
  }

  // Horizontal Card (Used in Temple Search screen matching Reference 4)
  return (
    <div
      onClick={handleCardClick}
      className="group relative flex items-center gap-3 p-2.5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.99]"
    >
      <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-stone-100 dark:bg-stone-800">
        <ImageWithFallback
          src={temple.image}
          alt={temple.name}
          fallbackText={temple.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          containerClassName="w-full h-full"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(temple.id);
          }}
          className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-transform active:scale-75 z-10"
        >
          <Heart className={`w-3 h-3 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      <div className="flex-1 min-w-0 pr-1">
        <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 line-clamp-1 leading-snug">
          {temple.name}
        </h3>
        <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
          {temple.location}
        </p>

        <div className="flex items-center gap-2.5 mt-2 text-[11px] font-medium text-stone-600 dark:text-stone-300">
          <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{temple.rating}</span>
          </div>
          <span className="text-stone-300 dark:text-stone-700">•</span>
          <div className="flex items-center gap-1 text-stone-500 dark:text-stone-400">
            <Clock className="w-3 h-3 text-orange-500" />
            <span className="truncate max-w-[100px]">{temple.waitingTime.split('(')[0]}</span>
          </div>
          <span className="text-stone-300 dark:text-stone-700">•</span>
          <div className="text-stone-500 dark:text-stone-400">
            <span>{temple.distance}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
