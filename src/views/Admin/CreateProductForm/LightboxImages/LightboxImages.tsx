'use client';

import React from 'react';
import Image from 'next/image';

// Translation
import { useTranslations } from 'next-intl';

interface Props {
  isLightboxOpen: boolean;
  closeLightbox: () => void;
  data: { index: number; imageFile: File };
  setImages: (updateFn: (prevImages: File[]) => File[]) => void;
}

const LightboxImages = ({
  isLightboxOpen,
  closeLightbox,
  data,
  setImages,
}: Props) => {
  const translate = useTranslations();

  // Función que elimina la imagen seleccionada del array de imágenes y cierra el lightbox
  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    closeLightbox();
  };

  if (!isLightboxOpen || !data) return null;

  return (
    <div className="bg-black/70 fixed inset-0 z-50 h-screen w-screen overflow-hidden px-5">
      <div className="flex items-start justify-center h-full w-full pt-20">
        <div className="">
          <div className="relative aspect-[3/4] w-full overflow-hidden flex items-center justify-center bg-black rounded-sm">
            <Image
              src={URL.createObjectURL(data.imageFile)}
              alt={`Preview ${data.index}`}
              width={600}
              height={600}
              quality={100}
              className="rounded-sm"
            />
          </div>
          <div className="text-center">
            <p className="text-white">
              {(data.imageFile.size / (1024 * 1024)).toFixed(2)} MB
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
              onClick={() => removeImage(data.index)}
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
