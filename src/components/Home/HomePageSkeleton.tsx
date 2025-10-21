import React from 'react';
import StreamCardSkeleton from '../common/StreamCardSkeleton';
import CardSkeleton from './Card/CardSkeleton';
import CardMobileSkeleton from './CardMobile/CardMobileSkeleton';
import { PAGE_SIZE } from '@/constants/constants';

const HomePageSkeleton = () => {
  return (
    <div className="my-2.5">
      <div className="flex flex-col gap-2 sticky top-20 z-50 mb-6">
        <StreamCardSkeleton />
      </div>

      <div className="mb-4">
        <div className="h-12 bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      <div className="mt-5">
        <div className="block mobile:hidden">
          <CardMobileSkeleton />
        </div>
        <div className="hidden mobile:grid mobile:grid-cols-2 mobile:gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {[...Array(PAGE_SIZE)].map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <div className="w-8 h-8 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default HomePageSkeleton;
