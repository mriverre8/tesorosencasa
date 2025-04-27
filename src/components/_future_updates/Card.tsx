import React from 'react';
import Image from 'next/image';
import { Tesoro } from '@/types/tesoro';
import { BiWorld } from 'react-icons/bi';
import { FaHammer } from 'react-icons/fa6';

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
          <div className="flex gap-1.5 flex-wrap">
            <p className="flex justify-center items-center gap-1 text-xs bg-[#f5f1e3] rounded-full py-1 px-2 whitespace-nowrap">
              <BiWorld />
              {tesoro.origin ? tesoro.origin : 'Desconocido'}
            </p>
            <p className="flex justify-center items-center gap-1 text-xs bg-[#f5f1e3] rounded-full py-1 px-2 whitespace-nowrap">
              <FaHammer />
              {tesoro.material ? tesoro.material : 'Desconocido'}
            </p>
          </div>
          <div className="flex flex-col mx-1 mt-0.5">
            <h3 className="font-semibold line-clamp-2 text-sm ">
              {tesoro.name}
            </h3>
            {tesoro.brand && (
              <p className="font-light text-gray-400 line-clamp-1 text-xs">
                {tesoro.brand}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between px-3 mb-3 text-sm ">
        <p
          className={`${tesoro.units === 0 ? 'text-red-500' : 'text-gray-800'}`}
        >
          Unidades: {tesoro.units}
        </p>
        <p className="font-bold"> {tesoro.price} €</p>
      </div>
    </div>
  );
};

export default Card;
