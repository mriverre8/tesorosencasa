import React from 'react';
import { Tesoro } from '@/types/tesoro';
import Carousel from './Carousel';
import { BiWorld } from 'react-icons/bi';
import { FaHammer } from 'react-icons/fa6';
import { translate } from '@/locales/translate';

interface CardMobileProps {
  tesoro: Tesoro;
}

const CardMobile = ({ tesoro }: CardMobileProps) => {
  return (
    <div className="flex flex-col mb-2">
      <Carousel tesoro={tesoro} />
      <div className="flex flex-col ">
        <div className="flex flex-wrap gap-2 mt-2">
          <p className="flex justify-center items-center gap-1 text-xs bg-secondary rounded-full py-1 px-2 text-white">
            <BiWorld />
            {tesoro.origin ? tesoro.origin : translate('UNKNOWN')}
          </p>
          <p className="flex justify-center items-center gap-1 text-xs bg-secondary rounded-full py-1 px-2 text-white">
            <FaHammer />
            {tesoro.material ? tesoro.material : translate('UNKNOWN')}
          </p>
        </div>
        <div className="flex flex-col text-sm  mx-1 leading-tight mt-1">
          <h3 className="font-semibold  line-clamp-2 mt-1 ">{tesoro.name}</h3>
          {tesoro.brand && (
            <p className="font-light line-clamp-2 ">{tesoro.brand}</p>
          )}
        </div>
      </div>
      {(tesoro.large || tesoro.width || tesoro.height || tesoro.diameter) && (
        <div className="flex flex-row gap-5 mt-2 mx-1 mb-2">
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
      <div className="flex justify-between px-1 my-1 text-sm">
        <p className="">{translate('UNITS', { units: tesoro.units })}</p>
        <p className="font-bold"> {tesoro.price} €</p>
      </div>
    </div>
  );
};

export default CardMobile;
