'use client';

import ButtonSecondary from '@/components/ButtonSecondary';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoImage } from 'react-icons/io5';

const ProductPageSkeleton = () => {
  const translate = useTranslations();
  const router = useRouter();
  return (
    <div className="flex justify-center items-center">
      <div className=" max-w-lg w-full">
        <ButtonSecondary
          buttonText={translate('GO_BACK')}
          buttonAction={() => router.push('/')}
        />
        <div className="flex flex-col gap-2 animate-pulse">
          <div className="w-full h-64 bg-gray-200 rounded-lg mt-2 flex items-center justify-center">
            <IoImage className="text-gray-400 text-6xl" />
          </div>

          <div className="flex flex-col gap-3 rounded-md mt-4 mb-10">
            <div className="flex justify-between gap-5">
              <div className="h-6 w-32 bg-gray-300 rounded" />
              <div className="h-5 w-5 bg-gray-300 rounded-full" />
            </div>

            <div className="flex flex-col gap-2 mt-7">
              <div className="h-3 w-24 bg-gray-300 rounded" />
              <div className="h-10 w-full bg-gray-200 rounded" />
            </div>

            <div className="h-4 w-32 bg-gray-300 rounded mt-4" />
            <div className="flex flex-col mobile:flex-row gap-2">
              <div className="flex flex-col w-full gap-1">
                <div className="h-3 w-24 bg-gray-300 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
              </div>
              <div className="flex flex-col w-full gap-1">
                <div className="h-3 w-24 bg-gray-300 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
              </div>
            </div>

            <div className="h-4 w-32 bg-gray-300 rounded mt-4" />
            <div className="flex flex-col mobile:flex-row gap-2">
              <div className="flex flex-col w-full gap-1">
                <div className="h-3 w-24 bg-gray-300 rounded" />
                <div className="h-8 w-full bg-gray-200 rounded" />
              </div>
              <div className="flex flex-col w-full gap-1">
                <div className="h-3 w-24 bg-gray-300 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
              </div>
            </div>

            <div className="h-4 w-32 bg-gray-300 rounded mt-4" />
            <div className="flex flex-wrap gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="h-3 w-12 bg-gray-300 rounded" />
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>
              ))}
            </div>

            <div className="h-4 w-32 bg-gray-300 rounded mt-4" />
            <div className="flex flex-col mobile:flex-row gap-2 justify-between">
              <div className="flex flex-col w-full gap-1">
                <div className="h-3 w-24 bg-gray-300 rounded" />
                <div className="h-4 w-16 bg-gray-200 rounded" />
              </div>
              <div className="flex flex-col w-full gap-1">
                <div className="h-3 w-32 bg-gray-300 rounded" />
                <div className="h-4 w-20 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageSkeleton;
