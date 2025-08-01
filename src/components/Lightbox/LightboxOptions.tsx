import React from 'react';
import ButtonSecondary from '../ButtonSecondary';
import ButtonPrimary from '../ButtonPrimary';
import Lightbox from './Lightbox';
import useLightboxOptions from '@/hooks/useLightboxOptions';

const LightboxOptions = () => {
  const lightboxOptions = useLightboxOptions();
  return (
    <Lightbox isOpen={lightboxOptions.isOpen}>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-lg font-bold">{lightboxOptions.title}</h1>
        <p className="text-sm">{lightboxOptions.text}</p>
        <div className="flex flex-row gap-2 text-sm mt-5">
          <ButtonSecondary
            buttonText={lightboxOptions.buttonText1}
            buttonAction={lightboxOptions.onClose}
          />
          <ButtonPrimary
            alternative={lightboxOptions.isAlternative}
            buttonText={lightboxOptions.buttonText2}
            buttonAction={lightboxOptions.onAccept}
          />
        </div>
      </div>
    </Lightbox>
  );
};

export default LightboxOptions;
