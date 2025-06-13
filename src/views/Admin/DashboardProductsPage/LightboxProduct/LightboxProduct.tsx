'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// Components
import LightboxLoader from '../../../../components/Lightbox/LightboxLoader';
import LightboxOptions from '../../../../components/Lightbox/LightboxOptions';

// Actions
import { deleteProductById } from '@/actions/deleteProductById';

// Types
import { tesoros } from '@prisma/client';

// Translation
import { translate } from '@/locales/translate';
import ButtonPrimary from '@/components/ButtonPrimary';
import ButtonSecondary from '@/components/ButtonSecondary';
import Lightbox from '@/components/Lightbox/Lightbox';

interface Props {
  isLightboxOpen: boolean;
  onClose: () => void;
  setIsFinalMsgText: (value: string) => void;
  setIsFinalMsgTitle: (value: string) => void;
  tesoro: tesoros;
  onDelete: () => void;
  reopen: () => void;
  setTesoros: (value: tesoros[]) => void;
  tesoros: tesoros[];
}
const LightboxProduct = ({
  isLightboxOpen,
  onClose,
  setIsFinalMsgText,
  setIsFinalMsgTitle,
  tesoro,
  onDelete,
  reopen,
  setTesoros,
  tesoros,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteMsg, setIsDeleteMsg] = useState(false);

  const handleDelete = async () => {
    // Cierra el Lightbox de producto y abre el de confirmación
    onClose();
    setIsDeleteMsg(true);
  };

  const cancelDelete = () => {
    setIsDeleteMsg(false);
    setTimeout(() => {
      reopen(); // 👈 Reabre el de producto
    }, 10);
  };

  const deleteProduct = async () => {
    setIsDeleteMsg(false);
    setIsLoading(true);
    const response = await deleteProductById(tesoro.id);
    if (response.success) {
      setIsFinalMsgTitle('¡Tesoro eliminado!');
      setIsFinalMsgText(
        `El tesoro "${tesoro.name}" ha sido eliminado correctamente.`
      );

      setTesoros(tesoros.filter((t) => t.id !== tesoro.id));
      setIsLoading(false);
    } else {
      setIsFinalMsgTitle('Error al eliminar el tesoro');
      setIsFinalMsgText(response.message || 'No se pudo eliminar el tesoro.');
      setIsLoading(false);
    }
    setIsLoading(false);
    onDelete();
  };

  return (
    <>
      <Lightbox isOpen={isLightboxOpen}>
        <h1 className="text-2xl font-bold">{tesoro.name}</h1>
        <div className="flex flex-col gap-3 h-[400px] overflow-y-auto mt-3">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <p className="text-xs text-gray-400">
                {translate('TREASSAURE_CONDITION')}
              </p>
              <p className="text-sm">{tesoro.condition}</p>
            </div>
          </div>
          <h2 className="font-semibold">{translate('TREASAURE_BACKGROUND')}</h2>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <p className="text-xs text-gray-400">
                {translate('TREASAURE_ORIGIN')}
              </p>
              <p className="text-sm">
                {tesoro.origin ? tesoro.origin : translate('UNKNOWN')}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-gray-400">
                {translate('TREASAURE_BRAND')}
              </p>
              <p className="text-sm ">
                {tesoro.brand ? tesoro.brand : translate('UNKNOWN')}
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
                {tesoro.material ? (
                  <p>{Object.values(tesoro.material).join(' - ')}</p>
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
                {tesoro.category ? tesoro.category : translate('UNKNOWN')}
              </p>
            </div>
          </div>
          {(tesoro.large ||
            tesoro.width ||
            tesoro.height ||
            tesoro.diameter) && (
            <>
              <h2 className="font-semibold">
                {translate('TREASAURE_DIMENSIONS')}
              </h2>
              <div className="flex flex-row gap-5">
                {tesoro.large && (
                  <div className="flex flex-col justify-center items-center text-center">
                    <p className="text-xs text-gray-400">
                      {translate('LARGE')}
                    </p>
                    <p className="text-sm">{tesoro.large} cm</p>
                  </div>
                )}
                {tesoro.width && (
                  <div className="flex flex-col justify-center items-center text-center">
                    <p className="text-xs text-gray-400">
                      {translate('WIDTH')}
                    </p>
                    <p className="text-sm">{tesoro.width} cm</p>
                  </div>
                )}
                {tesoro.height && (
                  <div className="flex flex-col justify-center items-center text-center">
                    <p className="text-xs text-gray-400">
                      {translate('HEIGHT')}
                    </p>
                    <p className="text-sm">{tesoro.height} cm</p>
                  </div>
                )}
                {tesoro.diameter && (
                  <div className="flex flex-col justify-center items-center text-center">
                    <p className="text-xs text-gray-400">
                      {translate('DIAMETER')}
                    </p>
                    <p className="text-sm">{tesoro.diameter} cm</p>
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
              <p className="text-sm">{tesoro.units}</p>
            </div>
            <div className="flex flex-col justify-center items-center text-center">
              <p className="text-xs text-gray-400">
                {translate('TREASAURE_PRICE')}{' '}
                {translate('TREASAURE_PRICE_X_UNITS')}
              </p>
              <p className="text-sm">{tesoro.price} €</p>
            </div>
          </div>
          <h2 className="font-semibold">
            {translate('TREASAURE_MULTIMEDIA_1')}
          </h2>
          <div className="pb-2">
            <div className="flex gap-2 w-full overflow-x-auto">
              {tesoro.images.map((image, index) => (
                <div
                  key={index}
                  className="inline-block w-24 h-24 relative overflow-hidden rounded-lg bg-gray-200 shrink-0"
                >
                  <Image
                    src={image}
                    alt={`Preview ${index}`}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-center items-center text-sm mt-3">
          <ButtonSecondary
            buttonAction={onClose}
            buttonText={translate('GO_BACK')}
          />
          <ButtonPrimary
            alternative={true}
            buttonAction={handleDelete}
            buttonText={translate('DELETE')}
          />
        </div>
      </Lightbox>
      <LightboxLoader isLightboxOpen={isLoading} />
      <LightboxOptions
        isLightboxOpen={isDeleteMsg}
        onClose={cancelDelete} // 👈 Aquí lo usamos correctamente
        onAccept={deleteProduct}
        title={translate('DELETE_TREASURE_TITLE')}
        text={translate('DELETE_TREASURE_TEXT', { name: tesoro.name })}
        buttonText={translate('GO_BACK')}
        buttonText2={translate('DELETE')}
      />
    </>
  );
};

export default LightboxProduct;
