import React from 'react';

const Lightbox = ({
  isLightboxOpen,
  children,
}: {
  isLightboxOpen: boolean;
  children: React.ReactNode;
}) => {
  if (!isLightboxOpen) return null;

  return (
    <>
      {/* Fondo oscuro cubriendo toda la pantalla */}
      <div className="bg-black/50 fixed inset-0 z-50 h-screen w-screen overflow-hidden px-5">
        {/* Contenedor centrado sin scroll */}
        <div className="flex items-center justify-center h-full w-full">
          {children}
        </div>
      </div>
    </>
  );
};

export default Lightbox;
