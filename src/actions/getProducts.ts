'use server';

import { createClient } from '@/supabase/server';

export async function getProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('tesoros')
    .select('*')
    .range(0, 14);

  if (error) {
    console.error('[GET PRODUCTS ERROR]', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      timestamp: new Date().toISOString(),
    });
    return [];
  } else {
    console.log('[GET PRODUCTS] Records retrieved:', {
      count: data.length,
      timestamp: new Date().toISOString(),
    });
    return data;
  }
}
