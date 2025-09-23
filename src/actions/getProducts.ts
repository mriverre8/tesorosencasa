'use server';

import { createClient } from '@/supabase/server';

export async function getProducts() {
  const supabase = await createClient();

  const { data, count, error } = await supabase
    .from('tesoros')
    .select('*', { count: 'exact' }) // pide el total
    .range(0, 9); // sigue devolviendo solo 10 registros

  if (error) {
    console.error('[GET PRODUCTS ERROR]', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      timestamp: new Date().toISOString(),
    });
    return { data: [], total: 0 };
  } else {
    console.log('[GET PRODUCTS] Records retrieved:', {
      retrieved: data.length,
      total: count,
      timestamp: new Date().toISOString(),
    });
    return { data, total: count ?? 0 };
  }
}
