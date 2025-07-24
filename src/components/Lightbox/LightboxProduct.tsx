'use client';

import React, { useState } from 'react';
import { CldImage } from 'next-cloudinary';

// Components
import ButtonSecondary from '@/components/ButtonSecondary';
import Lightbox from '@/components/Lightbox/Lightbox';

// Hooks
import useLightboxProduct from '@/hooks/useLightboxProduct';

// Translation
import { useTranslations } from 'next-intl';

// Icons
import { IoMdShare } from 'react-icons/io';

const LightboxProduct = () => {
  const translate = useTranslations();

  const lightboxProduct = useLightboxProduct();

  const [copiado, setCopiado] = useState(false);

  const handleShare = () => {
    const url = `https://tesorosencasa.vercel.app/tesoro/${lightboxProduct.product.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 10000);
    });
  };

  return (
    <Lightbox isOpen={lightboxProduct.isOpen} onClose={lightboxProduct.onClose}>
      <div className="flex">
        <h1 className="flex-[8] text-2xl font-bold">
          {lightboxProduct.product.name}
        </h1>
        <div className="flex-[2] flex justify-end self-start mt-1.5">
          <button onClick={handleShare}>
            <IoMdShare className="text-xl text-secondary hover:text-secondary-hover" />
          </button>
        </div>
      </div>

      <div className=" h-[400px] overflow-y-auto ">
        {copiado && (
          <div className="w-full">
            <span className="text-xs text-secondary ">
              {translate('LINK_COPIED')}
            </span>
          </div>
        )}
        <div className="mt-3 flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <p className="text-xs text-gray-400">
                {translate('TREASSAURE_CONDITION')}
              </p>
              <div className="text-sm">
                {lightboxProduct.product.condition?.length ? (
                  <ul className="list-disc ml-5 pt-0.5">
                    {Object.values(lightboxProduct.product.condition).map(
                      (cond, idx) => (
                        <li key={idx}>{cond}</li>
                      )
                    )}
                  </ul>
                ) : (
                  translate('CONDITION_7')
                )}
              </div>
            </div>
          </div>
          <h2 className="font-semibold">{translate('TREASAURE_BACKGROUND')}</h2>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <p className="text-xs text-gray-400">
                {translate('TREASAURE_ORIGIN')}
              </p>
              <p className="text-sm">
                {lightboxProduct.product.origin
                  ? lightboxProduct.product.origin
                  : translate('UNKNOWN')}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-gray-400">
                {translate('TREASAURE_BRAND')}
              </p>
              <p className="text-sm ">
                {lightboxProduct.product.brand
                  ? lightboxProduct.product.brand
                  : translate('UNKNOWN')}
              </p>
            </div>
          </div>
          <h2 className="font-semibold">
            {translate('TREASAURE_FABRICATION')}
          </h2>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <p className="text-xs text-gray-400">
                {translate('TREASAURE_MATERIAL')}
              </p>
              <div className="text-sm">
                {lightboxProduct.product.material?.length ? (
                  <ul className="list-disc ml-5 pt-0.5">
                    {Object.values(lightboxProduct.product.material).map(
                      (mat, idx) => (
                        <li key={idx}>{mat}</li>
                      )
                    )}
                  </ul>
                ) : (
                  translate('UNKNOWN')
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-gray-400">
                {translate('TREASAURE_CATEGORY')}
              </p>
              <p className="text-sm">
                {lightboxProduct.product.category
                  ? lightboxProduct.product.category
                  : translate('UNKNOWN')}
              </p>
            </div>
          </div>
          {(lightboxProduct.product.large ||
            lightboxProduct.product.width ||
            lightboxProduct.product.height ||
            lightboxProduct.product.diameter) && (
            <>
              <h2 className="font-semibold">
                {translate('TREASAURE_DIMENSIONS')}
              </h2>
              <div className="flex flex-row gap-5">
                {lightboxProduct.product.large && (
                  <div className="flex flex-col justify-center items-center text-center">
                    <p className="text-xs text-gray-400">
                      {translate('LARGE')}
                    </p>
                    <p className="text-sm">
                      {lightboxProduct.product.large} cm
                    </p>
                  </div>
                )}
                {lightboxProduct.product.width && (
                  <div className="flex flex-col justify-center items-center text-center">
                    <p className="text-xs text-gray-400">
                      {translate('WIDTH')}
                    </p>
                    <p className="text-sm">
                      {lightboxProduct.product.width} cm
                    </p>
                  </div>
                )}
                {lightboxProduct.product.height && (
                  <div className="flex flex-col justify-center items-center text-center">
                    <p className="text-xs text-gray-400">
                      {translate('HEIGHT')}
                    </p>
                    <p className="text-sm">
                      {lightboxProduct.product.height} cm
                    </p>
                  </div>
                )}
                {lightboxProduct.product.diameter && (
                  <div className="flex flex-col justify-center items-center text-center">
                    <p className="text-xs text-gray-400">
                      {translate('DIAMETER')}
                    </p>
                    <p className="text-sm">
                      {lightboxProduct.product.diameter} cm
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
          <h2 className="font-semibold">{translate('TREASAURE_STOCK')}</h2>
          <div className="flex flex-row gap-5">
            <div className="flex flex-col justify-center items-center text-center">
              <p className="text-xs text-gray-400">
                {translate('TREASAURE_UNITS')}
              </p>
              <p className="text-sm">{lightboxProduct.product.units}</p>
            </div>
            <div className="flex flex-col justify-center items-center text-center">
              <p className="text-xs text-gray-400">
                {translate('TREASAURE_PRICE')}{' '}
                {translate('TREASAURE_PRICE_X_UNITS')}
              </p>
              <p className="text-sm">{lightboxProduct.product.price} €</p>
            </div>
          </div>
          <h2 className="font-semibold">
            {translate('TREASAURE_MULTIMEDIA_1')}
          </h2>
          <div className="pb-2">
            <div className="flex gap-2 w-full overflow-x-auto">
              {Array.isArray(lightboxProduct.product.images) &&
                lightboxProduct.product.images.map((image, index) => (
                  <div
                    key={index}
                    className="inline-block w-24 h-24 relative overflow-hidden rounded-lg bg-gray-200 shrink-0"
                  >
                    <CldImage
                      width="960"
                      height="600"
                      src={image}
                      sizes="100vw"
                      alt="Description of my image"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center text-sm mt-3">
        <ButtonSecondary
          buttonAction={lightboxProduct.onClose}
          buttonText={translate('GO_BACK')}
        />
      </div>
    </Lightbox>
  );
};

export default LightboxProduct;
