'use server';

import { createClient } from '@/supabase/server';

export async function getUserById(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('users')
    .select('*') // Selecciona todos los campos
    .eq('id', userId); // Filtra por el ID del usuario

  if (error) {
    console.error('[GET USER ERROR]', {
      userId,
      message: error.message,
      details: error.details,
      hint: error.hint,
      timestamp: new Date().toISOString(),
    });
    return null; // O puedes manejar el error de manera distinta si lo prefieres
  } else {
    console.log('[GET USER] User retrieved:', {
      userId,
      data,
      timestamp: new Date().toISOString(),
    });
    return data[0]; // Devuelve los datos del producto encontrado
  }
}
