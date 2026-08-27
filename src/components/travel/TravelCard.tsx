import React from 'react';
import { TravelOption } from '../../types';
import { Train, Bus, Plane, Clock, ArrowRight, Check } from 'lucide-react';

interface TravelCardProps {
  travel: TravelOption;
  isSelected?: boolean;
  onSelect: (travel: TravelOption) => void;
}

export const TravelCard: React.FC<TravelCardProps> = ({ travel, isSelected = false, onSelect }) => {
  const getIcon = () => {
    switch (travel.type) {
      case 'train':
        return <Train className="w-4 h-4 text-orange-500" />;
      case 'bus':
        return <Bus className="w-4 h-4 text-amber-500" />;
      case 'flight':
        return <Plane className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(travel)}
      className={`relative p-3.5 rounded-2xl border transition-all cursor-pointer ${
        isSelected
          ? 'bg-orange-50/70 dark:bg-orange-950/40 border-orange-500 ring-2 ring-orange-500/20 shadow-md'
          : 'bg-white dark:bg-stone-900 border-stone-200/80 dark:border-stone-800/80 hover:border-orange-300 dark:hover:border-orange-800 shadow-xs'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-orange-100/60 dark:bg-orange-900/30">
            {getIcon()}
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              {travel.operatorOrName}
              {travel.number && (
                <span className="text-[10px] px-1.5 py-0.2 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 rounded font-mono">
                  #{travel.number}
                </span>
              )}
            </h4>
            <span className="text-[11px] text-stone-500 dark:text-stone-400">
              {travel.classType}
            </span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm font-extrabold text-orange-600 dark:text-orange-400">
            ₹{travel.price.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
            {travel.seatsLeft} seats left
          </span>
        </div>
      </div>

      {/* Schedule row */}
      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-800/80 text-xs">
        <div>
          <div className="font-bold text-stone-800 dark:text-stone-200">
            {travel.departureTime}
          </div>
          <span className="text-[10px] text-stone-400">{travel.fromCode}</span>
        </div>

        <div className="flex flex-col items-center px-3">
          <span className="text-[10px] text-stone-400 flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" />
            {travel.duration}
          </span>
          <div className="w-16 h-[1px] bg-stone-300 dark:bg-stone-700 my-1 relative">
            <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-stone-400 rotate-45" />
          </div>
        </div>

        <div className="text-right">
          <div className="font-bold text-stone-800 dark:text-stone-200">
            {travel.arrivalTime}
          </div>
          <span className="text-[10px] text-stone-400">{travel.toCode}</span>
        </div>
      </div>

      {travel.badge && (
        <div className="mt-2.5 inline-block text-[9px] font-semibold tracking-wide uppercase px-2 py-0.5 bg-amber-100/70 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 rounded-md">
          {travel.badge}
        </div>
      )}

      {isSelected && (
        <div className="absolute top-3 right-3 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-xs">
          <Check className="w-3 h-3 stroke-[3]" />
        </div>
      )}
    </div>
  );
};
