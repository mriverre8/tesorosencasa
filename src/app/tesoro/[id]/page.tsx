import React from 'react';
import Layout from '@/components/Layout';
import { getProductById } from '@/actions/getProductById';
import ProductPage from '@/views/Product/ProductPage';
import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';

export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tesoroData = await getProductById(id);
  return (
    <div className="flex flex-col justify-between min-h-screen bg-background">
      <Topbar />
      <main>
        <div className="mt-[90px]">
          <Layout>
            <ProductPage productData={tesoroData} />
          </Layout>
        </div>
      </main>
      <Footer />
    </div>
  );
}
