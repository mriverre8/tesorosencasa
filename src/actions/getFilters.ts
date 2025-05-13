'use server';

import { createClient } from '@/supabase/server';

export async function getFilters() {
  const supabase = await createClient();

  const fields = [
    'condition',
    'origin',
    'brand',
    'material',
    'category',
    'price',
  ];
  const filters: Record<string, any> = {};

  for (const field of fields) {
    if (field === 'price') {
      const { data, error } = await supabase
        .from('tesoros')
        .select('price')
        .order('price', { ascending: false })
        .limit(1);

      if (error) {
        console.error(`Error fetching max price:`, error.message);
        continue;
      }

      if (data && data.length > 0) {
        const roundedPrice = Math.ceil(data[0].price);
        filters['price'] = [roundedPrice];
      }
    } else {
      const { data, error } = await supabase
        .from('tesoros')
        .select(`${field}`)
        .not(field, 'is', null);

      if (error) {
        console.error(`Error fetching ${field}:`, error.message);
        continue;
      }

      if (data) {
        filters[field] = Array.from(
          new Set(data.map((item: any) => item[field]))
        );
      }
    }
  }

  return filters;
}
