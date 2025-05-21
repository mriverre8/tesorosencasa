'use server';

import { createClient } from '@/supabase/server';
import { randomUUID } from 'crypto';

interface ProductData {
  name: string;
  condition: string;
  units: number;
  price: number;
  images: string[];
  origin?: string;
  brand?: string;
  material?: string;
  category?: string;
  large?: number;
  width?: number;
  height?: number;
  diameter?: number;
}

// Utilidades de parseo
const parseString = (val: FormDataEntryValue | null): string | undefined =>
  val && val.toString().trim() !== '' ? val.toString() : undefined;

const parseNumber = (val: FormDataEntryValue | null): number | undefined => {
  const num = val?.toString().replace(',', '.');
  return num && !isNaN(Number(num)) ? Number(num) : undefined;
};

export async function newProduct(formData: FormData, images: File[]) {
  const supabase = await createClient();

  const product: ProductData = {
    name: formData.get('name') as string,
    condition: formData.get('condition') as string,
    units: parseNumber(formData.get('units'))!,
    price: parseNumber(formData.get('price'))!,
    origin: parseString(formData.get('origin')),
    brand: parseString(formData.get('brand')),
    material: parseString(formData.get('material')),
    category: parseString(formData.get('category')),
    large: parseNumber(formData.get('large')),
    width: parseNumber(formData.get('width')),
    height: parseNumber(formData.get('height')),
    diameter: parseNumber(formData.get('diameter')),
    images: [],
  };

  const uploadedPaths: string[] = [];

  console.log('[NEW PRODUCT] Upload started:', {
    name: product.name,
    timestamp: new Date().toISOString(),
  });

  try {
    for (const image of images) {
      const path = `products/${randomUUID()}`;
      const { error } = await supabase.storage
        .from('tesoros-bucket')
        .upload(path, image);
      if (error) throw new Error('Error al subir imagen: ' + error.message);

      uploadedPaths.push(path);

      const { data: urlData } = supabase.storage
        .from('tesoros-bucket')
        .getPublicUrl(path);

      product.images.push(urlData.publicUrl);

      console.log('[NEW PRODUCT] Image uploaded:', {
        path,
        publicUrl: urlData.publicUrl,
      });
    }

    const { error: insertError } = await supabase
      .from('tesoros')
      .insert([product]);
    if (insertError)
      throw new Error('Error al insertar: ' + insertError.message);

    console.log('[NEW PRODUCT] Inserted into database:', {
      name: product.name,
      images: product.images.length,
      timestamp: new Date().toISOString(),
    });

    return { success: true };
  } catch (err) {
    console.error('[NEW PRODUCT ERROR]', {
      message: (err as Error).message,
      stack: (err as Error).stack,
      timestamp: new Date().toISOString(),
    });
    if (uploadedPaths.length) {
      await supabase.storage.from('tesoros-bucket').remove(uploadedPaths);
    }
    return { success: false, message: 'Error al subir o insertar el producto' };
  }
}
