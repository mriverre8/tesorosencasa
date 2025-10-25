'use client';

import React from 'react';

// Components
import Carousel from '@/components/common/Carousel';
import ButtonSecondary from '@/components/common/ButtonSecondary';

// Hooks
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import useToast from '@/hooks/useToast';

// Types
import { tesoros } from '@prisma/client';

// Icons
import { TbCopyPlus } from 'react-icons/tb';

interface ProductPageProps {
  product: tesoros;
}

const ProductPage = ({ product }: ProductPageProps) => {
  const translate = useTranslations();
  const router = useRouter();
  const toast = useToast();

  const handleShare = (id: string) => {
    const url = `https://tesorosencasa.vercel.app/tesoro/${id}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.setText(translate('LINK_COPIED'));
      toast.onOpen();
    });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col gap-2 max-w-lg">
        <div>
          <ButtonSecondary
            buttonText={translate('GO_BACK')}
            buttonAction={() => router.push('/')}
          />
        </div>

        <Carousel tesoro={product} />

        <div className="flex flex-col gap-3 rounded-md mt-4 mb-10">
          <div className="flex justify-between gap-5">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <button
              onClick={() => handleShare(product.id)}
              className="flex justify-start items-start pt-1.5"
            >
              <TbCopyPlus className="text-xl text-secondary hover:text-secondary-hover" />
            </button>
          </div>
          <div className="flex flex-col gap-3 mt-3">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <p className="text-xs text-gray-400">
                  {translate('TREASSAURE_CONDITION')}
                </p>
                <div className="text-sm">
                  {product.condition?.length ? (
                    product.condition.length === 1 ? (
                      <span>{Object.values(product.condition)[0]}</span>
                    ) : (
                      <ul className="list-disc ml-5 pt-0.5">
                        {Object.values(product.condition).map((cond, idx) => (
                          <li key={idx}>{cond}</li>
                        ))}
                      </ul>
                    )
                  ) : (
                    translate('CONDITION_7')
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
                  {product.origin ? product.origin : translate('UNKNOWN')}
                </p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-xs text-gray-400">
                  {translate('TREASAURE_BRAND')}
                </p>
                <p className="text-sm ">
                  {product.brand ? product.brand : translate('UNKNOWN')}
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
                  {product.material?.length ? (
                    product.material.length === 1 ? (
                      <span>{Object.values(product.material)[0]}</span>
                    ) : (
                      <ul className="list-disc ml-5 pt-0.5">
                        {Object.values(product.material).map((mat, idx) => (
                          <li key={idx}>{mat}</li>
                        ))}
                      </ul>
                    )
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
                  {product.category ? product.category : translate('UNKNOWN')}
                </p>
              </div>
            </div>
            {(product.large ||
              product.width ||
              product.height ||
              product.diameter) && (
              <>
                <h2 className="font-semibold">
                  {translate('TREASAURE_DIMENSIONS')}
                </h2>
                <div className="flex flex-col mobile:flex-row gap-2 mobile:gap-10">
                  {product.large && (
                    <div className="flex flex-col mobile:justify-center mobile:items-center mobile:text-center">
                      <p className="text-xs text-gray-400">
                        {translate('LARGE')}
                      </p>
                      <p className="text-sm">{product.large} cm</p>
                    </div>
                  )}
                  {product.width && (
                    <div className="flex flex-col mobile:justify-center mobile:items-center mobile:text-center">
                      <p className="text-xs text-gray-400">
                        {translate('WIDTH')}
                      </p>
                      <p className="text-sm">{product.width} cm</p>
                    </div>
                  )}
                  {product.height && (
                    <div className="flex flex-col mobile:justify-center mobile:items-center mobile:text-center">
                      <p className="text-xs text-gray-400">
                        {translate('HEIGHT')}
                      </p>
                      <p className="text-sm">{product.height} cm</p>
                    </div>
                  )}
                  {product.diameter && (
                    <div className="flex flex-col mobile:justify-center mobile:items-center mobile:text-center">
                      <p className="text-xs text-gray-400">
                        {translate('DIAMETER')}
                      </p>
                      <p className="text-sm">{product.diameter} cm</p>
                    </div>
                  )}
                </div>
              </>
            )}
            <h2 className="font-semibold">{translate('TREASAURE_STOCK')}</h2>
            <div className="flex flex-col mobile:flex-row gap-2 mobile:gap-10">
              <div className="flex flex-col mobile:justify-center mobile:items-center mobile:text-center">
                <p className="text-xs text-gray-400">
                  {translate('TREASAURE_UNITS')}
                </p>
                <p className="text-sm">{product.units}</p>
              </div>
              <div className="flex flex-col mobile:justify-center mobile:items-center mobile:text-center">
                <p className="text-xs text-gray-400 ">
                  {translate('TREASAURE_PRICE')}{' '}
                  {translate('TREASAURE_PRICE_X_UNITS')}
                </p>
                <p className="text-sm">{product.price} €</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
