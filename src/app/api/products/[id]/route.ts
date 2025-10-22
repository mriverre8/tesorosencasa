import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: productId } = await params;

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('tesoros')
      .select('*')
      .eq('id', productId);

    if (error) {
      console.error('[GET PRODUCT API ERROR]', {
        productId,
        message: error.message,
        details: error.details,
        hint: error.hint,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { error: 'Failed to fetch product' },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    console.log('[GET PRODUCT API] Product retrieved:', {
      productId,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('[GET PRODUCT API] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
