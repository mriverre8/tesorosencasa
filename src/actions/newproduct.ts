'use server';

import { createClient } from '@/supabase/server';

interface ProductData {
  name: string;
  condition: string;
  units: number;
  price: number;
  images: string[];
  origin?: string;
  brand?: string;
  material?: string[];
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

export async function newProduct(
  formData: FormData,
  materials: string[],
  images: string[]
) {
  const supabase = await createClient();

  const product: ProductData = {
    name: formData.get('name') as string,
    condition: formData.get('condition') as string,
    units: parseNumber(formData.get('units'))!,
    price: parseNumber(formData.get('price'))!,
    origin: parseString(formData.get('origin')),
    brand: parseString(formData.get('brand')),
    material: materials.length > 0 ? materials : undefined,
    category: parseString(formData.get('category')),
    large: parseNumber(formData.get('large')),
    width: parseNumber(formData.get('width')),
    height: parseNumber(formData.get('height')),
    diameter: parseNumber(formData.get('diameter')),
    images: images,
  };

  try {
    const { error: insertError } = await supabase
      .from('tesoros')
      .insert([product]);

    if (insertError)
      throw new Error('Error al insertar: ' + insertError.message);

    console.log('[NEW PRODUCT] Inserted into database:', {
      name: product.name,
      images: images,
      timestamp: new Date().toISOString(),
    });

    return { error: false };
  } catch (err) {
    console.error('[NEW PRODUCT ERROR]', {
      message: (err as Error).message,
      stack: (err as Error).stack,
      timestamp: new Date().toISOString(),
    });

    return { error: true };
  }
}
