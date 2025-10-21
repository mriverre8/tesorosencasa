import { NextResponse } from 'next/server';
import { createClient } from '@/supabase/server';
import { getApiCacheHeaders } from '@/lib/cache';

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: products, error } = await supabase
      .from('tesoros')
      .select('condition, origin, brand, material, category, price')
      .order('price', { ascending: true });

    if (error) {
      console.error('[API GET FILTERS ERROR]', error);
      return NextResponse.json(
        { error: 'Failed to fetch filters' },
        { status: 500 }
      );
    }

    const filters: Record<string, (string | number)[]> = {
      condition: [],
      origin: [],
      brand: [],
      material: [],
      category: [],
      price: [],
    };

    const seenValues = {
      condition: new Set<string>(),
      origin: new Set<string>(),
      brand: new Set<string>(),
      material: new Set<string>(),
      category: new Set<string>(),
    };

    products?.forEach((product) => {
      if (product.condition) {
        product.condition.forEach((cond: string) => {
          if (!seenValues.condition.has(cond)) {
            seenValues.condition.add(cond);
            filters.condition.push(cond);
          }
        });
      }

      if (product.material) {
        product.material.forEach((mat: string) => {
          if (!seenValues.material.has(mat)) {
            seenValues.material.add(mat);
            filters.material.push(mat);
          }
        });
      }

      if (product.origin && !seenValues.origin.has(product.origin)) {
        seenValues.origin.add(product.origin);
        filters.origin.push(product.origin);
      }

      if (product.brand && !seenValues.brand.has(product.brand)) {
        seenValues.brand.add(product.brand);
        filters.brand.push(product.brand);
      }

      if (product.category && !seenValues.category.has(product.category)) {
        seenValues.category.add(product.category);
        filters.category.push(product.category);
      }
    });

    const validPrices =
      products
        ?.map((p) => {
          const price = p.price;
          const numPrice =
            typeof price === 'string' ? parseFloat(price) : price;
          return !isNaN(numPrice) && numPrice > 0 ? numPrice : null;
        })
        .filter((price) => price !== null) || [];

    const maxPrice = validPrices.length > 0 ? Math.max(...validPrices) : 0;

    const priceSteps = [50, 100, 200, 500, 1000, 2000, 5000];

    if (maxPrice > 0) {
      filters.price = priceSteps.filter((step) => step <= maxPrice);
      if (maxPrice > Math.max(...priceSteps)) {
        filters.price.push(Math.ceil(maxPrice));
      }
      if (filters.price.length === 0) {
        filters.price = [Math.ceil(maxPrice)];
      }
    } else {
      console.warn('[API GET FILTERS] No valid prices found, using defaults');
      filters.price = [100, 500, 1000, 2000];
    }

    return NextResponse.json(filters, {
      status: 200,
      headers: getApiCacheHeaders('FILTERS'),
    });
  } catch (error) {
    console.error('[API GET FILTERS ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
