'use server';

import { createClient } from '@/supabase/server';

export async function getProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase.from('tesoros').select('*');

  if (error) {
    console.error('Error al obtener los registros:', error);
    return [];
  } else {
    console.log('Registros obtenidos:', data);
    return data;
  }
}
