import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import {
  Bell,
  CheckCheck,
  Calendar,
  Tag,
  Train,
  Flame,
  Info,
  Clock,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { NotificationItem } from '../types';

export const NotificationsScreen: React.FC = () => {
  const { notifications, markAllNotificationsRead, markNotificationRead, navigateTo, showToast } =
    useApp();

  const [activeCategory, setActiveCategory] = useState<'all' | 'booking' | 'reminder' | 'offer'>('all');

  const filtered = notifications.filter((n) => {
    if (activeCategory === 'all') return true;
    return n.type === activeCategory;
  });

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'booking':
        return <Flame className="w-4 h-4 text-orange-500" />;
      case 'reminder':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'offer':
        return <Tag className="w-4 h-4 text-emerald-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const handleNotificationClick = (item: NotificationItem) => {
    markNotificationRead(item.id);
    if (item.actionUrl) {
      navigateTo(item.actionUrl);
    } else {
      showToast(`Notification: ${item.title}`);
    }
  };

  return (
    <div className="min-h-full pb-24 bg-[#faf8f5] dark:bg-[#0c0a09] select-none">
      <Header
        title="Notifications"
        showBack={true}
        rightElement={
          <button
            onClick={() => {
              markAllNotificationsRead();
              showToast('All notifications marked as read');
            }}
            className="flex items-center gap-1 text-xs font-bold text-orange-500 hover:text-orange-600 px-2 py-1"
          >
            <CheckCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Mark Read</span>
          </button>
        }
      />

      <div className="p-4 space-y-4">
        {/* Category Filter Pills (Matching Reference 14) */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'all', label: 'All' },
            { id: 'booking', label: 'Bookings' },
            { id: 'reminder', label: 'Aarti & Darshan' },
            { id: 'offer', label: 'Offers' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-stone-600 dark:text-stone-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-2.5">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => handleNotificationClick(item)}
                className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  !item.isRead
                    ? 'bg-orange-50/60 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900/60 shadow-xs'
                    : 'bg-white dark:bg-stone-900 border-stone-200/80 dark:border-stone-800 hover:border-stone-300'
                }`}
              >
                <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 shrink-0">
                  {getIcon(item.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`text-xs ${
                        !item.isRead ? 'font-extrabold text-stone-900 dark:text-stone-100' : 'font-semibold text-stone-700 dark:text-stone-300'
                      } line-clamp-1`}
                    >
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-stone-400 shrink-0 ml-2">{item.timeAgo}</span>
                  </div>

                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {!item.isRead && (
                    <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-orange-500">
                      <span>View details</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  )}
                </div>

                {!item.isRead && (
                  <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0 mt-1" />
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-16 px-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800">
              <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto mb-2">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                No Notifications
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                You're all caught up on your sacred alerts.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
