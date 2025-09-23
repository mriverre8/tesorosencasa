'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

// Components
import InputImageFiles from '@/views/Admin/CreateProductForm/InputImageFiles/InputImageFiles';
import ButtonSecondary from '@/components/ButtonSecondary';
import ButtonPrimary from '@/components/ButtonPrimary';

// Hooks
import { useTranslations } from 'next-intl';
import useCreateProductForm from '@/hooks/useCreateProductForm';
import useLoader from '@/hooks/useLoader';
import useLightboxMessage from '@/hooks/useLightboxMessage';

// Utils
import { acceptOnlyNumbers } from '@/utils/utils';
import {
  isFormProductImagesOk,
  isFormProductPriceOk,
  isFormProductUnitsOk,
} from '@/validators/validators';
import { generateNewProductPayload } from '@/utils/payloadUtils';

// Actions
import { newProduct } from '@/actions/newproduct';
import { uploadImage } from '@/actions/uploadImage';
import { editProduct } from '@/actions/editProduct';

export default function Stock() {
  const translate = useTranslations();
  const router = useRouter();

  const lightboxLoader = useLoader();
  const lightboxMessage = useLightboxMessage();

  const formValues = useCreateProductForm();

  const isFormOk =
    isFormProductUnitsOk(formValues.productUnits) &&
    isFormProductPriceOk(formValues.productPrice) &&
    (formValues.isEditing || isFormProductImagesOk(formValues.productImages));

  const handleBackBtn = () => {
    router.push('/createproduct/dimensions');
  };

  const handleCreateProduct = async () => {
    lightboxLoader.onOpen();

    const uploadedImages: string[] = [];
    for (const image of formValues.productImages) {
      const res = await uploadImage(image);
      if (res.url) {
        uploadedImages.push(res.url);
      }
    }

    if (uploadedImages.length === 0) {
      lightboxLoader.onClose();
      lightboxMessage.setContent(
        translate('ERROR'),
        translate('ERROR_IMAGE_UPLOAD'),
        translate('ACCEPT')
      );
      lightboxMessage.onOpen();
      return;
    }

    const payload = generateNewProductPayload(formValues, uploadedImages);
    const response = await newProduct(payload);

    if (!response.error) {
      formValues.reset();
      lightboxMessage.setContent(
        translate('SUCCESS_TREASAURE_CREATION_TITLE'),
        translate('SUCCESS_TREASAURE_CREATION_TEXT'),
        translate('ACCEPT')
      );
      lightboxLoader.onClose();
      lightboxMessage.onOpen();
      router.push('/products');
    } else {
      lightboxMessage.setContent(
        translate('ERROR'),
        translate('ERROR_TREASAURE_CREATION'),
        translate('ACCEPT')
      );
      lightboxLoader.onClose();
      lightboxMessage.onOpen();
    }
    lightboxLoader.onClose();
  };

  const handleUpdateProduct = async () => {
    lightboxLoader.onOpen();
    const payload = generateNewProductPayload(formValues, []);
    const response = await editProduct(formValues.productId, payload);
    if (!response.error) {
      formValues.reset();
      formValues.setIsEditing(false);
      formValues.setProductId('');
      lightboxMessage.setContent(
        translate('SUCCESS_TREASAURE_EDITION_TITLE'),
        translate('SUCCESS_TREASAURE_EDITION_TEXT', {
          name: formValues.productName,
        }),
        translate('ACCEPT')
      );
      lightboxLoader.onClose();
      lightboxMessage.onOpen();
      router.push('/products');
    } else {
      lightboxMessage.setContent(
        translate('ERROR'),
        translate('ERROR_TREASAURE_EDITION'),
        translate('ACCEPT')
      );
      lightboxLoader.onClose();
      lightboxMessage.onOpen();
    }
    lightboxLoader.onClose();
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
                acceptOnlyNumbers(
                  e.target.value,
                  formValues.setProductUnits,
                  true
                )
              }
              maxLength={2}
              inputMode="numeric"
              type="text"
              className={`border rounded-full px-4 py-2 w-full focus:ring-2 ${!isFormProductUnitsOk(formValues.productUnits) ? 'border-red-400 focus:ring-red-500' : 'focus:ring-primary'} outline-none`}
              autoComplete="off"
            />
            {!isFormProductUnitsOk(formValues.productUnits) && (
              <p className="text-xs pt-1 text-red-600 px-0.5">
                {translate('INPUT_PRODUCT_UNITS_INVALID')}
              </p>
            )}
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
                  acceptOnlyNumbers(e.target.value, formValues.setProductPrice)
                }
                maxLength={7}
                inputMode="decimal"
                type="text"
                className={`border rounded-full px-4 py-2 w-full focus:ring-2 ${!isFormProductPriceOk(formValues.productPrice) ? 'border-red-400 focus:ring-red-500' : 'focus:ring-primary'} outline-none`}
                autoComplete="off"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 pointer-events-none">
                €
              </button>
            </div>
            {!isFormProductPriceOk(formValues.productPrice) && (
              <p className="text-xs pt-1 text-red-600 px-0.5">
                {translate('INPUT_PRODUCT_PRICE_INVALID')}
              </p>
            )}
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
          buttonText={
            formValues.isEditing
              ? translate('UPDATE_TREASAURE')
              : translate('CREATE_TREASAURE')
          }
          buttonAction={
            formValues.isEditing ? handleUpdateProduct : handleCreateProduct
          }
          disabled={!isFormOk}
        />
      </div>
    </div>
  );
}
