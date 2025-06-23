import React from 'react';
import ButtonSecondary from '../ButtonSecondary';
import ButtonPrimary from '../ButtonPrimary';
import Lightbox from './Lightbox';

interface Props {
  isLightboxOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  title: string;
  text: string;
  buttonText: string;
  buttonText2: string;
}
const LightboxOptions = ({
  isLightboxOpen,
  onClose,
  onAccept,
  title,
  text,
  buttonText,
  buttonText2,
}: Props) => {
  return (
    <Lightbox isOpen={isLightboxOpen}>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-lg font-bold">{title}</h1>
        <p className="text-sm">{text}</p>
        <div className="flex flex-row gap-2 text-sm mt-5">
          <ButtonSecondary buttonText={buttonText} buttonAction={onClose} />
          <ButtonPrimary
            alternative={true}
            buttonText={buttonText2}
            buttonAction={onAccept}
          />
        </div>
      </div>
    </Lightbox>
  );
};

export default LightboxOptions;
