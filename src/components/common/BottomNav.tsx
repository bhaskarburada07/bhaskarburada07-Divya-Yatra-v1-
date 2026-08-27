import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Search, Compass, User, CalendarDays } from 'lucide-react';
import { ScreenType } from '../../types';

export const BottomNav: React.FC = () => {
  const { currentScreen, navigateTo } = useApp();

  const navItems: { id: ScreenType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'my-trips', label: 'My Trips', icon: CalendarDays },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  // Only show bottom nav on core root screens
  const showNavScreens: ScreenType[] = ['home', 'search', 'my-trips', 'profile'];
  if (!showNavScreens.includes(currentScreen)) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200/80 dark:border-stone-800/80 px-4 py-2 transition-all">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;

          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 relative group ${
                isActive
                  ? 'text-orange-500 dark:text-orange-400 font-semibold'
                  : 'text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'
              }`}
            >
              <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-orange-50 dark:bg-orange-950/50 scale-110' : ''}`}>
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
              </div>
              <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
              {isActive && (
                <div className="w-1 h-1 bg-orange-500 rounded-full mt-0.5 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
