import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/supabase/server';
import { getApiCacheHeaders } from '@/lib/cache';

export async function POST(request: NextRequest) {
  try {
    const {
      filters,
      searchTerm,
      page = 1,
      pageSize = 10,
    } = await request.json();

    const supabase = await createClient();
    let query = supabase.from('tesoros').select('*', { count: 'exact' });

    if (filters?.condition?.length) {
      query = query.overlaps('condition', filters.condition);
    }

    if (filters?.origin?.length) {
      query = query.in('origin', filters.origin);
    }

    if (filters?.brand?.length) {
      query = query.in('brand', filters.brand);
    }

    if (filters?.material?.length) {
      query = query.overlaps('material', filters.material);
    }

    if (filters?.category?.length) {
      query = query.in('category', filters.category);
    }

    if (filters?.price?.length && filters.price[0] !== undefined) {
      query = query.lte('price', filters.price[0]);
    }

    if (searchTerm?.trim()) {
      query = query.ilike('name', `%${searchTerm}%`);
    }

    query = query.order('id', { ascending: true });

    query = query.range((page - 1) * pageSize, page * pageSize - 1);

    const { data, count, error } = await query;

    if (error) {
      console.error('[API SEARCH PRODUCTS ERROR]', error);
      return NextResponse.json(
        { error: 'Failed to search products' },
        { status: 500 }
      );
    }

    const cacheKey = JSON.stringify({ filters, searchTerm });
    const cacheHeaders = {
      ...getApiCacheHeaders('SEARCH'),
      ETag: `"${Buffer.from(cacheKey).toString('base64')}"`,
    };

    return NextResponse.json(
      {
        data,
        total: count ?? 0,
        page,
        totalPages: Math.ceil((count ?? 0) / pageSize),
      },
      {
        status: 200,
        headers: cacheHeaders,
      }
    );
  } catch (error) {
    console.error('[API SEARCH PRODUCTS ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
