'use server';

import { createClient } from '@/utils/supabase/server';

export async function deleteStream() {
  const supabase = await createClient();

  try {
    const { error: deleteError } = await supabase
      .from('stream')
      .delete()
      .eq('id', '1');

    if (deleteError) {
      throw new Error('Error al eliminar el directo');
    }

    console.log('[DELETE STREAM] Directo eliminado correctamente', {
      timestamp: new Date().toISOString(),
    });

    return { error: false };
  } catch (err) {
    console.error('[DELETE STREAM ERROR]', {
      message: (err as Error).message,
      timestamp: new Date().toISOString(),
    });

    return { error: true, message: (err as Error).message };
  }
}
