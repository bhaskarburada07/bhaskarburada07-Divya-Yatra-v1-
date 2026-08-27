import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  fallbackText?: string;
  className?: string;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc,
  fallbackText,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Loading Skeleton */}
      {loading && !error && (
        <div className="absolute inset-0 bg-stone-200 dark:bg-stone-800 animate-pulse flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-orange-400/40 border-t-orange-500 rounded-full animate-spin" />
        </div>
      )}

      {/* Error Fallback */}
      {error ? (
        <div className="w-full h-full min-h-[80px] bg-gradient-to-br from-amber-50 to-orange-100 dark:from-stone-900 dark:to-amber-950/40 flex flex-col items-center justify-center p-2 text-center select-none">
          <span className="text-xl sm:text-2xl mb-1">🛕</span>
          <span className="text-[10px] font-semibold text-stone-600 dark:text-stone-300 line-clamp-1">
            {fallbackText || alt}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          referrerPolicy="no-referrer"
          loading="lazy"
          className={`${className} ${loading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} transition-all duration-300`}
          {...props}
        />
      )}
    </div>
  );
};
