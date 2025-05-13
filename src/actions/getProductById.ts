'use server';

import { createClient } from '@/supabase/server';

export async function getProductById(productId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('Tesoro') // Reemplaza 'Tesoro' con el nombre de tu tabla
    .select('*') // Selecciona todos los campos
    .eq('id', productId); // Filtra por el ID del producto

  if (error) {
    console.error('Error al obtener el producto:', error);
    return null; // O puedes manejar el error de manera distinta si lo prefieres
  } else {
    console.log('Producto obtenido:', data);
    return data; // Devuelve los datos del producto encontrado
  }
}
