import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DevScreenSwitcher } from './components/common/DevScreenSwitcher';
import { BottomNav } from './components/common/BottomNav';
import { Toast } from './components/common/Toast';

// 15 Core Screens
import { SplashScreen } from './screens/SplashScreen';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { TempleSearchScreen } from './screens/TempleSearchScreen';
import { TempleDetailsScreen } from './screens/TempleDetailsScreen';
import { DarshanSlotScreen } from './screens/DarshanSlotScreen';
import { TravelBookingScreen } from './screens/TravelBookingScreen';
import { HotelBookingScreen } from './screens/HotelBookingScreen';
import { PaymentScreen } from './screens/PaymentScreen';
import { TicketConfirmationScreen } from './screens/TicketConfirmationScreen';
import { MyTripsScreen } from './screens/MyTripsScreen';
import { AIFullPlannerScreen } from './screens/AIFullPlannerScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { SettingsScreen } from './screens/SettingsScreen';

const ScreenRenderer: React.FC = () => {
  const { currentScreen } = useApp();

  switch (currentScreen) {
    case 'splash':
      return <SplashScreen />;
    case 'login':
      return <LoginScreen />;
    case 'home':
      return <HomeScreen />;
    case 'search':
      return <TempleSearchScreen />;
    case 'temple-details':
      return <TempleDetailsScreen />;
    case 'darshan-slot':
      return <DarshanSlotScreen />;
    case 'travel-booking':
      return <TravelBookingScreen />;
    case 'hotel-booking':
      return <HotelBookingScreen />;
    case 'payment':
      return <PaymentScreen />;
    case 'ticket-confirmation':
      return <TicketConfirmationScreen />;
    case 'my-trips':
      return <MyTripsScreen />;
    case 'ai-planner':
      return <AIFullPlannerScreen />;
    case 'profile':
      return <ProfileScreen />;
    case 'notifications':
      return <NotificationsScreen />;
    case 'settings':
      return <SettingsScreen />;
    default:
      return <HomeScreen />;
  }
};

const MainAppLayout: React.FC = () => {
  const [isFrameMode, setIsFrameMode] = useState(true);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans antialiased selection:bg-orange-500 selection:text-white">
      {/* Dev Quick Screen Switcher Toolbar */}
      <DevScreenSwitcher isFrameMode={isFrameMode} setIsFrameMode={setIsFrameMode} />

      {/* Main App Container */}
      <main className="flex-1 flex items-center justify-center p-0 sm:p-4 overflow-x-hidden">
        <div
          className={`w-full transition-all duration-300 ${
            isFrameMode
              ? 'max-w-[430px] h-[100dvh] sm:h-[880px] sm:max-h-[92vh] sm:rounded-[40px] sm:shadow-2xl sm:shadow-black/70 sm:ring-8 sm:ring-stone-800'
              : 'max-w-xl min-h-[100dvh]'
          } bg-[#faf8f5] dark:bg-[#0c0a09] overflow-hidden flex flex-col relative`}
        >
          {/* Active Screen */}
          <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
            <ScreenRenderer />
          </div>

          {/* Bottom Tab Bar (on root tabs) */}
          <BottomNav />

          {/* Global Floating Toast */}
          <Toast />
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppLayout />
    </AppProvider>
  );
}
