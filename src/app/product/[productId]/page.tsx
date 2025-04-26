import React from 'react';
/* import tesorosData from '@/mocks/tesoros.json';  */ // Mock data
import { Tesoro } from '@/types/tesoro';
import Layout from '@/components/Layout';
import { createClient } from '@/utils/supabase/server';
import ProductPage from '@/pages/Product/ProductPage';
import { getProductById } from '@/actions/getProductById';

interface IParams {
  productId?: string;
}

export default async function Product({ params }: { params: IParams }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { productId } = await params;

  if (!productId) {
    throw new Error('Product ID is required');
  }
  const response = await getProductById(productId);
  const tesoro: Tesoro | undefined = response ? response[0] : undefined;

  if (!tesoro) {
    return (
      <Layout>
        <div className="flex flex-col mt-[99px] items-center justify-center">
          <p className="text-lg text-red-500">El producto no fue encontrado.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col mt-[99px] ">
        <ProductPage tesoro={tesoro} user={user} />
      </div>
    </Layout>
  );
}
