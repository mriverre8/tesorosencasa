'use server';

import { createClient } from '@/supabase/server';

export async function getProductById(productId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('tesoros')
    .select('*')
    .eq('id', productId);

  if (error) {
    console.error('[GET PRODUCT ERROR]', {
      productId,
      message: error.message,
      details: error.details,
      hint: error.hint,
      timestamp: new Date().toISOString(),
    });
    return null;
  } else {
    console.log('[GET PRODUCT] Product retrieved:', {
      productId,
      data,
      timestamp: new Date().toISOString(),
    });
    return data[0];
  }
}
