import { NextResponse } from 'next/server';
import { createClient } from '@/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from('stream').select('*');

    if (error) {
      console.error('[GET STREAM API ERROR]', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { error: 'Failed to fetch stream' },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Stream not found' }, { status: 404 });
    }

    console.log('[GET STREAM API SUCCESS]', {
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('[GET STREAM API] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
