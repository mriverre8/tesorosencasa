'use server';

import { createClient } from '@/supabase/server';

export async function getStream() {
  try {
    const supabase = await createClient();

    const { data } = await supabase.from('stream').select('*').single();

    console.log('[GET STREAM SUCCESS]', {
      method: 'getStream',
      timestamp: new Date().toISOString(),
      data: data,
    });

    return data;
  } catch (error) {
    console.error('[GET STREAM ERROR]', {
      method: 'getStream',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      data: null,
    });

    return null;
  }
}
