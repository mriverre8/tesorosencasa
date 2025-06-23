'use client';

import Carousel from '@/components/Carousel';
import CarouselHorizontal from '@/components/CarouselHorizontal';
import { translate } from '@/locales/translate';
import { tesoros } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

interface Props {
  productData: tesoros;
}

const ProductPage = ({ productData }: Props) => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center mobile:text-center">
      <div className="flex justify-center items-center">
        <Link
          href={'/'}
          className="hover:text-primary transition duration-300 underline underline-offset-2 whitespace-nowrap"
        >
          {translate('GO_BACK')}
        </Link>
      </div>
      <div className="flex-wrap gap-4 justify-center items-center hidden mobile:block">
        <CarouselHorizontal tesoro={productData} />
      </div>
      <div className="flex-wrap gap-4 justify-center items-center block mobile:hidden">
        <Carousel tesoro={productData} />
      </div>

      <div className="flex flex-col gap-3 rounded-md justify-center items-center mt-4 mb-10 max-w-[400px]">
        <h1 className="text-2xl font-bold">{productData.name}</h1>
        <div className="flex flex-col gap-3 ">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <p className="text-xs text-gray-400">
                {translate('TREASSAURE_CONDITION')}
              </p>
              <p className="text-sm">{productData.condition}</p>
            </div>
          </div>
          <h2 className="font-semibold">{translate('TREASAURE_BACKGROUND')}</h2>
          <div className="flex gap-5 flex-col">
            <div className="flex flex-col">
              <p className="text-xs text-gray-400">
                {translate('TREASAURE_ORIGIN')}
              </p>
              <p className="text-sm">
                {productData.origin ? productData.origin : translate('UNKNOWN')}
              </p>
            </div>
            <div className="flex flex-col">
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
          <div className="flex gap-5 flex-col">
            <div className="flex flex-col">
              <p className="text-xs text-gray-400">
                {translate('TREASAURE_MATERIAL')}
              </p>
              <div className="text-sm">
                {productData.material ? (
                  <p>{Object.values(productData.material).join(' - ')}</p>
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
              <div className="flex flex-row gap-5 mobile:justify-center">
                {productData.large && (
                  <div className="flex flex-col justify-center items-center text-center">
                    <p className="text-xs text-gray-400">
                      {translate('LARGE')}
                    </p>
                    <p className="text-sm">{productData.large} cm</p>
                  </div>
                )}
                {productData.width && (
                  <div className="flex flex-col justify-center items-center text-center">
                    <p className="text-xs text-gray-400">
                      {translate('WIDTH')}
                    </p>
                    <p className="text-sm">{productData.width} cm</p>
                  </div>
                )}
                {productData.height && (
                  <div className="flex flex-col justify-center items-center text-center">
                    <p className="text-xs text-gray-400">
                      {translate('HEIGHT')}
                    </p>
                    <p className="text-sm">{productData.height} cm</p>
                  </div>
                )}
                {productData.diameter && (
                  <div className="flex flex-col justify-center items-center text-center">
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
          <div className="flex flex-row gap-5 mobile:justify-center">
            <div className="flex flex-col justify-center items-center text-center">
              <p className="text-xs text-gray-400">
                {translate('TREASAURE_UNITS')}
              </p>
              <p className="text-sm">{productData.units}</p>
            </div>
            <div className="flex flex-col justify-center items-center text-center">
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
  );
};

export default ProductPage;
