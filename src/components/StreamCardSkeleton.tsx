import React from 'react';

const StreamCardSkeleton = () => {
  return (
    <div className="flex bg-white p-2 rounded-md gap-2 items-center justify-between shadow-md animate-pulse">
      <div className="flex gap-2 flex-1">
        <div className="p-2 bg-gray-300 rounded-md w-16 h-10" />
        <div className="flex flex-col flex-1 justify-center gap-2">
          <div className="h-4 bg-gray-300 rounded w-32" />
          <div className="h-3 bg-gray-300 rounded w-24" />
        </div>
      </div>
      <div className="w-8 h-8 bg-gray-300 rounded-full" />
    </div>
  );
};

export default StreamCardSkeleton;
