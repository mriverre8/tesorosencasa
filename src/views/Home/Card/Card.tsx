import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Translation
import { translate } from '@/locales/translate';

// Types
import { tesoros } from '@prisma/client';

interface Props {
  tesoro: tesoros;
}

const Card = ({ tesoro }: Props) => {
  return (
    <div className="flex flex-col justify-between bg-white rounded-md">
      <div>
        <div className="relative aspect-[3/4] w-full shrink-0 rounded-t-md overflow-hidden flex items-center justify-center bg-black">
          <Image
            src={tesoro.images[0]}
            alt={tesoro.name}
            width={600}
            height={600}
            quality={100}
          />
        </div>
        <div className="flex flex-col gap-1 mx-3 my-1">
          <div className="flex flex-col">
            <div className="flex flex-col text-sm  mx-1 leading-tight mt-1 gap-1">
              <h3 className="font-semibold  line-clamp-1">{tesoro.name}</h3>

              <div className="flex flex-col">
                <p className="text-xs text-gray-400 whitespace-nowrap">
                  {translate('TREASSAURE_CONDITION')}
                </p>
                <p className="text-sm font-light line-clamp-1">
                  {tesoro.condition}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col text-sm mx-4 mt-1 mb-2">
        <div className="flex gap-3 text-sm">
          <div className="flex flex-col justify-center items-center text-center">
            <p className="text-xs text-gray-400">
              {translate('TREASAURE_UNITS')}
            </p>
            <p className="text-sm">{tesoro.units}</p>
          </div>
          <div className="flex flex-col justify-center items-center text-center">
            <p className="text-xs text-gray-400 whitespace-nowrap">
              {translate('TREASAURE_PRICE')}{' '}
              {translate('TREASAURE_PRICE_X_UNITS')}
            </p>
            <p className="text-sm font-semibold">{tesoro.price} €</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 h-px my-1 " />
        <div className="flex w-full  justify-center">
          <Link
            href={`/tesoro/${tesoro.id}`}
            className="hover:text-primary transition duration-300 underline underline-offset-2 whitespace-nowrap"
          >
            {translate('VIEW_DETAILS')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
