'use server';

import { createClient } from '@/supabase/server';

interface ProductData {
  name: string;
  condition: string[];
  units: number;
  price: number;
  origin: string | null;
  brand: string | null;
  material: string[];
  category: string | null;
  large: number | null;
  width: number | null;
  height: number | null;
  diameter: number | null;
}

// Utilidades de parseo
const parseString = (val: FormDataEntryValue | null): string | null =>
  val && val.toString().trim() !== '' ? val.toString() : null;

const parseNumber = (val: FormDataEntryValue | null): number | null => {
  const num = val?.toString().replace(',', '.');
  return num && !isNaN(Number(num)) ? Number(num) : null;
};

export async function editProduct(productId: string, formData: FormData) {
  const supabase = await createClient();

  const product: ProductData = {
    name: formData.get('productName') as string,
    condition: JSON.parse(formData.get('productCondition') as string),
    origin: parseString(formData.get('productOrigin')),
    brand: parseString(formData.get('productBrand')),
    material: JSON.parse(formData.get('productMaterial') as string),
    category: parseString(formData.get('productCategory')),
    large: parseNumber(formData.get('productLarge')),
    width: parseNumber(formData.get('productWidth')),
    height: parseNumber(formData.get('productHeight')),
    diameter: parseNumber(formData.get('productDiameter')),
    units: parseNumber(formData.get('productUnits'))!,
    price: parseNumber(formData.get('productPrice'))!,
  };

  console.log('[EDIT PRODUCT] Payload:', product);

  try {
    const { data, error: insertError } = await supabase
      .from('tesoros')
      .update(product)
      .eq('id', productId)
      .select();

    if (insertError)
      throw new Error('Error al actualizar: ' + insertError.message);

    console.log('[EDIT PRODUCT] Updated in database:', {
      name: product.name,
      timestamp: new Date().toISOString(),
      updated: data,
    });

    return { error: false };
  } catch (err) {
    console.error('[EDIT PRODUCT ERROR]', {
      message: (err as Error).message,
      stack: (err as Error).stack,
      timestamp: new Date().toISOString(),
    });

    return { error: true };
  }
}
