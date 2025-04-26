'use client';

import Image from 'next/image';

interface LightboxImagesProps {
  isLightboxOpen: boolean;
  data: { index: number; imageFile: File };
  closeAction: () => void;
  setImages: (updateFn: (prevImages: File[]) => File[]) => void;
}

const LightboxImages = ({
  isLightboxOpen,
  data,
  closeAction,
  setImages,
}: LightboxImagesProps) => {
  // Función que elimina la imagen seleccionada del array de imágenes y cierra el lightbox
  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    closeAction();
  };

  if (!isLightboxOpen || !data) return null;

  return (
    <div className="bg-black/50 fixed inset-0 z-50 h-screen w-screen overflow-hidden px-5">
      <div className="flex items-center justify-center h-full w-full">
        <div className="w-full p-0.5 bg-white rounded-lg ">
          <Image
            src={URL.createObjectURL(data.imageFile)}
            alt={`Preview ${data.index}`}
            layout="responsive"
            width={500}
            height={500}
            className="w-full h-full object-cover rounded-t-lg "
          />
          <div className="flex justify-between items-center gap-3 mt-3 mb-3 w-full px-2">
            <button
              className="border rounded-full py-1 px-4 w-full "
              onClick={closeAction}
            >
              Volver
            </button>
            <button
              className="bg-red-600 rounded-full py-1 px-4 text-white w-full"
              onClick={() => removeImage(data.index)}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightboxImages;
