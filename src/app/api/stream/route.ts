import { NextResponse } from 'next/server';
import { createClient } from '@/supabase/server';
import { getApiCacheHeaders } from '@/lib/cache';

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: streamData, error } = await supabase
      .from('stream')
      .select('*')
      .gte('date', new Date().toISOString().split('T')[0])
      .order('date', { ascending: true })
      .order('time', { ascending: true })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 is "no rows returned"
      console.error('[API GET STREAM ERROR]', error);
      return NextResponse.json(
        { error: 'Failed to fetch stream' },
        { status: 500 }
      );
    }

    return NextResponse.json(streamData || null, {
      status: 200,
      headers: getApiCacheHeaders('STREAM'),
    });
  } catch (error) {
    console.error('[API GET STREAM ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
