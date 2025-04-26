import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loader = () => {
  return (
    <div className="flex flex-row justify-center items-center gap-4 bg-white px-10 py-4 rounded-md">
      <FaSpinner className="animate-spin text-2xl" />
      <p>Cargando...</p>
    </div>
  );
};

export default Loader;
