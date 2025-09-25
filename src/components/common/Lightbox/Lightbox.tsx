import React, { useEffect, useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const Lightbox = ({ isOpen, onClose, children }: Props) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 h-screen w-screen overflow-hidden px-5 bg-black/70 transition-opacity duration-300 ease-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
    >
      <div className="flex items-start justify-center h-full w-full pt-20">
        <div
          className={`w-full max-w-md bg-white p-6 rounded-lg shadow-xl transform transition-all duration-300 ease-out 
            ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
