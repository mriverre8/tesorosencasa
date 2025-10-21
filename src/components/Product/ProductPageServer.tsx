import React from 'react';
import { createClient } from '@/supabase/server';
import { tesoros } from '@prisma/client';
import ProductPageClient from './ProductPageClient';
import ProductPageSkeleton from './ProductPageSkeleton';

interface Props {
  id: string;
}

const ProductPageServer = async ({ id }: Props) => {
  let tesoro: tesoros | null = null;
  let error: string | null = null;

  try {
    const supabase = await createClient();

    const { data, error: supabaseError } = await supabase
      .from('tesoros')
      .select('*')
      .eq('id', id)
      .single();

    if (supabaseError && supabaseError.code !== 'PGRST116') {
      throw supabaseError;
    }

    tesoro = data;
  } catch (err) {
    console.error('Error fetching product:', err);
    error = err instanceof Error ? err.message : 'Unknown error';
  }

  // If product not found or error, show skeleton
  if (!tesoro || error) {
    return <ProductPageSkeleton />;
  }

  return <ProductPageClient initialTesoro={tesoro} />;
};

export default ProductPageServer;
