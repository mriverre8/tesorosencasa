'use client';

import { Tesoro } from '@/types/tesoro';
import Image from 'next/image';
import React, { useState } from 'react';
import LightboxLoader from '../../../../components/Lightbox/LightboxLoader';
import LightboxOptions from '../../../../components/Lightbox/LightboxOptions';
import { deleteProductById } from '@/actions/deleteProductById';
import { translate } from '@/locales/translate';

interface Props {
  isLightboxOpen: boolean;
  onClose: () => void;
  setIsFinalMsgText: (value: string) => void;
  setIsFinalMsgTitle: (value: string) => void;
  tesoro: Tesoro;
  onDelete: () => void;
}
const LightboxProduct = ({
  isLightboxOpen,
  onClose,
  setIsFinalMsgText,
  setIsFinalMsgTitle,
  tesoro,
  onDelete,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteMsg, setIsDeleteMsg] = useState(false);

  const handleDelete = async () => {
    setIsDeleteMsg(true);
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
      setIsLoading(false);
    } else {
      setIsFinalMsgTitle('Error al eliminar el tesoro');
      setIsFinalMsgText(response.message || 'No se pudo eliminar el tesoro.');
      setIsLoading(false);
    }
    setIsLoading(false);
    onDelete();
  };

  if (!isLightboxOpen) return null;

  return (
    <>
      <div className="bg-black/50 fixed inset-0 z-50 h-screen w-screen overflow-hidden px-5">
        <div className="flex items-center justify-center h-full w-full">
          <div className="flex flex-col w-[calc(100vw-20px)] gap-3 bg-white px-10 py-5 rounded-md ">
            <h1 className="text-2xl font-bold">{tesoro.name}</h1>
            <h2 className="font-semibold">{translate('TREASAURE_STATE')}</h2>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <p className="text-xs text-gray-400">
                  {translate('TREASSAURE_CONDITION')}
                </p>
                <p className="text-sm">{tesoro.condition}</p>
              </div>
            </div>
            <h2 className="font-semibold">
              {translate('TREASAURE_BACKGROUND')}
            </h2>
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
            <div className="flex flex-row gap-5">
              <div className="flex flex-col">
                <p className="text-xs text-gray-400">
                  {translate('TREASAURE_MATERIAL')}
                </p>
                <p className="text-sm">
                  {tesoro.material ? tesoro.material : translate('UNKNOWN')}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-xs text-gray-400">
                  {translate('TREASAURE_CATEGORY')}
                </p>
                <p className="text-sm">
                  {tesoro.type ? tesoro.type : translate('UNKNOWN')}
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
                  {translate('TREASAURE_PRICE')}
                </p>
                <p className="text-sm">{tesoro.price} €</p>
              </div>
            </div>
            <h2 className="font-semibold">
              {translate('TREASAURE_MULTIMEDIA_1')}
            </h2>
            <div className="flex gap-2 overflow-x-auto whitespace-nowrap pb-2">
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
            <div className="flex gap-3 justify-center items-center text-sm">
              <button
                className="py-0.5 px-4 hover:text-primary"
                onClick={onClose}
              >
                {translate('GO_BACK')}
              </button>
              <button
                className="bg-red-600 text-white rounded-full py-0.5 px-4"
                onClick={() => handleDelete()}
              >
                {translate('DELETE')}
              </button>
            </div>
          </div>
        </div>
      </div>
      <LightboxLoader isLightboxOpen={isLoading} />
      <LightboxOptions
        isLightboxOpen={isDeleteMsg}
        onClose={() => setIsDeleteMsg(false)}
        onAccept={() => deleteProduct()}
        title={translate('DELETE_TREASURE_TITLE')}
        text={translate('DELETE_TREASURE_TEXT', { name: tesoro.name })}
        buttonText={translate('GO_BACK')}
        buttonText2={translate('DELETE')}
      />
    </>
  );
};

export default LightboxProduct;
