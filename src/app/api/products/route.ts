import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/supabase/server';
import { getApiCacheHeaders } from '@/lib/cache';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');

    const supabase = await createClient();

    const { data, count, error } = await supabase
      .from('tesoros')
      .select('*', { count: 'exact' })
      .range((page - 1) * pageSize, page * pageSize - 1)
      .order('id', { ascending: true });

    if (error) {
      console.error('[API GET PRODUCTS ERROR]', error);
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        data,
        total: count ?? 0,
        page,
        totalPages: Math.ceil((count ?? 0) / pageSize),
      },
      {
        status: 200,
        headers: getApiCacheHeaders('PRODUCTS'),
      }
    );
  } catch (error) {
    console.error('[API GET PRODUCTS ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
