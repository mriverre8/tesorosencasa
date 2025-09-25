import React from 'react';
import { IoImage } from 'react-icons/io5';

const CardSkeleton = () => {
  return (
    <div className="flex flex-col justify-between bg-white rounded-md animate-pulse">
      <div className="relative aspect-[3/4] w-full shrink-0 rounded-t-md overflow-hidden flex items-center justify-center bg-gray-200">
        <IoImage className="text-gray-400 text-6xl" />
      </div>
    </div>
  );
};

export default CardSkeleton;
