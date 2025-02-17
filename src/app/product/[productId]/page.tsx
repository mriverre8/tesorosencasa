import React from 'react';
import tesorosData from '@/mocks/tesoros.json'; // Mock data
import { Tesoro } from '@/types/tesoro';
import Layout from '@/components/Layout';
import ProductHeader from '@/pages/Product/ProductHeader';
import ProductContent from '@/pages/Product/ProductContent';

interface IParams {
  productId?: string;
}

const Product = async ({ params }: { params: IParams }) => {
  const { productId } = await params;

  const tesoro: Tesoro | undefined = tesorosData.find(
    (item) => item.id === Number(productId)
  );

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
        <section id="header">
          <ProductHeader tesoro={tesoro} />
        </section>
        <section id="content">
          <ProductContent tesoro={tesoro} />
        </section>
      </div>
    </Layout>
  );
};

export default Product;
