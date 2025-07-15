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
  const baseClasses =
    'text-white px-4 py-0.5 rounded-full transition duration-300 whitespace-nowrap';

  const enabledClasses = alternative
    ? 'bg-red-600 hover:bg-red-500'
    : 'bg-secondary hover:bg-secondary-hover';

  const disabledClasses = 'bg-gray-400 cursor-not-allowed';

  return (
    <button
      onClick={buttonAction}
      className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses}`}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};

export default ButtonPrimary;
