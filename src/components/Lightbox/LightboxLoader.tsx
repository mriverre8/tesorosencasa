import React from 'react';

// Translation
import { translate } from '@/locales/translate';

// Icons
import { FaSpinner } from 'react-icons/fa';
import Lightbox from './Lightbox';

// Hooks
import useLoader from '@/hooks/useLoader';

const LightboxLoader = () => {
  const lightboxLoader = useLoader();
  return (
    <Lightbox isOpen={lightboxLoader.isOpen} onClose={lightboxLoader.onClose}>
      <div className="flex flex-col text-center items-center gap-3">
        <FaSpinner className="animate-spin text-2xl text-secondary" />
        <p>{translate('LOADING')}</p>
      </div>
    </Lightbox>
  );
};

export default LightboxLoader;
