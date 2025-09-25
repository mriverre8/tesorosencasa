import React from 'react';
import { IoImage } from 'react-icons/io5';

const CardMobileSkeleton = () => {
  return (
    <div className="flex flex-col mb-2 animate-pulse">
      <div className="w-full aspect-[3/4] bg-gray-300 rounded-sm flex items-center justify-center">
        <IoImage className="text-gray-400 text-6xl" />
      </div>

      <div className="flex justify-between gap-5 mt-2 mx-1">
        <div className="flex flex-col gap-1 w-full">
          <div className="h-5 bg-gray-300 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-3 mx-1">
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-300 rounded w-1/2" />
      </div>

      <div className="flex justify-between items-center mt-4 mx-1">
        <div className="h-4 bg-gray-300 rounded w-16" />
        <div className="flex flex-row gap-2">
          <div className="h-4 bg-gray-300 rounded w-12" />
          <div className="h-3 bg-gray-200 rounded w-20" />
        </div>
      </div>
    </div>
  );
};

export default CardMobileSkeleton;
