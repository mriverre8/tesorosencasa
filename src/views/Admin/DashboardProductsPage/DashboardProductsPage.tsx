'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Icons
import { BiSearchAlt } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { IoAdd } from 'react-icons/io5';

// Actions
import { deleteProducts } from '@/actions/deleteProducts';
import { deleteImages } from '@/actions/deleteImages';

// Components
import ProductCard from './ProductCard/ProductCard';
import LightboxProduct from '@/views/Admin/DashboardProductsPage/LightboxProduct/LightboxProduct';

// Types
import { tesoros } from '@prisma/client';

//Hooks
import useLightboxOptions from '@/hooks/useLightboxOptions';
import useLoader from '@/hooks/useLoader';
import useLightboxProduct from '@/hooks/useLightboxProduct';

// Translation
import { useTranslations } from 'next-intl';

interface Props {
  tesorosData: tesoros[];
}

export default function DashboardProductsPage({ tesorosData }: Props) {
  const translate = useTranslations();

  const lightboxLoader = useLoader();
  const lightboxOptions = useLightboxOptions();
  const lightboxProduct = useLightboxProduct();

  const [tesoros, setTesoros] = useState<tesoros[]>(tesorosData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<tesoros | null>(null);

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
      handleDeleteAll
    );
    lightboxOptions.onOpen();
  };

  const handlePreview = (tesoro: tesoros) => {
    setSelectedProduct(tesoro);
    lightboxProduct.setContent(tesoro, () => {});
    lightboxProduct.onOpen();
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
              onClick={() => handleDeleteAllLightbox()}
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
        <LightboxProduct tesoros={tesoros} setTesoros={setTesoros} />
      )}
    </>
  );
}
