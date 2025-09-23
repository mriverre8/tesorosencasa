import React from 'react';
import { IoImage } from 'react-icons/io5';

const CardSkeleton = () => {
  return (
    <div className="flex flex-col justify-between bg-white rounded-md animate-pulse">
      <div>
        <div className="relative aspect-[3/4] w-full shrink-0 rounded-t-md overflow-hidden flex items-center justify-center bg-gray-200">
          <IoImage className="text-gray-400 text-6xl" />
        </div>

        <div className="h-4 w-3/4 bg-gray-200 rounded mx-4 my-2 mt-3" />
      </div>

      <div className="flex flex-col text-sm mx-4 mt-1 mb-2">
        <div className="flex gap-3 text-sm">
          <div className="flex flex-col justify-center items-center text-center gap-1">
            <div className="h-3 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-10 bg-gray-300 rounded" />
          </div>
          <div className="flex flex-col justify-center items-center text-center gap-1">
            <div className="h-3 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-14 bg-gray-300 rounded" />
          </div>
        </div>

        <div className="w-full bg-gray-200 h-px my-2" />

        <div className="flex w-full justify-center">
          <div className="h-4 w-28 bg-gray-300 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
