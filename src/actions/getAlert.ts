'use server';

import { createClient } from '@/supabase/server';

export async function getAlert(view: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('alerts')
    .select('*')
    .eq('view', view);

  if (error) {
    console.error('[GET ALERT ERROR]', {
      view,
      message: error.message,
      details: error.details,
      hint: error.hint,
      timestamp: new Date().toISOString(),
    });
    return null;
  } else {
    console.log('[GET ALERT] ALERT retrieved:', {
      view,
      data,
      timestamp: new Date().toISOString(),
    });
    return data[0];
  }
}
