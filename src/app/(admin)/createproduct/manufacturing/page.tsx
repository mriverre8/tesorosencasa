'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

// Components
import InputMaterial from '@/components/Admin/CreateProductForm/InputMaterial/InputMaterial';
import ButtonPrimary from '@/components/common/ButtonPrimary';
import ButtonSecondary from '@/components/common/ButtonSecondary';

// Hooks
import { useTranslations } from 'next-intl';
import useCreateProductForm from '@/hooks/useCreateProductForm';

// Utils
import { isFormProductCategoryOk } from '@/validators/validators';

export default function Manufacturing() {
  const translate = useTranslations();
  const router = useRouter();

  const formValues = useCreateProductForm();

  const isFormOk = isFormProductCategoryOk(formValues.productCategory);

  const handleBackBtn = () => {
    router.push('/createproduct/background');
  };

  const handleNextBtn = () => {
    router.push('/createproduct/dimensions');
  };

  return (
    <div className="flex flex-col p-4 min-h-[calc(100vh-69px)] md:justify-normal justify-between max-w-4xl md:gap-10 mx-auto">
      <div>
        <div className="flex flex-wrap items-end gap-x-2 mb-6">
          <h1 className="text-3xl font-semibold text-gray-700">
            {formValues.isEditing
              ? translate('UPDATE_TREASAURE')
              : translate('NEW_TREASAURE')}
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
            className={`border rounded-full px-4 py-2 w-full focus:ring-2 ${!isFormProductCategoryOk(formValues.productCategory) ? 'border-red-400 focus:ring-red-500' : 'focus:ring-primary'} outline-none`}
            autoComplete="off"
          />
          {!isFormProductCategoryOk(formValues.productCategory) && (
            <p className="text-xs pt-1 text-red-600 px-0.5">
              {translate('INPUT_PRODUCT_CATEGORY_INVALID')}
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
