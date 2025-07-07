import React from 'react';
import ButtonPrimary from '../ButtonPrimary';
import Lightbox from './Lightbox';
import useLightboxMessage from '@/hooks/useLightboxMessage';

const LightboxMessage = () => {
  const lightboxMessage = useLightboxMessage();
  return (
    <Lightbox isOpen={lightboxMessage.isOpen}>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-lg font-bold">{lightboxMessage.title}</h1>
        <p className="text-sm mb-5">{lightboxMessage.text}</p>
        <div className="text-sm">
          <ButtonPrimary
            buttonText={lightboxMessage.buttonText}
            buttonAction={lightboxMessage.onClose}
          />
        </div>
      </div>
    </Lightbox>
  );
};

export default LightboxMessage;
