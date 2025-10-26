import React from 'react';

const StreamCardSkeleton = () => {
  return (
    <div className="flex bg-white p-2 rounded-md gap-2 items-center justify-between shadow-md animate-pulse">
      <div className="flex gap-2 w-full">
        <div className="flex p-2 bg-background rounded-md justify-center items-center w-[80px] h-[45px]">
          <div className="h-4 w-10 bg-gray-200 rounded" />
        </div>

        <div className="flex flex-col justify-center flex-1 gap-2">
          <div className="h-3 w-24 bg-gray-200 rounded" />
          <div className="h-2 w-32 bg-gray-200 rounded" />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <div className="h-3 w-3 bg-gray-200 rounded-full" />
        <div className="h-2 w-12 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default StreamCardSkeleton;
