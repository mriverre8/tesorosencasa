'use client';

import React, { useState } from 'react';

// Icons
import { BiSearchAlt } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { IoAdd } from 'react-icons/io5';

// Actions
import { deleteProducts } from '@/actions/deleteProducts';

// Components
import ProductCard from './ProductCard/ProductCard';
import LightboxProduct from '@/views/Admin/DashboardProductsPage/LightboxProduct/LightboxProduct';
import LightboxMessage from '@/components/Lightbox/LightboxMessage';
import LightboxOptions from '@/components/Lightbox/LightboxOptions';
import LightboxLoader from '@/components/Lightbox/LightboxLoader';

// Types
import { tesoros } from '@prisma/client';

// Translation
import { translate } from '@/locales/translate';
import Link from 'next/link';
import { deleteImages } from '@/actions/deleteImages';

interface Props {
  tesorosData: tesoros[];
}

export default function DashboardProductsPage({ tesorosData }: Props) {
  const [tesoros, setTesoros] = useState<tesoros[]>(tesorosData);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<tesoros | null>(null);
  const [isProductLightboxOpen, setIsProductLightboxOpen] = useState(false);
  const [isFinalMsg, setIsFinalMsg] = useState(false);
  const [isFinalMsgTitle, setIsFinalMsgTitle] = useState('');
  const [isFinalMsgText, setIsFinalMsgText] = useState('');
  const [isDeleteAllOpen, setIsDeleteAllOpen] = useState(false);

  const filteredTesoros = tesoros.filter((tesoro) =>
    tesoro.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePreview = (tesoro: tesoros) => {
    setSelectedProduct(tesoro);
    setIsProductLightboxOpen(true);
  };
  const handleDeleteAll = async () => {
    setIsDeleteAllOpen(false);
    setIsLoading(true);
    await deleteProducts();
    await deleteImages();
    setIsLoading(false);
    setTesoros([]);
  };

  const reopenProductLightbox = () => {
    setIsProductLightboxOpen(true);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen p-5">
        <div className="flex justify-center items-center mb-5">
          <div className="w-full relative ">
            {/* Icono dentro del input */}
            <BiSearchAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
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
              onClick={() => setIsDeleteAllOpen(true)}
            />
          </div>
        </div>
        {/* Contenedor de los tesoros filtrados que ocupa el espacio restante */}
        <div className="flex-grow ">
          <div className="flex flex-col gap-4">
            {filteredTesoros.map((tesoro, index) => (
              <div key={index} onClick={() => handlePreview(tesoro)}>
                <ProductCard {...tesoro} />
              </div>
            ))}
          </div>

          <Link
            href={'/createproduct'}
            className={`flex bg-white rounded-lg py-4 px-3 w-full ${filteredTesoros.length > 0 ? 'mt-4' : ''} items-center justify-center text-secondary`}
          >
            <IoAdd className="text-xl" />
          </Link>
        </div>
      </div>
      {selectedProduct && (
        <LightboxProduct
          isLightboxOpen={isProductLightboxOpen}
          onClose={() => setIsProductLightboxOpen(false)}
          setIsFinalMsgTitle={setIsFinalMsgTitle}
          setIsFinalMsgText={setIsFinalMsgText}
          tesoro={selectedProduct}
          onDelete={() => {
            setIsFinalMsg(true);
          }}
          reopen={reopenProductLightbox}
          setTesoros={setTesoros}
          tesoros={tesoros}
        />
      )}
      <LightboxMessage
        isLightboxOpen={isFinalMsg}
        onClose={() => setIsFinalMsg(false)}
        title={isFinalMsgTitle}
        text={isFinalMsgText}
        buttonText={translate('GO_BACK')}
      />
      <LightboxOptions
        isLightboxOpen={isDeleteAllOpen}
        onClose={() => setIsDeleteAllOpen(false)}
        onAccept={() => handleDeleteAll()}
        title={translate('DELETE_ALL_TREASURES_TITLE')}
        text={translate('DELETE_ALL_TREASURES_TEXT')}
        buttonText={translate('GO_BACK')}
        buttonText2={translate('DELETE')}
      />
      <LightboxLoader isLightboxOpen={isLoading} />
    </>
  );
}
