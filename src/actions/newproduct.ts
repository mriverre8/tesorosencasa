'use server';

import { Tesoro } from '@/types/tesoro';
import { createClient } from '@/utils/supabase/server';
import { randomUUID } from 'crypto';

// Función de utilidad para convertir valores a números o retornar null si no es posible
const parseNumber = (value: string): number | null => {
  if (!value) return null;
  const parsed = parseFloat(value.replace(',', '.'));
  return isNaN(parsed) ? null : parsed;
};

// Función de utilidad para obtener un string o un valor nulo
const parseString = (value: string): string | null => value || null;

export async function newProduct(formData: FormData, images: File[]) {
  const supabase = await createClient();

  // Extracción de datos con tipos seguros
  const name = formData.get('name') as string;
  const origin = parseString(formData.get('origin') as string);
  const brand = parseString(formData.get('brand') as string);
  const material = parseString(formData.get('material') as string);
  const type = parseString(formData.get('type') as string);

  const large = parseNumber(formData.get('large') as string);
  const width = parseNumber(formData.get('width') as string);
  const height = parseNumber(formData.get('height') as string);
  const diameter = parseNumber(formData.get('diameter') as string);

  const units = parseFloat(formData.get('units') as string);
  const price = parseFloat((formData.get('price') as string).replace(',', '.'));

  /* console.log(
    name,
    origin,
    brand,
    material,
    type,
    large,
    width,
    height,
    diameter,
    units,
    price
  ); */

  // Subir imágenes
  const imageUrls: string[] = [];
  const uploadedImagesPaths: string[] = []; // Para guardar las rutas de las imágenes subidas

  // Subir cada imagen al almacenamiento de Supabase
  try {
    for (const image of images) {
      const imagePath = `products/${randomUUID()}_${image.name}`;

      // Subir imagen al bucket de Supabase
      const { data, error } = await supabase.storage
        .from('tesoros-bucket') // 'tesoros-bucket' es el nombre del bucket
        .upload(imagePath, image);

      if (error) {
        throw new Error('Error al subir la imagen: ' + error.message);
      }

      // Guardamos las rutas de las imágenes subidas
      uploadedImagesPaths.push(imagePath);

      // Obtener la URL pública de la imagen cargada
      const publicUrl = supabase.storage
        .from('tesoros-bucket')
        .getPublicUrl(imagePath).data.publicUrl;
      imageUrls.push(publicUrl);
    }
  } catch (err) {
    // En caso de error en la subida de imágenes, eliminamos las imágenes subidas previamente
    console.error('Error en la subida de imágenes:', err);

    // Intentamos eliminar las imágenes subidas para hacer rollback
    for (const path of uploadedImagesPaths) {
      await supabase.storage.from('tesoros-bucket').remove([path]);
    }

    return { success: false, message: 'Error al subir una o más imágenes' };
  }

  // Crear un objeto con los datos del producto solo con los valores no nulos
  // Define a specific type for product data
  interface ProductData {
    name: string;
    units: number;
    price: number;
    images: string[];
    origin?: string;
    brand?: string;
    material?: string;
    type?: string;
    large?: number;
    width?: number;
    height?: number;
    diameter?: number;
  }

  const productData: ProductData = {
    name: name,
    units: units,
    price: price,
    images: imageUrls,
  };

  // Solo agregamos valores si son válidos (no nulos o vacíos)
  if (origin) productData.origin = origin;
  if (brand) productData.brand = brand;
  if (material) productData.material = material;
  if (type) productData.type = type;
  if (large) productData.large = large;
  if (width) productData.width = width;
  if (height) productData.height = height;
  if (diameter) productData.diameter = diameter;

  // Insertar los datos en la base de datos
  try {
    const { data, error } = await supabase.from('Tesoro').insert([productData]);

    if (error) {
      throw new Error(
        'Error al insertar el producto en la base de datos: ' + error.message
      );
    }

    return { success: true, data };
  } catch (err) {
    // Si hay un error al insertar el producto, intentamos eliminar las imágenes subidas
    console.error('Error al insertar el producto:', err);
    for (const path of uploadedImagesPaths) {
      await supabase.storage.from('tesoros-bucket').remove([path]);
    }

    return { success: false, message: 'Error al insertar el producto' };
  }
}
