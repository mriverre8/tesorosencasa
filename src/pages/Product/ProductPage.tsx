'use client';

import Header from '@/components/Header';
import { Tesoro } from '@/types/tesoro';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from '@/components/Carousel';
import { User } from '@supabase/supabase-js';

interface ProductProps {
  tesoro: Tesoro;
  user: User | null;
}

const ProductPage = ({ tesoro }: ProductProps) => {
  return (
    <>
      <Header>
        <div className="flex flex-col w-full py-12 px-5 sm:pt-20 sm:pb-12">
          <div className="w-full max-w-4xl mx-auto mb-5 border-b">
            <Link href="/" className="hover:text-yellow-400">
              Volver
            </Link>
          </div>

          <div className="hidden sm:block">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl mx-auto ">
              {tesoro.images.map((imagen, index) => (
                <Image
                  key={index}
                  src={imagen}
                  alt={tesoro.name}
                  width={3024}
                  height={4032}
                  className="rounded-sm object-cover"
                  priority={false}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
          <div className="block sm:hidden">
            <Carousel tesoro={tesoro} />
          </div>
        </div>
      </Header>

      <div className="w-full sm:max-w-4xl mx-auto pb-12 ">
        <div className="text-center mb-4">
          <h1 className="text-lg md:text-2xl font-semibold text-gray-800 mb-1">
            {tesoro.name}
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            {tesoro.brand ? tesoro.brand : 'Marca desconocida'}
          </p>
        </div>
        <div className="mb-6 flex flex-col sm:flex-row justify-center items-center text-center gap-1 sm:gap-4">
          {tesoro.origin ? (
            <p className="text-sm text-gray-600">
              Proveniente de {tesoro.origin}
            </p>
          ) : (
            <p className="text-sm text-gray-600">Origen: Desconocido</p>
          )}

          <p className="text-sm text-gray-600">
            Material: {tesoro.material ? tesoro.material : 'Desconocido'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center text-center gap-1 sm:gap-4">
          <span className="text-xl font-bold text-gray-800">
            {tesoro.price} €
          </span>
          <span
            className={`text-sm ${tesoro.units === 0 ? 'text-red-500' : 'text-gray-500'}`}
          >{`${tesoro.units} unidades disponibles`}</span>
        </div>
        <div className="w-full justify-center flex items-center pb-10 pt-5 ">
          <button
            className={
              'rounded-full w-full px-3 py-1 text-white text-center  bg-gray-300'
            }
            disabled
          >
            Reservas disponibles proximamente
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
