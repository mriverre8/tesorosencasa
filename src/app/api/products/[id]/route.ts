import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

/**
 * GET API Route Handler Product by ID
 * Endpoint: /api/products/[id]
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          data: null,
          error: 'Product ID is required',
          message: 'Product ID parameter is missing',
        },
        { status: 400 }
      );
    }

    const { data } = await supabase
      .from('tesoros')
      .select('*')
      .eq('id', id)
      .single();

    console.log('[API_SUCCESS] /api/products/[id]', {
      productId: id,
      data: data,
      timestamp: new Date().toISOString(),
      endpoint: `/api/products/${id}`,
      method: 'GET',
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('[API_ERROR] /api/products/[id]', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      endpoint: '/api/products/[id]',
      method: 'GET',
    });

    return NextResponse.json(
      {
        data: null,
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
