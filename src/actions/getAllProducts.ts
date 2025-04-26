'use server';

import { createClient } from '@/utils/supabase/server';

export async function getAllProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('Tesoro') // Reemplaza 'nombre_de_tu_tabla' con el nombre de tu tabla
    .select('*'); // Selecciona todos los campos

  if (error) {
    console.error('Error al obtener los registros:', error);
  } else {
    console.log('Registros obtenidos:', data);
    return data; // Devuelve los registros obtenidos
  }
}
