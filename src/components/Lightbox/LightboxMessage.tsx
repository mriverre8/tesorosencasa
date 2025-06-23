import React from 'react';
import ButtonPrimary from '../ButtonPrimary';
import Lightbox from './Lightbox';

interface Props {
  isLightboxOpen: boolean;
  onClose: () => void;
  title: string;
  text: string;
  buttonText: string;
}
const LightboxMessage = ({
  isLightboxOpen,
  onClose,
  title,
  text,
  buttonText,
}: Props) => {
  return (
    <Lightbox isOpen={isLightboxOpen}>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-lg font-bold">{title}</h1>
        <p className="text-sm mb-5">{text}</p>
        <div className="text-sm">
          <ButtonPrimary buttonText={buttonText} buttonAction={onClose} />
        </div>
      </div>
    </Lightbox>
  );
};

export default LightboxMessage;
