import React from 'react';
import ButtonPrimary from '../ButtonPrimary';

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
  if (!isLightboxOpen) return null;

  return (
    <div className="bg-black/70 fixed inset-0 z-50 h-screen w-screen overflow-hidden px-5">
      <div className="flex items-center justify-center h-full w-full">
        <div className="flex flex-col justify-center items-center gap-2 bg-white px-10 py-5 rounded-md text-center">
          <h1 className="text-lg font-bold">{title}</h1>
          <p className="text-sm mb-5">{text}</p>
          <div className="text-sm">
            <ButtonPrimary buttonText={buttonText} buttonAction={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightboxMessage;
