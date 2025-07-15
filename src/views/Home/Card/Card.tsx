import React from 'react';
import Link from 'next/link';

// Translation
import { useTranslations } from 'next-intl';

// Types
import { tesoros } from '@prisma/client';
import { CldImage } from 'next-cloudinary';

interface Props {
  tesoro: tesoros;
}

const Card = ({ tesoro }: Props) => {
  const translate = useTranslations();

  return (
    <div className="flex flex-col justify-between bg-white rounded-md">
      <div>
        <div className="relative aspect-[3/4] w-full shrink-0 rounded-t-md overflow-hidden flex items-center justify-center bg-black">
          <CldImage
            width="600"
            height="600"
            src={tesoro.images[0]}
            sizes="100vw"
            alt={tesoro.name}
          />
        </div>
        <h3 className="font-semibold line-clamp-1 mx-4 my-1 mt-2 text-sm leading-tight">
          {tesoro.name}
        </h3>
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
