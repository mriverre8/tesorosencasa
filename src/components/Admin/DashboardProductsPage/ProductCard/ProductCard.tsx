'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

//Hooks
import useLightboxProduct from '@/hooks/useLightboxProduct';
import useLightboxOptions from '@/hooks/useLightboxOptions';
import useLoader from '@/hooks/useLoader';
import useLightboxMessage from '@/hooks/useLightboxMessage';
import useCreateProductForm from '@/hooks/useCreateProductForm';
import { useTranslations } from 'next-intl';
import { useClickOutside } from '@/hooks/useClickOutside';

// Types
import { tesoros } from '@prisma/client';
// Icons
import { GiHamburgerMenu } from 'react-icons/gi';
import { CldImage } from 'next-cloudinary';

// Actions
import { deleteProductById } from '@/actions/deleteProductById';

interface Props {
  tesoro: tesoros;
  tesoros: tesoros[];
  setTesoros: React.Dispatch<React.SetStateAction<tesoros[]>>;
}

const ProductCard = ({ tesoro, tesoros, setTesoros }: Props) => {
  const translate = useTranslations();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const lightboxProduct = useLightboxProduct();
  const lightboxOptions = useLightboxOptions();
  const lightboxLoader = useLoader();
  const lightboxMessage = useLightboxMessage();

  const editForm = useCreateProductForm();

  const handleDelete = async () => {
    lightboxOptions.onClose();
    lightboxLoader.onOpen();
    const response = await deleteProductById(tesoro.id);
    if (!response.error) {
      lightboxMessage.setContent(
        translate('DELETE_TREASAURE_OK_TITLE'),
        translate('DELETE_TREASAURE_OK_TEXT', {
          name: tesoro.name,
        }),
        translate('ACCEPT')
      );
      setTesoros(tesoros.filter((t) => t.id !== tesoro.id));
      lightboxLoader.onClose();
      lightboxMessage.onOpen();
    } else {
      lightboxMessage.setContent(
        translate('DELETE_TREASAURE_KO_TITLE'),
        translate('DELETE_TREASAURE_KO_TEXT'),
        translate('ACCEPT')
      );
      lightboxLoader.onClose();
      lightboxMessage.onOpen();
    }
    lightboxLoader.onClose();
  };

  const handleDeleteLightbox = () => {
    lightboxOptions.setContent(
      translate('DELETE_TREASURE_TITLE'),
      translate('DELETE_TREASURE_TEXT', { name: tesoro.name }),
      translate('CANCEL'),
      translate('DELETE'),
      true,
      handleDelete
    );
    lightboxProduct.onClose();
    lightboxOptions.onOpen();
  };

  const handlePreview = (tesoro: tesoros) => {
    lightboxProduct.setContent(tesoro);
    lightboxProduct.onOpen();
  };

  const handleEditProduct = () => {
    editForm.setIsEditing(true);
    editForm.setProductId(tesoro.id);
    editForm.setEditingValues(
      tesoro.name,
      tesoro.condition,
      tesoro.origin || '',
      tesoro.brand || '',
      tesoro.material,
      tesoro.category || '',
      tesoro.large ? tesoro.large.toString() : '',
      tesoro.width ? tesoro.width.toString() : '',
      tesoro.height ? tesoro.height.toString() : '',
      tesoro.diameter ? tesoro.diameter.toString() : '',
      tesoro.units.toString(),
      tesoro.price.toString()
    );
    router.push('/createproduct');
  };

  useClickOutside(dropdownRef, open, setOpen);

  return (
    <div className="relative flex items-center mb-4 mt-2">
      <div
        className="flex items-center flex-1"
        onClick={() => handlePreview(tesoro)}
      >
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 mr-3 relative">
          <CldImage
            src={tesoro.images[0]}
            alt={tesoro.name}
            width={96}
            height={96}
            className="object-cover w-full h-full"
            loading="lazy"
            quality="auto"
            format="auto"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-semibold line-clamp-1">{tesoro.name}</h3>
          <p className="text-xs text-gray-500 line-clamp-1">{tesoro.brand}</p>
        </div>
      </div>

      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className={`px-4  transition ${open ? 'text-primary' : ''}`}
        >
          <GiHamburgerMenu className="text-lg" />
        </button>

        {open && (
          <div className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 w-32 bg-white border border-gray-200 rounded-lg shadow-sm z-50">
            <button
              onClick={() => {
                setOpen(false);
                handleEditProduct();
              }}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              {translate('EDIT')}
            </button>
            <button
              onClick={() => {
                setOpen(false);
                handleDeleteLightbox();
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              {translate('DELETE')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
