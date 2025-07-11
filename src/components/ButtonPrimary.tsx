import React from 'react';

interface Props {
  disabled?: boolean;
  alternative?: boolean;
  buttonText: string;
  buttonAction: () => void;
}

const ButtonPrimary = ({
  disabled = false,
  alternative = false,
  buttonText,
  buttonAction,
}: Props) => {
  return (
    <button
      onClick={buttonAction}
      className={`${alternative ? 'bg-red-600 hover:bg-red-500' : 'bg-secondary hover:bg-secondary-hover'} text-white px-4 py-0.5 rounded-full transition duration-300 whitespace-nowrap`}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};

export default ButtonPrimary;
