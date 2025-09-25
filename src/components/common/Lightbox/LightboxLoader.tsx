import React from 'react';

// Translation
import { useTranslations } from 'next-intl';

// Icons
import { FaSpinner } from 'react-icons/fa';
import Lightbox from './Lightbox';

// Hooks
import useLoader from '@/hooks/useLoader';

const LightboxLoader = () => {
  const translate = useTranslations();

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
