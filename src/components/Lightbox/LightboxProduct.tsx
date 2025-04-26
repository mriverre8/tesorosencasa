'use client';

import { Tesoro } from '@/types/tesoro';
import Image from 'next/image';
import React, { useState } from 'react';
import LightboxLoader from './LightboxLoader';
import LightboxOptions from './LightboxOptions';
import { deleteProductById } from '@/actions/deleteProductById';

interface Props {
  isLightboxOpen: boolean;
  onClose: () => void;
  tesoro: Tesoro;
  onDelete: () => void;
}
const LightboxProduct = ({
  isLightboxOpen,
  onClose,
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
    await deleteProductById(tesoro.id);
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
            <h2 className="font-semibold">Procedencia</h2>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <p className="text-xs text-gray-400">Origen</p>
                <p className="text-sm">
                  {tesoro.origin ? tesoro.origin : 'Desconocido'}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-xs text-gray-400">Marca</p>
                <p className="text-sm ">
                  {tesoro.brand ? tesoro.brand : 'Desconocido'}
                </p>
              </div>
            </div>
            <h2 className="font-semibold">Fabricación</h2>
            <div className="flex flex-row gap-5">
              <div className="flex flex-col">
                <p className="text-xs text-gray-400">Material</p>
                <p className="text-sm">
                  {tesoro.material ? tesoro.material : 'Desconocido'}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-xs text-gray-400">Tipo</p>
                <p className="text-sm">
                  {tesoro.type ? tesoro.type : 'Desconocido'}
                </p>
              </div>
            </div>
            {(tesoro.large ||
              tesoro.width ||
              tesoro.height ||
              tesoro.diameter) && (
              <>
                <h2 className="font-semibold">Dimensiones</h2>
                <div className="flex flex-row gap-5">
                  {tesoro.large && (
                    <div className="flex flex-col justify-center items-center text-center">
                      <p className="text-xs text-gray-400">Large</p>
                      <p className="text-sm">{tesoro.large} cm</p>
                    </div>
                  )}
                  {tesoro.width && (
                    <div className="flex flex-col justify-center items-center text-center">
                      <p className="text-xs text-gray-400">Width</p>
                      <p className="text-sm">{tesoro.width} cm</p>
                    </div>
                  )}
                  {tesoro.height && (
                    <div className="flex flex-col justify-center items-center text-center">
                      <p className="text-xs text-gray-400">Height</p>
                      <p className="text-sm">{tesoro.height} cm</p>
                    </div>
                  )}
                  {tesoro.diameter && (
                    <div className="flex flex-col justify-center items-center text-center">
                      <p className="text-xs text-gray-400">Diameter</p>
                      <p className="text-sm">{tesoro.diameter} cm</p>
                    </div>
                  )}
                </div>
              </>
            )}

            <h2 className="font-semibold">Stock</h2>
            <div className="flex flex-row gap-5">
              <div className="flex flex-col justify-center items-center text-center">
                <p className="text-xs text-gray-400">Units</p>
                <p className="text-sm">{tesoro.units}</p>
              </div>
              <div className="flex flex-col justify-center items-center text-center">
                <p className="text-xs text-gray-400">Price</p>
                <p className="text-sm">{tesoro.price} €</p>
              </div>
            </div>
            <h2 className="font-semibold">Imágenes</h2>
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
            <div className="flex gap-3 justify-between items-center">
              <button
                className="border rounded-full py-0.5 px-4"
                onClick={onClose}
              >
                Volver
              </button>
              {/* <button className="bg-green-600 text-white rounded-full py-0.5 px-4">
                Editar
              </button> */}
              <button
                className="bg-red-600 text-white rounded-full py-0.5 px-4"
                onClick={() => handleDelete()}
              >
                Eliminar
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
        title="Eliminar tesoro"
        text={`¿Estás seguro de que deseas eliminar el tesoro "${tesoro.name}"? Esta acción no se puede deshacer.`}
        buttonText="Volver"
        buttonText2="Eliminar"
      />
    </>
  );
};

export default LightboxProduct;
