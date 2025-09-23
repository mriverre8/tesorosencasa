'use server';

import { createClient } from '@/supabase/server';

export async function newStream(date: string, time: string, duration: string) {
  const supabase = await createClient();

  const durationInt = parseInt(duration, 10);
  try {
    const { data, error: insertError } = await supabase
      .from('stream')
      .upsert([{ id: 1, date, time, duration: durationInt }], {
        onConflict: 'id',
      })
      .select()
      .single();

    if (insertError)
      throw new Error('Error al insertar: ' + insertError.message);

    console.log('[NEW STREAM] Inserted into database:', {
      timestamp: new Date().toISOString(),
    });

    return { error: false, data: data };
  } catch (error) {
    console.error('[NEW STREAM ERROR]', {
      message: (error as Error).message,
      timestamp: new Date().toISOString(),
    });

    return { error: true };
  }
}
