'use server';

import { createClient } from '@/supabase/server';

export async function getStream() {
  const supabase = await createClient();

  const { data, error } = await supabase.from('stream').select('*');

  if (error) {
    console.error('[GET STREAM ERROR]', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      timestamp: new Date().toISOString(),
    });
    return null; // o lanza error si prefieres throw new Error(error.message)
  } else {
    console.log('[GET STREAM SUCCESS]', {
      timestamp: new Date().toISOString(),
    });
    return data[0];
  }
}
