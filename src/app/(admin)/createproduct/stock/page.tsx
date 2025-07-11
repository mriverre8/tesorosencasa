'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import useCreateProductForm from '@/hooks/useCreateProductForm';
import { acceptOnlyNumbers } from '@/utils/utilsForm';
import InputImageFiles from '@/views/Admin/CreateProductForm/InputImageFiles/InputImageFiles';
import ButtonSecondary from '@/components/ButtonSecondary';
import ButtonPrimary from '@/components/ButtonPrimary';
import { redirect } from 'next/navigation';

export default function Stock() {
  const translate = useTranslations();

  const formValues = useCreateProductForm();

  const handleBackBtn = () => {
    redirect('/createproduct/dimensions');
  };

  const handleCreateProduct = () => {};

  return (
    <div className="flex flex-col bg-background p-4 min-h-[calc(100vh-69px)] justify-between">
      <div>
        <div className="flex flex-wrap items-end gap-x-2 mb-6">
          <h1 className="text-3xl font-semibold text-gray-700">
            {translate('NEW_TREASAURE')}
          </h1>
          <h2 className="text-lg text-gray-700">
            {translate('TREASAURE_STOCK')}
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
          <div>
            <label htmlFor="units" className="px-0.5 text-sm whitespace-nowrap">
              {translate('TREASAURE_AVAILABLE_UNITS')}*
            </label>
            <input
              id="units"
              name="units"
              value={formValues.productUnits}
              onChange={(e) =>
                acceptOnlyNumbers(e, formValues.setProductUnits, true)
              }
              maxLength={2}
              inputMode="numeric"
              type="text"
              className="border  rounded-full px-4 py-2 w-full focus:ring-2 outline-none "
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="price" className="px-0.5 text-sm">
              {translate('TREASAURE_PRICE')}*
            </label>
            <div className="relative">
              <input
                id="price"
                name="price"
                value={formValues.productPrice}
                onChange={(e) =>
                  acceptOnlyNumbers(e, formValues.setProductPrice)
                }
                maxLength={7}
                inputMode="decimal"
                type="text"
                className="border  rounded-full pl-4 pr-8 py-2 w-full focus:ring-2 outline-none"
                autoComplete="off"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 pointer-events-none">
                €
              </button>
            </div>
          </div>
        </div>
        {/* TODO: improve InputImageFiles logic */}
        <InputImageFiles />
      </div>
      <div className="flex justify-center gap-10 mb-6">
        <ButtonSecondary
          buttonText={translate('GO_BACK')}
          buttonAction={handleBackBtn}
        />
        <ButtonPrimary
          buttonText={translate('CREATE_TREASAURE')}
          buttonAction={handleCreateProduct}
        />
      </div>
    </div>
  );
}
