import React from 'react';

interface Props {
  buttonText: string;
  buttonAction: () => void;
}

const ButtonSecondary = ({ buttonText, buttonAction }: Props) => {
  return (
    <button
      className="py-0.5 px-4 hover:text-primary transition duration-300 underline underline-offset-2 whitespace-nowrap"
      onClick={buttonAction}
    >
      {buttonText}
    </button>
  );
};

export default ButtonSecondary;
