'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import useCreateProductForm from '@/hooks/useCreateProductForm';

interface Props {
  isLightboxOpen: boolean;
  closeLightbox: () => void;
  index: number;
}

const LightboxImages = ({ isLightboxOpen, closeLightbox, index }: Props) => {
  const translate = useTranslations();
  const { productImages, setProductImages } = useCreateProductForm();

  const file = productImages[index];

  const removeImage = () => {
    const newImages = productImages.filter((_, i) => i !== index);
    setProductImages(newImages);
    closeLightbox();
  };

  if (!isLightboxOpen || !file) return null;

  return (
    <div className="bg-black/70 fixed inset-0 z-50 h-screen w-screen overflow-hidden px-5">
      <div className="flex items-start justify-center h-full w-full pt-20">
        <div>
          <div className="relative aspect-[3/4] w-full overflow-hidden flex items-center justify-center bg-black rounded-sm">
            <Image
              src={URL.createObjectURL(file)}
              alt={`Preview ${index}`}
              width={600}
              height={600}
              quality={100}
              className="rounded-sm"
            />
          </div>

          <div className="text-center mt-2">
            <p className="text-white text-sm">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>

          <div className="flex justify-between items-center gap-3 mt-3 mb-3 w-full px-2 py-2 rounded-full bg-white">
            <button
              className="py-0.5 px-4 w-full text-sm hover:text-primary"
              onClick={closeLightbox}
            >
              {translate('GO_BACK')}
            </button>
            <button
              className="bg-red-600 rounded-full py-0.5 px-4 text-white w-full text-sm"
              onClick={removeImage}
            >
              {translate('DELETE')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightboxImages;
