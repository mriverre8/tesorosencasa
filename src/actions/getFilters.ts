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
  const filters: Record<string, (string | number)[]> = {};

  for (const field of fields) {
    if (field === 'price') {
      const { data, error } = await supabase
        .from('tesoros')
        .select('price')
        .order('price', { ascending: false })
        .limit(1);

      if (error) {
        console.error('[GET FILTERS ERROR] Error fetching max price:', {
          message: error.message,
          field,
          timestamp: new Date().toISOString(),
        });
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
        console.error(`[GET FILTERS ERROR] Error fetching ${field}:`, {
          message: error.message,
          timestamp: new Date().toISOString(),
        });
        continue;
      }

      if (data?.length) {
        const uniqueValues = new Set<string>();

        data.forEach((item) => {
          const value = item[field as keyof typeof item];

          if (field === 'condition' && Array.isArray(value)) {
            value.forEach((con) => uniqueValues.add(String(con)));
          } else if (field === 'material' && Array.isArray(value)) {
            value.forEach((mat) => uniqueValues.add(String(mat)));
          } else {
            uniqueValues.add(String(value));
          }
        });

        filters[field] = Array.from(uniqueValues);
      }
    }
  }

  console.log('[GET FILTERS] Filters completed', {
    fields: Object.keys(filters),
    timestamp: new Date().toISOString(),
  });

  return filters;
}
