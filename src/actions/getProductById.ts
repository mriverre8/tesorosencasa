'use server';

import { createClient } from '@/utils/supabase/server';

export async function getProductById(productId: string) {
  try {
    const supabase = await createClient();

    if (!productId) {
      throw new Error('Product ID is required to fetch the product.');
    }

    const { data } = await supabase
      .from('tesoros')
      .select('*')
      .eq('id', productId)
      .single();

    console.log('[GET PRODUCT BY ID SUCCESS]', {
      method: 'getProductById',
      timestamp: new Date().toISOString(),
      productId: productId,
      data: data,
    });

    return data;
  } catch (error) {
    console.error('[GET PRODUCT BY ID ERROR]', {
      method: 'getProductById',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      data: null,
    });

    return null;
  }
}
