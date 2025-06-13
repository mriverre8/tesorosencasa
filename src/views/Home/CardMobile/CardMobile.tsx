import React from 'react';

// Components
import Carousel from '../../../components/Carousel';

// Translation
import { translate } from '@/locales/translate';

// Types
import { tesoros } from '@prisma/client';

interface Props {
  tesoro: tesoros;
}

const CardMobile = ({ tesoro }: Props) => {
  return (
    <div className="flex flex-col mb-2">
      <Carousel tesoro={tesoro} />
      <div className="flex flex-col text-sm  mx-1 leading-tight mt-1 mb-1">
        <h3 className="font-semibold  line-clamp-2  text-xl ">{tesoro.name}</h3>
        {tesoro.brand && (
          <p className="font-light line-clamp-2 ">{tesoro.brand}</p>
        )}
      </div>
      <div className="flex px-1 mt-1 text-sm">
        <div className="flex flex-col">
          <p className="text-xs text-gray-400 whitespace-nowrap">
            {translate('TREASAURE_ORIGIN')}
          </p>
          <p className="text-sm">
            {tesoro.origin ? tesoro.origin : translate('UNKNOWN')}
          </p>
        </div>
      </div>
      <div className="flex px-1 mt-1 text-sm">
        <div className="flex flex-col">
          <p className="text-xs text-gray-400 whitespace-nowrap">
            {translate('TREASAURE_MATERIAL')}
          </p>
          <div className="text-sm">
            {tesoro.material ? (
              <p>{Object.values(tesoro.material).join(' - ')}</p>
            ) : (
              translate('UNKNOWN')
            )}
          </div>
        </div>
      </div>
      {(tesoro.large || tesoro.width || tesoro.height || tesoro.diameter) && (
        <div className="flex flex-row flex-wrap gap-5 mt-2 mx-1 mb-2 whitespace-nowrap">
          {tesoro.large && (
            <div className="flex flex-col">
              <p className="text-xs text-gray-400">{translate('LARGE')}</p>
              <p className="text-sm">{tesoro.large} cm</p>
            </div>
          )}
          {tesoro.width && (
            <div className="flex flex-col ">
              <p className="text-xs text-gray-400">{translate('WIDTH')}</p>
              <p className="text-sm">{tesoro.width} cm</p>
            </div>
          )}
          {tesoro.height && (
            <div className="flex flex-col ">
              <p className="text-xs text-gray-400">{translate('HEIGHT')}</p>
              <p className="text-sm">{tesoro.height} cm</p>
            </div>
          )}
          {tesoro.diameter && (
            <div className="flex flex-col ">
              <p className="text-xs text-gray-400">{translate('DIAMETER')}</p>
              <p className="text-sm">{tesoro.diameter} cm</p>
            </div>
          )}
        </div>
      )}
      <div className="flex px-1 mt-1 mb-2 text-sm">
        <div className="flex flex-col">
          <p className="text-xs text-gray-400 whitespace-nowrap">
            {translate('TREASSAURE_CONDITION')}
          </p>
          <p className="text-sm">{tesoro.condition}</p>
        </div>
      </div>
      <div className="flex flex-wrap justify-between px-1 my-1 text-sm gap-2">
        <p className="whitespace-nowrap">
          {translate('UNITS', { units: tesoro.units })}
        </p>
        <div className="flex flex-row items-center gap-1 whitespace-nowrap">
          <p className="font-bold"> {tesoro.price} €</p>
          <p className="text-xs text-gray-400">
            {translate('TREASAURE_PRICE_X_UNITS')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardMobile;
