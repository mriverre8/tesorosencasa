import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

/**
 * GET API Route Handler Products
 * Endpoint: /api/products
 */
export async function GET() {
  try {
    const supabase = await createClient();

    const { data, count } = await supabase
      .from('tesoros')
      .select('*', { count: 'exact' });

    console.log('[API_SUCCESS] /api/products', {
      data: data,
      timestamp: new Date().toISOString(),
      endpoint: '/api/products',
      method: 'GET',
    });

    return NextResponse.json({ data: data, total: count }, { status: 200 });
  } catch (error) {
    console.error('[API_ERROR] /api/products', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      endpoint: '/api/products',
      method: 'GET',
    });

    return NextResponse.json(
      {
        data: [],
        total: 0,
        error: 'Internal Server Error',
        message:
          process.env.NODE_ENV === 'development'
            ? (error as Error).message
            : 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

/**
 * Optional: Handle unsupported HTTP methods
 */
export async function POST() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
