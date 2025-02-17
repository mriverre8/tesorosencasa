import React from 'react';
import Image from 'next/image';
import { Tesoro } from '@/types/tesoro';

interface ProductProps {
  tesoro: Tesoro;
}

const Card = ({ tesoro }: ProductProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg  hover:scale-105 transition-transform flex flex-col justify-between aspect-square h-[345px] w-full">
      <div>
        <div className="w-full h-48 relative  rounded-t-xl overflow-hidden">
          <Image
            src={tesoro.images[0]}
            alt={tesoro.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col px-1.5 mt-1.5">
          {(tesoro.material || tesoro.origin) && (
            <div className="flex gap-1.5">
              {tesoro.origin && (
                <p className="text-xs bg-[#f5f1e3] rounded-full py-1 px-2">
                  {tesoro.origin}
                </p>
              )}
              {tesoro.material && (
                <p className="text-xs bg-[#f5f1e3] rounded-full py-1 px-2">
                  {tesoro.material}
                </p>
              )}
            </div>
          )}
          <div className="flex flex-col mx-1 ">
            <h3
              className={`font-semibold line-clamp-2 text-sm ${tesoro.material || tesoro.origin ? 'mt-1' : 'mt-2'}`}
            >
              {tesoro.name}
            </h3>
            {tesoro.brand && (
              <p className="font-light text-gray-400 line-clamp-2 text-xs">
                {tesoro.brand}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between px-3 mb-3 text-sm">
        <p>Unidades: {tesoro.units}</p>
        <p className="font-bold"> {tesoro.price} €</p>
      </div>
    </div>
  );
};

export default Card;
