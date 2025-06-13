'use server';

import { createClient } from '@/supabase/server';

export async function getProductById(productId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('tesoros')
    .select('*') // Selecciona todos los campos
    .eq('id', productId); // Filtra por el ID del usuario

  if (error) {
    console.error('[GET PRODUCT ERROR]', {
      productId,
      message: error.message,
      details: error.details,
      hint: error.hint,
      timestamp: new Date().toISOString(),
    });
    return null; // O puedes manejar el error de manera distinta si lo prefieres
  } else {
    console.log('[GET PRODUCT] Product retrieved:', {
      productId,
      data,
      timestamp: new Date().toISOString(),
    });
    return data[0]; // Devuelve los datos del producto encontrado
  }
}
