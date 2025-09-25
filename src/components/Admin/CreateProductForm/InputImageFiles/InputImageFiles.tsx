'use client';

import React, { useState } from 'react';
import NextImage from 'next/image';

// Icons
import { FaCameraRetro } from 'react-icons/fa';
import { IoIosImages } from 'react-icons/io';

// Translation
import { useTranslations } from 'next-intl';

// Components
import LightboxImages from '../LightboxImages/LightboxImages';

// Hooks
import useCreateProductForm from '@/hooks/useCreateProductForm';

// Constants
import { MAX_IMAGES_LIMIT } from '@/constants/constants';

const InputImageFiles = () => {
  const translate = useTranslations();

  const { productImages, setProductImages, isEditing } = useCreateProductForm();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);

    const uniqueFiles = newFiles.filter(
      (file) =>
        !productImages.some(
          (img) => img.name === file.name && img.size === file.size
        )
    );

    setProductImages([...productImages, ...uniqueFiles]);
  };

  const showMaxImagesError = () => {
    return productImages.length > 6;
  };

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <>
      {isEditing && (
        <p className="text-sm text-gray-500">
          Las imágenes todavía no se pueden editar
        </p>
      )}
      {!isEditing && (
        <>
          <div className="flex flex-col gap-2">
            <label className="px-0.5 text-sm">
              {translate('TREASAURE_MULTIMEDIA_1')}*
              {translate('TREASAURE_MULTIMEDIA_2', {
                maxImages: MAX_IMAGES_LIMIT,
              })}
            </label>

            <div className="flex gap-2">
              <label className="flex cursor-pointer bg-primary text-white rounded-full items-center justify-center">
                <FaCameraRetro className="m-3 text-lg" />
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>

              <label className="flex gap-2 cursor-pointer w-full border border-primary bg-white text-sm py-2 px-4 rounded-full justify-center items-center text-center">
                <IoIosImages className="text-xl" />
                {translate('SELECT_FROM_GALLERY')}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {productImages.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2 justify-center overflow-y-auto max-h-64">
                {productImages.map((file, index) => (
                  <div
                    key={index}
                    className="w-24 h-24 relative overflow-hidden rounded-lg bg-gray-200 cursor-pointer"
                    onClick={() => openLightbox(index)}
                  >
                    <NextImage
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index}`}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-2 text-center">
                <p className="text-xs pt-1 text-red-600">
                  {translate('INPUT_PRODUCT_IMAGES_EMPTY')}
                </p>
              </div>
            )}
          </div>
          {showMaxImagesError() && (
            <div className="mt-4 text-center">
              <p className="text-xs pt-1 text-red-600">
                {translate('MAX_IMAGES_LIMIT', { limit: MAX_IMAGES_LIMIT })}
              </p>
            </div>
          )}

          {selectedIndex !== null && (
            <LightboxImages
              isLightboxOpen={isLightboxOpen}
              closeLightbox={() => setIsLightboxOpen(false)}
              index={selectedIndex}
            />
          )}
        </>
      )}
    </>
  );
};

export default InputImageFiles;
