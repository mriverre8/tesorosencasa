'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import useCreateProductForm from '@/hooks/useCreateProductForm';
import InputCondition from '@/views/Admin/CreateProductForm/InputCondition/InputCondition';
import useLightboxOptions from '@/hooks/useLightboxOptions';
import { redirect } from 'next/navigation';
import ButtonSecondary from '@/components/ButtonSecondary';
import ButtonPrimary from '@/components/ButtonPrimary';

export default function CreateProduct() {
  const translate = useTranslations();

  const formValues = useCreateProductForm();
  const lightboxOptions = useLightboxOptions();

  const handleExit = () => {
    formValues.reset();
    lightboxOptions.onClose();
    redirect('/products');
  };

  const handleCancelBtn = () => {
    lightboxOptions.setContent(
      translate('EXIT_CREATING_WARNING_TITLE'),
      translate('EXIT_CREATING_WARNING_TEXT'),
      translate('CANCEL'),
      translate('YES_EXIT'),
      handleExit
    );
    lightboxOptions.onOpen();
  };

  const handleNextBtn = () => {
    redirect('/createproduct/background');
  };

  return (
    <div className="flex flex-col bg-background p-4 min-h-[calc(100vh-69px)] justify-between">
      <div>
        <h1 className="text-3xl font-semibold mb-6 text-gray-700">
          {translate('NEW_TREASAURE')}
        </h1>
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="name" className="px-0.5 text-sm">
            {translate('TREASAURE_NAME')}*
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formValues.productName}
            maxLength={30}
            onChange={(e) => formValues.setProductName(e.target.value)}
            className="border rounded-full px-4 py-2 w-full focus:ring-2 focus:ring-primary outline-none"
            autoComplete="off"
          />
        </div>
        <InputCondition
          condition={formValues.productCondition}
          setCondition={formValues.setProductCondition}
        />
      </div>
      <div className="flex justify-center gap-10 mb-6">
        <ButtonSecondary
          buttonText={translate('CANCEL')}
          buttonAction={handleCancelBtn}
        />
        <ButtonPrimary
          buttonText={translate('NEXT')}
          buttonAction={handleNextBtn}
        />
      </div>
    </div>
  );
}
