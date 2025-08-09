import React from 'react';

const TrendingSkeleton = () => {
  return (
    <div className="flex gap-4">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div
          key={idx}
          className="min-w-[140px] max-w-[160px] w-[140px] flex-shrink-0 bg-gray-100 rounded-xl shadow border border-gray-200 animate-pulse"
        >
          <div className="w-full h-48 bg-gray-200 rounded-t-xl mb-2" />
          <div className="p-2">
            <div className="h-4 bg-gray-300 rounded mb-2 w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingSkeleton;
