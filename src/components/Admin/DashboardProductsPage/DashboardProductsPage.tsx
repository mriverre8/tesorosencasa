'use client';

import React, { useState } from 'react';

// Icons
import { BiSearchAlt } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { MdAdd } from 'react-icons/md';

// Actions
import { deleteProducts } from '@/actions/deleteProducts';
import { deleteImages } from '@/actions/deleteImages';

// Components
import ProductCard from './ProductCard/ProductCard';

// Types
import { tesoros } from '@prisma/client';

//Hooks
import useLightboxOptions from '@/hooks/useLightboxOptions';
import useLoader from '@/hooks/useLoader';
import useCreateProductForm from '@/hooks/useCreateProductForm';
import { useRouter } from 'next/navigation';

// Translation
import { useTranslations } from 'next-intl';

interface Props {
  tesorosData: tesoros[];
}

export default function DashboardProductsPage({ tesorosData }: Props) {
  const translate = useTranslations();
  const router = useRouter();

  const lightboxLoader = useLoader();
  const lightboxOptions = useLightboxOptions();

  const formValues = useCreateProductForm();

  const [tesoros, setTesoros] = useState<tesoros[]>(tesorosData);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTesoros = tesoros.filter((tesoro) =>
    tesoro.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteAll = async () => {
    lightboxOptions.onClose();
    lightboxLoader.onOpen();
    const res = await deleteProducts();
    if (!res.error) {
      await deleteImages();
    }
    setTesoros([]);
    lightboxLoader.onClose();
  };

  const handleDeleteAllLightbox = () => {
    lightboxOptions.setContent(
      translate('DELETE_ALL_TREASURES_TITLE'),
      translate('DELETE_ALL_TREASURES_TEXT'),
      translate('GO_BACK'),
      translate('DELETE'),
      true,
      handleDeleteAll
    );
    lightboxOptions.onOpen();
  };

  const handleCreateProduct = () => {
    formValues.reset();
    formValues.setIsEditing(false);
    router.push('/createproduct');
  };

  return (
    <>
      <div className="flex flex-col mobile:h-screen h-[calc(100vh-69px)] p-5">
        <div className="flex justify-center items-center mb-5">
          <button
            onClick={() => handleCreateProduct()}
            className="flex bg-white rounded-lg py-2 px-2 mr-2 items-center justify-center text-secondary border border-gray-300"
          >
            <MdAdd className="text-xl" />
          </button>
          <div className="w-full relative ">
            <BiSearchAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
            <input
              className="w-full py-2 pl-10 pr-5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder={translate('SEARCH_TREASURES')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={tesoros.length === 0}
            />
          </div>
          <div hidden={tesoros.length === 0}>
            <RiDeleteBin5Line
              className="text-red-500 text-2xl ml-2"
              onClick={() => handleDeleteAllLightbox()}
            />
          </div>
        </div>
        <div className="flex-grow overflow-y-auto">
          <div className="flex flex-col gap-4">
            {filteredTesoros.map((tesoro, index) => (
              <div key={index}>
                <ProductCard
                  tesoro={tesoro}
                  tesoros={tesoros}
                  setTesoros={setTesoros}
                />
                {index !== tesoros.length - 1 && (
                  <div className="w-full border-b border-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
