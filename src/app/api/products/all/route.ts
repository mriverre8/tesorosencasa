import { NextResponse } from 'next/server';
import { createClient } from '@/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from('tesoros').select('*');

    if (error) {
      console.error('[GET ALL PRODUCTS API ERROR]', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { error: 'Failed to fetch all products', data: [], total: 0 },
        { status: 500 }
      );
    }

    console.log('[GET ALL PRODUCTS API] Records retrieved:', {
      retrieved: data.length,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.error('[GET ALL PRODUCTS API] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error', data: [], total: 0 },
      { status: 500 }
    );
  }
}
