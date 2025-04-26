import React from 'react';
import { FaSpinner } from 'react-icons/fa';

interface Props {
  isLightboxOpen: boolean;
}
const LightboxLoader = ({ isLightboxOpen }: Props) => {
  if (!isLightboxOpen) return null;

  return (
    <div className="bg-black/50 fixed inset-0 z-50 h-screen w-screen overflow-hidden px-5">
      <div className="flex items-center justify-center h-full w-full">
        <div className="flex flex-row justify-center items-center gap-4 bg-white px-10 py-4 rounded-md">
          <FaSpinner className="animate-spin text-2xl" />
          <p>Cargando...</p>
        </div>
      </div>
    </div>
  );
};

export default LightboxLoader;
