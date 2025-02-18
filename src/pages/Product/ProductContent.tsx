'use client';

import React, { useState } from 'react';
import { Tesoro } from '@/types/tesoro';
import Lightbox from '@/components/Lightbox';
import LightboxRegister from '@/components/Lightbox/LightboxRegister';
import LightboxLogin from '@/components/Lightbox/LightboxLogin';

interface ProductProps {
  tesoro: Tesoro;
}

const ProductContent = ({ tesoro }: ProductProps) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxState, setLightboxState] = useState('login');

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
    setLightboxState('login');
  };

  const handleReserve = () => {
    setIsLightboxOpen(true);
  };
  return (
    <>
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
        {tesoro.description && (
          <div className="bg-white/50 rounded-lg p-5 mb-6">
            <p className="text-sm md:text-base">{tesoro.description}</p>
          </div>
        )}

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
            className={`rounded-full w-full px-3 py-1 text-white text-center  ${tesoro.units === 0 ? 'bg-gray-300' : 'bg-green-600 hover:bg-green-500'}`}
            onClick={() => handleReserve()}
            disabled={tesoro.units === 0}
          >
            RESERVAR
          </button>
        </div>
      </div>

      <Lightbox isLightboxOpen={isLightboxOpen}>
        {lightboxState === 'login' ? (
          <LightboxLogin
            swapAction={setLightboxState}
            closeAction={handleCloseLightbox}
          />
        ) : (
          <LightboxRegister
            swapAction={setLightboxState}
            closeAction={handleCloseLightbox}
          />
        )}
      </Lightbox>
    </>
  );
};

export default ProductContent;
