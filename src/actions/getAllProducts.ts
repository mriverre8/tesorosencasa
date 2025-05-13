/* 'use server';

import { createClient } from '@/utils/supabase/server';

export async function getAllProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('tesoros') // Reemplaza 'nombre_de_tu_tabla' con el nombre de tu tabla
    .select('*'); // Selecciona todos los campos

  if (error) {
    console.error('Error al obtener los registros:', error);
  } else {
    console.log('Registros obtenidos:', data);
    return data; // Devuelve los registros obtenidos
  }
}
 */

'use server';

import { createClient } from '@/supabase/server';

type Filters = {
  condition?: string[];
  origin?: string[];
  brand?: string[];
  material?: string[];
  category?: string[];
  price?: number[]; // Se asume que solo tendrá un número máximo
};

export async function getAllProducts(
  page: number = 1,
  pageSize: number = 15,
  filters: Filters = {}
) {
  const supabase = await createClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase.from('tesoros').select('*');

  // Aplicar filtros dinámicamente
  if (filters.condition?.length) {
    query = query.in('condition', filters.condition);
  }

  if (filters.origin?.length) {
    query = query.in('origin', filters.origin);
  }

  if (filters.brand?.length) {
    query = query.in('brand', filters.brand);
  }

  if (filters.material?.length) {
    query = query.in('material', filters.material);
  }

  if (filters.category?.length) {
    query = query.in('category', filters.category);
  }

  if (filters.price?.length && filters.price[0] !== undefined) {
    query = query.lte('price', filters.price[0]); // hasta ese valor
  }

  // Paginación
  query = query.range(from, to);

  const { data, error } = await query;

  if (error) {
    console.error('Error al obtener los registros:', error);
    return [];
  }

  return data;
}
