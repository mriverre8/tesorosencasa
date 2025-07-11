'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import useCreateProductForm from '@/hooks/useCreateProductForm';
import InputMaterial from '@/views/Admin/CreateProductForm/InputMaterial/InputMaterial';
import { redirect } from 'next/navigation';
import ButtonPrimary from '@/components/ButtonPrimary';
import ButtonSecondary from '@/components/ButtonSecondary';

export default function Manufacturing() {
  const translate = useTranslations();

  const formValues = useCreateProductForm();

  const handleBackBtn = () => {
    redirect('/createproduct/background');
  };

  const handleNextBtn = () => {
    redirect('/createproduct/dimensions');
  };

  return (
    <div className="flex flex-col bg-background p-4 min-h-[calc(100vh-69px)] justify-between">
      <div>
        <div className="flex flex-wrap items-end gap-x-2 mb-6">
          <h1 className="text-3xl font-semibold text-gray-700">
            {translate('NEW_TREASAURE')}
          </h1>
          <h2 className="text-lg text-gray-700">
            {translate('TREASAURE_FABRICATION')}
          </h2>
        </div>
        <InputMaterial
          materials={formValues.productMaterial}
          setMaterials={formValues.setProductMaterial}
        />
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="brand" className="px-0.5 text-sm">
            {translate('TREASAURE_CATEGORY')}
          </label>
          <input
            id="brand"
            name="brand"
            value={formValues.productCategory}
            maxLength={30}
            onChange={(e) => formValues.setProductCategory(e.target.value)}
            type="text"
            placeholder={translate('OTHER')}
            className="border rounded-full px-4 py-2 w-full focus:ring-2 focus:ring-primary outline-none"
            autoComplete="off"
          />
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
