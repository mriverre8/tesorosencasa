import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/supabase/server';
import { getApiCacheHeaders } from '@/lib/cache';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const supabase = await createClient();

    const { data: product, error } = await supabase
      .from('tesoros')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('[API GET PRODUCT ERROR]', error);
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to fetch product' },
        { status: 500 }
      );
    }

    return NextResponse.json(product, {
      status: 200,
      headers: {
        ...getApiCacheHeaders('PRODUCTS'),
        // Add ETag for better caching
        ETag: `"product-${id}-${Date.now()}"`,
      },
    });
  } catch (error) {
    console.error('[API GET PRODUCT ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
