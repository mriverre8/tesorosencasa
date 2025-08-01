import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

interface Props {
  type: string;
  text: string;
}

const Alert = ({ type, text }: Props) => {
  return (
    <div className="flex bg-white rounded-lg items-center gap-3 p-3 shadow-sm mt-5">
      <div className="flex-shrink-0 w-6 h-6 ">
        {type === 'I' && (
          <FaInfoCircle className="w-full h-full text-blue-500" />
        )}
        {type === 'W' && (
          <FaInfoCircle className="w-full h-full text-primary" />
        )}
        {type === 'E' && (
          <FaInfoCircle className="w-full h-full text-red-500" />
        )}
      </div>
      <p className="text-sm font-medium leading-tight">{text}</p>
    </div>
  );
};

export default Alert;
