import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/supabase/server';
import { PAGE_SIZE } from '@/constants/constants';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page = 1, filters = {}, searchTerm = '' } = body;

    if (typeof page !== 'number' || page < 1) {
      return NextResponse.json(
        { error: 'Invalid page number' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    let query = supabase.from('tesoros').select('*', { count: 'exact' });

    // Apply filters dynamically
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
      query = query.lte('price', filters.price[0]);
    }

    if (searchTerm.trim() !== '') {
      query = query.ilike('name', `%${searchTerm}%`);
    }

    // Pagination: always from 0 to pageSize - 1
    query = query.range(page * PAGE_SIZE - PAGE_SIZE, page * PAGE_SIZE - 1);

    const { data, count, error } = await query;

    if (error) {
      console.error('[GET PRODUCTS BY FILTERS API ERROR]', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { error: 'Failed to fetch products', data: [], total: 0 },
        { status: 500 }
      );
    }

    console.log('[GET PRODUCTS BY FILTERS API] Query successful', {
      results: data.length,
      total: count,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ data, total: count ?? 0 });
  } catch (error) {
    console.error('[GET PRODUCTS BY FILTERS API] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error', data: [], total: 0 },
      { status: 500 }
    );
  }
}
