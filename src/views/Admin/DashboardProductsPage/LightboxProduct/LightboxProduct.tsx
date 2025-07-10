'use client';

import React, { useState } from 'react';
import { CldImage } from 'next-cloudinary';

// Components
import ButtonPrimary from '@/components/ButtonPrimary';
import ButtonSecondary from '@/components/ButtonSecondary';
import Lightbox from '@/components/Lightbox/Lightbox';

// Actions
import { deleteProductById } from '@/actions/deleteProductById';

// Types
import { tesoros } from '@prisma/client';

// Hooks
import useLightboxProduct from '@/hooks/useLightboxProduct';
import useLightboxOptions from '@/hooks/useLightboxOptions';
import useLoader from '@/hooks/useLoader';
import useLightboxMessage from '@/hooks/useLightboxMessage';

// Translation
import { useTranslations } from 'next-intl';

// Icons
import { IoMdShare } from 'react-icons/io';

interface Props {
  tesoros: tesoros[];
  setTesoros: (value: tesoros[]) => void;
}
const LightboxProduct = ({ tesoros, setTesoros }: Props) => {
  const translate = useTranslations();

  const lightboxProduct = useLightboxProduct();
  const lightboxOptions = useLightboxOptions();
  const lightboxLoader = useLoader();
  const lightboxMessage = useLightboxMessage();

  const [copiado, setCopiado] = useState(false);

  const handleDelete = async () => {
    lightboxOptions.onClose();
    lightboxLoader.onOpen();
    const response = await deleteProductById(lightboxProduct.product.id);
    if (!response.error) {
      lightboxMessage.setContent(
        translate('DELETE_TREASAURE_OK_TITLE'),
        translate('DELETE_TREASAURE_OK_TEXT', {
          name: lightboxProduct.product.name,
        }),
        translate('ACCEPT')
      );
      setTesoros(tesoros.filter((t) => t.id !== lightboxProduct.product.id));
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
      translate('DELETE_TREASURE_TEXT', { name: lightboxProduct.product.name }),
      translate('CANCEL'),
      translate('DELETE'),
      handleDelete
    );
    lightboxProduct.onClose();
    lightboxOptions.onOpen();
  };

  const handleShare = () => {
    const url = `https://tesorosencasa.vercel.app/tesoro/${lightboxProduct.product.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 10000);
    });
  };

  return (
    <Lightbox isOpen={lightboxProduct.isOpen}>
      <div className="flex">
        <h1 className="flex-[8] text-2xl font-bold">
          {lightboxProduct.product.name}
        </h1>
        <div className="flex-[2] flex justify-end self-start mt-1.5">
          <button onClick={handleShare}>
            <IoMdShare className="text-xl text-secondary hover:text-secondary-hover" />
          </button>
        </div>
      </div>

      <div className=" h-[400px] overflow-y-auto ">
        {copiado && (
          <div className="w-full">
            <span className="text-xs text-secondary ">
              {translate('LINK_COPIED')}
            </span>
          </div>
        )}
        <div className="mt-3 flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <p className="text-xs text-gray-400">
                {translate('TREASSAURE_CONDITION')}
              </p>
              <p className="text-sm">{lightboxProduct.product.condition}</p>
            </div>
          </div>
          <h2 className="font-semibold">{translate('TREASAURE_BACKGROUND')}</h2>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <p className="text-xs text-gray-400">
                {translate('TREASAURE_ORIGIN')}
              </p>
              <p className="text-sm">
                {lightboxProduct.product.origin
                  ? lightboxProduct.product.origin
                  : translate('UNKNOWN')}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-gray-400">
                {translate('TREASAURE_BRAND')}
              </p>
              <p className="text-sm ">
                {lightboxProduct.product.brand
                  ? lightboxProduct.product.brand
                  : translate('UNKNOWN')}
              </p>
            </div>
          </div>
          <h2 className="font-semibold">
            {translate('TREASAURE_FABRICATION')}
          </h2>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <p className="text-xs text-gray-400">
                {translate('TREASAURE_MATERIAL')}
              </p>
              <div className="text-sm">
                {lightboxProduct.product.material ? (
                  <p>
                    {Object.values(lightboxProduct.product.material).join(
                      ' - '
                    )}
                  </p>
                ) : (
                  translate('UNKNOWN')
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-gray-400">
                {translate('TREASAURE_CATEGORY')}
              </p>
              <p className="text-sm">
                {lightboxProduct.product.category
                  ? lightboxProduct.product.category
                  : translate('UNKNOWN')}
              </p>
            </div>
          </div>
          {(lightboxProduct.product.large ||
            lightboxProduct.product.width ||
            lightboxProduct.product.height ||
            lightboxProduct.product.diameter) && (
            <>
              <h2 className="font-semibold">
                {translate('TREASAURE_DIMENSIONS')}
              </h2>
              <div className="flex flex-row gap-5">
                {lightboxProduct.product.large && (
                  <div className="flex flex-col justify-center items-center text-center">
                    <p className="text-xs text-gray-400">
                      {translate('LARGE')}
                    </p>
                    <p className="text-sm">
                      {lightboxProduct.product.large} cm
                    </p>
                  </div>
                )}
                {lightboxProduct.product.width && (
                  <div className="flex flex-col justify-center items-center text-center">
                    <p className="text-xs text-gray-400">
                      {translate('WIDTH')}
                    </p>
                    <p className="text-sm">
                      {lightboxProduct.product.width} cm
                    </p>
                  </div>
                )}
                {lightboxProduct.product.height && (
                  <div className="flex flex-col justify-center items-center text-center">
                    <p className="text-xs text-gray-400">
                      {translate('HEIGHT')}
                    </p>
                    <p className="text-sm">
                      {lightboxProduct.product.height} cm
                    </p>
                  </div>
                )}
                {lightboxProduct.product.diameter && (
                  <div className="flex flex-col justify-center items-center text-center">
                    <p className="text-xs text-gray-400">
                      {translate('DIAMETER')}
                    </p>
                    <p className="text-sm">
                      {lightboxProduct.product.diameter} cm
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
          <h2 className="font-semibold">{translate('TREASAURE_STOCK')}</h2>
          <div className="flex flex-row gap-5">
            <div className="flex flex-col justify-center items-center text-center">
              <p className="text-xs text-gray-400">
                {translate('TREASAURE_UNITS')}
              </p>
              <p className="text-sm">{lightboxProduct.product.units}</p>
            </div>
            <div className="flex flex-col justify-center items-center text-center">
              <p className="text-xs text-gray-400">
                {translate('TREASAURE_PRICE')}{' '}
                {translate('TREASAURE_PRICE_X_UNITS')}
              </p>
              <p className="text-sm">{lightboxProduct.product.price} €</p>
            </div>
          </div>
          <h2 className="font-semibold">
            {translate('TREASAURE_MULTIMEDIA_1')}
          </h2>
          <div className="pb-2">
            <div className="flex gap-2 w-full overflow-x-auto">
              {lightboxProduct.product.images.map((image, index) => (
                <div
                  key={index}
                  className="inline-block w-24 h-24 relative overflow-hidden rounded-lg bg-gray-200 shrink-0"
                >
                  <CldImage
                    width="960"
                    height="600"
                    src={image}
                    sizes="100vw"
                    alt="Description of my image"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 justify-center items-center text-sm mt-3">
        <ButtonSecondary
          buttonAction={lightboxProduct.onClose}
          buttonText={translate('GO_BACK')}
        />
        <ButtonPrimary
          alternative={true}
          buttonAction={handleDeleteLightbox}
          buttonText={translate('DELETE')}
        />
      </div>
    </Lightbox>
  );
};

export default LightboxProduct;
