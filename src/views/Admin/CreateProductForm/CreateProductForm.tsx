'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Hooks
import { useForm } from '@/hooks/useForm';

// Actions
import { newProduct } from '@/actions/newproduct';

// Utils
import { acceptOnlyNumbers } from '@/utils/utilsForm';

// Components
import LightboxLoader from '@/components/Lightbox/LightboxLoader';
import LightboxMessage from '@/components/Lightbox/LightboxMessage';
import InputImageFiles from '@/views/Admin/CreateProductForm/InputImageFiles/InputImageFiles';
import InputCountries from '@/views/Admin/CreateProductForm/InputCountries/InputCountries';
import InputCondition from '@/views/Admin/CreateProductForm/InputCondition/InputCondition';

//Translation
import { translate } from '@/locales/translate';
import { trackEvent } from '@/actions/trackEvent';
import { uploadImage } from '@/actions/uploadImage';
import InputMaterial from './InputMaterial/InputMaterial';

export default function CreateProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFinalMsg, setIsFinalMsg] = useState(false);
  const [isFinalMsgTitle, setIsFinalMsgTitle] = useState('');
  const [isFinalMsgText, setIsFinalMsgText] = useState('');

  const router = useRouter();
  const [onCloseCallback, setOnCloseCallback] = useState<() => void>(
    () => () => setIsFinalMsg(false)
  );

  const initialForm = {
    name: { value: '', error: '', required: true },
    condition: { value: translate('CONDITION_6'), error: '', required: true },
    // Sección de procedencia
    origin: { value: '', error: '', required: false },
    brand: { value: '', error: '', required: false },
    // Sección de fabricación
    category: { value: '', error: '', required: false },
    // Sección de dimensiones
    large: { value: '', error: '', required: false },
    width: { value: '', error: '', required: false },
    height: { value: '', error: '', required: false },
    diameter: { value: '', error: '', required: false },
    // Sección de stock
    units: { value: '', error: '', required: true },
    price: { value: '', error: '', required: true },
  };

  // Campo de materiales
  const [materials, setMaterials] = useState<string[]>([]);

  //Campo de imágenes
  const [images, setImages] = useState<File[]>([]);

  //Inicialización del formulario
  const { formValues, formIsValid, updateForm, clearForm, validateAll } =
    useForm(initialForm);

  //Función para enviar el formulario
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await trackEvent('submit_treasaure', 'Click on create treasaure');

    validateAll(); // Validar todos los campos del formulario

    //Valores del formulario
    const formData = new FormData(event.target as HTMLFormElement);

    if (formIsValid && images.length > 0) {
      setIsLoading(true);

      const uploadedImages: string[] = [];

      try {
        images.map(async (image) => {
          const imagePublicUrl = await uploadImage(image);
          uploadedImages.push(imagePublicUrl);
        });
      } catch (error) {
        setIsFinalMsgTitle(translate('ERROR'));
        setIsFinalMsgText(
          (error as Error).message || 'Error al crear el tesoro'
        );
        setIsLoading(false);
        return;
      }

      const response = await newProduct(formData, materials, uploadedImages);
      if (response.success) {
        setIsFinalMsgTitle(translate('SUCCESS_TREASAURE_CREATION_TITLE'));
        setIsFinalMsgText(translate('SUCCESS_TREASAURE_CREATION_TEXT'));
        clearForm(); // Limpiar el formulario después de enviar
        setImages([]); // Limpiar las imágenes después de enviar
        setMaterials([]); // Limpiar los materiales después de enviar
        setIsLoading(false);
        setIsFinalMsg(true); // Mostrar el mensaje de éxito
        setOnCloseCallback(() => () => router.push('/products'));
        return;
      } else {
        setIsFinalMsgTitle(translate('ERROR'));
        setIsFinalMsgText(response.message || 'Error al crear el tesoro');
        setOnCloseCallback(() => () => setIsFinalMsg(false));
        setIsLoading(false);
        setIsFinalMsg(true); // Mostrar el mensaje de error
        return;
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="p-5">
        <h1 className="text-3xl font-semibold mb-6  text-gray-700">
          {translate('NEW_TREASAURE')}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <div>
              <label htmlFor="name" className="px-0.5 text-sm">
                {translate('TREASAURE_NAME')}*
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formValues.name.value}
                maxLength={30}
                onChange={(e) => updateForm('name', e.target.value)}
                className={`border rounded-full px-4 py-2 w-full focus:ring-2  outline-none ${!formIsValid && !!formValues.name.error ? 'border-red-400 focus:ring-red-500' : 'focus:ring-primary'}`}
              />
              {!formIsValid && !!formValues.name.error && (
                <p className="text-xs pt-1 text-red-600 px-0.5">
                  {translate(formValues.name.error)}
                </p>
              )}
            </div>
            <div>
              <InputCondition
                value={formValues.condition.value}
                updateForm={updateForm}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl border-b text-gray-700">
              {translate('TREASAURE_BACKGROUND')}
            </h2>
            <div className="grid grid-cols-1 gap-2">
              <InputCountries
                value={formValues.origin.value}
                updateForm={updateForm}
              />
              <div>
                <label htmlFor="brand" className="px-0.5 text-sm">
                  {translate('TREASAURE_BRAND')}
                </label>
                <input
                  id="brand"
                  name="brand"
                  value={formValues.brand.value}
                  maxLength={30}
                  onChange={(e) => updateForm('brand', e.target.value)}
                  type="text"
                  placeholder={translate('UNKNOWN')}
                  className={`border  rounded-full px-4 py-2 w-full focus:ring-2 outline-none ${!formIsValid && !!formValues.brand.error ? 'border-red-400 focus:ring-red-500' : 'focus:ring-primary'}`}
                />
                {!formIsValid && !!formValues.brand.error && (
                  <p className="text-xs pt-1 text-red-600 px-0.5 ">
                    {translate(formValues.brand.error)}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl border-b text-gray-700">
              {translate('TREASAURE_FABRICATION')}
            </h2>
            <div className="grid grid-cols-1 gap-2">
              <InputMaterial
                materials={materials}
                setMaterials={setMaterials}
              />
              <div>
                <label htmlFor="type" className="px-0.5 text-sm">
                  {translate('TREASAURE_CATEGORY')}
                </label>
                <input
                  id="category"
                  name="category"
                  value={formValues.category.value}
                  maxLength={30}
                  onChange={(e) => updateForm('category', e.target.value)}
                  type="text"
                  placeholder={translate('OTHER')}
                  className={`border  rounded-full px-4 py-2 w-full focus:ring-2 outline-none ${!formIsValid && !!formValues.category.error ? 'border-red-400 focus:ring-red-500' : 'focus:ring-primary'}`}
                />
                {!formIsValid && !!formValues.category.error && (
                  <p className="px-0.5 text-xs pt-1 text-red-600 ">
                    {translate(formValues.category.error)}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl border-b text-gray-700">
              {translate('TREASAURE_DIMENSIONS')}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="large" className="px-0.5 text-sm">
                  {translate('LARGE')}
                </label>
                <div className="relative">
                  <input
                    id="large"
                    name="large"
                    value={formValues.large.value}
                    onChange={(e) =>
                      acceptOnlyNumbers(e, 'large', updateForm, true)
                    }
                    inputMode="numeric"
                    maxLength={3}
                    type="text"
                    className="border  rounded-full pl-4 pr-12 py-2 w-full focus:ring-2 focus:ring-primary outline-none"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 ">
                    cm
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="width" className="px-0.5 text-sm">
                  {translate('WIDTH')}
                </label>
                <div className="relative">
                  <input
                    id="width"
                    name="width"
                    value={formValues.width.value}
                    onChange={(e) =>
                      acceptOnlyNumbers(e, 'width', updateForm, true)
                    }
                    inputMode="numeric"
                    maxLength={3}
                    type="text"
                    className="border  rounded-full pl-4 pr-12 py-2 w-full focus:ring-2 focus:ring-primary outline-none"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 ">
                    cm
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="height" className="px-0.5 text-sm">
                  {translate('HEIGHT')}
                </label>
                <div className="relative">
                  <input
                    id="height"
                    name="height"
                    value={formValues.height.value}
                    onChange={(e) =>
                      acceptOnlyNumbers(e, 'height', updateForm, true)
                    }
                    inputMode="numeric"
                    maxLength={3}
                    type="text"
                    className="border  rounded-full pl-4 pr-12 py-2 w-full focus:ring-2 focus:ring-primary outline-none"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 ">
                    cm
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="diameter" className="px-0.5 text-sm">
                  {translate('DIAMETER')}
                </label>
                <div className="relative">
                  <input
                    id="diameter"
                    name="diameter"
                    value={formValues.diameter.value}
                    onChange={(e) =>
                      acceptOnlyNumbers(e, 'diameter', updateForm, true)
                    }
                    inputMode="numeric"
                    maxLength={3}
                    type="text"
                    className="border  rounded-full pl-4 pr-12 py-2 w-full focus:ring-2 focus:ring-primary outline-none"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 ">
                    cm
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl border-b text-gray-700">
              {translate('TREASAURE_STOCK')}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              <div>
                <label
                  htmlFor="units"
                  className="px-0.5 text-sm whitespace-nowrap"
                >
                  {translate('TREASAURE_AVAILABLE_UNITS')}*
                </label>
                <input
                  id="units"
                  name="units"
                  value={formValues.units.value}
                  onChange={(e) =>
                    acceptOnlyNumbers(e, 'units', updateForm, true)
                  }
                  maxLength={2}
                  inputMode="numeric"
                  type="text"
                  className={`border  rounded-full px-4 py-2 w-full focus:ring-2 outline-none ${!formIsValid && !!formValues.units.error ? 'border-red-400 focus:ring-red-500' : 'focus:ring-primary'}`}
                />
                <p className="px-0.5 text-xs pt-1 text-red-600">
                  {!formIsValid && !!formValues.units.error
                    ? translate(formValues.units.error)
                    : '\u00A0'}
                </p>
              </div>
              <div>
                <label htmlFor="price" className="px-0.5 text-sm">
                  {translate('TREASAURE_PRICE')}*
                </label>
                <div className="relative">
                  <input
                    id="price"
                    name="price"
                    value={formValues.price.value}
                    onChange={(e) => acceptOnlyNumbers(e, 'price', updateForm)}
                    maxLength={7}
                    inputMode="decimal"
                    type="text"
                    className={`border  rounded-full pl-4 pr-8 py-2 w-full focus:ring-2 outline-none ${!formIsValid && !!formValues.price.error ? 'border-red-400 focus:ring-red-500' : 'focus:ring-primary'}`}
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 ">
                    €
                  </button>
                </div>

                <p className="px-0.5 text-xs pt-1 text-red-600">
                  {!formIsValid && !!formValues.price.error
                    ? translate(formValues.price.error)
                    : '\u00A0'}
                </p>
              </div>
            </div>
            <InputImageFiles images={images} setImages={setImages} />
          </div>

          <button
            type="submit"
            className="mt-6 bg-secondary text-white font-semibold py-2 rounded-full hover:bg-secondary-hover transition w-full"
          >
            {translate('SAVE_TREASURE')}
          </button>
        </form>
      </div>
      <LightboxLoader isLightboxOpen={isLoading} />
      <LightboxMessage
        isLightboxOpen={isFinalMsg}
        onClose={onCloseCallback}
        title={isFinalMsgTitle}
        text={isFinalMsgText}
        buttonText={translate('ACCEPT')}
      />
    </>
  );
}
