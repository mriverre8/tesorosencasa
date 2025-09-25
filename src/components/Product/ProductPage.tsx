'use client';

import React, { useEffect, useState } from 'react';

// Components
import Carousel from '@/components/common/Carousel';
import ProductPageSkeleton from './ProductPageSkeleton';
import ButtonSecondary from '@/components/common/ButtonSecondary';

// Actions
import { getProductById } from '@/actions/getProductById';

// Hooks
import useAppContext from '@/hooks/useAppContext';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import useToast from '@/hooks/useToast';

// Types
import { tesoros } from '@prisma/client';

// Icons
import { TbCopyPlus } from 'react-icons/tb';

interface Props {
  id: string;
}

const ProductPage = ({ id }: Props) => {
  const translate = useTranslations();
  const router = useRouter();

  const context = useAppContext();
  const toast = useToast();

  const [tesoro, setTesoro] = useState<tesoros>();

  const handleShare = (id: string) => {
    const url = `https://tesorosencasa.vercel.app/tesoro/${id}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.setText(translate('LINK_COPIED'));
      toast.onOpen();
    });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const tesoroData = await getProductById(id);
      setTesoro(tesoroData);
    };
    if (context.hasBeenInitialized) {
      const foundTesoro = context.tesoros.find((t) => t.id === id);
      setTesoro(foundTesoro);
    } else {
      fetchProduct();
    }
  }, []);

  if (!tesoro) {
    return <ProductPageSkeleton />;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col gap-2 max-w-lg">
        <div>
          <ButtonSecondary
            buttonText={translate('GO_BACK')}
            buttonAction={() => router.push('/')}
          />
        </div>

        <Carousel tesoro={tesoro} />

        <div className="flex flex-col gap-3 rounded-md mt-4 mb-10">
          <div className="flex justify-between gap-5">
            <h1 className="text-2xl font-bold">{tesoro.name}</h1>
            <button
              onClick={() => handleShare(tesoro.id)}
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
                  {tesoro.condition?.length ? (
                    tesoro.condition.length === 1 ? (
                      <span>{Object.values(tesoro.condition)[0]}</span>
                    ) : (
                      <ul className="list-disc ml-5 pt-0.5">
                        {Object.values(tesoro.condition).map((cond, idx) => (
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
                  {tesoro.origin ? tesoro.origin : translate('UNKNOWN')}
                </p>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-xs text-gray-400">
                  {translate('TREASAURE_BRAND')}
                </p>
                <p className="text-sm ">
                  {tesoro.brand ? tesoro.brand : translate('UNKNOWN')}
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
                  {tesoro.material?.length ? (
                    tesoro.material.length === 1 ? (
                      <span>{Object.values(tesoro.material)[0]}</span>
                    ) : (
                      <ul className="list-disc ml-5 pt-0.5">
                        {Object.values(tesoro.material).map((mat, idx) => (
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
                  {tesoro.category ? tesoro.category : translate('UNKNOWN')}
                </p>
              </div>
            </div>
            {(tesoro.large ||
              tesoro.width ||
              tesoro.height ||
              tesoro.diameter) && (
              <>
                <h2 className="font-semibold">
                  {translate('TREASAURE_DIMENSIONS')}
                </h2>
                <div className="flex flex-col mobile:flex-row gap-2 mobile:gap-10">
                  {tesoro.large && (
                    <div className="flex flex-col mobile:justify-center mobile:items-center mobile:text-center">
                      <p className="text-xs text-gray-400">
                        {translate('LARGE')}
                      </p>
                      <p className="text-sm">{tesoro.large} cm</p>
                    </div>
                  )}
                  {tesoro.width && (
                    <div className="flex flex-col mobile:justify-center mobile:items-center mobile:text-center">
                      <p className="text-xs text-gray-400">
                        {translate('WIDTH')}
                      </p>
                      <p className="text-sm">{tesoro.width} cm</p>
                    </div>
                  )}
                  {tesoro.height && (
                    <div className="flex flex-col mobile:justify-center mobile:items-center mobile:text-center">
                      <p className="text-xs text-gray-400">
                        {translate('HEIGHT')}
                      </p>
                      <p className="text-sm">{tesoro.height} cm</p>
                    </div>
                  )}
                  {tesoro.diameter && (
                    <div className="flex flex-col mobile:justify-center mobile:items-center mobile:text-center">
                      <p className="text-xs text-gray-400">
                        {translate('DIAMETER')}
                      </p>
                      <p className="text-sm">{tesoro.diameter} cm</p>
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
                <p className="text-sm">{tesoro.units}</p>
              </div>
              <div className="flex flex-col mobile:justify-center mobile:items-center mobile:text-center">
                <p className="text-xs text-gray-400 ">
                  {translate('TREASAURE_PRICE')}{' '}
                  {translate('TREASAURE_PRICE_X_UNITS')}
                </p>
                <p className="text-sm">{tesoro.price} €</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
