'use client';

import { newProduct } from '@/actions/newproduct';
import { useForm } from '@/hooks/useForm';

import { acceptOnlyNumbers } from '@/utils/utilsForm';

import { useState } from 'react';

import LightboxLoader from '@/components/Lightbox/LightboxLoader';
import LightboxMessage from '@/components/Lightbox/LightboxMessage';
import InputImageFiles from '@/components/Form/InputImageFiles';
import InputCountries from '@/components/Form/InputCountries';

// TODO: Reformatear las imagenes para que ocupen menos espacio y se suban más rápido ( también así habrá mas espacio en el servidor )
export default function CreateProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFinalMsg, setIsFinalMsg] = useState(false);

  const initialForm = {
    name: { value: '', error: '', required: true },
    // Sección de procedencia
    origin: { value: '', error: '', required: false },
    brand: { value: '', error: '', required: false },
    // Sección de fabricación
    material: { value: '', error: '', required: false },
    type: { value: '', error: '', required: false },
    // Sección de dimensiones
    large: { value: '', error: '', required: false },
    width: { value: '', error: '', required: false },
    height: { value: '', error: '', required: false },
    diameter: { value: '', error: '', required: false },
    // Sección de stock
    units: { value: '', error: '', required: true },
    price: { value: '', error: '', required: true },
  };

  //Campo de imágenes
  const [images, setImages] = useState<File[]>([]);

  //Inicialización del formulario
  const { formValues, formIsValid, updateForm, clearForm, validateAll } =
    useForm(initialForm);

  //Función para enviar el formulario
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateAll(); // Validar todos los campos del formulario

    //Valores del formulario
    const formData = new FormData(event.target as HTMLFormElement);

    if (formIsValid && images.length > 0) {
      setIsLoading(true);
      const response = await newProduct(formData, images);
      if (response.success) {
        clearForm(); // Limpiar el formulario después de enviar
        setImages([]); // Limpiar las imágenes después de enviar
        setIsLoading(false);
        setIsFinalMsg(true); // Mostrar el mensaje de éxito
        return;
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="p-5">
        <h1 className="text-3xl font-semibold mb-6  text-gray-700">
          Nuevo Tesoro
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="px-0.5 text-sm">
              Nombre del tesoro*
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formValues.name.value}
              maxLength={30}
              onChange={(e) => updateForm('name', e.target.value)}
              className="border border-gray-300 rounded-full px-4 py-2 w-full focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            <p className="text-xs pt-1 text-red-600 ">
              {!formIsValid && !!formValues.name.error
                ? formValues.name.error
                : '\u00A0'}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl border-b text-gray-700">Procedencia</h2>
            <div className="grid grid-cols-1 gap-2">
              <InputCountries
                value={formValues.origin.value}
                updateForm={updateForm}
              />
              <div>
                <label htmlFor="brand" className="px-0.5 text-sm">
                  Marca
                </label>
                <input
                  id="brand"
                  name="brand"
                  value={formValues.brand.value}
                  maxLength={30}
                  onChange={(e) => updateForm('brand', e.target.value)}
                  type="text"
                  placeholder="Desconocido"
                  className="border border-gray-300 rounded-full px-4 py-2 w-full focus:ring-2 focus:ring-yellow-400 outline-none"
                />
                <p className="text-xs pt-1 text-red-600 ">
                  {!formIsValid && !!formValues.brand.error
                    ? formValues.brand.error
                    : '\u00A0'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl border-b text-gray-700">Fabricación</h2>
            <div className="grid grid-cols-1 gap-2">
              <div>
                <label htmlFor="material" className="px-0.5 text-sm">
                  Material
                </label>
                <input
                  id="material"
                  name="material"
                  value={formValues.material.value}
                  maxLength={30}
                  onChange={(e) => updateForm('material', e.target.value)}
                  type="text"
                  placeholder="Desconocido"
                  className="border border-gray-300 rounded-full px-4 py-2 w-full focus:ring-2 focus:ring-yellow-400 outline-none"
                />
                <p className="text-xs pt-1 text-red-600 ">
                  {!formIsValid && !!formValues.material.error
                    ? formValues.material.error
                    : '\u00A0'}
                </p>
              </div>
              <div>
                <label htmlFor="type" className="px-0.5 text-sm">
                  Tipo
                </label>
                <input
                  id="type"
                  name="type"
                  value={formValues.type.value}
                  maxLength={30}
                  onChange={(e) => updateForm('type', e.target.value)}
                  type="text"
                  placeholder="Otro"
                  className="border border-gray-300 rounded-full px-4 py-2 w-full focus:ring-2 focus:ring-yellow-400 outline-none"
                />
                <p className="text-xs pt-1 text-red-600 ">
                  {!formIsValid && !!formValues.type.error
                    ? formValues.type.error
                    : '\u00A0'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl border-b text-gray-700">Dimensiones</h2>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="large" className="px-0.5 text-sm">
                  Largo
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
                    maxLength={10}
                    type="text"
                    className="border border-gray-300 rounded-full pl-4 pr-12 py-2 w-full focus:ring-2 focus:ring-yellow-400 outline-none"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 ">
                    cm
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="width" className="px-0.5 text-sm">
                  Ancho
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
                    maxLength={10}
                    type="text"
                    className="border border-gray-300 rounded-full pl-4 pr-12 py-2 w-full focus:ring-2 focus:ring-yellow-400 outline-none"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 ">
                    cm
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="height" className="px-0.5 text-sm">
                  Alto
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
                    maxLength={10}
                    type="text"
                    className="border border-gray-300 rounded-full pl-4 pr-12 py-2 w-full focus:ring-2 focus:ring-yellow-400 outline-none"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 ">
                    cm
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="diameter" className="px-0.5 text-sm">
                  Diámetro
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
                    maxLength={10}
                    type="text"
                    className="border border-gray-300 rounded-full pl-4 pr-12 py-2 w-full focus:ring-2 focus:ring-yellow-400 outline-none"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 ">
                    cm
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl border-b text-gray-700">Stock</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              <div>
                <label
                  htmlFor="units"
                  className="px-0.5 text-sm whitespace-nowrap"
                >
                  Unidades disp.*
                </label>
                <input
                  id="units"
                  name="units"
                  value={formValues.units.value}
                  onChange={(e) =>
                    acceptOnlyNumbers(e, 'units', updateForm, true)
                  }
                  maxLength={4}
                  inputMode="numeric"
                  type="text"
                  className="border border-gray-300 rounded-full px-4 py-2 w-full focus:ring-2 focus:ring-yellow-400 outline-none"
                />
                <p className="text-xs pt-1 text-red-600">
                  {!formIsValid && !!formValues.units.error
                    ? formValues.units.error
                    : '\u00A0'}
                </p>
              </div>
              <div>
                <label htmlFor="price" className="px-0.5 text-sm">
                  Precio*
                </label>
                <div className="relative">
                  <input
                    id="price"
                    name="price"
                    value={formValues.price.value}
                    onChange={(e) => acceptOnlyNumbers(e, 'price', updateForm)}
                    maxLength={10}
                    inputMode="decimal"
                    type="text"
                    className="border border-gray-300 rounded-full pl-4 pr-8 py-2 w-full focus:ring-2 focus:ring-yellow-400 outline-none"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 ">
                    €
                  </button>
                </div>

                <p className="text-xs pt-1 text-red-600">
                  {!formIsValid && !!formValues.price.error
                    ? formValues.price.error
                    : '\u00A0'}
                </p>
              </div>
            </div>
            <InputImageFiles images={images} setImages={setImages} />
          </div>

          <button
            type="submit"
            className="mt-6 bg-green-600 text-white font-semibold py-2 rounded-full hover:bg-green-500 transition w-full"
          >
            Guardar Tesoro
          </button>
        </form>
      </div>
      <LightboxLoader isLightboxOpen={isLoading} />
      <LightboxMessage
        isLightboxOpen={isFinalMsg}
        onClose={() => setIsFinalMsg(false)}
        title="¡Éxito!"
        text="Tesoro creado con éxito. Podrás encontrarlo en la sección de tesoros."
        buttonText="Aceptar"
      />
    </>
  );
}
