'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import useCreateProductForm from '@/hooks/useCreateProductForm';
import { acceptOnlyNumbers } from '@/utils/utils';
import { redirect } from 'next/navigation';
import ButtonSecondary from '@/components/ButtonSecondary';
import ButtonPrimary from '@/components/ButtonPrimary';

export default function Manufacturing() {
  const translate = useTranslations();

  const formValues = useCreateProductForm();

  const handleBackBtn = () => {
    redirect('/createproduct/manufacturing');
  };

  const handleNextBtn = () => {
    redirect('/createproduct/stock');
  };

  return (
    <div className="flex flex-col bg-background p-4 min-h-[calc(100vh-69px)] justify-between">
      <div>
        <div className="flex flex-wrap items-end gap-x-2 mb-6">
          <h1 className="text-3xl font-semibold text-gray-700">
            {formValues.isEditing
              ? translate('UPDATE_TREASAURE')
              : translate('NEW_TREASAURE')}
          </h1>
          <h2 className="text-lg text-gray-700">
            {translate('TREASAURE_DIMENSIONS')}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-4">
          <div>
            <label htmlFor="large" className="px-0.5 text-sm">
              {translate('LARGE')}
            </label>
            <div className="relative">
              <input
                id="large"
                name="large"
                value={formValues.productLarge}
                onChange={(e) =>
                  acceptOnlyNumbers(
                    e.target.value,
                    formValues.setProductLarge,
                    true
                  )
                }
                inputMode="numeric"
                maxLength={3}
                type="text"
                className="border  rounded-full pl-4 pr-12 py-2 w-full focus:ring-2 focus:ring-primary outline-none"
                autoComplete="off"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 pointer-events-none">
                cm
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="width" className="px-0.5 text-sm">
              {translate('WIDTH')}
            </label>
            <div className="relative">
              <input
                id="width"
                name="width"
                value={formValues.productWidth}
                onChange={(e) =>
                  acceptOnlyNumbers(
                    e.target.value,
                    formValues.setProductWidth,
                    true
                  )
                }
                inputMode="numeric"
                maxLength={3}
                type="text"
                className="border  rounded-full pl-4 pr-12 py-2 w-full focus:ring-2 focus:ring-primary outline-none"
                autoComplete="off"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 pointer-events-none">
                cm
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="height" className="px-0.5 text-sm">
              {translate('HEIGHT')}
            </label>
            <div className="relative">
              <input
                id="height"
                name="height"
                value={formValues.productHeight}
                onChange={(e) =>
                  acceptOnlyNumbers(
                    e.target.value,
                    formValues.setProductHeight,
                    true
                  )
                }
                inputMode="numeric"
                maxLength={3}
                type="text"
                className="border  rounded-full pl-4 pr-12 py-2 w-full focus:ring-2 focus:ring-primary outline-none"
                autoComplete="off"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 pointer-events-none">
                cm
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="diameter" className="px-0.5 text-sm">
              {translate('DIAMETER')}
            </label>
            <div className="relative">
              <input
                id="diameter"
                name="diameter"
                value={formValues.productDiameter}
                onChange={(e) =>
                  acceptOnlyNumbers(
                    e.target.value,
                    formValues.setProductDiameter,
                    true
                  )
                }
                inputMode="numeric"
                maxLength={3}
                type="text"
                className="border  rounded-full pl-4 pr-12 py-2 w-full focus:ring-2 focus:ring-primary outline-none"
                autoComplete="off"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 pointer-events-none">
                cm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-10 mb-6">
        <ButtonSecondary
          buttonText={translate('GO_BACK')}
          buttonAction={handleBackBtn}
        />
        <ButtonPrimary
          buttonText={translate('NEXT')}
          buttonAction={handleNextBtn}
        />
      </div>
    </div>
  );
}
