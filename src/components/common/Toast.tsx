import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-stone-900/95 dark:bg-stone-800/95 text-white text-xs font-medium rounded-full shadow-xl backdrop-blur-md border border-stone-700/50 flex items-center gap-2 animate-bounce-short transition-all">
      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
      <span>{toastMessage}</span>
    </div>
  );
};
