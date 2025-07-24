// components/LightboxLoaderWrapper.tsx
'use client';

import React from 'react';
import LightboxLoader from './Lightbox/LightboxLoader';
import LightboxMessage from './Lightbox/LightboxMessage';
import LightboxOptions from './Lightbox/LightboxOptions';
import LightboxProduct from './Lightbox/LightboxProduct';

const ModalContainer = () => {
  return (
    <>
      <LightboxLoader />
      <LightboxMessage />
      <LightboxOptions />
      <LightboxProduct />
    </>
  );
};

export default ModalContainer;
