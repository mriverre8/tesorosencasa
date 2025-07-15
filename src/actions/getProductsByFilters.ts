'use server';

import { createClient } from '@/supabase/server';

type Filters = {
  condition?: string[];
  origin?: string[];
  brand?: string[];
  material?: string[];
  category?: string[];
  price?: number[];
};

export async function getProductsByFilters(
  pageSize: number,
  filters: Filters,
  searchTerm: string
) {
  const supabase = await createClient();

  let query = supabase.from('tesoros').select('*');

  // Aplicar filtros dinámicamente
  if (filters.condition?.length) {
    query = query.overlaps('condition', filters.condition);
  }

  if (filters.origin?.length) {
    query = query.in('origin', filters.origin);
  }

  if (filters.brand?.length) {
    query = query.in('brand', filters.brand);
  }

  if (filters.material?.length) {
    query = query.overlaps('material', filters.material);
  }

  if (filters.category?.length) {
    query = query.in('category', filters.category);
  }

  if (filters.price?.length && filters.price[0] !== undefined) {
    query = query.lte('price', filters.price[0]); // hasta ese valor
  }

  if (searchTerm.trim() !== '') {
    query = query.ilike('name', `%${searchTerm}%`);
  }

  // Paginación: siempre desde 0 hasta pageSize - 1
  query = query.range(0, pageSize - 1);

  const { data, error } = await query;

  if (error) {
    console.error('[GET PRODUCTS BY FILTERS ERROR]', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      timestamp: new Date().toISOString(),
    });
    return [];
  }
  console.log('[GET PRODUCTS BY FILTERS] Query successful', {
    results: data.length,
    timestamp: new Date().toISOString(),
  });
  return data;
}
