'use server';

import { createClient } from '@/supabase/server';

export async function deleteProducts() {
  const supabase = await createClient();

  try {
    // 1. Eliminar todos los productos de la tabla 'tesoros'
    const { error: deleteError } = await supabase
      .from('tesoros')
      .delete()
      .neq('id', '');

    if (deleteError) {
      throw new Error('Error al eliminar todos los productos');
    }

    console.log(
      '[DELETE ALL PRODUCTS & STORAGE] Todos los productos y archivos eliminados correctamente',
      {
        timestamp: new Date().toISOString(),
      }
    );

    return { error: false };
  } catch (err) {
    console.error('[DELETE ALL PRODUCTS & STORAGE ERROR]', {
      message: (err as Error).message,
      timestamp: new Date().toISOString(),
    });

    return { error: true, message: (err as Error).message };
  }
}
