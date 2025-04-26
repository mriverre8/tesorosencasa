import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

interface Props {
  text: string;
}

const Alert = ({ text }: Props) => {
  return (
    <div className="flex bg-white rounded-lg items-center gap-3 p-3 shadow-sm">
      <div className="flex-shrink-0 w-6 h-6 text-blue-500">
        <FaInfoCircle className="w-full h-full" />
      </div>
      <p className="text-sm font-medium leading-tight">{text}</p>
    </div>
  );
};

export default Alert;
