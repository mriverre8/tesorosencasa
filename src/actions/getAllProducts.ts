'use server';

import { createClient } from '@/utils/supabase/server';

export async function getAllProducts() {
  try {
    const supabase = await createClient();

    const { data, count } = await supabase
      .from('tesoros')
      .select('*', { count: 'exact' });

    console.log('[GET ALL PRODUCTS SUCCESS]', {
      method: 'getAllProducts',
      timestamp: new Date().toISOString(),
      total: count,
      data: data,
    });

    return { data: data, total: count };
  } catch (error) {
    console.error('[GET ALL PRODUCTS ERROR]', {
      method: 'getAllProducts',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      total: 0,
      data: [],
    });

    return { data: [], total: 0 };
  }
}
