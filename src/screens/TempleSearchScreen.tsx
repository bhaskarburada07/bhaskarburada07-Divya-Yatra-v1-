import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Header } from '../components/common/Header';
import { TempleCard } from '../components/temple/TempleCard';
import { Search, Mic, SlidersHorizontal, MapPin, X } from 'lucide-react';

export const TempleSearchScreen: React.FC = () => {
  const {
    temples,
    searchQuery,
    setSearchQuery,
    selectedStateFilter,
    setSelectedStateFilter,
    showToast,
  } = useApp();

  const [isListening, setIsListening] = useState(false);

  const stateFilters = [
    'All',
    'Andhra Pradesh',
    'Tamil Nadu',
    'Karnataka',
    'Maharashtra',
    'Gujarat',
    'Uttarakhand',
    'Uttar Pradesh',
    'Odisha',
    'Jammu & Kashmir',
  ];

  // Filter temples by search query and state
  const filteredTemples = temples.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.deity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.state.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesState =
      selectedStateFilter === 'All' ||
      t.state.toLowerCase() === selectedStateFilter.toLowerCase();

    return matchesSearch && matchesState;
  });

  const handleVoiceSearch = () => {
    setIsListening(true);
    showToast('Listening... (Say temple name)');
    setTimeout(() => {
      setSearchQuery('Tirumala');
      setIsListening(false);
      showToast('Recognized: "Tirumala"');
    }, 1500);
  };

  return (
    <div className="min-h-full pb-24 bg-[#faf8f5] dark:bg-[#0c0a09] select-none">
      <Header title="Search Temples" showBack={true} />

      {/* Search Input Bar (Matching Reference 4) */}
      <div className="px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/90 dark:border-stone-800 shadow-xs focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
            <Search className="w-4 h-4 text-orange-500 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search temples, deities, places..."
              className="w-full bg-transparent text-xs font-medium text-stone-900 dark:text-stone-100 placeholder:text-stone-400 outline-none"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={handleVoiceSearch}
              className={`p-1 rounded-lg transition-colors ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'text-stone-400 hover:text-orange-500'
              }`}
              title="Voice Search"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => {
              setSelectedStateFilter('All');
              setSearchQuery('');
              showToast('Filters reset');
            }}
            className="p-2.5 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-orange-300 shadow-xs"
            title="Reset Filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* State Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2.5 mt-1">
          {stateFilters.map((st) => {
            const isSelected = selectedStateFilter === st;
            return (
              <button
                key={st}
                onClick={() => setSelectedStateFilter(st)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200/80 dark:border-stone-800 hover:border-orange-300'
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="px-4 py-1.5 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
        <span>
          Showing <strong>{filteredTemples.length}</strong> Sacred Shrines
        </span>
        {selectedStateFilter !== 'All' && (
          <span className="text-orange-500 font-medium">in {selectedStateFilter}</span>
        )}
      </div>

      {/* Temples List */}
      <div className="px-4 py-2 space-y-3">
        {filteredTemples.length > 0 ? (
          filteredTemples.map((temple) => (
            <TempleCard key={temple.id} temple={temple} variant="horizontal" />
          ))
        ) : (
          <div className="text-center py-16 px-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/80 dark:border-stone-800">
            <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-500 flex items-center justify-center mx-auto mb-3 text-2xl">
              🔍
            </div>
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
              No Temples Found
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-xs mx-auto">
              We couldn't find any temple matching "{searchQuery}". Try searching for "Tirupati", "Shirdi", or select "All".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStateFilter('All');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 text-xs font-bold border border-orange-200 dark:border-orange-900"
            >
              Clear Search & Show All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
