import React from 'react';
import ButtonSecondary from '../ButtonSecondary';
import ButtonPrimary from '../ButtonPrimary';

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
  if (!isLightboxOpen) return null;

  return (
    <div className="bg-black/70 fixed inset-0 z-50 h-screen w-screen overflow-hidden px-5">
      <div className="flex items-center justify-center h-full w-full">
        <div className="flex flex-col justify-center items-center gap-2 bg-white px-10 py-5 rounded-md text-center">
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
      </div>
    </div>
  );
};

export default LightboxOptions;
