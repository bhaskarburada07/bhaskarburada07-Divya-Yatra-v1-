import React from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronLeft, Bell, Heart, Share2, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  showNotifications?: boolean;
  showFavorite?: boolean;
  templeId?: string;
  rightElement?: React.ReactNode;
  transparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = true,
  onBack,
  showNotifications = false,
  showFavorite = false,
  templeId,
  rightElement,
  transparent = false,
}) => {
  const { goBack, navigateTo, unreadNotificationsCount, wishlist, toggleWishlist, theme, toggleTheme } = useApp();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
  };

  const isFavorited = templeId ? wishlist.includes(templeId) : false;

  return (
    <div className={`sticky top-0 z-30 transition-all ${
      transparent 
        ? 'bg-gradient-to-b from-black/60 via-black/20 to-transparent text-white' 
        : 'bg-[#faf8f5]/95 dark:bg-[#0c0a09]/95 backdrop-blur-md border-b border-stone-200/60 dark:border-stone-800/60 text-stone-900 dark:text-stone-100'
    }`}>
      {/* Mobile Top Status Bar Simulation */}
      <div className="flex items-center justify-between px-6 pt-2 pb-1 text-[11px] font-medium tracking-tight opacity-75 select-none">
        <span className="font-semibold">9:41</span>
        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z"/>
          </svg>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4z"/>
          </svg>
          <div className="w-5 h-2.5 border border-current rounded-sm p-0.5 flex items-center">
            <div className="h-full w-3 bg-current rounded-2xs"></div>
          </div>
        </div>
      </div>

      {/* Main App Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 min-h-[48px]">
        <div className="flex items-center gap-2">
          {showBack && (
            <button
              onClick={handleBack}
              aria-label="Go Back"
              className={`p-2 rounded-xl transition-colors active:scale-95 ${
                transparent
                  ? 'bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm'
                  : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {title && (
            <div className="flex flex-col">
              <h1 className="text-base font-bold tracking-tight line-clamp-1">{title}</h1>
              {subtitle && (
                <span className="text-[11px] text-stone-500 dark:text-stone-400 font-normal">
                  {subtitle}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-1.5">
          {showFavorite && templeId && (
            <button
              onClick={() => toggleWishlist(templeId)}
              aria-label="Toggle Favorite"
              className={`p-2 rounded-xl transition-transform active:scale-90 ${
                transparent
                  ? 'bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm'
                  : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
              }`}
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isFavorited ? 'fill-rose-500 text-rose-500' : ''
                }`}
              />
            </button>
          )}

          {showNotifications && (
            <button
              onClick={() => navigateTo('notifications')}
              aria-label="Notifications"
              className="relative p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <Bell className="w-5 h-5 text-stone-700 dark:text-stone-300" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-white dark:ring-stone-900 animate-pulse" />
              )}
            </button>
          )}

          {rightElement}
        </div>
      </div>
    </div>
  );
};
