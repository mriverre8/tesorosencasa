import React, { useState } from 'react';
import Image from 'next/image';

// Icons
import { FaCameraRetro } from 'react-icons/fa';
import { IoIosImages } from 'react-icons/io';

// Components
import LightboxImages from '@/views/Admin/CreateProductForm/LightboxImages/LightboxImages';

// Translation
import { translate } from '@/locales/translate';

interface Props {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

const InputImageFiles = ({ images, setImages }: Props) => {
  // Contiene un objeto (index, f) que representa la imagen seleccionada para mostrar en el lightbox
  const [selectedImage, setSelectedImage] = useState<{
    index: number;
    imageFile: File;
  }>({ index: -1, imageFile: new File([], '') });

  // Estado que controla si el lightbox está abierto o cerrado
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Función que se ejecuta cuando se añade un file al input
  // Se añade al array de imágenes si no está repetida
  // Si se supera el límite de 6 imágenes, se muestra un aviso
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);

    // Filtra imágenes repetidas
    const filteredFiles = newFiles.filter(
      (newFile) =>
        !images.some(
          (image) => image.name === newFile.name && image.size === newFile.size
        )
    );

    if (images.length + filteredFiles.length > 6) {
      alert('Solo puedes subir un máximo de 6 imágenes.');
      return;
    }

    setImages((prevImages) => [...prevImages, ...filteredFiles]);
  };

  // Función que abre el lightbox con la imagen seleccionada
  const openLightbox = (data: { index: number; imageFile: File }) => {
    setSelectedImage(data);
    setIsLightboxOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-2 ">
        <label className="px-0.5 text-sm">
          {translate('TREASAURE_MULTIMEDIA_1')}*
          {translate('TREASAURE_MULTIMEDIA_2')}
        </label>

        <div className="flex gap-2">
          <label className="flex cursor-pointer bg-primary text-white  rounded-full items-center justify-center">
            <FaCameraRetro className="font-semibold m-3 text-lg" />
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          <label className="flex gap-2 cursor-pointer w-full border border-primary bg-white text-sm py-2 px-4 rounded-full justify-center items-center text-center ">
            <IoIosImages className="font-semibold text-xl" />
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

        {images.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-2">
            {images.map((file, index) => (
              <div
                key={index}
                className="w-24 h-24 relative overflow-hidden rounded-lg bg-gray-200"
              >
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  width={96} // 24 Tailwind * 4px = 96px
                  height={96}
                  className="object-cover w-full h-full"
                  onClick={() => openLightbox({ index, imageFile: file })}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-2 text-center">
            <p className="text-xs pt-1 text-red-600">productimages_empty</p>
          </div>
        )}
      </div>

      <LightboxImages
        isLightboxOpen={isLightboxOpen}
        data={selectedImage}
        closeLightbox={() => setIsLightboxOpen(false)}
        setImages={setImages}
      />
    </>
  );
};

export default InputImageFiles;
