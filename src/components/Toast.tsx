import React, { useEffect, useState } from 'react';
import useToast from '@/hooks/useToast';
import { IoMdClose } from 'react-icons/io';

const Toast = () => {
  const toast = useToast();

  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;

    if (toast.isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);

      setProgress(100);
      const start = Date.now();
      const duration = 5000;

      const updateProgress = () => {
        const elapsed = Date.now() - start;
        const newProgress = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(newProgress);
        if (newProgress > 0) {
          progressTimer = setTimeout(updateProgress, 16);
        }
      };
      updateProgress();

      timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setShouldRender(false);
          toast.onClose();
        }, 300);
      }, duration);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 300);
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(progressTimer);
    };
  }, [toast.isOpen, toast.onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShouldRender(false);
      toast.onClose();
    }, 300);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 transition-all duration-300 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
    >
      <div
        className={`relative w-full bg-white p-4 rounded-lg shadow-lg border border-gray-200 
          transition-all duration-300 ease-out`}
      >
        <div className="flex justify-between">
          <p className="text-sm text-gray-800">
            {toast.text || 'Este es un Toast que se cierra en 5s'}
          </p>
          <IoMdClose
            onClick={handleClose}
            className="text-lg text-gray-500 hover:text-red-500 font-bold cursor-pointer"
          />
        </div>
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-200 rounded-b overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-100 linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Toast;
