import React from 'react';

interface Props {
  isLightboxOpen: boolean;
}
const LightboxError = ({ isLightboxOpen }: Props) => {
  if (!isLightboxOpen) return null;

  return (
    <div className="bg-black/70 fixed inset-0 z-50 h-screen w-screen overflow-hidden px-5">
      <div className="flex items-center justify-center h-full w-full">
        <div className="flex flex-row justify-center items-center gap-4 bg-white px-10 py-4 rounded-md">
          Contenido solo disponible en versón moivil
        </div>
      </div>
    </div>
  );
};

export default LightboxError;
