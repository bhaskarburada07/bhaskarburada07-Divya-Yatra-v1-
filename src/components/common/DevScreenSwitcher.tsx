import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ScreenType } from '../../types';
import { Smartphone, Monitor, Sun, Moon, Layers, ChevronDown } from 'lucide-react';

export const DevScreenSwitcher: React.FC<{
  isFrameMode: boolean;
  setIsFrameMode: (val: boolean) => void;
}> = ({ isFrameMode, setIsFrameMode }) => {
  const { currentScreen, navigateTo, theme, toggleTheme } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const screens: { id: ScreenType; label: string; num: number }[] = [
    { id: 'splash', label: '1. Splash Screen', num: 1 },
    { id: 'login', label: '2. Login / Signup', num: 2 },
    { id: 'home', label: '3. Home', num: 3 },
    { id: 'search', label: '4. Temple Search', num: 4 },
    { id: 'temple-details', label: '5. Temple Details', num: 5 },
    { id: 'darshan-slot', label: '6. Darshan Slot Selection', num: 6 },
    { id: 'travel-booking', label: '7. Travel Booking', num: 7 },
    { id: 'hotel-booking', label: '8. Hotel Booking', num: 8 },
    { id: 'payment', label: '9. Payment', num: 9 },
    { id: 'ticket-confirmation', label: '10. Ticket Confirmation (QR)', num: 10 },
    { id: 'my-trips', label: '11. My Trips', num: 10 },
    { id: 'ai-planner', label: '12. AI Pilgrimage Planner', num: 12 },
    { id: 'profile', label: '13. Profile', num: 13 },
    { id: 'notifications', label: '14. Notifications', num: 14 },
    { id: 'settings', label: '15. Settings', num: 15 },
  ];

  const currentScreenObj = screens.find((s) => s.id === currentScreen);

  return (
    <div className="w-full bg-stone-900 text-stone-200 border-b border-stone-800 text-xs py-1.5 px-3 select-none flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 font-bold text-amber-400">
          <span className="text-sm">🕉️</span>
          <span className="tracking-wide uppercase text-[11px]">DivyaYatra</span>
        </div>

        {/* Screen Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 bg-stone-800 hover:bg-stone-750 text-stone-100 px-2.5 py-1 rounded-lg border border-stone-700 font-medium transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-orange-400" />
            <span className="truncate max-w-[150px] sm:max-w-[220px]">
              {currentScreenObj?.label || 'Select Screen'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </button>

          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              />
              <div className="absolute left-0 mt-1.5 w-64 max-h-96 overflow-y-auto bg-stone-900 border border-stone-700 rounded-xl shadow-2xl z-50 p-1.5 divide-y divide-stone-800/60 no-scrollbar">
                <div className="px-2.5 py-1 text-[10px] uppercase font-bold text-amber-500 tracking-wider">
                  The 15 Core DivyaYatra Screens
                </div>
                <div className="py-1">
                  {screens.map((screen) => (
                    <button
                      key={screen.id}
                      onClick={() => {
                        navigateTo(screen.id);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        currentScreen === screen.id
                          ? 'bg-orange-500/20 text-orange-400 font-semibold border border-orange-500/30'
                          : 'text-stone-300 hover:bg-stone-800'
                      }`}
                    >
                      <span>{screen.label}</span>
                      {currentScreen === screen.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Dark/Light mode toggle */}
        <button
          onClick={toggleTheme}
          title="Toggle Dark/Light theme"
          className="flex items-center gap-1 bg-stone-800 hover:bg-stone-700 text-stone-300 px-2 py-1 rounded-md border border-stone-700 transition-colors"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline text-[10px]">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-blue-300" />
              <span className="hidden sm:inline text-[10px]">Dark</span>
            </>
          )}
        </button>

        {/* Mobile Mockup Toggle */}
        <button
          onClick={() => setIsFrameMode(!isFrameMode)}
          title="Toggle Mobile Device Frame / Full Width"
          className="flex items-center gap-1 bg-stone-800 hover:bg-stone-700 text-stone-300 px-2 py-1 rounded-md border border-stone-700 transition-colors"
        >
          {isFrameMode ? (
            <>
              <Monitor className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline text-[10px]">Full View</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline text-[10px]">App Frame</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
