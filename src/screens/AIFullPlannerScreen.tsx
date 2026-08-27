import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { PrimaryButton } from '../components/common/PrimaryButton';
import {
  Sparkles,
  Send,
  User,
  Compass,
  Calendar,
  IndianRupee,
  MapPin,
  Clock,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

export const AIFullPlannerScreen: React.FC = () => {
  const { chatMessages, isAiTyping, sendChatMessage, clearChat, navigateTo, showToast } =
    useApp();

  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedTemplePrompt, setSelectedTemplePrompt] = useState('Tirupati');
  const [startCity, setStartCity] = useState('Bangalore');
  const [daysCount, setDaysCount] = useState('2');
  const [budgetTier, setBudgetTier] = useState('Moderate (₹8,000 - ₹15,000)');
  const [travelPreference, setTravelPreference] = useState('Train (Vande Bharat)');

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAiTyping]);

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || isAiTyping) return;
    sendChatMessage(inputPrompt.trim());
    setInputPrompt('');
  };

  const handleGenerateStructured = () => {
    const prompt = `Please design a detailed spiritual pilgrimage plan:\n- Destination: ${selectedTemplePrompt}\n- Starting City: ${startCity}\n- Duration: ${daysCount} Days\n- Preferred Travel: ${travelPreference}\n- Budget Range: ${budgetTier}\nProvide day-by-day sacred schedule, darshan timings, recommended sevas, satvik food spots, and approximate cost breakdown.`;
    sendChatMessage(prompt);
  };

  const quickPrompts = [
    '2-day Tirupati weekend pilgrimage from Bangalore',
    '3-day Kashi Vishwanath & Ganga Aarti schedule',
    'Shirdi Sai Baba & Shani Shingnapur 2-day plan',
    'Vaishno Devi helicopter & VIP Darshan itinerary',
  ];

  return (
    <div className="min-h-full pb-24 bg-[#faf8f5] dark:bg-[#0c0a09] select-none flex flex-col justify-between">
      <Header
        title="AI Pilgrimage Planner"
        showBack={true}
        rightElement={
          <button
            onClick={() => {
              clearChat();
              showToast('Chat history cleared');
            }}
            className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500"
            title="Reset Chat"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        }
      />

      {/* Main Chat & Content Area */}
      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {/* Divine Generator Form (Matching Reference 12) */}
        <div className="p-4 rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-200/80 dark:border-amber-900/50 shadow-2xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-xl bg-orange-500 text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                Custom Pilgrimage Generator
              </h3>
              <span className="text-[10px] text-stone-500 dark:text-stone-400">
                Powered by Gemini AI Engine
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
            <div>
              <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
                Destination
              </label>
              <select
                value={selectedTemplePrompt}
                onChange={(e) => setSelectedTemplePrompt(e.target.value)}
                className="w-full p-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 font-semibold outline-none text-xs"
              >
                <option>Tirupati</option>
                <option>Shirdi</option>
                <option>Vaishno Devi</option>
                <option>Kashi Varanasi</option>
                <option>Somnath</option>
                <option>Puri Jagannath</option>
                <option>Kedarnath</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
                From City
              </label>
              <input
                type="text"
                value={startCity}
                onChange={(e) => setStartCity(e.target.value)}
                className="w-full p-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 font-semibold outline-none text-xs"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
                Duration (Days)
              </label>
              <select
                value={daysCount}
                onChange={(e) => setDaysCount(e.target.value)}
                className="w-full p-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 font-semibold outline-none text-xs"
              >
                <option value="1">1 Day (Quick Darshan)</option>
                <option value="2">2 Days (Standard)</option>
                <option value="3">3 Days (Deep Spiritual)</option>
                <option value="5">5 Days (Complete Circuit)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
                Preferred Travel
              </label>
              <select
                value={travelPreference}
                onChange={(e) => setTravelPreference(e.target.value)}
                className="w-full p-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 font-semibold outline-none text-xs"
              >
                <option>Train (Vande Bharat)</option>
                <option>Flight + Cab</option>
                <option>AC Sleeper Bus</option>
                <option>Self Drive / Rental</option>
              </select>
            </div>
          </div>

          <PrimaryButton onClick={handleGenerateStructured} size="sm">
            Generate Sacred Itinerary
          </PrimaryButton>
        </div>

        {/* Quick Suggestion Chips */}
        <div>
          <span className="text-[11px] font-bold text-stone-400 block mb-1.5">
            Quick Questions & Ideas:
          </span>
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => sendChatMessage(q)}
                className="px-3 py-1.5 rounded-full bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-[11px] font-medium whitespace-nowrap hover:border-orange-300 active:scale-95 transition-all shadow-2xs"
              >
                ⚡ {q}
              </button>
            ))}
          </div>
        </div>

        {/* Message Stream */}
        <div className="space-y-3.5 pt-2">
          {chatMessages.map((msg) => {
            const isAI = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isAI ? 'items-start' : 'items-start flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                    isAI
                      ? 'bg-gradient-to-tr from-orange-500 to-amber-400 text-white'
                      : 'bg-stone-800 text-stone-200'
                  }`}
                >
                  {isAI ? <Sparkles className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-2xs ${
                    isAI
                      ? 'bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-stone-800 dark:text-stone-200'
                      : 'bg-orange-500 text-white font-medium'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {isAI && (
                    <div className="mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
                      <span className="text-[10px] text-stone-400">{msg.timestamp}</span>
                      <button
                        onClick={() => navigateTo('search')}
                        className="text-[11px] font-bold text-orange-500 hover:underline flex items-center gap-1"
                      >
                        <span>Book Shrines in Plan</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isAiTyping && (
            <div className="flex items-center gap-2 text-stone-400 text-xs p-2">
              <div className="w-6 h-6 rounded-xl bg-orange-500 text-white flex items-center justify-center animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="animate-pulse font-medium">
                DivyaYatra AI is calculating sacred timings & route...
              </span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Floating Bottom Input Bar (Matching Reference 12) */}
      <div className="p-3 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200/80 dark:border-stone-800">
        <form onSubmit={handleSendCustom} className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-stone-100 dark:bg-stone-800/70 border border-stone-200/70 dark:border-stone-700/70 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask anything (e.g., Best dress code for Tirupati?)"
              className="w-full bg-transparent text-xs font-medium text-stone-900 dark:text-stone-100 placeholder:text-stone-400 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={!inputPrompt.trim() || isAiTyping}
            className="p-3 rounded-2xl bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white shadow-xs active:scale-95 transition-all"
            aria-label="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
