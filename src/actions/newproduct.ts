'use server';

import { createClient } from '@/supabase/server';

interface ProductData {
  name: string;
  condition: string[];
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

export async function newProduct(formData: FormData) {
  const supabase = await createClient();

  const product: ProductData = {
    name: formData.get('productName') as string,
    condition: JSON.parse(
      formData.get('productCondition') as string
    ) as string[],
    origin: parseString(formData.get('productOrigin')),
    brand: parseString(formData.get('productBrand')),
    material: JSON.parse(formData.get('productMaterial') as string) as string[],
    category: parseString(formData.get('productCategory')),
    large: parseNumber(formData.get('productLarge')),
    width: parseNumber(formData.get('productWidth')),
    height: parseNumber(formData.get('productHeight')),
    diameter: parseNumber(formData.get('productDiameter')),
    units: parseNumber(formData.get('productUnits'))!,
    price: parseNumber(formData.get('productPrice'))!,
    images: JSON.parse(formData.get('productImages') as string) as string[],
  };

  try {
    const { error: insertError } = await supabase
      .from('tesoros')
      .insert([product]);

    if (insertError)
      throw new Error('Error al insertar: ' + insertError.message);

    console.log('[NEW PRODUCT] Inserted into database:', {
      name: product.name,
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
