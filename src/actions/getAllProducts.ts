'use server';

import { createClient } from '@/supabase/server';

export async function getAllProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase.from('tesoros').select('*');

  if (error) {
    console.error('[GET ALL PRODUCTS ERROR]', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      timestamp: new Date().toISOString(),
    });
    return { data: [], total: 0 };
  } else {
    console.log('[GET ALL PRODUCTS] Records retrieved:', {
      retrieved: data.length,
      timestamp: new Date().toISOString(),
    });
    return { data };
  }
}
