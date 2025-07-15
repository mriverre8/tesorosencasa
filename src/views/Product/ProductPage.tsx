'use client';

import Carousel from '@/components/Carousel';
import { tesoros } from '@prisma/client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoMdShare } from 'react-icons/io';

interface Props {
  productData: tesoros;
}

const ProductPage = ({ productData }: Props) => {
  const translate = useTranslations();

  const [copiado, setCopiado] = useState(false);

  const handleShare = () => {
    const url = `https://tesorosencasa.vercel.app/tesoro/${productData.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 10000);
    });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col gap-2 max-w-lg">
        <Link
          href={'/'}
          className="hover:text-primary transition duration-300 underline underline-offset-2 whitespace-nowrap"
        >
          {translate('GO_BACK')}
        </Link>

        <Carousel tesoro={productData} />

        <div className="flex flex-col gap-3 rounded-md mt-4 mb-10 ">
          <div className="flex justify-between gap-5">
            <h1 className="text-2xl font-bold">{productData.name}</h1>
            <button
              onClick={handleShare}
              className="flex justify-start items-start pt-1.5"
            >
              <IoMdShare className="text-xl text-secondary hover:text-secondary-hover" />
            </button>
          </div>
          {copiado && (
            <div className="w-full relative">
              <span className="absolute text-xs text-secondary ">
                {translate('LINK_COPIED')}
              </span>
            </div>
          )}
          <div className="flex flex-col gap-3 mt-7">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <p className="text-xs text-gray-400">
                  {translate('TREASSAURE_CONDITION')}
                </p>
                <div className="text-sm">
                  {productData.condition?.length ? (
                    <ul className="list-disc ml-5 pt-0.5">
                      {Object.values(productData.condition).map((cond, idx) => (
                        <li key={idx}>{cond}</li>
                      ))}
                    </ul>
                  ) : (
                    translate('CONDITION_6')
                  )}
                </div>
              </div>
            </div>
            <h2 className="font-semibold">
              {translate('TREASAURE_BACKGROUND')}
            </h2>
            <div className="flex flex-col mobile:flex-row gap-2">
              <div className="flex flex-col w-full">
                <p className="text-xs text-gray-400">
                  {translate('TREASAURE_ORIGIN')}
                </p>
                <p className="text-sm">
                  {productData.origin
                    ? productData.origin
                    : translate('UNKNOWN')}
                </p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-xs text-gray-400">
                  {translate('TREASAURE_BRAND')}
                </p>
                <p className="text-sm ">
                  {productData.brand ? productData.brand : translate('UNKNOWN')}
                </p>
              </div>
            </div>
            <h2 className="font-semibold">
              {translate('TREASAURE_FABRICATION')}
            </h2>
            <div className="flex flex-col mobile:flex-row gap-2 ">
              <div className="flex flex-col w-full">
                <p className="text-xs text-gray-400">
                  {translate('TREASAURE_MATERIAL')}
                </p>
                <div className="text-sm">
                  {productData.material?.length ? (
                    <ul className="list-disc ml-5 pt-0.5">
                      {Object.values(productData.material).map((mat, idx) => (
                        <li key={idx}>{mat}</li>
                      ))}
                    </ul>
                  ) : (
                    translate('UNKNOWN')
                  )}
                </div>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-xs text-gray-400">
                  {translate('TREASAURE_CATEGORY')}
                </p>
                <p className="text-sm">
                  {productData.category
                    ? productData.category
                    : translate('UNKNOWN')}
                </p>
              </div>
            </div>
            {(productData.large ||
              productData.width ||
              productData.height ||
              productData.diameter) && (
              <>
                <h2 className="font-semibold">
                  {translate('TREASAURE_DIMENSIONS')}
                </h2>
                <div className="flex flex-col mobile:flex-row gap-2 mobile:justify-between">
                  {productData.large && (
                    <div className="flex flex-col mobile:justify-center mobile:items-center mobile:text-center">
                      <p className="text-xs text-gray-400">
                        {translate('LARGE')}
                      </p>
                      <p className="text-sm">{productData.large} cm</p>
                    </div>
                  )}
                  {productData.width && (
                    <div className="flex flex-col mobile:justify-center mobile:items-center mobile:text-center">
                      <p className="text-xs text-gray-400">
                        {translate('WIDTH')}
                      </p>
                      <p className="text-sm">{productData.width} cm</p>
                    </div>
                  )}
                  {productData.height && (
                    <div className="flex flex-col mobile:justify-center mobile:items-center mobile:text-center">
                      <p className="text-xs text-gray-400">
                        {translate('HEIGHT')}
                      </p>
                      <p className="text-sm">{productData.height} cm</p>
                    </div>
                  )}
                  {productData.diameter && (
                    <div className="flex flex-col mobile:justify-center mobile:items-center mobile:text-center">
                      <p className="text-xs text-gray-400">
                        {translate('DIAMETER')}
                      </p>
                      <p className="text-sm">{productData.diameter} cm</p>
                    </div>
                  )}
                </div>
              </>
            )}
            <h2 className="font-semibold">{translate('TREASAURE_STOCK')}</h2>
            <div className="flex flex-col mobile:flex-row gap-2 justify-between">
              <div className="flex flex-col  w-full">
                <p className="text-xs text-gray-400">
                  {translate('TREASAURE_UNITS')}
                </p>
                <p className="text-sm">{productData.units}</p>
              </div>
              <div className="flex flex-col   w-full">
                <p className="text-xs text-gray-400">
                  {translate('TREASAURE_PRICE')}{' '}
                  {translate('TREASAURE_PRICE_X_UNITS')}
                </p>
                <p className="text-sm">{productData.price} €</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
