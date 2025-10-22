import { NextResponse } from 'next/server';
import { createClient } from '@/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, count, error } = await supabase
      .from('tesoros')
      .select('*', { count: 'exact' })
      .range(0, 9);

    if (error) {
      console.error('[GET PRODUCTS API ERROR]', {
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

    console.log('[GET PRODUCTS API] Records retrieved:', {
      retrieved: data.length,
      total: count,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ data, total: count ?? 0 });
  } catch (error) {
    console.error('[GET PRODUCTS API] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error', data: [], total: 0 },
      { status: 500 }
    );
  }
}
