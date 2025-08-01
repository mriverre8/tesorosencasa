'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import useCreateProductForm from '@/hooks/useCreateProductForm';
import InputCondition from '@/views/Admin/CreateProductForm/InputCondition/InputCondition';
import useLightboxOptions from '@/hooks/useLightboxOptions';
import { redirect } from 'next/navigation';
import ButtonSecondary from '@/components/ButtonSecondary';
import ButtonPrimary from '@/components/ButtonPrimary';
import { isFormProductNameOk } from '@/validators/validators';

export default function CreateProduct() {
  const translate = useTranslations();

  const formValues = useCreateProductForm();
  const lightboxOptions = useLightboxOptions();

  const isFormOk = isFormProductNameOk(formValues.productName);

  const handleExit = () => {
    formValues.reset();
    formValues.setIsEditing(false);
    lightboxOptions.onClose();
    redirect('/products');
  };

  const handleCancelBtn = () => {
    if (formValues.isEditing) {
      lightboxOptions.setContent(
        translate('EXIT_EDITING_WARNING_TITLE'),
        translate('EXIT_EDITING_WARNING_TEXT'),
        translate('CANCEL'),
        translate('YES_EXIT'),
        true,
        handleExit
      );
    } else {
      lightboxOptions.setContent(
        translate('EXIT_CREATING_WARNING_TITLE'),
        translate('EXIT_CREATING_WARNING_TEXT'),
        translate('CANCEL'),
        translate('YES_EXIT'),
        true,
        handleExit
      );
    }
    lightboxOptions.onOpen();
  };

  const handleNextBtn = () => {
    redirect('/createproduct/background');
  };

  return (
    <div className="flex flex-col bg-background p-4 min-h-[calc(100vh-69px)] justify-between">
      <div>
        <h1 className="text-3xl font-semibold mb-6 text-gray-700">
          {formValues.isEditing
            ? translate('UPDATE_TREASAURE')
            : translate('NEW_TREASAURE')}
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
            className={`border rounded-full px-4 py-2 w-full focus:ring-2 ${!isFormProductNameOk(formValues.productName) ? 'border-red-400 focus:ring-red-500' : 'focus:ring-primary'} outline-none`}
            autoComplete="off"
          />
          {!isFormProductNameOk(formValues.productName) && (
            <p className="text-xs pt-1 text-red-600 px-0.5">
              {translate('INPUT_PRODUCT_NAME_INVALID')}
            </p>
          )}
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
          disabled={!isFormOk}
        />
      </div>
    </div>
  );
}
