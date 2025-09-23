'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

// Components
import ButtonSecondary from '@/components/ButtonSecondary';
import ButtonPrimary from '@/components/ButtonPrimary';
import InputCountries from '@/views/Admin/CreateProductForm/InputCountries/InputCountries';

// Hooks
import { useTranslations } from 'next-intl';
import useCreateProductForm from '@/hooks/useCreateProductForm';

// Utils
import { isFormProductBrandOk } from '@/validators/validators';

export default function Background() {
  const translate = useTranslations();
  const router = useRouter();

  const formValues = useCreateProductForm();

  const isFormOk = isFormProductBrandOk(formValues.productBrand);

  const handleBackBtn = () => {
    router.push('/createproduct');
  };

  const handleNextBtn = () => {
    router.push('/createproduct/manufacturing');
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
            {translate('TREASAURE_BACKGROUND')}
          </h2>
        </div>
        <InputCountries
          country={formValues.productOrigin}
          setCountry={formValues.setProductOrigin}
        />
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="brand" className="px-0.5 text-sm">
            {translate('TREASAURE_BRAND')}
          </label>
          <input
            id="brand"
            name="brand"
            value={formValues.productBrand}
            maxLength={30}
            onChange={(e) => formValues.setProductBrand(e.target.value)}
            type="text"
            placeholder={translate('UNKNOWN')}
            className={`border rounded-full px-4 py-2 w-full focus:ring-2 ${!isFormProductBrandOk(formValues.productBrand) ? 'border-red-400 focus:ring-red-500' : 'focus:ring-primary'} outline-none`}
            autoComplete="off"
          />
          {!isFormProductBrandOk(formValues.productBrand) && (
            <p className="text-xs pt-1 text-red-600 px-0.5">
              {translate('INPUT_PRODUCT_BRAND_INVALID')}
            </p>
          )}
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
          disabled={!isFormOk}
        />
      </div>
    </div>
  );
}
